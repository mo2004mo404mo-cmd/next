// audit_page_check.mjs — 用 VLM 抽查审计报告关键页面渲染质量
import ZAI from '/tmp/my-project/node_modules/z-ai-web-dev-sdk/dist/index.js';
import fs from 'node:fs';

const PAGES = [
  ['page-01.jpg', '封面页：标题/副标题/元信息是否完整清晰，有无文字被裁切、重叠、超出页面'],
  ['page-02.jpg', '目录页：目录条目是否可见、层级是否清晰，有无乱码'],
  ['page-19.jpg', '内容页：表格是否列对齐、有无空列或文字溢出，中文是否正常渲染'],
  ['page-25.jpg', '图表页：图表是否完整显示、图例文字是否可读、有无截断'],
];

const dir = '/tmp/render';
const zai = await ZAI.create();

for (const [file, ask] of PAGES) {
  const b64 = fs.readFileSync(`${dir}/${file}`).toString('base64');
  const completion = await zai.chat.completions.createVision({
    model: 'glm-4.5v',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: `这是一页中文审计报告的截图。请检查：${ask}。请用中文简要回答（3 句以内），最后单独一行给出结论：PASS 或 FAIL。` },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  }).catch((e) => ({ error: e?.message || String(e) }));
  const text = completion?.choices?.[0]?.message?.content || `ERROR: ${completion?.error}`;
  console.log(`===== ${file} =====\n${String(text).slice(0, 500)}\n`);
}
