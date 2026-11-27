"""E2E: send a follow-up prompt WHILE the agent is still streaming.

The user's complaint: "when i chat with agent and said create questions about
anemia the agent run then i want to make the agent to include jaundice i have
to wait the end. In other agents i can send prompts no need to the end."

Flow verified (both button-click and Enter-key paths):
  1. MedQ login → /freellm/playground (auto-bridge).
  2. Send an anemia essay prompt; while it streams:
     - empty composer → button is Stop
     - type the jaundice follow-up → button becomes Send (interrupts)
  3. Click Send mid-stream → new question lands immediately, the partial
     answer is kept and marked "stopped", and a fresh answer streams in.
  4. Round 2 through the Enter key, the way a fast typist does it.
"""
import re
import sys
import time

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
MEDQ_EMAIL = "admin@medq.com"
MEDQ_PASSWORD = "test123"

results = []
console_errors = []
page_errors = []
failed_responses = []
chat_requests = []


def check(name, passed, detail=None):
    results.append((name, bool(passed), detail))
    print(f"  {'PASS' if passed else 'FAIL'}  {name}" + (f"  [{detail}]" if detail else ""))


def medq_login(page):
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    email = page.locator("input[type=email]").first
    email.click()
    email.type(MEDQ_EMAIL, delay=15)
    pwd = page.locator("input[type=password]").first
    pwd.click()
    pwd.type(MEDQ_PASSWORD, delay=15)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(5000)


def composer(page):
    return page.locator('textarea[placeholder^="Type a message"]').first


def assistant_msg(page):
    """Assistant message columns: group/msg + items-start (user is items-end)."""
    return page.locator('div[class*="group/msg"][class*="items-start"]')


def action_button(page):
    """The composer's right-hand button (Send / Send-while-streaming / Stop)."""
    return page.locator('[data-testid="liquid-composer"] button[aria-label^="Send"],'
                        ' [data-testid="liquid-composer"] button[aria-label="Stop"]').first


def assistant_chars(page):
    loc = assistant_msg(page)
    if loc.count() == 0:
        return 0
    try:
        return len(loc.last().inner_text())
    except Exception:
        return 0


def wait_streaming(page, min_chars, timeout_s):
    """Poll until the streaming assistant bubble has at least min_chars."""
    deadline = time.time() + timeout_s
    snaps = 0
    while time.time() < deadline:
        if assistant_chars(page) >= min_chars:
            return True
        err = page.locator("text=Something went wrong").count()
        if err:
            body = page.locator("body").inner_text()[-400:]
            print(f"  !! error bubble appeared:\n{body}")
            return False
        snaps += 1
        if snaps % 25 == 0:
            page.screenshot(path=f"/home/z/my-project/tmp/midstream-wait-{snaps // 25}.png")
            print(f"     …still waiting ({snaps * 0.4:.0f}s): assistant chars = {assistant_chars(page)}")
        page.wait_for_timeout(400)
    print("  !! timeout waiting for the stream; diagnostics:")
    page.screenshot(path="/home/z/my-project/tmp/midstream-debug-timeout.png")
    user_bubbles = page.locator('div[class*="group/msg"][class*="items-end"]').count()
    print(f"     user bubbles on screen: {user_bubbles}")
    print(f"     assistant rows: {assistant_msg(page).count()}")
    body = page.locator("body").inner_text()
    print(f"     body tail: ...{body[-500:]}")
    print(f"     failed responses: {failed_responses[-10:]}")
    print(f"     chat requests: {chat_requests}")
    return False


def wait_idle(page, timeout_s):
    """Wait for the run to finish: the composer button returns to plain Send."""
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        label = action_button(page).get_attribute("aria-label") or ""
        if label == "Send":
            return True
        page.wait_for_timeout(500)
    return False


def interrupt_round(page, round_no, first_prompt, followup, use_enter):
    print(f"== round {round_no} ({'Enter key' if use_enter else 'button click'}) ==")
    box = composer(page)
    box.click()
    box.type(first_prompt, delay=5)
    page.keyboard.press("Enter")
    if not wait_streaming(page, 60, 90):
        check(f"round {round_no}: first reply streams", False)
        return False
    # Empty composer mid-stream → the button must be Stop.
    stop_label = action_button(page).get_attribute("aria-label")
    check(f"round {round_no}: button is Stop while streaming, composer empty", stop_label == "Stop", stop_label)
    # Type the follow-up → the button must flip back to Send.
    box.type(followup, delay=5)
    send_label = action_button(page).get_attribute("aria-label")
    check(f"round {round_no}: button is Send (interrupts) once a draft is typed",
          send_label.startswith("Send"), send_label)
    before = assistant_chars(page)
    if use_enter:
        page.keyboard.press("Enter")
    else:
        action_button(page).click()
    # The new question must land on the transcript immediately.
    landed = page.locator('div[class*="group/msg"][class*="items-end"]', has_text=followup).count() > 0
    check(f"round {round_no}: follow-up lands as a new user message right away", landed)
    page.screenshot(path=f"/home/z/my-project/download/freellm-playground-midstream-r{round_no}.png")
    # The interrupted partial must survive and be marked stopped.
    page.wait_for_timeout(1500)
    kept = assistant_chars(page) >= 40
    check(f"round {round_no}: interrupted partial answer kept ({before} chars at cut)", kept)
    body = page.locator("body").inner_text()
    check(f"round {round_no}: interrupted reply marked 'stopped'", "· stopped" in body)
    # And the fresh answer must stream in and finish.
    if not wait_idle(page, 150):
        check(f"round {round_no}: fresh answer completes", False)
        return False
    final = assistant_chars(page)
    check(f"round {round_no}: fresh answer completes ({final} chars)", final > 100)
    return True


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        page.set_default_timeout(30000)
        page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: page_errors.append(str(e)))
        page.on("response", lambda r: failed_responses.append(f"{r.status} {r.url}") if r.status >= 400 else None)
        page.on("request", lambda r: chat_requests.append(f"{r.method} {r.url}") if "chat/completions" in r.url else None)
        page.on("response", lambda r: chat_requests.append(f"→ {r.status} {r.url[:90]}") if "chat/completions" in r.url else None)

        print("== login → /freellm/playground ==")
        medq_login(page)
        page.evaluate("localStorage.removeItem('freellmapi_dashboard_token')")
        # Pin a fast, stable chat model: the auto chain currently also tries
        # non-chat zai media models (image-gen/web-search/image-edit → 400)
        # and zai-vision occasionally stalls past the 45s fallback budget —
        # router-side flakiness that is orthogonal to this feature test.
        page.evaluate("localStorage.setItem('playground.model', 'zai-llm')")
        page.goto(f"{BASE}/freellm/playground", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(6000)
        check("playground composer is up", composer(page).count() > 0)

        ok1 = interrupt_round(
            page, 1,
            "Write a detailed patient guide about anemia: causes, symptoms, classification and treatment.",
            "Now also include a short section about jaundice.",
            use_enter=False,
        )

        ok2 = False
        if ok1:
            ok2 = interrupt_round(
                page, 2,
                "List the 8 most important lab tests for evaluating anemia, with a one-line reason for each.",
                "Make it 10 tests instead, and add normal ranges.",
                use_enter=True,
            )

        page.screenshot(path="/home/z/my-project/download/freellm-playground-send-midstream.png")
        browser.close()

    noise = [e for e in console_errors if "404" not in e and "favicon" not in e.lower()]
    print(f"\nconsole errors: {len(console_errors)} (non-noise: {len(noise)})")
    for e in console_errors[:8]:
        print(f"  - {e[:200]}")
    print(f"page errors: {len(page_errors)}")
    for e in page_errors[:8]:
        print(f"  - {e[:200]}")
    check("zero page errors", len(page_errors) == 0)
    check("zero real console errors", len(noise) == 0)

    failed = [r for r in results if not r[1]]
    print(f"\n{len(results) - len(failed)}/{len(results)} checks passed")
    if failed:
        print("FAILED:")
        for name, _, detail in failed:
            print(f"  - {name}  [{detail}]")
    sys.exit(1 if failed or not (ok1 and ok2) else 0)


if __name__ == "__main__":
    main()
