"use strict";
exports.id = 9676;
exports.ids = [9676];
exports.modules = {

/***/ 629676:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTab: () => (/* binding */ loadTab)
/* harmony export */ });
// Tab group loader — tabs in the 'advanced-media' sub-group.
// Media-heavy studio tabs: whiteboard-studio, video-library, procedure-player,
// image-occlusion.
//
// This file is one of three sub-groups split out of the former 'advanced' group
// (which had 16 tabs in a single chunk and was the largest per-group bundle in
// the app). The media tabs drag in large client-only dependencies:
//   - WhiteboardStudioTab pulls in the entire whiteboard-studio/ subdirectory
//     (~20 files including canvas, layers, audio recorder, video editor with
//     ffmpeg/wasm panels, webcam overlay, timeline editor, etc.).
//   - VideoLibraryTab pulls in the video-library/ subdirectory (folder sidebar,
//     storage dashboard, video detail panel, etc.).
//   - ProcedurePlayerTab pulls in the procedure step renderer with media.
//   - ImageAnalyzerTab pulls in the image analyzer with TIFF/multi-page support.
// Isolating them in their own group ensures these heavy chunks are only
// downloaded when the user actually navigates to one of these tabs, and never
// bundled with lightweight clinical reference tabs.
//
// Tabs in this group:
//   whiteboard-studio, video-library, procedure-player, image-occlusion
async function loadTab(tabId) {
    let mod;
    switch(tabId){
        // case 'whiteboard-studio': mod = await import('@/components/medq/WhiteboardStudioTab'); break;
        // case 'video-library': mod = await import('@/components/medq/VideoLibraryTab'); break;
        // case 'procedure-player': mod = await import('@/components/medq/ProcedurePlayerTab'); break;
        // case 'image-occlusion': mod = await import('@/components/medq/ImageAnalyzerTab'); break;
        default:
            throw new Error(`Unknown tab in group advanced-media: ${tabId}`);
    }
    return mod;
}


/***/ })

};
;