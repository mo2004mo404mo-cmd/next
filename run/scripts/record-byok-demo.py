"""Record the BYOK demo video: both BYOK systems in the MedQ app.

Part 1 — AI Providers BYOK (server-side, encrypted, multi-endpoint):
         z.ai remote gateway + local Ollama, Add & Test, endpoint list.
Part 2 — Video BYOK (browser-side, per provider):
         API key + custom model, then model dropdown in the classroom toolbar.

Output: tmp/byok-video-rec/*.webm -> download/medq-byok-demo.mp4
Captions are injected as a fixed banner div so the video is self-explanatory.
"""
import os
import glob
import time
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
REC_DIR = "/home/z/my-project/tmp/byok-video-rec"

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
    page.screenshot(path=f"/home/z/my-project/tmp/byok-{name}.png")


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

        # ══════════════ LOGIN ══════════════
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        caption(page, "MedQ — using the 2 BYOK systems (browser demo)", 2)
        email = page.locator("input[type=email]").first
        email.click()
        email.type("admin@medq.com", delay=30)
        pwd = page.locator("input[type=password]").first
        pwd.click()
        pwd.type("test123", delay=30)
        pause(page, 0.6)
        page.locator("button:has-text('Sign In')").first.click()
        page.wait_for_timeout(5000)
        # server-action login redirects without refreshing the session
        # provider — reload once so the header user menu mounts (app quirk)
        page.reload(wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(6000)
        caption(page, "Logged in — Part 1: AI Providers BYOK (chat • explanations • generation)", 2)

        # ══════════════ PART 1 — AI PROVIDERS BYOK ══════════════
        # user menu -> Settings
        page.locator("button:has-text('Admin User')").first.click()
        pause(page, 1.2)
        page.locator("[role=menuitem]:has-text('Settings'), button:has-text('Settings')").first.click()
        pause(page, 1.5)
        shot(page, "01-settings-dialog")

        # scroll to AI Providers + open workspace
        dlg = page.locator("[role=dialog]").last
        dlg.locator("button:has-text('Manage API keys')").first.scroll_into_view_if_needed()
        pause(page, 0.8)
        caption(page, "Settings → AI Providers → Manage API keys (stored encrypted on the server)", 1.6)
        dlg.locator("button:has-text('Manage API keys')").first.click()
        page.wait_for_timeout(3500)
        shot(page, "02-byok-workspace")

        # select Ollama provider in the left list
        ollama = page.locator("button:has-text('Ollama (local)')").first
        ollama.scroll_into_view_if_needed()
        ollama.click()
        pause(page, 1.5)
        caption(page, "Ollama (local) — keyless: an endpoint is just a server address", 1.8)

        # ── endpoint 1: z.ai remote gateway ──
        url_input = page.locator("input[type=url]").first
        url_input.click()
        url_input.type("https://ollama2.space-z.ai", delay=25)
        label_input = page.locator("input[placeholder*='Remote gateway']").first
        if label_input.count():
            label_input.click()
            label_input.type("z.ai remote gateway", delay=20)
        pause(page, 0.8)
        caption(page, "Endpoint 1: z.ai hosted gateway → Add & Test", 1.5)
        page.locator("button:has-text('Add & Test')").first.click()
        page.wait_for_timeout(6000)  # real network test
        shot(page, "03-endpoint1-saved")
        pause(page, 1.5)

        # ── endpoint 2: local Ollama ──
        url_input = page.locator("input[type=url]").first
        url_input.click()
        url_input.fill("")
        url_input.type("http://127.0.0.1:11434", delay=25)
        label_input = page.locator("input[placeholder*='Remote gateway']").first
        if label_input.count():
            label_input.click()
            label_input.fill("")
            label_input.type("local Ollama on my server", delay=20)
        pause(page, 0.8)
        caption(page, "Endpoint 2: my own local Ollama on the server → Add & Test", 1.5)
        page.locator("button:has-text('Add & Test')").first.click()
        page.wait_for_timeout(6000)
        shot(page, "04-endpoint2-saved")
        caption(page, "2 endpoints saved — requests round-robin & fail over automatically", 2.5)

        # ── per-row Test button (fixed route) ──
        test_btns = page.locator("button:has-text('Test')")
        if test_btns.count() >= 2:
            caption(page, "Each endpoint also has its own Test button", 1.5)
            test_btns.last.click()
            page.wait_for_timeout(5000)
            shot(page, "05-row-test")

        # close BYOK workspace (back button or X)
        for sel in ["button:has-text('Back')", "button[aria-label='Close']", "button:has(svg.lucide-x)"]:
            b = page.locator(sel)
            if b.count():
                try:
                    b.first.click()
                    page.wait_for_timeout(1500)
                    break
                except Exception:
                    pass
        # close settings dialog if still open
        page.keyboard.press("Escape")
        page.wait_for_timeout(1200)
        page.keyboard.press("Escape")
        page.wait_for_timeout(800)

        # ══════════════ PART 2 — VIDEO BYOK ══════════════
        caption(page, "Part 2: Video BYOK (video generation — stored in your browser)", 2)
        # navigate to the classroom (full load = fresh session state)
        page.goto(f"{BASE}/ai-classroom", wait_until="domcontentloaded", timeout=90000)
        page.wait_for_timeout(8000)

        # dismiss onboarding 'Got it' if present
        got = page.locator("button:has-text('Got it')")
        if got.count():
            try:
                got.first.click()
                page.wait_for_timeout(800)
            except Exception:
                pass

        # open media popover (sliders icon button)
        trigger = page.locator("button:has(svg.lucide-sliders-horizontal)").first
        trigger.scroll_into_view_if_needed()
        pause(page, 0.8)
        trigger.click()
        pause(page, 1.2)
        shot(page, "06-media-popover")

        # Video tab
        page.locator("button:has-text('Video')").first.click()
        pause(page, 1.2)
        caption(page, "Media popover → Video tab (needs a provider key before it can be enabled)", 2)

        # advanced settings (footer button) → settings dialog at video section
        adv = page.locator("button:has-text('Advanced')").first
        if not adv.count():
            adv = page.locator("button:has-text('advanced')").first
        adv.click()
        page.wait_for_timeout(2500)
        shot(page, "07-video-settings")

        # provider select → pick Seedance (default likely already seedance)
        caption(page, "Video settings — pick a provider (Seedance, Kling, …)", 1.8)

        # API key input (type=password in video settings)
        key_input = page.locator("[role=dialog] input[type=password]").first
        if key_input.count():
            key_input.scroll_into_view_if_needed()
            key_input.click()
            key_input.type("demo-ark-key-0123456789", delay=25)
            caption(page, "Paste your provider API key (stays in this browser)", 2)
        else:
            caption(page, "API key field (server-managed notice may hide it)", 2)

        # add custom model
        add_model = page.locator("button:has-text('Add New Model')").first
        add_model.scroll_into_view_if_needed()
        pause(page, 0.6)
        caption(page, "Add your own custom model…", 1.4)
        add_model.click()
        pause(page, 1.2)
        # dialog inputs: Model ID (placeholder e.g. my-custom-model-v1) + Model Name
        mid = page.locator("input[placeholder*='my-custom-model']").first
        if mid.count():
            mid.click()
            mid.type("my-seedance-v2", delay=30)
        mname = page.locator("input[placeholder*='My Custom Model']").first
        if mname.count():
            mname.click()
            mname.type("My Seedance v2", delay=25)
        pause(page, 0.6)
        shot(page, "08-add-model")
        page.locator("button:has-text('Save Model')").first.click()
        page.wait_for_timeout(1500)
        caption(page, "Custom model saved to your model list", 1.8)
        shot(page, "09-model-saved")

        # close settings dialog
        page.keyboard.press("Escape")
        page.wait_for_timeout(1000)
        page.keyboard.press("Escape")
        page.wait_for_timeout(800)

        # reopen media popover → video tab → enable toggle → model dropdown
        trigger = page.locator("button:has(svg.lucide-sliders-horizontal)").first
        trigger.click()
        pause(page, 1.2)
        page.locator("button:has-text('Video')").first.click()
        pause(page, 1.0)

        # enable the video capability switch (role=switch in the tab panel)
        sw = page.locator("[role=switch]")
        if sw.count():
            # the video tab's switch is the one inside the popover
            sw.first.click()
            page.wait_for_timeout(1000)
        shot(page, "10-video-enabled")

        # open the grouped model select and pick the custom model
        sel_trigger = page.locator("[role=dialog] button[role=combobox], .popover button[role=combobox], button[role=combobox]").first
        if not sel_trigger.count():
            sel_trigger = page.locator("button:has-text('Seedance')").first
        if sel_trigger.count():
            sel_trigger.click()
            pause(page, 1.2)
            shot(page, "11-model-dropdown")
            caption(page, "Model dropdown — custom model visible & selectable (bug fixed: unconfigured providers stay grayed instead of vanishing)", 2.5)
            custom = page.locator(f"[role=option]:has-text('My Seedance v2'), [role=option]:has-text('my-seedance-v2')").first
            if custom.count():
                custom.click()
                pause(page, 1.2)
            else:
                page.keyboard.press("Escape")

        caption(page, "Done — AI provider endpoints on the server + video key in the browser = both BYOK systems in use", 3.5)
        shot(page, "12-final")

        # close context to flush the video file
        ctx.close()
        browser.close()

    files = sorted(glob.glob(f"{REC_DIR}/*.webm"), key=os.path.getmtime)
    if files:
        print(f"recorded: {files[-1]} ({os.path.getsize(files[-1]) / 1024 / 1024:.1f} MB)")
    else:
        print("ERROR: no video file recorded")


if __name__ == "__main__":
    main()
