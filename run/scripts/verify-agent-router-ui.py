"""E2E: MedQ Agent chat through the FreeLLM AI Router (the user-facing link).

Flow: login → open the MedQ Agent floating panel → open the new model picker
→ search "medgemma" → select the medq-router model (BYOK group) → send "hi"
→ expect the router's reply (mock endpoint's chain text) → screenshot.
"""
import sys
import time

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
EMAIL = "admin@medq.com"
PASSWORD = "test123"
OUT = "/home/z/my-project/download/medq-agent-router-link.png"

ROUTER_REPLY_MARK = "MedQ AI Router chain"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        page.locator("input[type=email]").first.fill(EMAIL)
        page.locator("input[type=password]").first.fill(PASSWORD)
        page.locator("button:has-text('Sign In')").first.click()
        page.wait_for_timeout(5000)
        page.goto(f"{BASE}/", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(4000)
        print("login ok:", page.locator("body").inner_text()[:60].replace("\n", " "))

        # Open the MedQ Agent floating assistant.
        orb = page.locator('button[aria-label="AI Assistant"]')
        orb.wait_for(timeout=20000)
        orb.click()
        page.wait_for_timeout(2500)
        body = page.locator("body").inner_text()

        # The panel composer should now show the model chip (default "Auto").
        chip = page.locator("button:has-text('Auto')")
        if chip.count() == 0:
            print("FAIL: model chip not found in agent composer")
            page.screenshot(path="/tmp/agent-no-chip.png")
            browser.close()
            sys.exit(1)
        print("model chip visible (Auto default)")

        # Open the picker.
        chip.first.click()
        page.wait_for_timeout(800)

        # Search for the router model.
        search = page.locator("input[placeholder='Search models…']")
        search.wait_for(timeout=10000)
        search.fill("medgemma")

        # The BYOK group header carries the router badge.
        group_header = page.locator("text=MedQ AI Router (this app)").first
        print("router group in picker:", group_header.count() > 0 or "MedQ AI Router" in page.locator("body").inner_text())

        # Select the medgemma model entry (value medq-router:medgemma:latest).
        option = page.locator("button:has-text('medgemma:latest')").first
        option.click()
        page.wait_for_timeout(600)
        chip_text = page.locator("button:has-text('medgemma')").first.inner_text()
        print("chip now shows:", chip_text.strip())

        # Send a chat message through the router.
        composer = page.locator("input[placeholder='Ask me anything…']")
        composer.fill("hi")
        composer.press("Enter")

        # Wait for the streamed router reply.
        deadline = time.time() + 90
        found = False
        meta_model = None
        while time.time() < deadline:
            body = page.locator("body").inner_text()
            if ROUTER_REPLY_MARK in body:
                found = True
                break
            page.wait_for_timeout(2000)
        print("router reply streamed:", found)

        page.screenshot(path=OUT)
        print("screenshot:", OUT)
        browser.close()
        sys.exit(0 if found else 1)


if __name__ == "__main__":
    main()
