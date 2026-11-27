#!/usr/bin/env python3
"""Create a redeployable zip of the MedQ app (fixed state, 2026-10-23).

Mirrors the original delivery zip's scope (source + configs + db backup +
freellmapi WITHOUT node_modules) plus this session's fixes:
  - src/ with attachment-skill + image-search fixes
  - consistent SQLite snapshot of freellmapi/server/data/freeapi.db
    (all 16 keys re-encrypted under the current ENCRYPTION_KEY)
  - FIXES-2026-10-23.md and the original author's worklog preserved

Excluded: node_modules, .next, .git, env-owned dirs (download/extracted/
skills/tmp/tool-results), the two standalone secret txt files, the
prisma-generated src/generated tree (rebuilt by `prisma generate`), and the
9 public/generated artifacts created by this session's skill tests (the
author's own public/generated files ship as in the original zip).
"""
import os
import sqlite3
import sys
import time
import zipfile

ROOT = '/home/z/my-project'
STAGING = os.path.join(ROOT, 'tmp', 'zip-staging')
ORIG_ZIP = os.path.join(ROOT, 'extracted', 'app_download')
OUT_ZIP = os.path.join(ROOT, 'download', 'medq-app-enhanced-2026-10-24.zip')

LIVE_DB = os.path.join(ROOT, 'freellmapi', 'server', 'data', 'freeapi.db')
SNAP_DB = os.path.join(STAGING, 'freeapi.db')

ROOT_FILES = [
    '.env', '.gitignore', 'Caddyfile', 'RESTORE.md', 'bun.lock',
    'components.json', 'eslint.config.mjs', 'next-env.d.ts', 'next.config.ts',
    'package.json', 'postcss.config.mjs', 'prisma.config.ts', 'proxy.ts',
    'tsconfig.json', 'tsconfig.agent-fix.json', 'tsconfig.agent-ui.json',
    'tsconfig.push-hang.json', 'tsconfig.scoped.tsbuildinfo', 'worklog.md',
]
INCLUDE_DIRS = [
    'data', 'db', 'freellmapi', 'lib', 'prisma', 'public', 'scripts', 'src',
    'types', 'upload', 'uploads',
]
PRUNE_DIR_NAMES = {'node_modules', '.git', '.next', '__pycache__'}
EXCLUDE_TREES = {'src/generated'}  # prisma client output, rebuilt on restore
PARITY_DIRS = {'public/generated'}  # keep only entries the original zip shipped
EXCLUDE_FILES = {
    'scripts/original-encryption-key.txt',
    'scripts/original-nextauth-secret.txt',
    'freellmapi/server/data/freeapi.db',
    'freellmapi/server/data/freeapi.db-shm',
    'freellmapi/server/data/freeapi.db-wal',
}
EXTRA_FILES = [  # (arcname, source path)
    ('FIXES-2026-10-24.md', os.path.join(STAGING, 'FIXES-2026-10-24.md')),
    ('FIXES-2026-10-23.md', os.path.join(STAGING, 'FIXES-2026-10-23.md')),
    ('worklog-original-author.md', os.path.join(STAGING, 'worklog-original-author.md')),
    ('freellmapi/server/data/freeapi.db', SNAP_DB),
]


def load_orig_names():
    with zipfile.ZipFile(ORIG_ZIP) as z:
        return set(n for n in z.namelist() if not n.endswith('/'))


def in_parity_tree(rel_dir):
    """True for public/generated itself AND any subdirectory under it."""
    return rel_dir in PARITY_DIRS or any(
        rel_dir.startswith(d + '/') for d in PARITY_DIRS)


def snapshot_router_db():
    """Consistent snapshot of the live WAL-mode sqlite db via the backup API."""
    if os.path.exists(SNAP_DB):
        os.remove(SNAP_DB)
    src = sqlite3.connect(LIVE_DB, timeout=15)
    dst = sqlite3.connect(SNAP_DB)
    src.backup(dst)  # reads through WAL, consistent point-in-time
    dst.close()
    src.close()
    con = sqlite3.connect(SNAP_DB)
    con.execute('PRAGMA journal_mode=delete')  # clean single-file state
    con.execute('VACUUM')  # compact (absorbs the 4MB WAL content)
    integrity = con.execute('PRAGMA integrity_check').fetchone()[0]
    n_keys = con.execute('SELECT COUNT(*) FROM api_keys').fetchone()[0]
    n_healthy = con.execute(
        "SELECT COUNT(*) FROM api_keys WHERE status='healthy'").fetchone()[0]
    con.close()
    assert integrity == 'ok', f'integrity_check failed: {integrity}'
    print(f'[snapshot] freeapi.db: integrity={integrity}, api_keys={n_keys} '
          f'(healthy={n_healthy}), size={os.path.getsize(SNAP_DB):,} B')
    return n_keys


def preserve_author_worklog():
    with zipfile.ZipFile(ORIG_ZIP) as z:
        data = z.read('worklog.md')
    out = os.path.join(STAGING, 'worklog-original-author.md')
    with open(out, 'wb') as f:
        f.write(data)
    print(f'[provenance] original author worklog preserved: {len(data):,} B')


def build_zip(orig_names):
    # Original directory prefixes under the parity trees — subdirectories the
    # original zip did NOT ship (e.g. runtime imgcache/) must not get a dir
    # entry either.
    orig_pg_dirs = {
        n.rsplit('/', 1)[0]
        for n in orig_names
        for d in PARITY_DIRS
        if n.startswith(d + '/')
    }
    n_files = 0
    n_dirs = 0
    raw = 0
    t0 = time.time()
    with zipfile.ZipFile(OUT_ZIP, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        # root files
        for name in ROOT_FILES:
            p = os.path.join(ROOT, name)
            if not os.path.isfile(p):
                raise FileNotFoundError(f'missing root file: {name}')
            zf.write(p, name)
            n_files += 1
            raw += os.path.getsize(p)

        # whitelisted directory trees
        for d in INCLUDE_DIRS:
            base = os.path.join(ROOT, d)
            if not os.path.isdir(base):
                raise FileNotFoundError(f'missing dir: {d}')
            for dirpath, dirnames, filenames in os.walk(base):
                rel_dir = os.path.relpath(dirpath, ROOT)
                dirnames[:] = sorted(
                    d for d in dirnames
                    if d not in PRUNE_DIR_NAMES
                    and os.path.join(rel_dir, d) not in EXCLUDE_TREES
                    and not (in_parity_tree(rel_dir)
                             and os.path.join(rel_dir, d) not in orig_pg_dirs))
                if not (in_parity_tree(rel_dir) and rel_dir not in orig_pg_dirs):
                    zf.writestr(zipfile.ZipInfo(rel_dir + '/'), b'')  # dir entry
                    n_dirs += 1
                for fn in sorted(filenames):
                    rel = os.path.join(rel_dir, fn)
                    if rel in EXCLUDE_FILES:
                        continue
                    if in_parity_tree(rel_dir) and rel not in orig_names:
                        continue  # session-generated artifact, not in original zip
                    p = os.path.join(dirpath, fn)
                    if os.path.islink(p):
                        print(f'  [warn] skipping symlink: {rel}')
                        continue
                    zf.write(p, rel)
                    n_files += 1
                    raw += os.path.getsize(p)

        # staged extras (fixes doc, author worklog, db snapshot)
        for arcname, src_path in EXTRA_FILES:
            if not os.path.isfile(src_path):
                raise FileNotFoundError(f'missing staged file: {src_path}')
            zf.write(src_path, arcname)
            n_files += 1
            raw += os.path.getsize(src_path)

    dt = time.time() - t0
    size = os.path.getsize(OUT_ZIP)
    print(f'[zip] {n_files} files + {n_dirs} dir entries, '
          f'raw {raw / 1e6:.1f} MB -> {size / 1e6:.1f} MB in {dt:.0f}s')
    return n_files, raw


def verify_zip(orig_names):
    with zipfile.ZipFile(OUT_ZIP) as zf:
        names = zf.namelist()
        bad = zf.testzip()
        assert bad is None, f'corrupt entry: {bad}'
        must_have = [
            'FIXES-2026-10-24.md',
            'FIXES-2026-10-23.md',
            'worklog-original-author.md',
            'worklog.md',
            'RESTORE.md',
            'db/medq-backup-20261022.sql',
            'freellmapi/.env',
            'freellmapi/server/data/freeapi.db',
            'freellmapi/server/data/medq-bridge.json',
            'src/lib/agent/attachment-registry.ts',   # Task 3 fix
            'src/lib/agent/deep-agent-tools.ts',      # Tasks 3+5 fix
            'src/app/api/agent/chat/v2/route.ts',     # Task 3 fix
            'src/lib/ai/resilience.ts',               # Task 7 Tier 1.3
            'src/lib/agent/tools/chat-registry.ts',   # Task 7 Tier 1.2
            'src/lib/agent/tools/image-cache.ts',     # Task 7 Tier 1.4
            'src/lib/agent/tools/flashcards.ts',      # Task 7 Tier 3.9
            'src/lib/agent/tools/study-insights.ts',  # Task 7 Tier 3.10
            'src/app/generated/[...path]/route.ts',   # Task 7 artifact streaming
            'src/components/medq/ai-agent/follow-ups.ts',  # Task 7 Tier 2.7
            'scripts/router-circuit-breaker.mjs',     # Task 7 Tier 4.13
        ]
        missing = [m for m in must_have if m not in names]
        assert not missing, f'missing required entries: {missing}'
        forbidden_patterns = ['node_modules', '.git/', '.next/',
                              'src/generated/',
                              'original-encryption-key', 'original-nextauth-secret',
                              'freeapi.db-wal', 'freeapi.db-shm',
                              'imgcache/']
        leaks = sorted({
            n for n in names
            for pat in forbidden_patterns
            if pat in n and not n.startswith(('download/', 'extracted/'))
        })
        assert not leaks, f'forbidden entries leaked: {leaks[:10]}'
        # parity: every public/generated entry must be from the original zip
        pg = [n for n in names if n.startswith('public/generated/')
              and not n.endswith('/')]
        assert all(n in orig_names for n in pg), \
            'session artifacts leaked into public/generated'
        print(f'[verify] CRC ok, {len(names)} entries; all required present; '
              f'no node_modules/.git/.next/src-generated/secrets leaked; '
              f'public/generated at original parity ({len(pg)} files)')


def main():
    os.makedirs(os.path.dirname(OUT_ZIP), exist_ok=True)
    orig_names = load_orig_names()
    n_keys = snapshot_router_db()
    assert n_keys == 16, f'expected 16 api_keys rows, got {n_keys}'
    preserve_author_worklog()
    build_zip(orig_names)
    verify_zip(orig_names)
    print(f'\nDONE -> {OUT_ZIP}')


if __name__ == '__main__':
    sys.exit(main())
