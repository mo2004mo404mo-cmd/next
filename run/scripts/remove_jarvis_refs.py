#!/usr/bin/env python3
"""Remove all JARVIS references from MedQ platform source files."""
import json
import re
import sys

ROOT = "/tmp/my-project"
ok = True


def patch(path, old, new, count=1):
    global ok
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    n = text.count(old)
    if n != count:
        print(f"  !! {path}: expected {count} occurrence(s) of pattern, found {n}")
        ok = False
        return
    text = text.replace(old, new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"  patched {path}")


# ── 1. layout.tsx ──────────────────────────────────────────────────────────
patch(
    f"{ROOT}/src/app/layout.tsx",
    "import IOSInstallPrompt from '@/components/medq/IOSInstallPrompt'\n"
    "import JarvisFloatingButton from '@/components/jarvis/JarvisFloatingButton'\n"
    "import { SessionProvider } from 'next-auth/react';",
    "import IOSInstallPrompt from '@/components/medq/IOSInstallPrompt'\n"
    "import { SessionProvider } from 'next-auth/react';",
)
patch(
    f"{ROOT}/src/app/layout.tsx",
    "            <InstallPrompt />\n"
    "            <IOSInstallPrompt />\n"
    "            {/* JARVIS — advanced AI voice assistant floating button.\n"
    "                Renders on every page (gated by NEXT_PUBLIC_JARVIS_ENABLED\n"
    "                and per-user settings; hidden on /jarvis itself). */}\n"
    "            <JarvisFloatingButton />\n",
    "            <InstallPrompt />\n"
    "            <IOSInstallPrompt />\n",
)

# ── 2. prisma/schema.prisma ────────────────────────────────────────────────
schema_path = f"{ROOT}/prisma/schema.prisma"
with open(schema_path, "r", encoding="utf-8") as f:
    text = f.read()

# 2a. Remove the 5 relation lines + section comment from the User model
patch(
    schema_path,
    "  // ── JARVIS assistant relations ──\n"
    "  jarvisConversations  JarvisConversation[]\n"
    "  jarvisMessages       JarvisMessage[]\n"
    "  jarvisSettings       JarvisUserSettings?\n"
    "  jarvisSessions       JarvisSessionLog[]\n"
    "  jarvisToolExecutions JarvisToolExecution[]\n",
    "",
)

# 2b. Remove the whole JARVIS models section (comment header through EOF)
with open(schema_path, "r", encoding="utf-8") as f:
    text = f.read()
marker = "// ===========================================================================\n// JARVIS — Advanced AI Voice Assistant"
idx = text.find(marker)
if idx == -1:
    print("  !! schema: JARVIS section marker not found")
    ok = False
else:
    # Trim trailing blank lines before the section, keep file ending with "}\n"
    trimmed = text[:idx].rstrip("\n") + "\n"
    with open(schema_path, "w", encoding="utf-8") as f:
        f.write(trimmed)
    print("  patched prisma/schema.prisma (removed JARVIS models section)")

# ── 3. i18n locale files ───────────────────────────────────────────────────
for loc in ("en-US", "ar-SA"):
    p = f"{ROOT}/src/lib/i18n/locales/{loc}.json"
    with open(p, "r", encoding="utf-8") as f:
        data = json.load(f)
    if "jarvis" in data:
        del data["jarvis"]
        with open(p, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"  patched {p} (removed jarvis key)")
    else:
        print(f"  .. {p}: no jarvis key")

# ── 4. workspace.ts stub comment ───────────────────────────────────────────
patch(
    f"{ROOT}/src/lib/agent/skills/workspace.ts",
    " The platform\n"
    " * snapshot dropped the original file; this stub returns no-op / null values\n"
    " * so the build compiles and the deep-agent runtime gracefully falls back\n"
    " * to in-memory workspace. The JARVIS assistant does NOT depend on this —\n"
    " * it uses /api/jarvis/* routes which only touch the Jarvis* Prisma models.\n",
    " The platform\n"
    " * snapshot dropped the original file; this stub returns no-op / null values\n"
    " * so the build compiles and the deep-agent runtime gracefully falls back\n"
    " * to in-memory workspace.\n",
)
patch(
    f"{ROOT}/src/lib/agent/skills/loader.ts",
    " * Original implementation synced skill definitions into the per-user agent\n"
    " * workspace at boot. Stubbed here because the platform snapshot dropped the\n"
    " * file and JARVIS does not depend on the skill-sync flow. Restoring the\n"
    " * full loader requires the original source; see workspace.ts for context.\n",
    " * Original implementation synced skill definitions into the per-user agent\n"
    " * workspace at boot. Stubbed here because the platform snapshot dropped the\n"
    " * file. Restoring the full loader requires the original source; see\n"
    " * workspace.ts for context.\n",
)

print("\nAll done." if ok else "\nFAILED — some patterns did not match!")
sys.exit(0 if ok else 1)
