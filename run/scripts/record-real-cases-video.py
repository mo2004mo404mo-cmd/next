"""Record the real-cases narrated video (video track + scene timeline).

Performs THE REAL THING on camera: adding a built-in keyless provider (Kilo),
a built-in anonymous provider (LLM7), a custom provider (the real Z.AI gateway
at ollama2.space-z.ai), model discovery + registration on that endpoint, a
custom model typed by hand (zai-vision), a model test, and a real streamed
chat in the Playground — while a simple-words narration (tmp/real-cases-audio/
seg_*.wav) drives the pacing: every scene is held at least as long as its
narration segment.

Run scripts/reset-freellm-demo.sh FIRST so the video starts from a clean
slate (no keys, no custom models).

Outputs:
  tmp/real-cases-rec/*.webm     — raw screen recording
  tmp/real-cases-vid/timeline.json — scene boundaries (seconds from start)
  tmp/real-cases-vid/shots/*.png  — per-scene stills (QA)

Audio + final mux: scripts/assemble-real-cases-video.py.
"""
import glob
import json
import os
import time
import urllib.request

from playwright.sync_api import sync_playwright

ROOT = "/home/z/my-project"
BASE = "http://127.0.0.1:3000"
PUBLIC_URL = "https://preview-chat-326f0ec4-ede1-4daf-9f04-b2b7c7bfbd0d.space-z.ai/freellm"
REC_DIR = f"{ROOT}/tmp/real-cases-rec"
WORK_DIR = f"{ROOT}/tmp/real-cases-vid"
SHOTS = f"{WORK_DIR}/shots"
DURATIONS = json.load(open(f"{ROOT}/tmp/real-cases-audio/durations.json"))
NARR = [d["duration"] for d in DURATIONS]
CAPTIONS = {s["id"]: s["caption"] for s in
            json.load(open(f"{ROOT}/scripts/real-cases-narration.json"))["segments"]}

MEDQ_EMAIL = "admin@medq.com"
MEDQ_PASSWORD = "test123"
ZAI_URL = "https://ollama2.space-z.ai/v1"
SIX = ["zai-asr", "zai-image-edit", "zai-image-gen",
       "zai-tts", "zai-web-reader", "zai-web-search"]
QUESTION = ("What is the normal potassium level in blood? "
            "Answer in one short sentence.")


def zai_healthy() -> bool:
    """Two quick probes: is the Z.AI gateway chat surface answering?"""
    ok = 0
    for _ in range(2):
        req = urllib.request.Request(
            ZAI_URL + "/chat/completions",
            data=json.dumps({"model": "zai-llm", "max_tokens": 8,
                             "messages": [{"role": "user", "content": "Say OK"}]}).encode(),
            headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=45) as r:
                body = json.loads(r.read().decode())
                if body.get("choices"):
                    ok += 1
        except Exception:  # noqa: BLE001 — 429/5xx/timeout all mean "busy"
            pass
        time.sleep(3)
    return ok == 2


CAPTION_JS = """
([text, sub]) => {
  const id = '__tut_caption';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.cssText = [
      'position: fixed',
      'bottom: 18px',
      'left: 50%',
      'transform: translateX(-50%)',
      'z-index: 2147483647',
      'background: rgba(10, 12, 18, 0.88)',
      'color: #e8fbf3',
      'font-family: ui-sans-serif, system-ui, sans-serif',
      'font-size: 13px',
      'font-weight: 600',
      'padding: 7px 16px',
      'border-radius: 10px',
      'border: 1px solid rgba(0, 229, 160, 0.35)',
      'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45)',
      'max-width: 92vw',
      'text-align: center',
      'pointer-events: none',
      'white-space: nowrap',
      'overflow: hidden',
      'text-overflow: ellipsis',
    ].join(';');
    document.body.appendChild(el);
  }
  el.textContent = sub ? text + '   ·   ' + sub : text;
}
"""


class Timeline:
    def __init__(self):
        self.t0 = time.monotonic()
        self.boundaries = []

    def now(self) -> float:
        return time.monotonic() - self.t0

    def mark(self) -> int:
        idx = len(self.boundaries)
        self.boundaries.append(round(self.now(), 3))
        return idx

    def elapsed_in_scene(self, idx: int) -> float:
        return self.now() - self.boundaries[idx]

    def hold(self, page, idx: int, pad: float = 1.0) -> None:
        target = NARR[idx] + pad
        while self.elapsed_in_scene(idx) < target:
            page.wait_for_timeout(150)


class Rec:
    def __init__(self, page, tl: Timeline):
        self.page = page
        self.tl = tl
        self.idx = -1
        self.n = 0
        self.prev_pad = 1.0
        self.ended = False

    def end(self, pad: float | None = None) -> None:
        if self.idx >= 0 and not self.ended:
            self.tl.hold(self.page, self.idx, self.prev_pad if pad is None else pad)
        self.ended = True

    def mark(self, scene_id: str, sub: str | None = None, pad: float = 1.0) -> int:
        self.end()
        self.idx = self.tl.mark()
        self.prev_pad = pad
        self.ended = False
        self.page.evaluate(CAPTION_JS, [CAPTIONS[scene_id], sub])
        self.page.screenshot(path=f"{SHOTS}/{self.n:02d}-{scene_id}.png")
        self.n += 1
        return self.idx

    def at(self, frac: float) -> None:
        target = NARR[self.idx] * frac
        while self.tl.elapsed_in_scene(self.idx) < target:
            self.page.wait_for_timeout(150)

    def shot(self, name: str) -> None:
        self.page.screenshot(path=f"{SHOTS}/{self.n:02d}-{name}.png")


def safe(page, fn, what, fallback=None):
    try:
        return fn()
    except Exception as e:  # noqa: BLE001 — recording must never abort
        print(f"    [warn] {what}: {type(e).__name__}: {str(e)[:110]}")
        if callable(fallback):
            return fallback()
        return fallback


def wait_dashboard(page, timeout_s: int = 30) -> bool:
    for _ in range(timeout_s):
        text = page.locator("body").inner_text()
        if "MedQ AI Router" in text and ("Playground" in text or "Keys" in text):
            return True
        page.wait_for_timeout(1000)
    return False


def pick_combobox(page, trigger_aria, search, option_text):
    trig = page.locator(f"button[aria-label='{trigger_aria}']").first
    trig.click()
    page.wait_for_timeout(700)
    inp = page.locator("input:visible").last  # combobox search auto-focuses
    inp.type(search, delay=25)
    page.wait_for_timeout(700)
    page.locator(f"button:has-text('{option_text}')").last.click()
    page.wait_for_timeout(600)


def main() -> None:
    os.makedirs(REC_DIR, exist_ok=True)
    os.makedirs(SHOTS, exist_ok=True)
    for f in glob.glob(f"{REC_DIR}/*"):
        os.remove(f)

    use_zai = zai_healthy()
    print(f"[probe] Z.AI gateway healthy: {use_zai}")
    if use_zai:
        pg_search, pg_option = "zai-llm", "zai-llm"
    else:
        # llm7's mistral-Nemo can hit its daily token quota; kilo's LFM2.5 is
        # the reliable keyless fallback (and is ALSO a provider we added).
        pg_search, pg_option = "lfm", "LFM2.5 2.6B"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 800},
            record_video_dir=REC_DIR,
            record_video_size={"width": 1280, "height": 800},
        )
        page = ctx.new_page()
        page.set_default_timeout(20000)
        tl = Timeline()
        tl.t0 = time.monotonic()
        rec = Rec(page, tl)

        # ═════════ S1 — INTRO (login screen) ═════════
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1200)
        rec.mark("01-intro", sub=PUBLIC_URL, pad=1.5)

        # ═════════ S2 — LOGIN ═════════
        rec.mark("02-login", pad=1.0)
        email = page.locator("input[type=email]").first
        email.click()
        email.type(MEDQ_EMAIL, delay=28)
        rec.at(0.45)
        pwd = page.locator("input[type=password]").first
        pwd.click()
        pwd.type(MEDQ_PASSWORD, delay=28)
        page.wait_for_timeout(400)
        rec.at(0.72)
        page.locator("button:has-text('Sign In')").first.click()
        for _ in range(20):
            if "/login" not in page.url:
                break
            page.wait_for_timeout(1000)
        page.wait_for_timeout(3500)

        # ═════════ S3 — OPEN ROUTER → KEYS PAGE ═════════
        rec.mark("03-keys-page", pad=1.0)
        tab_btn = None
        for sel in ["a:has-text('AI Router')", "button:has-text('AI Router')"]:
            for _ in range(15):
                if safe(page, lambda s=sel: page.locator(s).count(), f"locate {sel}"):
                    tab_btn = page.locator(sel).first
                    break
                page.wait_for_timeout(1000)
            if tab_btn is not None:
                break
        if tab_btn is not None:
            safe(page, lambda: tab_btn.scroll_into_view_if_needed(), "scroll sidebar")
            page.wait_for_timeout(500)
            rec.at(0.35)
            tab_btn.click()
        else:
            page.goto(f"{BASE}/freellm", wait_until="domcontentloaded", timeout=60000)
        wait_dashboard(page, 30)
        page.wait_for_timeout(2000)
        rec.at(0.68)
        safe(page, lambda: page.locator("header nav a:has-text('Keys')").first.click(),
             "open keys")
        page.wait_for_timeout(2500)

        # ═════════ S4 — CASE 1: BUILT-IN KILO (keyless) ═════════
        rec.mark("04-builtin-kilo", pad=1.0)
        rec.at(0.18)
        page.locator("button:has-text('Add key')").first.click()
        page.wait_for_timeout(1600)
        rec.shot("04-addkey-dialog")
        rec.at(0.36)
        pick_combobox(page, "Platform", "Kilo", "Kilo Gateway")
        rec.shot("04-kilo-selected")
        page.wait_for_timeout(700)
        rec.at(0.78)
        safe(page, lambda: page.locator(
            "[role=dialog] button:has-text('Enable')").first.click(), "enable kilo")
        page.wait_for_timeout(3200)
        rec.shot("04-kilo-row")

        # ═════════ S5 — CASE 2: BUILT-IN LLM7 (anonymous) ═════════
        rec.mark("05-builtin-llm7", pad=1.0)
        rec.at(0.14)
        page.locator("button:has-text('Add key')").first.click()
        page.wait_for_timeout(1600)
        rec.at(0.34)
        pick_combobox(page, "Platform", "LLM7", "LLM7 (anon ok)")
        rec.at(0.58)
        key_input = page.locator("[role=dialog] input[type=password]").first
        key_input.click()
        key_input.type("no-key", delay=40)
        rec.shot("05-llm7-filled")
        rec.at(0.80)
        safe(page, lambda: page.locator(
            "[role=dialog] button:has-text('Add key')").last.click(), "add llm7 key")
        page.wait_for_timeout(3000)
        for _ in range(3):  # scope picker may pop — dismiss, key stays added
            if page.locator("[role=dialog]").count():
                page.keyboard.press("Escape")
                page.wait_for_timeout(900)
            else:
                break
        rec.shot("05-llm7-row")

        # ═════════ S6 — CASE 3: CUSTOM PROVIDER ═════════
        rec.mark("06-custom-provider", pad=1.0)
        rec.at(0.12)
        page.locator("button:has-text('Add key')").first.click()
        page.wait_for_timeout(1600)
        rec.at(0.28)
        pane = page.locator("button:has-text('Custom endpoint')")
        safe(page, lambda: pane.first.click(), "custom pane")
        page.wait_for_timeout(900)
        rec.shot("06-custom-pane")
        rec.at(0.45)
        url_in = page.locator("input[placeholder^='http://127.0.0.1:11434']")
        url_in.click()
        url_in.type(ZAI_URL, delay=12)
        rec.at(0.62)
        models_ta = page.locator("[role=dialog] textarea").first
        models_ta.click()
        models_ta.type("zai-llm", delay=35)
        rec.shot("06-custom-filled")
        page.wait_for_timeout(500)
        rec.at(0.82)
        safe(page, lambda: page.locator(
            "[role=dialog] button:has-text('Add model')").first.click(), "add custom")
        page.wait_for_timeout(3500)
        rec.shot("06-zai-row")

        # ═════════ S7 — CASE 4: DISCOVERY ═════════
        rec.mark("07-discovery", pad=1.0)
        rec.at(0.20)
        fetch = page.locator("button[aria-label='Fetch models']")
        safe(page, lambda: fetch.first.click(), "fetch models")
        page.wait_for_timeout(2600)
        rec.shot("07-discover-dialog")
        frac = 0.45
        for m in SIX:
            row = page.locator(f"[role=dialog] label:has-text('{m}')")
            if safe(page, row.count, f"row {m}"):
                safe(page, lambda r=row: r.first.click(), f"tick {m}")
                page.wait_for_timeout(240)
                frac += 0.05
        rec.shot("07-ticked")
        rec.at(0.84)
        reg = page.locator("[role=dialog] button:has-text('Add 6 models')")
        safe(page, lambda: reg.first.click(), "register 6")
        page.wait_for_timeout(3200)
        rec.shot("07-registered")

        # ═════════ S8 — CASE 5: MODEL BY HAND ═════════
        rec.mark("08-manual-model", pad=1.0)
        rec.at(0.18)
        add_model = page.locator("button[aria-label='Add Custom Model']")
        safe(page, lambda: add_model.first.click(), "add custom model")
        page.wait_for_timeout(1600)
        rec.shot("08-addmodel-dialog")
        rec.at(0.38)
        mid = page.locator("#provider-model-id")
        mid.click()
        mid.type("zai-vision", delay=30)
        rec.at(0.52)
        dn = page.locator("#provider-display-name")
        dn.click()
        dn.type("Z.AI Vision", delay=25)
        rec.at(0.68)
        vis = page.locator("[role=dialog] [role='switch']").nth(1)
        safe(page, lambda: vis.click(), "vision switch")
        page.wait_for_timeout(500)
        rec.shot("08-filled")
        rec.at(0.86)
        safe(page, lambda: page.locator(
            "[role=dialog] button:has-text('Create Model')").first.click(), "create model")
        page.wait_for_timeout(3200)
        rec.shot("08-created")

        # ═════════ S9 — MODELS PAGE ═════════
        rec.mark("09-models-page", pad=1.0)
        rec.at(0.15)
        safe(page, lambda: page.locator("header nav a:has-text('Models')").first.click(),
             "open models")
        page.wait_for_timeout(2500)
        rec.at(0.42)
        search = page.locator("input[placeholder*='Search models']").first
        if safe(page, search.count, "search input"):
            search.click()
            search.type("zai", delay=45)
            page.wait_for_timeout(2000)
        rec.shot("09-zai-rows")
        page.wait_for_timeout(1200)

        # ═════════ S10 — TEST A MODEL ═════════
        rec.mark("10-test", pad=1.0)
        rec.at(0.12)
        safe(page, lambda: page.locator("header nav a:has-text('Keys')").first.click(),
             "back to keys")
        page.wait_for_timeout(2500)
        rec.at(0.30)
        testb = page.locator("button[aria-label='Test models']")
        safe(page, lambda: testb.first.click(), "test models")
        page.wait_for_timeout(2500)
        rec.shot("10-test-dialog")
        rec.at(0.55)
        tbtn = page.locator("button[aria-label*='Vision']")
        safe(page, lambda: tbtn.first.click(), "test vision model")
        page.wait_for_timeout(9000)
        rec.shot("10-test-result")
        page.keyboard.press("Escape")
        page.wait_for_timeout(900)

        # ═════════ S11 — PLAYGROUND: USE THEM ═════════
        rec.mark("11-playground", pad=1.2)
        rec.at(0.12)
        safe(page, lambda: page.locator("header nav a:has-text('Playground')").first.click(),
             "open playground")
        page.wait_for_timeout(2800)
        rec.at(0.30)
        pick_combobox(page, "Select model", pg_search, pg_option)
        rec.shot(f"11-model-{'zai' if use_zai else 'mistral'}")
        rec.at(0.55)
        ta = page.locator("textarea[placeholder*='Type a message']").first
        if not safe(page, ta.count, "composer textarea"):
            ta = page.locator("textarea").first
        ta.click()
        ta.type(QUESTION, delay=14)
        page.wait_for_timeout(600)
        rec.at(0.74)
        clicked = safe(page, lambda: page.evaluate(
            """() => {
                const b = Array.from(document.querySelectorAll(
                    \"button[aria-label='Send'], button[aria-label='Sending']\"))
                    .find(x => x.getAttribute('data-show') === 'true');
                if (!b) return false;
                b.click(); return true;
            }"""), "send question")
        if not clicked:
            safe(page, lambda: (ta.press("Enter"), True)[1], "send via Enter")
        # wait for the streamed answer (mmol appears in a potassium answer)
        for _ in range(75):
            page.wait_for_timeout(1000)
            body = page.locator("body").inner_text()
            if "mmol" in body:
                break
        page.wait_for_timeout(2500)
        rec.shot("11-answer")

        # ═════════ S12 — OUTRO ═════════
        rec.mark("12-outro", sub=PUBLIC_URL, pad=1.5)
        page.wait_for_timeout(1500)
        rec.end(pad=1.5)

        video = page.video.path() if page.video else None
        ctx.close()
        browser.close()

        files = sorted(glob.glob(f"{REC_DIR}/*.webm"), key=os.path.getmtime)
        video = files[-1] if files else video
        timeline = {
            "video_file": video,
            "playground_model": "zai-llm (custom provider)" if use_zai else "mistral-nemo (llm7 built-in)",
            "scenes": [{"id": CAPTIONS_KEYS[i], "boundary": b}
                       for i, b in enumerate(tl.boundaries)],
        }
        with open(f"{WORK_DIR}/timeline.json", "w") as f:
            json.dump(timeline, f, indent=2)
        print(f"\nvideo: {video}")
        print(f"scenes: {len(tl.boundaries)}")


CAPTIONS_KEYS = [d["id"] for d in DURATIONS]

if __name__ == "__main__":
    main()
