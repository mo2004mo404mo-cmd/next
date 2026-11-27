#!/usr/bin/env python3
"""Stage 13 UX: remove the generate page's stale 50MB hard cap.

The cap predates the tier-aware server cap (Stage 10) and the resumable path
(Stage 13). It blocked Premium/Pro users at 50MB before the resumable path
could even start. Replaced with the absolute 100MB guard (instant feedback,
no round-trip); the per-plan cap is enforced server-side at POST /api/uploads
and surfaced through the resumable error state with a precise message."""
def read(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()
def write(p, s):
    with open(p, 'w', encoding='utf-8') as f: f.write(s)

gen = '/tmp/my-project/src/app/generate/page.tsx'
s = read(gen)

# 1. Replace the stale 50MB guard with the absolute 100MB guard.
old_cap = """    // Max file size: 50MB
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 50MB.');
      return;
    }"""
new_cap = """    // Stage 13 UX: the per-plan cap (visitor 2MB … pro 100MB) is enforced
    // server-side at POST /api/uploads and surfaced through the resumable
    // error state with a precise message. This guard only short-circuits the
    // pointless round-trip for a file above the ABSOLUTE 100MB ceiling.
    if (file.size > 100 * 1024 * 1024) {
      toast.error(`File is ${Math.round((file.size / 1024 / 1024) * 10) / 10}MB — above the 100MB absolute cap.`);
      return;
    }"""
if old_cap in s:
    s = s.replace(old_cap, new_cap, 1)
    print('[gen] 50MB cap replaced with 100MB absolute guard')
elif '100MB absolute cap' in s:
    print('[gen] cap already replaced')
else:
    raise SystemExit('[gen] 50MB cap anchor not found')

# 2. Update the stale "up to 50MB" UI text (two known spots).
if 'up to 50MB' in s:
    s = s.replace('up to 50MB', 'up to 100MB (plan-dependent)')
    print('[gen] UI text "up to 50MB" -> "up to 100MB (plan-dependent)"')

write(gen, s)
print('patch_upload_ux_generate done')
