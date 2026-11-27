"""Locator probe for the real-cases video (adding providers & models in /freellm).

Walks the exact interaction chain of record-real-cases-video.py WITHOUT
recording and WITHOUT narration holds, verifying every locator exists and
works. Prints PASS/FAIL per step so broken selectors are fixed BEFORE the
long recording run.

This probe MUTATES state (adds kilo, llm7, the Z.AI custom provider, models).
Run scripts/reset-freellm-demo.sh afterwards to restore the clean slate.
"""
import sys
import time

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
RESULTS = []

ZAI_URL = "https://ollama2.space-z.ai/v1"
SIX = ["zai-asr", "zai-image-edit", "zai-image-gen",
       "zai-tts", "zai-web-reader", "zai-web-search"]
QUESTION = ("What is the normal potassium level in blood? "
            "Answer in one short sentence.")


def check(name, fn):
    try:
        val = fn()
        if val is False or val is None or val == 0:
            RESULTS.append((name, False, f"returned {val!r}"))
            print(f"  FAIL  {name}  (returned {val!r})")
        else:
            RESULTS.append((name, True, str(val)[:80]))
            print(f"  PASS  {name}")
        return val
    except Exception as e:  # noqa: BLE001
        RESULTS.append((name, False, f"{type(e).__name__}: {str(e)[:110]}"))
        print(f"  FAIL  {name}  ({type(e).__name__}: {str(e)[:110]})")
        return None


def wait_dashboard(page, timeout_s=30):
    for _ in range(timeout_s):
        if "MedQ AI Router" in page.locator("body").inner_text():
            return True
        page.wait_for_timeout(1000)
    return False


def dialog(page):
    return page.locator("[role=dialog]").first


def pick_combobox(page, trigger_aria, search, option_text):
    """Open a ModelCombobox, type a search, click the matching option."""
    trig = page.locator(f"button[aria-label='{trigger_aria}']").first
    trig.click()
    page.wait_for_timeout(700)
    box = page.locator("[role=dialog], [data-radix-popper-content-wrapper], "
                       "[role=listbox]").last
    inp = page.locator("input:visible").last  # combobox search auto-focuses
    inp.type(search, delay=25)
    page.wait_for_timeout(700)
    opt = page.locator(f"button:has-text('{option_text}')").last
    opt.click()
    page.wait_for_timeout(600)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        page.set_default_timeout(15000)

        print("== MedQ login ==")
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        page.locator("input[type=email]").first.type("admin@medq.com", delay=5)
        page.locator("input[type=password]").first.type("test123", delay=5)
        page.locator("button:has-text('Sign In')").first.click()
        check("leaves /login",
              lambda: (page.wait_for_url(lambda u: "/login" not in u, timeout=20000), True)[1])

        print("== sidebar -> AI Router ==")
        for _ in range(15):
            if page.locator("a:has-text('AI Router')").count():
                break
            page.wait_for_timeout(1000)
        check("AI Router sidebar entry", lambda: page.locator("a:has-text('AI Router')").count())
        page.locator("a:has-text('AI Router')").first.click()
        check("dashboard boots (auto-bridge)", lambda: wait_dashboard(page))
        page.wait_for_timeout(2500)

        print("== Keys page ==")
        page.locator("header nav a:has-text('Keys')").first.click()
        page.wait_for_timeout(2500)
        check("keys url", lambda: "/keys" in page.url)
        check("Add key button", lambda: page.locator("button:has-text('Add key')").count())

        print("== CASE 1: built-in kilo (keyless) ==")
        page.locator("button:has-text('Add key')").first.click()
        page.wait_for_timeout(1500)
        check("add-key dialog opens", lambda: page.locator("[role=dialog]").count())
        check("Provider (Platform) combobox trigger",
              lambda: page.locator("button[aria-label='Platform']").count())
        pick_combobox(page, "Platform", "Kilo", "Kilo Gateway")
        check("kilo key input shows Optional placeholder",
              lambda: page.locator("[role=dialog] input[placeholder='Optional']").count())
        check("Enable submit (keyless)", lambda: page.locator("[role=dialog] button:has-text('Enable')").count())
        page.locator("[role=dialog] button:has-text('Enable')").first.click()
        page.wait_for_timeout(3000)
        check("kilo row appears", lambda: page.locator("text=Kilo Gateway").count())

        print("== CASE 2: built-in llm7 (anonymous) ==")
        page.locator("button:has-text('Add key')").first.click()
        page.wait_for_timeout(1500)
        pick_combobox(page, "Platform", "LLM7", "LLM7 (anon ok)")
        key_input = page.locator("[role=dialog] input[type=password]").first
        check("llm7 key input", lambda: key_input.count())
        key_input.fill("no-key")
        page.locator("[role=dialog] button:has-text('Add key')").last.click()
        page.wait_for_timeout(3000)
        # scope picker may appear — dismiss with Escape (key stays as added)
        for _ in range(3):
            if page.locator("[role=dialog]").count():
                page.keyboard.press("Escape")
                page.wait_for_timeout(900)
            else:
                break
        check("llm7 row appears", lambda: page.locator("text=LLM7").count())

        print("== CASE 3: custom provider (Z.AI gateway) ==")
        page.locator("button:has-text('Add key')").first.click()
        page.wait_for_timeout(1500)
        pane = page.locator("button:has-text('Custom endpoint')")
        check("Custom endpoint pane button", lambda: pane.count())
        pane.first.click()
        page.wait_for_timeout(900)
        url_in = page.locator("input[placeholder^='http://127.0.0.1:11434']")
        check("base URL input", lambda: url_in.count())
        url_in.fill(ZAI_URL)
        models_ta = page.locator("[role=dialog] textarea").first
        check("models textarea", lambda: models_ta.count())
        models_ta.fill("zai-llm")
        submit = page.locator("[role=dialog] button:has-text('Add model')")
        check("Add model submit", lambda: submit.count())
        submit.first.click()
        page.wait_for_timeout(3500)
        check("zai endpoint row appears", lambda: page.locator("text=ollama2.space-z.ai").count())

        print("== CASE 4: discovery (Fetch models) ==")
        fetch = page.locator("button[aria-label='Fetch models']")
        check("Fetch models button on custom row", lambda: fetch.count())
        fetch.first.click()
        page.wait_for_timeout(2500)
        check("discover dialog title", lambda: page.locator("text=Models on this endpoint").count())
        boxes = page.locator("[role=dialog] input[type=checkbox]:not([disabled])")
        check("discovered models listed (7 new selectable)", lambda: boxes.count())
        for m in SIX:
            row = page.locator(f"[role=dialog] label:has-text('{m}')")
            if row.count():
                row.first.click()
                page.wait_for_timeout(220)
        reg = page.locator("[role=dialog] button:has-text('Add 6 models')")
        check("Add 6 models button", lambda: reg.count())
        reg.first.click()
        page.wait_for_timeout(3000)

        print("== CASE 5: add model BY HAND ==")
        add_model = page.locator("button[aria-label='Add Custom Model']")
        check("Add Custom Model button on row", lambda: add_model.count())
        add_model.first.click()
        page.wait_for_timeout(1500)
        mid = page.locator("#provider-model-id")
        check("model id input", lambda: mid.count())
        mid.fill("zai-vision")
        dn = page.locator("#provider-display-name")
        check("display name input", lambda: dn.count())
        dn.fill("Z.AI Vision")
        vis = page.locator("[role=dialog] [role='switch']").nth(1)  # vision (tools is #1)
        check("vision switch", lambda: page.locator("[role=dialog] [role='switch']").count())
        vis.click()
        page.wait_for_timeout(400)
        addbtn = page.locator("[role=dialog] button:has-text('Create Model')")
        check("Create Model submit", lambda: addbtn.count())
        addbtn.first.click()
        page.wait_for_timeout(3000)

        print("== Models page: our rows ==")
        page.locator("header nav a:has-text('Models')").first.click()
        page.wait_for_timeout(2500)
        search = page.locator("input[placeholder*='Search models']")
        check("models search input", lambda: search.count())
        search.fill("zai")
        page.wait_for_timeout(1800)
        check("zai model rows listed", lambda: page.locator("a[href*='/models/chat/']").count())

        print("== Test models on the custom row ==")
        page.locator("header nav a:has-text('Keys')").first.click()
        page.wait_for_timeout(2500)
        testb = page.locator("button[aria-label='Test models']")
        check("Test models button on row", lambda: testb.count())
        testb.first.click()
        page.wait_for_timeout(2500)
        check("test dialog opens", lambda: page.locator("[data-testid='test-models-list']").count())
        tbtn = page.locator("button[aria-label*='Vision']")
        check("test button for Z.AI Vision", lambda: tbtn.count())
        tbtn.first.click()
        page.wait_for_timeout(9000)
        check("test result shown (pass or fail)",
              lambda: page.locator("[data-testid='test-models-list'] [role=status]").count())
        page.keyboard.press("Escape")
        page.wait_for_timeout(900)

        print("== Playground: real chat ==")
        page.locator("header nav a:has-text('Playground')").first.click()
        page.wait_for_timeout(2800)
        check("playground url", lambda: "/playground" in page.url)
        # pick a model from a provider we added (llm7 works during the zai storm)
        pick_combobox(page, "Select model", "mistral", "Mistral Nemo Instruct 2407")
        ta = page.locator("textarea[placeholder*='Type a message']").first
        check("composer textarea", lambda: ta.count())
        ta.click()
        ta.type(QUESTION, delay=12)
        page.wait_for_timeout(600)
        clicked = check("send question", lambda: page.evaluate(
            """() => {
                const b = Array.from(document.querySelectorAll(
                    "button[aria-label='Send'], button[aria-label='Sending']"))
                    .find(x => x.getAttribute('data-show') === 'true');
                if (!b) return false;
                b.click(); return true;
            }"""))
        if not clicked:
            check("send via Enter", lambda: (ta.press("Enter"), True)[1])
        ok = False
        for _ in range(60):
            page.wait_for_timeout(1000)
            body = page.locator("body").inner_text()
            if "mmol" in body or "potassium" in body.lower() and "?" not in body[-200:]:
                ok = True
                break
        check("streamed answer arrived", lambda: ok)

        print("\n== SUMMARY ==")
        passed = sum(1 for r in RESULTS if r[1])
        print(f"{passed}/{len(RESULTS)} checks passed")
        for name, ok_, info in RESULTS:
            if not ok_:
                print(f"  FAIL {name}: {info}")
        browser.close()
        sys.exit(0 if passed == len(RESULTS) else 1)


if __name__ == "__main__":
    main()
