"use strict";
exports.id = 3009;
exports.ids = [3009,5390];
exports.modules = {

/***/ 515390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   En: () => (/* binding */ buildEvenWindows),
/* harmony export */   He: () => (/* binding */ detectSceneCuts),
/* harmony export */   K_: () => (/* binding */ pickVlmScenes),
/* harmony export */   bz: () => (/* binding */ fmtSec),
/* harmony export */   fQ: () => (/* binding */ assignDescriptionsToScenes),
/* harmony export */   og: () => (/* binding */ buildScenes),
/* harmony export */   w_: () => (/* binding */ assignTranscriptToScenes)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579646);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(328354);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/**
 * knowledge/scene-detect.ts — video scene segmentation (Stage 3).
 *
 * Turns a video into TEMPERATURE-ALIGNED scenes so retrieval can answer
 * "what was shown at 12:34" and questions can cite an exact span
 * (mediaTimeSec) instead of the whole file.
 *
 * Detection strategy (spike decision — Option D, ffmpeg-first):
 *   1. ffmpeg's scene-change filter (`select='gt(scene,T)'` + showinfo)
 *      emits candidate cut timestamps — in-process, no new dependencies.
 *   2. Pure builder logic (buildScenes) sanitizes cuts, merges scenes
 *      shorter than a floor into neighbors, and caps the scene count —
 *      so a 60-min lecture with 200 hard cuts becomes ≤60 stable scenes.
 *   3. VLM confirmation is implicit: each persisted scene carries the VLM
 *      description of its representative frame (a cut the VLM can't
 *      describe degenerates to a transcript-only scene), which keeps cost
 *      at one vision call per ANALYZED scene, not per cut.
 *   4. Fallback (no cuts detected / filter fails): even time windows
 *      (buildEvenWindows) — honest about being temporal slices, labeled
 *      detection='even-window' in the data model.
 *
 * Every builder here is PURE and unit-tested (test/scene-segmentation);
 * only detectSceneCuts touches the filesystem/ffmpeg.
 */ 

const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
// ─── ffmpeg scene detection ────────────────────────────────────────────────
/**
 * Detect scene-change timestamps with ffmpeg's scene filter.
 * Returns [] when nothing crosses the threshold or the filter fails
 * (callers fall back to even windows) — never throws for ordinary inputs.
 */ async function detectSceneCuts(inputPath, opts = {}) {
    const threshold = opts.threshold ?? 0.3;
    try {
        const { stderr } = await execFileAsync('ffmpeg', [
            '-i',
            inputPath,
            '-filter:v',
            `select='gt(scene,${threshold})',showinfo`,
            '-an',
            '-f',
            'null',
            '-'
        ], {
            timeout: opts.timeoutMs ?? 180000,
            maxBuffer: 1024 * 1024 * 64
        });
        const cuts = [];
        // showinfo prints one block per SELECTED frame: ... pts_time:123.456 ...
        for (const m of stderr.matchAll(/pts_time:(\d+(?:\.\d+)?)/g)){
            const t = Number.parseFloat(m[1]);
            if (Number.isFinite(t)) cuts.push(t);
        }
        return cuts.map((atSec)=>({
                atSec
            }));
    } catch  {
        return [];
    }
}
// ─── Pure scene builders ───────────────────────────────────────────────────
/** Clamp v into [lo, hi]. */ const clamp = (v, lo, hi)=>Math.min(Math.max(v, lo), hi);
/**
 * Cut timestamps → scene spans.
 *
 *   - cuts outside (0.5s, duration-0.5s) are dropped; sorted; deduped
 *   - scenes shorter than minSceneSec are merged into their shorter
 *     neighbor (previous wins ties) until none remain under the floor
 *   - scene count is capped at maxScenes by repeatedly merging the
 *     SHORTEST scene into its shorter neighbor (stable, order-preserving)
 *   - the result always spans [0, duration]
 */ function buildScenes(cutTimes, durationSec, opts = {}) {
    const minScene = opts.minSceneSec ?? 5;
    const maxScenes = opts.maxScenes ?? 60;
    const duration = Math.max(0, durationSec);
    if (duration <= 0 || !Number.isFinite(duration)) return [];
    const cuts = [
        ...new Set(cutTimes.filter((t)=>Number.isFinite(t) && t > 0.5 && t < duration - 0.5).map((t)=>Math.round(t * 1000) / 1000))
    ].sort((a, b)=>a - b);
    let spans = [];
    const bounds = [
        0,
        ...cuts,
        duration
    ];
    for(let i = 0; i + 1 < bounds.length; i++)spans.push([
        bounds[i],
        bounds[i + 1]
    ]);
    // Merge-under-floor + cap-to-max share the "merge scene i into its
    // shorter neighbor" primitive.
    const mergeIntoNeighbor = (idx)=>{
        const prev = idx - 1;
        const next = idx + 1;
        let target;
        if (prev < 0) target = next;
        else if (next >= spans.length) target = prev;
        else {
            const prevLen = spans[prev][1] - spans[prev][0];
            const nextLen = spans[next][1] - spans[next][0];
            target = prevLen <= nextLen ? prev : next;
        }
        const lo = Math.min(spans[idx][0], spans[target][0]);
        const hi = Math.max(spans[idx][1], spans[target][1]);
        spans.splice(Math.min(idx, target), 2, [
            lo,
            hi
        ]);
    };
    let guard = spans.length * 2 + 8;
    while(spans.length > 1){
        const idx = spans.findIndex(([s, e])=>e - s < minScene);
        if (idx < 0 || guard-- <= 0) break;
        mergeIntoNeighbor(idx);
    }
    while(spans.length > maxScenes){
        let shortest = 0;
        for(let i = 1; i < spans.length; i++){
            if (spans[i][1] - spans[i][0] < spans[shortest][1] - spans[shortest][0]) shortest = i;
        }
        mergeIntoNeighbor(shortest);
    }
    return spans.map(([startSec, endSec], i)=>({
            sceneIdx: i,
            startSec: Math.round(startSec * 1000) / 1000,
            endSec: Math.round(endSec * 1000) / 1000,
            midSec: Math.round((startSec + endSec) / 2 * 1000) / 1000
        }));
}
/**
 * Even time windows (fallback when no scene cuts are detected — single-set
 * lectures, screencasts). Window size is clamped so we get between 1 and
 * maxScenes windows of at least minWindowSec each (minute-level temporal
 * navigation without fabricating content boundaries).
 */ function buildEvenWindows(durationSec, opts = {}) {
    const minWindow = opts.minWindowSec ?? 60;
    const maxScenes = opts.maxScenes ?? 60;
    const target = opts.targetScenes ?? 24;
    const duration = Math.max(0, durationSec);
    if (duration <= 0 || !Number.isFinite(duration)) return [];
    if (duration <= minWindow) {
        return [
            {
                sceneIdx: 0,
                startSec: 0,
                endSec: duration,
                midSec: Math.round(duration / 2 * 1000) / 1000
            }
        ];
    }
    const n = clamp(Math.round(duration / minWindow) >= target ? Math.ceil(duration / Math.max(minWindow, duration / target)) : Math.ceil(duration / minWindow), 1, maxScenes);
    const width = duration / n;
    return Array.from({
        length: n
    }, (_, i)=>{
        const startSec = i * width;
        const endSec = i === n - 1 ? duration : (i + 1) * width;
        return {
            sceneIdx: i,
            startSec: Math.round(startSec * 1000) / 1000,
            endSec: Math.round(endSec * 1000) / 1000,
            midSec: Math.round((startSec + endSec) / 2 * 1000) / 1000
        };
    });
}
// ─── Assignment helpers (pure) ─────────────────────────────────────────────
/** mm:ss stamp (local copy — keeps this module dependency-free). */ function fmtSec(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
/**
 * Which scene spans get a VLM frame analysis. All of them when ≤ max;
 * otherwise an evenly-spaced subset (index coverage across the timeline).
 */ function pickVlmScenes(scenes, max) {
    if (scenes.length === 0 || max <= 0) return [];
    if (scenes.length <= max) return scenes;
    const picked = [];
    for(let i = 0; i < max; i++){
        const idx = Math.round(i * (scenes.length - 1) / (max - 1));
        if (!picked.includes(scenes[idx])) picked.push(scenes[idx]);
    }
    return picked;
}
/**
 * Assign timestamped ASR segments to the scenes that CONTAIN them
 * (segments outside every scene — e.g. rounding edges — clamp to the
 * nearest boundary). Returns one transcript string per scene, [mm:ss]-stamped.
 */ function assignTranscriptToScenes(segments, scenes) {
    const buckets = scenes.map(()=>[]);
    if (scenes.length === 0) return [];
    for (const seg of segments){
        const text = seg?.text?.trim();
        if (!text) continue;
        let idx = scenes.findIndex((s)=>seg.offsetSec >= s.startSec && seg.offsetSec < s.endSec);
        if (idx < 0) {
            // clamp to the nearest scene by boundary distance
            let best = 0;
            let bestDist = Infinity;
            scenes.forEach((s, i)=>{
                const d = Math.min(Math.abs(seg.offsetSec - s.startSec), Math.abs(seg.offsetSec - s.endSec));
                if (d < bestDist) {
                    bestDist = d;
                    best = i;
                }
            });
            idx = best;
        }
        buckets[idx].push(`[${fmtSec(seg.offsetSec)}] ${text}`);
    }
    return buckets.map((parts)=>parts.join(' '));
}
/**
 * Assign frame VLM descriptions to the scenes that CONTAIN each frame
 * timestamp (nearest scene wins for edge frames). Later frames win ties,
 * so the most recent analysis of a span is the one kept.
 */ function assignDescriptionsToScenes(frames, scenes) {
    const out = scenes.map(()=>undefined);
    if (scenes.length === 0) return out;
    for (const frame of frames){
        if (!frame?.description?.trim()) continue;
        let idx = scenes.findIndex((s)=>frame.offsetSec >= s.startSec && frame.offsetSec < s.endSec);
        if (idx < 0) {
            let best = 0;
            let bestDist = Infinity;
            scenes.forEach((s, i)=>{
                const d = Math.min(Math.abs(frame.offsetSec - s.startSec), Math.abs(frame.offsetSec - s.endSec));
                if (d < bestDist) {
                    bestDist = d;
                    best = i;
                }
            });
            idx = best;
        }
        out[idx] = frame.description.trim();
    }
    return out;
}


/***/ })

};
;