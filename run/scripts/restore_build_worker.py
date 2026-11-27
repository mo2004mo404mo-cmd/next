P = '/tmp/my-project/next.config.ts'
with open(P, 'r', encoding='utf-8') as f: s = f.read()
old = "    webpackBuildWorker: false, // TEMP off for in-process build diagnostic 2026-11-03"
new = "    webpackBuildWorker: true,"
if old in s:
    s = s.replace(old, new, 1)
    with open(P, 'w', encoding='utf-8') as f: f.write(s)
    print('[ok] webpackBuildWorker restored to true')
else:
    print('[skip] anchor not found (already true?)')
