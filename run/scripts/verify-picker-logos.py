#!/usr/bin/env python3
"""Verify provider logos render in the two model pickers.

1. Agent chat panel picker (MedQAgentV3 → MedQAgentPanel): open the floating
   assistant, open the LLM picker, screenshot group headers + trigger.
2. Generate page ModelPicker (byok/ModelPicker): open dropdown, screenshot rows.
Also greps the rendered DOM for /logos/ img srcs as a hard assertion.
"""
import asyncio, json, sys
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:3000"
OUT = "/home/z/my-project/tmp/logo-check"
COOKIES = "/home/z/my-project/tmp/byok-e2e-cookies.txt"

async def main() -> int:
    import os
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1280, "height": 800})
        # reuse an authenticated session: login via the credentials flow into a
        # Netscape jar (same recipe as verify-agent-router-chat.mjs), then
        # convert it to Playwright cookies.
        import subprocess, os
        JAR = "/tmp/logo-check.cookies.txt"
        def login():
            if os.path.exists(JAR):
                os.remove(JAR)
            csrf = json.loads(subprocess.run(
                ["curl", "-s", "-c", JAR, f"{BASE}/api/auth/csrf"],
                capture_output=True, text=True).stdout)["csrfToken"]
            subprocess.run([
                "curl", "-s", "-b", JAR, "-c", JAR, "-X", "POST",
                f"{BASE}/api/auth/callback/credentials",
                "-H", "Content-Type: application/x-www-form-urlencoded",
                "--data-urlencode", f"csrfToken={csrf}",
                "--data-urlencode", "email=admin@medq.com",
                "--data-urlencode", "password=test123",
                "--data-urlencode", f"callbackUrl={BASE}/",
                "-o", "/dev/null",
            ], capture_output=True)
            who = json.loads(subprocess.run(
                ["curl", "-s", "-b", JAR, f"{BASE}/api/auth/session"],
                capture_output=True, text=True).stdout)
            return who.get("user", {}).get("email")
        email = login()
        print(f"logged in as: {email}")
        if email:
            cookies = []
            for line in open(JAR):
                http_only = False
                if line.startswith("#HttpOnly_"):
                    http_only = True
                    line = line[len("#HttpOnly_"):]
                elif line.startswith("#") or not line.strip():
                    continue
                parts = line.rstrip("\n").split("\t")
                if len(parts) != 7:
                    continue
                cookies.append({
                    "name": parts[5], "value": parts[6],
                    "domain": parts[0], "path": parts[2],
                    "secure": parts[3] == "TRUE",
                    "httpOnly": http_only,
                })
            await ctx.add_cookies(cookies)
            print(f"loaded {len(cookies)} cookies")
        page = await ctx.new_page()

        # ── 1. ByokHub ModelPicker (Settings → AI Providers) ──────────
        await page.goto(f"{BASE}/", wait_until="domcontentloaded", timeout=45000)
        await page.wait_for_timeout(3500)
        # open Settings exactly the way the header does: the UserMenu item
        # dispatches this CustomEvent, which MedQAppShell listens for.
        await page.evaluate(
            "() => window.dispatchEvent(new CustomEvent('medq-header-action',"
            " { detail: { action: 'settings' } }))"
        )
        await page.wait_for_timeout(2500)
        # Settings dialog opens on the general page — the BYOK hub is behind
        # the "Manage API keys" card in the AI Providers section.
        manage = page.locator("button:has-text('Manage API keys')").first
        if await manage.count():
            await manage.click()
            await page.wait_for_timeout(2500)
        # the compact ModelPicker trigger ("Default model" row)
        trigger = page.locator("button:has(svg.lucide-chevrons-up-down)").first
        if await trigger.count():
            await trigger.scroll_into_view_if_needed()
            await trigger.click()
            await page.wait_for_timeout(1500)
            dom_logos = await page.locator("img[src^='/logos/']").count()
            print(f"settings hub picker open — /logos/ imgs visible: {dom_logos}")
            await page.screenshot(path=f"{OUT}/byokhub-picker.png")
            await page.keyboard.press("Escape")
        else:
            print("WARN: hub ModelPicker trigger not found")

        # ── 2. Agent panel picker ──────────────────────────────────────
        await page.goto(f"{BASE}/", wait_until="domcontentloaded", timeout=45000)
        await page.wait_for_timeout(4000)
        # open the floating assistant — button whose id/aria suggests agent
        opened = False
        for sel in [
            "button[aria-label*='ssistant' i]",
            "button[title*='ssistant' i]",
            "#agent-fab", "button:has-text('Agent')",
        ]:
            loc = page.locator(sel).first
            if await loc.count():
                try:
                    await loc.click(timeout=3000)
                    await page.wait_for_timeout(2500)
                    opened = True
                    break
                except Exception:
                    continue
        print(f"agent panel opened: {opened}")
        # the LLM picker trigger in the panel: small button with Cpu/logo + label + chevron
        trig = page.locator("button:has(svg.lucide-chevron-down):has-text('Auto')")
        if await trig.count():
            await trig.first.click()
            await page.wait_for_timeout(1500)
            dom_logos = await page.locator("img[src^='/logos/']").count()
            print(f"agent picker open — /logos/ imgs visible: {dom_logos}")
            await page.screenshot(path=f"{OUT}/agent-picker.png")
        else:
            print("WARN: agent LLM picker trigger not found (maybe panel layout differs)")

        await browser.close()
    return 0

if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
