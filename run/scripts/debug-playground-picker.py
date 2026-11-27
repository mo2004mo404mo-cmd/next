"""Debug: open the Playground model combobox and list the options it offers
(after kilo/llm7/zai keys exist), so the recorder picks a real, correct one."""
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

    page.locator("header nav a:has-text('Playground')").first.click()
    page.wait_for_timeout(2800)

    # the current model label shown on the trigger
    trig = page.locator("button[aria-label='Select model']").first
    print("trigger text:", trig.inner_text().replace("\n", " | ")[:120])
    trig.click()
    page.wait_for_timeout(800)
    # type a search
    inp = page.locator("input:visible").last
    print("search input placeholder:", inp.get_attribute("placeholder"))
    inp.type("liquid", delay=25)
    page.wait_for_timeout(900)
    opts = page.locator("[role=listbox] button, [data-radix-popper-content-wrapper] button, "
                        "body >> xpath=//div[contains(@class,'popover')]//button")
    n = page.locator("button:visible").count()
    print("visible buttons:", n)
    texts = page.eval_on_selector_all(
        "button",
        "els => els.filter(e => e.offsetParent !== null).map(e => e.innerText.replace(/\\n/g,' | ')).filter(t => t && t.length < 90)")
    print("visible button texts (filtered):")
    for t in texts[:40]:
        print("  -", t)
    browser.close()
