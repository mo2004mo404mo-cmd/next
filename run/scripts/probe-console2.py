from playwright.sync_api import sync_playwright
BASE = "http://127.0.0.1:3000"
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    msgs = []
    page.on("console", lambda m: msgs.append(f"[{m.type}] {m.text[:200]}"))
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    page.locator("input[type=email]").first.fill("admin@medq.com")
    page.locator("input[type=password]").first.fill("test123")
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(10000)
    for m in msgs:
        print(m)
    # Also probe: session requests
    reqs = []
    page.on("response", lambda r: reqs.append(f"{r.status} {r.url}") if "auth/session" in r.url else None)
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(8000)
    print("\nsession fetches after reload:", reqs)
    print("Admin User count:", page.locator("text=Admin User").count())
    browser.close()
