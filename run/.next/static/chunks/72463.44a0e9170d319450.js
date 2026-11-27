"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[72463],{

/***/ 25609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QK: () => (/* binding */ limitSurfaceAngle),
/* harmony export */   YI: () => (/* binding */ limitTurnAngle),
/* harmony export */   eR: () => (/* binding */ setLabelLineStyle),
/* harmony export */   lB: () => (/* binding */ updateLabelLinePoints),
/* harmony export */   rv: () => (/* binding */ getLabelLineStatesModels)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9342);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12682);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15451);
/* harmony import */ var zrender_lib_core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45857);
/* harmony import */ var zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38189);
/* harmony import */ var zrender_lib_core_curve_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44203);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11916);
/* harmony import */ var zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43041);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2103);
/* harmony import */ var _util_states_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(33955);

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








var PI2 = Math.PI * 2;
var CMD = zrender_lib_core_PathProxy_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.CMD;
var DEFAULT_SEARCH_SPACE = ['top', 'right', 'bottom', 'left'];
function getCandidateAnchor(pos, distance, rect, outPt, outDir) {
  var width = rect.width;
  var height = rect.height;
  switch (pos) {
    case 'top':
      outPt.set(rect.x + width / 2, rect.y - distance);
      outDir.set(0, -1);
      break;
    case 'bottom':
      outPt.set(rect.x + width / 2, rect.y + height + distance);
      outDir.set(0, 1);
      break;
    case 'left':
      outPt.set(rect.x - distance, rect.y + height / 2);
      outDir.set(-1, 0);
      break;
    case 'right':
      outPt.set(rect.x + width + distance, rect.y + height / 2);
      outDir.set(1, 0);
      break;
  }
}
function projectPointToArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y, out) {
  x -= cx;
  y -= cy;
  var d = Math.sqrt(x * x + y * y);
  x /= d;
  y /= d;
  // Intersect point.
  var ox = x * r + cx;
  var oy = y * r + cy;
  if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
    // Is a circle
    out[0] = ox;
    out[1] = oy;
    return d - r;
  }
  if (anticlockwise) {
    var tmp = startAngle;
    startAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(endAngle);
    endAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(tmp);
  } else {
    startAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(startAngle);
    endAngle = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeRadian */ .n)(endAngle);
  }
  if (startAngle > endAngle) {
    endAngle += PI2;
  }
  var angle = Math.atan2(y, x);
  if (angle < 0) {
    angle += PI2;
  }
  if (angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle) {
    // Project point is on the arc.
    out[0] = ox;
    out[1] = oy;
    return d - r;
  }
  var x1 = r * Math.cos(startAngle) + cx;
  var y1 = r * Math.sin(startAngle) + cy;
  var x2 = r * Math.cos(endAngle) + cx;
  var y2 = r * Math.sin(endAngle) + cy;
  var d1 = (x1 - x) * (x1 - x) + (y1 - y) * (y1 - y);
  var d2 = (x2 - x) * (x2 - x) + (y2 - y) * (y2 - y);
  if (d1 < d2) {
    out[0] = x1;
    out[1] = y1;
    return Math.sqrt(d1);
  } else {
    out[0] = x2;
    out[1] = y2;
    return Math.sqrt(d2);
  }
}
function projectPointToLine(x1, y1, x2, y2, x, y, out, limitToEnds) {
  var dx = x - x1;
  var dy = y - y1;
  var dx1 = x2 - x1;
  var dy1 = y2 - y1;
  var lineLen = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  dx1 /= lineLen;
  dy1 /= lineLen;
  // dot product
  var projectedLen = dx * dx1 + dy * dy1;
  var t = projectedLen / lineLen;
  if (limitToEnds) {
    t = Math.min(Math.max(t, 0), 1);
  }
  t *= lineLen;
  var ox = out[0] = x1 + t * dx1;
  var oy = out[1] = y1 + t * dy1;
  return Math.sqrt((ox - x) * (ox - x) + (oy - y) * (oy - y));
}
function projectPointToRect(x1, y1, width, height, x, y, out) {
  if (width < 0) {
    x1 = x1 + width;
    width = -width;
  }
  if (height < 0) {
    y1 = y1 + height;
    height = -height;
  }
  var x2 = x1 + width;
  var y2 = y1 + height;
  var ox = out[0] = Math.min(Math.max(x, x1), x2);
  var oy = out[1] = Math.min(Math.max(y, y1), y2);
  return Math.sqrt((ox - x) * (ox - x) + (oy - y) * (oy - y));
}
var tmpPt = [];
function nearestPointOnRect(pt, rect, out) {
  var dist = projectPointToRect(rect.x, rect.y, rect.width, rect.height, pt.x, pt.y, tmpPt);
  out.set(tmpPt[0], tmpPt[1]);
  return dist;
}
/**
 * Calculate min distance corresponding point.
 * This method won't evaluate if point is in the path.
 */
function nearestPointOnPath(pt, path, out) {
  var xi = 0;
  var yi = 0;
  var x0 = 0;
  var y0 = 0;
  var x1;
  var y1;
  var minDist = Infinity;
  var data = path.data;
  var x = pt.x;
  var y = pt.y;
  for (var i = 0; i < data.length;) {
    var cmd = data[i++];
    if (i === 1) {
      xi = data[i];
      yi = data[i + 1];
      x0 = xi;
      y0 = yi;
    }
    var d = minDist;
    switch (cmd) {
      case CMD.M:
        // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
        // 在 closePath 的时候使用
        x0 = data[i++];
        y0 = data[i++];
        xi = x0;
        yi = y0;
        break;
      case CMD.L:
        d = projectPointToLine(xi, yi, data[i], data[i + 1], x, y, tmpPt, true);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.C:
        d = (0,zrender_lib_core_curve_js__WEBPACK_IMPORTED_MODULE_2__/* .cubicProjectPoint */ .Et)(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y, tmpPt);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.Q:
        d = (0,zrender_lib_core_curve_js__WEBPACK_IMPORTED_MODULE_2__/* .quadraticProjectPoint */ .kh)(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y, tmpPt);
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD.A:
        // TODO Arc 判断的开销比较大
        var cx = data[i++];
        var cy = data[i++];
        var rx = data[i++];
        var ry = data[i++];
        var theta = data[i++];
        var dTheta = data[i++];
        // TODO Arc 旋转
        i += 1;
        var anticlockwise = !!(1 - data[i++]);
        x1 = Math.cos(theta) * rx + cx;
        y1 = Math.sin(theta) * ry + cy;
        // 不是直接使用 arc 命令
        if (i <= 1) {
          // 第一个命令起点还未定义
          x0 = x1;
          y0 = y1;
        }
        // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
        var _x = (x - cx) * ry / rx + cx;
        d = projectPointToArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y, tmpPt);
        xi = Math.cos(theta + dTheta) * rx + cx;
        yi = Math.sin(theta + dTheta) * ry + cy;
        break;
      case CMD.R:
        x0 = xi = data[i++];
        y0 = yi = data[i++];
        var width = data[i++];
        var height = data[i++];
        d = projectPointToRect(x0, y0, width, height, x, y, tmpPt);
        break;
      case CMD.Z:
        d = projectPointToLine(xi, yi, x0, y0, x, y, tmpPt, true);
        xi = x0;
        yi = y0;
        break;
    }
    if (d < minDist) {
      minDist = d;
      out.set(tmpPt[0], tmpPt[1]);
    }
  }
  return minDist;
}
// Temporal variable for intermediate usage.
var pt0 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var pt1 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var pt2 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var dir = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
var dir2 = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
/**
 * Calculate a proper guide line based on the label position and graphic element definition
 * @param label
 * @param labelRect
 * @param target
 * @param targetRect
 */
function updateLabelLinePoints(target, labelLineModel) {
  if (!target) {
    return;
  }
  var labelLine = target.getTextGuideLine();
  var label = target.getTextContent();
  // Needs to create text guide in each charts.
  if (!(label && labelLine)) {
    return;
  }
  var labelGuideConfig = target.textGuideLineConfig || {};
  var points = [[0, 0], [0, 0], [0, 0]];
  var searchSpace = labelGuideConfig.candidates || DEFAULT_SEARCH_SPACE;
  var labelRect = label.getBoundingRect().clone();
  labelRect.applyTransform(label.getComputedTransform());
  var minDist = Infinity;
  var anchorPoint = labelGuideConfig.anchor;
  var targetTransform = target.getComputedTransform();
  var targetInversedTransform = targetTransform && (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.invert)([], targetTransform);
  var len = labelLineModel.get('length2') || 0;
  if (anchorPoint) {
    pt2.copy(anchorPoint);
  }
  for (var i = 0; i < searchSpace.length; i++) {
    var candidate = searchSpace[i];
    getCandidateAnchor(candidate, 0, labelRect, pt0, dir);
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.scaleAndAdd(pt1, pt0, dir, len);
    // Transform to target coord space.
    pt1.transform(targetInversedTransform);
    // Note: getBoundingRect will ensure the `path` being created.
    var boundingRect = target.getBoundingRect();
    var dist = anchorPoint ? anchorPoint.distance(pt1) : target instanceof _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay ? nearestPointOnPath(pt1, target.path, pt2) : nearestPointOnRect(pt1, boundingRect, pt2);
    // TODO pt2 is in the path
    if (dist < minDist) {
      minDist = dist;
      // Transform back to global space.
      pt1.transform(targetTransform);
      pt2.transform(targetTransform);
      pt2.toArray(points[0]);
      pt1.toArray(points[1]);
      pt0.toArray(points[2]);
    }
  }
  limitTurnAngle(points, labelLineModel.get('minTurnAngle'));
  labelLine.setShape({
    points: points
  });
}
// Temporal variable for the limitTurnAngle function
var tmpArr = [];
var tmpProjPoint = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
/**
 * Reduce the line segment attached to the label to limit the turn angle between two segments.
 * @param linePoints
 * @param minTurnAngle Radian of minimum turn angle. 0 - 180
 */
function limitTurnAngle(linePoints, minTurnAngle) {
  if (!(minTurnAngle <= 180 && minTurnAngle > 0)) {
    return;
  }
  minTurnAngle = minTurnAngle / 180 * Math.PI;
  // The line points can be
  //      /pt1----pt2 (label)
  //     /
  // pt0/
  pt0.fromArray(linePoints[0]);
  pt1.fromArray(linePoints[1]);
  pt2.fromArray(linePoints[2]);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir, pt0, pt1);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir2, pt2, pt1);
  var len1 = dir.len();
  var len2 = dir2.len();
  if (len1 < 1e-3 || len2 < 1e-3) {
    return;
  }
  dir.scale(1 / len1);
  dir2.scale(1 / len2);
  var angleCos = dir.dot(dir2);
  var minTurnAngleCos = Math.cos(minTurnAngle);
  if (minTurnAngleCos < angleCos) {
    // Smaller than minTurnAngle
    // Calculate project point of pt0 on pt1-pt2
    var d = projectPointToLine(pt1.x, pt1.y, pt2.x, pt2.y, pt0.x, pt0.y, tmpArr, false);
    tmpProjPoint.fromArray(tmpArr);
    // Calculate new projected length with limited minTurnAngle and get the new connect point
    tmpProjPoint.scaleAndAdd(dir2, d / Math.tan(Math.PI - minTurnAngle));
    // Limit the new calculated connect point between pt1 and pt2.
    var t = pt2.x !== pt1.x ? (tmpProjPoint.x - pt1.x) / (pt2.x - pt1.x) : (tmpProjPoint.y - pt1.y) / (pt2.y - pt1.y);
    if (isNaN(t)) {
      return;
    }
    if (t < 0) {
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt1);
    } else if (t > 1) {
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt2);
    }
    tmpProjPoint.toArray(linePoints[1]);
  }
}
/**
 * Limit the angle of line and the surface
 * @param maxSurfaceAngle Radian of minimum turn angle. 0 - 180. 0 is same direction to normal. 180 is opposite
 */
function limitSurfaceAngle(linePoints, surfaceNormal, maxSurfaceAngle) {
  if (!(maxSurfaceAngle <= 180 && maxSurfaceAngle > 0)) {
    return;
  }
  maxSurfaceAngle = maxSurfaceAngle / 180 * Math.PI;
  pt0.fromArray(linePoints[0]);
  pt1.fromArray(linePoints[1]);
  pt2.fromArray(linePoints[2]);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir, pt1, pt0);
  _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.sub(dir2, pt2, pt1);
  var len1 = dir.len();
  var len2 = dir2.len();
  if (len1 < 1e-3 || len2 < 1e-3) {
    return;
  }
  dir.scale(1 / len1);
  dir2.scale(1 / len2);
  var angleCos = dir.dot(surfaceNormal);
  var maxSurfaceAngleCos = Math.cos(maxSurfaceAngle);
  if (angleCos < maxSurfaceAngleCos) {
    // Calculate project point of pt0 on pt1-pt2
    var d = projectPointToLine(pt1.x, pt1.y, pt2.x, pt2.y, pt0.x, pt0.y, tmpArr, false);
    tmpProjPoint.fromArray(tmpArr);
    var HALF_PI = Math.PI / 2;
    var angle2 = Math.acos(dir2.dot(surfaceNormal));
    var newAngle = HALF_PI + angle2 - maxSurfaceAngle;
    if (newAngle >= HALF_PI) {
      // parallel
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt2);
    } else {
      // Calculate new projected length with limited minTurnAngle and get the new connect point
      tmpProjPoint.scaleAndAdd(dir2, d / Math.tan(Math.PI / 2 - newAngle));
      // Limit the new calculated connect point between pt1 and pt2.
      var t = pt2.x !== pt1.x ? (tmpProjPoint.x - pt1.x) / (pt2.x - pt1.x) : (tmpProjPoint.y - pt1.y) / (pt2.y - pt1.y);
      if (isNaN(t)) {
        return;
      }
      if (t < 0) {
        _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt1);
      } else if (t > 1) {
        _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.copy(tmpProjPoint, pt2);
      }
    }
    tmpProjPoint.toArray(linePoints[1]);
  }
}
function setLabelLineState(labelLine, ignore, stateName, stateModel) {
  var isNormal = stateName === 'normal';
  var stateObj = isNormal ? labelLine : labelLine.ensureState(stateName);
  // Make sure display.
  stateObj.ignore = ignore;
  // Set smooth
  var smooth = stateModel.get('smooth');
  smooth = smooth === true ? 0.3 : Math.max(+smooth, 0) || 0;
  stateObj.shape = stateObj.shape || {};
  // always set the `smooth` property
  stateObj.shape.smooth = smooth;
  var styleObj = stateModel.getModel('lineStyle').getLineStyle();
  isNormal ? labelLine.useStyle(styleObj) : stateObj.style = styleObj;
}
function buildLabelLinePath(path, shape) {
  var smooth = shape.smooth;
  var points = shape.points;
  if (!points) {
    return;
  }
  path.moveTo(points[0][0], points[0][1]);
  if (smooth > 0 && points.length >= 3) {
    var len1 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__.dist(points[0], points[1]);
    var len2 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__.dist(points[1], points[2]);
    if (!len1 || !len2) {
      path.lineTo(points[1][0], points[1][1]);
      path.lineTo(points[2][0], points[2][1]);
      return;
    }
    var moveLen = Math.min(len1, len2) * smooth;
    var midPoint0 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__.lerp([], points[1], points[0], moveLen / len1);
    var midPoint2 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__.lerp([], points[1], points[2], moveLen / len2);
    var midPoint1 = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__.lerp([], midPoint0, midPoint2, 0.5);
    path.bezierCurveTo(midPoint0[0], midPoint0[1], midPoint0[0], midPoint0[1], midPoint1[0], midPoint1[1]);
    path.bezierCurveTo(midPoint2[0], midPoint2[1], midPoint2[0], midPoint2[1], points[2][0], points[2][1]);
  } else {
    for (var i = 1; i < points.length; i++) {
      path.lineTo(points[i][0], points[i][1]);
    }
  }
}
/**
 * Create a label line if necessary and set it's style.
 */
function setLabelLineStyle(targetEl, statesModels, defaultStyle) {
  var labelLine = targetEl.getTextGuideLine();
  var label = targetEl.getTextContent();
  if (!label) {
    // Not show label line if there is no label.
    if (labelLine) {
      targetEl.removeTextGuideLine();
    }
    return;
  }
  var normalModel = statesModels.normal;
  var showNormal = normalModel.get('show');
  var labelIgnoreNormal = label.ignore;
  for (var i = 0; i < _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .DISPLAY_STATES */ .wV.length; i++) {
    var stateName = _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .DISPLAY_STATES */ .wV[i];
    var stateModel = statesModels[stateName];
    var isNormal = stateName === 'normal';
    if (stateModel) {
      var stateShow = stateModel.get('show');
      var isLabelIgnored = isNormal ? labelIgnoreNormal : (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__.retrieve2)(label.states[stateName] && label.states[stateName].ignore, labelIgnoreNormal);
      if (isLabelIgnored // Not show when label is not shown in this state.
      || !(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__.retrieve2)(stateShow, showNormal) // Use normal state by default if not set.
      ) {
        var stateObj = isNormal ? labelLine : labelLine && labelLine.states[stateName];
        if (stateObj) {
          stateObj.ignore = true;
        }
        if (!!labelLine) {
          setLabelLineState(labelLine, true, stateName, stateModel);
        }
        continue;
      }
      // Create labelLine if not exists
      if (!labelLine) {
        labelLine = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A();
        targetEl.setTextGuideLine(labelLine);
        // Reset state of normal because it's new created.
        // NOTE: NORMAL should always been the first!
        if (!isNormal && (labelIgnoreNormal || !showNormal)) {
          setLabelLineState(labelLine, true, 'normal', statesModels.normal);
        }
        // Use same state proxy.
        if (targetEl.stateProxy) {
          labelLine.stateProxy = targetEl.stateProxy;
        }
      }
      setLabelLineState(labelLine, false, stateName, stateModel);
    }
  }
  if (labelLine) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__.defaults)(labelLine.style, defaultStyle);
    // Not fill.
    labelLine.style.fill = null;
    var showAbove = normalModel.get('showAbove');
    var labelLineConfig = targetEl.textGuideLineConfig = targetEl.textGuideLineConfig || {};
    labelLineConfig.showAbove = showAbove || false;
    // Custom the buildPath.
    labelLine.buildPath = buildLabelLinePath;
  }
}
function getLabelLineStatesModels(itemModel, labelLineName) {
  labelLineName = labelLineName || 'labelLine';
  var statesModels = {
    normal: itemModel.getModel(labelLineName)
  };
  for (var i = 0; i < _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .SPECIAL_STATES */ .BV.length; i++) {
    var stateName = _util_states_js__WEBPACK_IMPORTED_MODULE_7__/* .SPECIAL_STATES */ .BV[i];
    statesModels[stateName] = itemModel.getModel([stateName, labelLineName]);
  }
  return statesModels;
}

/***/ }),

/***/ 69720:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ getCoordSysInfoBySeries)
/* harmony export */ });
/* unused harmony export SeriesModelCoordSysInfo */
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11138);

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
/**
 * Helper for model references.
 * There are many manners to refer axis/coordSys.
 */
// TODO
// merge relevant logic to this file?
// check: "modelHelper" of tooltip and "BrushTargetManager".


/**
 * @class
 * For example:
 * {
 *     coordSysName: 'cartesian2d',
 *     coordSysDims: ['x', 'y', ...],
 *     axisMap: HashMap({
 *         x: xAxisModel,
 *         y: yAxisModel
 *     }),
 *     categoryAxisMap: HashMap({
 *         x: xAxisModel,
 *         y: undefined
 *     }),
 *     // The index of the first category axis in `coordSysDims`.
 *     // `null/undefined` means no category axis exists.
 *     firstCategoryDimIndex: 1,
 *     // To replace user specified encode.
 * }
 */
var SeriesModelCoordSysInfo = /** @class */function () {
  function SeriesModelCoordSysInfo(coordSysName) {
    this.coordSysDims = [];
    this.axisMap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
    this.categoryAxisMap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
    this.coordSysName = coordSysName;
  }
  return SeriesModelCoordSysInfo;
}();

function getCoordSysInfoBySeries(seriesModel) {
  var coordSysName = seriesModel.get('coordinateSystem');
  var result = new SeriesModelCoordSysInfo(coordSysName);
  var fetch = fetchers[coordSysName];
  if (fetch) {
    fetch(seriesModel, result, result.axisMap, result.categoryAxisMap);
    return result;
  }
}
// TODO: refactor them to static member of each coord sys, rather than hard code here.
var fetchers = {
  cartesian2d: function (seriesModel, result, axisMap, categoryAxisMap) {
    var xAxisModel = seriesModel.getReferringComponents('xAxis', _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .SINGLE_REFERRING */ .US).models[0];
    var yAxisModel = seriesModel.getReferringComponents('yAxis', _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .SINGLE_REFERRING */ .US).models[0];
    if (false) {}
    result.coordSysDims = ['x', 'y'];
    axisMap.set('x', xAxisModel);
    axisMap.set('y', yAxisModel);
    if (isCategory(xAxisModel)) {
      categoryAxisMap.set('x', xAxisModel);
      result.firstCategoryDimIndex = 0;
    }
    if (isCategory(yAxisModel)) {
      categoryAxisMap.set('y', yAxisModel);
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
    }
  },
  singleAxis: function (seriesModel, result, axisMap, categoryAxisMap) {
    var singleAxisModel = seriesModel.getReferringComponents('singleAxis', _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .SINGLE_REFERRING */ .US).models[0];
    if (false) {}
    result.coordSysDims = ['single'];
    axisMap.set('single', singleAxisModel);
    if (isCategory(singleAxisModel)) {
      categoryAxisMap.set('single', singleAxisModel);
      result.firstCategoryDimIndex = 0;
    }
  },
  polar: function (seriesModel, result, axisMap, categoryAxisMap) {
    var polarModel = seriesModel.getReferringComponents('polar', _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .SINGLE_REFERRING */ .US).models[0];
    var radiusAxisModel = polarModel.findAxisModel('radiusAxis');
    var angleAxisModel = polarModel.findAxisModel('angleAxis');
    if (false) {}
    result.coordSysDims = ['radius', 'angle'];
    axisMap.set('radius', radiusAxisModel);
    axisMap.set('angle', angleAxisModel);
    if (isCategory(radiusAxisModel)) {
      categoryAxisMap.set('radius', radiusAxisModel);
      result.firstCategoryDimIndex = 0;
    }
    if (isCategory(angleAxisModel)) {
      categoryAxisMap.set('angle', angleAxisModel);
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
    }
  },
  geo: function (seriesModel, result, axisMap, categoryAxisMap) {
    result.coordSysDims = ['lng', 'lat'];
  },
  parallel: function (seriesModel, result, axisMap, categoryAxisMap) {
    var ecModel = seriesModel.ecModel;
    var parallelModel = ecModel.getComponent('parallel', seriesModel.get('parallelIndex'));
    var coordSysDims = result.coordSysDims = parallelModel.dimensions.slice();
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(parallelModel.parallelAxisIndex, function (axisIndex, index) {
      var axisModel = ecModel.getComponent('parallelAxis', axisIndex);
      var axisDim = coordSysDims[index];
      axisMap.set(axisDim, axisModel);
      if (isCategory(axisModel)) {
        categoryAxisMap.set(axisDim, axisModel);
        if (result.firstCategoryDimIndex == null) {
          result.firstCategoryDimIndex = index;
        }
      }
    });
  },
  matrix: function (seriesModel, result, axisMap, categoryAxisMap) {
    var matrixModel = seriesModel.getReferringComponents('matrix', _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .SINGLE_REFERRING */ .US).models[0];
    if (false) {}
    result.coordSysDims = ['x', 'y'];
    var xModel = matrixModel.getDimensionModel('x');
    var yModel = matrixModel.getDimensionModel('y');
    axisMap.set('x', xModel);
    axisMap.set('y', yModel);
    categoryAxisMap.set('x', xModel);
    categoryAxisMap.set('y', yModel);
  }
};
function isCategory(axisModel) {
  return axisModel.get('type') === 'category';
}

/***/ }),

/***/ 80543:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _data_SeriesData_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(30796);
/* harmony import */ var _data_helper_createDimensions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50915);
/* harmony import */ var _data_helper_dimensionHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70514);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11138);
/* harmony import */ var _core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18807);
/* harmony import */ var _model_referHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69720);
/* harmony import */ var _data_Source_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18640);
/* harmony import */ var _data_helper_dataStackHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(50358);
/* harmony import */ var _data_helper_sourceHelper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2199);
/* harmony import */ var _util_types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66402);

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











function getCoordSysDimDefs(seriesModel, coordSysInfo) {
  var coordSysName = seriesModel.get('coordinateSystem');
  var registeredCoordSys = _core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.get(coordSysName);
  var coordSysDimDefs;
  if (coordSysInfo && coordSysInfo.coordSysDims) {
    coordSysDimDefs = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map(coordSysInfo.coordSysDims, function (dim) {
      var dimInfo = {
        name: dim
      };
      var axisModel = coordSysInfo.axisMap.get(dim);
      if (axisModel) {
        var axisType = axisModel.get('type');
        dimInfo.type = (0,_data_helper_dimensionHelper_js__WEBPACK_IMPORTED_MODULE_2__/* .getDimensionTypeByAxis */ .B)(axisType);
      }
      return dimInfo;
    });
  }
  if (!coordSysDimDefs) {
    // Get dimensions from registered coordinate system
    coordSysDimDefs = registeredCoordSys && (registeredCoordSys.getDimensionsInfo ? registeredCoordSys.getDimensionsInfo() : registeredCoordSys.dimensions.slice()) || ['x', 'y'];
  }
  return coordSysDimDefs;
}
function injectOrdinalMeta(dimInfoList, createInvertedIndices, coordSysInfo) {
  var firstCategoryDimIndex;
  var hasNameEncode;
  coordSysInfo && zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(dimInfoList, function (dimInfo, dimIndex) {
    var coordDim = dimInfo.coordDim;
    var categoryAxisModel = coordSysInfo.categoryAxisMap.get(coordDim);
    if (categoryAxisModel) {
      if (firstCategoryDimIndex == null) {
        firstCategoryDimIndex = dimIndex;
      }
      dimInfo.ordinalMeta = categoryAxisModel.getOrdinalMeta();
      if (createInvertedIndices) {
        dimInfo.createInvertedIndices = true;
      }
    }
    if (dimInfo.otherDims.itemName != null) {
      hasNameEncode = true;
    }
  });
  if (!hasNameEncode && firstCategoryDimIndex != null) {
    dimInfoList[firstCategoryDimIndex].otherDims.itemName = 0;
  }
  return firstCategoryDimIndex;
}
/**
 * Caution: there are side effects to `sourceManager` in this method.
 * Should better only be called in `Series['getInitialData']`.
 */
function createSeriesData(sourceRaw, seriesModel, opt) {
  opt = opt || {};
  var sourceManager = seriesModel.getSourceManager();
  var source;
  var isOriginalSource = false;
  if (sourceRaw) {
    isOriginalSource = true;
    source = (0,_data_Source_js__WEBPACK_IMPORTED_MODULE_3__/* .createSourceFromSeriesDataOption */ .AF)(sourceRaw);
  } else {
    source = sourceManager.getSource();
    // Is series.data. not dataset.
    isOriginalSource = source.sourceFormat === _util_types_js__WEBPACK_IMPORTED_MODULE_4__/* .SOURCE_FORMAT_ORIGINAL */ .mK;
  }
  var coordSysInfo = (0,_model_referHelper_js__WEBPACK_IMPORTED_MODULE_5__/* .getCoordSysInfoBySeries */ .X)(seriesModel);
  var coordSysDimDefs = getCoordSysDimDefs(seriesModel, coordSysInfo);
  var useEncodeDefaulter = opt.useEncodeDefaulter;
  var encodeDefaulter = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(useEncodeDefaulter) ? useEncodeDefaulter : useEncodeDefaulter ? zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.curry(_data_helper_sourceHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .makeSeriesEncodeForAxisCoordSys */ .OC, coordSysDimDefs, seriesModel) : null;
  var createDimensionOptions = {
    coordDimensions: coordSysDimDefs,
    generateCoord: opt.generateCoord,
    encodeDefine: seriesModel.getEncode(),
    encodeDefaulter: encodeDefaulter,
    canOmitUnusedDimensions: !isOriginalSource
  };
  var schema = (0,_data_helper_createDimensions_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(source, createDimensionOptions);
  var firstCategoryDimIndex = injectOrdinalMeta(schema.dimensions, opt.createInvertedIndices, coordSysInfo);
  var store = !isOriginalSource ? sourceManager.getSharedDataStore(schema) : null;
  var stackCalculationInfo = (0,_data_helper_dataStackHelper_js__WEBPACK_IMPORTED_MODULE_8__/* .enableDataStack */ .iJ)(seriesModel, {
    schema: schema,
    store: store
  });
  var data = new _data_SeriesData_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(schema, seriesModel);
  data.setCalculationInfo(stackCalculationInfo);
  var dimValueGetter = firstCategoryDimIndex != null && isNeedCompleteOrdinalData(source)
  /**
   * This serves this case:
   *  var echarts_option = {
   *      xAxis: { data: ['a', 'b', 'c'] },
   *      yAxis: {}
   *      series: { data: [555, 666, 777] }
   *  };
   * The `series.data` is completed to:
   *  [[0, 555], [1, 666], [2, 777]]
   */ ? function (itemOpt, dimName, dataIndex, dimIndex) {
    // Use dataIndex as ordinal value in categoryAxis
    return dimIndex === firstCategoryDimIndex ? dataIndex : this.defaultDimValueGetter(itemOpt, dimName, dataIndex, dimIndex);
  } : null;
  data.hasItemOption = false;
  data.initData(
  // Try to reuse the data store in sourceManager if using dataset.
  isOriginalSource ? source : store, null, dimValueGetter);
  return data;
}
function isNeedCompleteOrdinalData(source) {
  if (source.sourceFormat === _util_types_js__WEBPACK_IMPORTED_MODULE_4__/* .SOURCE_FORMAT_ORIGINAL */ .mK) {
    var sampleItem = firstDataNotNull(source.data || []);
    return !zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArray((0,_util_model_js__WEBPACK_IMPORTED_MODULE_10__/* .getDataItemValue */ .vj)(sampleItem));
  }
}
function firstDataNotNull(arr) {
  var i = 0;
  while (i < arr.length && arr[i] == null) {
    i++;
  }
  return arr[i];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSeriesData);

/***/ })

}]);