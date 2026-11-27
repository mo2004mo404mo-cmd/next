"""Generate the narration audio segments for the /freellm narrated tutorial.

Reads scripts/freellm-tutorial-narration.json, renders each segment with the
`z-ai tts` CLI (voice `jam`, WAV 24 kHz mono), and measures every segment's
duration with ffprobe. Output:

  tmp/freellm-tut-audio/seg_<nn>_<id>.wav   — one file per scene
  tmp/freellm-tut-audio/durations.json      — [{file, id, duration}, ...]

Idempotent: existing non-empty wav files are reused (delete them to re-render).
"""
import json
import os
import subprocess
import sys
import time

ROOT = "/home/z/my-project"
SCRIPT = f"{ROOT}/scripts/freellm-tutorial-narration.json"
OUT_DIR = f"{ROOT}/tmp/freellm-tut-audio"


def render_tts(text: str, wav: str, voice: str, speed: str) -> None:
    """Render one segment, retrying with backoff on 429 rate limits."""
    for attempt in range(6):
        proc = subprocess.run(
            ["z-ai", "tts", "-i", text, "-o", wav,
             "--voice", voice, "--speed", speed],
            capture_output=True, text=True, timeout=180,
        )
        if proc.returncode == 0 and os.path.exists(wav) and os.path.getsize(wav) > 44:
            return
        # 429 rate limit (or transient failure) — back off and retry.
        wait = 15 * (attempt + 1)
        print(f"    attempt {attempt + 1} failed, retrying in {wait}s: "
              f"{(proc.stderr or proc.stdout or '').strip()[-160:]}")
        time.sleep(wait)
    raise RuntimeError(f"TTS failed after retries: {wav}")


def ffprobe_duration(path: str) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", path],
        check=True, capture_output=True, text=True,
    ).stdout.strip()
    return float(out)


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    spec = json.load(open(SCRIPT))
    voice = spec["voice"]
    speed = str(spec["speed"])

    results = []
    for i, seg in enumerate(spec["segments"]):
        name = f"seg_{i:02d}_{seg['id']}"
        wav = os.path.join(OUT_DIR, f"{name}.wav")
        text = seg["text"].strip()
        if len(text) > 1024:
            print(f"ERROR: segment {name} exceeds 1024 chars ({len(text)})")
            sys.exit(1)

        if not (os.path.exists(wav) and os.path.getsize(wav) > 44):
            print(f"[{i + 1}/{len(spec['segments'])}] rendering {name} ...")
            render_tts(text, wav, voice, speed)
            time.sleep(3)  # be gentle with the API between calls
        else:
            print(f"[{i + 1}/{len(spec['segments'])}] reuse {name}")

        if not (os.path.exists(wav) and os.path.getsize(wav) > 44):
            print(f"ERROR: TTS produced nothing for {name}")
            sys.exit(1)

        dur = ffprobe_duration(wav)
        results.append({"file": wav, "id": seg["id"], "duration": round(dur, 3)})
        print(f"    {dur:6.2f}s  {len(text):4d} chars  {text[:60]}...")

    with open(os.path.join(OUT_DIR, "durations.json"), "w") as f:
        json.dump(results, f, indent=2)

    total = sum(r["duration"] for r in results)
    print(f"\n{len(results)} segments, total narration {total:.1f}s "
          f"(~{total / 60:.1f} min) -> durations.json")


if __name__ == "__main__":
    main()
