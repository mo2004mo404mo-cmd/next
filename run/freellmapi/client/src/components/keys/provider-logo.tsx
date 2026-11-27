import { useState } from 'react'

// Brand marks for provider rows, served by the MedQ host from public/logos/.
// Root-absolute URLs resolve against the site origin, so the same path works
// on the /freellm mount, the /freellmapi mount and the main MedQ app — one
// copy of each asset on disk, none of them duplicated into either bundle.
//
// Sources: the hand-picked brand-family marks (custom/google/zhipu/...), and
// one official mark per remaining provider, gathered once from each
// provider's own site (scripts/gather-provider-logos.mjs — apple-touch-icon
// first, favicon fallbacks) and stored locally. Providers still missing a
// mark fall back to a deterministic letter tile (never a wrong-brand image).
const PLATFORM_LOGOS: Record<string, string> = {
  aclide: '/logos/aclide.ico',
  agnes: '/logos/agnes.svg',
  aihorde: '/logos/aihorde.png',
  ainative: '/logos/ainative.png',
  aion: '/logos/aion.png',
  airforce: '/logos/airforce.png',
  anyapi: '/logos/anyapi.png',
  apinex: '/logos/apinex.png',
  auray: '/logos/auray.png',
  bai: '/logos/bai.png',
  bazaarlink: '/logos/bazaarlink.svg',
  beatapi: '/logos/beatapi.png',
  blaze: '/logos/blaze.png',
  blockrun: '/logos/blockrun.svg',
  bocha: '/logos/bocha.png',
  brave: '/logos/brave.png',
  cerebras: '/logos/cerebras.png',
  clod: '/logos/clod.jpg',
  cloudflare: '/logos/cloudflare.png',
  cohere: '/logos/cohere.png',
  // The custom group is the MedQ AI Router's own endpoints — same mark the
  // main app's BYOK registry uses for the medq-router provider.
  custom: '/logos/freellmapi.svg',
  dreamprompting: '/logos/dreamprompting.png',
  electronhub: '/logos/electronhub.png',
  exa: '/logos/exa.ico',
  experiential: '/logos/experiential.svg',
  firecrawl: '/logos/firecrawl.ico',
  freeai: '/logos/freeai.png',
  gizmo: '/logos/gizmo.png',
  google: '/logos/gemini.svg',
  groq: '/logos/groq.ico',
  huggingface: '/logos/huggingface.ico',
  inferbase: '/logos/inferbase.png',
  kilo: '/logos/kilo.png',
  linkup: '/logos/linkup.svg',
  llm7: '/logos/llm7.png',
  llmtr: '/logos/llmtr.png',
  logfare: '/logos/logfare.png',
  longcat: '/logos/longcat.svg',
  lucidity: '/logos/lucidity.png',
  mistral: '/logos/mistral.png',
  modelscope: '/logos/modelscope.ico',
  moondream: '/logos/moondream.png',
  nara: '/logos/nara.png',
  navy: '/logos/navy.png',
  nvidia: '/logos/nvidia.ico',
  ollama: '/logos/ollama.svg',
  opencode: '/logos/opencode.png',
  openrouter: '/logos/openrouter.svg',
  orcarouter: '/logos/orcarouter.ico',
  ovh: '/logos/ovh.ico',
  parallel: '/logos/parallel.png',
  plugsky: '/logos/plugsky.png',
  pollinations: '/logos/pollinations.png',
  qianfan: '/logos/baidu.png',
  radeon: '/logos/radeon.ico',
  reka: '/logos/reka.png',
  requesty: '/logos/requesty.png',
  router9: '/logos/router9.png',
  routeway: '/logos/routeway.png',
  sail: '/logos/sail.ico',
  sealion: '/logos/sealion.png',
  septor: '/logos/septor.ico',
  serpsearch: '/logos/serpsearch.png',
  siliconflow: '/logos/siliconflow.svg',
  simplellm: '/logos/simplellm.png',
  speechify: '/logos/speechify.png',
  tavily: '/logos/tavily.svg',
  typhoon: '/logos/typhoon.ico',
  unorouter: '/logos/unorouter.png',
  volcengine: '/logos/doubao.svg',
  waterfall: '/logos/waterfall.ico',
  xfyun: '/logos/xfyun.ico',
  xkiro: '/logos/xkiro.png',
  zhipu: '/logos/zai.svg',
}

// Black-on-transparent marks would vanish in dark mode as-is; like the main
// app's ProviderAvatar, they are inverted on a dark tile instead.
const MONO_LOGOS = new Set(['openrouter', 'ollama', 'siliconflow'])

// Brand hues for the letter-tile fallback (mirrors MedQ's PLATFORM_COLORS).
const PLATFORM_COLORS: Record<string, string> = {
  google: '#4285f4',
  openrouter: '#64748b',
  siliconflow: '#7c3aed',
  ollama: '#a3a3a3',
  zhipu: '#00e5a0',
  custom: '#22c55e',
  volcengine: '#0ea5e9',
  tavily: '#18a4e0',
  bocha: '#f59e0b',
  brave: '#fb542b',
}

// Unlisted platforms still get a stable hue derived from their id, so tiles
// don't reshuffle between renders or across machines.
function tileColor(platform: string): string {
  const known = PLATFORM_COLORS[platform]
  if (known) return known
  let h = 0
  for (let i = 0; i < platform.length; i++) h = (h * 31 + platform.charCodeAt(i)) % 360
  return `hsl(${h} 55% 45%)`
}

/**
 * Provider mark: the brand logo when MedQ ships one (see public/logos/),
 * otherwise a tinted letter tile. Sizing is call-site controlled because the
 * same mark sits in 20px group headers, 14px checklist chips and 28px search
 * cards — pass tile/radius/letter classes per surface.
 */
export function ProviderLogo({
  platform,
  label,
  tileClass = 'size-5',
  radiusClass = 'rounded-[5px]',
  letterClass = 'text-[9px]',
}: {
  platform: string
  label: string
  tileClass?: string
  radiusClass?: string
  letterClass?: string
}) {
  // A 404 or a corrupted asset drops back to the letter tile, never a
  // broken-image glyph next to a provider's name.
  const [broken, setBroken] = useState(false)
  const src = PLATFORM_LOGOS[platform]
  const mono = src !== undefined && MONO_LOGOS.has(platform)

  if (src !== undefined && !broken) {
    return (
      <span
        aria-hidden
        className={`inline-grid shrink-0 place-items-center overflow-hidden border border-black/10 dark:border-white/15 ${radiusClass} ${tileClass} ${mono ? 'bg-[#161923]' : 'bg-white'}`}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setBroken(true)}
          className={`size-[62%] object-contain ${mono ? 'invert' : ''}`}
        />
      </span>
    )
  }

  const color = tileColor(platform)
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center font-semibold uppercase ${radiusClass} ${tileClass}`}
      style={{ backgroundColor: `${color}22`, color }}
    >
      <span className={`${letterClass} leading-none`}>{label.charAt(0)}</span>
    </span>
  )
}
