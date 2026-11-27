"""Assemble the real-cases narrated video: narration track + final MP4.

Inputs:
  tmp/real-cases-rec/*.webm             — screen recording (from the recorder)
  tmp/real-cases-vid/timeline.json      — scene boundaries (seconds)
  tmp/real-cases-audio/seg_*.wav        — narration segments (24 kHz mono PCM)

Steps:
  1. Place narration segment i at its scene boundary (min 0.4 s lead-in,
     min 0.2 s inter-segment gap), generating silence to fill.
  2. Concatenate silence + segments into one narration.wav.
  3. Mux: webm (vp8) + narration.wav -> h264/aac MP4 (yuv420p, faststart).

Output: download/medq-freellm-real-cases.mp4
"""
import glob
import json
import os
import subprocess
import sys

ROOT = "/home/z/my-project"
WORK = f"{ROOT}/tmp/real-cases-vid"
AUDIO = f"{ROOT}/tmp/real-cases-audio"
OUT_MP4 = f"{ROOT}/download/medq-freellm-real-cases.mp4"

LEAD_IN = 0.4
MIN_GAP = 0.2


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kw)


def ffprobe_duration(path: str) -> float:
    out = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
               "-of", "csv=p=0", path]).stdout.strip()
    return float(out)


def silence(dst: str, seconds: float) -> str:
    if seconds <= 0.001:
        return None
    run(["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
         "-t", f"{seconds:.3f}", "-c:a", "pcm_s16le", "-ar", "24000", dst])
    return dst


def main() -> None:
    timeline = json.load(open(f"{WORK}/timeline.json"))
    video = timeline["video_file"]
    if not os.path.exists(video):
        files = sorted(glob.glob(f"{ROOT}/tmp/real-cases-rec/*.webm"),
                       key=os.path.getmtime)
        if not files:
            print("ERROR: recording webm not found")
            sys.exit(1)
        video = files[-1]

    durations = json.load(open(f"{AUDIO}/durations.json"))
    segs = {d["id"]: d for d in durations}
    scenes = timeline["scenes"]

    placements = []
    prev_end = 0.0
    for i, sc in enumerate(scenes):
        seg = segs[sc["id"]]
        start = max(sc["boundary"], LEAD_IN if i == 0 else 0.0)
        start = max(start, prev_end + MIN_GAP)
        placements.append({"id": sc["id"], "file": seg["file"],
                           "start": round(start, 3), "dur": seg["duration"]})
        prev_end = start + seg["duration"]

    video_dur = ffprobe_duration(video)
    audio_end = prev_end
    print(f"video: {video_dur:.1f}s, narration ends at {audio_end:.1f}s")
    if audio_end > video_dur - 0.2:
        print(f"WARNING: narration ({audio_end:.1f}s) reaches past the video "
              f"({video_dur:.1f}s) — tail may freeze on the last frame")

    mix_dir = f"{WORK}/mix"
    os.makedirs(mix_dir, exist_ok=True)
    concat_list = []
    cursor = 0.0
    for i, pl in enumerate(placements):
        gap = pl["start"] - cursor
        if gap > 0.001:
            sil = silence(f"{mix_dir}/sil_{i:02d}.wav", gap)
            concat_list.append(f"file '{sil}'\n")
        concat_list.append(f"file '{pl['file']}'\n")
        cursor = pl["start"] + pl["dur"]

    list_path = f"{mix_dir}/concat.txt"
    with open(list_path, "w") as f:
        f.writelines(concat_list)

    narration_wav = f"{WORK}/narration.wav"
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", list_path,
         "-c:a", "pcm_s16le", "-ar", "24000", narration_wav])
    narr_dur = ffprobe_duration(narration_wav)
    print(f"narration.wav: {narr_dur:.1f}s "
          f"({os.path.getsize(narration_wav) / 1024 / 1024:.1f} MB)")

    # 2-core box: ultrafast stays inside tool timeouts; screen content stays
    # sharp (text is what matters).
    preset = os.environ.get("TUT_PRESET", "ultrafast")
    crf = os.environ.get("TUT_CRF", "21")
    os.makedirs(os.path.dirname(OUT_MP4), exist_ok=True)
    run(["ffmpeg", "-y", "-i", video, "-i", narration_wav,
         "-c:v", "libx264", "-pix_fmt", "yuv420p",
         "-preset", preset, "-crf", crf,
         "-c:a", "aac", "-b:a", "160k",
         "-movflags", "+faststart",
         OUT_MP4], timeout=560)

    final_dur = ffprobe_duration(OUT_MP4)
    streams = run(["ffprobe", "-v", "error", "-show_entries",
                   "stream=codec_type,codec_name,width,height",
                   "-of", "csv=p=0", OUT_MP4]).stdout.strip()
    print(f"\nFINAL: {OUT_MP4}")
    print(f"  duration: {final_dur:.1f}s ({final_dur / 60:.1f} min), "
          f"size {os.path.getsize(OUT_MP4) / 1024 / 1024:.1f} MB")
    print(f"  streams: {streams}")
    print("\nscene placement (audio):")
    for pl in placements:
        print(f"  {pl['id']:20s} start={pl['start']:7.2f}s  dur={pl['dur']:6.2f}s")


if __name__ == "__main__":
    main()
