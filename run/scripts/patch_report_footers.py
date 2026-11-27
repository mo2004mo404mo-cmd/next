# -*- coding: utf-8 -*-
"""页脚 PAGE 域格式修补（WPS 兼容）+ 移除封面空 pgNumType"""
import re
import shutil
import sys
import zipfile
import tempfile
import os

DOCX = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/download/MedQ 代码库审计报告.docx"

tmpdir = tempfile.mkdtemp()
with zipfile.ZipFile(DOCX) as zf:
    zf.extractall(tmpdir)

doc_path = os.path.join(tmpdir, "word", "document.xml")
with open(doc_path, encoding="utf-8") as f:
    doc = f.read()

# 1) 移除空 pgNumType（封面节）
doc, n_removed = re.subn(r"<w:pgNumType/>", "", doc)

# 2) 找到各节 footer 引用顺序：解析 sectPr 中的 footerReference r:id 顺序
# 简化：按 document.xml 中 sectPr 出现顺序收集 footerReference id
sect_footers = re.findall(r'<w:footerReference[^>]*w:type="default"[^>]*r:id="(rId\d+)"', doc)
with open(doc_path, "w", encoding="utf-8") as f:
    f.write(doc)

# 3) 解析 rels 得到 rId -> footerN.xml
rels_path = os.path.join(tmpdir, "word", "_rels", "document.xml.rels")
with open(rels_path, encoding="utf-8") as f:
    rels = f.read()
rid_map = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="(footer\d+\.xml)"', rels))

# 节顺序：第 2 节（目录，ROMAN）为第一个带 footer 的节，第 3 节（正文，arabic）为第二个
fmt_by_index = ["ROMAN", "arabic"]
patched = []
for i, rid in enumerate(sect_footers[:2]):
    fname = rid_map.get(rid)
    if not fname:
        continue
    fpath = os.path.join(tmpdir, "word", fname)
    with open(fpath, encoding="utf-8") as f:
        fx = f.read()
    fmt = fmt_by_index[i] if i < len(fmt_by_index) else "arabic"
    fx2, n = re.subn(
        r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
        rf"\1 PAGE \\* {fmt} \\* MERGEFORMAT \2",
        fx,
    )
    if n:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(fx2)
        patched.append((fname, fmt, n))

# 4) 重打包
out = DOCX
tmp_out = DOCX + ".tmp"
with zipfile.ZipFile(tmp_out, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, _, files in os.walk(tmpdir):
        for file in files:
            full = os.path.join(root, file)
            rel = os.path.relpath(full, tmpdir)
            zf.write(full, rel)
shutil.move(tmp_out, out)
shutil.rmtree(tmpdir)
print(f"pgNumType removed: {n_removed}; footers patched: {patched}")
