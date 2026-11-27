from playwright.sync_api import sync_playwright
BASE = "http://127.0.0.1:3000"
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    msgs = []
    page.on("console", lambda m: msgs.append(f"{m.type}: {m.text[:150]}"))
    page.on("pageerror", lambda e: msgs.append(f"PAGEERROR: {str(e)[:200]}"))
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    page.locator("input[type=email]").first.fill("admin@medq.com")
    page.locator("input[type=password]").first.fill("test123")
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(9000)
    for m in msgs:
        if "error" in m.lower() or "warn" in m.lower() or "PAGEERROR" in m:
            print(m)
    print("---total messages:", len(msgs))
    # check useSession state via exposed __NEXT_DATA__? print whether header has avatar img anywhere in body
    print("img avatars in body:", page.locator("img[src*='avatar'], img[src*='user']").count())
    print("chevron-down svgs in body:", page.locator("svg.lucide-chevron-down").count())
    browser.close()
