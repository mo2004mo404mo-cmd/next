#!/usr/bin/env node
// Add `playground.sendInterrupts` + `playground.stoppedReply` (English strings,
// the repo's fallback-in-place pattern for freshly added keys) to every locale
// dictionary right after `playground.stop`, so check:i18n stays green.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../freellmapi/client/src/i18n/locales',
)

const NEW_KEYS = [
  ['sendInterrupts', 'Send (stops the running reply)'],
  ['stoppedReply', 'stopped'],
]

const files = (await readdir(dir)).filter(f => f.endsWith('.json')).sort()
const report = []
for (const file of files) {
  const full = path.join(dir, file)
  let text = await readFile(full, 'utf8')
  const dict = JSON.parse(text)
  if (!dict.playground) throw new Error(`${file}: no playground section`)

  const missing = NEW_KEYS.filter(([k]) => dict.playground[k] === undefined)
  if (missing.length === 0) { report.push(`${file}: already complete`); continue }
  if (missing.length !== NEW_KEYS.length) throw new Error(`${file}: partially migrated — handle manually`)

  // Surgical text insert: right after the `playground.stop` line (the section
  // is flat, 4-space indented, and "stop" appears exactly once at that depth).
  const stopLine = text.split('\n').findIndex(l => /^ {4}"stop": /.test(l))
  if (stopLine === -1) throw new Error(`${file}: no "stop" line found`)
  const lines = text.split('\n')
  const addition = missing.map(([k, v]) => `    "${k}": ${JSON.stringify(v)},`)
  lines.splice(stopLine + 1, 0, ...addition)
  await writeFile(full, lines.join('\n'))

  // Sanity: still valid JSON, keys present exactly once.
  const round = JSON.parse((await readFile(full, 'utf8')))
  for (const [k] of NEW_KEYS) {
    if (round.playground[k] === undefined) throw new Error(`${file}: ${k} missing after edit`)
  }
  report.push(`${file}: added ${missing.map(([k]) => k).join(', ')}`)
}
console.log(report.join('\n'))
console.log(`\n${files.length} locale files processed`)
