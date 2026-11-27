# -*- coding: utf-8 -*-
"""MedQ 审计报告图表生成：技术债分布 + 12 阶段路线图工作量"""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.font_manager as fm
import matplotlib.pyplot as plt
import numpy as np

fm.fontManager.addfont('/usr/share/fonts/truetype/chinese/NotoSansSC-Regular.ttf')
plt.rcParams['font.sans-serif'] = ['Noto Sans SC', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

OUT = "/home/z/my-project/scripts/assets"
os.makedirs(OUT, exist_ok=True)

# ── 图 1：技术债分布（领域 × 严重度，与报告第 7 章登记表逐条对应）──
domains = ["安全", "提取流水线", "Agent 编排", "RAG 检索", "多模态", "代码健康\n与运维"]
# 顺序: P0 / P1 / P2 / P3
data = {
    "P0 严重": [4, 1, 0, 1, 0, 1],
    "P1 高":   [0, 3, 3, 1, 2, 1],
    "P2 中":   [1, 5, 4, 2, 0, 0],
    "P3 低":   [0, 1, 0, 2, 0, 3],
}
colors = {
    "P0 严重": "#B85B5B",
    "P1 高":   "#D9905B",
    "P2 中":   "#5B8DB8",
    "P3 低":   "#A9B6C2",
}

fig, ax = plt.subplots(figsize=(7.6, 4.2), dpi=200, constrained_layout=True)
x = np.arange(len(domains))
width = 0.62
bottom = np.zeros(len(domains))
for label, vals in data.items():
    vals = np.array(vals, dtype=float)
    bars = ax.bar(x, vals, width, bottom=bottom, label=label,
                  color=colors[label], edgecolor="white", linewidth=0.8)
    for xi, (v, b) in enumerate(zip(vals, bottom)):
        if v > 0:
            ax.text(xi, b + v / 2, str(int(v)), ha="center", va="center",
                    fontsize=9, color="white", fontweight="bold")
    bottom += vals
totals = bottom.astype(int)
for xi, t in enumerate(totals):
    ax.text(xi, t + 0.15, f"共 {t} 项", ha="center", va="bottom", fontsize=9, color="#3A4A5A")
ax.set_xticks(x)
ax.set_xticklabels(domains, fontsize=10)
ax.set_ylabel("登记条目数", fontsize=10)
ax.set_ylim(0, max(totals) + 1.3)
ax.set_title("图 1  技术债与弱点登记分布（共 35 项，按领域与严重度）", fontsize=12, pad=12)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.grid(axis="y", linestyle="--", alpha=0.35)
ax.set_axisbelow(True)
ax.legend(loc="lower left", bbox_to_anchor=(1.01, 0.02), fontsize=9, frameon=False)
fig.savefig(f"{OUT}/chart-debt.png")
plt.close(fig)

# ── 图 2：12 阶段路线图相对工作量（人日，单人基准）──
phases = [
    "阶段 1  提取架构统一与 P0 修复",
    "阶段 2  文档解析增强（PDF/Word/PPT/Excel）",
    "阶段 3  多模态摄取（视频·关键优先级）",
    "阶段 4  结构感知分块（token 制）",
    "阶段 5  嵌入与索引",
    "阶段 6  混合 RAG 与重排升级",
    "阶段 7  LangGraph.js 编排",
    "阶段 8  Agent 工具层",
    "阶段 9  引用导航",
    "阶段 10 安全加固",
    "阶段 11 测试与评估",
    "阶段 12  数据迁移与上线",
]
effort = [5, 6, 10, 4, 6, 5, 8, 5, 4, 6, 6, 4]
critical = {2, 6}  # 阶段 3 与阶段 7 为关键路径（0-based 下标）

fig, ax = plt.subplots(figsize=(7.6, 5.4), dpi=200, constrained_layout=True)
y = np.arange(len(phases))[::-1]
bar_colors = ["#2F5D8C" if i in critical else "#5B8DB8" for i in range(len(phases))]
bars = ax.barh(y, effort, height=0.62, color=bar_colors, edgecolor="white")
for yi, e in zip(y, effort):
    ax.text(e + 0.15, yi, f"{e}", va="center", ha="left", fontsize=9, color="#3A4A5A")
ax.set_yticks(y)
ax.set_yticklabels(phases, fontsize=9.5)
ax.set_xlabel("相对工作量（人日，单人全职基准）", fontsize=10)
ax.set_xlim(0, max(effort) + 1.6)
ax.set_title("图 2  12 阶段实施路线图相对工作量（合计约 69 人日）", fontsize=12, pad=12)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.grid(axis="x", linestyle="--", alpha=0.35)
ax.set_axisbelow(True)
from matplotlib.patches import Patch
ax.legend(handles=[Patch(facecolor="#2F5D8C", label="关键路径阶段（阶段 3 / 阶段 7）"),
                   Patch(facecolor="#5B8DB8", label="常规阶段")],
          loc="lower left", bbox_to_anchor=(1.01, 0.55), fontsize=9, frameon=False)
fig.savefig(f"{OUT}/chart-effort.png")
plt.close(fig)

print("charts done:", os.listdir(OUT))
