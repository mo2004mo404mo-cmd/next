from playwright.sync_api import sync_playwright
BASE = "http://127.0.0.1:3000"
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()

    # login via UI
    page.goto(f"{BASE}/login", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(3000)
    page.locator("input[type=email]").first.fill("admin@medq.com")
    page.locator("input[type=password]").first.fill("test123")
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(8000)
    print("after login url:", page.url)

    # now attach listener + RELOAD
    reqs = []
    page.on("response", lambda r: reqs.append(f"{r.status} {r.request.method} {r.url[:100]}") if "auth" in r.url else None)
    page.reload(wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(10000)
    print("auth-related requests after reload:")
    for r in reqs[:15]:
        print("  ", r)
    if not reqs:
        print("   (none)")
    print("Admin User count after reload:", page.locator("text=Admin User").count())
    print("chevron-down count:", page.locator("svg.lucide-chevron-down").count())
    browser.close()
