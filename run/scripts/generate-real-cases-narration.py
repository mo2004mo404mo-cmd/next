"""Generate the narration audio segments for the real-cases video.

Reads scripts/real-cases-narration.json, renders each segment with the
`z-ai tts` CLI (voice `jam`, WAV 24 kHz mono), and measures every segment's
duration with ffprobe. Output:

  tmp/real-cases-audio/seg_<nn>_<id>.wav   — one file per scene
  tmp/real-cases-audio/durations.json      — [{file, id, duration}, ...]

Idempotent: existing non-empty wav files are reused (delete them to re-render).
"""
import json
import os
import subprocess
import time

ROOT = "/home/z/my-project"
SCRIPT = f"{ROOT}/scripts/real-cases-narration.json"
OUT_DIR = f"{ROOT}/tmp/real-cases-audio"


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
        if os.path.exists(wav) and os.path.getsize(wav) > 44:
            print(f"  [skip] {name} (exists)")
        else:
            print(f"  [tts ] {name}: {text[:60]}...")
            render_tts(text, wav, voice, speed)
        dur = ffprobe_duration(wav)
        print(f"          {dur:.1f}s")
        results.append({"file": wav, "id": seg["id"], "duration": round(dur, 3)})

    with open(os.path.join(OUT_DIR, "durations.json"), "w") as f:
        json.dump(results, f, indent=2)
    total = sum(r["duration"] for r in results)
    print(f"\n{len(results)} segments, {total:.1f}s total narration")


if __name__ == "__main__":
    main()
