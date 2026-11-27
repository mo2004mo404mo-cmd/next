#!/usr/bin/env python3
"""Move the KEYBOARD-FIRST block in QuestionCard.tsx so its deps
(handleKeywordEval/handleAiEval) are declared before it (fix TDZ)."""
import re

PATH = '/home/z/my-project/src/components/medq/QuestionCard.tsx'
src = open(PATH, encoding='utf-8').read()

# 1) Cut the keyboard block: from the comment start through kbdHintChips deps close.
m = re.search(
    r'\n(  /\* ─+ *\n     KEYBOARD-FIRST STUDY FLOW.*?\n  \}, \[revealed, question\.type, parsedCitations\.length\]\);\n)',
    src, re.S)
assert m, 'keyboard block not found'
block = m.group(1)
src = src.replace(block, '\n', 1)

# 2) Insert it right after handleAiEval's closing (the last "  }, [question.text, question.answer, shortInput]);" pair)
anchor = "  }, [question.text, question.answer, shortInput]);\n\n  const handleDownloadJSON"
assert anchor in src, 'anchor not found'
src = src.replace(
    anchor,
    "  }, [question.text, question.answer, shortInput]);\n" + block + "\n  const handleDownloadJSON",
    1)

open(PATH, 'w', encoding='utf-8').write(src)
print('moved OK — block now sits after handleAiEval')
