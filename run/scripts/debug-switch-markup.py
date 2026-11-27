"""Debug: open the Add Custom Model dialog and dump the capabilities section
HTML so the vision switch locator can be written against real markup."""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.set_default_timeout(15000)

    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    page.locator("input[type=email]").first.type("admin@medq.com", delay=5)
    page.locator("input[type=password]").first.type("test123", delay=5)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_url(lambda u: "/login" not in u, timeout=20000)
    for _ in range(15):
        if page.locator("a:has-text('AI Router')").count():
            break
        page.wait_for_timeout(1000)
    page.locator("a:has-text('AI Router')").first.click()
    for _ in range(30):
        if "MedQ AI Router" in page.locator("body").inner_text():
            break
        page.wait_for_timeout(1000)
    page.wait_for_timeout(2000)

    page.locator("header nav a:has-text('Keys')").first.click()
    page.wait_for_timeout(2500)
    page.locator("button[aria-label='Add Custom Model']").first.click()
    page.wait_for_timeout(1800)

    html = page.locator("[role=dialog]").first.inner_html()
    # print the region around 'vision'
    idx = html.lower().find("switch-vision")
    print("...dialog html around switch-vision...\n")
    print(html[max(0, idx - 700):idx + 700])
    browser.close()
