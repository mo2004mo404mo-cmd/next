"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[56617],{

/***/ 251:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _Path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12682);


var CompoundPath = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(CompoundPath, _super);
    function CompoundPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'compound';
        return _this;
    }
    CompoundPath.prototype._updatePathDirty = function () {
        var paths = this.shape.paths;
        var dirtyPath = this.shapeChanged();
        for (var i = 0; i < paths.length; i++) {
            dirtyPath = dirtyPath || paths[i].shapeChanged();
        }
        if (dirtyPath) {
            this.dirtyShape();
        }
    };
    CompoundPath.prototype.beforeBrush = function () {
        this._updatePathDirty();
        var paths = this.shape.paths || [];
        var scale = this.getGlobalScale();
        for (var i = 0; i < paths.length; i++) {
            if (!paths[i].path) {
                paths[i].createPathProxy();
            }
            paths[i].path.setScale(scale[0], scale[1], paths[i].segmentIgnoreThreshold);
        }
    };
    CompoundPath.prototype.buildPath = function (ctx, shape) {
        var paths = shape.paths || [];
        for (var i = 0; i < paths.length; i++) {
            paths[i].buildPath(ctx, paths[i].shape, true);
        }
    };
    CompoundPath.prototype.afterBrush = function () {
        var paths = this.shape.paths || [];
        for (var i = 0; i < paths.length; i++) {
            paths[i].pathUpdated();
        }
    };
    CompoundPath.prototype.getBoundingRect = function () {
        this._updatePathDirty.call(this);
        return _Path_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.prototype.getBoundingRect.call(this);
    };
    return CompoundPath;
}(_Path_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CompoundPath);


/***/ }),

/***/ 1084:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42924);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11916);
/* harmony import */ var _core_vector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2103);
/* harmony import */ var _mixin_Draggable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9037);
/* harmony import */ var _core_Eventful_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34463);
/* harmony import */ var _core_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52812);
/* harmony import */ var _core_GestureMgr_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2395);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30582);








var SILENT = 'silent';
function makeEventPacket(eveType, targetInfo, event) {
    return {
        type: eveType,
        event: event,
        target: targetInfo.target,
        topTarget: targetInfo.topTarget,
        cancelBubble: false,
        offsetX: event.zrX,
        offsetY: event.zrY,
        gestureEvent: event.gestureEvent,
        pinchX: event.pinchX,
        pinchY: event.pinchY,
        pinchScale: event.pinchScale,
        wheelDelta: event.zrDelta,
        zrByTouch: event.zrByTouch,
        which: event.which,
        stop: stopEvent
    };
}
function stopEvent() {
    _core_event_js__WEBPACK_IMPORTED_MODULE_0__/* .stop */ .ds(this.event);
}
var EmptyProxy = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__extends */ .C6)(EmptyProxy, _super);
    function EmptyProxy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handler = null;
        return _this;
    }
    EmptyProxy.prototype.dispose = function () { };
    EmptyProxy.prototype.setCursor = function () { };
    return EmptyProxy;
}(_core_Eventful_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A));
var HoveredResult = (function () {
    function HoveredResult(x, y) {
        this.x = x;
        this.y = y;
    }
    return HoveredResult;
}());
var handlerNames = [
    'click', 'dblclick', 'mousewheel', 'mouseout',
    'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];
var tmpRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(0, 0, 0, 0);
var Handler = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__extends */ .C6)(Handler, _super);
    function Handler(storage, painter, proxy, painterRoot, pointerSize) {
        var _this = _super.call(this) || this;
        _this._hovered = new HoveredResult(0, 0);
        _this.storage = storage;
        _this.painter = painter;
        _this.painterRoot = painterRoot;
        _this._pointerSize = pointerSize;
        proxy = proxy || new EmptyProxy();
        _this.proxy = null;
        _this.setHandlerProxy(proxy);
        _this._draggingMgr = new _mixin_Draggable_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(_this);
        return _this;
    }
    Handler.prototype.setHandlerProxy = function (proxy) {
        if (this.proxy) {
            this.proxy.dispose();
        }
        if (proxy) {
            _core_util_js__WEBPACK_IMPORTED_MODULE_5__.each(handlerNames, function (name) {
                proxy.on && proxy.on(name, this[name], this);
            }, this);
            proxy.handler = this;
        }
        this.proxy = proxy;
    };
    Handler.prototype.mousemove = function (event) {
        var x = event.zrX;
        var y = event.zrY;
        var isOutside = isOutsideBoundary(this, x, y);
        var lastHovered = this._hovered;
        var lastHoveredTarget = lastHovered.target;
        if (lastHoveredTarget && !lastHoveredTarget.__zr) {
            lastHovered = this.findHover(lastHovered.x, lastHovered.y);
            lastHoveredTarget = lastHovered.target;
        }
        var hovered = this._hovered = isOutside ? new HoveredResult(x, y) : this.findHover(x, y);
        var hoveredTarget = hovered.target;
        var proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : 'default');
        if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(lastHovered, 'mouseout', event);
        }
        this.dispatchToElement(hovered, 'mousemove', event);
        if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(hovered, 'mouseover', event);
        }
    };
    Handler.prototype.mouseout = function (event) {
        var eventControl = event.zrEventControl;
        if (eventControl !== 'only_globalout') {
            this.dispatchToElement(this._hovered, 'mouseout', event);
        }
        if (eventControl !== 'no_globalout') {
            this.trigger('globalout', { type: 'globalout', event: event });
        }
    };
    Handler.prototype.resize = function () {
        this._hovered = new HoveredResult(0, 0);
    };
    Handler.prototype.dispatch = function (eventName, eventArgs) {
        var handler = this[eventName];
        handler && handler.call(this, eventArgs);
    };
    Handler.prototype.dispose = function () {
        this.proxy.dispose();
        this.storage = null;
        this.proxy = null;
        this.painter = null;
    };
    Handler.prototype.setCursorStyle = function (cursorStyle) {
        var proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(cursorStyle);
    };
    Handler.prototype.dispatchToElement = function (targetInfo, eventName, event) {
        targetInfo = targetInfo || {};
        var el = targetInfo.target;
        if (el && el.silent) {
            return;
        }
        var eventKey = ('on' + eventName);
        var eventPacket = makeEventPacket(eventName, targetInfo, event);
        while (el) {
            el[eventKey]
                && (eventPacket.cancelBubble = !!el[eventKey].call(el, eventPacket));
            el.trigger(eventName, eventPacket);
            el = el.__hostTarget ? el.__hostTarget : el.parent;
            if (eventPacket.cancelBubble) {
                break;
            }
        }
        if (!eventPacket.cancelBubble) {
            this.trigger(eventName, eventPacket);
            if (this.painter && this.painter.eachOtherLayer) {
                this.painter.eachOtherLayer(function (layer) {
                    if (typeof (layer[eventKey]) === 'function') {
                        layer[eventKey].call(layer, eventPacket);
                    }
                    if (layer.trigger) {
                        layer.trigger(eventName, eventPacket);
                    }
                });
            }
        }
    };
    Handler.prototype.findHover = function (x, y, exclude) {
        var list = this.storage.getDisplayList();
        var out = new HoveredResult(x, y);
        setHoverTarget(list, out, x, y, exclude);
        if (this._pointerSize && !out.target) {
            var candidates = [];
            var pointerSize = this._pointerSize;
            var targetSizeHalf = pointerSize / 2;
            var pointerRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(x - targetSizeHalf, y - targetSizeHalf, pointerSize, pointerSize);
            for (var i = list.length - 1; i >= 0; i--) {
                var el = list[i];
                if (el !== exclude
                    && !el.ignore
                    && !el.ignoreCoarsePointer
                    && (!el.parent || !el.parent.ignoreCoarsePointer)) {
                    tmpRect.copy(el.getBoundingRect());
                    if (el.transform) {
                        tmpRect.applyTransform(el.transform);
                    }
                    if (tmpRect.intersect(pointerRect)) {
                        candidates.push(el);
                    }
                }
            }
            if (candidates.length) {
                var rStep = 4;
                var thetaStep = Math.PI / 12;
                var PI2 = Math.PI * 2;
                for (var r = 0; r < targetSizeHalf; r += rStep) {
                    for (var theta = 0; theta < PI2; theta += thetaStep) {
                        var x1 = x + r * Math.cos(theta);
                        var y1 = y + r * Math.sin(theta);
                        setHoverTarget(candidates, out, x1, y1, exclude);
                        if (out.target) {
                            return out;
                        }
                    }
                }
            }
        }
        return out;
    };
    Handler.prototype.processGesture = function (event, stage) {
        if (!this._gestureMgr) {
            this._gestureMgr = new _core_GestureMgr_js__WEBPACK_IMPORTED_MODULE_6__/* .GestureMgr */ ._();
        }
        var gestureMgr = this._gestureMgr;
        stage === 'start' && gestureMgr.clear();
        var gestureInfo = gestureMgr.recognize(event, this.findHover(event.zrX, event.zrY, null).target, this.proxy.dom);
        stage === 'end' && gestureMgr.clear();
        if (gestureInfo) {
            var type = gestureInfo.type;
            event.gestureEvent = type;
            var res = new HoveredResult();
            res.target = gestureInfo.target;
            this.dispatchToElement(res, type, gestureInfo.event);
        }
    };
    return Handler;
}(_core_Eventful_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A));
_core_util_js__WEBPACK_IMPORTED_MODULE_5__.each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (name) {
    Handler.prototype[name] = function (event) {
        var x = event.zrX;
        var y = event.zrY;
        var isOutside = isOutsideBoundary(this, x, y);
        var hovered;
        var hoveredTarget;
        if (name !== 'mouseup' || !isOutside) {
            hovered = this.findHover(x, y);
            hoveredTarget = hovered.target;
        }
        if (name === 'mousedown') {
            this._downEl = hoveredTarget;
            this._downPoint = [event.zrX, event.zrY];
            this._upEl = hoveredTarget;
        }
        else if (name === 'mouseup') {
            this._upEl = hoveredTarget;
        }
        else if (name === 'click') {
            if (this._downEl !== this._upEl
                || !this._downPoint
                || _core_vector_js__WEBPACK_IMPORTED_MODULE_7__.dist(this._downPoint, [event.zrX, event.zrY]) > 4) {
                return;
            }
            this._downPoint = null;
        }
        this.dispatchToElement(hovered, name, event);
    };
});
function isHover(displayable, x, y) {
    if (displayable[displayable.rectHover ? 'rectContain' : 'contain'](x, y)) {
        var el = displayable;
        var isSilent = void 0;
        var ignoreClip = false;
        while (el) {
            if (el.ignoreClip) {
                ignoreClip = true;
            }
            if (!ignoreClip) {
                var clipPath = el.getClipPath();
                if (clipPath && !clipPath.contain(x, y)) {
                    return false;
                }
            }
            if (el.silent) {
                isSilent = true;
            }
            var hostEl = el.__hostTarget;
            el = hostEl ? (el.ignoreHostSilent ? null : hostEl) : el.parent;
        }
        return isSilent ? SILENT : true;
    }
    return false;
}
function setHoverTarget(list, out, x, y, exclude) {
    for (var i = list.length - 1; i >= 0; i--) {
        var el = list[i];
        var hoverCheckResult = void 0;
        if (el !== exclude
            && !el.ignore
            && (hoverCheckResult = isHover(el, x, y))) {
            !out.topTarget && (out.topTarget = el);
            if (hoverCheckResult !== SILENT) {
                out.target = el;
                break;
            }
        }
    }
}
function isOutsideBoundary(handlerInstance, x, y) {
    var painter = handlerInstance.painter;
    return x < 0 || x > painter.getWidth() || y < 0 || y > painter.getHeight();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Handler);


/***/ }),

/***/ 2103:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   applyTransform: () => (/* binding */ applyTransform),
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   copy: () => (/* binding */ copy),
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   dist: () => (/* binding */ dist),
/* harmony export */   distSquare: () => (/* binding */ distSquare),
/* harmony export */   distance: () => (/* binding */ distance),
/* harmony export */   distanceSquare: () => (/* binding */ distanceSquare),
/* harmony export */   div: () => (/* binding */ div),
/* harmony export */   dot: () => (/* binding */ dot),
/* harmony export */   len: () => (/* binding */ len),
/* harmony export */   lenSquare: () => (/* binding */ lenSquare),
/* harmony export */   length: () => (/* binding */ length),
/* harmony export */   lengthSquare: () => (/* binding */ lengthSquare),
/* harmony export */   lerp: () => (/* binding */ lerp),
/* harmony export */   max: () => (/* binding */ max),
/* harmony export */   min: () => (/* binding */ min),
/* harmony export */   mul: () => (/* binding */ mul),
/* harmony export */   negate: () => (/* binding */ negate),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   scale: () => (/* binding */ scale),
/* harmony export */   scaleAndAdd: () => (/* binding */ scaleAndAdd),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   sub: () => (/* binding */ sub)
/* harmony export */ });
function create(x, y) {
    if (x == null) {
        x = 0;
    }
    if (y == null) {
        y = 0;
    }
    return [x, y];
}
function copy(out, v) {
    out[0] = v[0];
    out[1] = v[1];
    return out;
}
function clone(v) {
    return [v[0], v[1]];
}
function set(out, a, b) {
    out[0] = a;
    out[1] = b;
    return out;
}
function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
}
function scaleAndAdd(out, v1, v2, a) {
    out[0] = v1[0] + v2[0] * a;
    out[1] = v1[1] + v2[1] * a;
    return out;
}
function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
}
function len(v) {
    return Math.sqrt(lenSquare(v));
}
var length = len;
function lenSquare(v) {
    return v[0] * v[0] + v[1] * v[1];
}
var lengthSquare = lenSquare;
function mul(out, v1, v2) {
    out[0] = v1[0] * v2[0];
    out[1] = v1[1] * v2[1];
    return out;
}
function div(out, v1, v2) {
    out[0] = v1[0] / v2[0];
    out[1] = v1[1] / v2[1];
    return out;
}
function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
}
function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
}
function normalize(out, v) {
    var d = len(v);
    if (d === 0) {
        out[0] = 0;
        out[1] = 0;
    }
    else {
        out[0] = v[0] / d;
        out[1] = v[1] / d;
    }
    return out;
}
function distance(v1, v2) {
    return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1]));
}
var dist = distance;
function distanceSquare(v1, v2) {
    return (v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}
var distSquare = distanceSquare;
function negate(out, v) {
    out[0] = -v[0];
    out[1] = -v[1];
    return out;
}
function lerp(out, v1, v2, t) {
    out[0] = v1[0] + t * (v2[0] - v1[0]);
    out[1] = v1[1] + t * (v2[1] - v1[1]);
    return out;
}
function applyTransform(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}
function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
}
function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
}


/***/ }),

/***/ 2395:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ GestureMgr)
/* harmony export */ });
/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52812);

var GestureMgr = (function () {
    function GestureMgr() {
        this._track = [];
    }
    GestureMgr.prototype.recognize = function (event, target, root) {
        this._doTrack(event, target, root);
        return this._recognize(event);
    };
    GestureMgr.prototype.clear = function () {
        this._track.length = 0;
        return this;
    };
    GestureMgr.prototype._doTrack = function (event, target, root) {
        var touches = event.touches;
        if (!touches) {
            return;
        }
        var trackItem = {
            points: [],
            touches: [],
            target: target,
            event: event
        };
        for (var i = 0, len = touches.length; i < len; i++) {
            var touch = touches[i];
            var pos = _event_js__WEBPACK_IMPORTED_MODULE_0__/* .clientToLocal */ .Yo(root, touch, {});
            trackItem.points.push([pos.zrX, pos.zrY]);
            trackItem.touches.push(touch);
        }
        this._track.push(trackItem);
    };
    GestureMgr.prototype._recognize = function (event) {
        for (var eventName in recognizers) {
            if (recognizers.hasOwnProperty(eventName)) {
                var gestureInfo = recognizers[eventName](this._track, event);
                if (gestureInfo) {
                    return gestureInfo;
                }
            }
        }
    };
    return GestureMgr;
}());

function dist(pointPair) {
    var dx = pointPair[1][0] - pointPair[0][0];
    var dy = pointPair[1][1] - pointPair[0][1];
    return Math.sqrt(dx * dx + dy * dy);
}
function center(pointPair) {
    return [
        (pointPair[0][0] + pointPair[1][0]) / 2,
        (pointPair[0][1] + pointPair[1][1]) / 2
    ];
}
var recognizers = {
    pinch: function (tracks, event) {
        var trackLen = tracks.length;
        if (!trackLen) {
            return;
        }
        var pinchEnd = (tracks[trackLen - 1] || {}).points;
        var pinchPre = (tracks[trackLen - 2] || {}).points || pinchEnd;
        if (pinchPre
            && pinchPre.length > 1
            && pinchEnd
            && pinchEnd.length > 1) {
            var pinchScale = dist(pinchEnd) / dist(pinchPre);
            !isFinite(pinchScale) && (pinchScale = 1);
            event.pinchScale = pinchScale;
            var pinchCenter = center(pinchEnd);
            event.pinchX = pinchCenter[0];
            event.pinchY = pinchCenter[1];
            return {
                type: 'pinch',
                target: tracks[0].target,
                event: event
            };
        }
    }
};


/***/ }),

/***/ 4591:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $2: () => (/* binding */ normalizeColor),
/* harmony export */   Cv: () => (/* binding */ isAroundZero),
/* harmony export */   MD: () => (/* binding */ getPathPrecision),
/* harmony export */   OH: () => (/* binding */ isRadialGradient),
/* harmony export */   OS: () => (/* binding */ isLinearGradient),
/* harmony export */   Pt: () => (/* binding */ isPattern),
/* harmony export */   WG: () => (/* binding */ encodeBase64),
/* harmony export */   XP: () => (/* binding */ round4),
/* harmony export */   Xu: () => (/* binding */ getIdURL),
/* harmony export */   Z1: () => (/* binding */ getSRTTransformString),
/* harmony export */   bn: () => (/* binding */ isGradient),
/* harmony export */   dX: () => (/* binding */ hasShadow),
/* harmony export */   eQ: () => (/* binding */ TEXT_ALIGN_TO_ANCHOR),
/* harmony export */   nV: () => (/* binding */ getMatrixStr),
/* harmony export */   sL: () => (/* binding */ isImagePattern),
/* harmony export */   sZ: () => (/* binding */ adjustTextY),
/* harmony export */   si: () => (/* binding */ getShadowKey)
/* harmony export */ });
/* unused harmony exports round3, round1, getClipPathsKey, isSVGPattern */
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _tool_color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19746);
/* provided dependency */ var Buffer = __webpack_require__(49304)["hp"];


var mathRound = Math.round;
function normalizeColor(color) {
    var opacity;
    if (!color || color === 'transparent') {
        color = 'none';
    }
    else if (typeof color === 'string' && color.indexOf('rgba') > -1) {
        var arr = (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_0__.parse)(color);
        if (arr) {
            color = 'rgb(' + arr[0] + ',' + arr[1] + ',' + arr[2] + ')';
            opacity = arr[3];
        }
    }
    return {
        color: color,
        opacity: opacity == null ? 1 : opacity
    };
}
var EPSILON = 1e-4;
function isAroundZero(transform) {
    return transform < EPSILON && transform > -EPSILON;
}
function round3(transform) {
    return mathRound(transform * 1e3) / 1e3;
}
function round4(transform) {
    return mathRound(transform * 1e4) / 1e4;
}
function round1(transform) {
    return mathRound(transform * 10) / 10;
}
function getMatrixStr(m) {
    return 'matrix('
        + round3(m[0]) + ','
        + round3(m[1]) + ','
        + round3(m[2]) + ','
        + round3(m[3]) + ','
        + round4(m[4]) + ','
        + round4(m[5])
        + ')';
}
var TEXT_ALIGN_TO_ANCHOR = {
    left: 'start',
    right: 'end',
    center: 'middle',
    middle: 'middle'
};
function adjustTextY(y, lineHeight, textBaseline) {
    if (textBaseline === 'top') {
        y += lineHeight / 2;
    }
    else if (textBaseline === 'bottom') {
        y -= lineHeight / 2;
    }
    return y;
}
function hasShadow(style) {
    return style
        && (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY);
}
function getShadowKey(displayable) {
    var style = displayable.style;
    var globalScale = displayable.getGlobalScale();
    return [
        style.shadowColor,
        (style.shadowBlur || 0).toFixed(2),
        (style.shadowOffsetX || 0).toFixed(2),
        (style.shadowOffsetY || 0).toFixed(2),
        globalScale[0],
        globalScale[1]
    ].join(',');
}
function getClipPathsKey(clipPaths) {
    var key = [];
    if (clipPaths) {
        for (var i = 0; i < clipPaths.length; i++) {
            var clipPath = clipPaths[i];
            key.push(clipPath.id);
        }
    }
    return key.join(',');
}
function isImagePattern(val) {
    return val && (!!val.image);
}
function isSVGPattern(val) {
    return val && (!!val.svgElement);
}
function isPattern(val) {
    return isImagePattern(val) || isSVGPattern(val);
}
function isLinearGradient(val) {
    return val.type === 'linear';
}
function isRadialGradient(val) {
    return val.type === 'radial';
}
function isGradient(val) {
    return val && (val.type === 'linear'
        || val.type === 'radial');
}
function getIdURL(id) {
    return "url(#" + id + ")";
}
function getPathPrecision(el) {
    var scale = el.getGlobalScale();
    var size = Math.max(scale[0], scale[1]);
    return Math.max(Math.ceil(Math.log(size) / Math.log(10)), 1);
}
function getSRTTransformString(transform) {
    var x = transform.x || 0;
    var y = transform.y || 0;
    var rotation = (transform.rotation || 0) * _core_util_js__WEBPACK_IMPORTED_MODULE_1__.RADIAN_TO_DEGREE;
    var scaleX = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2)(transform.scaleX, 1);
    var scaleY = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2)(transform.scaleY, 1);
    var skewX = transform.skewX || 0;
    var skewY = transform.skewY || 0;
    var res = [];
    if (x || y) {
        res.push("translate(" + x + "px," + y + "px)");
    }
    if (rotation) {
        res.push("rotate(" + rotation + ")");
    }
    if (scaleX !== 1 || scaleY !== 1) {
        res.push("scale(" + scaleX + "," + scaleY + ")");
    }
    if (skewX || skewY) {
        res.push("skew(" + mathRound(skewX * _core_util_js__WEBPACK_IMPORTED_MODULE_1__.RADIAN_TO_DEGREE) + "deg, " + mathRound(skewY * _core_util_js__WEBPACK_IMPORTED_MODULE_1__.RADIAN_TO_DEGREE) + "deg)");
    }
    return res.join(' ');
}
var encodeBase64 = (function () {
    if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
        return function (str) {
            return Buffer.from(str).toString('base64');
        };
    }
    if (typeof btoa === 'function' && typeof unescape === 'function' && typeof encodeURIComponent === 'function') {
        return function (str) {
            return btoa(unescape(encodeURIComponent(str)));
        };
    }
    return function (str) {
        if (false) {}
        return null;
    };
})();


/***/ }),

/***/ 9037:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Param = (function () {
    function Param(target, e) {
        this.target = target;
        this.topTarget = e && e.topTarget;
    }
    return Param;
}());
var Draggable = (function () {
    function Draggable(handler) {
        this.handler = handler;
        handler.on('mousedown', this._dragStart, this);
        handler.on('mousemove', this._drag, this);
        handler.on('mouseup', this._dragEnd, this);
    }
    Draggable.prototype._dragStart = function (e) {
        var draggingTarget = e.target;
        while (draggingTarget && !draggingTarget.draggable) {
            draggingTarget = draggingTarget.parent || draggingTarget.__hostTarget;
        }
        if (draggingTarget) {
            this._draggingTarget = draggingTarget;
            draggingTarget.dragging = true;
            this._x = e.offsetX;
            this._y = e.offsetY;
            this.handler.dispatchToElement(new Param(draggingTarget, e), 'dragstart', e.event);
        }
    };
    Draggable.prototype._drag = function (e) {
        var draggingTarget = this._draggingTarget;
        if (draggingTarget) {
            var x = e.offsetX;
            var y = e.offsetY;
            var dx = x - this._x;
            var dy = y - this._y;
            this._x = x;
            this._y = y;
            draggingTarget.drift(dx, dy, e);
            this.handler.dispatchToElement(new Param(draggingTarget, e), 'drag', e.event);
            var dropTarget = this.handler.findHover(x, y, draggingTarget).target;
            var lastDropTarget = this._dropTarget;
            this._dropTarget = dropTarget;
            if (draggingTarget !== dropTarget) {
                if (lastDropTarget && dropTarget !== lastDropTarget) {
                    this.handler.dispatchToElement(new Param(lastDropTarget, e), 'dragleave', e.event);
                }
                if (dropTarget && dropTarget !== lastDropTarget) {
                    this.handler.dispatchToElement(new Param(dropTarget, e), 'dragenter', e.event);
                }
            }
        }
    };
    Draggable.prototype._dragEnd = function (e) {
        var draggingTarget = this._draggingTarget;
        if (draggingTarget) {
            draggingTarget.dragging = false;
        }
        this.handler.dispatchToElement(new Param(draggingTarget, e), 'dragend', e.event);
        if (this._dropTarget) {
            this.handler.dispatchToElement(new Param(this._dropTarget, e), 'drop', e.event);
        }
        this._draggingTarget = null;
        this._dropTarget = null;
    };
    return Draggable;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Draggable);


/***/ }),

/***/ 9342:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Point = (function () {
    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.prototype.copy = function (other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    Point.prototype.equal = function (other) {
        return other.x === this.x && other.y === this.y;
    };
    Point.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Point.prototype.scale = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
    };
    Point.prototype.scaleAndAdd = function (other, scalar) {
        this.x += other.x * scalar;
        this.y += other.y * scalar;
    };
    Point.prototype.sub = function (other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    };
    Point.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Point.prototype.len = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Point.prototype.lenSquare = function () {
        return this.x * this.x + this.y * this.y;
    };
    Point.prototype.normalize = function () {
        var len = this.len();
        this.x /= len;
        this.y /= len;
        return this;
    };
    Point.prototype.distance = function (other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Point.prototype.distanceSquare = function (other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        return dx * dx + dy * dy;
    };
    Point.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    Point.prototype.transform = function (m) {
        if (!m) {
            return;
        }
        var x = this.x;
        var y = this.y;
        this.x = m[0] * x + m[2] * y + m[4];
        this.y = m[1] * x + m[3] * y + m[5];
        return this;
    };
    Point.prototype.toArray = function (out) {
        out[0] = this.x;
        out[1] = this.y;
        return out;
    };
    Point.prototype.fromArray = function (input) {
        this.x = input[0];
        this.y = input[1];
    };
    Point.set = function (p, x, y) {
        p.x = x;
        p.y = y;
    };
    Point.copy = function (p, p2) {
        p.x = p2.x;
        p.y = p2.y;
    };
    Point.len = function (p) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    };
    Point.lenSquare = function (p) {
        return p.x * p.x + p.y * p.y;
    };
    Point.dot = function (p0, p1) {
        return p0.x * p1.x + p0.y * p1.y;
    };
    Point.add = function (out, p0, p1) {
        out.x = p0.x + p1.x;
        out.y = p0.y + p1.y;
    };
    Point.sub = function (out, p0, p1) {
        out.x = p0.x - p1.x;
        out.y = p0.y - p1.y;
    };
    Point.scale = function (out, p0, scalar) {
        out.x = p0.x * scalar;
        out.y = p0.y * scalar;
    };
    Point.scaleAndAdd = function (out, p0, p1, scalar) {
        out.x = p0.x + p1.x * scalar;
        out.y = p0.y + p1.y * scalar;
    };
    Point.lerp = function (out, p0, p1, t) {
        var onet = 1 - t;
        out.x = onet * p0.x + t * p1.x;
        out.y = onet * p0.y + t * p1.y;
    };
    return Point;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Point);


/***/ }),

/***/ 11916:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EPSILON: () => (/* binding */ EPSILON),
/* harmony export */   HashMap: () => (/* binding */ HashMap),
/* harmony export */   RADIAN_TO_DEGREE: () => (/* binding */ RADIAN_TO_DEGREE),
/* harmony export */   assert: () => (/* binding */ assert),
/* harmony export */   assignProps: () => (/* binding */ assignProps),
/* harmony export */   bind: () => (/* binding */ bind),
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   concatArray: () => (/* binding */ concatArray),
/* harmony export */   createCanvas: () => (/* binding */ createCanvas),
/* harmony export */   createHashMap: () => (/* binding */ createHashMap),
/* harmony export */   createObject: () => (/* binding */ createObject),
/* harmony export */   curry: () => (/* binding */ curry),
/* harmony export */   defaults: () => (/* binding */ defaults),
/* harmony export */   disableUserSelect: () => (/* binding */ disableUserSelect),
/* harmony export */   each: () => (/* binding */ each),
/* harmony export */   eqNaN: () => (/* binding */ eqNaN),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   guid: () => (/* binding */ guid),
/* harmony export */   hasOwn: () => (/* binding */ hasOwn),
/* harmony export */   indexOf: () => (/* binding */ indexOf),
/* harmony export */   inherits: () => (/* binding */ inherits),
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isArrayLike: () => (/* binding */ isArrayLike),
/* harmony export */   isBuiltInObject: () => (/* binding */ isBuiltInObject),
/* harmony export */   isDom: () => (/* binding */ isDom),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isGradientObject: () => (/* binding */ isGradientObject),
/* harmony export */   isImagePatternObject: () => (/* binding */ isImagePatternObject),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   isRegExp: () => (/* binding */ isRegExp),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringSafe: () => (/* binding */ isStringSafe),
/* harmony export */   isTypedArray: () => (/* binding */ isTypedArray),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   logError: () => (/* binding */ logError),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   mergeAll: () => (/* binding */ mergeAll),
/* harmony export */   mixin: () => (/* binding */ mixin),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   normalizeCssArray: () => (/* binding */ normalizeCssArray),
/* harmony export */   reduce: () => (/* binding */ reduce),
/* harmony export */   retrieve: () => (/* binding */ retrieve),
/* harmony export */   retrieve2: () => (/* binding */ retrieve2),
/* harmony export */   retrieve3: () => (/* binding */ retrieve3),
/* harmony export */   setAsPrimitive: () => (/* binding */ setAsPrimitive),
/* harmony export */   slice: () => (/* binding */ slice),
/* harmony export */   trim: () => (/* binding */ trim)
/* harmony export */ });
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84143);

var BUILTIN_OBJECT = reduce([
    'Function',
    'RegExp',
    'Date',
    'Error',
    'CanvasGradient',
    'CanvasPattern',
    'Image',
    'Canvas'
], function (obj, val) {
    obj['[object ' + val + ']'] = true;
    return obj;
}, {});
var TYPED_ARRAY = reduce([
    'Int8',
    'Uint8',
    'Uint8Clamped',
    'Int16',
    'Uint16',
    'Int32',
    'Uint32',
    'Float32',
    'Float64'
], function (obj, val) {
    obj['[object ' + val + 'Array]'] = true;
    return obj;
}, {});
var objToString = Object.prototype.toString;
var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var ctorFunction = function () { }.constructor;
var protoFunction = ctorFunction ? ctorFunction.prototype : null;
var protoKey = '__proto__';
var idStart = 0x0907;
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
function guid() {
    if (idStart >= MAX_SAFE_INTEGER) {
        idStart = 0;
    }
    return idStart++;
}
function logError() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof console !== 'undefined') {
        console.error.apply(console, args);
    }
}
function clone(source) {
    if (source == null || typeof source !== 'object') {
        return source;
    }
    var result = source;
    var typeStr = objToString.call(source);
    if (typeStr === '[object Array]') {
        if (!isPrimitive(source)) {
            result = [];
            for (var i = 0, len = source.length; i < len; i++) {
                result[i] = clone(source[i]);
            }
        }
    }
    else if (TYPED_ARRAY[typeStr]) {
        if (!isPrimitive(source)) {
            var Ctor = source.constructor;
            if (Ctor.from) {
                result = Ctor.from(source);
            }
            else {
                result = new Ctor(source.length);
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = source[i];
                }
            }
        }
    }
    else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
        result = {};
        for (var key in source) {
            if (source.hasOwnProperty(key) && key !== protoKey) {
                result[key] = clone(source[key]);
            }
        }
    }
    return result;
}
function merge(target, source, overwrite) {
    if (!isObject(source) || !isObject(target)) {
        return overwrite ? clone(source) : target;
    }
    for (var key in source) {
        if (source.hasOwnProperty(key) && key !== protoKey) {
            var targetProp = target[key];
            var sourceProp = source[key];
            if (isObject(sourceProp)
                && isObject(targetProp)
                && !isArray(sourceProp)
                && !isArray(targetProp)
                && !isDom(sourceProp)
                && !isDom(targetProp)
                && !isBuiltInObject(sourceProp)
                && !isBuiltInObject(targetProp)
                && !isPrimitive(sourceProp)
                && !isPrimitive(targetProp)) {
                merge(targetProp, sourceProp, overwrite);
            }
            else if (overwrite || !(key in target)) {
                target[key] = clone(source[key]);
            }
        }
    }
    return target;
}
function mergeAll(targetAndSources, overwrite) {
    var result = targetAndSources[0];
    for (var i = 1, len = targetAndSources.length; i < len; i++) {
        result = merge(result, targetAndSources[i], overwrite);
    }
    return result;
}
function extend(target, source) {
    if (Object.assign) {
        Object.assign(target, source);
    }
    else {
        for (var key in source) {
            if (source.hasOwnProperty(key) && key !== protoKey) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
function assignProps(tar, src, props) {
    tar = (tar || {});
    for (var idx = 0; idx < props.length; idx++) {
        var prop = props[idx];
        tar[prop] = src[prop];
    }
    return tar;
}
function defaults(target, source, overlay) {
    var keysArr = keys(source);
    for (var i = 0, len = keysArr.length; i < len; i++) {
        var key = keysArr[i];
        if ((overlay ? source[key] != null : target[key] == null)) {
            target[key] = source[key];
        }
    }
    return target;
}
var createCanvas = _platform_js__WEBPACK_IMPORTED_MODULE_0__/* .platformApi */ .yh.createCanvas;
function indexOf(array, value) {
    if (array) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
    }
    return -1;
}
function inherits(clazz, baseClazz) {
    var clazzPrototype = clazz.prototype;
    function F() { }
    F.prototype = baseClazz.prototype;
    clazz.prototype = new F();
    for (var prop in clazzPrototype) {
        if (clazzPrototype.hasOwnProperty(prop)) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
    }
    clazz.prototype.constructor = clazz;
    clazz.superClass = baseClazz;
}
function mixin(target, source, override) {
    target = 'prototype' in target ? target.prototype : target;
    source = 'prototype' in source ? source.prototype : source;
    if (Object.getOwnPropertyNames) {
        var keyList = Object.getOwnPropertyNames(source);
        for (var i = 0; i < keyList.length; i++) {
            var key = keyList[i];
            if (key !== 'constructor') {
                if ((override ? source[key] != null : target[key] == null)) {
                    target[key] = source[key];
                }
            }
        }
    }
    else {
        defaults(target, source, override);
    }
}
function isArrayLike(data) {
    if (!data) {
        return false;
    }
    if (typeof data === 'string') {
        return false;
    }
    return typeof data.length === 'number';
}
function each(arr, cb, context) {
    if (!(arr && cb)) {
        return;
    }
    if (arr.forEach && arr.forEach === nativeForEach) {
        arr.forEach(cb, context);
    }
    else if (arr.length === +arr.length) {
        for (var i = 0, len = arr.length; i < len; i++) {
            cb.call(context, arr[i], i, arr);
        }
    }
    else {
        for (var key in arr) {
            if (arr.hasOwnProperty(key)) {
                cb.call(context, arr[key], key, arr);
            }
        }
    }
}
function map(arr, cb, context) {
    if (!arr) {
        return [];
    }
    if (!cb) {
        return slice(arr);
    }
    if (arr.map && arr.map === nativeMap) {
        return arr.map(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            result.push(cb.call(context, arr[i], i, arr));
        }
        return result;
    }
}
function reduce(arr, cb, memo, context) {
    if (!(arr && cb)) {
        return;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        memo = cb.call(context, memo, arr[i], i, arr);
    }
    return memo;
}
function filter(arr, cb, context) {
    if (!arr) {
        return [];
    }
    if (!cb) {
        return slice(arr);
    }
    if (arr.filter && arr.filter === nativeFilter) {
        return arr.filter(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (cb.call(context, arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    }
}
function find(arr, cb, context) {
    if (!(arr && cb)) {
        return;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        if (cb.call(context, arr[i], i, arr)) {
            return arr[i];
        }
    }
}
function keys(obj) {
    if (!obj) {
        return [];
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keyList = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keyList.push(key);
        }
    }
    return keyList;
}
function bindPolyfill(func, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return function () {
        return func.apply(context, args.concat(nativeSlice.call(arguments)));
    };
}
var bind = (protoFunction && isFunction(protoFunction.bind))
    ? protoFunction.call.bind(protoFunction.bind)
    : bindPolyfill;
function curry(func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () {
        return func.apply(this, args.concat(nativeSlice.call(arguments)));
    };
}

function isArray(value) {
    if (Array.isArray) {
        return Array.isArray(value);
    }
    return objToString.call(value) === '[object Array]';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
function isStringSafe(value) {
    return objToString.call(value) === '[object String]';
}
function isNumber(value) {
    return typeof value === 'number';
}
function isObject(value) {
    var type = typeof value;
    return type === 'function' || (!!value && type === 'object');
}
function isBuiltInObject(value) {
    return !!BUILTIN_OBJECT[objToString.call(value)];
}
function isTypedArray(value) {
    return !!TYPED_ARRAY[objToString.call(value)];
}
function isDom(value) {
    return typeof value === 'object'
        && typeof value.nodeType === 'number'
        && typeof value.ownerDocument === 'object';
}
function isGradientObject(value) {
    return value.colorStops != null;
}
function isImagePatternObject(value) {
    return value.image != null;
}
function isRegExp(value) {
    return objToString.call(value) === '[object RegExp]';
}
function eqNaN(value) {
    return value !== value;
}
function retrieve() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 0, len = args.length; i < len; i++) {
        if (args[i] != null) {
            return args[i];
        }
    }
}
function retrieve2(value0, value1) {
    return value0 != null
        ? value0
        : value1;
}
function retrieve3(value0, value1, value2) {
    return value0 != null
        ? value0
        : value1 != null
            ? value1
            : value2;
}
function slice(arr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return nativeSlice.apply(arr, args);
}
function normalizeCssArray(val) {
    if (typeof (val) === 'number') {
        return [val, val, val, val];
    }
    var len = val.length;
    if (len === 2) {
        return [val[0], val[1], val[0], val[1]];
    }
    else if (len === 3) {
        return [val[0], val[1], val[2], val[1]];
    }
    return val;
}
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
function trim(str) {
    if (str == null) {
        return null;
    }
    else if (typeof str.trim === 'function') {
        return str.trim();
    }
    else {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
}
var primitiveKey = '__ec_primitive__';
function setAsPrimitive(obj) {
    obj[primitiveKey] = true;
}
function isPrimitive(obj) {
    return obj[primitiveKey];
}
var MapPolyfill = (function () {
    function MapPolyfill() {
        this.data = {};
    }
    MapPolyfill.prototype["delete"] = function (key) {
        var existed = this.has(key);
        if (existed) {
            delete this.data[key];
        }
        return existed;
    };
    MapPolyfill.prototype.has = function (key) {
        return this.data.hasOwnProperty(key);
    };
    MapPolyfill.prototype.get = function (key) {
        return this.data[key];
    };
    MapPolyfill.prototype.set = function (key, value) {
        this.data[key] = value;
        return this;
    };
    MapPolyfill.prototype.keys = function () {
        return keys(this.data);
    };
    MapPolyfill.prototype.forEach = function (callback) {
        var data = this.data;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                callback(data[key], key);
            }
        }
    };
    return MapPolyfill;
}());
var isNativeMapSupported = typeof Map === 'function';
function maybeNativeMap() {
    return (isNativeMapSupported ? new Map() : new MapPolyfill());
}
var HashMap = (function () {
    function HashMap(obj) {
        var isArr = isArray(obj);
        this.data = maybeNativeMap();
        var thisMap = this;
        (obj instanceof HashMap)
            ? obj.each(visit)
            : (obj && each(obj, visit));
        function visit(value, key) {
            isArr ? thisMap.set(value, key) : thisMap.set(key, value);
        }
    }
    HashMap.prototype.hasKey = function (key) {
        return this.data.has(key);
    };
    HashMap.prototype.get = function (key) {
        return this.data.get(key);
    };
    HashMap.prototype.set = function (key, value) {
        this.data.set(key, value);
        return value;
    };
    HashMap.prototype.each = function (cb, context) {
        this.data.forEach(function (value, key) {
            cb.call(context, value, key);
        });
    };
    HashMap.prototype.keys = function () {
        var keys = this.data.keys();
        return isNativeMapSupported
            ? Array.from(keys)
            : keys;
    };
    HashMap.prototype.removeKey = function (key) {
        this.data["delete"](key);
    };
    return HashMap;
}());

function createHashMap(obj) {
    return new HashMap(obj);
}
function concatArray(a, b) {
    var newArray = new a.constructor(a.length + b.length);
    for (var i = 0; i < a.length; i++) {
        newArray[i] = a[i];
    }
    var offset = a.length;
    for (var i = 0; i < b.length; i++) {
        newArray[i + offset] = b[i];
    }
    return newArray;
}
function createObject(proto, properties) {
    var obj;
    if (Object.create) {
        obj = Object.create(proto);
    }
    else {
        var StyleCtor = function () { };
        StyleCtor.prototype = proto;
        obj = new StyleCtor();
    }
    if (properties) {
        extend(obj, properties);
    }
    return obj;
}
function disableUserSelect(dom) {
    var domStyle = dom.style;
    domStyle.webkitUserSelect = 'none';
    domStyle.userSelect = 'none';
    domStyle.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    domStyle['-webkit-touch-callout'] = 'none';
}
function hasOwn(own, prop) {
    return own.hasOwnProperty(prop);
}
function noop() { }
var RADIAN_TO_DEGREE = 180 / Math.PI;
var EPSILON = Number.EPSILON || Math.pow(2, -52);


/***/ }),

/***/ 12682:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   MW: () => (/* binding */ DEFAULT_PATH_STYLE)
/* harmony export */ });
/* unused harmony export DEFAULT_PATH_ANIMATION_PROPS */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42924);
/* harmony import */ var _Displayable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34685);
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83660);
/* harmony import */ var _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(45857);
/* harmony import */ var _contain_path_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(97394);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _tool_color_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19746);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42450);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22434);
/* harmony import */ var _core_Transformable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80252);










var DEFAULT_PATH_STYLE = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)({
    fill: '#000',
    stroke: null,
    strokePercent: 1,
    fillOpacity: 1,
    strokeOpacity: 1,
    lineDashOffset: 0,
    lineWidth: 1,
    lineCap: 'butt',
    miterLimit: 10,
    strokeNoScale: false,
    strokeFirst: false
}, _Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_COMMON_STYLE */ .oN);
var DEFAULT_PATH_ANIMATION_PROPS = {
    style: (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)({
        fill: true,
        stroke: true,
        strokePercent: true,
        fillOpacity: true,
        strokeOpacity: true,
        lineDashOffset: true,
        lineWidth: true,
        miterLimit: true
    }, _Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_COMMON_ANIMATION_PROPS */ .sW.style)
};
var pathCopyParams = _core_Transformable_js__WEBPACK_IMPORTED_MODULE_2__/* .TRANSFORMABLE_PROPS */ .Wx.concat(['invisible',
    'culling', 'z', 'z2', 'zlevel', 'parent'
]);
var Path = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__/* .__extends */ .C6)(Path, _super);
    function Path(opts) {
        return _super.call(this, opts) || this;
    }
    Path.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        var style = this.style;
        if (style.decal) {
            var decalEl = this._decalEl = this._decalEl || new Path();
            if (decalEl.buildPath === Path.prototype.buildPath) {
                decalEl.buildPath = function (ctx) {
                    _this.buildPath(ctx, _this.shape);
                };
            }
            decalEl.silent = true;
            var decalElStyle = decalEl.style;
            for (var key in style) {
                if (decalElStyle[key] !== style[key]) {
                    decalElStyle[key] = style[key];
                }
            }
            decalElStyle.fill = style.fill ? style.decal : null;
            decalElStyle.decal = null;
            decalElStyle.shadowColor = null;
            style.strokeFirst && (decalElStyle.stroke = null);
            for (var i = 0; i < pathCopyParams.length; ++i) {
                decalEl[pathCopyParams[i]] = this[pathCopyParams[i]];
            }
            decalEl.__dirty |= _constants_js__WEBPACK_IMPORTED_MODULE_4__/* .REDRAW_BIT */ .M;
        }
        else if (this._decalEl) {
            this._decalEl = null;
        }
    };
    Path.prototype.getDecalElement = function () {
        return this._decalEl;
    };
    Path.prototype._init = function (props) {
        var keysArr = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(props);
        this.shape = this.getDefaultShape();
        var defaultStyle = this.getDefaultStyle();
        if (defaultStyle) {
            this.useStyle(defaultStyle);
        }
        for (var i = 0; i < keysArr.length; i++) {
            var key = keysArr[i];
            var value = props[key];
            if (key === 'style') {
                if (!this.style) {
                    this.useStyle(value);
                }
                else {
                    (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(this.style, value);
                }
            }
            else if (key === 'shape') {
                (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(this.shape, value);
            }
            else {
                _super.prototype.attrKV.call(this, key, value);
            }
        }
        if (!this.style) {
            this.useStyle({});
        }
    };
    Path.prototype.getDefaultStyle = function () {
        return null;
    };
    Path.prototype.getDefaultShape = function () {
        return {};
    };
    Path.prototype.canBeInsideText = function () {
        return this.hasFill();
    };
    Path.prototype.getInsideTextFill = function () {
        var pathFill = this.style.fill;
        if (pathFill !== 'none') {
            if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(pathFill)) {
                var fillLum = (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_5__.lum)(pathFill, 0);
                if (fillLum > 0.5) {
                    return _config_js__WEBPACK_IMPORTED_MODULE_6__/* .DARK_LABEL_COLOR */ ._S;
                }
                else if (fillLum > 0.2) {
                    return _config_js__WEBPACK_IMPORTED_MODULE_6__/* .LIGHTER_LABEL_COLOR */ .tY;
                }
                return _config_js__WEBPACK_IMPORTED_MODULE_6__/* .LIGHT_LABEL_COLOR */ .el;
            }
            else if (pathFill) {
                return _config_js__WEBPACK_IMPORTED_MODULE_6__/* .LIGHT_LABEL_COLOR */ .el;
            }
        }
        return _config_js__WEBPACK_IMPORTED_MODULE_6__/* .DARK_LABEL_COLOR */ ._S;
    };
    Path.prototype.getInsideTextStroke = function (textFill) {
        var pathFill = this.style.fill;
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(pathFill)) {
            var zr = this.__zr;
            var isDarkMode = !!(zr && zr.isDarkMode());
            var isDarkLabel = (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_5__.lum)(textFill, 0) < _config_js__WEBPACK_IMPORTED_MODULE_6__/* .DARK_MODE_THRESHOLD */ .ps;
            if (isDarkMode === isDarkLabel) {
                return pathFill;
            }
        }
    };
    Path.prototype.buildPath = function (ctx, shapeCfg, inBatch) { };
    Path.prototype.pathUpdated = function () {
        this.__dirty &= ~_constants_js__WEBPACK_IMPORTED_MODULE_4__/* .SHAPE_CHANGED_BIT */ .Dl;
    };
    Path.prototype.getUpdatedPathProxy = function (inBatch) {
        !this.path && this.createPathProxy();
        this.path.beginPath();
        this.buildPath(this.path, this.shape, inBatch);
        return this.path;
    };
    Path.prototype.createPathProxy = function () {
        this.path = new _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A(false);
    };
    Path.prototype.hasStroke = function () {
        var style = this.style;
        var stroke = style.stroke;
        return !(stroke == null || stroke === 'none' || !(style.lineWidth > 0));
    };
    Path.prototype.hasFill = function () {
        var style = this.style;
        var fill = style.fill;
        return fill != null && fill !== 'none';
    };
    Path.prototype.getBoundingRect = function () {
        var rect = this._rect;
        var style = this.style;
        var needsUpdateRect = !rect;
        if (needsUpdateRect) {
            var firstInvoke = false;
            if (!this.path) {
                firstInvoke = true;
                this.createPathProxy();
            }
            var path = this.path;
            if (firstInvoke || (this.__dirty & _constants_js__WEBPACK_IMPORTED_MODULE_4__/* .SHAPE_CHANGED_BIT */ .Dl)) {
                path.beginPath();
                this.buildPath(path, this.shape, false);
                this.pathUpdated();
            }
            rect = path.getBoundingRect();
        }
        this._rect = rect;
        if (this.hasStroke() && this.path && this.path.len() > 0) {
            var rectStroke = this._rectStroke || (this._rectStroke = rect.clone());
            if (this.__dirty || needsUpdateRect) {
                rectStroke.copy(rect);
                var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
                var w = style.lineWidth;
                if (!this.hasFill()) {
                    var strokeContainThreshold = this.strokeContainThreshold;
                    w = Math.max(w, strokeContainThreshold == null ? 4 : strokeContainThreshold);
                }
                if (lineScale > 1e-10) {
                    rectStroke.width += w / lineScale;
                    rectStroke.height += w / lineScale;
                    rectStroke.x -= w / lineScale / 2;
                    rectStroke.y -= w / lineScale / 2;
                }
            }
            return rectStroke;
        }
        return rect;
    };
    Path.prototype.contain = function (x, y) {
        var localPos = this.transformCoordToLocal(x, y);
        var rect = this.getBoundingRect();
        var style = this.style;
        x = localPos[0];
        y = localPos[1];
        if (rect.contain(x, y)) {
            var pathProxy = this.path;
            if (this.hasStroke()) {
                var lineWidth = style.lineWidth;
                var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
                if (lineScale > 1e-10) {
                    if (!this.hasFill()) {
                        lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
                    }
                    if (_contain_path_js__WEBPACK_IMPORTED_MODULE_8__/* .containStroke */ .l(pathProxy, lineWidth / lineScale, x, y)) {
                        return true;
                    }
                }
            }
            if (this.hasFill()) {
                return _contain_path_js__WEBPACK_IMPORTED_MODULE_8__/* .contain */ .E(pathProxy, x, y);
            }
        }
        return false;
    };
    Path.prototype.dirtyShape = function () {
        this.__dirty |= _constants_js__WEBPACK_IMPORTED_MODULE_4__/* .SHAPE_CHANGED_BIT */ .Dl;
        if (this._rect) {
            this._rect = null;
        }
        if (this._decalEl) {
            this._decalEl.dirtyShape();
        }
        this.markRedraw();
    };
    Path.prototype.dirty = function () {
        this.dirtyStyle();
        this.dirtyShape();
    };
    Path.prototype.animateShape = function (loop) {
        return this.animate('shape', loop);
    };
    Path.prototype.updateDuringAnimation = function (targetKey) {
        if (targetKey === 'style') {
            this.dirtyStyle();
        }
        else if (targetKey === 'shape') {
            this.dirtyShape();
        }
        else {
            this.markRedraw();
        }
    };
    Path.prototype.attrKV = function (key, value) {
        if (key === 'shape') {
            this.setShape(value);
        }
        else {
            _super.prototype.attrKV.call(this, key, value);
        }
    };
    Path.prototype.setShape = function (keyOrObj, value) {
        var shape = this.shape;
        if (!shape) {
            shape = this.shape = {};
        }
        if (typeof keyOrObj === 'string') {
            shape[keyOrObj] = value;
        }
        else {
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(shape, keyOrObj);
        }
        this.dirtyShape();
        return this;
    };
    Path.prototype.shapeChanged = function () {
        return !!(this.__dirty & _constants_js__WEBPACK_IMPORTED_MODULE_4__/* .SHAPE_CHANGED_BIT */ .Dl);
    };
    Path.prototype.createStyle = function (obj) {
        return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createObject)(DEFAULT_PATH_STYLE, obj);
    };
    Path.prototype._innerSaveToNormal = function (toState) {
        _super.prototype._innerSaveToNormal.call(this, toState);
        var normalState = this._normalState;
        if (toState.shape && !normalState.shape) {
            normalState.shape = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, this.shape);
        }
    };
    Path.prototype._applyStateObj = function (stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
        _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
        if (this.__inHover === _Element_js__WEBPACK_IMPORTED_MODULE_9__/* .IN_HOVER_LAYER_KIND_ONLY_STYLE_CHANGE */ .yx) {
            return;
        }
        var needsRestoreToNormal = !(state && keepCurrentStates);
        var targetShape;
        if (state && state.shape) {
            if (transition) {
                if (keepCurrentStates) {
                    targetShape = state.shape;
                }
                else {
                    targetShape = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, normalState.shape);
                    (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(targetShape, state.shape);
                }
            }
            else {
                targetShape = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, keepCurrentStates ? this.shape : normalState.shape);
                (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(targetShape, state.shape);
            }
        }
        else if (needsRestoreToNormal) {
            targetShape = normalState.shape;
        }
        if (targetShape) {
            if (transition) {
                this.shape = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, this.shape);
                var targetShapePrimaryProps = {};
                var shapeKeys = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(targetShape);
                for (var i = 0; i < shapeKeys.length; i++) {
                    var key = shapeKeys[i];
                    if (typeof targetShape[key] === 'object') {
                        this.shape[key] = targetShape[key];
                    }
                    else {
                        targetShapePrimaryProps[key] = targetShape[key];
                    }
                }
                this._transitionState(stateName, {
                    shape: targetShapePrimaryProps
                }, animationCfg);
            }
            else {
                this.shape = targetShape;
                this.dirtyShape();
            }
        }
    };
    Path.prototype._mergeStates = function (states) {
        var mergedState = _super.prototype._mergeStates.call(this, states);
        var mergedShape;
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.shape) {
                mergedShape = mergedShape || {};
                this._mergeStyle(mergedShape, state.shape);
            }
        }
        if (mergedShape) {
            mergedState.shape = mergedShape;
        }
        return mergedState;
    };
    Path.prototype.getAnimationStyleProps = function () {
        return DEFAULT_PATH_ANIMATION_PROPS;
    };
    Path.prototype.isZeroArea = function () {
        return false;
    };
    Path.extend = function (defaultProps) {
        var Sub = (function (_super) {
            (0,tslib__WEBPACK_IMPORTED_MODULE_3__/* .__extends */ .C6)(Sub, _super);
            function Sub(opts) {
                var _this = _super.call(this, opts) || this;
                defaultProps.init && defaultProps.init.call(_this, opts);
                return _this;
            }
            Sub.prototype.getDefaultStyle = function () {
                return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.clone)(defaultProps.style);
            };
            Sub.prototype.getDefaultShape = function () {
                return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.clone)(defaultProps.shape);
            };
            return Sub;
        }(Path));
        for (var key in defaultProps) {
            if (typeof defaultProps[key] === 'function') {
                Sub.prototype[key] = defaultProps[key];
            }
        }
        return Sub;
    };
    Path.initDefaultProps = (function () {
        var pathProto = Path.prototype;
        pathProto.type = 'path';
        pathProto.strokeContainThreshold = 5;
        pathProto.segmentIgnoreThreshold = 0;
        pathProto.subPixelOptimize = false;
        pathProto.autoBatch = false;
        pathProto.__dirty = _constants_js__WEBPACK_IMPORTED_MODULE_4__/* .REDRAW_BIT */ .M | _constants_js__WEBPACK_IMPORTED_MODULE_4__/* .STYLE_CHANGED_BIT */ .pO | _constants_js__WEBPACK_IMPORTED_MODULE_4__/* .SHAPE_CHANGED_BIT */ .Dl;
    })();
    return Path;
}(_Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Path);


/***/ }),

/***/ 15175:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OD: () => (/* binding */ createOrUpdateImage),
/* harmony export */   SR: () => (/* binding */ findExistImage),
/* harmony export */   xA: () => (/* binding */ isImageReady)
/* harmony export */ });
/* harmony import */ var _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39729);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84143);


var globalImageCache = new _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay(50);
function findExistImage(newImageOrSrc) {
    if (typeof newImageOrSrc === 'string') {
        var cachedImgObj = globalImageCache.get(newImageOrSrc);
        return cachedImgObj && cachedImgObj.image;
    }
    else {
        return newImageOrSrc;
    }
}
function createOrUpdateImage(newImageOrSrc, image, hostEl, onload, cbPayload) {
    if (!newImageOrSrc) {
        return image;
    }
    else if (typeof newImageOrSrc === 'string') {
        if ((image && image.__zrImageSrc === newImageOrSrc) || !hostEl) {
            return image;
        }
        var cachedImgObj = globalImageCache.get(newImageOrSrc);
        var pendingWrap = { hostEl: hostEl, cb: onload, cbPayload: cbPayload };
        if (cachedImgObj) {
            image = cachedImgObj.image;
            !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
        }
        else {
            image = _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .platformApi */ .yh.loadImage(newImageOrSrc, imageOnLoad, imageOnLoad);
            image.__zrImageSrc = newImageOrSrc;
            globalImageCache.put(newImageOrSrc, image.__cachedImgObj = {
                image: image,
                pending: [pendingWrap]
            });
        }
        return image;
    }
    else {
        return newImageOrSrc;
    }
}
function imageOnLoad() {
    var cachedImgObj = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;
    for (var i = 0; i < cachedImgObj.pending.length; i++) {
        var pendingWrap = cachedImgObj.pending[i];
        var cb = pendingWrap.cb;
        cb && cb(this, pendingWrap.cbPayload);
        pendingWrap.hostEl.dirty();
    }
    cachedImgObj.pending.length = 0;
}
function isImageReady(image) {
    return image && image.width && image.height;
}


/***/ }),

/***/ 17017:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _core_curve_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44203);

function containStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    if ((y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
        || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
        || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
        || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)) {
        return false;
    }
    var d = _core_curve_js__WEBPACK_IMPORTED_MODULE_0__/* .cubicProjectPoint */ .Et(x0, y0, x1, y1, x2, y2, x3, y3, x, y, null);
    return d <= _l / 2;
}


/***/ }),

/***/ 19137:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export RectShape */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _Path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12682);
/* harmony import */ var _helper_roundRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26632);
/* harmony import */ var _helper_subPixelOptimize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19983);




var RectShape = (function () {
    function RectShape() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
    return RectShape;
}());

var subPixelOptimizeOutputShape = {};
var Rect = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(Rect, _super);
    function Rect(opts) {
        return _super.call(this, opts) || this;
    }
    Rect.prototype.getDefaultShape = function () {
        return new RectShape();
    };
    Rect.prototype.buildPath = function (ctx, shape) {
        var x;
        var y;
        var width;
        var height;
        if (this.subPixelOptimize) {
            var optimizedShape = (0,_helper_subPixelOptimize_js__WEBPACK_IMPORTED_MODULE_1__/* .subPixelOptimizeRect */ .Op)(subPixelOptimizeOutputShape, shape, this.style);
            x = optimizedShape.x;
            y = optimizedShape.y;
            width = optimizedShape.width;
            height = optimizedShape.height;
            optimizedShape.r = shape.r;
            shape = optimizedShape;
        }
        else {
            x = shape.x;
            y = shape.y;
            width = shape.width;
            height = shape.height;
        }
        if (!shape.r) {
            ctx.rect(x, y, width, height);
        }
        else {
            _helper_roundRect_js__WEBPACK_IMPORTED_MODULE_2__/* .buildPath */ .U(ctx, shape);
        }
    };
    Rect.prototype.isZeroArea = function () {
        return !this.shape.width || !this.shape.height;
    };
    return Rect;
}(_Path_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay));
Rect.prototype.type = 'rect';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rect);


/***/ }),

/***/ 19746:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fastLerp: () => (/* binding */ fastLerp),
/* harmony export */   fastMapToColor: () => (/* binding */ fastMapToColor),
/* harmony export */   lerp: () => (/* binding */ lerp),
/* harmony export */   lift: () => (/* binding */ lift),
/* harmony export */   liftColor: () => (/* binding */ liftColor),
/* harmony export */   lum: () => (/* binding */ lum),
/* harmony export */   mapToColor: () => (/* binding */ mapToColor),
/* harmony export */   modifyAlpha: () => (/* binding */ modifyAlpha),
/* harmony export */   modifyHSL: () => (/* binding */ modifyHSL),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseCssFloat: () => (/* binding */ parseCssFloat),
/* harmony export */   parseCssInt: () => (/* binding */ parseCssInt),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   stringify: () => (/* binding */ stringify),
/* harmony export */   toHex: () => (/* binding */ toHex)
/* harmony export */ });
/* harmony import */ var _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39729);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);


var kCSSColorTable = {
    'transparent': [0, 0, 0, 0], 'aliceblue': [240, 248, 255, 1],
    'antiquewhite': [250, 235, 215, 1], 'aqua': [0, 255, 255, 1],
    'aquamarine': [127, 255, 212, 1], 'azure': [240, 255, 255, 1],
    'beige': [245, 245, 220, 1], 'bisque': [255, 228, 196, 1],
    'black': [0, 0, 0, 1], 'blanchedalmond': [255, 235, 205, 1],
    'blue': [0, 0, 255, 1], 'blueviolet': [138, 43, 226, 1],
    'brown': [165, 42, 42, 1], 'burlywood': [222, 184, 135, 1],
    'cadetblue': [95, 158, 160, 1], 'chartreuse': [127, 255, 0, 1],
    'chocolate': [210, 105, 30, 1], 'coral': [255, 127, 80, 1],
    'cornflowerblue': [100, 149, 237, 1], 'cornsilk': [255, 248, 220, 1],
    'crimson': [220, 20, 60, 1], 'cyan': [0, 255, 255, 1],
    'darkblue': [0, 0, 139, 1], 'darkcyan': [0, 139, 139, 1],
    'darkgoldenrod': [184, 134, 11, 1], 'darkgray': [169, 169, 169, 1],
    'darkgreen': [0, 100, 0, 1], 'darkgrey': [169, 169, 169, 1],
    'darkkhaki': [189, 183, 107, 1], 'darkmagenta': [139, 0, 139, 1],
    'darkolivegreen': [85, 107, 47, 1], 'darkorange': [255, 140, 0, 1],
    'darkorchid': [153, 50, 204, 1], 'darkred': [139, 0, 0, 1],
    'darksalmon': [233, 150, 122, 1], 'darkseagreen': [143, 188, 143, 1],
    'darkslateblue': [72, 61, 139, 1], 'darkslategray': [47, 79, 79, 1],
    'darkslategrey': [47, 79, 79, 1], 'darkturquoise': [0, 206, 209, 1],
    'darkviolet': [148, 0, 211, 1], 'deeppink': [255, 20, 147, 1],
    'deepskyblue': [0, 191, 255, 1], 'dimgray': [105, 105, 105, 1],
    'dimgrey': [105, 105, 105, 1], 'dodgerblue': [30, 144, 255, 1],
    'firebrick': [178, 34, 34, 1], 'floralwhite': [255, 250, 240, 1],
    'forestgreen': [34, 139, 34, 1], 'fuchsia': [255, 0, 255, 1],
    'gainsboro': [220, 220, 220, 1], 'ghostwhite': [248, 248, 255, 1],
    'gold': [255, 215, 0, 1], 'goldenrod': [218, 165, 32, 1],
    'gray': [128, 128, 128, 1], 'green': [0, 128, 0, 1],
    'greenyellow': [173, 255, 47, 1], 'grey': [128, 128, 128, 1],
    'honeydew': [240, 255, 240, 1], 'hotpink': [255, 105, 180, 1],
    'indianred': [205, 92, 92, 1], 'indigo': [75, 0, 130, 1],
    'ivory': [255, 255, 240, 1], 'khaki': [240, 230, 140, 1],
    'lavender': [230, 230, 250, 1], 'lavenderblush': [255, 240, 245, 1],
    'lawngreen': [124, 252, 0, 1], 'lemonchiffon': [255, 250, 205, 1],
    'lightblue': [173, 216, 230, 1], 'lightcoral': [240, 128, 128, 1],
    'lightcyan': [224, 255, 255, 1], 'lightgoldenrodyellow': [250, 250, 210, 1],
    'lightgray': [211, 211, 211, 1], 'lightgreen': [144, 238, 144, 1],
    'lightgrey': [211, 211, 211, 1], 'lightpink': [255, 182, 193, 1],
    'lightsalmon': [255, 160, 122, 1], 'lightseagreen': [32, 178, 170, 1],
    'lightskyblue': [135, 206, 250, 1], 'lightslategray': [119, 136, 153, 1],
    'lightslategrey': [119, 136, 153, 1], 'lightsteelblue': [176, 196, 222, 1],
    'lightyellow': [255, 255, 224, 1], 'lime': [0, 255, 0, 1],
    'limegreen': [50, 205, 50, 1], 'linen': [250, 240, 230, 1],
    'magenta': [255, 0, 255, 1], 'maroon': [128, 0, 0, 1],
    'mediumaquamarine': [102, 205, 170, 1], 'mediumblue': [0, 0, 205, 1],
    'mediumorchid': [186, 85, 211, 1], 'mediumpurple': [147, 112, 219, 1],
    'mediumseagreen': [60, 179, 113, 1], 'mediumslateblue': [123, 104, 238, 1],
    'mediumspringgreen': [0, 250, 154, 1], 'mediumturquoise': [72, 209, 204, 1],
    'mediumvioletred': [199, 21, 133, 1], 'midnightblue': [25, 25, 112, 1],
    'mintcream': [245, 255, 250, 1], 'mistyrose': [255, 228, 225, 1],
    'moccasin': [255, 228, 181, 1], 'navajowhite': [255, 222, 173, 1],
    'navy': [0, 0, 128, 1], 'oldlace': [253, 245, 230, 1],
    'olive': [128, 128, 0, 1], 'olivedrab': [107, 142, 35, 1],
    'orange': [255, 165, 0, 1], 'orangered': [255, 69, 0, 1],
    'orchid': [218, 112, 214, 1], 'palegoldenrod': [238, 232, 170, 1],
    'palegreen': [152, 251, 152, 1], 'paleturquoise': [175, 238, 238, 1],
    'palevioletred': [219, 112, 147, 1], 'papayawhip': [255, 239, 213, 1],
    'peachpuff': [255, 218, 185, 1], 'peru': [205, 133, 63, 1],
    'pink': [255, 192, 203, 1], 'plum': [221, 160, 221, 1],
    'powderblue': [176, 224, 230, 1], 'purple': [128, 0, 128, 1],
    'red': [255, 0, 0, 1], 'rosybrown': [188, 143, 143, 1],
    'royalblue': [65, 105, 225, 1], 'saddlebrown': [139, 69, 19, 1],
    'salmon': [250, 128, 114, 1], 'sandybrown': [244, 164, 96, 1],
    'seagreen': [46, 139, 87, 1], 'seashell': [255, 245, 238, 1],
    'sienna': [160, 82, 45, 1], 'silver': [192, 192, 192, 1],
    'skyblue': [135, 206, 235, 1], 'slateblue': [106, 90, 205, 1],
    'slategray': [112, 128, 144, 1], 'slategrey': [112, 128, 144, 1],
    'snow': [255, 250, 250, 1], 'springgreen': [0, 255, 127, 1],
    'steelblue': [70, 130, 180, 1], 'tan': [210, 180, 140, 1],
    'teal': [0, 128, 128, 1], 'thistle': [216, 191, 216, 1],
    'tomato': [255, 99, 71, 1], 'turquoise': [64, 224, 208, 1],
    'violet': [238, 130, 238, 1], 'wheat': [245, 222, 179, 1],
    'white': [255, 255, 255, 1], 'whitesmoke': [245, 245, 245, 1],
    'yellow': [255, 255, 0, 1], 'yellowgreen': [154, 205, 50, 1]
};
function clampCssByte(i) {
    i = Math.round(i);
    return i < 0 ? 0 : i > 255 ? 255 : i;
}
function clampCssAngle(i) {
    i = Math.round(i);
    return i < 0 ? 0 : i > 360 ? 360 : i;
}
function clampCssFloat(f) {
    return f < 0 ? 0 : f > 1 ? 1 : f;
}
function parseCssInt(val) {
    var str = val;
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssByte(parseFloat(str) / 100 * 255);
    }
    return clampCssByte(parseInt(str, 10));
}
function parseCssFloat(val) {
    var str = val;
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssFloat(parseFloat(str) / 100);
    }
    return clampCssFloat(parseFloat(str));
}
function cssHueToRgb(m1, m2, h) {
    if (h < 0) {
        h += 1;
    }
    else if (h > 1) {
        h -= 1;
    }
    if (h * 6 < 1) {
        return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
        return m2;
    }
    if (h * 3 < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
}
function lerpNumber(a, b, p) {
    return a + (b - a) * p;
}
function setRgba(out, r, g, b, a) {
    out[0] = r;
    out[1] = g;
    out[2] = b;
    out[3] = a;
    return out;
}
function copyRgba(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
var colorCache = new _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay(20);
var lastRemovedArr = null;
function putToCache(colorStr, rgbaArr) {
    if (lastRemovedArr) {
        copyRgba(lastRemovedArr, rgbaArr);
    }
    lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || (rgbaArr.slice()));
}
function parse(colorStr, rgbaArr) {
    if (!colorStr) {
        return;
    }
    rgbaArr = rgbaArr || [];
    var cached = colorCache.get(colorStr);
    if (cached) {
        return copyRgba(rgbaArr, cached);
    }
    colorStr = colorStr + '';
    var str = colorStr.replace(/ /g, '').toLowerCase();
    if (str in kCSSColorTable) {
        copyRgba(rgbaArr, kCSSColorTable[str]);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
    }
    var strLen = str.length;
    if (str.charAt(0) === '#') {
        if (strLen === 4 || strLen === 5) {
            var iv = parseInt(str.slice(1, 4), 16);
            if (!(iv >= 0 && iv <= 0xfff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;
            }
            setRgba(rgbaArr, ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8), (iv & 0xf0) | ((iv & 0xf0) >> 4), (iv & 0xf) | ((iv & 0xf) << 4), strLen === 5 ? parseInt(str.slice(4), 16) / 0xf : 1);
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }
        else if (strLen === 7 || strLen === 9) {
            var iv = parseInt(str.slice(1, 7), 16);
            if (!(iv >= 0 && iv <= 0xffffff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;
            }
            setRgba(rgbaArr, (iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, strLen === 9 ? parseInt(str.slice(7), 16) / 0xff : 1);
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }
        return;
    }
    var op = str.indexOf('(');
    var ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === strLen) {
        var fname = str.substr(0, op);
        var params = str.substr(op + 1, ep - (op + 1)).split(',');
        var alpha = 1;
        switch (fname) {
            case 'rgba':
                if (params.length !== 4) {
                    return params.length === 3
                        ? setRgba(rgbaArr, +params[0], +params[1], +params[2], 1)
                        : setRgba(rgbaArr, 0, 0, 0, 1);
                }
                alpha = parseCssFloat(params.pop());
            case 'rgb':
                if (params.length >= 3) {
                    setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), params.length === 3 ? alpha : parseCssFloat(params[3]));
                    putToCache(colorStr, rgbaArr);
                    return rgbaArr;
                }
                else {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
            case 'hsla':
                if (params.length !== 4) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                params[3] = parseCssFloat(params[3]);
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            case 'hsl':
                if (params.length !== 3) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            default:
                return;
        }
    }
    setRgba(rgbaArr, 0, 0, 0, 1);
    return;
}
function hsla2rgba(hsla, rgba) {
    var h = (((parseFloat(hsla[0]) % 360) + 360) % 360) / 360;
    var s = parseCssFloat(hsla[1]);
    var l = parseCssFloat(hsla[2]);
    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var m1 = l * 2 - m2;
    rgba = rgba || [];
    setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h) * 255), clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255), 1);
    if (hsla.length === 4) {
        rgba[3] = hsla[3];
    }
    return rgba;
}
function rgba2hsla(rgba) {
    if (!rgba) {
        return;
    }
    var R = rgba[0] / 255;
    var G = rgba[1] / 255;
    var B = rgba[2] / 255;
    var vMin = Math.min(R, G, B);
    var vMax = Math.max(R, G, B);
    var delta = vMax - vMin;
    var L = (vMax + vMin) / 2;
    var H;
    var S;
    if (delta === 0) {
        H = 0;
        S = 0;
    }
    else {
        if (L < 0.5) {
            S = delta / (vMax + vMin);
        }
        else {
            S = delta / (2 - vMax - vMin);
        }
        var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;
        if (R === vMax) {
            H = deltaB - deltaG;
        }
        else if (G === vMax) {
            H = (1 / 3) + deltaR - deltaB;
        }
        else if (B === vMax) {
            H = (2 / 3) + deltaG - deltaR;
        }
        if (H < 0) {
            H += 1;
        }
        if (H > 1) {
            H -= 1;
        }
    }
    var hsla = [H * 360, S, L];
    if (rgba[3] != null) {
        hsla.push(rgba[3]);
    }
    return hsla;
}
function lift(color, level) {
    var colorArr = parse(color);
    if (colorArr) {
        for (var i = 0; i < 3; i++) {
            if (level < 0) {
                colorArr[i] = colorArr[i] * (1 - level) | 0;
            }
            else {
                colorArr[i] = ((255 - colorArr[i]) * level + colorArr[i]) | 0;
            }
            if (colorArr[i] > 255) {
                colorArr[i] = 255;
            }
            else if (colorArr[i] < 0) {
                colorArr[i] = 0;
            }
        }
        return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
    }
}
function toHex(color) {
    var colorArr = parse(color);
    if (colorArr) {
        return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + (+colorArr[2])).toString(16).slice(1);
    }
}
function fastLerp(normalizedValue, colors, out) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)) {
        return;
    }
    out = out || [];
    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = colors[leftIndex];
    var rightColor = colors[rightIndex];
    var dv = value - leftIndex;
    out[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
    out[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
    out[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
    out[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
    return out;
}
var fastMapToColor = fastLerp;
function lerp(normalizedValue, colors, fullOutput) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)) {
        return;
    }
    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = parse(colors[leftIndex]);
    var rightColor = parse(colors[rightIndex]);
    var dv = value - leftIndex;
    var color = stringify([
        clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)),
        clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)),
        clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)),
        clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))
    ], 'rgba');
    return fullOutput
        ? {
            color: color,
            leftIndex: leftIndex,
            rightIndex: rightIndex,
            value: value
        }
        : color;
}
var mapToColor = lerp;
function modifyHSL(color, h, s, l) {
    var colorArr = parse(color);
    if (color) {
        colorArr = rgba2hsla(colorArr);
        h != null && (colorArr[0] = clampCssAngle((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isFunction)(h) ? h(colorArr[0]) : h));
        s != null && (colorArr[1] = parseCssFloat((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isFunction)(s) ? s(colorArr[1]) : s));
        l != null && (colorArr[2] = parseCssFloat((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isFunction)(l) ? l(colorArr[2]) : l));
        return stringify(hsla2rgba(colorArr), 'rgba');
    }
}
function modifyAlpha(color, alpha) {
    var colorArr = parse(color);
    if (colorArr && alpha != null) {
        colorArr[3] = clampCssFloat(alpha);
        return stringify(colorArr, 'rgba');
    }
}
function stringify(arrColor, type) {
    if (!arrColor || !arrColor.length) {
        return;
    }
    var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];
    if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
        colorStr += ',' + arrColor[3];
    }
    return type + '(' + colorStr + ')';
}
function lum(color, backgroundLum) {
    var arr = parse(color);
    return arr
        ? (0.299 * arr[0] + 0.587 * arr[1] + 0.114 * arr[2]) * arr[3] / 255
            + (1 - arr[3]) * backgroundLum
        : 0;
}
function random() {
    return stringify([
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255)
    ], 'rgb');
}
var liftedColorCache = new _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay(100);
function liftColor(color) {
    if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isString)(color)) {
        var liftedColor = liftedColorCache.get(color);
        if (!liftedColor) {
            liftedColor = lift(color, -0.1);
            liftedColorCache.put(color, liftedColor);
        }
        return liftedColor;
    }
    else if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isGradientObject)(color)) {
        var ret = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)({}, color);
        ret.colorStops = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)(color.colorStops, function (stop) { return ({
            offset: stop.offset,
            color: lift(stop.color, -0.1)
        }); });
        return ret;
    }
    return color;
}


/***/ }),

/***/ 19983:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M7: () => (/* binding */ subPixelOptimize),
/* harmony export */   Op: () => (/* binding */ subPixelOptimizeRect),
/* harmony export */   eB: () => (/* binding */ subPixelOptimizeLine)
/* harmony export */ });
var round = Math.round;
function subPixelOptimizeLine(outputShape, inputShape, style) {
    if (!inputShape) {
        return;
    }
    var x1 = inputShape.x1;
    var x2 = inputShape.x2;
    var y1 = inputShape.y1;
    var y2 = inputShape.y2;
    outputShape.x1 = x1;
    outputShape.x2 = x2;
    outputShape.y1 = y1;
    outputShape.y2 = y2;
    var lineWidth = style && style.lineWidth;
    if (!lineWidth) {
        return outputShape;
    }
    if (round(x1 * 2) === round(x2 * 2)) {
        outputShape.x1 = outputShape.x2 = subPixelOptimize(x1, lineWidth, true);
    }
    if (round(y1 * 2) === round(y2 * 2)) {
        outputShape.y1 = outputShape.y2 = subPixelOptimize(y1, lineWidth, true);
    }
    return outputShape;
}
function subPixelOptimizeRect(outputShape, inputShape, style) {
    if (!inputShape) {
        return;
    }
    var originX = inputShape.x;
    var originY = inputShape.y;
    var originWidth = inputShape.width;
    var originHeight = inputShape.height;
    outputShape.x = originX;
    outputShape.y = originY;
    outputShape.width = originWidth;
    outputShape.height = originHeight;
    var lineWidth = style && style.lineWidth;
    if (!lineWidth) {
        return outputShape;
    }
    outputShape.x = subPixelOptimize(originX, lineWidth, true);
    outputShape.y = subPixelOptimize(originY, lineWidth, true);
    outputShape.width = Math.max(subPixelOptimize(originX + originWidth, lineWidth, false) - outputShape.x, originWidth === 0 ? 0 : 1);
    outputShape.height = Math.max(subPixelOptimize(originY + originHeight, lineWidth, false) - outputShape.y, originHeight === 0 ? 0 : 1);
    return outputShape;
}
function subPixelOptimize(position, lineWidth, positiveOrNegative) {
    if (!lineWidth) {
        return position;
    }
    var doubledPosition = round(position * 2);
    return (doubledPosition + round(lineWidth)) % 2 === 0
        ? doubledPosition / 2
        : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
}


/***/ }),

/***/ 22434:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dl: () => (/* binding */ SHAPE_CHANGED_BIT),
/* harmony export */   M: () => (/* binding */ REDRAW_BIT),
/* harmony export */   pO: () => (/* binding */ STYLE_CHANGED_BIT)
/* harmony export */ });
var REDRAW_BIT = 1;
var STYLE_CHANGED_BIT = 2;
var SHAPE_CHANGED_BIT = 4;


/***/ }),

/***/ 23883:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Browser = (function () {
    function Browser() {
        this.firefox = false;
        this.ie = false;
        this.edge = false;
        this.newEdge = false;
        this.weChat = false;
    }
    return Browser;
}());
var Env = (function () {
    function Env() {
        this.browser = new Browser();
        this.node = false;
        this.wxa = false;
        this.worker = false;
        this.svgSupported = false;
        this.touchEventsSupported = false;
        this.pointerEventsSupported = false;
        this.domSupported = false;
        this.transformSupported = false;
        this.transform3dSupported = false;
        this.hasGlobalWindow = typeof window !== 'undefined';
    }
    return Env;
}());
var env = new Env();
if (typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function') {
    env.wxa = true;
    env.touchEventsSupported = true;
}
else if (typeof document === 'undefined' && typeof self !== 'undefined') {
    env.worker = true;
}
else if (!env.hasGlobalWindow
    || 'Deno' in window
    || (typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string'
        && navigator.userAgent.indexOf('Node.js') > -1)) {
    env.node = true;
    env.svgSupported = true;
}
else {
    detect(navigator.userAgent, env);
}
function detect(ua, env) {
    var browser = env.browser;
    var firefox = ua.match(/Firefox\/([\d.]+)/);
    var ie = ua.match(/MSIE\s([\d.]+)/)
        || ua.match(/Trident\/.+?rv:(([\d.]+))/);
    var edge = ua.match(/Edge?\/([\d.]+)/);
    var weChat = (/micromessenger/i).test(ua);
    if (firefox) {
        browser.firefox = true;
        browser.version = firefox[1];
    }
    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }
    if (edge) {
        browser.edge = true;
        browser.version = edge[1];
        browser.newEdge = +edge[1].split('.')[0] > 18;
    }
    if (weChat) {
        browser.weChat = true;
    }
    env.svgSupported = typeof SVGRect !== 'undefined';
    env.touchEventsSupported = 'ontouchstart' in window && !browser.ie && !browser.edge;
    env.pointerEventsSupported = 'onpointerdown' in window
        && (browser.edge || (browser.ie && +browser.version >= 11));
    var domSupported = env.domSupported = typeof document !== 'undefined';
    if (domSupported) {
        var style = document.documentElement.style;
        env.transform3dSupported = ((browser.ie && 'transition' in style)
            || browser.edge
            || (('WebKitCSSMatrix' in window) && ('m11' in new WebKitCSSMatrix()))
            || 'MozPerspective' in style)
            && !('OTransition' in style);
        env.transformSupported = env.transform3dSupported
            || (browser.ie && +browser.version >= 9);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (env);


/***/ }),

/***/ 24298:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ sort)
/* harmony export */ });
var DEFAULT_MIN_MERGE = 32;
var DEFAULT_MIN_GALLOPING = 7;
function minRunLength(n) {
    var r = 0;
    while (n >= DEFAULT_MIN_MERGE) {
        r |= n & 1;
        n >>= 1;
    }
    return n + r;
}
function makeAscendingRun(array, lo, hi, compare) {
    var runHi = lo + 1;
    if (runHi === hi) {
        return 1;
    }
    if (compare(array[runHi++], array[lo]) < 0) {
        while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
            runHi++;
        }
        reverseRun(array, lo, runHi);
    }
    else {
        while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
            runHi++;
        }
    }
    return runHi - lo;
}
function reverseRun(array, lo, hi) {
    hi--;
    while (lo < hi) {
        var t = array[lo];
        array[lo++] = array[hi];
        array[hi--] = t;
    }
}
function binaryInsertionSort(array, lo, hi, start, compare) {
    if (start === lo) {
        start++;
    }
    for (; start < hi; start++) {
        var pivot = array[start];
        var left = lo;
        var right = start;
        var mid;
        while (left < right) {
            mid = left + right >>> 1;
            if (compare(pivot, array[mid]) < 0) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }
        var n = start - left;
        switch (n) {
            case 3:
                array[left + 3] = array[left + 2];
            case 2:
                array[left + 2] = array[left + 1];
            case 1:
                array[left + 1] = array[left];
                break;
            default:
                while (n > 0) {
                    array[left + n] = array[left + n - 1];
                    n--;
                }
        }
        array[left] = pivot;
    }
}
function gallopLeft(value, array, start, length, hint, compare) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;
    if (compare(value, array[start + hint]) > 0) {
        maxOffset = length - hint;
        while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) {
                offset = maxOffset;
            }
        }
        if (offset > maxOffset) {
            offset = maxOffset;
        }
        lastOffset += hint;
        offset += hint;
    }
    else {
        maxOffset = hint + 1;
        while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) {
                offset = maxOffset;
            }
        }
        if (offset > maxOffset) {
            offset = maxOffset;
        }
        var tmp = lastOffset;
        lastOffset = hint - offset;
        offset = hint - tmp;
    }
    lastOffset++;
    while (lastOffset < offset) {
        var m = lastOffset + (offset - lastOffset >>> 1);
        if (compare(value, array[start + m]) > 0) {
            lastOffset = m + 1;
        }
        else {
            offset = m;
        }
    }
    return offset;
}
function gallopRight(value, array, start, length, hint, compare) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;
    if (compare(value, array[start + hint]) < 0) {
        maxOffset = hint + 1;
        while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) {
                offset = maxOffset;
            }
        }
        if (offset > maxOffset) {
            offset = maxOffset;
        }
        var tmp = lastOffset;
        lastOffset = hint - offset;
        offset = hint - tmp;
    }
    else {
        maxOffset = length - hint;
        while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;
            if (offset <= 0) {
                offset = maxOffset;
            }
        }
        if (offset > maxOffset) {
            offset = maxOffset;
        }
        lastOffset += hint;
        offset += hint;
    }
    lastOffset++;
    while (lastOffset < offset) {
        var m = lastOffset + (offset - lastOffset >>> 1);
        if (compare(value, array[start + m]) < 0) {
            offset = m;
        }
        else {
            lastOffset = m + 1;
        }
    }
    return offset;
}
function TimSort(array, compare) {
    var minGallop = DEFAULT_MIN_GALLOPING;
    var runStart;
    var runLength;
    var stackSize = 0;
    var tmp = [];
    runStart = [];
    runLength = [];
    function pushRun(_runStart, _runLength) {
        runStart[stackSize] = _runStart;
        runLength[stackSize] = _runLength;
        stackSize += 1;
    }
    function mergeRuns() {
        while (stackSize > 1) {
            var n = stackSize - 2;
            if ((n >= 1 && runLength[n - 1] <= runLength[n] + runLength[n + 1])
                || (n >= 2 && runLength[n - 2] <= runLength[n] + runLength[n - 1])) {
                if (runLength[n - 1] < runLength[n + 1]) {
                    n--;
                }
            }
            else if (runLength[n] > runLength[n + 1]) {
                break;
            }
            mergeAt(n);
        }
    }
    function forceMergeRuns() {
        while (stackSize > 1) {
            var n = stackSize - 2;
            if (n > 0 && runLength[n - 1] < runLength[n + 1]) {
                n--;
            }
            mergeAt(n);
        }
    }
    function mergeAt(i) {
        var start1 = runStart[i];
        var length1 = runLength[i];
        var start2 = runStart[i + 1];
        var length2 = runLength[i + 1];
        runLength[i] = length1 + length2;
        if (i === stackSize - 3) {
            runStart[i + 1] = runStart[i + 2];
            runLength[i + 1] = runLength[i + 2];
        }
        stackSize--;
        var k = gallopRight(array[start2], array, start1, length1, 0, compare);
        start1 += k;
        length1 -= k;
        if (length1 === 0) {
            return;
        }
        length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);
        if (length2 === 0) {
            return;
        }
        if (length1 <= length2) {
            mergeLow(start1, length1, start2, length2);
        }
        else {
            mergeHigh(start1, length1, start2, length2);
        }
    }
    function mergeLow(start1, length1, start2, length2) {
        var i = 0;
        for (i = 0; i < length1; i++) {
            tmp[i] = array[start1 + i];
        }
        var cursor1 = 0;
        var cursor2 = start2;
        var dest = start1;
        array[dest++] = array[cursor2++];
        if (--length2 === 0) {
            for (i = 0; i < length1; i++) {
                array[dest + i] = tmp[cursor1 + i];
            }
            return;
        }
        if (length1 === 1) {
            for (i = 0; i < length2; i++) {
                array[dest + i] = array[cursor2 + i];
            }
            array[dest + length2] = tmp[cursor1];
            return;
        }
        var _minGallop = minGallop;
        var count1;
        var count2;
        var exit;
        while (1) {
            count1 = 0;
            count2 = 0;
            exit = false;
            do {
                if (compare(array[cursor2], tmp[cursor1]) < 0) {
                    array[dest++] = array[cursor2++];
                    count2++;
                    count1 = 0;
                    if (--length2 === 0) {
                        exit = true;
                        break;
                    }
                }
                else {
                    array[dest++] = tmp[cursor1++];
                    count1++;
                    count2 = 0;
                    if (--length1 === 1) {
                        exit = true;
                        break;
                    }
                }
            } while ((count1 | count2) < _minGallop);
            if (exit) {
                break;
            }
            do {
                count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);
                if (count1 !== 0) {
                    for (i = 0; i < count1; i++) {
                        array[dest + i] = tmp[cursor1 + i];
                    }
                    dest += count1;
                    cursor1 += count1;
                    length1 -= count1;
                    if (length1 <= 1) {
                        exit = true;
                        break;
                    }
                }
                array[dest++] = array[cursor2++];
                if (--length2 === 0) {
                    exit = true;
                    break;
                }
                count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);
                if (count2 !== 0) {
                    for (i = 0; i < count2; i++) {
                        array[dest + i] = array[cursor2 + i];
                    }
                    dest += count2;
                    cursor2 += count2;
                    length2 -= count2;
                    if (length2 === 0) {
                        exit = true;
                        break;
                    }
                }
                array[dest++] = tmp[cursor1++];
                if (--length1 === 1) {
                    exit = true;
                    break;
                }
                _minGallop--;
            } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
            if (exit) {
                break;
            }
            if (_minGallop < 0) {
                _minGallop = 0;
            }
            _minGallop += 2;
        }
        minGallop = _minGallop;
        minGallop < 1 && (minGallop = 1);
        if (length1 === 1) {
            for (i = 0; i < length2; i++) {
                array[dest + i] = array[cursor2 + i];
            }
            array[dest + length2] = tmp[cursor1];
        }
        else if (length1 === 0) {
            throw new Error();
        }
        else {
            for (i = 0; i < length1; i++) {
                array[dest + i] = tmp[cursor1 + i];
            }
        }
    }
    function mergeHigh(start1, length1, start2, length2) {
        var i = 0;
        for (i = 0; i < length2; i++) {
            tmp[i] = array[start2 + i];
        }
        var cursor1 = start1 + length1 - 1;
        var cursor2 = length2 - 1;
        var dest = start2 + length2 - 1;
        var customCursor = 0;
        var customDest = 0;
        array[dest--] = array[cursor1--];
        if (--length1 === 0) {
            customCursor = dest - (length2 - 1);
            for (i = 0; i < length2; i++) {
                array[customCursor + i] = tmp[i];
            }
            return;
        }
        if (length2 === 1) {
            dest -= length1;
            cursor1 -= length1;
            customDest = dest + 1;
            customCursor = cursor1 + 1;
            for (i = length1 - 1; i >= 0; i--) {
                array[customDest + i] = array[customCursor + i];
            }
            array[dest] = tmp[cursor2];
            return;
        }
        var _minGallop = minGallop;
        while (true) {
            var count1 = 0;
            var count2 = 0;
            var exit = false;
            do {
                if (compare(tmp[cursor2], array[cursor1]) < 0) {
                    array[dest--] = array[cursor1--];
                    count1++;
                    count2 = 0;
                    if (--length1 === 0) {
                        exit = true;
                        break;
                    }
                }
                else {
                    array[dest--] = tmp[cursor2--];
                    count2++;
                    count1 = 0;
                    if (--length2 === 1) {
                        exit = true;
                        break;
                    }
                }
            } while ((count1 | count2) < _minGallop);
            if (exit) {
                break;
            }
            do {
                count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);
                if (count1 !== 0) {
                    dest -= count1;
                    cursor1 -= count1;
                    length1 -= count1;
                    customDest = dest + 1;
                    customCursor = cursor1 + 1;
                    for (i = count1 - 1; i >= 0; i--) {
                        array[customDest + i] = array[customCursor + i];
                    }
                    if (length1 === 0) {
                        exit = true;
                        break;
                    }
                }
                array[dest--] = tmp[cursor2--];
                if (--length2 === 1) {
                    exit = true;
                    break;
                }
                count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);
                if (count2 !== 0) {
                    dest -= count2;
                    cursor2 -= count2;
                    length2 -= count2;
                    customDest = dest + 1;
                    customCursor = cursor2 + 1;
                    for (i = 0; i < count2; i++) {
                        array[customDest + i] = tmp[customCursor + i];
                    }
                    if (length2 <= 1) {
                        exit = true;
                        break;
                    }
                }
                array[dest--] = array[cursor1--];
                if (--length1 === 0) {
                    exit = true;
                    break;
                }
                _minGallop--;
            } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
            if (exit) {
                break;
            }
            if (_minGallop < 0) {
                _minGallop = 0;
            }
            _minGallop += 2;
        }
        minGallop = _minGallop;
        if (minGallop < 1) {
            minGallop = 1;
        }
        if (length2 === 1) {
            dest -= length1;
            cursor1 -= length1;
            customDest = dest + 1;
            customCursor = cursor1 + 1;
            for (i = length1 - 1; i >= 0; i--) {
                array[customDest + i] = array[customCursor + i];
            }
            array[dest] = tmp[cursor2];
        }
        else if (length2 === 0) {
            throw new Error();
        }
        else {
            customCursor = dest - (length2 - 1);
            for (i = 0; i < length2; i++) {
                array[customCursor + i] = tmp[i];
            }
        }
    }
    return {
        mergeRuns: mergeRuns,
        forceMergeRuns: forceMergeRuns,
        pushRun: pushRun
    };
}
function sort(array, compare, lo, hi) {
    if (!lo) {
        lo = 0;
    }
    if (!hi) {
        hi = array.length;
    }
    var remaining = hi - lo;
    if (remaining < 2) {
        return;
    }
    var runLength = 0;
    if (remaining < DEFAULT_MIN_MERGE) {
        runLength = makeAscendingRun(array, lo, hi, compare);
        binaryInsertionSort(array, lo, hi, lo + runLength, compare);
        return;
    }
    var ts = TimSort(array, compare);
    var minRun = minRunLength(remaining);
    do {
        runLength = makeAscendingRun(array, lo, hi, compare);
        if (runLength < minRun) {
            var force = remaining;
            if (force > minRun) {
                force = minRun;
            }
            binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
            runLength = force;
        }
        ts.pushRun(lo, runLength);
        ts.mergeRuns();
        remaining -= runLength;
        lo += runLength;
    } while (remaining !== 0);
    ts.forceMergeRuns();
}


/***/ }),

/***/ 26632:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ buildPath)
/* harmony export */ });
function buildPath(ctx, shape) {
    var x = shape.x;
    var y = shape.y;
    var width = shape.width;
    var height = shape.height;
    var r = shape.r;
    var r1;
    var r2;
    var r3;
    var r4;
    if (width < 0) {
        x = x + width;
        width = -width;
    }
    if (height < 0) {
        y = y + height;
        height = -height;
    }
    if (typeof r === 'number') {
        r1 = r2 = r3 = r4 = r;
    }
    else if (r instanceof Array) {
        if (r.length === 1) {
            r1 = r2 = r3 = r4 = r[0];
        }
        else if (r.length === 2) {
            r1 = r3 = r[0];
            r2 = r4 = r[1];
        }
        else if (r.length === 3) {
            r1 = r[0];
            r2 = r4 = r[1];
            r3 = r[2];
        }
        else {
            r1 = r[0];
            r2 = r[1];
            r3 = r[2];
            r4 = r[3];
        }
    }
    else {
        r1 = r2 = r3 = r4 = 0;
    }
    var total;
    if (r1 + r2 > width) {
        total = r1 + r2;
        r1 *= width / total;
        r2 *= width / total;
    }
    if (r3 + r4 > width) {
        total = r3 + r4;
        r3 *= width / total;
        r4 *= width / total;
    }
    if (r2 + r3 > height) {
        total = r2 + r3;
        r2 *= height / total;
        r3 *= height / total;
    }
    if (r1 + r4 > height) {
        total = r1 + r4;
        r1 *= height / total;
        r4 *= height / total;
    }
    ctx.moveTo(x + r1, y);
    ctx.lineTo(x + width - r2, y);
    r2 !== 0 && ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - r3);
    r3 !== 0 && ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
    ctx.lineTo(x + r4, y + height);
    r4 !== 0 && ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + r1);
    r1 !== 0 && ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
    ctx.closePath();
}


/***/ }),

/***/ 30582:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Zv: () => (/* binding */ boundingRectCalculateTransform),
/* harmony export */   bV: () => (/* binding */ createIntersectContext),
/* harmony export */   iZ: () => (/* binding */ boundingRectCopy),
/* harmony export */   r_: () => (/* binding */ boundingRectCreate),
/* harmony export */   rd: () => (/* binding */ boundingRectContain),
/* harmony export */   zQ: () => (/* binding */ boundingRectApplyTransform)
/* harmony export */ });
/* unused harmony export boundingRectSet */
/* harmony import */ var _matrix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43041);
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2103);
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9342);



var mathMin = Math.min;
var mathMax = Math.max;
var mathAbs = Math.abs;
var XY = ['x', 'y'];
var WH = ['width', 'height'];
var lt = new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
var rb = new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
var lb = new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
var rt = new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
var _intersectCtx = createIntersectContext();
var _minTv = _intersectCtx.minTv;
var _maxTv = _intersectCtx.maxTv;
var _lenMinMax = [0, 0];
var BoundingRect = (function () {
    function BoundingRect(x, y, width, height) {
        boundingRectSet(this, x, y, width, height);
    }
    BoundingRect.set = function (target, x, y, width, height) {
        if (width < 0) {
            x = x + width;
            width = -width;
        }
        if (height < 0) {
            y = y + height;
            height = -height;
        }
        target.x = x;
        target.y = y;
        target.width = width;
        target.height = height;
        return target;
    };
    BoundingRect.prototype.union = function (other) {
        var x = mathMin(other.x, this.x);
        var y = mathMin(other.y, this.y);
        if (isFinite(this.x) && isFinite(this.width)) {
            this.width = mathMax(other.x + other.width, this.x + this.width) - x;
        }
        else {
            this.width = other.width;
        }
        if (isFinite(this.y) && isFinite(this.height)) {
            this.height = mathMax(other.y + other.height, this.y + this.height) - y;
        }
        else {
            this.height = other.height;
        }
        this.x = x;
        this.y = y;
    };
    BoundingRect.prototype.applyTransform = function (m) {
        BoundingRect.applyTransform(this, this, m);
    };
    BoundingRect.prototype.calculateTransform = function (b) {
        return boundingRectCalculateTransform(_matrix_js__WEBPACK_IMPORTED_MODULE_1__.create(), this, b);
    };
    BoundingRect.prototype.intersect = function (b, mtv, opt) {
        return BoundingRect.intersect(this, b, mtv, opt);
    };
    BoundingRect.intersect = function (a, b, mtv, opt) {
        if (mtv) {
            _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.set(mtv, 0, 0);
        }
        var outIntersectRect = opt && opt.outIntersectRect || null;
        var clamp = opt && opt.clamp;
        if (outIntersectRect) {
            outIntersectRect.x = outIntersectRect.y = outIntersectRect.width = outIntersectRect.height = NaN;
        }
        if (!a || !b) {
            return false;
        }
        if (!(a instanceof BoundingRect)) {
            a = boundingRectSet(_tmpIntersectA, a.x, a.y, a.width, a.height);
        }
        if (!(b instanceof BoundingRect)) {
            b = boundingRectSet(_tmpIntersectB, b.x, b.y, b.width, b.height);
        }
        var useMTV = !!mtv;
        _intersectCtx.reset(opt, useMTV);
        var touchThreshold = _intersectCtx.touchThreshold;
        var ax0 = a.x + touchThreshold;
        var ax1 = a.x + a.width - touchThreshold;
        var ay0 = a.y + touchThreshold;
        var ay1 = a.y + a.height - touchThreshold;
        var bx0 = b.x + touchThreshold;
        var bx1 = b.x + b.width - touchThreshold;
        var by0 = b.y + touchThreshold;
        var by1 = b.y + b.height - touchThreshold;
        if (ax0 > ax1 || ay0 > ay1 || bx0 > bx1 || by0 > by1) {
            return false;
        }
        var overlap = !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
        if (useMTV || outIntersectRect) {
            _lenMinMax[0] = Infinity;
            _lenMinMax[1] = 0;
            intersectOneDim(ax0, ax1, bx0, bx1, 0, useMTV, outIntersectRect, clamp);
            intersectOneDim(ay0, ay1, by0, by1, 1, useMTV, outIntersectRect, clamp);
            if (useMTV) {
                _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.copy(mtv, overlap
                    ? (_intersectCtx.useDir ? _intersectCtx.dirMinTv : _minTv)
                    : _maxTv);
            }
        }
        return overlap;
    };
    BoundingRect.contain = function (rect, x, y) {
        return x >= rect.x
            && x <= (rect.x + rect.width)
            && y >= rect.y
            && y <= (rect.y + rect.height);
    };
    BoundingRect.prototype.contain = function (x, y) {
        return BoundingRect.contain(this, x, y);
    };
    BoundingRect.prototype.clone = function () {
        return new BoundingRect(this.x, this.y, this.width, this.height);
    };
    BoundingRect.prototype.copy = function (other) {
        boundingRectCopy(this, other);
    };
    BoundingRect.prototype.plain = function () {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    };
    BoundingRect.prototype.isFinite = function () {
        return isFinite(this.x)
            && isFinite(this.y)
            && isFinite(this.width)
            && isFinite(this.height);
    };
    BoundingRect.prototype.isZero = function () {
        return this.width === 0 || this.height === 0;
    };
    BoundingRect.create = function (rect) {
        return new BoundingRect(rect ? rect.x : 0, rect ? rect.y : 0, rect ? rect.width : 0, rect ? rect.height : 0);
    };
    BoundingRect.copy = function (target, source) {
        target.x = source.x;
        target.y = source.y;
        target.width = source.width;
        target.height = source.height;
        return target;
    };
    BoundingRect.applyTransform = function (target, source, m) {
        if (!m) {
            if (target !== source) {
                boundingRectCopy(target, source);
            }
            return;
        }
        if (m[1] < 1e-5 && m[1] > -1e-5 && m[2] < 1e-5 && m[2] > -1e-5) {
            var sx = m[0];
            var sy = m[3];
            var tx = m[4];
            var ty = m[5];
            target.x = source.x * sx + tx;
            target.y = source.y * sy + ty;
            target.width = source.width * sx;
            target.height = source.height * sy;
            if (target.width < 0) {
                target.x += target.width;
                target.width = -target.width;
            }
            if (target.height < 0) {
                target.y += target.height;
                target.height = -target.height;
            }
            return;
        }
        lt.x = lb.x = source.x;
        lt.y = rt.y = source.y;
        rb.x = rt.x = source.x + source.width;
        rb.y = lb.y = source.y + source.height;
        lt.transform(m);
        rt.transform(m);
        rb.transform(m);
        lb.transform(m);
        target.x = mathMin(lt.x, rb.x, lb.x, rt.x);
        target.y = mathMin(lt.y, rb.y, lb.y, rt.y);
        var maxX = mathMax(lt.x, rb.x, lb.x, rt.x);
        var maxY = mathMax(lt.y, rb.y, lb.y, rt.y);
        target.width = maxX - target.x;
        target.height = maxY - target.y;
    };
    BoundingRect.calculateTransform = function (out, a, b) {
        var sx = b.width / a.width;
        var sy = b.height / a.height;
        out = _matrix_js__WEBPACK_IMPORTED_MODULE_1__.identity(out || []);
        _matrix_js__WEBPACK_IMPORTED_MODULE_1__.translate(out, out, _vector_js__WEBPACK_IMPORTED_MODULE_2__.set(_tmpCalcTrans, -a.x, -a.y));
        _matrix_js__WEBPACK_IMPORTED_MODULE_1__.scale(out, out, _vector_js__WEBPACK_IMPORTED_MODULE_2__.set(_tmpCalcTrans, sx, sy));
        _matrix_js__WEBPACK_IMPORTED_MODULE_1__.translate(out, out, _vector_js__WEBPACK_IMPORTED_MODULE_2__.set(_tmpCalcTrans, b.x, b.y));
        return out;
    };
    return BoundingRect;
}());
var boundingRectCreate = BoundingRect.create;
var boundingRectSet = BoundingRect.set;
var boundingRectCopy = BoundingRect.copy;
var boundingRectCalculateTransform = BoundingRect.calculateTransform;
var boundingRectApplyTransform = BoundingRect.applyTransform;
var boundingRectContain = BoundingRect.contain;
var _tmpIntersectA = new BoundingRect(0, 0, 0, 0);
var _tmpIntersectB = new BoundingRect(0, 0, 0, 0);
var _tmpCalcTrans = [];
function intersectOneDim(a0, a1, b0, b1, updateDimIdx, useMTV, outIntersectRect, clamp) {
    var d0 = mathAbs(a1 - b0);
    var d1 = mathAbs(b1 - a0);
    var d01min = mathMin(d0, d1);
    var updateDim = XY[updateDimIdx];
    var zeroDim = XY[1 - updateDimIdx];
    var wh = WH[updateDimIdx];
    if (a1 < b0 || b1 < a0) {
        if (d0 < d1) {
            if (useMTV) {
                _maxTv[updateDim] = -d0;
            }
            if (clamp) {
                outIntersectRect[updateDim] = a1;
                outIntersectRect[wh] = 0;
            }
        }
        else {
            if (useMTV) {
                _maxTv[updateDim] = d1;
            }
            if (clamp) {
                outIntersectRect[updateDim] = a0;
                outIntersectRect[wh] = 0;
            }
        }
    }
    else {
        if (outIntersectRect) {
            outIntersectRect[updateDim] = mathMax(a0, b0);
            outIntersectRect[wh] = mathMin(a1, b1) - outIntersectRect[updateDim];
        }
        if (useMTV) {
            if (d01min < _lenMinMax[0] || _intersectCtx.useDir) {
                _lenMinMax[0] = mathMin(d01min, _lenMinMax[0]);
                if (d0 < d1 || !_intersectCtx.bidirectional) {
                    _minTv[updateDim] = d0;
                    _minTv[zeroDim] = 0;
                    if (_intersectCtx.useDir) {
                        _intersectCtx.calcDirMTV();
                    }
                }
                if (d0 >= d1 || !_intersectCtx.bidirectional) {
                    _minTv[updateDim] = -d1;
                    _minTv[zeroDim] = 0;
                    if (_intersectCtx.useDir) {
                        _intersectCtx.calcDirMTV();
                    }
                }
            }
        }
    }
}
function createIntersectContext() {
    var _direction = 0;
    var _dirCheckVec = new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
    var _dirTmp = new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
    var _ctx = {
        minTv: new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(),
        maxTv: new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(),
        useDir: false,
        dirMinTv: new _Point_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(),
        touchThreshold: 0,
        bidirectional: true,
        negativeSize: false,
        reset: function (opt, useMTV) {
            _ctx.touchThreshold = 0;
            if (opt && opt.touchThreshold != null) {
                _ctx.touchThreshold = mathMax(0, opt.touchThreshold);
            }
            _ctx.negativeSize = false;
            if (!useMTV) {
                return;
            }
            _ctx.minTv.set(Infinity, Infinity);
            _ctx.maxTv.set(0, 0);
            _ctx.useDir = false;
            if (opt && opt.direction != null) {
                _ctx.useDir = true;
                _ctx.dirMinTv.copy(_ctx.minTv);
                _dirTmp.copy(_ctx.minTv);
                _direction = opt.direction;
                _ctx.bidirectional = opt.bidirectional == null || !!opt.bidirectional;
                if (!_ctx.bidirectional) {
                    _dirCheckVec.set(Math.cos(_direction), Math.sin(_direction));
                }
            }
        },
        calcDirMTV: function () {
            var minTv = _ctx.minTv;
            var dirMinTv = _ctx.dirMinTv;
            var squareMag = minTv.y * minTv.y + minTv.x * minTv.x;
            var dirSin = Math.sin(_direction);
            var dirCos = Math.cos(_direction);
            var dotProd = dirSin * minTv.y + dirCos * minTv.x;
            if (nearZero(dotProd)) {
                if (nearZero(minTv.x) && nearZero(minTv.y)) {
                    dirMinTv.set(0, 0);
                }
                return;
            }
            _dirTmp.x = squareMag * dirCos / dotProd;
            _dirTmp.y = squareMag * dirSin / dotProd;
            if (nearZero(_dirTmp.x) && nearZero(_dirTmp.y)) {
                dirMinTv.set(0, 0);
                return;
            }
            if ((_ctx.bidirectional
                || _dirCheckVec.dot(_dirTmp) > 0)
                && _dirTmp.len() < dirMinTv.len()) {
                dirMinTv.copy(_dirTmp);
            }
        }
    };
    function nearZero(val) {
        return mathAbs(val) < 1e-10;
    }
    return _ctx;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoundingRect);


/***/ }),

/***/ 34242:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   F: () => (/* binding */ cloneValue)
/* harmony export */ });
/* harmony import */ var _Clip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93257);
/* harmony import */ var _tool_color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19746);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _easing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66798);
/* harmony import */ var _cubicEasing_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79566);
/* harmony import */ var _svg_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4591);






;
var arraySlice = Array.prototype.slice;
function interpolateNumber(p0, p1, percent) {
    return (p1 - p0) * percent + p0;
}
function interpolate1DArray(out, p0, p1, percent) {
    var len = p0.length;
    for (var i = 0; i < len; i++) {
        out[i] = interpolateNumber(p0[i], p1[i], percent);
    }
    return out;
}
function interpolate2DArray(out, p0, p1, percent) {
    var len = p0.length;
    var len2 = len && p0[0].length;
    for (var i = 0; i < len; i++) {
        if (!out[i]) {
            out[i] = [];
        }
        for (var j = 0; j < len2; j++) {
            out[i][j] = interpolateNumber(p0[i][j], p1[i][j], percent);
        }
    }
    return out;
}
function add1DArray(out, p0, p1, sign) {
    var len = p0.length;
    for (var i = 0; i < len; i++) {
        out[i] = p0[i] + p1[i] * sign;
    }
    return out;
}
function add2DArray(out, p0, p1, sign) {
    var len = p0.length;
    var len2 = len && p0[0].length;
    for (var i = 0; i < len; i++) {
        if (!out[i]) {
            out[i] = [];
        }
        for (var j = 0; j < len2; j++) {
            out[i][j] = p0[i][j] + p1[i][j] * sign;
        }
    }
    return out;
}
function fillColorStops(val0, val1) {
    var len0 = val0.length;
    var len1 = val1.length;
    var shorterArr = len0 > len1 ? val1 : val0;
    var shorterLen = Math.min(len0, len1);
    var last = shorterArr[shorterLen - 1] || { color: [0, 0, 0, 0], offset: 0 };
    for (var i = shorterLen; i < Math.max(len0, len1); i++) {
        shorterArr.push({
            offset: last.offset,
            color: last.color.slice()
        });
    }
}
function fillArray(val0, val1, arrDim) {
    var arr0 = val0;
    var arr1 = val1;
    if (!arr0.push || !arr1.push) {
        return;
    }
    var arr0Len = arr0.length;
    var arr1Len = arr1.length;
    if (arr0Len !== arr1Len) {
        var isPreviousLarger = arr0Len > arr1Len;
        if (isPreviousLarger) {
            arr0.length = arr1Len;
        }
        else {
            for (var i = arr0Len; i < arr1Len; i++) {
                arr0.push(arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i]));
            }
        }
    }
    var len2 = arr0[0] && arr0[0].length;
    for (var i = 0; i < arr0.length; i++) {
        if (arrDim === 1) {
            if (isNaN(arr0[i])) {
                arr0[i] = arr1[i];
            }
        }
        else {
            for (var j = 0; j < len2; j++) {
                if (isNaN(arr0[i][j])) {
                    arr0[i][j] = arr1[i][j];
                }
            }
        }
    }
}
function cloneValue(value) {
    if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(value)) {
        var len = value.length;
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(value[0])) {
            var ret = [];
            for (var i = 0; i < len; i++) {
                ret.push(arraySlice.call(value[i]));
            }
            return ret;
        }
        return arraySlice.call(value);
    }
    return value;
}
function rgba2String(rgba) {
    rgba[0] = Math.floor(rgba[0]) || 0;
    rgba[1] = Math.floor(rgba[1]) || 0;
    rgba[2] = Math.floor(rgba[2]) || 0;
    rgba[3] = rgba[3] == null ? 1 : rgba[3];
    return 'rgba(' + rgba.join(',') + ')';
}
function guessArrayDim(value) {
    return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(value && value[0]) ? 2 : 1;
}
var VALUE_TYPE_NUMBER = 0;
var VALUE_TYPE_1D_ARRAY = 1;
var VALUE_TYPE_2D_ARRAY = 2;
var VALUE_TYPE_COLOR = 3;
var VALUE_TYPE_LINEAR_GRADIENT = 4;
var VALUE_TYPE_RADIAL_GRADIENT = 5;
var VALUE_TYPE_UNKOWN = 6;
function isGradientValueType(valType) {
    return valType === VALUE_TYPE_LINEAR_GRADIENT || valType === VALUE_TYPE_RADIAL_GRADIENT;
}
function isArrayValueType(valType) {
    return valType === VALUE_TYPE_1D_ARRAY || valType === VALUE_TYPE_2D_ARRAY;
}
var tmpRgba = [0, 0, 0, 0];
var Track = (function () {
    function Track(propName) {
        this.keyframes = [];
        this.discrete = false;
        this._invalid = false;
        this._needsSort = false;
        this._lastFr = 0;
        this._lastFrP = 0;
        this.propName = propName;
    }
    Track.prototype.isFinished = function () {
        return this._finished;
    };
    Track.prototype.setFinished = function () {
        this._finished = true;
        if (this._additiveTrack) {
            this._additiveTrack.setFinished();
        }
    };
    Track.prototype.needsAnimate = function () {
        return this.keyframes.length >= 1;
    };
    Track.prototype.getAdditiveTrack = function () {
        return this._additiveTrack;
    };
    Track.prototype.addKeyframe = function (time, rawValue, easing) {
        this._needsSort = true;
        var keyframes = this.keyframes;
        var len = keyframes.length;
        var discrete = false;
        var valType = VALUE_TYPE_UNKOWN;
        var value = rawValue;
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(rawValue)) {
            var arrayDim = guessArrayDim(rawValue);
            valType = arrayDim;
            if (arrayDim === 1 && !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(rawValue[0])
                || arrayDim === 2 && !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(rawValue[0][0])) {
                discrete = true;
            }
        }
        else {
            if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(rawValue) && !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.eqNaN)(rawValue)) {
                valType = VALUE_TYPE_NUMBER;
            }
            else if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(rawValue)) {
                if (!isNaN(+rawValue)) {
                    valType = VALUE_TYPE_NUMBER;
                }
                else {
                    var colorArray = _tool_color_js__WEBPACK_IMPORTED_MODULE_1__.parse(rawValue);
                    if (colorArray) {
                        value = colorArray;
                        valType = VALUE_TYPE_COLOR;
                    }
                }
            }
            else if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isGradientObject)(rawValue)) {
                var parsedGradient = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, value);
                parsedGradient.colorStops = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)(rawValue.colorStops, function (colorStop) { return ({
                    offset: colorStop.offset,
                    color: _tool_color_js__WEBPACK_IMPORTED_MODULE_1__.parse(colorStop.color)
                }); });
                if ((0,_svg_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isLinearGradient */ .OS)(rawValue)) {
                    valType = VALUE_TYPE_LINEAR_GRADIENT;
                }
                else if ((0,_svg_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isRadialGradient */ .OH)(rawValue)) {
                    valType = VALUE_TYPE_RADIAL_GRADIENT;
                }
                value = parsedGradient;
            }
        }
        if (len === 0) {
            this.valType = valType;
        }
        else if (valType !== this.valType || valType === VALUE_TYPE_UNKOWN) {
            discrete = true;
        }
        this.discrete = this.discrete || discrete;
        var kf = {
            time: time,
            value: value,
            rawValue: rawValue,
            percent: 0
        };
        if (easing) {
            kf.easing = easing;
            kf.easingFunc = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(easing)
                ? easing
                : _easing_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A[easing] || (0,_cubicEasing_js__WEBPACK_IMPORTED_MODULE_4__/* .createCubicEasingFunc */ .w)(easing);
        }
        keyframes.push(kf);
        return kf;
    };
    Track.prototype.prepare = function (maxTime, additiveTrack) {
        var kfs = this.keyframes;
        if (this._needsSort) {
            kfs.sort(function (a, b) {
                return a.time - b.time;
            });
        }
        var valType = this.valType;
        var kfsLen = kfs.length;
        var lastKf = kfs[kfsLen - 1];
        var isDiscrete = this.discrete;
        var isArr = isArrayValueType(valType);
        var isGradient = isGradientValueType(valType);
        for (var i = 0; i < kfsLen; i++) {
            var kf = kfs[i];
            var value = kf.value;
            var lastValue = lastKf.value;
            kf.percent = kf.time / maxTime;
            if (!isDiscrete) {
                if (isArr && i !== kfsLen - 1) {
                    fillArray(value, lastValue, valType);
                }
                else if (isGradient) {
                    fillColorStops(value.colorStops, lastValue.colorStops);
                }
            }
        }
        if (!isDiscrete
            && valType !== VALUE_TYPE_RADIAL_GRADIENT
            && additiveTrack
            && this.needsAnimate()
            && additiveTrack.needsAnimate()
            && valType === additiveTrack.valType
            && !additiveTrack._finished) {
            this._additiveTrack = additiveTrack;
            var startValue = kfs[0].value;
            for (var i = 0; i < kfsLen; i++) {
                if (valType === VALUE_TYPE_NUMBER) {
                    kfs[i].additiveValue = kfs[i].value - startValue;
                }
                else if (valType === VALUE_TYPE_COLOR) {
                    kfs[i].additiveValue =
                        add1DArray([], kfs[i].value, startValue, -1);
                }
                else if (isArrayValueType(valType)) {
                    kfs[i].additiveValue = valType === VALUE_TYPE_1D_ARRAY
                        ? add1DArray([], kfs[i].value, startValue, -1)
                        : add2DArray([], kfs[i].value, startValue, -1);
                }
            }
        }
    };
    Track.prototype.step = function (target, percent) {
        if (this._finished) {
            return;
        }
        if (this._additiveTrack && this._additiveTrack._finished) {
            this._additiveTrack = null;
        }
        var isAdditive = this._additiveTrack != null;
        var valueKey = isAdditive ? 'additiveValue' : 'value';
        var valType = this.valType;
        var keyframes = this.keyframes;
        var kfsNum = keyframes.length;
        var propName = this.propName;
        var isValueColor = valType === VALUE_TYPE_COLOR;
        var frameIdx;
        var lastFrame = this._lastFr;
        var mathMin = Math.min;
        var frame;
        var nextFrame;
        if (kfsNum === 1) {
            frame = nextFrame = keyframes[0];
        }
        else {
            if (percent < 0) {
                frameIdx = 0;
            }
            else if (percent < this._lastFrP) {
                var start = mathMin(lastFrame + 1, kfsNum - 1);
                for (frameIdx = start; frameIdx >= 0; frameIdx--) {
                    if (keyframes[frameIdx].percent <= percent) {
                        break;
                    }
                }
                frameIdx = mathMin(frameIdx, kfsNum - 2);
            }
            else {
                for (frameIdx = lastFrame; frameIdx < kfsNum; frameIdx++) {
                    if (keyframes[frameIdx].percent > percent) {
                        break;
                    }
                }
                frameIdx = mathMin(frameIdx - 1, kfsNum - 2);
            }
            nextFrame = keyframes[frameIdx + 1];
            frame = keyframes[frameIdx];
        }
        if (!(frame && nextFrame)) {
            return;
        }
        this._lastFr = frameIdx;
        this._lastFrP = percent;
        var interval = (nextFrame.percent - frame.percent);
        var w = interval === 0 ? 1 : mathMin((percent - frame.percent) / interval, 1);
        if (nextFrame.easingFunc) {
            w = nextFrame.easingFunc(w);
        }
        var targetArr = isAdditive ? this._additiveValue
            : (isValueColor ? tmpRgba : target[propName]);
        if ((isArrayValueType(valType) || isValueColor) && !targetArr) {
            targetArr = this._additiveValue = [];
        }
        if (this.discrete) {
            target[propName] = w < 1 ? frame.rawValue : nextFrame.rawValue;
        }
        else if (isArrayValueType(valType)) {
            valType === VALUE_TYPE_1D_ARRAY
                ? interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w)
                : interpolate2DArray(targetArr, frame[valueKey], nextFrame[valueKey], w);
        }
        else if (isGradientValueType(valType)) {
            var val = frame[valueKey];
            var nextVal_1 = nextFrame[valueKey];
            var isLinearGradient_1 = valType === VALUE_TYPE_LINEAR_GRADIENT;
            target[propName] = {
                type: isLinearGradient_1 ? 'linear' : 'radial',
                x: interpolateNumber(val.x, nextVal_1.x, w),
                y: interpolateNumber(val.y, nextVal_1.y, w),
                colorStops: (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)(val.colorStops, function (colorStop, idx) {
                    var nextColorStop = nextVal_1.colorStops[idx];
                    return {
                        offset: interpolateNumber(colorStop.offset, nextColorStop.offset, w),
                        color: rgba2String(interpolate1DArray([], colorStop.color, nextColorStop.color, w))
                    };
                }),
                global: nextVal_1.global
            };
            if (isLinearGradient_1) {
                target[propName].x2 = interpolateNumber(val.x2, nextVal_1.x2, w);
                target[propName].y2 = interpolateNumber(val.y2, nextVal_1.y2, w);
            }
            else {
                target[propName].r = interpolateNumber(val.r, nextVal_1.r, w);
            }
        }
        else if (isValueColor) {
            interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w);
            if (!isAdditive) {
                target[propName] = rgba2String(targetArr);
            }
        }
        else {
            var value = interpolateNumber(frame[valueKey], nextFrame[valueKey], w);
            if (isAdditive) {
                this._additiveValue = value;
            }
            else {
                target[propName] = value;
            }
        }
        if (isAdditive) {
            this._addToTarget(target);
        }
    };
    Track.prototype._addToTarget = function (target) {
        var valType = this.valType;
        var propName = this.propName;
        var additiveValue = this._additiveValue;
        if (valType === VALUE_TYPE_NUMBER) {
            target[propName] = target[propName] + additiveValue;
        }
        else if (valType === VALUE_TYPE_COLOR) {
            _tool_color_js__WEBPACK_IMPORTED_MODULE_1__.parse(target[propName], tmpRgba);
            add1DArray(tmpRgba, tmpRgba, additiveValue, 1);
            target[propName] = rgba2String(tmpRgba);
        }
        else if (valType === VALUE_TYPE_1D_ARRAY) {
            add1DArray(target[propName], target[propName], additiveValue, 1);
        }
        else if (valType === VALUE_TYPE_2D_ARRAY) {
            add2DArray(target[propName], target[propName], additiveValue, 1);
        }
    };
    return Track;
}());
var Animator = (function () {
    function Animator(target, loop, allowDiscreteAnimation, additiveTo) {
        this._tracks = {};
        this._trackKeys = [];
        this._maxTime = 0;
        this._started = 0;
        this._clip = null;
        this._target = target;
        this._loop = loop;
        if (loop && additiveTo) {
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.logError)('Can\' use additive animation on looped animation.');
            return;
        }
        this._additiveAnimators = additiveTo;
        this._allowDiscrete = allowDiscreteAnimation;
    }
    Animator.prototype.getMaxTime = function () {
        return this._maxTime;
    };
    Animator.prototype.getDelay = function () {
        return this._delay;
    };
    Animator.prototype.getLoop = function () {
        return this._loop;
    };
    Animator.prototype.getTarget = function () {
        return this._target;
    };
    Animator.prototype.changeTarget = function (target) {
        this._target = target;
    };
    Animator.prototype.when = function (time, props, easing) {
        return this.whenWithKeys(time, props, (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(props), easing);
    };
    Animator.prototype.whenWithKeys = function (time, props, propNames, easing) {
        var tracks = this._tracks;
        for (var i = 0; i < propNames.length; i++) {
            var propName = propNames[i];
            var track = tracks[propName];
            if (!track) {
                track = tracks[propName] = new Track(propName);
                var initialValue = void 0;
                var additiveTrack = this._getAdditiveTrack(propName);
                if (additiveTrack) {
                    var addtiveTrackKfs = additiveTrack.keyframes;
                    var lastFinalKf = addtiveTrackKfs[addtiveTrackKfs.length - 1];
                    initialValue = lastFinalKf && lastFinalKf.value;
                    if (additiveTrack.valType === VALUE_TYPE_COLOR && initialValue) {
                        initialValue = rgba2String(initialValue);
                    }
                }
                else {
                    initialValue = this._target[propName];
                }
                if (initialValue == null) {
                    continue;
                }
                if (time > 0) {
                    track.addKeyframe(0, cloneValue(initialValue), easing);
                }
                this._trackKeys.push(propName);
            }
            track.addKeyframe(time, cloneValue(props[propName]), easing);
        }
        this._maxTime = Math.max(this._maxTime, time);
        return this;
    };
    Animator.prototype.pause = function () {
        this._clip.pause();
        this._paused = true;
    };
    Animator.prototype.resume = function () {
        this._clip.resume();
        this._paused = false;
    };
    Animator.prototype.isPaused = function () {
        return !!this._paused;
    };
    Animator.prototype.duration = function (duration) {
        this._maxTime = duration;
        this._force = true;
        return this;
    };
    Animator.prototype._doneCallback = function () {
        this._setTracksFinished();
        this._clip = null;
        var doneList = this._doneCbs;
        if (doneList) {
            var len = doneList.length;
            for (var i = 0; i < len; i++) {
                doneList[i].call(this);
            }
        }
    };
    Animator.prototype._abortedCallback = function () {
        this._setTracksFinished();
        var animation = this.animation;
        var abortedList = this._abortedCbs;
        if (animation) {
            animation.removeClip(this._clip);
        }
        this._clip = null;
        if (abortedList) {
            for (var i = 0; i < abortedList.length; i++) {
                abortedList[i].call(this);
            }
        }
    };
    Animator.prototype._setTracksFinished = function () {
        var tracks = this._tracks;
        var tracksKeys = this._trackKeys;
        for (var i = 0; i < tracksKeys.length; i++) {
            tracks[tracksKeys[i]].setFinished();
        }
    };
    Animator.prototype._getAdditiveTrack = function (trackName) {
        var additiveTrack;
        var additiveAnimators = this._additiveAnimators;
        if (additiveAnimators) {
            for (var i = 0; i < additiveAnimators.length; i++) {
                var track = additiveAnimators[i].getTrack(trackName);
                if (track) {
                    additiveTrack = track;
                }
            }
        }
        return additiveTrack;
    };
    Animator.prototype.start = function (easing) {
        if (this._started > 0) {
            return;
        }
        this._started = 1;
        var self = this;
        var tracks = [];
        var maxTime = this._maxTime || 0;
        for (var i = 0; i < this._trackKeys.length; i++) {
            var propName = this._trackKeys[i];
            var track = this._tracks[propName];
            var additiveTrack = this._getAdditiveTrack(propName);
            var kfs = track.keyframes;
            var kfsNum = kfs.length;
            track.prepare(maxTime, additiveTrack);
            if (track.needsAnimate()) {
                if (!this._allowDiscrete && track.discrete) {
                    var lastKf = kfs[kfsNum - 1];
                    if (lastKf) {
                        self._target[track.propName] = lastKf.rawValue;
                    }
                    track.setFinished();
                }
                else {
                    tracks.push(track);
                }
            }
        }
        if (tracks.length || this._force) {
            var clip = new _Clip_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A({
                life: maxTime,
                loop: this._loop,
                delay: this._delay || 0,
                onframe: function (percent) {
                    self._started = 2;
                    var additiveAnimators = self._additiveAnimators;
                    if (additiveAnimators) {
                        var stillHasAdditiveAnimator = false;
                        for (var i = 0; i < additiveAnimators.length; i++) {
                            if (additiveAnimators[i]._clip) {
                                stillHasAdditiveAnimator = true;
                                break;
                            }
                        }
                        if (!stillHasAdditiveAnimator) {
                            self._additiveAnimators = null;
                        }
                    }
                    for (var i = 0; i < tracks.length; i++) {
                        tracks[i].step(self._target, percent);
                    }
                    var onframeList = self._onframeCbs;
                    if (onframeList) {
                        for (var i = 0; i < onframeList.length; i++) {
                            onframeList[i](self._target, percent);
                        }
                    }
                },
                ondestroy: function () {
                    self._doneCallback();
                }
            });
            this._clip = clip;
            if (this.animation) {
                this.animation.addClip(clip);
            }
            if (easing) {
                clip.setEasing(easing);
            }
        }
        else {
            this._doneCallback();
        }
        return this;
    };
    Animator.prototype.stop = function (forwardToLast) {
        if (!this._clip) {
            return;
        }
        var clip = this._clip;
        if (forwardToLast) {
            clip.onframe(1);
        }
        this._abortedCallback();
    };
    Animator.prototype.delay = function (time) {
        this._delay = time;
        return this;
    };
    Animator.prototype.during = function (cb) {
        if (cb) {
            if (!this._onframeCbs) {
                this._onframeCbs = [];
            }
            this._onframeCbs.push(cb);
        }
        return this;
    };
    Animator.prototype.done = function (cb) {
        if (cb) {
            if (!this._doneCbs) {
                this._doneCbs = [];
            }
            this._doneCbs.push(cb);
        }
        return this;
    };
    Animator.prototype.aborted = function (cb) {
        if (cb) {
            if (!this._abortedCbs) {
                this._abortedCbs = [];
            }
            this._abortedCbs.push(cb);
        }
        return this;
    };
    Animator.prototype.getClip = function () {
        return this._clip;
    };
    Animator.prototype.getTrack = function (propName) {
        return this._tracks[propName];
    };
    Animator.prototype.getTracks = function () {
        var _this = this;
        return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)(this._trackKeys, function (key) { return _this._tracks[key]; });
    };
    Animator.prototype.stopTracks = function (propNames, forwardToLast) {
        if (!propNames.length || !this._clip) {
            return true;
        }
        var tracks = this._tracks;
        var tracksKeys = this._trackKeys;
        for (var i = 0; i < propNames.length; i++) {
            var track = tracks[propNames[i]];
            if (track && !track.isFinished()) {
                if (forwardToLast) {
                    track.step(this._target, 1);
                }
                else if (this._started === 1) {
                    track.step(this._target, 0);
                }
                track.setFinished();
            }
        }
        var allAborted = true;
        for (var i = 0; i < tracksKeys.length; i++) {
            if (!tracks[tracksKeys[i]].isFinished()) {
                allAborted = false;
                break;
            }
        }
        if (allAborted) {
            this._abortedCallback();
        }
        return allAborted;
    };
    Animator.prototype.saveTo = function (target, trackKeys, firstOrLast) {
        if (!target) {
            return;
        }
        trackKeys = trackKeys || this._trackKeys;
        for (var i = 0; i < trackKeys.length; i++) {
            var propName = trackKeys[i];
            var track = this._tracks[propName];
            if (!track || track.isFinished()) {
                continue;
            }
            var kfs = track.keyframes;
            var kf = kfs[firstOrLast ? 0 : kfs.length - 1];
            if (kf) {
                target[propName] = cloneValue(kf.rawValue);
            }
        }
    };
    Animator.prototype.__changeFinalValue = function (finalProps, trackKeys) {
        trackKeys = trackKeys || (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(finalProps);
        for (var i = 0; i < trackKeys.length; i++) {
            var propName = trackKeys[i];
            var track = this._tracks[propName];
            if (!track) {
                continue;
            }
            var kfs = track.keyframes;
            if (kfs.length > 1) {
                var lastKf = kfs.pop();
                track.addKeyframe(lastKf.time, finalProps[propName]);
                track.prepare(this._maxTime, track.getAdditiveTrack());
            }
        }
    };
    return Animator;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animator);


/***/ }),

/***/ 34463:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Eventful = (function () {
    function Eventful(eventProcessors) {
        if (eventProcessors) {
            this._$eventProcessor = eventProcessors;
        }
    }
    Eventful.prototype.on = function (event, query, handler, context) {
        if (!this._$handlers) {
            this._$handlers = {};
        }
        var _h = this._$handlers;
        if (typeof query === 'function') {
            context = handler;
            handler = query;
            query = null;
        }
        if (!handler || !event) {
            return this;
        }
        var eventProcessor = this._$eventProcessor;
        if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
            query = eventProcessor.normalizeQuery(query);
        }
        if (!_h[event]) {
            _h[event] = [];
        }
        for (var i = 0; i < _h[event].length; i++) {
            if (_h[event][i].h === handler) {
                return this;
            }
        }
        var wrap = {
            h: handler,
            query: query,
            ctx: (context || this),
            callAtLast: handler.zrEventfulCallAtLast
        };
        var lastIndex = _h[event].length - 1;
        var lastWrap = _h[event][lastIndex];
        (lastWrap && lastWrap.callAtLast)
            ? _h[event].splice(lastIndex, 0, wrap)
            : _h[event].push(wrap);
        return this;
    };
    Eventful.prototype.isSilent = function (eventName) {
        var _h = this._$handlers;
        return !_h || !_h[eventName] || !_h[eventName].length;
    };
    Eventful.prototype.off = function (eventType, handler) {
        var _h = this._$handlers;
        if (!_h) {
            return this;
        }
        if (!eventType) {
            this._$handlers = {};
            return this;
        }
        if (handler) {
            if (_h[eventType]) {
                var newList = [];
                for (var i = 0, l = _h[eventType].length; i < l; i++) {
                    if (_h[eventType][i].h !== handler) {
                        newList.push(_h[eventType][i]);
                    }
                }
                _h[eventType] = newList;
            }
            if (_h[eventType] && _h[eventType].length === 0) {
                delete _h[eventType];
            }
        }
        else {
            delete _h[eventType];
        }
        return this;
    };
    Eventful.prototype.trigger = function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this._$handlers) {
            return this;
        }
        var _h = this._$handlers[eventType];
        var eventProcessor = this._$eventProcessor;
        if (_h) {
            var argLen = args.length;
            var len = _h.length;
            for (var i = 0; i < len; i++) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(eventType, hItem.query)) {
                    continue;
                }
                switch (argLen) {
                    case 0:
                        hItem.h.call(hItem.ctx);
                        break;
                    case 1:
                        hItem.h.call(hItem.ctx, args[0]);
                        break;
                    case 2:
                        hItem.h.call(hItem.ctx, args[0], args[1]);
                        break;
                    default:
                        hItem.h.apply(hItem.ctx, args);
                        break;
                }
            }
        }
        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(eventType);
        return this;
    };
    Eventful.prototype.triggerWithContext = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this._$handlers) {
            return this;
        }
        var _h = this._$handlers[type];
        var eventProcessor = this._$eventProcessor;
        if (_h) {
            var argLen = args.length;
            var ctx = args[argLen - 1];
            var len = _h.length;
            for (var i = 0; i < len; i++) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(type, hItem.query)) {
                    continue;
                }
                switch (argLen) {
                    case 0:
                        hItem.h.call(ctx);
                        break;
                    case 1:
                        hItem.h.call(ctx, args[0]);
                        break;
                    case 2:
                        hItem.h.call(ctx, args[0], args[1]);
                        break;
                    default:
                        hItem.h.apply(ctx, args.slice(1, argLen - 1));
                        break;
                }
            }
        }
        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(type);
        return this;
    };
    return Eventful;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Eventful);


/***/ }),

/***/ 34685:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   oN: () => (/* binding */ DEFAULT_COMMON_STYLE),
/* harmony export */   sW: () => (/* binding */ DEFAULT_COMMON_ANIMATION_PROPS)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(83660);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30582);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22434);





var STYLE_MAGIC_KEY = '__zr_style_' + Math.round((Math.random() * 10));
var DEFAULT_COMMON_STYLE = {
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: '#000',
    opacity: 1,
    blend: 'source-over'
};
var DEFAULT_COMMON_ANIMATION_PROPS = {
    style: {
        shadowBlur: true,
        shadowOffsetX: true,
        shadowOffsetY: true,
        shadowColor: true,
        opacity: true
    }
};
DEFAULT_COMMON_STYLE[STYLE_MAGIC_KEY] = true;
var PRIMARY_STATES_KEYS = ['z', 'z2', 'invisible'];
var PRIMARY_STATES_KEYS_IN_HOVER_LAYER = ['invisible'];
var Displayable = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(Displayable, _super);
    function Displayable(props) {
        return _super.call(this, props) || this;
    }
    Displayable.prototype._init = function (props) {
        var keysArr = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(props);
        for (var i = 0; i < keysArr.length; i++) {
            var key = keysArr[i];
            if (key === 'style') {
                this.useStyle(props[key]);
            }
            else {
                _super.prototype.attrKV.call(this, key, props[key]);
            }
        }
        if (!this.style) {
            this.useStyle({});
        }
    };
    Displayable.prototype.beforeBrush = function (param) { };
    Displayable.prototype.afterBrush = function () { };
    Displayable.prototype.innerBeforeBrush = function () { };
    Displayable.prototype.innerAfterBrush = function () { };
    Displayable.prototype.shouldBePainted = function (viewWidth, viewHeight, considerClipPath, considerAncestors) {
        var m = this.transform;
        if (this.ignore
            || this.invisible
            || this.style.opacity === 0
            || (this.culling
                && isDisplayableCulled(this, viewWidth, viewHeight))
            || (m && !m[0] && !m[3])) {
            return false;
        }
        if (considerClipPath && this.__clipPaths && this.__clipPaths.length) {
            for (var i = 0; i < this.__clipPaths.length; ++i) {
                if (this.__clipPaths[i].isZeroArea()) {
                    return false;
                }
            }
        }
        if (considerAncestors && this.parent) {
            var parent_1 = this.parent;
            while (parent_1) {
                if (parent_1.ignore) {
                    return false;
                }
                parent_1 = parent_1.parent;
            }
        }
        return true;
    };
    Displayable.prototype.contain = function (x, y) {
        return this.rectContain(x, y);
    };
    Displayable.prototype.traverse = function (cb, context) {
        cb.call(context, this);
    };
    Displayable.prototype.rectContain = function (x, y) {
        var coord = this.transformCoordToLocal(x, y);
        var rect = this.getBoundingRect();
        return rect.contain(coord[0], coord[1]);
    };
    Displayable.prototype.getPaintRect = function () {
        var rect = this._paintRect;
        if (!this._paintRect || this.__dirty) {
            var transform = this.transform;
            var elRect = this.getBoundingRect();
            var style = this.style;
            var shadowSize = style.shadowBlur || 0;
            var shadowOffsetX = style.shadowOffsetX || 0;
            var shadowOffsetY = style.shadowOffsetY || 0;
            rect = this._paintRect || (this._paintRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0));
            if (transform) {
                _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.applyTransform(rect, elRect, transform);
            }
            else {
                rect.copy(elRect);
            }
            if (shadowSize || shadowOffsetX || shadowOffsetY) {
                rect.width += shadowSize * 2 + Math.abs(shadowOffsetX);
                rect.height += shadowSize * 2 + Math.abs(shadowOffsetY);
                rect.x = Math.min(rect.x, rect.x + shadowOffsetX - shadowSize);
                rect.y = Math.min(rect.y, rect.y + shadowOffsetY - shadowSize);
            }
            var tolerance = this.dirtyRectTolerance;
            if (!rect.isZero()) {
                rect.x = Math.floor(rect.x - tolerance);
                rect.y = Math.floor(rect.y - tolerance);
                rect.width = Math.ceil(rect.width + 1 + tolerance * 2);
                rect.height = Math.ceil(rect.height + 1 + tolerance * 2);
            }
        }
        return rect;
    };
    Displayable.prototype.setPrevPaintRect = function (paintRect) {
        if (paintRect) {
            this._prevPaintRect = this._prevPaintRect || new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0);
            this._prevPaintRect.copy(paintRect);
        }
        else {
            this._prevPaintRect = null;
        }
    };
    Displayable.prototype.getPrevPaintRect = function () {
        return this._prevPaintRect;
    };
    Displayable.prototype.animateStyle = function (loop) {
        return this.animate('style', loop);
    };
    Displayable.prototype.updateDuringAnimation = function (targetKey) {
        if (targetKey === 'style') {
            this.dirtyStyle();
        }
        else {
            this.markRedraw();
        }
    };
    Displayable.prototype.attrKV = function (key, value) {
        if (key !== 'style') {
            _super.prototype.attrKV.call(this, key, value);
        }
        else {
            if (!this.style) {
                this.useStyle(value);
            }
            else {
                this.setStyle(value);
            }
        }
    };
    Displayable.prototype.setStyle = function (keyOrObj, value) {
        if (typeof keyOrObj === 'string') {
            this.style[keyOrObj] = value;
        }
        else {
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)(this.style, keyOrObj);
        }
        this.dirtyStyle();
        return this;
    };
    Displayable.prototype.dirtyStyle = function (notRedraw) {
        if (!notRedraw) {
            this.markRedraw();
        }
        this.__dirty |= _constants_js__WEBPACK_IMPORTED_MODULE_3__/* .STYLE_CHANGED_BIT */ .pO;
        if (this._rect) {
            this._rect = null;
        }
    };
    Displayable.prototype.dirty = function () {
        this.dirtyStyle();
    };
    Displayable.prototype.styleChanged = function () {
        return !!(this.__dirty & _constants_js__WEBPACK_IMPORTED_MODULE_3__/* .STYLE_CHANGED_BIT */ .pO);
    };
    Displayable.prototype.styleUpdated = function () {
        this.__dirty &= ~_constants_js__WEBPACK_IMPORTED_MODULE_3__/* .STYLE_CHANGED_BIT */ .pO;
    };
    Displayable.prototype.createStyle = function (obj) {
        return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.createObject)(DEFAULT_COMMON_STYLE, obj);
    };
    Displayable.prototype.useStyle = function (obj) {
        if (!obj[STYLE_MAGIC_KEY]) {
            obj = this.createStyle(obj);
        }
        this.style = obj;
        this.dirtyStyle();
    };
    Displayable.prototype._useHoverStyle = function (obj) {
        this.__hoverStyle = obj;
    };
    Displayable.prototype.isStyleObject = function (obj) {
        return obj[STYLE_MAGIC_KEY];
    };
    Displayable.prototype._innerSaveToNormal = function (toState) {
        _super.prototype._innerSaveToNormal.call(this, toState);
        var normalState = this._normalState;
        if (toState.style && !normalState.style) {
            normalState.style = this._mergeStyle(this.createStyle(), this.style);
        }
        this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
    };
    Displayable.prototype._applyStateObj = function (stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
        _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
        var needsRestoreToNormal = !(state && keepCurrentStates);
        var inHoverOnlyStyleChange = this.__inHover === _Element_js__WEBPACK_IMPORTED_MODULE_4__/* .IN_HOVER_LAYER_KIND_ONLY_STYLE_CHANGE */ .yx;
        var targetStyle;
        if (state && state.style) {
            if (transition) {
                if (keepCurrentStates) {
                    targetStyle = state.style;
                }
                else {
                    targetStyle = this._mergeStyle(this.createStyle(), normalState.style);
                    this._mergeStyle(targetStyle, state.style);
                }
            }
            else {
                targetStyle = this._mergeStyle(this.createStyle(), keepCurrentStates ? this.style : normalState.style);
                this._mergeStyle(targetStyle, state.style);
            }
        }
        else if (needsRestoreToNormal) {
            targetStyle = normalState.style;
        }
        if (targetStyle) {
            if (transition) {
                var sourceStyle = this.style;
                this.style = this.createStyle(needsRestoreToNormal ? {} : sourceStyle);
                if (needsRestoreToNormal) {
                    var changedKeys = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(sourceStyle);
                    for (var i = 0; i < changedKeys.length; i++) {
                        var key = changedKeys[i];
                        if (key in targetStyle) {
                            targetStyle[key] = targetStyle[key];
                            this.style[key] = sourceStyle[key];
                        }
                    }
                }
                var targetKeys = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(targetStyle);
                for (var i = 0; i < targetKeys.length; i++) {
                    var key = targetKeys[i];
                    this.style[key] = this.style[key];
                }
                this._transitionState(stateName, {
                    style: targetStyle
                }, animationCfg, this.getAnimationStyleProps());
            }
            else {
                if (inHoverOnlyStyleChange) {
                    this._useHoverStyle(targetStyle);
                }
                else {
                    this.useStyle(targetStyle);
                }
            }
        }
        if (!inHoverOnlyStyleChange) {
            var statesKeys = this.__inHover ? PRIMARY_STATES_KEYS_IN_HOVER_LAYER : PRIMARY_STATES_KEYS;
            for (var i = 0; i < statesKeys.length; i++) {
                var key = statesKeys[i];
                if (state && state[key] != null) {
                    this[key] = state[key];
                }
                else if (needsRestoreToNormal) {
                    if (normalState[key] != null) {
                        this[key] = normalState[key];
                    }
                }
            }
        }
    };
    Displayable.prototype._mergeStates = function (states) {
        var mergedState = _super.prototype._mergeStates.call(this, states);
        var mergedStyle;
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.style) {
                mergedStyle = mergedStyle || {};
                this._mergeStyle(mergedStyle, state.style);
            }
        }
        if (mergedStyle) {
            mergedState.style = mergedStyle;
        }
        return mergedState;
    };
    Displayable.prototype._mergeStyle = function (targetStyle, sourceStyle) {
        (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)(targetStyle, sourceStyle);
        return targetStyle;
    };
    Displayable.prototype.getAnimationStyleProps = function () {
        return DEFAULT_COMMON_ANIMATION_PROPS;
    };
    Displayable.initDefaultProps = (function () {
        var dispProto = Displayable.prototype;
        dispProto.type = 'displayable';
        dispProto.invisible = false;
        dispProto.z = 0;
        dispProto.z2 = 0;
        dispProto.zlevel = 0;
        dispProto.culling = false;
        dispProto.cursor = 'pointer';
        dispProto.rectHover = false;
        dispProto.incremental = 0;
        dispProto._rect = null;
        dispProto.dirtyRectTolerance = 0;
        dispProto.__dirty = _constants_js__WEBPACK_IMPORTED_MODULE_3__/* .REDRAW_BIT */ .M | _constants_js__WEBPACK_IMPORTED_MODULE_3__/* .STYLE_CHANGED_BIT */ .pO;
    })();
    return Displayable;
}(_Element_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay));
var tmpRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0);
var viewRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0);
function isDisplayableCulled(el, width, height) {
    tmpRect.copy(el.getBoundingRect());
    if (el.transform) {
        tmpRect.applyTransform(el.transform);
    }
    viewRect.width = width;
    viewRect.height = height;
    return !tmpRect.intersect(viewRect);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Displayable);


/***/ }),

/***/ 35980:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83660);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30582);




var Group = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(Group, _super);
    function Group(opts) {
        var _this = _super.call(this) || this;
        _this.isGroup = true;
        _this._children = [];
        _this.attr(opts);
        return _this;
    }
    Group.prototype.childrenRef = function () {
        return this._children;
    };
    Group.prototype.children = function () {
        return this._children.slice();
    };
    Group.prototype.childAt = function (idx) {
        return this._children[idx];
    };
    Group.prototype.childOfName = function (name) {
        var children = this._children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].name === name) {
                return children[i];
            }
        }
    };
    Group.prototype.childCount = function () {
        return this._children.length;
    };
    Group.prototype.add = function (child) {
        if (child) {
            if (child !== this && child.parent !== this) {
                this._children.push(child);
                this._doAdd(child);
            }
            if (false) {}
        }
        return this;
    };
    Group.prototype.addBefore = function (child, nextSibling) {
        if (child && child !== this && child.parent !== this
            && nextSibling && nextSibling.parent === this) {
            var children = this._children;
            var idx = children.indexOf(nextSibling);
            if (idx >= 0) {
                children.splice(idx, 0, child);
                this._doAdd(child);
            }
        }
        return this;
    };
    Group.prototype.replace = function (oldChild, newChild) {
        var idx = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf(this._children, oldChild);
        if (idx >= 0) {
            this.replaceAt(newChild, idx);
        }
        return this;
    };
    Group.prototype.replaceAt = function (child, index) {
        var children = this._children;
        var old = children[index];
        if (child && child !== this && child.parent !== this && child !== old) {
            children[index] = child;
            old.parent = null;
            var zr = this.__zr;
            if (zr) {
                old.removeSelfFromZr(zr);
            }
            this._doAdd(child);
        }
        return this;
    };
    Group.prototype._doAdd = function (child) {
        if (child.parent) {
            child.parent.remove(child);
        }
        child.parent = this;
        var zr = this.__zr;
        if (zr && zr !== child.__zr) {
            child.addSelfToZr(zr);
        }
        zr && zr.refresh();
    };
    Group.prototype.remove = function (child) {
        var zr = this.__zr;
        var children = this._children;
        var idx = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf(children, child);
        if (idx < 0) {
            return this;
        }
        children.splice(idx, 1);
        child.parent = null;
        if (zr) {
            child.removeSelfFromZr(zr);
        }
        zr && zr.refresh();
        return this;
    };
    Group.prototype.removeAll = function () {
        var children = this._children;
        var zr = this.__zr;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (zr) {
                child.removeSelfFromZr(zr);
            }
            child.parent = null;
        }
        children.length = 0;
        return this;
    };
    Group.prototype.eachChild = function (cb, context) {
        var children = this._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            cb.call(context, child, i);
        }
        return this;
    };
    Group.prototype.traverse = function (cb, context) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            var stopped = cb.call(context, child);
            if (child.isGroup && !stopped) {
                child.traverse(cb, context);
            }
        }
        return this;
    };
    Group.prototype.addSelfToZr = function (zr) {
        _super.prototype.addSelfToZr.call(this, zr);
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child.addSelfToZr(zr);
        }
    };
    Group.prototype.removeSelfFromZr = function (zr) {
        _super.prototype.removeSelfFromZr.call(this, zr);
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child.removeSelfFromZr(zr);
        }
    };
    Group.prototype.getBoundingRect = function (includeChildren) {
        var tmpRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0);
        var children = includeChildren || this._children;
        var tmpMat = [];
        var rect = null;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.ignore || child.invisible) {
                continue;
            }
            var childRect = child.getBoundingRect();
            var transform = child.getLocalTransform(tmpMat);
            if (transform) {
                _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.applyTransform(tmpRect, childRect, transform);
                rect = rect || tmpRect.clone();
                rect.union(tmpRect);
            }
            else {
                rect = rect || childRect.clone();
                rect.union(childRect);
            }
        }
        return rect || tmpRect;
    };
    return Group;
}(_Element_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay));
Group.prototype.type = 'group';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);


/***/ }),

/***/ 36085:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $z: () => (/* binding */ INCREMENTAL_ID_FALSE),
/* harmony export */   XM: () => (/* binding */ ZLEVEL2_NORMAL_ABOVE),
/* harmony export */   cw: () => (/* binding */ ZLEVEL2_INCREMENTAL),
/* harmony export */   jP: () => (/* binding */ INCREMENTAL_ID_TRUE_COMPAT),
/* harmony export */   r4: () => (/* binding */ ZLEVEL2_NORMAL_BELOW)
/* harmony export */ });
var INCREMENTAL_ID_FALSE = 0;
var INCREMENTAL_ID_TRUE_COMPAT = 1;
var ZLEVEL2_NORMAL_ABOVE = 2;
var ZLEVEL2_INCREMENTAL = 1;
var ZLEVEL2_NORMAL_BELOW = 0;


/***/ }),

/***/ 36763:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ containStroke)
/* harmony export */ });
function containStroke(x0, y0, x1, y1, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    var _a = 0;
    var _b = x0;
    if ((y > y0 + _l && y > y1 + _l)
        || (y < y0 - _l && y < y1 - _l)
        || (x > x0 + _l && x > x1 + _l)
        || (x < x0 - _l && x < x1 - _l)) {
        return false;
    }
    if (x0 !== x1) {
        _a = (y0 - y1) / (x0 - x1);
        _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    }
    else {
        return Math.abs(x - x0) <= _l / 2;
    }
    var tmp = _a * x - y + _b;
    var _s = tmp * tmp / (_a * _a + 1);
    return _s <= _l / 2 * _l / 2;
}


/***/ }),

/***/ 38189:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ normalizeRadian)
/* harmony export */ });
var PI2 = Math.PI * 2;
function normalizeRadian(angle) {
    angle %= PI2;
    if (angle < 0) {
        angle += PI2;
    }
    return angle;
}


/***/ }),

/***/ 39658:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   I5: () => (/* binding */ parseFontSize),
/* harmony export */   XE: () => (/* binding */ hasSeparateFont)
/* harmony export */ });
/* unused harmony exports DEFAULT_TEXT_ANIMATION_PROPS, normalizeTextStyle */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42924);
/* harmony import */ var _helper_parseText_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66398);
/* harmony import */ var _TSpan_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76059);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _contain_text_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(60530);
/* harmony import */ var _Image_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(46422);
/* harmony import */ var _shape_Rect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19137);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30582);
/* harmony import */ var _Displayable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34685);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84143);










var DEFAULT_RICH_TEXT_COLOR = {
    fill: '#000'
};
var DEFAULT_STROKE_LINE_WIDTH = 2;
var tmpCITOverflowAreaOut = {};
var DEFAULT_TEXT_ANIMATION_PROPS = {
    style: (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)({
        fill: true,
        stroke: true,
        fillOpacity: true,
        strokeOpacity: true,
        lineWidth: true,
        fontSize: true,
        lineHeight: true,
        width: true,
        height: true,
        textShadowColor: true,
        textShadowBlur: true,
        textShadowOffsetX: true,
        textShadowOffsetY: true,
        backgroundColor: true,
        padding: true,
        borderColor: true,
        borderWidth: true,
        borderRadius: true
    }, _Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_COMMON_ANIMATION_PROPS */ .sW.style)
};
var ZRText = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__/* .__extends */ .C6)(ZRText, _super);
    function ZRText(opts) {
        var _this = _super.call(this) || this;
        _this.type = 'text';
        _this._children = [];
        _this._defaultStyle = DEFAULT_RICH_TEXT_COLOR;
        _this.attr(opts);
        return _this;
    }
    ZRText.prototype.childrenRef = function () {
        return this._children;
    };
    ZRText.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.styleChanged()) {
            this._updateSubTexts();
        }
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child.zlevel = this.zlevel;
            child.z = this.z;
            child.z2 = this.z2;
            child.culling = this.culling;
            child.cursor = this.cursor;
            child.invisible = this.invisible;
        }
    };
    ZRText.prototype.updateTransform = function () {
        var innerTransformable = this.innerTransformable;
        if (innerTransformable) {
            innerTransformable.updateTransform();
            if (innerTransformable.transform) {
                this.transform = innerTransformable.transform;
            }
        }
        else {
            _super.prototype.updateTransform.call(this);
        }
    };
    ZRText.prototype.getLocalTransform = function (m) {
        var innerTransformable = this.innerTransformable;
        return innerTransformable
            ? innerTransformable.getLocalTransform(m)
            : _super.prototype.getLocalTransform.call(this, m);
    };
    ZRText.prototype.getComputedTransform = function () {
        if (this.__hostTarget) {
            this.__hostTarget.getComputedTransform();
            this.__hostTarget.updateInnerText(true);
        }
        return _super.prototype.getComputedTransform.call(this);
    };
    ZRText.prototype._updateSubTexts = function () {
        this._childCursor = 0;
        normalizeTextStyle(this.style);
        this.style.rich
            ? this._updateRichTexts()
            : this._updatePlainTexts();
        this._children.length = this._childCursor;
        this.styleUpdated();
    };
    ZRText.prototype.addSelfToZr = function (zr) {
        _super.prototype.addSelfToZr.call(this, zr);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].__zr = zr;
        }
    };
    ZRText.prototype.removeSelfFromZr = function (zr) {
        _super.prototype.removeSelfFromZr.call(this, zr);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].__zr = null;
        }
    };
    ZRText.prototype.getBoundingRect = function () {
        if (this.styleChanged()) {
            this._updateSubTexts();
        }
        if (!this._rect) {
            var tmpRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(0, 0, 0, 0);
            var children = this._children;
            var tmpMat = [];
            var rect = null;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var childRect = child.getBoundingRect();
                var transform = child.getLocalTransform(tmpMat);
                if (transform) {
                    tmpRect.copy(childRect);
                    tmpRect.applyTransform(transform);
                    rect = rect || tmpRect.clone();
                    rect.union(tmpRect);
                }
                else {
                    rect = rect || childRect.clone();
                    rect.union(childRect);
                }
            }
            this._rect = rect || tmpRect;
        }
        return this._rect;
    };
    ZRText.prototype.setDefaultTextStyle = function (defaultTextStyle) {
        this._defaultStyle = defaultTextStyle || DEFAULT_RICH_TEXT_COLOR;
    };
    ZRText.prototype.setTextContent = function (textContent) {
        if (false) {}
    };
    ZRText.prototype._mergeStyle = function (targetStyle, sourceStyle) {
        if (!sourceStyle) {
            return targetStyle;
        }
        var sourceRich = sourceStyle.rich;
        var targetRich = targetStyle.rich || (sourceRich && {});
        (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(targetStyle, sourceStyle);
        if (sourceRich && targetRich) {
            this._mergeRich(targetRich, sourceRich);
            targetStyle.rich = targetRich;
        }
        else if (targetRich) {
            targetStyle.rich = targetRich;
        }
        return targetStyle;
    };
    ZRText.prototype._mergeRich = function (targetRich, sourceRich) {
        var richNames = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(sourceRich);
        for (var i = 0; i < richNames.length; i++) {
            var richName = richNames[i];
            targetRich[richName] = targetRich[richName] || {};
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(targetRich[richName], sourceRich[richName]);
        }
    };
    ZRText.prototype.getAnimationStyleProps = function () {
        return DEFAULT_TEXT_ANIMATION_PROPS;
    };
    ZRText.prototype._getOrCreateChild = function (Ctor) {
        var child = this._children[this._childCursor];
        if (!child || !(child instanceof Ctor)) {
            child = new Ctor();
        }
        this._children[this._childCursor++] = child;
        child.__zr = this.__zr;
        child.parent = this;
        return child;
    };
    ZRText.prototype._updatePlainTexts = function () {
        var style = this.style;
        var textFont = style.font || _core_platform_js__WEBPACK_IMPORTED_MODULE_4__/* .DEFAULT_FONT */ .OH;
        var textPadding = style.padding;
        var defaultStyle = this._defaultStyle;
        var baseX = style.x || 0;
        var baseY = style.y || 0;
        var textAlign = style.align || defaultStyle.align || 'left';
        var verticalAlign = style.verticalAlign || defaultStyle.verticalAlign || 'top';
        (0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_5__/* .calcInnerTextOverflowArea */ .Ss)(tmpCITOverflowAreaOut, defaultStyle.overflowRect, baseX, baseY, textAlign, verticalAlign);
        baseX = tmpCITOverflowAreaOut.baseX;
        baseY = tmpCITOverflowAreaOut.baseY;
        var text = getStyleText(style);
        var contentBlock = (0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_5__/* .parsePlainText */ .j_)(text, style, tmpCITOverflowAreaOut.outerWidth, tmpCITOverflowAreaOut.outerHeight);
        var needDrawBg = needDrawBackground(style);
        var bgColorDrawn = !!(style.backgroundColor);
        var outerHeight = contentBlock.outerHeight;
        var outerWidth = contentBlock.outerWidth;
        var textLines = contentBlock.lines;
        var lineHeight = contentBlock.lineHeight;
        this.isTruncated = !!contentBlock.isTruncated;
        var textX = baseX;
        var textY = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_6__/* .adjustTextY */ .sZ)(baseY, contentBlock.contentHeight, verticalAlign);
        if (needDrawBg || textPadding) {
            var boxX = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_6__/* .adjustTextX */ .ll)(baseX, outerWidth, textAlign);
            var boxY = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_6__/* .adjustTextY */ .sZ)(baseY, outerHeight, verticalAlign);
            needDrawBg && this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
        }
        textY += lineHeight / 2;
        if (textPadding) {
            textX = getTextXForPadding(baseX, textAlign, textPadding);
            if (verticalAlign === 'top') {
                textY += textPadding[0];
            }
            else if (verticalAlign === 'bottom') {
                textY -= textPadding[2];
            }
        }
        var defaultLineWidth = 0;
        var usingDefaultStroke = false;
        var useDefaultFill = false;
        var textFill = getFill('fill' in style
            ? style.fill
            : (useDefaultFill = true, defaultStyle.fill));
        var textStroke = getStroke('stroke' in style
            ? style.stroke
            : (!bgColorDrawn
                && (!defaultStyle.autoStroke || useDefaultFill))
                ? (defaultLineWidth = DEFAULT_STROKE_LINE_WIDTH, usingDefaultStroke = true, defaultStyle.stroke)
                : null);
        var hasShadow = style.textShadowBlur > 0;
        for (var i = 0; i < textLines.length; i++) {
            var el = this._getOrCreateChild(_TSpan_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A);
            var subElStyle = el.createStyle();
            el.useStyle(subElStyle);
            subElStyle.text = textLines[i];
            subElStyle.x = textX;
            subElStyle.y = textY;
            if (textAlign) {
                subElStyle.textAlign = textAlign;
            }
            subElStyle.textBaseline = 'middle';
            subElStyle.opacity = style.opacity;
            subElStyle.strokeFirst = true;
            if (hasShadow) {
                subElStyle.shadowBlur = style.textShadowBlur || 0;
                subElStyle.shadowColor = style.textShadowColor || 'transparent';
                subElStyle.shadowOffsetX = style.textShadowOffsetX || 0;
                subElStyle.shadowOffsetY = style.textShadowOffsetY || 0;
            }
            subElStyle.stroke = textStroke;
            subElStyle.fill = textFill;
            if (textStroke) {
                subElStyle.lineWidth = style.lineWidth || defaultLineWidth;
                subElStyle.lineDash = style.lineDash;
                subElStyle.lineDashOffset = style.lineDashOffset || 0;
            }
            subElStyle.font = textFont;
            setSeparateFont(subElStyle, style);
            textY += lineHeight;
            el.setBoundingRect((0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_5__/* .tSpanCreateBoundingRect2 */ .xu)(subElStyle, contentBlock.contentWidth, contentBlock.calculatedLineHeight, usingDefaultStroke ? 0 : null));
        }
    };
    ZRText.prototype._updateRichTexts = function () {
        var style = this.style;
        var defaultStyle = this._defaultStyle;
        var textAlign = style.align || defaultStyle.align;
        var verticalAlign = style.verticalAlign || defaultStyle.verticalAlign;
        var baseX = style.x || 0;
        var baseY = style.y || 0;
        (0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_5__/* .calcInnerTextOverflowArea */ .Ss)(tmpCITOverflowAreaOut, defaultStyle.overflowRect, baseX, baseY, textAlign, verticalAlign);
        baseX = tmpCITOverflowAreaOut.baseX;
        baseY = tmpCITOverflowAreaOut.baseY;
        var text = getStyleText(style);
        var contentBlock = (0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_5__/* .parseRichText */ .FQ)(text, style, tmpCITOverflowAreaOut.outerWidth, tmpCITOverflowAreaOut.outerHeight, textAlign);
        var contentWidth = contentBlock.width;
        var outerWidth = contentBlock.outerWidth;
        var outerHeight = contentBlock.outerHeight;
        var textPadding = style.padding;
        this.isTruncated = !!contentBlock.isTruncated;
        var boxX = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_6__/* .adjustTextX */ .ll)(baseX, outerWidth, textAlign);
        var boxY = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_6__/* .adjustTextY */ .sZ)(baseY, outerHeight, verticalAlign);
        var xLeft = boxX;
        var lineTop = boxY;
        if (textPadding) {
            xLeft += textPadding[3];
            lineTop += textPadding[0];
        }
        var xRight = xLeft + contentWidth;
        if (needDrawBackground(style)) {
            this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
        }
        var bgColorDrawn = !!(style.backgroundColor);
        for (var i = 0; i < contentBlock.lines.length; i++) {
            var line = contentBlock.lines[i];
            var tokens = line.tokens;
            var tokenCount = tokens.length;
            var lineHeight = line.lineHeight;
            var remainedWidth = line.width;
            var leftIndex = 0;
            var lineXLeft = xLeft;
            var lineXRight = xRight;
            var rightIndex = tokenCount - 1;
            var token = void 0;
            while (leftIndex < tokenCount
                && (token = tokens[leftIndex], !token.align || token.align === 'left')) {
                this._placeToken(token, style, lineHeight, lineTop, lineXLeft, 'left', bgColorDrawn);
                remainedWidth -= token.width;
                lineXLeft += token.width;
                leftIndex++;
            }
            while (rightIndex >= 0
                && (token = tokens[rightIndex], token.align === 'right')) {
                this._placeToken(token, style, lineHeight, lineTop, lineXRight, 'right', bgColorDrawn);
                remainedWidth -= token.width;
                lineXRight -= token.width;
                rightIndex--;
            }
            lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - remainedWidth) / 2;
            while (leftIndex <= rightIndex) {
                token = tokens[leftIndex];
                this._placeToken(token, style, lineHeight, lineTop, lineXLeft + token.width / 2, 'center', bgColorDrawn);
                lineXLeft += token.width;
                leftIndex++;
            }
            lineTop += lineHeight;
        }
    };
    ZRText.prototype._placeToken = function (token, style, lineHeight, lineTop, x, textAlign, parentBgColorDrawn) {
        var tokenStyle = style.rich[token.styleName] || {};
        tokenStyle.text = token.text;
        var verticalAlign = token.verticalAlign;
        var y = lineTop + lineHeight / 2;
        if (verticalAlign === 'top') {
            y = lineTop + token.height / 2;
        }
        else if (verticalAlign === 'bottom') {
            y = lineTop + lineHeight - token.height / 2;
        }
        var needDrawBg = !token.isLineHolder && needDrawBackground(tokenStyle);
        needDrawBg && this._renderBackground(tokenStyle, style, textAlign === 'right'
            ? x - token.width
            : textAlign === 'center'
                ? x - token.width / 2
                : x, y - token.height / 2, token.width, token.height);
        var bgColorDrawn = !!tokenStyle.backgroundColor;
        var textPadding = token.textPadding;
        if (textPadding) {
            x = getTextXForPadding(x, textAlign, textPadding);
            y -= token.height / 2 - textPadding[0] - token.innerHeight / 2;
        }
        var el = this._getOrCreateChild(_TSpan_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A);
        var subElStyle = el.createStyle();
        el.useStyle(subElStyle);
        var defaultStyle = this._defaultStyle;
        var useDefaultFill = false;
        var defaultLineWidth = 0;
        var usingDefaultStroke = false;
        var textFill = getFill('fill' in tokenStyle ? tokenStyle.fill
            : 'fill' in style ? style.fill
                : (useDefaultFill = true, defaultStyle.fill));
        var textStroke = getStroke('stroke' in tokenStyle ? tokenStyle.stroke
            : 'stroke' in style ? style.stroke
                : (!bgColorDrawn
                    && !parentBgColorDrawn
                    && (!defaultStyle.autoStroke || useDefaultFill)) ? (defaultLineWidth = DEFAULT_STROKE_LINE_WIDTH, usingDefaultStroke = true, defaultStyle.stroke)
                    : null);
        var hasShadow = tokenStyle.textShadowBlur > 0
            || style.textShadowBlur > 0;
        subElStyle.text = token.text;
        subElStyle.x = x;
        subElStyle.y = y;
        if (hasShadow) {
            subElStyle.shadowBlur = tokenStyle.textShadowBlur || style.textShadowBlur || 0;
            subElStyle.shadowColor = tokenStyle.textShadowColor || style.textShadowColor || 'transparent';
            subElStyle.shadowOffsetX = tokenStyle.textShadowOffsetX || style.textShadowOffsetX || 0;
            subElStyle.shadowOffsetY = tokenStyle.textShadowOffsetY || style.textShadowOffsetY || 0;
        }
        subElStyle.textAlign = textAlign;
        subElStyle.textBaseline = 'middle';
        subElStyle.font = token.font || _core_platform_js__WEBPACK_IMPORTED_MODULE_4__/* .DEFAULT_FONT */ .OH;
        subElStyle.opacity = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve3)(tokenStyle.opacity, style.opacity, 1);
        setSeparateFont(subElStyle, tokenStyle);
        if (textStroke) {
            subElStyle.lineWidth = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve3)(tokenStyle.lineWidth, style.lineWidth, defaultLineWidth);
            subElStyle.lineDash = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(tokenStyle.lineDash, style.lineDash);
            subElStyle.lineDashOffset = style.lineDashOffset || 0;
            subElStyle.stroke = textStroke;
        }
        if (textFill) {
            subElStyle.fill = textFill;
        }
        el.setBoundingRect((0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_5__/* .tSpanCreateBoundingRect2 */ .xu)(subElStyle, token.contentWidth, token.contentHeight, usingDefaultStroke ? 0 : null));
    };
    ZRText.prototype._renderBackground = function (style, topStyle, x, y, width, height) {
        var textBackgroundColor = style.backgroundColor;
        var textBorderWidth = style.borderWidth;
        var textBorderColor = style.borderColor;
        var isImageBg = textBackgroundColor && textBackgroundColor.image;
        var isPlainOrGradientBg = textBackgroundColor && !isImageBg;
        var textBorderRadius = style.borderRadius;
        var self = this;
        var rectEl;
        var imgEl;
        if (isPlainOrGradientBg || style.lineHeight || (textBorderWidth && textBorderColor)) {
            rectEl = this._getOrCreateChild(_shape_Rect_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A);
            rectEl.useStyle(rectEl.createStyle());
            rectEl.style.fill = null;
            var rectShape = rectEl.shape;
            rectShape.x = x;
            rectShape.y = y;
            rectShape.width = width;
            rectShape.height = height;
            rectShape.r = textBorderRadius;
            rectEl.dirtyShape();
        }
        if (isPlainOrGradientBg) {
            var rectStyle = rectEl.style;
            rectStyle.fill = textBackgroundColor || null;
            rectStyle.fillOpacity = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(style.fillOpacity, 1);
        }
        else if (isImageBg) {
            imgEl = this._getOrCreateChild(_Image_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Ay);
            imgEl.onload = function () {
                self.dirtyStyle();
            };
            var imgStyle = imgEl.style;
            imgStyle.image = textBackgroundColor.image;
            imgStyle.x = x;
            imgStyle.y = y;
            imgStyle.width = width;
            imgStyle.height = height;
        }
        if (textBorderWidth && textBorderColor) {
            var rectStyle = rectEl.style;
            rectStyle.lineWidth = textBorderWidth;
            rectStyle.stroke = textBorderColor;
            rectStyle.strokeOpacity = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(style.strokeOpacity, 1);
            rectStyle.lineDash = style.borderDash;
            rectStyle.lineDashOffset = style.borderDashOffset || 0;
            rectEl.strokeContainThreshold = 0;
            if (rectEl.hasFill() && rectEl.hasStroke()) {
                rectStyle.strokeFirst = true;
                rectStyle.lineWidth *= 2;
            }
        }
        var commonStyle = (rectEl || imgEl).style;
        commonStyle.shadowBlur = style.shadowBlur || 0;
        commonStyle.shadowColor = style.shadowColor || 'transparent';
        commonStyle.shadowOffsetX = style.shadowOffsetX || 0;
        commonStyle.shadowOffsetY = style.shadowOffsetY || 0;
        commonStyle.opacity = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve3)(style.opacity, topStyle.opacity, 1);
    };
    ZRText.makeFont = function (style) {
        var font = '';
        if (hasSeparateFont(style)) {
            font = [
                style.fontStyle,
                style.fontWeight,
                parseFontSize(style.fontSize),
                style.fontFamily || 'sans-serif'
            ].join(' ');
        }
        return font && (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.trim)(font) || style.textFont || style.font;
    };
    return ZRText;
}(_Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay));
var VALID_TEXT_ALIGN = { left: true, right: 1, center: 1 };
var VALID_TEXT_VERTICAL_ALIGN = { top: 1, bottom: 1, middle: 1 };
var FONT_PARTS = ['fontStyle', 'fontWeight', 'fontSize', 'fontFamily'];
function parseFontSize(fontSize) {
    if (typeof fontSize === 'string'
        && (fontSize.indexOf('px') !== -1
            || fontSize.indexOf('rem') !== -1
            || fontSize.indexOf('em') !== -1)) {
        return fontSize;
    }
    else if (!isNaN(+fontSize)) {
        return fontSize + 'px';
    }
    else {
        return _core_platform_js__WEBPACK_IMPORTED_MODULE_4__/* .DEFAULT_FONT_SIZE */ .gI + 'px';
    }
}
function setSeparateFont(targetStyle, sourceStyle) {
    for (var i = 0; i < FONT_PARTS.length; i++) {
        var fontProp = FONT_PARTS[i];
        var val = sourceStyle[fontProp];
        if (val != null) {
            targetStyle[fontProp] = val;
        }
    }
}
function hasSeparateFont(style) {
    return style.fontSize != null || style.fontFamily || style.fontWeight;
}
function normalizeTextStyle(style) {
    normalizeStyle(style);
    (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(style.rich, normalizeStyle);
    return style;
}
function normalizeStyle(style) {
    if (style) {
        style.font = ZRText.makeFont(style);
        var textAlign = style.align;
        textAlign === 'middle' && (textAlign = 'center');
        style.align = (textAlign == null || VALID_TEXT_ALIGN[textAlign]) ? textAlign : 'left';
        var verticalAlign = style.verticalAlign;
        verticalAlign === 'center' && (verticalAlign = 'middle');
        style.verticalAlign = (verticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[verticalAlign]) ? verticalAlign : 'top';
        var textPadding = style.padding;
        if (textPadding) {
            style.padding = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.normalizeCssArray)(style.padding);
        }
    }
}
function getStroke(stroke, lineWidth) {
    return (stroke == null || lineWidth <= 0 || stroke === 'transparent' || stroke === 'none')
        ? null
        : (stroke.image || stroke.colorStops)
            ? '#000'
            : stroke;
}
function getFill(fill) {
    return (fill == null || fill === 'none')
        ? null
        : (fill.image || fill.colorStops)
            ? '#000'
            : fill;
}
function getTextXForPadding(x, textAlign, textPadding) {
    return textAlign === 'right'
        ? (x - textPadding[1])
        : textAlign === 'center'
            ? (x + textPadding[3] / 2 - textPadding[1] / 2)
            : (x + textPadding[3]);
}
function getStyleText(style) {
    var text = style.text;
    text != null && (text += '');
    return text;
}
function needDrawBackground(style) {
    return !!(style.backgroundColor
        || style.lineHeight
        || (style.borderWidth && style.borderColor));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ZRText);


/***/ }),

/***/ 39729:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports Entry, LinkedList */
var Entry = (function () {
    function Entry(val) {
        this.value = val;
    }
    return Entry;
}());

var LinkedList = (function () {
    function LinkedList() {
        this._len = 0;
    }
    LinkedList.prototype.insert = function (val) {
        var entry = new Entry(val);
        this.insertEntry(entry);
        return entry;
    };
    LinkedList.prototype.insertEntry = function (entry) {
        if (!this.head) {
            this.head = this.tail = entry;
        }
        else {
            this.tail.next = entry;
            entry.prev = this.tail;
            entry.next = null;
            this.tail = entry;
        }
        this._len++;
    };
    LinkedList.prototype.remove = function (entry) {
        var prev = entry.prev;
        var next = entry.next;
        if (prev) {
            prev.next = next;
        }
        else {
            this.head = next;
        }
        if (next) {
            next.prev = prev;
        }
        else {
            this.tail = prev;
        }
        entry.next = entry.prev = null;
        this._len--;
    };
    LinkedList.prototype.len = function () {
        return this._len;
    };
    LinkedList.prototype.clear = function () {
        this.head = this.tail = null;
        this._len = 0;
    };
    return LinkedList;
}());

var LRU = (function () {
    function LRU(maxSize) {
        this._list = new LinkedList();
        this._maxSize = 10;
        this._map = {};
        this._maxSize = maxSize;
    }
    LRU.prototype.put = function (key, value) {
        var list = this._list;
        var map = this._map;
        var removed = null;
        if (map[key] == null) {
            var len = list.len();
            var entry = this._lastRemovedEntry;
            if (len >= this._maxSize && len > 0) {
                var leastUsedEntry = list.head;
                list.remove(leastUsedEntry);
                delete map[leastUsedEntry.key];
                removed = leastUsedEntry.value;
                this._lastRemovedEntry = leastUsedEntry;
            }
            if (entry) {
                entry.value = value;
            }
            else {
                entry = new Entry(value);
            }
            entry.key = key;
            list.insertEntry(entry);
            map[key] = entry;
        }
        return removed;
    };
    LRU.prototype.get = function (key) {
        var entry = this._map[key];
        var list = this._list;
        if (entry != null) {
            if (entry !== list.tail) {
                list.remove(entry);
                list.insertEntry(entry);
            }
            return entry.value;
        }
    };
    LRU.prototype.clear = function () {
        this._list.clear();
        this._map = {};
    };
    LRU.prototype.len = function () {
        return this._list.len();
    };
    return LRU;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LRU);


/***/ }),

/***/ 41443:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V$: () => (/* binding */ brush),
/* harmony export */   Xi: () => (/* binding */ brushSingle),
/* harmony export */   ZQ: () => (/* binding */ createCanvasPattern),
/* harmony export */   v6: () => (/* binding */ brushLoopFinalize)
/* harmony export */ });
/* harmony import */ var _graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34685);
/* harmony import */ var _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45857);
/* harmony import */ var _graphic_helper_image_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15175);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51549);
/* harmony import */ var _graphic_Path_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12682);
/* harmony import */ var _graphic_Image_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(46422);
/* harmony import */ var _graphic_TSpan_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76059);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _dashStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(53270);
/* harmony import */ var _graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22434);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(84143);











var pathProxyForDraw = new _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(true);
function styleHasStroke(style) {
    var stroke = style.stroke;
    return !(stroke == null || stroke === 'none' || !(style.lineWidth > 0));
}
function isValidStrokeFillStyle(strokeOrFill) {
    return typeof strokeOrFill === 'string' && strokeOrFill !== 'none';
}
function styleHasFill(style) {
    var fill = style.fill;
    return fill != null && fill !== 'none';
}
function doFillPath(ctx, style) {
    if (style.fillOpacity != null && style.fillOpacity !== 1) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.fillOpacity * style.opacity;
        ctx.fill();
        ctx.globalAlpha = originalGlobalAlpha;
    }
    else {
        ctx.fill();
    }
}
function doStrokePath(ctx, style) {
    if (style.strokeOpacity != null && style.strokeOpacity !== 1) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.strokeOpacity * style.opacity;
        ctx.stroke();
        ctx.globalAlpha = originalGlobalAlpha;
    }
    else {
        ctx.stroke();
    }
}
function createCanvasPattern(ctx, pattern, el) {
    var image = (0,_graphic_helper_image_js__WEBPACK_IMPORTED_MODULE_1__/* .createOrUpdateImage */ .OD)(pattern.image, pattern.__image, el);
    if ((0,_graphic_helper_image_js__WEBPACK_IMPORTED_MODULE_1__/* .isImageReady */ .xA)(image)) {
        var canvasPattern = ctx.createPattern(image, pattern.repeat || 'repeat');
        if (typeof DOMMatrix === 'function'
            && canvasPattern
            && canvasPattern.setTransform) {
            var matrix = new DOMMatrix();
            matrix.translateSelf((pattern.x || 0), (pattern.y || 0));
            matrix.rotateSelf(0, 0, (pattern.rotation || 0) * _core_util_js__WEBPACK_IMPORTED_MODULE_2__.RADIAN_TO_DEGREE);
            matrix.scaleSelf((pattern.scaleX || 1), (pattern.scaleY || 1));
            canvasPattern.setTransform(matrix);
        }
        return canvasPattern;
    }
}
function brushPath(ctx, el, style, canBatch, scope) {
    var _a;
    var hasStroke = styleHasStroke(style);
    var hasFill = styleHasFill(style);
    var strokePercent = style.strokePercent;
    var strokePart = strokePercent < 1;
    var firstDraw = !el.path;
    if ((!el.silent || strokePart) && firstDraw) {
        el.createPathProxy();
    }
    var path = el.path || pathProxyForDraw;
    var dirtyFlag = el.__dirty;
    if (!canBatch) {
        var fill = style.fill;
        var stroke = style.stroke;
        var hasFillGradient = hasFill && !!fill.colorStops;
        var hasStrokeGradient = hasStroke && !!stroke.colorStops;
        var hasFillPattern = hasFill && !!fill.image;
        var hasStrokePattern = hasStroke && !!stroke.image;
        var fillGradient = void 0;
        var strokeGradient = void 0;
        var fillPattern = void 0;
        var strokePattern = void 0;
        var rect = void 0;
        if (hasFillGradient || hasStrokeGradient) {
            rect = el.getBoundingRect();
        }
        if (hasFillGradient) {
            fillGradient = dirtyFlag
                ? (0,_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .getCanvasGradient */ .Ff)(ctx, fill, rect)
                : el.__canvasFillGradient;
            el.__canvasFillGradient = fillGradient;
        }
        if (hasStrokeGradient) {
            strokeGradient = dirtyFlag
                ? (0,_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .getCanvasGradient */ .Ff)(ctx, stroke, rect)
                : el.__canvasStrokeGradient;
            el.__canvasStrokeGradient = strokeGradient;
        }
        if (hasFillPattern) {
            fillPattern = (dirtyFlag || !el.__canvasFillPattern)
                ? createCanvasPattern(ctx, fill, el)
                : el.__canvasFillPattern;
            el.__canvasFillPattern = fillPattern;
        }
        if (hasStrokePattern) {
            strokePattern = (dirtyFlag || !el.__canvasStrokePattern)
                ? createCanvasPattern(ctx, stroke, el)
                : el.__canvasStrokePattern;
            el.__canvasStrokePattern = strokePattern;
        }
        if (hasFillGradient) {
            ctx.fillStyle = fillGradient;
        }
        else if (hasFillPattern) {
            if (fillPattern) {
                ctx.fillStyle = fillPattern;
            }
            else {
                hasFill = false;
            }
        }
        if (hasStrokeGradient) {
            ctx.strokeStyle = strokeGradient;
        }
        else if (hasStrokePattern) {
            if (strokePattern) {
                ctx.strokeStyle = strokePattern;
            }
            else {
                hasStroke = false;
            }
        }
    }
    var scale = el.getGlobalScale();
    path.setScale(scale[0], scale[1], el.segmentIgnoreThreshold);
    var lineDash;
    var lineDashOffset;
    if (ctx.setLineDash && style.lineDash) {
        _a = (0,_dashStyle_js__WEBPACK_IMPORTED_MODULE_4__/* .getLineDash */ .V)(el), lineDash = _a[0], lineDashOffset = _a[1];
    }
    var needsRebuild = true;
    if (firstDraw || (dirtyFlag & _graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .SHAPE_CHANGED_BIT */ .Dl)) {
        path.setDPR(ctx.dpr);
        if (strokePart) {
            path.setContext(null);
        }
        else {
            path.setContext(ctx);
            needsRebuild = false;
        }
        path.reset();
        el.buildPath(path, el.shape, canBatch);
        path.toStatic();
        el.pathUpdated();
    }
    if (needsRebuild) {
        path.rebuildPath(ctx, strokePart ? strokePercent : 1);
    }
    if (lineDash) {
        ctx.setLineDash(lineDash);
        ctx.lineDashOffset = lineDashOffset;
    }
    if (!canBatch) {
        if (style.strokeFirst) {
            if (hasStroke) {
                doStrokePath(ctx, style);
            }
            if (hasFill) {
                doFillPath(ctx, style);
            }
        }
        else {
            if (hasFill) {
                doFillPath(ctx, style);
            }
            if (hasStroke) {
                doStrokePath(ctx, style);
            }
        }
    }
    else {
        scope.batchFill = hasFill;
        scope.batchStroke = hasStroke;
    }
    if (lineDash) {
        ctx.setLineDash([]);
    }
}
function brushImage(ctx, el, style) {
    var image = el.__image = (0,_graphic_helper_image_js__WEBPACK_IMPORTED_MODULE_1__/* .createOrUpdateImage */ .OD)(style.image, el.__image, el, el.onload);
    if (!image || !(0,_graphic_helper_image_js__WEBPACK_IMPORTED_MODULE_1__/* .isImageReady */ .xA)(image)) {
        return;
    }
    var x = style.x || 0;
    var y = style.y || 0;
    var width = el.getWidth();
    var height = el.getHeight();
    var aspect = image.width / image.height;
    if (width == null && height != null) {
        width = height * aspect;
    }
    else if (height == null && width != null) {
        height = width / aspect;
    }
    else if (width == null && height == null) {
        width = image.width;
        height = image.height;
    }
    if (style.sWidth && style.sHeight) {
        var sx = style.sx || 0;
        var sy = style.sy || 0;
        ctx.drawImage(image, sx, sy, style.sWidth, style.sHeight, x, y, width, height);
    }
    else if (style.sx && style.sy) {
        var sx = style.sx;
        var sy = style.sy;
        var sWidth = width - sx;
        var sHeight = height - sy;
        ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    }
    else {
        ctx.drawImage(image, x, y, width, height);
    }
}
function brushText(ctx, el, style) {
    var _a;
    var text = style.text;
    text != null && (text += '');
    if (text) {
        ctx.font = style.font || _core_platform_js__WEBPACK_IMPORTED_MODULE_6__/* .DEFAULT_FONT */ .OH;
        ctx.textAlign = style.textAlign;
        ctx.textBaseline = style.textBaseline;
        var lineDash = void 0;
        var lineDashOffset = void 0;
        if (ctx.setLineDash && style.lineDash) {
            _a = (0,_dashStyle_js__WEBPACK_IMPORTED_MODULE_4__/* .getLineDash */ .V)(el), lineDash = _a[0], lineDashOffset = _a[1];
        }
        if (lineDash) {
            ctx.setLineDash(lineDash);
            ctx.lineDashOffset = lineDashOffset;
        }
        if (style.strokeFirst) {
            if (styleHasStroke(style)) {
                ctx.strokeText(text, style.x, style.y);
            }
            if (styleHasFill(style)) {
                ctx.fillText(text, style.x, style.y);
            }
        }
        else {
            if (styleHasFill(style)) {
                ctx.fillText(text, style.x, style.y);
            }
            if (styleHasStroke(style)) {
                ctx.strokeText(text, style.x, style.y);
            }
        }
        if (lineDash) {
            ctx.setLineDash([]);
        }
    }
}
var SHADOW_NUMBER_PROPS = ['shadowBlur', 'shadowOffsetX', 'shadowOffsetY'];
var STROKE_PROPS = [
    ['lineCap', 'butt'], ['lineJoin', 'miter'], ['miterLimit', 10]
];
function bindCommonProps(ctx, style, prevStyle, forceSetAll, scope) {
    var styleChanged = false;
    if (!forceSetAll) {
        prevStyle = prevStyle || {};
        if (style === prevStyle) {
            return false;
        }
    }
    if (forceSetAll || style.opacity !== prevStyle.opacity) {
        flushPathDrawn(ctx, scope);
        styleChanged = true;
        var opacity = Math.max(Math.min(style.opacity, 1), 0);
        ctx.globalAlpha = isNaN(opacity) ? _graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_7__/* .DEFAULT_COMMON_STYLE */ .oN.opacity : opacity;
    }
    if (forceSetAll || style.blend !== prevStyle.blend) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.globalCompositeOperation = style.blend || _graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_7__/* .DEFAULT_COMMON_STYLE */ .oN.blend;
    }
    for (var i = 0; i < SHADOW_NUMBER_PROPS.length; i++) {
        var propName = SHADOW_NUMBER_PROPS[i];
        if (forceSetAll || style[propName] !== prevStyle[propName]) {
            if (!styleChanged) {
                flushPathDrawn(ctx, scope);
                styleChanged = true;
            }
            ctx[propName] = ctx.dpr * (style[propName] || 0);
        }
    }
    if (forceSetAll || style.shadowColor !== prevStyle.shadowColor) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.shadowColor = style.shadowColor || _graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_7__/* .DEFAULT_COMMON_STYLE */ .oN.shadowColor;
    }
    return styleChanged;
}
function bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetAll, scope) {
    var style = el.style;
    var prevStyle = forceSetAll
        ? null
        : (prevEl && prevEl.style || {});
    if (style === prevStyle) {
        return false;
    }
    var styleChanged = bindCommonProps(ctx, style, prevStyle, forceSetAll, scope);
    if (forceSetAll || style.fill !== prevStyle.fill) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        isValidStrokeFillStyle(style.fill) && (ctx.fillStyle = style.fill);
    }
    if (forceSetAll || style.stroke !== prevStyle.stroke) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        isValidStrokeFillStyle(style.stroke) && (ctx.strokeStyle = style.stroke);
    }
    if (forceSetAll || style.opacity !== prevStyle.opacity) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
    }
    if (el.hasStroke()) {
        var lineWidth = style.lineWidth;
        var newLineWidth = lineWidth / ((style.strokeNoScale && el.getLineScale) ? el.getLineScale() : 1);
        if (ctx.lineWidth !== newLineWidth) {
            if (!styleChanged) {
                flushPathDrawn(ctx, scope);
                styleChanged = true;
            }
            ctx.lineWidth = newLineWidth;
        }
    }
    for (var i = 0; i < STROKE_PROPS.length; i++) {
        var prop = STROKE_PROPS[i];
        var propName = prop[0];
        if (forceSetAll || style[propName] !== prevStyle[propName]) {
            if (!styleChanged) {
                flushPathDrawn(ctx, scope);
                styleChanged = true;
            }
            ctx[propName] = style[propName] || prop[1];
        }
    }
    return styleChanged;
}
function bindImageStyle(ctx, el, prevEl, forceSetAll, scope) {
    return bindCommonProps(ctx, el.style, prevEl && prevEl.style, forceSetAll, scope);
}
function setContextTransform(ctx, el) {
    var m = el.transform;
    var dpr = ctx.dpr || 1;
    if (m) {
        ctx.setTransform(dpr * m[0], dpr * m[1], dpr * m[2], dpr * m[3], dpr * m[4], dpr * m[5]);
    }
    else {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
}
function updateClipStatus(clipPaths, ctx, scope) {
    var allClipped = false;
    for (var i = 0; i < clipPaths.length; i++) {
        var clipPath = clipPaths[i];
        allClipped = allClipped || clipPath.isZeroArea();
        setContextTransform(ctx, clipPath);
        ctx.beginPath();
        clipPath.buildPath(ctx, clipPath.shape);
        ctx.clip();
    }
    scope.allClipped = allClipped;
}
function isTransformChanged(m0, m1) {
    if (m0 && m1) {
        return m0[0] !== m1[0]
            || m0[1] !== m1[1]
            || m0[2] !== m1[2]
            || m0[3] !== m1[3]
            || m0[4] !== m1[4]
            || m0[5] !== m1[5];
    }
    else if (!m0 && !m1) {
        return false;
    }
    return true;
}
var DRAW_TYPE_PATH = 1;
var DRAW_TYPE_IMAGE = 2;
var DRAW_TYPE_TEXT = 3;
var DRAW_TYPE_INCREMENTAL = 4;
function canPathBatch(style) {
    var hasFill = styleHasFill(style);
    var hasStroke = styleHasStroke(style);
    return !(style.lineDash
        || !(+hasFill ^ +hasStroke)
        || (hasFill && typeof style.fill !== 'string')
        || (hasStroke && typeof style.stroke !== 'string')
        || style.strokePercent < 1
        || style.strokeOpacity < 1
        || style.fillOpacity < 1);
}
function flushPathDrawn(ctx, scope) {
    if (scope.batchFill) {
        scope.batchFill = false;
        ctx.fill();
    }
    if (scope.batchStroke) {
        scope.batchStroke = false;
        ctx.stroke();
    }
}
function brushSingle(ctx, el) {
    var scope = { inHover: false, viewWidth: 0, viewHeight: 0, beforeBrushParam: {} };
    brush(ctx, el, scope);
    brushLoopFinalize(ctx, scope);
}
function brush(ctx, el, scope) {
    var m = el.transform;
    if (!el.shouldBePainted(scope.viewWidth, scope.viewHeight, false, false)) {
        el.__dirty &= ~_graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .REDRAW_BIT */ .M;
        el.__isRendered = false;
        return;
    }
    var clipPaths = el.__clipPaths;
    var prevElClipPaths = scope.prevElClipPaths;
    var style = el.style;
    var forceSetTransform = false;
    var forceSetStyle = false;
    if (!prevElClipPaths || (0,_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .isClipPathChanged */ .KU)(clipPaths, prevElClipPaths)) {
        if (prevElClipPaths) {
            flushPathDrawn(ctx, scope);
            ctx.restore();
            forceSetStyle = forceSetTransform = true;
            scope.prevElClipPaths = null;
            scope.allClipped = false;
            scope.prevEl = null;
        }
        if (clipPaths && clipPaths.length) {
            flushPathDrawn(ctx, scope);
            ctx.save();
            updateClipStatus(clipPaths, ctx, scope);
            forceSetTransform = true;
            scope.prevElClipPaths = clipPaths;
        }
    }
    if (scope.allClipped) {
        el.__dirty &= ~_graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .REDRAW_BIT */ .M;
        el.__isRendered = false;
        return;
    }
    el.beforeBrush && el.beforeBrush(scope.beforeBrushParam);
    el.innerBeforeBrush();
    var prevEl = scope.prevEl;
    if (!prevEl) {
        forceSetStyle = forceSetTransform = true;
    }
    var canBatchPath = el instanceof _graphic_Path_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Ay
        && el.autoBatch
        && canPathBatch(style);
    if (forceSetTransform || isTransformChanged(m, prevEl.transform)) {
        flushPathDrawn(ctx, scope);
        setContextTransform(ctx, el);
    }
    else if (!canBatchPath) {
        flushPathDrawn(ctx, scope);
    }
    if (el instanceof _graphic_Path_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Ay) {
        if (scope.lastDrawType !== DRAW_TYPE_PATH) {
            forceSetStyle = true;
            scope.lastDrawType = DRAW_TYPE_PATH;
        }
        bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
        if (!canBatchPath || (!scope.batchFill && !scope.batchStroke)) {
            ctx.beginPath();
        }
        brushPath(ctx, el, style, canBatchPath, scope);
    }
    else {
        if (el instanceof _graphic_TSpan_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A) {
            if (scope.lastDrawType !== DRAW_TYPE_TEXT) {
                forceSetStyle = true;
                scope.lastDrawType = DRAW_TYPE_TEXT;
            }
            bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
            brushText(ctx, el, style);
        }
        else if (el instanceof _graphic_Image_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Ay) {
            if (scope.lastDrawType !== DRAW_TYPE_IMAGE) {
                forceSetStyle = true;
                scope.lastDrawType = DRAW_TYPE_IMAGE;
            }
            bindImageStyle(ctx, el, prevEl, forceSetStyle, scope);
            brushImage(ctx, el, style);
        }
        else if (el.getTemporalDisplayables) {
            if (scope.lastDrawType !== DRAW_TYPE_INCREMENTAL) {
                forceSetStyle = true;
                scope.lastDrawType = DRAW_TYPE_INCREMENTAL;
            }
            brushIncremental(ctx, el, scope);
        }
    }
    el.innerAfterBrush();
    if (el.afterBrush) {
        if (canBatchPath) {
            flushPathDrawn(ctx, scope);
        }
        el.afterBrush();
    }
    scope.prevEl = el;
    el.__dirty = 0;
    el.__isRendered = true;
}
function brushLoopFinalize(ctx, scope) {
    flushPathDrawn(ctx, scope);
    if (scope.prevElClipPaths) {
        ctx.restore();
    }
}
function brushIncremental(ctx, el, scope) {
    var displayables = el.getDisplayables();
    var temporalDisplayables = el.getTemporalDisplayables();
    ctx.save();
    var innerScope = {
        prevElClipPaths: null,
        prevEl: null,
        allClipped: false,
        viewWidth: scope.viewWidth,
        viewHeight: scope.viewHeight,
        inHover: scope.inHover,
        beforeBrushParam: {}
    };
    var i;
    var len;
    for (i = el.getCursor(), len = displayables.length; i < len; i++) {
        var displayable = displayables[i];
        displayable.beforeBrush && displayable.beforeBrush(scope.beforeBrushParam);
        displayable.innerBeforeBrush();
        brush(ctx, displayable, innerScope);
        displayable.innerAfterBrush();
        displayable.afterBrush && displayable.afterBrush();
        innerScope.prevEl = displayable;
    }
    brushLoopFinalize(ctx, innerScope);
    for (var i_1 = 0, len_1 = temporalDisplayables.length; i_1 < len_1; i_1++) {
        var displayable = temporalDisplayables[i_1];
        displayable.beforeBrush && displayable.beforeBrush(scope.beforeBrushParam);
        displayable.innerBeforeBrush();
        brush(ctx, displayable, innerScope);
        displayable.innerAfterBrush();
        displayable.afterBrush && displayable.afterBrush();
        innerScope.prevEl = displayable;
    }
    brushLoopFinalize(ctx, innerScope);
    el.clearTemporalDisplayables();
    el.notClear = true;
    ctx.restore();
}


/***/ }),

/***/ 42450:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y5: () => (/* binding */ devicePixelRatio),
/* harmony export */   _S: () => (/* binding */ DARK_LABEL_COLOR),
/* harmony export */   el: () => (/* binding */ LIGHT_LABEL_COLOR),
/* harmony export */   ps: () => (/* binding */ DARK_MODE_THRESHOLD),
/* harmony export */   tY: () => (/* binding */ LIGHTER_LABEL_COLOR)
/* harmony export */ });
/* unused harmony export debugMode */
/* harmony import */ var _core_env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23883);

var dpr = 1;
if (_core_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.hasGlobalWindow) {
    dpr = Math.max(window.devicePixelRatio
        || (window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI)
        || 1, 1);
}
var debugMode = 0;
var devicePixelRatio = dpr;
var DARK_MODE_THRESHOLD = 0.4;
var DARK_LABEL_COLOR = '#333';
var LIGHT_LABEL_COLOR = '#ccc';
var LIGHTER_LABEL_COLOR = '#eee';


/***/ }),

/***/ 43041:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   copy: () => (/* binding */ copy),
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   identity: () => (/* binding */ identity),
/* harmony export */   invert: () => (/* binding */ invert),
/* harmony export */   mul: () => (/* binding */ mul),
/* harmony export */   rotate: () => (/* binding */ rotate),
/* harmony export */   scale: () => (/* binding */ scale),
/* harmony export */   translate: () => (/* binding */ translate)
/* harmony export */ });
function create() {
    return [1, 0, 0, 1, 0, 0];
}
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
}
function copy(out, m) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];
    return out;
}
function mul(out, m1, m2) {
    var out0 = m1[0] * m2[0] + m1[2] * m2[1];
    var out1 = m1[1] * m2[0] + m1[3] * m2[1];
    var out2 = m1[0] * m2[2] + m1[2] * m2[3];
    var out3 = m1[1] * m2[2] + m1[3] * m2[3];
    var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = out3;
    out[4] = out4;
    out[5] = out5;
    return out;
}
function translate(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
}
function rotate(out, a, rad, pivot) {
    if (pivot === void 0) { pivot = [0, 0]; }
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var st = Math.sin(rad);
    var ct = Math.cos(rad);
    out[0] = aa * ct + ab * st;
    out[1] = -aa * st + ab * ct;
    out[2] = ac * ct + ad * st;
    out[3] = -ac * st + ct * ad;
    out[4] = ct * (atx - pivot[0]) + st * (aty - pivot[1]) + pivot[0];
    out[5] = ct * (aty - pivot[1]) - st * (atx - pivot[0]) + pivot[1];
    return out;
}
function scale(out, a, v) {
    var vx = v[0];
    var vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
}
function invert(out, a) {
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var det = aa * ad - ab * ac;
    if (!det) {
        return null;
    }
    det = 1.0 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
}
function clone(a) {
    var b = create();
    copy(b, a);
    return b;
}


/***/ }),

/***/ 44203:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Et: () => (/* binding */ cubicProjectPoint),
/* harmony export */   YT: () => (/* binding */ cubicSubdivide),
/* harmony export */   Yb: () => (/* binding */ cubicAt),
/* harmony export */   _E: () => (/* binding */ cubicRootAt),
/* harmony export */   d8: () => (/* binding */ quadraticLength),
/* harmony export */   gC: () => (/* binding */ quadraticExtremum),
/* harmony export */   h0: () => (/* binding */ cubicLength),
/* harmony export */   k3: () => (/* binding */ quadraticAt),
/* harmony export */   kh: () => (/* binding */ quadraticProjectPoint),
/* harmony export */   kx: () => (/* binding */ quadraticSubdivide),
/* harmony export */   lX: () => (/* binding */ cubicExtrema),
/* harmony export */   qY: () => (/* binding */ quadraticRootAt),
/* harmony export */   rD: () => (/* binding */ cubicDerivativeAt),
/* harmony export */   z7: () => (/* binding */ quadraticDerivativeAt)
/* harmony export */ });
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2103);

var mathPow = Math.pow;
var mathSqrt = Math.sqrt;
var EPSILON = 1e-8;
var EPSILON_NUMERIC = 1e-4;
var THREE_SQRT = mathSqrt(3);
var ONE_THIRD = 1 / 3;
var _v0 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.create)();
var _v1 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.create)();
var _v2 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.create)();
function isAroundZero(val) {
    return val > -EPSILON && val < EPSILON;
}
function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}
function cubicAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return onet * onet * (onet * p0 + 3 * t * p1)
        + t * t * (t * p3 + 3 * onet * p2);
}
function cubicDerivativeAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet
        + (p3 - p2) * t * t);
}
function cubicRootAt(p0, p1, p2, p3, val, roots) {
    var a = p3 + 3 * (p1 - p2) - p0;
    var b = 3 * (p2 - p1 * 2 + p0);
    var c = 3 * (p1 - p0);
    var d = p0 - val;
    var A = b * b - 3 * a * c;
    var B = b * c - 9 * a * d;
    var C = c * c - 3 * b * d;
    var n = 0;
    if (isAroundZero(A) && isAroundZero(B)) {
        if (isAroundZero(b)) {
            roots[0] = 0;
        }
        else {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = B * B - 4 * A * C;
        if (isAroundZero(disc)) {
            var K = B / A;
            var t1 = -b / a + K;
            var t2 = -K / 2;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt(disc);
            var Y1 = A * b + 1.5 * a * (-B + discSqrt);
            var Y2 = A * b + 1.5 * a * (-B - discSqrt);
            if (Y1 < 0) {
                Y1 = -mathPow(-Y1, ONE_THIRD);
            }
            else {
                Y1 = mathPow(Y1, ONE_THIRD);
            }
            if (Y2 < 0) {
                Y2 = -mathPow(-Y2, ONE_THIRD);
            }
            else {
                Y2 = mathPow(Y2, ONE_THIRD);
            }
            var t1 = (-b - (Y1 + Y2)) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else {
            var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt(A * A * A));
            var theta = Math.acos(T) / 3;
            var ASqrt = mathSqrt(A);
            var tmp = Math.cos(theta);
            var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
            var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
            var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
            if (t3 >= 0 && t3 <= 1) {
                roots[n++] = t3;
            }
        }
    }
    return n;
}
function cubicExtrema(p0, p1, p2, p3, extrema) {
    var b = 6 * p2 - 12 * p1 + 6 * p0;
    var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
    var c = 3 * p1 - 3 * p0;
    var n = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero(b)) {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            extrema[0] = -b / (2 * a);
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt(disc);
            var t1 = (-b + discSqrt) / (2 * a);
            var t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                extrema[n++] = t2;
            }
        }
    }
    return n;
}
function cubicSubdivide(p0, p1, p2, p3, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p23 = (p3 - p2) * t + p2;
    var p012 = (p12 - p01) * t + p01;
    var p123 = (p23 - p12) * t + p12;
    var p0123 = (p123 - p012) * t + p012;
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;
    out[3] = p0123;
    out[4] = p0123;
    out[5] = p123;
    out[6] = p23;
    out[7] = p3;
}
function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out) {
    var t;
    var interval = 0.005;
    var d = Infinity;
    var prev;
    var next;
    var d1;
    var d2;
    _v0[0] = x;
    _v0[1] = y;
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = cubicAt(x0, x1, x2, x3, _t);
        _v1[1] = cubicAt(y0, y1, y2, y3, _t);
        d1 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON_NUMERIC) {
            break;
        }
        prev = t - interval;
        next = t + interval;
        _v1[0] = cubicAt(x0, x1, x2, x3, prev);
        _v1[1] = cubicAt(y0, y1, y2, y3, prev);
        d1 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v1, _v0);
        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            _v2[0] = cubicAt(x0, x1, x2, x3, next);
            _v2[1] = cubicAt(y0, y1, y2, y3, next);
            d2 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v2, _v0);
            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    if (out) {
        out[0] = cubicAt(x0, x1, x2, x3, t);
        out[1] = cubicAt(y0, y1, y2, y3, t);
    }
    return mathSqrt(d);
}
function cubicLength(x0, y0, x1, y1, x2, y2, x3, y3, iteration) {
    var px = x0;
    var py = y0;
    var d = 0;
    var step = 1 / iteration;
    for (var i = 1; i <= iteration; i++) {
        var t = i * step;
        var x = cubicAt(x0, x1, x2, x3, t);
        var y = cubicAt(y0, y1, y2, y3, t);
        var dx = x - px;
        var dy = y - py;
        d += Math.sqrt(dx * dx + dy * dy);
        px = x;
        py = y;
    }
    return d;
}
function quadraticAt(p0, p1, p2, t) {
    var onet = 1 - t;
    return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
}
function quadraticDerivativeAt(p0, p1, p2, t) {
    return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}
function quadraticRootAt(p0, p1, p2, val, roots) {
    var a = p0 - 2 * p1 + p2;
    var b = 2 * (p1 - p0);
    var c = p0 - val;
    var n = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero(b)) {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            var t1 = -b / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt(disc);
            var t1 = (-b + discSqrt) / (2 * a);
            var t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
    }
    return n;
}
function quadraticExtremum(p0, p1, p2) {
    var divider = p0 + p2 - 2 * p1;
    if (divider === 0) {
        return 0.5;
    }
    else {
        return (p0 - p1) / divider;
    }
}
function quadraticSubdivide(p0, p1, p2, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p012 = (p12 - p01) * t + p01;
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;
    out[3] = p012;
    out[4] = p12;
    out[5] = p2;
}
function quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out) {
    var t;
    var interval = 0.005;
    var d = Infinity;
    _v0[0] = x;
    _v0[1] = y;
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = quadraticAt(x0, x1, x2, _t);
        _v1[1] = quadraticAt(y0, y1, y2, _t);
        var d1 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON_NUMERIC) {
            break;
        }
        var prev = t - interval;
        var next = t + interval;
        _v1[0] = quadraticAt(x0, x1, x2, prev);
        _v1[1] = quadraticAt(y0, y1, y2, prev);
        var d1 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v1, _v0);
        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            _v2[0] = quadraticAt(x0, x1, x2, next);
            _v2[1] = quadraticAt(y0, y1, y2, next);
            var d2 = (0,_vector_js__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v2, _v0);
            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    if (out) {
        out[0] = quadraticAt(x0, x1, x2, t);
        out[1] = quadraticAt(y0, y1, y2, t);
    }
    return mathSqrt(d);
}
function quadraticLength(x0, y0, x1, y1, x2, y2, iteration) {
    var px = x0;
    var py = y0;
    var d = 0;
    var step = 1 / iteration;
    for (var i = 1; i <= iteration; i++) {
        var t = i * step;
        var x = quadraticAt(x0, x1, x2, t);
        var y = quadraticAt(y0, y1, y2, t);
        var dx = x - px;
        var dy = y - py;
        d += Math.sqrt(dx * dx + dy * dy);
        px = x;
        py = y;
    }
    return d;
}


/***/ }),

/***/ 45857:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   q: () => (/* binding */ normalizeArcAngles)
/* harmony export */ });
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2103);
/* harmony import */ var _BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30582);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42450);
/* harmony import */ var _bbox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(89119);
/* harmony import */ var _curve_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44203);





var CMD = {
    M: 1,
    L: 2,
    C: 3,
    Q: 4,
    A: 5,
    Z: 6,
    R: 7
};
var tmpOutX = [];
var tmpOutY = [];
var min = [];
var max = [];
var min2 = [];
var max2 = [];
var mathMin = Math.min;
var mathMax = Math.max;
var mathCos = Math.cos;
var mathSin = Math.sin;
var mathAbs = Math.abs;
var PI = Math.PI;
var PI2 = PI * 2;
var hasTypedArray = typeof Float32Array !== 'undefined';
var tmpAngles = [];
function modPI2(radian) {
    var n = Math.round(radian / PI * 1e8) / 1e8;
    return (n % 2) * PI;
}
function normalizeArcAngles(angles, anticlockwise) {
    var newStartAngle = modPI2(angles[0]);
    if (newStartAngle < 0) {
        newStartAngle += PI2;
    }
    var delta = newStartAngle - angles[0];
    var newEndAngle = angles[1];
    newEndAngle += delta;
    if (!anticlockwise && newEndAngle - newStartAngle >= PI2) {
        newEndAngle = newStartAngle + PI2;
    }
    else if (anticlockwise && newStartAngle - newEndAngle >= PI2) {
        newEndAngle = newStartAngle - PI2;
    }
    else if (!anticlockwise && newStartAngle > newEndAngle) {
        newEndAngle = newStartAngle + (PI2 - modPI2(newStartAngle - newEndAngle));
    }
    else if (anticlockwise && newStartAngle < newEndAngle) {
        newEndAngle = newStartAngle - (PI2 - modPI2(newEndAngle - newStartAngle));
    }
    angles[0] = newStartAngle;
    angles[1] = newEndAngle;
}
var PathProxy = (function () {
    function PathProxy(notSaveData) {
        this.dpr = 1;
        this._xi = 0;
        this._yi = 0;
        this._x0 = 0;
        this._y0 = 0;
        this._len = 0;
        if (notSaveData) {
            this._saveData = false;
        }
        if (this._saveData) {
            this.data = [];
        }
    }
    PathProxy.prototype.increaseVersion = function () {
        this._version++;
    };
    PathProxy.prototype.getVersion = function () {
        return this._version;
    };
    PathProxy.prototype.setScale = function (sx, sy, segmentIgnoreThreshold) {
        segmentIgnoreThreshold = segmentIgnoreThreshold || 0;
        if (segmentIgnoreThreshold > 0) {
            this._ux = mathAbs(segmentIgnoreThreshold / _config_js__WEBPACK_IMPORTED_MODULE_0__/* .devicePixelRatio */ .Y5 / sx) || 0;
            this._uy = mathAbs(segmentIgnoreThreshold / _config_js__WEBPACK_IMPORTED_MODULE_0__/* .devicePixelRatio */ .Y5 / sy) || 0;
        }
    };
    PathProxy.prototype.setDPR = function (dpr) {
        this.dpr = dpr;
    };
    PathProxy.prototype.setContext = function (ctx) {
        this._ctx = ctx;
    };
    PathProxy.prototype.getContext = function () {
        return this._ctx;
    };
    PathProxy.prototype.beginPath = function () {
        this._ctx && this._ctx.beginPath();
        this.reset();
        return this;
    };
    PathProxy.prototype.reset = function () {
        if (this._saveData) {
            this._len = 0;
        }
        if (this._pathSegLen) {
            this._pathSegLen = null;
            this._pathLen = 0;
        }
        this._version++;
    };
    PathProxy.prototype.moveTo = function (x, y) {
        this._drawPendingPt();
        this.addData(CMD.M, x, y);
        this._ctx && this._ctx.moveTo(x, y);
        this._x0 = x;
        this._y0 = y;
        this._xi = x;
        this._yi = y;
        return this;
    };
    PathProxy.prototype.lineTo = function (x, y) {
        var dx = mathAbs(x - this._xi);
        var dy = mathAbs(y - this._yi);
        var exceedUnit = dx > this._ux || dy > this._uy;
        this.addData(CMD.L, x, y);
        if (this._ctx && exceedUnit) {
            this._ctx.lineTo(x, y);
        }
        if (exceedUnit) {
            this._xi = x;
            this._yi = y;
            this._pendingPtDist = 0;
        }
        else {
            var d2 = dx * dx + dy * dy;
            if (d2 > this._pendingPtDist) {
                this._pendingPtX = x;
                this._pendingPtY = y;
                this._pendingPtDist = d2;
            }
        }
        return this;
    };
    PathProxy.prototype.bezierCurveTo = function (x1, y1, x2, y2, x3, y3) {
        this._drawPendingPt();
        this.addData(CMD.C, x1, y1, x2, y2, x3, y3);
        if (this._ctx) {
            this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        }
        this._xi = x3;
        this._yi = y3;
        return this;
    };
    PathProxy.prototype.quadraticCurveTo = function (x1, y1, x2, y2) {
        this._drawPendingPt();
        this.addData(CMD.Q, x1, y1, x2, y2);
        if (this._ctx) {
            this._ctx.quadraticCurveTo(x1, y1, x2, y2);
        }
        this._xi = x2;
        this._yi = y2;
        return this;
    };
    PathProxy.prototype.arc = function (cx, cy, r, startAngle, endAngle, anticlockwise) {
        this._drawPendingPt();
        tmpAngles[0] = startAngle;
        tmpAngles[1] = endAngle;
        normalizeArcAngles(tmpAngles, anticlockwise);
        startAngle = tmpAngles[0];
        endAngle = tmpAngles[1];
        var delta = endAngle - startAngle;
        this.addData(CMD.A, cx, cy, r, r, startAngle, delta, 0, anticlockwise ? 0 : 1);
        this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
        this._xi = mathCos(endAngle) * r + cx;
        this._yi = mathSin(endAngle) * r + cy;
        return this;
    };
    PathProxy.prototype.arcTo = function (x1, y1, x2, y2, radius) {
        this._drawPendingPt();
        if (this._ctx) {
            this._ctx.arcTo(x1, y1, x2, y2, radius);
        }
        return this;
    };
    PathProxy.prototype.rect = function (x, y, w, h) {
        this._drawPendingPt();
        this._ctx && this._ctx.rect(x, y, w, h);
        this.addData(CMD.R, x, y, w, h);
        return this;
    };
    PathProxy.prototype.closePath = function () {
        this._drawPendingPt();
        this.addData(CMD.Z);
        var ctx = this._ctx;
        var x0 = this._x0;
        var y0 = this._y0;
        if (ctx) {
            ctx.closePath();
        }
        this._xi = x0;
        this._yi = y0;
        return this;
    };
    PathProxy.prototype.fill = function (ctx) {
        ctx && ctx.fill();
        this.toStatic();
    };
    PathProxy.prototype.stroke = function (ctx) {
        ctx && ctx.stroke();
        this.toStatic();
    };
    PathProxy.prototype.len = function () {
        return this._len;
    };
    PathProxy.prototype.setData = function (data) {
        if (!this._saveData) {
            return;
        }
        var len = data.length;
        if (!(this.data && this.data.length === len) && hasTypedArray) {
            this.data = new Float32Array(len);
        }
        for (var i = 0; i < len; i++) {
            this.data[i] = data[i];
        }
        this._len = len;
    };
    PathProxy.prototype.appendPath = function (path) {
        if (!this._saveData) {
            return;
        }
        if (!(path instanceof Array)) {
            path = [path];
        }
        var len = path.length;
        var appendSize = 0;
        var offset = this._len;
        for (var i = 0; i < len; i++) {
            appendSize += path[i].len();
        }
        var oldData = this.data;
        if (hasTypedArray && (oldData instanceof Float32Array || !oldData)) {
            this.data = new Float32Array(offset + appendSize);
            if (offset > 0 && oldData) {
                for (var k = 0; k < offset; k++) {
                    this.data[k] = oldData[k];
                }
            }
        }
        for (var i = 0; i < len; i++) {
            var appendPathData = path[i].data;
            for (var k = 0; k < appendPathData.length; k++) {
                this.data[offset++] = appendPathData[k];
            }
        }
        this._len = offset;
    };
    PathProxy.prototype.addData = function (cmd, a, b, c, d, e, f, g, h) {
        if (!this._saveData) {
            return;
        }
        var data = this.data;
        if (this._len + arguments.length > data.length) {
            this._expandData();
            data = this.data;
        }
        for (var i = 0; i < arguments.length; i++) {
            data[this._len++] = arguments[i];
        }
    };
    PathProxy.prototype._drawPendingPt = function () {
        if (this._pendingPtDist > 0) {
            this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY);
            this._pendingPtDist = 0;
        }
    };
    PathProxy.prototype._expandData = function () {
        if (!(this.data instanceof Array)) {
            var newData = [];
            for (var i = 0; i < this._len; i++) {
                newData[i] = this.data[i];
            }
            this.data = newData;
        }
    };
    PathProxy.prototype.toStatic = function () {
        if (!this._saveData) {
            return;
        }
        this._drawPendingPt();
        var data = this.data;
        if (data instanceof Array) {
            data.length = this._len;
            if (hasTypedArray && this._len > 11) {
                this.data = new Float32Array(data);
            }
        }
    };
    PathProxy.prototype.getBoundingRect = function () {
        min[0] = min[1] = min2[0] = min2[1] = Number.MAX_VALUE;
        max[0] = max[1] = max2[0] = max2[1] = -Number.MAX_VALUE;
        var data = this.data;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;
        var i;
        for (i = 0; i < this._len;) {
            var cmd = data[i++];
            var isFirst = i === 1;
            if (isFirst) {
                xi = data[i];
                yi = data[i + 1];
                x0 = xi;
                y0 = yi;
            }
            switch (cmd) {
                case CMD.M:
                    xi = x0 = data[i++];
                    yi = y0 = data[i++];
                    min2[0] = x0;
                    min2[1] = y0;
                    max2[0] = x0;
                    max2[1] = y0;
                    break;
                case CMD.L:
                    (0,_bbox_js__WEBPACK_IMPORTED_MODULE_1__/* .fromLine */ .j6)(xi, yi, data[i], data[i + 1], min2, max2);
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.C:
                    (0,_bbox_js__WEBPACK_IMPORTED_MODULE_1__/* .fromCubic */ .BM)(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], min2, max2);
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.Q:
                    (0,_bbox_js__WEBPACK_IMPORTED_MODULE_1__/* .fromQuadratic */ .tW)(xi, yi, data[i++], data[i++], data[i], data[i + 1], min2, max2);
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.A:
                    var cx = data[i++];
                    var cy = data[i++];
                    var rx = data[i++];
                    var ry = data[i++];
                    var startAngle = data[i++];
                    var endAngle = data[i++] + startAngle;
                    i += 1;
                    var anticlockwise = !data[i++];
                    if (isFirst) {
                        x0 = mathCos(startAngle) * rx + cx;
                        y0 = mathSin(startAngle) * ry + cy;
                    }
                    (0,_bbox_js__WEBPACK_IMPORTED_MODULE_1__/* .fromArc */ .$s)(cx, cy, rx, ry, startAngle, endAngle, anticlockwise, min2, max2);
                    xi = mathCos(endAngle) * rx + cx;
                    yi = mathSin(endAngle) * ry + cy;
                    break;
                case CMD.R:
                    x0 = xi = data[i++];
                    y0 = yi = data[i++];
                    var width = data[i++];
                    var height = data[i++];
                    (0,_bbox_js__WEBPACK_IMPORTED_MODULE_1__/* .fromLine */ .j6)(x0, y0, x0 + width, y0 + height, min2, max2);
                    break;
                case CMD.Z:
                    xi = x0;
                    yi = y0;
                    break;
            }
            _vector_js__WEBPACK_IMPORTED_MODULE_2__.min(min, min, min2);
            _vector_js__WEBPACK_IMPORTED_MODULE_2__.max(max, max, max2);
        }
        if (i === 0) {
            min[0] = min[1] = max[0] = max[1] = 0;
        }
        return new _BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    };
    PathProxy.prototype._calculateLength = function () {
        var data = this.data;
        var len = this._len;
        var ux = this._ux;
        var uy = this._uy;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;
        if (!this._pathSegLen) {
            this._pathSegLen = [];
        }
        var pathSegLen = this._pathSegLen;
        var pathTotalLen = 0;
        var segCount = 0;
        for (var i = 0; i < len;) {
            var cmd = data[i++];
            var isFirst = i === 1;
            if (isFirst) {
                xi = data[i];
                yi = data[i + 1];
                x0 = xi;
                y0 = yi;
            }
            var l = -1;
            switch (cmd) {
                case CMD.M:
                    xi = x0 = data[i++];
                    yi = y0 = data[i++];
                    break;
                case CMD.L: {
                    var x2 = data[i++];
                    var y2 = data[i++];
                    var dx = x2 - xi;
                    var dy = y2 - yi;
                    if (mathAbs(dx) > ux || mathAbs(dy) > uy || i === len - 1) {
                        l = Math.sqrt(dx * dx + dy * dy);
                        xi = x2;
                        yi = y2;
                    }
                    break;
                }
                case CMD.C: {
                    var x1 = data[i++];
                    var y1 = data[i++];
                    var x2 = data[i++];
                    var y2 = data[i++];
                    var x3 = data[i++];
                    var y3 = data[i++];
                    l = (0,_curve_js__WEBPACK_IMPORTED_MODULE_4__/* .cubicLength */ .h0)(xi, yi, x1, y1, x2, y2, x3, y3, 10);
                    xi = x3;
                    yi = y3;
                    break;
                }
                case CMD.Q: {
                    var x1 = data[i++];
                    var y1 = data[i++];
                    var x2 = data[i++];
                    var y2 = data[i++];
                    l = (0,_curve_js__WEBPACK_IMPORTED_MODULE_4__/* .quadraticLength */ .d8)(xi, yi, x1, y1, x2, y2, 10);
                    xi = x2;
                    yi = y2;
                    break;
                }
                case CMD.A:
                    var cx = data[i++];
                    var cy = data[i++];
                    var rx = data[i++];
                    var ry = data[i++];
                    var startAngle = data[i++];
                    var delta = data[i++];
                    var endAngle = delta + startAngle;
                    i += 1;
                    if (isFirst) {
                        x0 = mathCos(startAngle) * rx + cx;
                        y0 = mathSin(startAngle) * ry + cy;
                    }
                    l = mathMax(rx, ry) * mathMin(PI2, Math.abs(delta));
                    xi = mathCos(endAngle) * rx + cx;
                    yi = mathSin(endAngle) * ry + cy;
                    break;
                case CMD.R: {
                    x0 = xi = data[i++];
                    y0 = yi = data[i++];
                    var width = data[i++];
                    var height = data[i++];
                    l = width * 2 + height * 2;
                    break;
                }
                case CMD.Z: {
                    var dx = x0 - xi;
                    var dy = y0 - yi;
                    l = Math.sqrt(dx * dx + dy * dy);
                    xi = x0;
                    yi = y0;
                    break;
                }
            }
            if (l >= 0) {
                pathSegLen[segCount++] = l;
                pathTotalLen += l;
            }
        }
        this._pathLen = pathTotalLen;
        return pathTotalLen;
    };
    PathProxy.prototype.rebuildPath = function (ctx, percent) {
        var d = this.data;
        var ux = this._ux;
        var uy = this._uy;
        var len = this._len;
        var x0;
        var y0;
        var xi;
        var yi;
        var x;
        var y;
        var drawPart = percent < 1;
        var pathSegLen;
        var pathTotalLen;
        var accumLength = 0;
        var segCount = 0;
        var displayedLength;
        var pendingPtDist = 0;
        var pendingPtX;
        var pendingPtY;
        if (drawPart) {
            if (!this._pathSegLen) {
                this._calculateLength();
            }
            pathSegLen = this._pathSegLen;
            pathTotalLen = this._pathLen;
            displayedLength = percent * pathTotalLen;
            if (!displayedLength) {
                return;
            }
        }
        lo: for (var i = 0; i < len;) {
            var cmd = d[i++];
            var isFirst = i === 1;
            if (isFirst) {
                xi = d[i];
                yi = d[i + 1];
                x0 = xi;
                y0 = yi;
            }
            if (cmd !== CMD.L && pendingPtDist > 0) {
                ctx.lineTo(pendingPtX, pendingPtY);
                pendingPtDist = 0;
            }
            switch (cmd) {
                case CMD.M:
                    x0 = xi = d[i++];
                    y0 = yi = d[i++];
                    ctx.moveTo(xi, yi);
                    break;
                case CMD.L: {
                    x = d[i++];
                    y = d[i++];
                    var dx = mathAbs(x - xi);
                    var dy = mathAbs(y - yi);
                    if (dx > ux || dy > uy) {
                        if (drawPart) {
                            var l = pathSegLen[segCount++];
                            if (accumLength + l > displayedLength) {
                                var t = (displayedLength - accumLength) / l;
                                ctx.lineTo(xi * (1 - t) + x * t, yi * (1 - t) + y * t);
                                break lo;
                            }
                            accumLength += l;
                        }
                        ctx.lineTo(x, y);
                        xi = x;
                        yi = y;
                        pendingPtDist = 0;
                    }
                    else {
                        var d2 = dx * dx + dy * dy;
                        if (d2 > pendingPtDist) {
                            pendingPtX = x;
                            pendingPtY = y;
                            pendingPtDist = d2;
                        }
                    }
                    break;
                }
                case CMD.C: {
                    var x1 = d[i++];
                    var y1 = d[i++];
                    var x2 = d[i++];
                    var y2 = d[i++];
                    var x3 = d[i++];
                    var y3 = d[i++];
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var t = (displayedLength - accumLength) / l;
                            (0,_curve_js__WEBPACK_IMPORTED_MODULE_4__/* .cubicSubdivide */ .YT)(xi, x1, x2, x3, t, tmpOutX);
                            (0,_curve_js__WEBPACK_IMPORTED_MODULE_4__/* .cubicSubdivide */ .YT)(yi, y1, y2, y3, t, tmpOutY);
                            ctx.bezierCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2], tmpOutX[3], tmpOutY[3]);
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
                    xi = x3;
                    yi = y3;
                    break;
                }
                case CMD.Q: {
                    var x1 = d[i++];
                    var y1 = d[i++];
                    var x2 = d[i++];
                    var y2 = d[i++];
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var t = (displayedLength - accumLength) / l;
                            (0,_curve_js__WEBPACK_IMPORTED_MODULE_4__/* .quadraticSubdivide */ .kx)(xi, x1, x2, t, tmpOutX);
                            (0,_curve_js__WEBPACK_IMPORTED_MODULE_4__/* .quadraticSubdivide */ .kx)(yi, y1, y2, t, tmpOutY);
                            ctx.quadraticCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2]);
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.quadraticCurveTo(x1, y1, x2, y2);
                    xi = x2;
                    yi = y2;
                    break;
                }
                case CMD.A:
                    var cx = d[i++];
                    var cy = d[i++];
                    var rx = d[i++];
                    var ry = d[i++];
                    var startAngle = d[i++];
                    var delta = d[i++];
                    var psi = d[i++];
                    var anticlockwise = !d[i++];
                    var r = (rx > ry) ? rx : ry;
                    var isEllipse = mathAbs(rx - ry) > 1e-3;
                    var endAngle = startAngle + delta;
                    var breakBuild = false;
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            endAngle = startAngle + delta * (displayedLength - accumLength) / l;
                            breakBuild = true;
                        }
                        accumLength += l;
                    }
                    if (isEllipse && ctx.ellipse) {
                        ctx.ellipse(cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise);
                    }
                    else {
                        ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
                    }
                    if (breakBuild) {
                        break lo;
                    }
                    if (isFirst) {
                        x0 = mathCos(startAngle) * rx + cx;
                        y0 = mathSin(startAngle) * ry + cy;
                    }
                    xi = mathCos(endAngle) * rx + cx;
                    yi = mathSin(endAngle) * ry + cy;
                    break;
                case CMD.R:
                    x0 = xi = d[i];
                    y0 = yi = d[i + 1];
                    x = d[i++];
                    y = d[i++];
                    var width = d[i++];
                    var height = d[i++];
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var d_1 = displayedLength - accumLength;
                            ctx.moveTo(x, y);
                            ctx.lineTo(x + mathMin(d_1, width), y);
                            d_1 -= width;
                            if (d_1 > 0) {
                                ctx.lineTo(x + width, y + mathMin(d_1, height));
                            }
                            d_1 -= height;
                            if (d_1 > 0) {
                                ctx.lineTo(x + mathMax(width - d_1, 0), y + height);
                            }
                            d_1 -= width;
                            if (d_1 > 0) {
                                ctx.lineTo(x, y + mathMax(height - d_1, 0));
                            }
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.rect(x, y, width, height);
                    break;
                case CMD.Z:
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var t = (displayedLength - accumLength) / l;
                            ctx.lineTo(xi * (1 - t) + x0 * t, yi * (1 - t) + y0 * t);
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.closePath();
                    xi = x0;
                    yi = y0;
            }
        }
    };
    PathProxy.prototype.clone = function () {
        var newProxy = new PathProxy();
        var data = this.data;
        newProxy.data = data.slice ? data.slice()
            : Array.prototype.slice.call(data);
        newProxy._len = this._len;
        return newProxy;
    };
    PathProxy.prototype.canSave = function () {
        return !!this._saveData;
    };
    PathProxy.CMD = CMD;
    PathProxy.initDefaultProps = (function () {
        var proto = PathProxy.prototype;
        proto._saveData = true;
        proto._ux = 0;
        proto._uy = 0;
        proto._pendingPtDist = 0;
        proto._version = 0;
    })();
    return PathProxy;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PathProxy);


/***/ }),

/***/ 46422:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports DEFAULT_IMAGE_STYLE, DEFAULT_IMAGE_ANIMATION_PROPS */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42924);
/* harmony import */ var _Displayable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34685);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30582);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);




var DEFAULT_IMAGE_STYLE = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)({
    x: 0,
    y: 0
}, _Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_COMMON_STYLE */ .oN);
var DEFAULT_IMAGE_ANIMATION_PROPS = {
    style: (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)({
        x: true,
        y: true,
        width: true,
        height: true,
        sx: true,
        sy: true,
        sWidth: true,
        sHeight: true
    }, _Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_COMMON_ANIMATION_PROPS */ .sW.style)
};
function isImageLike(source) {
    return !!(source
        && typeof source !== 'string'
        && source.width && source.height);
}
var ZRImage = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__/* .__extends */ .C6)(ZRImage, _super);
    function ZRImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZRImage.prototype.createStyle = function (obj) {
        return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createObject)(DEFAULT_IMAGE_STYLE, obj);
    };
    ZRImage.prototype._getSize = function (dim) {
        var style = this.style;
        var size = style[dim];
        if (size != null) {
            return size;
        }
        var imageSource = isImageLike(style.image)
            ? style.image : this.__image;
        if (!imageSource) {
            return 0;
        }
        var otherDim = dim === 'width' ? 'height' : 'width';
        var otherDimSize = style[otherDim];
        if (otherDimSize == null) {
            return imageSource[dim];
        }
        else {
            return imageSource[dim] / imageSource[otherDim] * otherDimSize;
        }
    };
    ZRImage.prototype.getWidth = function () {
        return this._getSize('width');
    };
    ZRImage.prototype.getHeight = function () {
        return this._getSize('height');
    };
    ZRImage.prototype.getAnimationStyleProps = function () {
        return DEFAULT_IMAGE_ANIMATION_PROPS;
    };
    ZRImage.prototype.getBoundingRect = function () {
        var style = this.style;
        if (!this._rect) {
            this._rect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(style.x || 0, style.y || 0, this.getWidth(), this.getHeight());
        }
        return this._rect;
    };
    return ZRImage;
}(_Displayable_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay));
ZRImage.prototype.type = 'image';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ZRImage);


/***/ }),

/***/ 49475:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ windingLine)
/* harmony export */ });
function windingLine(x0, y0, x1, y1, x, y) {
    if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
        return 0;
    }
    if (y1 === y0) {
        return 0;
    }
    var t = (y - y0) / (y1 - y0);
    var dir = y1 < y0 ? 1 : -1;
    if (t === 1 || t === 0) {
        dir = y1 < y0 ? 0.5 : -0.5;
    }
    var x_ = t * (x1 - x0) + x0;
    return x_ === x ? Infinity : x_ > x ? dir : 0;
}


/***/ }),

/***/ 50613:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ buildTransformer)
/* harmony export */ });
var LN2 = Math.log(2);
function determinant(rows, rank, rowStart, rowMask, colMask, detCache) {
    var cacheKey = rowMask + '-' + colMask;
    var fullRank = rows.length;
    if (detCache.hasOwnProperty(cacheKey)) {
        return detCache[cacheKey];
    }
    if (rank === 1) {
        var colStart = Math.round(Math.log(((1 << fullRank) - 1) & ~colMask) / LN2);
        return rows[rowStart][colStart];
    }
    var subRowMask = rowMask | (1 << rowStart);
    var subRowStart = rowStart + 1;
    while (rowMask & (1 << subRowStart)) {
        subRowStart++;
    }
    var sum = 0;
    for (var j = 0, colLocalIdx = 0; j < fullRank; j++) {
        var colTag = 1 << j;
        if (!(colTag & colMask)) {
            sum += (colLocalIdx % 2 ? -1 : 1) * rows[rowStart][j]
                * determinant(rows, rank - 1, subRowStart, subRowMask, colMask | colTag, detCache);
            colLocalIdx++;
        }
    }
    detCache[cacheKey] = sum;
    return sum;
}
function buildTransformer(src, dest) {
    var mA = [
        [src[0], src[1], 1, 0, 0, 0, -dest[0] * src[0], -dest[0] * src[1]],
        [0, 0, 0, src[0], src[1], 1, -dest[1] * src[0], -dest[1] * src[1]],
        [src[2], src[3], 1, 0, 0, 0, -dest[2] * src[2], -dest[2] * src[3]],
        [0, 0, 0, src[2], src[3], 1, -dest[3] * src[2], -dest[3] * src[3]],
        [src[4], src[5], 1, 0, 0, 0, -dest[4] * src[4], -dest[4] * src[5]],
        [0, 0, 0, src[4], src[5], 1, -dest[5] * src[4], -dest[5] * src[5]],
        [src[6], src[7], 1, 0, 0, 0, -dest[6] * src[6], -dest[6] * src[7]],
        [0, 0, 0, src[6], src[7], 1, -dest[7] * src[6], -dest[7] * src[7]]
    ];
    var detCache = {};
    var det = determinant(mA, 8, 0, 0, 0, detCache);
    if (det === 0) {
        return;
    }
    var vh = [];
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            vh[j] == null && (vh[j] = 0);
            vh[j] += ((i + j) % 2 ? -1 : 1)
                * determinant(mA, 7, i === 0 ? 1 : 0, 1 << i, 1 << j, detCache)
                / det * dest[i];
        }
    }
    return function (out, srcPointX, srcPointY) {
        var pk = srcPointX * vh[6] + srcPointY * vh[7] + 1;
        out[0] = (srcPointX * vh[0] + srcPointY * vh[1] + vh[2]) / pk;
        out[1] = (srcPointX * vh[3] + srcPointY * vh[4] + vh[5]) / pk;
    };
}


/***/ }),

/***/ 51549:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ff: () => (/* binding */ getCanvasGradient),
/* harmony export */   KU: () => (/* binding */ isClipPathChanged),
/* harmony export */   YC: () => (/* binding */ getSize)
/* harmony export */ });
/* unused harmony exports createLinearGradient, createRadialGradient */
function isSafeNum(num) {
    return isFinite(num);
}
function createLinearGradient(ctx, obj, rect) {
    var x = obj.x == null ? 0 : obj.x;
    var x2 = obj.x2 == null ? 1 : obj.x2;
    var y = obj.y == null ? 0 : obj.y;
    var y2 = obj.y2 == null ? 0 : obj.y2;
    if (!obj.global) {
        x = x * rect.width + rect.x;
        x2 = x2 * rect.width + rect.x;
        y = y * rect.height + rect.y;
        y2 = y2 * rect.height + rect.y;
    }
    x = isSafeNum(x) ? x : 0;
    x2 = isSafeNum(x2) ? x2 : 1;
    y = isSafeNum(y) ? y : 0;
    y2 = isSafeNum(y2) ? y2 : 0;
    var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
    return canvasGradient;
}
function createRadialGradient(ctx, obj, rect) {
    var width = rect.width;
    var height = rect.height;
    var min = Math.min(width, height);
    var x = obj.x == null ? 0.5 : obj.x;
    var y = obj.y == null ? 0.5 : obj.y;
    var r = obj.r == null ? 0.5 : obj.r;
    if (!obj.global) {
        x = x * width + rect.x;
        y = y * height + rect.y;
        r = r * min;
    }
    x = isSafeNum(x) ? x : 0.5;
    y = isSafeNum(y) ? y : 0.5;
    r = r >= 0 && isSafeNum(r) ? r : 0.5;
    var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    return canvasGradient;
}
function getCanvasGradient(ctx, obj, rect) {
    var canvasGradient = obj.type === 'radial'
        ? createRadialGradient(ctx, obj, rect)
        : createLinearGradient(ctx, obj, rect);
    var colorStops = obj.colorStops;
    for (var i = 0; i < colorStops.length; i++) {
        canvasGradient.addColorStop(colorStops[i].offset, colorStops[i].color);
    }
    return canvasGradient;
}
function isClipPathChanged(clipPaths, prevClipPaths) {
    if (clipPaths === prevClipPaths || (!clipPaths && !prevClipPaths)) {
        return false;
    }
    if (!clipPaths || !prevClipPaths || (clipPaths.length !== prevClipPaths.length)) {
        return true;
    }
    for (var i = 0; i < clipPaths.length; i++) {
        if (clipPaths[i] !== prevClipPaths[i]) {
            return true;
        }
    }
    return false;
}
function parseInt10(val) {
    return parseInt(val, 10);
}
function getSize(root, whIdx, opts) {
    var wh = ['width', 'height'][whIdx];
    var cwh = ['clientWidth', 'clientHeight'][whIdx];
    var plt = ['paddingLeft', 'paddingTop'][whIdx];
    var prb = ['paddingRight', 'paddingBottom'][whIdx];
    if (opts[wh] != null && opts[wh] !== 'auto') {
        return parseFloat(opts[wh]);
    }
    var stl = document.defaultView.getComputedStyle(root);
    return ((root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh]))
        - (parseInt10(stl[plt]) || 0)
        - (parseInt10(stl[prb]) || 0)) || 0;
}


/***/ }),

/***/ 51769:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _core_curve_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44203);

function containStroke(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    if ((y > y0 + _l && y > y1 + _l && y > y2 + _l)
        || (y < y0 - _l && y < y1 - _l && y < y2 - _l)
        || (x > x0 + _l && x > x1 + _l && x > x2 + _l)
        || (x < x0 - _l && x < x1 - _l && x < x2 - _l)) {
        return false;
    }
    var d = (0,_core_curve_js__WEBPACK_IMPORTED_MODULE_0__/* .quadraticProjectPoint */ .kh)(x0, y0, x1, y1, x2, y2, x, y, null);
    return d <= _l / 2;
}


/***/ }),

/***/ 52812:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W5: () => (/* binding */ isMiddleOrRightButtonOnMouseUpDown),
/* harmony export */   Yo: () => (/* binding */ clientToLocal),
/* harmony export */   ds: () => (/* binding */ stop),
/* harmony export */   e0: () => (/* binding */ normalizeEvent),
/* harmony export */   f: () => (/* binding */ removeEventListener),
/* harmony export */   mK: () => (/* binding */ getNativeEvent),
/* harmony export */   q2: () => (/* binding */ addEventListener)
/* harmony export */ });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23883);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62940);



var MOUSE_EVENT_REG = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
var _calcOut = [];
var firefoxNotSupportOffsetXY = _env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.browser.firefox
    && +_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.browser.version.split('.')[0] < 39;
function clientToLocal(el, e, out, calculate) {
    out = out || {};
    if (calculate) {
        calculateZrXY(el, e, out);
    }
    else if (firefoxNotSupportOffsetXY
        && e.layerX != null
        && e.layerX !== e.offsetX) {
        out.zrX = e.layerX;
        out.zrY = e.layerY;
    }
    else if (e.offsetX != null) {
        out.zrX = e.offsetX;
        out.zrY = e.offsetY;
    }
    else {
        calculateZrXY(el, e, out);
    }
    return out;
}
function calculateZrXY(el, e, out) {
    if (_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.domSupported && el.getBoundingClientRect) {
        var ex = e.clientX;
        var ey = e.clientY;
        if ((0,_dom_js__WEBPACK_IMPORTED_MODULE_1__/* .isCanvasEl */ .ot)(el)) {
            var box = el.getBoundingClientRect();
            out.zrX = ex - box.left;
            out.zrY = ey - box.top;
            return;
        }
        else {
            if ((0,_dom_js__WEBPACK_IMPORTED_MODULE_1__/* .transformCoordWithViewport */ .oq)(_calcOut, el, ex, ey)) {
                out.zrX = _calcOut[0];
                out.zrY = _calcOut[1];
                return;
            }
        }
    }
    out.zrX = out.zrY = 0;
}
function getNativeEvent(e) {
    return e
        || window.event;
}
function normalizeEvent(el, e, calculate) {
    e = getNativeEvent(e);
    if (e.zrX != null) {
        return e;
    }
    var eventType = e.type;
    var isTouch = eventType && eventType.indexOf('touch') >= 0;
    if (!isTouch) {
        clientToLocal(el, e, e, calculate);
        var wheelDelta = getWheelDeltaMayPolyfill(e);
        e.zrDelta = wheelDelta ? wheelDelta / 120 : -(e.detail || 0) / 3;
    }
    else {
        var touch = eventType !== 'touchend'
            ? e.targetTouches[0]
            : e.changedTouches[0];
        touch && clientToLocal(el, touch, e, calculate);
    }
    var button = e.button;
    if (e.which == null && button !== undefined && MOUSE_EVENT_REG.test(e.type)) {
        e.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
    }
    return e;
}
function getWheelDeltaMayPolyfill(e) {
    var rawWheelDelta = e.wheelDelta;
    if (rawWheelDelta) {
        return rawWheelDelta;
    }
    var deltaX = e.deltaX;
    var deltaY = e.deltaY;
    if (deltaX == null || deltaY == null) {
        return rawWheelDelta;
    }
    var delta = deltaY !== 0 ? Math.abs(deltaY) : Math.abs(deltaX);
    var sign = deltaY > 0 ? -1
        : deltaY < 0 ? 1
            : deltaX > 0 ? -1
                : 1;
    return 3 * delta * sign;
}
function addEventListener(el, name, handler, opt) {
    el.addEventListener(name, handler, opt);
}
function removeEventListener(el, name, handler, opt) {
    el.removeEventListener(name, handler, opt);
}
var stop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
};
function isMiddleOrRightButtonOnMouseUpDown(e) {
    return e.which === 2 || e.which === 3;
}



/***/ }),

/***/ 52821:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _core_timsort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24298);
/* harmony import */ var _graphic_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22434);



var invalidZErrorLogged = false;
function logInvalidZError() {
    if (invalidZErrorLogged) {
        return;
    }
    invalidZErrorLogged = true;
    console.warn('z / z2 / zlevel of displayable is invalid, which may cause unexpected errors');
}
function shapeCompareFunc(a, b) {
    if (a.zlevel === b.zlevel) {
        if (a.z === b.z) {
            return a.z2 - b.z2;
        }
        return a.z - b.z;
    }
    return a.zlevel - b.zlevel;
}
var Storage = (function () {
    function Storage() {
        this._roots = [];
        this._displayList = [];
        this._displayListLen = 0;
        this.displayableSortFunc = shapeCompareFunc;
    }
    Storage.prototype.traverse = function (cb, context) {
        for (var i = 0; i < this._roots.length; i++) {
            this._roots[i].traverse(cb, context);
        }
    };
    Storage.prototype.getDisplayList = function (update, includeIgnore) {
        includeIgnore = includeIgnore || false;
        var displayList = this._displayList;
        if (update || !displayList.length) {
            this.updateDisplayList(includeIgnore);
        }
        return displayList;
    };
    Storage.prototype.updateDisplayList = function (includeIgnore) {
        this._displayListLen = 0;
        var roots = this._roots;
        var displayList = this._displayList;
        for (var i = 0, len = roots.length; i < len; i++) {
            this._updateAndAddDisplayable(roots[i], null, includeIgnore);
        }
        displayList.length = this._displayListLen;
        (0,_core_timsort_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(displayList, shapeCompareFunc);
    };
    Storage.prototype._updateAndAddDisplayable = function (el, parentClipPaths, includeIgnore) {
        if (el.ignore && !includeIgnore) {
            return;
        }
        el.beforeUpdate();
        el.update();
        el.afterUpdate();
        var userSetClipPath = el.getClipPath();
        var parentHasClipPaths = parentClipPaths && parentClipPaths.length;
        var clipPathIdx = 0;
        var thisClipPaths = el.__clipPaths;
        if (!el.ignoreClip
            && (parentHasClipPaths || userSetClipPath)) {
            if (!thisClipPaths) {
                thisClipPaths = el.__clipPaths = [];
            }
            if (parentHasClipPaths) {
                for (var idx = 0; idx < parentClipPaths.length; idx++) {
                    thisClipPaths[clipPathIdx++] = parentClipPaths[idx];
                }
            }
            var currentClipPath = userSetClipPath;
            var parentClipPath = el;
            while (currentClipPath) {
                currentClipPath.parent = parentClipPath;
                currentClipPath.updateTransform();
                thisClipPaths[clipPathIdx++] = currentClipPath;
                parentClipPath = currentClipPath;
                currentClipPath = currentClipPath.getClipPath();
            }
        }
        if (thisClipPaths) {
            thisClipPaths.length = clipPathIdx;
        }
        if (el.childrenRef) {
            var children = el.childrenRef();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (el.__dirty) {
                    child.__dirty |= _graphic_constants_js__WEBPACK_IMPORTED_MODULE_1__/* .REDRAW_BIT */ .M;
                }
                this._updateAndAddDisplayable(child, thisClipPaths, includeIgnore);
            }
            el.__dirty = 0;
        }
        else {
            var disp = el;
            if (isNaN(disp.z)) {
                logInvalidZError();
                disp.z = 0;
            }
            if (isNaN(disp.z2)) {
                logInvalidZError();
                disp.z2 = 0;
            }
            if (isNaN(disp.zlevel)) {
                logInvalidZError();
                disp.zlevel = 0;
            }
            this._displayList[this._displayListLen++] = disp;
        }
        var decalEl = el.getDecalElement && el.getDecalElement();
        if (decalEl) {
            this._updateAndAddDisplayable(decalEl, thisClipPaths, includeIgnore);
        }
        var textGuide = el.getTextGuideLine();
        if (textGuide) {
            this._updateAndAddDisplayable(textGuide, thisClipPaths, includeIgnore);
        }
        var textEl = el.getTextContent();
        if (textEl) {
            this._updateAndAddDisplayable(textEl, thisClipPaths, includeIgnore);
        }
    };
    Storage.prototype.addRoot = function (el) {
        if (el.__zr && el.__zr.storage === this) {
            return;
        }
        this._roots.push(el);
    };
    Storage.prototype.delRoot = function (el) {
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                this.delRoot(el[i]);
            }
            return;
        }
        var idx = _core_util_js__WEBPACK_IMPORTED_MODULE_2__.indexOf(this._roots, el);
        if (idx >= 0) {
            this._roots.splice(idx, 1);
        }
    };
    Storage.prototype.delAllRoots = function () {
        this._roots = [];
        this._displayList = [];
        this._displayListLen = 0;
        return;
    };
    Storage.prototype.getRoots = function () {
        return this._roots;
    };
    Storage.prototype.dispose = function () {
        this._displayList = null;
        this._roots = null;
    };
    return Storage;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);


/***/ }),

/***/ 53270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ getLineDash)
/* harmony export */ });
/* unused harmony export normalizeLineDash */
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);

function normalizeLineDash(lineType, lineWidth) {
    if (!lineType || lineType === 'solid' || !(lineWidth > 0)) {
        return null;
    }
    return lineType === 'dashed'
        ? [4 * lineWidth, 2 * lineWidth]
        : lineType === 'dotted'
            ? [lineWidth]
            : (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(lineType)
                ? [lineType] : (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(lineType) ? lineType : null;
}
function getLineDash(el) {
    var style = el.style;
    var lineDash = style.lineDash && style.lineWidth > 0 && normalizeLineDash(style.lineDash, style.lineWidth);
    var lineDashOffset = style.lineDashOffset;
    if (lineDash) {
        var lineScale_1 = (style.strokeNoScale && el.getLineScale) ? el.getLineScale() : 1;
        if (lineScale_1 && lineScale_1 !== 1) {
            lineDash = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)(lineDash, function (rawVal) {
                return rawVal / lineScale_1;
            });
            lineDashOffset /= lineScale_1;
        }
    }
    return [lineDash, lineDashOffset];
}


/***/ }),

/***/ 60530:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JK: () => (/* binding */ measureCharWidth),
/* harmony export */   NO: () => (/* binding */ getBoundingRect),
/* harmony export */   Qw: () => (/* binding */ ensureFontMeasureInfo),
/* harmony export */   X4: () => (/* binding */ calculateTextPosition),
/* harmony export */   ks: () => (/* binding */ getLineHeight),
/* harmony export */   l8: () => (/* binding */ measureWidth),
/* harmony export */   ll: () => (/* binding */ adjustTextX),
/* harmony export */   lo: () => (/* binding */ parsePercent),
/* harmony export */   sZ: () => (/* binding */ adjustTextY)
/* harmony export */ });
/* unused harmony exports getWidth, innerGetBoundingRect, measureText */
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30582);
/* harmony import */ var _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39729);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84143);



function getWidth(text, font) {
    return measureWidth(ensureFontMeasureInfo(font), text);
}
function ensureFontMeasureInfo(font) {
    if (!_fontMeasureInfoCache) {
        _fontMeasureInfoCache = new _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay(100);
    }
    font = font || _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_FONT */ .OH;
    var measureInfo = _fontMeasureInfoCache.get(font);
    if (!measureInfo) {
        measureInfo = {
            font: font,
            strWidthCache: new _core_LRU_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay(500),
            asciiWidthMap: null,
            asciiWidthMapTried: false,
            stWideCharWidth: _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .platformApi */ .yh.measureText('国', font).width,
            asciiCharWidth: _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .platformApi */ .yh.measureText('a', font).width
        };
        _fontMeasureInfoCache.put(font, measureInfo);
    }
    return measureInfo;
}
var _fontMeasureInfoCache;
function tryCreateASCIIWidthMap(font) {
    if (_getASCIIWidthMapLongCount >= GET_ASCII_WIDTH_LONG_COUNT_MAX) {
        return;
    }
    font = font || _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_FONT */ .OH;
    var asciiWidthMap = [];
    var start = +(new Date());
    for (var code = 0; code <= 127; code++) {
        asciiWidthMap[code] = _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .platformApi */ .yh.measureText(String.fromCharCode(code), font).width;
    }
    var cost = +(new Date()) - start;
    if (cost > 16) {
        _getASCIIWidthMapLongCount = GET_ASCII_WIDTH_LONG_COUNT_MAX;
    }
    else if (cost > 2) {
        _getASCIIWidthMapLongCount++;
    }
    return asciiWidthMap;
}
var _getASCIIWidthMapLongCount = 0;
var GET_ASCII_WIDTH_LONG_COUNT_MAX = 5;
function measureCharWidth(fontMeasureInfo, charCode) {
    if (!fontMeasureInfo.asciiWidthMapTried) {
        fontMeasureInfo.asciiWidthMap = tryCreateASCIIWidthMap(fontMeasureInfo.font);
        fontMeasureInfo.asciiWidthMapTried = true;
    }
    return (0 <= charCode && charCode <= 127)
        ? (fontMeasureInfo.asciiWidthMap != null
            ? fontMeasureInfo.asciiWidthMap[charCode]
            : fontMeasureInfo.asciiCharWidth)
        : fontMeasureInfo.stWideCharWidth;
}
function measureWidth(fontMeasureInfo, text) {
    var strWidthCache = fontMeasureInfo.strWidthCache;
    var width = strWidthCache.get(text);
    if (width == null) {
        width = _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .platformApi */ .yh.measureText(text, fontMeasureInfo.font).width;
        strWidthCache.put(text, width);
    }
    return width;
}
function innerGetBoundingRect(text, font, textAlign, textBaseline) {
    var width = measureWidth(ensureFontMeasureInfo(font), text);
    var height = getLineHeight(font);
    var x = adjustTextX(0, width, textAlign);
    var y = adjustTextY(0, height, textBaseline);
    var rect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(x, y, width, height);
    return rect;
}
function getBoundingRect(text, font, textAlign, textBaseline) {
    var textLines = ((text || '') + '').split('\n');
    var len = textLines.length;
    if (len === 1) {
        return innerGetBoundingRect(textLines[0], font, textAlign, textBaseline);
    }
    else {
        var uniondRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0);
        for (var i = 0; i < textLines.length; i++) {
            var rect = innerGetBoundingRect(textLines[i], font, textAlign, textBaseline);
            i === 0 ? uniondRect.copy(rect) : uniondRect.union(rect);
        }
        return uniondRect;
    }
}
function adjustTextX(x, width, textAlign, inverse) {
    if (textAlign === 'right') {
        !inverse ? (x -= width) : (x += width);
    }
    else if (textAlign === 'center') {
        !inverse ? (x -= width / 2) : (x += width / 2);
    }
    return x;
}
function adjustTextY(y, height, verticalAlign, inverse) {
    if (verticalAlign === 'middle') {
        !inverse ? (y -= height / 2) : (y += height / 2);
    }
    else if (verticalAlign === 'bottom') {
        !inverse ? (y -= height) : (y += height);
    }
    return y;
}
function getLineHeight(font) {
    return ensureFontMeasureInfo(font).stWideCharWidth;
}
function measureText(text, font) {
    return platformApi.measureText(text, font);
}
function parsePercent(value, maxValue) {
    if (typeof value === 'string') {
        if (value.lastIndexOf('%') >= 0) {
            return parseFloat(value) / 100 * maxValue;
        }
        return parseFloat(value);
    }
    return value;
}
function calculateTextPosition(out, opts, rect) {
    var textPosition = opts.position || 'inside';
    var distance = opts.distance != null ? opts.distance : 5;
    var height = rect.height;
    var width = rect.width;
    var halfHeight = height / 2;
    var x = rect.x;
    var y = rect.y;
    var textAlign = 'left';
    var textVerticalAlign = 'top';
    if (textPosition instanceof Array) {
        x += parsePercent(textPosition[0], rect.width);
        y += parsePercent(textPosition[1], rect.height);
        textAlign = null;
        textVerticalAlign = null;
    }
    else {
        switch (textPosition) {
            case 'left':
                x -= distance;
                y += halfHeight;
                textAlign = 'right';
                textVerticalAlign = 'middle';
                break;
            case 'right':
                x += distance + width;
                y += halfHeight;
                textVerticalAlign = 'middle';
                break;
            case 'top':
                x += width / 2;
                y -= distance;
                textAlign = 'center';
                textVerticalAlign = 'bottom';
                break;
            case 'bottom':
                x += width / 2;
                y += height + distance;
                textAlign = 'center';
                break;
            case 'inside':
                x += width / 2;
                y += halfHeight;
                textAlign = 'center';
                textVerticalAlign = 'middle';
                break;
            case 'insideLeft':
                x += distance;
                y += halfHeight;
                textVerticalAlign = 'middle';
                break;
            case 'insideRight':
                x += width - distance;
                y += halfHeight;
                textAlign = 'right';
                textVerticalAlign = 'middle';
                break;
            case 'insideTop':
                x += width / 2;
                y += distance;
                textAlign = 'center';
                break;
            case 'insideBottom':
                x += width / 2;
                y += height - distance;
                textAlign = 'center';
                textVerticalAlign = 'bottom';
                break;
            case 'insideTopLeft':
                x += distance;
                y += distance;
                break;
            case 'insideTopRight':
                x += width - distance;
                y += distance;
                textAlign = 'right';
                break;
            case 'insideBottomLeft':
                x += distance;
                y += height - distance;
                textVerticalAlign = 'bottom';
                break;
            case 'insideBottomRight':
                x += width - distance;
                y += height - distance;
                textAlign = 'right';
                textVerticalAlign = 'bottom';
                break;
        }
    }
    out = out || {};
    out.x = x;
    out.y = y;
    out.align = textAlign;
    out.verticalAlign = textVerticalAlign;
    return out;
}


/***/ }),

/***/ 62940:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Me: () => (/* binding */ encodeHTML),
/* harmony export */   Yn: () => (/* binding */ transformLocalCoordClear),
/* harmony export */   lJ: () => (/* binding */ transformLocalCoord),
/* harmony export */   oq: () => (/* binding */ transformCoordWithViewport),
/* harmony export */   ot: () => (/* binding */ isCanvasEl)
/* harmony export */ });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23883);
/* harmony import */ var _fourPointsTransform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50613);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);



var EVENT_SAVED_PROP = '___zrEVENTSAVED';
var _calcOut = [];
function transformLocalCoord(out, elFrom, elTarget, inX, inY) {
    return transformCoordWithViewport(_calcOut, elFrom, inX, inY, true)
        && transformCoordWithViewport(out, elTarget, _calcOut[0], _calcOut[1]);
}
function transformLocalCoordClear(elFrom, elTarget) {
    elFrom && dealClear(elFrom);
    elTarget && dealClear(elTarget);
    function dealClear(el) {
        var saved = el[EVENT_SAVED_PROP];
        if (saved) {
            saved.clearMarkers && saved.clearMarkers();
            delete el[EVENT_SAVED_PROP];
        }
    }
}
function transformCoordWithViewport(out, el, inX, inY, inverse) {
    if (el.getBoundingClientRect && _env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.domSupported && !isCanvasEl(el)) {
        var saved = el[EVENT_SAVED_PROP] || (el[EVENT_SAVED_PROP] = {});
        var markers = prepareCoordMarkers(el, saved);
        var transformer = preparePointerTransformer(markers, saved, inverse);
        if (transformer) {
            transformer(out, inX, inY);
            return true;
        }
    }
    return false;
}
function prepareCoordMarkers(el, saved) {
    var markers = saved.markers;
    if (markers) {
        return markers;
    }
    markers = saved.markers = [];
    var propLR = ['left', 'right'];
    var propTB = ['top', 'bottom'];
    for (var i = 0; i < 4; i++) {
        var marker = document.createElement('div');
        var stl = marker.style;
        var idxLR = i % 2;
        var idxTB = (i >> 1) % 2;
        stl.cssText = [
            'position: absolute',
            'visibility: hidden',
            'padding: 0',
            'margin: 0',
            'border-width: 0',
            'user-select: none',
            'width:0',
            'height:0',
            propLR[idxLR] + ':0',
            propTB[idxTB] + ':0',
            propLR[1 - idxLR] + ':auto',
            propTB[1 - idxTB] + ':auto',
            ''
        ].join('!important;');
        el.appendChild(marker);
        markers.push(marker);
    }
    saved.clearMarkers = function () {
        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(markers, function (marker) {
            marker.parentNode && marker.parentNode.removeChild(marker);
        });
    };
    return markers;
}
function preparePointerTransformer(markers, saved, inverse) {
    var transformerName = inverse ? 'invTrans' : 'trans';
    var transformer = saved[transformerName];
    var oldSrcCoords = saved.srcCoords;
    var srcCoords = [];
    var destCoords = [];
    var oldCoordTheSame = true;
    for (var i = 0; i < 4; i++) {
        var rect = markers[i].getBoundingClientRect();
        var ii = 2 * i;
        var x = rect.left;
        var y = rect.top;
        srcCoords.push(x, y);
        oldCoordTheSame = oldCoordTheSame && oldSrcCoords && x === oldSrcCoords[ii] && y === oldSrcCoords[ii + 1];
        destCoords.push(markers[i].offsetLeft, markers[i].offsetTop);
    }
    return (oldCoordTheSame && transformer)
        ? transformer
        : (saved.srcCoords = srcCoords,
            saved[transformerName] = inverse
                ? (0,_fourPointsTransform_js__WEBPACK_IMPORTED_MODULE_2__/* .buildTransformer */ .I)(destCoords, srcCoords)
                : (0,_fourPointsTransform_js__WEBPACK_IMPORTED_MODULE_2__/* .buildTransformer */ .I)(srcCoords, destCoords));
}
function isCanvasEl(el) {
    return el.nodeName.toUpperCase() === 'CANVAS';
}
var replaceReg = /([&<>"'])/g;
var replaceMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};
function encodeHTML(source) {
    return source == null
        ? ''
        : (source + '').replace(replaceReg, function (str, c) {
            return replaceMap[c];
        });
}


/***/ }),

/***/ 66398:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EJ: () => (/* binding */ truncateText),
/* harmony export */   FQ: () => (/* binding */ parseRichText),
/* harmony export */   Ss: () => (/* binding */ calcInnerTextOverflowArea),
/* harmony export */   Xf: () => (/* binding */ tSpanCreateBoundingRect),
/* harmony export */   j_: () => (/* binding */ parsePlainText),
/* harmony export */   n7: () => (/* binding */ tSpanHasStroke),
/* harmony export */   xu: () => (/* binding */ tSpanCreateBoundingRect2)
/* harmony export */ });
/* unused harmony export RichTextContentBlock */
/* harmony import */ var _helper_image_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15175);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _contain_text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60530);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30582);




var STYLE_REG = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function truncateText(text, containerWidth, font, ellipsis, options) {
    var out = {};
    truncateText2(out, text, containerWidth, font, ellipsis, options);
    return out.text;
}
function truncateText2(out, text, containerWidth, font, ellipsis, options) {
    if (!containerWidth) {
        out.text = '';
        out.isTruncated = false;
        return;
    }
    var textLines = (text + '').split('\n');
    options = prepareTruncateOptions(containerWidth, font, ellipsis, options);
    var isTruncated = false;
    var truncateOut = {};
    for (var i = 0, len = textLines.length; i < len; i++) {
        truncateSingleLine(truncateOut, textLines[i], options);
        textLines[i] = truncateOut.textLine;
        isTruncated = isTruncated || truncateOut.isTruncated;
    }
    out.text = textLines.join('\n');
    out.isTruncated = isTruncated;
}
function prepareTruncateOptions(containerWidth, font, ellipsis, options) {
    options = options || {};
    var preparedOpts = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({}, options);
    ellipsis = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(ellipsis, '...');
    preparedOpts.maxIterations = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(options.maxIterations, 2);
    var minChar = preparedOpts.minChar = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(options.minChar, 0);
    var fontMeasureInfo = preparedOpts.fontMeasureInfo = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font);
    var ascCharWidth = fontMeasureInfo.asciiCharWidth;
    preparedOpts.placeholder = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(options.placeholder, '');
    var contentWidth = containerWidth = Math.max(0, containerWidth - 1);
    for (var i = 0; i < minChar && contentWidth >= ascCharWidth; i++) {
        contentWidth -= ascCharWidth;
    }
    var ellipsisWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)(fontMeasureInfo, ellipsis);
    if (ellipsisWidth > contentWidth) {
        ellipsis = '';
        ellipsisWidth = 0;
    }
    contentWidth = containerWidth - ellipsisWidth;
    preparedOpts.ellipsis = ellipsis;
    preparedOpts.ellipsisWidth = ellipsisWidth;
    preparedOpts.contentWidth = contentWidth;
    preparedOpts.containerWidth = containerWidth;
    return preparedOpts;
}
function truncateSingleLine(out, textLine, options) {
    var containerWidth = options.containerWidth;
    var contentWidth = options.contentWidth;
    var fontMeasureInfo = options.fontMeasureInfo;
    if (!containerWidth) {
        out.textLine = '';
        out.isTruncated = false;
        return;
    }
    var lineWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)(fontMeasureInfo, textLine);
    if (lineWidth <= containerWidth) {
        out.textLine = textLine;
        out.isTruncated = false;
        return;
    }
    for (var j = 0;; j++) {
        if (lineWidth <= contentWidth || j >= options.maxIterations) {
            textLine += options.ellipsis;
            break;
        }
        var subLength = j === 0
            ? estimateLength(textLine, contentWidth, fontMeasureInfo)
            : lineWidth > 0
                ? Math.floor(textLine.length * contentWidth / lineWidth)
                : 0;
        textLine = textLine.substr(0, subLength);
        lineWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)(fontMeasureInfo, textLine);
    }
    if (textLine === '') {
        textLine = options.placeholder;
    }
    out.textLine = textLine;
    out.isTruncated = true;
}
function estimateLength(text, contentWidth, fontMeasureInfo) {
    var width = 0;
    var i = 0;
    for (var len = text.length; i < len && width < contentWidth; i++) {
        width += (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureCharWidth */ .JK)(fontMeasureInfo, text.charCodeAt(i));
    }
    return i;
}
function parsePlainText(rawText, style, defaultOuterWidth, defaultOuterHeight) {
    var text = formatText(rawText);
    var overflow = style.overflow;
    var padding = style.padding;
    var paddingH = padding ? padding[1] + padding[3] : 0;
    var paddingV = padding ? padding[0] + padding[2] : 0;
    var font = style.font;
    var truncate = overflow === 'truncate';
    var calculatedLineHeight = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .getLineHeight */ .ks)(font);
    var lineHeight = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(style.lineHeight, calculatedLineHeight);
    var truncateLineOverflow = style.lineOverflow === 'truncate';
    var isTruncated = false;
    var width = style.width;
    if (width == null && defaultOuterWidth != null) {
        width = defaultOuterWidth - paddingH;
    }
    var height = style.height;
    if (height == null && defaultOuterHeight != null) {
        height = defaultOuterHeight - paddingV;
    }
    var lines;
    if (width != null && (overflow === 'break' || overflow === 'breakAll')) {
        lines = text ? wrapText(text, style.font, width, overflow === 'breakAll', 0).lines : [];
    }
    else {
        lines = text ? text.split('\n') : [];
    }
    var contentHeight = lines.length * lineHeight;
    if (height == null) {
        height = contentHeight;
    }
    if (contentHeight > height && truncateLineOverflow) {
        var lineCount = Math.floor(height / lineHeight);
        isTruncated = isTruncated || (lines.length > lineCount);
        lines = lines.slice(0, lineCount);
        contentHeight = lines.length * lineHeight;
    }
    if (text && truncate && width != null) {
        var options = prepareTruncateOptions(width, font, style.ellipsis, {
            minChar: style.truncateMinChar,
            placeholder: style.placeholder
        });
        var singleOut = {};
        for (var i = 0; i < lines.length; i++) {
            truncateSingleLine(singleOut, lines[i], options);
            lines[i] = singleOut.textLine;
            isTruncated = isTruncated || singleOut.isTruncated;
        }
    }
    var outerHeight = height;
    var contentWidth = 0;
    var fontMeasureInfo = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font);
    for (var i = 0; i < lines.length; i++) {
        contentWidth = Math.max((0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)(fontMeasureInfo, lines[i]), contentWidth);
    }
    if (width == null) {
        width = contentWidth;
    }
    var outerWidth = width;
    outerHeight += paddingV;
    outerWidth += paddingH;
    return {
        lines: lines,
        height: height,
        outerWidth: outerWidth,
        outerHeight: outerHeight,
        lineHeight: lineHeight,
        calculatedLineHeight: calculatedLineHeight,
        contentWidth: contentWidth,
        contentHeight: contentHeight,
        width: width,
        isTruncated: isTruncated
    };
}
var RichTextToken = (function () {
    function RichTextToken() {
    }
    return RichTextToken;
}());
var RichTextLine = (function () {
    function RichTextLine(tokens) {
        this.tokens = [];
        if (tokens) {
            this.tokens = tokens;
        }
    }
    return RichTextLine;
}());
var RichTextContentBlock = (function () {
    function RichTextContentBlock() {
        this.width = 0;
        this.height = 0;
        this.contentWidth = 0;
        this.contentHeight = 0;
        this.outerWidth = 0;
        this.outerHeight = 0;
        this.lines = [];
        this.isTruncated = false;
    }
    return RichTextContentBlock;
}());

function parseRichText(rawText, style, defaultOuterWidth, defaultOuterHeight, topTextAlign) {
    var contentBlock = new RichTextContentBlock();
    var text = formatText(rawText);
    if (!text) {
        return contentBlock;
    }
    var stlPadding = style.padding;
    var stlPaddingH = stlPadding ? stlPadding[1] + stlPadding[3] : 0;
    var stlPaddingV = stlPadding ? stlPadding[0] + stlPadding[2] : 0;
    var topWidth = style.width;
    if (topWidth == null && defaultOuterWidth != null) {
        topWidth = defaultOuterWidth - stlPaddingH;
    }
    var topHeight = style.height;
    if (topHeight == null && defaultOuterHeight != null) {
        topHeight = defaultOuterHeight - stlPaddingV;
    }
    var overflow = style.overflow;
    var wrapInfo = (overflow === 'break' || overflow === 'breakAll') && topWidth != null
        ? { width: topWidth, accumWidth: 0, breakAll: overflow === 'breakAll' }
        : null;
    var lastIndex = STYLE_REG.lastIndex = 0;
    var result;
    while ((result = STYLE_REG.exec(text)) != null) {
        var matchedIndex = result.index;
        if (matchedIndex > lastIndex) {
            pushTokens(contentBlock, text.substring(lastIndex, matchedIndex), style, wrapInfo);
        }
        pushTokens(contentBlock, result[2], style, wrapInfo, result[1]);
        lastIndex = STYLE_REG.lastIndex;
    }
    if (lastIndex < text.length) {
        pushTokens(contentBlock, text.substring(lastIndex, text.length), style, wrapInfo);
    }
    var pendingList = [];
    var calculatedHeight = 0;
    var calculatedWidth = 0;
    var truncate = overflow === 'truncate';
    var truncateLine = style.lineOverflow === 'truncate';
    var tmpTruncateOut = {};
    function finishLine(line, lineWidth, lineHeight) {
        line.width = lineWidth;
        line.lineHeight = lineHeight;
        calculatedHeight += lineHeight;
        calculatedWidth = Math.max(calculatedWidth, lineWidth);
    }
    outer: for (var i = 0; i < contentBlock.lines.length; i++) {
        var line = contentBlock.lines[i];
        var lineHeight = 0;
        var lineWidth = 0;
        for (var j = 0; j < line.tokens.length; j++) {
            var token = line.tokens[j];
            var tokenStyle = token.styleName && style.rich[token.styleName] || {};
            var textPadding = token.textPadding = tokenStyle.padding;
            var paddingH = textPadding ? textPadding[1] + textPadding[3] : 0;
            var font = token.font = tokenStyle.font || style.font;
            token.contentHeight = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .getLineHeight */ .ks)(font);
            var tokenHeight = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(tokenStyle.height, token.contentHeight);
            token.innerHeight = tokenHeight;
            textPadding && (tokenHeight += textPadding[0] + textPadding[2]);
            token.height = tokenHeight;
            token.lineHeight = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve3)(tokenStyle.lineHeight, style.lineHeight, tokenHeight);
            token.align = tokenStyle && tokenStyle.align || topTextAlign;
            token.verticalAlign = tokenStyle && tokenStyle.verticalAlign || 'middle';
            if (truncateLine && topHeight != null && calculatedHeight + token.lineHeight > topHeight) {
                var originalLength = contentBlock.lines.length;
                if (j > 0) {
                    line.tokens = line.tokens.slice(0, j);
                    finishLine(line, lineWidth, lineHeight);
                    contentBlock.lines = contentBlock.lines.slice(0, i + 1);
                }
                else {
                    contentBlock.lines = contentBlock.lines.slice(0, i);
                }
                contentBlock.isTruncated = contentBlock.isTruncated || (contentBlock.lines.length < originalLength);
                break outer;
            }
            var styleTokenWidth = tokenStyle.width;
            var tokenWidthNotSpecified = styleTokenWidth == null || styleTokenWidth === 'auto';
            if (typeof styleTokenWidth === 'string' && styleTokenWidth.charAt(styleTokenWidth.length - 1) === '%') {
                token.percentWidth = styleTokenWidth;
                pendingList.push(token);
                token.contentWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)((0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font), token.text);
            }
            else {
                if (tokenWidthNotSpecified) {
                    var textBackgroundColor = tokenStyle.backgroundColor;
                    var bgImg = textBackgroundColor && textBackgroundColor.image;
                    if (bgImg) {
                        bgImg = _helper_image_js__WEBPACK_IMPORTED_MODULE_2__/* .findExistImage */ .SR(bgImg);
                        if (_helper_image_js__WEBPACK_IMPORTED_MODULE_2__/* .isImageReady */ .xA(bgImg)) {
                            token.width = Math.max(token.width, bgImg.width * tokenHeight / bgImg.height);
                        }
                    }
                }
                var remainTruncWidth = truncate && topWidth != null
                    ? topWidth - lineWidth : null;
                if (remainTruncWidth != null && remainTruncWidth < token.width) {
                    if (!tokenWidthNotSpecified || remainTruncWidth < paddingH) {
                        token.text = '';
                        token.width = token.contentWidth = 0;
                    }
                    else {
                        truncateText2(tmpTruncateOut, token.text, remainTruncWidth - paddingH, font, style.ellipsis, { minChar: style.truncateMinChar });
                        token.text = tmpTruncateOut.text;
                        contentBlock.isTruncated = contentBlock.isTruncated || tmpTruncateOut.isTruncated;
                        token.width = token.contentWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)((0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font), token.text);
                    }
                }
                else {
                    token.contentWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)((0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font), token.text);
                }
            }
            token.width += paddingH;
            lineWidth += token.width;
            tokenStyle && (lineHeight = Math.max(lineHeight, token.lineHeight));
        }
        finishLine(line, lineWidth, lineHeight);
    }
    contentBlock.outerWidth = contentBlock.width = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(topWidth, calculatedWidth);
    contentBlock.outerHeight = contentBlock.height = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve2)(topHeight, calculatedHeight);
    contentBlock.contentHeight = calculatedHeight;
    contentBlock.contentWidth = calculatedWidth;
    contentBlock.outerWidth += stlPaddingH;
    contentBlock.outerHeight += stlPaddingV;
    for (var i = 0; i < pendingList.length; i++) {
        var token = pendingList[i];
        var percentWidth = token.percentWidth;
        token.width = parseInt(percentWidth, 10) / 100 * contentBlock.width;
    }
    return contentBlock;
}
function pushTokens(block, str, style, wrapInfo, styleName) {
    var isEmptyStr = str === '';
    var tokenStyle = styleName && style.rich[styleName] || {};
    var lines = block.lines;
    var font = tokenStyle.font || style.font;
    var newLine = false;
    var strLines;
    var linesWidths;
    if (wrapInfo) {
        var tokenPadding = tokenStyle.padding;
        var tokenPaddingH = tokenPadding ? tokenPadding[1] + tokenPadding[3] : 0;
        if (tokenStyle.width != null && tokenStyle.width !== 'auto') {
            var outerWidth_1 = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .parsePercent */ .lo)(tokenStyle.width, wrapInfo.width) + tokenPaddingH;
            if (lines.length > 0) {
                if (outerWidth_1 + wrapInfo.accumWidth > wrapInfo.width) {
                    strLines = str.split('\n');
                    newLine = true;
                }
            }
            wrapInfo.accumWidth = outerWidth_1;
        }
        else {
            var res = wrapText(str, font, wrapInfo.width, wrapInfo.breakAll, wrapInfo.accumWidth);
            wrapInfo.accumWidth = res.accumWidth + tokenPaddingH;
            linesWidths = res.linesWidths;
            strLines = res.lines;
        }
    }
    if (!strLines) {
        strLines = str.split('\n');
    }
    var fontMeasureInfo = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font);
    for (var i = 0; i < strLines.length; i++) {
        var text = strLines[i];
        var token = new RichTextToken();
        token.styleName = styleName;
        token.text = text;
        token.isLineHolder = !text && !isEmptyStr;
        if (typeof tokenStyle.width === 'number') {
            token.width = tokenStyle.width;
        }
        else {
            token.width = linesWidths
                ? linesWidths[i]
                : (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)(fontMeasureInfo, text);
        }
        if (!i && !newLine) {
            var tokens = (lines[lines.length - 1] || (lines[0] = new RichTextLine())).tokens;
            var tokensLen = tokens.length;
            (tokensLen === 1 && tokens[0].isLineHolder)
                ? (tokens[0] = token)
                : ((text || !tokensLen || isEmptyStr) && tokens.push(token));
        }
        else {
            lines.push(new RichTextLine([token]));
        }
    }
}
function isAlphabeticLetter(ch) {
    var code = ch.charCodeAt(0);
    return code >= 0x20 && code <= 0x24F
        || code >= 0x370 && code <= 0x10FF
        || code >= 0x1200 && code <= 0x13FF
        || code >= 0x1E00 && code <= 0x206F;
}
var breakCharMap = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.reduce)(',&?/;] '.split(''), function (obj, ch) {
    obj[ch] = true;
    return obj;
}, {});
function isWordBreakChar(ch) {
    if (isAlphabeticLetter(ch)) {
        if (breakCharMap[ch]) {
            return true;
        }
        return false;
    }
    return true;
}
function wrapText(text, font, lineWidth, isBreakAll, lastAccumWidth) {
    var lines = [];
    var linesWidths = [];
    var line = '';
    var currentWord = '';
    var currentWordWidth = 0;
    var accumWidth = 0;
    var fontMeasureInfo = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font);
    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);
        if (ch === '\n') {
            if (currentWord) {
                line += currentWord;
                accumWidth += currentWordWidth;
            }
            lines.push(line);
            linesWidths.push(accumWidth);
            line = '';
            currentWord = '';
            currentWordWidth = 0;
            accumWidth = 0;
            continue;
        }
        var chWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureCharWidth */ .JK)(fontMeasureInfo, ch.charCodeAt(0));
        var inWord = isBreakAll ? false : !isWordBreakChar(ch);
        if (!lines.length
            ? lastAccumWidth + accumWidth + chWidth > lineWidth
            : accumWidth + chWidth > lineWidth) {
            if (!accumWidth) {
                if (inWord) {
                    lines.push(currentWord);
                    linesWidths.push(currentWordWidth);
                    currentWord = ch;
                    currentWordWidth = chWidth;
                }
                else {
                    lines.push(ch);
                    linesWidths.push(chWidth);
                }
            }
            else if (line || currentWord) {
                if (inWord) {
                    if (!line) {
                        line = currentWord;
                        currentWord = '';
                        currentWordWidth = 0;
                        accumWidth = currentWordWidth;
                    }
                    lines.push(line);
                    linesWidths.push(accumWidth - currentWordWidth);
                    currentWord += ch;
                    currentWordWidth += chWidth;
                    line = '';
                    accumWidth = currentWordWidth;
                }
                else {
                    if (currentWord) {
                        line += currentWord;
                        currentWord = '';
                        currentWordWidth = 0;
                    }
                    lines.push(line);
                    linesWidths.push(accumWidth);
                    line = ch;
                    accumWidth = chWidth;
                }
            }
            continue;
        }
        accumWidth += chWidth;
        if (inWord) {
            currentWord += ch;
            currentWordWidth += chWidth;
        }
        else {
            if (currentWord) {
                line += currentWord;
                currentWord = '';
                currentWordWidth = 0;
            }
            line += ch;
        }
    }
    if (currentWord) {
        line += currentWord;
    }
    if (line) {
        lines.push(line);
        linesWidths.push(accumWidth);
    }
    if (lines.length === 1) {
        accumWidth += lastAccumWidth;
    }
    return {
        accumWidth: accumWidth,
        lines: lines,
        linesWidths: linesWidths
    };
}
function calcInnerTextOverflowArea(out, overflowRect, baseX, baseY, textAlign, textVerticalAlign) {
    out.baseX = baseX;
    out.baseY = baseY;
    out.outerWidth = out.outerHeight = null;
    if (!overflowRect) {
        return;
    }
    var textWidth = overflowRect.width * 2;
    var textHeight = overflowRect.height * 2;
    _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.set(tmpCITCTextRect, (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .adjustTextX */ .ll)(baseX, textWidth, textAlign), (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .adjustTextY */ .sZ)(baseY, textHeight, textVerticalAlign), textWidth, textHeight);
    _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.intersect(overflowRect, tmpCITCTextRect, null, tmpCITCIntersectRectOpt);
    var outIntersectRect = tmpCITCIntersectRectOpt.outIntersectRect;
    out.outerWidth = outIntersectRect.width;
    out.outerHeight = outIntersectRect.height;
    out.baseX = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .adjustTextX */ .ll)(outIntersectRect.x, outIntersectRect.width, textAlign, true);
    out.baseY = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .adjustTextY */ .sZ)(outIntersectRect.y, outIntersectRect.height, textVerticalAlign, true);
}
var tmpCITCTextRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(0, 0, 0, 0);
var tmpCITCIntersectRectOpt = { outIntersectRect: {}, clamp: true };
function formatText(text) {
    return text != null ? (text += '') : (text = '');
}
function tSpanCreateBoundingRect(style) {
    var text = formatText(style.text);
    var font = style.font;
    var contentWidth = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .measureWidth */ .l8)((0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .ensureFontMeasureInfo */ .Qw)(font), text);
    var contentHeight = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .getLineHeight */ .ks)(font);
    return tSpanCreateBoundingRect2(style, contentWidth, contentHeight, null);
}
function tSpanCreateBoundingRect2(style, contentWidth, contentHeight, forceLineWidth) {
    var rect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay((0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .adjustTextX */ .ll)(style.x || 0, contentWidth, style.textAlign), (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_1__/* .adjustTextY */ .sZ)(style.y || 0, contentHeight, style.textBaseline), contentWidth, contentHeight);
    var lineWidth = forceLineWidth != null
        ? forceLineWidth
        : (tSpanHasStroke(style) ? style.lineWidth : 0);
    if (lineWidth > 0) {
        rect.x -= lineWidth / 2;
        rect.y -= lineWidth / 2;
        rect.width += lineWidth;
        rect.height += lineWidth;
    }
    return rect;
}
function tSpanHasStroke(style) {
    var stroke = style.stroke;
    return stroke != null && stroke !== 'none' && style.lineWidth > 0;
}


/***/ }),

/***/ 66798:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var easingFuncs = {
    linear: function (k) {
        return k;
    },
    quadraticIn: function (k) {
        return k * k;
    },
    quadraticOut: function (k) {
        return k * (2 - k);
    },
    quadraticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    },
    cubicIn: function (k) {
        return k * k * k;
    },
    cubicOut: function (k) {
        return --k * k * k + 1;
    },
    cubicInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    },
    quarticIn: function (k) {
        return k * k * k * k;
    },
    quarticOut: function (k) {
        return 1 - (--k * k * k * k);
    },
    quarticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    quinticIn: function (k) {
        return k * k * k * k * k;
    },
    quinticOut: function (k) {
        return --k * k * k * k * k + 1;
    },
    quinticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    sinusoidalIn: function (k) {
        return 1 - Math.cos(k * Math.PI / 2);
    },
    sinusoidalOut: function (k) {
        return Math.sin(k * Math.PI / 2);
    },
    sinusoidalInOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    exponentialIn: function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    exponentialOut: function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    exponentialInOut: function (k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    circularIn: function (k) {
        return 1 - Math.sqrt(1 - k * k);
    },
    circularOut: function (k) {
        return Math.sqrt(1 - (--k * k));
    },
    circularInOut: function (k) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    elasticIn: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1))
            * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    elasticOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k)
            * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    },
    elasticInOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1))
            * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    backIn: function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    },
    backOut: function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    },
    backInOut: function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },
    bounceIn: function (k) {
        return 1 - easingFuncs.bounceOut(1 - k);
    },
    bounceOut: function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        }
        else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        }
        else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    },
    bounceInOut: function (k) {
        if (k < 0.5) {
            return easingFuncs.bounceIn(k * 2) * 0.5;
        }
        return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (easingFuncs);


/***/ }),

/***/ 76059:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export DEFAULT_TSPAN_STYLE */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42924);
/* harmony import */ var _Displayable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34685);
/* harmony import */ var _Path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12682);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _core_platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84143);
/* harmony import */ var _helper_parseText_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66398);






var DEFAULT_TSPAN_STYLE = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)({
    strokeFirst: true,
    font: _core_platform_js__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_FONT */ .OH,
    x: 0,
    y: 0,
    textAlign: 'left',
    textBaseline: 'top',
    miterLimit: 2
}, _Path_js__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_PATH_STYLE */ .MW);
var TSpan = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__/* .__extends */ .C6)(TSpan, _super);
    function TSpan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TSpan.prototype.hasStroke = function () {
        return (0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_4__/* .tSpanHasStroke */ .n7)(this.style);
    };
    TSpan.prototype.hasFill = function () {
        var style = this.style;
        var fill = style.fill;
        return fill != null && fill !== 'none';
    };
    TSpan.prototype.createStyle = function (obj) {
        return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createObject)(DEFAULT_TSPAN_STYLE, obj);
    };
    TSpan.prototype.setBoundingRect = function (rect) {
        this._rect = rect;
    };
    TSpan.prototype.getBoundingRect = function () {
        if (!this._rect) {
            this._rect = (0,_helper_parseText_js__WEBPACK_IMPORTED_MODULE_4__/* .tSpanCreateBoundingRect */ .Xf)(this.style);
        }
        return this._rect;
    };
    TSpan.initDefaultProps = (function () {
        var tspanProto = TSpan.prototype;
        tspanProto.dirtyRectTolerance = 10;
    })();
    return TSpan;
}(_Displayable_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay));
TSpan.prototype.type = 'tspan';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TSpan);


/***/ }),

/***/ 79566:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ createCubicEasingFunc)
/* harmony export */ });
/* harmony import */ var _core_curve_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44203);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);


var regexp = /cubic-bezier\(([0-9,\.e ]+)\)/;
function createCubicEasingFunc(cubicEasingStr) {
    var cubic = cubicEasingStr && regexp.exec(cubicEasingStr);
    if (cubic) {
        var points = cubic[1].split(',');
        var a_1 = +(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.trim)(points[0]);
        var b_1 = +(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.trim)(points[1]);
        var c_1 = +(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.trim)(points[2]);
        var d_1 = +(0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.trim)(points[3]);
        if (isNaN(a_1 + b_1 + c_1 + d_1)) {
            return;
        }
        var roots_1 = [];
        return function (p) {
            return p <= 0
                ? 0 : p >= 1
                ? 1
                : (0,_core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicRootAt */ ._E)(0, a_1, c_1, 1, p, roots_1) && (0,_core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicAt */ .Yb)(0, b_1, d_1, 1, roots_1[0]);
        };
    }
}


/***/ }),

/***/ 80252:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Ed: () => (/* binding */ transformableGetLocalTransform),
/* harmony export */   IT: () => (/* binding */ copyTransform),
/* harmony export */   Rd: () => (/* binding */ transformableCreate),
/* harmony export */   Wx: () => (/* binding */ TRANSFORMABLE_PROPS)
/* harmony export */ });
/* harmony import */ var _matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43041);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2103);



var mIdentity = _matrix_js__WEBPACK_IMPORTED_MODULE_0__.identity;
var EPSILON = 5e-5;
function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}
var scaleTmp = [];
var tmpTransform = [];
var originTransform = _matrix_js__WEBPACK_IMPORTED_MODULE_0__.create();
var abs = Math.abs;
var Transformable = (function () {
    function Transformable() {
    }
    Transformable.prototype.getLocalTransform = function (m) {
        return transformableGetLocalTransform(this, m);
    };
    Transformable.prototype.setPosition = function (arr) {
        this.x = arr[0];
        this.y = arr[1];
    };
    Transformable.prototype.setScale = function (arr) {
        this.scaleX = arr[0];
        this.scaleY = arr[1];
    };
    Transformable.prototype.setSkew = function (arr) {
        this.skewX = arr[0];
        this.skewY = arr[1];
    };
    Transformable.prototype.setOrigin = function (arr) {
        this.originX = arr[0];
        this.originY = arr[1];
    };
    Transformable.prototype.needLocalTransform = function () {
        return isNotAroundZero(this.rotation)
            || isNotAroundZero(this.x)
            || isNotAroundZero(this.y)
            || isNotAroundZero(this.scaleX - 1)
            || isNotAroundZero(this.scaleY - 1)
            || isNotAroundZero(this.skewX)
            || isNotAroundZero(this.skewY);
    };
    Transformable.prototype.updateTransform = function () {
        var parentTransform = this.parent && this.parent.transform;
        var needLocalTransform = this.needLocalTransform();
        var m = this.transform;
        if (!(needLocalTransform || parentTransform)) {
            if (m) {
                mIdentity(m);
                this.invTransform = null;
            }
            return;
        }
        m = m || _matrix_js__WEBPACK_IMPORTED_MODULE_0__.create();
        if (needLocalTransform) {
            this.getLocalTransform(m);
        }
        else {
            mIdentity(m);
        }
        if (parentTransform) {
            if (needLocalTransform) {
                _matrix_js__WEBPACK_IMPORTED_MODULE_0__.mul(m, parentTransform, m);
            }
            else {
                _matrix_js__WEBPACK_IMPORTED_MODULE_0__.copy(m, parentTransform);
            }
        }
        this.transform = m;
        this._resolveGlobalScaleRatio(m);
        this.invTransform = this.invTransform || _matrix_js__WEBPACK_IMPORTED_MODULE_0__.create();
        _matrix_js__WEBPACK_IMPORTED_MODULE_0__.invert(this.invTransform, m);
    };
    Transformable.prototype._resolveGlobalScaleRatio = function (m) {
        var globalScaleRatio = this.globalScaleRatio;
        if (globalScaleRatio != null && globalScaleRatio !== 1) {
            this.getGlobalScale(scaleTmp);
            var relX = scaleTmp[0] < 0 ? -1 : 1;
            var relY = scaleTmp[1] < 0 ? -1 : 1;
            var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
            var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;
            m[0] *= sx;
            m[1] *= sx;
            m[2] *= sy;
            m[3] *= sy;
        }
    };
    Transformable.prototype.getComputedTransform = function () {
        var transformNode = this;
        var ancestors = [];
        while (transformNode) {
            ancestors.push(transformNode);
            transformNode = transformNode.parent;
        }
        while (transformNode = ancestors.pop()) {
            transformNode.updateTransform();
        }
        return this.transform;
    };
    Transformable.prototype.setLocalTransform = function (m) {
        if (!m) {
            return;
        }
        var sx = m[0] * m[0] + m[1] * m[1];
        var sy = m[2] * m[2] + m[3] * m[3];
        var rotation = Math.atan2(m[1], m[0]);
        var shearX = Math.PI / 2 + rotation - Math.atan2(m[3], m[2]);
        sy = Math.sqrt(sy) * Math.cos(shearX);
        sx = Math.sqrt(sx);
        this.skewX = shearX;
        this.skewY = 0;
        this.rotation = -rotation;
        this.x = +m[4];
        this.y = +m[5];
        this.scaleX = sx;
        this.scaleY = sy;
        this.originX = 0;
        this.originY = 0;
    };
    Transformable.prototype.decomposeTransform = function () {
        if (!this.transform) {
            return;
        }
        var parent = this.parent;
        var m = this.transform;
        if (parent && parent.transform) {
            parent.invTransform = parent.invTransform || _matrix_js__WEBPACK_IMPORTED_MODULE_0__.create();
            _matrix_js__WEBPACK_IMPORTED_MODULE_0__.mul(tmpTransform, parent.invTransform, m);
            m = tmpTransform;
        }
        var ox = this.originX;
        var oy = this.originY;
        if (ox || oy) {
            originTransform[4] = ox;
            originTransform[5] = oy;
            _matrix_js__WEBPACK_IMPORTED_MODULE_0__.mul(tmpTransform, m, originTransform);
            tmpTransform[4] -= ox;
            tmpTransform[5] -= oy;
            m = tmpTransform;
        }
        this.setLocalTransform(m);
    };
    Transformable.prototype.getGlobalScale = function (out) {
        var m = this.transform;
        out = out || [];
        if (!m) {
            out[0] = 1;
            out[1] = 1;
            return out;
        }
        out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
        out[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
        if (m[0] < 0) {
            out[0] = -out[0];
        }
        if (m[3] < 0) {
            out[1] = -out[1];
        }
        return out;
    };
    Transformable.prototype.transformCoordToLocal = function (x, y) {
        var v2 = [x, y];
        var invTransform = this.invTransform;
        if (invTransform) {
            _vector_js__WEBPACK_IMPORTED_MODULE_1__.applyTransform(v2, v2, invTransform);
        }
        return v2;
    };
    Transformable.prototype.transformCoordToGlobal = function (x, y) {
        var v2 = [x, y];
        var transform = this.transform;
        if (transform) {
            _vector_js__WEBPACK_IMPORTED_MODULE_1__.applyTransform(v2, v2, transform);
        }
        return v2;
    };
    Transformable.prototype.getLineScale = function () {
        var m = this.transform;
        return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10
            ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1]))
            : 1;
    };
    Transformable.prototype.copyTransform = function (source) {
        copyTransform(this, source);
    };
    Transformable.getLocalTransform = function (target, m) {
        m = m || [];
        var ox = target.originX || 0;
        var oy = target.originY || 0;
        var sx = target.scaleX;
        var sy = target.scaleY;
        var ax = target.anchorX;
        var ay = target.anchorY;
        var rotation = target.rotation || 0;
        var x = target.x;
        var y = target.y;
        var skewX = target.skewX ? Math.tan(target.skewX) : 0;
        var skewY = target.skewY ? Math.tan(-target.skewY) : 0;
        if (ox || oy || ax || ay) {
            var dx = ox + ax;
            var dy = oy + ay;
            m[4] = -dx * sx - skewX * dy * sy;
            m[5] = -dy * sy - skewY * dx * sx;
        }
        else {
            m[4] = m[5] = 0;
        }
        m[0] = sx;
        m[3] = sy;
        m[1] = skewY * sx;
        m[2] = skewX * sy;
        rotation && _matrix_js__WEBPACK_IMPORTED_MODULE_0__.rotate(m, m, rotation);
        m[4] += ox + x;
        m[5] += oy + y;
        return m;
    };
    Transformable.initDefaultProps = (function () {
        var proto = Transformable.prototype;
        proto.scaleX =
            proto.scaleY =
                proto.globalScaleRatio = 1;
        proto.x =
            proto.y =
                proto.originX =
                    proto.originY =
                        proto.skewX =
                            proto.skewY =
                                proto.rotation =
                                    proto.anchorX =
                                        proto.anchorY = 0;
    })();
    return Transformable;
}());
;
var transformableGetLocalTransform = Transformable.getLocalTransform;
function transformableCreate() {
    return new Transformable();
}
var TRANSFORMABLE_PROPS = [
    'x', 'y', 'originX', 'originY', 'anchorX', 'anchorY', 'rotation', 'scaleX', 'scaleY', 'skewX', 'skewY'
];
function copyTransform(target, source) {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.assignProps)(target, source, TRANSFORMABLE_PROPS);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Transformable);


/***/ }),

/***/ 81638:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dispose: () => (/* binding */ dispose),
/* harmony export */   disposeAll: () => (/* binding */ disposeAll),
/* harmony export */   getElementSSRData: () => (/* binding */ getElementSSRData),
/* harmony export */   getInstance: () => (/* binding */ getInstance),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   registerPainter: () => (/* binding */ registerPainter),
/* harmony export */   registerSSRDataGetter: () => (/* binding */ registerSSRDataGetter),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _core_env_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23883);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11916);
/* harmony import */ var _Handler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1084);
/* harmony import */ var _Storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52821);
/* harmony import */ var _animation_Animation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81831);
/* harmony import */ var _dom_HandlerProxy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(86001);
/* harmony import */ var _tool_color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19746);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42450);
/* harmony import */ var _graphic_Group_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(35980);
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE
*/









var painterCtors = {};
var instances = {};
function delInstance(id) {
    delete instances[id];
}
function isDarkMode(backgroundColor) {
    if (!backgroundColor) {
        return false;
    }
    if (typeof backgroundColor === 'string') {
        return (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_0__.lum)(backgroundColor, 1) < _config_js__WEBPACK_IMPORTED_MODULE_1__/* .DARK_MODE_THRESHOLD */ .ps;
    }
    else if (backgroundColor.colorStops) {
        var colorStops = backgroundColor.colorStops;
        var totalLum = 0;
        var len = colorStops.length;
        for (var i = 0; i < len; i++) {
            totalLum += (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_0__.lum)(colorStops[i].color, 1);
        }
        totalLum /= len;
        return totalLum < _config_js__WEBPACK_IMPORTED_MODULE_1__/* .DARK_MODE_THRESHOLD */ .ps;
    }
    return false;
}
var ZRender = (function () {
    function ZRender(id, dom, opts) {
        var _this = this;
        this._sleepAfterStill = 10;
        this._stillFrameAccum = 0;
        this._needsRefresh = true;
        this._needsRefreshHover = false;
        this._darkMode = false;
        opts = opts || {};
        this.dom = dom;
        this.id = id;
        var storage = new _Storage_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
        var rendererType = opts.renderer || 'canvas';
        if (!painterCtors[rendererType]) {
            rendererType = _core_util_js__WEBPACK_IMPORTED_MODULE_3__.keys(painterCtors)[0];
        }
        if (false) {}
        opts.useDirtyRect = opts.useDirtyRect == null
            ? false
            : opts.useDirtyRect;
        var painter = new painterCtors[rendererType](dom, storage, opts, id);
        var ssrMode = opts.ssr || painter.ssrOnly;
        this.storage = storage;
        this.painter = painter;
        var handlerProxy = (!_core_env_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.node && !_core_env_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.worker && !ssrMode)
            ? new _dom_HandlerProxy_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(painter.getViewportRoot(), painter.root)
            : null;
        var useCoarsePointer = opts.useCoarsePointer;
        var usePointerSize = (useCoarsePointer == null || useCoarsePointer === 'auto')
            ? _core_env_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.touchEventsSupported
            : !!useCoarsePointer;
        var defaultPointerSize = 44;
        var pointerSize;
        if (usePointerSize) {
            pointerSize = _core_util_js__WEBPACK_IMPORTED_MODULE_3__.retrieve2(opts.pointerSize, defaultPointerSize);
        }
        this.handler = new _Handler_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(storage, painter, handlerProxy, painter.root, pointerSize);
        this.animation = new _animation_Animation_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A({
            stage: {
                update: ssrMode ? null : function () { return _this._flush(false); }
            }
        });
        if (!ssrMode) {
            this.animation.start();
        }
    }
    ZRender.prototype.add = function (el) {
        if (this._disposed || !el) {
            return;
        }
        this.storage.addRoot(el);
        el.addSelfToZr(this);
        this.refresh();
    };
    ZRender.prototype.remove = function (el) {
        if (this._disposed || !el) {
            return;
        }
        this.storage.delRoot(el);
        el.removeSelfFromZr(this);
        this.refresh();
    };
    ZRender.prototype.configLayer = function (zLevel, config) {
        if (this._disposed) {
            return;
        }
        if (this.painter.configLayer) {
            this.painter.configLayer(zLevel, config);
        }
        this.refresh();
    };
    ZRender.prototype.setBackgroundColor = function (backgroundColor) {
        if (this._disposed) {
            return;
        }
        if (this.painter.setBackgroundColor) {
            this.painter.setBackgroundColor(backgroundColor);
        }
        this.refresh();
        this._backgroundColor = backgroundColor;
        this._darkMode = isDarkMode(backgroundColor);
    };
    ZRender.prototype.getBackgroundColor = function () {
        return this._backgroundColor;
    };
    ZRender.prototype.setDarkMode = function (darkMode) {
        this._darkMode = darkMode;
    };
    ZRender.prototype.isDarkMode = function () {
        return this._darkMode;
    };
    ZRender.prototype.refreshImmediately = function (noAnimationUpdate) {
        if (this._disposed) {
            return;
        }
        this._refresh({
            animUpdate: !noAnimationUpdate,
            refresh: true,
            refreshHover: false
        });
    };
    ZRender.prototype._refresh = function (opt) {
        if (opt.animUpdate) {
            this.animation.update(true);
        }
        this._needsRefresh = this._needsRefreshHover = false;
        this.painter.refresh({
            refresh: opt.refresh,
            refreshHover: opt.refreshHover
        });
        this._needsRefresh = this._needsRefreshHover = false;
    };
    ZRender.prototype.refresh = function () {
        if (this._disposed) {
            return;
        }
        this._needsRefresh = true;
        this.animation.start();
    };
    ZRender.prototype.flush = function () {
        if (this._disposed) {
            return;
        }
        this._flush(true);
    };
    ZRender.prototype._flush = function (animationUpdate) {
        var triggerRendered;
        var start = (0,_animation_Animation_js__WEBPACK_IMPORTED_MODULE_7__/* .getTime */ .W)();
        var needsRefresh = this._needsRefresh;
        var needsRefreshHover = this._needsRefreshHover;
        if (needsRefresh || needsRefreshHover) {
            triggerRendered = true;
            this._refresh({
                animUpdate: animationUpdate,
                refresh: needsRefresh,
                refreshHover: needsRefreshHover
            });
        }
        var end = (0,_animation_Animation_js__WEBPACK_IMPORTED_MODULE_7__/* .getTime */ .W)();
        if (triggerRendered) {
            this._stillFrameAccum = 0;
            this.trigger('rendered', {
                elapsedTime: end - start
            });
        }
        else if (this._sleepAfterStill > 0) {
            this._stillFrameAccum++;
            if (this._stillFrameAccum > this._sleepAfterStill) {
                this.animation.stop();
            }
        }
    };
    ZRender.prototype.setSleepAfterStill = function (stillFramesCount) {
        this._sleepAfterStill = stillFramesCount;
    };
    ZRender.prototype.wakeUp = function () {
        if (this._disposed) {
            return;
        }
        this.animation.start();
        this._stillFrameAccum = 0;
    };
    ZRender.prototype.refreshHover = function () {
        this._needsRefreshHover = true;
    };
    ZRender.prototype.refreshHoverImmediately = function () {
        if (this._disposed) {
            return;
        }
        this._refresh({
            animUpdate: false,
            refresh: false,
            refreshHover: true
        });
    };
    ZRender.prototype.resize = function (opts) {
        if (this._disposed) {
            return;
        }
        opts = opts || {};
        this.painter.resize(opts.width, opts.height);
        this.handler.resize();
    };
    ZRender.prototype.clearAnimation = function () {
        if (this._disposed) {
            return;
        }
        this.animation.clear();
    };
    ZRender.prototype.getWidth = function () {
        if (this._disposed) {
            return;
        }
        return this.painter.getWidth();
    };
    ZRender.prototype.getHeight = function () {
        if (this._disposed) {
            return;
        }
        return this.painter.getHeight();
    };
    ZRender.prototype.setCursorStyle = function (cursorStyle) {
        if (this._disposed) {
            return;
        }
        this.handler.setCursorStyle(cursorStyle);
    };
    ZRender.prototype.findHover = function (x, y) {
        if (this._disposed) {
            return;
        }
        return this.handler.findHover(x, y);
    };
    ZRender.prototype.on = function (eventName, eventHandler, context) {
        if (!this._disposed) {
            this.handler.on(eventName, eventHandler, context);
        }
        return this;
    };
    ZRender.prototype.off = function (eventName, eventHandler) {
        if (this._disposed) {
            return;
        }
        this.handler.off(eventName, eventHandler);
    };
    ZRender.prototype.trigger = function (eventName, event) {
        if (this._disposed) {
            return;
        }
        this.handler.trigger(eventName, event);
    };
    ZRender.prototype.clear = function () {
        if (this._disposed) {
            return;
        }
        var roots = this.storage.getRoots();
        for (var i = 0; i < roots.length; i++) {
            if (roots[i] instanceof _graphic_Group_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A) {
                roots[i].removeSelfFromZr(this);
            }
        }
        this.storage.delAllRoots();
        this.painter.clear();
    };
    ZRender.prototype.dispose = function () {
        if (this._disposed) {
            return;
        }
        this.animation.stop();
        this.clear();
        this.storage.dispose();
        this.painter.dispose();
        this.handler.dispose();
        this.animation =
            this.storage =
                this.painter =
                    this.handler = null;
        this._disposed = true;
        delInstance(this.id);
    };
    return ZRender;
}());
function init(dom, opts) {
    var zr = new ZRender(_core_util_js__WEBPACK_IMPORTED_MODULE_3__.guid(), dom, opts);
    instances[zr.id] = zr;
    return zr;
}
function dispose(zr) {
    zr.dispose();
}
function disposeAll() {
    for (var key in instances) {
        if (instances.hasOwnProperty(key)) {
            instances[key].dispose();
        }
    }
    instances = {};
}
function getInstance(id) {
    return instances[id];
}
function registerPainter(name, Ctor) {
    painterCtors[name] = Ctor;
}
var ssrDataGetter;
function getElementSSRData(el) {
    if (typeof ssrDataGetter === 'function') {
        return ssrDataGetter(el);
    }
}
function registerSSRDataGetter(getter) {
    ssrDataGetter = getter;
}
var version = '6.1.0';
;


/***/ }),

/***/ 81831:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   W: () => (/* binding */ getTime)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _core_Eventful_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34463);
/* harmony import */ var _requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92839);
/* harmony import */ var _Animator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34242);




function getTime() {
    return new Date().getTime();
}
var Animation = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(Animation, _super);
    function Animation(opts) {
        var _this = _super.call(this) || this;
        _this._running = false;
        _this._time = 0;
        _this._pausedTime = 0;
        _this._pauseStart = 0;
        _this._paused = false;
        opts = opts || {};
        _this.stage = opts.stage || {};
        return _this;
    }
    Animation.prototype.addClip = function (clip) {
        if (clip.animation) {
            this.removeClip(clip);
        }
        if (!this._head) {
            this._head = this._tail = clip;
        }
        else {
            this._tail.next = clip;
            clip.prev = this._tail;
            clip.next = null;
            this._tail = clip;
        }
        clip.animation = this;
    };
    Animation.prototype.addAnimator = function (animator) {
        animator.animation = this;
        var clip = animator.getClip();
        if (clip) {
            this.addClip(clip);
        }
    };
    Animation.prototype.removeClip = function (clip) {
        if (!clip.animation) {
            return;
        }
        var prev = clip.prev;
        var next = clip.next;
        if (prev) {
            prev.next = next;
        }
        else {
            this._head = next;
        }
        if (next) {
            next.prev = prev;
        }
        else {
            this._tail = prev;
        }
        clip.next = clip.prev = clip.animation = null;
    };
    Animation.prototype.removeAnimator = function (animator) {
        var clip = animator.getClip();
        if (clip) {
            this.removeClip(clip);
        }
        animator.animation = null;
    };
    Animation.prototype.update = function (notTriggerFrameAndStageUpdate) {
        var time = getTime() - this._pausedTime;
        var delta = time - this._time;
        var clip = this._head;
        while (clip) {
            var nextClip = clip.next;
            var finished = clip.step(time, delta);
            if (finished) {
                clip.ondestroy();
                this.removeClip(clip);
                clip = nextClip;
            }
            else {
                clip = nextClip;
            }
        }
        this._time = time;
        if (!notTriggerFrameAndStageUpdate) {
            this.trigger('frame', delta);
            this.stage.update && this.stage.update();
        }
    };
    Animation.prototype._startLoop = function () {
        var self = this;
        this._running = true;
        function step() {
            if (self._running) {
                (0,_requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(step);
                !self._paused && self.update();
            }
        }
        (0,_requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(step);
    };
    Animation.prototype.start = function () {
        if (this._running) {
            return;
        }
        this._time = getTime();
        this._pausedTime = 0;
        this._startLoop();
    };
    Animation.prototype.stop = function () {
        this._running = false;
    };
    Animation.prototype.pause = function () {
        if (!this._paused) {
            this._pauseStart = getTime();
            this._paused = true;
        }
    };
    Animation.prototype.resume = function () {
        if (this._paused) {
            this._pausedTime += getTime() - this._pauseStart;
            this._paused = false;
        }
    };
    Animation.prototype.clear = function () {
        var clip = this._head;
        while (clip) {
            var nextClip = clip.next;
            clip.prev = clip.next = clip.animation = null;
            clip = nextClip;
        }
        this._head = this._tail = null;
    };
    Animation.prototype.isFinished = function () {
        return this._head == null;
    };
    Animation.prototype.animate = function (target, options) {
        options = options || {};
        this.start();
        var animator = new _Animator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(target, options.loop);
        this.addAnimator(animator);
        return animator;
    };
    return Animation;
}(_core_Eventful_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animation);


/***/ }),

/***/ 83660:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   yx: () => (/* binding */ IN_HOVER_LAYER_KIND_ONLY_STYLE_CHANGE)
/* harmony export */ });
/* unused harmony exports PRESERVED_NORMAL_STATE, IN_HOVER_LAYER_KIND_NO */
/* harmony import */ var _core_Transformable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80252);
/* harmony import */ var _animation_Animator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(34242);
/* harmony import */ var _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30582);
/* harmony import */ var _core_Eventful_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34463);
/* harmony import */ var _contain_text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60530);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42450);
/* harmony import */ var _tool_color_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(19746);
/* harmony import */ var _graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22434);
/* harmony import */ var _core_matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43041);










var PRESERVED_NORMAL_STATE = '__zr_normal__';
var PRIMARY_STATES_KEYS = _core_Transformable_js__WEBPACK_IMPORTED_MODULE_0__/* .TRANSFORMABLE_PROPS */ .Wx.concat(['ignore']);
var DEFAULT_ANIMATABLE_MAP = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.reduce)(_core_Transformable_js__WEBPACK_IMPORTED_MODULE_0__/* .TRANSFORMABLE_PROPS */ .Wx, function (obj, key) {
    obj[key] = true;
    return obj;
}, { ignore: false });
var tmpTextPosCalcRes = {};
var tmpBoundingRect = new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0);
var tmpInnerTextTrans = [];
var IN_HOVER_LAYER_KIND_NO = 0;
var IN_HOVER_LAYER_KIND_ONLY_STYLE_CHANGE = 1;
var Element = (function () {
    function Element(props) {
        this.id = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.guid)();
        this.animators = [];
        this.currentStates = [];
        this.states = {};
        this._init(props);
    }
    Element.prototype._init = function (props) {
        this.attr(props);
    };
    Element.prototype.drift = function (dx, dy, e) {
        switch (this.draggable) {
            case 'horizontal':
                dy = 0;
                break;
            case 'vertical':
                dx = 0;
                break;
        }
        var m = this.transform;
        if (!m) {
            m = this.transform = [1, 0, 0, 1, 0, 0];
        }
        m[4] += dx;
        m[5] += dy;
        this.decomposeTransform();
        this.markRedraw();
    };
    Element.prototype.beforeUpdate = function () { };
    Element.prototype.afterUpdate = function () { };
    Element.prototype.update = function () {
        this.updateTransform();
        if (this.__dirty) {
            this.updateInnerText();
        }
    };
    Element.prototype.updateInnerText = function (forceUpdate) {
        var textEl = this._textContent;
        if (textEl && (!textEl.ignore || forceUpdate)) {
            if (!this.textConfig) {
                this.textConfig = {};
            }
            var textConfig = this.textConfig;
            var isLocal = textConfig.local;
            var innerTransformable = textEl.innerTransformable;
            var textAlign = void 0;
            var textVerticalAlign = void 0;
            var textStyleChanged = false;
            innerTransformable.parent = isLocal ? this : null;
            var innerOrigin = false;
            innerTransformable.copyTransform(textEl);
            var hasPosition = textConfig.position != null;
            var autoOverflowArea = textConfig.autoOverflowArea;
            var layoutRect = void 0;
            if (autoOverflowArea || hasPosition) {
                layoutRect = tmpBoundingRect;
                if (textConfig.layoutRect) {
                    layoutRect.copy(textConfig.layoutRect);
                }
                else {
                    layoutRect.copy(this.getBoundingRect());
                }
                if (!isLocal) {
                    layoutRect.applyTransform(this.transform);
                }
            }
            if (hasPosition) {
                if (this.calculateTextPosition) {
                    this.calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
                }
                else {
                    (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_3__/* .calculateTextPosition */ .X4)(tmpTextPosCalcRes, textConfig, layoutRect);
                }
                innerTransformable.x = tmpTextPosCalcRes.x;
                innerTransformable.y = tmpTextPosCalcRes.y;
                textAlign = tmpTextPosCalcRes.align;
                textVerticalAlign = tmpTextPosCalcRes.verticalAlign;
                var textOrigin = textConfig.origin;
                if (textOrigin && textConfig.rotation != null) {
                    var relOriginX = void 0;
                    var relOriginY = void 0;
                    if (textOrigin === 'center') {
                        relOriginX = layoutRect.width * 0.5;
                        relOriginY = layoutRect.height * 0.5;
                    }
                    else {
                        relOriginX = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePercent */ .lo)(textOrigin[0], layoutRect.width);
                        relOriginY = (0,_contain_text_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePercent */ .lo)(textOrigin[1], layoutRect.height);
                    }
                    innerOrigin = true;
                    innerTransformable.originX = -innerTransformable.x + relOriginX + (isLocal ? 0 : layoutRect.x);
                    innerTransformable.originY = -innerTransformable.y + relOriginY + (isLocal ? 0 : layoutRect.y);
                }
            }
            if (textConfig.rotation != null) {
                innerTransformable.rotation = textConfig.rotation;
            }
            var textOffset = textConfig.offset;
            if (textOffset) {
                innerTransformable.x += textOffset[0];
                innerTransformable.y += textOffset[1];
                if (!innerOrigin) {
                    innerTransformable.originX = -textOffset[0];
                    innerTransformable.originY = -textOffset[1];
                }
            }
            var innerTextDefaultStyle = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
            if (autoOverflowArea) {
                var overflowRect = innerTextDefaultStyle.overflowRect =
                    innerTextDefaultStyle.overflowRect || new _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(0, 0, 0, 0);
                innerTransformable.getLocalTransform(tmpInnerTextTrans);
                (0,_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.invert)(tmpInnerTextTrans, tmpInnerTextTrans);
                _core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.copy(overflowRect, layoutRect);
                overflowRect.applyTransform(tmpInnerTextTrans);
            }
            else {
                innerTextDefaultStyle.overflowRect = null;
            }
            var isInside = textConfig.inside == null
                ? (typeof textConfig.position === 'string' && textConfig.position.indexOf('inside') >= 0)
                : textConfig.inside;
            var textFill = void 0;
            var textStroke = void 0;
            var autoStroke = void 0;
            if (isInside && this.canBeInsideText()) {
                textFill = textConfig.insideFill;
                textStroke = textConfig.insideStroke;
                if (textFill == null || textFill === 'auto') {
                    textFill = this.getInsideTextFill();
                }
                if (textStroke == null || textStroke === 'auto') {
                    textStroke = this.getInsideTextStroke(textFill);
                    autoStroke = true;
                }
            }
            else {
                textFill = textConfig.outsideFill;
                textStroke = textConfig.outsideStroke;
                if (textFill == null || textFill === 'auto') {
                    textFill = this.getOutsideFill();
                }
                if (textStroke == null || textStroke === 'auto') {
                    textStroke = this.getOutsideStroke(textFill);
                    autoStroke = true;
                }
            }
            textFill = textFill || '#000';
            if (textFill !== innerTextDefaultStyle.fill
                || textStroke !== innerTextDefaultStyle.stroke
                || autoStroke !== innerTextDefaultStyle.autoStroke
                || textAlign !== innerTextDefaultStyle.align
                || textVerticalAlign !== innerTextDefaultStyle.verticalAlign) {
                textStyleChanged = true;
                innerTextDefaultStyle.fill = textFill;
                innerTextDefaultStyle.stroke = textStroke;
                innerTextDefaultStyle.autoStroke = autoStroke;
                innerTextDefaultStyle.align = textAlign;
                innerTextDefaultStyle.verticalAlign = textVerticalAlign;
                textEl.setDefaultTextStyle(innerTextDefaultStyle);
            }
            textEl.__dirty |= _graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .REDRAW_BIT */ .M;
            if (textStyleChanged) {
                textEl.dirtyStyle(true);
            }
        }
    };
    Element.prototype.canBeInsideText = function () {
        return true;
    };
    Element.prototype.getInsideTextFill = function () {
        return '#fff';
    };
    Element.prototype.getInsideTextStroke = function (textFill) {
        return '#000';
    };
    Element.prototype.getOutsideFill = function () {
        return this.__zr && this.__zr.isDarkMode() ? _config_js__WEBPACK_IMPORTED_MODULE_6__/* .LIGHT_LABEL_COLOR */ .el : _config_js__WEBPACK_IMPORTED_MODULE_6__/* .DARK_LABEL_COLOR */ ._S;
    };
    Element.prototype.getOutsideStroke = function (textFill) {
        var backgroundColor = this.__zr && this.__zr.getBackgroundColor();
        var colorArr = typeof backgroundColor === 'string' && (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_7__.parse)(backgroundColor);
        if (!colorArr) {
            colorArr = [255, 255, 255, 1];
        }
        var alpha = colorArr[3];
        var isDark = this.__zr.isDarkMode();
        for (var i = 0; i < 3; i++) {
            colorArr[i] = colorArr[i] * alpha + (isDark ? 0 : 255) * (1 - alpha);
        }
        colorArr[3] = 1;
        return (0,_tool_color_js__WEBPACK_IMPORTED_MODULE_7__.stringify)(colorArr, 'rgba');
    };
    Element.prototype.traverse = function (cb, context) { };
    Element.prototype.attrKV = function (key, value) {
        if (key === 'textConfig') {
            this.setTextConfig(value);
        }
        else if (key === 'textContent') {
            this.setTextContent(value);
        }
        else if (key === 'clipPath') {
            this.setClipPath(value);
        }
        else if (key === 'extra') {
            this.extra = this.extra || {};
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)(this.extra, value);
        }
        else {
            this[key] = value;
        }
    };
    Element.prototype.hide = function () {
        this.ignore = true;
        this.markRedraw();
    };
    Element.prototype.show = function () {
        this.ignore = false;
        this.markRedraw();
    };
    Element.prototype.attr = function (keyOrObj, value) {
        if (typeof keyOrObj === 'string') {
            this.attrKV(keyOrObj, value);
        }
        else if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isObject)(keyOrObj)) {
            var obj = keyOrObj;
            var keysArr = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(obj);
            for (var i = 0; i < keysArr.length; i++) {
                var key = keysArr[i];
                this.attrKV(key, keyOrObj[key]);
            }
        }
        this.markRedraw();
        return this;
    };
    Element.prototype.saveCurrentToNormalState = function (toState) {
        this._innerSaveToNormal(toState);
        var normalState = this._normalState;
        for (var i = 0; i < this.animators.length; i++) {
            var animator = this.animators[i];
            var fromStateTransition = animator.__fromStateTransition;
            if (animator.getLoop() || fromStateTransition && fromStateTransition !== PRESERVED_NORMAL_STATE) {
                continue;
            }
            var targetName = animator.targetName;
            var target = targetName
                ? normalState[targetName] : normalState;
            animator.saveTo(target);
        }
    };
    Element.prototype._innerSaveToNormal = function (toState) {
        var normalState = this._normalState;
        if (!normalState) {
            normalState = this._normalState = {};
        }
        if (toState.textConfig && !normalState.textConfig) {
            normalState.textConfig = this.textConfig;
        }
        this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
    };
    Element.prototype._savePrimaryToNormal = function (toState, normalState, primaryKeys) {
        for (var i = 0; i < primaryKeys.length; i++) {
            var key = primaryKeys[i];
            if (toState[key] != null && !(key in normalState)) {
                normalState[key] = this[key];
            }
        }
    };
    Element.prototype.hasState = function () {
        return this.currentStates.length > 0;
    };
    Element.prototype.getState = function (name) {
        return this.states[name];
    };
    Element.prototype.ensureState = function (name) {
        var states = this.states;
        if (!states[name]) {
            states[name] = {};
        }
        return states[name];
    };
    Element.prototype.clearStates = function (noAnimation) {
        this.useState(PRESERVED_NORMAL_STATE, false, noAnimation);
    };
    Element.prototype.useState = function (stateName, keepCurrentStates, noAnimation, forceUseHoverLayer) {
        var toNormalState = stateName === PRESERVED_NORMAL_STATE;
        var hasStates = this.hasState();
        if (!hasStates && toNormalState) {
            return;
        }
        var currentStates = this.currentStates;
        var animationCfg = this.stateTransition;
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(currentStates, stateName) >= 0 && (keepCurrentStates || currentStates.length === 1)) {
            return;
        }
        var state;
        if (this.stateProxy && !toNormalState) {
            state = this.stateProxy(stateName);
        }
        if (!state) {
            state = (this.states && this.states[stateName]);
        }
        if (!state && !toNormalState) {
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.logError)("State " + stateName + " not exists.");
            return;
        }
        if (!toNormalState) {
            this.saveCurrentToNormalState(state);
        }
        var textContent = this._textContent;
        var useHoverLayer = shouldUseHoverLayer(this, textContent, state, forceUseHoverLayer);
        if (useHoverLayer && !this.__inHover) {
            this.__inHover = useHoverLayer;
        }
        this._applyStateObj(stateName, state, this._normalState, keepCurrentStates, canTransition(this, noAnimation, animationCfg), animationCfg);
        var textGuide = this._textGuide;
        if (textContent) {
            textContent.useState(stateName, keepCurrentStates, noAnimation, !!useHoverLayer);
        }
        if (textGuide) {
            textGuide.useState(stateName, keepCurrentStates, noAnimation, !!useHoverLayer);
        }
        if (toNormalState) {
            this.currentStates = [];
            this._normalState = {};
        }
        else {
            if (!keepCurrentStates) {
                this.currentStates = [stateName];
            }
            else {
                this.currentStates.push(stateName);
            }
        }
        this._updateAnimationTargets();
        this.markRedraw();
        if (!useHoverLayer && this.__inHover) {
            this.__inHover = IN_HOVER_LAYER_KIND_NO;
            this.__dirty &= ~_graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .REDRAW_BIT */ .M;
        }
        return state;
    };
    Element.prototype.useStates = function (states, noAnimation, forceUseHoverLayer) {
        if (!states.length) {
            this.clearStates();
        }
        else {
            var stateObjects = [];
            var currentStates = this.currentStates;
            var len = states.length;
            var notChange = len === currentStates.length;
            if (notChange) {
                for (var i = 0; i < len; i++) {
                    if (states[i] !== currentStates[i]) {
                        notChange = false;
                        break;
                    }
                }
            }
            if (notChange) {
                return;
            }
            for (var i = 0; i < len; i++) {
                var stateName = states[i];
                var stateObj = void 0;
                if (this.stateProxy) {
                    stateObj = this.stateProxy(stateName, states);
                }
                if (!stateObj) {
                    stateObj = this.states[stateName];
                }
                if (stateObj) {
                    stateObjects.push(stateObj);
                }
            }
            var lastStateObj = stateObjects[len - 1];
            var textContent = this._textContent;
            var useHoverLayer = shouldUseHoverLayer(this, textContent, lastStateObj, forceUseHoverLayer);
            if (useHoverLayer && !this.__inHover) {
                this.__inHover = useHoverLayer;
            }
            var mergedState = this._mergeStates(stateObjects);
            var animationCfg = this.stateTransition;
            this.saveCurrentToNormalState(mergedState);
            this._applyStateObj(states.join(','), mergedState, this._normalState, false, canTransition(this, noAnimation, animationCfg), animationCfg);
            var textGuide = this._textGuide;
            if (textContent) {
                textContent.useStates(states, noAnimation, !!useHoverLayer);
            }
            if (textGuide) {
                textGuide.useStates(states, noAnimation, !!useHoverLayer);
            }
            this._updateAnimationTargets();
            this.currentStates = states.slice();
            this.markRedraw();
            if (!useHoverLayer && this.__inHover) {
                this.__inHover = IN_HOVER_LAYER_KIND_NO;
                this.__dirty &= ~_graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .REDRAW_BIT */ .M;
            }
        }
    };
    Element.prototype.isSilent = function () {
        var el = this;
        while (el) {
            if (el.silent) {
                return true;
            }
            var hostEl = el.__hostTarget;
            el = hostEl ? (el.ignoreHostSilent ? null : hostEl) : el.parent;
        }
        return false;
    };
    Element.prototype._updateAnimationTargets = function () {
        for (var i = 0; i < this.animators.length; i++) {
            var animator = this.animators[i];
            if (animator.targetName) {
                animator.changeTarget(this[animator.targetName]);
            }
        }
    };
    Element.prototype.removeState = function (state) {
        var idx = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(this.currentStates, state);
        if (idx >= 0) {
            var currentStates = this.currentStates.slice();
            currentStates.splice(idx, 1);
            this.useStates(currentStates);
        }
    };
    Element.prototype.replaceState = function (oldState, newState, forceAdd) {
        var currentStates = this.currentStates.slice();
        var idx = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(currentStates, oldState);
        var newStateExists = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(currentStates, newState) >= 0;
        if (idx >= 0) {
            if (!newStateExists) {
                currentStates[idx] = newState;
            }
            else {
                currentStates.splice(idx, 1);
            }
        }
        else if (forceAdd && !newStateExists) {
            currentStates.push(newState);
        }
        this.useStates(currentStates);
    };
    Element.prototype.toggleState = function (state, enable) {
        if (enable) {
            this.useState(state, true);
        }
        else {
            this.removeState(state);
        }
    };
    Element.prototype._mergeStates = function (states) {
        var mergedState = {};
        var mergedTextConfig;
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)(mergedState, state);
            if (state.textConfig) {
                mergedTextConfig = mergedTextConfig || {};
                (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)(mergedTextConfig, state.textConfig);
            }
        }
        if (mergedTextConfig) {
            mergedState.textConfig = mergedTextConfig;
        }
        return mergedState;
    };
    Element.prototype._applyStateObj = function (stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
        if (this.__inHover === IN_HOVER_LAYER_KIND_ONLY_STYLE_CHANGE) {
            return;
        }
        var needsRestoreToNormal = !(state && keepCurrentStates);
        if (state && state.textConfig) {
            this.textConfig = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)({}, keepCurrentStates ? this.textConfig : normalState.textConfig);
            (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)(this.textConfig, state.textConfig);
        }
        else if (needsRestoreToNormal) {
            if (normalState.textConfig) {
                this.textConfig = normalState.textConfig;
            }
        }
        var transitionTarget = {};
        var hasTransition = false;
        for (var i = 0; i < PRIMARY_STATES_KEYS.length; i++) {
            var key = PRIMARY_STATES_KEYS[i];
            var propNeedsTransition = transition && DEFAULT_ANIMATABLE_MAP[key];
            if (state && state[key] != null) {
                if (propNeedsTransition) {
                    hasTransition = true;
                    transitionTarget[key] = state[key];
                }
                else {
                    this[key] = state[key];
                }
            }
            else if (needsRestoreToNormal) {
                if (normalState[key] != null) {
                    if (propNeedsTransition) {
                        hasTransition = true;
                        transitionTarget[key] = normalState[key];
                    }
                    else {
                        this[key] = normalState[key];
                    }
                }
            }
        }
        if (!transition) {
            for (var i = 0; i < this.animators.length; i++) {
                var animator = this.animators[i];
                var targetName = animator.targetName;
                if (!animator.getLoop()) {
                    animator.__changeFinalValue(targetName
                        ? (state || normalState)[targetName]
                        : (state || normalState));
                }
            }
        }
        if (hasTransition) {
            this._transitionState(stateName, transitionTarget, animationCfg);
        }
    };
    Element.prototype._attachComponent = function (componentEl) {
        if (componentEl.__zr && !componentEl.__hostTarget) {
            if (false) {}
            return;
        }
        if (componentEl === this) {
            if (false) {}
            return;
        }
        var zr = this.__zr;
        if (zr) {
            componentEl.addSelfToZr(zr);
        }
        componentEl.__zr = zr;
        componentEl.__hostTarget = this;
    };
    Element.prototype._detachComponent = function (componentEl) {
        if (componentEl.__zr) {
            componentEl.removeSelfFromZr(componentEl.__zr);
        }
        componentEl.__zr = null;
        componentEl.__hostTarget = null;
    };
    Element.prototype.getClipPath = function () {
        return this._clipPath;
    };
    Element.prototype.setClipPath = function (clipPath) {
        if (this._clipPath && this._clipPath !== clipPath) {
            this.removeClipPath();
        }
        this._attachComponent(clipPath);
        this._clipPath = clipPath;
        this.markRedraw();
    };
    Element.prototype.removeClipPath = function () {
        var clipPath = this._clipPath;
        if (clipPath) {
            this._detachComponent(clipPath);
            this._clipPath = null;
            this.markRedraw();
        }
    };
    Element.prototype.getTextContent = function () {
        return this._textContent;
    };
    Element.prototype.setTextContent = function (textEl) {
        var previousTextContent = this._textContent;
        if (previousTextContent === textEl) {
            return;
        }
        if (previousTextContent && previousTextContent !== textEl) {
            this.removeTextContent();
        }
        if (false) {}
        textEl.innerTransformable = new _core_Transformable_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay();
        this._attachComponent(textEl);
        this._textContent = textEl;
        this.markRedraw();
    };
    Element.prototype.setTextConfig = function (cfg) {
        if (!this.textConfig) {
            this.textConfig = {};
        }
        (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)(this.textConfig, cfg);
        this.markRedraw();
    };
    Element.prototype.removeTextConfig = function () {
        this.textConfig = null;
        this.markRedraw();
    };
    Element.prototype.removeTextContent = function () {
        var textEl = this._textContent;
        if (textEl) {
            textEl.innerTransformable = null;
            this._detachComponent(textEl);
            this._textContent = null;
            this._innerTextDefaultStyle = null;
            this.markRedraw();
        }
    };
    Element.prototype.getTextGuideLine = function () {
        return this._textGuide;
    };
    Element.prototype.setTextGuideLine = function (guideLine) {
        if (this._textGuide && this._textGuide !== guideLine) {
            this.removeTextGuideLine();
        }
        this._attachComponent(guideLine);
        this._textGuide = guideLine;
        this.markRedraw();
    };
    Element.prototype.removeTextGuideLine = function () {
        var textGuide = this._textGuide;
        if (textGuide) {
            this._detachComponent(textGuide);
            this._textGuide = null;
            this.markRedraw();
        }
    };
    Element.prototype.markRedraw = function () {
        this.__dirty |= _graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .REDRAW_BIT */ .M;
        var zr = this.__zr;
        if (zr) {
            if (this.__inHover) {
                zr.refreshHover();
            }
            else {
                zr.refresh();
            }
        }
        if (this.__hostTarget) {
            this.__hostTarget.markRedraw();
        }
    };
    Element.prototype.dirty = function () {
        this.markRedraw();
    };
    Element.prototype.addSelfToZr = function (zr) {
        if (this.__zr === zr) {
            return;
        }
        this.__zr = zr;
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.addAnimator(animators[i]);
            }
        }
        if (this._clipPath) {
            this._clipPath.addSelfToZr(zr);
        }
        if (this._textContent) {
            this._textContent.addSelfToZr(zr);
        }
        if (this._textGuide) {
            this._textGuide.addSelfToZr(zr);
        }
    };
    Element.prototype.removeSelfFromZr = function (zr) {
        if (!this.__zr) {
            return;
        }
        this.__zr = null;
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.removeAnimator(animators[i]);
            }
        }
        if (this._clipPath) {
            this._clipPath.removeSelfFromZr(zr);
        }
        if (this._textContent) {
            this._textContent.removeSelfFromZr(zr);
        }
        if (this._textGuide) {
            this._textGuide.removeSelfFromZr(zr);
        }
    };
    Element.prototype.animate = function (key, loop, allowDiscreteAnimation) {
        var target = key ? this[key] : this;
        if (false) {}
        var animator = new _animation_Animator_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(target, loop, allowDiscreteAnimation);
        key && (animator.targetName = key);
        this.addAnimator(animator, key);
        return animator;
    };
    Element.prototype.addAnimator = function (animator, key) {
        var zr = this.__zr;
        var el = this;
        animator.during(function () {
            el.updateDuringAnimation(key);
        }).done(function () {
            var animators = el.animators;
            var idx = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(animators, animator);
            if (idx >= 0) {
                animators.splice(idx, 1);
            }
        });
        this.animators.push(animator);
        if (zr) {
            zr.animation.addAnimator(animator);
        }
        zr && zr.wakeUp();
    };
    Element.prototype.updateDuringAnimation = function (key) {
        this.markRedraw();
    };
    Element.prototype.stopAnimation = function (scope, forwardToLast) {
        var animators = this.animators;
        var len = animators.length;
        var leftAnimators = [];
        for (var i = 0; i < len; i++) {
            var animator = animators[i];
            if (!scope || scope === animator.scope) {
                animator.stop(forwardToLast);
            }
            else {
                leftAnimators.push(animator);
            }
        }
        this.animators = leftAnimators;
        return this;
    };
    Element.prototype.animateTo = function (target, cfg, animationProps) {
        animateTo(this, target, cfg, animationProps);
    };
    Element.prototype.animateFrom = function (target, cfg, animationProps) {
        animateTo(this, target, cfg, animationProps, true);
    };
    Element.prototype._transitionState = function (stateName, target, cfg, animationProps) {
        var animators = animateTo(this, target, cfg, animationProps);
        for (var i = 0; i < animators.length; i++) {
            animators[i].__fromStateTransition = stateName;
        }
    };
    Element.prototype.getBoundingRect = function () {
        return null;
    };
    Element.prototype.getPaintRect = function () {
        return null;
    };
    Element.initDefaultProps = (function () {
        var elProto = Element.prototype;
        elProto.type = 'element';
        elProto.name = '';
        elProto.ignore =
            elProto.silent =
                elProto.ignoreHostSilent =
                    elProto.isGroup =
                        elProto.draggable =
                            elProto.dragging =
                                elProto.ignoreClip = false;
        elProto.__inHover = IN_HOVER_LAYER_KIND_NO;
        elProto.__dirty = _graphic_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .REDRAW_BIT */ .M;
        var logs = {};
        function logDeprecatedError(key, xKey, yKey) {
            if (!logs[key + xKey + yKey]) {
                console.warn("DEPRECATED: '" + key + "' has been deprecated. use '" + xKey + "', '" + yKey + "' instead");
                logs[key + xKey + yKey] = true;
            }
        }
        function createLegacyProperty(key, privateKey, xKey, yKey) {
            Object.defineProperty(elProto, key, {
                get: function () {
                    if (false) {}
                    if (!this[privateKey]) {
                        var pos = this[privateKey] = [];
                        enhanceArray(this, pos);
                    }
                    return this[privateKey];
                },
                set: function (pos) {
                    if (false) {}
                    this[xKey] = pos[0];
                    this[yKey] = pos[1];
                    this[privateKey] = pos;
                    enhanceArray(this, pos);
                }
            });
            function enhanceArray(self, pos) {
                Object.defineProperty(pos, 0, {
                    get: function () {
                        return self[xKey];
                    },
                    set: function (val) {
                        self[xKey] = val;
                    }
                });
                Object.defineProperty(pos, 1, {
                    get: function () {
                        return self[yKey];
                    },
                    set: function (val) {
                        self[yKey] = val;
                    }
                });
            }
        }
        if (Object.defineProperty) {
            createLegacyProperty('position', '_legacyPos', 'x', 'y');
            createLegacyProperty('scale', '_legacyScale', 'scaleX', 'scaleY');
            createLegacyProperty('origin', '_legacyOrigin', 'originX', 'originY');
        }
    })();
    return Element;
}());
(0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(Element, _core_Eventful_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A);
(0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(Element, _core_Transformable_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay);
function animateTo(animatable, target, cfg, animationProps, reverse) {
    cfg = cfg || {};
    var animators = [];
    animateToShallow(animatable, '', animatable, target, cfg, animationProps, animators, reverse);
    var finishCount = animators.length;
    var doneHappened = false;
    var cfgDone = cfg.done;
    var cfgAborted = cfg.aborted;
    var doneCb = function () {
        doneHappened = true;
        finishCount--;
        if (finishCount <= 0) {
            doneHappened
                ? (cfgDone && cfgDone())
                : (cfgAborted && cfgAborted());
        }
    };
    var abortedCb = function () {
        finishCount--;
        if (finishCount <= 0) {
            doneHappened
                ? (cfgDone && cfgDone())
                : (cfgAborted && cfgAborted());
        }
    };
    if (!finishCount) {
        cfgDone && cfgDone();
    }
    if (animators.length > 0 && cfg.during) {
        animators[0].during(function (target, percent) {
            cfg.during(percent);
        });
    }
    for (var i = 0; i < animators.length; i++) {
        var animator = animators[i];
        if (doneCb) {
            animator.done(doneCb);
        }
        if (abortedCb) {
            animator.aborted(abortedCb);
        }
        if (cfg.force) {
            animator.duration(cfg.duration);
        }
        animator.start(cfg.easing);
    }
    return animators;
}
function copyArrShallow(source, target, len) {
    for (var i = 0; i < len; i++) {
        source[i] = target[i];
    }
}
function is2DArray(value) {
    return (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(value[0]);
}
function copyValue(target, source, key) {
    if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(source[key])) {
        if (!(0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(target[key])) {
            target[key] = [];
        }
        if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isTypedArray)(source[key])) {
            var len = source[key].length;
            if (target[key].length !== len) {
                target[key] = new (source[key].constructor)(len);
                copyArrShallow(target[key], source[key], len);
            }
        }
        else {
            var sourceArr = source[key];
            var targetArr = target[key];
            var len0 = sourceArr.length;
            if (is2DArray(sourceArr)) {
                var len1 = sourceArr[0].length;
                for (var i = 0; i < len0; i++) {
                    if (!targetArr[i]) {
                        targetArr[i] = Array.prototype.slice.call(sourceArr[i]);
                    }
                    else {
                        copyArrShallow(targetArr[i], sourceArr[i], len1);
                    }
                }
            }
            else {
                copyArrShallow(targetArr, sourceArr, len0);
            }
            targetArr.length = sourceArr.length;
        }
    }
    else {
        target[key] = source[key];
    }
}
function isValueSame(val1, val2) {
    return val1 === val2
        || (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(val1) && (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(val2) && is1DArraySame(val1, val2);
}
function is1DArraySame(arr0, arr1) {
    var len = arr0.length;
    if (len !== arr1.length) {
        return false;
    }
    for (var i = 0; i < len; i++) {
        if (arr0[i] !== arr1[i]) {
            return false;
        }
    }
    return true;
}
function animateToShallow(animatable, topKey, animateObj, target, cfg, animationProps, animators, reverse) {
    var targetKeys = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(target);
    var duration = cfg.duration;
    var delay = cfg.delay;
    var additive = cfg.additive;
    var setToFinal = cfg.setToFinal;
    var animateAll = !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isObject)(animationProps);
    var existsAnimators = animatable.animators;
    var animationKeys = [];
    for (var k = 0; k < targetKeys.length; k++) {
        var innerKey = targetKeys[k];
        var targetVal = target[innerKey];
        if (targetVal != null && animateObj[innerKey] != null
            && (animateAll || animationProps[innerKey])) {
            if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isObject)(targetVal)
                && !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(targetVal)
                && !(0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isGradientObject)(targetVal)) {
                if (topKey) {
                    if (!reverse) {
                        animateObj[innerKey] = targetVal;
                        animatable.updateDuringAnimation(topKey);
                    }
                    continue;
                }
                animateToShallow(animatable, innerKey, animateObj[innerKey], targetVal, cfg, animationProps && animationProps[innerKey], animators, reverse);
            }
            else {
                animationKeys.push(innerKey);
            }
        }
        else if (!reverse) {
            animateObj[innerKey] = targetVal;
            animatable.updateDuringAnimation(topKey);
            animationKeys.push(innerKey);
        }
    }
    var keyLen = animationKeys.length;
    if (!additive && keyLen) {
        for (var i = 0; i < existsAnimators.length; i++) {
            var animator = existsAnimators[i];
            if (animator.targetName === topKey) {
                var allAborted = animator.stopTracks(animationKeys);
                if (allAborted) {
                    var idx = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(existsAnimators, animator);
                    existsAnimators.splice(idx, 1);
                }
            }
        }
    }
    if (!cfg.force) {
        animationKeys = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.filter)(animationKeys, function (key) { return !isValueSame(target[key], animateObj[key]); });
        keyLen = animationKeys.length;
    }
    if (keyLen > 0
        || (cfg.force && !animators.length)) {
        var revertedSource = void 0;
        var reversedTarget = void 0;
        var sourceClone = void 0;
        if (reverse) {
            reversedTarget = {};
            if (setToFinal) {
                revertedSource = {};
            }
            for (var i = 0; i < keyLen; i++) {
                var innerKey = animationKeys[i];
                reversedTarget[innerKey] = animateObj[innerKey];
                if (setToFinal) {
                    revertedSource[innerKey] = target[innerKey];
                }
                else {
                    animateObj[innerKey] = target[innerKey];
                }
            }
        }
        else if (setToFinal) {
            sourceClone = {};
            for (var i = 0; i < keyLen; i++) {
                var innerKey = animationKeys[i];
                sourceClone[innerKey] = (0,_animation_Animator_js__WEBPACK_IMPORTED_MODULE_8__/* .cloneValue */ .F)(animateObj[innerKey]);
                copyValue(animateObj, target, innerKey);
            }
        }
        var animator = new _animation_Animator_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(animateObj, false, false, additive ? (0,_core_util_js__WEBPACK_IMPORTED_MODULE_1__.filter)(existsAnimators, function (animator) { return animator.targetName === topKey; }) : null);
        animator.targetName = topKey;
        if (cfg.scope) {
            animator.scope = cfg.scope;
        }
        if (setToFinal && revertedSource) {
            animator.whenWithKeys(0, revertedSource, animationKeys);
        }
        if (sourceClone) {
            animator.whenWithKeys(0, sourceClone, animationKeys);
        }
        animator.whenWithKeys(duration == null ? 500 : duration, reverse ? reversedTarget : target, animationKeys).delay(delay || 0);
        animatable.addAnimator(animator, topKey);
        animators.push(animator);
    }
}
function shouldUseHoverLayer(el, textContent, nextState, forceUseHoverLayer) {
    return (!((nextState && nextState.hoverLayer) || forceUseHoverLayer)
        || isTextRelatedEl(el)
        || (textContent && isTextRelatedEl(textContent)))
        ? IN_HOVER_LAYER_KIND_NO
        : IN_HOVER_LAYER_KIND_ONLY_STYLE_CHANGE;
}
function isTextRelatedEl(el) {
    return el.type === 'text' || el.type === 'tspan';
}
function canTransition(el, noAnimation, animationCfg) {
    return !noAnimation && !el.__inHover && animationCfg && animationCfg.duration > 0;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Element);


/***/ }),

/***/ 84143:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gs: () => (/* binding */ setPlatformAPI),
/* harmony export */   OH: () => (/* binding */ DEFAULT_FONT),
/* harmony export */   gI: () => (/* binding */ DEFAULT_FONT_SIZE),
/* harmony export */   yh: () => (/* binding */ platformApi),
/* harmony export */   zs: () => (/* binding */ DEFAULT_FONT_FAMILY)
/* harmony export */ });
/* unused harmony export DEFAULT_TEXT_WIDTH_MAP */
var DEFAULT_FONT_SIZE = 12;
var DEFAULT_FONT_FAMILY = 'sans-serif';
var DEFAULT_FONT = DEFAULT_FONT_SIZE + "px " + DEFAULT_FONT_FAMILY;
var OFFSET = 20;
var SCALE = 100;
var defaultWidthMapStr = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function getTextWidthMap(mapStr) {
    var map = {};
    if (typeof JSON === 'undefined') {
        return map;
    }
    for (var i = 0; i < mapStr.length; i++) {
        var char = String.fromCharCode(i + 32);
        var size = (mapStr.charCodeAt(i) - OFFSET) / SCALE;
        map[char] = size;
    }
    return map;
}
var DEFAULT_TEXT_WIDTH_MAP = getTextWidthMap(defaultWidthMapStr);
var platformApi = {
    createCanvas: function () {
        return typeof document !== 'undefined'
            && document.createElement('canvas');
    },
    measureText: (function () {
        var _ctx;
        var _cachedFont;
        return function (text, font) {
            if (!_ctx) {
                var canvas = platformApi.createCanvas();
                _ctx = canvas && canvas.getContext('2d');
            }
            if (_ctx) {
                if (_cachedFont !== font) {
                    _cachedFont = _ctx.font = font || DEFAULT_FONT;
                }
                return _ctx.measureText(text);
            }
            else {
                text = text || '';
                font = font || DEFAULT_FONT;
                var res = /((?:\d+)?\.?\d*)px/.exec(font);
                var fontSize = res && +res[1] || DEFAULT_FONT_SIZE;
                var width = 0;
                if (font.indexOf('mono') >= 0) {
                    width = fontSize * text.length;
                }
                else {
                    for (var i = 0; i < text.length; i++) {
                        var preCalcWidth = DEFAULT_TEXT_WIDTH_MAP[text[i]];
                        width += preCalcWidth == null ? fontSize : (preCalcWidth * fontSize);
                    }
                }
                return { width: width };
            }
        };
    })(),
    loadImage: function (src, onload, onerror) {
        var image = new Image();
        image.onload = onload;
        image.onerror = onerror;
        image.src = src;
        return image;
    },
    getTime: function () {
        return Date.now ? Date.now() : +(new Date());
    }
};
function setPlatformAPI(newPlatformApis) {
    for (var key in platformApi) {
        if (platformApi.hasOwnProperty(key) && newPlatformApis[key]) {
            platformApi[key] = newPlatformApis[key];
        }
    }
}


/***/ }),

/***/ 86001:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42924);
/* harmony import */ var _core_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52812);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _core_Eventful_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34463);
/* harmony import */ var _core_env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23883);





var TOUCH_CLICK_DELAY = 300;
var globalEventSupported = _core_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.domSupported;
var localNativeListenerNames = (function () {
    var mouseHandlerNames = [
        'click', 'dblclick', 'mousewheel', 'wheel', 'mouseout',
        'mouseup', 'mousedown', 'mousemove', 'contextmenu'
    ];
    var touchHandlerNames = [
        'touchstart', 'touchend', 'touchmove'
    ];
    var pointerEventNameMap = {
        pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1
    };
    var pointerHandlerNames = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.map(mouseHandlerNames, function (name) {
        var nm = name.replace('mouse', 'pointer');
        return pointerEventNameMap.hasOwnProperty(nm) ? nm : name;
    });
    return {
        mouse: mouseHandlerNames,
        touch: touchHandlerNames,
        pointer: pointerHandlerNames
    };
})();
var globalNativeListenerNames = {
    mouse: ['mousemove', 'mouseup'],
    pointer: ['pointermove', 'pointerup']
};
var wheelEventSupported = false;
function isPointerFromTouch(event) {
    var pointerType = event.pointerType;
    return pointerType === 'pen' || pointerType === 'touch';
}
function setTouchTimer(scope) {
    scope.touching = true;
    if (scope.touchTimer != null) {
        clearTimeout(scope.touchTimer);
        scope.touchTimer = null;
    }
    scope.touchTimer = setTimeout(function () {
        scope.touching = false;
        scope.touchTimer = null;
    }, 700);
}
function markTouch(event) {
    event && (event.zrByTouch = true);
}
function normalizeGlobalEvent(instance, event) {
    return (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(instance.dom, new FakeGlobalEvent(instance, event), true);
}
function isLocalEl(instance, el) {
    var elTmp = el;
    var isLocal = false;
    while (elTmp && elTmp.nodeType !== 9
        && !(isLocal = elTmp.domBelongToZr
            || (elTmp !== el && elTmp === instance.painterRoot))) {
        elTmp = elTmp.parentNode;
    }
    return isLocal;
}
var FakeGlobalEvent = (function () {
    function FakeGlobalEvent(instance, event) {
        this.stopPropagation = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.noop;
        this.stopImmediatePropagation = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.noop;
        this.preventDefault = _core_util_js__WEBPACK_IMPORTED_MODULE_1__.noop;
        this.type = event.type;
        this.target = this.currentTarget = instance.dom;
        this.pointerType = event.pointerType;
        this.clientX = event.clientX;
        this.clientY = event.clientY;
    }
    return FakeGlobalEvent;
}());
var localDOMHandlers = {
    mousedown: function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        this.__mayPointerCapture = [event.zrX, event.zrY];
        this.trigger('mousedown', event);
    },
    mousemove: function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        var downPoint = this.__mayPointerCapture;
        if (downPoint && (event.zrX !== downPoint[0] || event.zrY !== downPoint[1])) {
            this.__togglePointerCapture(true);
        }
        this.trigger('mousemove', event);
    },
    mouseup: function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        this.__togglePointerCapture(false);
        this.trigger('mouseup', event);
    },
    mouseout: function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        var element = event.toElement || event.relatedTarget;
        if (!isLocalEl(this, element)) {
            if (this.__pointerCapturing) {
                event.zrEventControl = 'no_globalout';
            }
            this.trigger('mouseout', event);
        }
    },
    wheel: function (event) {
        wheelEventSupported = true;
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        this.trigger('mousewheel', event);
    },
    mousewheel: function (event) {
        if (wheelEventSupported) {
            return;
        }
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        this.trigger('mousewheel', event);
    },
    touchstart: function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        markTouch(event);
        this.__lastTouchMoment = new Date();
        this.handler.processGesture(event, 'start');
        localDOMHandlers.mousemove.call(this, event);
        localDOMHandlers.mousedown.call(this, event);
    },
    touchmove: function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        markTouch(event);
        this.handler.processGesture(event, 'change');
        localDOMHandlers.mousemove.call(this, event);
    },
    touchend: function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        markTouch(event);
        this.handler.processGesture(event, 'end');
        localDOMHandlers.mouseup.call(this, event);
        if (+new Date() - (+this.__lastTouchMoment) < TOUCH_CLICK_DELAY) {
            localDOMHandlers.click.call(this, event);
        }
    },
    pointerdown: function (event) {
        localDOMHandlers.mousedown.call(this, event);
    },
    pointermove: function (event) {
        if (!isPointerFromTouch(event)) {
            localDOMHandlers.mousemove.call(this, event);
        }
    },
    pointerup: function (event) {
        localDOMHandlers.mouseup.call(this, event);
    },
    pointerout: function (event) {
        if (!isPointerFromTouch(event)) {
            localDOMHandlers.mouseout.call(this, event);
        }
    }
};
_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(['click', 'dblclick', 'contextmenu'], function (name) {
    localDOMHandlers[name] = function (event) {
        event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeEvent */ .e0)(this.dom, event);
        this.trigger(name, event);
    };
});
var globalDOMHandlers = {
    pointermove: function (event) {
        if (!isPointerFromTouch(event)) {
            globalDOMHandlers.mousemove.call(this, event);
        }
    },
    pointerup: function (event) {
        globalDOMHandlers.mouseup.call(this, event);
    },
    mousemove: function (event) {
        this.trigger('mousemove', event);
    },
    mouseup: function (event) {
        var pointerCaptureReleasing = this.__pointerCapturing;
        this.__togglePointerCapture(false);
        this.trigger('mouseup', event);
        if (pointerCaptureReleasing) {
            event.zrEventControl = 'only_globalout';
            this.trigger('mouseout', event);
        }
    }
};
function mountLocalDOMEventListeners(instance, scope) {
    var domHandlers = scope.domHandlers;
    if (_core_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.pointerEventsSupported) {
        _core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(localNativeListenerNames.pointer, function (nativeEventName) {
            mountSingleDOMEventListener(scope, nativeEventName, function (event) {
                domHandlers[nativeEventName].call(instance, event);
            });
        });
    }
    else {
        if (_core_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.touchEventsSupported) {
            _core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(localNativeListenerNames.touch, function (nativeEventName) {
                mountSingleDOMEventListener(scope, nativeEventName, function (event) {
                    domHandlers[nativeEventName].call(instance, event);
                    setTouchTimer(scope);
                });
            });
        }
        _core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(localNativeListenerNames.mouse, function (nativeEventName) {
            mountSingleDOMEventListener(scope, nativeEventName, function (event) {
                event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .getNativeEvent */ .mK)(event);
                if (!scope.touching) {
                    domHandlers[nativeEventName].call(instance, event);
                }
            });
        });
    }
}
function mountGlobalDOMEventListeners(instance, scope) {
    if (_core_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.pointerEventsSupported) {
        _core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(globalNativeListenerNames.pointer, mount);
    }
    else if (!_core_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.touchEventsSupported) {
        _core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(globalNativeListenerNames.mouse, mount);
    }
    function mount(nativeEventName) {
        function nativeEventListener(event) {
            event = (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .getNativeEvent */ .mK)(event);
            if (!isLocalEl(instance, event.target)) {
                event = normalizeGlobalEvent(instance, event);
                scope.domHandlers[nativeEventName].call(instance, event);
            }
        }
        mountSingleDOMEventListener(scope, nativeEventName, nativeEventListener, { capture: true });
    }
}
function mountSingleDOMEventListener(scope, nativeEventName, listener, opt) {
    scope.mounted[nativeEventName] = listener;
    scope.listenerOpts[nativeEventName] = opt;
    (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .addEventListener */ .q2)(scope.domTarget, nativeEventName, listener, opt);
}
function unmountDOMEventListeners(scope) {
    var mounted = scope.mounted;
    for (var nativeEventName in mounted) {
        if (mounted.hasOwnProperty(nativeEventName)) {
            (0,_core_event_js__WEBPACK_IMPORTED_MODULE_2__/* .removeEventListener */ .f)(scope.domTarget, nativeEventName, mounted[nativeEventName], scope.listenerOpts[nativeEventName]);
        }
    }
    scope.mounted = {};
}
var DOMHandlerScope = (function () {
    function DOMHandlerScope(domTarget, domHandlers) {
        this.mounted = {};
        this.listenerOpts = {};
        this.touching = false;
        this.domTarget = domTarget;
        this.domHandlers = domHandlers;
    }
    return DOMHandlerScope;
}());
var HandlerDomProxy = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__/* .__extends */ .C6)(HandlerDomProxy, _super);
    function HandlerDomProxy(dom, painterRoot) {
        var _this = _super.call(this) || this;
        _this.__pointerCapturing = false;
        _this.dom = dom;
        _this.painterRoot = painterRoot;
        _this._localHandlerScope = new DOMHandlerScope(dom, localDOMHandlers);
        if (globalEventSupported) {
            _this._globalHandlerScope = new DOMHandlerScope(document, globalDOMHandlers);
        }
        mountLocalDOMEventListeners(_this, _this._localHandlerScope);
        return _this;
    }
    HandlerDomProxy.prototype.dispose = function () {
        unmountDOMEventListeners(this._localHandlerScope);
        if (globalEventSupported) {
            unmountDOMEventListeners(this._globalHandlerScope);
        }
    };
    HandlerDomProxy.prototype.setCursor = function (cursorStyle) {
        this.dom.style && (this.dom.style.cursor = cursorStyle || 'default');
    };
    HandlerDomProxy.prototype.__togglePointerCapture = function (isPointerCapturing) {
        this.__mayPointerCapture = null;
        if (globalEventSupported
            && ((+this.__pointerCapturing) ^ (+isPointerCapturing))) {
            this.__pointerCapturing = isPointerCapturing;
            var globalHandlerScope = this._globalHandlerScope;
            isPointerCapturing
                ? mountGlobalDOMEventListeners(this, globalHandlerScope)
                : unmountDOMEventListeners(globalHandlerScope);
        }
    };
    return HandlerDomProxy;
}(_core_Eventful_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandlerDomProxy);


/***/ }),

/***/ 89119:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $s: () => (/* binding */ fromArc),
/* harmony export */   BM: () => (/* binding */ fromCubic),
/* harmony export */   Cr: () => (/* binding */ fromPoints),
/* harmony export */   j6: () => (/* binding */ fromLine),
/* harmony export */   tW: () => (/* binding */ fromQuadratic)
/* harmony export */ });
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2103);
/* harmony import */ var _curve_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44203);


var mathMin = Math.min;
var mathMax = Math.max;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI2 = Math.PI * 2;
var start = _vector_js__WEBPACK_IMPORTED_MODULE_0__.create();
var end = _vector_js__WEBPACK_IMPORTED_MODULE_0__.create();
var extremity = _vector_js__WEBPACK_IMPORTED_MODULE_0__.create();
function fromPoints(points, min, max) {
    if (points.length === 0) {
        return;
    }
    var p = points[0];
    var left = p[0];
    var right = p[0];
    var top = p[1];
    var bottom = p[1];
    for (var i = 1; i < points.length; i++) {
        p = points[i];
        left = mathMin(left, p[0]);
        right = mathMax(right, p[0]);
        top = mathMin(top, p[1]);
        bottom = mathMax(bottom, p[1]);
    }
    min[0] = left;
    min[1] = top;
    max[0] = right;
    max[1] = bottom;
}
function fromLine(x0, y0, x1, y1, min, max) {
    min[0] = mathMin(x0, x1);
    min[1] = mathMin(y0, y1);
    max[0] = mathMax(x0, x1);
    max[1] = mathMax(y0, y1);
}
var xDim = [];
var yDim = [];
function fromCubic(x0, y0, x1, y1, x2, y2, x3, y3, min, max) {
    var cubicExtrema = _curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicExtrema */ .lX;
    var cubicAt = _curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicAt */ .Yb;
    var n = cubicExtrema(x0, x1, x2, x3, xDim);
    min[0] = Infinity;
    min[1] = Infinity;
    max[0] = -Infinity;
    max[1] = -Infinity;
    for (var i = 0; i < n; i++) {
        var x = cubicAt(x0, x1, x2, x3, xDim[i]);
        min[0] = mathMin(x, min[0]);
        max[0] = mathMax(x, max[0]);
    }
    n = cubicExtrema(y0, y1, y2, y3, yDim);
    for (var i = 0; i < n; i++) {
        var y = cubicAt(y0, y1, y2, y3, yDim[i]);
        min[1] = mathMin(y, min[1]);
        max[1] = mathMax(y, max[1]);
    }
    min[0] = mathMin(x0, min[0]);
    max[0] = mathMax(x0, max[0]);
    min[0] = mathMin(x3, min[0]);
    max[0] = mathMax(x3, max[0]);
    min[1] = mathMin(y0, min[1]);
    max[1] = mathMax(y0, max[1]);
    min[1] = mathMin(y3, min[1]);
    max[1] = mathMax(y3, max[1]);
}
function fromQuadratic(x0, y0, x1, y1, x2, y2, min, max) {
    var quadraticExtremum = _curve_js__WEBPACK_IMPORTED_MODULE_1__/* .quadraticExtremum */ .gC;
    var quadraticAt = _curve_js__WEBPACK_IMPORTED_MODULE_1__/* .quadraticAt */ .k3;
    var tx = mathMax(mathMin(quadraticExtremum(x0, x1, x2), 1), 0);
    var ty = mathMax(mathMin(quadraticExtremum(y0, y1, y2), 1), 0);
    var x = quadraticAt(x0, x1, x2, tx);
    var y = quadraticAt(y0, y1, y2, ty);
    min[0] = mathMin(x0, x2, x);
    min[1] = mathMin(y0, y2, y);
    max[0] = mathMax(x0, x2, x);
    max[1] = mathMax(y0, y2, y);
}
function fromArc(x, y, rx, ry, startAngle, endAngle, anticlockwise, min, max) {
    var vec2Min = _vector_js__WEBPACK_IMPORTED_MODULE_0__.min;
    var vec2Max = _vector_js__WEBPACK_IMPORTED_MODULE_0__.max;
    var diff = Math.abs(startAngle - endAngle);
    if (diff % PI2 < 1e-4 && diff > 1e-4) {
        min[0] = x - rx;
        min[1] = y - ry;
        max[0] = x + rx;
        max[1] = y + ry;
        return;
    }
    start[0] = mathCos(startAngle) * rx + x;
    start[1] = mathSin(startAngle) * ry + y;
    end[0] = mathCos(endAngle) * rx + x;
    end[1] = mathSin(endAngle) * ry + y;
    vec2Min(min, start, end);
    vec2Max(max, start, end);
    startAngle = startAngle % (PI2);
    if (startAngle < 0) {
        startAngle = startAngle + PI2;
    }
    endAngle = endAngle % (PI2);
    if (endAngle < 0) {
        endAngle = endAngle + PI2;
    }
    if (startAngle > endAngle && !anticlockwise) {
        endAngle += PI2;
    }
    else if (startAngle < endAngle && anticlockwise) {
        startAngle += PI2;
    }
    if (anticlockwise) {
        var tmp = endAngle;
        endAngle = startAngle;
        startAngle = tmp;
    }
    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
        if (angle > startAngle) {
            extremity[0] = mathCos(angle) * rx + x;
            extremity[1] = mathSin(angle) * ry + y;
            vec2Min(min, extremity, min);
            vec2Max(max, extremity, max);
        }
    }
}


/***/ }),

/***/ 92839:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23883);

var requestAnimationFrame;
requestAnimationFrame = (_core_env_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.hasGlobalWindow
    && ((window.requestAnimationFrame && window.requestAnimationFrame.bind(window))
        || (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window))
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame)) || function (func) {
    return setTimeout(func, 16);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestAnimationFrame);


/***/ }),

/***/ 93257:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _easing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66798);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _cubicEasing_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79566);



var Clip = (function () {
    function Clip(opts) {
        this._inited = false;
        this._startTime = 0;
        this._pausedTime = 0;
        this._paused = false;
        this._life = opts.life || 1000;
        this._delay = opts.delay || 0;
        this.loop = opts.loop || false;
        this.onframe = opts.onframe || _core_util_js__WEBPACK_IMPORTED_MODULE_0__.noop;
        this.ondestroy = opts.ondestroy || _core_util_js__WEBPACK_IMPORTED_MODULE_0__.noop;
        this.onrestart = opts.onrestart || _core_util_js__WEBPACK_IMPORTED_MODULE_0__.noop;
        opts.easing && this.setEasing(opts.easing);
    }
    Clip.prototype.step = function (globalTime, deltaTime) {
        if (!this._inited) {
            this._startTime = globalTime + this._delay;
            this._inited = true;
        }
        if (this._paused) {
            this._pausedTime += deltaTime;
            return;
        }
        var life = this._life;
        var elapsedTime = globalTime - this._startTime - this._pausedTime;
        var percent = elapsedTime / life;
        if (percent < 0) {
            percent = 0;
        }
        percent = Math.min(percent, 1);
        var easingFunc = this.easingFunc;
        var schedule = easingFunc ? easingFunc(percent) : percent;
        this.onframe(schedule);
        if (percent === 1) {
            if (this.loop) {
                var remainder = elapsedTime % life;
                this._startTime = globalTime - remainder;
                this._pausedTime = 0;
                this.onrestart();
            }
            else {
                return true;
            }
        }
        return false;
    };
    Clip.prototype.pause = function () {
        this._paused = true;
    };
    Clip.prototype.resume = function () {
        this._paused = false;
    };
    Clip.prototype.setEasing = function (easing) {
        this.easing = easing;
        this.easingFunc = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(easing)
            ? easing
            : _easing_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A[easing] || (0,_cubicEasing_js__WEBPACK_IMPORTED_MODULE_2__/* .createCubicEasingFunc */ .w)(easing);
    };
    return Clip;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Clip);


/***/ }),

/***/ 97191:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38189);

var PI2 = Math.PI * 2;
function containStroke(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    x -= cx;
    y -= cy;
    var d = Math.sqrt(x * x + y * y);
    if ((d - _l > r) || (d + _l < r)) {
        return false;
    }
    if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
        return true;
    }
    if (anticlockwise) {
        var tmp = startAngle;
        startAngle = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeRadian */ .n)(endAngle);
        endAngle = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeRadian */ .n)(tmp);
    }
    else {
        startAngle = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeRadian */ .n)(startAngle);
        endAngle = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeRadian */ .n)(endAngle);
    }
    if (startAngle > endAngle) {
        endAngle += PI2;
    }
    var angle = Math.atan2(y, x);
    if (angle < 0) {
        angle += PI2;
    }
    return (angle >= startAngle && angle <= endAngle)
        || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
}


/***/ }),

/***/ 97394:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ contain),
/* harmony export */   l: () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45857);
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36763);
/* harmony import */ var _cubic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17017);
/* harmony import */ var _quadratic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(51769);
/* harmony import */ var _arc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(97191);
/* harmony import */ var _core_curve_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44203);
/* harmony import */ var _windingLine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49475);







var CMD = _core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.CMD;
var PI2 = Math.PI * 2;
var EPSILON = 1e-4;
function isAroundEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}
var roots = [-1, -1, -1];
var extrema = [-1, -1];
function swapExtrema() {
    var tmp = extrema[0];
    extrema[0] = extrema[1];
    extrema[1] = tmp;
}
function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
    if ((y > y0 && y > y1 && y > y2 && y > y3)
        || (y < y0 && y < y1 && y < y2 && y < y3)) {
        return 0;
    }
    var nRoots = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicRootAt */ ._E(y0, y1, y2, y3, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var w = 0;
        var nExtrema = -1;
        var y0_ = void 0;
        var y1_ = void 0;
        for (var i = 0; i < nRoots; i++) {
            var t = roots[i];
            var unit = (t === 0 || t === 1) ? 0.5 : 1;
            var x_ = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicAt */ .Yb(x0, x1, x2, x3, t);
            if (x_ < x) {
                continue;
            }
            if (nExtrema < 0) {
                nExtrema = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicExtrema */ .lX(y0, y1, y2, y3, extrema);
                if (extrema[1] < extrema[0] && nExtrema > 1) {
                    swapExtrema();
                }
                y0_ = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicAt */ .Yb(y0, y1, y2, y3, extrema[0]);
                if (nExtrema > 1) {
                    y1_ = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .cubicAt */ .Yb(y0, y1, y2, y3, extrema[1]);
                }
            }
            if (nExtrema === 2) {
                if (t < extrema[0]) {
                    w += y0_ < y0 ? unit : -unit;
                }
                else if (t < extrema[1]) {
                    w += y1_ < y0_ ? unit : -unit;
                }
                else {
                    w += y3 < y1_ ? unit : -unit;
                }
            }
            else {
                if (t < extrema[0]) {
                    w += y0_ < y0 ? unit : -unit;
                }
                else {
                    w += y3 < y0_ ? unit : -unit;
                }
            }
        }
        return w;
    }
}
function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
    if ((y > y0 && y > y1 && y > y2)
        || (y < y0 && y < y1 && y < y2)) {
        return 0;
    }
    var nRoots = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .quadraticRootAt */ .qY(y0, y1, y2, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var t = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .quadraticExtremum */ .gC(y0, y1, y2);
        if (t >= 0 && t <= 1) {
            var w = 0;
            var y_ = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .quadraticAt */ .k3(y0, y1, y2, t);
            for (var i = 0; i < nRoots; i++) {
                var unit = (roots[i] === 0 || roots[i] === 1) ? 0.5 : 1;
                var x_ = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .quadraticAt */ .k3(x0, x1, x2, roots[i]);
                if (x_ < x) {
                    continue;
                }
                if (roots[i] < t) {
                    w += y_ < y0 ? unit : -unit;
                }
                else {
                    w += y2 < y_ ? unit : -unit;
                }
            }
            return w;
        }
        else {
            var unit = (roots[0] === 0 || roots[0] === 1) ? 0.5 : 1;
            var x_ = _core_curve_js__WEBPACK_IMPORTED_MODULE_1__/* .quadraticAt */ .k3(x0, x1, x2, roots[0]);
            if (x_ < x) {
                return 0;
            }
            return y2 < y0 ? unit : -unit;
        }
    }
}
function windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
    y -= cy;
    if (y > r || y < -r) {
        return 0;
    }
    var tmp = Math.sqrt(r * r - y * y);
    roots[0] = -tmp;
    roots[1] = tmp;
    var dTheta = Math.abs(startAngle - endAngle);
    if (dTheta < 1e-4) {
        return 0;
    }
    if (dTheta >= PI2 - 1e-4) {
        startAngle = 0;
        endAngle = PI2;
        var dir = anticlockwise ? 1 : -1;
        if (x >= roots[0] + cx && x <= roots[1] + cx) {
            return dir;
        }
        else {
            return 0;
        }
    }
    if (startAngle > endAngle) {
        var tmp_1 = startAngle;
        startAngle = endAngle;
        endAngle = tmp_1;
    }
    if (startAngle < 0) {
        startAngle += PI2;
        endAngle += PI2;
    }
    var w = 0;
    for (var i = 0; i < 2; i++) {
        var x_ = roots[i];
        if (x_ + cx > x) {
            var angle = Math.atan2(y, x_);
            var dir = anticlockwise ? 1 : -1;
            if (angle < 0) {
                angle = PI2 + angle;
            }
            if ((angle >= startAngle && angle <= endAngle)
                || (angle + PI2 >= startAngle && angle + PI2 <= endAngle)) {
                if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
                    dir = -dir;
                }
                w += dir;
            }
        }
    }
    return w;
}
function containPath(path, lineWidth, isStroke, x, y) {
    var data = path.data;
    var len = path.len();
    var w = 0;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    var x1;
    var y1;
    for (var i = 0; i < len;) {
        var cmd = data[i++];
        var isFirst = i === 1;
        if (cmd === CMD.M && i > 1) {
            if (!isStroke) {
                w += (0,_windingLine_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(xi, yi, x0, y0, x, y);
            }
        }
        if (isFirst) {
            xi = data[i];
            yi = data[i + 1];
            x0 = xi;
            y0 = yi;
        }
        switch (cmd) {
            case CMD.M:
                x0 = data[i++];
                y0 = data[i++];
                xi = x0;
                yi = y0;
                break;
            case CMD.L:
                if (isStroke) {
                    if (_line_js__WEBPACK_IMPORTED_MODULE_3__/* .containStroke */ .l(xi, yi, data[i], data[i + 1], lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += (0,_windingLine_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(xi, yi, data[i], data[i + 1], x, y) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD.C:
                if (isStroke) {
                    if (_cubic_js__WEBPACK_IMPORTED_MODULE_4__/* .containStroke */ .l(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += windingCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD.Q:
                if (isStroke) {
                    if (_quadratic_js__WEBPACK_IMPORTED_MODULE_5__/* .containStroke */ .l(xi, yi, data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += windingQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD.A:
                var cx = data[i++];
                var cy = data[i++];
                var rx = data[i++];
                var ry = data[i++];
                var theta = data[i++];
                var dTheta = data[i++];
                i += 1;
                var anticlockwise = !!(1 - data[i++]);
                x1 = Math.cos(theta) * rx + cx;
                y1 = Math.sin(theta) * ry + cy;
                if (!isFirst) {
                    w += (0,_windingLine_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(xi, yi, x1, y1, x, y);
                }
                else {
                    x0 = x1;
                    y0 = y1;
                }
                var _x = (x - cx) * ry / rx + cx;
                if (isStroke) {
                    if (_arc_js__WEBPACK_IMPORTED_MODULE_6__/* .containStroke */ .l(cx, cy, ry, theta, theta + dTheta, anticlockwise, lineWidth, _x, y)) {
                        return true;
                    }
                }
                else {
                    w += windingArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y);
                }
                xi = Math.cos(theta + dTheta) * rx + cx;
                yi = Math.sin(theta + dTheta) * ry + cy;
                break;
            case CMD.R:
                x0 = xi = data[i++];
                y0 = yi = data[i++];
                var width = data[i++];
                var height = data[i++];
                x1 = x0 + width;
                y1 = y0 + height;
                if (isStroke) {
                    if (_line_js__WEBPACK_IMPORTED_MODULE_3__/* .containStroke */ .l(x0, y0, x1, y0, lineWidth, x, y)
                        || _line_js__WEBPACK_IMPORTED_MODULE_3__/* .containStroke */ .l(x1, y0, x1, y1, lineWidth, x, y)
                        || _line_js__WEBPACK_IMPORTED_MODULE_3__/* .containStroke */ .l(x1, y1, x0, y1, lineWidth, x, y)
                        || _line_js__WEBPACK_IMPORTED_MODULE_3__/* .containStroke */ .l(x0, y1, x0, y0, lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += (0,_windingLine_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(x1, y0, x1, y1, x, y);
                    w += (0,_windingLine_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(x0, y1, x0, y0, x, y);
                }
                break;
            case CMD.Z:
                if (isStroke) {
                    if (_line_js__WEBPACK_IMPORTED_MODULE_3__/* .containStroke */ .l(xi, yi, x0, y0, lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += (0,_windingLine_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(xi, yi, x0, y0, x, y);
                }
                xi = x0;
                yi = y0;
                break;
        }
    }
    if (!isStroke && !isAroundEqual(yi, y0)) {
        w += (0,_windingLine_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(xi, yi, x0, y0, x, y) || 0;
    }
    return w !== 0;
}
function contain(pathProxy, x, y) {
    return containPath(pathProxy, 0, false, x, y);
}
function containStroke(pathProxy, lineWidth, x, y) {
    return containPath(pathProxy, lineWidth, true, x, y);
}


/***/ })

}]);