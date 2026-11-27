import bcrypt from "bcryptjs";
import { db } from '../src/lib/db';
import { PrismaClient } from "@prisma/client";

const prisma = db;

const DEMO_USERS = [
  {
    name: "MedQ Student",
    email: "student@medq.com",
    password: "test123",
    role: "student",
    emailVerified: Date.now()

  },
  {
    name: "Dr. Educator",
    email: "educator@medq.com",
    password: "test123",
    role: "educator",
    emailVerified: Date.now()

  },
  {
    name: "Admin User",
    email: "admin@medq.com",
    password: "test123",
    role: "admin",
    emailVerified: Date.now()
  },
];

const SAMPLE_QUESTIONS = [
  {
    id: "demo-q-cardiology-1",
    type: "mcq",
    text: "A 65-year-old man presents with crushing substernal chest pain radiating to the left arm, diaphoresis, and nausea. ECG shows ST-segment elevation in leads V1-V4. Which of the following is the most likely diagnosis?",
    options: JSON.stringify([
      "Unstable angina",
      "Anterior wall myocardial infarction",
      "Pericarditis",
      "Aortic dissection",
      "Pulmonary embolism",
    ]),
    answer: "Anterior wall myocardial infarction",
    explanation:
      "ST-segment elevation in leads V1-V4 corresponds to the anterior wall of the left ventricle, supplied by the left anterior descending (LAD) artery. The clinical presentation of crushing substernal chest pain with radiation to the left arm, diaphoresis, and nausea is classic for acute myocardial infarction. This is an anterior wall STEMI requiring immediate reperfusion therapy.",
    clinicalPearl:
      "ST elevation in V1-V4 = anterior STEMI = LAD artery occlusion. Time is muscle – immediate reperfusion is critical!",
    mnemonic: "V1-V4 = Anterior = LAD = 'LADdies first'",
    difficulty: "Medium",
    system: "Cardiovascular",
    topic: "Myocardial Infarction",
    tags: JSON.stringify(["cardiology", "ECG", "STEMI", "emergency"]),
    distractorAnalysis: JSON.stringify({
      "Unstable angina": "No ST elevation; pain at rest but no biomarker elevation",
      "Pericarditis": "Diffuse ST elevation and PR depression; positional pain",
      "Aortic dissection": "Tearing pain radiating to back; pulse deficits",
      "Pulmonary embolism": "Pleuritic pain, dyspnea, tachycardia; no ST elevation in V1-V4",
    }),
  },
  {
    id: "demo-q-pharmacology-1",
    type: "mcq",
    text: "A 45-year-old woman with atrial fibrillation is started on warfarin. She presents 2 weeks later with a significantly elevated INR of 8.5. Which of the following is the most appropriate initial management?",
    options: JSON.stringify([
      "Discontinue warfarin and observe",
      "Discontinue warfarin and administer vitamin K orally",
      "Discontinue warfarin and administer fresh frozen plasma",
      "Discontinue warfarin and administer prothrombin complex concentrate",
      "Continue warfarin at a reduced dose",
    ]),
    answer:
      "Discontinue warfarin and administer vitamin K orally",
    explanation:
      "For an INR > 10 without serious bleeding, the recommended management is to discontinue warfarin and administer oral vitamin K (phytonadione) 2.5-5 mg. Vitamin K reverses the anticoagulant effect of warfarin by enabling the hepatic synthesis of vitamin K-dependent clotting factors (II, VII, IX, X). For life-threatening bleeding, FFP or PCC would be indicated instead.",
    clinicalPearl:
      "INR > 10 without bleeding: hold warfarin + oral vitamin K. Life-threatening bleed: PCC/FFP + IV vitamin K.",
    mnemonic:
      "Warfarin affects factors 2, 7, 9, 10 (1972 = year of their discovery). Vitamin K reverses it.",
    difficulty: "Hard",
    system: "Pharmacology",
    topic: "Anticoagulants",
    tags: JSON.stringify([
      "pharmacology",
      "warfarin",
      "anticoagulation",
      "toxicology",
    ]),
    distractorAnalysis: JSON.stringify({
      "Observe only": "Too passive for INR 8.5; active reversal needed",
      "FFP": "Reserved for serious bleeding; vitamin K sufficient here",
      "PCC": "Reserved for life-threatening bleeding; overkill for elevated INR without bleed",
      "Continue at reduced dose": "Dangerous with INR 8.5; must hold the drug",
    }),
  },
  {
    id: "demo-q-neurology-1",
    type: "mcq",
    text: "A 55-year-old man presents with sudden-onset severe headache, neck stiffness, and photophobia. Non-contrast CT of the head shows hyperdensity in the subarachnoid space. What is the most common cause of spontaneous subarachnoid hemorrhage?",
    options: JSON.stringify([
      "Arteriovenous malformation",
      "Ruptured berry aneurysm",
      "Hypertensive hemorrhage",
      "Trauma",
      "Cerebral amyloid angiopathy",
    ]),
    answer: "Ruptured berry aneurysm",
    explanation:
      "The most common cause of spontaneous (non-traumatic) subarachnoid hemorrhage (SAH) is rupture of a saccular (berry) aneurysm, accounting for approximately 80% of cases. Berry aneurysms most commonly occur at bifurcations of the Circle of Willis, particularly the anterior communicating artery. The classic presentation is a 'thunderclap' headache described as 'the worst headache of my life.'",
    clinicalPearl:
      "SAH = worst headache of life + berry aneurysm (80%). Most common site: ACom artery. Hunt-Hess grading guides prognosis.",
    mnemonic:
      "SAH = Sudden Awful Headache = Berry aneurysm at bifurcations of Circle of Willis",
    difficulty: "Easy",
    system: "Nervous",
    topic: "Subarachnoid Hemorrhage",
    tags: JSON.stringify(["neurology", "SAH", "aneurysm", "emergency"]),
    distractorAnalysis: JSON.stringify({
      "AVM": "Only 2% of SAH; more common in young patients with seizures",
      "Hypertensive hemorrhage": "Typically causes intraparenchymal bleed (basal ganglia, pons, cerebellum)",
      "Trauma": "Most common cause overall, but question specifies 'spontaneous'",
      "Cerebral amyloid angiopathy": "Causes lobar hemorrhages in elderly, not typically SAH",
    }),
  },
  {
    id: "demo-q-endocrine-1",
    type: "mcq",
    text: "A 30-year-old woman presents with weight gain, moon facies, central obesity, purple striae, and easy bruising. Laboratory findings show elevated 24-hour urinary cortisol and loss of normal diurnal cortisol rhythm. A high-dose dexamethasone suppression test shows partial suppression of cortisol. What is the most likely diagnosis?",
    options: JSON.stringify([
      "Adrenal adenoma",
      "Ectopic ACTH secretion",
      "Cushing disease (pituitary adenoma)",
      "Pseudo-Cushing syndrome",
      "Nelson syndrome",
    ]),
    answer: "Cushing disease (pituitary adenoma)",
    explanation:
      "The clinical presentation is classic for Cushing syndrome. The key differentiator is the high-dose dexamethasone suppression test: partial suppression of cortisol suggests a pituitary ACTH-secreting adenoma (Cushing disease), as these tumors retain some responsiveness to negative feedback. Adrenal adenomas and ectopic ACTH-secreting tumors would NOT suppress with high-dose dexamethasone. Cushing disease accounts for approximately 70% of endogenous Cushing syndrome cases.",
    clinicalPearl:
      "High-dose dex suppression: Cushing disease suppresses, ectopic/adrenal does not. Always check ACTH first to differentiate!",
    mnemonic:
      "Cushing Disease = Pituitary ADENOMA (suppresses with high-dose dex) vs. Cushing Syndrome = any cause of excess cortisol",
    difficulty: "Hard",
    system: "Endocrine",
    topic: "Cushing Syndrome",
    tags: JSON.stringify([
      "endocrine",
      "cushing",
      "pituitary",
      "dexamethasone",
    ]),
    distractorAnalysis: JSON.stringify({
      "Adrenal adenoma": "No suppression with high-dose dex; ACTH would be LOW",
      "Ectopic ACTH": "No suppression with high-dose dex; ACTH very high; often bronchial carcinoid or SCLC",
      "Pseudo-Cushing": "Caused by alcohol/depression; normal with dex-CRH test",
      "Nelson syndrome": "Occurs after bilateral adrenalectomy for Cushing; enlarging pituitary + hyperpigmentation",
    }),
  },
  {
    id: "demo-q-respiratory-1",
    type: "mcq",
    text: "A 70-year-old man with a 40-pack-year smoking history presents with chronic productive cough for 3 months per year for the past 2 years, progressive dyspnea, and wheezing. Spirometry shows FEV1/FVC ratio of 0.55 and FEV1 45% of predicted. Which of the following findings is most consistent with this patient's condition?",
    options: JSON.stringify([
      "Increased lung compliance and decreased recoil",
      "Decreased lung compliance and increased recoil",
      "Normal lung compliance with increased airway resistance",
      "Decreased total lung capacity",
      "Increased diffusing capacity for carbon monoxide (DLCO)",
    ]),
    answer: "Increased lung compliance and decreased recoil",
    explanation:
      "This patient has COPD (chronic bronchitis phenotype based on chronic productive cough, plus emphysema given the smoking history and spirometry findings). In emphysema, destruction of alveolar walls leads to loss of elastic recoil and increased lung compliance. The FEV1/FVC ratio < 0.7 confirms obstructive lung disease. DLCO is typically decreased (not increased) in emphysema due to loss of alveolar-capillary surface area.",
    clinicalPearl:
      "COPD = decreased recoil + increased compliance + decreased DLCO. 'Pink puffer' (emphysema) vs 'blue bloater' (chronic bronchitis).",
    mnemonic:
      "Emphysema = ELASTASE destroys elastin = Loss of Elastic recoil = Enlarged airspaces",
    difficulty: "Medium",
    system: "Respiratory",
    topic: "COPD",
    tags: JSON.stringify([
      "respiratory",
      "COPD",
      "spirometry",
      "pulmonology",
    ]),
    distractorAnalysis: JSON.stringify({
      "Decreased compliance + increased recoil": "This describes restrictive lung disease (e.g., pulmonary fibrosis)",
      "Normal compliance + increased resistance": "Oversimplification; compliance is increased in emphysema",
      "Decreased TLC": "TLC is increased in COPD due to air trapping; decreased TLC = restrictive disease",
      "Increased DLCO": "DLCO is decreased in emphysema; increased DLCO suggests pulmonary hemorrhage or V/Q mismatch",
    }),
  },
];

async function main() {
  console.log("🌱 Seeding demo data...\n");

  const createdUsers: { email: string; name: string; role: string; status: string }[] = [];

  // Create demo users
  for (const demoUser of DEMO_USERS) {
    const hashedPassword = await bcrypt.hash(demoUser.password, 12);

    const user = await prisma.user.upsert({
      where: { email: demoUser.email },
      update: {
        name: demoUser.name,
        password: hashedPassword,
        role: demoUser.role,
        emailVerified: new Date(demoUser.emailVerified),
        onboardingCompleted: true,
      },
      create: {
        name: demoUser.name,
        email: demoUser.email,
        password: hashedPassword,
        role: demoUser.role,
        emailVerified: new Date(demoUser.emailVerified),
        onboardingCompleted: true,
      },
    });

    // Create or update subscription
    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: { tier: "free", status: "active" },
      create: {
        userId: user.id,
        tier: "free",
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    // Create or update credit wallet
    await prisma.creditWallet.upsert({
      where: { userId: user.id },
      update: { balance: 25, totalEarned: 25 },
      create: {
        userId: user.id,
        balance: 25,
        totalEarned: 25,
      },
    });

    createdUsers.push({
      email: demoUser.email,
      name: demoUser.name,
      role: demoUser.role,
      status: "created",
    });

    console.log(`  ✓ User: ${demoUser.name} (${demoUser.email}) [${demoUser.role}]`);
  }

  // Create sample questions
  console.log("\n📝 Creating sample questions...");
  for (const q of SAMPLE_QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        type: q.type,
        text: q.text,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        clinicalPearl: q.clinicalPearl,
        mnemonic: q.mnemonic,
        distractorAnalysis: q.distractorAnalysis,
        difficulty: q.difficulty,
        system: q.system,
        topic: q.topic,
        tags: q.tags,
      },
      create: {
        id: q.id,
        type: q.type,
        text: q.text,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        clinicalPearl: q.clinicalPearl,
        mnemonic: q.mnemonic,
        distractorAnalysis: q.distractorAnalysis,
        difficulty: q.difficulty,
        system: q.system,
        topic: q.topic,
        tags: q.tags,
      },
    });
    console.log(`  ✓ Question: ${q.system} - ${q.topic} [${q.difficulty}]`);
  }

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 Demo Accounts:");
  console.log("  ┌─────────────────────────────────────────────┐");
  console.log("  │  Role      │  Email              │ Password  │");
  console.log("  ├─────────────────────────────────────────────┤");
  for (const u of DEMO_USERS) {
    console.log(`  │  ${u.role.padEnd(9)} │  ${u.email.padEnd(18)} │ ${u.password.padEnd(9)} │`);
  }
  console.log("  └─────────────────────────────────────────────┘");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
