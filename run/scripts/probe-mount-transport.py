"""Transport probe WITH the unified key, all inside the browser session."""
import json

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3000"
ESSAY = "Write a detailed patient guide about anemia: causes, symptoms, classification and treatment."
SHORT = "Say hello in one sentence."

SETUP = """
async () => {
  const bridge = await (await fetch('/api/freellmapi-bridge', { method: 'POST', credentials: 'include' })).json();
  const key = await (await fetch('/freellmapi/api/settings/api-key', {
    headers: { Authorization: 'Bearer ' + bridge.token },
  })).json();
  return { token: bridge.token, apiKey: key.apiKey };
}
"""

PROBE = """
async (args) => {
  const [url, prompt, apiKey] = args;
  const t0 = performance.now();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
      body: JSON.stringify({ messages: [{ role: 'user', content: prompt }], model: 'zai-llm', stream: true }),
    });
    const headersAt = Math.round(performance.now() - t0);
    const ctype = res.headers.get('content-type');
    let firstChunkAt = null, total = '', chunks = 0;
    if (res.body) {
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value && value.length) { chunks++; if (firstChunkAt === null) firstChunkAt = Math.round(performance.now() - t0); }
        total += dec.decode(value, { stream: true });
      }
    } else {
      total = await res.text();
    }
    return { status: res.status, ctype, headersAt,
             firstChunkAt, chunks, chars: total.length, head: total.slice(0, 120) };
  } catch (err) {
    return { error: String(err), at: Math.round(performance.now() - t0) };
  }
}
"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context()
    page = ctx.new_page()
    page.goto(f"{BASE}/login", wait_until="networkidle")
    page.locator("input[type=email]").first.type("admin@medq.com", delay=10)
    page.locator("input[type=password]").first.type("test123", delay=10)
    page.locator("button:has-text('Sign In')").first.click()
    page.wait_for_timeout(4000)

    creds = page.evaluate(SETUP)
    print(f"bridge token ok ({len(creds['token'])} chars), unified key ok ({len(creds['apiKey'])} chars)")

    for mount in ("/freellm", "/freellmapi", ""):
        for label, prompt in (("short", SHORT), ("essay", ESSAY)):
            url = f"{BASE}{mount}/v1/chat/completions"
            out = page.evaluate(PROBE, [url, prompt, creds["apiKey"]])
            print(f"== {mount or '(root /v1)'} {label}: {json.dumps(out)[:300]}")
    browser.close()
