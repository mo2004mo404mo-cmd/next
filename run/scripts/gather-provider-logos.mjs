#!/usr/bin/env node
/**
 * Gather official brand icons for every freellm Keys-page provider that has
 * no mark in public/logos/ yet.
 *
 * Sources per provider, best-first (everything stored LOCALLY — the app
 * never calls out at runtime):
 *   1. the provider's own homepage: <link rel="apple-touch-icon"> (the
 *      official ~180x180 brand asset) or the largest declared icon link
 *   2. {origin}/favicon.ico
 *   3. favicon mirrors (DuckDuckGo ip3, Google s2 @128px) — last resort
 *
 * Output:
 *   public/logos/{platform}.{png|svg|ico|jpg|webp|gif}
 *   tmp/provider-logo-report.json  — per-provider report
 *   tmp/logo-map.snippet.ts         — ready-to-paste PLATFORM_LOGOS entries
 *
 * Re-running skips platforms that already have a file (--force redoes).
 */
import { writeFile } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const OUT = '/home/z/my-project/public/logos'
const TMP = '/home/z/my-project/tmp'
mkdirSync(OUT, { recursive: true })
mkdirSync(TMP, { recursive: true })

// Platforms that already have a hand-picked mark (brand-family matches).
const EXISTING = {
  custom: 'freellmapi.svg', google: 'gemini.svg', openrouter: 'openrouter.svg',
  siliconflow: 'siliconflow.svg', ollama: 'ollama.svg', zhipu: 'zai.svg',
  qianfan: 'baidu.png', volcengine: 'doubao.svg', tavily: 'tavily.svg',
  bocha: 'bocha.png', brave: 'brave.png',
}

// [platformId, homepage origin] — every Keys-page platform without a mark,
// plus the search providers (Keys search group + Models → Search cards).
const GATHER = [
  ['aclide', 'https://aclide.com'],
  ['speka', 'https://speka.me'],
  ['auray', 'https://app.auray.ai'],
  ['beatapi', 'https://beatapi.io'],
  ['apinex', 'https://apinex.bond'],
  ['typhoon', 'https://playground.opentyphoon.ai'],
  ['plugsky', 'https://plugsky.com'],
  ['inferbase', 'https://inferbase.ai'],
  ['simplellm', 'https://app.simplellm.eu'],
  ['llmtr', 'https://llmtr.com'],
  ['gizmo', 'https://gizmoplatforms.com'],
  ['blockrun', 'https://user.blockrun.ai'],
  ['moondream', 'https://moondream.ai'],
  ['groq', 'https://console.groq.com'],
  ['cerebras', 'https://cloud.cerebras.ai'],
  ['sail', 'https://app.sailresearch.com'],
  ['electronhub', 'https://app.electronhub.ai'],
  ['experiential', 'https://platform.experientiallabs.ai'],
  ['router9', 'https://www.router9.com'],
  ['septor', 'https://septorlabs.com'],
  ['clod', 'https://newapp.clod.io'],
  ['speechify', 'https://platform.speechify.ai'],
  ['freeai', 'https://free.ai'],
  ['blaze', 'https://blazeapi.org'],
  ['lucidity', 'https://composite.lucidity.sh'],
  ['airforce', 'https://api.airforce'],
  ['dreamprompting', 'https://dreamprompting.com'],
  ['waterfall', 'https://getwaterfall.org'],
  ['logfare', 'https://logfare.ai'],
  ['bai', 'https://b.ai'],
  ['radeon', 'https://developer.amd.com.cn'],
  ['nvidia', 'https://build.nvidia.com'],
  ['mistral', 'https://console.mistral.ai'],
  ['cohere', 'https://dashboard.cohere.com'],
  ['cloudflare', 'https://dash.cloudflare.com'],
  ['kilo', 'https://app.kilo.ai'],
  ['pollinations', 'https://enter.pollinations.ai'],
  ['ovh', 'https://endpoints.ai.cloud.ovh.net'],
  ['llm7', 'https://llm7.io'],
  ['huggingface', 'https://huggingface.co'],
  ['opencode', 'https://opencode.ai'],
  ['agnes', 'https://platform.agnes-ai.com'],
  ['reka', 'https://platform.reka.ai'],
  ['routeway', 'https://routeway.ai'],
  ['bazaarlink', 'https://bazaarlink.ai'],
  ['ainative', 'https://ainative.studio'],
  ['aion', 'https://www.aionlabs.ai'],
  ['requesty', 'https://www.requesty.ai'],
  ['navy', 'https://api.navy'],
  ['nara', 'https://router.bynara.id'],
  ['sealion', 'https://sea-lion.ai'],
  ['orcarouter', 'https://www.orcarouter.ai'],
  ['unorouter', 'https://unorouter.com'],
  ['xkiro', 'https://xkiro.com'],
  ['anyapi', 'https://anyapi.ai'],
  ['modelscope', 'https://modelscope.cn'],
  ['aihorde', 'https://aihorde.net'],
  ['longcat', 'https://longcat.chat'],
  ['xfyun', 'https://console.xfyun.cn'],
  // Search providers.
  ['exa', 'https://dashboard.exa.ai'],
  ['firecrawl', 'https://www.firecrawl.dev'],
  ['linkup', 'https://app.linkup.so'],
  ['parallel', 'https://platform.parallel.ai'],
  ['serpsearch', 'https://serpsearch.com'],
]

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
const HDRS = { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*;q=0.8', 'accept-language': 'en-US,en;q=0.9' }
const EXTS = ['png', 'svg', 'ico', 'jpg', 'webp', 'gif']

const force = process.argv.includes('--force')
function existingFile(platform) {
  for (const e of EXTS) if (existsSync(path.join(OUT, `${platform}.${e}`))) return `${platform}.${e}`
  return null
}

async function get(url, ms = 10000) {
  const r = await fetch(url, { headers: HDRS, redirect: 'follow', signal: AbortSignal.timeout(ms) })
  if (!r.ok) return null
  return Buffer.from(await r.arrayBuffer())
}

function sniff(buf) {
  if (!buf || buf.length < 12) return null
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return { ext: 'png', kind: 'png' }
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ext: 'jpg', kind: 'jpg' }
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return { ext: 'gif', kind: 'gif' }
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x45) return { ext: 'webp', kind: 'webp' }
  if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0) return { ext: 'ico', kind: 'ico' }
  const head = buf.subarray(0, 512).toString('utf8').trim()
  if (head.startsWith('<svg') || head.startsWith('<?xml')) return { ext: 'svg', kind: 'svg' }
  return null
}

function pngDims(b) { try { return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) } } catch { return { w: 0, h: 0 } } }
function icoDims(b) {
  try {
    const n = b.readUInt16LE(4); let w = 0, h = 0
    for (let i = 0; i < n; i++) { const o = 6 + i * 16; const iw = b[o] || 256, ih = b[o + 1] || 256; if (iw > w) w = iw; if (ih > h) h = ih }
    return { w, h }
  } catch { return { w: 0, h: 0 } }
}

function parseLinks(html) {
  const out = []
  const re = /<link\b[^>]*>/gi
  let m
  while ((m = re.exec(html))) {
    const tag = m[0]
    const rel = (/rel\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1] ?? '').toLowerCase()
    if (!/(apple-touch-icon|(^|\s)icon|shortcut)/.test(rel)) continue
    if (rel.includes('mask-icon')) continue // Safari monochrome outline — skip
    const href = /href\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]
    if (!href || href.startsWith('data:')) continue
    const sizes = /sizes\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1] ?? ''
    out.push({ rel, href, sizes, apple: rel.includes('apple-touch') })
  }
  return out
}
const sizeOf = (s) => { const m = /(\d+)\s*x\s*(\d+)/i.exec(s ?? ''); return m ? Math.max(+m[1], +m[2]) : 0 }
const rank = (c) => (c.apple ? 1e6 : 0) + sizeOf(c.sizes)

async function gather([platform, home]) {
  const prev = existingFile(platform)
  if (prev && !force) return { platform, ok: true, file: prev, source: 'already on disk', dims: '', quality: 'kept' }

  const { origin, host } = new URL(home)
  const finish = (buf, s, source) => {
    const dims = s.kind === 'png' ? pngDims(buf) : s.kind === 'ico' ? icoDims(buf) : { w: '?', h: '?' }
    const w = typeof dims.w === 'number' ? dims.w : 999
    const quality = s.kind === 'svg' ? 'good (vector)' : w >= 96 ? 'good' : w >= 48 ? 'ok' : w >= 24 ? 'low' : 'tiny'
    const file = `${platform}.${s.ext}`
    return { platform, ok: true, file, source, kind: s.kind, dims: `${dims.w}x${dims.h}`, bytes: buf.length, quality, buf }
  }

  // 1. Icons declared in the homepage HTML (apple-touch-icon first, then biggest).
  try {
    const page = await get(origin, 9000)
    if (page) {
      const html = page.toString('utf8')
      if (html.includes('<')) {
        const cands = parseLinks(html).sort((a, b) => rank(b) - rank(a)).slice(0, 4)
        for (const c of cands) {
          let u
          try { u = new URL(c.href, origin + '/') } catch { continue }
          const buf = await get(u.href, 10000)
          const s = sniff(buf)
          if (s && buf.length < 500_000) {
            const r = finish(buf, s, `${c.apple ? 'apple-touch-icon' : 'site icon'}${c.sizes ? ` (${c.sizes})` : ''}`)
            await writeFile(path.join(OUT, r.file), r.buf)
            const { buf: _b, ...rest } = r
            return rest
          }
        }
      }
    }
  } catch { /* fall through */ }

  // 2. /favicon.ico on the same host.
  try {
    const buf = await get(`${origin}/favicon.ico`, 8000)
    const s = sniff(buf)
    if (s) {
      const r = finish(buf, s, 'favicon.ico')
      await writeFile(path.join(OUT, r.file), r.buf)
      const { buf: _b, ...rest } = r
      return rest
    }
  } catch { /* fall through */ }

  // 3. Favicon mirrors.
  for (const [label, url] of [
    ['duckduckgo mirror', `https://icons.duckduckgo.com/ip3/${host}.ico`],
    ['google mirror', `https://www.google.com/s2/favicons?sz=128&domain=${host}`],
  ]) {
    try {
      const buf = await get(url, 8000)
      const s = sniff(buf)
      if (s) {
        const r = finish(buf, s, label)
        await writeFile(path.join(OUT, r.file), r.buf)
        const { buf: _b, ...rest } = r
        return rest
      }
    } catch { /* try next */ }
  }

  return { platform, ok: false }
}

const queue = [...GATHER]
const results = []
async function worker() {
  while (queue.length) results.push(await gather(queue.shift()))
}
await Promise.all(Array.from({ length: 8 }, worker))

results.sort((a, b) => a.platform.localeCompare(b.platform))
const ok = results.filter(r => r.ok)
const bad = results.filter(r => !r.ok)

console.log(`gathered ${ok.length}/${GATHER.length}; failed ${bad.length}${bad.length ? ': ' + bad.map(b => b.platform).join(', ') : ''}`)
for (const r of ok) console.log(String(r.platform).padEnd(15), String(r.quality).padEnd(13), String(r.dims).padEnd(10), r.source)

await writeFile(path.join(TMP, 'provider-logo-report.json'), JSON.stringify(results, null, 2))

// Ready-to-paste full PLATFORM_LOGOS map (existing + gathered).
const all = { ...Object.fromEntries(Object.entries(EXISTING).map(([k, v]) => [k, `/logos/${v}`])) }
for (const r of ok) if (r.source !== 'already on disk' || !EXISTING[r.platform]) all[r.platform] = `/logos/${r.file}`
for (const [k, v] of Object.entries(EXISTING)) all[k] = `/logos/${v}` // hand-picked wins
const lines = Object.keys(all).sort().map(k => `  ${k}: '${all[k]}',`)
await writeFile(path.join(TMP, 'logo-map.snippet.ts'), lines.join('\n') + '\n')
console.log(`\nmap entries: ${lines.length} → tmp/logo-map.snippet.ts`)
