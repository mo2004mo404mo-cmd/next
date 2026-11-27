#!/usr/bin/env python3
"""Publish /home/z/my-project/download/* to public/downloads/ so the user can
browse + download deliverables via the public preview URL:
    https://preview-chat-<bot>.space-z.ai/downloads/index.html
Next.js `next start` serves public/ files straight from disk at request time,
so no rebuild is needed.
"""
import html
import shutil
from datetime import datetime
from pathlib import Path

SRC = Path("/home/z/my-project/download")
DST = Path("/home/z/my-project/public/downloads")

def human(n: int) -> str:
    size = float(n)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024 or unit == "GB":
            return f"{size:.1f} {unit}" if unit != "B" else f"{int(size)} B"
        size /= 1024
    return f"{size:.1f} GB"

def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in SRC.iterdir() if p.is_file())

    # copy / refresh every file
    for p in files:
        if p.suffix == ".md" and p.name == "README.md":
            continue  # internal readme, not a deliverable
        target = DST / p.name
        if not target.exists() or target.stat().st_size != p.stat().st_size:
            shutil.copy2(p, target)
            print(f"copied  {p.name} ({human(p.stat().st_size)})")
        else:
            print(f"fresh   {p.name} ({human(p.stat().st_size)})")

    # group for listing
    videos = [p for p in files if p.suffix in (".mp4", ".webm")]
    shots = [p for p in files if p.suffix in (".png", ".jpg", ".jpeg")]

    def rows(items):
        out = []
        for p in items:
            name = html.escape(p.name)
            note = ""
            if "narrated" in p.name:
                note = " — complete /freellm tutorial with voice narration (7:36)"
            elif "ai-router" in p.name:
                note = " — earlier caption-only tutorial (1:37)"
            elif "byok-demo" in p.name:
                note = " — original BYOK demo clip (1:23)"
            out.append(
                f'<tr><td><a href="{name}" download>{name}</a></td>'
                f"<td>{human(p.stat().st_size)}</td>"
                f"<td>{datetime.fromtimestamp(p.stat().st_mtime).strftime('%Y-%m-%d %H:%M')}</td>"
                f"<td class='note'>{html.escape(note)}</td></tr>"
            )
        return "\n".join(out)

    page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MedQ — Deliverable Downloads</title>
<style>
  :root {{ color-scheme: dark; }}
  body {{ margin:0; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
         background:#0b1220; color:#e6edf6; }}
  .wrap {{ max-width: 900px; margin: 0 auto; padding: 40px 24px 64px; }}
  h1 {{ font-size: 26px; margin: 0 0 6px; }}
  h1 .accent {{ color:#14b8a6; }}
  .sub {{ color:#8ba0b9; margin-bottom: 32px; font-size: 14px; }}
  h2 {{ font-size: 15px; text-transform: uppercase; letter-spacing:.08em; color:#14b8a6; margin: 28px 0 10px; }}
  table {{ width:100%; border-collapse: collapse; font-size:14px; }}
  th {{ text-align:left; color:#8ba0b9; font-weight:600; padding:8px 10px; border-bottom:1px solid #1d2a3f; }}
  td {{ padding:10px; border-bottom:1px solid #141f31; vertical-align: top; }}
  td.note {{ color:#8ba0b9; font-size: 13px; }}
  a {{ color:#5eead4; text-decoration: none; font-weight: 600; }}
  a:hover {{ text-decoration: underline; }}
  .hero {{ display:block; width:100%; border-radius: 12px; margin: 10px 0 6px; border:1px solid #1d2a3f; }}
  .btn {{ display:inline-block; margin-top:14px; padding:12px 22px; border-radius:10px;
         background:#0d9488; color:#fff; font-weight:700; }}
  .foot {{ margin-top:40px; color:#5c7290; font-size:13px; line-height:1.6; }}
</style>
</head>
<body>
<div class="wrap">
  <h1>MedQ <span class="accent">AI Router</span> — Deliverable Downloads</h1>
  <div class="sub">Everything previously placed in the workspace download folder, now reachable from your browser.</div>

  <h2>Video tutorials</h2>
  <video class="hero" controls preload="none" width="880"
         poster="" onerror="this.style.display='none'">
    <source src="medq-freellm-narrated-tutorial.mp4" type="video/mp4">
  </video>
  <a class="btn" href="medq-freellm-narrated-tutorial.mp4" download>Download narrated tutorial (MP4, 36.6 MB)</a>
  <table>
    <tr><th>File</th><th>Size</th><th>Updated</th><th>Notes</th></tr>
    {rows(videos)}
  </table>

  <h2>Screenshots</h2>
  <table>
    <tr><th>File</th><th>Size</th><th>Updated</th><th>Notes</th></tr>
    {rows(shots)}
  </table>

  <div class="foot">
    Tip: the narrated tutorial walks through <b>https://preview-chat-326f0ec4-ede1-4daf-9f04-b2b7c7bfbd0d.space-z.ai/freellm</b>
    end-to-end: login, auto-bridge, model catalog, streaming playground, API keys, the MedQ link, agents, analytics and logs.<br>
    The full source delivery bundle is also available at
    <a href="/medq-app-full-20261019.zip">/medq-app-full-20261019.zip</a> (58 MB).
  </div>
</div>
</body>
</html>
"""
    (DST / "index.html").write_text(page, encoding="utf-8")
    print(f"\nindex written -> {DST/'index.html'} ({len(page)} bytes)")
    total = sum((DST / p.name).stat().st_size for p in files if (DST / p.name).exists())
    print(f"published {len([p for p in files if p.suffix != '.md'])} files, {human(total)} total")

if __name__ == "__main__":
    main()
