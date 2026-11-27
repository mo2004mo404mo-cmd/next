"""Deep debug: browser-side view of the Playground chat request (pinned model)."""
import json
import time

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
events = []
consoles = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 900})
    page = ctx.new_page()
    page.set_default_timeout(30000)

    page.on("console", lambda m: consoles.append(f"{m.type}: {m.text[:220]}"))

    def log(kind, r):
        url = getattr(r, "url", "")
        if "chat/completions" in url or "api-key" in url or "conversations" in url:
            body = ""
            try:
                body = (r.post_data or "")[:300]
            except Exception:
                body = ""
            method = getattr(r, "method", "") or "?"
            events.append(f"{kind} {method} {url.split('3000')[-1]} body={body}")

    page.on("request", lambda r: log("REQ ", r))
    page.on("response", lambda r: log("RESP", r))
    page.on("requestfailed", lambda r: log("FAIL", r))
    page.on("requestfinished", lambda r: log("DONE", r))

    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    page.locator("input[type=email]").first.type("admin@medq.com", delay=10)
    page.locator("input[type=password]").first.type("test123", delay=10)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(4000)

    page.evaluate("localStorage.removeItem('freellmapi_dashboard_token')")
    page.evaluate("localStorage.setItem('playground.model', 'zai-llm')")
    page.goto(f"{BASE}/freellm/playground", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(6000)

    box = page.locator('textarea[placeholder^="Type a message"]').first
    box.click()
    box.type("Write a detailed patient guide about anemia: causes, symptoms, classification and treatment.", delay=5)
    page.keyboard.press("Enter")

    for i in range(18):  # 72s of watching
        page.wait_for_timeout(4000)
        loc = page.locator('div[class*="group/msg"][class*="items-start"]')
        n = loc.count()
        chars = len(loc.last().inner_text()) if n else 0
        if i % 3 == 0:
            print(f"  t={4 * (i + 1)}s assistant_rows={n} chars={chars}")

    print("\n== browser events ==")
    for e in events:
        print(" ", e[:260])
    print("\n== console ==")
    for c in consoles[:20]:
        print(" ", c)
    page.screenshot(path="/home/z/my-project/tmp/debug-deep.png")
    browser.close()
