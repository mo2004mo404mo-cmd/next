"""Debug: what does the Playground's chat request look like in the browser?"""
import json
import time

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
reqs = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 900})
    page = ctx.new_page()
    page.set_default_timeout(30000)

    def on_request(r):
        if any(k in r.url for k in ("chat/completions", "api-key", "conversations", "/v1/")):
            reqs.append({
                "method": r.method,
                "url": r.url,
                "auth": (r.headers.get("authorization") or "")[:16],
                "post": (r.post_data or "")[:120],
            })

    page.on("request", on_request)
    page.on("response", lambda r: print(f"  resp {r.status} {r.url[:110]}")
            if any(k in r.url for k in ("chat/completions", "api-key")) else None)

    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    page.locator("input[type=email]").first.type("admin@medq.com", delay=10)
    page.locator("input[type=password]").first.type("test123", delay=10)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(4000)

    page.evaluate("localStorage.removeItem('freellmapi_dashboard_token')")
    page.goto(f"{BASE}/freellm/playground", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(6000)

    box = page.locator('textarea[placeholder^="Type a message"]').first
    box.click()
    box.type("Write a detailed patient guide about anemia: causes, symptoms, classification and treatment.", delay=5)
    page.keyboard.press("Enter")
    page.wait_for_timeout(25000)

    body = page.locator("body").inner_text()
    print("\n== transcript region ==")
    idx = body.find("Hello there")
    print(body[max(0, idx - 100): idx + 400] if idx >= 0 else "prompt not found on screen")
    print("\n== captured requests ==")
    for r in reqs:
        print(" ", json.dumps(r))
    page.screenshot(path="/home/z/my-project/tmp/debug-chat-request.png")
    browser.close()
