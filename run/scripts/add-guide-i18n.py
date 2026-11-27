#!/usr/bin/env python3
"""Add the `guide` i18n section (Concepts guide) to freellmapi en.json.

Other locales intentionally not touched: I18nProvider falls back to the
English bundle for missing keys, so English-only keys are by-design.
"""
import json

PATH = '/home/z/my-project/freellmapi/client/src/i18n/locales/en.json'

GUIDE = {
    "openButton": "Guide",
    "title": "How models & providers work",
    "s1Title": "Two layers, one model picker",
    "s1Intro": "MedQ has two places to add AI power. Both feed the same model pickers everywhere in the app — they differ in who holds the keys and who does the routing.",
    "layerRouterTitle": "This dashboard — MedQ AI Router",
    "layerRouterBody": "A pool of provider keys and custom endpoints behind one unified API key, with automatic routing, cooldowns and failover. Link it once and its whole model list appears in MedQ as medq-router: models.",
    "layerRouterWhere": "here — Keys, Models, Playground",
    "layerDirectTitle": "AI Providers — direct keys",
    "layerDirectBody": "Your own keys pasted straight into MedQ: one key for one provider (OpenAI, Claude, Gemini…) or any OpenAI-compatible URL. MedQ calls that endpoint directly, no routing layer.",
    "layerDirectWhere": "MedQ Settings → AI Providers",
    "s2Title": "Where do I add what?",
    "case1": "I have a key from a provider (Google, GLM, Groq, OpenRouter…)",
    "case1Note": "Pick the provider, paste the key. The router tests it and pulls its model list automatically.",
    "case2": "I run my own models — Ollama, vLLM, LM Studio or a gateway URL",
    "case2Note": "Custom endpoint = any OpenAI-compatible server. Discover models pulls the live list from the endpoint; pick the ones you want and they register in bulk.",
    "case3": "Router models don't show up in MedQ's model pickers",
    "case3Note": "The Link with MedQ generation card registers this dashboard as a MedQ endpoint and refreshes the model list it advertises. Click it once after adding new models.",
    "case4": "The endpoint serves a model that isn't listed",
    "case4Note": "Edit models on the key row registers a model id by hand — same result as discovering it. Use it when a model exists but the endpoint's model list doesn't mention it.",
    "s3Title": "The four words",
    "termProvider": "Provider",
    "termProviderDef": "A known AI company in the catalog (Google, Groq, OpenRouter…). Known providers come with presets: base URL, key format, icon, default model list.",
    "termCustom": "Custom provider / custom endpoint",
    "termCustomDef": "Any OpenAI-compatible server URL you bring — local Ollama, vLLM, LM Studio, a relay. It works exactly like a provider; you supply the Base URL, an optional key and a label.",
    "termModel": "Model",
    "termModelDef": "The thing you actually call — e.g. gemini-2.0-flash or zai-llm. Apps request it through the unified API key; the router picks which healthy key serves it.",
    "termCustomModel": "Custom model",
    "termCustomModelDef": "A model id you register on an endpoint — either discovered (fetched live from the endpoint's /models list) or added by hand in Edit models. Both behave identically afterwards.",
    "s4Title": "Added a model but don't see it?",
    "check1": "The key is enabled and healthy — run a health check on its row in Keys.",
    "check2": "The model is registered on that key — Discover models, or Edit models and add the id by hand.",
    "check3": "The model is enabled on the Models page — models can be switched off individually there.",
    "check4": "For MedQ pickers: the Link with MedQ generation card on the Unified API key tab shows linked — click it to refresh the advertised list, then reopen the picker.",
    "ruleOfThumb": "Rule of thumb: one key, one job → MedQ Settings → AI Providers. Many keys, routing, cooldowns and analytics → this dashboard. Keys are encrypted at rest in both places.",
    "navKeys": "Keys",
    "addKey": "Add key",
    "paneProvider": "Provider key pane",
    "paneCustom": "Custom endpoint pane",
    "tabApiKey": "Unified API key tab",
    "linkCard": "Link with MedQ generation",
    "editModels": "Edit models",
}

with open(PATH) as f:
    data = json.load(f)

assert 'guide' not in data, 'guide section already present'
data['guide'] = GUIDE

with open(PATH, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write('\n')

print('guide section added:', len(GUIDE), 'keys; top-level sections now:', list(data.keys()))
