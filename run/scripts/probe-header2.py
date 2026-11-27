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
    inv = page.evaluate("""() => {
        const h = document.querySelector('header');
        if (!h) return 'NO HEADER';
        const right = h.querySelector('div.flex.items-center.justify-between')?.lastElementChild;
        if (!right) return 'no right container';
        return Array.from(right.children).map(c => {
            const label = c.getAttribute('aria-label') || (c.textContent || '').slice(0, 30);
            return `${c.tagName}[${label}]`;
        }).join('  ');
    }""")
    print("header right inventory:", inv)
    # also check: is this maybe the /home DashboardTab header? print current route
    print("url:", page.url)
    # session via useSession? check window.__NEXTAUTH__ or exposed state — try React devtools hack: not available. Instead check network: did useSession fetch happen?
    reqs = []
    page2 = ctx.new_page()
    page2.on("response", lambda r: reqs.append(f"{r.status} {r.url[-60:]}") if "session" in r.url else None)
    page2.goto(BASE + "/", wait_until="networkidle", timeout=60000)
    page2.wait_for_timeout(6000)
    print("session requests on /:", reqs)
    browser.close()
