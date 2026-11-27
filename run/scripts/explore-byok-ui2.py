"""Explore v2: user menu -> Settings -> BYOK workspace + /ai-classroom media UI."""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"

def snap(page, label, n=50):
    print(f"\n===== {label} =====")
    try:
        els = page.locator("button, a, input, [role=dialog], [role=tab], [role=menuitem], h2, h3").all()
        shown = 0
        for el in els[:150]:
            try:
                txt = (el.inner_text() or "").strip().replace("\n", " | ")[:60]
                tag = el.evaluate("e => e.tagName.toLowerCase()")
                ph = el.get_attribute("placeholder") or ""
                aria = el.get_attribute("aria-label") or ""
                if txt or ph or aria:
                    extra = f" [ph:{ph}]" if ph else (f" [aria:{aria}]" if aria else "")
                    print(f"  <{tag}> {txt}{extra}")
                    shown += 1
                if shown >= n:
                    break
            except Exception:
                pass
    except Exception as e:
        print("  snap error:", e)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()

    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    page.locator("input[type=email]").first.fill("admin@medq.com")
    page.locator("input[type=password]").first.fill("test123")
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(5000)
    print("URL:", page.url)

    # ── user menu ──
    # header avatar/user button
    for sel in ["button:has-text('admin')", "button:has-text('Admin')",
                "[data-slot*='user'] button", "header button:last-child",
                "button:has(img)"]:
        try:
            loc = page.locator(sel)
            if loc.count():
                print(f"\nuser-menu candidate '{sel}': {loc.count()}")
        except Exception:
            pass
    snap(page, "HEADER AREA", 25)

    # try the generic avatar button
    clicked = False
    for sel in ["button[aria-label*='rofile']", "button:has-text('A')", "header button:has(svg)"]:
        loc = page.locator(sel)
        if loc.count():
            try:
                loc.last.click()
                page.wait_for_timeout(1200)
                menu = page.locator("[role=menuitem], [role=menu] button, button:has-text('Settings')")
                if menu.count():
                    print(f"\nmenu opened via {sel}")
                    snap(page, "USER MENU", 20)
                    clicked = True
                    break
                page.keyboard.press("Escape")
            except Exception:
                pass
    if not clicked:
        print("\nuser menu not opened; trying direct keyboard/profile")

    browser.close()
print("\nDONE")
