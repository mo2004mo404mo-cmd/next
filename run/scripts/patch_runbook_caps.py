P = '/tmp/my-project/docs/runbook.md'
with open(P, 'r', encoding='utf-8') as f:
    s = f.read()
old = ("**Visitor** (anonymous, `guest@medq.local`): 2 MB max, 1/day, NO library\n"
       "upload. **Free**: 15 MB, 5/day. **Premium**: 50 MB, 100/day. **Pro**:\n"
       "100 MB, effectively unlimited.")
new = ("**Visitor** (anonymous, `guest@medq.local`): 2 MB max, 1/day, NO library\n"
       "upload. **Free**: 50 MB, 5/day. **Premium**: 80 MB, 100/day. **Pro**:\n"
       "100 MB, effectively unlimited. (Raised 2026-11-03: the 15 MB free cap\n"
       "blocked medical PDFs which routinely run 20-80 MB; the tier hierarchy\n"
       "is preserved by the other caps — daily upload count, deep-agent, ads.)")
if old in s:
    s = s.replace(old, new, 1)
    with open(P, 'w', encoding='utf-8') as f: f.write(s)
    print('[ok] runbook caps updated')
else:
    print('[skip] runbook anchor not found')
