"""Record the MedQ AI Router video tutorial — the full dashboard.

The tutorial covers the COMPLETE MedQ AI Router dashboard, which now lives at
BOTH /freellm and /freellmapi (identical app, all features):

  1. MedQ login → sidebar "AI Router · BYOK" → the dashboard opens at /freellm,
     already signed in via the MedQ bridge (no second login).
  2. Models — the synced 350+ model catalog with free-tier limits, search,
     medical-model highlights.
  3. Playground — a clinical question, streamed answer through your own keys.
  4. Keys → API key — the unified key + "Link with MedQ generation" (router
     models power MedQ's own question generation / explanations / tutor).
  5. Agents + Fusion — the advanced modality surfaces.
  6. Analytics — usage, savings, per-model breakdowns.
  7. Account menu → "Back to MedQ" — the router is part of the app.
  8. /freellmapi — the same dashboard at the second URL.

Output: tmp/ai-router-tutorial-rec/*.webm -> download/medq-ai-router-tutorial.mp4
Captions are injected as a fixed banner div so the video is self-explanatory.
"""
import glob
import os
import subprocess

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
REC_DIR = "/home/z/my-project/tmp/ai-router-tutorial-rec"
OUT_MP4 = "/home/z/my-project/download/medq-ai-router-tutorial.mp4"

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
      'border: ' + '1px solid rgba(0, 229, 160, 0.35)',
      'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45)',
      'max-width: 88vw',
      'text-align: center',
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
    page.screenshot(path=f"/home/z/my-project/tmp/tut2-{name}.png")


def wait_dashboard(page, timeout_s=30):
    for _ in range(timeout_s):
        text = page.locator("body").inner_text()
        if "MedQ AI Router" in text and ("Playground" in text or "Keys" in text):
            return True
        page.wait_for_timeout(1000)
    return False


def nav_link(page, label):
    loc = page.locator(f"header nav a:has-text('{label}')").first
    if not loc.count():
        loc = page.locator(f"header nav button:has-text('{label}')").first
    return loc


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

        # ══════════════ 1. MEDQ LOGIN ══════════════
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        caption(page, "MedQ — your medical study platform. Tutorial: the AI Router (BYOK)", 2.4)
        email = page.locator("input[type=email]").first
        email.click()
        email.type("admin@medq.com", delay=30)
        pwd = page.locator("input[type=password]").first
        pwd.click()
        pwd.type("test123", delay=30)
        pause(page, 0.5)
        page.locator("button:has-text('Sign In')").first.click()
        page.wait_for_timeout(5000)
        page.goto(f"{BASE}/home", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(5000)
        caption(page, "Logged in. The AI Router lives right in the sidebar — click 'AI Router · BYOK'", 2.4)

        # ══════════════ 2. OPEN THE DASHBOARD FROM THE SIDEBAR ══════════════
        tab_btn = None
        for sel in ["a:has-text('AI Router')", "button:has-text('AI Router')"]:
            loc = page.locator(sel).first
            if loc.count():
                tab_btn = loc
                break
        tab_btn.scroll_into_view_if_needed()
        pause(page, 0.8)
        shot(page, "01-sidebar")
        tab_btn.click()
        # full navigation → the dashboard app boots
        for _ in range(30):
            if wait_dashboard(page, 1):
                break
        page.wait_for_timeout(2500)
        caption(page, "The full AI Router dashboard opens — already signed in through your MedQ account. No second login", 2.8)
        shot(page, "02-dashboard-home")

        # ══════════════ 3. MODELS ══════════════
        caption(page, "Models — the synced catalog: 350+ models with live free-tier limits", 2.2)
        pause(page, 1.0)
        # search for a medical model
        search = page.locator("input[type=search], input[placeholder*='earch' i]").first
        if search.count():
            search.click()
            search.type("medgemma", delay=40)
            pause(page, 1.2)
            caption(page, "Search the catalog — medical models like MedGemma are highlighted", 2.2)
            shot(page, "03-models-medgemma")
            search.fill("")
            pause(page, 0.6)

        # ══════════════ 4. PLAYGROUND ══════════════
        nav_link(page, "Playground").click()
        page.wait_for_timeout(3000)
        caption(page, "Playground — ask a clinical question; the router streams the answer", 2.0)
        ta = page.locator("textarea").last
        ta.click()
        ta.type(
            "A 58-year-old man has crushing substernal chest pain radiating to the left arm with diaphoresis. What is the most likely diagnosis?",
            delay=14,
        )
        pause(page, 0.8)
        send = page.locator("button[aria-label='Send'], button:has(svg.lucide-arrow-up)").first
        send.click()
        caption(page, "Streaming through your own keys — with automatic failover across models", 2.0)
        for _ in range(26):
            page.wait_for_timeout(1000)
            body = page.locator("body").inner_text().lower()
            if "myocardial infarction" in body or "mock reply" in body or "router chain" in body:
                break
        page.wait_for_timeout(1500)
        shot(page, "04-playground-answer")
        caption(page, "Answered — with model attribution and latency", 2.0)

        # ══════════════ 5. KEYS → API KEY + MEDQ LINK ══════════════
        nav_link(page, "Keys").click()
        page.wait_for_timeout(2500)
        caption(page, "Keys — manage every provider key; encrypted at rest, health-checked", 2.0)
        shot(page, "05-keys-providers")
        api_tab = page.locator("button:has-text('API key')").first
        if api_tab.count():
            api_tab.click()
            page.wait_for_timeout(2000)
            caption(page, "One unified key exposes every model through a single OpenAI-compatible endpoint", 2.2)
            shot(page, "06-unified-key")
            link_card = page.locator("text=Link with MedQ generation").first
            if link_card.count():
                link_card.scroll_into_view_if_needed()
                pause(page, 0.8)
                caption(page, "Link with MedQ generation — router models power question generation, explanations and the tutor", 2.6)
                btn = page.locator(
                    "button:has-text('Link router to MedQ'), button:has-text('Refresh linked models')"
                ).first
                if btn.count():
                    btn.click()
                    page.wait_for_timeout(3500)
                    caption(page, "Linked — the router is now a generation endpoint inside MedQ itself", 2.2)
                    shot(page, "07-medq-link")

        # ══════════════ 6. AGENTS + FUSION (ADVANCED) ══════════════
        nav_link(page, "Agents").click()
        page.wait_for_timeout(2500)
        shot(page, "08-agents")
        caption(page, "Agents — prebuilt assistants that route through your keys", 2.0)
        page.goto(f"{BASE}/freellm/models/fusion", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(3000)
        shot(page, "09-fusion")
        caption(page, "Fusion — combine several models into one fused answer, judged for quality", 2.2)

        # ══════════════ 7. ANALYTICS ══════════════
        nav_link(page, "Analytics").click()
        page.wait_for_timeout(2500)
        shot(page, "10-analytics")
        caption(page, "Analytics — requests, success rate, tokens, latency and savings per model", 2.2)

        # ══════════════ 8. BACK TO MEDQ ══════════════
        menu_btn = page.locator("header button").filter(has=page.locator("svg.lucide-ellipsis"))
        if menu_btn.count():
            menu_btn.first.click()
            page.wait_for_timeout(1400)
            shot(page, "11-account-menu")
            caption(page, "The account menu — 'Back to MedQ' returns to your app. Nothing navigates away", 2.4)
            back = page.locator("[role=menu] :text('Back to MedQ')").first
            if back.count():
                back.click()
                page.wait_for_timeout(6000)
                shot(page, "12-back-to-medq")
                caption(page, "Back in MedQ — the router is a native part of your study platform", 2.2)

        # ══════════════ 9. /freellmapi — SAME APP, SECOND URL ══════════════
        page.goto(f"{BASE}/freellmapi/", wait_until="domcontentloaded", timeout=60000)
        wait_dashboard(page)
        page.wait_for_timeout(2000)
        shot(page, "13-freellmapi")
        caption(page, "The same dashboard also lives at /freellmapi — both URLs, identical features", 2.6)

        caption(page, "MedQ AI Router — BYOK, 70+ providers, automatic failover — all inside MedQ", 2.8)

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
