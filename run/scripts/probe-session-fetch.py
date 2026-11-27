from playwright.sync_api import sync_playwright
BASE = "http://127.0.0.1:3000"
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    page.goto(f"{BASE}/login", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(3000)
    page.locator("input[type=email]").first.fill("admin@medq.com")
    page.locator("input[type=password]").first.fill("test123")

    reqs = []
    page.on("response", lambda r: reqs.append(f"{r.status} {r.request.method} {r.url[:90]}") if ("auth/session" in r.url or "auth/csrf" in r.url) else None)

    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(10000)
    print("auth requests seen:")
    for r in reqs:
        print("  ", r)
    if not reqs:
        print("   (none!)")
    print("Admin User text count:", page.locator("text=Admin User").count())
    browser.close()
