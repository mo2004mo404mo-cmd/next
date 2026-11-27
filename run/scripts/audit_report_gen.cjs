/* MedQ 代码库审计报告生成器 — docx 9.x（CommonJS） */
const fs = require("fs");
const path = require("path");
const docx = require("/tmp/my-project/node_modules/docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, PageBreak, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  SectionType, TableLayoutType, TableOfContents, LevelFormat,
} = docx;

const OUT_PATH = "/home/z/my-project/download/MedQ 代码库审计报告.docx";
const ASSETS = "/home/z/my-project/scripts/assets";

/* ── 调色板：Dawn Mist Tech（科技蓝，正式报告 Profile A）── */
const P = {
  primary: "0A1628", body: "000000", secondary: "6878A0",
  accent: "5B8DB8", surface: "F4F8FC", line: "C9D6E3",
  headFill: "E7EFF7", warn: "B85B5B",
};

/* ── 通用常量 ── */
const PG_SIZE = { width: 11906, height: 16838 };
const PG_MARGIN = { top: 1440, bottom: 1440, left: 1701, right: 1417 };
const allNoBorders = {
  top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
  insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
};
const noBorders = {
  top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
};

/* ── 封面工具函数（design-system.md 规范实现）── */
function splitTitleLines(title, charsPerLine) {
  if (title.length <= charsPerLine) return [title];
  const breakAfter = new Set([..."，。、；：！？", ..."的与和及之在于为", ..."-_—–·/", ..." \t"]);
  const lines = [];
  let remaining = title;
  while (remaining.length > charsPerLine) {
    let breakAt = -1;
    for (let i = charsPerLine; i >= Math.floor(charsPerLine * 0.6); i--) {
      if (i < remaining.length && breakAfter.has(remaining[i - 1])) { breakAt = i; break; }
    }
    if (breakAt === -1) {
      const limit = Math.min(remaining.length, Math.ceil(charsPerLine * 1.3));
      for (let i = charsPerLine + 1; i < limit; i++) {
        if (breakAfter.has(remaining[i - 1])) { breakAt = i; break; }
      }
    }
    if (breakAt === -1) {
      breakAt = charsPerLine;
      const prevChar = remaining[breakAt - 1], nextChar = remaining[breakAt];
      if (prevChar && nextChar && !breakAfter.has(prevChar) && !breakAfter.has(nextChar) &&
          /[\u4e00-\u9fff]/.test(prevChar) && /[\u4e00-\u9fff]/.test(nextChar)) breakAt -= 1;
    }
    lines.push(remaining.slice(0, breakAt).trim());
    remaining = remaining.slice(breakAt).trim();
  }
  if (remaining) lines.push(remaining);
  if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
    const last = lines.pop();
    lines[lines.length - 1] += last;
  }
  return lines;
}
function calcTitleLayout(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  const charsPerLine = (pt) => Math.floor(maxWidthTwips / (pt * 20));
  let titlePt = preferredPt, lines;
  while (titlePt >= minPt) {
    const cpl = charsPerLine(titlePt);
    if (cpl < 2) { titlePt -= 2; continue; }
    lines = splitTitleLines(title, cpl);
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  if (!lines || lines.length > 3) { lines = splitTitleLines(title, charsPerLine(minPt)); titlePt = minPt; }
  return { titlePt, titleLines: lines };
}
function calcCoverSpacing(params) {
  const { titleLineCount = 1, titlePt = 36, hasSubtitle = false, hasEnglishLabel = false,
    metaLineCount = 0, fixedHeight = 800, pageHeight = 16838, marginTop = 0, marginBottom = 0 } = params;
  const SAFETY = 1200;
  const usableHeight = pageHeight - marginTop - marginBottom - SAFETY;
  const titleHeight = titleLineCount * (titlePt * 23 + 200);
  const subtitleHeight = hasSubtitle ? (12 * 23 + 600) : 0;
  const englishLabelHeight = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaHeight = metaLineCount * (10 * 23 + 100);
  const implicitParaHeight = 3 * 300;
  const contentHeight = titleHeight + subtitleHeight + englishLabelHeight + metaHeight + fixedHeight + implicitParaHeight;
  const safeRemaining = Math.max(usableHeight - contentHeight, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(safeRemaining * 0.45);
  const rawBottom = Math.floor(safeRemaining * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  const midSpacing = Math.max(safeRemaining - topSpacing - bottomSpacing, 0);
  return { topSpacing, midSpacing, bottomSpacing };
}

/* ── 封面 R1（纯段落左对齐，深底）── */
function buildCoverR1(config) {
  const C = config.palette;
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 40, 24);
  const titleSize = titlePt * 2;
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length, fixedHeight: 400,
  });
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: C.accent, space: 12 };
  const children = [];
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.accent, space: 8 } },
      children: [new TextRun({ text: config.englishLabel.split("").join("  "), size: 18, color: C.accent, font: { ascii: "Calibri", eastAsia: "SimHei" }, characterSpacing: 40 })],
    }));
  }
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, bold: true, color: C.titleColor, font: { eastAsia: "SimHei", ascii: "Arial" } })],
    }));
  }
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 800 },
      children: [new TextRun({ text: config.subtitle, size: 24, color: C.subtitleColor, font: { eastAsia: "Microsoft YaHei", ascii: "Arial" } })],
    }));
  }
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({ text: line, size: 24, color: C.metaColor, font: { eastAsia: "Microsoft YaHei", ascii: "Arial" } })],
    }));
  }
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: C.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: C.footerColor, font: { ascii: "Arial", eastAsia: "Microsoft YaHei" } }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: C.footerColor, font: { ascii: "Arial", eastAsia: "Microsoft YaHei" } }),
    ],
  }));
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: C.bg }, borders: noBorders, children })],
    })],
  })];
}

/* ── 正文构件 ── */
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 180, line: 312 },
    children: [new TextRun({ text, bold: true, size: 32, color: P.primary, font: { ascii: "Times New Roman", eastAsia: "SimHei" } })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140, line: 312 },
    children: [new TextRun({ text, bold: true, size: 28, color: P.primary, font: { ascii: "Times New Roman", eastAsia: "SimHei" } })],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 110, line: 312 },
    children: [new TextRun({ text, bold: true, size: 24, color: P.primary, font: { ascii: "Times New Roman", eastAsia: "SimHei" } })],
  });
}
/* 正文段：两端对齐 + 首行缩进 2 字符；支持 [text, {bold}] 混排 */
function para(runs, opts = {}) {
  const items = typeof runs === "string" ? [[runs, {}]] : runs;
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: opts.noIndent ? undefined : { firstLine: 480 },
    spacing: { line: 312, after: opts.after != null ? opts.after : 80 },
    keepNext: opts.keepNext || false,
    children: items.map(([t, o]) => new TextRun({
      text: t, size: 24, color: (o && o.color) || P.body, bold: (o && o.bold) || false,
      font: { ascii: "Times New Roman", eastAsia: "SimSun" },
    })),
  });
}
/* 列表项（左对齐，不缩进首行） */
function li(runs, ref) {
  const items = typeof runs === "string" ? [[runs, {}]] : runs;
  const useNumbering = typeof ref === "string";
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 312, after: 60 },
    ...(useNumbering ? { numbering: { reference: ref, level: 0 } } : { bullet: { level: 0 } }),
    children: items.map(([t, o]) => new TextRun({
      text: t, size: 24, color: (o && o.color) || P.body, bold: (o && o.bold) || false,
      font: { ascii: "Times New Roman", eastAsia: "SimSun" },
    })),
  });
}
/* 表标题（表格上方，keepNext） */
function tCaption(text) {
  return new Paragraph({
    keepNext: true, alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 80, line: 312 },
    children: [new TextRun({ text, bold: true, size: 21, color: P.primary, font: { ascii: "Times New Roman", eastAsia: "SimHei" } })],
  });
}
/* 通用表格：横线式（accent 上下边 + 浅内线），百分比列宽 */
function makeTable(headers, rows, widths, opts = {}) {
  const cellMargins = { top: 60, bottom: 60, left: 110, right: 110 };
  const headerRow = new TableRow({
    tableHeader: true, cantSplit: true,
    children: headers.map((text, i) => new TableCell({
      children: [new Paragraph({
        alignment: AlignmentType.LEFT, spacing: { line: 312 },
        children: [new TextRun({ text, bold: true, size: 20, color: P.primary, font: { ascii: "Times New Roman", eastAsia: "SimHei" } })],
      })],
      shading: { type: ShadingType.CLEAR, fill: P.headFill },
      margins: cellMargins,
      width: { size: widths[i], type: WidthType.PERCENTAGE },
    })),
  });
  const dataRows = rows.map((cells, ri) => new TableRow({
    cantSplit: true,
    children: cells.map((cell, i) => {
      const zebra = opts.zebra && ri % 2 === 1;
      const content = typeof cell === "string" ? [[cell, {}]] : cell;
      return new TableCell({
        children: [new Paragraph({
          alignment: AlignmentType.LEFT, spacing: { line: 312 },
          children: content.map(([t, o]) => new TextRun({
            text: t, size: 20, color: (o && o.color) || P.body, bold: (o && o.bold) || false,
            font: { ascii: "Times New Roman", eastAsia: "SimSun" },
          })),
        })],
        shading: zebra ? { type: ShadingType.CLEAR, fill: P.surface } : undefined,
        margins: cellMargins,
        width: { size: widths[i], type: WidthType.PERCENTAGE },
      });
    }),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.accent },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.accent },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: P.line },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [headerRow, ...dataRows],
  });
}
/* 图片段（保持纵横比，PNG IHDR 读取宽高） */
function pngSize(buf) { return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }; }
function figure(file, displayWidth) {
  const buf = fs.readFileSync(path.join(ASSETS, file));
  const { w, h } = pngSize(buf);
  const dw = displayWidth, dh = Math.round(displayWidth * h / w);
  return new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 },
    children: [new ImageRun({ data: buf, transformation: { width: dw, height: dh }, type: "png" })],
  });
}
function figCaption(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 160, line: 312 },
    children: [new TextRun({ text, size: 21, color: P.secondary, font: { ascii: "Times New Roman", eastAsia: "SimSun" } })],
  });
}

/* ═══════════════ 正文内容 ═══════════════ */
const body = [];

/* ── 执行摘要 ── */
body.push(h1("执行摘要"));
body.push(para([["本报告是对 MedQ 医学教育平台（部署于 /tmp/my-project，Next.js 16 + Prisma 7 + PostgreSQL 单体应用）的一次完整代码库审计，覆盖总体架构、数据模型、检索增强生成（RAG）工作流、题目提取流水线、多模态摄取、Agent 编排与安全面七个维度。审计过程为纯只读操作，未修改任何代码。证据基础包括：约 25 个核心文件的逐一精读与探查（含 1,989 行的提取路由与 2,081 行的聊天代理运行时）、128 个 Prisma 模型的完整梳理，以及知识库与题库全部 API 路由的清点。"]]));
body.push(para([["总体判断：平台的工程成熟度显著高于典型快速迭代原型。", { bold: true }], ["所有长任务均以数据库持久化状态机运行（KnowledgeSource、ImportExtraction、ExplanationJob、AgentJob 均支持断点续跑）；检索侧已实现六阶段混合管线（多查询扩展、按模型分组稠密检索、BM25 词法检索、RRF 融合、LLM 列表重排、可观测日志），并配套引用三层验证机制；深度出题代理基于 deepagents 1.15.1 与 LangChain 1.x 实现了子代理委托、文件系统工作区隔离与人工审批（HITL）。视频摄取已具备 FFmpeg 帧采样与时间戳标注能力，这是本次路线图视频阶段可以直接夯实的地基。"]]));
body.push(para([["审计共登记 35 项技术债与弱点，其中 P0 级 7 项：", { bold: true }], ["URL 摄取 SSRF 无防护、知识库共享访客账户、x-user-id 请求头认证兜底、匿名 Drive OAuth 绑定访客、提取路由 maxQuestions 参数作用域缺陷（被 ignoreBuildErrors 掩盖）、核心模块零测试防线、检索无向量索引（候选上限 4,000 chunk 全量内存扫描）。上述问题不阻塞路线图启动，但应在阶段 1（参数缺陷与测试起步）与阶段 10（安全集中加固）优先消除。"]]));
body.push(para([["最重要的机会性发现是：", { bold: true }], ["@langchain/langgraph 1.5.3 已经作为 deepagents 的传递依赖存在于 node_modules，Prisma schema 中还预留了形状与 LangGraph 检查点存储完全一致的 LgCheckpoint 与 LgWrite 两张未使用表。换言之，LangGraph.js 集成的实际边际成本远低于常规评估——只需显式声明依赖、实现基于既有表的检查点保存器即可。据此本报告提出 12 阶段实施路线图（相对工作量合计约 69 人日），以视频多模态（阶段 3）与 LangGraph 编排（阶段 7）为关键路径。本报告等待批准后，才会开始任何代码改动。"]]));

/* ── 1 审计范围与方法 ── */
body.push(h1("1  审计范围与方法"));
body.push(h2("1.1  审计范围与证据基础"));
body.push(para("本次审计以 Principal AI Architect 视角执行，目标是回答四个问题：现有架构是否足以承载规划中的 RAG 与多模态升级；提取与摄取流水线的真实能力边界在哪里；弱点与债务的规模与优先级如何；LangGraph.js 应以何种方式集成且不违反既定硬约束。审计对象为代码库现状（当前构建与运行版本），不涉及任何未落地的设想功能。"));
body.push(para("核心文件采取全文精读，其余领域由四路并行探查覆盖：数据模型与 API 面、题目提取流水线、深度代理与 LangChain 用法、安全与媒体摄取。下表列出精读与深度探查的主要文件及其在系统中的角色。"));
body.push(tCaption("表 1-1  审计核心文件清单（精读 + 深度探查）"));
body.push(makeTable(
  ["文件", "行数", "系统角色"],
  [
    ["src/app/api/questions/import/extract/route.ts", "1,989", "题库 AI 提取后台任务（HTTP + 编排 + VLM + 持久化）"],
    ["src/lib/agent/knowledge/pipeline.ts", "657", "知识摄取管线（解析、分块、增强、嵌入、落库、重建索引）"],
    ["src/lib/agent/knowledge/hybrid.ts", "712", "混合检索引擎与引用判定"],
    ["src/lib/agent/knowledge/ingest-media.ts", "780", "媒体解析（DOCX/PPTX/XLSX/EPUB、音频、视频帧采样、VLM）"],
    ["src/lib/agent/knowledge/audio-pipeline.ts", "602", "音频归一化、VAD 分段、ASR、转写后处理"],
    ["src/lib/agent/knowledge/{embeddings,llm,text-quality,file-store}.ts", "1,063", "嵌入子系统、RAG 辅助 LLM、分块质量、原件保留"],
    ["src/lib/server-file-extract.ts 与 src/lib/file-extract.ts", "232 + 702", "服务端 / 客户端文件提取双实现"],
    ["src/lib/agent/question-deep-agent.ts", "1,193", "深度出题代理（deepagents 编排、save_question、引用验证）"],
    ["src/lib/agent/deep-agent-runtime.ts", "2,081", "聊天代理运行时（中间件栈、SSE 续传、HITL、队列）"],
    ["src/lib/server/resolve-model.ts 与 src/lib/freellmapi-embedded.ts", "419 + 127", "模型解析链与嵌入式 AI 路由"],
    ["prisma/schema.prisma", "2,701", "128 个模型（全文梳理）"],
    ["src/components/medq/ImportQuestionsModal.tsx", "1,905", "导入交互与任务恢复（深度探查）"],
  ],
  [42, 12, 46], { zebra: true }
));
body.push(para("范围边界同样需要说明：freellmapi 目录下的 AI 路由器（约 40 个 provider 的 vendored 服务）被当作基础设施边界处理，只审计其嵌入方式与配置链路，不深入其内部实现；社交、考试、商业化等与本次升级无关的业务模块未纳入；UI 组件仅审计与提取、知识库直接相关的部分。所有结论均可回溯到具体文件与行号。", { after: 120 }));
body.push(h2("1.2  评级标准与只读原则"));
body.push(para("弱点登记采用四级严重度：P0（严重）指可直接导致数据泄露、功能失效或契约失真，须在路线图早期消除；P1（高）指造成明确的质量损失或显著维护负担；P2（中）指局部缺陷、可观测性缺口或语义漂移；P3（低）指死代码、注释漂移与整洁度问题。评级同时考虑发生概率与影响半径。审计全程未修改任何文件，验证性操作（如依赖版本查询）均为只读命令。"));

/* ── 2 现有架构与技术栈 ── */
body.push(h1("2  现有架构与技术栈"));
body.push(h2("2.1  总体架构"));
body.push(para("MedQ 是一个单进程 Next.js 16.3.3（App Router）单体应用，对外只暴露 3000 端口。FreeLLM AI 路由器不再以独立进程存在：src/lib/freellmapi-embedded.ts 在 instrumentation-nodejs.ts 阶段加载 freellmapi/server/dist/index.js，在同一 Node 进程内的临时回环端口（listen 0）启动 Express 子应用，端口发布到 globalThis 供反向代理与鉴权桥接使用。/v1、/freellm 与 /freellmapi 全部经由 Next.js 同源转发，路由器的后台服务（健康检查、目录同步、冷却探测、备份）随主进程生死。"));
body.push(para("数据层为嵌入式 PostgreSQL（.pg-embed 目录），运行时经 @prisma/adapter-pg 驱动适配器连接，真实连接串由 .env.local 提供（.env 中的 SQLite 串是启动脚本的陈旧写入，prisma.config.ts 已显式绕开）。应用环境存在硬性约束：沙箱总内存 4GB，生产构建必须以 NODE_OPTIONS=--max-old-space-size=1792 运行 next build --webpack，耗时约 9 至 14 分钟；沙箱回收后 PostgreSQL 与服务器都会停止，需按运维脚本恢复。任何升级方案都必须把这些约束当作一级输入。"));
body.push(h2("2.2  技术栈清单"));
body.push(para("依赖清单（package.json）显示技术选型覆盖面广但边界清晰：LLM 编排层使用 LangChain 1.x 家族与 deepagents；生成侧另有一套 Vercel AI SDK v7 适配层。下表按层归纳关键组件。"));
body.push(tCaption("表 2-1  技术栈清单（关键依赖）"));
body.push(makeTable(
  ["层", "组件与版本", "用途说明"],
  [
    ["框架", "Next.js 16.3.3、React 19.3、TypeScript 5", "App Router 单体；服务端路由与 UI 同构"],
    ["数据", "Prisma 7.10、@prisma/adapter-pg、PostgreSQL（嵌入式）", "128 模型；任务状态机全部落库"],
    ["LLM 编排", "@langchain/core 1.x、@langchain/openai 1.x、langchain 1.6（peer）、deepagents 1.15.1", "工具基座、ChatOpenAI、中间件栈、自治代理"],
    ["传递依赖", "@langchain/langgraph 1.5.3（随 deepagents 安装）", "当前无任何直接 import——集成机会（见第 8 章）"],
    ["AI SDK", "ai 7.0.102、@ai-sdk/{openai,anthropic,google} 4.x", "轻量生成链路与模型适配"],
    ["本地推理", "@huggingface/transformers 4.2、web-llm、wllama", "BGE 本地嵌入；浏览器端 LLM（遗留）"],
    ["文档解析", "unpdf 1.8.1、pdfjs-dist 6.4.299、mammoth 1.12、exceljs 4.4、jszip", "服务端 / 浏览器双端解析"],
    ["多媒体", "ffmpeg / ffprobe（子进程）、yt-dlp", "音频归一化、视频帧采样、YouTube 下载"],
    ["网关", "嵌入式 FreeLLM 路由、z-ai-web-dev-sdk 0.0.18", "统一 /v1 端点与托管回退"],
    ["校验", "zod 4.5.2", "Agent 工具入参 schema（DynamicStructuredTool）"],
    ["测试", "vitest（仅 freellmapi 内）", "src/ 主应用当前零测试（登记为 S-06）"],
  ],
  [16, 44, 40], { zebra: true }
));
body.push(h2("2.3  数据模型全景"));
body.push(para("schema.prisma 共定义 128 个模型，唯一枚举 Role 未被引用（死代码）。按业务域分布为：认证与安全 9、题库与练习核心 19、学习追踪 8、临床与课程内容 24、商业化计量 11、社交通知 12、小组学习 15、Agent 记忆与技能 5、知识库 RAG 4、Agent 运行时遥测 19、AI 批量任务 2。与本次升级直接相关的是知识库三表与两类任务表。"));
body.push(tCaption("表 2-2  知识库 RAG 数据模型"));
body.push(makeTable(
  ["模型", "关键字段", "索引与关联"],
  [
    ["KnowledgeSource", "userId、type（file/url/text）、status（pending/processing/ready/failed）、fileKind（document/audio/video/image/url/text）、metaJson（进度、时长、转写模式）", "@@index([userId, status])；documents/chunks 级联"],
    ["KnowledgeDocument", "sourceId、title、mimeType、sizeBytes、content（10 万字符截断）、chunkCount", "@@index([sourceId])"],
    ["KnowledgeChunk", "documentId、sourceId、idx、content、embedding（Bytes = BYTEA 序列化 Float32Array）、embeddingModel、contextSummary、tokens、metaJson", "仅 [sourceId]、[documentId]——embedding 无任何索引"],
    ["RagQueryLog", "query、sourceIds、queriesJson、retrievedJson（含各阶段分数）、topK、latencyMs", "@@index([userId, createdAt])，检索可观测"],
  ],
  [22, 46, 32], { zebra: true }
));
body.push(para("向量存储是本次审计的一个关键结论：PostgreSQL 未启用 pgvector，schema 无任何 vector 类型或数据库级向量索引；嵌入以序列化 Float32Array 存于 BYTEA 列，检索时由应用层加载、内存中做余弦与 BM25 混合。每块嵌入的来源模型记录在 embeddingModel 字段，检索按模型分组比较，避免跨模型空间错配——这个设计在迁移到新索引方案时可以直接沿用。此外 schema 第 2,581 至 2,601 行存在 LgCheckpoint 与 LgWrite 两个模型（threadId、checkpointNs、checkpointId、parentCheckpointId 与 writes 表），形状与 LangGraph 检查点存储一致，但全库无任何手写代码使用——它们是第 8 章集成方案的现成地基。"));
body.push(para("任务侧的两类状态机值得肯定：ImportExtraction（AI 抽题）将逐 chunk 结果持久化在 chunkResults 列，支持多 pass 断点续跑；AgentJob（durable 队列）带 lease、maxAttempts 与 cancelRequested 标志。这种把长任务状态放数据库而非内存的设计，是后续引入 LangGraph checkpointer 之外的第二条恢复通道。"));
body.push(h2("2.4  AI 路由与模型解析链"));
body.push(para("模型解析（src/lib/server/resolve-model.ts）的优先级链为：阶段路由（MODEL_ROUTES 环境变量）→ 客户端 x-model 头 → 用户级默认（User.defaultModel）→ DEFAULT_MODEL 环境变量 → BYOK（加密存储于 UserApiKey，多端点故障转移）→ 自动探测（Ollama → 环境密钥 → ZAI）。被路由或兜底切换的模型会剥离客户端传入的连接参数，避免错配；非托管 baseUrl 与 BYOK 端点经 SSRF 校验（但仅限生产环境，登记为 M-12）。"));
body.push(para("深度代理侧另有一条更简单的链（MEDQ_AGENT_MODEL / MEDQ_AGENT_BASE_URL / MEDQ_AGENT_API_KEY，当前 .env.local 指向嵌入式路由），并在三处独立实现（question-deep-agent、deep-agent-runtime、config.ts），行为已有漂移（登记为 H-05）。Z.AI SDK 是全链路兜底：知识管线、提取路由、代理运行时都内置了它的直接回退路径，并配有进程级并发闸门与自适应限速退避。"));

/* ── 3 RAG 工作流现状 ── */
body.push(h1("3  RAG 工作流现状"));
body.push(h2("3.1  摄取管线（pipeline.ts）"));
body.push(para("摄取流程为：KnowledgeSource 创建（pending）→ 解析 → 分块 → 上下文增强 → 嵌入 → 落库（ready/failed）。文件解析按扩展名分发：PDF 走 unpdf 并做软换行与连字符修复；DOCX/PPTX/XLSX/EPUB 委托 ingest-media（含幻灯片、备注、嵌入图片、多表）；URL 走 ZAI 页面阅读器优先、SSRF 防护的直抓兜底；纯文本保持逐字不变。媒体输入（音视频图片）由 ingest-media 预解析后以 parsed 形态进入同一管线，fileKind 落库供检索过滤与 UI 徽标。"));
body.push(para("分块当前为结构感知、句子对齐的字符制策略：目标 900 字符、重叠 150 字符（text-quality.ts 的 chunkTextQuality），段落累积为主、超长段按句子切分打包，绝不在词中间截断。上下文增强采用 Anthropic 式上下文检索：LLM 为每个 chunk 写一句定位摘要，40 块一批、最多 120 块（约 3 批），超限或失败静默降级为标题模板。嵌入输入为摘要加正文拼接（摘要参与向量与 BM25 双通道）。文档原文截断至 10 万字符存储，reindexKnowledgeSource 支持从保留原件重新解析并原位重建 chunk。"));
body.push(para("摄取进度通过 metaJson.progress（stage/percent/note）回写，前端轮询渲染真实进度条。整体设计强调优雅降级：LLM 不可用时增强跳过、嵌入退化为本地模型，管线永不因外部服务缺失而中断。"));
body.push(h2("3.2  检索管线（hybrid.ts）"));
body.push(para("retrieveKnowledgeHybrid 实现六阶段管线，每阶段均可独立降级。下表给出各阶段的实现与当前参数，并对照路线图目标值。"));
body.push(tCaption("表 3-1  混合检索管线阶段与参数"));
body.push(makeTable(
  ["阶段", "实现", "当前参数", "路线图目标"],
  [
    ["1 查询扩展", "LLM 生成 2-3 个改写（术语/通俗/关键词）", "20s 超时，失败即跳过", "维持，并入图编排"],
    ["2 稠密检索", "按 embeddingModel 分组余弦扫描", "候选上限 4,000 chunk（MAX_CANDIDATES）", "索引化解除上限"],
    ["3 词法检索", "BM25（contextSummary + content）", "k1=1.5、b=0.75", "维持"],
    ["4 排名融合", "RRF", "k=60；融合池 24（上限 40）", "池 30-50"],
    ["5 LLM 重排", "列表式 0-10 打分（relevance / answer-support 两种判据）", "RERANK_MAX_CANDIDATES=24；入选阈值 7 / 4", "检索 20-30、重排保留 5-8"],
    ["6 可观测", "RagQueryLog 落库（含各阶段分数）", "skipLog 可选", "扩展为质量看板"],
  ],
  [14, 34, 30, 22], { zebra: true }
));
body.push(para("两个工程细节体现了实测驱动的调优：重排候选从 20 提到 24，注释记录了尾部 4 块永远沉底的具体失败案例；重排预览从 400 字符改为全块边界安全截断，注释记录了答案位于第 690 字符处被打 0 分的案例。重排分与 RRF 的混合公式为 score×10 + rrf，未打分候补以 rrf-1 回填。topK 默认 8、上限 20，候选池默认 24、上限 40——与规划目标（检索 20-30、重排 5-8）的差距在阶段 6 收敛。"));
body.push(h2("3.3  引用三层验证"));
body.push(para("save_question 工具的引用验证是全链路最有特色的部分，共三层：第一层校验代理自报的 (sourceId, chunkId) 对确实存在且属主匹配；第二层以题目加答案做 answer-support 模式的纠错检索（topK 8）；第三层对至多 14 个候选用共享判据做 LLM 评分与答案 token 覆盖率的合取门（judgeScore ≥ 7 且 coverage ≥ 0.15），最终每题保留至多 4 条引用。评分判据 ANSWER_SUPPORT_WARNING 与带校准的少样本示例在重排器与判定器之间共享，保证排序与验证对何谓支持答案的定义一致。"));
body.push(h2("3.4  嵌入子系统"));
body.push(para("embeddings.ts 以三 provider 链解析进程级嵌入器：优先任何可用的 OpenAI 兼容端点（resolveModel 链，含健康检查），其次本地 BGE（Xenova/bge-small-en-v1.5，384 维，transformers.js，约 25MB 一次性下载后离线），最后哈希三字母组 256 维兜底。查询侧 BGE 附加检索指令前缀（s2p），远程端点两侧原样。解析结果缓存于 globalThis，跨模型语料靠 embeddingModel 分组保持可比。该子系统的降级设计扎实，阶段 5 的索引升级只需替换扫描层、保留 provider 抽象。"));
body.push(h2("3.5  现状小结"));
body.push(para("RAG 侧的 strengths 在于分层降级、检索可观测与引用验证；差距集中在三点：无向量索引导致 4,000 chunk 硬上限与线性延迟（S-07）；分块为字符制而非 token 制（H-07）；遗留的 pipeline.ts retrieveKnowledge 纯余弦旧路径与 hybrid.ts 并存（M-11）。三点分别在阶段 5、4、8 处理。"));

/* ── 4 提取流水线现状 ── */
body.push(h1("4  提取流水线现状"));
body.push(h2("4.1  题库 AI 提取（extract 路由）"));
body.push(para("POST /api/questions/import/extract 是一条重工程的后台任务管线，与 deep-agent 完全无关（这是审计明确的一个事实：导入提取与从主题生成题目是两条独立流水线）。鉴权经 resolveUserId（登录或共享访客，见 S-02）。输入双形态：multipart 文件直传（上限 15MB，服务端解析）或 JSON 文本（上限 150 万字符，另可携带至多 24 张 / 12MB 图片）。任务行落库后 fire-and-continue，GET 轮询，DELETE 取消；全服务器并发上限 1 个运行中任务，僵尸判定 45 分钟，任务保留 24 小时。"));
body.push(para("文本链路：服务端按扩展名解析（PDF 用 unpdf 并雕取内嵌 JPEG；DOCX 用 mammoth；PPTX 用 jszip 解 OOXML；TXT/MD/CSV 直读；图片走 VLM）→ 以估计题数（约 20 题/片）反推目标 6,500 字符切块 → 3 个 worker 并行调 callChat（70 秒超时、16k 输出、温度 0.1），连续 2 次失败熔断转 ZAI SDK（5 次重试、6 秒基数退避、自适应闸门 2 并发）→ stripFences 加 jsonrepair 双保险解析 → 手写归一化（答案别名、字母答案映射为选项全文、难度白名单、imageUrl 仅接受导入目录前缀）→ 全文去重 → 按序落库。截断或产量低于估计 75% 时对半重抽（深度 2）。"));
body.push(para("可靠性机制密集：每 pass 上限 20 分钟、最多 6 pass，429 中途暂停保持 processing 状态；逐 chunk 结果即时写库（chunkResults）形成事实上的检查点；心跳 30 秒；快速恢复窗口 90 秒；客户端以 localStorage（24 小时）与 sessionStorage（1 小时）双键实现重载自动恢复。结算诚实（droppedChunks 计数、检出多于 AI 找到时的提示）。需要正视的缺陷是 maxQuestions 参数因作用域 bug 永不生效（恒为默认 2,000），且该文件没有测试（S-05、S-06）。"));
body.push(h2("4.2  媒体摄取（ingest-media 与 audio-pipeline）"));
body.push(para("音频：ffmpeg 响度归一化（-16 LUFS）转 16kHz 单声道 WAV → silencedetect VAD 切分（段上限 28 秒、至多 180 段，约 60-84 分钟）→ ZAI ASR 为主、OpenAI 兼容 whisper 兜底（3 次重试、429 随机 9-12 秒退避、批 3 并发）→ 句级时间戳（块内插值）→ 确定性分段 → LLM 洞察（失败退化为 TF 关键词）。原件保留于 upload/audio-store（上限 200MB），Range 播放端点属主门禁。"));
body.push(para("视频：一个重要的正面发现——视频并非只走音轨。extractVideoContent 已实现 ffprobe 时长探测、音轨 ASR、均匀帧采样（6 至 12 帧，按时长自适应）、每帧 ffmpeg 定点截图（scale 960）、[mm:ss] 时间戳前缀的 VLM OCR 描述，合并为口语内容加屏幕视觉两段式文档，meta 标记 asr+vlm-frames。另有面向出题代理的 analyzeVideoForQuestions（至多 10 帧）与 YouTube 下载策略（按时长限 480p/240p、150MB 上限、无视频流时音频兜底）。这意味着阶段 3 的工作是升级（场景切分、时间戳一等公民、进入题库链路）而非从零建设。", { keepNext: true }));
body.push(para("图片：VLM OCR 经 describeImage（glm-4.5v 候选链、网关限流退避），HEIC/TIFF 经 ffmpeg 转 JPEG。文件保留策略：image/video/PDF 保留原件，document 类不保留（重建索引时依赖存储文本，超限则提示重传）。"));
body.push(h2("4.3  客户端与服务端双实现"));
body.push(para("file-extract.ts（浏览器）与 server-file-extract.ts（Node）接口形状刻意一致，但常量与规则已经漂移，且导入弹窗实际上已不再使用客户端解析（仅剩死导入）。两者分工现状：导入弹窗全部走服务端 multipart；AI 聊天附件与 Generate 页仍走客户端 pdfjs/mammoth。"));
body.push(tCaption("表 4-1  双实现漂移对照（节选）"));
body.push(makeTable(
  ["能力点", "客户端 file-extract.ts", "服务端 server-file-extract.ts"],
  [
    ["PPTX 每片图片数 / 单图上限", "3 / 1MB", "2 / 2MB"],
    ["DOCX 嵌入图片数", "20", "24"],
    ["PDF 图片来源", "整页 canvas 渲染（最多 24 页）", "雕取内嵌 JPEG（顺序编号，无真实页码）"],
    ["PDF 页标记", "有（--- Page N ---）", "无（mergePages 合并）→ 与 VLM 锚点错位（H-01）"],
    ["音频 / BMP", "支持（dataURL 附着）", "不支持（抛 Unsupported file type）"],
    ["超长文本", "静默截断至 150 万字符", "超限 413 拒绝"],
  ],
  [26, 37, 37], { zebra: true }
));
body.push(para("结论：服务端应成为唯一解析真源（浏览器 OOM 与 worker 版本问题正是当初服务端化的动因），客户端实现收窄为聊天附件的轻量角色，共享常量与归一化规则以单一模块收敛——这是阶段 1 的核心内容。", { after: 120 }));

/* ── 5 Agent 编排现状 ── */
body.push(h1("5  Agent 编排与 LangChain / LangGraph 使用现状"));
body.push(h2("5.1  深度出题代理（question-deep-agent.ts）"));
body.push(para("深度出题代理直接调用官方 deepagents 的 createDeepAgent：ChatOpenAI 模型（温度 0.3、4 次重试、无超时）+ question-author 子代理 + CompositeBackend（用户工作区与内部 /conversation_history 目录分离）+ 权限规则（禁写技能目录）+ DB 技能同步。编排器提示词动态拼接主题、弱项提示、grounding 上下文、媒体库规则与引用规则，核心约束是 save_question 是题目落库的唯一通道。工具全部以 DynamicStructuredTool 加 zod schema 定义，包括 save_question、search_knowledge_base（topK 5、返回 sourceId+chunkId 供引用）、analyze_library_image / analyze_library_video、search_medical_references、search_medical_images、render_lab_panel、generate_medical_illustration、generate_medical_audio、analyze_visual_material。"));
body.push(para("运行限制以墙钟为主：RUN_DEADLINE_MS 为 3 小时（但错误文案仍写 12 分钟，M-08），题目数上限 100（路由与工具双层钳制）。值得注意的缺口是：与聊天代理不同，出题代理没有挂任何中间件——无模型/工具调用上限、ChatOpenAI 无超时（H-04），跑飞只能靠墙钟与保存上限兜底。事件流为 async generator（status/plan/tool_start/tool_end/saved/done/error），有去重守卫，但取消或超时中断后仍会发出 done 事件（M-09）。"));
body.push(h2("5.2  聊天代理运行时（deep-agent-runtime.ts）"));
body.push(para("聊天侧的运行时明显更成熟：中间件栈包含 todo 规划、模型重试（2 次、指数退避）、模型调用上限 60、工具调用上限 160、工具错误封装、AGENTS.md 记忆注入，以及 QuickJS WASM 沙箱 eval 工具（内存 32MB、10 秒超时、64 次 ptc 调用上限、只读工具白名单，并套人工审批门）。流式恢复能力完整：ActiveRun 注册表 + 断线后 detached continuation + 4,000 帧环形事件缓冲（客户端以 requestId + from 重放错过帧）；HITL 审批以 DB 行 + 进程内总线实现（5 分钟超时自动拒绝）；后台任务走 AgentJob 持久队列（lease、maxAttempts、cancelRequested）。这批能力是第 8 章 LangGraph 图设计的直接参照系。"));
body.push(h2("5.3  LangChain 使用图谱"));
body.push(para("全库 LangChain 用法可以精确枚举：@langchain/core 用于约 35 个工具文件的 DynamicStructuredTool、消息类型、回调管理器，以及 AISdkLangGraphAdapter（继承 BaseChatModel，把 AI SDK 模型适配进 LangChain 生态）；@langchain/openai 的 ChatOpenAI 在 5 处实例化（聊天主模型 180 秒超时、寒暄快路径 60 秒、出题模型无超时、线程标题、快模型路由）；@langchain/quickjs 仅 1 处（沙箱 eval 中间件）；peer 包 langchain 提供 6 个中间件。zod 是全部工具入参的统一校验层。"));
body.push(h2("5.4  LangGraph：现状与既有地基"));
body.push(para([["关键事实：src 中没有任何 @langchain/langgraph 或 langgraph 的直接 import。", { bold: true }], ["orchestration/stateless-generate.ts 的头注释明宣 MedQ 不使用 LangGraph，director-graph.ts 手写了一套镜像 LangGraph 语义的状态机作为替代。但与此同时：node_modules 中 @langchain/langgraph 1.5.3、langgraph-checkpoint、langgraph-sdk 三件套已经随 deepagents 1.15.1 安装就位（deepagents 本身就构建在 LangGraph 之上——createDeepAgent 返回的正是编译后的 LangGraph 图）；Prisma 中 LgCheckpoint / LgWrite 两张表形状与官方检查点存储一致且完全未使用。因此集成的本质不是引入新框架，而是把已经在跑的隐式依赖显式化，并补上持久化检查点这一块。"]]));

/* ── 6 安全现状 ── */
body.push(h1("6  安全现状"));
body.push(h2("6.1  已有防护"));
body.push(para("代码中存在两套独立的 SSRF 防护实现：ssrf-guard.ts（validateUrlForSSRF，IPv4 私网段全表、IPv6 ULA/链路本地/站点本地、6to4 与 Teredo 隧道解包、DNS 全记录校验）供模型解析与生成路由使用；web-fetch.ts 的 assertPublicUrl（私网主机名集合、CGNAT 100.64/10、逐跳重定向重校验、2MB 上限、20 秒超时）供网页抓取使用。文件安全方面：魔数嗅探、路径清洗、下载文件名控制字符过滤、属主门禁（findFirst where id+userId）、Drive OAuth state cookie、bcrypt 密码、Auth.js v5 会话。这些构件质量不低，问题在于覆盖面与调用纪律。"));
body.push(h2("6.2  主要缺口"));
body.push(para("缺口集中在四条链路：URL 摄取的直连下载与重定向跟随完全绕过两套 SSRF 防护（S-01）；知识库全部端点经 resolveUserId 回退到全局共享访客账户，匿名者之间互相可见、可下载、可删除（S-02）；getAuthenticatedUserId 在无会话时直接采信 x-user-id 请求头，影响 60 余个路由（S-03）；匿名 Drive OAuth 授权会绑定到共享访客（S-04）。此外 CSRF 工具零调用、安全头未配置、限流仅覆盖 4 个端点、BYOK 的 SSRF 校验仅生产生效（M-12）。middleware.ts 只做预览代理的主机归一化，不承担路由保护。详细修复方案在第 9 章阶段 10。"));

/* ── 7 弱点与技术债登记 ── */
body.push(h1("7  弱点与技术债登记"));
body.push(h2("7.1  总体分布"));
body.push(para("按第 1.2 节标准共登记 35 项：P0 级 7 项、P1 级 10 项、P2 级 12 项、P3 级 6 项。图 1 按领域与严重度展示分布——安全与提取流水线是 P0/P1 的主产区，Agent 编排以 P1/P2 工程质量项为主，RAG 检索的 P0 是唯一一项结构性问题（无索引）。"));
body.push(figure("chart-debt.png", 520));
body.push(figCaption("图 1  技术债与弱点登记分布（数据源：本章登记表 35 项）"));
body.push(h2("7.2  P0 严重（7 项）"));
body.push(para("P0 判定依据：可直接导致越权、数据外泄、功能契约失效，或已确认的运行时缺陷。建议全部纳入阶段 1 与阶段 10 的前置排期。", { keepNext: true }));
body.push(tCaption("表 7-1  P0 级弱点登记"));
body.push(makeTable(
  ["编号", "位置", "问题与影响"],
  [
    ["S-01", "url-source.ts L429-457；sources / retry 路由", "URL 摄取的探测与直连下载无任何私网检查（redirect: follow），服务器可被抓取内网与云元数据地址，响应体进入 RAG 库并可经源详情回显"],
    ["S-02", "auth-helpers.ts resolveUserId 回退", "知识库与提取任务回落到全局唯一访客账户，匿名用户之间互读、互删、下载医疗原件；全局单并发闸门事故的根因之一"],
    ["S-03", "auth-helpers.ts getAuthenticatedUserId", "无会话时直接采信任意 x-user-id 请求头（仅验证用户存在），60 余路由可被冒充"],
    ["S-04", "drive/connect + drive/callback", "匿名访客的 Google 账号连接绑定共享访客，随后任何匿名者可列出并导入该账号的私有 Drive 文件"],
    ["S-05", "extract/route.ts L1705 / L1748-1751", "maxQuestions 参数作用域越界引用，两条输入路径均读不到，恒为默认 2,000；本应是 TS 编译错误，被 ignoreBuildErrors 掩盖"],
    ["S-06", "next.config.ts + src/ 测试空缺", "ignoreBuildErrors: true 与核心模块（提取、检索、代理）零单测叠加，类型错误与回归无任何防线；已放行至少一个真实运行时缺陷（S-05 即实例）"],
    ["S-07", "hybrid.ts loadCandidates", "无向量索引：每次检索全量加载至多 4,000 chunk 到内存做余弦与 BM25；语料超限被静默截断，延迟随库线性增长，扩展性硬顶"],
  ],
  [8, 30, 62], { zebra: true }
));
body.push(h2("7.3  P1 高（10 项）"));
body.push(tCaption("表 7-2  P1 级弱点登记"));
body.push(makeTable(
  ["编号", "位置", "问题与影响"],
  [
    ["H-01", "server-file-extract.ts L169-172 与 route L1299", "服务端 PDF 图注按雕取顺序编号且无页标记，VLM 内联锚点查找 --- Page N --- 永远落空，图片归因机制实际仅对 PPTX 生效"],
    ["H-02", "file-extract.ts 与 server-file-extract.ts", "双实现漂移：每片图片 3 对 2、单图 1MB 对 2MB、DOCX 图 20 对 24、归一化规则不同且 modal 内又复制两份——同一输入两端结果不同"],
    ["H-03", "server-file-extract.ts L219", "服务端不支持音频与 BMP（客户端支持），拖拽导入直接 400"],
    ["H-04", "question-deep-agent.ts L845-852 / L934-953", "出题代理 ChatOpenAI 无超时、无调用上限中间件；请求挂死时 3 小时墙钟才兜底"],
    ["H-05", "qda / runtime / config.ts 三处", "模型解析链三份独立实现，行为已漂移（zai 分支条件不一致）"],
    ["H-06", "question-agent.ts L2347 对 route L165", "内部钳制 5 题对路由钳制 100 题：用户请求 20 题静默只得 5 题且无提示"],
    ["H-07", "text-quality.ts DEFAULT_CHUNK_SIZE=900", "字符制分块与目标 token 制（500-800）不一致；中文与英文、术语密集与叙述文本的有效信息密度差异未被建模"],
    ["H-08", "ingest-media.ts 视频路径", "时间戳只存在于文本前缀与 metaJson，非一等公民；无场景切分；帧上限 12；引用与播放器跳转无法承载"],
    ["H-09", "extract 路由", "题库提取链路不接受视频文件（仅知识库摄取支持），讲课视频无法直接出题"],
    ["H-10", "extract/route.ts saveImportedImage", "导入图片落盘 public/generated/agent/imported/ 后无生命周期管理，删除任务只删 DB 行，磁盘孤儿只增不减"],
  ],
  [8, 30, 62], { zebra: true }
));
body.push(h2("7.4  P2 中（12 项）"));
body.push(tCaption("表 7-3  P2 级弱点登记"));
body.push(makeTable(
  ["编号", "位置", "问题与影响"],
  [
    ["M-01", "extract/route.ts L1194-1212", "VLM 时间预算检查块原样重复两遍，第二块为死代码"],
    ["M-02", "extract/route.ts L459 / L476", "FreeLLM 视觉模型链与 max_tokens=1800 硬编码（文本链为 8,000），密集医学图版逐字 OCR 有截断风险"],
    ["M-03", "extract/route.ts L1131 对 L1222", "心跳与 VLM 进度同写 progressDone 列且语义不同，UI 进度条会被心跳瞬时打回 0"],
    ["M-04", "extract/route.ts L1503", "rateLimitedPasses 实为当前 pass 序号，与注释声明的连续限流 pass 语义不符，提前判死任务"],
    ["M-05", "ImportQuestionsModal sessionStorage", "12MB 图片载荷对典型 5MB 配额必然写失败且静默忽略，重载恢复机制对图片文件实际失效"],
    ["M-06", "qda / runtime", "600 行与 287 行巨型函数、7 处裸 catch 静默吞异常（引用验证失败不可观测）、多处 as never 类型逃逸"],
    ["M-07", "deep-agent-tools.ts 对 tools/memory.ts", "createMemoryTools 同名五工具两套平行实现"],
    ["M-08", "qda L823 对 L999", "RUN_DEADLINE_MS 为 3 小时，错误文案写 12 分钟"],
    ["M-09", "qda L1111", "deadline 或取消中断后仍 yield done 事件，客户端收到 error+done 双终止"],
    ["M-10", "pipeline.ts enrichChunksWithContext", "上下文增强上限 120 块，超出部分静默降级为标题模板，长文档增强覆盖率无提示"],
    ["M-11", "pipeline.ts retrieveKnowledge", "遗留纯余弦旧检索与 hybrid.ts 并存，两个入口行为不一致"],
    ["M-12", "多处", "BYOK SSRF 仅生产校验；csrf.ts 零调用；限流仅 4 端点；next.config 无 CSP/HSTS/XFO/Referrer-Policy 安全头"],
  ],
  [8, 30, 62], { zebra: true }
));
body.push(h2("7.5  P3 低（6 项）"));
body.push(tCaption("表 7-4  P3 级弱点登记"));
body.push(makeTable(
  ["编号", "位置", "问题与影响"],
  [
    ["L-01", "knowledge/semantic-chunking.ts", "549 行嵌入引导分段模块零导入（死代码），但正是阶段 4 的候选技术"],
    ["L-02", "schema.prisma Role 枚举", "唯一枚举未被任何模型引用"],
    ["L-03", "多处", "RESUME_AFTER_MS 死常量、subagentNameFromArgs 双份复制、版本注释漂移（1.13.4 对 1.15.1）"],
    ["L-04", "KnowledgeChunk.embeddingModel", "检索分组键无索引"],
    ["L-05", "audio-store / file-store", "保留文件无 TTL 与容量治理；进程被杀时 os.tmpdir 下 medq-ingest-* 残留用户媒体副本且无启动清扫"],
    ["L-06", "google-drive.ts L251；.doc 处理", "Drive 查询反斜杠未转义；.doc 交给 mammoth（仅支持 OOXML）以底层解析错误失败而非引导转存"],
  ],
  [8, 30, 62], { zebra: true }
));
body.push(h2("7.6  模式归纳"));
body.push(para("35 项登记呈现三个系统性模式，修复时应连根处理而非逐条打补丁。其一是镜像双实现：客户端/服务端提取、双检索入口、双 memory 工具、三份模型解析链，同一逻辑多处演化导致漂移——需要单一真源模块收敛。其二是 best-effort 吞异常：大量裸 catch 让引用验证、增强、进度上报的失败完全不可观测——需要在阶段 7 引入图级遥测后统一观测面。其三是 ignoreBuildErrors 掩盖类型错误：S-05 这类本应编译期暴露的缺陷能进入运行时——阶段 1 应建立提取域的针对性 tsc 检查门槛。"));

/* ── 8 LangGraph.js 集成方案 ── */
body.push(h1("8  LangGraph.js 集成方案"));
body.push(h2("8.1  目标与硬约束"));
body.push(para("集成目标：以 LangGraph.js 显式编排摄取、提取与出题三条长任务管线，获得检查点持久化、中断恢复、人机协同中断与图级遥测四项能力，同时保持 LangChain.js 工具生态与 deepagents 代理不动摇。硬约束逐条落实如下：不重建应用——三张图全部封装现有函数（parseFile、retrieveKnowledgeHybrid、callChat、save_question 等），图只是编排层；不引入 Python/FastAPI——全 TypeScript；保留 Next.js、LangChain.js、现有 PostgreSQL 与现有向量存储语义（pgvector 评估独立放在阶段 5，不由本阶段夹带）；SSRF 防护与禁止任意 SQL 的约束延续到所有新工具。"));
body.push(h2("8.2  既有资产盘点"));
body.push(para("下表汇总可复用资产。核心结论：@langchain/langgraph 1.5.3 已在依赖树中（deepagents 传递依赖），显式声明直接依赖不会新增任何安装体积；LgCheckpoint / LgWrite 表已预置，检查点保存器只需实现映射而非设计存储。"));
body.push(tCaption("表 8-1  LangGraph 集成可复用资产"));
body.push(makeTable(
  ["资产", "现状", "复用方式"],
  [
    ["@langchain/langgraph 1.5.3 + checkpoint + sdk", "已随 deepagents 安装，零直接 import", "package.json 显式声明并锁定同版本"],
    ["LgCheckpoint / LgWrite 模型", "schema 已定义，无使用方", "实现 PrismaCheckpointer（BaseCheckpointSaver 子类）"],
    ["AgentThread / AgentRun / AgentToolExecution", "聊天运行时在用", "图的运行与工具遥测沿用既有模型"],
    ["approvals 服务（5 分钟超时）", "同步等待在工具内部", "迁移为 interrupt() 原生中断，审批后 resume"],
    ["AgentJob 持久队列（lease / attempts）", "后台任务在用", "长图运行的触发器与外部取消通道"],
    ["RunEventBuffer（4,000 帧）", "聊天 SSE 续传在用", "图事件流的断线重放层保持不变"],
    ["ImportExtraction.chunkResults", "提取任务手动检查点", "阶段 7 迁移后由 checkpointer 托管，表保留兼容"],
  ],
  [30, 32, 38], { zebra: true }
));
body.push(h2("8.3  目标图设计"));
body.push(para([["摄取图 IngestionGraph。", { bold: true }], ["节点序列：parse →（媒体条件分支：asr 与 vlm 并行）→ chunk → enrich → embed → persist；状态为 { sourceId, stage, parsed, chunks, embeddings, errors }，以 zod 推导类型。检查点按阶段落 LgCheckpoint，服务重启后从最近检查点恢复摄取（取代 metaJson.progress 轮询与失败重跑全流程的现状；UI 进度仍回写 metaJson 保持兼容）。该图风险最低、收益直观，作为第一个落地图。"]]));
body.push(para([["提取编排图 ExtractGraph。", { bold: true }], ["节点序列：vlmScan → planChunks → extract（扇出并行，每 chunk 一个超节点）→ validate → settle；现有 route.ts 中手写的 pass / chunk / 断点恢复状态机整体搬迁为图结构，chunkResults 改由 checkpointer 的 writes 托管（保留列兼容旧任务）。这是痛点最大的迁移：1,989 行单文件借此拆分为图定义、节点实现与 HTTP 壳三层。"]]));
body.push(para([["出题图 GenerationGraph。", { bold: true }], ["节点序列：plan → research（searchKnowledge）→ author（deepagents 子图节点）→ verify（引用三层验证）→ save → finalize；HITL 审批与用户取消建模为 interrupt()；RUN_DEADLINE 检查移至图级超步监控。deepagents 的 createDeepAgent 返回值本身是编译后的 LangGraph 图，直接作为子图节点挂接，不 fork、不重写。3 小时长跑跨沙箱重启后可从检查点续跑——这是当前架构做不到的。"]]));
body.push(para([["PrismaCheckpointer。", { bold: true }], ["实现 BaseCheckpointSaver 接口（put / getTuple / list / getNextVersion / putWrites / delete），序列化用 langgraph-checkpoint 官方 serde，threadId 映射 AgentThread 或 jobId。LgCheckpoint.checkpoint 列为 Text（base64 载荷），长转写等大对象不应进状态——状态里存引用 ID，正文留在 KnowledgeDocument，防止检查点膨胀。"]]));
body.push(h2("8.4  迁移策略（绞杀者模式）"));
body.push(para("迁移按风险递增三步走，每步保留特性开关可回退旧路径。第一步落摄取图（验证 checkpointer 与图运行时的正确性）；第二步迁移提取路由（收益最大的重构，同步完成 S-05 修复与文件拆分）；第三步迁移出题图（接入 interrupt 审批与断点续跑）。聊天 v2 运行时本期不迁移——它工作良好且已有中间件栈与 SSE 续传，强行图化收益不抵风险，仅将其 director-graph 手写状态机标记为后续候选。每步的验收标准见第 9 章对应阶段。"));
body.push(para("新增代码资产集中在 src/lib/graph/ 目录：checkpointer.ts（保存器）、ingestion.ts、extraction.ts、generation.ts（三张图定义）、nodes/（节点实现，全部为现有函数的薄包装）、以及 graph-telemetry.ts（把图级事件桥接到 AgentToolExecution 遥测）。"));

/* ── 9 12 阶段实施路线图 ── */
body.push(h1("9  12 阶段实施路线图"));
body.push(h2("9.1  总览与工作量"));
body.push(para("路线图遵循既定的十二阶段框架，顺序上先固化提取地基（阶段 1-2），再攻多模态关键路径（阶段 3），随后沿数据链路自上游向下游推进（分块 → 索引 → 检索 → 编排 → 工具 → 引用），安全、测试与迁移作为横向阶段收尾。每阶段给出目标、关键改动与验收标准；工作量为单人全职基准的相对估算，供排期参考而非承诺。"));
body.push(figure("chart-effort.png", 520));
body.push(figCaption("图 2  12 阶段相对工作量（合计约 69 人日；阶段 3 与阶段 7 为关键路径）"));
body.push(tCaption("表 9-1  路线图汇总"));
body.push(makeTable(
  ["阶段", "主题", "关键交付", "人日", "依赖"],
  [
    ["1", "提取架构统一与 P0 修复", "maxQuestions 修复、共享解析模块、PDF 页标记、最小测试", "5", "—"],
    ["2", "文档解析增强", "解析器注册表、四格式金样本对拍", "6", "1"],
    ["3", "多模态摄取（视频，关键）", "场景切分、时间戳一等公民、视频进题库链路", "10", "1"],
    ["4", "结构感知分块", "token 制 500-800 / 80-120、headingPath", "4", "1"],
    ["5", "嵌入与索引", "索引路线 spike 与落地、双写迁移", "6", "4"],
    ["6", "混合 RAG 与重排升级", "检索 20-30、重排 5-8、质量看板", "5", "5"],
    ["7", "LangGraph.js 编排（关键）", "PrismaCheckpointer、三张图迁移", "8", "1"],
    ["8", "Agent 工具层", "searchKnowledge/searchVideo/querySpreadsheet", "5", "6, 7"],
    ["9", "引用导航", "locator 数据模型与 UI 定位联动", "4", "3, 8"],
    ["10", "安全加固", "S-01 至 S-04 修复、限流与安全头", "6", "—"],
    ["11", "测试与评估", "单测、检索评估集、提取保真度对拍", "6", "1-8"],
    ["12", "数据迁移与上线", "全量 reindex、监控、运维文档", "4", "5, 11"],
  ],
  [8, 24, 42, 8, 18], { zebra: true }
));
body.push(h2("9.2  阶段 1：提取架构统一与 P0 修复"));
body.push(para([["目标：", { bold: true }], ["让服务端提取成为唯一真源，消除已确认的运行时缺陷，建立最小测试防线。关键改动：修复 maxQuestions 作用域 bug 并对提取域建立针对性 tsc 检查门槛（在 ignoreBuildErrors 全局关闭前先局部兜底）；新建共享常量与归一化模块收敛双实现（图片配额、大小上限、归一化规则单一来源）；unpdf 改逐页提取注入页标记，图注使用真实页码，打通 VLM 锚点归因（修复 H-01）；服务端补音频与 BMP 支持（修复 H-03）；删除重复代码块与死导入（M-01 及弹窗死导入）；为 chunkText、normalizeQuestion、parseQuestionsJson 三个纯函数补单测。验收：tsc 零错误；PDF 图片归因端到端命中；三类文档（PDF/DOCX/PPTX）对拍不回归。"]]));
body.push(h2("9.3  阶段 2：文档解析增强（PDF / Word / PPT / Excel）"));
body.push(para([["目标：", { bold: true }], ["把四类主流格式的解析提升到结构保真水平。关键改动：建立 src/lib/extract-parsers/ 插件注册表（每格式一个模块，统一输入输出契约）；DOCX 表格与样式经 mammoth HTML 输出转结构化文本（表格保留行列语义而非拍平）；PPTX 补母版文本与讲者备注完整率校验；XLSX 支持多 sheet、公式结果值与合并单元格（exceljs 服务端统一，为阶段 8 的 querySpreadsheet 打基础）；.doc 与 .ppt 给出引导性转存错误；EPUB 章节结构化。验收：每格式建立金样本，解析输出字段完整率与文本保真度对拍达标；解析器注册表单测覆盖分发逻辑。"]]));
body.push(h2("9.4  阶段 3：多模态摄取——视频为关键优先级"));
body.push(para([["目标：", { bold: true }], ["把视频从能转写升级为可检索、可引用、可直接出题的一等资产。关键改动：帧采样升级——FFmpeg 场景切分检测加关键帧提取，帧数按时长与场景密度自适应（12 帧上限提至 24），幻灯片类视频优先取静止帧；多模态对齐——ASR 句级时间戳与帧 VLM 描述按时间轴交错合并，生成统一的时间锚定文档；时间戳一等公民——KnowledgeChunk 增加 mediaTimeSec 区间元数据（schema 演进加列，旧数据回填空值），检索结果与引用对象透传时间区间；提取链路开放视频——extract 路由接受 mp4/mov/webm（走音轨 ASR 加帧描述，再进既有文本出题管线）；图片 VLM 保持 FreeLLM 优先链并解锁 max_tokens 硬编码为按图自适应（M-02）；音频说话人分离做 provider 评估（可选，不阻塞）。验收：20 分钟讲课视频全链路——摄取、检索、出题、引用含 mm:ss 定位——一次跑通；时间戳引用在 UI 可跳转播放。"]]));
body.push(h2("9.5  阶段 4：结构感知分块"));
body.push(para([["目标：", { bold: true }], ["分块从字符制迁移到 token 制并携带结构元数据。关键改动：分块目标改为 500-800 token、重叠 80-120 token（先按 4 字符每 token 校准中英文，再引入轻量 tokenizer 精确化）；边界感知升级——标题层级、列表项、表格行不被跨块切断，每块携带 headingPath 元数据；对 semantic-chunking.ts 做去留决策（作为可选的嵌入引导分段增强激活，或删除，二选一不留悬置）；重建索引工具提供预览模式（先 dry-run 展示分块效果再落库）。验收：金样本分块无跨语义边界切断；token 分布直方图 90% 以上落入目标区间；检索评估集（阶段 11 建立，此处先用小样本）召回不低于现基线。"]]));
body.push(h2("9.6  阶段 5：嵌入与索引"));
body.push(para([["目标：", { bold: true }], ["解除 4,000 chunk 检索上限与线性延迟。关键改动：先做 0.5 天索引路线 spike——路线 A 为 pgvector（需验证嵌入式 PostgreSQL 的扩展可用性与 .pg-embed 集成成本），路线 B 为应用层 ANN（hnswlib-node 内存索引加 Bytes 持久化，兼容现有列，不触碰现有数据库引擎语义）；以 spike 结论定路线后落地，保持 embeddingModel 分组与 provider 抽象不变；补 embeddingModel 索引（L-04）；新数据双写、存量分批回填；统一 embedder 版本管理策略。验收：1 万 chunk 检索 P95 延迟低于 300 毫秒；召回率不低于回填前基线；回填过程可中断续跑。"]]));
body.push(h2("9.7  阶段 6：混合 RAG 与重排升级"));
body.push(para([["目标：", { bold: true }], ["把检索参数对齐规划目标并让检索质量可度量。关键改动：候选池随索引化解除上限；topK 放宽至 20-30（schema 与 clamp 同步调整）；重排从固定 24 全量打分改为分数阈值保留 5-8 块；评估本地 cross-encoder 重排（bge-reranker via transformers.js，以 4GB 内存约束为硬边界，超限则维持 LLM 列表式重排）；RagQueryLog 升级为检索质量看板（利用既有诊断字段：dense/bm25/rerank 各阶段分数与延迟）。验收：评估集 nDCG@10 较基线提升 10% 以上或持平且延迟达标；看板可按用户与时间段下钻。"]]));
body.push(h2("9.8  阶段 7：LangGraph.js 编排（关键路径）"));
body.push(para([["目标：", { bold: true }], ["按第 8 章方案落地。关键改动：package.json 显式声明 @langchain/langgraph 并锁定 1.5.3（与 deepagents 同源，零新增安装）；实现 PrismaCheckpointer（LgCheckpoint / LgWrite 映射，含大对象防膨胀约定）；摄取图先行（验证保存器与恢复语义）；提取路由图化迁移（同步拆分 1,989 行文件为图定义、节点、HTTP 壳三层，chunkResults 交接给 checkpointer 托管并保留兼容读取）；出题图迁移（plan → research → author → verify → save，HITL 接 interrupt，deepagents 子图直挂）；图级遥测桥接 AgentToolExecution。验收：摄取与提取任务在进程被杀重启后自动从检查点续跑；出题任务完成一次跨重启续跑演示；三张图均有特性开关可回退。"]]));
body.push(h2("9.9  阶段 8：Agent 工具层"));
body.push(para([["目标：", { bold: true }], ["统一并扩展代理工具，全部以 zod schema 校验。关键改动：searchKnowledge 合并现有 search_knowledge 与 search_knowledge_base 双工具为单一实现（保留两种返回形态：聊天用 [K#] 引用、生成用 sourceId+chunkId）；新增 searchVideo——按查询与时间区间检索视频片段（输入 schema：query、可选 minSec/maxSec/sourceId，返回带时间戳的片段与帧描述）；新增 querySpreadsheet——对 XLSX 源做声明式结构查询（sheet 选择、列过滤、行聚合白名单），显式禁止任意公式与任意 SQL，输入输出全量 zod 校验；合并双 memory 工具实现（M-07）；工具注册表与 LangGraph ToolNode 语义对齐。验收：三个新工具在聊天与出题双运行时可调用；querySpreadsheet 的 DSL 无越权面（评审确认）。"]]));
body.push(h2("9.10  阶段 9：引用导航"));
body.push(para([["目标：", { bold: true }], ["让每条引用可一键定位原文。关键改动：引用对象扩展 locator 结构（pdfPage、mediaTimeSec、charOffset，由摄取与分块阶段写入的元数据透传）；UI 联动——PDF 引用翻页定位、视频引用 seek 播放、文本引用滚动高亮；[K#] hover 卡片（解析逻辑已有）扩展 locator 动作按钮；引用验证分数（judge 分与覆盖率）暴露到题目详情页供教育者审核。验收：从题目卡点引用直达原文位置（三种媒介各演示一次）；locator 缺失时优雅降级为现有标题级引用。"]]));
body.push(h2("9.11  阶段 10：安全加固"));
body.push(para([["目标：", { bold: true }], ["消除第 6 章四条高危链路并补齐横向防护。关键改动：url-source 全链路接入 validateUrlForSSRF 加逐跳重定向重校验（复用 web-fetch 的 manual-redirect 模式，修复 S-01）；访客策略产品决策后实施——候选方案为设备级 cookie 隔离或强制会话（游客只读），修复 S-02 与 S-04；移除 x-user-id 头兜底，60 余路由分批迁移到会话鉴权（S-03，工作量最大的一项，可跨阶段分批）；BYOK SSRF 去掉生产门槛；摄取端点限流；next.config 配置 CSP / HSTS / X-Frame-Options / Referrer-Policy；保留文件 TTL 与孤儿图片清理任务、启动期 tmp 清扫。验收：内部 SSRF 渗透用例全部拒绝；游客路径行为符合产品决策；安全头经扫描工具核验。"]]));
body.push(h2("9.12  阶段 11：测试与评估"));
body.push(para([["目标：", { bold: true }], ["为核心链路建立可持续的质量防线与量化基线。关键改动：把 freellmapi 的 vitest 模式引入 src/，单测覆盖解析、分块、归一化、RRF 融合、重排解析等纯函数（多数在阶段 1 已起步，此处系统化）；建立检索评估集——金标查询加 RagQueryLog 回放，度量精确率、召回率、nDCG；建立提取保真度基准——金样本文档对拍提取题数与字段完整率；端到端冒烟脚本覆盖演示账号（student / admin / educator）的关键路径；新代码行覆盖率门槛 60%。验收：评估集基线报告产出并在阶段 6 / 12 复用；冒烟脚本可在 10 分钟内跑完。"]]));
body.push(h2("9.13  阶段 12：数据迁移与上线"));
body.push(para([["目标：", { bold: true }], ["把新管线推到全量数据并稳定运行。关键改动：全量源重建索引（分批、低峰、可中断，直接复用阶段 7 摄取图的检查点能力）；旧嵌入兼容读取（embeddingModel 分组机制天然支持新旧并存，回填完成前不切换默认检索路径）；监控接入——摄取成功率、检索延迟分布、提取 droppedChunks、图检查点恢复次数等关键指标基于 pino 日志聚合；更新运维手册（含沙箱恢复流程与构建约束备忘）。验收：全量源重建索引完成且检索质量回归不降；监控看板上线；运维手册评审通过。"]]));

/* ── 10 风险评估与缓解 ── */
body.push(h1("10  风险评估与缓解"));
body.push(para("路线图的主要风险及缓解措施汇总如下表。总体而言风险可控：最重的两项（内存约束与无测试网改造）都有明确的工程化缓解路径，且阶段 1 已把最小防线前置。"));
body.push(tCaption("表 10-1  风险登记与缓解"));
body.push(makeTable(
  ["编号", "风险", "缓解措施"],
  [
    ["R1", "4GB 内存与 9-14 分钟构建时长限制下，大改动迭代慢且易 OOM", "分小 PR（每阶段 2-4 个）；LangGraph 零新增安装；构建前 lint 与针对性 tsc 预检，避免整轮构建因类型错误报废"],
    ["R2", "重建索引期间检索质量波动（分块与嵌入变化）", "embeddingModel 分组保证新旧并存；评估集守门；重建索引提供预览模式；默认检索路径在回填完成前不切换"],
    ["R3", "pgvector 与嵌入式 PostgreSQL 兼容性不确定（扩展安装受限）", "阶段 5 先做 0.5 天 spike 再定路线；应用层 ANN 为备选，不触碰数据库引擎语义"],
    ["R4", "安全修复（废访客、移除 x-user-id）影响游客与演示体验", "阶段 10 前置产品决策；设备级 cookie 隔离作为兼容方案；x-user-id 迁移分批进行可回退"],
    ["R5", "核心提取与生成路径在无测试网下大改回归", "阶段 1 前置纯函数单测；每阶段强制验收标准；图迁移全部带特性开关可回退旧路径"],
    ["R6", "3 小时长任务遭遇沙箱回收前功尽弃", "PrismaCheckpointer 持久化检查点 + AgentJob 队列既有恢复通道；运维手册固化恢复步骤"],
    ["R7", "deepagents / langgraph / langchain peer 依赖版本冲突", "直接依赖锁定与 deepagents 同源的 1.5.3；任何升级需 lockfile 审计与构建冒烟"],
    ["R8", "ffmpeg / yt-dlp 系统依赖在目标部署环境缺失", "部署清单显式列出；启动自检降级（音频兜底模式已有先例）；能力探测结果进监控"],
  ],
  [8, 40, 52], { zebra: true }
));

/* ── 11 结论与批准请求 ── */
body.push(h1("11  结论与批准请求"));
body.push(para("审计结论有三点。第一，MedQ 的地基值得加码而非重写：任务状态机、混合检索、引用三层验证、deepagents 自治代理与降级设计都已达产线水准，路线图全部建设都建立在对既有函数的编排与升级之上，符合不重建应用的硬约束。第二，35 项登记弱点中 7 项 P0 需要立即排期——其中安全四项（S-01 至 S-04）在多用户场景下是真实的数据暴露面，maxQuestions 缺陷（S-05）是已实证的契约失真，零测试防线（S-06）与无索引（S-07）决定了后续所有改造的风险下限。第三，LangGraph.js 集成的边际成本远低于常规预期：依赖已就位、检查点表已预置、参照系（聊天运行时的中间件、HITL、SSE 续传）已在库内成熟运行。"));
body.push(para("提请批准以下五项事项。批准后我将严格按路线图顺序动工，每阶段以验收标准收口并汇报。"));
body.push(li([["批准 12 阶段路线图整体（或指出裁剪与调整）；", { bold: true }]], "req-approval"));
body.push(li([["批准阶段 1 立即启动（含 maxQuestions 修复、双实现收敛与最小测试防线）；", { bold: true }]], "req-approval"));
body.push(li([["批准阶段 3 视频方案的技术选型（场景切分策略与 mediaTimeSec 时间戳数据模型）；", { bold: true }]], "req-approval"));
body.push(li([["批准阶段 5 索引路线的 0.5 天 spike 授权（pgvector 对应用层 ANN 二选一）；", { bold: true }]], "req-approval"));
body.push(li([["批准阶段 10 访客策略的产品决策（设备级隔离或强制会话/游客只读）。", { bold: true }]], "req-approval"));
body.push(para("本报告为纯审计交付物，全程未修改任何代码。等待上述批准后进入实施。", { after: 160 }));

/* ── 附录 A ── */
body.push(h1("附录 A  审计覆盖与未覆盖范围"));
body.push(para("除表 1-1 所列精读文件外，深度探查还覆盖：knowledge 目录其余模块（asr-provider、google-drive、process-url、url-source、semantic-chunking、text-quality）、agent 工具目录全部 35 个工具文件、安全模块（ssrf-guard、csrf、rate-limit、middleware）、auth 辅助层（auth-helpers、guest-user）、/api/knowledge 与 /api/questions 全部路由、以及 128 个 Prisma 模型的逐域梳理。", { keepNext: true }));
body.push(tCaption("表 A-1  覆盖情况摘要"));
body.push(makeTable(
  ["领域", "覆盖深度", "说明"],
  [
    ["知识库 / RAG / 提取 / Agent / 安全", "全文精读 + 交叉验证", "本报告结论的主要证据区"],
    ["Prisma schema（128 模型）", "全文梳理", "重点域逐字段，其余域逐模型清点"],
    ["API 路由面", "目录级清点 + 重点路由精读", "知识库 15 路由、题库 9 路由逐条核读"],
    ["freellmapi（vendored 路由器）", "边界级", "只审嵌入方式与配置链路，内部实现未展开"],
    ["UI 组件（除导入弹窗）", "未纳入", "与本次升级无直接关联"],
    ["社交 / 考试 / 商业化模块", "未纳入", "同上"],
  ],
  [34, 26, 40], { zebra: true }
));

/* ── 附录 B ── */
body.push(h1("附录 B  关键参数速查表"));
body.push(para("下表汇总审计中确认的关键参数当前值与路线图目标值，可作为实施阶段的对照基准。", { keepNext: true }));
body.push(tCaption("表 B-1  关键参数对照"));
body.push(makeTable(
  ["子系统", "参数", "当前值", "目标值（阶段）"],
  [
    ["分块", "块大小 / 重叠", "900 字符 / 150 字符", "500-800 token / 80-120 token（4）"],
    ["分块", "上下文增强上限", "120 块（40/批）", "解除上限并暴露降级提示（4）"],
    ["检索", "候选池 / topK 上限", "24（上限 40）/ 20", "池 30-50 / topK 20-30（6）"],
    ["检索", "候选加载上限", "4,000 chunk 内存扫描", "索引化解除（5）"],
    ["重排", "列表式打分候选 / 保留", "24 全量打分", "阈值保留 5-8 块（6）"],
    ["引用", "判定门限 / 每题上限", "judge≥7 且 coverage≥0.15 / 4 条", "维持，分数透出 UI（9）"],
    ["提取", "maxQuestions", "恒为 2,000（bug）", "参数生效，上限 5,000（1）"],
    ["提取", "VLM 时间预算 / 单图上限", "4 分钟 / 24 图", "预算可配置，密集图版自适应（3）"],
    ["视频", "帧采样", "均匀 6-12 帧，scale 960", "场景切分 + 关键帧，至多 24 帧（3）"],
    ["视频", "时间戳", "文本前缀 [mm:ss] + metaJson", "chunk 时间区间元数据一等公民（3）"],
    ["音频", "分段策略", "VAD，段 28 秒，至多 180 段", "维持；说话人分离可选评估（3）"],
    ["编排", "LangGraph", "零直接 import（传递依赖 1.5.3）", "直接依赖 + PrismaCheckpointer（7）"],
    ["编排", "长任务恢复", "chunkResults 手动检查点", "checkpointer 持久化（7）"],
  ],
  [12, 26, 30, 32], { zebra: true }
));

/* ═══════════════ 文档组装 ═══════════════ */
const coverConfig = {
  title: "MedQ 医学教育平台代码库审计报告",
  subtitle: "架构 · RAG 工作流 · 提取流水线 · LangGraph.js 集成方案 · 12 阶段路线图",
  englishLabel: "MEDQ CODEBASE ARCHITECTURE AUDIT",
  metaLines: [
    "审计角色：Principal AI Architect",
    "审计对象：MedQ Platform（Next.js 16 · Prisma 7 · PostgreSQL）",
    "审计方式：只读代码审计，未修改任何代码",
    "报告日期：2026 年 11 月 3 日",
    "文档状态：v1.0 · 待批准实施",
  ],
  footerLeft: "MedQ Platform · Internal",
  footerRight: "Confidential",
  palette: {
    bg: P.primary, titleColor: "FFFFFF", subtitleColor: "B9C8DC",
    metaColor: "D5E0EE", accent: P.accent, footerColor: "8A9BB5",
  },
};

function pageHeader() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: P.line, space: 4 } },
      spacing: { after: 0 },
      children: [new TextRun({ text: "MedQ 代码库审计报告", size: 18, color: "808080", font: { ascii: "Times New Roman", eastAsia: "SimSun" } })],
    })],
  });
}
function pageNumFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080", font: { ascii: "Times New Roman" } })],
    })],
  });
}

/* 前置区（目录，罗马页码） */
const frontMatter = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 360 },
    children: [new TextRun({ text: "目  录", bold: true, size: 32, color: P.primary, font: { eastAsia: "SimHei", ascii: "Times New Roman" } })],
  }),
  new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
  new Paragraph({
    spacing: { before: 200 },
    children: [new TextRun({
      text: "注：本目录由域代码生成。文档编辑后如页码变化，请在目录上点击右键并选择更新域以刷新页码。",
      italics: true, size: 18, color: "888888", font: { ascii: "Times New Roman", eastAsia: "SimSun" },
    })],
  }),
];

const doc = new Document({
  creator: "Principal AI Architect",
  title: "MedQ 医学教育平台代码库审计报告",
  description: "只读代码审计：架构、RAG、提取流水线、LangGraph.js 集成方案与 12 阶段路线图",
  styles: {
    default: {
      document: {
        run: { font: { ascii: "Times New Roman", eastAsia: "SimSun" }, size: 24, color: "000000" },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: { ascii: "Times New Roman", eastAsia: "SimHei" }, size: 32, bold: true, color: P.primary },
        paragraph: { spacing: { before: 400, after: 180, line: 312 }, outlineLevel: 0 },
      },
      heading2: {
        run: { font: { ascii: "Times New Roman", eastAsia: "SimHei" }, size: 28, bold: true, color: P.primary },
        paragraph: { spacing: { before: 280, after: 140, line: 312 }, outlineLevel: 1 },
      },
      heading3: {
        run: { font: { ascii: "Times New Roman", eastAsia: "SimHei" }, size: 24, bold: true, color: P.primary },
        paragraph: { spacing: { before: 220, after: 110, line: 312 }, outlineLevel: 2 },
      },
    },
  },
  numbering: {
    config: [{
      reference: "req-approval",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  sections: [
    { /* 第 1 节：封面（边距 0，无页码） */
      properties: {
        page: { size: PG_SIZE, margin: { top: 0, bottom: 0, left: 0, right: 0 } },
      },
      children: buildCoverR1(coverConfig),
    },
    { /* 第 2 节：目录（罗马页码 i, ii） */
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          size: PG_SIZE, margin: PG_MARGIN,
          pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN },
        },
      },
      headers: { default: pageHeader() },
      footers: { default: pageNumFooter() },
      children: frontMatter,
    },
    { /* 第 3 节：正文（阿拉伯页码，从 1 起） */
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          size: PG_SIZE, margin: PG_MARGIN,
          pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
        },
      },
      headers: { default: pageHeader() },
      footers: { default: pageNumFooter() },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT_PATH, buf);
  console.log("written:", OUT_PATH, buf.length, "bytes");
}).catch((e) => { console.error(e); process.exit(1); });
