#!/bin/bash
# mux-real-cases-chunked.sh — encode the real-cases video in chunks that each
# fit inside one tool-call timeout, then concat + mux narration losslessly.
#
# Why chunks: this 2-core box encodes the 1280x800 screen capture at only
# ~0.7x realtime under libx264 ultrafast, so the full ~400s video needs ~550s
# wall time — longer than any single tool call allows. Two halves fit.
#
# Usage: bash scripts/mux-real-cases-chunked.sh <chunk>   (1|2|join)
set -euo pipefail
ROOT=/home/z/my-project
REC=$(ls -t "$ROOT"/tmp/real-cases-rec/*.webm | head -1)
NARR="$ROOT/tmp/real-cases-vid/narration.wav"
WORK="$ROOT/tmp/real-cases-vid"
OUT="$ROOT/download/medq-freellm-real-cases.mp4"
SPLIT=200   # seconds; chunk1 = [0,200), chunk2 = [200, end)

V=(-c:v libx264 -pix_fmt yuv420p -preset ultrafast -crf 21 -threads 2)

case "${1:-}" in
  1)
    ffmpeg -y -i "$REC" -t "$SPLIT" -an -sn "${V[@]}" "$WORK/part1.mp4" 2>&1 | tail -2
    echo "part1 done: $(ls -la "$WORK/part1.mp4" | awk '{print $5}') bytes"
    ;;
  2)
    ffmpeg -y -ss "$SPLIT" -i "$REC" -an -sn "${V[@]}" "$WORK/part2.mp4" 2>&1 | tail -2
    echo "part2 done: $(ls -la "$WORK/part2.mp4" | awk '{print $5}') bytes"
    ;;
  join)
    printf "file '%s'\nfile '%s'\n" "$WORK/part1.mp4" "$WORK/part2.mp4" > "$WORK/vparts.txt"
    ffmpeg -y -f concat -safe 0 -i "$WORK/vparts.txt" -i "$NARR" \
      -c:v copy -c:a aac -b:a 160k -movflags +faststart "$OUT" 2>&1 | tail -2
    echo "FINAL: $OUT ($(du -m "$OUT" | cut -f1) MB)"
    ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
    ;;
  *)
    echo "usage: $0 1|2|join" >&2; exit 2 ;;
esac
