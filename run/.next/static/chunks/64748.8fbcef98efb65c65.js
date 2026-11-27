"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[64748],{

/***/ 17108:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var zrender_lib_canvas_Painter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40844);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

function install(registers) {
  registers.registerPainter('canvas', zrender_lib_canvas_Painter_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
}

/***/ }),

/***/ 17219:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ patch),
/* harmony export */   e: () => (/* binding */ updateAttrs)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52712);
/* harmony import */ var _domapi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91939);



var colonChar = 58;
var xChar = 120;
var emptyNode = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__/* .createVNode */ .bF)('', '');
function isUndef(s) {
    return s === undefined;
}
function isDef(s) {
    return s !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var map = {};
    for (var i = beginIdx; i <= endIdx; ++i) {
        var key = children[i].key;
        if (key !== undefined) {
            if (false) {}
            map[key] = i;
        }
    }
    return map;
}
function sameVnode(vnode1, vnode2) {
    var isSameKey = vnode1.key === vnode2.key;
    var isSameTag = vnode1.tag === vnode2.tag;
    return isSameTag && isSameKey;
}
function createElm(vnode) {
    var i;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
        var elm = (vnode.elm = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__/* .createElement */ .n)(tag));
        updateAttrs(emptyNode, vnode);
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(children)) {
            for (i = 0; i < children.length; ++i) {
                var ch = children[i];
                if (ch != null) {
                    _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .appendChild */ .NI(elm, createElm(ch));
                }
            }
        }
        else if (isDef(vnode.text) && !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isObject)(vnode.text)) {
            _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .appendChild */ .NI(elm, _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .createTextNode */ .Mq(vnode.text));
        }
    }
    else {
        vnode.elm = _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .createTextNode */ .Mq(vnode.text);
    }
    return vnode.elm;
}
function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (ch != null) {
            _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .insertBefore */ .nc(parentElm, createElm(ch), before);
        }
    }
}
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (ch != null) {
            if (isDef(ch.tag)) {
                var parent_1 = _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .parentNode */ .Bo(ch.elm);
                _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .removeChild */ .zz(parent_1, ch.elm);
            }
            else {
                _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .removeChild */ .zz(parentElm, ch.elm);
            }
        }
    }
}
function updateAttrs(oldVnode, vnode) {
    var key;
    var elm = vnode.elm;
    var oldAttrs = oldVnode && oldVnode.attrs || {};
    var attrs = vnode.attrs || {};
    if (oldAttrs === attrs) {
        return;
    }
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, '');
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key === 'style') {
                    elm.style.cssText = cur;
                }
                else if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                }
                else if (key === 'xmlns:xlink' || key === 'xmlns') {
                    elm.setAttributeNS(_core_js__WEBPACK_IMPORTED_MODULE_0__/* .XMLNS */ .ty, key, cur);
                }
                else if (key.charCodeAt(3) === colonChar) {
                    elm.setAttributeNS(_core_js__WEBPACK_IMPORTED_MODULE_0__/* .XML_NAMESPACE */ .ix, key, cur);
                }
                else if (key.charCodeAt(5) === colonChar) {
                    elm.setAttributeNS(_core_js__WEBPACK_IMPORTED_MODULE_0__/* .XLINKNS */ .WA, key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
function updateChildren(parentElm, oldCh, newCh) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx;
    var idxInOld;
    var elmToMove;
    var before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode);
            _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .insertBefore */ .nc(parentElm, oldStartVnode.elm, _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .nextSibling */ ._3(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode);
            _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .insertBefore */ .nc(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            if (isUndef(oldKeyToIdx)) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (isUndef(idxInOld)) {
                _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .insertBefore */ .nc(parentElm, createElm(newStartVnode), oldStartVnode.elm);
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.tag !== newStartVnode.tag) {
                    _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .insertBefore */ .nc(parentElm, createElm(newStartVnode), oldStartVnode.elm);
                }
                else {
                    patchVnode(elmToMove, newStartVnode);
                    oldCh[idxInOld] = undefined;
                    _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .insertBefore */ .nc(parentElm, elmToMove.elm, oldStartVnode.elm);
                }
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
        }
        else {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
}
function patchVnode(oldVnode, vnode) {
    var elm = (vnode.elm = oldVnode.elm);
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (oldVnode === vnode) {
        return;
    }
    updateAttrs(oldVnode, vnode);
    if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) {
                updateChildren(elm, oldCh, ch);
            }
        }
        else if (isDef(ch)) {
            if (isDef(oldVnode.text)) {
                _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .setTextContent */ .fL(elm, '');
            }
            addVnodes(elm, null, ch, 0, ch.length - 1);
        }
        else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        }
        else if (isDef(oldVnode.text)) {
            _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .setTextContent */ .fL(elm, '');
        }
    }
    else if (oldVnode.text !== vnode.text) {
        if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        }
        _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .setTextContent */ .fL(elm, vnode.text);
    }
}
function patch(oldVnode, vnode) {
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode);
    }
    else {
        var elm = oldVnode.elm;
        var parent_2 = _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .parentNode */ .Bo(elm);
        createElm(vnode);
        if (parent_2 !== null) {
            _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .insertBefore */ .nc(parent_2, vnode.elm, _domapi_js__WEBPACK_IMPORTED_MODULE_2__/* .nextSibling */ ._3(elm));
            removeVnodes(parent_2, [oldVnode], 0, 0);
        }
    }
    return vnode;
}


/***/ }),

/***/ 17607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ getClassId)
/* harmony export */ });
var cssClassIdx = 0;
function getClassId() {
    return cssClassIdx++;
}


/***/ }),

/***/ 27006:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _graphic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33377);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52712);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4591);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _patch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17219);
/* harmony import */ var _canvas_helper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51549);






var svgId = 0;
var SVGPainter = (function () {
    function SVGPainter(root, storage, opts) {
        this.type = 'svg';
        this.configLayer = createMethodNotSupport('configLayer');
        this.storage = storage;
        this._opts = opts = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, opts);
        this.root = root;
        this._id = 'zr' + svgId++;
        this._oldVNode = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createSVGVNode */ .Ne)(opts.width, opts.height);
        if (root && !opts.ssr) {
            var viewport = this._viewport = document.createElement('div');
            viewport.style.cssText = 'position:relative;overflow:hidden';
            var svgDom = this._svgDom = this._oldVNode.elm = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createElement */ .n)('svg');
            (0,_patch_js__WEBPACK_IMPORTED_MODULE_2__/* .updateAttrs */ .e)(null, this._oldVNode);
            viewport.appendChild(svgDom);
            root.appendChild(viewport);
        }
        this.resize(opts.width, opts.height);
    }
    SVGPainter.prototype.getType = function () {
        return this.type;
    };
    SVGPainter.prototype.getViewportRoot = function () {
        return this._viewport;
    };
    SVGPainter.prototype.getViewportRootOffset = function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    };
    SVGPainter.prototype.getSvgDom = function () {
        return this._svgDom;
    };
    SVGPainter.prototype.refresh = function () {
        if (this.root) {
            var vnode = this.renderToVNode({
                willUpdate: true
            });
            vnode.attrs.style = 'position:absolute;left:0;top:0;user-select:none';
            (0,_patch_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this._oldVNode, vnode);
            this._oldVNode = vnode;
        }
    };
    SVGPainter.prototype.renderOneToVNode = function (el) {
        return (0,_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* .brush */ .V$)(el, (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createBrushScope */ .v1)(this._id));
    };
    SVGPainter.prototype.renderToVNode = function (opts) {
        opts = opts || {};
        var list = this.storage.getDisplayList(true);
        var width = this._width;
        var height = this._height;
        var scope = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createBrushScope */ .v1)(this._id);
        scope.animation = opts.animation;
        scope.willUpdate = opts.willUpdate;
        scope.compress = opts.compress;
        scope.emphasis = opts.emphasis;
        scope.ssr = this._opts.ssr;
        var children = [];
        var bgVNode = this._bgVNode = createBackgroundVNode(width, height, this._backgroundColor, scope);
        bgVNode && children.push(bgVNode);
        var mainVNode = !opts.compress
            ? (this._mainVNode = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createVNode */ .bF)('g', 'main', {}, [])) : null;
        this._paintList(list, scope, mainVNode ? mainVNode.children : children);
        mainVNode && children.push(mainVNode);
        var defs = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(scope.defs), function (id) { return scope.defs[id]; });
        if (defs.length) {
            children.push((0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createVNode */ .bF)('defs', 'defs', {}, defs));
        }
        if (opts.animation) {
            var animationCssStr = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .getCssString */ .$o)(scope.cssNodes, scope.cssAnims, { newline: true });
            if (animationCssStr) {
                var styleNode = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createVNode */ .bF)('style', 'stl', {}, [], animationCssStr);
                children.push(styleNode);
            }
        }
        return (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createSVGVNode */ .Ne)(width, height, children, opts.useViewBox);
    };
    SVGPainter.prototype.renderToString = function (opts) {
        opts = opts || {};
        return (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .vNodeToString */ .r3)(this.renderToVNode({
            animation: (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(opts.cssAnimation, true),
            emphasis: (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(opts.cssEmphasis, true),
            willUpdate: false,
            compress: true,
            useViewBox: (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(opts.useViewBox, true)
        }), { newline: true });
    };
    SVGPainter.prototype.setBackgroundColor = function (backgroundColor) {
        this._backgroundColor = backgroundColor;
    };
    SVGPainter.prototype.getSvgRoot = function () {
        return this._mainVNode && this._mainVNode.elm;
    };
    SVGPainter.prototype._paintList = function (list, scope, out) {
        var listLen = list.length;
        var clipPathsGroupsStack = [];
        var clipPathsGroupsStackDepth = 0;
        var currentClipPathGroup;
        var prevClipPaths;
        var clipGroupNodeIdx = 0;
        for (var i = 0; i < listLen; i++) {
            var displayable = list[i];
            if (!displayable.invisible) {
                var clipPaths = displayable.__clipPaths;
                var len = clipPaths && clipPaths.length || 0;
                var prevLen = prevClipPaths && prevClipPaths.length || 0;
                var lca = void 0;
                for (lca = Math.max(len - 1, prevLen - 1); lca >= 0; lca--) {
                    if (clipPaths && prevClipPaths
                        && clipPaths[lca] === prevClipPaths[lca]) {
                        break;
                    }
                }
                for (var i_1 = prevLen - 1; i_1 > lca; i_1--) {
                    clipPathsGroupsStackDepth--;
                    currentClipPathGroup = clipPathsGroupsStack[clipPathsGroupsStackDepth - 1];
                }
                for (var i_2 = lca + 1; i_2 < len; i_2++) {
                    var groupAttrs = {};
                    (0,_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* .setClipPath */ .sq)(clipPaths[i_2], groupAttrs, scope);
                    var g = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createVNode */ .bF)('g', 'clip-g-' + clipGroupNodeIdx++, groupAttrs, []);
                    (currentClipPathGroup ? currentClipPathGroup.children : out).push(g);
                    clipPathsGroupsStack[clipPathsGroupsStackDepth++] = g;
                    currentClipPathGroup = g;
                }
                prevClipPaths = clipPaths;
                var ret = (0,_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* .brush */ .V$)(displayable, scope);
                if (ret) {
                    (currentClipPathGroup ? currentClipPathGroup.children : out).push(ret);
                }
            }
        }
    };
    SVGPainter.prototype.resize = function (width, height) {
        var opts = this._opts;
        var root = this.root;
        var viewport = this._viewport;
        width != null && (opts.width = width);
        height != null && (opts.height = height);
        if (root && viewport) {
            viewport.style.display = 'none';
            width = (0,_canvas_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .getSize */ .YC)(root, 0, opts);
            height = (0,_canvas_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .getSize */ .YC)(root, 1, opts);
            viewport.style.display = '';
        }
        if (this._width !== width || this._height !== height) {
            this._width = width;
            this._height = height;
            if (viewport) {
                var viewportStyle = viewport.style;
                viewportStyle.width = width + 'px';
                viewportStyle.height = height + 'px';
            }
            if (!(0,_helper_js__WEBPACK_IMPORTED_MODULE_5__/* .isPattern */ .Pt)(this._backgroundColor)) {
                var svgDom = this._svgDom;
                if (svgDom) {
                    svgDom.setAttribute('width', width);
                    svgDom.setAttribute('height', height);
                }
                var bgEl = this._bgVNode && this._bgVNode.elm;
                if (bgEl) {
                    bgEl.setAttribute('width', width);
                    bgEl.setAttribute('height', height);
                }
            }
            else {
                this.refresh();
            }
        }
    };
    SVGPainter.prototype.getWidth = function () {
        return this._width;
    };
    SVGPainter.prototype.getHeight = function () {
        return this._height;
    };
    SVGPainter.prototype.dispose = function () {
        if (this.root) {
            this.root.innerHTML = '';
        }
        this._svgDom =
            this._viewport =
                this.storage =
                    this._oldVNode =
                        this._bgVNode =
                            this._mainVNode = null;
    };
    SVGPainter.prototype.clear = function () {
        if (this._svgDom) {
            this._svgDom.innerHTML = null;
        }
        this._oldVNode = null;
    };
    SVGPainter.prototype.toDataURL = function (base64) {
        var str = this.renderToString();
        var prefix = 'data:image/svg+xml;';
        if (base64) {
            str = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__/* .encodeBase64 */ .WG)(str);
            return str && prefix + 'base64,' + str;
        }
        return prefix + 'charset=UTF-8,' + encodeURIComponent(str);
    };
    return SVGPainter;
}());
function createMethodNotSupport(method) {
    return function () {
        if (false) {}
    };
}
function createBackgroundVNode(width, height, backgroundColor, scope) {
    var bgVNode;
    if (backgroundColor && backgroundColor !== 'none') {
        bgVNode = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__/* .createVNode */ .bF)('rect', 'bg', {
            width: width,
            height: height,
            x: '0',
            y: '0'
        });
        if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_5__/* .isGradient */ .bn)(backgroundColor)) {
            (0,_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* .setGradient */ .Fn)({ fill: backgroundColor }, bgVNode.attrs, 'fill', scope);
        }
        else if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_5__/* .isPattern */ .Pt)(backgroundColor)) {
            (0,_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* .setPattern */ .dT)({
                style: {
                    fill: backgroundColor
                },
                dirty: _core_util_js__WEBPACK_IMPORTED_MODULE_0__.noop,
                getBoundingRect: function () { return ({ width: width, height: height }); }
            }, bgVNode.attrs, 'fill', scope);
        }
        else {
            var _a = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__/* .normalizeColor */ .$2)(backgroundColor), color = _a.color, opacity = _a.opacity;
            bgVNode.attrs.fill = color;
            opacity < 1 && (bgVNode.attrs['fill-opacity'] = opacity);
        }
    }
    return bgVNode;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SVGPainter);


/***/ }),

/***/ 27112:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4591);

var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;
var PI2 = Math.PI * 2;
var degree = 180 / PI;
var SVGPathRebuilder = (function () {
    function SVGPathRebuilder() {
    }
    SVGPathRebuilder.prototype.reset = function (precision) {
        this._start = true;
        this._d = [];
        this._str = '';
        this._p = Math.pow(10, precision || 4);
    };
    SVGPathRebuilder.prototype.moveTo = function (x, y) {
        this._add('M', x, y);
    };
    SVGPathRebuilder.prototype.lineTo = function (x, y) {
        this._add('L', x, y);
    };
    SVGPathRebuilder.prototype.bezierCurveTo = function (x, y, x2, y2, x3, y3) {
        this._add('C', x, y, x2, y2, x3, y3);
    };
    SVGPathRebuilder.prototype.quadraticCurveTo = function (x, y, x2, y2) {
        this._add('Q', x, y, x2, y2);
    };
    SVGPathRebuilder.prototype.arc = function (cx, cy, r, startAngle, endAngle, anticlockwise) {
        this.ellipse(cx, cy, r, r, 0, startAngle, endAngle, anticlockwise);
    };
    SVGPathRebuilder.prototype.ellipse = function (cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise) {
        var dTheta = endAngle - startAngle;
        var clockwise = !anticlockwise;
        var dThetaPositive = Math.abs(dTheta);
        var isCircle = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__/* .isAroundZero */ .Cv)(dThetaPositive - PI2)
            || (clockwise ? dTheta >= PI2 : -dTheta >= PI2);
        var unifiedTheta = dTheta > 0 ? dTheta % PI2 : (dTheta % PI2 + PI2);
        var large = false;
        if (isCircle) {
            large = true;
        }
        else if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_0__/* .isAroundZero */ .Cv)(dThetaPositive)) {
            large = false;
        }
        else {
            large = (unifiedTheta >= PI) === !!clockwise;
        }
        var x0 = cx + rx * mathCos(startAngle);
        var y0 = cy + ry * mathSin(startAngle);
        if (this._start) {
            this._add('M', x0, y0);
        }
        var xRot = Math.round(psi * degree);
        if (isCircle) {
            var p = 1 / this._p;
            var dTheta_1 = (clockwise ? 1 : -1) * (PI2 - p);
            this._add('A', rx, ry, xRot, 1, +clockwise, cx + rx * mathCos(startAngle + dTheta_1), cy + ry * mathSin(startAngle + dTheta_1));
            if (p > 1e-2) {
                this._add('A', rx, ry, xRot, 0, +clockwise, x0, y0);
            }
        }
        else {
            var x = cx + rx * mathCos(endAngle);
            var y = cy + ry * mathSin(endAngle);
            this._add('A', rx, ry, xRot, +large, +clockwise, x, y);
        }
    };
    SVGPathRebuilder.prototype.rect = function (x, y, w, h) {
        this._add('M', x, y);
        this._add('l', w, 0);
        this._add('l', 0, h);
        this._add('l', -w, 0);
        this._add('Z');
    };
    SVGPathRebuilder.prototype.closePath = function () {
        if (this._d.length > 0) {
            this._add('Z');
        }
    };
    SVGPathRebuilder.prototype._add = function (cmd, a, b, c, d, e, f, g, h) {
        var vals = [];
        var p = this._p;
        for (var i = 1; i < arguments.length; i++) {
            var val = arguments[i];
            if (isNaN(val)) {
                this._invalid = true;
                return;
            }
            vals.push(Math.round(val * p) / p);
        }
        this._d.push(cmd + vals.join(' '));
        this._start = cmd === 'Z';
    };
    SVGPathRebuilder.prototype.generateStr = function () {
        this._str = this._invalid ? '' : this._d.join('');
        this._d = [];
    };
    SVGPathRebuilder.prototype.getStr = function () {
        return this._str;
    };
    return SVGPathRebuilder;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SVGPathRebuilder);


/***/ }),

/***/ 27354:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   e: () => (/* binding */ isIncrementalLayer)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42924);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11916);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42450);
/* harmony import */ var _core_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36085);
/* harmony import */ var _core_Eventful_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34463);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(51549);
/* harmony import */ var _graphic_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(41443);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30582);
/* harmony import */ var _graphic_constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22434);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84143);










function createDom(id, painter, dpr) {
    var newDom = _core_platform_js__WEBPACK_IMPORTED_MODULE_0__/* .platformApi */ .yh.createCanvas();
    var width = painter.getWidth();
    var height = painter.getHeight();
    var newDomStyle = newDom.style;
    if (newDomStyle) {
        newDomStyle.position = 'absolute';
        newDomStyle.left = '0';
        newDomStyle.top = '0';
        newDomStyle.width = width + 'px';
        newDomStyle.height = height + 'px';
        newDom.setAttribute('data-zr-dom-id', id);
    }
    newDom.width = width * dpr;
    newDom.height = height * dpr;
    return newDom;
}
function isIncrementalLayer(layer) {
    return !layer.__cursors.get(_core_types_js__WEBPACK_IMPORTED_MODULE_1__/* .INCREMENTAL_ID_FALSE */ .$z);
}
function getStartEndFromCursor(layer) {
    var cursor = layer.__cursors.get(_core_types_js__WEBPACK_IMPORTED_MODULE_1__/* .INCREMENTAL_ID_FALSE */ .$z);
    return {
        startIdx: cursor ? cursor.startIdx : 0,
        endIdx: cursor ? cursor.endIdx : 0
    };
}
;
var Layer = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__/* .__extends */ .C6)(Layer, _super);
    function Layer(id, painter, dpr) {
        var _this = _super.call(this) || this;
        _this.motionBlur = false;
        _this.lastFrameAlpha = 0.7;
        _this.dpr = 1;
        _this.virtual = false;
        _this.config = {};
        _this.zlevel = 0;
        _this.zlevel2 = _core_types_js__WEBPACK_IMPORTED_MODULE_1__/* .ZLEVEL2_NORMAL_BELOW */ .r4;
        _this.maxRepaintRectCount = 5;
        _this.__dirty = true;
        _this.__firstTimePaint = true;
        _this.__prevIdx = { startIdx: 0, endIdx: 0 };
        var dom;
        dpr = dpr || _config_js__WEBPACK_IMPORTED_MODULE_3__/* .devicePixelRatio */ .Y5;
        if (typeof id === 'string') {
            dom = createDom(id, painter, dpr);
        }
        else if (_core_util_js__WEBPACK_IMPORTED_MODULE_4__.isObject(id)) {
            dom = id;
            id = dom.id;
        }
        _this.id = id;
        _this.dom = dom;
        var domStyle = dom.style;
        if (domStyle) {
            _core_util_js__WEBPACK_IMPORTED_MODULE_4__.disableUserSelect(dom);
            dom.onselectstart = function () { return false; };
            domStyle.padding = '0';
            domStyle.margin = '0';
            domStyle.borderWidth = '0';
        }
        _this.painter = painter;
        _this.dpr = dpr;
        return _this;
    }
    Layer.prototype.afterBrush = function () {
        this.__prevIdx = getStartEndFromCursor(this);
    };
    Layer.prototype.initContext = function () {
        this.ctx = this.dom.getContext('2d');
        this.ctx.dpr = this.dpr;
    };
    Layer.prototype.setUnpainted = function () {
        this.__firstTimePaint = true;
    };
    Layer.prototype.createBackBuffer = function () {
        var dpr = this.dpr;
        this.domBack = createDom('back-' + this.id, this.painter, dpr);
        this.ctxBack = this.domBack.getContext('2d');
        if (dpr !== 1) {
            this.ctxBack.scale(dpr, dpr);
        }
    };
    Layer.prototype.createRepaintRects = function (displayList, prevList, viewWidth, viewHeight) {
        if (this.__firstTimePaint) {
            this.__firstTimePaint = false;
            return null;
        }
        var mergedRepaintRects = [];
        var maxRepaintRectCount = this.maxRepaintRectCount;
        var full = false;
        var pendingRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(0, 0, 0, 0);
        function addRectToMergePool(rect) {
            if (!rect.isFinite() || rect.isZero()) {
                return;
            }
            if (mergedRepaintRects.length === 0) {
                var boundingRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(0, 0, 0, 0);
                boundingRect.copy(rect);
                mergedRepaintRects.push(boundingRect);
            }
            else {
                var isMerged = false;
                var minDeltaArea = Infinity;
                var bestRectToMergeIdx = 0;
                for (var i = 0; i < mergedRepaintRects.length; ++i) {
                    var mergedRect = mergedRepaintRects[i];
                    if (mergedRect.intersect(rect)) {
                        var pendingRect_1 = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(0, 0, 0, 0);
                        pendingRect_1.copy(mergedRect);
                        pendingRect_1.union(rect);
                        mergedRepaintRects[i] = pendingRect_1;
                        isMerged = true;
                        break;
                    }
                    else if (full) {
                        pendingRect.copy(rect);
                        pendingRect.union(mergedRect);
                        var aArea = rect.width * rect.height;
                        var bArea = mergedRect.width * mergedRect.height;
                        var pendingArea = pendingRect.width * pendingRect.height;
                        var deltaArea = pendingArea - aArea - bArea;
                        if (deltaArea < minDeltaArea) {
                            minDeltaArea = deltaArea;
                            bestRectToMergeIdx = i;
                        }
                    }
                }
                if (full) {
                    mergedRepaintRects[bestRectToMergeIdx].union(rect);
                    isMerged = true;
                }
                if (!isMerged) {
                    var boundingRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(0, 0, 0, 0);
                    boundingRect.copy(rect);
                    mergedRepaintRects.push(boundingRect);
                }
                if (!full) {
                    full = mergedRepaintRects.length >= maxRepaintRectCount;
                }
            }
        }
        var se = getStartEndFromCursor(this);
        for (var i = se.startIdx; i < se.endIdx; ++i) {
            var el = displayList[i];
            if (el) {
                var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
                var prevRect = el.__isRendered && ((el.__dirty & _graphic_constants_js__WEBPACK_IMPORTED_MODULE_6__/* .REDRAW_BIT */ .M) || !shouldPaint)
                    ? el.getPrevPaintRect()
                    : null;
                if (prevRect) {
                    addRectToMergePool(prevRect);
                }
                var curRect = shouldPaint && ((el.__dirty & _graphic_constants_js__WEBPACK_IMPORTED_MODULE_6__/* .REDRAW_BIT */ .M) || !el.__isRendered)
                    ? el.getPaintRect()
                    : null;
                if (curRect) {
                    addRectToMergePool(curRect);
                }
            }
        }
        var prevIdx = this.__prevIdx;
        for (var i = prevIdx.startIdx; i < prevIdx.endIdx; ++i) {
            var el = prevList[i];
            var shouldPaint = el && el.shouldBePainted(viewWidth, viewHeight, true, true);
            if (el && (!shouldPaint || !el.__zr) && el.__isRendered) {
                var prevRect = el.getPrevPaintRect();
                if (prevRect) {
                    addRectToMergePool(prevRect);
                }
            }
        }
        var hasIntersections;
        do {
            hasIntersections = false;
            for (var i = 0; i < mergedRepaintRects.length;) {
                if (mergedRepaintRects[i].isZero()) {
                    mergedRepaintRects.splice(i, 1);
                    continue;
                }
                for (var j = i + 1; j < mergedRepaintRects.length;) {
                    if (mergedRepaintRects[i].intersect(mergedRepaintRects[j])) {
                        hasIntersections = true;
                        mergedRepaintRects[i].union(mergedRepaintRects[j]);
                        mergedRepaintRects.splice(j, 1);
                    }
                    else {
                        j++;
                    }
                }
                i++;
            }
        } while (hasIntersections);
        this._paintRects = mergedRepaintRects;
        return mergedRepaintRects;
    };
    Layer.prototype.debugGetPaintRects = function () {
        return (this._paintRects || []).slice();
    };
    Layer.prototype.resize = function (width, height) {
        var dpr = this.dpr;
        var dom = this.dom;
        var domStyle = dom.style;
        var domBack = this.domBack;
        if (domStyle) {
            domStyle.width = width + 'px';
            domStyle.height = height + 'px';
        }
        dom.width = width * dpr;
        dom.height = height * dpr;
        if (domBack) {
            domBack.width = width * dpr;
            domBack.height = height * dpr;
            if (dpr !== 1) {
                this.ctxBack.scale(dpr, dpr);
            }
        }
    };
    Layer.prototype.clear = function (clearAll, clearColor, repaintRects) {
        var dom = this.dom;
        var ctx = this.ctx;
        var width = dom.width;
        var height = dom.height;
        clearColor = clearColor || this.clearColor;
        var haveMotionBLur = this.motionBlur && !clearAll;
        var lastFrameAlpha = this.lastFrameAlpha;
        var dpr = this.dpr;
        var self = this;
        if (haveMotionBLur) {
            if (!this.domBack) {
                this.createBackBuffer();
            }
            this.ctxBack.globalCompositeOperation = 'copy';
            this.ctxBack.drawImage(dom, 0, 0, width / dpr, height / dpr);
        }
        var domBack = this.domBack;
        function doClear(x, y, width, height) {
            ctx.clearRect(x, y, width, height);
            if (clearColor && clearColor !== 'transparent') {
                var clearColorGradientOrPattern = void 0;
                if (_core_util_js__WEBPACK_IMPORTED_MODULE_4__.isGradientObject(clearColor)) {
                    var shouldCache = clearColor.global || (clearColor.__width === width
                        && clearColor.__height === height);
                    clearColorGradientOrPattern = shouldCache
                        && clearColor.__canvasGradient
                        || (0,_helper_js__WEBPACK_IMPORTED_MODULE_7__/* .getCanvasGradient */ .Ff)(ctx, clearColor, {
                            x: 0,
                            y: 0,
                            width: width,
                            height: height
                        });
                    clearColor.__canvasGradient = clearColorGradientOrPattern;
                    clearColor.__width = width;
                    clearColor.__height = height;
                }
                else if (_core_util_js__WEBPACK_IMPORTED_MODULE_4__.isImagePatternObject(clearColor)) {
                    clearColor.scaleX = clearColor.scaleX || dpr;
                    clearColor.scaleY = clearColor.scaleY || dpr;
                    clearColorGradientOrPattern = (0,_graphic_js__WEBPACK_IMPORTED_MODULE_8__/* .createCanvasPattern */ .ZQ)(ctx, clearColor, {
                        dirty: function () {
                            self.setUnpainted();
                            self.painter.refresh();
                        }
                    });
                }
                ctx.save();
                ctx.fillStyle = clearColorGradientOrPattern || clearColor;
                ctx.fillRect(x, y, width, height);
                ctx.restore();
            }
            if (haveMotionBLur) {
                ctx.save();
                ctx.globalAlpha = lastFrameAlpha;
                ctx.drawImage(domBack, x, y, width, height);
                ctx.restore();
            }
        }
        ;
        if (!repaintRects || haveMotionBLur) {
            doClear(0, 0, width, height);
        }
        else if (repaintRects.length) {
            _core_util_js__WEBPACK_IMPORTED_MODULE_4__.each(repaintRects, function (rect) {
                doClear(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
            });
        }
    };
    return Layer;
}(_core_Eventful_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layer);


/***/ }),

/***/ 33377:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fn: () => (/* binding */ setGradient),
/* harmony export */   V$: () => (/* binding */ brush),
/* harmony export */   dT: () => (/* binding */ setPattern),
/* harmony export */   sq: () => (/* binding */ setClipPath)
/* harmony export */ });
/* unused harmony exports brushSVGPath, brushSVGImage, brushSVGTSpan */
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4591);
/* harmony import */ var _graphic_Path_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12682);
/* harmony import */ var _graphic_Image_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(46422);
/* harmony import */ var _contain_text_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(60530);
/* harmony import */ var _graphic_TSpan_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(76059);
/* harmony import */ var _SVGPathRebuilder_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27112);
/* harmony import */ var _mapStyleToAttrs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65763);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52712);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _graphic_helper_image_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(15175);
/* harmony import */ var _cssAnimation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(37067);
/* harmony import */ var _graphic_Text_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(39658);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84143);
/* harmony import */ var _cssEmphasis_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(95784);
/* harmony import */ var _zrender_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(81638);















var round = Math.round;
function isImageLike(val) {
    return val && (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(val.src);
}
function isCanvasLike(val) {
    return val && (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(val.toDataURL);
}
function setStyleAttrs(attrs, style, el, scope) {
    (0,_mapStyleToAttrs_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(function (key, val) {
        var isFillStroke = key === 'fill' || key === 'stroke';
        if (isFillStroke && (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isGradient */ .bn)(val)) {
            setGradient(style, attrs, key, scope);
        }
        else if (isFillStroke && (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isPattern */ .Pt)(val)) {
            setPattern(el, attrs, key, scope);
        }
        else {
            attrs[key] = val;
        }
        if (isFillStroke && scope.ssr && val === 'none') {
            attrs['pointer-events'] = 'visible';
        }
    }, style, el, false);
    setShadow(el, attrs, scope);
}
function setMetaData(attrs, el) {
    var metaData = (0,_zrender_js__WEBPACK_IMPORTED_MODULE_3__.getElementSSRData)(el);
    if (metaData) {
        metaData.each(function (val, key) {
            val != null && (attrs[(_core_js__WEBPACK_IMPORTED_MODULE_4__/* .META_DATA_PREFIX */ .OL + key).toLowerCase()] = val + '');
        });
        if (el.isSilent()) {
            attrs[_core_js__WEBPACK_IMPORTED_MODULE_4__/* .META_DATA_PREFIX */ .OL + 'silent'] = 'true';
        }
    }
}
function noRotateScale(m) {
    return (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isAroundZero */ .Cv)(m[0] - 1)
        && (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isAroundZero */ .Cv)(m[1])
        && (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isAroundZero */ .Cv)(m[2])
        && (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isAroundZero */ .Cv)(m[3] - 1);
}
function noTranslate(m) {
    return (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isAroundZero */ .Cv)(m[4]) && (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isAroundZero */ .Cv)(m[5]);
}
function setTransform(attrs, m, compress) {
    if (m && !(noTranslate(m) && noRotateScale(m))) {
        var mul = compress ? 10 : 1e4;
        attrs.transform = noRotateScale(m)
            ? "translate(" + round(m[4] * mul) / mul + " " + round(m[5] * mul) / mul + ")" : (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getMatrixStr */ .nV)(m);
    }
}
function convertPolyShape(shape, attrs, mul) {
    var points = shape.points;
    var strArr = [];
    for (var i = 0; i < points.length; i++) {
        strArr.push(round(points[i][0] * mul) / mul);
        strArr.push(round(points[i][1] * mul) / mul);
    }
    attrs.points = strArr.join(' ');
}
function validatePolyShape(shape) {
    return !shape.smooth;
}
function createAttrsConvert(desc) {
    var normalizedDesc = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)(desc, function (item) {
        return (typeof item === 'string' ? [item, item] : item);
    });
    return function (shape, attrs, mul) {
        for (var i = 0; i < normalizedDesc.length; i++) {
            var item = normalizedDesc[i];
            var val = shape[item[0]];
            if (val != null) {
                attrs[item[1]] = round(val * mul) / mul;
            }
        }
    };
}
var builtinShapesDef = {
    circle: [createAttrsConvert(['cx', 'cy', 'r'])],
    polyline: [convertPolyShape, validatePolyShape],
    polygon: [convertPolyShape, validatePolyShape]
};
function hasShapeAnimation(el) {
    var animators = el.animators;
    for (var i = 0; i < animators.length; i++) {
        if (animators[i].targetName === 'shape') {
            return true;
        }
    }
    return false;
}
function brushSVGPath(el, scope) {
    var style = el.style;
    var shape = el.shape;
    var builtinShpDef = builtinShapesDef[el.type];
    var attrs = {};
    var needsAnimate = scope.animation;
    var svgElType = 'path';
    var strokePercent = el.style.strokePercent;
    var precision = (scope.compress && (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getPathPrecision */ .MD)(el)) || 4;
    if (builtinShpDef
        && !scope.willUpdate
        && !(builtinShpDef[1] && !builtinShpDef[1](shape))
        && !(needsAnimate && hasShapeAnimation(el))
        && !(strokePercent < 1)) {
        svgElType = el.type;
        var mul = Math.pow(10, precision);
        builtinShpDef[0](shape, attrs, mul);
    }
    else {
        var needBuildPath = !el.path || el.shapeChanged();
        if (!el.path) {
            el.createPathProxy();
        }
        var path = el.path;
        if (needBuildPath) {
            path.beginPath();
            el.buildPath(path, el.shape);
            el.pathUpdated();
        }
        var pathVersion = path.getVersion();
        var elExt = el;
        var svgPathBuilder = elExt.__svgPathBuilder;
        if (elExt.__svgPathVersion !== pathVersion
            || !svgPathBuilder
            || strokePercent !== elExt.__svgPathStrokePercent) {
            if (!svgPathBuilder) {
                svgPathBuilder = elExt.__svgPathBuilder = new _SVGPathRebuilder_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
            }
            svgPathBuilder.reset(precision);
            path.rebuildPath(svgPathBuilder, strokePercent);
            svgPathBuilder.generateStr();
            elExt.__svgPathVersion = pathVersion;
            elExt.__svgPathStrokePercent = strokePercent;
        }
        attrs.d = svgPathBuilder.getStr();
    }
    setTransform(attrs, el.transform);
    setStyleAttrs(attrs, style, el, scope);
    setMetaData(attrs, el);
    scope.animation && (0,_cssAnimation_js__WEBPACK_IMPORTED_MODULE_6__/* .createCSSAnimation */ .wc)(el, attrs, scope);
    scope.emphasis && (0,_cssEmphasis_js__WEBPACK_IMPORTED_MODULE_7__/* .createCSSEmphasis */ .E)(el, attrs, scope);
    return (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)(svgElType, el.id + '', attrs);
}
function brushSVGImage(el, scope) {
    var style = el.style;
    var image = style.image;
    if (image && !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(image)) {
        if (isImageLike(image)) {
            image = image.src;
        }
        else if (isCanvasLike(image)) {
            image = image.toDataURL();
        }
    }
    if (!image) {
        return;
    }
    var x = style.x || 0;
    var y = style.y || 0;
    var dw = style.width;
    var dh = style.height;
    var attrs = {
        href: image,
        width: dw,
        height: dh
    };
    if (x) {
        attrs.x = x;
    }
    if (y) {
        attrs.y = y;
    }
    setTransform(attrs, el.transform);
    setStyleAttrs(attrs, style, el, scope);
    setMetaData(attrs, el);
    scope.animation && (0,_cssAnimation_js__WEBPACK_IMPORTED_MODULE_6__/* .createCSSAnimation */ .wc)(el, attrs, scope);
    return (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('image', el.id + '', attrs);
}
;
function brushSVGTSpan(el, scope) {
    var style = el.style;
    var text = style.text;
    text != null && (text += '');
    if (!text || isNaN(style.x) || isNaN(style.y)) {
        return;
    }
    var font = style.font || _core_platform_js__WEBPACK_IMPORTED_MODULE_8__/* .DEFAULT_FONT */ .OH;
    var x = style.x || 0;
    var y = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .adjustTextY */ .sZ)(style.y || 0, (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_9__/* .getLineHeight */ .ks)(font), style.textBaseline);
    var textAlign = _helper_js__WEBPACK_IMPORTED_MODULE_2__/* .TEXT_ALIGN_TO_ANCHOR */ .eQ[style.textAlign]
        || style.textAlign;
    var attrs = {
        'dominant-baseline': 'central',
        'text-anchor': textAlign
    };
    if ((0,_graphic_Text_js__WEBPACK_IMPORTED_MODULE_10__/* .hasSeparateFont */ .XE)(style)) {
        var separatedFontStr = '';
        var fontStyle = style.fontStyle;
        var fontSize = (0,_graphic_Text_js__WEBPACK_IMPORTED_MODULE_10__/* .parseFontSize */ .I5)(style.fontSize);
        if (!parseFloat(fontSize)) {
            return;
        }
        var fontFamily = style.fontFamily || _core_platform_js__WEBPACK_IMPORTED_MODULE_8__/* .DEFAULT_FONT_FAMILY */ .zs;
        var fontWeight = style.fontWeight;
        separatedFontStr += "font-size:" + fontSize + ";font-family:" + fontFamily + ";";
        if (fontStyle && fontStyle !== 'normal') {
            separatedFontStr += "font-style:" + fontStyle + ";";
        }
        if (fontWeight && fontWeight !== 'normal') {
            separatedFontStr += "font-weight:" + fontWeight + ";";
        }
        attrs.style = separatedFontStr;
    }
    else {
        attrs.style = "font: " + font;
    }
    if (text.match(/\s/)) {
        attrs['xml:space'] = 'preserve';
    }
    if (x) {
        attrs.x = x;
    }
    if (y) {
        attrs.y = y;
    }
    setTransform(attrs, el.transform);
    setStyleAttrs(attrs, style, el, scope);
    setMetaData(attrs, el);
    scope.animation && (0,_cssAnimation_js__WEBPACK_IMPORTED_MODULE_6__/* .createCSSAnimation */ .wc)(el, attrs, scope);
    return (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('text', el.id + '', attrs, undefined, text);
}
function brush(el, scope) {
    if (el instanceof _graphic_Path_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Ay) {
        return brushSVGPath(el, scope);
    }
    else if (el instanceof _graphic_Image_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Ay) {
        return brushSVGImage(el, scope);
    }
    else if (el instanceof _graphic_TSpan_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A) {
        return brushSVGTSpan(el, scope);
    }
}
function setShadow(el, attrs, scope) {
    var style = el.style;
    if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .hasShadow */ .dX)(style)) {
        var shadowKey = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getShadowKey */ .si)(el);
        var shadowCache = scope.shadowCache;
        var shadowId = shadowCache[shadowKey];
        if (!shadowId) {
            var globalScale = el.getGlobalScale();
            var scaleX = globalScale[0];
            var scaleY = globalScale[1];
            if (!scaleX || !scaleY) {
                return;
            }
            var offsetX = style.shadowOffsetX || 0;
            var offsetY = style.shadowOffsetY || 0;
            var blur_1 = style.shadowBlur;
            var _a = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeColor */ .$2)(style.shadowColor), opacity = _a.opacity, color = _a.color;
            var stdDx = blur_1 / 2 / scaleX;
            var stdDy = blur_1 / 2 / scaleY;
            var stdDeviation = stdDx + ' ' + stdDy;
            shadowId = scope.zrId + '-s' + scope.shadowIdx++;
            scope.defs[shadowId] = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('filter', shadowId, {
                'id': shadowId,
                'x': '-100%',
                'y': '-100%',
                'width': '300%',
                'height': '300%'
            }, [
                (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('feDropShadow', '', {
                    'dx': offsetX / scaleX,
                    'dy': offsetY / scaleY,
                    'stdDeviation': stdDeviation,
                    'flood-color': color,
                    'flood-opacity': opacity
                })
            ]);
            shadowCache[shadowKey] = shadowId;
        }
        attrs.filter = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getIdURL */ .Xu)(shadowId);
    }
}
function setGradient(style, attrs, target, scope) {
    var val = style[target];
    var gradientTag;
    var gradientAttrs = {
        'gradientUnits': val.global
            ? 'userSpaceOnUse'
            : 'objectBoundingBox'
    };
    if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isLinearGradient */ .OS)(val)) {
        gradientTag = 'linearGradient';
        gradientAttrs.x1 = val.x;
        gradientAttrs.y1 = val.y;
        gradientAttrs.x2 = val.x2;
        gradientAttrs.y2 = val.y2;
    }
    else if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isRadialGradient */ .OH)(val)) {
        gradientTag = 'radialGradient';
        gradientAttrs.cx = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(val.x, 0.5);
        gradientAttrs.cy = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(val.y, 0.5);
        gradientAttrs.r = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(val.r, 0.5);
    }
    else {
        if (false) {}
        return;
    }
    var colors = val.colorStops;
    var colorStops = [];
    for (var i = 0, len = colors.length; i < len; ++i) {
        var offset = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .round4 */ .XP)(colors[i].offset) * 100 + '%';
        var stopColor = colors[i].color;
        var _a = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeColor */ .$2)(stopColor), color = _a.color, opacity = _a.opacity;
        var stopsAttrs = {
            'offset': offset
        };
        stopsAttrs['stop-color'] = color;
        if (opacity < 1) {
            stopsAttrs['stop-opacity'] = opacity;
        }
        colorStops.push((0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('stop', i + '', stopsAttrs));
    }
    var gradientVNode = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)(gradientTag, '', gradientAttrs, colorStops);
    var gradientKey = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .vNodeToString */ .r3)(gradientVNode);
    var gradientCache = scope.gradientCache;
    var gradientId = gradientCache[gradientKey];
    if (!gradientId) {
        gradientId = scope.zrId + '-g' + scope.gradientIdx++;
        gradientCache[gradientKey] = gradientId;
        gradientAttrs.id = gradientId;
        scope.defs[gradientId] = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)(gradientTag, gradientId, gradientAttrs, colorStops);
    }
    attrs[target] = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getIdURL */ .Xu)(gradientId);
}
function setPattern(el, attrs, target, scope) {
    var val = el.style[target];
    var boundingRect = el.getBoundingRect();
    var patternAttrs = {};
    var repeat = val.repeat;
    var noRepeat = repeat === 'no-repeat';
    var repeatX = repeat === 'repeat-x';
    var repeatY = repeat === 'repeat-y';
    var child;
    if ((0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isImagePattern */ .sL)(val)) {
        var imageWidth_1 = val.imageWidth;
        var imageHeight_1 = val.imageHeight;
        var imageSrc = void 0;
        var patternImage = val.image;
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(patternImage)) {
            imageSrc = patternImage;
        }
        else if (isImageLike(patternImage)) {
            imageSrc = patternImage.src;
        }
        else if (isCanvasLike(patternImage)) {
            imageSrc = patternImage.toDataURL();
        }
        if (typeof Image === 'undefined') {
            var errMsg = 'Image width/height must been given explictly in svg-ssr renderer.';
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.assert)(imageWidth_1, errMsg);
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.assert)(imageHeight_1, errMsg);
        }
        else if (imageWidth_1 == null || imageHeight_1 == null) {
            var setSizeToVNode_1 = function (vNode, img) {
                if (vNode) {
                    var svgEl = vNode.elm;
                    var width = imageWidth_1 || img.width;
                    var height = imageHeight_1 || img.height;
                    if (vNode.tag === 'pattern') {
                        if (repeatX) {
                            height = 1;
                            width /= boundingRect.width;
                        }
                        else if (repeatY) {
                            width = 1;
                            height /= boundingRect.height;
                        }
                    }
                    vNode.attrs.width = width;
                    vNode.attrs.height = height;
                    if (svgEl) {
                        svgEl.setAttribute('width', width);
                        svgEl.setAttribute('height', height);
                    }
                }
            };
            var createdImage = (0,_graphic_helper_image_js__WEBPACK_IMPORTED_MODULE_14__/* .createOrUpdateImage */ .OD)(imageSrc, null, el, function (img) {
                noRepeat || setSizeToVNode_1(patternVNode, img);
                setSizeToVNode_1(child, img);
            });
            if (createdImage && createdImage.width && createdImage.height) {
                imageWidth_1 = imageWidth_1 || createdImage.width;
                imageHeight_1 = imageHeight_1 || createdImage.height;
            }
        }
        child = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('image', 'img', {
            href: imageSrc,
            width: imageWidth_1,
            height: imageHeight_1
        });
        patternAttrs.width = imageWidth_1;
        patternAttrs.height = imageHeight_1;
    }
    else if (val.svgElement) {
        child = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.clone)(val.svgElement);
        patternAttrs.width = val.svgWidth;
        patternAttrs.height = val.svgHeight;
    }
    if (!child) {
        return;
    }
    var patternWidth;
    var patternHeight;
    if (noRepeat) {
        patternWidth = patternHeight = 1;
    }
    else if (repeatX) {
        patternHeight = 1;
        patternWidth = patternAttrs.width / boundingRect.width;
    }
    else if (repeatY) {
        patternWidth = 1;
        patternHeight = patternAttrs.height / boundingRect.height;
    }
    else {
        patternAttrs.patternUnits = 'userSpaceOnUse';
    }
    if (patternWidth != null && !isNaN(patternWidth)) {
        patternAttrs.width = patternWidth;
    }
    if (patternHeight != null && !isNaN(patternHeight)) {
        patternAttrs.height = patternHeight;
    }
    var patternTransform = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getSRTTransformString */ .Z1)(val);
    patternTransform && (patternAttrs.patternTransform = patternTransform);
    var patternVNode = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('pattern', '', patternAttrs, [child]);
    var patternKey = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .vNodeToString */ .r3)(patternVNode);
    var patternCache = scope.patternCache;
    var patternId = patternCache[patternKey];
    if (!patternId) {
        patternId = scope.zrId + '-p' + scope.patternIdx++;
        patternCache[patternKey] = patternId;
        patternAttrs.id = patternId;
        patternVNode = scope.defs[patternId] = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('pattern', patternId, patternAttrs, [child]);
    }
    attrs[target] = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getIdURL */ .Xu)(patternId);
}
function setClipPath(clipPath, attrs, scope) {
    var clipPathCache = scope.clipPathCache, defs = scope.defs;
    var clipPathId = clipPathCache[clipPath.id];
    if (!clipPathId) {
        clipPathId = scope.zrId + '-c' + scope.clipPathIdx++;
        var clipPathAttrs = {
            id: clipPathId
        };
        clipPathCache[clipPath.id] = clipPathId;
        defs[clipPathId] = (0,_core_js__WEBPACK_IMPORTED_MODULE_4__/* .createVNode */ .bF)('clipPath', clipPathId, clipPathAttrs, [brushSVGPath(clipPath, scope)]);
    }
    attrs['clip-path'] = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getIdURL */ .Xu)(clipPathId);
}


/***/ }),

/***/ 37067:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wc: () => (/* binding */ createCSSAnimation)
/* harmony export */ });
/* unused harmony exports EASING_MAP, ANIMATE_STYLE_MAP */
/* harmony import */ var _core_Transformable_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(80252);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52712);
/* harmony import */ var _SVGPathRebuilder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27112);
/* harmony import */ var _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(45857);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4591);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _graphic_CompoundPath_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(251);
/* harmony import */ var _animation_cubicEasing_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79566);
/* harmony import */ var _cssClassId_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17607);









var EASING_MAP = {
    cubicIn: '0.32,0,0.67,0',
    cubicOut: '0.33,1,0.68,1',
    cubicInOut: '0.65,0,0.35,1',
    quadraticIn: '0.11,0,0.5,0',
    quadraticOut: '0.5,1,0.89,1',
    quadraticInOut: '0.45,0,0.55,1',
    quarticIn: '0.5,0,0.75,0',
    quarticOut: '0.25,1,0.5,1',
    quarticInOut: '0.76,0,0.24,1',
    quinticIn: '0.64,0,0.78,0',
    quinticOut: '0.22,1,0.36,1',
    quinticInOut: '0.83,0,0.17,1',
    sinusoidalIn: '0.12,0,0.39,0',
    sinusoidalOut: '0.61,1,0.88,1',
    sinusoidalInOut: '0.37,0,0.63,1',
    exponentialIn: '0.7,0,0.84,0',
    exponentialOut: '0.16,1,0.3,1',
    exponentialInOut: '0.87,0,0.13,1',
    circularIn: '0.55,0,1,0.45',
    circularOut: '0,0.55,0.45,1',
    circularInOut: '0.85,0,0.15,1'
};
var transformOriginKey = 'transform-origin';
function buildPathString(el, kfShape, path) {
    var shape = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, el.shape);
    (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(shape, kfShape);
    el.buildPath(path, shape);
    var svgPathBuilder = new _SVGPathRebuilder_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
    svgPathBuilder.reset((0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getPathPrecision */ .MD)(el));
    path.rebuildPath(svgPathBuilder, 1);
    svgPathBuilder.generateStr();
    return svgPathBuilder.getStr();
}
function setTransformOrigin(target, transform) {
    var originX = transform.originX, originY = transform.originY;
    if (originX || originY) {
        target[transformOriginKey] = originX + "px " + originY + "px";
    }
}
var ANIMATE_STYLE_MAP = {
    fill: 'fill',
    opacity: 'opacity',
    lineWidth: 'stroke-width',
    lineDashOffset: 'stroke-dashoffset'
};
function addAnimation(cssAnim, scope) {
    var animationName = scope.zrId + '-ani-' + scope.cssAnimIdx++;
    scope.cssAnims[animationName] = cssAnim;
    return animationName;
}
function createCompoundPathCSSAnimation(el, attrs, scope) {
    var paths = el.shape.paths;
    var composedAnim = {};
    var cssAnimationCfg;
    var cssAnimationName;
    (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(paths, function (path) {
        var subScope = (0,_core_js__WEBPACK_IMPORTED_MODULE_3__/* .createBrushScope */ .v1)(scope.zrId);
        subScope.animation = true;
        createCSSAnimation(path, {}, subScope, true);
        var cssAnims = subScope.cssAnims;
        var cssNodes = subScope.cssNodes;
        var animNames = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(cssAnims);
        var len = animNames.length;
        if (!len) {
            return;
        }
        cssAnimationName = animNames[len - 1];
        var lastAnim = cssAnims[cssAnimationName];
        for (var percent in lastAnim) {
            var kf = lastAnim[percent];
            composedAnim[percent] = composedAnim[percent] || { d: '' };
            composedAnim[percent].d += kf.d || '';
        }
        for (var className in cssNodes) {
            var val = cssNodes[className].animation;
            if (val.indexOf(cssAnimationName) >= 0) {
                cssAnimationCfg = val;
            }
        }
    });
    if (!cssAnimationCfg) {
        return;
    }
    attrs.d = false;
    var animationName = addAnimation(composedAnim, scope);
    return cssAnimationCfg.replace(cssAnimationName, animationName);
}
function getEasingFunc(easing) {
    return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(easing)
        ? EASING_MAP[easing]
            ? "cubic-bezier(" + EASING_MAP[easing] + ")"
            : (0,_animation_cubicEasing_js__WEBPACK_IMPORTED_MODULE_4__/* .createCubicEasingFunc */ .w)(easing) ? easing : ''
        : '';
}
function createCSSAnimation(el, attrs, scope, onlyShape) {
    var animators = el.animators;
    var len = animators.length;
    var cssAnimations = [];
    if (el instanceof _graphic_CompoundPath_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A) {
        var animationCfg = createCompoundPathCSSAnimation(el, attrs, scope);
        if (animationCfg) {
            cssAnimations.push(animationCfg);
        }
        else if (!len) {
            return;
        }
    }
    else if (!len) {
        return;
    }
    var groupAnimators = {};
    for (var i = 0; i < len; i++) {
        var animator = animators[i];
        var cfgArr = [animator.getMaxTime() / 1000 + 's'];
        var easing = getEasingFunc(animator.getClip().easing);
        var delay = animator.getDelay();
        if (easing) {
            cfgArr.push(easing);
        }
        else {
            cfgArr.push('linear');
        }
        if (delay) {
            cfgArr.push(delay / 1000 + 's');
        }
        if (animator.getLoop()) {
            cfgArr.push('infinite');
        }
        var cfg = cfgArr.join(' ');
        groupAnimators[cfg] = groupAnimators[cfg] || [cfg, []];
        groupAnimators[cfg][1].push(animator);
    }
    function createSingleCSSAnimation(groupAnimator) {
        var animators = groupAnimator[1];
        var len = animators.length;
        var transformKfs = {};
        var shapeKfs = {};
        var finalKfs = {};
        var animationTimingFunctionAttrName = 'animation-timing-function';
        function saveAnimatorTrackToCssKfs(animator, cssKfs, toCssAttrName) {
            var tracks = animator.getTracks();
            var maxTime = animator.getMaxTime();
            for (var k = 0; k < tracks.length; k++) {
                var track = tracks[k];
                if (track.needsAnimate()) {
                    var kfs = track.keyframes;
                    var attrName = track.propName;
                    toCssAttrName && (attrName = toCssAttrName(attrName));
                    if (attrName) {
                        for (var i = 0; i < kfs.length; i++) {
                            var kf = kfs[i];
                            var percent = Math.round(kf.time / maxTime * 100) + '%';
                            var kfEasing = getEasingFunc(kf.easing);
                            var rawValue = kf.rawValue;
                            if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(rawValue) || (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(rawValue)) {
                                cssKfs[percent] = cssKfs[percent] || {};
                                cssKfs[percent][attrName] = kf.rawValue;
                                if (kfEasing) {
                                    cssKfs[percent][animationTimingFunctionAttrName] = kfEasing;
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < len; i++) {
            var animator = animators[i];
            var targetProp = animator.targetName;
            if (!targetProp) {
                !onlyShape && saveAnimatorTrackToCssKfs(animator, transformKfs);
            }
            else if (targetProp === 'shape') {
                saveAnimatorTrackToCssKfs(animator, shapeKfs);
            }
        }
        for (var percent in transformKfs) {
            var transform = {};
            (0,_core_Transformable_js__WEBPACK_IMPORTED_MODULE_6__/* .copyTransform */ .IT)(transform, el);
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(transform, transformKfs[percent]);
            var str = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .getSRTTransformString */ .Z1)(transform);
            var timingFunction = transformKfs[percent][animationTimingFunctionAttrName];
            finalKfs[percent] = str ? {
                transform: str
            } : {};
            setTransformOrigin(finalKfs[percent], transform);
            if (timingFunction) {
                finalKfs[percent][animationTimingFunctionAttrName] = timingFunction;
            }
        }
        ;
        var path;
        var canAnimateShape = true;
        for (var percent in shapeKfs) {
            finalKfs[percent] = finalKfs[percent] || {};
            var isFirst = !path;
            var timingFunction = shapeKfs[percent][animationTimingFunctionAttrName];
            if (isFirst) {
                path = new _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A();
            }
            var len_1 = path.len();
            path.reset();
            finalKfs[percent].d = buildPathString(el, shapeKfs[percent], path);
            var newLen = path.len();
            if (!isFirst && len_1 !== newLen) {
                canAnimateShape = false;
                break;
            }
            if (timingFunction) {
                finalKfs[percent][animationTimingFunctionAttrName] = timingFunction;
            }
        }
        ;
        if (!canAnimateShape) {
            for (var percent in finalKfs) {
                delete finalKfs[percent].d;
            }
        }
        if (!onlyShape) {
            for (var i = 0; i < len; i++) {
                var animator = animators[i];
                var targetProp = animator.targetName;
                if (targetProp === 'style') {
                    saveAnimatorTrackToCssKfs(animator, finalKfs, function (propName) { return ANIMATE_STYLE_MAP[propName]; });
                }
            }
        }
        var percents = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(finalKfs);
        var allTransformOriginSame = true;
        var transformOrigin;
        for (var i = 1; i < percents.length; i++) {
            var p0 = percents[i - 1];
            var p1 = percents[i];
            if (finalKfs[p0][transformOriginKey] !== finalKfs[p1][transformOriginKey]) {
                allTransformOriginSame = false;
                break;
            }
            transformOrigin = finalKfs[p0][transformOriginKey];
        }
        if (allTransformOriginSame && transformOrigin) {
            for (var percent in finalKfs) {
                if (finalKfs[percent][transformOriginKey]) {
                    delete finalKfs[percent][transformOriginKey];
                }
            }
            attrs[transformOriginKey] = transformOrigin;
        }
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.filter)(percents, function (percent) { return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(finalKfs[percent]).length > 0; }).length) {
            var animationName = addAnimation(finalKfs, scope);
            return animationName + " " + groupAnimator[0] + " both";
        }
    }
    for (var key in groupAnimators) {
        var animationCfg = createSingleCSSAnimation(groupAnimators[key]);
        if (animationCfg) {
            cssAnimations.push(animationCfg);
        }
    }
    if (cssAnimations.length) {
        var className = scope.zrId + '-cls-' + (0,_cssClassId_js__WEBPACK_IMPORTED_MODULE_8__/* .getClassId */ .I)();
        scope.cssNodes['.' + className] = {
            animation: cssAnimations.join(',')
        };
        attrs["class"] = className;
    }
}


/***/ }),

/***/ 38953:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* reexport safe */ _renderer_installCanvasRenderer_js__WEBPACK_IMPORTED_MODULE_1__.a),
/* harmony export */   w: () => (/* reexport safe */ _renderer_installSVGRenderer_js__WEBPACK_IMPORTED_MODULE_0__.a)
/* harmony export */ });
/* harmony import */ var _renderer_installSVGRenderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56772);
/* harmony import */ var _renderer_installCanvasRenderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17108);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



/***/ }),

/***/ 40844:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42450);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27354);
/* harmony import */ var _animation_requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92839);
/* harmony import */ var _core_env_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23883);
/* harmony import */ var _core_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36085);
/* harmony import */ var _graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41443);
/* harmony import */ var _graphic_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(22434);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51549);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84143);










var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;
var HOVER_LAYER_DIRTY_NO = undefined;
var HOVER_LAYER_DIRTY_REPAINT_IF_EXISTING = 1;
var HOVER_LAYER_DIRTY_REPAINT = 2;
function isLayerValid(layer) {
    if (!layer) {
        return false;
    }
    if (layer.__builtin__) {
        return true;
    }
    if (typeof (layer.resize) !== 'function'
        || typeof (layer.refresh) !== 'function') {
        return false;
    }
    return true;
}
function createRoot(width, height) {
    var domRoot = document.createElement('div');
    domRoot.style.cssText = [
        'position:relative',
        'width:' + width + 'px',
        'height:' + height + 'px',
        'padding:0',
        'margin:0',
        'border-width:0'
    ].join(';') + ';';
    return domRoot;
}
function createBuiltinLayer(id, painter, zlevel, zlevel2) {
    var layer = new _Layer_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(id, painter, painter.dpr);
    layer.zlevel = zlevel;
    layer.zlevel2 = zlevel2;
    layer.__builtin__ = true;
    resetLayerDrawCursors(layer);
    return layer;
}
function resetLayerDrawCursors(layer) {
    layer.__cursorStack = [];
    layer.__cursors = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.createHashMap();
}
function resetLayerDrawCursor(cursor) {
    cursor.startIdx = cursor.drawIdx = cursor.endIdx = cursor.endIdxNew = 0;
    cursor.used = false;
    cursor.first = cursor.last = NaN;
    cursor.notClearIdx = -1;
    return cursor;
}
function ensureLayerDrawCursor(layer, incrementalCompat) {
    var cursors = layer.__cursors;
    var incremental = +incrementalCompat;
    return cursors.get(incremental)
        || (layer.__cursorStack.push(incremental),
            cursors.set(incremental, resetLayerDrawCursor({ key: incremental })));
}
function eachCursorInLayer(layer, cb) {
    var cursorStack = layer.__cursorStack;
    for (var i = 0; i < cursorStack.length; i++) {
        cb(layer.__cursors.get(cursorStack[i]));
    }
}
function ensureLayerListInZLevel(internal, zlevel) {
    var layers = internal.layers;
    return layers[zlevel] || (layers[zlevel] = new Array(3));
}
function eachLayer(internal, cb, filter) {
    var layerStack = internal.layerStack;
    for (var i = 0; i < layerStack.length; i++) {
        var zlevel = layerStack[i].zl;
        var zlevel2 = layerStack[i].zl2;
        var layer = internal.layers[zlevel][zlevel2];
        if (!filter || ((!(filter & EACH_LAYER_BUILTIN) || layer.__builtin__)
            && (!(filter & EACH_LAYER_NOT_BUILTIN) || !layer.__builtin__)
            && (!(filter & EACH_LAYER_NOT_HOVER) || layer !== internal.hoverlayer))) {
            cb(layer, zlevel, zlevel2, i);
        }
    }
}
var EACH_LAYER_BUILTIN = 1;
var EACH_LAYER_NOT_BUILTIN = 2;
var EACH_LAYER_NOT_HOVER = 4;
var EACH_LAYER_BUILTIN_NOT_HOVER = EACH_LAYER_BUILTIN | EACH_LAYER_NOT_HOVER;
var CanvasPainter = (function () {
    function CanvasPainter(root, storage, opts, id) {
        this.type = 'canvas';
        this._prevDisplayList = [];
        this._layerConfig = {};
        this._needsManuallyCompositing = false;
        this.type = 'canvas';
        this._i = {
            layerStack: [],
            layers: []
        };
        var singleCanvas = !root.nodeName
            || root.nodeName.toUpperCase() === 'CANVAS';
        this._opts = opts = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend({}, opts || {});
        this.dpr = opts.devicePixelRatio || _config_js__WEBPACK_IMPORTED_MODULE_2__/* .devicePixelRatio */ .Y5;
        this._singleCanvas = singleCanvas;
        this.root = root;
        var rootStyle = root.style;
        if (rootStyle) {
            _core_util_js__WEBPACK_IMPORTED_MODULE_1__.disableUserSelect(root);
            root.innerHTML = '';
        }
        this.storage = storage;
        this._prevDisplayList = [];
        if (!singleCanvas) {
            this._width = (0,_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .getSize */ .YC)(root, 0, opts);
            this._height = (0,_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .getSize */ .YC)(root, 1, opts);
            var domRoot = this._domRoot = createRoot(this._width, this._height);
            root.appendChild(domRoot);
        }
        else {
            var rootCanvas = root;
            var width = rootCanvas.width;
            var height = rootCanvas.height;
            if (opts.width != null) {
                width = opts.width;
            }
            if (opts.height != null) {
                height = opts.height;
            }
            this.dpr = opts.devicePixelRatio || 1;
            rootCanvas.width = width * this.dpr;
            rootCanvas.height = height * this.dpr;
            this._width = width;
            this._height = height;
            var singleLayer = createBuiltinLayer(rootCanvas, this, CANVAS_ZLEVEL, _core_types_js__WEBPACK_IMPORTED_MODULE_4__/* .ZLEVEL2_NORMAL_BELOW */ .r4);
            singleLayer.initContext();
            this._insertLayer(singleLayer, CANVAS_ZLEVEL, _core_types_js__WEBPACK_IMPORTED_MODULE_4__/* .ZLEVEL2_NORMAL_BELOW */ .r4, true);
            this._domRoot = root;
        }
    }
    CanvasPainter.prototype.getType = function () {
        return 'canvas';
    };
    CanvasPainter.prototype.isSingleCanvas = function () {
        return this._singleCanvas;
    };
    CanvasPainter.prototype.getViewportRoot = function () {
        return this._domRoot;
    };
    CanvasPainter.prototype.getViewportRootOffset = function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    };
    CanvasPainter.prototype.refresh = function (optOrPaintAll) {
        var opt;
        if (optOrPaintAll && !_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isObject(optOrPaintAll)) {
            opt = { paintAll: !!optOrPaintAll };
        }
        else {
            opt = optOrPaintAll || {};
        }
        var refresh = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2(opt.refresh, true);
        var refreshHover = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2(opt.refreshHover, false);
        if (refreshHover) {
            this._hoverLayerDirty = HOVER_LAYER_DIRTY_REPAINT;
        }
        if (!refresh) {
            if (refreshHover) {
                this._paintHoverList(this.storage.getDisplayList(false));
            }
            return this;
        }
        var list = this.storage.getDisplayList(true);
        this._updateLayerStatus(list, opt.paintAll);
        this._redrawId = Math.random();
        var prevList = this._prevDisplayList;
        this._paintList(list, prevList, this._redrawId);
        var bgColor = this._backgroundColor;
        eachLayer(this._i, function (layer, zlevel, zlevel2, idx) {
            if (layer.refresh) {
                layer.refresh(idx === 0 ? bgColor : null);
            }
        }, EACH_LAYER_NOT_BUILTIN);
        if (this._opts.useDirtyRect) {
            this._prevDisplayList = list.slice();
        }
        return this;
    };
    CanvasPainter.prototype._paintHoverList = function (list) {
        var hoverLayer = this._i.hoverlayer;
        var hoverLayerDirty = this._hoverLayerDirty;
        this._hoverLayerDirty = HOVER_LAYER_DIRTY_NO;
        if (hoverLayerDirty === HOVER_LAYER_DIRTY_NO) {
            return;
        }
        if (!hoverLayer && hoverLayerDirty === HOVER_LAYER_DIRTY_REPAINT) {
            hoverLayer = this._i.hoverlayer = this._ensureLayer(HOVER_LAYER_ZLEVEL);
        }
        if (!hoverLayer) {
            return;
        }
        hoverLayer.clear();
        var scope = {
            inHover: true,
            viewWidth: this._width,
            viewHeight: this._height,
            beforeBrushParam: {}
        };
        var ctx;
        for (var i = 0, len = list.length; i < len; i++) {
            var el = list[i];
            if (!el.__inHover) {
                continue;
            }
            if (!ctx) {
                ctx = hoverLayer.ctx;
                ctx.save();
            }
            var hoverStyle = el.__hoverStyle;
            var originalStyle = void 0;
            if (hoverStyle) {
                originalStyle = el.style;
                el.style = hoverStyle;
            }
            (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brush */ .V$)(ctx, el, scope);
            if (hoverStyle) {
                el.style = originalStyle;
            }
        }
        if (ctx) {
            (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brushLoopFinalize */ .v6)(ctx, scope);
            ctx.restore();
        }
    };
    CanvasPainter.prototype.getHoverLayer = function () {
        return this._ensureLayer(HOVER_LAYER_ZLEVEL);
    };
    CanvasPainter.prototype.paintOne = function (ctx, el) {
        (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brushSingle */ .Xi)(ctx, el);
    };
    CanvasPainter.prototype._paintList = function (list, prevList, redrawId) {
        if (this._redrawId !== redrawId) {
            return;
        }
        var finished = this._doPaintList(list, prevList);
        if (this._needsManuallyCompositing) {
            this._compositeManually();
        }
        if (!finished) {
            var self_1 = this;
            (0,_animation_requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(function () {
                self_1._paintList(list, prevList, redrawId);
            });
        }
        else {
            eachLayer(this._i, function (layer) {
                layer.afterBrush && layer.afterBrush();
            }, EACH_LAYER_BUILTIN_NOT_HOVER);
            this._paintHoverList(list);
        }
    };
    CanvasPainter.prototype._compositeManually = function () {
        var ctx = this._ensureLayer(CANVAS_ZLEVEL).ctx;
        var width = this._domRoot.width;
        var height = this._domRoot.height;
        ctx.clearRect(0, 0, width, height);
        eachLayer(this._i, function (layer) {
            if (layer.virtual) {
                ctx.drawImage(layer.dom, 0, 0, width, height);
            }
        }, EACH_LAYER_BUILTIN);
    };
    CanvasPainter.prototype._doPaintList = function (list, prevList) {
        var painter = this;
        var finished = true;
        eachLayer(this._i, function (layer) {
            var needDraw = false;
            eachCursorInLayer(layer, function (cursor) {
                if (cursor.drawIdx < cursor.endIdx
                    || cursor.notClearIdx >= 0) {
                    needDraw = true;
                }
            });
            if (!needDraw && !layer.__dirty) {
                return;
            }
            var repaintRects = (painter._opts.useDirtyRect && !(0,_Layer_js__WEBPACK_IMPORTED_MODULE_0__/* .isIncrementalLayer */ .e)(layer))
                ? layer.createRepaintRects(list, prevList, painter._width, painter._height) : null;
            var firstLayerKey = painter._i.layerStack[0];
            var contentRetained = true;
            if (layer.__dirty) {
                contentRetained = false;
                layer.__dirty = false;
                var clearColor = (layer.zlevel === firstLayerKey.zl && layer.zlevel2 === firstLayerKey.zl2)
                    ? painter._backgroundColor : null;
                layer.clear(false, clearColor, repaintRects);
            }
            eachCursorInLayer(layer, function (cursor) {
                var cursorFinished = painter._paintPerCursor(layer, cursor, list, repaintRects, contentRetained);
                finished = finished && cursorFinished;
            });
        }, EACH_LAYER_BUILTIN_NOT_HOVER);
        if (_core_env_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.wxa) {
            eachLayer(this._i, function (layer) {
                if (layer && layer.ctx && layer.ctx.draw) {
                    layer.ctx.draw();
                }
            });
        }
        return finished;
    };
    CanvasPainter.prototype._paintPerCursor = function (layer, layerCursor, list, repaintRects, contentRetained) {
        var ctx = layer.ctx;
        if (repaintRects) {
            if (!repaintRects.length) {
                layerCursor.drawIdx = layerCursor.endIdx;
            }
            else {
                var dpr = this.dpr;
                for (var r = 0; r < repaintRects.length; ++r) {
                    var rect = repaintRects[r];
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
                    ctx.clip();
                    this._paintPerCursorInRect(layer, layerCursor, list, rect, contentRetained);
                    ctx.restore();
                }
            }
        }
        else {
            ctx.save();
            this._paintPerCursorInRect(layer, layerCursor, list, null, contentRetained);
            ctx.restore();
        }
        return layerCursor.drawIdx >= layerCursor.endIdx;
    };
    CanvasPainter.prototype._paintPerCursorInRect = function (layer, layerCursor, list, repaintRect, contentRetained) {
        var scope = {
            inHover: false,
            allClipped: false,
            prevEl: null,
            viewWidth: this._width,
            viewHeight: this._height,
            beforeBrushParam: { contentRetained: contentRetained }
        };
        var ctx = layer.ctx;
        var useTimer = (0,_Layer_js__WEBPACK_IMPORTED_MODULE_0__/* .isIncrementalLayer */ .e)(layer);
        var startTime = useTimer && _core_platform_js__WEBPACK_IMPORTED_MODULE_8__/* .platformApi */ .yh.getTime();
        var drawIdxBegin = layerCursor.drawIdx;
        var notClearIdx = layerCursor.notClearIdx;
        var idx = notClearIdx >= 0 ? Math.min(notClearIdx, drawIdxBegin) : drawIdxBegin;
        for (; idx < layerCursor.endIdx; idx++) {
            var el = list[idx];
            if (idx < drawIdxBegin && !el.notClear) {
                continue;
            }
            if (el.__inHover) {
                this._hoverLayerDirty = HOVER_LAYER_DIRTY_REPAINT;
            }
            if (repaintRect != null) {
                var paintRect = el.getPaintRect();
                if (paintRect && paintRect.intersect(repaintRect)) {
                    (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brush */ .V$)(ctx, el, scope);
                    el.setPrevPaintRect(paintRect);
                }
            }
            else {
                (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brush */ .V$)(ctx, el, scope);
            }
            if (useTimer) {
                var dTime = _core_platform_js__WEBPACK_IMPORTED_MODULE_8__/* .platformApi */ .yh.getTime() - startTime;
                if (dTime > 15) {
                    idx++;
                    break;
                }
            }
        }
        (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brushLoopFinalize */ .v6)(ctx, scope);
        layerCursor.drawIdx = Math.max(idx, drawIdxBegin);
    };
    CanvasPainter.prototype.getLayer = function (zlevel, virtual) {
        return this._ensureLayer(zlevel, 0, virtual);
    };
    CanvasPainter.prototype._ensureLayer = function (zlevel, zlevel2, virtual) {
        zlevel2 = zlevel2 || 0;
        var singleCanvas = this._singleCanvas;
        if (singleCanvas && !this._needsManuallyCompositing) {
            zlevel = CANVAS_ZLEVEL;
            zlevel2 = 0;
        }
        var layer = ensureLayerListInZLevel(this._i, zlevel)[zlevel2];
        if (!layer) {
            layer = createBuiltinLayer('zr_' + zlevel + '.' + zlevel2, this, zlevel, zlevel2);
            if (this._layerConfig[zlevel]) {
                _core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge(layer, this._layerConfig[zlevel], true);
            }
            if (virtual
                || (singleCanvas && zlevel !== CANVAS_ZLEVEL)) {
                layer.virtual = true;
            }
            this._insertLayer(layer, zlevel, zlevel2, false);
            layer.initContext();
        }
        return layer;
    };
    CanvasPainter.prototype.insertLayer = function (zlevel, layer) {
        this._insertLayer(layer, zlevel, 0, false);
    };
    CanvasPainter.prototype._insertLayer = function (layer, zlevel, zlevel2, suppressDOMInsert) {
        var internal = this._i;
        var layersMap = internal.layers;
        var layerStack = internal.layerStack;
        var domRoot = this._domRoot;
        var prevLayer = null;
        if (layersMap[zlevel] && layersMap[zlevel][zlevel2]) {
            if (false) {}
            return;
        }
        if (!isLayerValid(layer)) {
            if (false) {}
            return;
        }
        var len = layerStack.length;
        var i = 0;
        while (i < len
            && (layerStack[i].zl < zlevel
                || (layerStack[i].zl === zlevel && layerStack[i].zl2 < zlevel2))) {
            i++;
        }
        if (i > 0) {
            prevLayer = ensureLayerListInZLevel(internal, layerStack[i - 1].zl)[layerStack[i - 1].zl2];
        }
        layerStack.splice(i, 0, { zl: zlevel, zl2: zlevel2 });
        ensureLayerListInZLevel(internal, zlevel)[zlevel2] = layer;
        if (!suppressDOMInsert && !layer.virtual) {
            if (prevLayer) {
                var prevDom = prevLayer.dom;
                if (prevDom.nextSibling) {
                    domRoot.insertBefore(layer.dom, prevDom.nextSibling);
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
            else {
                if (domRoot.firstChild) {
                    domRoot.insertBefore(layer.dom, domRoot.firstChild);
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
        }
        layer.painter || (layer.painter = this);
    };
    CanvasPainter.prototype.eachLayer = function (cb, context) {
        return eachLayer(this._i, function (layer, zlevel) {
            cb.call(context, layer, zlevel);
        });
    };
    CanvasPainter.prototype.eachBuiltinLayer = function (cb, context) {
        return eachLayer(this._i, function (layer, zlevel) {
            cb.call(context, layer, zlevel);
        }, EACH_LAYER_BUILTIN);
    };
    CanvasPainter.prototype.eachOtherLayer = function (cb, context) {
        return eachLayer(this._i, function (layer, zlevel) {
            cb.call(context, layer, zlevel);
        }, EACH_LAYER_NOT_BUILTIN);
    };
    CanvasPainter.prototype.getLayers = function () {
        var layers = {};
        eachLayer(this._i, function (layer, zlevel, zlevel2) {
            layers[layer.id] = layer;
        });
        return layers;
    };
    CanvasPainter.prototype._updateLayerStatus = function (list, paintAll) {
        var painter = this;
        if (painter._singleCanvas) {
            for (var i = 1; i < list.length; i++) {
                var el = list[i];
                if (el.zlevel !== list[i - 1].zlevel || el.incremental) {
                    painter._needsManuallyCompositing = true;
                    break;
                }
            }
        }
        eachLayer(painter._i, function (layer) {
            layer.__dirty = false;
            eachCursorInLayer(layer, function (cursor) {
                cursor.used = false;
                cursor.endIdxNew = 0;
                cursor.notClearIdx = -1;
            });
        }, EACH_LAYER_BUILTIN_NOT_HOVER);
        var prevZLevel;
        var currLayer = null;
        var currCursor = null;
        var aboveIncrementalInCurrZLevel = false;
        for (var idx = 0, len = list.length; idx < len; idx++) {
            var el = list[idx];
            var zlevel = el.zlevel;
            var elIncremental = el.incremental;
            var zlevel2 = void 0;
            if (prevZLevel !== zlevel) {
                prevZLevel = zlevel;
                aboveIncrementalInCurrZLevel = false;
            }
            if (elIncremental) {
                aboveIncrementalInCurrZLevel = true;
                zlevel2 = _core_types_js__WEBPACK_IMPORTED_MODULE_4__/* .ZLEVEL2_INCREMENTAL */ .cw;
            }
            else {
                zlevel2 = aboveIncrementalInCurrZLevel ? _core_types_js__WEBPACK_IMPORTED_MODULE_4__/* .ZLEVEL2_NORMAL_ABOVE */ .XM : _core_types_js__WEBPACK_IMPORTED_MODULE_4__/* .ZLEVEL2_NORMAL_BELOW */ .r4;
            }
            if (!currLayer || zlevel !== currLayer.zlevel || zlevel2 !== currLayer.zlevel2) {
                currLayer = painter._ensureLayer(zlevel, zlevel2);
                currCursor = null;
                if (!currLayer.__builtin__) {
                    _core_util_js__WEBPACK_IMPORTED_MODULE_1__.logError('ZLevel ' + zlevel + ' has been used by unknown layer ' + currLayer.id);
                    continue;
                }
            }
            if (!currCursor || elIncremental !== currCursor.key) {
                currCursor = ensureLayerDrawCursor(currLayer, elIncremental);
                if (!currCursor.used) {
                    currCursor.used = true;
                    if (!paintAll && currCursor.first === el.id) {
                        var idxShift = idx - currCursor.startIdx;
                        currCursor.startIdx = idx;
                        currCursor.drawIdx += idxShift;
                        currCursor.endIdx += idxShift;
                    }
                    else {
                        currLayer.__dirty = true;
                        currCursor.first = el.id;
                        currCursor.startIdx = currCursor.drawIdx = idx;
                        currCursor.endIdx = idx + 1;
                    }
                }
            }
            currCursor.endIdxNew = idx + 1;
            if ((el.__dirty & _graphic_constants_js__WEBPACK_IMPORTED_MODULE_9__/* .REDRAW_BIT */ .M)
                && !el.__inHover) {
                if (!elIncremental
                    || (!el.notClear && idx < currCursor.drawIdx)) {
                    currLayer.__dirty = true;
                }
                if (elIncremental && el.notClear && currCursor.notClearIdx < 0) {
                    currCursor.notClearIdx = idx;
                }
            }
        }
        eachLayer(painter._i, function (layer) {
            var cursorStack = layer.__cursorStack;
            var cursors = layer.__cursors;
            for (var i = cursorStack.length - 1; i >= 0; i--) {
                var cursor = cursors.get(cursorStack[i]);
                if (!cursor.used) {
                    layer.__dirty = true;
                    cursors.removeKey(cursorStack[i]);
                    cursorStack.splice(i, 1);
                }
                else {
                    var endIdxNew = cursor.endIdxNew;
                    if ((0,_Layer_js__WEBPACK_IMPORTED_MODULE_0__/* .isIncrementalLayer */ .e)(layer)
                        ? endIdxNew < cursor.drawIdx
                        : (endIdxNew !== cursor.endIdx
                            || !endIdxNew
                            || list[endIdxNew - 1].id !== cursor.last)) {
                        layer.__dirty = true;
                    }
                    cursor.endIdx = cursor.endIdxNew;
                    cursor.last = endIdxNew ? list[endIdxNew - 1].id : NaN;
                }
            }
            if (layer.__dirty) {
                eachCursorInLayer(layer, function (cursor) {
                    cursor.drawIdx = cursor.startIdx;
                });
                if (painter._hoverLayerDirty === HOVER_LAYER_DIRTY_NO) {
                    painter._hoverLayerDirty = HOVER_LAYER_DIRTY_REPAINT_IF_EXISTING;
                }
            }
        }, EACH_LAYER_BUILTIN_NOT_HOVER);
    };
    CanvasPainter.prototype.clear = function () {
        eachLayer(this._i, function (layer) {
            layer.clear();
            resetLayerDrawCursors(layer);
        }, EACH_LAYER_BUILTIN);
        return this;
    };
    CanvasPainter.prototype.setBackgroundColor = function (backgroundColor) {
        this._backgroundColor = backgroundColor;
        eachLayer(this._i, function (layer) {
            layer.setUnpainted();
        });
    };
    CanvasPainter.prototype.configLayer = function (zlevel, config) {
        if (config) {
            var layerConfig_1 = this._layerConfig;
            if (!layerConfig_1[zlevel]) {
                layerConfig_1[zlevel] = config;
            }
            else {
                _core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge(layerConfig_1[zlevel], config, true);
            }
            eachLayer(this._i, function (layer, zlevel) {
                _core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge(layer, layerConfig_1[zlevel], true);
            });
        }
    };
    CanvasPainter.prototype.delLayer = function (zlevel) {
        var layerStack = this._i.layerStack;
        var layersMap = this._i.layers;
        for (var i = layerStack.length - 1; i >= 0; i--) {
            var key = layerStack[i];
            if (key.zl === zlevel) {
                var layer = layersMap[zlevel][key.zl2];
                if (layer.__builtin__) {
                    continue;
                }
                layerStack.splice(i, 1);
                layersMap[zlevel][key.zl2] = undefined;
                if (!layer.virtual) {
                    var parentNode = layer.dom.parentNode;
                    parentNode && parentNode.removeChild(layer.dom);
                }
            }
        }
    };
    CanvasPainter.prototype.resize = function (width, height) {
        if (!this._domRoot.style) {
            if (width == null || height == null) {
                return;
            }
            this._width = width;
            this._height = height;
            this._ensureLayer(CANVAS_ZLEVEL).resize(width, height);
        }
        else {
            var domRoot = this._domRoot;
            domRoot.style.display = 'none';
            var opts = this._opts;
            var root = this.root;
            width != null && (opts.width = width);
            height != null && (opts.height = height);
            width = (0,_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .getSize */ .YC)(root, 0, opts);
            height = (0,_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .getSize */ .YC)(root, 1, opts);
            domRoot.style.display = '';
            if (this._width !== width || height !== this._height) {
                domRoot.style.width = width + 'px';
                domRoot.style.height = height + 'px';
                eachLayer(this._i, function (layer) {
                    layer.resize(width, height);
                });
                this.refresh({ paintAll: true });
            }
            this._width = width;
            this._height = height;
        }
        return this;
    };
    CanvasPainter.prototype.clearLayer = function (zlevel) {
        _core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(this._i.layers[zlevel], function (layer) {
            if (layer && !layer.__builtin__) {
                layer.clear();
            }
        });
    };
    CanvasPainter.prototype.dispose = function () {
        this.root.innerHTML = '';
        this.root =
            this.storage =
                this._domRoot =
                    this._i = null;
    };
    CanvasPainter.prototype.getRenderedCanvas = function (opts) {
        opts = opts || {};
        if (this._singleCanvas && !this._compositeManually) {
            return this._i.layers[CANVAS_ZLEVEL][0].dom;
        }
        var imageLayer = new _Layer_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A('image', this, opts.pixelRatio || this.dpr);
        imageLayer.initContext();
        imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);
        var ctx = imageLayer.ctx;
        if (opts.pixelRatio <= this.dpr) {
            this.refresh();
            var width_1 = imageLayer.dom.width;
            var height_1 = imageLayer.dom.height;
            eachLayer(this._i, function (layer) {
                if (layer.__builtin__) {
                    ctx.drawImage(layer.dom, 0, 0, width_1, height_1);
                }
                else if (layer.renderToCanvas) {
                    ctx.save();
                    layer.renderToCanvas(ctx);
                    ctx.restore();
                }
            });
        }
        else {
            var scope = {
                inHover: false,
                viewWidth: this._width,
                viewHeight: this._height,
                beforeBrushParam: {}
            };
            var displayList = this.storage.getDisplayList(true);
            for (var i = 0, len = displayList.length; i < len; i++) {
                var el = displayList[i];
                (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brush */ .V$)(ctx, el, scope);
            }
            (0,_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* .brushLoopFinalize */ .v6)(ctx, scope);
        }
        return imageLayer.dom;
    };
    CanvasPainter.prototype.getWidth = function () {
        return this._width;
    };
    CanvasPainter.prototype.getHeight = function () {
        return this._height;
    };
    return CanvasPainter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasPainter);
;


/***/ }),

/***/ 52712:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $o: () => (/* binding */ getCssString),
/* harmony export */   Ne: () => (/* binding */ createSVGVNode),
/* harmony export */   OL: () => (/* binding */ META_DATA_PREFIX),
/* harmony export */   WA: () => (/* binding */ XLINKNS),
/* harmony export */   bF: () => (/* binding */ createVNode),
/* harmony export */   ix: () => (/* binding */ XML_NAMESPACE),
/* harmony export */   n: () => (/* binding */ createElement),
/* harmony export */   r3: () => (/* binding */ vNodeToString),
/* harmony export */   ty: () => (/* binding */ XMLNS),
/* harmony export */   v1: () => (/* binding */ createBrushScope)
/* harmony export */ });
/* unused harmony export SVGNS */
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _core_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62940);


var SVGNS = 'http://www.w3.org/2000/svg';
var XLINKNS = 'http://www.w3.org/1999/xlink';
var XMLNS = 'http://www.w3.org/2000/xmlns/';
var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
var META_DATA_PREFIX = 'ecmeta_';
function createElement(name) {
    return document.createElementNS(SVGNS, name);
}
;
function createVNode(tag, key, attrs, children, text) {
    return {
        tag: tag,
        attrs: attrs || {},
        children: children,
        text: text,
        key: key
    };
}
function createElementOpen(name, attrs) {
    var attrsStr = [];
    if (attrs) {
        for (var key in attrs) {
            var val = attrs[key];
            var part = key;
            if (val === false) {
                continue;
            }
            else if (val !== true && val != null) {
                part += "=\"" + val + "\"";
            }
            attrsStr.push(part);
        }
    }
    return "<" + name + " " + attrsStr.join(' ') + ">";
}
function createElementClose(name) {
    return "</" + name + ">";
}
function vNodeToString(el, opts) {
    opts = opts || {};
    var S = opts.newline ? '\n' : '';
    function convertElToString(el) {
        var children = el.children, tag = el.tag, attrs = el.attrs, text = el.text;
        return createElementOpen(tag, attrs)
            + (tag !== 'style' ? (0,_core_dom_js__WEBPACK_IMPORTED_MODULE_0__/* .encodeHTML */ .Me)(text) : text || '')
            + (children ? "" + S + (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)(children, function (child) { return convertElToString(child); }).join(S) + S : '')
            + createElementClose(tag);
    }
    return convertElToString(el);
}
function getCssString(selectorNodes, animationNodes, opts) {
    opts = opts || {};
    var S = opts.newline ? '\n' : '';
    var bracketBegin = " {" + S;
    var bracketEnd = S + "}";
    var selectors = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(selectorNodes), function (className) {
        return className + bracketBegin + (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(selectorNodes[className]), function (attrName) {
            return attrName + ":" + selectorNodes[className][attrName] + ";";
        }).join(S) + bracketEnd;
    }).join(S);
    var animations = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(animationNodes), function (animationName) {
        return "@keyframes " + animationName + bracketBegin + (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(animationNodes[animationName]), function (percent) {
            return percent + bracketBegin + (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(animationNodes[animationName][percent]), function (attrName) {
                var val = animationNodes[animationName][percent][attrName];
                if (attrName === 'd') {
                    val = "path(\"" + val + "\")";
                }
                return attrName + ":" + val + ";";
            }).join(S) + bracketEnd;
        }).join(S) + bracketEnd;
    }).join(S);
    if (!selectors && !animations) {
        return '';
    }
    return ['<![CDATA[', selectors, animations, ']]>'].join(S);
}
function createBrushScope(zrId) {
    return {
        zrId: zrId,
        shadowCache: {},
        patternCache: {},
        gradientCache: {},
        clipPathCache: {},
        defs: {},
        cssNodes: {},
        cssAnims: {},
        cssStyleCache: {},
        cssAnimIdx: 0,
        shadowIdx: 0,
        gradientIdx: 0,
        patternIdx: 0,
        clipPathIdx: 0
    };
}
function createSVGVNode(width, height, children, useViewBox) {
    return createVNode('svg', 'root', {
        'width': width,
        'height': height,
        'xmlns': SVGNS,
        'xmlns:xlink': XLINKNS,
        'version': '1.1',
        'baseProfile': 'full',
        'viewBox': useViewBox ? "0 0 " + width + " " + height : false
    }, children);
}


/***/ }),

/***/ 56772:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var zrender_lib_svg_Painter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27006);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

function install(registers) {
  registers.registerPainter('svg', zrender_lib_svg_Painter_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
}

/***/ }),

/***/ 64748:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CanvasRenderer: () => (/* reexport safe */ _lib_export_renderers_js__WEBPACK_IMPORTED_MODULE_0__.K),
/* harmony export */   SVGRenderer: () => (/* reexport safe */ _lib_export_renderers_js__WEBPACK_IMPORTED_MODULE_0__.w)
/* harmony export */ });
/* harmony import */ var _lib_export_renderers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38953);
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



/***/ }),

/***/ 65763:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ mapStyleToAttrs)
/* harmony export */ });
/* harmony import */ var _graphic_Path_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12682);
/* harmony import */ var _graphic_Image_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46422);
/* harmony import */ var _canvas_dashStyle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(53270);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4591);





var NONE = 'none';
var mathRound = Math.round;
function pathHasFill(style) {
    var fill = style.fill;
    return fill != null && fill !== NONE;
}
function pathHasStroke(style) {
    var stroke = style.stroke;
    return stroke != null && stroke !== NONE;
}
var strokeProps = ['lineCap', 'miterLimit', 'lineJoin'];
var svgStrokeProps = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)(strokeProps, function (prop) { return "stroke-" + prop.toLowerCase(); });
function mapStyleToAttrs(updateAttr, style, el, forceUpdate) {
    var opacity = style.opacity == null ? 1 : style.opacity;
    if (el instanceof _graphic_Image_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay) {
        updateAttr('opacity', opacity);
        return;
    }
    if (pathHasFill(style)) {
        var fill = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeColor */ .$2)(style.fill);
        updateAttr('fill', fill.color);
        var fillOpacity = style.fillOpacity != null
            ? style.fillOpacity * fill.opacity * opacity
            : fill.opacity * opacity;
        if (forceUpdate || fillOpacity < 1) {
            updateAttr('fill-opacity', fillOpacity);
        }
    }
    else {
        updateAttr('fill', NONE);
    }
    if (pathHasStroke(style)) {
        var stroke = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeColor */ .$2)(style.stroke);
        updateAttr('stroke', stroke.color);
        var strokeScale = style.strokeNoScale
            ? el.getLineScale()
            : 1;
        var strokeWidth = (strokeScale ? (style.lineWidth || 0) / strokeScale : 0);
        var strokeOpacity = style.strokeOpacity != null
            ? style.strokeOpacity * stroke.opacity * opacity
            : stroke.opacity * opacity;
        var strokeFirst = style.strokeFirst;
        if (forceUpdate || strokeWidth !== 1) {
            updateAttr('stroke-width', strokeWidth);
        }
        if (forceUpdate || strokeFirst) {
            updateAttr('paint-order', strokeFirst ? 'stroke' : 'fill');
        }
        if (forceUpdate || strokeOpacity < 1) {
            updateAttr('stroke-opacity', strokeOpacity);
        }
        if (style.lineDash) {
            var _a = (0,_canvas_dashStyle_js__WEBPACK_IMPORTED_MODULE_3__/* .getLineDash */ .V)(el), lineDash = _a[0], lineDashOffset = _a[1];
            if (lineDash) {
                lineDashOffset = mathRound(lineDashOffset || 0);
                updateAttr('stroke-dasharray', lineDash.join(','));
                if (lineDashOffset || forceUpdate) {
                    updateAttr('stroke-dashoffset', lineDashOffset);
                }
            }
        }
        else if (forceUpdate) {
            updateAttr('stroke-dasharray', NONE);
        }
        for (var i = 0; i < strokeProps.length; i++) {
            var propName = strokeProps[i];
            if (forceUpdate || style[propName] !== _graphic_Path_js__WEBPACK_IMPORTED_MODULE_4__/* .DEFAULT_PATH_STYLE */ .MW[propName]) {
                var val = style[propName] || _graphic_Path_js__WEBPACK_IMPORTED_MODULE_4__/* .DEFAULT_PATH_STYLE */ .MW[propName];
                val && updateAttr(svgStrokeProps[i], val);
            }
        }
    }
    else if (forceUpdate) {
        updateAttr('stroke', NONE);
    }
}


/***/ }),

/***/ 91939:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bo: () => (/* binding */ parentNode),
/* harmony export */   Mq: () => (/* binding */ createTextNode),
/* harmony export */   NI: () => (/* binding */ appendChild),
/* harmony export */   _3: () => (/* binding */ nextSibling),
/* harmony export */   fL: () => (/* binding */ setTextContent),
/* harmony export */   nc: () => (/* binding */ insertBefore),
/* harmony export */   zz: () => (/* binding */ removeChild)
/* harmony export */ });
/* unused harmony exports createComment, tagName, getTextContent, isElement, isText, isComment */
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}


/***/ }),

/***/ 95784:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ createCSSEmphasis)
/* harmony export */ });
/* harmony import */ var _tool_color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19746);
/* harmony import */ var _cssClassId_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17607);


function createCSSEmphasis(el, attrs, scope) {
    if (!el.ignore) {
        if (el.isSilent()) {
            var style = {
                'pointer-events': 'none'
            };
            setClassAttribute(style, attrs, scope, true);
        }
        else {
            var emphasisStyle = el.states.emphasis && el.states.emphasis.style
                ? el.states.emphasis.style
                : {};
            var fill = emphasisStyle.fill;
            if (!fill) {
                var normalFill = el.style && el.style.fill;
                var selectFill = el.states.select
                    && el.states.select.style
                    && el.states.select.style.fill;
                var fromFill = el.currentStates.indexOf('select') >= 0
                    ? (selectFill || normalFill)
                    : normalFill;
                if (fromFill) {
                    fill = (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_0__.liftColor)(fromFill);
                }
            }
            var lineWidth = emphasisStyle.lineWidth;
            if (lineWidth) {
                var scaleX = (!emphasisStyle.strokeNoScale && el.transform)
                    ? el.transform[0]
                    : 1;
                lineWidth = lineWidth / scaleX;
            }
            var style = {
                cursor: 'pointer'
            };
            if (fill) {
                style.fill = fill;
            }
            if (emphasisStyle.stroke) {
                style.stroke = emphasisStyle.stroke;
            }
            if (lineWidth) {
                style['stroke-width'] = lineWidth;
            }
            setClassAttribute(style, attrs, scope, true);
        }
    }
}
function setClassAttribute(style, attrs, scope, withHover) {
    var styleKey = JSON.stringify(style);
    var className = scope.cssStyleCache[styleKey];
    if (!className) {
        className = scope.zrId + '-cls-' + (0,_cssClassId_js__WEBPACK_IMPORTED_MODULE_1__/* .getClassId */ .I)();
        scope.cssStyleCache[styleKey] = className;
        scope.cssNodes['.' + className + (withHover ? ':hover' : '')] = style;
    }
    attrs["class"] = attrs["class"] ? (attrs["class"] + ' ' + className) : className;
}


/***/ })

}]);