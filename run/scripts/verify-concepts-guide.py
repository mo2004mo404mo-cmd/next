"""E2E verification: the 'How models & providers work' concepts guide.

Surfaces to verify:
  1. /freellm/keys (the rebranded AI Router dashboard mount) — header 'Guide'
     button opens the dialog; all 4 sections + glossary terms render.
  2. /freellmapi/keys (the passthrough mount to the sidecar) — same Guide
     button present (regression: both mounts share one source).
  3. MedQ app (Settings → AI Providers / ByokHub) — 'How it works' button
     opens the MedQ-styled guide dialog.
"""
import sys

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
MEDQ_EMAIL = "admin@medq.com"
MEDQ_PASSWORD = "test123"

results = []


def check(name, passed, detail=None):
    results.append((name, bool(passed), detail))
    print(f"  {'PASS' if passed else 'FAIL'}  {name}" + (f"  [{detail}]" if detail else ""))


def medq_login(page):
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    email = page.locator("input[type=email]").first
    email.click()
    email.type(MEDQ_EMAIL, delay=20)
    pwd = page.locator("input[type=password]").first
    pwd.click()
    pwd.type(MEDQ_PASSWORD, delay=20)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(5000)
    page.goto(f"{BASE}/home", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(4000)


def verify_router_guide(page, mount):
    """On a dashboard mount: open /keys, click Guide, assert dialog content."""
    page.goto(f"{BASE}{mount}/keys", wait_until="domcontentloaded", timeout=60000)
    # wait past the auth-gate auto-bridge
    for _ in range(30):
        text = page.locator("body").inner_text()
        if "MedQ AI Router" in text and ("Add key" in text or "Guide" in text):
            break
        page.wait_for_timeout(1000)

    btn = page.locator("button:has-text('Guide')").first
    check(f"[{mount}] Guide button visible in Keys header", btn.count() > 0 or btn.is_visible())
    btn.click()
    page.wait_for_timeout(1200)

    body = page.locator("body").inner_text()
    for label in [
        "How models & providers work",
        "Two layers, one model picker",
        "Where do I add what?",
        "The four words",
        "Custom provider / custom endpoint",
        "Added a model but don't see it?",
        "medq-router",
        "Link with MedQ generation",
    ]:
        check(f"[{mount}] guide shows: {label!r}", label in body)

    # close the dialog
    close = page.locator("[aria-label='Dismiss'], button:has-text('Dismiss')")
    if close.count():
        close.first.click()
        page.wait_for_timeout(600)


def verify_medq_guide(page):
    """MedQ shell: Settings → AI Providers → 'How it works'."""
    page.goto(f"{BASE}/home", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(4000)

    # open settings
    for sel in ["button:has-text('Settings')", "[aria-label*='ettings']", "button:has(svg.lucide-settings)"]:
        loc = page.locator(sel)
        if loc.count():
            loc.first.click()
            page.wait_for_timeout(1500)
            break
    else:
        check("[medq] settings entry found", False)
        return

    btn = page.locator("button:has-text('Manage API keys')")
    check("[medq] 'Manage API keys' entry found", btn.count() > 0)
    if not btn.count():
        return
    btn.first.click()
    page.wait_for_timeout(2500)

    guide_btn = page.locator("button:has-text('How it works')")
    check("[medq] 'How it works' button in AI Providers header", guide_btn.count() > 0)
    if not guide_btn.count():
        page.screenshot(path="/home/z/my-project/tmp/guide-medq-nobutton.png")
        return
    guide_btn.first.click()
    page.wait_for_timeout(1200)

    body = page.locator("body").inner_text()
    for label in [
        "How models & providers work",
        "The mental model — two layers, one picker",
        "Where do I add what?",
        "The four words",
        "Custom provider / custom endpoint",
        "Added a model but don't see it?",
        "medq-router",
    ]:
        check(f"[medq] guide shows: {label!r}", label in body)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        page = ctx.new_page()

        print("== 1. /freellm dashboard: Concepts guide ==")
        medq_login(page)
        verify_router_guide(page, "/freellm")

        print("== 2. /freellmapi mount: same guide (regression) ==")
        verify_router_guide(page, "/freellmapi")

        print("== 3. MedQ Settings → AI Providers: How it works ==")
        verify_medq_guide(page)

        page.screenshot(path="/home/z/my-project/tmp/guide-verify-final.png")
        browser.close()

    fails = [r for r in results if not r[1]]
    print(f"\n{len(results) - len(fails)}/{len(results)} PASS")
    if fails:
        sys.exit(1)


if __name__ == "__main__":
    main()
