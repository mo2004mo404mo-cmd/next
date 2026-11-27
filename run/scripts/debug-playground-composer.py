"""Debug the playground composer: find the right textarea + working send.

Inspects every textarea on the playground page, types into the composer,
checks the send button's data-show state, clicks it, and verifies the answer
streams in.
"""
import json
import sys

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
QUESTION = ("A 58-year-old man has crushing substernal chest pain radiating to "
            "the left arm with diaphoresis. What is the most likely diagnosis?")


def main():
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
        page.wait_for_timeout(3000)

        for _ in range(15):
            if page.locator("a:has-text('AI Router')").count():
                break
            page.wait_for_timeout(1000)
        page.locator("a:has-text('AI Router')").first.click()
        for _ in range(30):
            if "MedQ AI Router" in page.locator("body").inner_text():
                break
            page.wait_for_timeout(1000)
        page.wait_for_timeout(2500)

        page.locator("header nav a:has-text('Playground')").first.click()
        page.wait_for_timeout(3000)

        # 1. enumerate ALL textareas with attributes
        info = page.evaluate("""() => Array.from(document.querySelectorAll('textarea')).map(t => ({
            idx: Array.from(document.querySelectorAll('textarea')).indexOf(t),
            placeholder: t.placeholder || null,
            ariaLabel: t.getAttribute('aria-label') || null,
            visible: !!(t.offsetWidth || t.offsetHeight),
            rect: { x: Math.round(t.getBoundingClientRect().x),
                    y: Math.round(t.getBoundingClientRect().y),
                    w: Math.round(t.getBoundingClientRect().width),
                    h: Math.round(t.getBoundingClientRect().height) },
            value: t.value ? t.value.slice(0, 40) : null,
        }))""")
        print("TEXTAREAS:", json.dumps(info, indent=1))

        # 2. enumerate send-candidate buttons
        btns = page.evaluate("""() => Array.from(
            document.querySelectorAll(\"button[aria-label='Send'], button[aria-label='Sending']\")
        ).map(b => ({
            ariaLabel: b.getAttribute('aria-label'),
            dataShow: b.getAttribute('data-show'),
            disabled: b.disabled,
            ariaHidden: b.getAttribute('aria-hidden'),
            rect: { x: Math.round(b.getBoundingClientRect().x),
                    y: Math.round(b.getBoundingClientRect().y) },
        }))""")
        print("SEND BUTTONS (before typing):", json.dumps(btns, indent=1))

        # 3. type into the composer — the visible textarea lowest on the page
        target = page.evaluate("""() => {
            const tas = Array.from(document.querySelectorAll('textarea'))
                .filter(t => (t.offsetWidth || t.offsetHeight));
            tas.sort((a, b) => b.getBoundingClientRect().y - a.getBoundingClientRect().y);
            return Array.from(document.querySelectorAll('textarea')).indexOf(tas[0]);
        }""")
        print(f"composer textarea index: {target}")
        ta = page.locator("textarea").nth(target)
        ta.click()
        ta.type(QUESTION, delay=8)
        page.wait_for_timeout(800)

        state = page.evaluate("""() => Array.from(
            document.querySelectorAll(\"button[aria-label='Send'], button[aria-label='Sending']\")
        ).map(b => ({ ariaLabel: b.getAttribute('aria-label'),
                      dataShow: b.getAttribute('data-show'),
                      disabled: b.disabled }))""")
        print("SEND BUTTONS (after typing):", json.dumps(state))

        # 4. click the send button that is now data-show=true
        ok = page.evaluate("""() => {
            const b = Array.from(document.querySelectorAll(
                \"button[aria-label='Send'], button[aria-label='Sending']\"))
                .find(x => x.getAttribute('data-show') === 'true');
            if (!b) return 'no-shown-button';
            b.click();
            return 'clicked';
        }""")
        print("click result:", ok)

        # 5. wait for the streamed answer
        answer = None
        for _ in range(30):
            page.wait_for_timeout(1000)
            body = page.locator("body").inner_text().lower()
            if "myocardial infarction" in body or "medq ai router chain" in body:
                answer = "streamed"
                break
        print("answer:", answer or "NOT FOUND in 30s")
        page.screenshot(path="/home/z/my-project/tmp/freellm-tut/shots/debug-playground.png")

        ctx.close()
        browser.close()
        return 0 if answer else 1


if __name__ == "__main__":
    code = main()
    import os
    os._exit(code)
