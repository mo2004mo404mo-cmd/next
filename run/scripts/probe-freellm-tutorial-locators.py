"""Fast locator probe for the narrated /freellm tutorial recording.

Walks the exact interaction chain of record-freellm-narrated-tutorial.py but
without narration holds, verifying every locator exists and is clickable.
Prints PASS/FAIL per step so broken selectors can be fixed BEFORE the long
recording run.
"""
import sys

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
RESULTS = []


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
        RESULTS.append((name, False, f"{type(e).__name__}: {str(e)[:100]}"))
        print(f"  FAIL  {name}  ({type(e).__name__}: {str(e)[:100]})")
        return None


def wait_dashboard(page, timeout_s=30):
    for _ in range(timeout_s):
        if "MedQ AI Router" in page.locator("body").inner_text():
            return True
        page.wait_for_timeout(1000)
    return False


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        page.set_default_timeout(15000)

        print("== MedQ login ==")
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        check("email input", lambda: page.locator("input[type=email]").count())
        check("password input", lambda: page.locator("input[type=password]").count())
        check("Sign In button", lambda: page.locator("button:has-text('Sign In')").count())
        page.locator("input[type=email]").first.type("admin@medq.com", delay=5)
        page.locator("input[type=password]").first.type("test123", delay=5)
        page.locator("button:has-text('Sign In')").first.click()
        check("leaves /login after sign-in",
              lambda: (page.wait_for_url(lambda u: "/login" not in u, timeout=20000), True)[1])

        print("== sidebar -> /freellm ==")
        sidebar_found = 0
        for _ in range(15):
            sidebar_found = page.locator("a:has-text('AI Router')").count()
            if sidebar_found:
                break
            page.wait_for_timeout(1000)
        check("AI Router sidebar entry (waits for render)", lambda: sidebar_found)
        page.locator("a:has-text('AI Router')").first.click()
        check("dashboard boots (auto-bridge)", lambda: wait_dashboard(page))
        page.wait_for_timeout(2500)

        print("== models page ==")
        check("search input", lambda: page.locator("input[placeholder*='Search models']").count())
        page.locator("input[placeholder*='Search models']").first.type("medgemma", delay=5)
        page.wait_for_timeout(1500)
        check("model row after search", lambda: page.locator("a[href*='/models/chat/']").count())
        page.locator("a[href*='/models/chat/']").first.click()
        page.wait_for_timeout(2000)
        check("model detail url", lambda: "/models/chat/" in page.url)
        page.locator("header nav a:has-text('Models')").first.click()
        page.wait_for_timeout(1500)
        check("strategy pill Balanced", lambda: page.locator("button:has-text('Balanced')").count())
        check("strategy pill Fastest", lambda: page.locator("button:has-text('Fastest')").count())

        print("== models dropdown ==")
        check("models dropdown trigger", lambda: page.locator("button[aria-label='Browse model types']").count())
        page.locator("button[aria-label='Browse model types']").first.click()
        page.wait_for_timeout(800)
        check("Image menu item", lambda: page.locator("[role=menuitem]:has-text('Image')").count())
        page.locator("[role=menuitem]:has-text('Image')").first.click()
        page.wait_for_timeout(2000)
        check("image page url", lambda: "/models/image" in page.url)
        page.locator("header nav a:has-text('Models')").first.click()
        page.wait_for_timeout(1500)

        print("== playground ==")
        page.locator("header nav a:has-text('Playground')").first.click()
        page.wait_for_timeout(2500)
        check("playground url", lambda: "/playground" in page.url)
        check("textarea", lambda: page.locator("textarea").count())
        page.locator("textarea").last.type("ping", delay=5)
        page.wait_for_timeout(800)
        check("send button (after typing)",
              lambda: page.locator("button[aria-label='Send'], "
                                   "button:has(svg.lucide-arrow-up)").count())

        print("== keys page ==")
        page.locator("header nav a:has-text('Keys')").first.click()
        page.wait_for_timeout(2500)
        check("keys url", lambda: "/keys" in page.url)
        check("Add key button", lambda: page.locator("button:has-text('Add key')").count())
        page.locator("button:has-text('Add key')").first.click()
        page.wait_for_timeout(1500)
        check("add-key dialog (Escape to close)", lambda: page.keyboard.press("Escape") or True)
        page.wait_for_timeout(700)

        print("== keys tabs ==")
        for label in ["Unified API key", "Quota signals", "Anthropic", "Agents"]:
            sel = (f"button[role=tab]:has-text('{label}'), "
                   f"[role=tab]:has-text('{label}'), button:has-text('{label}')")
            check(f"tab {label}", lambda s=sel: page.locator(s).count())
        # switch to Unified API key for the link card check
        sel = ("button[role=tab]:has-text('Unified API key'), "
               "button:has-text('Unified API key')")
        page.locator(sel).first.click()
        page.wait_for_timeout(2000)
        check("Link with MedQ generation card",
              lambda: page.locator("text=Link with MedQ generation").count())
        check("link/refresh button",
              lambda: page.locator("button:has-text('Link router to MedQ'), "
                                   "button:has-text('Refresh linked models')").count())

        print("== agents / analytics / logs ==")
        page.locator("header nav a:has-text('Agents')").first.click()
        page.wait_for_timeout(2000)
        check("agents url", lambda: "/agents" in page.url)
        page.locator("header nav a:has-text('Analytics')").first.click()
        page.wait_for_timeout(2000)
        check("analytics url", lambda: "/analytics" in page.url)
        check("analytics dropdown trigger",
              lambda: page.locator("button[aria-label='Analytics pages']").count())
        page.locator("button[aria-label='Analytics pages']").first.click()
        page.wait_for_timeout(800)
        check("Logs menu item", lambda: page.locator("[role=menuitem]:has-text('Logs')").count())
        page.locator("[role=menuitem]:has-text('Logs')").first.click()
        page.wait_for_timeout(2000)
        check("logs url", lambda: "/logs" in page.url)

        print("== account menu ==")
        menu_btn = page.locator("header button").filter(has=page.locator("svg.lucide-ellipsis"))
        check("ellipsis account button", lambda: menu_btn.count())
        menu_btn.first.click()
        page.wait_for_timeout(1000)
        check("Settings menu item", lambda: page.locator("[role=menuitem]:has-text('Settings')").count())
        check("Back to MedQ menu item", lambda: page.locator("[role=menuitem]:has-text('Back to MedQ')").count())
        page.locator("[role=menuitem]:has-text('Settings')").first.click()
        page.wait_for_timeout(1500)
        check("settings dialog opens", lambda: page.locator("[role=dialog]").count())
        page.keyboard.press("Escape")
        page.wait_for_timeout(700)
        menu_btn.first.click()
        page.wait_for_timeout(1000)
        page.locator("[role=menuitem]:has-text('Back to MedQ')").first.click()
        check("Back to MedQ lands on /home",
              lambda: (page.wait_for_url("**/home**", timeout=20000), True)[1])

        ctx.close()
        browser.close()

    fails = [r for r in RESULTS if not r[1]]
    print(f"\n{len(RESULTS) - len(fails)}/{len(RESULTS)} locator checks passed")
    if fails:
        print("FAILED:")
        for name, _, detail in fails:
            print(f"  - {name}: {detail}")
        sys.exit(1)


if __name__ == "__main__":
    main()
    import os
    os._exit(0)
