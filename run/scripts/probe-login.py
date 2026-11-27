"""Probe: after UI login, what does the header show?"""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    page.locator("input[type=email]").first.fill("admin@medq.com")
    page.locator("input[type=password]").first.fill("test123")
    page.locator("button:has-text('Sign In')").first.click()

    for wait in (3000, 5000, 8000):
        page.wait_for_timeout(wait if wait == 3000 else wait - 3000)
        print(f"\n--- after {wait//1000}s, url={page.url} ---")
        # header buttons (top area, exclude sidebar links)
        for el in page.locator("header button, nav button, [class*='header'] button").all()[:20]:
            try:
                txt = (el.inner_text() or "").strip().replace("\n", "|")[:40]
                if txt:
                    print(f"  headerbtn: {txt}")
            except Exception:
                pass
        # any element containing Admin User
        n = page.locator("text=Admin User").count()
        print(f"  'Admin User' text nodes: {n}")
        if n:
            break
    page.screenshot(path="/home/z/my-project/tmp/probe-after-login.png")
    browser.close()
print("DONE")
