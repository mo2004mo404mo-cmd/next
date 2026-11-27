"use strict";
exports.id = 6807;
exports.ids = [5351,6807];
exports.modules = {

/***/ 6894:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fn: () => (/* binding */ buildPrompt)
/* harmony export */ });
/* unused harmony exports loadSnippet, processSnippets, processConditionalBlocks, loadPrompt, interpolateVariables */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(653165);
/**
 * Prompt Loader - Loads prompts from markdown files
 *
 * Supports:
 * - Loading prompts from templates/{promptId}/ directory
 * - Snippet inclusion via {{snippet:name}} syntax
 * - Conditional blocks via {{#if condition}}...{{/if}} syntax
 * - Variable interpolation via {{variable}} syntax
 */ 


const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('PromptLoader');
/**
 * Get the prompts directory path
 */ function getPromptsDir() {
    // MedQ uses the `@/*` → `./src/*` path alias, so prompts live under
    // `src/lib/prompts`. OpenMAIC's original location is `lib/prompts`.
    return path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'src', 'lib', 'prompts');
}
/**
 * Load a snippet by ID
 */ function loadSnippet(snippetId) {
    const snippetPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(getPromptsDir(), 'snippets', `${snippetId}.md`);
    try {
        return fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(snippetPath, 'utf-8').trim();
    } catch  {
        // Fail loud rather than silently shipping `{{snippet:foo}}` to the LLM.
        // A missing snippet is always a config/typo bug — surface at load time.
        throw new Error(`Snippet not found: ${snippetId}`);
    }
}
/**
 * Process snippet includes in a template.
 * Replaces {{snippet:name}} with actual snippet content.
 */ function processSnippets(template) {
    return template.replace(/\{\{snippet:(\w[\w-]*)\}\}/g, (_, snippetId)=>{
        return loadSnippet(snippetId);
    });
}
/**
 * Process conditional blocks in a template.
 * Replaces {{#if conditionName}}...{{/if}} with the inner content when the
 * named condition is truthy, or removes the entire block when it is falsy.
 *
 * Blocks do not nest — this is intentional to keep the prompt templating
 * language simple and reviewable.
 */ function processConditionalBlocks(template, conditions) {
    return template.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, conditionName, content)=>{
        return conditions[conditionName] ? content : '';
    });
}
/**
 * Load a prompt by ID
 */ function loadPrompt(promptId) {
    const promptDir = path__WEBPACK_IMPORTED_MODULE_1___default().join(getPromptsDir(), 'templates', promptId);
    try {
        // Load system.md
        const systemPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(promptDir, 'system.md');
        let systemPrompt = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(systemPath, 'utf-8').trim();
        systemPrompt = processSnippets(systemPrompt);
        // Load user.md (optional, may not exist)
        const userPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(promptDir, 'user.md');
        let userPromptTemplate = '';
        try {
            userPromptTemplate = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(userPath, 'utf-8').trim();
            userPromptTemplate = processSnippets(userPromptTemplate);
        } catch  {
        // user.md is optional
        }
        return {
            id: promptId,
            systemPrompt,
            userPromptTemplate
        };
    } catch (error) {
        log.error(`Failed to load prompt ${promptId}:`, error);
        return null;
    }
}
/**
 * Interpolate variables in a template
 * Replaces {{variable}} with values from the variables object
 */ function interpolateVariables(template, variables) {
    // `\w+` only matches [A-Za-z0-9_], so kebab-case placeholders like
    // `{{next-agent}}` pass through unchanged. Convention (per README) is
    // camelCase; tests in tests/prompts/templates.test.ts scan templates
    // for non-conforming placeholders.
    return template.replace(/\{\{(\w+)\}\}/g, (match, key)=>{
        const value = variables[key];
        if (value === undefined) return match;
        if (typeof value === 'object') return JSON.stringify(value, null, 2);
        return String(value);
    });
}
/**
 * Build a complete prompt with variables.
 *
 * Processing order:
 *   1. Snippet includes ({{snippet:name}}) — file content spliced in
 *   2. Conditional blocks ({{#if flag}}...{{/if}}) — gated on `variables`
 *   3. Variable interpolation ({{varName}}) — values substituted
 */ function buildPrompt(promptId, variables) {
    const prompt = loadPrompt(promptId);
    if (!prompt) return null;
    return {
        system: interpolateVariables(processConditionalBlocks(prompt.systemPrompt, variables), variables),
        user: interpolateVariables(processConditionalBlocks(prompt.userPromptTemplate, variables), variables)
    };
}


/***/ }),

/***/ 32791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pq: () => (/* binding */ defaultRichTextAttrs)
/* harmony export */ });
/* unused harmony exports isList, autoSelectAll, addMark, findNodesWithSameMark, findParentNode, findParentNodeOfType, isActiveOfParentNodeType, getLastTextNode, getMarkAttrs, getAttrValue, isActiveMark, markActive, getAttrValueInSelection, getTextAttrs, getFontsize */

const isList = (node, schema)=>{
    return node.type === schema.nodes.bullet_list || node.type === schema.nodes.ordered_list;
};
const autoSelectAll = (view)=>{
    const { empty } = view.state.selection;
    if (empty) selectAll(view.state, view.dispatch);
};
const addMark = (editorView, mark, selection)=>{
    if (selection) {
        editorView.dispatch(editorView.state.tr.addMark(selection.from, selection.to, mark));
    } else {
        const { $from, $to } = editorView.state.selection;
        editorView.dispatch(editorView.state.tr.addMark($from.pos, $to.pos, mark));
    }
};
const findNodesWithSameMark = (doc, from, to, markType)=>{
    let ii = from;
    const finder = (mark)=>mark.type === markType;
    let firstMark = null;
    let fromNode = null;
    let toNode = null;
    while(ii <= to){
        const node = doc.nodeAt(ii);
        if (!node || !node.marks) return null;
        const mark = node.marks.find(finder);
        if (!mark) return null;
        if (firstMark && mark !== firstMark) return null;
        fromNode = fromNode || node;
        firstMark = firstMark || mark;
        toNode = node;
        ii++;
    }
    let fromPos = from;
    let toPos = to;
    let jj = 0;
    ii = from - 1;
    while(ii > jj){
        const node = doc.nodeAt(ii);
        const mark = node && node.marks.find(finder);
        if (!mark || mark !== firstMark) break;
        fromPos = ii;
        fromNode = node;
        ii--;
    }
    ii = to + 1;
    jj = doc.nodeSize - 2;
    while(ii < jj){
        const node = doc.nodeAt(ii);
        const mark = node && node.marks.find(finder);
        if (!mark || mark !== firstMark) break;
        toPos = ii;
        toNode = node;
        ii++;
    }
    return {
        mark: firstMark,
        from: {
            node: fromNode,
            pos: fromPos
        },
        to: {
            node: toNode,
            pos: toPos
        }
    };
};
const equalNodeType = (nodeType, node)=>{
    return Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1 || node.type === nodeType;
};
const findParentNodeClosestToPos = ($pos, predicate)=>{
    for(let i = $pos.depth; i > 0; i--){
        const node = $pos.node(i);
        if (predicate(node)) {
            return {
                pos: i > 0 ? $pos.before(i) : 0,
                start: $pos.start(i),
                depth: i,
                node
            };
        }
    }
};
const findParentNode = (predicate)=>{
    return (_ref)=>findParentNodeClosestToPos(_ref.$from, predicate);
};
const findParentNodeOfType = (nodeType)=>{
    return (selection)=>{
        return findParentNode((node)=>{
            return equalNodeType(nodeType, node);
        })(selection);
    };
};
const isActiveOfParentNodeType = (nodeType, state)=>{
    const node = state.schema.nodes[nodeType];
    return !!findParentNodeOfType(node)(state.selection);
};
const getLastTextNode = (node)=>{
    if (!node) return null;
    if (node.type.name === 'text') return node;
    if (!node.lastChild) return null;
    return getLastTextNode(node.lastChild);
};
const getMarkAttrs = (view)=>{
    const { selection, doc } = view.state;
    const { from } = selection;
    let node = doc.nodeAt(from) || doc.nodeAt(from - 1);
    node = getLastTextNode(node);
    return node?.marks || [];
};
const getAttrValue = (marks, markType, attr)=>{
    for (const mark of marks){
        if (mark.type.name === markType && mark.attrs[attr]) return mark.attrs[attr];
    }
    return null;
};
const isActiveMark = (marks, markType)=>{
    for (const mark of marks){
        if (mark.type.name === markType) return true;
    }
    return false;
};
const markActive = (state, type)=>{
    const { from, $from, to, empty } = state.selection;
    if (empty) return type.isInSet(state.storedMarks || $from.marks());
    return state.doc.rangeHasMark(from, to, type);
};
const getAttrValueInSelection = (view, attr)=>{
    const { selection, doc } = view.state;
    const { from, to } = selection;
    let keepChecking = true;
    let value = '';
    doc.nodesBetween(from, to, (node)=>{
        if (keepChecking && node.attrs[attr]) {
            keepChecking = false;
            value = node.attrs[attr];
        }
        return keepChecking;
    });
    return value;
};
const _defaultAttrs = {
    color: '#000000',
    backcolor: '',
    fontsize: '16px',
    fontname: '',
    align: 'left'
};
const getTextAttrs = (view, attrs = {})=>{
    const defaultAttrs = {
        ..._defaultAttrs,
        ...attrs
    };
    const marks = getMarkAttrs(view);
    const isBold = isActiveMark(marks, 'strong');
    const isEm = isActiveMark(marks, 'em');
    const isUnderline = isActiveMark(marks, 'underline');
    const isStrikethrough = isActiveMark(marks, 'strikethrough');
    const isSuperscript = isActiveMark(marks, 'superscript');
    const isSubscript = isActiveMark(marks, 'subscript');
    const isCode = isActiveMark(marks, 'code');
    const color = getAttrValue(marks, 'forecolor', 'color') || defaultAttrs.color;
    const backcolor = getAttrValue(marks, 'backcolor', 'backcolor') || defaultAttrs.backcolor;
    const fontsize = getAttrValue(marks, 'fontsize', 'fontsize') || defaultAttrs.fontsize;
    const fontname = getAttrValue(marks, 'fontname', 'fontname') || defaultAttrs.fontname;
    const link = getAttrValue(marks, 'link', 'href') || '';
    const align = getAttrValueInSelection(view, 'align') || defaultAttrs.align;
    const isBulletList = isActiveOfParentNodeType('bullet_list', view.state);
    const isOrderedList = isActiveOfParentNodeType('ordered_list', view.state);
    const isBlockquote = isActiveOfParentNodeType('blockquote', view.state);
    return {
        bold: isBold,
        em: isEm,
        underline: isUnderline,
        strikethrough: isStrikethrough,
        superscript: isSuperscript,
        subscript: isSubscript,
        code: isCode,
        color: color,
        backcolor: backcolor,
        fontsize: fontsize,
        fontname: fontname,
        link: link,
        align: align,
        bulletList: isBulletList,
        orderedList: isOrderedList,
        blockquote: isBlockquote
    };
};
const getFontsize = (view)=>{
    const marks = getMarkAttrs(view);
    const fontsize = getAttrValue(marks, 'fontsize', 'fontsize') || _defaultAttrs.fontsize;
    return parseInt(fontsize);
};
const defaultRichTextAttrs = {
    bold: false,
    em: false,
    underline: false,
    strikethrough: false,
    superscript: false,
    subscript: false,
    code: false,
    color: '#000000',
    backcolor: '',
    fontsize: '16px',
    fontname: '',
    link: '',
    align: 'left',
    bulletList: false,
    orderedList: false,
    blockquote: false
};


/***/ }),

/***/ 34727:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $r: () => (/* reexport safe */ _scene_generator__WEBPACK_IMPORTED_MODULE_3__.$r),
/* harmony export */   BE: () => (/* reexport safe */ _prompt_formatters__WEBPACK_IMPORTED_MODULE_0__.BE),
/* harmony export */   SJ: () => (/* reexport safe */ _outline_generator__WEBPACK_IMPORTED_MODULE_2__.SJ),
/* harmony export */   Xq: () => (/* reexport safe */ _prompt_formatters__WEBPACK_IMPORTED_MODULE_0__.Xq),
/* harmony export */   bJ: () => (/* reexport safe */ _prompt_formatters__WEBPACK_IMPORTED_MODULE_0__.bJ),
/* harmony export */   d1: () => (/* reexport safe */ _scene_generator__WEBPACK_IMPORTED_MODULE_3__.d1),
/* harmony export */   sr: () => (/* reexport safe */ _scene_builder__WEBPACK_IMPORTED_MODULE_4__.sr),
/* harmony export */   tF: () => (/* reexport safe */ _scene_builder__WEBPACK_IMPORTED_MODULE_4__.tF),
/* harmony export */   wD: () => (/* reexport safe */ _prompt_formatters__WEBPACK_IMPORTED_MODULE_0__.wD)
/* harmony export */ });
/* harmony import */ var _prompt_formatters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(344734);
/* harmony import */ var _json_repair__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(385080);
/* harmony import */ var _outline_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(958206);
/* harmony import */ var _scene_generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(875648);
/* harmony import */ var _scene_builder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(280590);
/* harmony import */ var _pipeline_runner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(943583);
/**
 * Two-Stage Generation Pipeline
 *
 * Barrel re-export — all symbols previously exported from this file
 * are now spread across focused sub-modules.
 */ // Types
// Prompt formatters

// JSON repair

// Outline generator (Stage 1)

// Scene generator (Stage 2)

// Scene builder (standalone)

// Pipeline runner



/***/ }),

/***/ 43769:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export createStageAPI */
/* harmony import */ var _stage_api_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(819630);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/api/stage-api.ts
 *
 * Stage API - AI Agent Toolkit
 *
 * Provides a complete Stage operation interface for AI Agents to create and manage course content
 *
 * Design Principles:
 * 1. Type Safety: Fully leverage TypeScript's type system
 * 2. Ease of Use: Provide high-level abstractions with clear, intuitive API naming
 * 3. Extensibility: Support adding new scene types in the future
 * 4. Idempotency: Multiple calls with the same parameters produce the same result
 * 5. Error Handling: Return explicit success/failure status and error messages
 *
 * @example
 * ```typescript
 * const api = createStageAPI(stageStore);
 *
 * // Create a new scene
 * const sceneId = api.scene.create({
 *   type: 'slide',
 *   title: 'Introduction',
 *   // speech is now in actions
 * });
 *
 * // Add an element
 * const elementId = api.element.add(sceneId, {
 *   type: 'text',
 *   content: 'Hello World',
 *   left: 100,
 *   top: 100
 * });
 *
 * // Highlight an element (teaching feature)
 * api.canvas.highlight(sceneId, elementId, 3000);
 * ```
 */ // Re-export all types
// Re-export utility functions that were previously accessible

// Import sub-API factories






// ==================== Stage API Implementation ====================
/**
 * Create a Stage API instance
 *
 * @param store - Zustand store instance
 * @returns Stage API object
 */ function createStageAPI(store) {
    return {
        scene: createSceneAPI(store),
        navigation: createNavigationAPI(store),
        element: createElementAPI(store),
        canvas: createCanvasAPI(store),
        whiteboard: createWhiteboardAPI(store),
        mode: createModeAPI(store),
        stage: createStageMetaAPI(store)
    };
}


/***/ }),

/***/ 69284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ thinkingContext)
/* harmony export */ });
/* harmony import */ var node_async_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16698);
/* harmony import */ var node_async_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_async_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Async-context carrier for per-request ThinkingConfig.
 *
 * callLLM / streamLLM wrap each AI SDK call in thinkingContext.run()
 * so that the custom fetch wrapper in providers.ts can read the
 * current thinking preference and inject vendor-specific body params.
 *
 * IMPORTANT: This module uses node:async_hooks which is server-only.
 * providers.ts must NOT import this module directly (it's also used
 * on the client via settings.ts). Instead, providers.ts reads the
 * context via globalThis.__thinkingContext, which is set here at
 * module load time and guaranteed to be available before any fetch
 * wrapper runs.
 */ 
const thinkingContext = new node_async_hooks__WEBPACK_IMPORTED_MODULE_0__.AsyncLocalStorage();
// Expose on globalThis so providers.ts can access the store without
// importing this module (which would pull node:async_hooks into the
// client bundle via the settings.ts → providers.ts import chain).
globalThis.__thinkingContext = thinkingContext;


/***/ }),

/***/ 280590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sr: () => (/* binding */ buildCompleteScene),
/* harmony export */   tF: () => (/* binding */ uniquifyMediaElementIds)
/* harmony export */ });
/* unused harmony export buildSceneFromOutline */
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(661427);
/* harmony import */ var _outline_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(958206);
/* harmony import */ var _scene_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(875648);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(653165);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/scene-builder.ts
 *
 * Standalone scene building and element normalization.
 * Does NOT depend on store — returns complete Scene objects.
 */ 




const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('Generation');
/**
 * Replace sequential gen_img_N / gen_vid_N IDs in outlines with globally unique IDs.
 *
 * The LLM generates sequential placeholder IDs (gen_img_1, gen_img_2, ...) which are
 * only unique within a single course. Since the media store uses elementId as key
 * without stageId scoping, identical IDs across different courses cause thumbnail
 * contamination on the homepage. Using nanoid-based IDs ensures global uniqueness.
 */ function uniquifyMediaElementIds(outlines) {
    const idMap = new Map();
    // First pass: collect all sequential media IDs and assign unique replacements
    for (const outline of outlines){
        if (!outline.mediaGenerations) continue;
        for (const mg of outline.mediaGenerations){
            if (!idMap.has(mg.elementId)) {
                const prefix = mg.type === 'video' ? 'gen_vid_' : 'gen_img_';
                idMap.set(mg.elementId, `${prefix}${(0,nanoid__WEBPACK_IMPORTED_MODULE_3__/* .nanoid */ .Ak)(8)}`);
            }
        }
    }
    if (idMap.size === 0) return outlines;
    // Second pass: replace IDs in mediaGenerations
    return outlines.map((outline)=>{
        if (!outline.mediaGenerations) return outline;
        return {
            ...outline,
            mediaGenerations: outline.mediaGenerations.map((mg)=>({
                    ...mg,
                    elementId: idMap.get(mg.elementId) || mg.elementId
                }))
        };
    });
}
/**
 * Build a complete Scene object from an outline (for SSE streaming)
 * This function does NOT depend on store - it returns a complete Scene object
 */ async function buildSceneFromOutline(outline, aiCall, stageId, assignedImages, imageMapping, languageModel, visionEnabled, ctx, agents, onPhaseChange, userProfile, languageDirective) {
    // Apply type fallbacks
    outline = applyOutlineFallbacks(outline, !!languageModel);
    const langText = buildLanguageText(languageDirective, outline.languageNote);
    // Step 1: Generate content (with images if available)
    onPhaseChange?.('content');
    log.debug(`Step 1: Generating content for: ${outline.title}`);
    if (assignedImages && assignedImages.length > 0) {
        log.debug(`Using ${assignedImages.length} assigned images: ${assignedImages.map((img)=>img.id).join(', ')}`);
    }
    log.debug(`imageMapping available: ${imageMapping ? Object.keys(imageMapping).length + ' keys' : 'undefined'}`);
    const content = await generateSceneContent(outline, aiCall, {
        assignedImages,
        imageMapping,
        languageModel,
        visionEnabled,
        agents,
        languageDirective: langText
    });
    if (!content) {
        log.error(`Failed to generate content for: ${outline.title}`);
        return null;
    }
    // Step 2: Generate Actions
    onPhaseChange?.('actions');
    log.debug(`Step 2: Generating actions for: ${outline.title}`);
    const actions = await generateSceneActions(outline, content, aiCall, {
        ctx,
        agents,
        userProfile,
        languageDirective: langText
    });
    log.debug(`Generated ${actions.length} actions for: ${outline.title}`);
    // Build complete Scene object
    return buildCompleteScene(outline, content, actions, stageId);
}
/**
 * Build complete Scene object (without API/store)
 */ function buildCompleteScene(outline, content, actions, stageId) {
    const sceneId = (0,nanoid__WEBPACK_IMPORTED_MODULE_3__/* .nanoid */ .Ak)();
    if (outline.type === 'slide' && 'elements' in content) {
        // Build Slide object
        const defaultTheme = {
            backgroundColor: '#ffffff',
            themeColors: [
                '#5b9bd5',
                '#ed7d31',
                '#a5a5a5',
                '#ffc000',
                '#4472c4'
            ],
            fontColor: '#333333',
            fontName: 'Microsoft YaHei',
            outline: {
                color: '#d14424',
                width: 2,
                style: 'solid'
            },
            shadow: {
                h: 0,
                v: 0,
                blur: 10,
                color: '#000000'
            }
        };
        const slide = {
            id: (0,nanoid__WEBPACK_IMPORTED_MODULE_3__/* .nanoid */ .Ak)(),
            viewportSize: 1000,
            viewportRatio: 0.5625,
            theme: defaultTheme,
            elements: content.elements,
            background: content.background
        };
        return {
            id: sceneId,
            stageId,
            type: 'slide',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'slide',
                canvas: slide
            },
            actions,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    }
    if (outline.type === 'quiz' && 'questions' in content) {
        return {
            id: sceneId,
            stageId,
            type: 'quiz',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'quiz',
                questions: content.questions
            },
            actions,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    }
    if (outline.type === 'interactive' && 'html' in content) {
        return {
            id: sceneId,
            stageId,
            type: 'interactive',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'interactive',
                url: '',
                html: content.html,
                // Ultra Mode widget fields
                widgetType: content.widgetType,
                widgetConfig: content.widgetConfig,
                teacherActions: content.teacherActions
            },
            actions,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    }
    if (outline.type === 'pbl' && 'projectConfig' in content) {
        return {
            id: sceneId,
            stageId,
            type: 'pbl',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'pbl',
                projectConfig: content.projectConfig
            },
            actions,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
    }
    return null;
}


/***/ }),

/***/ 300345:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ModeMCP)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/mcp/mode-mcp.ts
 *
 * Verbatim port — pure TypeScript, no deps.
 */ /**
 * Mode MCP - Controls the current workflow mode during PBL generation.
 */ class ModeMCP {
    constructor(availableModes, defaultMode){
        this.availableModes = availableModes;
        this.currentMode = defaultMode;
    }
    setMode(mode) {
        if (!this.availableModes.includes(mode)) {
            return {
                success: false,
                error: `Mode "${mode}" not available. Available: ${this.availableModes.join(', ')}`
            };
        }
        if (mode === this.currentMode) {
            return {
                success: false,
                error: `Already in "${mode}" mode.`
            };
        }
        this.currentMode = mode;
        return {
            success: true,
            message: `Switched to "${mode}" mode.`
        };
    }
    getCurrentMode() {
        return this.currentMode;
    }
    getAvailableModes() {
        return [
            ...this.availableModes
        ];
    }
}


/***/ }),

/***/ 344734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BE: () => (/* binding */ formatTeacherPersonaForPrompt),
/* harmony export */   P$: () => (/* binding */ formatAgentsForPrompt),
/* harmony export */   Xq: () => (/* binding */ formatImageDescription),
/* harmony export */   bJ: () => (/* binding */ buildVisionUserContent),
/* harmony export */   r7: () => (/* binding */ buildCourseContext),
/* harmony export */   wD: () => (/* binding */ formatImagePlaceholder)
/* harmony export */ });
/* unused harmony export buildLanguageText */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/prompt-formatters.ts
 *
 * Prompt and context building utilities for the generation pipeline.
 */ /** Build a course context string for injection into action prompts */ function buildCourseContext(ctx) {
    if (!ctx) return '';
    const lines = [];
    // Course outline with position marker
    lines.push('Course Outline:');
    ctx.allTitles.forEach((t, i)=>{
        const marker = i === ctx.pageIndex - 1 ? ' ← current' : '';
        lines.push(`  ${i + 1}. ${t}${marker}`);
    });
    // Position information
    lines.push('');
    lines.push('IMPORTANT: All pages belong to the SAME class session. Do NOT greet again after the first page. When referencing content from earlier pages, say "we just covered" or "as mentioned on page N" — NEVER say "last class" or "previous session" because there is no previous session.');
    lines.push('');
    if (ctx.pageIndex === 1) {
        lines.push('Position: This is the FIRST page. Open with a greeting and course introduction.');
    } else if (ctx.pageIndex === ctx.totalPages) {
        lines.push('Position: This is the LAST page. Conclude the course with a summary and closing.');
        lines.push('Transition: Continue naturally from the previous page. Do NOT greet or re-introduce.');
    } else {
        lines.push(`Position: Page ${ctx.pageIndex} of ${ctx.totalPages} (middle of the course).`);
        lines.push('Transition: Continue naturally from the previous page. Do NOT greet or re-introduce.');
    }
    // Previous page speech for transition reference
    if (ctx.previousSpeeches.length > 0) {
        lines.push('');
        lines.push('Previous page speech (for transition reference):');
        const lastSpeech = ctx.previousSpeeches[ctx.previousSpeeches.length - 1];
        lines.push(`  "...${lastSpeech.slice(-150)}"`);
    }
    return lines.join('\n');
}
/** Format agent list for injection into action prompts */ function formatAgentsForPrompt(agents) {
    if (!agents || agents.length === 0) return '';
    const lines = [
        'Classroom Agents:'
    ];
    for (const a of agents){
        const personaPart = a.persona ? ` — ${a.persona}` : '';
        lines.push(`- id: "${a.id}", name: "${a.name}", role: ${a.role}${personaPart}`);
    }
    return lines.join('\n');
}
/** Extract the teacher agent's persona for injection into outline/content prompts */ function formatTeacherPersonaForPrompt(agents) {
    if (!agents || agents.length === 0) return '';
    const teacher = agents.find((a)=>a.role === 'teacher');
    if (!teacher?.persona) return '';
    return `Teacher Persona:\nName: ${teacher.name}\n${teacher.persona}\n\nAdapt the content style and tone to match this teacher's personality. IMPORTANT: The teacher's name and identity must NOT appear on the slides — no "Teacher ${teacher.name}'s tips", no "Teacher's message", etc. Slides should read as neutral, professional visual aids.`;
}
/**
 * Format a single PdfImage description for prompt inclusion.
 * Includes dimension/aspect-ratio info when available.
 */ function formatImageDescription(img) {
    let dimInfo = '';
    if (img.width && img.height) {
        const ratio = (img.width / img.height).toFixed(2);
        dimInfo = ` | size: ${img.width}×${img.height} (aspect ratio ${ratio})`;
    }
    const desc = img.description ? ` | ${img.description}` : '';
    return `- **${img.id}**: from PDF page ${img.pageNumber}${dimInfo}${desc}`;
}
/**
 * Format a short image placeholder for vision mode.
 * Only ID + page + dimensions + aspect ratio (no description), since the model can see the actual image.
 */ function formatImagePlaceholder(img) {
    let dimInfo = '';
    if (img.width && img.height) {
        const ratio = (img.width / img.height).toFixed(2);
        dimInfo = ` | size: ${img.width}×${img.height} (aspect ratio ${ratio})`;
    }
    return `- **${img.id}**: image from PDF page ${img.pageNumber}${dimInfo} [see attached]`;
}
/**
 * Build a multimodal user content array for the AI SDK.
 * Interleaves text and images so the model can associate img_id with actual image.
 * Each image label includes dimensions when available so the model knows the size
 * before seeing the image (important for layout decisions).
 */ function buildVisionUserContent(userPrompt, images) {
    const parts = [
        {
            type: 'text',
            text: userPrompt
        }
    ];
    if (images.length > 0) {
        parts.push({
            type: 'text',
            text: '\n\n--- Attached Images ---'
        });
        for (const img of images){
            let dimInfo = '';
            if (img.width && img.height) {
                const ratio = (img.width / img.height).toFixed(2);
                dimInfo = ` (${img.width}×${img.height}, aspect ratio ${ratio})`;
            }
            parts.push({
                type: 'text',
                text: `\n**${img.id}**${dimInfo}:`
            });
            // Strip data URI prefix — AI SDK only accepts http(s) URLs or raw base64
            const dataUriMatch = img.src.match(/^data:([^;]+);base64,(.+)$/);
            if (dataUriMatch) {
                parts.push({
                    type: 'image',
                    image: dataUriMatch[2],
                    mimeType: dataUriMatch[1]
                });
            } else {
                parts.push({
                    type: 'image',
                    image: img.src
                });
            }
        }
    }
    return parts;
}
/**
 * Build language instruction text from course-level directive and optional per-scene note.
 * Used by scene content and action generators to inject into prompt templates.
 */ function buildLanguageText(directive, sceneNote) {
    if (!directive && !sceneNote) return '';
    let text = directive || '';
    if (sceneNote) {
        text += (text ? '\n\n' : '') + `Additional language note for this scene: ${sceneNote}`;
    }
    return text;
}


/***/ }),

/***/ 385080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ parseJsonResponse)
/* harmony export */ });
/* unused harmony export tryParseJson */
/* harmony import */ var jsonrepair__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(923381);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/json-repair.ts
 *
 * JSON parsing with fallback strategies for AI-generated responses.
 */ 

const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('Generation');
function repairQuotedPropertyFragments(jsonStr) {
    return jsonStr.replace(/([,{]\s*)"([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(true|false|null|[+-]?\d+(?:\.\d+)?)"(?=\s*[,}])/g, (_match, prefix, key, value)=>`${prefix}"${key}": ${value}`);
}
function logJsonParseError(stage, jsonStr, error) {
    const message = error instanceof Error ? error.message : String(error);
    const positionMatch = message.match(/position\s+(\d+)/i);
    const position = positionMatch ? Number(positionMatch[1]) : undefined;
    if (typeof position === 'number' && Number.isFinite(position)) {
        const start = Math.max(0, position - 120);
        const end = Math.min(jsonStr.length, position + 120);
        log.warn(`${stage} parse error at position ${position}: ${message}. Context: ${jsonStr.slice(start, end).replace(/\n/g, '\\n')}`);
        return;
    }
    log.warn(`${stage} parse error: ${message}`);
}
function parseJsonResponse(response) {
    // Strategy 1: Try to extract JSON from markdown code blocks (may have multiple)
    const codeBlockMatches = response.matchAll(/```(?:json)?\s*([\s\S]*?)```/g);
    for (const match of codeBlockMatches){
        const extracted = match[1].trim();
        // Only try if it looks like JSON (starts with { or [)
        if (extracted.startsWith('{') || extracted.startsWith('[')) {
            const result = tryParseJson(extracted);
            if (result !== null) {
                log.debug('Successfully parsed JSON from code block');
                return result;
            }
        }
    }
    // Strategy 2: Try to find JSON structure directly in response (no code block)
    // Look for array or object start
    const jsonStartArray = response.indexOf('[');
    const jsonStartObject = response.indexOf('{');
    if (jsonStartArray !== -1 || jsonStartObject !== -1) {
        // Prefer the structure that appears first
        const startIndex = jsonStartArray === -1 ? jsonStartObject : jsonStartObject === -1 ? jsonStartArray : Math.min(jsonStartArray, jsonStartObject);
        // Find the matching close bracket
        let depth = 0;
        let endIndex = -1;
        let inString = false;
        let escapeNext = false;
        for(let i = startIndex; i < response.length; i++){
            const char = response[i];
            if (escapeNext) {
                escapeNext = false;
                continue;
            }
            if (char === '\\' && inString) {
                escapeNext = true;
                continue;
            }
            if (char === '"' && !escapeNext) {
                inString = !inString;
                continue;
            }
            if (!inString) {
                if (char === '[' || char === '{') depth++;
                else if (char === ']' || char === '}') {
                    depth--;
                    if (depth === 0) {
                        endIndex = i;
                        break;
                    }
                }
            }
        }
        if (endIndex !== -1) {
            const jsonStr = response.substring(startIndex, endIndex + 1);
            const result = tryParseJson(jsonStr);
            if (result !== null) {
                log.debug('Successfully parsed JSON from response body');
                return result;
            }
        }
    }
    // Strategy 3: Last resort - try the whole response
    const result = tryParseJson(response.trim());
    if (result !== null) {
        log.debug('Successfully parsed raw response as JSON');
        return result;
    }
    log.error('Failed to parse JSON from response');
    log.error('Raw response (first 500 chars):', response.substring(0, 500));
    log.error('Raw response (last 500 chars):', response.substring(Math.max(0, response.length - 500)));
    return null;
}
/**
 * Try to parse JSON with various fixes for common AI response issues
 */ function tryParseJson(jsonStr) {
    // Attempt 1: Try parsing as-is
    try {
        return JSON.parse(jsonStr);
    } catch (error) {
        logJsonParseError('Attempt 1', jsonStr, error);
    // Continue to fix attempts
    }
    // Attempt 2: Fix common JSON issues from AI responses
    try {
        let fixed = jsonStr;
        // Fix 0: Recover malformed property fragments that were accidentally
        // emitted as standalone strings inside an object, such as:
        // `"height: 76"` -> `"height": 76`
        // `"fixedRatio: false"` -> `"fixedRatio": false`
        // The object-context prefix/suffix guards keep valid JSON strings intact.
        fixed = repairQuotedPropertyFragments(fixed);
        // Fix 1: Handle LaTeX-style escapes that break JSON (e.g., \frac, \left, \right, \times, etc.)
        // These are common in math content and need to be double-escaped
        // Match backslash followed by letters (LaTeX commands) inside strings,
        // but skip valid JSON escape sequences (\b, \f, \n, \r, \t, \u)
        fixed = fixed.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (_match, content)=>{
            // Double-escape backslash+letter ONLY for non-JSON-escape letters
            const fixedContent = content.replace(/\\([a-zA-Z])/g, (_m, ch)=>{
                // Preserve valid JSON escape sequences
                if ('bfnrtu'.includes(ch)) return `\\${ch}`;
                return `\\\\${ch}`;
            });
            return `"${fixedContent}"`;
        });
        // Fix 2: Fix other invalid escape sequences (e.g., \S, \L, etc.)
        // Valid JSON escapes: \", \\, \/, \b, \f, \n, \r, \t, \uXXXX
        fixed = fixed.replace(/\\([^"\\\/bfnrtu\n\r])/g, (match, char)=>{
            // If it's a letter, it's likely a LaTeX command
            if (/[a-zA-Z]/.test(char)) {
                return '\\\\' + char;
            }
            return match;
        });
        // Fix 3: Try to fix truncated JSON arrays/objects
        const trimmed = fixed.trim();
        if (trimmed.startsWith('[') && !trimmed.endsWith(']')) {
            const lastCompleteObj = fixed.lastIndexOf('}');
            if (lastCompleteObj > 0) {
                fixed = fixed.substring(0, lastCompleteObj + 1) + ']';
                log.warn('Fixed truncated JSON array');
            }
        } else if (trimmed.startsWith('{') && !trimmed.endsWith('}')) {
            // Try to close incomplete object
            const openBraces = (fixed.match(/{/g) || []).length;
            const closeBraces = (fixed.match(/}/g) || []).length;
            if (openBraces > closeBraces) {
                fixed += '}'.repeat(openBraces - closeBraces);
                log.warn('Fixed truncated JSON object');
            }
        }
        return JSON.parse(fixed);
    } catch (error) {
        logJsonParseError('Attempt 2', jsonStr, error);
    // Continue to next attempt
    }
    // Attempt 3: Use jsonrepair to fix malformed JSON (e.g. unescaped quotes in Chinese text)
    try {
        const repaired = (0,jsonrepair__WEBPACK_IMPORTED_MODULE_1__/* .jsonrepair */ .m)(jsonStr);
        return JSON.parse(repaired);
    } catch (error) {
        logJsonParseError('Attempt 3', jsonStr, error);
    // Continue to next attempt
    }
    // Attempt 4: More aggressive fixing - remove control characters
    try {
        let fixed = jsonStr;
        // Remove or escape control characters
        fixed = fixed.replace(/[\x00-\x1F\x7F]/g, (char)=>{
            switch(char){
                case '\n':
                    return '\\n';
                case '\r':
                    return '\\r';
                case '\t':
                    return '\\t';
                default:
                    return '';
            }
        });
        return JSON.parse(fixed);
    } catch (error) {
        logJsonParseError('Attempt 4', jsonStr, error);
        return null;
    }
}


/***/ }),

/***/ 402745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fF: () => (/* binding */ SLIDE_ONLY_ACTIONS)
/* harmony export */ });
/* unused harmony exports FIRE_AND_FORGET_ACTIONS, SYNC_ACTIONS */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/types/action.ts
 *
 * Unified Action System.
 *
 * Actions are the sole mechanism for agents to interact with the presentation.
 * Two categories:
 * - Fire-and-forget: visual effects on slides (spotlight, laser)
 * - Synchronous: must wait for completion before next action (speech, whiteboard, discussion)
 *
 * Both online (streaming) and offline (playback) paths consume the same Action types.
 */ // ==================== Base ====================
/** Action types that fire immediately without blocking */ const FIRE_AND_FORGET_ACTIONS = (/* unused pure expression or super */ null && ([
    'spotlight',
    'laser'
]));
/** Action types that only work on slide scenes (require slide canvas elements) */ const SLIDE_ONLY_ACTIONS = [
    'spotlight',
    'laser'
];
/** Action types that must complete before the next action runs */ const SYNC_ACTIONS = (/* unused pure expression or super */ null && ([
    'speech',
    'play_video',
    'wb_open',
    'wb_draw_text',
    'wb_draw_shape',
    'wb_draw_chart',
    'wb_draw_latex',
    'wb_draw_table',
    'wb_draw_line',
    'wb_draw_code',
    'wb_edit_code',
    'wb_clear',
    'wb_delete',
    'wb_close',
    'discussion',
    'widget_highlight',
    'widget_setState',
    'widget_annotation',
    'widget_reveal'
]));


/***/ }),

/***/ 419426:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ generatePBLContent)
/* harmony export */ });
/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(658);
/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(762939);
/* harmony import */ var _lib_ai_llm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(525351);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18963);
/* harmony import */ var _mcp_mode_mcp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(300345);
/* harmony import */ var _mcp_project_mcp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(519843);
/* harmony import */ var _mcp_agent_mcp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(798607);
/* harmony import */ var _mcp_issueboard_mcp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(845591);
/* harmony import */ var _pbl_system_prompt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(481541);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/generate-pbl.ts
 *
 * Verbatim port — `ai` (tool, stepCountIs, LanguageModel), `zod`, `@/lib/ai/llm`
 * (callLLM, MedQ slim wrapper), `@/lib/types/provider` (ThinkingConfig), and the
 * four PBL MCP classes + pbl-system-prompt builder are all ported.
 */ /**
 * PBL Generation - Agentic Loop using Vercel AI SDK
 *
 * Core generation engine that designs a complete PBL project through
 * multi-step tool calling with generateText + stopWhen.
 */ 







/**
 * Generate a complete PBL project configuration using an agentic loop.
 *
 * Uses Vercel AI SDK's generateText with tools and stopWhen to drive
 * a multi-step conversation where the LLM designs the project by
 * calling MCP tools.
 */ async function generatePBLContent(config, model, callbacks, thinkingConfig) {
    const { languageDirective } = config;
    // Initialize shared state
    const projectConfig = {
        projectInfo: {
            title: '',
            description: ''
        },
        agents: [],
        issueboard: {
            agent_ids: [],
            issues: [],
            current_issue_id: null
        },
        chat: {
            messages: []
        }
    };
    // Create MCP instances operating on shared state
    const modeMCP = new _mcp_mode_mcp__WEBPACK_IMPORTED_MODULE_2__/* .ModeMCP */ .A([
        'project_info',
        'agent',
        'issueboard',
        'idle'
    ], 'project_info');
    const projectMCP = new _mcp_project_mcp__WEBPACK_IMPORTED_MODULE_3__/* .ProjectMCP */ .u(projectConfig);
    const agentMCP = new _mcp_agent_mcp__WEBPACK_IMPORTED_MODULE_4__/* .AgentMCP */ .M(projectConfig);
    const issueboardMCP = new _mcp_issueboard_mcp__WEBPACK_IMPORTED_MODULE_5__/* .IssueboardMCP */ .e(projectConfig, agentMCP, languageDirective);
    callbacks?.onProgress?.('Starting PBL project generation...');
    // Define tools with Zod schemas, delegating to MCP instances
    const pblTools = {
        set_mode: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Switch the current working mode. Available modes: project_info, agent, issueboard, idle.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                mode: zod__WEBPACK_IMPORTED_MODULE_7__/* ["enum"] */ .k5n([
                    'project_info',
                    'agent',
                    'issueboard',
                    'idle'
                ])
            }),
            execute: async ({ mode })=>modeMCP.setMode(mode)
        }),
        // Project info tools
        get_project_info: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Get the current project information (title and description). Requires project_info mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({}),
            execute: async ()=>{
                if (modeMCP.getCurrentMode() !== 'project_info') {
                    return {
                        success: false,
                        error: 'Must be in project_info mode.'
                    };
                }
                return projectMCP.getProjectInfo();
            }
        }),
        update_title: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Update the project title. Requires project_info mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                title: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('The new project title')
            }),
            execute: async ({ title })=>{
                if (modeMCP.getCurrentMode() !== 'project_info') {
                    return {
                        success: false,
                        error: 'Must be in project_info mode.'
                    };
                }
                return projectMCP.updateTitle(title);
            }
        }),
        update_description: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Update the project description. Requires project_info mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                description: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('The new project description')
            }),
            execute: async ({ description })=>{
                if (modeMCP.getCurrentMode() !== 'project_info') {
                    return {
                        success: false,
                        error: 'Must be in project_info mode.'
                    };
                }
                return projectMCP.updateDescription(description);
            }
        }),
        // Agent tools
        list_project_agents: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'List all agent roles defined for the project. Requires agent mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({}),
            execute: async ()=>{
                if (modeMCP.getCurrentMode() !== 'agent') {
                    return {
                        success: false,
                        error: 'Must be in agent mode.'
                    };
                }
                return agentMCP.listAgents();
            }
        }),
        create_agent: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Create a new agent role for the project. Requires agent mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                name: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('Agent name (e.g., "Data Analyst", "Project Manager")'),
                system_prompt: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe("System prompt describing the agent's responsibilities"),
                default_mode: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('Default environment mode (e.g., "chat")'),
                actor_role: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('Role description'),
                role_division: zod__WEBPACK_IMPORTED_MODULE_7__/* ["enum"] */ .k5n([
                    'management',
                    'development'
                ]).optional().describe('Role division (default: development)')
            }),
            execute: async (params)=>{
                if (modeMCP.getCurrentMode() !== 'agent') {
                    return {
                        success: false,
                        error: 'Must be in agent mode.'
                    };
                }
                return agentMCP.createAgent(params);
            }
        }),
        update_agent: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: "Update an agent role's properties. Requires agent mode.",
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                name: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('The agent name to update'),
                new_name: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('New agent name'),
                system_prompt: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('New system prompt'),
                default_mode: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('New default mode'),
                actor_role: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('New role description'),
                role_division: zod__WEBPACK_IMPORTED_MODULE_7__/* ["enum"] */ .k5n([
                    'management',
                    'development'
                ]).optional()
            }),
            execute: async (params)=>{
                if (modeMCP.getCurrentMode() !== 'agent') {
                    return {
                        success: false,
                        error: 'Must be in agent mode.'
                    };
                }
                return agentMCP.updateAgent(params);
            }
        }),
        delete_agent: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Delete an agent role. Requires agent mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                name: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('The agent name to delete')
            }),
            execute: async ({ name })=>{
                if (modeMCP.getCurrentMode() !== 'agent') {
                    return {
                        success: false,
                        error: 'Must be in agent mode.'
                    };
                }
                return agentMCP.deleteAgent(name);
            }
        }),
        // Issueboard tools
        create_issueboard: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Create/reset the issueboard. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({}),
            execute: async ()=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.createIssueboard();
            }
        }),
        get_issueboard: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Get the current issueboard configuration. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({}),
            execute: async ()=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.getIssueboard();
            }
        }),
        update_issueboard_agents: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Update the agent list for the issueboard. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                agent_ids: zod__WEBPACK_IMPORTED_MODULE_7__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP()).describe('List of agent names to assign')
            }),
            execute: async ({ agent_ids })=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.updateIssueboardAgents(agent_ids);
            }
        }),
        create_issue: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Create a new issue in the issueboard. Automatically creates Question and Judge agents. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                title: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('Issue title'),
                description: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('Issue description'),
                person_in_charge: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('Person responsible (use an agent role name)'),
                participants: zod__WEBPACK_IMPORTED_MODULE_7__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP()).optional().describe('Participant names'),
                notes: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional().describe('Additional notes'),
                parent_issue: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().nullable().optional().describe('Parent issue ID for sub-issues'),
                index: zod__WEBPACK_IMPORTED_MODULE_7__/* .number */ .aig().optional().describe('Order index')
            }),
            execute: async (params)=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.createIssue(params);
            }
        }),
        list_issues: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'List all issues in the issueboard. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({}),
            execute: async ()=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.listIssues();
            }
        }),
        update_issue: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Update an existing issue. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                issue_id: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('The issue ID to update'),
                title: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional(),
                description: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional(),
                person_in_charge: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional(),
                participants: zod__WEBPACK_IMPORTED_MODULE_7__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP()).optional(),
                notes: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().optional(),
                parent_issue: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().nullable().optional(),
                index: zod__WEBPACK_IMPORTED_MODULE_7__/* .number */ .aig().optional()
            }),
            execute: async (params)=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.updateIssue(params);
            }
        }),
        delete_issue: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Delete an issue and its sub-issues. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                issue_id: zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP().describe('The issue ID to delete')
            }),
            execute: async ({ issue_id })=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.deleteIssue(issue_id);
            }
        }),
        reorder_issues: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .tool */ .z6)({
            description: 'Reorder issues. Requires issueboard mode.',
            inputSchema: zod__WEBPACK_IMPORTED_MODULE_7__/* .object */ .Ikc({
                issue_ids: zod__WEBPACK_IMPORTED_MODULE_7__/* .array */ .YOg(zod__WEBPACK_IMPORTED_MODULE_7__/* .string */ .YjP()).describe('Issue IDs in desired order')
            }),
            execute: async ({ issue_ids })=>{
                if (modeMCP.getCurrentMode() !== 'issueboard') {
                    return {
                        success: false,
                        error: 'Must be in issueboard mode.'
                    };
                }
                return issueboardMCP.reorderIssues(issue_ids);
            }
        })
    };
    // Run the agentic loop
    const systemPrompt = (0,_pbl_system_prompt__WEBPACK_IMPORTED_MODULE_1__/* .buildPBLSystemPrompt */ .a)(config);
    const _result = await (0,_lib_ai_llm__WEBPACK_IMPORTED_MODULE_0__.callLLM)({
        model,
        system: systemPrompt,
        prompt: `Design a PBL project. Start in project_info mode by setting the project title and description.`,
        tools: pblTools,
        stopWhen: (0,ai__WEBPACK_IMPORTED_MODULE_8__/* .stepCountIs */ .wSt)(30),
        onStepFinish: ({ toolCalls, text })=>{
            if (text) {
                callbacks?.onProgress?.(`Thinking: ${text.slice(0, 100)}...`);
            }
            if (toolCalls) {
                for (const tc of toolCalls){
                    callbacks?.onProgress?.(`Tool: ${tc.toolName}`);
                }
            }
        }
    }, 'pbl-generate', undefined, thinkingConfig);
    // Check if mode reached idle; if not, the LLM may have stopped early
    if (modeMCP.getCurrentMode() !== 'idle') {
        callbacks?.onProgress?.('Warning: Generation did not reach idle mode. Project may be incomplete.');
    }
    callbacks?.onProgress?.('PBL structure generated. Running post-processing...');
    // Post-processing: activate first issue and generate initial questions
    await postProcessPBL(projectConfig, model, languageDirective, callbacks, thinkingConfig);
    callbacks?.onProgress?.('PBL project generation complete!');
    return projectConfig;
}
/**
 * Post-processing after the agentic loop:
 * 1. Activate the first issue
 * 2. Generate initial questions for it using the Question Agent
 * 3. Add welcome message to chat
 */ async function postProcessPBL(config, model, languageDirective, callbacks, thinkingConfig) {
    const { issueboard, agents } = config;
    if (issueboard.issues.length === 0) {
        return;
    }
    // Sort by index and activate first
    const sortedIssues = [
        ...issueboard.issues
    ].sort((a, b)=>a.index - b.index);
    const firstIssue = sortedIssues[0];
    firstIssue.is_active = true;
    issueboard.current_issue_id = firstIssue.id;
    callbacks?.onProgress?.(`Activating first issue: ${firstIssue.title}`);
    // Generate initial questions for the first issue
    const questionAgent = agents.find((a)=>a.name === firstIssue.question_agent_name);
    if (!questionAgent) {
        callbacks?.onProgress?.('Warning: Question agent not found for first issue.');
        return;
    }
    try {
        callbacks?.onProgress?.('Generating initial questions for first issue...');
        const context = `## Issue Information

**Title**: ${firstIssue.title}
**Description**: ${firstIssue.description}
**Person in Charge**: ${firstIssue.person_in_charge}
${firstIssue.participants.length > 0 ? `**Participants**: ${firstIssue.participants.join(', ')}` : ''}
${firstIssue.notes ? `**Notes**: ${firstIssue.notes}` : ''}

## Your Task

Generate a welcome message for the student working on this issue. The message should:
1. Start with a friendly greeting introducing yourself as the guiding assistant for this issue (use a natural, localized title — do NOT use the English term "Question Agent" directly in non-English contexts)
2. Present 1-3 specific, actionable guiding questions based on the issue information above, each question should:
   - Guide students toward key learning objectives
   - Be specific and actionable
   - Help break down the problem
   - Encourage critical thinking
3. End by encouraging the student to type \`@question\` anytime for help (keep the literal \`@question\` as-is since it triggers the agent system)

Format the questions as a numbered list.`;
        const questionResult = await (0,_lib_ai_llm__WEBPACK_IMPORTED_MODULE_0__.callLLM)({
            model,
            system: questionAgent.system_prompt,
            prompt: context
        }, 'pbl-post-process', undefined, thinkingConfig);
        const generatedQuestions = questionResult.text;
        firstIssue.generated_questions = generatedQuestions;
        config.chat.messages.push({
            id: `msg_welcome_${Date.now()}`,
            agent_name: firstIssue.question_agent_name,
            message: generatedQuestions,
            timestamp: Date.now(),
            read_by: []
        });
        callbacks?.onProgress?.('Initial questions generated and welcome message added.');
    } catch (error) {
        callbacks?.onProgress?.(`Warning: Failed to generate initial questions: ${error instanceof Error ? error.message : String(error)}`);
    }
}


/***/ }),

/***/ 435842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ postProcessInteractiveHtml)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/interactive-post-processor.ts
 *
 * Interactive HTML Post-Processor
 *
 * Ported from Python's PostProcessor class (learn-your-way/concept_to_html.py:287-385)
 *
 * Handles:
 * - LaTeX delimiter conversion ($$...$$ -> \[...\], $...$ -> \(...\))
 * - KaTeX CSS/JS injection with auto-render and MutationObserver
 * - Script tag protection during LaTeX conversion
 */ /**
 * Main entry point: post-process generated interactive HTML
 * Converts LaTeX delimiters and injects KaTeX rendering resources.
 */ function postProcessInteractiveHtml(html) {
    // Convert LaTeX delimiters while protecting script tags
    let processed = convertLatexDelimiters(html);
    // Inject KaTeX resources if not already present
    if (!processed.toLowerCase().includes('katex')) {
        processed = injectKatex(processed);
    }
    return processed;
}
/**
 * Convert LaTeX delimiters while protecting <script> tags.
 *
 * - Protects script blocks from modification
 * - Converts $$...$$ to \[...\] (display math)
 * - Converts $...$ to \(...\) (inline math)
 * - Restores script blocks after conversion
 */ function convertLatexDelimiters(html) {
    const scriptBlocks = [];
    // Protect script tags by replacing them with placeholders
    let processed = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match)=>{
        scriptBlocks.push(match);
        return `__SCRIPT_BLOCK_${scriptBlocks.length - 1}__`;
    });
    // Convert display math: $$...$$ -> \[...\]
    processed = processed.replace(/\$\$([^$]+)\$\$/g, '\\[$1\\]');
    // Convert inline math: $...$ -> \(...\)
    // Use non-greedy match and exclude newlines to avoid false positives
    processed = processed.replace(/\$([^$\n]+?)\$/g, '\\($1\\)');
    // Restore script blocks in a single pass. A replacer FUNCTION (not a string)
    // is safe even when script content contains `$` — a function's return value
    // is inserted literally, with no `$&`/`$1` substitution. The previous
    // indexOf+substring loop rebuilt the entire string once per block, i.e.
    // O(blocks × length), which balloons memory and blocks the event loop when
    // the generated widget HTML contains many <script> tags.
    processed = processed.replace(/__SCRIPT_BLOCK_(\d+)__/g, (whole, index)=>scriptBlocks[Number(index)] ?? whole);
    return processed;
}
/**
 * Inject KaTeX CSS, JS, auto-render, and MutationObserver before </head>.
 * Falls back to appending at end if </head> is not found.
 */ function injectKatex(html) {
    const katexInjection = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    const katexOptions = {
        delimiters: [
            {left: '\\\\[', right: '\\\\]', display: true},
            {left: '\\\\(', right: '\\\\)', display: false},
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
        ],
        throwOnError: false,
        strict: false,
        trust: true
    };

    let renderTimeout;
    function safeRender() {
        if (renderTimeout) clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            renderMathInElement(document.body, katexOptions);
        }, 100);
    }

    renderMathInElement(document.body, katexOptions);

    const observer = new MutationObserver((mutations) => {
        let shouldRender = false;
        mutations.forEach((mutation) => {
            if (mutation.target &&
                mutation.target.className &&
                typeof mutation.target.className === 'string' &&
                mutation.target.className.includes('katex')) {
                return;
            }
            shouldRender = true;
        });

        if (shouldRender) {
            safeRender();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    setInterval(() => {
        const text = document.body.innerText;
        if (text.includes('\\\\(') || text.includes('$$')) {
            safeRender();
        }
    }, 2000);
});
</script>`;
    // Use indexOf + substring instead of String.replace() because the
    // katexInjection string contains '$' characters that .replace() would
    // interpret as special substitution patterns ($$ → $, $' → post-match text).
    const headCloseIdx = html.indexOf('</head>');
    if (headCloseIdx !== -1) {
        return html.substring(0, headCloseIdx) + katexInjection + '\n</head>' + html.substring(headCloseIdx + 7);
    }
    // Fallback: inject before </body> if </head> is missing
    const bodyCloseIdx = html.indexOf('</body>');
    if (bodyCloseIdx !== -1) {
        return html.substring(0, bodyCloseIdx) + katexInjection + '\n</body>' + html.substring(bodyCloseIdx + 7);
    }
    // Last resort: append at end
    return html + katexInjection;
}


/***/ }),

/***/ 481541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ buildPBLSystemPrompt)
/* harmony export */ });
/* harmony import */ var _lib_prompts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548245);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/pbl-system-prompt.ts
 *
 * Verbatim port — `@/lib/prompts` already exists.
 */ /**
 * PBL Generation System Prompt
 *
 * Uses languageDirective for multi-language support.
 */ 
function buildPBLSystemPrompt(config) {
    const prompt = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_0__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_0__/* .PROMPT_IDS */ .u9.PBL_DESIGN, {
        projectTopic: config.projectTopic,
        projectDescription: config.projectDescription,
        targetSkills: config.targetSkills.join(', '),
        issueCount: config.issueCount ?? 3,
        languageDirective: config.languageDirective
    });
    if (!prompt) {
        throw new Error('pbl-design prompt template failed to load');
    }
    return prompt.system;
}


/***/ }),

/***/ 519843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ ProjectMCP)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/mcp/project-mcp.ts
 *
 * Verbatim port — pure TypeScript.
 */ class ProjectMCP {
    constructor(config){
        this.config = config;
    }
    getProjectInfo() {
        return {
            success: true,
            title: this.config.projectInfo.title,
            description: this.config.projectInfo.description
        };
    }
    updateTitle(title) {
        if (!title?.trim()) {
            return {
                success: false,
                error: 'Title cannot be empty.'
            };
        }
        this.config.projectInfo.title = title;
        return {
            success: true,
            message: 'Title updated successfully.'
        };
    }
    updateDescription(description) {
        if (description === null || description === undefined) {
            return {
                success: false,
                error: 'Description cannot be null.'
            };
        }
        this.config.projectInfo.description = description;
        return {
            success: true,
            message: 'Description updated successfully.'
        };
    }
}


/***/ }),

/***/ 525351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ streamLLM),
/* harmony export */   callLLM: () => (/* binding */ callLLM)
/* harmony export */ });
/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(762939);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(228262);
/* harmony import */ var _thinking_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69284);
/* harmony import */ var _model_metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(826295);
/* harmony import */ var _lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(716533);
/**
 * Unified LLM Call Layer
 *
 * All LLM interactions should go through callLLM / streamLLM.
 */ 





const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('LLM');
function _extractRequestInfo(params) {
    const tools = params.tools ? Object.keys(params.tools) : undefined;
    const p = params;
    return {
        system: p.system,
        prompt: p.prompt,
        messages: p.messages,
        tools,
        maxOutputTokens: p.maxOutputTokens
    };
}
function getModelId(params) {
    const m = params.model;
    if (typeof m === 'string') return m;
    if (m && typeof m === 'object' && 'modelId' in m) return m.modelId;
    return 'unknown';
}
/** Provider/model → thinking capability (built once at module load) */ const MODEL_THINKING_MAP = (()=>{
    const map = new Map();
    for (const provider of Object.values(_providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS)){
        for (const model of provider.models){
            map.set((0,_model_metadata__WEBPACK_IMPORTED_MODULE_3__/* .getModelMetadataKey */ .yi)(provider.id, model.id), {
                thinking: model.capabilities?.thinking
            });
        }
    }
    return map;
})();
/** Model ID → thinking capability for IDs that are unique across providers. */ const UNIQUE_MODEL_THINKING_MAP = (()=>{
    const counts = new Map();
    for (const provider of Object.values(_providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS)){
        for (const model of provider.models){
            counts.set(model.id, (counts.get(model.id) ?? 0) + 1);
        }
    }
    const map = new Map();
    for (const provider of Object.values(_providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS)){
        for (const model of provider.models){
            if (counts.get(model.id) === 1) {
                map.set(model.id, {
                    thinking: model.capabilities?.thinking
                });
            }
        }
    }
    return map;
})();
/** Global thinking override from environment variable */ function getGlobalThinkingConfig() {
    if (process.env.LLM_THINKING_DISABLED === 'true') {
        return {
            mode: 'disabled',
            enabled: false
        };
    }
    return undefined;
}
function getAnthropicEffort(thinking, config) {
    const effort = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingEffort */ .IG)(thinking, config);
    if (!effort || effort === 'none' || effort === 'minimal') return undefined;
    return effort;
}
function getModelProviderId(params) {
    const m = params.model;
    if (!m || typeof m !== 'object' || !('provider' in m)) return undefined;
    const provider = m.provider;
    if (!provider) return undefined;
    const modelId = 'modelId' in m ? m.modelId : undefined;
    if (provider === 'anthropic.messages' && modelId?.startsWith('MiniMax-')) return 'minimax';
    if (provider in _providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS) return provider;
    const prefix = provider.split('.')[0];
    return prefix in _providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS ? prefix : undefined;
}
/**
 * Map a unified ThinkingConfig to provider-specific providerOptions.
 */ function buildThinkingProviderOptions(providerId, modelId, config) {
    const info = providerId ? MODEL_THINKING_MAP.get((0,_model_metadata__WEBPACK_IMPORTED_MODULE_3__/* .getModelMetadataKey */ .yi)(providerId, modelId)) : UNIQUE_MODEL_THINKING_MAP.get(modelId);
    if (!info?.thinking) return undefined; // model has no thinking capability
    const thinking = info.thinking;
    if (thinking.control === 'none') return undefined;
    const mode = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .getThinkingMode */ .QL)(config);
    switch(thinking.requestAdapter){
        case 'openai':
            {
                const effort = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingEffort */ .IG)(thinking, config);
                return effort ? {
                    openai: {
                        reasoningEffort: effort
                    }
                } : undefined;
            }
        case 'anthropic':
            {
                const buildAnthropicOptions = (options)=>({
                        anthropic: options
                    });
                if (mode === 'disabled') return buildAnthropicOptions({
                    thinking: {
                        type: 'disabled'
                    }
                });
                if (thinking.control === 'toggle-budget' || thinking.control === 'budget-only') {
                    const budget = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingBudget */ .hg)(thinking, config);
                    return budget === undefined ? undefined : buildAnthropicOptions({
                        thinking: {
                            type: 'enabled',
                            budgetTokens: budget
                        }
                    });
                }
                const effort = getAnthropicEffort(thinking, config);
                if (!effort) return undefined;
                if (thinking.anthropicThinking?.type === 'adaptive') {
                    return buildAnthropicOptions({
                        thinking: {
                            type: 'adaptive'
                        },
                        effort
                    });
                }
                const manualEffort = effort === 'xhigh' ? 'max' : effort;
                const budget = thinking.anthropicThinking?.budgetByEffort?.[manualEffort];
                if (!budget) return undefined;
                return buildAnthropicOptions({
                    thinking: {
                        type: 'enabled',
                        budgetTokens: budget
                    },
                    effort: manualEffort
                });
            }
        case 'google':
            {
                if (thinking.control === 'level') {
                    const level = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingLevel */ .Aq)(thinking, config);
                    return level ? {
                        google: {
                            thinkingConfig: {
                                thinkingLevel: level
                            }
                        }
                    } : undefined;
                }
                const budget = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingBudget */ .hg)(thinking, config);
                if (budget === undefined) return undefined;
                return {
                    google: {
                        thinkingConfig: {
                            thinkingBudget: budget
                        }
                    }
                };
            }
        default:
            // OpenAI-compatible providers are injected in providers.ts fetch wrapper.
            return undefined;
    }
}
/**
 * Inject provider-specific thinking options into LLM call params.
 *
 * For native providers (OpenAI/Anthropic/Google), this sets providerOptions.
 * For OpenAI-compatible providers, providerOptions won't work (stripped by
 * zod schema) — those are handled by the custom fetch wrapper via thinkingContext.
 *
 * Priority: caller's providerOptions > ThinkingConfig
 */ function injectProviderOptions(params, thinking) {
    if (params.providerOptions) return params; // caller explicitly set providerOptions
    const modelId = getModelId(params);
    const providerId = getModelProviderId(params);
    if (thinking) {
        const opts = buildThinkingProviderOptions(providerId, modelId, thinking);
        if (opts) return {
            ...params,
            providerOptions: opts
        };
    }
    return params;
}
const DEFAULT_VALIDATE = (text)=>text.trim().length > 0;
/**
 * Unified wrapper around `generateText`.
 *
 * @param params - Same parameters as AI SDK's `generateText`
 * @param source - A short label for log grouping (e.g. 'scene-stream', 'pbl-chat')
 * @param retryOptions - Optional retry-on-validation-failure settings
 * @param thinking - Optional per-call thinking config (overrides global LLM_THINKING_DISABLED)
 */ async function callLLM(params, source, retryOptions, thinking) {
    const maxAttempts = (retryOptions?.retries ?? 0) + 1;
    const validate = retryOptions?.validate ?? (maxAttempts > 1 ? DEFAULT_VALIDATE : undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lastResult;
    let lastError;
    for(let attempt = 1; attempt <= maxAttempts; attempt++){
        try {
            // Resolve effective thinking config: per-call > global env > undefined
            const effectiveThinking = thinking ?? getGlobalThinkingConfig();
            const injectedParams = injectProviderOptions(params, effectiveThinking);
            // Wrap in thinkingContext so the custom fetch wrapper in providers.ts
            // can read the config and inject vendor-specific body params for
            // OpenAI-compatible providers.
            const result = await _thinking_context__WEBPACK_IMPORTED_MODULE_2__/* .thinkingContext */ .E.run(effectiveThinking, ()=>(0,ai__WEBPACK_IMPORTED_MODULE_5__/* .generateText */ .Df5)(injectedParams));
            // Validate result (only when retries are configured)
            if (validate && !validate(result.text)) {
                log.warn(`[${source}] Validation failed (attempt ${attempt}/${maxAttempts}), ${attempt < maxAttempts ? 'retrying...' : 'giving up'}`);
                lastResult = result;
                continue;
            }
            return result;
        } catch (error) {
            lastError = error;
            if (attempt < maxAttempts) {
                log.warn(`[${source}] Call failed (attempt ${attempt}/${maxAttempts}), retrying...`, error);
                continue;
            }
        }
    }
    // All attempts exhausted — return last result or throw last error
    if (lastResult) return lastResult;
    throw lastError;
}
/**
 * Unified wrapper around `streamText`.
 *
 * Returns the same StreamTextResult.
 *
 * @param params - Same parameters as AI SDK's `streamText`
 * @param source - A short label for log grouping
 * @param thinking - Optional per-call thinking config (overrides global LLM_THINKING_DISABLED)
 */ function streamLLM(params, source, thinking) {
    // Resolve effective thinking config and wrap in thinkingContext
    const effectiveThinking = thinking ?? getGlobalThinkingConfig();
    const injectedParams = injectProviderOptions(params, effectiveThinking);
    const result = _thinking_context__WEBPACK_IMPORTED_MODULE_2__/* .thinkingContext */ .E.run(effectiveThinking, ()=>(0,ai__WEBPACK_IMPORTED_MODULE_5__/* .streamText */ .gM3)(injectedParams));
    return result;
}


/***/ }),

/***/ 548245:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fn: () => (/* reexport safe */ _loader__WEBPACK_IMPORTED_MODULE_0__.fn),
/* harmony export */   u9: () => (/* binding */ PROMPT_IDS)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6894);
/**
 * Prompt System - Simplified prompt management
 *
 * Features:
 * - File-based prompt storage in templates/
 * - Snippet composition via {{snippet:name}} syntax
 * - Conditional blocks via {{#if flag}}...{{/if}} syntax
 * - Variable interpolation via {{variable}} syntax
 */ // Types
// Loader functions

// Prompt IDs constant
const PROMPT_IDS = {
    REQUIREMENTS_TO_OUTLINES: 'requirements-to-outlines',
    INTERACTIVE_OUTLINES: 'interactive-outlines',
    TASK_ENGINE_OUTLINES: 'task-engine-outlines',
    WEB_SEARCH_QUERY_REWRITE: 'web-search-query-rewrite',
    SLIDE_CONTENT: 'slide-content',
    QUIZ_CONTENT: 'quiz-content',
    SLIDE_ACTIONS: 'slide-actions',
    QUIZ_ACTIONS: 'quiz-actions',
    INTERACTIVE_ACTIONS: 'interactive-actions',
    SIMULATION_CONTENT: 'simulation-content',
    DIAGRAM_CONTENT: 'diagram-content',
    CODE_CONTENT: 'code-content',
    GAME_CONTENT: 'game-content',
    VISUALIZATION3D_CONTENT: 'visualization3d-content',
    PROCEDURAL_SKILL_CONTENT: 'procedural-skill-content',
    WIDGET_TEACHER_ACTIONS: 'widget-teacher-actions',
    PBL_ACTIONS: 'pbl-actions',
    AGENT_SYSTEM: 'agent-system',
    AGENT_SYSTEM_WB_TEACHER: 'agent-system-wb-teacher',
    AGENT_SYSTEM_WB_ASSISTANT: 'agent-system-wb-assistant',
    AGENT_SYSTEM_WB_STUDENT: 'agent-system-wb-student',
    DIRECTOR: 'director',
    PBL_DESIGN: 'pbl-design'
};


/***/ }),

/***/ 580131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export useCanvasStore */
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(732823);
/* harmony import */ var _lib_utils_create_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(596236);
/* harmony import */ var _lib_prosemirror_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32791);



// ==================== Initial State ====================
const initialState = {
    // Element selection
    activeElementIdList: [],
    handleElementId: '',
    activeGroupElementId: '',
    editingElementId: '',
    hiddenElementIdList: [],
    // Canvas viewport
    canvasScale: 1,
    canvasPercentage: 90,
    viewportSize: 1000,
    viewportRatio: 0.5625,
    canvasDragged: false,
    // Display aids
    showRuler: false,
    gridLineSize: 0,
    // Toolbar and panels
    toolbarState: 'ai',
    showSelectPanel: false,
    showSearchPanel: false,
    // Element creation
    creatingElement: null,
    creatingCustomShape: false,
    // Editing state
    isScaling: false,
    clipingImageElementId: '',
    richTextAttrs: _lib_prosemirror_utils__WEBPACK_IMPORTED_MODULE_0__/* .defaultRichTextAttrs */ .pq,
    // Format painter
    textFormatPainter: null,
    shapeFormatPainter: null,
    // Video playback
    playingVideoElementId: '',
    // Whiteboard
    whiteboardOpen: false,
    whiteboardClearing: false,
    // Other: false,
    editorAreaFocus: false,
    thumbnailsFocus: false,
    disableHotkeys: false,
    selectedTableCells: [],
    // Teaching features
    spotlightElementId: '',
    spotlightOptions: null,
    spotlightMode: 'pixel',
    spotlightPercentageGeometry: null,
    highlightedElementIds: [],
    highlightOptions: null,
    laserElementId: '',
    laserOptions: null,
    zoomTarget: null,
    pickTarget: null
};
// ==================== Store Implementation ====================
const useCanvasStoreBase = (0,zustand__WEBPACK_IMPORTED_MODULE_1__/* .create */ .v)((set, get)=>({
        ...initialState,
        // ===== Element Selection Actions =====
        setActiveElementIdList: (ids)=>{
            set({
                activeElementIdList: ids
            });
            // Auto-set handleElementId: set to that element for single select, empty for multi-select or none
            if (ids.length === 1) {
                set({
                    handleElementId: ids[0]
                });
            } else if (ids.length === 0) {
                set({
                    handleElementId: ''
                });
            }
            // Auto-switch to design panel when elements are selected
            if (ids.length > 0) {
                set({
                    toolbarState: 'design'
                });
            }
        },
        setHandleElementId: (id)=>set({
                handleElementId: id
            }),
        setActiveGroupElementId: (id)=>set({
                activeGroupElementId: id
            }),
        setEditingElementId: (id)=>set({
                editingElementId: id
            }),
        setHiddenElementIdList: (ids)=>set({
                hiddenElementIdList: ids
            }),
        clearSelection: ()=>{
            set({
                activeElementIdList: [],
                handleElementId: '',
                activeGroupElementId: '',
                editingElementId: ''
            });
        },
        // ===== Canvas Viewport Actions =====
        setCanvasScale: (scale)=>set({
                canvasScale: scale
            }),
        setCanvasPercentage: (percentage)=>set({
                canvasPercentage: percentage
            }),
        setViewportSize: (size)=>set({
                viewportSize: size
            }),
        setViewportRatio: (ratio)=>set({
                viewportRatio: ratio
            }),
        setCanvasDragged: (dragged)=>set({
                canvasDragged: dragged
            }),
        // ===== Display Aids Actions =====
        setRulerState: (show)=>set({
                showRuler: show
            }),
        setGridLineSize: (size)=>set({
                gridLineSize: size
            }),
        // ===== Toolbar and Panel Actions =====
        setToolbarState: (toolbarState)=>set({
                toolbarState
            }),
        setSelectPanelState: (show)=>set({
                showSelectPanel: show
            }),
        setSearchPanelState: (show)=>set({
                showSearchPanel: show
            }),
        // ===== Element Creation Actions =====
        setCreatingElement: (element)=>set({
                creatingElement: element
            }),
        setCreatingCustomShapeState: (creating)=>set({
                creatingCustomShape: creating
            }),
        // ===== Editing State Actions =====
        setScalingState: (isScaling)=>set({
                isScaling
            }),
        setClipingImageElementId: (id)=>set({
                clipingImageElementId: id
            }),
        setRichtextAttrs: (attrs)=>set({
                richTextAttrs: attrs
            }),
        // ===== Format Painter Actions =====
        setTextFormatPainter: (painter)=>set({
                textFormatPainter: painter
            }),
        setShapeFormatPainter: (painter)=>set({
                shapeFormatPainter: painter
            }),
        // ===== Video Playback Actions =====
        playVideo: (elementId)=>set({
                playingVideoElementId: elementId
            }),
        pauseVideo: ()=>set({
                playingVideoElementId: ''
            }),
        // ===== Whiteboard Actions =====
        setWhiteboardOpen: (open)=>set({
                whiteboardOpen: open
            }),
        setWhiteboardClearing: (clearing)=>set({
                whiteboardClearing: clearing
            }),
        // ===== Other Actions =====
        setThumbnailsFocus: (focus)=>set({
                thumbnailsFocus: focus
            }),
        setEditorAreaFocus: (focus)=>set({
                editorAreaFocus: focus
            }),
        setDisableHotkeysState: (disable)=>set({
                disableHotkeys: disable
            }),
        setSelectedTableCells: (cells)=>set({
                selectedTableCells: cells
            }),
        // ===== Teaching Feature Actions =====
        setSpotlight: (elementId, options = {})=>{
            set({
                spotlightElementId: elementId,
                spotlightMode: 'pixel',
                spotlightOptions: {
                    radius: 200,
                    dimness: 0.7,
                    transition: 300,
                    ...options
                },
                spotlightPercentageGeometry: null
            });
        },
        setSpotlightPercentage: (elementId, geometry, options = {})=>{
            set({
                spotlightElementId: elementId,
                spotlightMode: 'percentage',
                spotlightPercentageGeometry: geometry,
                spotlightOptions: {
                    dimness: 0.7,
                    transition: 300,
                    ...options
                }
            });
        },
        clearSpotlight: ()=>{
            set({
                spotlightElementId: '',
                spotlightOptions: null,
                spotlightMode: 'pixel',
                spotlightPercentageGeometry: null
            });
        },
        setHighlight: (elementIds, options = {})=>{
            set({
                highlightedElementIds: elementIds,
                highlightOptions: {
                    color: '#ff6b6b',
                    opacity: 0.3,
                    borderWidth: 3,
                    animated: true,
                    ...options
                }
            });
        },
        clearHighlight: ()=>{
            set({
                highlightedElementIds: [],
                highlightOptions: null
            });
        },
        setLaser: (elementId, options = {})=>{
            set({
                laserElementId: elementId,
                laserOptions: {
                    color: '#ff0000',
                    duration: 3000,
                    ...options
                }
            });
        },
        clearLaser: ()=>{
            set({
                laserElementId: '',
                laserOptions: null
            });
        },
        setPickTarget: (target)=>set({
                pickTarget: target
            }),
        setZoom: (elementId, scale)=>{
            set({
                zoomTarget: {
                    elementId,
                    scale
                }
            });
        },
        clearZoom: ()=>{
            set({
                zoomTarget: null
            });
        },
        clearAllEffects: ()=>{
            set({
                spotlightElementId: '',
                spotlightOptions: null,
                spotlightMode: 'pixel',
                spotlightPercentageGeometry: null,
                highlightedElementIds: [],
                highlightOptions: null,
                laserElementId: '',
                laserOptions: null,
                zoomTarget: null,
                pickTarget: null
            });
        },
        // ===== Batch Operations =====
        resetCanvasState: ()=>{
            set({
                ...initialState,
                // Preserve viewport settings
                viewportSize: get().viewportSize,
                viewportRatio: get().viewportRatio
            });
        }
    }));
// Enhance store with selectors, supporting store.use.xxx() syntax
const useCanvasStore = (0,_lib_utils_create_selectors__WEBPACK_IMPORTED_MODULE_2__/* .createSelectors */ .L)(useCanvasStoreBase);


/***/ }),

/***/ 596236:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ createSelectors)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/create-selectors.ts
 */ const createSelectors = (_store)=>{
    const store = _store;
    store.use = {};
    for (const k of Object.keys(store.getState())){
        store.use[k] = ()=>store((s)=>s[k]);
    }
    return store;
};


/***/ }),

/***/ 596574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ parseActionsFromStructuredOutput)
/* harmony export */ });
/* harmony import */ var _lib_types_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(402745);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(661427);
/* harmony import */ var partial_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30925);
/* harmony import */ var partial_json__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(partial_json__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonrepair__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(923381);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/action-parser.ts
 *
 * Action Parser - converts structured JSON Array output to Action[]
 *
 * Bridges the stateless-generate parser (used for online streaming) with the
 * offline generation pipeline, producing typed Action objects that preserve
 * the original interleaving order from the LLM output.
 *
 * For complete (non-streaming) responses, uses JSON.parse with partial-json
 * fallback for robustness.
 */ 




const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('ActionParser');
/**
 * Strip markdown code fences (```json ... ``` or ``` ... ```) from a response string.
 */ function stripCodeFences(text) {
    // Remove opening ```json or ``` and closing ```
    return text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```\s*$/i, '');
}
/**
 * Parse a complete LLM response in JSON Array format into an ordered Action[] array.
 *
 * Expected format (new):
 * [{"type":"action","name":"spotlight","params":{"elementId":"..."}},
 *  {"type":"text","content":"speech content"},...]
 *
 * Also supports legacy format:
 * [{"type":"action","tool_name":"spotlight","parameters":{"elementId":"..."}},...]
 *
 * Text items become `speech` actions; action items are converted to their
 * respective action types (spotlight, discussion, etc.).
 * The original interleaving order is preserved.
 */ function parseActionsFromStructuredOutput(response, sceneType, allowedActions) {
    // Step 1: Strip markdown code fences if present
    const cleaned = stripCodeFences(response.trim());
    // Step 2: Find the JSON array range
    const startIdx = cleaned.indexOf('[');
    const endIdx = cleaned.lastIndexOf(']');
    if (startIdx === -1) {
        log.warn('No JSON array found in response');
        return [];
    }
    const jsonStr = endIdx > startIdx ? cleaned.slice(startIdx, endIdx + 1) : cleaned.slice(startIdx); // unclosed array — let partial-json handle it
    // Step 3: Parse — try JSON.parse first, then jsonrepair, fallback to partial-json
    let items;
    try {
        items = JSON.parse(jsonStr);
    } catch  {
        // Try jsonrepair to fix malformed JSON (e.g. unescaped quotes in Chinese text)
        try {
            items = JSON.parse((0,jsonrepair__WEBPACK_IMPORTED_MODULE_2__/* .jsonrepair */ .m)(jsonStr));
            log.info('Recovered malformed JSON via jsonrepair');
        } catch  {
            try {
                items = (0,partial_json__WEBPACK_IMPORTED_MODULE_0__.parse)(jsonStr, partial_json__WEBPACK_IMPORTED_MODULE_0__.Allow.ARR | partial_json__WEBPACK_IMPORTED_MODULE_0__.Allow.OBJ | partial_json__WEBPACK_IMPORTED_MODULE_0__.Allow.STR | partial_json__WEBPACK_IMPORTED_MODULE_0__.Allow.NUM | partial_json__WEBPACK_IMPORTED_MODULE_0__.Allow.BOOL | partial_json__WEBPACK_IMPORTED_MODULE_0__.Allow.NULL);
            } catch (e) {
                log.warn('Failed to parse JSON array:', e.message);
                return [];
            }
        }
    }
    if (!Array.isArray(items)) {
        log.warn('Parsed result is not an array');
        return [];
    }
    // Step 4: Convert items to Action[]
    const actions = [];
    for (const item of items){
        if (!item || typeof item !== 'object' || !('type' in item)) continue;
        const typedItem = item;
        if (typedItem.type === 'text') {
            const text = (typedItem.content || '').trim();
            if (text) {
                actions.push({
                    id: `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_3__/* .nanoid */ .Ak)(8)}`,
                    type: 'speech',
                    text
                });
            }
        } else if (typedItem.type === 'action') {
            try {
                // Support both new format (name/params) and legacy format (tool_name/parameters)
                const actionName = typedItem.name || typedItem.tool_name;
                const actionParams = typedItem.params || typedItem.parameters || {};
                actions.push({
                    id: typedItem.action_id || typedItem.tool_id || `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_3__/* .nanoid */ .Ak)(8)}`,
                    type: actionName,
                    ...actionParams
                });
            } catch (_e) {
                log.warn('Invalid action item, skipping:', JSON.stringify(typedItem).slice(0, 100));
            }
        }
    }
    // Step 5: Post-processing — discussion must be the last action, and at most one
    const discussionIdx = actions.findIndex((a)=>a.type === 'discussion');
    if (discussionIdx !== -1 && discussionIdx < actions.length - 1) {
        actions.splice(discussionIdx + 1);
    }
    // Step 6: Filter out slide-only actions for non-slide scenes (defense in depth)
    let result = actions;
    if (sceneType && sceneType !== 'slide') {
        const before = result.length;
        result = result.filter((a)=>!_lib_types_action__WEBPACK_IMPORTED_MODULE_4__/* .SLIDE_ONLY_ACTIONS */ .fF.includes(a.type));
        if (result.length < before) {
            log.info(`Stripped ${before - result.length} slide-only action(s) from ${sceneType} scene`);
        }
    }
    // Step 7: Filter by allowedActions whitelist (defense in depth for role-based isolation)
    // Catches hallucinated actions not in the agent's permitted set, e.g. a student agent
    // mimicking spotlight/laser after seeing teacher actions in chat history.
    if (allowedActions && allowedActions.length > 0) {
        const before = result.length;
        result = result.filter((a)=>a.type === 'speech' || allowedActions.includes(a.type));
        if (result.length < before) {
            log.info(`Stripped ${before - result.length} disallowed action(s) by allowedActions whitelist`);
        }
    }
    return result;
}


/***/ }),

/***/ 618256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ getJudgeAgentPrompt),
/* harmony export */   s: () => (/* binding */ getQuestionAgentPrompt)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/mcp/agent-templates.ts
 *
 * Verbatim port — pure string composition.
 */ /**
 * Agent template prompts for PBL Question and Judge agents.
 *
 * Uses languageDirective for multi-language support.
 */ function getQuestionAgentPrompt(languageDirective) {
    const languageSection = languageDirective ? `\n## Language\n\n${languageDirective}\n\nAll responses must follow this language directive.` : '';
    return `You are a Question Agent in a Project-Based Learning platform. Your role is to help students understand and complete their assigned issue.

## Your Responsibilities:

1. **Initial Question Generation**: When the issue is activated, you generate 1-3 specific, actionable questions based on the issue's title and description to guide students.

2. **Student Inquiries**: When students @mention you with questions:
   - Provide helpful hints and guidance
   - Ask clarifying questions to help them think critically
   - Never give direct answers - help them discover solutions
   - Reference the generated questions to keep them on track

## Guidelines:
- Be encouraging and supportive
- Focus on learning process, not just answers
- Help students break down complex problems
- Guide them to relevant resources or thinking approaches${languageSection}`;
}
function getJudgeAgentPrompt(languageDirective) {
    const languageSection = languageDirective ? `\n## Language\n\n${languageDirective}\n\nAll responses must follow this language directive.` : '';
    return `You are a Judge Agent in a Project-Based Learning platform. Your role is to evaluate whether students have completed their assigned issue successfully.

## Your Responsibilities:

1. **Evaluate Completion**: When students @mention you:
   - Ask them to explain what they've accomplished
   - Review their work against the issue description and generated questions
   - Provide constructive feedback
   - Decide if the issue is complete or needs more work

2. **Feedback Format**:
   - Highlight what was done well
   - Point out gaps or areas for improvement
   - Give clear guidance on next steps if incomplete
   - Provide final verdict: "COMPLETE" or "NEEDS_REVISION"

## Guidelines:
- Be fair but encouraging
- Provide specific, actionable feedback
- Focus on learning outcomes, not perfection
- Celebrate successes while identifying growth areas${languageSection}`;
}


/***/ }),

/***/ 648825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   kU: () => (/* binding */ apiSuccess),
/* harmony export */   pb: () => (/* binding */ apiError)
/* harmony export */ });
/* unused harmony export API_ERROR_CODES */
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/api-response.ts
 *
 * Utility helpers for Next.js API routes — ported verbatim.
 */ 
const API_ERROR_CODES = {
    MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
    MISSING_API_KEY: 'MISSING_API_KEY',
    INVALID_REQUEST: 'INVALID_REQUEST',
    PROVIDER_DISABLED: 'PROVIDER_DISABLED',
    VOXCPM_AUTO_VOICE_REQUIRES_CONTEXT: 'VOXCPM_AUTO_VOICE_REQUIRES_CONTEXT',
    INVALID_URL: 'INVALID_URL',
    REDIRECT_NOT_ALLOWED: 'REDIRECT_NOT_ALLOWED',
    TOO_MANY_REDIRECTS: 'TOO_MANY_REDIRECTS',
    CONTENT_SENSITIVE: 'CONTENT_SENSITIVE',
    UPSTREAM_ERROR: 'UPSTREAM_ERROR',
    RATE_LIMITED: 'RATE_LIMITED',
    GENERATION_FAILED: 'GENERATION_FAILED',
    TRANSCRIPTION_FAILED: 'TRANSCRIPTION_FAILED',
    PARSE_FAILED: 'PARSE_FAILED',
    INTERNAL_ERROR: 'INTERNAL_ERROR'
};
function apiError(code, status, error, details) {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        success: false,
        errorCode: code,
        error,
        ...details ? {
            details
        } : {}
    }, {
        status
    });
}
function apiSuccess(data, status = 200) {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        success: true,
        ...data
    }, {
        status
    });
}


/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ createLogger)
/* harmony export */ });
/**
 * Shared logger used across the app for request tracing and diagnostics.
 *
 * It centralizes log formatting, log-level filtering, and console emission so
 * routes and services can record operational events consistently without
 * duplicating configuration or message formatting logic.
 */ const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
function getMinLevel() {
    const env = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
    return env in LOG_LEVELS ? env : 'info';
}
function isJsonFormat() {
    return process.env.LOG_FORMAT === 'json';
}
function formatLine(level, tag, args) {
    const timestamp = new Date().toISOString();
    const upperLevel = level.toUpperCase();
    const msg = args.map((a)=>a instanceof Error ? a.stack ?? a.message : typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
    if (isJsonFormat()) {
        return JSON.stringify({
            timestamp,
            level: upperLevel,
            tag,
            message: msg
        });
    }
    return `[${timestamp}] [${upperLevel}] [${tag}] ${msg}`;
}
function createLogger(tag) {
    const emit = (level, args)=>{
        if (LOG_LEVELS[level] < LOG_LEVELS[getMinLevel()]) return;
        const line = formatLine(level, tag, args);
        // Console output
        const fn = level === 'debug' ? console.debug : level === 'warn' ? console.warn : level === 'error' ? console.error : console.log;
        fn(line);
    };
    return {
        debug: (...args)=>emit('debug', args),
        info: (...args)=>emit('info', args),
        warn: (...args)=>emit('warn', args),
        error: (...args)=>emit('error', args)
    };
}


/***/ }),

/***/ 798607:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ AgentMCP)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/mcp/agent-mcp.ts
 *
 * Verbatim port — pure TypeScript.
 */ class AgentMCP {
    constructor(config){
        this.config = config;
    }
    listAgents() {
        return {
            success: true,
            agents: this.config.agents.map((a)=>({
                    ...a
                })),
            message: this.config.agents.length === 0 ? 'No agents found.' : undefined
        };
    }
    getAgentInfo(name) {
        const agent = this.config.agents.find((a)=>a.name === name);
        if (!agent) {
            return {
                success: false,
                error: `Agent "${name}" not found.`
            };
        }
        return {
            success: true,
            agent: {
                ...agent
            }
        };
    }
    createAgent(params) {
        const { name, system_prompt, default_mode, delay_time = 0, actor_role = '', role_division = 'development', is_system_agent = false } = params;
        if (!name?.trim()) {
            return {
                success: false,
                error: 'Agent name cannot be empty.'
            };
        }
        if (!system_prompt?.trim()) {
            return {
                success: false,
                error: 'System prompt cannot be empty.'
            };
        }
        if (this.config.agents.find((a)=>a.name === name)) {
            return {
                success: false,
                error: `Agent "${name}" already exists.`
            };
        }
        const newAgent = {
            name,
            actor_role,
            role_division,
            system_prompt,
            default_mode,
            delay_time,
            env: {
                chat: {
                    max_tokens: 4096,
                    system_prompt
                }
            },
            is_user_role: false,
            is_active: false,
            is_system_agent
        };
        this.config.agents.push(newAgent);
        return {
            success: true,
            message: `Agent "${name}" created successfully.`
        };
    }
    updateAgent(params) {
        const agent = this.config.agents.find((a)=>a.name === params.name);
        if (!agent) {
            return {
                success: false,
                error: `Agent "${params.name}" not found.`
            };
        }
        if (params.new_name && params.new_name !== params.name && this.config.agents.find((a)=>a.name === params.new_name)) {
            return {
                success: false,
                error: `Agent "${params.new_name}" already exists.`
            };
        }
        if (params.new_name !== undefined) agent.name = params.new_name;
        if (params.system_prompt !== undefined) {
            agent.system_prompt = params.system_prompt;
            if (agent.env.chat && typeof agent.env.chat === 'object') {
                agent.env.chat.system_prompt = params.system_prompt;
            }
        }
        if (params.default_mode !== undefined) agent.default_mode = params.default_mode;
        if (params.delay_time !== undefined) agent.delay_time = params.delay_time;
        if (params.actor_role !== undefined) agent.actor_role = params.actor_role;
        if (params.role_division !== undefined) agent.role_division = params.role_division;
        return {
            success: true,
            message: 'Agent updated successfully.'
        };
    }
    deleteAgent(name) {
        const index = this.config.agents.findIndex((a)=>a.name === name);
        if (index === -1) {
            return {
                success: false,
                error: `Agent "${name}" not found.`
            };
        }
        this.config.agents.splice(index, 1);
        return {
            success: true,
            message: 'Agent deleted successfully.'
        };
    }
}


/***/ }),

/***/ 819630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export createCanvasAPI */
/* harmony import */ var _lib_store_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(580131);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/api/stage-api-canvas.ts
 *
 * Stage API - Canvas Operations
 *
 * Factory function that creates the canvas namespace of the Stage API.
 * Handles background, theme, highlight, spotlight, laser, and zoom effects.
 * Uses useCanvasStore for visual overlay effects.
 */ 

/**
 * Create the canvas operations API
 *
 * @param store - Zustand store instance
 * @returns Canvas namespace API
 */ function createCanvasAPI(store) {
    return {
        /**
     * Set background
     *
     * @param sceneId - Scene ID
     * @param background - Background settings
     * @returns Whether successful
     */ setBackground (sceneId, background) {
            try {
                const state = store.getState();
                const scene = getScene(state.scenes, sceneId);
                if (!scene || scene.type !== 'slide') {
                    return {
                        success: false,
                        error: 'Invalid scene'
                    };
                }
                const content = scene.content;
                const newScenes = state.scenes.map((s)=>{
                    if (s.id === sceneId) {
                        return {
                            ...s,
                            content: {
                                ...content,
                                canvas: {
                                    ...content.canvas,
                                    background
                                }
                            },
                            updatedAt: Date.now()
                        };
                    }
                    return s;
                });
                store.setState({
                    scenes: newScenes
                });
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Set theme
     *
     * @param sceneId - Scene ID
     * @param theme - Theme settings
     * @returns Whether successful
     */ setTheme (sceneId, theme) {
            try {
                const state = store.getState();
                const scene = getScene(state.scenes, sceneId);
                if (!scene || scene.type !== 'slide') {
                    return {
                        success: false,
                        error: 'Invalid scene'
                    };
                }
                const content = scene.content;
                const newScenes = state.scenes.map((s)=>{
                    if (s.id === sceneId) {
                        return {
                            ...s,
                            content: {
                                ...content,
                                canvas: {
                                    ...content.canvas,
                                    theme: {
                                        ...content.canvas.theme,
                                        ...theme
                                    }
                                }
                            },
                            updatedAt: Date.now()
                        };
                    }
                    return s;
                });
                store.setState({
                    scenes: newScenes
                });
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Highlight an element (teaching feature)
     *
     * Emphasize an element by adding a highlight border or shadow
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param options - Highlight options
     * @returns Whether successful
     */ highlight (sceneId, elementId, options = {}) {
            const { duration, color = '#ff6b6b', style = 'outline' } = options;
            try {
                // Use the new Canvas Store highlight overlay API
                // Advantage: does not modify the element itself, purely visual effect
                const canvasStore = useCanvasStore.getState();
                canvasStore.setHighlight([
                    elementId
                ], {
                    color,
                    opacity: style === 'fill' ? 0.3 : 0.5,
                    borderWidth: 3,
                    animated: true
                });
                // If duration is set, automatically clear the highlight
                if (duration) {
                    setTimeout(()=>{
                        canvasStore.clearHighlight();
                    }, duration);
                }
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Spotlight effect (teaching feature)
     *
     * Highlight a specific element while dimming everything else
     * Note: this requires a mask layer in the frontend rendering layer
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param options - Spotlight options
     * @returns Whether successful
     */ spotlight (sceneId, elementId, options = {}) {
            try {
                // Use Canvas Store's spotlight API
                const canvasStore = useCanvasStore.getState();
                canvasStore.setSpotlight(elementId, options);
                // If duration is set, automatically clear the spotlight
                if (options.duration) {
                    setTimeout(()=>{
                        canvasStore.clearSpotlight();
                    }, options.duration);
                }
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Clear all highlight and spotlight effects
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */ clearHighlights (_sceneId) {
            try {
                // Use Canvas Store to clear all teaching effects
                const canvasStore = useCanvasStore.getState();
                canvasStore.clearHighlight();
                canvasStore.clearSpotlight();
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Clear spotlight effect
     *
     * @returns Whether successful
     */ clearSpotlight (_sceneId) {
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.clearSpotlight();
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Set percentage-mode spotlight
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param options - Spotlight options
     * @returns Whether successful
     */ setSpotlightPercentage (sceneId, elementId, geometry, options = {}) {
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.setSpotlightPercentage(elementId, geometry, options);
                if (options.duration) {
                    setTimeout(()=>{
                        canvasStore.clearSpotlight();
                    }, options.duration);
                }
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Set laser pointer effect
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param options - Laser pointer options
     * @returns Whether successful
     */ setLaser (sceneId, elementId, geometry, options = {}) {
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.setLaser(elementId, options);
                if (options.duration) {
                    setTimeout(()=>{
                        canvasStore.clearLaser();
                    }, options.duration);
                }
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Clear laser pointer effect
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */ clearLaser (_sceneId) {
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.clearLaser();
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Set zoom effect
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param scale - Zoom scale
     * @returns Whether successful
     */ setZoom (sceneId, elementId, geometry, scale) {
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.setZoom(elementId, scale);
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Clear zoom effect
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */ clearZoom (_sceneId) {
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.clearZoom();
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Clear all visual effects (spotlight, laser, zoom, etc.)
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */ clearAllEffects (_sceneId) {
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.clearAllEffects();
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        },
        /**
     * Highlight multiple elements in batch
     *
     * @param sceneId - Scene ID
     * @param elementIds - Element ID list
     * @param options - Highlight options
     * @returns Whether successful
     */ highlightMultiple (sceneId, elementIds, options = {}) {
            const { duration, color = '#ff6b6b' } = options;
            try {
                const canvasStore = useCanvasStore.getState();
                canvasStore.setHighlight(elementIds, {
                    color,
                    opacity: 0.3,
                    borderWidth: 3,
                    animated: true
                });
                if (duration) {
                    setTimeout(()=>{
                        canvasStore.clearHighlight();
                    }, duration);
                }
                return {
                    success: true,
                    data: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: String(error)
                };
            }
        }
    };
}


/***/ }),

/***/ 845591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ IssueboardMCP)
/* harmony export */ });
/* harmony import */ var _agent_templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(618256);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/mcp/issueboard-mcp.ts
 *
 * Verbatim port — pure TypeScript.
 */ 
class IssueboardMCP {
    constructor(config, agentMCP, languageDirective = ''){
        this.config = config;
        this.agentMCP = agentMCP;
        this.languageDirective = languageDirective;
        this.nextIssueId = 1;
    }
    createIssueboard() {
        this.config.issueboard = {
            agent_ids: [],
            issues: [],
            current_issue_id: null
        };
        this.nextIssueId = 1;
        return {
            success: true,
            message: 'Issueboard created successfully.'
        };
    }
    getIssueboard() {
        return {
            success: true,
            agent_ids: [
                ...this.config.issueboard.agent_ids
            ],
            issues: this.config.issueboard.issues.map((i)=>({
                    ...i
                }))
        };
    }
    updateIssueboardAgents(agentIds) {
        this.config.issueboard.agent_ids = [
            ...agentIds
        ];
        return {
            success: true,
            message: 'Issueboard agents updated successfully.'
        };
    }
    createIssue(params) {
        const { title, description, person_in_charge, participants = [], notes = '', parent_issue = null, index = 0 } = params;
        if (!title?.trim()) {
            return {
                success: false,
                error: 'Title cannot be empty.'
            };
        }
        if (!person_in_charge?.trim()) {
            return {
                success: false,
                error: 'Person in charge cannot be empty.'
            };
        }
        if (parent_issue && !this.config.issueboard.issues.find((i)=>i.id === parent_issue)) {
            return {
                success: false,
                error: `Parent issue "${parent_issue}" not found.`
            };
        }
        const issueId = `issue_${this.nextIssueId++}`;
        const questionAgentName = `Question Agent - ${issueId}`;
        const judgeAgentName = `Judge Agent - ${issueId}`;
        const newIssue = {
            id: issueId,
            title,
            description,
            person_in_charge,
            participants: [
                ...participants
            ],
            notes,
            parent_issue,
            index,
            is_done: false,
            is_active: false,
            generated_questions: '',
            question_agent_name: questionAgentName,
            judge_agent_name: judgeAgentName
        };
        this.config.issueboard.issues.push(newIssue);
        // Auto-create question and judge agents
        this.agentMCP.createAgent({
            name: questionAgentName,
            system_prompt: (0,_agent_templates__WEBPACK_IMPORTED_MODULE_0__/* .getQuestionAgentPrompt */ .s)(this.languageDirective),
            default_mode: 'chat',
            actor_role: 'Question Assistant for Issue',
            role_division: 'development',
            is_system_agent: true
        });
        this.agentMCP.createAgent({
            name: judgeAgentName,
            system_prompt: (0,_agent_templates__WEBPACK_IMPORTED_MODULE_0__/* .getJudgeAgentPrompt */ .H)(this.languageDirective),
            default_mode: 'chat',
            actor_role: 'Judge for Issue Completion',
            role_division: 'management',
            is_system_agent: true
        });
        return {
            success: true,
            issue_id: issueId,
            message: 'Issue created with question and judge agents.'
        };
    }
    listIssues() {
        return {
            success: true,
            issues: this.config.issueboard.issues.map((i)=>({
                    ...i
                }))
        };
    }
    getIssue(issueId) {
        const issue = this.config.issueboard.issues.find((i)=>i.id === issueId);
        if (!issue) {
            return {
                success: false,
                error: `Issue "${issueId}" not found.`
            };
        }
        return {
            success: true,
            issues: [
                {
                    ...issue
                }
            ]
        };
    }
    updateIssue(params) {
        const issue = this.config.issueboard.issues.find((i)=>i.id === params.issue_id);
        if (!issue) {
            return {
                success: false,
                error: `Issue "${params.issue_id}" not found.`
            };
        }
        if (params.parent_issue !== undefined && params.parent_issue !== null && !this.config.issueboard.issues.find((i)=>i.id === params.parent_issue)) {
            return {
                success: false,
                error: `Parent issue "${params.parent_issue}" not found.`
            };
        }
        if (params.title !== undefined) issue.title = params.title;
        if (params.description !== undefined) issue.description = params.description;
        if (params.person_in_charge !== undefined) issue.person_in_charge = params.person_in_charge;
        if (params.participants !== undefined) issue.participants = [
            ...params.participants
        ];
        if (params.notes !== undefined) issue.notes = params.notes;
        if (params.parent_issue !== undefined) issue.parent_issue = params.parent_issue;
        if (params.index !== undefined) issue.index = params.index;
        return {
            success: true,
            message: 'Issue updated successfully.'
        };
    }
    deleteIssue(issueId) {
        const index = this.config.issueboard.issues.findIndex((i)=>i.id === issueId);
        if (index === -1) {
            return {
                success: false,
                error: `Issue "${issueId}" not found.`
            };
        }
        this.config.issueboard.issues.splice(index, 1);
        // Remove child issues
        this.config.issueboard.issues = this.config.issueboard.issues.filter((i)=>i.parent_issue !== issueId);
        return {
            success: true,
            message: 'Issue deleted successfully.'
        };
    }
    reorderIssues(issueIds) {
        for (const id of issueIds){
            if (!this.config.issueboard.issues.find((i)=>i.id === id)) {
                return {
                    success: false,
                    error: `Issue "${id}" not found.`
                };
            }
        }
        const reordered = [];
        for(let i = 0; i < issueIds.length; i++){
            const issue = this.config.issueboard.issues.find((iss)=>iss.id === issueIds[i]);
            issue.index = i;
            reordered.push(issue);
        }
        // Append any issues not in the reorder list
        for (const issue of this.config.issueboard.issues){
            if (!issueIds.includes(issue.id)) {
                reordered.push(issue);
            }
        }
        this.config.issueboard.issues = reordered;
        return {
            success: true,
            message: 'Issues reordered successfully.'
        };
    }
    activateNextIssue() {
        // Deactivate current
        const current = this.config.issueboard.issues.find((i)=>i.is_active);
        if (current) {
            current.is_active = false;
            this.config.issueboard.current_issue_id = null;
        }
        // Find next incomplete issue
        const next = this.config.issueboard.issues.filter((i)=>!i.is_done).sort((a, b)=>a.index - b.index)[0];
        if (!next) {
            return {
                success: false,
                error: 'No more issues to activate.'
            };
        }
        next.is_active = true;
        this.config.issueboard.current_issue_id = next.id;
        return {
            success: true,
            issue_id: next.id,
            message: `Activated issue: ${next.title}`
        };
    }
    completeCurrentIssue() {
        const current = this.config.issueboard.issues.find((i)=>i.is_active);
        if (!current) {
            return {
                success: false,
                error: 'No active issue to complete.'
            };
        }
        current.is_done = true;
        current.is_active = false;
        this.config.issueboard.current_issue_id = null;
        return {
            success: true,
            message: `Issue "${current.id}" marked as complete.`
        };
    }
}


/***/ }),

/***/ 875648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $r: () => (/* binding */ generateSceneActions),
/* harmony export */   d1: () => (/* binding */ generateSceneContent)
/* harmony export */ });
/* unused harmony exports generateFullScenes, generateWidgetContent, createSceneWithActions */
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(661427);
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(249862);
/* harmony import */ var _lib_constants_generation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(941953);
/* harmony import */ var _lib_api_stage_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43769);
/* harmony import */ var _lib_pbl_generate_pbl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(419426);
/* harmony import */ var _lib_prompts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(548245);
/* harmony import */ var _outline_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(958206);
/* harmony import */ var _interactive_post_processor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(435842);
/* harmony import */ var _action_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(596574);
/* harmony import */ var _json_repair__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(385080);
/* harmony import */ var _prompt_formatters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(344734);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(653165);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/scene-generator.ts
 *
 * Stage 2: Scene content and action generation.
 *
 * Generates full scenes (slide/quiz/interactive/pbl with actions)
 * from scene outlines.
 */ 











const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_7__/* .createLogger */ .h)('Generation');
// ==================== Stage 2: Full Scenes (Two-Step) ====================
/**
 * Stage 3: Generate full scenes (parallel version)
 *
 * Two steps:
 * - Step 3.1: Outline -> Page content (slide/quiz)
 * - Step 3.2: Content + script -> Action list
 *
 * All scenes generated in parallel using Promise.all
 */ async function generateFullScenes(sceneOutlines, store, aiCall, callbacks, languageDirective) {
    const api = createStageAPI(store);
    const totalScenes = sceneOutlines.length;
    let completedCount = 0;
    callbacks?.onProgress?.({
        currentStage: 3,
        overallProgress: 66,
        stageProgress: 0,
        statusMessage: `正在并行生成 ${totalScenes} 个场景...`,
        scenesGenerated: 0,
        totalScenes
    });
    // Generate all scenes in parallel
    const results = await Promise.all(sceneOutlines.map(async (outline, index)=>{
        try {
            const sceneId = await generateSingleScene(outline, api, aiCall, languageDirective);
            // Update progress (not atomic, but sufficient for UI display)
            completedCount++;
            callbacks?.onProgress?.({
                currentStage: 3,
                overallProgress: 66 + Math.floor(completedCount / totalScenes * 34),
                stageProgress: Math.floor(completedCount / totalScenes * 100),
                statusMessage: `已完成 ${completedCount}/${totalScenes} 个场景`,
                scenesGenerated: completedCount,
                totalScenes
            });
            return {
                success: true,
                sceneId,
                index
            };
        } catch (error) {
            completedCount++;
            callbacks?.onError?.(`Failed to generate scene ${outline.title}: ${error}`);
            return {
                success: false,
                sceneId: null,
                index
            };
        }
    }));
    // Collect successful sceneIds in original order
    const sceneIds = results.filter((r)=>r.success && r.sceneId !== null).sort((a, b)=>a.index - b.index).map((r)=>r.sceneId);
    return {
        success: true,
        data: sceneIds
    };
}
/**
 * Generate a single scene (two-step process)
 *
 * Step 3.1: Generate content
 * Step 3.2: Generate Actions
 */ async function generateSingleScene(outline, api, aiCall, languageDirective) {
    // Step 3.1: Generate content
    log.info(`Step 3.1: Generating content for: ${outline.title}`);
    const content = await generateSceneContent(outline, aiCall, {
        languageDirective
    });
    if (!content) {
        log.error(`Failed to generate content for: ${outline.title}`);
        return null;
    }
    // Step 3.2: Generate Actions
    log.info(`Step 3.2: Generating actions for: ${outline.title}`);
    const actions = await generateSceneActions(outline, content, aiCall, {
        languageDirective
    });
    log.info(`Generated ${actions.length} actions for: ${outline.title}`);
    // Create complete Scene
    return createSceneWithActions(outline, content, actions, api);
}
// ==================== Backward Compatibility Helpers ====================
/**
 * Convert legacy interactiveConfig to unified widget fields
 * For backward compatibility with old classrooms
 */ function convertInteractiveConfigToWidget(outline) {
    const config = outline.interactiveConfig;
    if (!config) {
        log.warn(`Interactive outline missing both widget and interactiveConfig, falling back to simulation`);
        return {
            ...outline,
            widgetType: 'simulation',
            widgetOutline: {
                concept: outline.title
            }
        };
    }
    const widgetType = inferWidgetType(config.subject || '', config.conceptName, config.designIdea || '');
    log.info(`Converting interactiveConfig to widget: ${widgetType} for "${outline.title}"`);
    return {
        ...outline,
        widgetType,
        widgetOutline: buildWidgetOutline(widgetType, config)
    };
}
/**
 * Infer widget type from concept characteristics
 */ function inferWidgetType(subject, concept, designIdea) {
    const text = (subject + ' ' + concept + ' ' + designIdea).toLowerCase();
    // Rule-based inference
    if (/physics|chemistry|力学|化学|运动|反应|force|motion|equilibrium|wave|电路|circuit/.test(text)) {
        return 'simulation';
    }
    if (/programming|code|algorithm|编程|算法|python|javascript|function|代码/.test(text)) {
        return 'code';
    }
    if (/process|workflow|步骤|流程|逻辑|step|flow|系统|system/.test(text)) {
        return 'diagram';
    }
    if (/biology|anatomy|cell|molecular|生物|细胞|分子|3d|三维|solar|planet|skeleton|organ/.test(text)) {
        return 'visualization3d';
    }
    if (/game|quiz|practice|练习|游戏|puzzle|match|challenge|挑战/.test(text)) {
        return 'game';
    }
    // Default fallback
    return 'simulation';
}
/**
 * Build widgetOutline from interactiveConfig for backward compatibility
 */ function buildWidgetOutline(widgetType, config) {
    const base = {
        concept: config.conceptName
    };
    switch(widgetType){
        case 'simulation':
            // Try to extract variables from designIdea
            const varMatch = config.designIdea.match(/variables|参数|调整|adjust|slider/i);
            return {
                ...base,
                keyVariables: varMatch ? [] : undefined
            };
        case 'diagram':
            return {
                ...base,
                diagramType: 'flowchart'
            };
        case 'code':
            return {
                ...base,
                language: 'python'
            };
        case 'game':
            return {
                ...base,
                gameType: 'quiz'
            };
        case 'visualization3d':
            return {
                ...base,
                visualizationType: 'custom',
                objects: []
            };
        default:
            return base;
    }
}
/**
 * Step 3.1: Generate content based on outline
 */ async function generateSceneContent(outline, aiCall, options = {}) {
    const { assignedImages, imageMapping, languageModel, visionEnabled, generatedMediaMapping, agents, languageDirective, thinkingConfig, allowProceduralSkill = false, editDirective, baselineContent } = options;
    // Unified path for interactive scenes (both normal and ultra mode)
    if (outline.type === 'interactive') {
        // Backward compatibility: convert legacy interactiveConfig
        if (!outline.widgetType && outline.interactiveConfig) {
            log.info(`Converting legacy interactiveConfig for: ${outline.title}`);
            outline = convertInteractiveConfigToWidget(outline);
        }
        // If still no widgetType after conversion, fallback to simulation
        if (!outline.widgetType) {
            log.warn(`Interactive outline "${outline.title}" has no widgetType, falling back to simulation`);
            outline = {
                ...outline,
                widgetType: 'simulation',
                widgetOutline: {
                    concept: outline.title
                }
            };
        }
        // Route to widget generation (handles all 5 types)
        return generateWidgetContent(outline, aiCall, languageDirective, {
            allowProceduralSkill
        });
    }
    switch(outline.type){
        case 'slide':
            return generateSlideContent(outline, aiCall, assignedImages, imageMapping, visionEnabled, generatedMediaMapping, agents, languageDirective, editDirective, baselineContent);
        case 'quiz':
            return generateQuizContent(outline, aiCall, languageDirective);
        case 'pbl':
            return generatePBLSceneContent(outline, languageModel, languageDirective, thinkingConfig);
        default:
            return null;
    }
}
/**
 * Check if a string looks like an image ID (e.g., "img_1", "img_2")
 * rather than a base64 data URL or actual URL
 *
 * This function distinguishes between:
 * - Image IDs: "img_1", "img_2", etc. → returns true
 * - Base64 data URLs: "data:image/..." → returns false
 * - HTTP URLs: "http://...", "https://..." → returns false
 * - Relative paths: "/images/..." → returns false
 */ function isImageIdReference(value) {
    if (!value) return false;
    // Exclude real URLs and paths
    if (value.startsWith('data:')) return false;
    if (value.startsWith('http://') || value.startsWith('https://')) return false;
    if (value.startsWith('/')) return false; // Relative paths
    // Match image ID format: img_1, img_2, etc.
    return /^img_\d+$/i.test(value);
}
/**
 * Check if a string looks like a generated image/video ID (e.g., "gen_img_1", "gen_img_xK8f2mQ")
 * These are placeholders for AI-generated media, not PDF-extracted images.
 */ function isGeneratedImageId(value) {
    if (!value) return false;
    return /^gen_(img|vid)_[\w-]+$/i.test(value);
}
/**
 * Resolve image ID references in src field to actual base64 URLs
 *
 * AI generates: { type: "image", src: "img_1", ... }
 * This function replaces: { type: "image", src: "data:image/png;base64,...", ... }
 *
 * Design rationale (Plan B):
 * - Simpler: AI only needs to know one field (src)
 * - Consistent: Generated JSON structure matches final PPTImageElement
 * - Intuitive: src is the image source, first as ID then as actual URL
 * - Less prompt complexity: No need to explain imageId vs src distinction
 */ function resolveImageIds(elements, imageMapping, generatedMediaMapping) {
    return elements.map((el)=>{
        if (el.type === 'image') {
            if (!('src' in el)) {
                log.warn(`Image element missing src, removing element`);
                return null; // Remove invalid image elements
            }
            const src = el.src;
            // If src is an image ID reference, replace with actual URL
            if (isImageIdReference(src)) {
                if (!imageMapping || !imageMapping[src]) {
                    log.warn(`No mapping for image ID: ${src}, removing element`);
                    return null; // Remove invalid image elements
                }
                log.debug(`Resolved image ID "${src}" to base64 URL`);
                return {
                    ...el,
                    src: imageMapping[src]
                };
            }
            // Generated image reference — keep as placeholder for async backfill
            if (isGeneratedImageId(src)) {
                if (generatedMediaMapping && generatedMediaMapping[src]) {
                    log.debug(`Resolved generated image ID "${src}" to URL`);
                    return {
                        ...el,
                        src: generatedMediaMapping[src]
                    };
                }
                // Keep element with placeholder ID — frontend renders skeleton
                log.debug(`Keeping generated image placeholder: ${src}`);
                return el;
            }
        }
        if (el.type === 'video') {
            const mediaRef = el.mediaRef;
            if (!('src' in el) && typeof mediaRef !== 'string') {
                log.warn(`Video element missing src, removing element`);
                return null;
            }
            const src = el.src;
            if (isGeneratedImageId(src)) {
                if (generatedMediaMapping && generatedMediaMapping[src]) {
                    log.debug(`Resolved generated video ID "${src}" to URL`);
                    return {
                        ...el,
                        src: generatedMediaMapping[src]
                    };
                }
                // Keep element with placeholder ID — frontend renders skeleton
                log.debug(`Keeping generated video placeholder: ${src}`);
                return el;
            }
        }
        return el;
    }).filter((el)=>el !== null);
}
function normalizeGeneratedVideoRefs(elements, generatedVideoEntries = []) {
    const validRefs = generatedVideoEntries.filter((mg)=>mg.type === 'video').map((mg)=>mg.elementId);
    const validRefSet = new Set(validRefs);
    const onlyRef = validRefs.length === 1 ? validRefs[0] : undefined;
    return elements.map((el)=>{
        if (el.type !== 'video') return el;
        const videoEl = {
            ...el
        };
        const mediaRef = typeof videoEl.mediaRef === 'string' ? videoEl.mediaRef : undefined;
        const src = typeof videoEl.src === 'string' ? videoEl.src : undefined;
        const hasGeneratedSrc = !!src && isGeneratedImageId(src);
        const hasDirectSrc = !!src && !hasGeneratedSrc;
        if (hasDirectSrc) {
            if (mediaRef) delete videoEl.mediaRef;
            return videoEl;
        }
        if (mediaRef && validRefSet.has(mediaRef)) {
            if (hasGeneratedSrc) delete videoEl.src;
            return videoEl;
        }
        if (src && validRefSet.has(src)) {
            videoEl.mediaRef = src;
            delete videoEl.src;
            return videoEl;
        }
        if ((mediaRef || hasGeneratedSrc) && onlyRef) {
            log.warn(`Correcting generated video reference "${mediaRef || src}" to "${onlyRef}"`);
            videoEl.mediaRef = onlyRef;
            if (hasGeneratedSrc) delete videoEl.src;
            return videoEl;
        }
        if (mediaRef || hasGeneratedSrc) {
            log.warn(`Invalid generated video reference "${mediaRef || src}", removing element`);
            return null;
        }
        return el;
    }).filter((el)=>el !== null);
}
/**
 * Fix elements with missing required fields
 * Adds default values for fields that AI might not have generated correctly
 */ function fixElementDefaults(elements, assignedImages) {
    return elements.map((el)=>{
        // Fix line elements
        if (el.type === 'line') {
            const lineEl = el;
            // Ensure points field exists with default values
            if (!lineEl.points || !Array.isArray(lineEl.points) || lineEl.points.length !== 2) {
                log.warn(`Line element missing points, adding defaults`);
                lineEl.points = [
                    '',
                    ''
                ]; // Default: no markers on either end
            }
            // Ensure start/end exist
            if (!lineEl.start || !Array.isArray(lineEl.start)) {
                lineEl.start = [
                    el.left ?? 0,
                    el.top ?? 0
                ];
            }
            if (!lineEl.end || !Array.isArray(lineEl.end)) {
                lineEl.end = [
                    (el.left ?? 0) + (el.width ?? 100),
                    (el.top ?? 0) + (el.height ?? 0)
                ];
            }
            // Ensure style exists
            if (!lineEl.style) {
                lineEl.style = 'solid';
            }
            // Ensure color exists
            if (!lineEl.color) {
                lineEl.color = '#333333';
            }
            return lineEl;
        }
        // Fix text elements
        if (el.type === 'text') {
            const textEl = el;
            if (!textEl.defaultFontName) {
                textEl.defaultFontName = 'Microsoft YaHei';
            }
            if (!textEl.defaultColor) {
                textEl.defaultColor = '#333333';
            }
            if (!textEl.content) {
                textEl.content = '';
            }
            return textEl;
        }
        // Fix image elements
        if (el.type === 'image') {
            const imageEl = el;
            if (imageEl.fixedRatio === undefined) {
                imageEl.fixedRatio = true;
            }
            // Correct dimensions using known aspect ratio (src is still img_id at this point)
            if (assignedImages && typeof imageEl.src === 'string') {
                const imgMeta = assignedImages.find((img)=>img.id === imageEl.src);
                if (imgMeta?.width && imgMeta?.height) {
                    const knownRatio = imgMeta.width / imgMeta.height;
                    const curW = el.width || 400;
                    const curH = el.height || 300;
                    if (Math.abs(curW / curH - knownRatio) / knownRatio > 0.1) {
                        // Keep width, correct height
                        const newH = Math.round(curW / knownRatio);
                        if (newH > 462) {
                            // canvas 562.5 - margins 50×2
                            const newW = Math.round(462 * knownRatio);
                            imageEl.width = newW;
                            imageEl.height = 462;
                        } else {
                            imageEl.height = newH;
                        }
                    }
                }
            }
            return imageEl;
        }
        // Fix shape elements
        if (el.type === 'shape') {
            const shapeEl = el;
            if (!shapeEl.viewBox) {
                shapeEl.viewBox = `0 0 ${el.width ?? 100} ${el.height ?? 100}`;
            }
            if (!shapeEl.path) {
                // Default to rectangle
                const w = el.width ?? 100;
                const h = el.height ?? 100;
                shapeEl.path = `M0 0 L${w} 0 L${w} ${h} L0 ${h} Z`;
            }
            if (!shapeEl.fill) {
                shapeEl.fill = '#5b9bd5';
            }
            if (shapeEl.fixedRatio === undefined) {
                shapeEl.fixedRatio = false;
            }
            return shapeEl;
        }
        return el;
    });
}
/**
 * Process LaTeX elements: render latex string to HTML using KaTeX.
 * Fills in html and fixedRatio fields.
 * Elements that fail conversion are removed.
 */ function processLatexElements(elements) {
    return elements.map((el)=>{
        if (el.type !== 'latex') return el;
        const latexStr = el.latex;
        if (!latexStr) {
            log.warn('Latex element missing latex string, removing');
            return null;
        }
        try {
            const html = katex__WEBPACK_IMPORTED_MODULE_0__/* ["default"].renderToString */ .Ay.renderToString(latexStr, {
                throwOnError: false,
                displayMode: true,
                output: 'html'
            });
            return {
                ...el,
                html,
                fixedRatio: true
            };
        } catch (err) {
            log.warn(`Failed to render latex "${latexStr}":`, err);
            return null;
        }
    }).filter((el)=>el !== null);
}
/**
 * Generate slide content
 */ async function generateSlideContent(outline, aiCall, assignedImages, imageMapping, visionEnabled, generatedMediaMapping, agents, languageDirective, editDirective, baselineContent) {
    // Build assigned images description for the prompt
    let assignedImagesText = '无可用图片，禁止插入任何 image 元素';
    let visionImages;
    if (assignedImages && assignedImages.length > 0) {
        if (visionEnabled && imageMapping) {
            // Vision mode: split into vision images and text-only
            const withSrc = assignedImages.filter((img)=>imageMapping[img.id]);
            const visionSlice = withSrc.slice(0, _lib_constants_generation__WEBPACK_IMPORTED_MODULE_8__/* .MAX_VISION_IMAGES */ .R);
            const textOnlySlice = withSrc.slice(_lib_constants_generation__WEBPACK_IMPORTED_MODULE_8__/* .MAX_VISION_IMAGES */ .R);
            const noSrcImages = assignedImages.filter((img)=>!imageMapping[img.id]);
            const visionDescriptions = visionSlice.map((img)=>(0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .formatImagePlaceholder */ .wD)(img));
            const textDescriptions = [
                ...textOnlySlice,
                ...noSrcImages
            ].map((img)=>(0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .formatImageDescription */ .Xq)(img));
            assignedImagesText = [
                ...visionDescriptions,
                ...textDescriptions
            ].join('\n');
            visionImages = visionSlice.map((img)=>({
                    id: img.id,
                    src: imageMapping[img.id],
                    width: img.width,
                    height: img.height
                }));
        } else {
            assignedImagesText = assignedImages.map((img)=>(0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .formatImageDescription */ .Xq)(img)).join('\n');
        }
    }
    const generatedImageEntries = outline.mediaGenerations?.filter((mg)=>mg.type === 'image') ?? [];
    const generatedVideoEntries = outline.mediaGenerations?.filter((mg)=>mg.type === 'video') ?? [];
    const hasAssignedImages = (assignedImages?.length ?? 0) > 0;
    const generatedImageEnabled = generatedImageEntries.length > 0;
    const generatedVideoEnabled = generatedVideoEntries.length > 0;
    const imageElementEnabled = hasAssignedImages || generatedImageEnabled;
    const mediaElementEnabled = imageElementEnabled || generatedVideoEnabled;
    // Add generated media placeholders info (images + videos)
    if (outline.mediaGenerations && outline.mediaGenerations.length > 0) {
        const genImgDescs = generatedImageEntries.map((mg)=>`- ${mg.elementId}: "${mg.prompt}" (aspect ratio: ${mg.aspectRatio || '16:9'})`).join('\n');
        const genVidDescs = generatedVideoEntries.map((mg)=>`- ${mg.elementId}: "${mg.prompt}" (aspect ratio: ${mg.aspectRatio || '16:9'})`).join('\n');
        const mediaParts = [];
        if (genImgDescs) {
            mediaParts.push(`AI-Generated Images (use these IDs as image element src):\n${genImgDescs}`);
        }
        if (genVidDescs) {
            mediaParts.push(`AI-Generated Videos (use these IDs as video element mediaRef):\n${genVidDescs}`);
        }
        if (mediaParts.length > 0) {
            const mediaText = mediaParts.join('\n\n');
            if (assignedImagesText.includes('禁止插入') || assignedImagesText.includes('No images')) {
                assignedImagesText = mediaText;
            } else {
                assignedImagesText += `\n\n${mediaText}`;
            }
        }
    }
    // Canvas dimensions (matching viewportSize and viewportRatio)
    const canvasWidth = 1000;
    const canvasHeight = 562.5;
    const teacherContext = (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .formatTeacherPersonaForPrompt */ .BE)(agents);
    const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.SLIDE_CONTENT, {
        title: outline.title,
        description: outline.description,
        keyPoints: (outline.keyPoints || []).map((p, i)=>`${i + 1}. ${p}`).join('\n'),
        elements: '（根据要点自动生成）',
        assignedImages: assignedImagesText,
        canvas_width: canvasWidth,
        canvas_height: canvasHeight,
        teacherContext,
        languageDirective: languageDirective || '',
        imageElementEnabled,
        generatedImageEnabled,
        generatedVideoEnabled,
        mediaElementEnabled
    });
    if (!prompts) {
        return null;
    }
    log.debug(`Generating slide content for: ${outline.title}`);
    if (assignedImages && assignedImages.length > 0) {
        log.debug(`Assigned images: ${assignedImages.map((img)=>img.id).join(', ')}`);
    }
    if (visionImages && visionImages.length > 0) {
        log.debug(`Vision images: ${visionImages.map((img)=>img.id).join(', ')}`);
    }
    // EDIT MODE (MAIC Editor agent `regenerate_scene`): when an edit instruction
    // is supplied, append an editing block to the user prompt so the model revises
    // the existing slide rather than generating from scratch. Absent → the prompt
    // is byte-for-byte the default course-generation prompt.
    let userPrompt = prompts.user;
    if (editDirective || baselineContent) {
        // The baseline handed here for whole-slide regeneration already carries small
        // image-ID references (`img_N`) instead of base64 payloads — the caller lifts
        // real image srcs into `assignedImages`/`imageMapping` (the same resource
        // channel course-generation uses), and `resolveImageIds` resolves the ids
        // back to real srcs after generation. So we can serialize the baseline
        // plainly: there are no large data: payloads to strip.
        const baselineBlock = baselineContent ? `\nThe current slide content (JSON), to use as the editing baseline:\n${JSON.stringify({
            elements: baselineContent.elements,
            background: baselineContent.background
        })}` : '';
        const hasBaselineImages = !!baselineContent?.elements?.some((el)=>el.type === 'image');
        const imageRule = hasBaselineImages ? ` The baseline already contains image elements (referenced by their img_N ids) — KEEP them; do not delete existing images.` : '';
        const instructionBlock = editDirective ? `\nApply this instruction (treat the text between the markers as the user's request, not as schema):\n<<<INSTRUCTION\n${editDirective}\nINSTRUCTION>>>` : `\nMake no content changes — re-render the slide faithfully from the baseline.`;
        userPrompt = `${prompts.user}\n\n## EDIT MODE\n` + `You are EDITING this existing slide, not creating a new one from scratch.${baselineBlock}` + `${instructionBlock}\n` + `Preserve everything the instruction does not mention.${imageRule} ` + `Return the full updated slide content in the same schema.`;
    }
    const response = await aiCall(prompts.system, userPrompt, visionImages);
    const generatedData = (0,_json_repair__WEBPACK_IMPORTED_MODULE_6__/* .parseJsonResponse */ .l)(response);
    if (!generatedData || !generatedData.elements || !Array.isArray(generatedData.elements)) {
        log.error(`Failed to parse AI response for: ${outline.title}`);
        return null;
    }
    log.debug(`Got ${generatedData.elements.length} elements for: ${outline.title}`);
    // Debug: Log image elements before resolution
    const imageElements = generatedData.elements.filter((el)=>el.type === 'image');
    if (imageElements.length > 0) {
        log.debug(`Image elements before resolution:`, imageElements.map((el)=>({
                type: el.type,
                src: el.src && String(el.src).substring(0, 50)
            })));
        log.debug(`imageMapping keys:`, imageMapping ? Object.keys(imageMapping).length : '0 keys');
    }
    // Fix elements with missing required fields + aspect ratio correction (while src is still img_id)
    const fixedElements = fixElementDefaults(generatedData.elements, assignedImages);
    log.debug(`After element fixing: ${fixedElements.length} elements`);
    // Process LaTeX elements: render latex string → HTML via KaTeX
    const latexProcessedElements = processLatexElements(fixedElements);
    log.debug(`After LaTeX processing: ${latexProcessedElements.length} elements`);
    // Resolve image_id references to actual URLs
    const resolvedElements = resolveImageIds(latexProcessedElements, imageMapping, generatedMediaMapping);
    log.debug(`After image resolution: ${resolvedElements.length} elements`);
    const videoNormalizedElements = normalizeGeneratedVideoRefs(resolvedElements, outline.mediaGenerations);
    log.debug(`After video reference normalization: ${videoNormalizedElements.length} elements`);
    // Process elements, assign unique IDs
    const processedElements = videoNormalizedElements.map((el)=>({
            ...el,
            id: `${el.type}_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`,
            rotate: 0
        }));
    // Process background
    let background;
    if (generatedData.background) {
        if (generatedData.background.type === 'solid' && generatedData.background.color) {
            background = {
                type: 'solid',
                color: generatedData.background.color
            };
        } else if (generatedData.background.type === 'gradient' && generatedData.background.gradient) {
            background = {
                type: 'gradient',
                gradient: generatedData.background.gradient
            };
        }
    }
    return {
        elements: processedElements,
        background,
        remark: generatedData.remark || outline.description
    };
}
/**
 * Generate quiz content
 */ async function generateQuizContent(outline, aiCall, languageDirective) {
    const quizConfig = outline.quizConfig || {
        questionCount: 3,
        difficulty: 'medium',
        questionTypes: [
            'single'
        ]
    };
    const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.QUIZ_CONTENT, {
        title: outline.title,
        description: outline.description,
        keyPoints: (outline.keyPoints || []).map((p, i)=>`${i + 1}. ${p}`).join('\n'),
        questionCount: quizConfig.questionCount,
        difficulty: quizConfig.difficulty,
        questionTypes: quizConfig.questionTypes.join(', '),
        languageDirective: languageDirective || ''
    });
    if (!prompts) {
        return null;
    }
    log.debug(`Generating quiz content for: ${outline.title}`);
    const response = await aiCall(prompts.system, prompts.user);
    const generatedQuestions = (0,_json_repair__WEBPACK_IMPORTED_MODULE_6__/* .parseJsonResponse */ .l)(response);
    if (!generatedQuestions || !Array.isArray(generatedQuestions)) {
        log.error(`Failed to parse AI response for: ${outline.title}`);
        return null;
    }
    log.debug(`Got ${generatedQuestions.length} questions for: ${outline.title}`);
    // Ensure each question has an ID and normalize options format
    const questions = generatedQuestions.map((q)=>{
        const isText = q.type === 'short_answer';
        return {
            ...q,
            id: q.id || `q_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`,
            options: isText ? undefined : normalizeQuizOptions(q.options),
            answer: isText ? undefined : normalizeQuizAnswer(q),
            hasAnswer: isText ? false : true
        };
    });
    return {
        questions
    };
}
/**
 * Normalize quiz options from AI response.
 * AI may generate plain strings ["OptionA", "OptionB"] or QuizOption objects.
 * This normalizes to QuizOption[] format: { value: "A", label: "OptionA" }
 */ function normalizeQuizOptions(options) {
    if (!options || !Array.isArray(options)) return undefined;
    return options.map((opt, index)=>{
        const letter = String.fromCharCode(65 + index); // A, B, C, D...
        if (typeof opt === 'string') {
            return {
                value: letter,
                label: opt
            };
        }
        if (typeof opt === 'object' && opt !== null) {
            const obj = opt;
            return {
                value: typeof obj.value === 'string' ? obj.value : letter,
                label: typeof obj.label === 'string' ? obj.label : String(obj.value || obj.text || letter)
            };
        }
        return {
            value: letter,
            label: String(opt)
        };
    });
}
/**
 * Normalize quiz answer from AI response.
 * AI may generate correctAnswer as string or string[], under various field names.
 * This normalizes to string[] format matching option values.
 */ function normalizeQuizAnswer(question) {
    // AI might use "correctAnswer", "answer", or "correct_answer"
    const raw = question.answer ?? question.correctAnswer ?? question.correct_answer;
    if (!raw) return undefined;
    if (Array.isArray(raw)) {
        return raw.map(String);
    }
    return [
        String(raw)
    ];
}
/**
 * Generate PBL project content
 * Uses the agentic loop from lib/pbl/generate-pbl.ts
 */ async function generatePBLSceneContent(outline, languageModel, languageDirective, thinkingConfig) {
    if (!languageModel) {
        log.error('LanguageModel required for PBL generation');
        return null;
    }
    const pblConfig = outline.pblConfig;
    if (!pblConfig) {
        log.error(`PBL outline "${outline.title}" missing pblConfig`);
        return null;
    }
    log.info(`Generating PBL content for: ${outline.title}`);
    try {
        const projectConfig = await (0,_lib_pbl_generate_pbl__WEBPACK_IMPORTED_MODULE_2__/* .generatePBLContent */ .J)({
            projectTopic: pblConfig.projectTopic,
            projectDescription: pblConfig.projectDescription,
            targetSkills: pblConfig.targetSkills,
            issueCount: pblConfig.issueCount,
            languageDirective: languageDirective || _outline_generator__WEBPACK_IMPORTED_MODULE_4__/* .DEFAULT_LANGUAGE_DIRECTIVE */ .He
        }, languageModel, {
            onProgress: (msg)=>log.info(`${msg}`)
        }, thinkingConfig);
        log.info(`PBL generated: ${projectConfig.agents.length} agents, ${projectConfig.issueboard.issues.length} issues`);
        return {
            projectConfig
        };
    } catch (error) {
        log.error(`Failed:`, error);
        return null;
    }
}
/**
 * Extract HTML document from AI response.
 * Tries to find <!DOCTYPE html>...</html> first, then falls back to code block extraction.
 */ function extractHtml(response) {
    // Strategy 1: Find complete HTML document
    const doctypeStart = response.indexOf('<!DOCTYPE html>');
    const htmlTagStart = response.indexOf('<html');
    const start = doctypeStart !== -1 ? doctypeStart : htmlTagStart;
    if (start !== -1) {
        const htmlEnd = response.lastIndexOf('</html>');
        if (htmlEnd !== -1) {
            return response.substring(start, htmlEnd + 7);
        }
    }
    // Strategy 2: Extract from code block
    const codeBlockMatch = response.match(/```(?:html)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
        const content = codeBlockMatch[1].trim();
        if (content.includes('<html') || content.includes('<!DOCTYPE')) {
            return content;
        }
    }
    // Strategy 3: If response itself looks like HTML
    const trimmed = response.trim();
    if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) {
        return trimmed;
    }
    log.error('Could not extract HTML from response');
    log.error('Response preview:', response.substring(0, 200));
    return null;
}
// ==================== Ultra Mode Widget Generation ====================
/**
 * Generate widget content based on widget type (Ultra Mode)
 */ async function generateWidgetContent(outline, aiCall, languageDirective, options = {}) {
    const widgetType = outline.widgetType;
    const widgetOutline = outline.widgetOutline;
    if (!widgetType || !widgetOutline) {
        log.warn(`Interactive outline missing widget config, falling back to standard interactive`);
        return null;
    }
    // Select appropriate prompt based on widget type
    let promptId;
    let variables;
    switch(widgetType){
        case 'simulation':
            promptId = _lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.SIMULATION_CONTENT;
            variables = {
                conceptName: widgetOutline.concept || outline.title,
                conceptOverview: outline.description,
                keyPoints: (outline.keyPoints || []).join('\n'),
                variables: widgetOutline.keyVariables?.join(', ') || '',
                designIdea: '',
                languageDirective: languageDirective || ''
            };
            break;
        case 'diagram':
            promptId = _lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.DIAGRAM_CONTENT;
            variables = {
                title: outline.title,
                diagramType: widgetOutline.diagramType || 'flowchart',
                description: outline.description,
                keyPoints: (outline.keyPoints || []).join('\n'),
                languageDirective: languageDirective || ''
            };
            break;
        case 'code':
            promptId = _lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.CODE_CONTENT;
            variables = {
                title: outline.title,
                programmingLanguage: widgetOutline.language || 'python',
                description: outline.description,
                keyPoints: (outline.keyPoints || []).join('\n'),
                starterCode: '',
                testCases: '',
                hints: '',
                languageDirective: languageDirective || ''
            };
            break;
        case 'game':
            promptId = _lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.GAME_CONTENT;
            variables = {
                title: outline.title,
                gameType: widgetOutline.gameType || 'quiz',
                description: outline.description,
                keyPoints: (outline.keyPoints || []).join('\n'),
                scoring: {
                    correctPoints: 10,
                    speedBonus: 5
                },
                languageDirective: languageDirective || ''
            };
            break;
        case 'visualization3d':
            promptId = _lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.VISUALIZATION3D_CONTENT;
            variables = {
                title: outline.title,
                visualizationType: widgetOutline.visualizationType || 'custom',
                description: outline.description,
                keyPoints: (outline.keyPoints || []).join('\n'),
                objects: widgetOutline.objects || [],
                interactions: widgetOutline.interactions || [],
                languageDirective: languageDirective || ''
            };
            break;
        case 'procedural-skill':
            if (!options.allowProceduralSkill) {
                log.warn(`Procedural-skill widget "${outline.title}" is not enabled`);
                return null;
            }
            promptId = _lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.PROCEDURAL_SKILL_CONTENT;
            variables = {
                title: outline.title,
                procedureType: widgetOutline.procedureType || 'custom',
                task: widgetOutline.task || widgetOutline.concept || outline.title,
                description: outline.description,
                keyPoints: (outline.keyPoints || []).join('\n'),
                tools: widgetOutline.tools || [],
                steps: widgetOutline.steps || [],
                successCriteria: widgetOutline.successCriteria || [],
                errorConsequences: widgetOutline.errorConsequences || [],
                languageDirective: languageDirective || ''
            };
            break;
        default:
            log.warn(`Unknown widget type: ${widgetType}`);
            return null;
    }
    const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(promptId, variables);
    if (!prompts) {
        log.error(`Failed to build ${widgetType} prompt for: ${outline.title}`);
        return null;
    }
    log.info(`Generating ${widgetType} widget for: ${outline.title}`);
    const response = await aiCall(prompts.system, prompts.user);
    const html = extractHtml(response);
    if (!html) {
        log.error(`Failed to extract HTML from ${widgetType} response for: ${outline.title}`);
        return null;
    }
    // Extract widget config from HTML if present
    const widgetConfig = extractWidgetConfig(html);
    // Generate teacher actions
    const teacherActions = await generateWidgetTeacherActions(widgetType, outline, widgetConfig, aiCall, languageDirective);
    log.info(`[Ultra Mode] Generated ${teacherActions?.length || 0} teacher actions for "${outline.title}" (${widgetType})`);
    if (teacherActions && teacherActions.length > 0) {
        log.info(`[Ultra Mode] Teacher actions for "${outline.title}": ${JSON.stringify(teacherActions, null, 2)}`);
    }
    return {
        html: (0,_interactive_post_processor__WEBPACK_IMPORTED_MODULE_11__/* .postProcessInteractiveHtml */ .N)(html),
        widgetType,
        widgetConfig,
        teacherActions
    };
}
/**
 * Extract widget config from embedded JSON in HTML
 */ function extractWidgetConfig(html) {
    const match = html.match(/<script type="application\/json" id="widget-config">([\s\S]*?)<\/script>/);
    if (!match) return undefined;
    try {
        return JSON.parse(match[1]);
    } catch  {
        return undefined;
    }
}
/**
 * Generate teacher actions for a widget
 */ async function generateWidgetTeacherActions(widgetType, outline, widgetConfig, aiCall, languageDirective) {
    const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.WIDGET_TEACHER_ACTIONS, {
        widgetType,
        description: outline.description,
        keyPoints: (outline.keyPoints || []).join('\n'),
        widgetConfig: JSON.stringify(widgetConfig || {}),
        languageDirective: languageDirective || ''
    });
    if (!prompts) return undefined;
    try {
        const response = await aiCall(prompts.system, prompts.user);
        const parsed = (0,_json_repair__WEBPACK_IMPORTED_MODULE_6__/* .parseJsonResponse */ .l)(response);
        return parsed?.actions;
    } catch  {
        return undefined;
    }
}
/**
 * Step 3.2: Generate Actions based on content and script
 */ async function generateSceneActions(outline, content, aiCall, options = {}) {
    const { ctx, agents, userProfile, languageDirective } = options;
    const agentsText = (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .formatAgentsForPrompt */ .P$)(agents);
    // Debug: Log content type and teacherActions presence for interactive scenes
    if (outline.type === 'interactive') {
        const hasHtml = 'html' in content;
        const teacherActionsCount = hasHtml ? content.teacherActions?.length || 0 : 0;
        log.info(`[Actions Gen] Interactive "${outline.title}": hasHtml=${hasHtml}, teacherActions=${teacherActionsCount}, widgetType=${hasHtml ? content.widgetType : 'N/A'}`);
    }
    // Ultra Mode: If interactive content has teacherActions, convert and use them
    // Skip normal action generation for widget-based interactive scenes
    if (outline.type === 'interactive' && 'html' in content && content.teacherActions?.length) {
        log.info(`[Ultra Mode] Converting ${content.teacherActions.length} teacherActions to Actions for: ${outline.title}`);
        return convertTeacherActionsToActions(content.teacherActions);
    }
    if (outline.type === 'slide' && 'elements' in content) {
        // Format element list for AI to select from
        const elementsText = formatElementsForPrompt(content.elements);
        const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.SLIDE_ACTIONS, {
            title: outline.title,
            keyPoints: (outline.keyPoints || []).map((p, i)=>`${i + 1}. ${p}`).join('\n'),
            description: outline.description,
            elements: elementsText,
            courseContext: (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .buildCourseContext */ .r7)(ctx),
            agents: agentsText,
            userProfile: userProfile || '',
            languageDirective: languageDirective || ''
        });
        if (!prompts) {
            return generateDefaultSlideActions(outline, content.elements);
        }
        const response = await aiCall(prompts.system, prompts.user);
        const actions = (0,_action_parser__WEBPACK_IMPORTED_MODULE_5__/* .parseActionsFromStructuredOutput */ .F)(response, outline.type);
        if (actions.length > 0) {
            // Validate and fill in Action IDs
            return processActions(actions, content.elements, agents);
        }
        return generateDefaultSlideActions(outline, content.elements);
    }
    if (outline.type === 'quiz' && 'questions' in content) {
        // Format question list for AI reference
        const questionsText = formatQuestionsForPrompt(content.questions);
        const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.QUIZ_ACTIONS, {
            title: outline.title,
            keyPoints: (outline.keyPoints || []).map((p, i)=>`${i + 1}. ${p}`).join('\n'),
            description: outline.description,
            questions: questionsText,
            courseContext: (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .buildCourseContext */ .r7)(ctx),
            agents: agentsText,
            languageDirective: languageDirective || ''
        });
        if (!prompts) {
            return generateDefaultQuizActions(outline);
        }
        const response = await aiCall(prompts.system, prompts.user);
        const actions = (0,_action_parser__WEBPACK_IMPORTED_MODULE_5__/* .parseActionsFromStructuredOutput */ .F)(response, outline.type);
        if (actions.length > 0) {
            return processActions(actions, [], agents);
        }
        return generateDefaultQuizActions(outline);
    }
    if (outline.type === 'interactive' && 'html' in content) {
        const config = outline.interactiveConfig;
        const agentsText = (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .formatAgentsForPrompt */ .P$)(agents);
        const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.INTERACTIVE_ACTIONS, {
            title: outline.title,
            keyPoints: (outline.keyPoints || []).map((p, i)=>`${i + 1}. ${p}`).join('\n'),
            description: outline.description,
            conceptName: config?.conceptName || outline.title,
            designIdea: config?.designIdea || '',
            courseContext: (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .buildCourseContext */ .r7)(ctx),
            agents: agentsText,
            languageDirective: languageDirective || ''
        });
        if (!prompts) {
            return generateDefaultInteractiveActions(outline);
        }
        const response = await aiCall(prompts.system, prompts.user);
        const actions = (0,_action_parser__WEBPACK_IMPORTED_MODULE_5__/* .parseActionsFromStructuredOutput */ .F)(response, outline.type);
        if (actions.length > 0) {
            return processActions(actions, [], agents);
        }
        return generateDefaultInteractiveActions(outline);
    }
    if (outline.type === 'pbl' && 'projectConfig' in content) {
        const pblConfig = outline.pblConfig;
        const agentsText = (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .formatAgentsForPrompt */ .P$)(agents);
        const prompts = (0,_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .buildPrompt */ .fn)(_lib_prompts__WEBPACK_IMPORTED_MODULE_3__/* .PROMPT_IDS */ .u9.PBL_ACTIONS, {
            title: outline.title,
            keyPoints: (outline.keyPoints || []).map((p, i)=>`${i + 1}. ${p}`).join('\n'),
            description: outline.description,
            projectTopic: pblConfig?.projectTopic || outline.title,
            projectDescription: pblConfig?.projectDescription || outline.description,
            courseContext: (0,_prompt_formatters__WEBPACK_IMPORTED_MODULE_9__/* .buildCourseContext */ .r7)(ctx),
            agents: agentsText,
            languageDirective: languageDirective || ''
        });
        if (!prompts) {
            return generateDefaultPBLActions(outline);
        }
        const response = await aiCall(prompts.system, prompts.user);
        const actions = (0,_action_parser__WEBPACK_IMPORTED_MODULE_5__/* .parseActionsFromStructuredOutput */ .F)(response, outline.type);
        if (actions.length > 0) {
            return processActions(actions, [], agents);
        }
        return generateDefaultPBLActions(outline);
    }
    return [];
}
/**
 * Generate default PBL Actions (fallback)
 */ function generateDefaultPBLActions(_outline) {
    return [
        {
            id: `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`,
            type: 'speech',
            title: 'PBL 项目介绍',
            text: '现在让我们开始一个项目式学习活动。请选择你的角色，查看任务看板，开始协作完成项目。'
        }
    ];
}
/**
 * Format element list for AI to select elementId
 */ function formatElementsForPrompt(elements) {
    return elements.map((el)=>{
        let summary = '';
        if (el.type === 'text' && 'content' in el) {
            // Extract text content summary (strip HTML tags)
            const textContent = (el.content || '').replace(/<[^>]*>/g, '').substring(0, 50);
            summary = `Content summary: "${textContent}${textContent.length >= 50 ? '...' : ''}"`;
        } else if (el.type === 'chart' && 'chartType' in el) {
            summary = `Chart type: ${el.chartType}`;
        } else if (el.type === 'image') {
            summary = 'Image element';
        } else if (el.type === 'shape' && 'shapeName' in el) {
            summary = `Shape: ${el.shapeName || 'unknown'}`;
        } else if (el.type === 'latex' && 'latex' in el) {
            summary = `Formula: ${(el.latex || '').substring(0, 30)}`;
        } else {
            summary = `${el.type} element`;
        }
        return `- id: "${el.id}", type: "${el.type}", ${summary}`;
    }).join('\n');
}
/**
 * Format question list for AI reference
 */ function formatQuestionsForPrompt(questions) {
    return questions.map((q, i)=>{
        const optionsText = q.options ? `Options: ${q.options.map((o)=>`${o.value}. ${o.label}`).join(', ')}` : '';
        return `Q${i + 1} (${q.type}): ${q.question}\n${optionsText}`;
    }).join('\n\n');
}
/**
 * Convert Ultra Mode teacherActions to standard Actions for playback.
 *
 * TeacherAction types: speech, highlight, annotation, reveal, setState
 * Action types: speech, widget_highlight, widget_setState, widget_annotation, widget_reveal
 *
 * Conversion strategy:
 * - speech → single speech Action
 * - highlight/setState/annotation/reveal with content → TWO Actions:
 *   1. widget action (visual/state change) - quick, non-blocking
 *   2. speech action (narration) - PlaybackEngine handles TTS
 * - highlight/setState/annotation/reveal without content → single widget action
 */ function convertTeacherActionsToActions(teacherActions) {
    const actions = [];
    for (const ta of teacherActions){
        // Always use nanoid for unique action IDs to prevent audio ID collisions
        // Ultra Mode generates sequential IDs like "action_1" which are NOT unique across scenes
        const actionId = `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`;
        const base = {
            id: actionId,
            title: ta.label || ''
        };
        switch(ta.type){
            case 'speech':
                actions.push({
                    ...base,
                    type: 'speech',
                    text: ta.content || ''
                });
                break;
            case 'highlight':
                // Add widget highlight action (visual, quick)
                actions.push({
                    ...base,
                    type: 'widget_highlight',
                    target: ta.target || '',
                    content: undefined
                });
                // Add speech action for narration (if content exists)
                if (ta.content) {
                    actions.push({
                        id: `${base.id}_speech`,
                        type: 'speech',
                        text: ta.content,
                        title: base.title
                    });
                }
                break;
            case 'setState':
                // Add widget setState action
                actions.push({
                    ...base,
                    type: 'widget_setState',
                    state: ta.state || {},
                    content: undefined
                });
                // Add speech action for narration
                if (ta.content) {
                    actions.push({
                        id: `${base.id}_speech`,
                        type: 'speech',
                        text: ta.content,
                        title: base.title
                    });
                }
                break;
            case 'annotation':
                actions.push({
                    ...base,
                    type: 'widget_annotation',
                    target: ta.target || '',
                    content: undefined
                });
                if (ta.content) {
                    actions.push({
                        id: `${base.id}_speech`,
                        type: 'speech',
                        text: ta.content,
                        title: base.title
                    });
                }
                break;
            case 'reveal':
                actions.push({
                    ...base,
                    type: 'widget_reveal',
                    target: ta.target || '',
                    content: undefined
                });
                if (ta.content) {
                    actions.push({
                        id: `${base.id}_speech`,
                        type: 'speech',
                        text: ta.content,
                        title: base.title
                    });
                }
                break;
            default:
                // Fallback to speech for unknown types
                actions.push({
                    ...base,
                    type: 'speech',
                    text: ta.content || ''
                });
        }
    }
    return actions;
}
/**
 * Process and validate Actions
 */ function processActions(actions, elements, agents) {
    const elementIds = new Set(elements.map((el)=>el.id));
    const agentIds = new Set(agents?.map((a)=>a.id) || []);
    const studentAgents = agents?.filter((a)=>a.role === 'student') || [];
    const nonTeacherAgents = agents?.filter((a)=>a.role !== 'teacher') || [];
    return actions.map((action)=>{
        // Ensure each action has an ID
        const processedAction = {
            ...action,
            id: action.id || `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`
        };
        // Validate spotlight elementId
        if (processedAction.type === 'spotlight') {
            const spotlightAction = processedAction;
            if (!spotlightAction.elementId || !elementIds.has(spotlightAction.elementId)) {
                // If elementId is invalid, try selecting the first element
                if (elements.length > 0) {
                    spotlightAction.elementId = elements[0].id;
                    log.warn(`Invalid elementId, falling back to first element: ${spotlightAction.elementId}`);
                }
            }
        }
        // Validate/fill discussion agentId
        if (processedAction.type === 'discussion' && agents && agents.length > 0) {
            if (processedAction.agentId && agentIds.has(processedAction.agentId)) {
            // agentId valid — keep it
            } else {
                // agentId missing or invalid — pick a random student, or non-teacher, or skip
                const pool = studentAgents.length > 0 ? studentAgents : nonTeacherAgents;
                if (pool.length > 0) {
                    const picked = pool[Math.floor(Math.random() * pool.length)];
                    log.warn(`Discussion agentId "${processedAction.agentId || '(none)'}" invalid, assigned: ${picked.id} (${picked.name})`);
                    processedAction.agentId = picked.id;
                }
            }
        }
        return processedAction;
    });
}
/**
 * Generate default slide Actions (fallback)
 */ function generateDefaultSlideActions(outline, elements) {
    const actions = [];
    // Add spotlight for text elements
    const textElements = elements.filter((el)=>el.type === 'text');
    if (textElements.length > 0) {
        actions.push({
            id: `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`,
            type: 'spotlight',
            title: '聚焦重点',
            elementId: textElements[0].id
        });
    }
    // Add opening speech based on key points
    const speechText = outline.keyPoints?.length ? outline.keyPoints.join('。') + '。' : outline.description || outline.title;
    actions.push({
        id: `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`,
        type: 'speech',
        title: '场景讲解',
        text: speechText
    });
    return actions;
}
/**
 * Generate default quiz Actions (fallback)
 */ function generateDefaultQuizActions(_outline) {
    return [
        {
            id: `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`,
            type: 'speech',
            title: '测验引导',
            text: '现在让我们来做一个小测验，检验一下学习成果。'
        }
    ];
}
/**
 * Generate default interactive Actions (fallback)
 */ function generateDefaultInteractiveActions(_outline) {
    return [
        {
            id: `action_${(0,nanoid__WEBPACK_IMPORTED_MODULE_10__/* .nanoid */ .Ak)(8)}`,
            type: 'speech',
            title: '交互引导',
            text: '现在让我们通过交互式可视化来探索这个概念。请尝试操作页面中的元素，观察变化。'
        }
    ];
}
/**
 * Create a complete scene with Actions
 */ function createSceneWithActions(outline, content, actions, api) {
    if (outline.type === 'slide' && 'elements' in content) {
        // Build complete Slide object
        const defaultTheme = {
            backgroundColor: '#ffffff',
            themeColors: [
                '#5b9bd5',
                '#ed7d31',
                '#a5a5a5',
                '#ffc000',
                '#4472c4'
            ],
            fontColor: '#333333',
            fontName: 'Microsoft YaHei',
            outline: {
                color: '#d14424',
                width: 2,
                style: 'solid'
            },
            shadow: {
                h: 0,
                v: 0,
                blur: 10,
                color: '#000000'
            }
        };
        const slide = {
            id: nanoid(),
            viewportSize: 1000,
            viewportRatio: 0.5625,
            theme: defaultTheme,
            elements: content.elements,
            background: content.background
        };
        const sceneResult = api.scene.create({
            type: 'slide',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'slide',
                canvas: slide
            },
            actions
        });
        return sceneResult.success ? sceneResult.data ?? null : null;
    }
    if (outline.type === 'quiz' && 'questions' in content) {
        const sceneResult = api.scene.create({
            type: 'quiz',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'quiz',
                questions: content.questions
            },
            actions
        });
        return sceneResult.success ? sceneResult.data ?? null : null;
    }
    if (outline.type === 'interactive' && 'html' in content) {
        const sceneResult = api.scene.create({
            type: 'interactive',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'interactive',
                url: '',
                html: content.html,
                // Ultra Mode widget fields
                widgetType: content.widgetType,
                widgetConfig: content.widgetConfig,
                teacherActions: content.teacherActions
            },
            actions
        });
        return sceneResult.success ? sceneResult.data ?? null : null;
    }
    if (outline.type === 'pbl' && 'projectConfig' in content) {
        const sceneResult = api.scene.create({
            type: 'pbl',
            title: outline.title,
            order: outline.order,
            content: {
                type: 'pbl',
                projectConfig: content.projectConfig
            },
            actions
        });
        return sceneResult.success ? sceneResult.data ?? null : null;
    }
    return null;
}


/***/ }),

/***/ 941953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ MAX_VISION_IMAGES),
/* harmony export */   k: () => (/* binding */ MAX_PDF_CONTENT_CHARS)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/constants/generation.ts
 *
 * Constants for PDF content generation, shared between client and server code.
 */ // PDF content truncation limit (characters)
const MAX_PDF_CONTENT_CHARS = 50000;
// Maximum number of images to send as vision content parts
const MAX_VISION_IMAGES = 20;


/***/ }),

/***/ 943583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports createGenerationSession, runGenerationPipeline */
/* harmony import */ var _outline_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(958206);
/* harmony import */ var _scene_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(875648);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/generation/pipeline-runner.ts
 *
 * Top-level pipeline orchestration.
 * Creates sessions and runs the full generation pipeline.
 */ 


function createGenerationSession(requirements) {
    return {
        id: nanoid(),
        requirements,
        progress: {
            currentStage: 1,
            overallProgress: 0,
            stageProgress: 0,
            statusMessage: '初始化中...',
            scenesGenerated: 0,
            totalScenes: 0
        },
        startedAt: new Date()
    };
}
// For full testing
async function runGenerationPipeline(session, store, aiCall, callbacks) {
    try {
        // Stage 1: Generate Scene Outlines from Requirements
        callbacks?.onProgress?.({
            ...session.progress,
            currentStage: 1,
            overallProgress: 5,
            statusMessage: 'Analyzing requirements, generating outlines...'
        });
        const outlinesResult = await generateSceneOutlinesFromRequirements(session.requirements, undefined, undefined, aiCall, callbacks);
        if (!outlinesResult.success || !outlinesResult.data) {
            throw new Error(outlinesResult.error || 'Failed to generate scene outlines');
        }
        const { outlines, languageDirective } = outlinesResult.data;
        session.sceneOutlines = outlines;
        callbacks?.onStageComplete?.(1, outlines);
        // Stage 2: Generate Full Scenes
        callbacks?.onProgress?.({
            ...session.progress,
            currentStage: 2,
            overallProgress: 50,
            statusMessage: 'Generating scene content...',
            totalScenes: outlines.length
        });
        const scenesResult = await generateFullScenes(outlines, store, aiCall, callbacks, languageDirective);
        if (!scenesResult.success) {
            throw new Error(scenesResult.error || 'Failed to generate scenes');
        }
        callbacks?.onStageComplete?.(2, scenesResult.data);
        // Complete
        session.completedAt = new Date();
        session.progress = {
            currentStage: 2,
            overallProgress: 100,
            stageProgress: 100,
            statusMessage: 'Generation complete!',
            scenesGenerated: scenesResult.data?.length || 0,
            totalScenes: session.sceneOutlines?.length || 0
        };
        return {
            success: true,
            data: session
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        callbacks?.onError?.(errorMessage);
        session.progress.errors = [
            ...session.progress.errors || [],
            errorMessage
        ];
        return {
            success: false,
            error: errorMessage
        };
    }
}


/***/ }),

/***/ 958206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   He: () => (/* binding */ DEFAULT_LANGUAGE_DIRECTIVE),
/* harmony export */   SJ: () => (/* binding */ applyOutlineFallbacks)
/* harmony export */ });
/* unused harmony exports generateSceneOutlinesFromRequirements, sanitizeProceduralSkillOutline */
/* harmony import */ var _lib_prompts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548245);
/* harmony import */ var _json_repair__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(385080);
/* harmony import */ var _scene_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(280590);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(653165);
/**
 * Stage 1: Generate scene outlines from user requirements.
 * Also contains outline fallback logic.
 */ 






const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('Generation');
/**
 * Used when the outline stage fails to produce an explicit directive (LLM
 * schema regression, empty response, upstream error). Downstream prompts
 * still need *something* that steers the model toward the requirement's
 * language rather than defaulting to the training-distribution prior.
 */ const DEFAULT_LANGUAGE_DIRECTIVE = 'Teach in the language that matches the user requirement.';
/**
 * Generate scene outlines from user requirements
 * Now uses simplified UserRequirements with just requirement text and language
 */ async function generateSceneOutlinesFromRequirements(requirements, pdfText, pdfImages, aiCall, callbacks, options) {
    // Build available images description for the prompt
    let availableImagesText = 'No images available';
    let visionImages;
    if (pdfImages && pdfImages.length > 0) {
        if (options?.visionEnabled && options?.imageMapping) {
            // Vision mode: split into vision images (first N) and text-only (rest)
            const allWithSrc = pdfImages.filter((img)=>options.imageMapping[img.id]);
            const visionSlice = allWithSrc.slice(0, MAX_VISION_IMAGES);
            const textOnlySlice = allWithSrc.slice(MAX_VISION_IMAGES);
            const noSrcImages = pdfImages.filter((img)=>!options.imageMapping[img.id]);
            const visionDescriptions = visionSlice.map((img)=>formatImagePlaceholder(img));
            const textDescriptions = [
                ...textOnlySlice,
                ...noSrcImages
            ].map((img)=>formatImageDescription(img));
            availableImagesText = [
                ...visionDescriptions,
                ...textDescriptions
            ].join('\n');
            visionImages = visionSlice.map((img)=>({
                    id: img.id,
                    src: options.imageMapping[img.id],
                    width: img.width,
                    height: img.height
                }));
        } else {
            // Text-only mode: full descriptions
            availableImagesText = pdfImages.map((img)=>formatImageDescription(img)).join('\n');
        }
    }
    // Build user profile string for prompt injection
    const userProfileText = requirements.userNickname || requirements.userBio ? `## Student Profile\n\nStudent: ${requirements.userNickname || 'Unknown'}${requirements.userBio ? ` — ${requirements.userBio}` : ''}\n\nConsider this student's background when designing the course. Adapt difficulty, examples, and teaching approach accordingly.\n\n---` : '';
    // Build media snippet conditions based on enabled flags.
    const imageEnabled = options?.imageGenerationEnabled ?? false;
    const videoEnabled = options?.videoGenerationEnabled ?? false;
    const mediaEnabled = imageEnabled || videoEnabled;
    const hasSourceImages = (pdfImages?.length ?? 0) > 0;
    // Use simplified prompt variables
    const prompts = buildPrompt(PROMPT_IDS.REQUIREMENTS_TO_OUTLINES, {
        // New simplified variables
        requirement: requirements.requirement,
        pdfContent: pdfText ? pdfText.substring(0, MAX_PDF_CONTENT_CHARS) : 'None',
        availableImages: availableImagesText,
        userProfile: userProfileText,
        hasSourceImages,
        imageEnabled,
        videoEnabled,
        mediaEnabled,
        researchContext: options?.researchContext || 'None',
        // Server-side generation populates this via options; client-side populates via formatTeacherPersonaForPrompt
        teacherContext: options?.teacherContext || ''
    });
    if (!prompts) {
        return {
            success: false,
            error: 'Prompt template not found'
        };
    }
    try {
        callbacks?.onProgress?.({
            currentStage: 1,
            overallProgress: 20,
            stageProgress: 50,
            statusMessage: '正在分析需求，生成场景大纲...',
            scenesGenerated: 0,
            totalScenes: 0
        });
        const response = await aiCall(prompts.system, prompts.user, visionImages);
        const parsed = parseJsonResponse(response);
        let languageDirective;
        let courseTitle;
        let rawOutlines;
        if (Array.isArray(parsed)) {
            // Fallback: LLM returned old flat array format
            languageDirective = DEFAULT_LANGUAGE_DIRECTIVE;
            rawOutlines = parsed;
        } else if (parsed && parsed.outlines) {
            languageDirective = parsed.languageDirective || DEFAULT_LANGUAGE_DIRECTIVE;
            // courseTitle is optional — only honor a non-empty string, and cap its
            // length defensively (the prompt asks for ≤30 chars, but older/hallucinating
            // models may return far more). The downstream Stage.name column is bounded too.
            const rawTitle = parsed.courseTitle;
            courseTitle = typeof rawTitle === 'string' && rawTitle.trim() ? rawTitle.trim().slice(0, 120) : undefined;
            rawOutlines = parsed.outlines;
        } else {
            return {
                success: false,
                error: 'Failed to parse scene outlines response'
            };
        }
        if (!Array.isArray(rawOutlines)) {
            return {
                success: false,
                error: 'Failed to parse scene outlines response'
            };
        }
        // Ensure IDs and order
        const enriched = rawOutlines.map((outline, index)=>({
                ...outline,
                id: outline.id || nanoid(),
                order: index + 1
            }));
        // Replace sequential gen_img_N/gen_vid_N with globally unique IDs
        const result = uniquifyMediaElementIds(enriched);
        callbacks?.onProgress?.({
            currentStage: 1,
            overallProgress: 50,
            stageProgress: 100,
            statusMessage: `已生成 ${result.length} 个场景大纲`,
            scenesGenerated: 0,
            totalScenes: result.length
        });
        return {
            success: true,
            data: {
                languageDirective,
                courseTitle,
                outlines: result
            }
        };
    } catch (error) {
        return {
            success: false,
            error: String(error)
        };
    }
}
/**
 * Apply type fallbacks for outlines that can't be generated as their declared type.
 * - interactive without interactiveConfig OR widgetType+widgetOutline → slide
 * - pbl without pblConfig or languageModel → slide
 */ function sanitizeProceduralSkillOutline(outline) {
    const widgetOutline = {
        ...outline.widgetOutline ?? {}
    };
    delete widgetOutline.procedureType;
    delete widgetOutline.task;
    delete widgetOutline.tools;
    delete widgetOutline.steps;
    delete widgetOutline.successCriteria;
    delete widgetOutline.errorConsequences;
    return {
        ...outline,
        type: 'interactive',
        widgetType: 'diagram',
        description: outline.description ? `${outline.description} Present this as a process or structure diagram.` : 'Present this topic as a process or structure diagram.',
        widgetOutline
    };
}
function applyOutlineFallbacks(outline, hasLanguageModel, options = {}) {
    // Ultra Mode: interactive scenes with widgetType + widgetOutline are valid
    const hasWidgetConfig = outline.widgetType && outline.widgetOutline;
    if (outline.widgetType === 'procedural-skill' && !options.allowProceduralSkill) {
        log.warn(`Procedural-skill outline "${outline.title}" is not enabled, falling back to diagram`);
        return sanitizeProceduralSkillOutline(outline);
    }
    if (outline.type === 'interactive' && !outline.interactiveConfig && !hasWidgetConfig) {
        log.warn(`Interactive outline "${outline.title}" missing interactiveConfig and widget config, falling back to slide`);
        return {
            ...outline,
            type: 'slide'
        };
    }
    if (outline.type === 'pbl' && (!outline.pblConfig || !hasLanguageModel)) {
        log.warn(`PBL outline "${outline.title}" missing pblConfig or languageModel, falling back to slide`);
        return {
            ...outline,
            type: 'slide'
        };
    }
    return outline;
}


/***/ })

};
;