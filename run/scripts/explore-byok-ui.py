"""Explore MedQ UI selectors for the BYOK demo video (no recording).

Steps: login → find settings entry → open AI Providers (BYOK) → find the
provider list + endpoint form → navigate to the media/video settings UI.
Dumps interactive element hints per stage so the recording script can use
stable selectors.
"""
import sys
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"

def snap(page, label, n=40):
    print(f"\n===== {label} =====")
    try:
        els = page.locator("button, a, input, [role=dialog], [role=tab], h1, h2").all()
        shown = 0
        for el in els[:120]:
            try:
                txt = (el.inner_text() or "").strip().replace("\n", " | ")[:70]
                tag = el.evaluate("e => e.tagName.toLowerCase()")
                ph = el.get_attribute("placeholder") or ""
                if txt or ph:
                    print(f"  <{tag}> {txt} {('[ph: ' + ph + ']') if ph else ''}")
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

    # ── Login page ──
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    snap(page, "LOGIN PAGE")

    # try to log in
    email = page.locator("input[type=email], input[name=email]").first
    pwd = page.locator("input[type=password]").first
    if email.count() and pwd.count():
        email.fill("admin@medq.com")
        pwd.fill("test123")
        page.locator("button[type=submit], button:has-text('Sign in'), button:has-text('Log in'), button:has-text('Login')").first.click()
        page.wait_for_timeout(4000)
    print("\nURL after login:", page.url)
    snap(page, "AFTER LOGIN (home)", 30)

    # ── find settings entry ──
    for sel in ["button:has-text('Settings')", "[aria-label*='ettings']", "button:has(svg.lucide-settings)"]:
        loc = page.locator(sel)
        if loc.count():
            print(f"\nsettings entry found via {sel}: {loc.count()}")
            try:
                loc.first.click()
                page.wait_for_timeout(1500)
                break
            except Exception as e:
                print("  click failed:", e)
    snap(page, "SETTINGS DIALOG", 50)

    # ── open AI Providers / Manage API keys ──
    btn = page.locator("button:has-text('Manage API keys')")
    if btn.count():
        btn.first.click()
        page.wait_for_timeout(2500)
        snap(page, "BYOK WORKSPACE", 60)
    else:
        print("\n'Manage API keys' button not found")

    browser.close()
print("\nDONE")
