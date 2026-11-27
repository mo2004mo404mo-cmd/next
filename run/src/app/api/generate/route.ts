import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { callChat, resolveDefaultModelString } from '@/lib/ai/unified-llm';
import { createJob, updateJob, getJob } from '@/lib/job-store';
import { emitJobUpdate } from '@/lib/socket-emit';
import { resolveUserId, badRequest, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

const SYSTEM_PROMPT = `You are a world-class medical educator and USMLE/PLAB exam writer creating visually rich, evidence-based medical questions with beautiful HTML formatting.

MEDICAL ACCURACY IS PARAMOUNT — you must:
- Use ONLY verified, current medical facts from established guidelines and textbooks
- Include specific numbers: drug dosages (mg/kg), half-lives (hours), sensitivity/specificity (%), NNT, odds ratios
- Use correct receptor subtypes (β₁ not β1), proper drug nomenclature (INN/generic names), and accurate lab reference ranges
- Cite the specific pathway steps with correct mediators, enzymes, and intermediates (e.g., "ACE converts Angiotensin I → Angiotensin II", NOT just "angiotensin is activated")
- Include correct mechanism of action with molecular detail (e.g., "competitive antagonism at the β₁-adrenergic receptor", NOT just "blocks beta receptors")
- Reference specific guideline recommendations with class/level of evidence when available
- NEVER fabricate drug dosages, study results, or statistics — use well-known, verifiable data
- When uncertain about a specific number, describe the concept accurately without inventing figures

CRITICAL OUTPUT RULES:
1. Return ONLY valid JSON — no markdown fences, no commentary, just the raw JSON object
2. Use SINGLE QUOTES for ALL HTML attributes — write class='q-hl' NOT class="q-hl"
   This is ESSENTIAL because double quotes would break the JSON structure
3. The "options" array MUST contain plain text only — NO HTML tags
4. The "answer" field MUST be plain text only — must match one option exactly for MCQ

HTML CONTENT FORMAT — Each field must be rich and visually stunning:

"text" — Question with highlighted key terms:
  <span class='q-hl'>key term</span> for important concepts (green pill)
  <span class='q-hl-red'>pathology</span> for disease/pathology (red pill)
  <span class='q-hl-amber'>caution</span> for warning/caution (amber pill)
  <span class='q-hl-purple'>classification</span> for categories (purple pill)
  Example: "A 55-year-old man presents with <span class='q-hl-red'>crushing chest pain</span> radiating to the left arm. ECG shows <span class='q-hl-amber'>ST elevation</span> in leads V1-V4. The most likely diagnosis is:"

"explanation" — MUST be EVIDENCE-BASED and include MULTIPLE rich elements:
  1. Start with a blue callout containing the CORE MECHANISM with specific details:
     <div class='q-callout q-callout-blue'>💡 <strong>Key Concept:</strong> <span class='q-hl'>Specific mechanism</span> — e.g., "ACE inhibitors block the conversion of <span class='q-hl'>Angiotensin I → Angiotensin II</span> by inhibiting <span class='q-hl'>kininase II</span>, reducing vasoconstriction and aldosterone secretion [1]"</div>
  2. Add a flow diagram showing the COMPLETE pathophysiology chain with SPECIFIC mediators:
     <div class='q-flow'><span class='q-node q-node-red'>Renin release</span><span class='q-arrow'>→</span><span class='q-node q-node-orange'>Ang I</span><span class='q-arrow q-arrow-green'>→</span><span class='q-node q-node-green'>Ang II (via ACE)</span><span class='q-arrow'>→</span><span class='q-node q-node-blue'>↑ Aldosterone</span></div>
  3. Add a SECOND callout (green/purple) with CLINICAL EVIDENCE — specific study results, guideline recommendations, or statistics:
     <div class='q-callout q-callout-green'>📊 <strong>Evidence:</strong> HOPE trial showed ramipril reduced CV death by <span class='q-hl'>26%</span> (NNT=28 over 5 years) [2]</div>
  4. Include a styled list with SPECIFIC, ACCURATE details:
     <ul class='q-list'><li><span class='q-hl'>Mechanism:</span> Specific receptor/enzyme interaction with correct terminology</li><li><span class='q-hl'>Clinical effect:</span> Measurable outcome with data (e.g., "↓ BP 10-15 mmHg systolic")</li><li><span class='q-hl'>Key side effect:</span> Specific mechanism behind the side effect (e.g., "dry cough via ↑ bradykinin")</li></ul>
  5. Use <span class='q-label q-label-red'>Normal Physiology</span> vs <span class='q-label q-label-green'>Drug Effect</span> to clearly label comparative sections
  6. For time-dependent protocols (stroke windows, drug onset), use q-timeline with SPECIFIC data:
     <div class='q-timeline'><div class='q-timeline-item green'><strong>0–3h:</strong> IV tPA window (alteplase 0.9 mg/kg)</div><div class='q-timeline-item amber'><strong>3–4.5h:</strong> Extended window (ECASS III criteria)</div><div class='q-timeline-item red'><strong>&gt;4.5h:</strong> Thrombectomy only (DAWN/DEFUSE 3)</div></div>
  7. For comparison questions (drug classes, insulin types), use q-table with SPECIFIC data:
     <table class='q-table'><thead><tr><th>Drug</th><th>Onset</th><th>Peak</th><th>Duration</th></tr></thead><tbody><tr><td>Regular insulin</td><td>30min</td><td>2–4h</td><td>6–8h</td></tr><tr><td>Lispro</td><td>15min</td><td>0.5–1.5h</td><td>3–4h</td></tr></tbody></table>
  8. Use inline source citations like [1], [2] in explanation text that match entries in the "sources" array
  9. For pharmacology: ALWAYS include the SPECIFIC receptor subtype, mechanism (agonist/antagonist/partial agonist), and downstream signaling pathway

"mnemonic" — MUST create a TOPIC-SPECIFIC, CLINICALLY MEANINGFUL mnemonic:
  RULES for great mnemonics:
  - The letters MUST spell a WORD or ACRONYM directly related to the topic (e.g., "ACE" for ACE inhibitors side effects, "FAST" for stroke signs, "MONA" for ACS initial treatment)
  - Each letter MUST correspond to a SPECIFIC, EXAM-TESTABLE clinical fact — NOT generic words
  - Use well-known medical mnemonics when they exist (e.g., "ABCDE" for melanoma, "SAMPLE" for history, "CAGE" for alcoholism screening)
  - If no standard mnemonic exists, CREATE one where the letters spell a relevant word
  - Include a brief "Why it works" explanation in the remember callout

  Format:
  <div class='q-mnemo'>
    <div><div class='q-letter' style='background:linear-gradient(135deg,#ef4444,#dc2626)'>A</div><div class='q-letter-text'>Angioedema (bradykinin-mediated)</div></div>
    <div><div class='q-letter' style='background:linear-gradient(135deg,#f97316,#ea580c)'>C</div><div class='q-letter-text'>Cough (dry, persistent — ↑ bradykinin)</div></div>
    <div><div class='q-letter' style='background:linear-gradient(135deg,#eab308,#ca8a04)'>E</div><div class='q-letter-text'>Electrolyte ↑K+ (↓ aldosterone)</div></div>
  </div>
  <div class='q-callout q-callout-red'>🚨 <strong>ACE</strong> side effects — all caused by ↓ Ang II + ↑ bradykinin!</div>

  Gradient palette (cycle through): red #ef4444→#dc2626, orange #f97316→#ea580c, amber #eab308→#ca8a04, green #22c55e→#16a34a, blue #3b82f6→#2563eb, purple #8b5cf6→#7c3aed, pink #ec4899→#db2777, teal #14b8a6→#0d9488

  EXAMPLES of topic-specific mnemonics:
  - ACE inhibitors side effects → "ACE": Angioedema, Cough, Elevated K+
  - Stroke signs → "FAST": Face drooping, Arm weakness, Speech difficulty, Time to call 911
  - ACS initial treatment → "MONA": Morphine, Oxygen, Nitrates, Aspirin
  - Beta blocker contraindications → "CRAB": Cocaine use, Raynaud's, Asthma, Bradycardia
  - NSAID side effects → "PAIN": Peptic ulcer, Asthma exacerbation, Interstitial nephritis, Na+ retention
  - Warfarin interactions → "ABC": Antibiotics (rifampin), Barbiturates, Carbamazepine (inducers)

"clinicalPearl" — MUST be amber callout with SPECIFIC, VERIFIABLE clinical data:
  <div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> Include specific data like <span class='q-hl'>sensitivity 95%</span>, <span class='q-hl'>NNT=28</span>, or guideline class <span class='q-hl-green'>Class I, Level A</span>. Example: "ACE inhibitors reduce mortality by <span class='q-hl'>20%</span> post-MI (SAVE trial, NNT=20 over 3.5 years)"</div>

"distractorAnalysis" — MUST use grid with SPECIFIC clinical reasoning:
  <div class='q-grid q-grid-2'>
    <div class='q-card q-card-correct'>✅ <strong>Correct:</strong> Specific mechanism explaining why this is right</div>
    <div class='q-card q-card-red'>❌ <strong>Option B:</strong> Why wrong — specific misconception (e.g., "confuses β₁-selective with non-selective effects")</div>
    <div class='q-card q-card-orange'>❌ <strong>Option C:</strong> Why wrong — specific distinction (e.g., "ARBs block the receptor, not the enzyme — different mechanism")</div>
    <div class='q-card q-card-purple'>❌ <strong>Option D:</strong> Why wrong — specific trap (e.g., "aldosterone antagonists work downstream of ACE — different site")</div>
  </div>

ADDITIONAL JSON FIELDS — Choose the RIGHT visual for each question topic:

"illustrationDescription" — REQUIRED for every question. A detailed description of what medical illustration/diagram would best help visualize this concept.
  Example: "Cross-section of the heart showing the left anterior descending artery with a thrombus, highlighting the area of myocardial infarction in the anterior wall, with labeled structures: LAD, LV anterior wall, papillary muscles"
  This description will be used to AI-generate a medical illustration. Be specific about:
  - Anatomical structures to show
  - Pathological changes to highlight
  - Labels and annotations
  - Color coding (e.g., red for ischemic area, blue for deoxygenated blood)
  - Perspective (cross-section, anterior view, microscopic, etc.)
  Do NOT describe a style — just describe the educational content of the image.

"diagramSpec" — Optional. Include for pathway/algorithm questions (pharmacology pathways like RAAS, treatment protocols, decision trees).
  CRITICAL RULES for accurate, memorable diagrams:
  - Flow MUST follow logical biological/physiological direction (left-to-right for horizontal, top-to-bottom for vertical)
  - Each node MUST have an "annotation" field explaining its role in the pathway (shown on hover)
  - Use "subtitle" to indicate the functional state (e.g., "active form", "precursor", "vasoconstrictor", "↑secretion")
  - Use descriptive edge "label" fields that explain the transformation (e.g., "ACE cleaves", "stimulates", "converts")
  - For drug interventions, use a "drug" type node with an inhibition edge to the target, and add a group labeled "Drug Intervention"
  - For feedback loops, use edge type "feedback" — the renderer will draw a curved arrow back
  - MINIMUM 5 nodes and 4 edges for a meaningful pathway — more is better for complex topics

  A JSON object for the DiagramRenderer with this structure:
  { "title": "Renin-Angiotensin-Aldosterone System",
    "layout": "horizontal",
    "nodes": [
      {"id":"kidney","label":"Kidney","type":"organ","icon":"kidney","subtitle":"juxtaglomerular cells","annotation":"Detects ↓BP/↓Na+ at macula densa and releases renin"},
      {"id":"renin","label":"Renin","type":"enzyme","icon":"⚗️","subtitle":"protease","annotation":"Cleaves angiotensinogen → Angiotensin I in the blood"},
      {"id":"ang1","label":"Angiotensin I","type":"substrate","subtitle":"inactive precursor","annotation":"Decapeptide produced by renin cleavage of angiotensinogen"},
      {"id":"ace","label":"ACE","type":"enzyme","icon":"⚗️","subtitle":"kininase II","annotation":"Converts Ang I → Ang II in pulmonary endothelium; also degrades bradykinin"},
      {"id":"ang2","label":"Angiotensin II","type":"product","subtitle":"potent vasoconstrictor","annotation":"Octapeptide: vasoconstriction + ↑aldosterone + ↑ADH + sympathetic activation"},
      {"id":"aldo","label":"Aldosterone","type":"hormone","subtitle":"↑Na⁺ reabsorption","annotation":"Mineralocorticoid from zona glomerulosa: ↑Na⁺/H₂O reabsorption, ↑K⁺/H⁺ excretion"},
      {"id":"acei","label":"ACE Inhibitor","type":"drug","icon":"💊","subtitle":"e.g., lisinopril","annotation":"Blocks ACE → ↓Ang II + ↑bradykinin → vasodilation + ↓aldosterone"}
    ],
    "edges": [
      {"from":"kidney","to":"renin","label":"↓BP triggers","type":"activation"},
      {"from":"renin","to":"ang1","label":"cleaves","type":"conversion"},
      {"from":"ang1","to":"ace","label":"substrate for","type":"conversion"},
      {"from":"ace","to":"ang2","label":"produces","type":"conversion"},
      {"from":"ang2","to":"aldo","label":"stimulates","type":"activation"},
      {"from":"ang2","to":"kidney","label":"↑BP feedback","type":"feedback"},
      {"from":"acei","to":"ace","label":"blocks","type":"inhibition"}
    ],
    "groups": [
      {"id":"intervention","label":"Drug Intervention","color":"#ef4444","nodes":["acei"]}
    ]
  }
  Layout: "horizontal" or "vertical". Node types: enzyme, substrate, product, receptor, effect, outcome, organ, drug, blocked, decision, info, hormone, ion, gene.
  Use "icon" for emoji icons (⚗️,💊,🧬,❤️,🧠,🫀,⚡) or organ names (heart, brain, lung, kidney, liver, vessel, bone, eye, stomach, pancreas, thyroid, adrenal, pituitary, ovary, testis) for anatomical SVG icons.
  Use "subtitle" for brief functional state below the node label (e.g., "precursor", "active form", "vasoconstrictor").
  Use "annotation" for longer tooltip text explaining the node's role (shown on hover).
  Edge types: normal, activation (green arrow), inhibition (red T-bar), conversion (gray arrow), feedback (yellow curved arrow).

"molecularScenes" — Optional. Include for mechanism-of-action questions (drug-receptor binding, channel blocking, enzyme inhibition, ion channels, transporters).
  CRITICAL RULES for accurate, memorable molecular illustrations:
  - ALWAYS generate 2 scenes: Normal physiology (blocked:false) + Drug effect (blocked:true)
  - Every scene MUST have a "descriptionText" — a one-line summary of the mechanism (e.g., "NE binds β₁ → Gs activation → ↑cAMP → ↑heart rate")
  - For the blocked scene, include "drugMechanism" explaining HOW the drug blocks (e.g., "competitive antagonism at β₁ receptor")
  - Use specific molecule names (e.g., "NE", "Epinephrine", "GABA") NOT generic terms ("ligand", "neurotransmitter")
  - For GPCR pathways, use gprotein_cascade template with gprotein, effector, and secondMessenger fields
  - For ion channels, include voltageLabel and specific ion names with colors
  - For enzyme inhibition, include inhibitorType ("competitive" or "non-competitive")
  - For transporters, show the molecule being transported with its direction
  - Include stepDescriptions array listing 3-4 key steps of the mechanism

  A JSON object for the MolecularIllustrator with this structure:
  { "scenes": [
      { "template":"gprotein_cascade","label":"Normal β₁ Stimulation","blocked":false,"resultLabel":"Active",
        "receptor":{"label":"β₁ Receptor","color":"#8b5cf6","isGPCR":true},
        "ligand":{"label":"NE","color":"#ef4444"},
        "gprotein":{"type":"s","color":"#f59e0b"},
        "effector":{"label":"Adenylyl Cyclase","color":"#3b82f6"},
        "secondMessenger":{"label":"cAMP","color":"#22c55e","description":"activates PKA → ↑Ca²⁺ influx"},
        "signal":{"active":true,"text":"Gs → cAMP ↑","color":"#f97316"},
        "effect":{"type":"heart","color":"#ef4444","extra":{"icon":"❤️","label":"↑ HR & ↑ contractility"}},
        "descriptionText":"NE binds β₁ receptor → Gs activation → ↑adenylyl cyclase → ↑cAMP → ↑PKA → ↑Ca²⁺ → ↑heart rate",
        "stepDescriptions":["NE binds β₁ receptor","Gs protein dissociates (GDP→GTP)","Adenylyl cyclase produces cAMP","PKA phosphorylates Ca²⁺ channels"]
      },
      { "template":"gprotein_cascade","label":"With Metoprolol","blocked":true,"resultLabel":"Blocked",
        "receptor":{"label":"β₁ Receptor","color":"#6B7280","isGPCR":true},
        "ligand":{"label":"NE","color":"#ef4444"},
        "gprotein":{"type":"s","color":"#6B7280"},
        "effector":{"label":"Adenylyl Cyclase","color":"#6B7280"},
        "secondMessenger":{"label":"cAMP","color":"#6B7280","description":"↓production"},
        "drugName":"Metoprolol",
        "drugMechanism":"competitive β₁-selective antagonist",
        "effect":{"type":"crossed","color":"#ef4444"},
        "descriptionText":"Metoprolol blocks β₁ receptor → No Gs activation → ↓cAMP → ↓heart rate & ↓contractility",
        "stepDescriptions":["Metoprolol occupies β₁ binding site","NE cannot activate receptor","No Gs protein activation","↓cAMP → ↓heart rate"]
      }
    ]
  }
  Templates: receptor_ligand, gprotein_cascade, ion_channel, transporter, enzyme_catalysis, dna_binding.
  IMPORTANT: Always generate 2 scenes — one without drug (blocked:false) showing normal physiology, and one with drug (blocked:true) showing the drug effect.
  Scene fields: receptor, ligand, gprotein, effector, secondMessenger, signal, channel, ions, transporter, molecule, enzyme, substrates, products, effect, drugName, organTarget.
  "drugName" — name of the drug being shown in the blocked scene (displayed as a pill icon).
  "drugMechanism" — how the drug blocks (e.g., "competitive antagonist", "irreversible inhibitor", "allosteric modulator").
  "descriptionText" — one-line mechanism summary shown below the scene.
  "stepDescriptions" — array of 3-4 key steps describing the mechanism sequence.
  "effect" — visual effect icon: type can be heart, brain, lightning, crossed, constrict, dilate. Include extra.icon (emoji) and extra.label for text.
  "inhibitorType" — for enzyme_catalysis: "competitive" or "non-competitive".
  "receptor.isGPCR" — true for G-protein coupled receptors (shows 7-transmembrane domains).
  "channel.isVoltageGated" — true for voltage-gated ion channels (shows voltage sensor).
  Use specific molecule/ion names in scene fields for richer labeling.

"sources" — Optional but RECOMMENDED. Array of real medical references. Always include at least 2-3 references.
  [ {"type":"guideline","title":"2023 AHA/ACC Hypertension Guideline"},
    {"type":"paper","title":"NEJM: HOPE Trial, 2000"},
    {"type":"review","title":"Lancet: ACE Inhibitor Meta-Analysis, 2022"} ]
  Type values: "guideline", "paper", "review".
  Use inline citations [1], [2], [3] in the explanation text that correspond to the sources array order.

WHEN TO USE EACH VISUAL — Match the visual to the medical system and question type:

VISUAL ASSIGNMENT BY MEDICAL SYSTEM:
- Cardiovascular: diagramSpec (hemodynamic pathways, cardiac cycle, coronary circulation), q-timeline (MI management windows), q-table (drug comparisons - antihypertensives, antiarrhythmics)
- Respiratory: diagramSpec (respiratory physiology pathways, ventilation-perfusion), q-timeline (COPD exacerbation management, asthma step therapy), q-table (inhaler comparisons, ABG interpretation)
- Neurological: diagramSpec (neural pathways, cranial nerve pathways, basal ganglia circuits), q-timeline (stroke treatment windows, seizure protocols), q-table (antiepileptic drug comparison, headache types)
- Gastrointestinal: diagramSpec (digestive enzyme cascades, hepatic metabolism pathways), q-table (IBD comparison, hepatitis serology), q-timeline (GI bleed management)
- Renal: diagramSpec (nephron physiology, RAAS, acid-base regulation), q-table (AKI vs CKD, electrolyte disorders), q-timeline (AKI management)
- Endocrine: diagramSpec (hormone feedback loops, HPA axis, thyroid pathway), q-table (diabetes medications, thyroid function tests), q-timeline (DKA management, adrenal crisis)
- Hematologic: diagramSpec (coagulation cascade, hematopoiesis), q-table (anemia types, coagulation studies), molecularScenes (for drug mechanisms like anticoagulants)
- Musculoskeletal: diagramSpec (bone remodeling, joint structure), q-table (arthritis comparisons, fracture classification), q-timeline (osteoporosis treatment)
- Integumentary: q-table (skin lesion classification, rash differentials), diagramSpec (wound healing phases)
- Reproductive: diagramSpec (HPO axis, menstrual cycle, spermatogenesis), q-table (contraception comparison, STI features), q-timeline (pregnancy milestones, labor stages)
- Immunologic: diagramSpec (immune activation pathways, complement cascade, hypersensitivity types), q-table (immunodeficiency types, transplant rejection), molecularScenes (for monoclonal antibody mechanisms)
- Pharmacology: diagramSpec (drug metabolism pathways, RAAS, neurotransmitter pathways), molecularScenes (drug-receptor binding, enzyme inhibition, ion channels), q-table (drug class comparisons)
- Pathology: diagramSpec (disease progression pathways, neoplasia stages), q-table (tumor classification, grading systems), q-timeline (cancer staging and progression)
- Microbiology: diagramSpec (infection pathways, viral replication cycle, bacterial pathogenesis), q-table (organism classification, antibiotic coverage), q-timeline (infection progression)
- Biochemistry: diagramSpec (metabolic pathways: glycolysis, TCA, urea cycle, ETC), molecularScenes (enzyme kinetics, allosteric regulation), q-table (glycogen storage diseases, porphyrias)

RULES:
- EVERY question MUST include at least ONE of: diagramSpec, molecularScenes, q-timeline, or q-table in the explanation
- diagramSpec: ALWAYS include for pathway/process questions (≥5 nodes, ≥4 edges with annotations)
- molecularScenes: Include for mechanism-of-action and drug-receptor questions (2 scenes: normal + blocked)
- q-timeline: Include for time-sensitive protocols and disease progression questions
- q-table: Include for comparison and classification questions
- For pharmacology/drug mechanism topics: ALWAYS include BOTH diagramSpec AND molecularScenes
- For pathway/protocol topics: ALWAYS include a populated diagramSpec
- Do NOT force visuals that genuinely don't fit, but ALWAYS try to include at least one
- sources → ALWAYS include at least 2-3 references

VALID CSS CLASSES (use ONLY these):
- Highlights: q-hl, q-hl-red, q-hl-green, q-hl-amber, q-hl-purple
- Flow nodes: q-node-red, q-node-green, q-node-blue, q-node-purple, q-node-orange
- Arrows: q-arrow, q-arrow-red, q-arrow-green, q-arrow-blue, q-arrow-amber
- Callouts: q-callout-blue, q-callout-green, q-callout-red, q-callout-amber, q-callout-purple
- Cards: q-card-correct, q-card-red, q-card-green, q-card-orange, q-card-purple, q-card-blue
- Containers: q-flow, q-flow-col, q-mnemo, q-grid, q-grid-2, q-grid-3, q-list
- Badges: q-badge-blue, q-badge-red, q-badge-green, q-badge-amber, q-badge-purple
- Timeline: q-timeline, q-timeline-item, q-timeline-item green, q-timeline-item amber, q-timeline-item red
- Table: q-table
- Labels: q-label, q-label-red, q-label-green

REMEMBER: Always use SINGLE QUOTES in HTML attributes. Be medically accurate and exam-level correct. Create topic-specific mnemonics where letters spell a relevant word.`;

function buildUserPrompt(topic: string, types: string[], difficulties: string[], system: string, count: number): string {
  return `Generate ${count} medical question(s):

Topic: ${topic}
Medical System: ${system}
Question Types: ${types.join(', ')}
Difficulties: ${difficulties.join(', ')}

Return a JSON object with this EXACT structure (use single quotes in HTML):
{
  "questions": [
    {
      "type": "mcq",
      "text": "A 55yo man presents with <span class='q-hl-red'>crushing chest pain</span>... The most likely cause is:",
      "options": ["Option A plain text", "Option B plain text", "Option C plain text", "Option D plain text"],
      "answer": "Option A plain text",
      "explanation": "<div class='q-callout q-callout-blue'>💡 <strong>Key Concept:</strong> ... [1]</div><div class='q-flow'>...</div><ul class='q-list'>...</ul>",
      "mnemonic": "<div class='q-mnemo'>...</div><div class='q-callout q-callout-red'>🚨 Remember this mnemonic!</div>",
      "clinicalPearl": "<div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> ...</div>",
      "distractorAnalysis": "<div class='q-grid q-grid-2'>...</div>",
      "illustrationDescription": "Detailed description of what illustration would help visualize this concept",
      "diagramSpec": null,
      "molecularScenes": null,
      "sources": [ {"type":"guideline","title":"..."}, {"type":"paper","title":"..."} ],
      "difficulty": "Medium",
      "metadata": { "system": "${system}", "tags": ["${topic}", "tag1", "tag2"] }
    }
  ]
}

CRITICAL REMINDERS:
- Use SINGLE QUOTES for ALL HTML attributes: class='q-hl' NOT class="q-hl"
- options and answer MUST be plain text with NO HTML tags
- Every question MUST have rich HTML in text, explanation, mnemonic, clinicalPearl, distractorAnalysis
- Every question MUST have an illustrationDescription — describe what medical illustration would help visualize the concept
- Explanation MUST include SPECIFIC medical data: drug dosages, half-lives, sensitivity/specificity, receptor subtypes, signaling pathways — NOT vague descriptions
- Mnemonic MUST use q-mnemo with q-letter blocks — letters MUST spell a TOPIC-RELEVANT word (e.g., "ACE" for ACE inhibitor side effects, "FAST" for stroke). Each letter = specific exam-testable fact
- diagramSpec: Set to null if not needed. When included, you MUST:
  * Populate at least 5 nodes with "annotation" field explaining each node's role
  * Populate at least 4 edges with descriptive "label" fields
  * Use descriptive edge labels (e.g., "cleaves", "stimulates", "blocks") NOT just the enzyme name
  * Use "subtitle" on every node for functional state (e.g., "precursor", "vasoconstrictor")
  * Include feedback loops where biologically accurate (e.g., Ang II → kidney feedback)
  * NEVER return empty nodes/edges arrays
- molecularScenes: Set to null if not needed. When included, you MUST:
  * Generate 2 fully populated scenes with descriptionText and stepDescriptions
  * Include drugMechanism in the blocked scene
  * Use specific molecule names (NE, Epinephrine) NOT generic terms
  * For GPCR receptors: use gprotein_cascade template with gprotein, effector, secondMessenger
  * NEVER return empty scenes arrays
- VISUAL REQUIREMENT: Every question MUST include at least ONE visual element in the explanation (diagramSpec, molecularScenes, q-timeline, or q-table)
- For pharmacology/drug mechanism topics: ALWAYS include BOTH diagramSpec AND molecularScenes
- For pathway/protocol/cascade topics: ALWAYS include a populated diagramSpec
- For time-sensitive/disease progression topics: ALWAYS include q-timeline
- For comparison/classification/differential topics: ALWAYS include q-table
- Match the visual to the medical system using the VISUAL ASSIGNMENT BY MEDICAL SYSTEM guide above
- sources should ALWAYS include at least 2-3 real medical references
- Use inline citations [1], [2] in explanation text matching the sources array`;
}

/**
 * Strip HTML tags from a string, leaving only text content
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Enrich plain text content with basic HTML formatting
 * if the AI returned content without proper HTML structure
 */
function enrichContent(content: string, fieldType: 'text' | 'explanation' | 'mnemonic' | 'clinicalPearl' | 'distractorAnalysis'): string {
  if (!content.trim()) return content;

  // Check if content already has HTML tags with our CSS classes
  const hasMedqClasses = /class=['"]q-/.test(content);
  if (hasMedqClasses) return content;

  // Check if content has any HTML tags
  const hasHtml = /<[a-z][\s\S]*?>/i.test(content);

  if (fieldType === 'text') {
    if (hasMedqClasses) return content;
    // Try to highlight common medical terms
    return content;
  }

  if (fieldType === 'explanation') {
    if (hasMedqClasses) return content;
    // Convert plain text explanation to structured HTML
    const paragraphs = content.split(/\n\n+/).filter(Boolean);
    if (paragraphs.length === 0) return content;

    let html = `<div class='q-callout q-callout-blue'>💡 <strong>Key Points:</strong> ${paragraphs[0]}</div>`;

    if (paragraphs.length > 1) {
      const items = paragraphs.slice(1).map(p => `<li>${p}</li>`).join('');
      html += `<ul class='q-list'>${items}</ul>`;
    }

    return html;
  }

  if (fieldType === 'mnemonic') {
    if (hasMedqClasses) return content;
    // Try to create a meaningful mnemonic from the text
    // Split by common delimiters: commas, semicolons, dashes, newlines
    const items = content.split(/[,;]\s*|\n|—\s*|–\s*|\s{2,}/).map(s => s.trim()).filter(s => s.length > 1);
    if (items.length === 0) {
      const words = content.split(/\s+/).filter(w => w.length > 0);
      if (words.length === 0) return content;
    }

    const gradients = [
      'linear-gradient(135deg,#ef4444,#dc2626)',
      'linear-gradient(135deg,#f97316,#ea580c)',
      'linear-gradient(135deg,#eab308,#ca8a04)',
      'linear-gradient(135deg,#22c55e,#16a34a)',
      'linear-gradient(135deg,#3b82f6,#2563eb)',
      'linear-gradient(135deg,#8b5cf6,#7c3aed)',
      'linear-gradient(135deg,#ec4899,#db2777)',
      'linear-gradient(135deg,#14b8a6,#0d9488)',
    ];

    // Build letter blocks from items — each item gets its first letter
    const mnemonicItems = items.slice(0, 8).map((item, i) => {
      const letter = item.match(/\b[A-Z]/i)?.[0]?.toUpperCase() || item[0].toUpperCase();
      return `<div><div class='q-letter' style='background:${gradients[i % gradients.length]}'>${letter}</div><div class='q-letter-text'>${item}</div></div>`;
    });

    // Try to extract the acronym from the first letters
    const acronym = mnemonicItems.map(m => {
      const match = m.match(/class='q-letter'[^>]*>(\w)/);
      return match ? match[1] : '';
    }).join('');

    const letterBlocks = mnemonicItems.join('');
    const acronymLabel = acronym ? `<strong>${acronym}</strong> — ` : '';

    return `<div class='q-mnemo'>${letterBlocks}</div><div class='q-callout q-callout-red'>🚨 ${acronymLabel}Remember this mnemonic!</div>`;
  }

  if (fieldType === 'clinicalPearl') {
    if (hasMedqClasses) return content;
    return `<div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> ${content}</div>`;
  }

  if (fieldType === 'distractorAnalysis') {
    if (hasMedqClasses) return content;
    // Convert plain text to cards
    const lines = content.split('\n').filter(l => l.trim());
    const cards = lines.map(line => {
      const isCorrect = line.toLowerCase().includes('correct') || line.startsWith('✅');
      return `<div class='q-card ${isCorrect ? 'q-card-correct' : 'q-card-red'}'>${isCorrect ? '✅' : '❌'} ${line}</div>`;
    }).join('');
    return `<div class='q-grid q-grid-2'>${cards}</div>`;
  }

  return content;
}

/**
 * Fix AI-generated HTML to use only valid CSS classes
 */
function fixHtmlClasses(html: string): string {
  return html
    // Replace q-node-yellow with q-node-orange (yellow isn't commonly defined)
    .replace(/q-node-yellow/g, 'q-node-orange')
    // Replace any q-node-<invalid> with q-node
    .replace(/q-node-(?!red|green|blue|purple|orange|yellow|amber|teal|blocked)[a-z]+/g, 'q-node');
}

/**
 * Robust JSON parser that handles common AI response issues:
 * 1. Markdown code block wrapping
 * 2. Leading/trailing non-JSON text
 * 3. HTML with double quotes that break JSON (converts to single quotes)
 * 4. Truncated responses (closes open brackets)
 */
function parseAIResponse(content: string): unknown {
  let text = content.trim();

  // Step 1: Remove markdown code block markers
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*)```/);
  if (codeBlockMatch) {
    text = codeBlockMatch[1].trim();
  }

  // Step 2: Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Continue to repairs
  }

  // Step 3: Fix HTML quotes + remove trailing commas
  const withFixedHtml = fixHtmlQuotesInJson(text);
  const withFixedHtmlAndCommas = removeTrailingCommas(withFixedHtml);
  try {
    return JSON.parse(withFixedHtmlAndCommas);
  } catch {
    // Continue
  }

  // Step 4: Strip to JSON boundaries + fix HTML + remove trailing commas
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const stripped = text.substring(firstBrace, lastBrace + 1);
    const strippedFixed = removeTrailingCommas(fixHtmlQuotesInJson(stripped));
    try {
      return JSON.parse(strippedFixed);
    } catch {
      // Continue
    }
  }

  // Step 5: Recover truncated JSON (missing closing brackets)
  const recovered = recoverTruncatedJson(withFixedHtmlAndCommas);
  try {
    return JSON.parse(recovered);
  } catch {
    // Continue
  }

  // Step 6: Strip boundaries + fix HTML + remove commas + recover truncated
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const stripped = text.substring(firstBrace, lastBrace + 1);
    const fullyFixed = recoverTruncatedJson(removeTrailingCommas(fixHtmlQuotesInJson(stripped)));
    try {
      return JSON.parse(fullyFixed);
    } catch {
      // Continue
    }
  }

  // Step 7: Last resort — replace &quot; + fix HTML + remove commas
  const withEscapedQuotes = removeTrailingCommas(fixHtmlQuotesInJson(text.replace(/&quot;/g, "'")));
  try {
    return JSON.parse(withEscapedQuotes);
  } catch {
    // Continue
  }

  // Step 8: Nuclear option — try to extract questions using regex
  // This handles cases where the JSON structure is fundamentally broken
  // but the individual question data is still parseable
  try {
    const extracted = extractQuestionsFromBrokenJson(text);
    if (extracted && extracted.length > 0) {
      console.log(`parseAIResponse: Step 8 - extracted ${extracted.length} questions from broken JSON`);
      return { questions: extracted };
    }
  } catch {
    // Give up
  }

  // Step 9: Nuclear regex extraction — extract question data using regex patterns
  // This handles completely broken JSON where the structure is mangled but
  // individual fields are still readable
  try {
    const extracted = extractQuestionsByRegex(text);
    if (extracted && extracted.length > 0) {
      console.log(`parseAIResponse: Step 9 - regex extracted ${extracted.length} questions`);
      return { questions: extracted };
    }
  } catch {
    // Continue
  }

  console.error('parseAIResponse: All JSON parse attempts failed. Raw content (first 800 chars):', text.substring(0, 800));
  throw new Error('Failed to parse AI response as JSON after all repair attempts');
}

/**
 * Nuclear regex-based question extraction from completely broken JSON.
 * Uses regex to find individual field values and reconstructs question objects.
 */
function extractQuestionsByRegex(text: string): unknown[] | null {
  const questions: unknown[] = [];

  // Find all question blocks by looking for "type": "mcq" or "type" : "tf" patterns
  const typePattern = /"type"\s*:\s*"(mcq|tf|short)"/g;
  const typeMatches = [...text.matchAll(typePattern)];

  for (const typeMatch of typeMatches) {
    const startIdx = typeMatch.index!;
    // Find the enclosing object boundaries
    let depth = 0;
    let endIdx = startIdx;
    // Go backwards to find the opening {
    let searchStart = startIdx;
    for (let i = startIdx; i >= 0; i--) {
      if (text[i] === '}') depth++;
      else if (text[i] === '{') {
        if (depth === 0) { searchStart = i; break; }
        depth--;
      }
    }
    // Go forward to find the closing }
    depth = 0;
    for (let i = searchStart; i < text.length; i++) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') {
        depth--;
        if (depth === 0) { endIdx = i + 1; break; }
      }
    }

    const block = text.substring(searchStart, endIdx);

    // Extract individual fields using regex
    const qType = typeMatch[1];
    const extractField = (name: string): string => {
      // Try pattern: "name": "value" or "name" : "value"
      const match = block.match(new RegExp(`"${name}"\\s*:\\s*"([\\s\\S]*?)(?:"\\s*[,}]|"$)`, 'm'));
      return match ? match[1].trim() : '';
    };

    const extractArray = (name: string): string[] => {
      const match = block.match(new RegExp(`"${name}"\\s*:\\s*\\[([\\s\\S]*?)\\]`));
      if (!match) return [];
      // Parse array items
      const items: string[] = [];
      const itemPattern = /"([^"]*?)"/g;
      let itemMatch;
      while ((itemMatch = itemPattern.exec(match[1])) !== null) {
        items.push(itemMatch[1]);
      }
      return items;
    };

    const text_content = extractField('text');
    const answer = extractField('answer');
    const explanation = extractField('explanation');
    const mnemonic = extractField('mnemonic');
    const clinicalPearl = extractField('clinicalPearl');
    const distractorAnalysis = extractField('distractorAnalysis');
    const options = extractArray('options');

    // Only include if we have at least text and answer
    if (text_content && answer) {
      questions.push({
        type: qType,
        text: text_content,
        options: options.length > 0 ? options : qType === 'tf' ? ['True', 'False'] : [],
        answer,
        explanation: explanation || 'Explanation not available.',
        mnemonic: mnemonic || '',
        clinicalPearl: clinicalPearl || '',
        distractorAnalysis: distractorAnalysis || '',
        difficulty: 'Medium',
        metadata: { tags: [] },
      });
    }
  }

  return questions.length > 0 ? questions : null;
}

/**
 * Last-resort extraction: try to pull question objects from broken JSON
 * by finding individual question boundaries.
 */
function extractQuestionsFromBrokenJson(text: string): unknown[] | null {
  const questions: unknown[] = [];

  // Find all question object boundaries
  // Look for patterns like: { "type": "mcq", ... }
  const questionRegex = /\{\s*"type"\s*:\s*"mcq"/g;
  let match;
  let searchStart = 0;

  while ((match = questionRegex.exec(text)) !== null) {
    const startIdx = match.index;
    // Find the matching closing brace
    let depth = 0;
    let endIdx = startIdx;
    for (let i = startIdx; i < text.length; i++) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }

    const questionText = text.substring(startIdx, endIdx);
    try {
      // Try to parse just this question object
      const fixed = removeTrailingCommas(fixHtmlQuotesInJson(questionText));
      const parsed = JSON.parse(fixed);
      questions.push(parsed);
    } catch {
      // Skip this question — can't parse it
    }

    searchStart = endIdx;
  }

  return questions.length > 0 ? questions : null;
}

/**
 * Fix HTML attribute double quotes in JSON text.
 * Replaces ANY attribute="value" pattern with attribute='value'.
 * This is the #1 cause of JSON parse failures — AI uses double quotes in HTML
 * attributes despite being told to use single quotes.
 *
 * Strategy: Process the text character by character to properly track
 * whether we're inside a JSON string or an HTML tag, then replace
 * double-quoted HTML attributes with single-quoted ones.
 */
function fixHtmlQuotesInJson(text: string): string {
  // Step 1: Unescape \" inside HTML tags to " for processing
  // AI often returns: class=\"q-hl\" which we want to normalize first
  let result = text.replace(/\\"/g, (match, offset) => {
    // Check if this escaped quote is inside an HTML tag context
    // Look backwards from the offset to see if we're after a < and before a >
    const before = text.substring(Math.max(0, offset - 200), offset);
    const lastOpenTag = before.lastIndexOf('<');
    const lastCloseTag = before.lastIndexOf('>');
    // If we're inside an HTML tag (more recent < than >)
    if (lastOpenTag > lastCloseTag) {
      return '"'; // Unescape — it's an HTML attribute quote
    }
    return match; // Keep escaped — it's a JSON string delimiter
  });

  // Step 2: Process HTML tags — replace ="..." with ='...' inside tags
  result = result.replace(/<([^>]{0,2000})>/g, (match, tagContent: string) => {
    // Replace all attribute="value" with attribute='value' inside this tag
    // Handle style="..." specially since it may contain complex values
    let fixed = tagContent;

    // Replace attribute="value" patterns — handle simple and complex values
    // Pattern: word chars or data-/aria- prefix, =, then " anything-not-quote "
    fixed = fixed.replace(/([\w-]+)=(")([^"]*?)\2/g, "$1='$3'");

    return `<${fixed}>`;
  });

  // Step 3: Handle remaining unescaped double quotes in HTML attributes
  // that are inside JSON string values (e.g., "text": "...class="q-hl"...")
  // This is trickier — we need to find patterns where a JSON string value
  // contains HTML with double quotes
  result = result.replace(
    /(:\s*")(.*?class\s*=\s*")(.*?)(".*?")/gs,
    (_, prefix: string, attrStart: string, attrVal: string, rest: string) => {
      return `${prefix}${attrStart.replace(/"/g, "'")}${attrVal}${rest}`;
    }
  );

  return result;
}

/**
 * Remove trailing commas in JSON (before } or ])
 * This is extremely common in AI-generated JSON and causes parse failures.
 */
function removeTrailingCommas(text: string): string {
  // Remove commas before closing brackets/braces, with optional whitespace
  return text.replace(/,\s*([}\]])/g, '$1');
}

/**
 * Attempt to recover a truncated JSON response by:
 * 1. Finding the last complete question object
 * 2. Closing open brackets properly
 * 3. Removing incomplete trailing content
 */
function recoverTruncatedJson(text: string): string {
  // Count open vs close brackets
  const opens = (text.match(/[{[]/g) || []).length;
  const closes = (text.match(/[}\]]/g) || []).length;
  const diff = opens - closes;

  if (diff <= 0) return text;

  let trimmed = text;

  // Strategy: Find the last complete object by looking for "}," or "}]"
  // Try to truncate at the last complete question boundary
  const lastCompleteObj = Math.max(
    trimmed.lastIndexOf('},'),
    trimmed.lastIndexOf('}]'),
    trimmed.lastIndexOf('} ')
  );

  if (lastCompleteObj > trimmed.length * 0.5) {
    // We found a reasonable truncation point — cut there and close brackets
    trimmed = trimmed.substring(0, lastCompleteObj + 1);

    // Now count remaining open brackets and close them
    const remainingOpens = (trimmed.match(/[{[]/g) || []).length;
    const remainingCloses = (trimmed.match(/[}\]]/g) || []).length;
    const remaining = remainingOpens - remainingCloses;

    if (remaining > 0) {
      // Close in reverse order: ] before }
      for (let i = 0; i < remaining; i++) {
        trimmed += ']';  // Most inner brackets are arrays
      }
      // Ensure the outermost structure is closed with }
      if (!trimmed.endsWith('}')) {
        trimmed += '}';
      }
    }

    console.log(`Recovered truncated JSON at position ${lastCompleteObj}, added ${remaining} closing brackets`);
    return trimmed;
  }

  // Fallback: simple bracket counting approach
  trimmed = trimmed.replace(/[,:\s]*$/, '');
  for (let i = 0; i < diff; i++) {
    trimmed += i < Math.ceil(diff / 2) ? ']' : '}';
  }

  console.log(`Recovered truncated JSON: added ${diff} closing brackets (fallback)`);
  return trimmed;
}

const MAX_RETRIES = 1;
const AI_TIMEOUT_MS = Number(process.env.AI_GENERATION_TIMEOUT_MS || 180_000); // Per-attempt AI timeout
// Leave unset by default so the provider can use the context remaining after
// the prompt. Set this to a positive value to enforce an application limit.
const AI_MAX_OUTPUT_TOKENS = Number(process.env.AI_GENERATION_MAX_OUTPUT_TOKENS || 0);

/**
 * Race an AI call against a timeout. Returns the AI content or throws on timeout.
 */
async function aiCallWithTimeout(
  request: NextRequest,
  system: string,
  userPrompt: string,
  timeoutMs: number,
): Promise<string> {
  const aiPromise = callChat(request, {
    stage: 'chat-adapter',
    system,
    prompt: userPrompt,
    maxOutputTokens: AI_MAX_OUTPUT_TOKENS,
  });

  const requestedModel = request.headers.get('x-model') || await resolveDefaultModelString('chat-adapter');
  if (/^ollama(?::|$)/i.test(requestedModel)) {
    const aiContent = await aiPromise;
    if (!aiContent) throw new Error('AI returned empty response');
    return aiContent;
  }

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`AI call timed out after ${timeoutMs / 1000}s`)), timeoutMs)
  );

  const aiContent = await Promise.race([aiPromise, timeoutPromise]);
  if (!aiContent) throw new Error('AI returned empty response');
  return aiContent;
}

/**
 * Save a single question to the database and return the formatted result
 */
async function saveQuestion(
  q: Record<string, unknown>,
  topic: string,
  system: string,
): Promise<Record<string, unknown>> {
  const metadata = (q.metadata as Record<string, unknown>) || {};
  const tags = Array.isArray(metadata.tags) ? metadata.tags : [topic];
  const qType = (q.type as string) || 'mcq';

  let options = Array.isArray(q.options) ? q.options : (qType === 'tf' ? ['True', 'False'] : []);
  options = options.map((opt: string) => stripHtml(String(opt)));
  let answer = stripHtml(String(q.answer || ''));

  if (qType === 'mcq' && options.length > 0) {
    const matchIndex = options.findIndex((opt: string) =>
      opt.toLowerCase().trim() === answer.toLowerCase().trim()
    );
    if (matchIndex >= 0) {
      answer = options[matchIndex];
    } else {
      const partialMatch = options.findIndex((opt: string) =>
        opt.toLowerCase().includes(answer.toLowerCase()) ||
        answer.toLowerCase().includes(opt.toLowerCase())
      );
      if (partialMatch >= 0) {
        answer = options[partialMatch];
      }
    }
  }

  let text = fixHtmlClasses(String(q.text || ''));
  text = enrichContent(text, 'text');
  let explanation = fixHtmlClasses(String(q.explanation || ''));
  explanation = enrichContent(explanation, 'explanation');
  let mnemonic = fixHtmlClasses(String(q.mnemonic || ''));
  mnemonic = enrichContent(mnemonic, 'mnemonic');
  let clinicalPearl = fixHtmlClasses(String(q.clinicalPearl || ''));
  clinicalPearl = enrichContent(clinicalPearl, 'clinicalPearl');
  let distractorAnalysis = fixHtmlClasses(String(q.distractorAnalysis || ''));
  distractorAnalysis = enrichContent(distractorAnalysis, 'distractorAnalysis');

  let diagramSpec = '';
  if (q.diagramSpec && typeof q.diagramSpec === 'object') {
    const ds = q.diagramSpec as { nodes?: unknown[]; edges?: unknown[] };
    if (Array.isArray(ds.nodes) && ds.nodes.length >= 2 && Array.isArray(ds.edges) && ds.edges.length >= 1) {
      diagramSpec = JSON.stringify(q.diagramSpec);
    }
  }
  let molecularScenes = '';
  if (q.molecularScenes && typeof q.molecularScenes === 'object') {
    const ms = q.molecularScenes as { scenes?: unknown[] };
    if (Array.isArray(ms.scenes) && ms.scenes.length >= 1) {
      molecularScenes = JSON.stringify(q.molecularScenes);
    }
  }
  const sources = Array.isArray(q.sources) ? JSON.stringify(q.sources) : '[]';
  const illustrationDescription = String(q.illustrationDescription || '');

  const saved = await db.question.create({
    data: {
      type: qType, text, options: JSON.stringify(options), answer, explanation, mnemonic,
      clinicalPearl, distractorAnalysis, illustrationDescription, diagramSpec, molecularScenes, sources,
      difficulty: (q.difficulty as string) || 'Medium',
      system: (metadata.system as string) || system,
      topic, tags: JSON.stringify(tags), isAIGenerated: true,
    },
  });

  return {
    ...saved,
    options: JSON.parse(saved.options),
    tags: JSON.parse(saved.tags),
    sources: saved.sources ? JSON.parse(saved.sources) : [],
    distractorAnalysis: distractorAnalysis || undefined,
    illustrationDescription: illustrationDescription || undefined,
    diagramSpec: diagramSpec || undefined,
    molecularScenes: molecularScenes || undefined,
  };
}

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) return badRequest('jobId is required');

  const job = getJob(jobId);
  if (!job) return notFound('Job not found');

  return NextResponse.json(job);
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  // ── AI feature gate ──
  // Resolve the user (session or guest fallback), then check tier + daily
  // usage. If over limit, try to debit credits. If no credits, return
  // 402/429 with upgrade hints.
  const userId = await resolveUserId();
  const { debitAICredits } = await import('@/lib/subscription/credits');
  const gate = await debitAICredits(userId, 'generate');
  if (!gate.allowed) {
    const status = gate.reason === 'no_credits' ? 402 : 429;
    return NextResponse.json(
      {
        error: gate.reason === 'no_credits'
          ? 'You have reached your daily AI generation limit and have insufficient credits.'
          : 'Daily AI generation limit reached.',
        reason: gate.reason,
        category: gate.category,
        used: gate.usageBefore,
        limit: gate.limit,
        balance: gate.balanceAfter,
        creditCost: 2,
        upgradeUrl: '/pricing',
      },
      { status },
    );
  }

  const jobId = createJob();

  // Return jobId immediately
  const response = NextResponse.json({ jobId, gated: { source: gate.source, creditsSpent: gate.creditsSpent ?? 0 } });

  // Start background processing (fire-and-forget)
  processGenerationJob(jobId, body, req).catch(async (err) => {
    updateJob(jobId, { status: 'failed', error: err instanceof Error ? err.message : String(err) });
    // Best-effort refund if we had debited credits.
    if (gate.source === 'credits' && gate.creditsSpent) {
      const { refundAICredits } = await import('@/lib/subscription/credits');
      try { await refundAICredits(userId, gate, 'AI generation job failed'); } catch {}
    }
  });

  return response;
});

async function processGenerationJob(
  jobId: string,
  body: { topic: string; types: string[]; difficulties: string[]; system: string; count: number },
  request: NextRequest,
) {
  updateJob(jobId, { status: 'processing', progress: 'Connecting to AI...' });
  emitJobUpdate(getJob(jobId)!);

  try {
    // Check database connection with timeout
    try {
      await Promise.race([
        db.$connect(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('DB connect timeout')), 5000)),
      ]);
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      updateJob(jobId, { status: 'failed', error: 'Database connection failed. Please try again.' });
      emitJobUpdate(getJob(jobId)!);
      return;
    }

    const { topic, types, difficulties } = body;
    const system = body.system || 'General';

    if (!topic) {
      updateJob(jobId, { status: 'failed', error: 'Topic is required' });
      emitJobUpdate(getJob(jobId)!);
      return;
    }

    // Use the count from the request (up to 5 per batch)
    const effectiveCount = Math.min(Math.max(body.count || 1, 1), 100);

    let lastError: Error | null = null;

    // Generate questions one at a time to avoid JSON truncation with rich HTML content.
    // Each question's AI response is ~7-8KB of HTML; batching multiple in one call
    // often causes truncation, losing questions. Individual calls are more reliable.
    const allSavedQuestions: Record<string, unknown>[] = [];

    for (let qIndex = 0; qIndex < effectiveCount; qIndex++) {
      const questionNum = qIndex + 1;

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          updateJob(jobId, {
            status: 'processing',
            progress: `Generating question ${questionNum}/${effectiveCount}${attempt > 1 ? ` (attempt ${attempt})` : ''}...`,
            attempt,
          });
          emitJobUpdate(getJob(jobId)!);

          const aiContent = await aiCallWithTimeout(
            request,
            SYSTEM_PROMPT,
            buildUserPrompt(topic, types || ['mcq'], difficulties || ['Medium'], system, 1),
            AI_TIMEOUT_MS,
          );

          console.log(`AI response length for Q${questionNum}:`, aiContent.length, 'attempt:', attempt);
          updateJob(jobId, { progress: `Parsing question ${questionNum}...` });
          emitJobUpdate(getJob(jobId)!);

          let parsed;
          try {
            parsed = parseAIResponse(aiContent);
          } catch (parseError) {
            lastError = parseError instanceof Error ? parseError : new Error('Parse failed');
            console.error(`Parse Q${questionNum} attempt ${attempt} failed:`, parseError instanceof Error ? parseError.message : 'Unknown');
            if (attempt < MAX_RETRIES) {
              await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
              continue;
            }
            // If this question fails after all retries, skip it and continue to next
            console.error(`Skipping question ${questionNum} after all retries failed`);
            break;
          }

          const questionsData = (parsed as { questions: unknown[] }).questions ?? parsed;
          if (!Array.isArray(questionsData) || questionsData.length === 0) {
            lastError = new Error('AI returned no question');
            if (attempt < MAX_RETRIES) {
              await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
              continue;
            }
            console.error(`Skipping question ${questionNum} — AI returned no data`);
            break;
          }

          // Save the generated question
          updateJob(jobId, { progress: `Saving question ${questionNum}/${effectiveCount}...` });
          emitJobUpdate(getJob(jobId)!);

          for (const q of questionsData as Record<string, unknown>[]) {
            try {
              const saved = await saveQuestion(q, topic, system);
              allSavedQuestions.push(saved);
              // Stream this question to the client immediately via progress event
              updateJob(jobId, {
                progress: `Generated ${allSavedQuestions.length}/${effectiveCount} question${allSavedQuestions.length > 1 ? 's' : ''}`,
                partialResult: saved,
              });
              emitJobUpdate(getJob(jobId)!);
            } catch (saveErr) {
              console.error('Failed to save question to DB (returning without persisting):', saveErr instanceof Error ? saveErr.message : 'Unknown');
              const metadata = (q.metadata as Record<string, unknown>) || {};
              const tags = Array.isArray(metadata.tags) ? metadata.tags : [topic];
              allSavedQuestions.push({
                id: `gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                type: (q.type as string) || 'mcq',
                text: String(q.text || ''),
                options: Array.isArray(q.options) ? q.options : [],
                answer: String(q.answer || ''),
                explanation: String(q.explanation || ''),
                mnemonic: String(q.mnemonic || ''),
                clinicalPearl: String(q.clinicalPearl || ''),
                distractorAnalysis: String(q.distractorAnalysis || ''),
                illustrationDescription: String(q.illustrationDescription || '') || undefined,
                diagramSpec: q.diagramSpec || undefined,
                molecularScenes: q.molecularScenes || undefined,
                sources: Array.isArray(q.sources) ? q.sources : [],
                difficulty: (q.difficulty as string) || 'Medium',
                system: (metadata.system as string) || system,
                topic,
                tags,
                isAIGenerated: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
            }
          }

          // Successfully generated and saved this question — move to next
          break;
        } catch (attemptError) {
          lastError = attemptError instanceof Error ? attemptError : new Error('Unknown error');
          console.error(`Generate Q${questionNum} attempt ${attempt} error:`, attemptError instanceof Error ? attemptError.message : 'Unknown');
          if (attempt < MAX_RETRIES) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          }
        }
      }
    }

    // Return whatever we saved successfully (partial success is OK)
    if (allSavedQuestions.length > 0) {
      updateJob(jobId, { status: 'completed', result: allSavedQuestions as unknown[] });
      emitJobUpdate(getJob(jobId)!);
      return;
    }

    updateJob(jobId, { status: 'failed', error: lastError?.message || 'Failed to generate questions after retries' });
    emitJobUpdate(getJob(jobId)!);
  } catch (error) {
    console.error('Generate error:', error);
    updateJob(jobId, { status: 'failed', error: error instanceof Error ? error.message : 'Failed to generate questions' });
    emitJobUpdate(getJob(jobId)!);
  }
}
