import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';

// NOTE: do NOT self-fetch /api/auth/session from this route. When called
// through the preview proxy, `req.url` carries the public preview host and
// the internal fetch round-trips out through the proxy and fails → the old
// private resolver returned null → spurious 401s. The shared resolveUserId
// reads next-auth directly and falls back to the guest account.

/** Normalize question text for duplicate detection. */
function dupKey(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

// GET: Return import templates
export async function GET() {
  const csvTemplate = `text,type,options,answer,explanation,mnemonic,clinicalPearl,difficulty,system,topic,tags
"What is the most common cause of community-acquired pneumonia?","mcq","Streptococcus pneumoniae|Haemophilus influenzae|Mycoplasma pneumoniae|Klebsiella pneumoniae","Streptococcus pneumoniae","S. pneumoniae is the most common cause of CAP worldwide","Pneumonia = Pneumococcus","Think of the 'p' sounds: Pneumonia = Pneumococcus","Moderate","Respiratory","Pulmonary","respiratory,pneumonia,bugs"
"The left lung has 3 lobes","tf","","False","The left lung has 2 lobes (upper and lower), the right lung has 3","Left = Less (2 lobes)","Left lung is smaller due to heart","Easy","Respiratory","Anatomy","anatomy,lungs"`;

  const jsonTemplate = [
    {
      text: "What is the most common cause of community-acquired pneumonia?",
      type: "mcq",
      options: ["Streptococcus pneumoniae", "Haemophilus influenzae", "Mycoplasma pneumoniae", "Klebsiella pneumoniae"],
      answer: "Streptococcus pneumoniae",
      explanation: "S. pneumoniae is the most common cause of CAP worldwide",
      mnemonic: "Pneumonia = Pneumococcus",
      clinicalPearl: "Think of the 'p' sounds: Pneumonia = Pneumococcus",
      difficulty: "Moderate",
      system: "Respiratory",
      topic: "Pulmonary",
      tags: ["respiratory", "pneumonia", "bugs"],
    },
  ];

  return NextResponse.json({ csvTemplate, jsonTemplate });
}

function parseCSV(text: string): string[][] {
  const lines = text.split('\n').filter(l => l.trim());
  return lines.map(line => {
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { cells.push(current.trim()); current = ''; }
      else { current += char; }
    }
    cells.push(current.trim());
    return cells;
  });
}

// POST: Import questions from CSV or JSON
export async function POST(req: NextRequest) {
  const userId = await resolveUserId();
  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  try {
    const body = await req.json();
    const { format, data, mapping } = body as {
      format: 'csv' | 'json';
      data: string;
      mapping?: Record<string, string>;
    };

    if (!data) return NextResponse.json({ error: 'No data provided' }, { status: 400 });

    const defaultMapping: Record<string, string> = {
      text: 'text', answer: 'answer', type: 'type', options: 'options',
      explanation: 'explanation', mnemonic: 'mnemonic', clinicalPearl: 'clinicalPearl',
      system: 'system', topic: 'topic', difficulty: 'difficulty', tags: 'tags',
      imageUrl: 'imageUrl',
    };
    const colMap = { ...defaultMapping, ...mapping };

    let rows: Record<string, string>[] = [];
    if (format === 'csv') {
      const parsed = parseCSV(data);
      if (parsed.length < 2) return NextResponse.json({ error: 'CSV must have a header row and at least one data row' }, { status: 400 });
      const headers = parsed[0];
      for (let i = 1; i < parsed.length; i++) {
        const row: Record<string, string> = {};
        headers.forEach((h, idx) => { row[h.trim()] = (parsed[i][idx] || '').trim(); });
        rows.push(row);
      }
    } else {
      try {
        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) return NextResponse.json({ error: 'JSON must be an array of question objects' }, { status: 400 });
        rows = parsed;
      } catch {
        return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
      }
    }

    const errors: Array<{ row: number; message: string }> = [];
    let imported = 0;
    let duplicates = 0;

    // Duplicate protection: re-importing a file (e.g. to pick up questions a
    // previous partial extraction missed) must not create doubles.
    const existing = await db.question.findMany({ select: { text: true } });
    const existingKeys = new Set(existing.map((q) => dupKey(q.text)));

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const text = row[colMap.text] || row['text'] || '';
        const answer = row[colMap.answer] || row['answer'] || '';
        const type = row[colMap.type] || row['type'] || 'mcq';

        if (!text) { errors.push({ row: i + 1, message: 'Missing question text' }); continue; }
        if (!answer) { errors.push({ row: i + 1, message: 'Missing answer' }); continue; }

        if (existingKeys.has(dupKey(text))) {
          duplicates++;
          continue;
        }

        const validTypes = ['mcq', 'tf', 'short'];
        const qType = validTypes.includes(type.toLowerCase()) ? type.toLowerCase() : 'mcq';

        let options: string[] = [];
        const optionsRaw = row[colMap.options] ?? row['options'] ?? '';
        if (Array.isArray(optionsRaw)) {
          options = optionsRaw.map((o: unknown) => String(o).trim()).filter(Boolean);
        } else if (optionsRaw) {
          options = String(optionsRaw).split('|').map((o: string) => o.trim()).filter(Boolean);
        }

        const difficulty = ['Easy', 'Basic', 'Moderate', 'Hard', 'Expert'].includes(row[colMap.difficulty] || row['difficulty'] || '')
          ? (row[colMap.difficulty] || row['difficulty']) : 'Moderate';

        const tagsRaw = row[colMap.tags] ?? row['tags'] ?? '';
        const tags = Array.isArray(tagsRaw)
          ? tagsRaw.map((t: unknown) => String(t).trim()).filter(Boolean)
          : tagsRaw
            ? String(tagsRaw).split(',').map((t: string) => t.trim()).filter(Boolean)
            : [];

        // imageUrl — set when the question was extracted from an image
        // (PPTX slide image, DOCX word/media, PDF page render, standalone
        // image upload). Persisted on Question.imageUrl so the question card
        // renders the source image alongside the text. Validate the prefix
        // to reject any model-hallucinated path.
        const rawImageUrl =
          (typeof row[colMap.imageUrl] === 'string' ? row[colMap.imageUrl] : '') ||
          (typeof row['imageUrl'] === 'string' ? row['imageUrl'] : '') ||
          (typeof row['image_url'] === 'string' ? row['image_url'] : '') ||
          '';
        const imageUrl = rawImageUrl.startsWith('/generated/agent/imported/')
          ? rawImageUrl
          : '';

        await db.question.create({
          data: {
            text,
            answer,
            type: qType as 'mcq' | 'tf' | 'short',
            options: JSON.stringify(options),
            explanation: row[colMap.explanation] || row['explanation'] || '',
            mnemonic: row[colMap.mnemonic] || row['mnemonic'] || '',
            clinicalPearl: row[colMap.clinicalPearl] || row['clinicalPearl'] || '',
            distractorAnalysis: '',
            difficulty: difficulty as 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert',
            system: row[colMap.system] || row['system'] || 'General',
            topic: row[colMap.topic] || row['topic'] || 'General',
            tags: JSON.stringify(tags),
            isAIGenerated: false,
            ...(imageUrl ? { imageUrl } : {}),
          },
        });
        existingKeys.add(dupKey(text));
        imported++;
      } catch (err) {
        errors.push({ row: i + 1, message: err instanceof Error ? err.message : 'Unknown error' });
      }
    }

    return NextResponse.json({
      imported,
      total: rows.length,
      duplicates,
      errors: errors.slice(0, 20),
      errorsCount: errors.length,
    });
  } catch (error) {
    console.error('[Question Import] Error:', error);
    return NextResponse.json({ error: 'Failed to import questions' }, { status: 500 });
  }
}
