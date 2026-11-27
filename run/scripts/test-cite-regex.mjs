// Regression test for AgentMarkdown's preprocessCitations — mirrors the real
// function (keep in sync with src/components/medq/ai-agent/AgentMarkdown.tsx).
// Run: node scripts/test-cite-regex.mjs

function encodeLinkUrl(url) {
  return url.replace(/\(/g, '%28').replace(/\)/g, '%29');
}

function preprocessCitations(text, citations, webCitations) {
  if (!/\[[KS]\d+/i.test(text) && !/\bK\d{1,2}\b/.test(text)) return text;
  const byK = new Map((citations ?? []).map((c) => [c.ref, c]));
  const byS = new Map((webCitations ?? []).map((c) => [c.ref, c]));
  // Pass 1 — fenced / non-fenced line groups.
  const groups = [];
  let fence = false;
  for (const line of text.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      const last = groups[groups.length - 1];
      if (!fence) {
        groups.push({ fence: true, lines: [line] });
        fence = true;
      } else {
        if (last && last.fence) last.lines.push(line);
        fence = false;
      }
      continue;
    }
    const last = groups[groups.length - 1];
    if (last && last.fence === fence) last.lines.push(line);
    else groups.push({ fence, lines: [line] });
  }
  const out = [];
  for (const group of groups) {
    if (group.fence) {
      out.push(...group.lines);
      continue;
    }
    let chunk = group.lines.join('\n');
    // Pass 2 — multi-ref expansion (cross-line + per-ref letters).
    chunk = chunk.replace(
      /\[([KS])((?:\s*[KS]?\d+(?:\s*,\s*[KS]?\d+)*\s*)+)\]/gi,
      (_m, kind, nums) =>
        nums
          .split(',')
          .map((n) => {
            const t = n.trim();
            const m = /^([KS])?(\d+)$/i.exec(t);
            const k = (m?.[1] ?? kind).toUpperCase();
            return `[${k}${m?.[2]}]`;
          })
          .join(' '),
    );
    // Pass 3 — per-line: bare-K first, then bracketed→link.
    chunk = chunk
      .split('\n')
      .map((line) => {
        let l = line;
        if (byK.size > 0) {
          l = l.replace(
            /(^|[^\w[\]])(K\d{1,2})(?=[.,;:!)]|$)/g,
            (m, pre, ref, offset, full) => {
              if (!byK.has(ref)) return m;
              const before = full.slice(0, offset).toLowerCase();
              if (/(vitamin|phytonadione|vit\.?)\s*$/.test(before)) return m;
              return `${pre}[${ref}](medq-cite:${ref})`;
            },
          );
        }
        l = l.replace(/\[K(\d+)\](?!\()/g, (_m, n) => `[K${n}](medq-cite:K${n})`);
        if (byS.size > 0) {
          l = l.replace(/\[S(\d+)\](?!\()/g, (m, n) => {
            const c = byS.get(`S${n}`);
            return c ? `[S${n}](${encodeLinkUrl(c.url)})` : m;
          });
        }
        return l;
      })
      .join('\n');
    out.push(chunk);
  }
  return out.join('\n');
}

const cits = Array.from({ length: 10 }, (_, i) => ({ ref: `K${i + 1}` }));
const web = [
  { ref: 'S1', url: 'https://example.com/a' },
  { ref: 'S2', url: 'https://example.com/b' },
];

let failures = 0;
const expect = (name, input, expected, ...args) => {
  const got = preprocessCitations(input, ...args);
  const ok = got === expected;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(got)}`);
};

// 1. plain multi-ref with letters
expect('multi-ref [K1, K3]', 'heart failure [K1, K3].', 'heart failure [K1](medq-cite:K1) [K3](medq-cite:K3).', cits, []);
// 2. cross-line multi-ref (the user-reported case)
expect('cross-line [K1\\n, K2]', 'failure [K1\n, K2].', 'failure [K1](medq-cite:K1) [K2](medq-cite:K2).', cits, []);
// 3. bare K at sentence end
expect('bare K1 at end', 'volume load K1', 'volume load [K1](medq-cite:K1)', cits, []);
expect('bare K1 with period', 'load K1.', 'load [K1](medq-cite:K1).', cits, []);
// 4. vitamin K1 NOT converted (mid-sentence AND at end)
expect('vitamin K1 mid-sentence', 'Vitamin K1 helps clotting', 'Vitamin K1 helps clotting', cits, []);
expect('vitamin K1 at end', 'give vitamin K1.', 'give vitamin K1.', cits, []);
// 5. no mangling of hrefs created by the same pass (the %5B bug)
expect('no nested-link mangling', 'failure [K1, K2]. load K1.', 'failure [K1](medq-cite:K1) [K2](medq-cite:K2). load [K1](medq-cite:K1).', cits, []);
// 6. S refs become real links
expect('S single', 'see [S1] here', 'see [S1](https://example.com/a) here', cits, web);
expect('S multi', 'see [S1, S2] here', 'see [S1](https://example.com/a) [S2](https://example.com/b) here', cits, web);
// 7. S refs without metadata stay literal
expect('S no metadata', 'see [S9] here', 'see [S9] here', cits, []);
// 8. model-written real link left alone
expect('model link untouched', 'go [here](https://x.com) now', 'go [here](https://x.com) now', cits, []);
// 9. fenced code skipped
expect('fence skipped', '```\n[K1, K2] bare K1.\n```', '```\n[K1, K2] bare K1.\n```', cits, []);
// 10. bare K without citations metadata stays bare
expect('bare K no metadata', 'load K1.', 'load K1.', [], []);
// 11. mixed-kind multi-ref
expect('mixed [K1, S2]', 'ref [K1, S2].', 'ref [K1](medq-cite:K1) [S2](https://example.com/b).', cits, web);

console.log(failures === 0 ? '\nALL PASS' : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
