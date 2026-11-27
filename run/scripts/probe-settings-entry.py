"""Probe: how is Settings opened on /home, and where is 'Manage API keys'."""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    email = page.locator("input[type=email]").first
    email.click(); email.type("admin@medq.com", delay=20)
    pwd = page.locator("input[type=password]").first
    pwd.click(); pwd.type("test123", delay=20)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(5000)
    page.goto(f"{BASE}/home", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(4000)

    # enumerate candidate triggers
    for sel in [
        "button:has-text('Settings')",
        "[aria-label*='ettings']",
        "button:has(svg.lucide-settings)",
        "[data-testid*='settings']",
        "a:has-text('Settings')",
    ]:
        loc = page.locator(sel)
        print(f"{sel!r}: count={loc.count()}")
        if loc.count():
            try:
                loc.first.click()
                page.wait_for_timeout(1500)
                print("   clicked first; body now has 'Manage API keys':",
                      page.locator("button:has-text('Manage API keys')").count())
                if page.locator("button:has-text('Manage API keys')").count() == 0:
                    # maybe inside a submenu — dump dialog-ish text
                    body = page.locator("body").inner_text()[:1500]
                    print("   --- body preview ---")
                    print(body)
                break
            except Exception as e:
                print("   click failed:", str(e)[:200])

    page.screenshot(path="/home/z/my-project/tmp/probe-settings.png", full_page=False)
    browser.close()
print("DONE")
