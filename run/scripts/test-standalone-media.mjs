// Isolate the failure: call the sidecar's runImageGeneration directly from a
// STANDALONE node process (no Next.js fetch patching). If it succeeds here
// but fails inside next-server, the culprit is Next's patched global fetch.
import { readFileSync } from 'node:fs';

process.env.ENCRYPTION_KEY = readFileSync('/home/z/my-project/freellmapi/.env', 'utf8')
  .match(/^ENCRYPTION_KEY=(.+)$/m)[1].trim().replace(/^["']|["']$/g, '');
process.env.FREEAPI_DB_DIR = '/home/z/my-project/freellmapi/server/data';
process.env.FREEAPI_ENV_PATH = '/home/z/my-project/freellmapi/.env';

const dbmod = await import('/home/z/my-project/freellmapi/server/dist/db/index.js');
dbmod.initDb();
const media = await import('/home/z/my-project/freellmapi/server/dist/services/media.js');
const t0 = Date.now();
try {
  const result = await media.runImageGeneration('cogview-4', {
    prompt: 'a simple teal circle on white background, minimal',
    size: '1024x1024',
    n: 1,
  });
  console.log(`STANDALONE runImageGeneration: SUCCESS in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(`  provider=${result.platform} model=${result.modelId} images=${result.images.length}`);
  console.log(`  b64len=${result.images[0]?.b64_json?.length ?? result.images[0]?.url ?? 'none'}`);
} catch (e) {
  console.log(`STANDALONE runImageGeneration: FAILED in ${((Date.now() - t0) / 1000).toFixed(1)}s — ${e.message.slice(0, 200)}`);
}
process.exit(0);
