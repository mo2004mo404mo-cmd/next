/**
 * Reindex the admin-owned duplicate source directly (bun script — .env is
 * auto-loaded by bun, so embeddings + LLM providers resolve as in the app).
 */
import { reindexKnowledgeSource } from '../src/lib/agent/knowledge/pipeline';

async function main() {
  const userId = 'cmusenr950006oir80jr4ludo';
  const sourceId = 'cmv6xgvop0000xurml1w3mzsy';
  console.log('reindexing Peditric-Med (1).pdf as', userId, '…');
  const result = await reindexKnowledgeSource(userId, sourceId);
  console.log('done:', JSON.stringify(result));
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
