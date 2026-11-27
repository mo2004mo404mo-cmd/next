"""Probe 2: dump the actual header DOM after login."""
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

    # session state
    sess = page.evaluate("fetch('/api/auth/session').then(r => r.json()).catch(e => 'ERR')")
    print("session user:", sess.get("user", {}).get("name") if isinstance(sess, dict) else sess)

    # dump last 6 buttons in the header
    hdr = page.locator("header").first
    if hdr.count():
        html = hdr.evaluate("e => e.outerHTML")
        print("header length:", len(html))
        print(html[-3000:])
    else:
        print("no <header> element; body snippet:")
        print(page.evaluate("document.body.innerHTML.slice(0, 500)"))
    browser.close()
