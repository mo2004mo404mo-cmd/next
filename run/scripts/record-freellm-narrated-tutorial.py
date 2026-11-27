"""Record the /freellm narrated video tutorial (video track + scene timeline).

Walks the complete MedQ AI Router dashboard at /freellm — login, sidebar tab,
auto-bridge, model catalog + routing strategies, modality menu, streaming
playground, Keys (providers / add-key dialog / unified API key / Link with
MedQ / quota / anthropic / agents tabs), Agents page, Analytics, Logs, account
menu + settings, Back to MedQ — while a narration voice-over (generated
separately as tmp/freellm-tut-audio/seg_*.wav) drives the pacing: every scene
is held at least as long as its narration segment.

Outputs:
  tmp/freellm-tut-rec/*.webm        — the raw screen recording
  tmp/freellm-tut/timeline.json     — scene boundaries (seconds from video start)
  tmp/freellm-tut/shots/*.png       — per-scene stills (debugging/QA)

The audio track and final mux are handled by
scripts/assemble-freellm-narrated-tutorial.py — kept separate so assembly
tweaks never require a re-record.
"""
import glob
import json
import os
import time

from playwright.sync_api import sync_playwright

ROOT = "/home/z/my-project"
BASE = "http://127.0.0.1:3000"
PUBLIC_URL = "https://preview-chat-326f0ec4-ede1-4daf-9f04-b2b7c7bfbd0d.space-z.ai/freellm"
REC_DIR = f"{ROOT}/tmp/freellm-tut-rec"
WORK_DIR = f"{ROOT}/tmp/freellm-tut"
SHOTS = f"{WORK_DIR}/shots"
DURATIONS = json.load(open(f"{ROOT}/tmp/freellm-tut-audio/durations.json"))
NARR = [d["duration"] for d in DURATIONS]
IDS = [d["id"] for d in DURATIONS]
CAPTIONS = {s["id"]: s["caption"] for s in
            json.load(open(f"{ROOT}/scripts/freellm-tutorial-narration.json"))["segments"]}

MEDQ_EMAIL = "admin@medq.com"
MEDQ_PASSWORD = "test123"

QUESTION = ("A 58-year-old man has crushing substernal chest pain radiating to "
            "the left arm with diaphoresis. What is the most likely diagnosis?")

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

# ---------------------------------------------------------------------------
# Timeline helpers — boundaries are seconds measured from t0 (set immediately
# after the page is created, i.e. ~video start). The assembler places narration
# segment i at boundaries[i].
# ---------------------------------------------------------------------------


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

    def sleep_until_scene_elapsed(self, page, idx: float, target: float) -> None:
        while self.now() - (self.boundaries[int(idx)] if isinstance(idx, int) else idx) < target:
            page.wait_for_timeout(150)

    def hold(self, page, idx: int, pad: float = 1.0) -> None:
        """Keep the scene on screen until narration (+pad) has fully played."""
        target = NARR[idx] + pad
        while self.elapsed_in_scene(idx) < target:
            page.wait_for_timeout(150)


class Rec:
    """Scene recorder: mark() starts a scene (records its boundary, sets the
    caption banner); end() holds the current scene until its narration has
    fully played — ALWAYS call end() before starting the NEXT scene's
    navigation, so the video never runs ahead of the narration."""

    def __init__(self, page, tl: Timeline):
        self.page = page
        self.tl = tl
        self.idx = -1
        self.n = 0
        self.prev_pad = 1.0
        self.ended = False

    def end(self, pad: float | None = None) -> None:
        """Hold the current scene until its narration (+pad) fully played."""
        if self.idx >= 0 and not self.ended:
            self.tl.hold(self.page, self.idx, self.prev_pad if pad is None else pad)
        self.ended = True

    def mark(self, scene_id: str, sub: str | None = None, pad: float = 1.0) -> int:
        # close previous scene first: hold it until its narration finished
        self.end()
        self.idx = self.tl.mark()
        self.prev_pad = pad
        self.ended = False
        self.page.evaluate(CAPTION_JS, [CAPTIONS[scene_id], sub])
        self.page.screenshot(path=f"{SHOTS}/{self.n:02d}-{scene_id}.png")
        self.n += 1
        return self.idx

    def at(self, frac: float) -> None:
        """Wait until frac of the CURRENT scene's narration has elapsed."""
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


def scroll_top(page) -> None:
    safe(page, lambda: page.evaluate("window.scrollTo(0, 0)"), "scroll top")


def gentle_scroll(page, total_px: int = 900, step: int = 300, pause_s: float = 2.0) -> None:
    """Scroll down slowly (used to reveal list content while narrating)."""
    moved = 0
    while moved < total_px:
        page.mouse.wheel(0, step)
        moved += step
        page.wait_for_timeout(int(pause_s * 1000))


# ---------------------------------------------------------------------------

def main() -> None:
    os.makedirs(REC_DIR, exist_ok=True)
    os.makedirs(SHOTS, exist_ok=True)
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
        tl = Timeline()
        tl.t0 = time.monotonic()  # re-pin right after page creation
        rec = Rec(page, tl)

        # ══════════════ S1 — INTRO (login screen) ══════════════
        page.goto(f"{BASE}/login", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1200)
        rec.mark("01-intro", sub=PUBLIC_URL, pad=1.5)

        # ══════════════ S2 — LOGIN ══════════════
        rec.mark("02-login", pad=1.0)
        email = page.locator("input[type=email]").first
        email.click()
        email.type(MEDQ_EMAIL, delay=28)
        pwd = page.locator("input[type=password]").first
        pwd.click()
        pwd.type(MEDQ_PASSWORD, delay=28)
        page.wait_for_timeout(400)
        page.locator("button:has-text('Sign In')").first.click()
        # the app lands on / (the app shell) — not /home — so wait for the
        # URL to simply leave /login, then settle.
        for _ in range(20):
            if "/login" not in page.url:
                break
            page.wait_for_timeout(1000)
        page.wait_for_timeout(4000)

        # ══════════════ S3 — OPEN THE ROUTER (sidebar tab) ══════════════
        # (mark() holds scene 2 to its narration end first; the logged-in
        # MedQ home stays on screen while that narration finishes)
        rec.mark("03-open", sub=PUBLIC_URL, pad=1.2)
        tab_btn = None
        for sel in ["a:has-text('AI Router')", "button:has-text('AI Router')"]:
            for _ in range(15):  # the app shell sidebar can render late
                if safe(page, lambda s=sel: page.locator(s).count(), f"locate {sel}"):
                    tab_btn = page.locator(sel).first
                    break
                page.wait_for_timeout(1000)
            if tab_btn is not None:
                break
        if tab_btn is not None:
            safe(page, lambda: tab_btn.scroll_into_view_if_needed(), "scroll sidebar")
            page.wait_for_timeout(600)
            rec.shot("03-sidebar")
            # narration: "open the left sidebar and find AI Router..." — click
            # when the narration reaches "It opens as a real MedQ tab"
            rec.at(0.33)
            tab_btn.click()
        else:
            page.goto(f"{BASE}/freellm", wait_until="domcontentloaded", timeout=60000)
        wait_dashboard(page, 30)
        page.wait_for_timeout(2500)

        # ══════════════ S4 — AUTO-BRIDGE (no second login) ══════════════
        # (the dashboard booted during scene 3's tail, exactly as narrated:
        # "Both paths open the same dashboard")
        rec.mark("04-bridge", pad=1.0)
        # let the overview content settle; small scroll to show it lives
        gentle_scroll(page, total_px=400, step=200, pause_s=1.5)
        scroll_top(page)

        # ══════════════ S5 — MODEL CATALOG ══════════════
        # (dashboard already on /models/chat — no navigation needed)
        rec.mark("05-models", pad=1.0)
        # a) show the breadth: gentle scroll through the catalog
        gentle_scroll(page, total_px=600, step=300, pause_s=1.6)
        scroll_top(page)
        # b) search for a model — narration reaches "Search by name" ~25%
        rec.at(0.25)
        search = page.locator("input[placeholder*='Search models']").first
        if safe(page, search.count, "search input"):
            search.click()
            search.type("medgemma", delay=45)
            page.wait_for_timeout(1800)
        # c) open the model detail page — "Click any model" ~45%
        rec.at(0.45)
        row = page.locator("a[href*='/models/chat/']").first
        if not safe(page, row.count, "model row"):
            safe(page, lambda: search.fill(""), "clear search fill")
            page.wait_for_timeout(1200)
            row = page.locator("a[href*='/models/chat/']").first
        safe(page, lambda: row.click(), "open model detail")
        page.wait_for_timeout(2600)
        rec.shot("05-model-detail")
        # d) back to the table ~62%
        rec.at(0.62)
        safe(page, lambda: page.locator("header nav a:has-text('Models')").first.click(),
             "back to models")
        page.wait_for_timeout(2000)
        scroll_top(page)
        # e) hover the routing strategy pills — "Up top, choose a routing
        #    strategy" starts ~68%
        rec.at(0.68)
        for pill in ["Balanced", "Smartest", "Fastest"]:
            loc = page.locator(f"button:has-text('{pill}')").first
            if safe(page, loc.count, f"strategy pill {pill}"):
                safe(page, lambda l=loc: l.hover(), f"hover {pill}")
                page.wait_for_timeout(900)

        # ══════════════ S6 — MODALITIES MENU ══════════════
        rec.end()  # finish scene 5's narration before navigating away
        models_menu = page.locator("button[aria-label='Browse model types']").first
        if safe(page, models_menu.count, "models dropdown"):
            models_menu.click()
            page.wait_for_timeout(1100)
            rec.shot("06-modality-menu")
            img = page.locator("[role=menuitem]:has-text('Image')").first
            if safe(page, img.count, "image menu item"):
                img.click()
                page.wait_for_timeout(2800)
            else:
                page.goto(f"{BASE}/freellm/models/image", wait_until="domcontentloaded")
                page.wait_for_timeout(2500)
        else:
            page.goto(f"{BASE}/freellm/models/image", wait_until="domcontentloaded")
            page.wait_for_timeout(2500)
        rec.mark("06-modalities", pad=0.8)
        gentle_scroll(page, total_px=500, step=250, pause_s=1.6)
        scroll_top(page)
        # back to the chat table near the narration's end
        rec.at(0.85)
        safe(page, lambda: page.locator("header nav a:has-text('Models')").first.click(),
             "back to chat models")
        page.wait_for_timeout(1800)

        # ══════════════ S7 — PLAYGROUND (streaming) ══════════════
        rec.end()  # finish scene 6's narration on the models page
        safe(page, lambda: page.locator("header nav a:has-text('Playground')").first.click(),
             "open playground")
        page.wait_for_timeout(2800)
        rec.mark("07-playground", pad=1.2)
        # the composer — NOT the settings-rail system-prompt textarea
        ta = page.locator("textarea[placeholder*='Type a message']").first
        if not safe(page, lambda: ta.count(), "composer textarea"):
            ta = page.locator("textarea").first
        ta.click()
        ta.type(QUESTION, delay=14)
        page.wait_for_timeout(600)
        # click the send button via DOM (it is opacity-faded until hasContent,
        # which trips Playwright's actionability wait)
        clicked = safe(page, lambda: page.evaluate(
            """() => {
                const b = Array.from(document.querySelectorAll(
                    \"button[aria-label='Send'], button[aria-label='Sending']\"))
                    .find(x => x.getAttribute('data-show') === 'true');
                if (!b) return false;
                b.click();
                return true;
            }"""), "send question")
        if not clicked:
            safe(page, lambda: (ta.press("Enter"), True)[1], "send via Enter")
        # wait for the streamed answer
        for _ in range(30):
            page.wait_for_timeout(1000)
            body = page.locator("body").inner_text().lower()
            if "myocardial infarction" in body or "medq ai router chain" in body:
                break
        page.wait_for_timeout(2500)
        rec.shot("07-playground-answer")

        # ══════════════ S8 — KEYS · PROVIDERS (+ Add key dialog) ══════════════
        rec.end()  # finish scene 7's narration on the playground
        safe(page, lambda: page.locator("header nav a:has-text('Keys')").first.click(),
             "open keys")
        page.wait_for_timeout(2800)
        rec.mark("08-keys-providers", pad=0.8)
        gentle_scroll(page, total_px=300, step=300, pause_s=1.5)
        scroll_top(page)
        # "Click Add key..." starts ~45% of the narration
        rec.at(0.45)
        add_btn = page.locator("button:has-text('Add key')").first
        if safe(page, add_btn.count, "add key button"):
            add_btn.click()
            page.wait_for_timeout(2200)
            rec.shot("08-add-key-dialog")
            rec.at(0.68)
            page.keyboard.press("Escape")
            page.wait_for_timeout(900)
        gentle_scroll(page, total_px=400, step=400, pause_s=1.8)
        scroll_top(page)

        # ══════════════ S9 — UNIFIED API KEY ══════════════
        rec.end()  # finish scene 8's narration on the providers tab
        api_tab = page.locator(
            "button[role=tab]:has-text('Unified API key'), "
            "[role=tab]:has-text('Unified API key'), "
            "button:has-text('Unified API key')"
        ).first
        safe(page, lambda: api_tab.click(), "unified api key tab")
        page.wait_for_timeout(2200)
        rec.mark("09-apikey", pad=0.8)
        gentle_scroll(page, total_px=400, step=200, pause_s=1.8)
        scroll_top(page)

        # ══════════════ S10 — LINK WITH MEDQ GENERATION ══════════════
        rec.end()  # finish scene 9's narration before scrolling to the card
        link_card = page.locator("text=Link with MedQ generation").first
        safe(page, lambda: link_card.scroll_into_view_if_needed(), "scroll link card")
        page.wait_for_timeout(700)
        rec.mark("10-link", pad=1.2)
        # the narration mentions the refresh near the end — click it timed
        rec.at(0.72)
        btn = page.locator(
            "button:has-text('Link router to MedQ'), "
            "button:has-text('Refresh linked models')"
        ).first
        safe(page, lambda: btn.click(), "link/refresh click")
        page.wait_for_timeout(5000)
        rec.shot("10-linked")
        page.wait_for_timeout(800)

        # ══════════════ S11 — OTHER KEYS TABS ══════════════
        rec.end()  # finish scene 10's narration on the linked card
        scroll_top(page)
        rec.mark("11-keys-tabs", pad=0.8)
        for frac, tab_label in [(0.12, "Quota signals"), (0.42, "Anthropic"), (0.72, "Agents")]:
            rec.at(frac)
            tab = page.locator(
                f"button[role=tab]:has-text('{tab_label}'), button:has-text('{tab_label}')"
            ).first
            safe(page, lambda t=tab: t.click(), f"tab {tab_label}")
            page.wait_for_timeout(2600)
            gentle_scroll(page, total_px=300, step=300, pause_s=1.2)
            scroll_top(page)

        # ══════════════ S12 — AGENTS PAGE ══════════════
        rec.end()  # finish scene 11's narration on the keys tabs
        safe(page, lambda: page.locator("header nav a:has-text('Agents')").first.click(),
             "open agents")
        page.wait_for_timeout(2800)
        rec.mark("12-agents", pad=0.8)
        gentle_scroll(page, total_px=800, step=400, pause_s=2.2)
        scroll_top(page)

        # ══════════════ S13 — ANALYTICS ══════════════
        rec.end()  # finish scene 12's narration on the agents page
        safe(page, lambda: page.locator("header nav a:has-text('Analytics')").first.click(),
             "open analytics")
        page.wait_for_timeout(2800)
        rec.mark("13-analytics", pad=0.8)
        gentle_scroll(page, total_px=900, step=300, pause_s=2.0)
        scroll_top(page)

        # ══════════════ S14 — LOGS ══════════════
        rec.end()  # finish scene 13's narration on analytics

        def open_logs():
            menu = page.locator("button[aria-label='Analytics pages']").first
            if menu.count():
                menu.click()
                page.wait_for_timeout(1000)
                item = page.locator("[role=menuitem]:has-text('Logs')").first
                if item.count():
                    item.click()
                    page.wait_for_timeout(2500)
                    return True
            return False

        opened = safe(page, open_logs, "logs via dropdown")
        if not opened:
            page.goto(f"{BASE}/freellm/logs", wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(3000)
        rec.mark("14-logs", pad=0.8)
        gentle_scroll(page, total_px=400, step=200, pause_s=1.8)
        scroll_top(page)

        # ══════════════ S15 — ACCOUNT MENU + SETTINGS ══════════════
        rec.end()  # finish scene 14's narration on the logs page
        menu_btn = page.locator("header button").filter(has=page.locator("svg.lucide-ellipsis"))
        safe(page, lambda: menu_btn.first.click(), "account menu")
        page.wait_for_timeout(1400)
        rec.mark("15-account", pad=0.8)
        rec.shot("15-account-menu")
        # open Settings partway through the narration
        rec.at(0.40)
        settings_item = page.locator("[role=menuitem]:has-text('Settings')").first
        safe(page, lambda: settings_item.click(), "settings menu item")
        page.wait_for_timeout(2200)
        rec.shot("15-settings-dialog")
        # close it near the end of the narration
        rec.at(0.88)
        safe(page, lambda: page.keyboard.press("Escape"), "close settings")

        # ══════════════ S16 — BACK TO MEDQ + OUTRO ══════════════
        rec.end()  # finish scene 15's narration with the menu open
        page.wait_for_timeout(800)
        safe(page, lambda: menu_btn.first.click(), "account menu reopen")
        page.wait_for_timeout(1300)
        back = page.locator("[role=menuitem]:has-text('Back to MedQ')").first
        safe(page, lambda: back.click(), "back to medq")
        safe(page, lambda: page.wait_for_url("**/home**", timeout=25000),
             "back to medq nav", fallback=lambda: page.goto(f"{BASE}/home"))
        page.wait_for_timeout(2500)
        # /home is a skeleton shell — continue to the real app entry at /
        # (try the sidebar Home link first; fall back to a direct navigation)
        home_link = page.locator("a:has-text('Home')").first
        if safe(page, lambda: (home_link.click(), True)[1], "sidebar Home click"):
            for _ in range(5):
                if page.url.rstrip("/") == BASE:
                    break
                page.wait_for_timeout(1000)
        if page.url.rstrip("/") != BASE:
            page.goto(f"{BASE}/", wait_until="domcontentloaded", timeout=60000)
        for _ in range(10):  # wait for the real dashboard content
            if "Question of the Day" in page.locator("body").inner_text():
                break
            page.wait_for_timeout(1000)
        page.wait_for_timeout(3000)
        rec.mark("16-outro", pad=2.5)

        # final hold: let the outro narration play out fully
        rec.end(2.0)
        page.wait_for_timeout(600)

        # close context to flush the video file
        video = page.video
        ctx.close()
        browser.close()
        video_path = video.path() if video else None

    files = sorted(glob.glob(f"{REC_DIR}/*.webm"), key=os.path.getmtime)
    if not files:
        print("ERROR: no video file recorded")
        raise SystemExit(1)
    src = files[-1]
    if video_path and video_path != src and os.path.exists(video_path):
        src = video_path
    print(f"recorded: {src} ({os.path.getsize(src) / 1024 / 1024:.1f} MB)")

    timeline = {
        "video_file": src,
        "public_url": PUBLIC_URL,
        "scenes": [
            {"id": IDS[i], "boundary": tl.boundaries[i], "narration": NARR[i]}
            for i in range(len(IDS))
        ],
    }
    with open(f"{WORK_DIR}/timeline.json", "w") as f:
        json.dump(timeline, f, indent=2)
    print(f"timeline: {len(tl.boundaries)} scenes, "
          f"last boundary {tl.boundaries[-1]:.1f}s -> {WORK_DIR}/timeline.json")
    for i, b in enumerate(tl.boundaries):
        print(f"  {IDS[i]:20s} boundary={b:7.2f}s  narr={NARR[i]:6.2f}s  "
              f"scene_end={b + NARR[i]:7.2f}s")


if __name__ == "__main__":
    main()
    # Playwright sometimes hangs on exit after ctx.close() (cosmetic —
    # artifacts are already flushed). Force-exit so the tool call returns.
    os._exit(0)
