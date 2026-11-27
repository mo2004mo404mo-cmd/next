#!/usr/bin/env python3
"""
build-delivery-zip.py — build the sanitized MedQ app delivery zip.

Usage:  python3 scripts/build-delivery-zip.py

What goes in (mirrors the previous delivery layout):
  - Root configs: .env (SANITIZED, fresh dev NEXTAUTH_SECRET), .gitignore,
    Caddyfile, bun.lock, components.json, eslint.config.mjs, next-env.d.ts,
    next.config.ts, package.json, postcss.config.mjs, prisma.config.ts,
    proxy.ts, tsconfig.json, worklog.md
  - Dirs: db/ (incl. full data backup) download/ freellmapi/ lib/ prisma/
    public/ scripts/ src/ types/ upload/
  - freellmapi/ is the COMPLETE vendored clone of github.com/tashfeenahmed/
    freellmapi minus node_modules, client/server dist builds and the live
    server/data SQLite DB + logs. Its .env never ships (dot-file skip) — the
    live ENCRYPTION_KEY that encrypts provider keys must not leak; a fresh
    install generates its own (see freellmapi/SETUP.md).
  - freellmapi/client/dist-freellm/ IS shipped (unlike client/dist): it is the
    VITE_BASE=/freellm/ bundle of the customized MedQ AI Router dashboard that
    src/app/freellm/[[...path]]/route.ts serves — without it /freellm 404s on
    a fresh install (rebuildable via VITE_BASE=/freellm/ npm run build -w
    client, but ship it so both /freellm and /freellmapi work out of the box).

What stays out:
  - node_modules/ .next/ .git/ skills/ tool-results/  (tooling & workspace)
  - dev.log, tsconfig.tsbuildinfo, .job-store.json   (runtime/build state)
  - public/generated/  (18MB of agent test artifacts), public/*.zip
  - prisma/.ipynb_checkpoints/
  - freellmapi/client/dist, freellmapi/server/dist, freellmapi/server/data
    (build output + live SQLite DB/logs)

Security:
  - .env inside the zip is rewritten: NEXTAUTH_SECRET is replaced with a
    FRESH random dev secret (never the live one — the zip is publicly served).
  - MEDQ_AGENT_API_KEY (the live unified key to the local freellmapi sidecar)
    is blanked in the shipped .env — a fresh install generates its own sidecar
    key (freellmapi/SETUP.md) and sets it there.
  - After writing, the zip bytes are scanned for the live secret values and
    key-shaped strings; the build FAILS if any leak is detected.

Output: public/medq-app-full-<YYYYMMDD>.zip
"""

import os
import re
import sys
import zipfile
import secrets as pysecrets
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Optional CLI override: python3 scripts/build-delivery-zip.py 20261003
# (defaults to the server-local date, which is UTC — the interactive session
#  may be on a different calendar day, so prefer passing it explicitly.)
_day = sys.argv[1] if len(sys.argv) > 1 else date.today().strftime("%Y%m%d")
OUT_NAME = f"medq-app-full-{_day}.zip"
OUT_PATH = os.path.join(ROOT, "public", OUT_NAME)

ROOT_FILES = [
    ".env",
    ".gitignore",
    "Caddyfile",
    "bun.lock",
    "components.json",
    "eslint.config.mjs",
    "next-env.d.ts",
    "next.config.ts",
    "package.json",
    "postcss.config.mjs",
    "prisma.config.ts",
    "proxy.ts",
    "tsconfig.json",
    "worklog.md",
    "RESTORE.md",
]

INCLUDE_DIRS = ["db", "download", "freellmapi", "lib", "prisma", "public", "scripts", "src", "types", "upload"]

# (relative path prefix, is-dir) patterns excluded from the walk
EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    ".git",
    "skills",
    "tool-results",
    "extracted",          # stale leftover of the previous delivery extraction
    ".backup-template",
    ".zscripts",
    os.path.join("public", "generated"),
    # public/downloads is the runtime HTTP publishing surface (copies of
    # download/ made by scripts/publish-downloads.py) — download/ itself ships
    # in full; regenerating the surface is one script run on the target box.
    os.path.join("public", "downloads"),
    os.path.join("prisma", ".ipynb_checkpoints"),
    os.path.join("freellmapi", "client", "dist"),   # rebuilt via npm run build -w client
    os.path.join("freellmapi", "server", "dist"),   # rebuilt via npm run build -w server
    os.path.join("freellmapi", "server", "data"),   # live SQLite DB + logs (never ship)
    os.path.join("upload", "fixtures"),  # local E2E test media (large, not app code)
    os.path.join("upload", "audio-store"),  # retained user audio for playback (private data, not app code)
}
EXCLUDE_FILE_NAMES = {"dev.log", "tsconfig.tsbuildinfo", ".job-store.json", "received_file"}
EXCLUDE_SUFFIXES = (".zip", ".log")


def sanitize_env(raw: str) -> str:
    """Keep structure; swap NEXTAUTH_SECRET for a fresh dev secret, blank
    BYOK_MASTER_KEY (byok-crypto then derives from NEXTAUTH_SECRET — the
    live master key must never ship in a publicly-served zip) and blank
    MEDQ_AGENT_API_KEY (live sidecar unified key — fresh installs generate
    their own sidecar key)."""
    fresh = f'"{pysecrets.token_hex(32)}"'
    out_lines = []
    for line in raw.splitlines():
        if line.startswith("NEXTAUTH_SECRET="):
            out_lines.append(f"NEXTAUTH_SECRET={fresh}")
        elif line.startswith("BYOK_MASTER_KEY="):
            out_lines.append("BYOK_MASTER_KEY=")
        elif line.startswith("MEDQ_AGENT_API_KEY="):
            out_lines.append("MEDQ_AGENT_API_KEY=")
        else:
            out_lines.append(line)
    # ensure trailing newline matches the original style
    if raw.endswith("\n"):
        out_lines.append("")
    return "\n".join(out_lines)


def iter_files():
    """Yield (zip_name, abs_path) for everything that belongs in the zip."""
    for name in ROOT_FILES:
        p = os.path.join(ROOT, name)
        if os.path.exists(p):
            yield name, p
        else:
            print(f"  WARN root file missing: {name}")
    for d in INCLUDE_DIRS:
        base = os.path.join(ROOT, d)
        if not os.path.isdir(base):
            print(f"  WARN dir missing: {d}")
            continue
        for dirpath, dirnames, filenames in os.walk(base):
            rel_dir = os.path.relpath(dirpath, ROOT)
            # prune excluded dirs in-place
            dirnames[:] = [
                dn
                for dn in dirnames
                if os.path.join(rel_dir, dn) not in EXCLUDE_DIRS
                and dn not in EXCLUDE_DIRS
                and not dn.startswith(".git")
            ]
            for fn in sorted(filenames):
                if fn in EXCLUDE_FILE_NAMES:
                    continue
                if fn.endswith(EXCLUDE_SUFFIXES):
                    continue
                if fn.startswith("."):
                    continue  # hidden editor state
                abs_path = os.path.join(dirpath, fn)
                if not os.path.isfile(abs_path):
                    continue
                rel = os.path.relpath(abs_path, ROOT)
                yield rel, abs_path


def main() -> int:
    if os.path.exists(OUT_PATH):
        os.remove(OUT_PATH)

    # live secrets (for the post-write leak scan)
    live_secret = ""
    live_byok_master = ""
    live_freellm_key = ""
    live_medq_agent_key = ""
    for line in open(os.path.join(ROOT, ".env")):
        if line.startswith("NEXTAUTH_SECRET="):
            live_secret = line.split("=", 1)[1].strip().strip('"').strip("'")
        elif line.startswith("BYOK_MASTER_KEY="):
            live_byok_master = line.split("=", 1)[1].strip().strip('"').strip("'")
        elif line.startswith("MEDQ_AGENT_API_KEY="):
            live_medq_agent_key = line.split("=", 1)[1].strip().strip('"').strip("'")
    # the sidecar's ENCRYPTION_KEY encrypts every freellmapi provider key —
    # a leak would be as bad as shipping the NEXTAUTH_SECRET
    freellm_env = os.path.join(ROOT, "freellmapi", ".env")
    if os.path.exists(freellm_env):
        for line in open(freellm_env):
            if line.startswith("ENCRYPTION_KEY="):
                live_freellm_key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not live_secret:
        print("FATAL: could not read live NEXTAUTH_SECRET for leak scan")
        return 1

    sanitized_env = sanitize_env(open(os.path.join(ROOT, ".env")).read())

    count = 0
    total = 0
    with zipfile.ZipFile(OUT_PATH, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for rel, abs_path in iter_files():
            if rel == ".env":
                z.writestr(rel, sanitized_env)
                print(f"  .env → sanitized (fresh dev NEXTAUTH_SECRET)")
                count += 1
                continue
            size = os.path.getsize(abs_path)
            z.write(abs_path, rel)
            count += 1
            total += size

    # ---- verification ----
    with zipfile.ZipFile(OUT_PATH) as z:
        names = z.namelist()
        assert z.testzip() is None, "zip integrity FAILED"
        # leak scan: live secret must not appear anywhere
        blob = b"".join(z.read(n) for n in names)
        assert live_secret.encode() not in blob, "LEAK: live NEXTAUTH_SECRET found in zip!"
        if live_byok_master:
            assert live_byok_master.encode() not in blob, "LEAK: live BYOK_MASTER_KEY found in zip!"
        if live_medq_agent_key:
            assert live_medq_agent_key.encode() not in blob, "LEAK: live MEDQ_AGENT_API_KEY found in zip!"
        if live_freellm_key:
            assert live_freellm_key.encode() not in blob, "LEAK: live freellmapi ENCRYPTION_KEY found in zip!"
            # the sidecar .env must not have shipped at all (dot-file skip)
            assert "freellmapi/.env" not in names, "LEAK: freellmapi/.env shipped in zip!"
        # the shipped .env must carry an EMPTY BYOK_MASTER_KEY (derive-from-secret path)
        # and an EMPTY MEDQ_AGENT_API_KEY (fresh sidecar key on install)
        for line in z.read(".env").decode().splitlines():
            if line.startswith("BYOK_MASTER_KEY="):
                assert line.split("=", 1)[1].strip() == "", "shipped BYOK_MASTER_KEY must be empty"
            if line.startswith("MEDQ_AGENT_API_KEY="):
                assert line.split("=", 1)[1].strip() == "", "shipped MEDQ_AGENT_API_KEY must be empty"
        # key-shaped strings in the shipped .env
        env_out = z.read(".env").decode()
        for line in env_out.splitlines():
            if line.startswith("NEXTAUTH_SECRET="):
                v = line.split("=", 1)[1].strip().strip('"')
                assert v != live_secret and len(v) == 64, "env NEXTAUTH_SECRET wrong"
        # sanity: this delivery's feature files are present
        for must in [
            # Multi-endpoint BYOK + AI explanations (Task 66)
            "src/lib/server/byok.ts",
            "src/lib/server/resolve-model.ts",
            "src/components/medq/ByokSettingsSection.tsx",
            "src/lib/explanation-plan.ts",
            "src/app/api/questions/explain/route.ts",
            "src/components/medq/ExplainQuestionsModal.tsx",
            # Question import feature (Task 23/24/25)
            "src/components/medq/ImportQuestionsModal.tsx",
            "src/app/api/questions/import/extract/route.ts",
            "src/app/api/questions/import/route.ts",
            "src/lib/ai/unified-llm.ts",
            # RAG / knowledge features (Task 21)
            "src/components/medq/SourceViewerModal.tsx",
            "src/components/medq/KnowledgeLibraryPanel.tsx",
            "src/components/medq/DrivePickerModal.tsx",
            "src/components/medq/TranscriptStudioModal.tsx",
            "src/app/api/knowledge/sources/[id]/route.ts",
            "src/app/api/knowledge/sources/[id]/audio/route.ts",
            "src/lib/agent/knowledge/google-drive.ts",
            "src/lib/agent/knowledge/url-source.ts",
            "src/lib/agent/knowledge/ingest-media.ts",
            "src/lib/agent/knowledge/audio-pipeline.ts",
            "src/lib/agent/knowledge/asr-provider.ts",
            "src/app/api/knowledge/drive/status/route.ts",
            "prisma/schema.prisma",
            "package.json",
            f"db/medq-backup-{_day}.sql",
            # freellmapi sidecar — complete clone (this delivery's feature)
            "freellmapi/SETUP.md",
            "freellmapi/package.json",
            "freellmapi/server/src/app.ts",
            "freellmapi/server/src/index.ts",
            "freellmapi/client/src/App.tsx",
            "freellmapi/client/src/lib/api.ts",
            "freellmapi/client/package.json",
            "freellmapi/shared/types.ts",
            # MedQ integration points
            "src/lib/freellmapi-proxy.ts",
            "src/app/freellmapi/[[...path]]/route.ts",
            "src/app/v1/[[...path]]/route.ts",
            "src/components/medq/FreeLLMTab.tsx",
            "src/components/medq/tabs/group-ai.ts",
            "src/app/freellm/[[...path]]/route.ts",   # /freellm mount (Task 5 restore)
            "freellmapi/client/dist-freellm/index.html",  # VITE_BASE=/freellm/ bundle it serves
            "scripts/start-freellmapi.sh",
            "scripts/rebuild-with-freellmapi.sh",
            "scripts/verify-freellmapi.sh",
            "scripts/mock-local-ollama.js",
            "scripts/dump-db.ts",
            # Real-endpoint rewiring (Task 5)
            "scripts/rewire-real-ollama2.mjs",
            "scripts/verify-real-router.mjs",
            "scripts/list-sidecar-keys.mjs",
            "scripts/check-ai-call-log.mjs",
            "scripts/probe-real-endpoints.mjs",
            "scripts/test-agent-chat.mjs",
            "scripts/verify-freellm-mounts.py",
            "scripts/verify-freellm-rebrand.py",
        ]:
            assert must in names, f"missing expected file: {must}"

    print(f"\nOK  {OUT_NAME}")
    print(f"    entries: {count}")
    print(f"    uncompressed: {total / 1024 / 1024:.1f} MB")
    print(f"    zip size: {os.path.getsize(OUT_PATH) / 1024 / 1024:.1f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
