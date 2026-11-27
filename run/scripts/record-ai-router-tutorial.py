"""Record the MedQ AI Router video tutorial.

Part 1 — The native "AI Router · BYOK" tab inside MedQ (a real tab like the
         Bank tab, not an iframe): Overview, Keys, Models, Playground
         (streaming clinical chat), Analytics.
Part 2 — The Advanced dashboard at /freellmapi/ (rebranded for MedQ: no
         third-party branding, no Premium upsell, no external links):
         navbar, Keys, Models, Analytics, account menu.

Output: tmp/ai-router-tutorial-rec/*.webm -> download/medq-ai-router-tutorial.mp4
Captions are injected as a fixed banner div so the video is self-explanatory.
"""
import glob
import json
import os
import subprocess

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
REC_DIR = "/home/z/my-project/tmp/ai-router-tutorial-rec"
OUT_MP4 = "/home/z/my-project/download/medq-ai-router-tutorial.mp4"
CREDS = json.load(open("/home/z/my-project/freellmapi/server/data/medq-bridge.json"))

CAPTION_JS = """
(text) => {
  const id = '__demo_caption';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.cssText = [
      'position: fixed',
      'top: 12px',
      'left: 50%',
      'transform: translateX(-50%)',
      'z-index: 2147483647',
      'background: rgba(10, 12, 18, 0.92)',
      'color: #00e5a0',
      'font-family: ui-sans-serif, system-ui, sans-serif',
      'font-size: 15px',
      'font-weight: 600',
      'padding: 10px 22px',
      'border-radius: 12px',
      'border: 1px solid rgba(0, 229, 160, 0.35)',
      'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45)',
      'max-width: 88vw',
      'text-align: ' + 'center',
      'pointer-events: none',
    ].join(';');
    document.body.appendChild(el);
  }
  el.textContent = text;
}
"""


def caption(page, text, hold=1.2):
    page.evaluate(CAPTION_JS, text)
    page.wait_for_timeout(int(hold * 1000))


def pause(page, s=1.2):
    page.wait_for_timeout(int(s * 1000))


def shot(page, name):
    page.screenshot(path=f"/home/z/my-project/tmp/tut-{name}.png")


def main():
    os.makedirs(REC_DIR, exist_ok=True)
    for f in glob.glob(f"{REC_DIR}/*"):
        os.remove(f)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 800},
            record_video_dir=REC_DIR,
            record_video_size={"width": 1280, "height": 800},
        )
        page = ctx.new_page()
        page.set_default_timeout(30000)

        # ══════════════ LOGIN TO MEDQ ══════════════
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        caption(page, "MedQ — your medical question bank. Tutorial: the AI Router (BYOK) tab", 2.2)
        email = page.locator("input[type=email]").first
        email.click()
        email.type("admin@medq.com", delay=30)
        pwd = page.locator("input[type=password]").first
        pwd.click()
        pwd.type("test123", delay=30)
        pause(page, 0.5)
        page.locator("button:has-text('Sign In')").first.click()
        page.wait_for_timeout(5000)
        page.reload(wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(6000)
        caption(page, "Logged in. The AI Router lives in the sidebar — a REAL MedQ tab (like the Bank tab)", 2.2)

        # ══════════════ PART 1 — NATIVE TAB ══════════════
        # open the AI Router tab from the sidebar
        tab_btn = None
        for sel in [
            "button:has-text('AI Router')",
            "[role=button]:has-text('AI Router')",
            "a:has-text('AI Router')",
            "text=AI Router · BYOK",
        ]:
            loc = page.locator(sel).first
            if loc.count():
                tab_btn = loc
                break
        tab_btn.scroll_into_view_if_needed()
        pause(page, 0.8)
        shot(page, "01-sidebar")
        tab_btn.click()
        page.wait_for_timeout(4000)
        caption(page, "AI Router · BYOK — one click, no iframe: a native MedQ tab", 2.0)

        # wait for the bridge to connect (boot → ready)
        for _ in range(20):
            if "MedQ AI Router" in page.locator("body").inner_text():
                break
            page.wait_for_timeout(1000)
        page.wait_for_timeout(2500)
        shot(page, "02-overview")
        caption(page, "Overview — health, usage stats and your OpenAI-compatible endpoint", 2.2)

        # scroll to the MedQ link card
        link_card = page.locator("text=Link with MedQ generation").first
        if link_card.count():
            link_card.scroll_into_view_if_needed()
            pause(page, 0.8)
            caption(
                page,
                "Link with MedQ generation — router models appear in every MedQ model picker",
                2.4,
            )
            shot(page, "03-medq-link")

        # ── Keys view ──
        page.locator("button:has-text('Keys')").first.click()
        page.wait_for_timeout(2500)
        shot(page, "04-keys")
        caption(page, "Keys — add any of 70+ free providers or your own endpoint; keys are encrypted", 2.2)

        # ── Models view ──
        page.locator("button:has-text('Models')").first.click()
        page.wait_for_timeout(2500)
        shot(page, "05-models")
        caption(page, "Models — the synced catalog. Enable the ones you like; medical models are badged", 2.2)

        # ── Playground ──
        page.locator("button:has-text('Playground')").first.click()
        page.wait_for_timeout(2500)
        caption(page, "Playground — ask a clinical question; the router streams the answer", 1.8)
        ta = page.locator("textarea").last
        ta.click()
        ta.type(
            "A 58-year-old man has crushing substernal chest pain radiating to the left arm with diaphoresis. What is the most likely diagnosis?",
            delay=18,
        )
        pause(page, 0.8)
        send = page.locator("button:has(svg.lucide-send)").first
        send.click()
        caption(page, "Streaming through your own keys — with automatic failover across models", 1.5)
        # let the answer stream in
        for _ in range(24):
            page.wait_for_timeout(1000)
            body = page.locator("body").inner_text()
            if "myocardial infarction" in body.lower() or "mock reply" in body.lower():
                break
        page.wait_for_timeout(1500)
        shot(page, "06-playground-answer")
        caption(page, "Answered — with model attribution and latency", 2.0)

        # ── Analytics ──
        page.locator("button:has-text('Analytics')").first.click()
        page.wait_for_timeout(2500)
        shot(page, "07-analytics")
        caption(page, "Analytics — requests, success rate, tokens and latency per model", 2.2)

        # ══════════════ PART 2 — ADVANCED DASHBOARD ══════════════
        caption(page, "Part 2: the Advanced dashboard — the router's full control center", 1.8)

        # silent auth on the origin, then open /freellmapi/
        page.goto(f"{BASE}/freellmapi/livez", wait_until="domcontentloaded")
        page.evaluate(
            """async (creds) => {
                const r = await fetch('/freellmapi/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: creds.email, password: creds.password }),
                });
                const body = await r.json();
                if (body.token) localStorage.setItem('freellmapi_dashboard_token', body.token);
                return r.ok;
            }""",
            CREDS,
        )
        page.goto(f"{BASE}/freellmapi/", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(3000)
        shot(page, "08-advanced-home")
        caption(
            page,
            "Fully rebranded: MedQ AI Router — no third-party branding, no Premium, no external links",
            2.6,
        )

        # Keys page
        page.locator("header nav a:has-text('Keys'), header nav button:has-text('Keys')").first.click()
        page.wait_for_timeout(2500)
        shot(page, "09-advanced-keys")
        caption(page, "Keys — every provider, health checks, quotas and failover order", 2.2)

        # Models page
        page.locator("header nav a:has-text('Models'), header nav button:has-text('Models')").first.click()
        page.wait_for_timeout(2500)
        shot(page, "10-advanced-models")
        caption(page, "Models — 350+ models with live free-tier limits", 2.2)

        # Analytics page
        page.locator("header nav a:has-text('Analytics'), header nav button:has-text('Analytics')").first.click()
        page.wait_for_timeout(2500)
        shot(page, "11-advanced-analytics")
        caption(page, "Analytics — usage, savings and per-model breakdowns", 2.2)

        # account menu — prove no upsell
        menu_btn = page.locator("header button").filter(has=page.locator("svg.lucide-ellipsis"))
        if menu_btn.count():
            menu_btn.first.click()
            page.wait_for_timeout(1400)
            shot(page, "12-account-menu")
            caption(page, "Account menu — Settings and Sign out only. Nothing navigates away from your app", 2.4)
            page.keyboard.press("Escape")
            pause(page, 0.8)

        caption(page, "MedQ AI Router — BYOK, model switching and analytics, all inside MedQ", 2.6)

        # close context to flush the video file
        ctx.close()
        browser.close()

    files = sorted(glob.glob(f"{REC_DIR}/*.webm"), key=os.path.getmtime)
    if not files:
        print("ERROR: no video file recorded")
        raise SystemExit(1)
    src = files[-1]
    print(f"recorded: {src} ({os.path.getsize(src) / 1024 / 1024:.1f} MB)")

    # convert to mp4 (h264 + yuv420p for universal playback).
    # NOTE: this box has only 2 cores — preset must stay "veryfast" or the
    # encode outlives the tool timeout (medium took >5 min for 98s of video).
    os.makedirs(os.path.dirname(OUT_MP4), exist_ok=True)
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", src,
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-preset", "veryfast", "-crf", "24",
            "-movflags", "+faststart",
            OUT_MP4,
        ],
        check=True,
        capture_output=True,
        timeout=240,
    )
    print(f"mp4: {OUT_MP4} ({os.path.getsize(OUT_MP4) / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    main()
