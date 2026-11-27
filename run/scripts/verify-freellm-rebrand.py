"""Verify the rebranded /freellmapi advanced dashboard in a real browser.

Assertions:
  1. Navbar brand reads "MedQ AI Router" (not FreeLLMAPI).
  2. No "Premium" nav entry in the top bar.
  3. Account (…) menu has no "Upgrade" item.
  4. /premium page shows the catalog feed with zero external anchors
     (no links to freellmapi.co).
  5. Login screen (auth-gate) is branded "MedQ AI Router".
"""
import json
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
CREDS = json.load(open("/home/z/my-project/freellmapi/server/data/medq-bridge.json"))

def main():
    ok = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        page.set_default_timeout(30000)

        # ── silent auth on the origin first ──
        page.goto(f"{BASE}/freellmapi/livez", wait_until="domcontentloaded")
        res = page.evaluate(
            """async (creds) => {
                const r = await fetch('/freellmapi/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: creds.email, password: creds.password }),
                });
                const body = await r.json();
                if (body.token) localStorage.setItem('freellmapi_dashboard_token', body.token);
                return { ok: r.ok, email: body.email ?? null };
            }""",
            CREDS,
        )
        ok.append(("sidecar login via bridge creds", res["ok"], res.get("email")))

        # ── dashboard renders, branded ──
        page.goto(f"{BASE}/freellmapi/", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(2500)
        body_text = page.locator("body").inner_text()
        ok.append(("brand 'MedQ AI Router' visible", "MedQ AI Router" in body_text, None))
        ok.append(("no 'FreeLLMAPI' text", "FreeLLMAPI" not in body_text, None))

        # ── nav has no Premium entry ──
        nav = page.locator("header nav")
        nav_text = nav.inner_text() if nav.count() else ""
        ok.append(("no Premium nav entry", "Premium" not in nav_text, nav_text.replace("\n", " | ")))

        # ── account menu has no Upgrade ──
        page.locator("header button[aria-label]").filter(has_text="").first  # noop
        menu_btn = page.locator("header button").filter(has=page.locator("svg.lucide-ellipsis"))
        if menu_btn.count():
            menu_btn.first.click()
            page.wait_for_timeout(1200)
            menu_text = page.locator("[role=menu]").inner_text() if page.locator("[role=menu]").count() else ""
            ok.append(("account menu has no Upgrade", "Upgrade" not in menu_text, menu_text.replace("\n", " | ")))
            page.keyboard.press("Escape")
            page.wait_for_timeout(600)

        # ── /premium page: catalog feed, no external anchors ──
        page.goto(f"{BASE}/freellmapi/premium", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(2000)
        prem_text = page.locator("body").inner_text()
        ext = page.locator("a[target=_blank]")
        ext_hrefs = [ext.nth(i).get_attribute("href") for i in range(ext.count())]
        ok.append(("/premium retitled 'Model Catalog'", "Model Catalog" in prem_text, None))
        ok.append(("/premium has zero external links", len(ext_hrefs) == 0, ext_hrefs))

        page.screenshot(path="/home/z/my-project/tmp/rebrand-premium.png", full_page=False)

        # ── login screen branding (fresh context) ──
        ctx2 = browser.new_context(viewport={"width": 1280, "height": 800})
        page2 = ctx2.new_page()
        page2.goto(f"{BASE}/freellmapi/", wait_until="networkidle", timeout=60000)
        page2.wait_for_timeout(2000)
        t2 = page2.locator("body").inner_text()
        ok.append(("auth-gate branded MedQ AI Router", "MedQ AI Router" in t2, None))
        page2.screenshot(path="/home/z/my-project/tmp/rebrand-login.png")
        ctx2.close()

        browser.close()

    fails = 0
    for name, passed, detail in ok:
        mark = "PASS" if passed else "FAIL"
        if not passed:
            fails += 1
        print(f"[{mark}] {name}" + (f"  — {detail}" if detail and not passed else ""))
    print("\nRESULT:", "REBRAND VERIFIED" if fails == 0 else f"{fails} FAILURES")
    raise SystemExit(1 if fails else 0)

if __name__ == "__main__":
    main()
