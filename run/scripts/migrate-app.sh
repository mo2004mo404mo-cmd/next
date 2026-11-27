#!/bin/bash
# Migrate the extracted MedQ app into /home/z/my-project (replacing the template)
set -euo pipefail

PROJ=/home/z/my-project
APP=$PROJ/extracted
cd "$PROJ"

echo "[1/6] stopping template dev server..."
pkill -f "next dev -p 3000" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
pkill -f "bun run dev" 2>/dev/null || true
pkill -f "dev/build/postcss" 2>/dev/null || true
sleep 2

echo "[2/6] backing up template to .backup-template/ ..."
mkdir -p .backup-template
for item in src prisma public db examples tests mini-services tailwind.config.ts \
            package.json bun.lock next.config.ts tsconfig.json postcss.config.mjs \
            components.json eslint.config.mjs next-env.d.ts .env .gitignore; do
  if [ -e "$item" ] && [ ! -e ".backup-template/$item" ]; then
    mv "$item" .backup-template/
  fi
done

echo "[3/6] removing template build artifacts (node_modules, .next, dev.log)..."
rm -rf node_modules .next dev.log

echo "[4/6] copying app files into project root..."
cp -a "$APP/.env"          "$PROJ/.env"
cp -a "$APP/.gitignore"    "$PROJ/.gitignore"
cp -a "$APP/bun.lock"      "$PROJ/bun.lock"
cp -a "$APP/components.json" "$PROJ/"
cp -a "$APP/eslint.config.mjs" "$PROJ/"
cp -a "$APP/next-env.d.ts"   "$PROJ/"
cp -a "$APP/next.config.ts"  "$PROJ/"
cp -a "$APP/package.json"   "$PROJ/"
cp -a "$APP/postcss.config.mjs" "$PROJ/"
cp -a "$APP/prisma.config.ts"   "$PROJ/"
cp -a "$APP/proxy.ts"      "$PROJ/"
cp -a "$APP/tsconfig.json" "$PROJ/"
cp -a "$APP/worklog.md"    "$PROJ/worklog.md"
cp -a "$APP/prisma"         "$PROJ/prisma"
cp -a "$APP/types"          "$PROJ/types"
cp -a "$APP/lib"            "$PROJ/lib"
cp -a "$APP/src"            "$PROJ/src"
cp -a "$APP/public"         "$PROJ/public"
cp -a "$APP/db/."           "$PROJ/db/"
# merge app scripts into existing scripts/ dir (no filename conflicts)
cp -a "$APP/scripts/."      "$PROJ/scripts/"

echo "[5/6] sanity check..."
[ -f "$PROJ/src/app/page.tsx" ] && echo "  page.tsx OK" || { echo "  MISSING page.tsx"; exit 1; }
[ -f "$PROJ/prisma/schema.prisma" ] && echo "  schema OK" || { echo "  MISSING schema"; exit 1; }
[ -d "$PROJ/src/generated" ] && echo "  generated client OK" || echo "  generated client missing (prisma generate will create)"
grep -q '"name": "my-app"' "$PROJ/package.json" && echo "  app package.json OK" || { echo "  wrong package.json"; exit 1; }
echo "[6/6] MIGRATION COMPLETE"
