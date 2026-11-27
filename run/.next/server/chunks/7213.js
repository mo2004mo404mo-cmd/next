"use strict";
exports.id = 7213;
exports.ids = [7213];
exports.modules = {

/***/ 16855:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B8: () => (/* reexport safe */ _data_SeriesData_js__WEBPACK_IMPORTED_MODULE_16__.A),
/* harmony export */   F_: () => (/* reexport module object */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   GP: () => (/* reexport module object */ _api_format_js__WEBPACK_IMPORTED_MODULE_13__),
/* harmony export */   Gs: () => (/* reexport safe */ zrender_lib_core_platform_js__WEBPACK_IMPORTED_MODULE_8__.Gs),
/* harmony export */   Kx: () => (/* reexport safe */ _model_Model_js__WEBPACK_IMPORTED_MODULE_17__.A),
/* harmony export */   NA: () => (/* binding */ extendSeriesModel),
/* harmony export */   NO: () => (/* binding */ extendComponentView),
/* harmony export */   OZ: () => (/* reexport safe */ _view_Chart_js__WEBPACK_IMPORTED_MODULE_22__.A),
/* harmony export */   UP: () => (/* reexport module object */ zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   UU: () => (/* reexport safe */ zrender_lib_canvas_graphic_js__WEBPACK_IMPORTED_MODULE_23__.Xi),
/* harmony export */   Yx: () => (/* reexport safe */ _extension_js__WEBPACK_IMPORTED_MODULE_7__.Y),
/* harmony export */   ZS: () => (/* reexport module object */ _api_util_js__WEBPACK_IMPORTED_MODULE_14__),
/* harmony export */   _0: () => (/* reexport safe */ _coord_Axis_js__WEBPACK_IMPORTED_MODULE_18__.A),
/* harmony export */   _K: () => (/* reexport safe */ zrender_lib_core_env_js__WEBPACK_IMPORTED_MODULE_15__.A),
/* harmony export */   ai: () => (/* reexport module object */ _api_number_js__WEBPACK_IMPORTED_MODULE_10__),
/* harmony export */   bR: () => (/* reexport safe */ _view_Component_js__WEBPACK_IMPORTED_MODULE_20__.A),
/* harmony export */   dw: () => (/* reexport module object */ _api_helper_js__WEBPACK_IMPORTED_MODULE_6__),
/* harmony export */   fA: () => (/* reexport module object */ _api_graphic_js__WEBPACK_IMPORTED_MODULE_12__),
/* harmony export */   i1: () => (/* reexport module object */ zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   jT: () => (/* reexport safe */ _model_Component_js__WEBPACK_IMPORTED_MODULE_19__.A),
/* harmony export */   kB: () => (/* reexport module object */ _api_time_js__WEBPACK_IMPORTED_MODULE_11__),
/* harmony export */   l3: () => (/* reexport safe */ _coord_geo_parseGeoJson_js__WEBPACK_IMPORTED_MODULE_9__.A),
/* harmony export */   nF: () => (/* reexport safe */ _util_throttle_js__WEBPACK_IMPORTED_MODULE_5__.nF),
/* harmony export */   nd: () => (/* reexport module object */ zrender_lib_zrender_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   rP: () => (/* reexport safe */ _model_Series_js__WEBPACK_IMPORTED_MODULE_21__.A),
/* harmony export */   rt: () => (/* binding */ extendComponentModel),
/* harmony export */   yW: () => (/* reexport module object */ zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   yX: () => (/* binding */ extendChartView),
/* harmony export */   zI: () => (/* reexport safe */ _coord_geo_parseGeoJson_js__WEBPACK_IMPORTED_MODULE_9__.A)
/* harmony export */ });
/* harmony import */ var _model_Component_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(918685);
/* harmony import */ var _view_Component_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(977971);
/* harmony import */ var _model_Series_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(464617);
/* harmony import */ var _view_Chart_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(768216);
/* harmony import */ var _data_SeriesData_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(407956);
/* harmony import */ var zrender_lib_zrender_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(200082);
/* harmony import */ var zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(730329);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(516507);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(274756);
/* harmony import */ var zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14148);
/* harmony import */ var _util_throttle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(501825);
/* harmony import */ var _api_helper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(138806);
/* harmony import */ var _extension_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(330629);
/* harmony import */ var zrender_lib_core_platform_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(139183);
/* harmony import */ var _coord_geo_parseGeoJson_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(338928);
/* harmony import */ var _api_number_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(181215);
/* harmony import */ var _api_time_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(861731);
/* harmony import */ var _api_graphic_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(916900);
/* harmony import */ var _api_format_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(930009);
/* harmony import */ var _api_util_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(827234);
/* harmony import */ var zrender_lib_core_env_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(213625);
/* harmony import */ var _model_Model_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(932919);
/* harmony import */ var _coord_Axis_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(864417);
/* harmony import */ var zrender_lib_canvas_graphic_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(673561);

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
// These APIs are for more advanced usages
// For example extend charts and components, creating graphic elements, formatting.




















// --------------------- Helper Methods ---------------------













// --------------------- Export for Extension Usage ---------------------
// export {SeriesData};
 // TODO: Compatitable with exists echarts-gl code



// Only for GL

// --------------------- Deprecated Extension Methods ---------------------
// Should use `ComponentModel.extend` or `class XXXX extend ComponentModel` to create class.
// Then use `registerComponentModel` in `install` parameter when `use` this extension. For example:
// class Bar3DModel extends ComponentModel {}
// export function install(registers) { registers.registerComponentModel(Bar3DModel); }
// echarts.use(install);
function extendComponentModel(proto) {
  var Model = _model_Component_js__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A.extend(proto);
  _model_Component_js__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A.registerClass(Model);
  return Model;
}
function extendComponentView(proto) {
  var View = _view_Component_js__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A.extend(proto);
  _view_Component_js__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A.registerClass(View);
  return View;
}
function extendSeriesModel(proto) {
  var Model = _model_Series_js__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A.extend(proto);
  _model_Series_js__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A.registerClass(Model);
  return Model;
}
function extendChartView(proto) {
  var View = _view_Chart_js__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A.extend(proto);
  _view_Chart_js__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A.registerClass(View);
  return View;
}

/***/ }),

/***/ 138806:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDimensions: () => (/* reexport safe */ _data_helper_createDimensions_js__WEBPACK_IMPORTED_MODULE_2__.M),
/* harmony export */   createList: () => (/* binding */ createList),
/* harmony export */   createScale: () => (/* binding */ createScale),
/* harmony export */   createSymbol: () => (/* reexport safe */ _util_symbol_js__WEBPACK_IMPORTED_MODULE_4__.v5),
/* harmony export */   createTextStyle: () => (/* binding */ createTextStyle),
/* harmony export */   dataStack: () => (/* binding */ dataStack),
/* harmony export */   enableHoverEmphasis: () => (/* reexport safe */ _util_states_js__WEBPACK_IMPORTED_MODULE_11__.iJ),
/* harmony export */   getECData: () => (/* reexport safe */ _util_innerStore_js__WEBPACK_IMPORTED_MODULE_10__.z),
/* harmony export */   getLayoutRect: () => (/* reexport safe */ _util_layout_js__WEBPACK_IMPORTED_MODULE_1__.dV),
/* harmony export */   mixinAxisModelCommonMethods: () => (/* binding */ mixinAxisModelCommonMethods)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(274756);
/* harmony import */ var _chart_helper_createSeriesData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(595007);
/* harmony import */ var _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(431621);
/* harmony import */ var _coord_axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(164448);
/* harmony import */ var _model_Model_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(932919);
/* harmony import */ var _util_layout_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(203935);
/* harmony import */ var _data_helper_dataStackHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(991358);
/* harmony import */ var _util_innerStore_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(652672);
/* harmony import */ var _label_labelStyle_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(841750);
/* harmony import */ var _coord_axisNiceTicks_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16836);
/* harmony import */ var _data_helper_createDimensions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(678441);
/* harmony import */ var _util_symbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(834373);
/* harmony import */ var _util_states_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(299559);

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
 * This module exposes helper functions for developing extensions.
 */


// import createGraphFromNodeEdge from './chart/helper/createGraphFromNodeEdge.js';








/**
 * Create a multi dimension List structure from seriesModel.
 */
function createList(seriesModel) {
  return (0,_chart_helper_createSeriesData_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(null, seriesModel);
}
// export function createGraph(seriesModel) {
//     let nodes = seriesModel.get('data');
//     let links = seriesModel.get('links');
//     return createGraphFromNodeEdge(nodes, links, seriesModel);
// }


var dataStack = {
  isDimensionStacked: _data_helper_dataStackHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .isDimensionStacked */ .sJ,
  enableDataStack: _data_helper_dataStackHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .enableDataStack */ .iJ,
  getStackedDimension: _data_helper_dataStackHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .getStackedDimension */ .me
};
/**
 * Create a symbol element with given symbol configuration: shape, x, y, width, height, color
 * @param {string} symbolDesc
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {string} color
 */

/**
 * Externally used by echarts-gl.
 * Create scale
 * @param dataExtent
 * @param option If `option.type`
 *        is specified, it can only be `'value'` currently.
 */
function createScale(dataExtent, option) {
  var axisModel = option;
  if (!(option instanceof _model_Model_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)) {
    axisModel = new _model_Model_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(option);
    // FIXME
    // Currently AxisModelCommonMixin has nothing to do with the
    // the requirements of `axisHelper.createScaleByModel`. For
    // example the methods `getCategories` and `getOrdinalMeta`
    // are required for `'category'` axis, and ecModel is required
    // for `'time'` axis. But occasionally echarts-gl happened
    // to only use `'value'` axis.
    // zrUtil.mixin(axisModel, AxisModelCommonMixin);
  }
  var axisType = _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .determineAxisType */ .J5(axisModel);
  var scale = _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .createScaleByModel */ .f$(axisModel, axisType, false);
  if (dataExtent[1] < dataExtent[0]) {
    dataExtent = dataExtent.slice().reverse();
  }
  (0,_coord_axisNiceTicks_js__WEBPACK_IMPORTED_MODULE_7__/* .scaleCalcNice2 */ .NY)(scale, axisModel, null, null, dataExtent);
  return scale;
}
/**
 * Mixin common methods to axis model
 */
function mixinAxisModelCommonMethods(Model) {
  zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_8__.mixin(Model, _coord_axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_9__/* .AxisModelCommonMixin */ .L);
}


function createTextStyle(textStyleModel, opts) {
  opts = opts || {};
  return (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_12__/* .createTextStyle */ .VB)(textStyleModel, null, null, opts.state !== 'normal');
}

/***/ }),

/***/ 181215:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_SAFE_INTEGER: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.Is),
/* harmony export */   asc: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.Y6),
/* harmony export */   getPercentWithPrecision: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.wp),
/* harmony export */   getPixelPrecision: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.hb),
/* harmony export */   getPrecision: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.XV),
/* harmony export */   getPrecisionSafe: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.y6),
/* harmony export */   isNumeric: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.kf),
/* harmony export */   isRadianAroundZero: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.dh),
/* harmony export */   linearMap: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.Cb),
/* harmony export */   nice: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.Cm),
/* harmony export */   numericToNumber: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.Sm),
/* harmony export */   parseDate: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__._U),
/* harmony export */   parsePercent: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.lo),
/* harmony export */   quantile: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.YV),
/* harmony export */   quantity: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.au),
/* harmony export */   quantityExponent: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.NX),
/* harmony export */   reformIntervals: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.sL),
/* harmony export */   remRadian: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__._7),
/* harmony export */   round: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__.eq)
/* harmony export */ });
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(449020);

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

/***/ 241664:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(304942);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(381220);
/* harmony import */ var _util_innerStore_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(652672);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(449020);
/* harmony import */ var zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(226042);
/* harmony import */ var _labelGuideHelper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(341855);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(607868);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(274756);
/* harmony import */ var _labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(788257);
/* harmony import */ var _labelStyle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(841750);
/* harmony import */ var zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(811275);

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
// TODO: move labels out of viewport.










function cloneArr(points) {
  if (points) {
    var newPoints = [];
    for (var i = 0; i < points.length; i++) {
      newPoints.push(points[i].slice());
    }
    return newPoints;
  }
}
function prepareLayoutCallbackParams(labelItem, hostEl) {
  var label = labelItem.label;
  var labelLine = hostEl && hostEl.getTextGuideLine();
  return {
    dataIndex: labelItem.dataIndex,
    dataType: labelItem.dataType,
    seriesIndex: labelItem.seriesModel.seriesIndex,
    text: labelItem.label.style.text,
    rect: labelItem.hostRect,
    labelRect: labelItem.rect,
    // x: labelAttr.x,
    // y: labelAttr.y,
    align: label.style.align,
    verticalAlign: label.style.verticalAlign,
    labelLinePoints: cloneArr(labelLine && labelLine.shape.points)
  };
}
var LABEL_OPTION_TO_STYLE_KEYS = ['align', 'verticalAlign', 'width', 'height', 'fontSize'];
var dummyTransformable = new zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay();
var labelLayoutInnerStore = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .makeInner */ .$r)();
var labelLineAnimationStore = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .makeInner */ .$r)();
function extendWithKeys(target, source, keys) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (source[key] != null) {
      target[key] = source[key];
    }
  }
}
var LABEL_LAYOUT_PROPS = ['x', 'y', 'rotation'];
var LabelManager = /** @class */function () {
  function LabelManager() {
    this._labelList = [];
    this._chartViewList = [];
  }
  LabelManager.prototype.clearLabels = function () {
    this._labelList = [];
    this._chartViewList = [];
  };
  /**
   * Add label to manager
   */
  LabelManager.prototype._addLabel = function (dataIndex, dataType, seriesModel, label, layoutOptionOrCb) {
    var labelStyle = label.style;
    var hostEl = label.__hostTarget;
    var textConfig = hostEl.textConfig || {};
    // TODO: If label is in other state.
    var labelTransform = label.getComputedTransform();
    var labelRect = label.getBoundingRect().plain();
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.applyTransform(labelRect, labelRect, labelTransform);
    if (labelTransform) {
      dummyTransformable.setLocalTransform(labelTransform);
    } else {
      // Identity transform.
      dummyTransformable.x = dummyTransformable.y = dummyTransformable.rotation = dummyTransformable.originX = dummyTransformable.originY = 0;
      dummyTransformable.scaleX = dummyTransformable.scaleY = 1;
    }
    dummyTransformable.rotation = (0,zrender_lib_contain_util_js__WEBPACK_IMPORTED_MODULE_3__/* .normalizeRadian */ .n)(dummyTransformable.rotation);
    var host = label.__hostTarget;
    var hostRect;
    if (host) {
      hostRect = host.getBoundingRect().plain();
      var transform = host.getComputedTransform();
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.applyTransform(hostRect, hostRect, transform);
    }
    var labelGuide = hostRect && host.getTextGuideLine();
    this._labelList.push({
      label: label,
      labelLine: labelGuide,
      seriesModel: seriesModel,
      dataIndex: dataIndex,
      dataType: dataType,
      layoutOptionOrCb: layoutOptionOrCb,
      layoutOption: null,
      rect: labelRect,
      hostRect: hostRect,
      // Label with lower priority will be hidden when overlapped
      // Use rect size as default priority
      priority: hostRect ? hostRect.width * hostRect.height : 0,
      // Save default label attributes.
      // For restore if developers want get back to default value in callback.
      defaultAttr: {
        ignore: label.ignore,
        labelGuideIgnore: labelGuide && labelGuide.ignore,
        x: dummyTransformable.x,
        y: dummyTransformable.y,
        scaleX: dummyTransformable.scaleX,
        scaleY: dummyTransformable.scaleY,
        rotation: dummyTransformable.rotation,
        style: {
          x: labelStyle.x,
          y: labelStyle.y,
          align: labelStyle.align,
          verticalAlign: labelStyle.verticalAlign,
          width: labelStyle.width,
          height: labelStyle.height,
          fontSize: labelStyle.fontSize
        },
        cursor: label.cursor,
        attachedPos: textConfig.position,
        attachedRot: textConfig.rotation
      }
    });
  };
  LabelManager.prototype.addLabelsOfSeries = function (chartView) {
    var _this = this;
    this._chartViewList.push(chartView);
    var seriesModel = chartView.__model;
    var layoutOption = seriesModel.get('labelLayout');
    /**
     * Ignore layouting if it's not specified anything.
     */
    if (!((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.isFunction)(layoutOption) || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.keys)(layoutOption).length)) {
      return;
    }
    chartView.group.traverse(function (child) {
      if (child.ignore) {
        return true; // Stop traverse descendants.
      }
      // Only support label being hosted on graphic elements.
      var textEl = child.getTextContent();
      var ecData = (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_5__/* .getECData */ .z)(child);
      // Can only attach the text on the element with dataIndex
      if (textEl && !textEl.disableLabelLayout) {
        _this._addLabel(ecData.dataIndex, ecData.dataType, seriesModel, textEl, layoutOption);
      }
    });
  };
  LabelManager.prototype.updateLayoutConfig = function (api) {
    var width = api.getWidth();
    var height = api.getHeight();
    function createDragHandler(el, labelLineModel) {
      return function () {
        (0,_labelGuideHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .updateLabelLinePoints */ .lB)(el, labelLineModel);
      };
    }
    for (var i = 0; i < this._labelList.length; i++) {
      var labelItem = this._labelList[i];
      var label = labelItem.label;
      var hostEl = label.__hostTarget;
      var defaultLabelAttr = labelItem.defaultAttr;
      var layoutOption = void 0;
      // TODO A global layout option?
      if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.isFunction)(labelItem.layoutOptionOrCb)) {
        layoutOption = labelItem.layoutOptionOrCb(prepareLayoutCallbackParams(labelItem, hostEl));
      } else {
        layoutOption = labelItem.layoutOptionOrCb;
      }
      layoutOption = layoutOption || {};
      labelItem.layoutOption = layoutOption;
      var degreeToRadian = Math.PI / 180;
      // TODO hostEl should always exists.
      // Or label should not have parent because the x, y is all in global space.
      if (hostEl) {
        hostEl.setTextConfig({
          // Force to set local false.
          local: false,
          // Ignore position and rotation config on the host el if x or y is changed.
          position: layoutOption.x != null || layoutOption.y != null ? null : defaultLabelAttr.attachedPos,
          // Ignore rotation config on the host el if rotation is changed.
          rotation: layoutOption.rotate != null ? layoutOption.rotate * degreeToRadian : defaultLabelAttr.attachedRot,
          offset: [layoutOption.dx || 0, layoutOption.dy || 0]
        });
      }
      var needsUpdateLabelLine = false;
      if (layoutOption.x != null) {
        // TODO width of chart view.
        label.x = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .parsePercent */ .lo)(layoutOption.x, width);
        label.setStyle('x', 0); // Ignore movement in style. TODO: origin.
        needsUpdateLabelLine = true;
      } else {
        label.x = defaultLabelAttr.x;
        label.setStyle('x', defaultLabelAttr.style.x);
      }
      if (layoutOption.y != null) {
        // TODO height of chart view.
        label.y = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .parsePercent */ .lo)(layoutOption.y, height);
        label.setStyle('y', 0); // Ignore movement in style.
        needsUpdateLabelLine = true;
      } else {
        label.y = defaultLabelAttr.y;
        label.setStyle('y', defaultLabelAttr.style.y);
      }
      if (layoutOption.labelLinePoints) {
        var guideLine = hostEl.getTextGuideLine();
        if (guideLine) {
          guideLine.setShape({
            points: layoutOption.labelLinePoints
          });
          // Not update
          needsUpdateLabelLine = false;
        }
      }
      var labelLayoutStore = labelLayoutInnerStore(label);
      labelLayoutStore.needsUpdateLabelLine = needsUpdateLabelLine;
      label.rotation = layoutOption.rotate != null ? layoutOption.rotate * degreeToRadian : defaultLabelAttr.rotation;
      label.scaleX = defaultLabelAttr.scaleX;
      label.scaleY = defaultLabelAttr.scaleY;
      for (var k = 0; k < LABEL_OPTION_TO_STYLE_KEYS.length; k++) {
        var key = LABEL_OPTION_TO_STYLE_KEYS[k];
        label.setStyle(key, layoutOption[key] != null ? layoutOption[key] : defaultLabelAttr.style[key]);
      }
      if (layoutOption.draggable) {
        label.draggable = true;
        label.cursor = 'move';
        if (hostEl) {
          var hostModel = labelItem.seriesModel;
          if (labelItem.dataIndex != null) {
            var data = labelItem.seriesModel.getData(labelItem.dataType);
            hostModel = data.getItemModel(labelItem.dataIndex);
          }
          label.on('drag', createDragHandler(hostEl, hostModel.getModel('labelLine')));
        }
      } else {
        // TODO Other drag functions?
        label.off('drag');
        label.cursor = defaultLabelAttr.cursor;
      }
    }
  };
  LabelManager.prototype.layout = function (api) {
    var width = api.getWidth();
    var height = api.getHeight();
    var labelList = [];
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each)(this._labelList, function (inputItem) {
      if (!inputItem.defaultAttr.ignore) {
        labelList.push((0,_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_8__/* .newLabelLayoutWithGeometry */ .PG)({}, inputItem));
      }
    });
    var labelsNeedsAdjustOnX = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.filter)(labelList, function (item) {
      return item.layoutOption.moveOverlap === 'shiftX';
    });
    var labelsNeedsAdjustOnY = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.filter)(labelList, function (item) {
      return item.layoutOption.moveOverlap === 'shiftY';
    });
    (0,_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_8__/* .shiftLayoutOnXY */ .Zv)(labelsNeedsAdjustOnX, 0, 0, width);
    (0,_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_8__/* .shiftLayoutOnXY */ .Zv)(labelsNeedsAdjustOnY, 1, 0, height);
    var labelsNeedsHideOverlap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.filter)(labelList, function (item) {
      return item.layoutOption.hideOverlap;
    });
    (0,_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_8__/* .restoreIgnore */ .vS)(labelsNeedsHideOverlap);
    (0,_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_8__/* .hideOverlap */ .If)(labelsNeedsHideOverlap);
  };
  /**
   * Process all labels. Not only labels with layoutOption.
   */
  LabelManager.prototype.processLabelsOverall = function () {
    var _this = this;
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each)(this._chartViewList, function (chartView) {
      var seriesModel = chartView.__model;
      var ignoreLabelLineUpdate = chartView.ignoreLabelLineUpdate;
      var animationEnabled = seriesModel.isAnimationEnabled();
      chartView.group.traverse(function (child) {
        if (child.ignore && !child.forceLabelAnimation) {
          return true; // Stop traverse descendants.
        }
        var needsUpdateLabelLine = !ignoreLabelLineUpdate;
        var label = child.getTextContent();
        if (!needsUpdateLabelLine && label) {
          needsUpdateLabelLine = labelLayoutInnerStore(label).needsUpdateLabelLine;
        }
        if (needsUpdateLabelLine) {
          _this._updateLabelLine(child, seriesModel);
        }
        if (animationEnabled) {
          _this._animateLabels(child, seriesModel);
        }
      });
    });
  };
  LabelManager.prototype._updateLabelLine = function (el, seriesModel) {
    // Only support label being hosted on graphic elements.
    var textEl = el.getTextContent();
    // Update label line style.
    var ecData = (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_5__/* .getECData */ .z)(el);
    var dataIndex = ecData.dataIndex;
    // Only support labelLine on the labels represent data.
    if (textEl && dataIndex != null) {
      var data = seriesModel.getData(ecData.dataType);
      var itemModel = data.getItemModel(dataIndex);
      var defaultStyle = {};
      var visualStyle = data.getItemVisual(dataIndex, 'style');
      if (visualStyle) {
        var visualType = data.getVisual('drawType');
        // Default to be same with main color
        defaultStyle.stroke = visualStyle[visualType];
      }
      var labelLineModel = itemModel.getModel('labelLine');
      (0,_labelGuideHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .setLabelLineStyle */ .eR)(el, (0,_labelGuideHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .getLabelLineStatesModels */ .rv)(itemModel), defaultStyle);
      (0,_labelGuideHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .updateLabelLinePoints */ .lB)(el, labelLineModel);
    }
  };
  LabelManager.prototype._animateLabels = function (el, seriesModel) {
    var textEl = el.getTextContent();
    var guideLine = el.getTextGuideLine();
    // Animate
    if (textEl
    // `forceLabelAnimation` has the highest priority
    && (el.forceLabelAnimation || !textEl.ignore && !textEl.invisible && !el.disableLabelAnimation && !(0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* .isElementRemoved */ .LR)(el))) {
      var layoutStore = labelLayoutInnerStore(textEl);
      var oldLayout = layoutStore.oldLayout;
      var ecData = (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_5__/* .getECData */ .z)(el);
      var dataIndex = ecData.dataIndex;
      var newProps = {
        x: textEl.x,
        y: textEl.y,
        rotation: textEl.rotation
      };
      var data = seriesModel.getData(ecData.dataType);
      if (!oldLayout) {
        textEl.attr(newProps);
        // Disable fade in animation if value animation is enabled.
        if (!(0,_labelStyle_js__WEBPACK_IMPORTED_MODULE_10__/* .labelInner */ .Lu)(textEl).valueAnimation) {
          var oldOpacity = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.retrieve2)(textEl.style.opacity, 1);
          // Fade in animation
          textEl.style.opacity = 0;
          (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* .initProps */ .LW)(textEl, {
            style: {
              opacity: oldOpacity
            }
          }, seriesModel, dataIndex);
        }
      } else {
        textEl.attr(oldLayout);
        // Make sure the animation from is in the right status.
        var prevStates = el.prevStates;
        if (prevStates) {
          if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.indexOf)(prevStates, 'select') >= 0) {
            textEl.attr(layoutStore.oldLayoutSelect);
          }
          if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.indexOf)(prevStates, 'emphasis') >= 0) {
            textEl.attr(layoutStore.oldLayoutEmphasis);
          }
        }
        (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* .updateProps */ .oi)(textEl, newProps, seriesModel, dataIndex);
      }
      layoutStore.oldLayout = newProps;
      if (textEl.states.select) {
        var layoutSelect = layoutStore.oldLayoutSelect = {};
        extendWithKeys(layoutSelect, newProps, LABEL_LAYOUT_PROPS);
        extendWithKeys(layoutSelect, textEl.states.select, LABEL_LAYOUT_PROPS);
      }
      if (textEl.states.emphasis) {
        var layoutEmphasis = layoutStore.oldLayoutEmphasis = {};
        extendWithKeys(layoutEmphasis, newProps, LABEL_LAYOUT_PROPS);
        extendWithKeys(layoutEmphasis, textEl.states.emphasis, LABEL_LAYOUT_PROPS);
      }
      (0,_labelStyle_js__WEBPACK_IMPORTED_MODULE_10__/* .animateLabelValue */ .xb)(textEl, dataIndex, data, seriesModel, seriesModel);
    }
    if (guideLine && !guideLine.ignore && !guideLine.invisible) {
      var layoutStore = labelLineAnimationStore(guideLine);
      var oldLayout = layoutStore.oldLayout;
      var newLayout = {
        points: guideLine.shape.points
      };
      if (!oldLayout) {
        guideLine.setShape(newLayout);
        guideLine.style.strokePercent = 0;
        (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* .initProps */ .LW)(guideLine, {
          style: {
            strokePercent: 1
          }
        }, seriesModel);
      } else {
        guideLine.attr({
          shape: oldLayout
        });
        (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* .updateProps */ .oi)(guideLine, {
          shape: newLayout
        }, seriesModel);
      }
      layoutStore.oldLayout = newLayout;
    }
  };
  return LabelManager;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LabelManager);

/***/ }),

/***/ 347213:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Axis: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__._0),
/* harmony export */   ChartView: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.OZ),
/* harmony export */   ComponentModel: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.jT),
/* harmony export */   ComponentView: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.bR),
/* harmony export */   List: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.B8),
/* harmony export */   Model: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Kx),
/* harmony export */   PRIORITY: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.FQ),
/* harmony export */   SeriesModel: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.rP),
/* harmony export */   color: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.yW),
/* harmony export */   connect: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Ng),
/* harmony export */   dataTool: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.p5),
/* harmony export */   dependencies: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.El),
/* harmony export */   disConnect: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.zm),
/* harmony export */   disconnect: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Zf),
/* harmony export */   dispose: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.AS),
/* harmony export */   env: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__._K),
/* harmony export */   extendChartView: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.yX),
/* harmony export */   extendComponentModel: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.rt),
/* harmony export */   extendComponentView: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.NO),
/* harmony export */   extendSeriesModel: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.NA),
/* harmony export */   format: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.GP),
/* harmony export */   getCoordinateSystemDimensions: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Bo),
/* harmony export */   getInstanceByDom: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.FP),
/* harmony export */   getInstanceById: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.aQ),
/* harmony export */   getMap: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.ZB),
/* harmony export */   graphic: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.fA),
/* harmony export */   helper: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.dw),
/* harmony export */   init: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Ts),
/* harmony export */   innerDrawElementOnCanvas: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.UU),
/* harmony export */   matrix: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.UP),
/* harmony export */   number: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.ai),
/* harmony export */   parseGeoJSON: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.l3),
/* harmony export */   parseGeoJson: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.zI),
/* harmony export */   registerAction: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.OH),
/* harmony export */   registerCoordinateSystem: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.pX),
/* harmony export */   registerCustomSeries: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.mx),
/* harmony export */   registerLayout: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Oh),
/* harmony export */   registerLoading: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Ej),
/* harmony export */   registerLocale: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.E),
/* harmony export */   registerMap: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.mz),
/* harmony export */   registerPostInit: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.cf),
/* harmony export */   registerPostUpdate: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.tb),
/* harmony export */   registerPreprocessor: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.lP),
/* harmony export */   registerProcessor: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.qg),
/* harmony export */   registerTheme: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.bf),
/* harmony export */   registerTransform: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.iY),
/* harmony export */   registerUpdateLifecycle: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.xV),
/* harmony export */   registerVisual: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.AF),
/* harmony export */   setCanvasCreator: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.vV),
/* harmony export */   setPlatformAPI: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Gs),
/* harmony export */   throttle: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.nF),
/* harmony export */   time: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.kB),
/* harmony export */   use: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.Yx),
/* harmony export */   util: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.ZS),
/* harmony export */   vector: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.i1),
/* harmony export */   version: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.rE),
/* harmony export */   zrUtil: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.F_),
/* harmony export */   zrender: () => (/* reexport safe */ _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__.nd)
/* harmony export */ });
/* harmony import */ var _lib_export_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(589680);
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

/***/ 382188:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ installLabelLayout)
/* harmony export */ });
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(607868);
/* harmony import */ var _LabelManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(241664);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(274756);

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



var getLabelManager = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_0__/* .makeInner */ .$r)();
function installLabelLayout(registers) {
  registers.registerUpdateLifecycle('series:beforeupdate', function (ecModel, api, params) {
    // TODO api provide an namespace that can save stuff per instance
    var labelManager = getLabelManager(api).labelManager;
    if (!labelManager) {
      labelManager = getLabelManager(api).labelManager = new _LabelManager_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
    }
    labelManager.clearLabels();
  });
  registers.registerUpdateLifecycle('series:layoutlabels', function (ecModel, api, params) {
    var labelManager = getLabelManager(api).labelManager;
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)(params.updatedSeries, function (series) {
      labelManager.addLabelsOfSeries(api.getViewOfSeriesModel(series));
    });
    labelManager.updateLayoutConfig(api);
    labelManager.layout(api);
    labelManager.processLabelsOverall();
  });
}

/***/ }),

/***/ 441343:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ getTextRect)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(687368);

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

function getTextRect(text, font, align, verticalAlign, padding, rich, truncate, lineHeight) {
  var textEl = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay({
    style: {
      text: text,
      font: font,
      align: align,
      verticalAlign: verticalAlign,
      padding: padding,
      rich: rich,
      overflow: truncate ? 'truncate' : null,
      lineHeight: lineHeight
    }
  });
  return textEl.getBoundingRect();
}

/***/ }),

/***/ 589680:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AF: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.AF),
/* harmony export */   AS: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.AS),
/* harmony export */   B8: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.B8),
/* harmony export */   Bo: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.Bo),
/* harmony export */   E: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.E),
/* harmony export */   Ej: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.Ej),
/* harmony export */   El: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.El),
/* harmony export */   FP: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.FP),
/* harmony export */   FQ: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.FQ),
/* harmony export */   F_: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.F_),
/* harmony export */   GP: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.GP),
/* harmony export */   Gs: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.Gs),
/* harmony export */   Kx: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.Kx),
/* harmony export */   NA: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.NA),
/* harmony export */   NO: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.NO),
/* harmony export */   Ng: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.Ng),
/* harmony export */   OH: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.OH),
/* harmony export */   OZ: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.OZ),
/* harmony export */   Oh: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.Oh),
/* harmony export */   Ts: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.Ts),
/* harmony export */   UP: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.UP),
/* harmony export */   UU: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.UU),
/* harmony export */   Yx: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.Yx),
/* harmony export */   ZB: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.ZB),
/* harmony export */   ZS: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.ZS),
/* harmony export */   Zf: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.Zf),
/* harmony export */   _0: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__._0),
/* harmony export */   _K: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__._K),
/* harmony export */   aQ: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.aQ),
/* harmony export */   ai: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.ai),
/* harmony export */   bR: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.bR),
/* harmony export */   bf: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.bf),
/* harmony export */   cf: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.cf),
/* harmony export */   dw: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.dw),
/* harmony export */   fA: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.fA),
/* harmony export */   i1: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.i1),
/* harmony export */   iY: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.iY),
/* harmony export */   jT: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.jT),
/* harmony export */   kB: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.kB),
/* harmony export */   l3: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.l3),
/* harmony export */   lP: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.lP),
/* harmony export */   mx: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.mx),
/* harmony export */   mz: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.mz),
/* harmony export */   nF: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.nF),
/* harmony export */   nd: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.nd),
/* harmony export */   p5: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.p5),
/* harmony export */   pX: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.pX),
/* harmony export */   qg: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.qg),
/* harmony export */   rE: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.rE),
/* harmony export */   rP: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.rP),
/* harmony export */   rt: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.rt),
/* harmony export */   tb: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.tb),
/* harmony export */   vV: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.vV),
/* harmony export */   xV: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.xV),
/* harmony export */   yW: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.yW),
/* harmony export */   yX: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.yX),
/* harmony export */   zI: () => (/* reexport safe */ _api_js__WEBPACK_IMPORTED_MODULE_1__.zI),
/* harmony export */   zm: () => (/* reexport safe */ _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__.zm)
/* harmony export */ });
/* harmony import */ var _core_echarts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(617740);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16855);
/* harmony import */ var _extension_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(330629);
/* harmony import */ var _label_installLabelLayout_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(382188);

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
// Core API from echarts/src/echarts



// Import label layout by default.
// TODO will be treeshaked.

(0,_extension_js__WEBPACK_IMPORTED_MODULE_2__/* .use */ .Y)(_label_installLabelLayout_js__WEBPACK_IMPORTED_MODULE_3__/* .installLabelLayout */ ._);

/***/ }),

/***/ 827234:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.bind),
/* harmony export */   clone: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.clone),
/* harmony export */   curry: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.curry),
/* harmony export */   defaults: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults),
/* harmony export */   each: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each),
/* harmony export */   extend: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend),
/* harmony export */   filter: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.filter),
/* harmony export */   indexOf: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.indexOf),
/* harmony export */   inherits: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.inherits),
/* harmony export */   isArray: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArray),
/* harmony export */   isFunction: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isFunction),
/* harmony export */   isObject: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject),
/* harmony export */   isString: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString),
/* harmony export */   map: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map),
/* harmony export */   merge: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.merge),
/* harmony export */   reduce: () => (/* reexport safe */ zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.reduce)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(274756);

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

/***/ 861731:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: () => (/* reexport safe */ _util_time_js__WEBPACK_IMPORTED_MODULE_1__.GP),
/* harmony export */   parse: () => (/* reexport safe */ _util_number_js__WEBPACK_IMPORTED_MODULE_0__._U),
/* harmony export */   roundTime: () => (/* reexport safe */ _util_time_js__WEBPACK_IMPORTED_MODULE_1__._l)
/* harmony export */ });
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(449020);
/* harmony import */ var _util_time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(678824);

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

/***/ 916900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Arc: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_14__.A),
/* harmony export */   BezierCurve: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_13__.A),
/* harmony export */   BoundingRect: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_19__.Ay),
/* harmony export */   Circle: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.A),
/* harmony export */   CompoundPath: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_16__.A),
/* harmony export */   Ellipse: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__.A),
/* harmony export */   Group: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__.A),
/* harmony export */   Image: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__.Ay),
/* harmony export */   IncrementalDisplayable: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_15__.A),
/* harmony export */   Line: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_12__.A),
/* harmony export */   LinearGradient: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.A),
/* harmony export */   Polygon: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__.A),
/* harmony export */   Polyline: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_10__.A),
/* harmony export */   RadialGradient: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_18__.A),
/* harmony export */   Rect: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_11__.A),
/* harmony export */   Ring: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_8__.A),
/* harmony export */   Sector: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__.A),
/* harmony export */   Text: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__.Ay),
/* harmony export */   clipPointsByRect: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.clipPointsByRect),
/* harmony export */   clipRectByRect: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.clipRectByRect),
/* harmony export */   createIcon: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.createIcon),
/* harmony export */   extendPath: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.extendPath),
/* harmony export */   extendShape: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.extendShape),
/* harmony export */   getShapeClass: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.getShapeClass),
/* harmony export */   getTransform: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.getTransform),
/* harmony export */   initProps: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__.LW),
/* harmony export */   makeImage: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.makeImage),
/* harmony export */   makePath: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.makePath),
/* harmony export */   mergePath: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.mergePath),
/* harmony export */   registerShape: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.registerShape),
/* harmony export */   resizePath: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.resizePath),
/* harmony export */   updateProps: () => (/* reexport safe */ _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__.oi)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(287577);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(381220);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(473716);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(383102);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(687368);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(367093);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(935459);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(299359);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(959947);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(670775);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(191641);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(449939);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(633531);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(264247);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(352201);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(75753);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(277533);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(833282);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(814304);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(304942);

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

/***/ 930009:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCommas: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_0__.ob),
/* harmony export */   capitalFirst: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_0__.x5),
/* harmony export */   encodeHTML: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_1__.Me),
/* harmony export */   formatTime: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_0__.fU),
/* harmony export */   formatTpl: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_0__.YK),
/* harmony export */   getTextRect: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_3__.k),
/* harmony export */   getTooltipMarker: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_0__.qg),
/* harmony export */   normalizeCssArray: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_0__.QX),
/* harmony export */   toCamelCase: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_0__.Cb),
/* harmony export */   truncateText: () => (/* reexport safe */ _util_format_js__WEBPACK_IMPORTED_MODULE_2__.EJ)
/* harmony export */ });
/* harmony import */ var _util_format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(541134);
/* harmony import */ var _util_format_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(209934);
/* harmony import */ var _util_format_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(200804);
/* harmony import */ var _util_format_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(441343);

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


/***/ })

};
;