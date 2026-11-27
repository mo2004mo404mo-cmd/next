"""Explore /ai-classroom: find generation toolbar + media popover + video settings."""
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
    page.wait_for_timeout(5000)

    page.goto(f"{BASE}/ai-classroom", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(4000)
    print("URL:", page.url)

    # look for the media popover trigger (SlidersHorizontal icon button)
    for sel in ["button:has(svg.lucide-sliders-horizontal)",
                "button[aria-label*='edia']",
                "button:has(svg.lucide-video)"]:
        loc = page.locator(sel)
        print(f"trigger '{sel}': {loc.count()}")

    # dump buttons
    print("\n--- buttons on page ---")
    for el in page.locator("button").all()[:60]:
        try:
            txt = (el.inner_text() or "").strip().replace("\n", " | ")[:50]
            aria = el.get_attribute("aria-label") or ""
            icon = el.locator("svg").count()
            if txt or aria or icon:
                print(f"  btn: '{txt}' aria={aria} icons={icon}")
        except Exception:
            pass
    browser.close()
print("\nDONE")
