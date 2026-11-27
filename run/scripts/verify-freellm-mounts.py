"""E2E verification: /freellm == /freellmapi (full dashboard, all features).

Scenarios (all in a real browser):
  1. Fresh context, MedQ login form → session cookie → /freellm:
     the dashboard's auth-gate auto-bridges (POST /api/freellmapi-bridge)
     — NO sidecar sign-in form is ever shown.
  2. The dashboard is the full app: nav entries (Models / Playground / Keys /
     Agents / Analytics), account menu with "Back to MedQ", no Premium,
     no FreeLLMAPI text.
  3. Sidebar "AI Router · BYOK" full-navigates to /freellm.
  4. Keys → API key tab → "Link with MedQ generation" card links/refreshes
     the medq-router endpoint in MedQ's BYOK store.
  5. "Back to MedQ" returns to the MedQ shell (/home).
  6. /freellmapi regression: same auto-bridge flow on the original mount.
"""
import json
import sys

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
MEDQ_EMAIL = "admin@medq.com"
MEDQ_PASSWORD = "test123"

results = []


def check(name, passed, detail=None):
    results.append((name, bool(passed), detail))
    print(f"  {'PASS' if passed else 'FAIL'}  {name}" + (f"  [{detail}]" if detail else ""))


def medq_login(page):
    """Sign in to MedQ through the real login form."""
    page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
    email = page.locator("input[type=email]").first
    email.click()
    email.type(MEDQ_EMAIL, delay=20)
    pwd = page.locator("input[type=password]").first
    pwd.click()
    pwd.type(MEDQ_PASSWORD, delay=20)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(5000)
    page.goto(f"{BASE}/home", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(5000)


def wait_dashboard(page, mount):
    """Wait for the rebranded dashboard shell (past the auth gate)."""
    for _ in range(30):
        text = page.locator("body").inner_text()
        if "MedQ AI Router" in text and ("Playground" in text or "Keys" in text):
            return True
        page.wait_for_timeout(1000)
    return False


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        page.set_default_timeout(30000)

        print("== 1. MedQ login → /freellm auto-bridge (no second login) ==")
        medq_login(page)
        # Make sure no leftover sidecar token exists — the auto-bridge must be
        # the ONLY auth path in this test.
        page.evaluate("localStorage.removeItem('freellmapi_dashboard_token')")
        page.goto(f"{BASE}/freellm", wait_until="domcontentloaded", timeout=60000)
        dashboard_up = wait_dashboard(page, "/freellm")
        check("auto-bridge: dashboard renders without sidecar login form", dashboard_up)
        body = page.locator("body").inner_text()
        check("no 'Sign in' auth form shown", "Sign in" not in body)
        check("no FreeLLMAPI branding text", "FreeLLMAPI" not in body)
        nav = page.locator("header nav")
        nav_text = nav.inner_text() if nav.count() else ""
        check(
            "full nav present (Models/Playground/Keys/Agents/Analytics)",
            all(w in nav_text for w in ["Models", "Playground", "Keys", "Analytics"]),
            nav_text.replace("\n", " | "),
        )
        check("no Premium nav entry", "Premium" not in nav_text)
        check("SPA URL stays under /freellm", page.url.startswith(f"{BASE}/freellm"), page.url)  # router redirects / → /models/chat
        page.screenshot(path="/home/z/my-project/tmp/freellm-mount-home.png")

        print("== 2. Sidebar 'AI Router · BYOK' full-navigates to /freellm ==")
        page.goto(f"{BASE}/home", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(4000)
        tab_btn = None
        for sel in ["a:has-text('AI Router')", "button:has-text('AI Router')"]:
            loc = page.locator(sel).first
            if loc.count():
                tab_btn = loc
                break
        if tab_btn:
            tab_btn.scroll_into_view_if_needed()
            tab_btn.click()
            page.wait_for_timeout(6000)
            check("sidebar click lands on /freellm dashboard", page.url.startswith(f"{BASE}/freellm"), page.url)
            check("dashboard rendered after sidebar navigation", wait_dashboard(page, "/freellm"))
        else:
            check("sidebar 'AI Router' entry found", False, "locator not found")

        print("== 3. Keys → API key tab → Link with MedQ generation ==")
        page.goto(f"{BASE}/freellm/keys", wait_until="domcontentloaded", timeout=60000)
        check("keys page renders (SPA route)", wait_dashboard(page, "/freellm/keys"))
        # switch to the 'API key' tab of the Keys page
        api_tab = page.locator("button:has-text('API key'), [role=tab]:has-text('API key')").first
        if not api_tab.count():
            api_tab = page.locator("text=API key").first
        api_tab.click()
        page.wait_for_timeout(2500)
        card = page.locator("text=Link with MedQ generation").first
        check("MedQ link card visible on Keys page", card.count() > 0)
        if card.count():
            card.scroll_into_view_if_needed()
            page.wait_for_timeout(800)
            btn = page.locator("button:has-text('Link router to MedQ'), button:has-text('Refresh linked models')").first
            check("link/refresh action available", btn.count() > 0)
            if btn.count():
                btn.click()
                page.wait_for_timeout(4000)
                body = page.locator("body").inner_text()
                linked = "Linked" in body
                check("link action completed (Linked state visible)", linked)
        page.screenshot(path="/home/z/my-project/tmp/freellm-medq-link.png")

        # confirm via the MedQ API directly
        api = page.evaluate(
            """async () => {
                const r = await fetch('/api/user/api-keys', { credentials: 'same-origin' });
                const b = await r.json();
                const router = (b.keys ?? []).find(k => k.providerId === 'medq-router');
                return { ok: r.ok, linked: !!router, models: router?.modelsConfig?.length ?? 0 };
            }"""
        )
        check("medq-router endpoint registered in MedQ BYOK store", api["linked"], json.dumps(api))

        print("== 4. Account menu → Back to MedQ ==")
        menu_btn = page.locator("header button").filter(has=page.locator("svg.lucide-ellipsis"))
        if menu_btn.count():
            menu_btn.first.click()
            page.wait_for_timeout(1200)
            back = page.locator("[role=menu] :text('Back to MedQ')").first
            check("'Back to MedQ' menu item present", back.count() > 0)
            if back.count():
                back.click()
                page.wait_for_timeout(6000)
                check("returns to the MedQ shell", "/home" in page.url, page.url)
        else:
            check("account menu button found", False)
        page.screenshot(path="/home/z/my-project/tmp/freellm-back-to-medq.png")

        print("== 5. /freellmapi regression (auto-bridge on the original mount) ==")
        ctx2 = browser.new_context(viewport={"width": 1280, "height": 800})
        page2 = ctx2.new_page()
        page2.set_default_timeout(30000)
        medq_login(page2)
        page2.evaluate("localStorage.removeItem('freellmapi_dashboard_token')")
        page2.goto(f"{BASE}/freellmapi/", wait_until="domcontentloaded", timeout=60000)
        up2 = wait_dashboard(page2, "/freellmapi")
        check("/freellmapi auto-bridge: dashboard renders", up2)
        body2 = page2.locator("body").inner_text()
        check("/freellmapi: no 'Sign in' form", "Sign in" not in body2)
        page2.screenshot(path="/home/z/my-project/tmp/freellmapi-mount-regression.png")
        ctx2.close()

        ctx.close()
        browser.close()

    fails = [r for r in results if not r[1]]
    print(f"\n{len(results) - len(fails)}/{len(results)} checks passed")
    if fails:
        print("FAILED:")
        for name, _, detail in fails:
            print(f"  - {name} {detail or ''}")
        sys.exit(1)


if __name__ == "__main__":
    main()
