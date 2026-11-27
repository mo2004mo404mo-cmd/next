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
    page.wait_for_timeout(9000)
    checks = {
        "button.rounded-xl (UserMenu trigger)": "button.rounded-xl",
        "img in header": "header img",
        "svg chevron-down in header": "header svg.lucide-chevron-down",
        "any [data-slot=dropdown-menu-trigger]": "[data-slot*='dropdown-menu-trigger']",
        "text Admin anywhere": "text=/admin/i",
    }
    for name, sel in checks.items():
        try:
            print(f"{name}: {page.locator(sel).count()}")
        except Exception as e:
            print(f"{name}: ERR {e}")
    # what does the header right side actually contain? count children
    n = page.evaluate("""() => {
        const h = document.querySelector('header');
        if (!h) return 'no header';
        const right = h.querySelectorAll('div')[h.querySelectorAll('div').length-1];
        return Array.from(right.children).map(c => c.tagName + '.' + (c.className||'').toString().slice(0,40)).join(' | ');
    }""")
    print("header right children:", n)
    browser.close()
