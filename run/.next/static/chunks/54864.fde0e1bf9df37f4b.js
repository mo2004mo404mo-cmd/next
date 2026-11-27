"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[54864],{

/***/ 246:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ parallelPreprocessor)
/* harmony export */ });
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


function parallelPreprocessor(option) {
  createParallelIfNeeded(option);
  mergeAxisOptionFromParallel(option);
}
/**
 * Create a parallel coordinate if not exists.
 * @inner
 */
function createParallelIfNeeded(option) {
  if (option.parallel) {
    return;
  }
  var hasParallelSeries = false;
  zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'parallel') {
      hasParallelSeries = true;
    }
  });
  if (hasParallelSeries) {
    option.parallel = [{}];
  }
}
/**
 * Merge aixs definition from parallel option (if exists) to axis option.
 * @inner
 */
function mergeAxisOptionFromParallel(option) {
  var axes = _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeToArray */ .qB(option.parallelAxis);
  zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(axes, function (axisOption) {
    if (!zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject(axisOption)) {
      return;
    }
    var parallelIndex = axisOption.parallelIndex || 0;
    var parallelOption = _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeToArray */ .qB(option.parallel)[parallelIndex];
    if (parallelOption && parallelOption.parallelAxisDefault) {
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.merge(axisOption, parallelOption.parallelAxisDefault, false);
    }
  });
}

/***/ }),

/***/ 724:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var _coord_radar_RadarModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(94126);
/* harmony import */ var _RadarView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74742);
/* harmony import */ var _coord_radar_Radar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75001);

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
  registers.registerCoordinateSystem('radar', _coord_radar_Radar_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
  registers.registerComponentModel(_coord_radar_RadarModel_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay);
  registers.registerComponentView(_RadarView_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
  registers.registerVisual({
    seriesType: 'radar',
    reset: function (seriesModel) {
      var data = seriesModel.getData();
      // itemVisual symbol is for selected data
      data.each(function (idx) {
        data.setItemVisual(idx, 'legendIcon', 'roundRect');
      });
      // visual is for unselected data
      data.setVisual('legendIcon', 'roundRect');
    }
  });
}

/***/ }),

/***/ 1653:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N$: () => (/* binding */ createBandWidthBasedAxisContainShapeHandler),
/* harmony export */   Vz: () => (/* binding */ makeAxisStatKey2),
/* harmony export */   fm: () => (/* binding */ makeAxisStatKey),
/* harmony export */   sH: () => (/* binding */ createMetricsNonOrdinalLinearPositiveMinGap)
/* harmony export */ });
/* harmony import */ var _coord_axisBand_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62432);
/* harmony import */ var _coord_axisStatistics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77596);
/* harmony import */ var _coord_axisStatisticsMetricsImpl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16483);
/* harmony import */ var _scale_helper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54275);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84408);

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
 * Require `requireAxisStatistics`.
 *
 * Simply expand `Scale` extent by half bandWidth.
 * Do nothing if an `OrdinalScale` has `boundaryGap: true`.
 */
function createBandWidthBasedAxisContainShapeHandler(axisStatKey) {
  // [AXIS_CONTAIN_SHAPE_COMMON_STRATEGY]:
  //  The calculation below is based on a proportion mapping
  //  from `[barsBoundVal[0], barsBoundVal[1]]` to `[minValNew, maxValNew]`:
  //                  |------|------------------------------|---|
  //     barsBoundVal[0]   minValOld                 maxValOld barsBoundVal[1]
  //                         |----|----------------------|--|
  //                  minValNew    minValOld     maxValOld maxValNew
  //     (Note: `|---|` above represents "pixels" rather than "data".)
  return function (axis, ecModel) {
    var bandWidthResult = (0,_coord_axisBand_js__WEBPACK_IMPORTED_MODULE_0__/* .calcBandWidth */ .D)(axis, {
      fromStat: {
        key: axisStatKey
      }
    });
    if ((0,_util_number_js__WEBPACK_IMPORTED_MODULE_1__/* .isNullableNumberFinite */ .YC)(bandWidthResult.w2)) {
      return [-bandWidthResult.w2 / 2, bandWidthResult.w2 / 2];
    }
  };
}
/**
 * A pre-built `makeAxisStatKey`.
 * See `makeAxisStatKey2`. Use two functions rather than a optional parameter to impose checking.
 */
function makeAxisStatKey(seriesType) {
  return seriesType + _coord_axisStatistics_js__WEBPACK_IMPORTED_MODULE_2__/* .AXIS_STAT_KEY_DELIMITER */ .V0;
}
function makeAxisStatKey2(seriesType, coordSysType) {
  return seriesType + _coord_axisStatistics_js__WEBPACK_IMPORTED_MODULE_2__/* .AXIS_STAT_KEY_DELIMITER */ .V0 + coordSysType;
}
/**
 * A pre-built `getMetrics`.
 */
function createMetricsNonOrdinalLinearPositiveMinGap(axis) {
  (0,_coord_axisStatisticsMetricsImpl_js__WEBPACK_IMPORTED_MODULE_3__/* .registerMetricImplLiPosMinGap */ .v)();
  return {
    // non-category scale do not use `liPosMinGap` to calculate `bandWidth`.
    liPosMinGap: !(0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .isOrdinalScale */ .wl)(axis.scale)
  };
}
;

/***/ }),

/***/ 5215:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ onIrrelevantElement)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88367);

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

var IRRELEVANT_EXCLUDES = {
  'axisPointer': 1,
  'tooltip': 1,
  'brush': 1
};
/**
 * Used on roam/brush triggering determination.
 * This is to avoid that: mouse clicking on an elements that is over geo or graph,
 * but roam is triggered unexpectedly.
 */
function onIrrelevantElement(e, api, targetComponent) {
  var eventElComponent = api.getComponentByElement(e.topTarget);
  if (!eventElComponent || eventElComponent === targetComponent || IRRELEVANT_EXCLUDES.hasOwnProperty(eventElComponent.mainType)) {
    return false;
  }
  // At present the `true` return is conservative. That is, the caller, such as a RoamController,
  // is more likely to get a `false` return and start a roam behavior, becuase even if the
  // `model.coordinateSystem` does not exist, the `e.topTarget` may be also a relevant element,
  // such as axis split line/area or series elements, where roam should be available. Otherwise,
  // if a dataZoom-served cartesian is full of series elements, the dataZoom-roaming can hardly
  // be triggered.
  var eventElCoordSys = eventElComponent.coordinateSystem;
  // If eventElComponent is axisModel, it works only if it is injected with coordinateSystem.
  if (!eventElCoordSys || eventElCoordSys.model === targetComponent) {
    return false;
  }
  // e.g., if a cartesian is covered by a graph, the graph has a higher presedence in roam.
  // A potential bad case is that RoamController does not prevent the cartesian from handling zr
  // event, such as click and hovering, but it's fine so far.
  // Aslo be conservative, if equals, return false.
  var eventElCmptZInfo = (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.retrieveZInfo)(eventElComponent);
  var targetCmptZInfo = (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.retrieveZInfo)(targetComponent);
  if ((eventElCmptZInfo.zlevel - targetCmptZInfo.zlevel || eventElCmptZInfo.z - targetCmptZInfo.z) <= 0) {
    return false;
  }
  return true;
}

/***/ }),

/***/ 6592:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ axisModelCreator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42924);
/* harmony import */ var _axisDefault_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56664);
/* harmony import */ var _util_layout_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58263);
/* harmony import */ var _data_OrdinalMeta_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26383);
/* harmony import */ var _axisCommonTypes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77263);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _component_axis_axisBreakHelper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92161);

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
 * Generate sub axis model class
 * @param axisName 'x' 'y' 'radius' 'angle' 'parallel' ...
 */
function axisModelCreator(registers, axisName, BaseAxisModelClass, extraDefaultOption) {
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(_axisCommonTypes_js__WEBPACK_IMPORTED_MODULE_1__/* .AXIS_TYPES */ .U, function (v, axisType) {
    var defaultOption = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.merge)((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.merge)({}, _axisDefault_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A[axisType], true), extraDefaultOption, true);
    var AxisModel = /** @class */function (_super) {
      (0,tslib__WEBPACK_IMPORTED_MODULE_3__/* .__extends */ .C6)(AxisModel, _super);
      function AxisModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = axisName + 'Axis.' + axisType;
        return _this;
      }
      AxisModel.prototype.mergeDefaultAndTheme = function (option, ecModel) {
        var layoutMode = (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_4__/* .fetchLayoutMode */ .ad)(this);
        var inputPositionParams = layoutMode ? (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_4__/* .getLayoutParams */ .vs)(option) : {};
        var themeModel = ecModel.getTheme();
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.merge)(option, themeModel.get(axisType + 'Axis'));
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.merge)(option, this.getDefaultOption());
        option.type = getAxisType(option);
        if (layoutMode) {
          (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_4__/* .mergeLayoutParam */ .YA)(option, inputPositionParams, layoutMode);
        }
      };
      AxisModel.prototype.optionUpdated = function () {
        var thisOption = this.option;
        if (thisOption.type === 'category') {
          this.__ordinalMeta = _data_OrdinalMeta_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.createByAxisModel(this);
        }
      };
      /**
       * Should not be called before all of 'getInitailData' finished.
       * Because categories are collected during initializing data.
       */
      AxisModel.prototype.getCategories = function (rawData) {
        var option = this.option;
        // FIXME
        // warning if called before all of 'getInitailData' finished.
        if (option.type === 'category') {
          if (rawData) {
            // NOTICE: return the raw data even if not existing; never use a fallback like `[]`;
            // Its existence matters in some legacy cases.
            return option.data;
          }
          return this.__ordinalMeta.categories;
        }
      };
      AxisModel.prototype.getOrdinalMeta = function () {
        return this.__ordinalMeta;
      };
      AxisModel.prototype.updateAxisBreaks = function (payload) {
        var axisBreakHelper = (0,_component_axis_axisBreakHelper_js__WEBPACK_IMPORTED_MODULE_6__/* .getAxisBreakHelper */ .D)();
        return axisBreakHelper ? axisBreakHelper.updateModelAxisBreak(this, payload) : {
          breaks: []
        };
      };
      AxisModel.type = axisName + 'Axis.' + axisType;
      AxisModel.defaultOption = defaultOption;
      return AxisModel;
    }(BaseAxisModelClass);
    registers.registerComponentModel(AxisModel);
  });
  registers.registerSubTypeDefaulter(axisName + 'Axis', getAxisType);
}
function getAxisType(option) {
  // Default axis with data is category axis
  return option.type || (option.data ? 'category' : 'value');
}

/***/ }),

/***/ 7654:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ scaleCalcAlign)
/* harmony export */ });
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84408);
/* harmony import */ var _axisHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(69663);
/* harmony import */ var _scale_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54275);
/* harmony import */ var _scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43834);

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
 * NOTE: See the summary of the process of extent determination in the comment of `scaleMapper.setExtent`.
 *
 * @see SCALE_EXTENT_CONSTRUCTION for the full processing flow.
 */
function scaleCalcAlign(targetAxis, alignToScale) {
  var targetScale = targetAxis.scale;
  var targetAxisModel = targetAxis.model;
  if (false) {}
  var targetExtentInfo = (0,_scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_0__/* .adoptScaleRawExtentInfoAndPrepare */ .zT)(targetScale, targetAxisModel, targetAxisModel.ecModel, targetAxis, null);
  // FIXME:
  //  (1) Axis inverse is not considered yet.
  //  (2) `SCALE_EXTENT_KIND_MAPPING` is not considered yet.
  var isTargetLogScale = (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .isLogScale */ .F)(targetScale);
  var alignToScaleLinear = (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .isLogScale */ .F)(alignToScale) ? alignToScale.intervalStub : alignToScale;
  var targetIntervalStub = isTargetLogScale ? targetScale.intervalStub : targetScale;
  var targetLogScaleBase = targetScale.base;
  var alignToTicks = alignToScaleLinear.getTicks();
  var alignToExpNiceTicks = alignToScaleLinear.getTicks({
    expandToNicedExtent: true
  });
  var alignToSegCount = alignToTicks.length - 1;
  if (false) {}
  // The Current strategy: Find a proper interval and an extent for the target scale to derive ticks
  // matching exactly to ticks of `alignTo` scale.
  // Adjust min, max based on the extent of alignTo. When min or max is set in alignTo scale
  var t0; // diff ratio on min not-nice segment. 0 <= t0 < 1
  var t1; // diff ratio on max not-nice segment. 0 <= t1 < 1
  var alignToNiceSegCount; // >= 1
  // Consider ticks of `alignTo`, only these cases below may occur:
  if (alignToSegCount === 1) {
    // `alignToTicks` is like:
    //  |--|
    // In this case, we make the corresponding 2 target ticks "nice".
    t0 = t1 = 0;
    alignToNiceSegCount = 1;
  } else if (alignToSegCount === 2) {
    // `alignToTicks` is like:
    //  |-|-----| or
    //  |-----|-| or
    //  |-----|-----|
    // Notices that nice ticks do not necessarily exist in this case.
    // In this case, we choose the larger segment as the "nice segment" and
    // the corresponding target ticks are made "nice".
    var interval0 = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathAbs */ .NY)(alignToTicks[0].value - alignToTicks[1].value);
    var interval1 = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathAbs */ .NY)(alignToTicks[1].value - alignToTicks[2].value);
    t0 = t1 = 0;
    if (interval0 === interval1) {
      alignToNiceSegCount = 2;
    } else {
      alignToNiceSegCount = 1;
      if (interval0 < interval1) {
        t0 = interval0 / interval1;
      } else {
        t1 = interval1 / interval0;
      }
    }
  } else {
    // alignToSegCount >= 3
    // `alignToTicks` is like:
    //  |-|-----|-----|-| or
    //  |-----|-----|-| or
    //  |-|-----|-----| or ...
    // At least one nice segment is present, and not-nice segments are only present on
    // the start and/or the end.
    // In this case, ticks corresponding to nice segments are made "nice".
    var alignToInterval = alignToScaleLinear.getConfig().interval;
    t0 = (1 - (alignToTicks[0].value - alignToExpNiceTicks[0].value) / alignToInterval) % 1;
    t1 = (1 - (alignToExpNiceTicks[alignToSegCount].value - alignToTicks[alignToSegCount].value) / alignToInterval) % 1;
    alignToNiceSegCount = alignToSegCount - (t0 ? 1 : 0) - (t1 ? 1 : 0);
  }
  if (false) {}
  // NOTE:
  //  Consider a case:
  //    dataZoom controls all Y axes;
  //    dataZoom end is 90% (maxFixed: true, dataZoomFixMinMax[0]: true);
  //    but dataZoom start is 0% (minFixed: false, dataZoomFixMinMax[1]: false);
  //  In this case,
  //    - `Interval#calcNiceTicks` only uses `targetExtentInfo.max` as the upper bound, but expand the
  //      lower bound to a "nice" tick and can get an acceptable result.
  //    - `scaleCalcAlign` has to use both `targetExtentInfo.min/max` as the bounds without any expansion,
  //      otherwise the lower bound may become negative unexpectedly, especially for all positive series data.
  var dataZoomFixMinMax = targetExtentInfo.zoomFixMM;
  var hasDataZoomFixMinMax = dataZoomFixMinMax[0] || dataZoomFixMinMax[1];
  var targetMinMaxFixed = [targetExtentInfo.fixMM[0] || hasDataZoomFixMinMax, targetExtentInfo.fixMM[1] || hasDataZoomFixMinMax];
  // MEMO: When only `xxxAxis.min` or `xxxAxis.max` is fixed,
  //  - Even a "nice" interval can be calculated, ticks accumulated based on `min`/`max` can be "nice" only if
  //    `min` or `max` is a "nice" number.
  //  - Generating a "nice" interval may cause the extent have both positive and negative ticks, which may be
  //    not preferable for all positive (very common) or all negative series data. But it can be simply resolved
  //    by specifying `xxxAxis.min: 0`/`xxxAxis.max: 0`, so we do not specially handle this case here.
  //  Therefore, we prioritize generating "nice" interval over preventing from crossing zero.
  //  e.g., if series data are all positive and the max data is `11739`,
  //      If setting `yAxis.max: 'dataMax'`, ticks may be like:
  //          `11739, 8739, 5739, 2739, -1739` (not "nice" enough)
  //      If setting `yAxis.max: 'dataMax', yAxis.min: 0`, ticks may be like:
  //          `11739, 8805, 5870, 2935, 0` (not "nice" enough but may be acceptable)
  //      If setting `yAxis.max: 12000, yAxis.min: 0`, ticks may be like:
  //          `12000, 9000, 6000, 3000, 0` ("nice")
  var targetOldOutermostExtent = targetScale.getExtent();
  var targetOldIntervalExtent = targetIntervalStub.getExtent();
  var targetExtent = (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .intervalScaleEnsureValidExtent */ .Ob)(targetOldIntervalExtent, targetMinMaxFixed);
  var min;
  var max;
  var interval;
  var intervalPrecision;
  var maxNice;
  var minNice;
  function loopIncreaseInterval(cb) {
    // Typically this loop runs less than 5 times. But we still
    // use a fail-safe for future changes.
    var LOOP_MAX = 50;
    var loopGuard = 0;
    for (; loopGuard < LOOP_MAX; loopGuard++) {
      if (cb()) {
        break;
      }
      interval = isTargetLogScale
      // TODO: `mathMax(base, 2)` is a guardcode to avoid infinite loop,
      // but probably it should be guranteed by `LogScale` itself.
      ? interval * (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathMax */ .JB)(targetLogScaleBase, 2) : (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .increaseInterval */ .kH)(interval);
      intervalPrecision = (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .getIntervalPrecision */ .u$)(interval);
    }
    if (false) {}
  }
  function updateMinFromMinNice() {
    min = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(minNice - interval * t0, intervalPrecision);
  }
  function updateMaxFromMaxNice() {
    max = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(maxNice + interval * t1, intervalPrecision);
  }
  function updateMinNiceFromMinT0Interval() {
    minNice = t0 ? (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(min + interval * t0, intervalPrecision) : min;
  }
  function updateMaxNiceFromMaxT1Interval() {
    maxNice = t1 ? (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(max - interval * t1, intervalPrecision) : max;
  }
  // NOTE: The new calculated `min`/`max` must NOT shrink the original extent; otherwise some series
  // data may be outside of the extent. They can expand the original extent slightly to align with
  // ticks of `alignTo`. In this case, more blank space is added but visually fine.
  if (targetMinMaxFixed[0] && targetMinMaxFixed[1]) {
    // Both `min` and `max` are specified (via dataZoom or ec option; consider both Cartesian, radar and
    // other possible axes). In this case, "nice" ticks can hardly be calculated, but reasonable ticks should
    // still be calculated whenever possible, especially `intervalPrecision` should be tuned for better
    // appearance and lower cumulative error.
    min = targetExtent[0];
    max = targetExtent[1];
    interval = (max - min) / (alignToNiceSegCount + t0 + t1);
    // Typically axis pixel extent is ready here. See `create` in `Grid.ts`.
    var axisPxExtent = targetAxis.getExtent();
    // NOTICE: this pxSpan may be not accurate yet due to "outerBounds" logic, but acceptable so far.
    var pxSpan = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathAbs */ .NY)(axisPxExtent[1] - axisPxExtent[0]);
    // We imperically choose `pxDiffAcceptable` as `0.5 / alignToNiceSegCount` for reduce cumulative
    // error, otherwise a discernible misalign (> 1px) may occur.
    // PENDING: We do not find a acceptable precision for LogScale here.
    //  Theoretically it can be addressed but introduce more complexity. Is it necessary?
    intervalPrecision = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .getAcceptableTickPrecision */ .EO)([max, min], pxSpan, 0.5 / alignToNiceSegCount);
    updateMinNiceFromMinT0Interval();
    updateMaxNiceFromMaxT1Interval();
    if ((0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .isNullableNumberFinite */ .YC)(intervalPrecision)) {
      interval = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(interval, intervalPrecision);
    }
  } else {
    // Make a minimal enough `interval`, increase it later.
    // It is a similar logic as `IntervalScale#calcNiceTicks` and `LogScale#calcNiceTicks`.
    // Axis break is not supported, which is guranteed by the caller of this function.
    var targetSpan = targetExtent[1] - targetExtent[0];
    interval = isTargetLogScale ? (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathMax */ .JB)((0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .quantity */ .au)(targetSpan), 1) : (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .nice */ .Cm)(targetSpan / alignToNiceSegCount, _util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .NICE_MODE_MIN */ .Dx);
    intervalPrecision = (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .getIntervalPrecision */ .u$)(interval);
    if (targetMinMaxFixed[0]) {
      min = targetExtent[0];
      loopIncreaseInterval(function () {
        updateMinNiceFromMinT0Interval();
        maxNice = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(minNice + interval * alignToNiceSegCount, intervalPrecision);
        updateMaxFromMaxNice();
        if (max >= targetExtent[1]) {
          return true;
        }
      });
    } else if (targetMinMaxFixed[1]) {
      max = targetExtent[1];
      loopIncreaseInterval(function () {
        updateMaxNiceFromMaxT1Interval();
        minNice = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(maxNice - interval * alignToNiceSegCount, intervalPrecision);
        updateMinFromMinNice();
        if (min <= targetExtent[0]) {
          return true;
        }
      });
    } else {
      loopIncreaseInterval(function () {
        minNice = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)((0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathCeil */ .ih)(targetExtent[0] / interval) * interval, intervalPrecision);
        maxNice = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)((0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathFloor */ .Zr)(targetExtent[1] / interval) * interval, intervalPrecision);
        // NOTE:
        //  - `maxNice - minNice >= -interval` here.
        //  - While `interval` increases, `currIntervalCount` decreases, minimum `-1`.
        var currIntervalCount = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathRound */ .jn)((maxNice - minNice) / interval);
        if (currIntervalCount <= alignToNiceSegCount) {
          var moreCount = alignToNiceSegCount - currIntervalCount;
          // Consider cases that negative tick do not make sense (or vice versa), users can simply
          // specify `xxxAxis.min/max: 0` to avoid negative. But we still automatically handle it
          // for some common cases whenever possible:
          //  - When ec option is `xxxAxis.scale: false` (the default), it is usually unexpected if
          //    negative (or positive) ticks are introduced.
          //  - In LogScale, series data are usually either all > 1 or all < 1, rather than both,
          //    that is, logarithm result is typically either all positive or all negative.
          var moreCountPair = void 0;
          var mayEnhanceZero = targetExtentInfo.incl0 || isTargetLogScale;
          // `bounds < 0` or `bounds > 0` may require more complex handling, so we only auto handle
          // `bounds === 0`.
          if (mayEnhanceZero && targetExtent[0] === 0) {
            // 0 has been included in extent and all positive.
            moreCountPair = [0, moreCount];
          } else if (mayEnhanceZero && targetExtent[1] === 0) {
            // 0 has been included in extent and all negative.
            moreCountPair = [moreCount, 0];
          } else {
            // Try to center ticks in axis space whenever possible, which is especially preferable
            // in `LogScale`.
            var lessHalfCount = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .mathFloor */ .Zr)(moreCount / 2);
            moreCountPair = moreCount % 2 === 0 ? [lessHalfCount, lessHalfCount] : min + max < targetExtent[0] + targetExtent[1] ? [lessHalfCount, lessHalfCount + 1] : [lessHalfCount + 1, lessHalfCount];
          }
          minNice = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(minNice - interval * moreCountPair[0], intervalPrecision);
          maxNice = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .round */ .LI)(maxNice + interval * moreCountPair[1], intervalPrecision);
          updateMinFromMinNice();
          updateMaxFromMaxNice();
          if (min <= targetExtent[0] && max >= targetExtent[1]) {
            return true;
          }
        }
      });
    }
  }
  (0,_axisHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .updateIntervalOrLogScaleForNiceOrAligned */ .H1)(targetScale, targetMinMaxFixed, targetOldIntervalExtent, [min, max], targetOldOutermostExtent, {
    // NOTE: Even in LogScale, `interval` should not be in log space.
    interval: interval,
    // Force ticks count, otherwise cumulative error may cause more unexpected ticks to be generated.
    // Though the overlapping tick labels may be auto-ignored, but probably unexpected, e.g., the min
    // tick label is ignored but the secondary min tick label is shown, which is unexpected when
    // `axis.min` is user-specified or dataZoom-specified.
    intervalCount: alignToNiceSegCount,
    intervalPrecision: intervalPrecision,
    niceExtent: [minNice, maxNice]
  });
  if (false) {}
}

/***/ }),

/***/ 9776:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11916);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2103);
/* harmony import */ var _util_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22469);
/* harmony import */ var _LinePath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86799);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55736);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(35980);
/* harmony import */ var _util_states_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33955);
/* harmony import */ var _label_labelStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88908);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84408);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(95615);

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










var SYMBOL_CATEGORIES = ['fromSymbol', 'toSymbol'];
function makeSymbolTypeKey(symbolCategory) {
  return '_' + symbolCategory + 'Type';
}
function makeSymbolTypeValue(name, lineData, idx) {
  var symbolType = lineData.getItemVisual(idx, name);
  if (!symbolType || symbolType === 'none') {
    return symbolType;
  }
  var symbolSize = lineData.getItemVisual(idx, name + 'Size');
  var symbolRotate = lineData.getItemVisual(idx, name + 'Rotate');
  var symbolOffset = lineData.getItemVisual(idx, name + 'Offset');
  var symbolKeepAspect = lineData.getItemVisual(idx, name + 'KeepAspect');
  var symbolSizeArr = _util_symbol_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeSymbolSize */ .xU(symbolSize);
  var symbolOffsetArr = _util_symbol_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeSymbolOffset */ .hV(symbolOffset || 0, symbolSizeArr);
  return symbolType + symbolSizeArr + symbolOffsetArr + (symbolRotate || '') + (symbolKeepAspect || '');
}
/**
 * @inner
 */
function createSymbol(name, lineData, idx) {
  var symbolType = lineData.getItemVisual(idx, name);
  if (!symbolType || symbolType === 'none') {
    return;
  }
  var symbolSize = lineData.getItemVisual(idx, name + 'Size');
  var symbolRotate = lineData.getItemVisual(idx, name + 'Rotate');
  var symbolOffset = lineData.getItemVisual(idx, name + 'Offset');
  var symbolKeepAspect = lineData.getItemVisual(idx, name + 'KeepAspect');
  var symbolSizeArr = _util_symbol_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeSymbolSize */ .xU(symbolSize);
  var symbolOffsetArr = _util_symbol_js__WEBPACK_IMPORTED_MODULE_0__/* .normalizeSymbolOffset */ .hV(symbolOffset || 0, symbolSizeArr);
  var symbolPath = _util_symbol_js__WEBPACK_IMPORTED_MODULE_0__/* .createSymbol */ .v5(symbolType, -symbolSizeArr[0] / 2 + symbolOffsetArr[0], -symbolSizeArr[1] / 2 + symbolOffsetArr[1], symbolSizeArr[0], symbolSizeArr[1], null, symbolKeepAspect);
  symbolPath.__specifiedRotation = symbolRotate == null || isNaN(symbolRotate) ? void 0 : +symbolRotate * Math.PI / 180 || 0;
  symbolPath.name = name;
  return symbolPath;
}
function createLine(points) {
  var line = new _LinePath_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A({
    name: 'line',
    subPixelOptimize: true
  });
  setLinePoints(line.shape, points);
  return line;
}
function setLinePoints(targetShape, points) {
  targetShape.x1 = points[0][0];
  targetShape.y1 = points[0][1];
  targetShape.x2 = points[1][0];
  targetShape.y2 = points[1][1];
  targetShape.percent = 1;
  var cp1 = points[2];
  if (cp1) {
    targetShape.cpx1 = cp1[0];
    targetShape.cpy1 = cp1[1];
  } else {
    targetShape.cpx1 = NaN;
    targetShape.cpy1 = NaN;
  }
}
var Line = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_2__/* .__extends */ .C6)(Line, _super);
  function Line(lineData, idx, seriesScope) {
    var _this = _super.call(this) || this;
    _this._createLine(lineData, idx, seriesScope);
    return _this;
  }
  Line.prototype._createLine = function (lineData, idx, seriesScope) {
    var seriesModel = lineData.hostModel;
    var linePoints = lineData.getItemLayout(idx);
    var z2 = lineData.getItemVisual(idx, 'z2');
    var line = createLine(linePoints);
    line.shape.percent = 0;
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* .initProps */ .LW(line, {
      z2: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.retrieve2)(z2, 0),
      shape: {
        percent: 1
      }
    }, seriesModel, idx);
    this.add(line);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each)(SYMBOL_CATEGORIES, function (symbolCategory) {
      var symbol = createSymbol(symbolCategory, lineData, idx);
      // symbols must added after line to make sure
      // it will be updated after line#update.
      // Or symbol position and rotation update in line#beforeUpdate will be one frame slow
      this.add(symbol);
      this[makeSymbolTypeKey(symbolCategory)] = makeSymbolTypeValue(symbolCategory, lineData, idx);
    }, this);
    this._updateCommonStl(lineData, idx, seriesScope);
  };
  // TODO More strict on the List type in parameters?
  Line.prototype.updateData = function (lineData, idx, seriesScope) {
    var seriesModel = lineData.hostModel;
    var line = this.childOfName('line');
    var linePoints = lineData.getItemLayout(idx);
    var target = {
      shape: {}
    };
    setLinePoints(target.shape, linePoints);
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* .updateProps */ .oi(line, target, seriesModel, idx);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each)(SYMBOL_CATEGORIES, function (symbolCategory) {
      var symbolType = makeSymbolTypeValue(symbolCategory, lineData, idx);
      var key = makeSymbolTypeKey(symbolCategory);
      // Symbol changed
      if (this[key] !== symbolType) {
        this.remove(this.childOfName(symbolCategory));
        var symbol = createSymbol(symbolCategory, lineData, idx);
        this.add(symbol);
      }
      this[key] = symbolType;
    }, this);
    this._updateCommonStl(lineData, idx, seriesScope);
  };
  ;
  Line.prototype.getLinePath = function () {
    return this.childAt(0);
  };
  Line.prototype._updateCommonStl = function (lineData, idx, seriesScope) {
    var seriesModel = lineData.hostModel;
    var line = this.childOfName('line');
    var emphasisLineStyle = seriesScope && seriesScope.emphasisLineStyle;
    var blurLineStyle = seriesScope && seriesScope.blurLineStyle;
    var selectLineStyle = seriesScope && seriesScope.selectLineStyle;
    var labelStatesModels = seriesScope && seriesScope.labelStatesModels;
    var emphasisDisabled = seriesScope && seriesScope.emphasisDisabled;
    var focus = seriesScope && seriesScope.focus;
    var blurScope = seriesScope && seriesScope.blurScope;
    // Optimization for large dataset
    if (!seriesScope || lineData.hasItemOption) {
      var itemModel = lineData.getItemModel(idx);
      var emphasisModel = itemModel.getModel('emphasis');
      emphasisLineStyle = emphasisModel.getModel('lineStyle').getLineStyle();
      blurLineStyle = itemModel.getModel(['blur', 'lineStyle']).getLineStyle();
      selectLineStyle = itemModel.getModel(['select', 'lineStyle']).getLineStyle();
      emphasisDisabled = emphasisModel.get('disabled');
      focus = emphasisModel.get('focus');
      blurScope = emphasisModel.get('blurScope');
      labelStatesModels = (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_5__/* .getLabelStatesModels */ .lx)(itemModel);
    }
    var lineStyle = lineData.getItemVisual(idx, 'style');
    var visualColor = lineStyle.stroke;
    line.useStyle(lineStyle);
    line.style.fill = null;
    line.style.strokeNoScale = true;
    line.ensureState('emphasis').style = emphasisLineStyle;
    line.ensureState('blur').style = blurLineStyle;
    line.ensureState('select').style = selectLineStyle;
    // Update symbol
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each)(SYMBOL_CATEGORIES, function (symbolCategory) {
      var symbol = this.childOfName(symbolCategory);
      if (symbol) {
        // Share opacity and color with line.
        symbol.setColor(visualColor);
        symbol.style.opacity = lineStyle.opacity;
        for (var i = 0; i < _util_states_js__WEBPACK_IMPORTED_MODULE_6__/* .SPECIAL_STATES */ .BV.length; i++) {
          var stateName = _util_states_js__WEBPACK_IMPORTED_MODULE_6__/* .SPECIAL_STATES */ .BV[i];
          var lineState = line.getState(stateName);
          if (lineState) {
            var lineStateStyle = lineState.style || {};
            var state = symbol.ensureState(stateName);
            var stateStyle = state.style || (state.style = {});
            if (lineStateStyle.stroke != null) {
              stateStyle[symbol.__isEmptyBrush ? 'stroke' : 'fill'] = lineStateStyle.stroke;
            }
            if (lineStateStyle.opacity != null) {
              stateStyle.opacity = lineStateStyle.opacity;
            }
          }
        }
        symbol.markRedraw();
      }
    }, this);
    var rawVal = seriesModel.getRawValue(idx);
    (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_5__/* .setLabelStyle */ .qM)(this, labelStatesModels, {
      labelDataIndex: idx,
      labelFetcher: {
        getFormattedLabel: function (dataIndex, stateName) {
          return seriesModel.getFormattedLabel(dataIndex, stateName, lineData.dataType);
        }
      },
      inheritColor: visualColor || _visual_tokens_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.color.neutral99,
      defaultOpacity: lineStyle.opacity,
      defaultText: (rawVal == null ? lineData.getName(idx) : isFinite(rawVal)
      // PENDING: the `rawVal` is not supposed to be rounded. But this rounding was introduced
      // in the early stages, so changing it would likely be breaking.
      ? (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .round */ .LI)(rawVal, 10) : rawVal) + ''
    });
    var label = this.getTextContent();
    // Always set `textStyle` even if `normalStyle.text` is null, because default
    // values have to be set on `normalStyle`.
    if (label) {
      var labelNormalModel = labelStatesModels.normal;
      label.__align = label.style.align;
      label.__verticalAlign = label.style.verticalAlign;
      // 'start', 'middle', 'end'
      label.__position = labelNormalModel.get('position') || 'middle';
      var distance = labelNormalModel.get('distance');
      if (!(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(distance)) {
        distance = [distance, distance];
      }
      label.__labelDistance = distance;
    }
    this.setTextConfig({
      position: null,
      local: true,
      inside: false // Can't be inside for stroke element.
    });
    (0,_util_states_js__WEBPACK_IMPORTED_MODULE_6__/* .toggleHoverEmphasis */ .Lm)(this, focus, blurScope, emphasisDisabled);
  };
  Line.prototype.highlight = function () {
    (0,_util_states_js__WEBPACK_IMPORTED_MODULE_6__/* .enterEmphasis */ .HY)(this);
  };
  Line.prototype.downplay = function () {
    (0,_util_states_js__WEBPACK_IMPORTED_MODULE_6__/* .leaveEmphasis */ .SD)(this);
  };
  Line.prototype.updateLayout = function (lineData, idx) {
    this.childOfName('line').stopAnimation();
    this.setLinePoints(lineData.getItemLayout(idx));
  };
  Line.prototype.setLinePoints = function (points) {
    var linePath = this.childOfName('line');
    setLinePoints(linePath.shape, points);
    linePath.dirty();
  };
  Line.prototype.beforeUpdate = function () {
    var lineGroup = this;
    var symbolFrom = lineGroup.childOfName('fromSymbol');
    var symbolTo = lineGroup.childOfName('toSymbol');
    var label = lineGroup.getTextContent();
    // Quick reject
    if (!symbolFrom && !symbolTo && (!label || label.ignore)) {
      return;
    }
    var invScale = 1;
    var parentNode = this.parent;
    while (parentNode) {
      if (parentNode.scaleX) {
        invScale /= parentNode.scaleX;
      }
      parentNode = parentNode.parent;
    }
    var line = lineGroup.childOfName('line');
    // If line not changed
    // FIXME Parent scale changed
    if (!this.__dirty && !line.__dirty) {
      return;
    }
    var percent = line.shape.percent;
    var fromPos = line.pointAt(0);
    var toPos = line.pointAt(percent);
    var d = zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__.sub([], toPos, fromPos);
    zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__.normalize(d, d);
    function setSymbolRotation(symbol, percent) {
      // Fix #12388
      // when symbol is set to be 'arrow' in markLine,
      // symbolRotate value will be ignored, and compulsively use tangent angle.
      // rotate by default if symbol rotation is not specified
      var specifiedRotation = symbol.__specifiedRotation;
      if (specifiedRotation == null) {
        var tangent = line.tangentAt(percent);
        symbol.attr('rotation', (percent === 1 ? -1 : 1) * Math.PI / 2 - Math.atan2(tangent[1], tangent[0]));
      } else {
        symbol.attr('rotation', specifiedRotation);
      }
    }
    if (symbolFrom) {
      symbolFrom.setPosition(fromPos);
      setSymbolRotation(symbolFrom, 0);
      symbolFrom.scaleX = symbolFrom.scaleY = invScale * percent;
      symbolFrom.markRedraw();
    }
    if (symbolTo) {
      symbolTo.setPosition(toPos);
      setSymbolRotation(symbolTo, 1);
      symbolTo.scaleX = symbolTo.scaleY = invScale * percent;
      symbolTo.markRedraw();
    }
    if (label && !label.ignore) {
      label.x = label.y = 0;
      label.originX = label.originY = 0;
      var textAlign = void 0;
      var textVerticalAlign = void 0;
      var distance = label.__labelDistance;
      var distanceX = distance[0] * invScale;
      var distanceY = distance[1] * invScale;
      var halfPercent = percent / 2;
      var tangent = line.tangentAt(halfPercent);
      var n = [tangent[1], -tangent[0]];
      var cp = line.pointAt(halfPercent);
      if (n[1] > 0) {
        n[0] = -n[0];
        n[1] = -n[1];
      }
      var dir = tangent[0] < 0 ? -1 : 1;
      if (label.__position !== 'start' && label.__position !== 'end') {
        var rotation = -Math.atan2(tangent[1], tangent[0]);
        if (toPos[0] < fromPos[0]) {
          rotation = Math.PI + rotation;
        }
        label.rotation = rotation;
      }
      var dy = void 0;
      switch (label.__position) {
        case 'insideStartTop':
        case 'insideMiddleTop':
        case 'insideEndTop':
        case 'middle':
          dy = -distanceY;
          textVerticalAlign = 'bottom';
          break;
        case 'insideStartBottom':
        case 'insideMiddleBottom':
        case 'insideEndBottom':
          dy = distanceY;
          textVerticalAlign = 'top';
          break;
        default:
          dy = 0;
          textVerticalAlign = 'middle';
      }
      switch (label.__position) {
        case 'end':
          label.x = d[0] * distanceX + toPos[0];
          label.y = d[1] * distanceY + toPos[1];
          textAlign = d[0] > 0.8 ? 'left' : d[0] < -0.8 ? 'right' : 'center';
          textVerticalAlign = d[1] > 0.8 ? 'top' : d[1] < -0.8 ? 'bottom' : 'middle';
          break;
        case 'start':
          label.x = -d[0] * distanceX + fromPos[0];
          label.y = -d[1] * distanceY + fromPos[1];
          textAlign = d[0] > 0.8 ? 'right' : d[0] < -0.8 ? 'left' : 'center';
          textVerticalAlign = d[1] > 0.8 ? 'bottom' : d[1] < -0.8 ? 'top' : 'middle';
          break;
        case 'insideStartTop':
        case 'insideStart':
        case 'insideStartBottom':
          label.x = distanceX * dir + fromPos[0];
          label.y = fromPos[1] + dy;
          textAlign = tangent[0] < 0 ? 'right' : 'left';
          label.originX = -distanceX * dir;
          label.originY = -dy;
          break;
        case 'insideMiddleTop':
        case 'insideMiddle':
        case 'insideMiddleBottom':
        case 'middle':
          label.x = cp[0];
          label.y = cp[1] + dy;
          textAlign = 'center';
          label.originY = -dy;
          break;
        case 'insideEndTop':
        case 'insideEnd':
        case 'insideEndBottom':
          label.x = -distanceX * dir + toPos[0];
          label.y = toPos[1] + dy;
          textAlign = tangent[0] >= 0 ? 'right' : 'left';
          label.originX = distanceX * dir;
          label.originY = -dy;
          break;
      }
      label.scaleX = label.scaleY = invScale;
      label.setStyle({
        // Use the user specified text align and baseline first
        verticalAlign: label.__verticalAlign || textVerticalAlign,
        align: label.__align || textAlign
      });
    }
  };
  return Line;
}(_util_graphic_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Line);

/***/ }),

/***/ 10822:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ injectThumbnailBridge),
/* harmony export */   M: () => (/* binding */ getThumbnailBridge)
/* harmony export */ });
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11138);

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
 * @caveat Do not import other `src/component/thumbnail/*` files.
 *  This file should be decoupled from them for sake of the size consideration.
 */
/**
 * FIXME: This is a temporary implementation. May need refactor to decouple
 *  the direct call from series.graph to thumbnail.
 */
var inner = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_0__/* .makeInner */ .$r)();
function getThumbnailBridge(model) {
  if (model) {
    return inner(model).bridge;
  }
}
function injectThumbnailBridge(model, thumbnailBridge) {
  if (model) {
    inner(model).bridge = thumbnailBridge;
  }
}
;

/***/ }),

/***/ 13958:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11916);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11138);
/* harmony import */ var _model_Component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(79057);
/* harmony import */ var _model_Model_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(77571);
/* harmony import */ var _geoCreator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(45835);
/* harmony import */ var _geoSourceManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67023);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95615);

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








;
var GeoModel = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(GeoModel, _super);
  function GeoModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = GeoModel.type;
    return _this;
  }
  GeoModel.prototype.init = function (option, parentModel, ecModel) {
    this.mergeDefaultAndTheme(option, ecModel);
    var source = _geoSourceManager_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.getGeoResource(option.map);
    if (source && source.type === 'geoJSON') {
      var itemStyle = option.itemStyle = option.itemStyle || {};
      if (!('color' in itemStyle)) {
        itemStyle.color = option.defaultItemStyleColor || _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.backgroundTint;
      }
    }
    // Default label emphasis `show`
    _util_model_js__WEBPACK_IMPORTED_MODULE_3__/* .defaultEmphasis */ .M5(option, 'label', ['show']);
  };
  GeoModel.prototype.optionUpdated = function () {
    var _this = this;
    var option = this.option;
    option.regions = _geoCreator_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.getFilledRegions(option.regions, option.map, option.nameMap, option.nameProperty);
    var selectedMap = {};
    this._optionModelMap = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_5__.reduce(option.regions || [], function (optionModelMap, regionOpt) {
      var regionName = regionOpt.name;
      if (regionName) {
        optionModelMap.set(regionName, new _model_Model_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(regionOpt, _this, _this.ecModel));
        if (regionOpt.selected) {
          selectedMap[regionName] = true;
        }
      }
      return optionModelMap;
    }, zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_5__.createHashMap());
    if (!option.selectedMap) {
      option.selectedMap = selectedMap;
    }
  };
  /**
   * Get model of region.
   */
  GeoModel.prototype.getRegionModel = function (name) {
    return this._optionModelMap.get(name) || new _model_Model_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(null, this, this.ecModel);
  };
  /**
   * Format label
   * @param name Region name
   */
  GeoModel.prototype.getFormattedLabel = function (name, status) {
    var regionModel = this.getRegionModel(name);
    var formatter = status === 'normal' ? regionModel.get(['label', 'formatter']) : regionModel.get(['emphasis', 'label', 'formatter']);
    var params = {
      name: name
    };
    if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_5__.isFunction(formatter)) {
      params.status = status;
      return formatter(params);
    } else if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_5__.isString(formatter)) {
      return formatter.replace('{a}', name != null ? name : '');
    }
  };
  // PENGING If selectedMode is null ?
  GeoModel.prototype.select = function (name) {
    var option = this.option;
    var selectedMode = option.selectedMode;
    if (!selectedMode) {
      return;
    }
    if (selectedMode !== 'multiple') {
      option.selectedMap = null;
    }
    var selectedMap = option.selectedMap || (option.selectedMap = {});
    selectedMap[name] = true;
  };
  GeoModel.prototype.unSelect = function (name) {
    var selectedMap = this.option.selectedMap;
    if (selectedMap) {
      selectedMap[name] = false;
    }
  };
  GeoModel.prototype.toggleSelected = function (name) {
    this[this.isSelected(name) ? 'unSelect' : 'select'](name);
  };
  GeoModel.prototype.isSelected = function (name) {
    var selectedMap = this.option.selectedMap;
    return !!(selectedMap && selectedMap[name]);
  };
  GeoModel.prototype.__ownRoamView = function () {
    return this.coordinateSystem.view;
  };
  GeoModel.type = 'geo';
  GeoModel.layoutMode = 'box';
  GeoModel.defaultOption = {
    // zlevel: 0,
    z: 0,
    show: true,
    left: 'center',
    top: 'center',
    // Default value:
    // for geoSVG source: 1,
    // for geoJSON source: 0.75.
    aspectScale: null,
    // /// Layout with center and size
    // If you want to put map in a fixed size box with right aspect ratio
    // This two properties may be more convenient
    // layoutCenter: [50%, 50%]
    // layoutSize: 100
    silent: false,
    // Map type
    map: '',
    // Define left-top, right-bottom coords to control view
    // For example, [ [180, 90], [-180, -90] ]
    boundingCoords: null,
    // Default on center of map
    center: null,
    zoom: 1,
    scaleLimit: null,
    // selectedMode: false
    label: {
      show: false,
      color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.tertiary
    },
    itemStyle: {
      borderWidth: 0.5,
      borderColor: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.border
    },
    emphasis: {
      label: {
        show: true,
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.primary
      },
      itemStyle: {
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.highlight
      }
    },
    select: {
      label: {
        show: true,
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.primary
      },
      itemStyle: {
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.highlight
      }
    },
    regions: []
    // tooltip: {
    //     show: false
    // }
  };
  return GeoModel;
}(_model_Component_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeoModel);

/***/ }),

/***/ 14881:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export registerLegacyGridContainLabelImpl */
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _util_layout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58263);
/* harmony import */ var _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(69663);
/* harmony import */ var _Cartesian2D_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23695);
/* harmony import */ var _Axis2D_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21378);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11138);
/* harmony import */ var _GridModel_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(38070);
/* harmony import */ var _cartesianAxisHelper_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(43572);
/* harmony import */ var _scale_helper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54275);
/* harmony import */ var _axisAlignTicks_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7654);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(88367);
/* harmony import */ var _component_axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(46678);
/* harmony import */ var _axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22591);
/* harmony import */ var _core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(18807);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(84408);
/* harmony import */ var _axisNiceTicks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81888);
/* harmony import */ var _data_helper_SeriesDataSchema_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(13984);
/* harmony import */ var _scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43834);
/* harmony import */ var _scale_break_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(30098);
/* harmony import */ var _axisStatistics_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(77596);

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
 * Grid is a region which contains at most 4 cartesian systems
 *
 * TODO Default cartesian
 */






// Depends on GridModel, AxisModel, which performs preprocess.















// margin is [top, right, bottom, left]
var XY_TO_MARGIN_IDX = [[3, 1], [0, 2] // xyIdx 1 => 'y'
];
var Grid = /** @class */function () {
  function Grid(gridModel, ecModel, api) {
    // FIXME:TS where used (different from registered type 'cartesian2d')?
    this.type = 'grid';
    this._coordsMap = {};
    this._coordsList = [];
    this._axesMap = {};
    this._axesList = [];
    this.axisPointerEnabled = true;
    this.dimensions = _Cartesian2D_js__WEBPACK_IMPORTED_MODULE_0__/* .cartesian2DDimensions */ .U;
    this._initCartesian(gridModel, ecModel, api);
    this.model = gridModel;
  }
  Grid.prototype.getRect = function () {
    return this._rect;
  };
  Grid.prototype.update = function (ecModel, api) {
    var axesMap = this._axesMap;
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(this._axesList, function (axis) {
      (0,_scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_2__/* .scaleRawExtentInfoCreate */ .DT)(axis, _scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_2__/* .AXIS_EXTENT_INFO_BUILD_FROM_COORD_SYS_UPDATE */ .ex);
      var scale = axis.scale;
      if ((0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .isOrdinalScale */ .wl)(scale)) {
        scale.setSortInfo(axis.model.get('categorySortInfo'));
      }
    });
    function updateAxisTicks(axes) {
      // Axis is added in order of axisIndex.
      var axesIndices = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(axes);
      var axisNeedsAlign = [];
      for (var i = axesIndices.length - 1; i >= 0; i--) {
        // Reverse order
        var axis = axes[+axesIndices[i]];
        if (axis.__alignTo) {
          axisNeedsAlign.push(axis);
        } else {
          (0,_axisNiceTicks_js__WEBPACK_IMPORTED_MODULE_4__/* .scaleCalcNice */ .Z0)(axis);
        }
      }
      ;
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axisNeedsAlign, function (axis) {
        if (incapableOfAlignNeedFallback(axis, axis.__alignTo)) {
          (0,_axisNiceTicks_js__WEBPACK_IMPORTED_MODULE_4__/* .scaleCalcNice */ .Z0)(axis);
        } else {
          (0,_axisAlignTicks_js__WEBPACK_IMPORTED_MODULE_5__/* .scaleCalcAlign */ .R)(axis, axis.__alignTo.scale);
        }
      });
    }
    updateAxisTicks(axesMap.x);
    updateAxisTicks(axesMap.y);
    // Key: axisDim_axisIndex, value: boolean, whether onZero target.
    var onZeroRecords = {};
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap.x, function (xAxis) {
      fixAxisOnZero(axesMap, 'y', xAxis, onZeroRecords);
    });
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap.y, function (yAxis) {
      fixAxisOnZero(axesMap, 'x', yAxis, onZeroRecords);
    });
    // Resize again if containLabel is enabled
    // FIXME It may cause getting wrong grid size in data processing stage
    this.resize(this.model, api);
  };
  /**
   * Resize the grid.
   *
   * [NOTE]
   * If both "grid.containLabel/grid.contain" and pixel-required-data-processing (such as, "dataSampling")
   * exist, circular dependency occurs in logic.
   * The final compromised sequence is:
   *  1. Calculate "axis.extent" (pixel extent) and AffineTransform based on only "grid layout options".
   *      Not accurate if "grid.containLabel/grid.contain" is required, but it is a compromise to avoid
   *      circular dependency.
   *  2. Perform "series data processing" (where "dataSampling" requires "axis.extent").
   *  3. Calculate "scale.extent" (data extent) based on "processed series data".
   *  4. Modify "axis.extent" for "grid.containLabel/grid.contain":
   *      4.1. Calculate "axis labels" based on "scale.extent".
   *      4.2. Modify "axis.extent" by the bounding rects of "axis labels and names".
   */
  Grid.prototype.resize = function (gridModel, api, beforeDataProcessing) {
    var layoutRef = (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_6__/* .createBoxLayoutReference */ .Lj)(gridModel, api);
    var gridRect = this._rect = (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_6__/* .getLayoutRect */ .dV)(gridModel.getBoxLayoutParams(), layoutRef.refContainer);
    // PENDING: whether to support that if the input `coord` is out of the base coord sys,
    //  do not render anything. At present, the behavior is undefined.
    var axesMap = this._axesMap;
    var coordsList = this._coordsList;
    var optionContainLabel = gridModel.get('containLabel'); // No `.get(, true)` for backward compat.
    // NOTE: The axis pixel extent is also required by some estimation, e.g., in coord sys update stage,
    // bars on 'time'/'value' axis need it to calculate the supplementary scale extent to avoid edge bars
    // overflowing the axis (see `barGrid.ts`). Therefore, axis pixel extent need to be set early, even
    // may not be accurate.
    updateAllAxisExtentTransByGridRect(axesMap, gridRect);
    if (!beforeDataProcessing) {
      var axisBuilderSharedCtx = createAxisBiulders(gridRect, coordsList, axesMap, optionContainLabel, api);
      var noPxChange = void 0;
      if (optionContainLabel) {
        if (legacyLayOutGridByContainLabel) {
          // console.time('legacyLayOutGridByContainLabel');
          legacyLayOutGridByContainLabel(this._axesList, gridRect);
          updateAllAxisExtentTransByGridRect(axesMap, gridRect);
          // console.timeEnd('legacyLayOutGridByContainLabel');
        } else {
          if (false) {}
          noPxChange = layOutGridByOuterBounds(gridRect.clone(), 'axisLabel', null, gridRect, axesMap, axisBuilderSharedCtx, layoutRef);
        }
      } else {
        var _a = prepareOuterBounds(gridModel, gridRect, layoutRef),
          outerBoundsRect = _a.outerBoundsRect,
          parsedOuterBoundsContain = _a.parsedOuterBoundsContain,
          outerBoundsClamp = _a.outerBoundsClamp;
        if (outerBoundsRect) {
          // console.time('layOutGridByOuterBounds');
          noPxChange = layOutGridByOuterBounds(outerBoundsRect, parsedOuterBoundsContain, outerBoundsClamp, gridRect, axesMap, axisBuilderSharedCtx, layoutRef);
          // console.timeEnd('layOutGridByOuterBounds');
        }
      }
      // console.time('buildAxesView_determine');
      createOrUpdateAxesView(gridRect, axesMap, _axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_7__/* .AxisTickLabelComputingKind */ .fm.determine, null, noPxChange, layoutRef);
      // console.timeEnd('buildAxesView_determine');
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(this._coordsList, function (coord) {
        // Calculate affine matrix to accelerate the data to point transform.
        // If all the axes scales are time or value.
        coord.calcAffineTransform();
      });
    } // End of beforeDataProcessing
  };
  Grid.prototype.getAxis = function (dim, axisIndex) {
    var axesMapOnDim = this._axesMap[dim];
    if (axesMapOnDim != null) {
      return axesMapOnDim[axisIndex || 0];
    }
  };
  Grid.prototype.getAxes = function () {
    return this._axesList.slice();
  };
  Grid.prototype.getCartesian = function (xAxisIndex, yAxisIndex) {
    if (xAxisIndex != null && yAxisIndex != null) {
      var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
      return this._coordsMap[key];
    }
    if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isObject)(xAxisIndex)) {
      yAxisIndex = xAxisIndex.yAxisIndex;
      xAxisIndex = xAxisIndex.xAxisIndex;
    }
    for (var i = 0, coordList = this._coordsList; i < coordList.length; i++) {
      if (coordList[i].getAxis('x').index === xAxisIndex || coordList[i].getAxis('y').index === yAxisIndex) {
        return coordList[i];
      }
    }
  };
  Grid.prototype.getCartesians = function () {
    return this._coordsList.slice();
  };
  /**
   * @implements
   */
  Grid.prototype.convertToPixel = function (ecModel, finder, value) {
    var target = this._findConvertTarget(finder);
    return target.cartesian ? target.cartesian.dataToPoint(value) : target.axis ? target.axis.toGlobalCoord(target.axis.dataToCoord(value)) : null;
  };
  /**
   * @implements
   */
  Grid.prototype.convertFromPixel = function (ecModel, finder, value) {
    var target = this._findConvertTarget(finder);
    return target.cartesian ? target.cartesian.pointToData(value) : target.axis ? target.axis.coordToData(target.axis.toLocalCoord(value)) : null;
  };
  Grid.prototype._findConvertTarget = function (finder) {
    var seriesModel = finder.seriesModel;
    var xAxisModel = finder.xAxisModel || seriesModel && seriesModel.getReferringComponents('xAxis', _util_model_js__WEBPACK_IMPORTED_MODULE_8__/* .SINGLE_REFERRING */ .US).models[0];
    var yAxisModel = finder.yAxisModel || seriesModel && seriesModel.getReferringComponents('yAxis', _util_model_js__WEBPACK_IMPORTED_MODULE_8__/* .SINGLE_REFERRING */ .US).models[0];
    var gridModel = finder.gridModel;
    var coordsList = this._coordsList;
    var cartesian;
    var axis;
    if (seriesModel) {
      cartesian = seriesModel.coordinateSystem;
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(coordsList, cartesian) < 0 && (cartesian = null);
    } else if (xAxisModel && yAxisModel) {
      cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
    } else if (xAxisModel) {
      axis = this.getAxis('x', xAxisModel.componentIndex);
    } else if (yAxisModel) {
      axis = this.getAxis('y', yAxisModel.componentIndex);
    }
    // Lowest priority.
    else if (gridModel) {
      var grid = gridModel.coordinateSystem;
      if (grid === this) {
        cartesian = this._coordsList[0];
      }
    }
    return {
      cartesian: cartesian,
      axis: axis
    };
  };
  /**
   * @implements
   */
  Grid.prototype.containPoint = function (point) {
    var coord = this._coordsList[0];
    if (coord) {
      return coord.containPoint(point);
    }
  };
  /**
   * Initialize cartesian coordinate systems
   */
  Grid.prototype._initCartesian = function (gridModel, ecModel, api) {
    var _this = this;
    var grid = this;
    var axisPositionUsed = {
      left: false,
      right: false,
      top: false,
      bottom: false
    };
    var axesMap = {
      x: {},
      y: {}
    };
    var axesCount = {
      x: 0,
      y: 0
    };
    // Create axis
    ecModel.eachComponent('xAxis', createAxisCreator('x'), this);
    ecModel.eachComponent('yAxis', createAxisCreator('y'), this);
    if (!axesCount.x || !axesCount.y) {
      // Roll back when there no either x or y axis
      this._axesMap = {};
      this._axesList = [];
      return;
    }
    this._axesMap = axesMap;
    // Create cartesian2d
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap.x, function (xAxis, xAxisIndex) {
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap.y, function (yAxis, yAxisIndex) {
        var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
        var cartesian = new _Cartesian2D_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(key);
        cartesian.master = _this;
        cartesian.model = gridModel;
        _this._coordsMap[key] = cartesian;
        _this._coordsList.push(cartesian);
        cartesian.addAxis(xAxis);
        cartesian.addAxis(yAxis);
      });
    });
    prepareAlignToInCoordSysCreate(axesMap.x);
    prepareAlignToInCoordSysCreate(axesMap.y);
    function createAxisCreator(dimName) {
      return function (axisModel, idx) {
        if (!isAxisUsedInTheGrid(axisModel, gridModel)) {
          return;
        }
        var axisPosition = axisModel.get('position');
        if (dimName === 'x') {
          // Fix position
          if (axisPosition !== 'top' && axisPosition !== 'bottom') {
            // Default bottom of X
            axisPosition = axisPositionUsed.bottom ? 'top' : 'bottom';
          }
        } else {
          // Fix position
          if (axisPosition !== 'left' && axisPosition !== 'right') {
            // Default left of Y
            axisPosition = axisPositionUsed.left ? 'right' : 'left';
          }
        }
        axisPositionUsed[axisPosition] = true;
        var axisType = (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .determineAxisType */ .J5)(axisModel);
        var axis = new _Axis2D_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A(dimName, (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .createScaleByModel */ .f$)(axisModel, axisType, true), [0, 0], axisType, axisPosition);
        axis.onBand = (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .isAxisOnBand */ .M2)(axis.scale, axisModel);
        axis.inverse = axisModel.get('inverse');
        // Inject axis into axisModel
        axisModel.axis = axis;
        // Inject axisModel into axis
        axis.model = axisModel;
        // Inject grid info axis
        axis.grid = grid;
        // Index of axis, can be used as key
        axis.index = idx;
        grid._axesList.push(axis);
        axesMap[dimName][idx] = axis;
        axesCount[dimName]++;
      };
    }
  };
  /**
   * @param dim 'x' or 'y' or 'auto' or null/undefined
   */
  Grid.prototype.getTooltipAxes = function (dim) {
    var baseAxes = [];
    var otherAxes = [];
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(this.getCartesians(), function (cartesian) {
      var baseAxis = dim != null && dim !== 'auto' ? cartesian.getAxis(dim) : cartesian.getBaseAxis();
      var otherAxis = cartesian.getOtherAxis(baseAxis);
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis);
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis);
    });
    return {
      baseAxes: baseAxes,
      otherAxes: otherAxes
    };
  };
  Grid.create = function (ecModel, api) {
    var grids = [];
    ecModel.eachComponent('grid', function (gridModel, idx) {
      var grid = new Grid(gridModel, ecModel, api);
      grid.name = 'grid_' + idx;
      // dataSampling requires axis extent, so resize
      // should be performed in create stage.
      grid.resize(gridModel, api, true);
      gridModel.coordinateSystem = grid;
      grids.push(grid);
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(grid._axesList, function (axis) {
        (0,_scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_2__/* .scaleRawExtentInfoEnableBoxCoordSysUsage */ .y)(axis, Grid.dimIdxMap);
      });
    });
    // Inject the coordinateSystems into seriesModel
    ecModel.eachSeries(function (seriesModel) {
      var xAxis;
      var yAxis;
      (0,_core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_11__/* .injectCoordSysByOption */ .m7)({
        targetModel: seriesModel,
        coordSysType: _GridModel_js__WEBPACK_IMPORTED_MODULE_12__/* .COORD_SYS_TYPE_CARTESIAN_2D */ .Tw,
        coordSysProvider: coordSysProvider
      });
      function coordSysProvider() {
        var axesModelMap = (0,_cartesianAxisHelper_js__WEBPACK_IMPORTED_MODULE_13__/* .findAxisModels */ .LR)(seriesModel);
        var xAxisModel = axesModelMap.xAxisModel;
        var yAxisModel = axesModelMap.yAxisModel;
        xAxis = xAxisModel.axis;
        yAxis = yAxisModel.axis;
        var gridModel = xAxisModel.getCoordSysModel();
        if (false) {}
        var grid = gridModel.coordinateSystem;
        return grid.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
      }
      if (xAxis && yAxis) {
        (0,_axisStatistics_js__WEBPACK_IMPORTED_MODULE_14__/* .associateSeriesWithAxis */ .Lb)(xAxis, seriesModel, _GridModel_js__WEBPACK_IMPORTED_MODULE_12__/* .COORD_SYS_TYPE_CARTESIAN_2D */ .Tw);
        (0,_axisStatistics_js__WEBPACK_IMPORTED_MODULE_14__/* .associateSeriesWithAxis */ .Lb)(yAxis, seriesModel, _GridModel_js__WEBPACK_IMPORTED_MODULE_12__/* .COORD_SYS_TYPE_CARTESIAN_2D */ .Tw);
      }
    }, this);
    return grids;
  };
  // For deciding which dimensions to use when creating list data
  Grid.dimensions = _Cartesian2D_js__WEBPACK_IMPORTED_MODULE_0__/* .cartesian2DDimensions */ .U;
  Grid.dimIdxMap = (0,_data_helper_SeriesDataSchema_js__WEBPACK_IMPORTED_MODULE_15__/* .createDimNameMap */ .io)(_Cartesian2D_js__WEBPACK_IMPORTED_MODULE_0__/* .cartesian2DDimensions */ .U);
  return Grid;
}();
/**
 * Check if the axis is used in the specified grid.
 */
function isAxisUsedInTheGrid(axisModel, gridModel) {
  return axisModel.getCoordSysModel() === gridModel;
}
function fixAxisOnZero(axesMap, otherAxisDim, axis,
// Key: see `getOnZeroRecordKey`
onZeroRecords) {
  axis.getAxesOnZeroOf = function () {
    // TODO: onZero of multiple axes.
    return otherAxisOnZeroOf ? [otherAxisOnZeroOf] : [];
  };
  // onZero can not be enabled in these two situations:
  // 1. When any other axis is a category axis.
  // 2. When no axis is cross 0 point.
  var otherAxes = axesMap[otherAxisDim];
  var otherAxisOnZeroOf;
  var axisModel = axis.model;
  var onZero = axisModel.get(['axisLine', 'onZero']);
  var onZeroAxisIndex = axisModel.get(['axisLine', 'onZeroAxisIndex']);
  // For historical reason, ec option `axisLine.onZero: undefined` leads to "not on zero"
  // while leaving `axisLine.onZero` unspecified causes "on zero". This inconsistency goes
  // against common sense, but is preserved for backward compatibility.
  if (!onZero) {
    return;
  }
  // If target axis is specified.
  if (onZeroAxisIndex != null) {
    if (canOnZeroToAxis(onZero, otherAxes[onZeroAxisIndex])) {
      otherAxisOnZeroOf = otherAxes[onZeroAxisIndex];
    }
  } else {
    // Find the first available other axis.
    for (var idx in otherAxes) {
      if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(otherAxes, idx) && canOnZeroToAxis(onZero, otherAxes[idx])
      // Consider that two Y axes on one value axis,
      // if both onZero, the two Y axes overlap.
      && !onZeroRecords[getOnZeroRecordKey(otherAxes[idx])]) {
        otherAxisOnZeroOf = otherAxes[idx];
        break;
      }
    }
  }
  if (otherAxisOnZeroOf) {
    onZeroRecords[getOnZeroRecordKey(otherAxisOnZeroOf)] = true;
  }
  function getOnZeroRecordKey(axis) {
    return axis.dim + '_' + axis.index;
  }
}
/**
 * CAVEAT: Must not be called before `CoordinateSystem#update` due to `__dontOnMyZero`.
 */
function canOnZeroToAxis(onZeroOption, axis) {
  if (!axis) {
    return false;
  }
  var scale = axis.scale;
  var kindEffective = (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .getScaleValuePositionKind */ .$h)(scale, 0, false);
  var can = axis
  // PENDING: Historical behavior: `onZero` on 'category' and 'time' axis are always disabled
  // even if ec option gives `onZero: true`.
  && axis.type !== 'category' && axis.type !== 'time'
  // NOTE: Although the portion out of "effective" portion may also cross zero
  // (see `SCALE_EXTENT_KIND_MAPPING`), that is commonly meaningless, so we use
  // `SCALE_EXTENT_KIND_EFFECTIVE`
  && kindEffective !== _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .SCALE_VALUE_POSITION_KIND_OUTSIDE */ .M8;
  if (can && onZeroOption === 'auto'
  // Historically, "value" axis and "log" axis has been using `onZero: true` as the default.
  // It suitable for mathematic cases, even when dataZoom exists (e.g., `clip.html`), or cases
  // need to distinguish positive and negative data. However, it probably causes odd effect if
  // a "value axis" is laid on zero of a "base axis" in bar/candlestick, where the axis line
  // would likely cross shapes when `SCALE_EXTENT_KIND_MAPPING` is applied.
  // Therefore, we preserve backward compatibility of the default `onZero: true`, but exclude
  // cases that `containShape` is applied.
  && (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .isOnAxisZeroDiscouraged */ .P5)(axis)
  // || (
  //     // Avoid axis line cross series shape (typically, bar series on "value"/"time" axis) unexpectedly.
  //     kindEffective === SCALE_VALUE_POSITION_KIND_EDGE
  //     && getScaleValuePositionKind(scale, 0, true) === SCALE_VALUE_POSITION_KIND_INSIDE
  // )
  ) {
    can = false;
  }
  // falsy value of `onZeroOption` has been handled in the previous logic.
  return can;
}
/**
 * [CAVEAT] This method is called before data processing stage.
 *  Do not rely on any info that is determined afterward.
 */
function prepareAlignToInCoordSysCreate(axes) {
  // Axis is added in order of axisIndex.
  var axesIndices = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(axes);
  var alignTo;
  var axisNeedsAlign = [];
  for (var i = axesIndices.length - 1; i >= 0; i--) {
    // Reverse order
    var axis = axes[+axesIndices[i]];
    if ((0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_3__/* .isIntervalOrLogScale */ .rf)(axis.scale)
    // NOTE: `scale.hasBreaks()` is not available at this moment. Check it later.
    && (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .retrieveAxisBreaksOption */ .PP)(axis.model, axis.type, true) == null
    // NOTE: `scale.getTicks()` is not available at this moment. Check it later.
    ) {
      // Request `alignTicks`.
      if (axis.model.get('alignTicks') && axis.model.get('interval') == null) {
        axisNeedsAlign.push(axis);
      } else {
        // `alignTo` the last one that does not request `alignTicks`
        // (This rule is retained for backward compat).
        alignTo = axis;
      }
    }
  }
  ;
  // If all axes has set alignTicks, pick the first one as alignTo.
  // PENDING. Should we find the axis that both set interval, min, max and align to this one?
  // PENDING. Should we allow specifying alignTo via ec option?
  if (!alignTo) {
    alignTo = axisNeedsAlign.pop();
  }
  if (alignTo) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axisNeedsAlign, function (axis) {
      axis.__alignTo = alignTo;
    });
  }
}
/**
 * This is just a defence code. They are unlikely to be actually `true`,
 * since these cases have been addressed in `prepareAlignToInCoordSysCreate`.
 *
 * Can not be called BEFORE "nice" performed.
 */
function incapableOfAlignNeedFallback(targetAxis, alignTo) {
  return (0,_scale_break_js__WEBPACK_IMPORTED_MODULE_16__/* .hasBreaks */ .Bd)(targetAxis.scale) || (0,_scale_break_js__WEBPACK_IMPORTED_MODULE_16__/* .hasBreaks */ .Bd)(alignTo.scale)
  // Normally ticks length are more than 2 even when axis is blank.
  // But still guard for corner cases and possible changes.
  || alignTo.scale.getTicks().length < 2;
}
function updateAxisTransform(axis, coordBase) {
  var axisExtent = axis.getExtent();
  var axisExtentSum = axisExtent[0] + axisExtent[1];
  // Fast transform
  axis.toGlobalCoord = axis.dim === 'x' ? function (coord) {
    return coord + coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
  axis.toLocalCoord = axis.dim === 'x' ? function (coord) {
    return coord - coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
}
function updateAllAxisExtentTransByGridRect(axesMap, gridRect) {
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap.x, function (axis) {
    return updateAxisExtentTransByGridRect(axis, gridRect.x, gridRect.width);
  });
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap.y, function (axis) {
    return updateAxisExtentTransByGridRect(axis, gridRect.y, gridRect.height);
  });
}
function updateAxisExtentTransByGridRect(axis, gridXY, gridWH) {
  var extent = [0, gridWH];
  var idx = axis.inverse ? 1 : 0;
  axis.setExtent(extent[idx], extent[1 - idx]);
  updateAxisTransform(axis, gridXY);
}
var legacyLayOutGridByContainLabel;
function registerLegacyGridContainLabelImpl(impl) {
  legacyLayOutGridByContainLabel = impl;
}
// Return noPxChange.
function layOutGridByOuterBounds(outerBoundsRect, outerBoundsContain, outerBoundsClamp, gridRect, axesMap, axisBuilderSharedCtx, layoutRef) {
  if (false) {}
  // Assume `updateAllAxisExtentTransByGridRect` has been performed once before this call.
  // [NOTE]:
  // - The bounding rect of the axis elements might be sensitve to variations in `axis.extent` due to strategies
  //  like hideOverlap/moveOverlap. @see the comment in `LabelLayoutBase['suggestIgnore']`.
  // - The final `gridRect` might be slightly smaller than the ideally expected result if labels are giant and
  //  get hidden due to overlapping. More iterations could improve precision, but not performant. We consider
  //  the current result acceptable, since no alignment among charts can be guaranteed when using this feature.
  createOrUpdateAxesView(gridRect, axesMap, _axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_7__/* .AxisTickLabelComputingKind */ .fm.estimate, outerBoundsContain, false, layoutRef);
  var margin = [0, 0, 0, 0];
  fillLabelNameOverflowOnOneDimension(0);
  fillLabelNameOverflowOnOneDimension(1);
  // If axis is blank, no label can be used to detect overflow.
  // gridRect itself should not overflow.
  fillMarginOnOneDimension(gridRect, 0, NaN);
  fillMarginOnOneDimension(gridRect, 1, NaN);
  var noPxChange = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.find)(margin, function (item) {
    return item > 0;
  }) == null;
  (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.expandOrShrinkRect)(gridRect, margin, true, true, outerBoundsClamp);
  updateAllAxisExtentTransByGridRect(axesMap, gridRect);
  return noPxChange;
  function fillLabelNameOverflowOnOneDimension(xyIdx) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.XY[xyIdx]], function (axis) {
      if (!(0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .shouldAxisShow */ .Qs)(axis.model)) {
        return;
      }
      // FIXME: zr Group.union may wrongly union (0, 0, 0, 0) and not performant.
      // unionRect.union(axis.axisBuilder.group.getBoundingRect());
      // If ussing Group.getBoundingRect to calculate shrink space, it is not strictly accurate when
      // the outermost label is ignored and the secondary label is very long and contribute to the
      // union extension:
      //      -|---|---|---|
      //         1,000,000,000
      // Therefore we calculate them one by one.
      // Also considered axis may be blank or no labels.
      var sharedRecord = axisBuilderSharedCtx.ensureRecord(axis.model);
      var labelInfoList = sharedRecord.labelInfoList;
      if (labelInfoList) {
        for (var idx = 0; idx < labelInfoList.length; idx++) {
          var labelInfo = labelInfoList[idx];
          var proportion = axis.scale.normalize((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .getTickValueOutermost */ .NQ)(axis.scale, (0,_component_axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_18__/* .getLabelInner */ .Z0)(labelInfo.label).labelInfo.tick));
          proportion = xyIdx === 1 ? 1 - proportion : proportion;
          // xAxis use proportion on x, yAxis use proprotion on y, otherwise not.
          fillMarginOnOneDimension(labelInfo.rect, xyIdx, proportion);
          fillMarginOnOneDimension(labelInfo.rect, 1 - xyIdx, NaN);
        }
      }
      var nameLayout = sharedRecord.nameLayout;
      if (nameLayout) {
        var proportion = (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .isNameLocationCenter */ .SS)(sharedRecord.nameLocation) ? 0.5 : NaN;
        fillMarginOnOneDimension(nameLayout.rect, xyIdx, proportion);
        fillMarginOnOneDimension(nameLayout.rect, 1 - xyIdx, NaN);
      }
    });
  }
  function fillMarginOnOneDimension(itemRect, xyIdx, proportion // NaN mean no use proportion
  ) {
    var overflow1 = outerBoundsRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.XY[xyIdx]] - itemRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.XY[xyIdx]];
    var overflow2 = itemRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.WH[xyIdx]] + itemRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.XY[xyIdx]] - (outerBoundsRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.WH[xyIdx]] + outerBoundsRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.XY[xyIdx]]);
    overflow1 = applyProportion(overflow1, 1 - proportion);
    overflow2 = applyProportion(overflow2, proportion);
    var minIdx = XY_TO_MARGIN_IDX[xyIdx][0];
    var maxIdx = XY_TO_MARGIN_IDX[xyIdx][1];
    margin[minIdx] = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_19__/* .mathMax */ .JB)(margin[minIdx], overflow1);
    margin[maxIdx] = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_19__/* .mathMax */ .JB)(margin[maxIdx], overflow2);
  }
  function applyProportion(overflow, proportion) {
    // proportion is not likely to near zero. If so, give up shrink
    if (overflow > 0 && !(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.eqNaN)(proportion) && proportion > 1e-4) {
      overflow /= proportion;
    }
    return overflow;
  }
}
function createAxisBiulders(gridRect, cartesians, axesMap, optionContainLabel, api) {
  var axisBuilderSharedCtx = new _component_axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_18__/* .AxisBuilderSharedContext */ .ts(resolveAxisNameOverlapForGrid);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap, function (axisList) {
    return (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axisList, function (axis) {
      if ((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .shouldAxisShow */ .Qs)(axis.model)) {
        // See `AxisBaseOptionCommon['nameMoveOverlap']`.
        var defaultNameMoveOverlap = !optionContainLabel;
        axis.axisBuilder = (0,_cartesianAxisHelper_js__WEBPACK_IMPORTED_MODULE_13__/* .createCartesianAxisViewCommonPartBuilder */ .oj)(gridRect, cartesians, axis.model, api, axisBuilderSharedCtx, defaultNameMoveOverlap);
      }
    });
  });
  return axisBuilderSharedCtx;
}
/**
 * Promote the axis-elements-building from "view render" stage to "coordinate system resize" stage.
 * This is aimed to resovle overlap across multiple axes, since currently it's hard to reconcile
 * multiple axes in "view render" stage.
 *
 * [CAUTION] But this promotion assumes that the subsequent "visual mapping" stage does not affect
 * this axis-elements-building; otherwise we have to refactor it again.
 */
function createOrUpdateAxesView(gridRect, axesMap, kind, outerBoundsContain, noPxChange, layoutRef) {
  var isDetermine = kind === _axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_7__/* .AxisTickLabelComputingKind */ .fm.determine;
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap, function (axisList) {
    return (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axisList, function (axis) {
      if ((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .shouldAxisShow */ .Qs)(axis.model)) {
        (0,_cartesianAxisHelper_js__WEBPACK_IMPORTED_MODULE_13__/* .updateCartesianAxisViewCommonPartBuilder */ .Pd)(axis.axisBuilder, gridRect, axis.model);
        axis.axisBuilder.build(isDetermine ? {
          axisTickLabelDetermine: true
        } : {
          axisTickLabelEstimate: true
        }, {
          noPxChange: noPxChange
        });
      }
    });
  });
  var nameMarginLevelMap = {
    x: 0,
    y: 0
  };
  calcNameMarginLevel(0);
  calcNameMarginLevel(1);
  function calcNameMarginLevel(xyIdx) {
    nameMarginLevelMap[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.XY[1 - xyIdx]] = gridRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.WH[xyIdx]] <= layoutRef.refContainer[_util_graphic_js__WEBPACK_IMPORTED_MODULE_17__.WH[xyIdx]] * 0.5 ? 0 : 1 - xyIdx === 1 ? 2 : 1;
  }
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axesMap, function (axisList, xy) {
    return (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(axisList, function (axis) {
      if ((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .shouldAxisShow */ .Qs)(axis.model)) {
        if (outerBoundsContain === 'all' || isDetermine) {
          // To resolve overlap, `axisName` layout depends on `axisTickLabel` layout result
          // (all of the axes of the same `grid`; consider multiple x or y axes).
          axis.axisBuilder.build({
            axisName: true
          }, {
            nameMarginLevel: nameMarginLevelMap[xy]
          });
        }
        if (isDetermine) {
          axis.axisBuilder.build({
            axisLine: true
          });
        }
      }
    });
  });
}
function prepareOuterBounds(gridModel, rawGridRect, layoutRef) {
  var outerBoundsRect;
  var optionOuterBoundsMode = gridModel.get('outerBoundsMode', true);
  if (optionOuterBoundsMode === 'same') {
    outerBoundsRect = rawGridRect.clone();
  } else if (optionOuterBoundsMode == null || optionOuterBoundsMode === 'auto') {
    outerBoundsRect = (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_6__/* .getLayoutRect */ .dV)(gridModel.get('outerBounds', true) || _GridModel_js__WEBPACK_IMPORTED_MODULE_12__/* .OUTER_BOUNDS_DEFAULT */ .GH, layoutRef.refContainer);
  } else if (optionOuterBoundsMode !== 'none') {
    if (false) {}
  }
  var optionOuterBoundsContain = gridModel.get('outerBoundsContain', true);
  var parsedOuterBoundsContain;
  if (optionOuterBoundsContain == null || optionOuterBoundsContain === 'auto') {
    parsedOuterBoundsContain = 'all';
  } else if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(['all', 'axisLabel'], optionOuterBoundsContain) < 0) {
    if (false) {}
    parsedOuterBoundsContain = 'all';
  } else {
    parsedOuterBoundsContain = optionOuterBoundsContain;
  }
  var outerBoundsClamp = [(0,_util_number_js__WEBPACK_IMPORTED_MODULE_19__/* .parsePositionSizeOption */ .LQ)((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2)(gridModel.get('outerBoundsClampWidth', true), _GridModel_js__WEBPACK_IMPORTED_MODULE_12__/* .OUTER_BOUNDS_CLAMP_DEFAULT */ .MQ[0]), rawGridRect.width), (0,_util_number_js__WEBPACK_IMPORTED_MODULE_19__/* .parsePositionSizeOption */ .LQ)((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2)(gridModel.get('outerBoundsClampHeight', true), _GridModel_js__WEBPACK_IMPORTED_MODULE_12__/* .OUTER_BOUNDS_CLAMP_DEFAULT */ .MQ[1]), rawGridRect.height)];
  return {
    outerBoundsRect: outerBoundsRect,
    parsedOuterBoundsContain: parsedOuterBoundsContain,
    outerBoundsClamp: outerBoundsClamp
  };
}
var resolveAxisNameOverlapForGrid = function (cfg, ctx, axisModel, nameLayoutInfo, nameMoveDirVec, thisRecord) {
  var perpendicularDim = axisModel.axis.dim === 'x' ? 'y' : 'x';
  (0,_component_axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_18__/* .resolveAxisNameOverlapDefault */ .x)(cfg, ctx, axisModel, nameLayoutInfo, nameMoveDirVec, thisRecord);
  // If nameLocation 'center', and there are multiple axes parallel to this axis, do not adjust by
  //  other axes, because the axis name should be close to its axis line as much as possible even
  //  if overlapping; otherwise it might cause misleading.
  // If nameLocation 'center', do not adjust by perpendicular axes, since they are not likely to overlap.
  // If nameLocation 'start'/'end', move name within the same direction to escape overlap with the
  //  perpendicular axes.
  if (!(0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_9__/* .isNameLocationCenter */ .SS)(cfg.nameLocation)) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(ctx.recordMap[perpendicularDim], function (perpenRecord) {
      // perpendicular axis may be no name.
      if (perpenRecord && perpenRecord.labelInfoList && perpenRecord.dirVec) {
        (0,_component_axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_18__/* .moveIfOverlapByLinearLabels */ .RC)(perpenRecord.labelInfoList, perpenRecord.dirVec, nameLayoutInfo, nameMoveDirVec);
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grid);

/***/ }),

/***/ 16483:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ registerMetricImplLiPosMinGap)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84408);
/* harmony import */ var _data_helper_dataValueHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40059);
/* harmony import */ var _util_vendor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44951);
/* harmony import */ var _axisStatistics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77596);

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





function registerMetricImplLiPosMinGap() {
  (0,_axisStatistics_js__WEBPACK_IMPORTED_MODULE_0__/* .registerMetricImpl */ .wW)('liPosMinGap', metricLiPosMinGapImpl);
}
function metricLiPosMinGapImpl(ecModel, perKeyPerAxis, ecPreparePerKeyPerAxis) {
  var newSerUids = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.createHashMap)();
  var ecPrepareSerUids = ecPreparePerKeyPerAxis.serUids;
  var ecPrepareLiPosMinGap = ecPreparePerKeyPerAxis.liPosMinGap;
  var ecPrepareCacheMiss;
  var axis = perKeyPerAxis.axis;
  var scale = axis.scale;
  // const linearValueExtent = initExtentForUnion();
  var needTransform = scale.needTransform();
  var filter = scale.getFilter ? scale.getFilter() : null;
  var filterParsed = (0,_data_helper_dataValueHelper_js__WEBPACK_IMPORTED_MODULE_2__/* .parseSanitizationFilter */ .$6)(filter);
  // const timeRetrieve: number[] = []; // _EC_PERF_
  // const timeSort: number[] = []; // _EC_PERF_
  // const timeAll: number[] = []; // _EC_PERF_
  // timeAll[0] = Date.now(); // _EC_PERF_
  function eachSeries(cb) {
    (0,_axisStatistics_js__WEBPACK_IMPORTED_MODULE_0__/* .eachSeriesDealForAxisStat */ .B_)(ecModel, perKeyPerAxis.sers, function (seriesModel) {
      var rawData = seriesModel.getRawData();
      // NOTE: Currently there is no series that a "base axis" can map to multiple dimensions.
      var dimStoreIdx = rawData.getDimensionIndex(rawData.mapDimension(axis.dim));
      if (dimStoreIdx >= 0) {
        cb(dimStoreIdx, seriesModel, rawData.getStore());
      }
    });
  }
  var bufferCapacity = 0;
  eachSeries(function (dimStoreIdx, seriesModel, rawDataStore) {
    newSerUids.set(seriesModel.uid, 1);
    if (!ecPrepareSerUids || !ecPrepareSerUids.hasKey(seriesModel.uid)) {
      ecPrepareCacheMiss = true;
    }
    bufferCapacity += rawDataStore.count();
  });
  if (!ecPrepareSerUids || ecPrepareSerUids.keys().length !== newSerUids.keys().length) {
    ecPrepareCacheMiss = true;
  }
  if (!ecPrepareCacheMiss && ecPrepareLiPosMinGap != null) {
    // Consider the fact in practice:
    //  - Series data can only be changed in EC_PREPARE.
    //  - The relationship between series and axes can only be changed in EC_PREPARE and
    //    SERIES_FILTER.
    //  (See EC_CYCLE for more info)
    // Therefore, some statistics results can be cached in `GlobalModelCachePerECPrepare` to avoid
    // repeated time-consuming calculation for large data (e.g., over 1e5 data items).
    perKeyPerAxis.liPosMinGap = ecPrepareLiPosMinGap;
    return;
  }
  (0,_util_vendor_js__WEBPACK_IMPORTED_MODULE_3__/* .tryEnsureTypedArray */ .Zi)(tmpValueBuffer, bufferCapacity);
  // timeRetrieve[0] = Date.now(); // _EC_PERF_
  var writeIdx = 0;
  eachSeries(function (dimStoreIdx, seriesModel, store) {
    // NOTE: It appears to be optimized by traveling only in a specific window (e.g., the current window)
    // instead of the entire data, but that would likely generate inconsistent result and bring
    // jitter when dataZoom roaming.
    for (var i = 0, cnt = store.count(); i < cnt; ++i) {
      // Manually inline some code for performance, since no other optimization
      // (such as, progressive) can be applied here.
      var val = store.get(dimStoreIdx, i);
      // NOTE: in most cases, filter does not exist.
      if (isFinite(val) && (!filter || (0,_data_helper_dataValueHelper_js__WEBPACK_IMPORTED_MODULE_2__/* .passesSanitizationFilter */ .V7)(filterParsed, val))) {
        if (needTransform) {
          // PENDING: time-consuming if axis break is applied.
          val = scale.transformIn(val, null);
        }
        tmpValueBuffer.arr[writeIdx++] = val;
        // val < linearValueExtent[0] && (linearValueExtent[0] = val);
        // val > linearValueExtent[1] && (linearValueExtent[1] = val);
      }
    }
  });
  // Indicatively, retrieving values above costs 40ms for 1e6 values in a certain platform.
  // timeRetrieve[1] = Date.now(); // _EC_PERF_
  var tmpValueBufferView = tmpValueBuffer.typed ? tmpValueBuffer.arr.subarray(0, writeIdx) : (tmpValueBuffer.arr.length = writeIdx, tmpValueBuffer.arr);
  // timeSort[0] = Date.now(); // _EC_PERF_
  // Sort axis values into ascending order to calculate gaps.
  if (tmpValueBuffer.typed) {
    // Indicatively, 5ms for 1e6 values in a certain platform.
    tmpValueBufferView.sort();
  } else {
    (0,_util_number_js__WEBPACK_IMPORTED_MODULE_4__/* .asc */ .Y6)(tmpValueBufferView);
  }
  // timeAll[1] = timeSort[1] = Date.now(); // _EC_PERF_
  // console.log('axisStatistics_minGap_retrieve', timeRetrieve[1] - timeRetrieve[0]); // _EC_PERF_
  // console.log('axisStatistics_minGap_sort', timeSort[1] - timeSort[0]); // _EC_PERF_
  // console.log('axisStatistics_minGap_all', timeAll[1] - timeAll[0]); // _EC_PERF_
  var min = Infinity;
  for (var j = 1; j < writeIdx; ++j) {
    var delta = tmpValueBufferView[j] - tmpValueBufferView[j - 1];
    if (
    // - Different series normally have the same values (e.g., barA, barB, barC),
    //   which should be ignored.
    // - A single series with multiple same values is often not meaningful to
    //   create `bandWidth`, so it is also ignored.
    delta > 0 && delta < min) {
      min = delta;
    }
  }
  ecPreparePerKeyPerAxis.liPosMinGap = perKeyPerAxis.liPosMinGap = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_4__/* .isNullableNumberFinite */ .YC)(min) ? min : writeIdx > 0 ? _axisStatistics_js__WEBPACK_IMPORTED_MODULE_0__/* .LINEAR_POSITIVE_MIN_GAP_SINGLE_VALID_VALUE */ .e2 : _axisStatistics_js__WEBPACK_IMPORTED_MODULE_0__/* .LINEAR_POSITIVE_MIN_GAP_NO_VALID_VALUE */ .Lc;
  ecPreparePerKeyPerAxis.serUids = newSerUids;
}
// For performance optimization.
var tmpValueBuffer = (0,_util_vendor_js__WEBPACK_IMPORTED_MODULE_3__/* .tryEnsureTypedArray */ .Zi)({
  ctor: _util_vendor_js__WEBPACK_IMPORTED_MODULE_3__/* .Float64ArrayCtor */ .MO
}, 50 // An arbitrary initial capability.
);

/***/ }),

/***/ 21378:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _Axis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13943);

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


var Axis2D = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(Axis2D, _super);
  function Axis2D(dim, scale, coordExtent, axisType, position) {
    var _this = _super.call(this, dim, scale, coordExtent) || this;
    /**
     * Index of axis, can be used as key
     * Injected outside.
     */
    _this.index = 0;
    _this.type = axisType || 'value';
    _this.position = position || 'bottom';
    return _this;
  }
  Axis2D.prototype.isHorizontal = function () {
    var position = this.position;
    return position === 'top' || position === 'bottom';
  };
  /**
   * Each item cooresponds to this.getExtent(), which
   * means globalExtent[0] may greater than globalExtent[1],
   * unless `asc` is input.
   *
   * @param {boolean} [asc]
   * @return {Array.<number>}
   */
  Axis2D.prototype.getGlobalExtent = function (asc) {
    var ret = this.getExtent();
    ret[0] = this.toGlobalCoord(ret[0]);
    ret[1] = this.toGlobalCoord(ret[1]);
    asc && ret[0] > ret[1] && ret.reverse();
    return ret;
  };
  Axis2D.prototype.pointToData = function (point, clamp) {
    return this.coordToData(this.toLocalCoord(point[this.dim === 'x' ? 0 : 1]), clamp);
  };
  /**
   * Set ordinalSortInfo
   * @param info new OrdinalSortInfo
   */
  Axis2D.prototype.setCategorySortInfo = function (info) {
    if (this.type !== 'category') {
      return false;
    }
    this.model.option.categorySortInfo = info;
    this.scale.setSortInfo(info);
  };
  return Axis2D;
}(_Axis_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axis2D);

/***/ }),

/***/ 23347:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Parallel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98585);
/* harmony import */ var _ParallelModel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37838);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11138);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11916);
/* harmony import */ var _axisStatistics_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(77596);

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
 * Parallel coordinate system creator.
 */





function createParallelCoordSys(ecModel, api) {
  var coordSysList = [];
  ecModel.eachComponent(_ParallelModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COMPONENT_TYPE_PARALLEL */ .JC, function (parallelModel, idx) {
    var coordSys = new _Parallel_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(parallelModel, ecModel, api);
    coordSys.name = 'parallel_' + idx;
    coordSys.resize(parallelModel, api);
    parallelModel.coordinateSystem = coordSys;
    coordSys.model = parallelModel;
    coordSysList.push(coordSys);
  });
  // Inject the coordinateSystems into seriesModel
  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === _ParallelModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COORD_SYS_TYPE_PARALLEL */ .ti) {
      var parallelModel = seriesModel.getReferringComponents(_ParallelModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COMPONENT_TYPE_PARALLEL */ .JC, _util_model_js__WEBPACK_IMPORTED_MODULE_2__/* .SINGLE_REFERRING */ .US).models[0];
      var parallel_1 = seriesModel.coordinateSystem = parallelModel.coordinateSystem;
      if (parallel_1) {
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(parallel_1.dimensions, function (dim) {
          (0,_axisStatistics_js__WEBPACK_IMPORTED_MODULE_4__/* .associateSeriesWithAxis */ .Lb)(parallel_1.getAxis(dim), seriesModel, _ParallelModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COORD_SYS_TYPE_PARALLEL */ .ti);
        });
      }
    }
  });
  return coordSysList;
}
var parallelCoordSysCreator = {
  create: createParallelCoordSys
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parallelCoordSysCreator);

/***/ }),

/***/ 23695:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   U: () => (/* binding */ cartesian2DDimensions)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30582);
/* harmony import */ var _Cartesian_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(93345);
/* harmony import */ var _GridModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38070);
/* harmony import */ var zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43041);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2103);
/* harmony import */ var _scale_scaleMapper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30422);
/* harmony import */ var _scale_break_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30098);

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








var cartesian2DDimensions = ['x', 'y'];
function canCalculateAffineTransform(scale) {
  // Only supported on linear space.
  return (scale.type === 'interval' || scale.type === 'time') && !(0,_scale_break_js__WEBPACK_IMPORTED_MODULE_0__/* .hasBreaks */ .Bd)(scale);
}
var Cartesian2D = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__extends */ .C6)(Cartesian2D, _super);
  function Cartesian2D() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = _GridModel_js__WEBPACK_IMPORTED_MODULE_2__/* .COORD_SYS_TYPE_CARTESIAN_2D */ .Tw;
    _this.dimensions = cartesian2DDimensions;
    return _this;
  }
  /**
   * Calculate an affine transform matrix if two axes are time or value.
   * It's mainly for accelartion on the large time series data.
   */
  Cartesian2D.prototype.calcAffineTransform = function () {
    this._transform = this._invTransform = null;
    var xAxisScale = this.getAxis('x').scale;
    var yAxisScale = this.getAxis('y').scale;
    if (!canCalculateAffineTransform(xAxisScale) || !canCalculateAffineTransform(yAxisScale)) {
      return;
    }
    var xScaleExtent = (0,_scale_scaleMapper_js__WEBPACK_IMPORTED_MODULE_3__/* .getScaleExtentForMappingUnsafe */ .Gj)(xAxisScale, null);
    var yScaleExtent = (0,_scale_scaleMapper_js__WEBPACK_IMPORTED_MODULE_3__/* .getScaleExtentForMappingUnsafe */ .Gj)(yAxisScale, null);
    var start = this.dataToPoint([xScaleExtent[0], yScaleExtent[0]]);
    var end = this.dataToPoint([xScaleExtent[1], yScaleExtent[1]]);
    var xScaleSpan = xScaleExtent[1] - xScaleExtent[0];
    var yScaleSpan = yScaleExtent[1] - yScaleExtent[0];
    if (!xScaleSpan || !yScaleSpan) {
      return;
    }
    // Accelerate data to point calculation on the special large time series data.
    var scaleX = (end[0] - start[0]) / xScaleSpan;
    var scaleY = (end[1] - start[1]) / yScaleSpan;
    var translateX = start[0] - xScaleExtent[0] * scaleX;
    var translateY = start[1] - yScaleExtent[0] * scaleY;
    var m = this._transform = [scaleX, 0, 0, scaleY, translateX, translateY];
    this._invTransform = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.invert)([], m);
  };
  /**
   * Base axis will be used on stacking and series such as 'bar', 'pictorialBar', etc.
   */
  Cartesian2D.prototype.getBaseAxis = function () {
    // FIXME:
    //  (1) We should allow series (e.g., bar) to specify a base axis when
    //      both axes are type "value", rather than force to xAxis or angleAxis.
    //      NOTE: At present BoxplotSeries has its own overide `getBaseAxis`.
    //      `CoordinateSystem['getBaseAxis']` probably should not exist, since it
    //      may introduce inconsistency with `Series['getBaseAxis']`.
    //  (2) "base axis" info is required in "createSeriesData" stage for "stack",
    //      (see `dataStackHelper.ts` for details). Currently it is hard coded there.
    return this.getAxesByScale('ordinal')[0] || this.getAxesByScale('time')[0] || this.getAxis('x');
  };
  Cartesian2D.prototype.containPoint = function (point) {
    var axisX = this.getAxis('x');
    var axisY = this.getAxis('y');
    return axisX.contain(axisX.toLocalCoord(point[0])) && axisY.contain(axisY.toLocalCoord(point[1]));
  };
  Cartesian2D.prototype.containData = function (data) {
    return this.getAxis('x').containData(data[0]) && this.getAxis('y').containData(data[1]);
  };
  Cartesian2D.prototype.containZone = function (data1, data2) {
    var zoneDiag1 = this.dataToPoint(data1);
    var zoneDiag2 = this.dataToPoint(data2);
    var area = this.getArea();
    var zone = new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(zoneDiag1[0], zoneDiag1[1], zoneDiag2[0] - zoneDiag1[0], zoneDiag2[1] - zoneDiag1[1]);
    return area.intersect(zone);
  };
  Cartesian2D.prototype.dataToPoint = function (data, clamp, out) {
    out = out || [];
    var xVal = data[0];
    var yVal = data[1];
    // [CAVEAT]: Do not add time consuming operation within and before fast path.
    // Fast path.
    if (this._transform
    // It's supported that if data is like `[Inifity, 123]`, where only Y pixel calculated.
    && xVal != null && isFinite(xVal) && yVal != null && isFinite(yVal)) {
      return (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__.applyTransform)(out, data, this._transform);
    }
    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out[0] = xAxis.toGlobalCoord(xAxis.dataToCoord(xVal, clamp));
    out[1] = yAxis.toGlobalCoord(yAxis.dataToCoord(yVal, clamp));
    return out;
  };
  Cartesian2D.prototype.clampData = function (data, out) {
    var xScale = this.getAxis('x').scale;
    var yScale = this.getAxis('y').scale;
    var xAxisExtent = xScale.getExtent();
    var yAxisExtent = yScale.getExtent();
    var x = xScale.parse(data[0]);
    var y = yScale.parse(data[1]);
    out = out || [];
    out[0] = Math.min(Math.max(Math.min(xAxisExtent[0], xAxisExtent[1]), x), Math.max(xAxisExtent[0], xAxisExtent[1]));
    out[1] = Math.min(Math.max(Math.min(yAxisExtent[0], yAxisExtent[1]), y), Math.max(yAxisExtent[0], yAxisExtent[1]));
    return out;
  };
  Cartesian2D.prototype.pointToData = function (point, clamp, out) {
    out = out || [];
    if (this._invTransform) {
      return (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_6__.applyTransform)(out, point, this._invTransform);
    }
    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out[0] = xAxis.coordToData(xAxis.toLocalCoord(point[0]), clamp);
    out[1] = yAxis.coordToData(yAxis.toLocalCoord(point[1]), clamp);
    return out;
  };
  Cartesian2D.prototype.getOtherAxis = function (axis) {
    return this.getAxis(axis.dim === 'x' ? 'y' : 'x');
  };
  /**
   * Get rect area of cartesian.
   * Area will have a contain function to determine if a point is in the coordinate system.
   */
  Cartesian2D.prototype.getArea = function (tolerance) {
    tolerance = tolerance || 0;
    var xExtent = this.getAxis('x').getGlobalExtent();
    var yExtent = this.getAxis('y').getGlobalExtent();
    var x = Math.min(xExtent[0], xExtent[1]) - tolerance;
    var y = Math.min(yExtent[0], yExtent[1]) - tolerance;
    var width = Math.max(xExtent[0], xExtent[1]) - x + tolerance;
    var height = Math.max(yExtent[0], yExtent[1]) - y + tolerance;
    return new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(x, y, width, height);
  };
  return Cartesian2D;
}(_Cartesian_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A);
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cartesian2D);

/***/ }),

/***/ 24781:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ CartesianAxisModel)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11916);
/* harmony import */ var _model_Component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79057);
/* harmony import */ var _axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80222);
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





var CartesianAxisModel = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(CartesianAxisModel, _super);
  function CartesianAxisModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  CartesianAxisModel.prototype.getCoordSysModel = function () {
    return this.getReferringComponents('grid', _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .SINGLE_REFERRING */ .US).models[0];
  };
  CartesianAxisModel.type = 'cartesian2dAxis';
  return CartesianAxisModel;
}(_model_Component_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);

zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.mixin(CartesianAxisModel, _axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_4__/* .AxisModelCommonMixin */ .L);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (CartesianAxisModel)));

/***/ }),

/***/ 25114:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ stopPreviousKeyframeAnimationAndRestore),
/* harmony export */   L: () => (/* binding */ applyKeyframeAnimation)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _customGraphicTransition_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(99175);
/* harmony import */ var _basicTransition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55736);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11138);

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





var getStateToRestore = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_0__/* .makeInner */ .$r)();
var KEYFRAME_EXCLUDE_KEYS = ['percent', 'easing', 'shape', 'style', 'extra'];
/**
 * Stop previous keyframe animation and restore the attributes.
 * Avoid new keyframe animation starts with wrong internal state when the percent: 0 is not set.
 */
function stopPreviousKeyframeAnimationAndRestore(el) {
  // Stop previous keyframe animation.
  el.stopAnimation('keyframe');
  // Restore
  el.attr(getStateToRestore(el));
}
function applyKeyframeAnimation(el, animationOpts, animatableModel) {
  if (!animatableModel.isAnimationEnabled() || !animationOpts) {
    return;
  }
  if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(animationOpts)) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(animationOpts, function (singleAnimationOpts) {
      applyKeyframeAnimation(el, singleAnimationOpts, animatableModel);
    });
    return;
  }
  var keyframes = animationOpts.keyframes;
  var duration = animationOpts.duration;
  if (animatableModel && duration == null) {
    // Default to use duration of config.
    // NOTE: animation config from payload will be ignored because they are mainly for transitions.
    var config = (0,_basicTransition_js__WEBPACK_IMPORTED_MODULE_2__/* .getAnimationConfig */ .Jw)('enter', animatableModel, 0);
    duration = config && config.duration;
  }
  if (!keyframes || !duration) {
    return;
  }
  var stateToRestore = getStateToRestore(el);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(_customGraphicTransition_js__WEBPACK_IMPORTED_MODULE_3__/* .ELEMENT_ANIMATABLE_PROPS */ .rd, function (targetPropName) {
    if (targetPropName && !el[targetPropName]) {
      return;
    }
    var animator;
    var endFrameIsSet = false;
    // Sort keyframes by percent.
    keyframes.sort(function (a, b) {
      return a.percent - b.percent;
    });
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(keyframes, function (kf) {
      // Stop current animation.
      var animators = el.animators;
      var kfValues = targetPropName ? kf[targetPropName] : kf;
      if (false) {}
      if (!kfValues) {
        return;
      }
      var propKeys = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.keys)(kfValues);
      if (!targetPropName) {
        // PENDING performance?
        propKeys = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.filter)(propKeys, function (key) {
          return (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.indexOf)(KEYFRAME_EXCLUDE_KEYS, key) < 0;
        });
      }
      if (!propKeys.length) {
        return;
      }
      if (!animator) {
        animator = el.animate(targetPropName, animationOpts.loop, true);
        animator.scope = 'keyframe';
      }
      for (var i = 0; i < animators.length; i++) {
        // Stop all other animation that is not keyframe.
        if (animators[i] !== animator && animators[i].targetName === animator.targetName) {
          animators[i].stopTracks(propKeys);
        }
      }
      targetPropName && (stateToRestore[targetPropName] = stateToRestore[targetPropName] || {});
      var savedTarget = targetPropName ? stateToRestore[targetPropName] : stateToRestore;
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(propKeys, function (key) {
        // Save original value.
        savedTarget[key] = ((targetPropName ? el[targetPropName] : el) || {})[key];
      });
      animator.whenWithKeys(duration * kf.percent, kfValues, propKeys, kf.easing);
    });
    if (!animator) {
      return;
    }
    if (false) {}
    animator.delay(animationOpts.delay || 0).duration(duration).start(animationOpts.easing);
  });
}

/***/ }),

/***/ 26565:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   vb: () => (/* binding */ AXIS_BREAK_EXPAND_ACTION_TYPE)
/* harmony export */ });
/* unused harmony exports AXIS_BREAK_COLLAPSE_ACTION_TYPE, AXIS_BREAK_TOGGLE_ACTION_TYPE, registerAction */
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);

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


var AXIS_BREAK_EXPAND_ACTION_TYPE = 'expandAxisBreak';
var AXIS_BREAK_COLLAPSE_ACTION_TYPE = 'collapseAxisBreak';
var AXIS_BREAK_TOGGLE_ACTION_TYPE = 'toggleAxisBreak';
var AXIS_BREAK_CHANGED_EVENT_TYPE = 'axisbreakchanged';
var expandAxisBreakActionInfo = {
  type: AXIS_BREAK_EXPAND_ACTION_TYPE,
  event: AXIS_BREAK_CHANGED_EVENT_TYPE,
  update: 'update',
  refineEvent: refineAxisBreakChangeEvent
};
var collapseAxisBreakActionInfo = {
  type: AXIS_BREAK_COLLAPSE_ACTION_TYPE,
  event: AXIS_BREAK_CHANGED_EVENT_TYPE,
  update: 'update',
  refineEvent: refineAxisBreakChangeEvent
};
var toggleAxisBreakActionInfo = {
  type: AXIS_BREAK_TOGGLE_ACTION_TYPE,
  event: AXIS_BREAK_CHANGED_EVENT_TYPE,
  update: 'update',
  refineEvent: refineAxisBreakChangeEvent
};
function refineAxisBreakChangeEvent(actionResultBatch, payload, ecModel, api) {
  var breaks = [];
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(actionResultBatch, function (actionResult) {
    breaks = breaks.concat(actionResult.eventBreaks);
  });
  return {
    eventContent: {
      breaks: breaks
    }
  };
}
function registerAction(registers) {
  registers.registerAction(expandAxisBreakActionInfo, actionHandler);
  registers.registerAction(collapseAxisBreakActionInfo, actionHandler);
  registers.registerAction(toggleAxisBreakActionInfo, actionHandler);
  function actionHandler(payload, ecModel) {
    var eventBreaks = [];
    var finderResult = parseFinder(ecModel, payload);
    function dealUpdate(modelProp, indexProp) {
      each(finderResult[modelProp], function (axisModel) {
        var result = axisModel.updateAxisBreaks(payload);
        each(result.breaks, function (item) {
          var _a;
          eventBreaks.push(defaults((_a = {}, _a[indexProp] = axisModel.componentIndex, _a), item));
        });
      });
    }
    dealUpdate('xAxisModels', 'xAxisIndex');
    dealUpdate('yAxisModels', 'yAxisIndex');
    dealUpdate('singleAxisModels', 'singleAxisIndex');
    return {
      eventBreaks: eventBreaks
    };
  }
}

/***/ }),

/***/ 27017:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ns: () => (/* binding */ requireAxisStatisticsForBaseBar),
/* harmony export */   R8: () => (/* binding */ SERIES_TYPE_PICTORIAL_BAR),
/* harmony export */   ar: () => (/* binding */ getStartValue),
/* harmony export */   f4: () => (/* binding */ SERIES_TYPE_BAR)
/* harmony export */ });
/* harmony import */ var _chart_helper_axisSnippets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1653);
/* harmony import */ var _coord_axisStatistics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77596);

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




var SERIES_TYPE_BAR = 'bar';
var SERIES_TYPE_PICTORIAL_BAR = 'pictorialBar';
function requireAxisStatisticsForBaseBar(registers, axisStatKey, seriesType, coordSysType) {
  (0,_coord_axisStatistics_js__WEBPACK_IMPORTED_MODULE_0__/* .requireAxisStatistics */ .ss)(registers, {
    key: axisStatKey,
    seriesType: seriesType,
    coordSysType: coordSysType,
    getMetrics: _chart_helper_axisSnippets_js__WEBPACK_IMPORTED_MODULE_1__/* .createMetricsNonOrdinalLinearPositiveMinGap */ .sH
  });
}
// See cases in `test/bar-start.html` and `#7412`, `#8747`.
function getStartValue(baseAxis) {
  var val = baseAxis.scale.rawExtentInfo.makeRenderInfo().startValue;
  if (false) {}
  return val;
}

/***/ }),

/***/ 31644:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O8: () => (/* binding */ CartesianYAxisView),
/* harmony export */   xR: () => (/* binding */ CartesianXAxisView)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11916);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35980);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(88367);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29129);
/* harmony import */ var _AxisView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75854);
/* harmony import */ var _axisSplitHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31869);
/* harmony import */ var _axisBreakHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92161);
/* harmony import */ var _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69663);

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







var selfBuilderAttrs = ['splitArea', 'splitLine', 'minorSplitLine', 'breakArea'];
var CartesianAxisView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(CartesianAxisView, _super);
  function CartesianAxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = CartesianAxisView.type;
    _this.axisPointerClass = 'CartesianAxisPointer';
    return _this;
  }
  /**
   * @override
   */
  CartesianAxisView.prototype.render = function (axisModel, ecModel, api, payload) {
    this.group.removeAll();
    var oldAxisGroup = this._axisGroup;
    this._axisGroup = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();
    this.group.add(this._axisGroup);
    if (!(0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_2__/* .shouldAxisShow */ .Qs)(axisModel)) {
      return;
    }
    this._axisGroup.add(axisModel.axis.axisBuilder.group);
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each(selfBuilderAttrs, function (name) {
      if (axisModel.get([name, 'show'])) {
        axisElementBuilders[name](this, this._axisGroup, axisModel, axisModel.getCoordSysModel(), api);
      }
    }, this);
    // THIS is a special case for bar racing chart.
    // Update the axis label from the natural initial layout to
    // sorted layout should has no animation.
    var isInitialSortFromBarRacing = payload && payload.type === 'changeAxisOrder' && payload.isInitSort;
    if (!isInitialSortFromBarRacing) {
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__.groupTransition(oldAxisGroup, this._axisGroup, axisModel);
    }
    _super.prototype.render.call(this, axisModel, ecModel, api, payload);
  };
  CartesianAxisView.prototype.remove = function () {
    (0,_axisSplitHelper_js__WEBPACK_IMPORTED_MODULE_5__/* .rectCoordAxisHandleRemove */ .V)(this);
  };
  CartesianAxisView.type = 'cartesianAxis';
  return CartesianAxisView;
}(_AxisView_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A);
var axisElementBuilders = {
  splitLine: function (axisView, axisGroup, axisModel, gridModel, api) {
    var axis = axisModel.axis;
    if (axis.scale.isBlank()) {
      return;
    }
    var splitLineModel = axisModel.getModel('splitLine');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var lineColors = lineStyleModel.get('color');
    var showMinLine = splitLineModel.get('showMinLine') !== false;
    var showMaxLine = splitLineModel.get('showMaxLine') !== false;
    lineColors = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.isArray(lineColors) ? lineColors : [lineColors];
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var lineCount = 0;
    var ticksCoords = axis.getTicksCoords({
      tickModel: splitLineModel,
      breakTicks: 'none',
      pruneByBreak: 'preserve_extent_bound'
    });
    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();
    for (var i = 0; i < ticksCoords.length; i++) {
      var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);
      if (i === 0 && !showMinLine || i === ticksCoords.length - 1 && !showMaxLine) {
        continue;
      }
      var tickValue = ticksCoords[i].tickValue;
      if (isHorizontal) {
        p1[0] = tickCoord;
        p1[1] = gridRect.y;
        p2[0] = tickCoord;
        p2[1] = gridRect.y + gridRect.height;
      } else {
        p1[0] = gridRect.x;
        p1[1] = tickCoord;
        p2[0] = gridRect.x + gridRect.width;
        p2[1] = tickCoord;
      }
      var colorIndex = lineCount++ % lineColors.length;
      var line = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A({
        anid: tickValue != null ? 'line_' + tickValue : null,
        autoBatch: true,
        shape: {
          x1: p1[0],
          y1: p1[1],
          x2: p2[0],
          y2: p2[1]
        },
        style: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.defaults({
          stroke: lineColors[colorIndex]
        }, lineStyle),
        silent: true
      });
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__.subPixelOptimizeLine(line.shape, lineStyle.lineWidth);
      axisGroup.add(line);
    }
  },
  minorSplitLine: function (axisView, axisGroup, axisModel, gridModel, api) {
    var axis = axisModel.axis;
    var minorSplitLineModel = axisModel.getModel('minorSplitLine');
    var lineStyleModel = minorSplitLineModel.getModel('lineStyle');
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var minorTicksCoords = axis.getMinorTicksCoords();
    if (!minorTicksCoords.length) {
      return;
    }
    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();
    for (var i = 0; i < minorTicksCoords.length; i++) {
      for (var k = 0; k < minorTicksCoords[i].length; k++) {
        var tickCoord = axis.toGlobalCoord(minorTicksCoords[i][k].coord);
        if (isHorizontal) {
          p1[0] = tickCoord;
          p1[1] = gridRect.y;
          p2[0] = tickCoord;
          p2[1] = gridRect.y + gridRect.height;
        } else {
          p1[0] = gridRect.x;
          p1[1] = tickCoord;
          p2[0] = gridRect.x + gridRect.width;
          p2[1] = tickCoord;
        }
        var line = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A({
          anid: 'minor_line_' + minorTicksCoords[i][k].tickValue,
          autoBatch: true,
          shape: {
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1]
          },
          style: lineStyle,
          silent: true
        });
        _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__.subPixelOptimizeLine(line.shape, lineStyle.lineWidth);
        axisGroup.add(line);
      }
    }
  },
  splitArea: function (axisView, axisGroup, axisModel, gridModel, api) {
    (0,_axisSplitHelper_js__WEBPACK_IMPORTED_MODULE_5__/* .rectCoordAxisBuildSplitArea */ .Y)(axisView, axisGroup, axisModel, gridModel);
  },
  breakArea: function (axisView, axisGroup, axisModel, gridModel, api) {
    var axisBreakHelper = (0,_axisBreakHelper_js__WEBPACK_IMPORTED_MODULE_8__/* .getAxisBreakHelper */ .D)();
    var scale = axisModel.axis.scale;
    if (axisBreakHelper && scale.type !== 'ordinal') {
      axisBreakHelper.rectCoordBuildBreakAxis(axisGroup, axisView, axisModel, gridModel.coordinateSystem.getRect(), api);
    }
  }
};
var CartesianXAxisView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(CartesianXAxisView, _super);
  function CartesianXAxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = CartesianXAxisView.type;
    return _this;
  }
  CartesianXAxisView.type = 'xAxis';
  return CartesianXAxisView;
}(CartesianAxisView);

var CartesianYAxisView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(CartesianYAxisView, _super);
  function CartesianYAxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = CartesianXAxisView.type;
    return _this;
  }
  CartesianYAxisView.type = 'yAxis';
  return CartesianYAxisView;
}(CartesianAxisView);

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (CartesianAxisView)));

/***/ }),

/***/ 31869:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ rectCoordAxisHandleRemove),
/* harmony export */   Y: () => (/* binding */ rectCoordAxisBuildSplitArea)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19137);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11138);

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



var inner = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_0__/* .makeInner */ .$r)();
function rectCoordAxisBuildSplitArea(axisView, axisGroup, axisModel, gridModel) {
  var axis = axisModel.axis;
  if (axis.scale.isBlank()) {
    return;
  }
  var splitAreaModel = axisModel.getModel('splitArea');
  var areaStyleModel = splitAreaModel.getModel('areaStyle');
  var areaColors = areaStyleModel.get('color');
  var gridRect = gridModel.coordinateSystem.getRect();
  var ticksCoords = axis.getTicksCoords({
    tickModel: splitAreaModel,
    breakTicks: 'none',
    pruneByBreak: 'preserve_extent_bound'
  });
  if (!ticksCoords.length) {
    return;
  }
  // For Making appropriate splitArea animation, the color and anid
  // should be corresponding to previous one if possible.
  var areaColorsLen = areaColors.length;
  var lastSplitAreaColors = inner(axisView).splitAreaColors;
  var newSplitAreaColors = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.createHashMap();
  var colorIndex = 0;
  if (lastSplitAreaColors) {
    for (var i = 0; i < ticksCoords.length; i++) {
      var cIndex = lastSplitAreaColors.get(ticksCoords[i].tickValue);
      if (cIndex != null) {
        colorIndex = (cIndex + (areaColorsLen - 1) * i) % areaColorsLen;
        break;
      }
    }
  }
  var prev = axis.toGlobalCoord(ticksCoords[0].coord);
  var areaStyle = areaStyleModel.getAreaStyle();
  areaColors = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArray(areaColors) ? areaColors : [areaColors];
  for (var i = 1; i < ticksCoords.length; i++) {
    var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);
    var x = void 0;
    var y = void 0;
    var width = void 0;
    var height = void 0;
    if (axis.isHorizontal()) {
      x = prev;
      y = gridRect.y;
      width = tickCoord - x;
      height = gridRect.height;
      prev = x + width;
    } else {
      x = gridRect.x;
      y = prev;
      width = gridRect.width;
      height = tickCoord - y;
      prev = y + height;
    }
    var tickValue = ticksCoords[i - 1].tickValue;
    tickValue != null && newSplitAreaColors.set(tickValue, colorIndex);
    axisGroup.add(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A({
      anid: tickValue != null ? 'area_' + tickValue : null,
      shape: {
        x: x,
        y: y,
        width: width,
        height: height
      },
      style: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults({
        fill: areaColors[colorIndex]
      }, areaStyle),
      autoBatch: true,
      silent: true
    }));
    colorIndex = (colorIndex + 1) % areaColorsLen;
  }
  inner(axisView).splitAreaColors = newSplitAreaColors;
}
function rectCoordAxisHandleRemove(axisView) {
  inner(axisView).splitAreaColors = null;
}

/***/ }),

/***/ 32284:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wd: () => (/* binding */ makeRectPanelClipPath),
/* harmony export */   wx: () => (/* binding */ makeLinearBrushOtherExtent),
/* harmony export */   x$: () => (/* binding */ makeRectIsTargetByCursor)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30582);
/* harmony import */ var _cursorHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5215);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88367);

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



function makeRectPanelClipPath(rect) {
  rect = normalizeRect(rect);
  return function (localPoints) {
    return _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__.clipPointsByRect(localPoints, rect);
  };
}
function makeLinearBrushOtherExtent(rect, specifiedXYIndex) {
  rect = normalizeRect(rect);
  return function (xyIndex) {
    var idx = specifiedXYIndex != null ? specifiedXYIndex : xyIndex;
    var brushWidth = idx ? rect.width : rect.height;
    var base = idx ? rect.x : rect.y;
    return [base, base + (brushWidth || 0)];
  };
}
function makeRectIsTargetByCursor(rect, api, targetModel) {
  var boundingRect = normalizeRect(rect);
  return function (e, localCursorPoint) {
    return boundingRect.contain(localCursorPoint[0], localCursorPoint[1]) && !(0,_cursorHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .onIrrelevantElement */ .I)(e, api, targetModel);
  };
}
// Consider width/height is negative.
function normalizeRect(rect) {
  return zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.create(rect);
}

/***/ }),

/***/ 32744:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cM: () => (/* binding */ parseSVG),
/* harmony export */   ps: () => (/* binding */ makeViewBoxTransform)
/* harmony export */ });
/* harmony import */ var _graphic_Group_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35980);
/* harmony import */ var _graphic_Image_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(46422);
/* harmony import */ var _graphic_shape_Circle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7791);
/* harmony import */ var _graphic_shape_Rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19137);
/* harmony import */ var _graphic_shape_Ellipse_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40399);
/* harmony import */ var _graphic_shape_Line_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29129);
/* harmony import */ var _graphic_shape_Polygon_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(89487);
/* harmony import */ var _graphic_shape_Polyline_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15451);
/* harmony import */ var _core_matrix_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(43041);
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(65876);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _graphic_LinearGradient_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(50668);
/* harmony import */ var _graphic_RadialGradient_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(96054);
/* harmony import */ var _graphic_TSpan_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76059);
/* harmony import */ var _parseXML_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50755);
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(19746);
















;
var nodeParsers;
var INHERITABLE_STYLE_ATTRIBUTES_MAP = {
    'fill': 'fill',
    'stroke': 'stroke',
    'stroke-width': 'lineWidth',
    'opacity': 'opacity',
    'fill-opacity': 'fillOpacity',
    'stroke-opacity': 'strokeOpacity',
    'stroke-dasharray': 'lineDash',
    'stroke-dashoffset': 'lineDashOffset',
    'stroke-linecap': 'lineCap',
    'stroke-linejoin': 'lineJoin',
    'stroke-miterlimit': 'miterLimit',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-style': 'fontStyle',
    'font-weight': 'fontWeight',
    'text-anchor': 'textAlign',
    'visibility': 'visibility',
    'display': 'display'
};
var INHERITABLE_STYLE_ATTRIBUTES_MAP_KEYS = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(INHERITABLE_STYLE_ATTRIBUTES_MAP);
var SELF_STYLE_ATTRIBUTES_MAP = {
    'alignment-baseline': 'textBaseline',
    'stop-color': 'stopColor'
};
var SELF_STYLE_ATTRIBUTES_MAP_KEYS = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(SELF_STYLE_ATTRIBUTES_MAP);
var SVGParser = (function () {
    function SVGParser() {
        this._defs = {};
        this._root = null;
    }
    SVGParser.prototype.parse = function (xml, opt) {
        opt = opt || {};
        var svg = (0,_parseXML_js__WEBPACK_IMPORTED_MODULE_1__/* .parseXML */ .h)(xml);
        if (false) {}
        this._defsUsePending = [];
        var root = new _graphic_Group_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
        this._root = root;
        var named = [];
        var viewBox = svg.getAttribute('viewBox') || '';
        var width = parseFloat((svg.getAttribute('width') || opt.width));
        var height = parseFloat((svg.getAttribute('height') || opt.height));
        isNaN(width) && (width = null);
        isNaN(height) && (height = null);
        parseAttributes(svg, root, null, true, false);
        var child = svg.firstChild;
        while (child) {
            this._parseNode(child, root, named, null, false, false);
            child = child.nextSibling;
        }
        applyDefs(this._defs, this._defsUsePending);
        this._defsUsePending = [];
        var viewBoxRect;
        var viewBoxTransform;
        if (viewBox) {
            var viewBoxArr = splitNumberSequence(viewBox);
            if (viewBoxArr.length >= 4) {
                viewBoxRect = {
                    x: parseFloat((viewBoxArr[0] || 0)),
                    y: parseFloat((viewBoxArr[1] || 0)),
                    width: parseFloat(viewBoxArr[2]),
                    height: parseFloat(viewBoxArr[3])
                };
            }
        }
        if (viewBoxRect && width != null && height != null) {
            viewBoxTransform = makeViewBoxTransform(viewBoxRect, { x: 0, y: 0, width: width, height: height });
            if (!opt.ignoreViewBox) {
                var elRoot = root;
                root = new _graphic_Group_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
                root.add(elRoot);
                elRoot.scaleX = elRoot.scaleY = viewBoxTransform.scale;
                elRoot.x = viewBoxTransform.x;
                elRoot.y = viewBoxTransform.y;
            }
        }
        if (!opt.ignoreRootClip && width != null && height != null) {
            root.setClipPath(new _graphic_shape_Rect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A({
                shape: { x: 0, y: 0, width: width, height: height }
            }));
        }
        return {
            root: root,
            width: width,
            height: height,
            viewBoxRect: viewBoxRect,
            viewBoxTransform: viewBoxTransform,
            named: named
        };
    };
    SVGParser.prototype._parseNode = function (xmlNode, parentGroup, named, namedFrom, isInDefs, isInText) {
        var nodeName = xmlNode.nodeName.toLowerCase();
        var el;
        var namedFromForSub = namedFrom;
        if (nodeName === 'defs') {
            isInDefs = true;
        }
        if (nodeName === 'text') {
            isInText = true;
        }
        if (nodeName === 'defs' || nodeName === 'switch') {
            el = parentGroup;
        }
        else {
            if (!isInDefs) {
                var parser_1 = nodeParsers[nodeName];
                if (parser_1 && (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(nodeParsers, nodeName)) {
                    el = parser_1.call(this, xmlNode, parentGroup);
                    var nameAttr = xmlNode.getAttribute('name');
                    if (nameAttr) {
                        var newNamed = {
                            name: nameAttr,
                            namedFrom: null,
                            svgNodeTagLower: nodeName,
                            el: el
                        };
                        named.push(newNamed);
                        if (nodeName === 'g') {
                            namedFromForSub = newNamed;
                        }
                    }
                    else if (namedFrom) {
                        named.push({
                            name: namedFrom.name,
                            namedFrom: namedFrom,
                            svgNodeTagLower: nodeName,
                            el: el
                        });
                    }
                    parentGroup.add(el);
                }
            }
            var parser = paintServerParsers[nodeName];
            if (parser && (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(paintServerParsers, nodeName)) {
                var def = parser.call(this, xmlNode);
                var id = xmlNode.getAttribute('id');
                if (id) {
                    this._defs[id] = def;
                }
            }
        }
        if (el && el.isGroup) {
            var child = xmlNode.firstChild;
            while (child) {
                if (child.nodeType === 1) {
                    this._parseNode(child, el, named, namedFromForSub, isInDefs, isInText);
                }
                else if (child.nodeType === 3 && isInText) {
                    this._parseText(child, el);
                }
                child = child.nextSibling;
            }
        }
    };
    SVGParser.prototype._parseText = function (xmlNode, parentGroup) {
        var text = new _graphic_TSpan_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A({
            style: {
                text: xmlNode.textContent
            },
            silent: true,
            x: this._textX || 0,
            y: this._textY || 0
        });
        inheritStyle(parentGroup, text);
        parseAttributes(xmlNode, text, this._defsUsePending, false, false);
        applyTextAlignment(text, parentGroup);
        var textStyle = text.style;
        var fontSize = textStyle.fontSize;
        if (fontSize && fontSize < 9) {
            textStyle.fontSize = 9;
            text.scaleX *= fontSize / 9;
            text.scaleY *= fontSize / 9;
        }
        var font = (textStyle.fontSize || textStyle.fontFamily) && [
            textStyle.fontStyle,
            textStyle.fontWeight,
            (textStyle.fontSize || 12) + 'px',
            textStyle.fontFamily || 'sans-serif'
        ].join(' ');
        textStyle.font = font;
        var rect = text.getBoundingRect();
        this._textX += rect.width;
        parentGroup.add(text);
        return text;
    };
    SVGParser.internalField = (function () {
        nodeParsers = {
            'g': function (xmlNode, parentGroup) {
                var g = new _graphic_Group_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
                inheritStyle(parentGroup, g);
                parseAttributes(xmlNode, g, this._defsUsePending, false, false);
                return g;
            },
            'rect': function (xmlNode, parentGroup) {
                var rect = new _graphic_shape_Rect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
                inheritStyle(parentGroup, rect);
                parseAttributes(xmlNode, rect, this._defsUsePending, false, false);
                rect.setShape({
                    x: parseFloat(xmlNode.getAttribute('x') || '0'),
                    y: parseFloat(xmlNode.getAttribute('y') || '0'),
                    width: parseFloat(xmlNode.getAttribute('width') || '0'),
                    height: parseFloat(xmlNode.getAttribute('height') || '0')
                });
                rect.silent = true;
                return rect;
            },
            'circle': function (xmlNode, parentGroup) {
                var circle = new _graphic_shape_Circle_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
                inheritStyle(parentGroup, circle);
                parseAttributes(xmlNode, circle, this._defsUsePending, false, false);
                circle.setShape({
                    cx: parseFloat(xmlNode.getAttribute('cx') || '0'),
                    cy: parseFloat(xmlNode.getAttribute('cy') || '0'),
                    r: parseFloat(xmlNode.getAttribute('r') || '0')
                });
                circle.silent = true;
                return circle;
            },
            'line': function (xmlNode, parentGroup) {
                var line = new _graphic_shape_Line_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A();
                inheritStyle(parentGroup, line);
                parseAttributes(xmlNode, line, this._defsUsePending, false, false);
                line.setShape({
                    x1: parseFloat(xmlNode.getAttribute('x1') || '0'),
                    y1: parseFloat(xmlNode.getAttribute('y1') || '0'),
                    x2: parseFloat(xmlNode.getAttribute('x2') || '0'),
                    y2: parseFloat(xmlNode.getAttribute('y2') || '0')
                });
                line.silent = true;
                return line;
            },
            'ellipse': function (xmlNode, parentGroup) {
                var ellipse = new _graphic_shape_Ellipse_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A();
                inheritStyle(parentGroup, ellipse);
                parseAttributes(xmlNode, ellipse, this._defsUsePending, false, false);
                ellipse.setShape({
                    cx: parseFloat(xmlNode.getAttribute('cx') || '0'),
                    cy: parseFloat(xmlNode.getAttribute('cy') || '0'),
                    rx: parseFloat(xmlNode.getAttribute('rx') || '0'),
                    ry: parseFloat(xmlNode.getAttribute('ry') || '0')
                });
                ellipse.silent = true;
                return ellipse;
            },
            'polygon': function (xmlNode, parentGroup) {
                var pointsStr = xmlNode.getAttribute('points');
                var pointsArr;
                if (pointsStr) {
                    pointsArr = parsePoints(pointsStr);
                }
                var polygon = new _graphic_shape_Polygon_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A({
                    shape: {
                        points: pointsArr || []
                    },
                    silent: true
                });
                inheritStyle(parentGroup, polygon);
                parseAttributes(xmlNode, polygon, this._defsUsePending, false, false);
                return polygon;
            },
            'polyline': function (xmlNode, parentGroup) {
                var pointsStr = xmlNode.getAttribute('points');
                var pointsArr;
                if (pointsStr) {
                    pointsArr = parsePoints(pointsStr);
                }
                var polyline = new _graphic_shape_Polyline_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A({
                    shape: {
                        points: pointsArr || []
                    },
                    silent: true
                });
                inheritStyle(parentGroup, polyline);
                parseAttributes(xmlNode, polyline, this._defsUsePending, false, false);
                return polyline;
            },
            'image': function (xmlNode, parentGroup) {
                var img = new _graphic_Image_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Ay();
                inheritStyle(parentGroup, img);
                parseAttributes(xmlNode, img, this._defsUsePending, false, false);
                img.setStyle({
                    image: xmlNode.getAttribute('xlink:href') || xmlNode.getAttribute('href'),
                    x: +xmlNode.getAttribute('x'),
                    y: +xmlNode.getAttribute('y'),
                    width: +xmlNode.getAttribute('width'),
                    height: +xmlNode.getAttribute('height')
                });
                img.silent = true;
                return img;
            },
            'text': function (xmlNode, parentGroup) {
                var x = xmlNode.getAttribute('x') || '0';
                var y = xmlNode.getAttribute('y') || '0';
                var dx = xmlNode.getAttribute('dx') || '0';
                var dy = xmlNode.getAttribute('dy') || '0';
                this._textX = parseFloat(x) + parseFloat(dx);
                this._textY = parseFloat(y) + parseFloat(dy);
                var g = new _graphic_Group_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
                inheritStyle(parentGroup, g);
                parseAttributes(xmlNode, g, this._defsUsePending, false, true);
                return g;
            },
            'tspan': function (xmlNode, parentGroup) {
                var x = xmlNode.getAttribute('x');
                var y = xmlNode.getAttribute('y');
                if (x != null) {
                    this._textX = parseFloat(x);
                }
                if (y != null) {
                    this._textY = parseFloat(y);
                }
                var dx = xmlNode.getAttribute('dx') || '0';
                var dy = xmlNode.getAttribute('dy') || '0';
                var g = new _graphic_Group_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
                inheritStyle(parentGroup, g);
                parseAttributes(xmlNode, g, this._defsUsePending, false, true);
                this._textX += parseFloat(dx);
                this._textY += parseFloat(dy);
                return g;
            },
            'path': function (xmlNode, parentGroup) {
                var d = xmlNode.getAttribute('d') || '';
                var path = (0,_path_js__WEBPACK_IMPORTED_MODULE_11__/* .createFromString */ .UJ)(d);
                inheritStyle(parentGroup, path);
                parseAttributes(xmlNode, path, this._defsUsePending, false, false);
                path.silent = true;
                return path;
            }
        };
    })();
    return SVGParser;
}());
var paintServerParsers = {
    'lineargradient': function (xmlNode) {
        var x1 = parseInt(xmlNode.getAttribute('x1') || '0', 10);
        var y1 = parseInt(xmlNode.getAttribute('y1') || '0', 10);
        var x2 = parseInt(xmlNode.getAttribute('x2') || '10', 10);
        var y2 = parseInt(xmlNode.getAttribute('y2') || '0', 10);
        var gradient = new _graphic_LinearGradient_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A(x1, y1, x2, y2);
        parsePaintServerUnit(xmlNode, gradient);
        parseGradientColorStops(xmlNode, gradient);
        return gradient;
    },
    'radialgradient': function (xmlNode) {
        var cx = parseInt(xmlNode.getAttribute('cx') || '0', 10);
        var cy = parseInt(xmlNode.getAttribute('cy') || '0', 10);
        var r = parseInt(xmlNode.getAttribute('r') || '0', 10);
        var gradient = new _graphic_RadialGradient_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A(cx, cy, r);
        parsePaintServerUnit(xmlNode, gradient);
        parseGradientColorStops(xmlNode, gradient);
        return gradient;
    }
};
function parsePaintServerUnit(xmlNode, gradient) {
    var gradientUnits = xmlNode.getAttribute('gradientUnits');
    if (gradientUnits === 'userSpaceOnUse') {
        gradient.global = true;
    }
}
function parseGradientColorStops(xmlNode, gradient) {
    var stop = xmlNode.firstChild;
    while (stop) {
        if (stop.nodeType === 1
            && stop.nodeName.toLocaleLowerCase() === 'stop') {
            var offsetStr = stop.getAttribute('offset');
            var offset = void 0;
            if (offsetStr && offsetStr.indexOf('%') > 0) {
                offset = parseInt(offsetStr, 10) / 100;
            }
            else if (offsetStr) {
                offset = parseFloat(offsetStr);
            }
            else {
                offset = 0;
            }
            var styleVals = {};
            parseInlineStyle(stop, styleVals, styleVals);
            var stopColor = styleVals.stopColor
                || stop.getAttribute('stop-color')
                || '#000000';
            var stopOpacity = styleVals.stopOpacity
                || stop.getAttribute('stop-opacity');
            if (stopOpacity) {
                var rgba = _color_js__WEBPACK_IMPORTED_MODULE_14__.parse(stopColor);
                var stopColorOpacity = rgba && rgba[3];
                if (stopColorOpacity) {
                    rgba[3] *= _color_js__WEBPACK_IMPORTED_MODULE_14__.parseCssFloat(stopOpacity);
                    stopColor = _color_js__WEBPACK_IMPORTED_MODULE_14__.stringify(rgba, 'rgba');
                }
            }
            gradient.colorStops.push({
                offset: offset,
                color: stopColor
            });
        }
        stop = stop.nextSibling;
    }
}
function inheritStyle(parent, child) {
    if (parent && parent.__inheritedStyle) {
        if (!child.__inheritedStyle) {
            child.__inheritedStyle = {};
        }
        (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)(child.__inheritedStyle, parent.__inheritedStyle);
    }
}
function parsePoints(pointsString) {
    var list = splitNumberSequence(pointsString);
    var points = [];
    for (var i = 0; i < list.length; i += 2) {
        var x = parseFloat(list[i]);
        var y = parseFloat(list[i + 1]);
        points.push([x, y]);
    }
    return points;
}
function parseAttributes(xmlNode, el, defsUsePending, onlyInlineStyle, isTextGroup) {
    var disp = el;
    var inheritedStyle = disp.__inheritedStyle = disp.__inheritedStyle || {};
    var selfStyle = {};
    if (xmlNode.nodeType === 1) {
        parseTransformAttribute(xmlNode, el);
        parseInlineStyle(xmlNode, inheritedStyle, selfStyle);
        if (!onlyInlineStyle) {
            parseAttributeStyle(xmlNode, inheritedStyle, selfStyle);
        }
    }
    disp.style = disp.style || {};
    if (inheritedStyle.fill != null) {
        disp.style.fill = getFillStrokeStyle(disp, 'fill', inheritedStyle.fill, defsUsePending);
    }
    if (inheritedStyle.stroke != null) {
        disp.style.stroke = getFillStrokeStyle(disp, 'stroke', inheritedStyle.stroke, defsUsePending);
    }
    (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)([
        'lineWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'miterLimit', 'fontSize'
    ], function (propName) {
        if (inheritedStyle[propName] != null) {
            disp.style[propName] = parseFloat(inheritedStyle[propName]);
        }
    });
    (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)([
        'lineDashOffset', 'lineCap', 'lineJoin', 'fontWeight', 'fontFamily', 'fontStyle', 'textAlign'
    ], function (propName) {
        if (inheritedStyle[propName] != null) {
            disp.style[propName] = inheritedStyle[propName];
        }
    });
    if (isTextGroup) {
        disp.__selfStyle = selfStyle;
    }
    if (inheritedStyle.lineDash) {
        disp.style.lineDash = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map)(splitNumberSequence(inheritedStyle.lineDash), function (str) {
            return parseFloat(str);
        });
    }
    if (inheritedStyle.visibility === 'hidden' || inheritedStyle.visibility === 'collapse') {
        disp.invisible = true;
    }
    if (inheritedStyle.display === 'none') {
        disp.ignore = true;
    }
}
function applyTextAlignment(text, parentGroup) {
    var parentSelfStyle = parentGroup.__selfStyle;
    if (parentSelfStyle) {
        var textBaseline = parentSelfStyle.textBaseline;
        var zrTextBaseline = textBaseline;
        if (!textBaseline || textBaseline === 'auto') {
            zrTextBaseline = 'alphabetic';
        }
        else if (textBaseline === 'baseline') {
            zrTextBaseline = 'alphabetic';
        }
        else if (textBaseline === 'before-edge' || textBaseline === 'text-before-edge') {
            zrTextBaseline = 'top';
        }
        else if (textBaseline === 'after-edge' || textBaseline === 'text-after-edge') {
            zrTextBaseline = 'bottom';
        }
        else if (textBaseline === 'central' || textBaseline === 'mathematical') {
            zrTextBaseline = 'middle';
        }
        text.style.textBaseline = zrTextBaseline;
    }
    var parentInheritedStyle = parentGroup.__inheritedStyle;
    if (parentInheritedStyle) {
        var textAlign = parentInheritedStyle.textAlign;
        var zrTextAlign = textAlign;
        if (textAlign) {
            if (textAlign === 'middle') {
                zrTextAlign = 'center';
            }
            text.style.textAlign = zrTextAlign;
        }
    }
}
var urlRegex = /^url\(\s*#(.*?)\)/;
function getFillStrokeStyle(el, method, str, defsUsePending) {
    var urlMatch = str && str.match(urlRegex);
    if (urlMatch) {
        var url = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.trim)(urlMatch[1]);
        defsUsePending.push([el, method, url]);
        return;
    }
    if (str === 'none') {
        str = null;
    }
    return str;
}
function applyDefs(defs, defsUsePending) {
    for (var i = 0; i < defsUsePending.length; i++) {
        var item = defsUsePending[i];
        item[0].style[item[1]] = defs[item[2]];
    }
}
var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function splitNumberSequence(rawStr) {
    return rawStr.match(numberReg) || [];
}
var transformRegex = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.eE,]*)\)/g;
var DEGREE_TO_ANGLE = Math.PI / 180;
function parseTransformAttribute(xmlNode, node) {
    var transform = xmlNode.getAttribute('transform');
    if (transform) {
        transform = transform.replace(/,/g, ' ');
        var transformOps_1 = [];
        var mt = null;
        transform.replace(transformRegex, function (str, type, value) {
            transformOps_1.push(type, value);
            return '';
        });
        for (var i = transformOps_1.length - 1; i > 0; i -= 2) {
            var value = transformOps_1[i];
            var type = transformOps_1[i - 1];
            var valueArr = splitNumberSequence(value);
            mt = mt || _core_matrix_js__WEBPACK_IMPORTED_MODULE_15__.create();
            switch (type) {
                case 'translate':
                    _core_matrix_js__WEBPACK_IMPORTED_MODULE_15__.translate(mt, mt, [parseFloat(valueArr[0]), parseFloat(valueArr[1] || '0')]);
                    break;
                case 'scale':
                    _core_matrix_js__WEBPACK_IMPORTED_MODULE_15__.scale(mt, mt, [parseFloat(valueArr[0]), parseFloat(valueArr[1] || valueArr[0])]);
                    break;
                case 'rotate':
                    _core_matrix_js__WEBPACK_IMPORTED_MODULE_15__.rotate(mt, mt, -parseFloat(valueArr[0]) * DEGREE_TO_ANGLE, [
                        parseFloat(valueArr[1] || '0'),
                        parseFloat(valueArr[2] || '0')
                    ]);
                    break;
                case 'skewX':
                    var sx = Math.tan(parseFloat(valueArr[0]) * DEGREE_TO_ANGLE);
                    _core_matrix_js__WEBPACK_IMPORTED_MODULE_15__.mul(mt, [1, 0, sx, 1, 0, 0], mt);
                    break;
                case 'skewY':
                    var sy = Math.tan(parseFloat(valueArr[0]) * DEGREE_TO_ANGLE);
                    _core_matrix_js__WEBPACK_IMPORTED_MODULE_15__.mul(mt, [1, sy, 0, 1, 0, 0], mt);
                    break;
                case 'matrix':
                    mt[0] = parseFloat(valueArr[0]);
                    mt[1] = parseFloat(valueArr[1]);
                    mt[2] = parseFloat(valueArr[2]);
                    mt[3] = parseFloat(valueArr[3]);
                    mt[4] = parseFloat(valueArr[4]);
                    mt[5] = parseFloat(valueArr[5]);
                    break;
            }
        }
        node.setLocalTransform(mt);
    }
}
var styleRegex = /([^\s:;]+)\s*:\s*([^:;]+)/g;
function parseInlineStyle(xmlNode, inheritableStyleResult, selfStyleResult) {
    var style = xmlNode.getAttribute('style');
    if (!style) {
        return;
    }
    styleRegex.lastIndex = 0;
    var styleRegResult;
    while ((styleRegResult = styleRegex.exec(style)) != null) {
        var svgStlAttr = styleRegResult[1];
        var zrInheritableStlAttr = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(INHERITABLE_STYLE_ATTRIBUTES_MAP, svgStlAttr)
            ? INHERITABLE_STYLE_ATTRIBUTES_MAP[svgStlAttr]
            : null;
        if (zrInheritableStlAttr) {
            inheritableStyleResult[zrInheritableStlAttr] = styleRegResult[2];
        }
        var zrSelfStlAttr = (0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(SELF_STYLE_ATTRIBUTES_MAP, svgStlAttr)
            ? SELF_STYLE_ATTRIBUTES_MAP[svgStlAttr]
            : null;
        if (zrSelfStlAttr) {
            selfStyleResult[zrSelfStlAttr] = styleRegResult[2];
        }
    }
}
function parseAttributeStyle(xmlNode, inheritableStyleResult, selfStyleResult) {
    for (var i = 0; i < INHERITABLE_STYLE_ATTRIBUTES_MAP_KEYS.length; i++) {
        var svgAttrName = INHERITABLE_STYLE_ATTRIBUTES_MAP_KEYS[i];
        var attrValue = xmlNode.getAttribute(svgAttrName);
        if (attrValue != null) {
            inheritableStyleResult[INHERITABLE_STYLE_ATTRIBUTES_MAP[svgAttrName]] = attrValue;
        }
    }
    for (var i = 0; i < SELF_STYLE_ATTRIBUTES_MAP_KEYS.length; i++) {
        var svgAttrName = SELF_STYLE_ATTRIBUTES_MAP_KEYS[i];
        var attrValue = xmlNode.getAttribute(svgAttrName);
        if (attrValue != null) {
            selfStyleResult[SELF_STYLE_ATTRIBUTES_MAP[svgAttrName]] = attrValue;
        }
    }
}
function makeViewBoxTransform(viewBoxRect, boundingRect) {
    var scaleX = boundingRect.width / viewBoxRect.width;
    var scaleY = boundingRect.height / viewBoxRect.height;
    var scale = Math.min(scaleX, scaleY);
    return {
        scale: scale,
        x: -(viewBoxRect.x + viewBoxRect.width / 2) * scale + (boundingRect.x + boundingRect.width / 2),
        y: -(viewBoxRect.y + viewBoxRect.height / 2) * scale + (boundingRect.y + boundingRect.height / 2)
    };
}
function parseSVG(xml, opt) {
    var parser = new SVGParser();
    return parser.parse(xml, opt);
}



/***/ }),

/***/ 34906:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ck: () => (/* binding */ isTaken),
/* harmony export */   _r: () => (/* binding */ release),
/* harmony export */   s: () => (/* binding */ take)
/* harmony export */ });
/* harmony import */ var _core_echarts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67950);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11138);

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



var inner = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_0__/* .makeInner */ .$r)();
function take(zr, resourceKey, userKey) {
  inner(zr)[resourceKey] = userKey;
}
function release(zr, resourceKey, userKey) {
  var store = inner(zr);
  var uKey = store[resourceKey];
  if (uKey === userKey) {
    store[resourceKey] = null;
  }
}
function isTaken(zr, resourceKey) {
  return !!inner(zr)[resourceKey];
}
/**
 * payload: {
 *     type: 'takeGlobalCursor',
 *     key: 'dataZoomSelect', or 'brush', or ...,
 *         If no userKey, release global cursor.
 * }
 */
// TODO: SELF REGISTERED.
_core_echarts_js__WEBPACK_IMPORTED_MODULE_1__/* .registerAction */ .OH({
  type: 'takeGlobalCursor',
  event: 'globalCursorTaken',
  update: 'update'
}, zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.noop);

/***/ }),

/***/ 37838:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   JC: () => (/* binding */ COMPONENT_TYPE_PARALLEL),
/* harmony export */   ti: () => (/* binding */ COORD_SYS_TYPE_PARALLEL)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _model_Component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79057);

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



var COORD_SYS_TYPE_PARALLEL = 'parallel';
var COMPONENT_TYPE_PARALLEL = COORD_SYS_TYPE_PARALLEL;
var ParallelModel = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(ParallelModel, _super);
  function ParallelModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = ParallelModel.type;
    return _this;
  }
  ParallelModel.prototype.init = function () {
    _super.prototype.init.apply(this, arguments);
    this.mergeOption({});
  };
  ParallelModel.prototype.mergeOption = function (newOption) {
    var thisOption = this.option;
    newOption && zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge(thisOption, newOption, true);
    this._initDimensions();
  };
  /**
   * Whether series or axis is in this coordinate system.
   */
  ParallelModel.prototype.contains = function (model, ecModel) {
    var parallelIndex = model.get('parallelIndex');
    return parallelIndex != null && ecModel.getComponent('parallel', parallelIndex) === this;
  };
  ParallelModel.prototype.setAxisExpand = function (opt) {
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(['axisExpandable', 'axisExpandCenter', 'axisExpandCount', 'axisExpandWidth', 'axisExpandWindow'], function (name) {
      if (opt.hasOwnProperty(name)) {
        // @ts-ignore FIXME: why "never" inferred in this.option[name]?
        this.option[name] = opt[name];
      }
    }, this);
  };
  ParallelModel.prototype._initDimensions = function () {
    var dimensions = this.dimensions = [];
    var parallelAxisIndex = this.parallelAxisIndex = [];
    var axisModels = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.filter(this.ecModel.queryComponents({
      mainType: 'parallelAxis'
    }), function (axisModel) {
      // Can not use this.contains here, because
      // initialization has not been completed yet.
      return (axisModel.get('parallelIndex') || 0) === this.componentIndex;
    }, this);
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(axisModels, function (axisModel) {
      dimensions.push('dim' + axisModel.get('dim'));
      parallelAxisIndex.push(axisModel.componentIndex);
    });
  };
  ParallelModel.type = COMPONENT_TYPE_PARALLEL;
  ParallelModel.dependencies = ['parallelAxis'];
  ParallelModel.layoutMode = 'box';
  ParallelModel.defaultOption = {
    // zlevel: 0,
    z: 0,
    left: 80,
    top: 60,
    right: 80,
    bottom: 60,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    layout: 'horizontal',
    // FIXME
    // naming?
    axisExpandable: false,
    axisExpandCenter: null,
    axisExpandCount: 0,
    axisExpandWidth: 50,
    axisExpandRate: 17,
    axisExpandDebounce: 50,
    // [out, in, jumpTarget]. In percentage. If use [null, 0.05], null means full.
    // Do not doc to user until necessary.
    axisExpandSlideTriggerArea: [-0.15, 0.05, 0.4],
    axisExpandTriggerOn: 'click',
    parallelAxisDefault: null
  };
  return ParallelModel;
}(_model_Component_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParallelModel);

/***/ }),

/***/ 38070:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   GH: () => (/* binding */ OUTER_BOUNDS_DEFAULT),
/* harmony export */   MQ: () => (/* binding */ OUTER_BOUNDS_CLAMP_DEFAULT),
/* harmony export */   Tw: () => (/* binding */ COORD_SYS_TYPE_CARTESIAN_2D)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _model_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79057);
/* harmony import */ var _util_layout_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58263);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95615);

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




// For backward compatibility, do not use a margin. Although the labels might touch the edge of
// the canvas, the chart canvas probably does not have an border or a different background color within a page.
var OUTER_BOUNDS_DEFAULT = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var OUTER_BOUNDS_CLAMP_DEFAULT = ['25%', '25%'];
var COORD_SYS_TYPE_CARTESIAN_2D = 'cartesian2d';
var GridModel = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(GridModel, _super);
  function GridModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  GridModel.prototype.mergeDefaultAndTheme = function (option, ecModel) {
    var outerBoundsCp = (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_1__/* .getLayoutParams */ .vs)(option.outerBounds);
    _super.prototype.mergeDefaultAndTheme.apply(this, arguments);
    if (outerBoundsCp && option.outerBounds) {
      (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_1__/* .mergeLayoutParam */ .YA)(option.outerBounds, outerBoundsCp);
    }
  };
  GridModel.prototype.mergeOption = function (newOption, ecModel) {
    _super.prototype.mergeOption.apply(this, arguments);
    if (this.option.outerBounds && newOption.outerBounds) {
      (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_1__/* .mergeLayoutParam */ .YA)(this.option.outerBounds, newOption.outerBounds);
    }
  };
  GridModel.type = 'grid';
  GridModel.dependencies = ['xAxis', 'yAxis'];
  GridModel.layoutMode = 'box';
  GridModel.defaultOption = {
    show: false,
    // zlevel: 0,
    z: 0,
    left: '15%',
    top: 65,
    right: '10%',
    bottom: 80,
    // If grid size contain label
    containLabel: false,
    outerBoundsMode: 'auto',
    outerBounds: OUTER_BOUNDS_DEFAULT,
    outerBoundsContain: 'all',
    outerBoundsClampWidth: OUTER_BOUNDS_CLAMP_DEFAULT[0],
    outerBoundsClampHeight: OUTER_BOUNDS_CLAMP_DEFAULT[1],
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    backgroundColor: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.transparent,
    borderWidth: 1,
    borderColor: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.color.neutral30
  };
  return GridModel;
}(_model_Component_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridModel);

/***/ }),

/***/ 41613:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19746);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84408);

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




var each = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each;
var isObject = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject;
var CATEGORY_DEFAULT_VISUAL_INDEX = -1;
var VisualMapping = /** @class */function () {
  function VisualMapping(option) {
    var mappingMethod = option.mappingMethod;
    var visualType = option.type;
    var thisOption = this.option = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.clone(option);
    this.type = visualType;
    this.mappingMethod = mappingMethod;
    this._normalizeData = normalizers[mappingMethod];
    var visualHandler = VisualMapping.visualHandlers[visualType];
    this.applyVisual = visualHandler.applyVisual;
    this.getColorMapper = visualHandler.getColorMapper;
    this._normalizedToVisual = visualHandler._normalizedToVisual[mappingMethod];
    if (mappingMethod === 'piecewise') {
      normalizeVisualRange(thisOption);
      preprocessForPiecewise(thisOption);
    } else if (mappingMethod === 'category') {
      thisOption.categories ? preprocessForSpecifiedCategory(thisOption)
      // categories is ordinal when thisOption.categories not specified,
      // which need no more preprocess except normalize visual.
      : normalizeVisualRange(thisOption, true);
    } else {
      // mappingMethod === 'linear' or 'fixed'
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.assert(mappingMethod !== 'linear' || thisOption.dataExtent);
      normalizeVisualRange(thisOption);
    }
  }
  VisualMapping.prototype.mapValueToVisual = function (value) {
    var normalized = this._normalizeData(value);
    return this._normalizedToVisual(normalized, value);
  };
  VisualMapping.prototype.getNormalizer = function () {
    return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.bind(this._normalizeData, this);
  };
  /**
   * List available visual types.
   *
   * @public
   * @return {Array.<string>}
   */
  VisualMapping.listVisualTypes = function () {
    return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys(VisualMapping.visualHandlers);
  };
  // /**
  //  * @public
  //  */
  // static addVisualHandler(name, handler) {
  //     visualHandlers[name] = handler;
  // }
  /**
   * @public
   */
  VisualMapping.isValidType = function (visualType) {
    return VisualMapping.visualHandlers.hasOwnProperty(visualType);
  };
  /**
   * Convenient method.
   * Visual can be Object or Array or primary type.
   */
  VisualMapping.eachVisual = function (visual, callback, context) {
    if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject(visual)) {
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(visual, callback, context);
    } else {
      callback.call(context, visual);
    }
  };
  VisualMapping.mapVisual = function (visual, callback, context) {
    var isPrimary;
    var newVisual = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArray(visual) ? [] : zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject(visual) ? {} : (isPrimary = true, null);
    VisualMapping.eachVisual(visual, function (v, key) {
      var newVal = callback.call(context, v, key);
      isPrimary ? newVisual = newVal : newVisual[key] = newVal;
    });
    return newVisual;
  };
  /**
   * Retrieve visual properties from given object.
   */
  VisualMapping.retrieveVisuals = function (obj) {
    var ret = {};
    var hasVisual;
    obj && each(VisualMapping.visualHandlers, function (h, visualType) {
      if (obj.hasOwnProperty(visualType)) {
        ret[visualType] = obj[visualType];
        hasVisual = true;
      }
    });
    return hasVisual ? ret : null;
  };
  /**
   * Give order to visual types, considering colorSaturation, colorAlpha depends on color.
   *
   * @public
   * @param {(Object|Array)} visualTypes If Object, like: {color: ..., colorSaturation: ...}
   *                                     IF Array, like: ['color', 'symbol', 'colorSaturation']
   * @return {Array.<string>} Sorted visual types.
   */
  VisualMapping.prepareVisualTypes = function (visualTypes) {
    if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArray(visualTypes)) {
      visualTypes = visualTypes.slice();
    } else if (isObject(visualTypes)) {
      var types_1 = [];
      each(visualTypes, function (item, type) {
        types_1.push(type);
      });
      visualTypes = types_1;
    } else {
      return [];
    }
    visualTypes.sort(function (type1, type2) {
      // color should be front of colorSaturation, colorAlpha, ...
      // symbol and symbolSize do not matter.
      return type2 === 'color' && type1 !== 'color' && type1.indexOf('color') === 0 ? 1 : -1;
    });
    return visualTypes;
  };
  /**
   * 'color', 'colorSaturation', 'colorAlpha', ... are depends on 'color'.
   * Other visuals are only depends on themself.
   */
  VisualMapping.dependsOn = function (visualType1, visualType2) {
    return visualType2 === 'color' ? !!(visualType1 && visualType1.indexOf(visualType2) === 0) : visualType1 === visualType2;
  };
  /**
   * @param value
   * @param pieceList [{value: ..., interval: [min, max]}, ...]
   *                         Always from small to big.
   * @param findClosestWhenOutside Default to be false
   * @return index
   */
  VisualMapping.findPieceIndex = function (value, pieceList, findClosestWhenOutside) {
    var possibleI;
    var abs = Infinity;
    // value has the higher priority.
    for (var i = 0, len = pieceList.length; i < len; i++) {
      var pieceValue = pieceList[i].value;
      if (pieceValue != null) {
        if (pieceValue === value
        // FIXME
        // It is supposed to compare value according to value type of dimension,
        // but currently value type can exactly be string or number.
        // Compromise for numeric-like string (like '12'), especially
        // in the case that visualMap.categories is ['22', '33'].
        || zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString(pieceValue) && pieceValue === value + '') {
          return i;
        }
        findClosestWhenOutside && updatePossible(pieceValue, i);
      }
    }
    for (var i = 0, len = pieceList.length; i < len; i++) {
      var piece = pieceList[i];
      var interval = piece.interval;
      var close_1 = piece.close;
      if (interval) {
        if (interval[0] === -Infinity) {
          if (littleThan(close_1[1], value, interval[1])) {
            return i;
          }
        } else if (interval[1] === Infinity) {
          if (littleThan(close_1[0], interval[0], value)) {
            return i;
          }
        } else if (littleThan(close_1[0], interval[0], value) && littleThan(close_1[1], value, interval[1])) {
          return i;
        }
        findClosestWhenOutside && updatePossible(interval[0], i);
        findClosestWhenOutside && updatePossible(interval[1], i);
      }
    }
    if (findClosestWhenOutside) {
      return value === Infinity ? pieceList.length - 1 : value === -Infinity ? 0 : possibleI;
    }
    function updatePossible(val, index) {
      var newAbs = Math.abs(val - value);
      if (newAbs < abs) {
        abs = newAbs;
        possibleI = index;
      }
    }
  };
  VisualMapping.visualHandlers = {
    color: {
      applyVisual: makeApplyVisual('color'),
      getColorMapper: function () {
        var thisOption = this.option;
        return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.bind(thisOption.mappingMethod === 'category' ? function (value, isNormalized) {
          !isNormalized && (value = this._normalizeData(value));
          return doMapCategory.call(this, value);
        } : function (value, isNormalized, out) {
          // If output rgb array
          // which will be much faster and useful in pixel manipulation
          var returnRGBArray = !!out;
          !isNormalized && (value = this._normalizeData(value));
          out = zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.fastLerp(value, thisOption.parsedVisual, out);
          return returnRGBArray ? out : zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.stringify(out, 'rgba');
        }, this);
      },
      _normalizedToVisual: {
        linear: function (normalized) {
          return zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.stringify(zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.fastLerp(normalized, this.option.parsedVisual), 'rgba');
        },
        category: doMapCategory,
        piecewise: function (normalized, value) {
          var result = getSpecifiedVisual.call(this, value);
          if (result == null) {
            result = zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.stringify(zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.fastLerp(normalized, this.option.parsedVisual), 'rgba');
          }
          return result;
        },
        fixed: doMapFixed
      }
    },
    colorHue: makePartialColorVisualHandler(function (color, value) {
      return zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.modifyHSL(color, value);
    }),
    colorSaturation: makePartialColorVisualHandler(function (color, value) {
      return zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.modifyHSL(color, null, value);
    }),
    colorLightness: makePartialColorVisualHandler(function (color, value) {
      return zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.modifyHSL(color, null, null, value);
    }),
    colorAlpha: makePartialColorVisualHandler(function (color, value) {
      return zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.modifyAlpha(color, value);
    }),
    decal: {
      applyVisual: makeApplyVisual('decal'),
      _normalizedToVisual: {
        linear: null,
        category: doMapCategory,
        piecewise: null,
        fixed: null
      }
    },
    opacity: {
      applyVisual: makeApplyVisual('opacity'),
      _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
    },
    liftZ: {
      applyVisual: makeApplyVisual('liftZ'),
      _normalizedToVisual: {
        linear: doMapFixed,
        category: doMapFixed,
        piecewise: doMapFixed,
        fixed: doMapFixed
      }
    },
    symbol: {
      applyVisual: function (value, getter, setter) {
        var symbolCfg = this.mapValueToVisual(value);
        setter('symbol', symbolCfg);
      },
      _normalizedToVisual: {
        linear: doMapToArray,
        category: doMapCategory,
        piecewise: function (normalized, value) {
          var result = getSpecifiedVisual.call(this, value);
          if (result == null) {
            result = doMapToArray.call(this, normalized);
          }
          return result;
        },
        fixed: doMapFixed
      }
    },
    symbolSize: {
      applyVisual: makeApplyVisual('symbolSize'),
      _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
    }
  };
  return VisualMapping;
}();
function preprocessForPiecewise(thisOption) {
  var pieceList = thisOption.pieceList;
  thisOption.hasSpecialVisual = false;
  zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(pieceList, function (piece, index) {
    piece.originIndex = index;
    // piece.visual is "result visual value" but not
    // a visual range, so it does not need to be normalized.
    if (piece.visual != null) {
      thisOption.hasSpecialVisual = true;
    }
  });
}
function preprocessForSpecifiedCategory(thisOption) {
  // Hash categories.
  var categories = thisOption.categories;
  var categoryMap = thisOption.categoryMap = {};
  var visual = thisOption.visual;
  each(categories, function (cate, index) {
    categoryMap[cate] = index;
  });
  // Process visual map input.
  if (!zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArray(visual)) {
    var visualArr_1 = [];
    if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject(visual)) {
      each(visual, function (v, cate) {
        var index = categoryMap[cate];
        visualArr_1[index != null ? index : CATEGORY_DEFAULT_VISUAL_INDEX] = v;
      });
    } else {
      // Is primary type, represents default visual.
      visualArr_1[CATEGORY_DEFAULT_VISUAL_INDEX] = visual;
    }
    visual = setVisualToOption(thisOption, visualArr_1);
  }
  // Remove categories that has no visual,
  // then we can mapping them to CATEGORY_DEFAULT_VISUAL_INDEX.
  for (var i = categories.length - 1; i >= 0; i--) {
    if (visual[i] == null) {
      delete categoryMap[categories[i]];
      categories.pop();
    }
  }
}
function normalizeVisualRange(thisOption, isCategory) {
  var visual = thisOption.visual;
  var visualArr = [];
  if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject(visual)) {
    each(visual, function (v) {
      visualArr.push(v);
    });
  } else if (visual != null) {
    visualArr.push(visual);
  }
  var doNotNeedPair = {
    color: 1,
    symbol: 1
  };
  if (!isCategory && visualArr.length === 1 && !doNotNeedPair.hasOwnProperty(thisOption.type)) {
    // Do not care visualArr.length === 0, which is illegal.
    visualArr[1] = visualArr[0];
  }
  setVisualToOption(thisOption, visualArr);
}
function makePartialColorVisualHandler(applyValue) {
  return {
    applyVisual: function (value, getter, setter) {
      // Only used in HSL
      var colorChannel = this.mapValueToVisual(value);
      // Must not be array value
      setter('color', applyValue(getter('color'), colorChannel));
    },
    _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
  };
}
function doMapToArray(normalized) {
  var visual = this.option.visual;
  return visual[Math.round((0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .linearMap */ .Cb)(normalized, [0, 1], [0, visual.length - 1], true))] || {}; // TODO {}?
}
function makeApplyVisual(visualType) {
  return function (value, getter, setter) {
    setter(visualType, this.mapValueToVisual(value));
  };
}
function doMapCategory(normalized) {
  var visual = this.option.visual;
  return visual[this.option.loop && normalized !== CATEGORY_DEFAULT_VISUAL_INDEX ? normalized % visual.length : normalized];
}
function doMapFixed() {
  // visual will be convert to array.
  return this.option.visual[0];
}
/**
 * Create mapped to numeric visual
 */
function createNormalizedToNumericVisual(sourceExtent) {
  return {
    linear: function (normalized) {
      return (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .linearMap */ .Cb)(normalized, sourceExtent, this.option.visual, true);
    },
    category: doMapCategory,
    piecewise: function (normalized, value) {
      var result = getSpecifiedVisual.call(this, value);
      if (result == null) {
        result = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .linearMap */ .Cb)(normalized, sourceExtent, this.option.visual, true);
      }
      return result;
    },
    fixed: doMapFixed
  };
}
function getSpecifiedVisual(value) {
  var thisOption = this.option;
  var pieceList = thisOption.pieceList;
  if (thisOption.hasSpecialVisual) {
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList);
    var piece = pieceList[pieceIndex];
    if (piece && piece.visual) {
      return piece.visual[this.type];
    }
  }
}
function setVisualToOption(thisOption, visualArr) {
  thisOption.visual = visualArr;
  if (thisOption.type === 'color') {
    thisOption.parsedVisual = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map(visualArr, function (item) {
      var color = zrender_lib_tool_color_js__WEBPACK_IMPORTED_MODULE_1__.parse(item);
      if (!color && "production" !== 'production') {}
      return color || [0, 0, 0, 1];
    });
  }
  return visualArr;
}
/**
 * Normalizers by mapping methods.
 */
var normalizers = {
  linear: function (value) {
    return (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .linearMap */ .Cb)(value, this.option.dataExtent, [0, 1], true);
  },
  piecewise: function (value) {
    var pieceList = this.option.pieceList;
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList, true);
    if (pieceIndex != null) {
      return (0,_util_number_js__WEBPACK_IMPORTED_MODULE_2__/* .linearMap */ .Cb)(pieceIndex, [0, pieceList.length - 1], [0, 1], true);
    }
  },
  category: function (value) {
    var index = this.option.categories ? this.option.categoryMap[value] : value; // ordinal value
    return index == null ? CATEGORY_DEFAULT_VISUAL_INDEX : index;
  },
  fixed: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.noop
};
function littleThan(close, a, b) {
  return close ? a <= b : a < b;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VisualMapping);

/***/ }),

/***/ 43132:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _model_Component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79057);
/* harmony import */ var _model_mixin_makeStyleMapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90098);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84408);
/* harmony import */ var _axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(80222);

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






var ParallelAxisModel = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(ParallelAxisModel, _super);
  function ParallelAxisModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = ParallelAxisModel.type;
    /**
     * @readOnly
     */
    _this.activeIntervals = [];
    return _this;
  }
  ParallelAxisModel.prototype.getAreaSelectStyle = function () {
    return (0,_model_mixin_makeStyleMapper_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)([['fill', 'color'], ['lineWidth', 'borderWidth'], ['stroke', 'borderColor'], ['width', 'width'], ['opacity', 'opacity']
    // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
    // So do not transfer decal directly.
    ])(this.getModel('areaSelectStyle'));
  };
  /**
   * The code of this feature is put on AxisModel but not ParallelAxis,
   * because axisModel can be alive after echarts updating but instance of
   * ParallelAxis having been disposed. this._activeInterval should be kept
   * when action dispatched (i.e. legend click).
   *
   * @param intervals `interval.length === 0` means set all active.
   */
  ParallelAxisModel.prototype.setActiveIntervals = function (intervals) {
    var activeIntervals = this.activeIntervals = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.clone(intervals);
    // Normalize
    if (activeIntervals) {
      for (var i = activeIntervals.length - 1; i >= 0; i--) {
        _util_number_js__WEBPACK_IMPORTED_MODULE_3__/* .asc */ .Y6(activeIntervals[i]);
      }
    }
  };
  /**
   * @param value When only attempting detect whether 'no activeIntervals set',
   *        `value` is not needed to be input.
   */
  ParallelAxisModel.prototype.getActiveState = function (value) {
    var activeIntervals = this.activeIntervals;
    if (!activeIntervals.length) {
      return 'normal';
    }
    if (value == null || isNaN(+value)) {
      return 'inactive';
    }
    // Simple optimization
    if (activeIntervals.length === 1) {
      var interval = activeIntervals[0];
      if (interval[0] <= value && value <= interval[1]) {
        return 'active';
      }
    } else {
      for (var i = 0, len = activeIntervals.length; i < len; i++) {
        if (activeIntervals[i][0] <= value && value <= activeIntervals[i][1]) {
          return 'active';
        }
      }
    }
    return 'inactive';
  };
  return ParallelAxisModel;
}(_model_Component_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A);
zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.mixin(ParallelAxisModel, _axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_5__/* .AxisModelCommonMixin */ .L);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParallelAxisModel);

/***/ }),

/***/ 43572:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LR: () => (/* binding */ findAxisModels),
/* harmony export */   Pd: () => (/* binding */ updateCartesianAxisViewCommonPartBuilder),
/* harmony export */   Zp: () => (/* binding */ layout),
/* harmony export */   bJ: () => (/* binding */ getCartesianAxisHashKey),
/* harmony export */   oj: () => (/* binding */ createCartesianAxisViewCommonPartBuilder),
/* harmony export */   ty: () => (/* binding */ isCartesian2DInjectedAsDataCoordSys)
/* harmony export */ });
/* unused harmony export isCartesian2DDeclaredSeries */
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11138);
/* harmony import */ var _component_axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46678);
/* harmony import */ var _scale_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54275);

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
 * [__CAUTION__]
 *  MUST guarantee: if only the input `rect` and `axis.extent` changed,
 *  only `layout.position` changes.
 *  This character is replied on `grid.contain` calculation in `AxisBuilder`.
 *  @see updateCartesianAxisViewCommonPartBuilder
 *
 * Can only be called after coordinate system creation stage.
 * (Can be called before coordinate system update stage).
 */
function layout(rect, axisModel, opt) {
  opt = opt || {};
  var axis = axisModel.axis;
  var layout = {};
  var otherAxisOnZeroOf = axis.getAxesOnZeroOf()[0];
  var rawAxisPosition = axis.position;
  var axisPosition = otherAxisOnZeroOf ? 'onZero' : rawAxisPosition;
  var axisDim = axis.dim;
  var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
  var idx = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  };
  var axisOffset = axisModel.get('offset') || 0;
  var posBound = axisDim === 'x' ? [rectBound[2] - axisOffset, rectBound[3] + axisOffset] : [rectBound[0] - axisOffset, rectBound[1] + axisOffset];
  if (otherAxisOnZeroOf) {
    var onZeroCoord = otherAxisOnZeroOf.toGlobalCoord(otherAxisOnZeroOf.dataToCoord(0));
    posBound[idx.onZero] = Math.max(Math.min(onZeroCoord, posBound[1]), posBound[0]);
  }
  // Axis position
  layout.position = [axisDim === 'y' ? posBound[idx[axisPosition]] : rectBound[0], axisDim === 'x' ? posBound[idx[axisPosition]] : rectBound[3]];
  // Axis rotation
  layout.rotation = Math.PI / 2 * (axisDim === 'x' ? 0 : 1);
  // Tick and label direction, x y is axisDim
  var dirMap = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  layout.labelDirection = layout.tickDirection = layout.nameDirection = dirMap[rawAxisPosition];
  layout.labelOffset = otherAxisOnZeroOf ? posBound[idx[rawAxisPosition]] - posBound[idx.onZero] : 0;
  if (axisModel.get(['axisTick', 'inside'])) {
    layout.tickDirection = -layout.tickDirection;
  }
  if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.retrieve(opt.labelInside, axisModel.get(['axisLabel', 'inside']))) {
    layout.labelDirection = -layout.labelDirection;
  }
  // Special label rotation
  var labelRotate = axisModel.get(['axisLabel', 'rotate']);
  layout.labelRotate = axisPosition === 'top' ? -labelRotate : labelRotate;
  // Over splitLine and splitArea
  layout.z2 = 1;
  return layout;
}
function isCartesian2DDeclaredSeries(seriesModel) {
  return seriesModel.get('coordinateSystem') === 'cartesian2d';
}
/**
 * Note: If pie (or other similar series) use cartesian2d, here
 *  option `seriesModel.get('coordinateSystem') === 'cartesian2d'`
 *  and `seriesModel.coordinateSystem !== cartesian2dCoordSysInstance`
 *  and `seriesModel.boxCoordinateSystem === cartesian2dCoordSysInstance`,
 *  the logic below is probably wrong, therefore skip it temporarily.
 */
function isCartesian2DInjectedAsDataCoordSys(seriesModel) {
  return seriesModel.coordinateSystem && seriesModel.coordinateSystem.type === 'cartesian2d';
}
function findAxisModels(seriesModel) {
  var axisModelMap = {
    xAxisModel: null,
    yAxisModel: null
  };
  zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(axisModelMap, function (v, key) {
    var axisType = key.replace(/Model$/, '');
    var axisModel = seriesModel.getReferringComponents(axisType, _util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .SINGLE_REFERRING */ .US).models[0];
    if (false) {}
    axisModelMap[key] = axisModel;
  });
  return axisModelMap;
}
function createCartesianAxisViewCommonPartBuilder(gridRect, cartesians, axisModel, api, ctx, defaultNameMoveOverlap) {
  var layoutResult = layout(gridRect, axisModel);
  var axisLineAutoShow = false;
  var axisTickAutoShow = false;
  // Not show axisTick or axisLine if other axis is category / time
  for (var i = 0; i < cartesians.length; i++) {
    if ((0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .isIntervalOrLogScale */ .rf)(cartesians[i].getOtherAxis(axisModel.axis).scale)) {
      // Still show axis tick or axisLine if other axis is value / log
      axisLineAutoShow = axisTickAutoShow = true;
      if (axisModel.axis.type === 'category' && axisModel.axis.onBand) {
        axisTickAutoShow = false;
      }
    }
  }
  layoutResult.axisLineAutoShow = axisLineAutoShow;
  layoutResult.axisTickAutoShow = axisTickAutoShow;
  layoutResult.defaultNameMoveOverlap = defaultNameMoveOverlap;
  return new _component_axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(axisModel, api, layoutResult, ctx);
}
function updateCartesianAxisViewCommonPartBuilder(axisBuilder, gridRect, axisModel) {
  var newRaw = layout(gridRect, axisModel);
  if (false) { var oldRaw_1; }
  axisBuilder.updateCfg(newRaw);
}
function getCartesianAxisHashKey(axis) {
  return axis.dim + '_' + axis.index;
}

/***/ }),

/***/ 44113:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _Axis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13943);

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


var IndicatorAxis = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(IndicatorAxis, _super);
  function IndicatorAxis(dim, scale, radiusExtent) {
    var _this = _super.call(this, dim, scale, radiusExtent) || this;
    _this.type = 'value';
    _this.angle = 0;
    _this.name = '';
    return _this;
  }
  return IndicatorAxis;
}(_Axis_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndicatorAxis);

/***/ }),

/***/ 44951:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Jk: () => (/* binding */ createFloat32Array),
/* harmony export */   MO: () => (/* binding */ Float64ArrayCtor),
/* harmony export */   Zi: () => (/* binding */ tryEnsureTypedArray)
/* harmony export */ });
/* unused harmony exports Int8ArrayCtor, Int16ArrayCtor, Int32ArrayCtor, Uint8ArrayCtor, Uint16ArrayCtor, Uint32ArrayCtor, Uint8ClampedArrayCtor, Float32ArrayCtor */
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66402);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84408);

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




/* global Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array,
   Uint8ClampedArray, Float32Array, Float64Array */
var Int8ArrayCtor = typeof Int8Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Int8Array : undefined;
var Int16ArrayCtor = typeof Int16Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Int16Array : undefined;
var Int32ArrayCtor = typeof Int32Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Int32Array : undefined;
var Uint8ArrayCtor = typeof Uint8Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Uint8Array : undefined;
var Uint16ArrayCtor = typeof Uint16Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Uint16Array : undefined;
var Uint32ArrayCtor = typeof Uint32Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Uint32Array : undefined;
var Uint8ClampedArrayCtor = typeof Uint8ClampedArray !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Uint8ClampedArray : undefined;
var Float32ArrayCtor = typeof Float32Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Float32Array : undefined;
var Float64ArrayCtor = typeof Float64Array !== _types_js__WEBPACK_IMPORTED_MODULE_0__/* .UNDEFINED_STR */ .nk ? Float64Array : undefined;
function createFloat32Array(capacity) {
  return tryEnsureTypedArray({
    ctor: Float32ArrayCtor
  }, capacity).arr;
}
function tryEnsureTypedArray(tyArr,
// Can add more types if needed.
// NOTICE: Callers need to manage data length themselves.
// Do not consider `capacity` as the data length.
capacity) {
  if (false) {}
  var existingArr = tyArr.arr;
  var ctor = tyArr.ctor;
  if (capacity > _number_js__WEBPACK_IMPORTED_MODULE_1__/* .MAX_SAFE_INTEGER */ .Is) {
    capacity = _number_js__WEBPACK_IMPORTED_MODULE_1__/* .MAX_SAFE_INTEGER */ .Is;
  }
  if (!existingArr || tyArr.typed && existingArr.length < capacity) {
    var nextArr = void 0;
    if (ctor) {
      try {
        // A large contiguous memory allocation may cause OOM.
        nextArr = new ctor(capacity);
        tyArr.typed = true;
        existingArr && nextArr.set(existingArr);
      } catch (e) {
        if (false) {}
      }
    }
    if (!nextArr) {
      nextArr = [];
      tyArr.typed = false;
      if (existingArr) {
        for (var i = 0, len = existingArr.length; i < len; i++) {
          nextArr[i] = existingArr[i];
        }
      }
    }
    tyArr.arr = nextArr;
  }
  return tyArr;
}

/***/ }),

/***/ 45617:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _view_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26349);
/* harmony import */ var _coord_cartesian_GridModel_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38070);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19137);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _coord_cartesian_AxisModel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24781);
/* harmony import */ var _coord_axisModelCreator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6592);
/* harmony import */ var _coord_cartesian_Grid_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14881);
/* harmony import */ var _axis_CartesianAxisView_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(31644);

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









// Grid view
var GridView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(GridView, _super);
  function GridView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = 'grid';
    return _this;
  }
  GridView.prototype.render = function (gridModel, ecModel) {
    this.group.removeAll();
    if (gridModel.get('show')) {
      this.group.add(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A({
        shape: gridModel.coordinateSystem.getRect(),
        style: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.defaults)({
          fill: gridModel.get('backgroundColor')
        }, gridModel.getItemStyle()),
        silent: true,
        z2: -1
      }));
    }
  };
  GridView.type = 'grid';
  return GridView;
}(_view_Component_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);
var extraOption = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function install(registers) {
  registers.registerComponentView(GridView);
  registers.registerComponentModel(_coord_cartesian_GridModel_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay);
  registers.registerCoordinateSystem('cartesian2d', _coord_cartesian_Grid_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A);
  (0,_coord_axisModelCreator_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(registers, 'x', _coord_cartesian_AxisModel_js__WEBPACK_IMPORTED_MODULE_7__/* .CartesianAxisModel */ .P, extraOption);
  (0,_coord_axisModelCreator_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(registers, 'y', _coord_cartesian_AxisModel_js__WEBPACK_IMPORTED_MODULE_7__/* .CartesianAxisModel */ .P, extraOption);
  registers.registerComponentView(_axis_CartesianAxisView_js__WEBPACK_IMPORTED_MODULE_8__/* .CartesianXAxisView */ .xR);
  registers.registerComponentView(_axis_CartesianAxisView_js__WEBPACK_IMPORTED_MODULE_8__/* .CartesianYAxisView */ .O8);
  registers.registerPreprocessor(function (option) {
    // Only create grid when need
    if (option.xAxis && option.yAxis && !option.grid) {
      option.grid = {};
    }
  });
}

/***/ }),

/***/ 45835:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11916);
/* harmony import */ var _Geo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(53745);
/* harmony import */ var _util_layout_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58263);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84408);
/* harmony import */ var _geoSourceManager_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(67023);
/* harmony import */ var _chart_map_MapSeries_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(60818);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2103);
/* harmony import */ var _core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18807);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11138);
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55103);

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
 * Resize method bound to the geo
 */
function resizeGeo(geoModel, api) {
  var viewCoordSys = this.view;
  var boundingCoords = geoModel.get('boundingCoords');
  if (boundingCoords != null) {
    var leftTop_1 = boundingCoords[0];
    var rightBottom_1 = boundingCoords[1];
    if (!(isFinite(leftTop_1[0]) && isFinite(leftTop_1[1]) && isFinite(rightBottom_1[0]) && isFinite(rightBottom_1[1]))) {
      if (false) {}
    } else {
      // Sample around the lng/lat rect and use projection to calculate actual bounding rect.
      var projection_1 = this.projection;
      if (projection_1) {
        var xMin = leftTop_1[0];
        var yMin = leftTop_1[1];
        var xMax = rightBottom_1[0];
        var yMax = rightBottom_1[1];
        leftTop_1 = [Infinity, Infinity];
        rightBottom_1 = [-Infinity, -Infinity];
        // TODO better way?
        var sampleLine = function (x0, y0, x1, y1) {
          var dx = x1 - x0;
          var dy = y1 - y0;
          for (var i = 0; i <= 100; i++) {
            var p = i / 100;
            var pt = projection_1.project([x0 + dx * p, y0 + dy * p]);
            zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_0__.min(leftTop_1, leftTop_1, pt);
            zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_0__.max(rightBottom_1, rightBottom_1, pt);
          }
        };
        // Top
        sampleLine(xMin, yMin, xMax, yMin);
        // Right
        sampleLine(xMax, yMin, xMax, yMax);
        // Bottom
        sampleLine(xMax, yMax, xMin, yMax);
        // Left
        sampleLine(xMin, yMax, xMax, yMin);
      }
      (0,_View_js__WEBPACK_IMPORTED_MODULE_1__/* .viewCoordSysSetBoundingRect */ .Q3)(viewCoordSys, leftTop_1[0], leftTop_1[1], rightBottom_1[0] - leftTop_1[0], rightBottom_1[1] - leftTop_1[1]);
    }
  }
  var rect = viewCoordSys.getBoundingRect();
  var centerOption = geoModel.get('layoutCenter');
  var sizeOption = geoModel.get('layoutSize');
  // Laying out geo on Cartesian works theoretically but not supported yet.
  // Currently, we only support to lay out on matrix/calendar.
  var refContainer = _util_layout_js__WEBPACK_IMPORTED_MODULE_2__/* .createBoxLayoutReference */ .Lj(geoModel, api).refContainer;
  var aspect = rect.width / rect.height * this.aspectScale;
  var useCenterAndSize = false;
  var center;
  var size;
  if (centerOption && sizeOption) {
    center = [_util_number_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePercent */ .lo(centerOption[0], refContainer.width) + refContainer.x, _util_number_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePercent */ .lo(centerOption[1], refContainer.height) + refContainer.y];
    size = _util_number_js__WEBPACK_IMPORTED_MODULE_3__/* .parsePercent */ .lo(sizeOption, Math.min(refContainer.width, refContainer.height));
    if (!isNaN(center[0]) && !isNaN(center[1]) && !isNaN(size)) {
      useCenterAndSize = true;
    } else {
      if (false) {}
    }
  }
  var viewRect;
  if (useCenterAndSize) {
    viewRect = {};
    if (aspect > 1) {
      // Width is same with size
      viewRect.width = size;
      viewRect.height = size / aspect;
    } else {
      viewRect.height = size;
      viewRect.width = size * aspect;
    }
    viewRect.y = center[1] - viewRect.height / 2;
    viewRect.x = center[0] - viewRect.width / 2;
  } else {
    // Use left/top/width/height
    var boxLayoutOption = geoModel.getBoxLayoutParams();
    boxLayoutOption.aspect = aspect;
    viewRect = _util_layout_js__WEBPACK_IMPORTED_MODULE_2__/* .getLayoutRect */ .dV(boxLayoutOption, refContainer);
    viewRect = _util_layout_js__WEBPACK_IMPORTED_MODULE_2__/* .applyPreserveAspect */ .FJ(geoModel, viewRect, aspect);
  }
  (0,_View_js__WEBPACK_IMPORTED_MODULE_1__/* .viewCoordSysSetViewRect */ .Xj)(viewCoordSys, viewRect.x, viewRect.y, viewRect.width, viewRect.height);
  (0,_View_js__WEBPACK_IMPORTED_MODULE_1__/* .viewCoordSysSetRoamOptionFromModel */ .dh)(viewCoordSys, geoModel);
}
// Back compat for ECharts2, where the coord map is set on map series:
// {type: 'map', geoCoord: {'cityA': [116.46,39.92], 'cityA': [119.12,24.61]}},
function setGeoCoords(geo, model) {
  zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each(model.get('geoCoord'), function (geoCoord, name) {
    geo.addGeoCoord(name, geoCoord);
  });
}
var GeoCreator = /** @class */function () {
  function GeoCreator() {
    // For deciding which dimensions to use when creating list data
    this.dimensions = _Geo_js__WEBPACK_IMPORTED_MODULE_5__/* .geo2DDimensions */ .N;
  }
  GeoCreator.prototype.create = function (ecModel, api) {
    var geoList = [];
    function getCommonGeoProperties(model) {
      return {
        nameProperty: model.get('nameProperty'),
        aspectScale: model.get('aspectScale'),
        projection: model.get('projection'),
        clip: model.getShallow('clip', true)
      };
    }
    // FIXME Create each time may be slow
    ecModel.eachComponent('geo', function (geoModel, idx) {
      var mapName = geoModel.get('map');
      var geo = new _Geo_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(mapName + idx, mapName, zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.extend({
        nameMap: geoModel.get('nameMap'),
        api: api,
        ecModel: ecModel
      }, getCommonGeoProperties(geoModel)));
      geoList.push(geo);
      // setGeoCoords(geo, geoModel);
      geoModel.coordinateSystem = geo;
      geo.model = geoModel;
      // Inject resize method
      geo.resize = resizeGeo;
      geo.resize(geoModel, api);
    });
    ecModel.eachSeries(function (seriesModel) {
      (0,_core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_6__/* .injectCoordSysByOption */ .m7)({
        targetModel: seriesModel,
        coordSysType: 'geo',
        coordSysProvider: function () {
          var geoModel = seriesModel.subType === _chart_map_MapSeries_js__WEBPACK_IMPORTED_MODULE_7__/* .SERIES_TYPE_MAP */ .O4 ? seriesModel.getHostGeoModel() : seriesModel.getReferringComponents('geo', _util_model_js__WEBPACK_IMPORTED_MODULE_8__/* .SINGLE_REFERRING */ .US).models[0];
          return geoModel && geoModel.coordinateSystem;
        },
        allowNotFound: true
      });
    });
    // If has map series
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each((0,_chart_map_MapSeries_js__WEBPACK_IMPORTED_MODULE_7__/* .buildAllMapSeriesGroups */ .$h)(ecModel, true), function (mapSeriesGroup, groupKey) {
      if (!(0,_chart_map_MapSeries_js__WEBPACK_IMPORTED_MODULE_7__/* .mapSeriesGroupHasOwnGeo */ .sL)(groupKey)) {
        return;
      }
      var firstDeclaredMapSeries = mapSeriesGroup.r[0];
      var nameMapList = [];
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each(mapSeriesGroup.r, function (mapSeries) {
        nameMapList.push(mapSeries.get('nameMap'));
        // MAP_SERIES_GROUP must not be set here, as series filtering is not performed.
        // Clear it first, including series to be filtered.
        mapSeries.seriesGroup = null;
      });
      var mapType = groupKey.slice(1);
      var geo = new _Geo_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(mapType, mapType, zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.extend({
        nameMap: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.mergeAll(nameMapList),
        api: api,
        ecModel: ecModel
      }, getCommonGeoProperties(firstDeclaredMapSeries)));
      var scaleLimit;
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each(mapSeriesGroup.r, function (mapSeries) {
        scaleLimit = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.retrieve2(scaleLimit, mapSeries.get('scaleLimit'));
      });
      geoList.push(geo);
      // Inject resize method
      geo.resize = resizeGeo;
      geo.resize(firstDeclaredMapSeries, api);
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each(mapSeriesGroup.r, function (mapSeries) {
        mapSeries.coordinateSystem = geo;
        setGeoCoords(geo, mapSeries);
      });
    });
    return geoList;
  };
  /**
   * Fill given regions array
   */
  GeoCreator.prototype.getFilledRegions = function (originRegionArr, mapName, nameMap, nameProperty) {
    // Not use the original
    var regionsArr = (originRegionArr || []).slice();
    var dataNameMap = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.createHashMap();
    for (var i = 0; i < regionsArr.length; i++) {
      dataNameMap.set(regionsArr[i].name, regionsArr[i]);
    }
    var source = _geoSourceManager_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A.load(mapName, nameMap, nameProperty);
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each(source.regions, function (region) {
      var name = region.name;
      var regionOption = dataNameMap.get(name);
      // apply specified echarts style in GeoJSON data
      var specifiedGeoJSONRegionStyle = region.properties && region.properties.echartsStyle;
      if (!regionOption) {
        regionOption = {
          name: name
        };
        regionsArr.push(regionOption);
      }
      specifiedGeoJSONRegionStyle && zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.merge(regionOption, specifiedGeoJSONRegionStyle);
    });
    return regionsArr;
  };
  return GeoCreator;
}();
var geoCreator = new GeoCreator();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (geoCreator);

/***/ }),

/***/ 45897:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ createSeriesDataSimply)
/* harmony export */ });
/* harmony import */ var _data_helper_createDimensions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50915);
/* harmony import */ var _data_SeriesData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30796);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);

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
 * [Usage]:
 * (1)
 * createListSimply(seriesModel, ['value']);
 * (2)
 * createListSimply(seriesModel, {
 *     coordDimensions: ['value'],
 *     dimensionsCount: 5
 * });
 */
function createSeriesDataSimply(seriesModel, opt, nameList) {
  opt = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(opt) && {
    coordDimensions: opt
  } || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)({
    encodeDefine: seriesModel.getEncode()
  }, opt);
  var source = seriesModel.getSource();
  var dimensions = (0,_data_helper_createDimensions_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(source, opt).dimensions;
  var list = new _data_SeriesData_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(dimensions, seriesModel);
  list.initData(source, nameList);
  return list;
}

/***/ }),

/***/ 46678:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   RC: () => (/* binding */ moveIfOverlapByLinearLabels),
/* harmony export */   Z0: () => (/* binding */ getLabelInner),
/* harmony export */   ts: () => (/* binding */ AxisBuilderSharedContext),
/* harmony export */   x: () => (/* binding */ resolveAxisNameOverlapDefault)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(35980);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(29129);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(88367);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(39658);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(19137);
/* harmony import */ var _util_innerStore_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(83604);
/* harmony import */ var _label_labelStyle_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(88908);
/* harmony import */ var _model_Model_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(77571);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84408);
/* harmony import */ var _util_symbol_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(22469);
/* harmony import */ var zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43041);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2103);
/* harmony import */ var _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69663);
/* harmony import */ var _label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44245);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11138);
/* harmony import */ var _axisBreakHelper_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92161);
/* harmony import */ var _axisAction_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(26565);
/* harmony import */ var _scale_break_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(30098);
/* harmony import */ var zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30582);
/* harmony import */ var zrender_lib_core_Point_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9342);
/* harmony import */ var zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(80252);
/* harmony import */ var _coord_axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(22591);
/* harmony import */ var _scale_helper_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(54275);

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




















var PI = Math.PI;
var DEFAULT_CENTER_NAME_MARGIN_LEVELS = [[1, 2, 1, 2], [5, 3, 5, 3], [8, 3, 8, 3]];
var DEFAULT_ENDS_NAME_MARGIN_LEVELS = [[0, 1, 0, 1], [0, 3, 0, 3], [0, 3, 0, 3]];
var getLabelInner = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_0__/* .makeInner */ .$r)();
var getTickInner = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_0__/* .makeInner */ .$r)();
/**
 * A context shared by difference axisBuilder instances.
 * For cross-axes overlap resolving.
 *
 * Lifecycle constraint: should not over a pass of ec main process.
 *  If model is changed, the context must be disposed.
 *
 * @see AxisBuilderLocalContext
 */
var AxisBuilderSharedContext = /** @class */function () {
  function AxisBuilderSharedContext(resolveAxisNameOverlap) {
    /**
     * [CAUTION] Do not modify this data structure outside this class.
     */
    this.recordMap = {};
    this.resolveAxisNameOverlap = resolveAxisNameOverlap;
  }
  AxisBuilderSharedContext.prototype.ensureRecord = function (axisModel) {
    var dim = axisModel.axis.dim;
    var idx = axisModel.componentIndex;
    var recordMap = this.recordMap;
    var records = recordMap[dim] || (recordMap[dim] = []);
    return records[idx] || (records[idx] = {
      ready: {}
    });
  };
  return AxisBuilderSharedContext;
}();

;
/**
 * [CAUTION]
 *  1. The call of this function must be after axisLabel overlap handlings
 *     (such as `hideOverlap`, `fixMinMaxLabelShow`) and after transform calculating.
 *  2. Can be called multiple times and should be idempotent.
 */
function resetOverlapRecordToShared(cfg, shared, axisModel, labelLayoutList) {
  var axis = axisModel.axis;
  var record = shared.ensureRecord(axisModel);
  var labelInfoList = [];
  var stOccupiedRect;
  var useStOccupiedRect = hasAxisName(cfg.axisName) && (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .isNameLocationCenter */ .SS)(cfg.nameLocation);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)(labelLayoutList, function (layout) {
    var layoutInfo = (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)(layout);
    if (!layoutInfo || layoutInfo.label.ignore) {
      return;
    }
    labelInfoList.push(layoutInfo);
    var transGroup = record.transGroup;
    if (useStOccupiedRect) {
      // Transform to "standard axis" for creating stOccupiedRect (the label rects union).
      transGroup.transform ? zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.invert(_stTransTmp, transGroup.transform) : zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.identity(_stTransTmp);
      if (layoutInfo.transform) {
        zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.mul(_stTransTmp, _stTransTmp, layoutInfo.transform);
      }
      zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay.copy(_stLabelRectTmp, layoutInfo.localRect);
      _stLabelRectTmp.applyTransform(_stTransTmp);
      stOccupiedRect ? stOccupiedRect.union(_stLabelRectTmp) : zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay.copy(stOccupiedRect = new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(0, 0, 0, 0), _stLabelRectTmp);
    }
  });
  var sortByDim = Math.abs(record.dirVec.x) > 0.1 ? 'x' : 'y';
  var sortByValue = record.transGroup[sortByDim];
  labelInfoList.sort(function (info1, info2) {
    return Math.abs(info1.label[sortByDim] - sortByValue) - Math.abs(info2.label[sortByDim] - sortByValue);
  });
  if (useStOccupiedRect && stOccupiedRect) {
    var extent = axis.getExtent();
    var axisLineX = Math.min(extent[0], extent[1]);
    var axisLineWidth = Math.max(extent[0], extent[1]) - axisLineX;
    // If `nameLocation` is 'middle', enlarge axis labels boundingRect to axisLine to avoid bad
    //  case like that axis name is placed in the gap between axis labels and axis line.
    // If only one label exists, the entire band should be occupied for
    // visual consistency, so extent it to [0, canvas width].
    stOccupiedRect.union(new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(axisLineX, 0, axisLineWidth, 1));
  }
  record.stOccupiedRect = stOccupiedRect;
  record.labelInfoList = labelInfoList;
}
var _stTransTmp = zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.create();
var _stLabelRectTmp = new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay(0, 0, 0, 0);
/**
 * The default resolver does not involve other axes within the same coordinate system.
 */
var resolveAxisNameOverlapDefault = function (cfg, ctx, axisModel, nameLayoutInfo, nameMoveDirVec, thisRecord) {
  if ((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .isNameLocationCenter */ .SS)(cfg.nameLocation)) {
    var stOccupiedRect = thisRecord.stOccupiedRect;
    if (stOccupiedRect) {
      moveIfOverlap((0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .computeLabelGeometry2 */ .AS)({}, stOccupiedRect, thisRecord.transGroup.transform), nameLayoutInfo, nameMoveDirVec);
    }
  } else {
    moveIfOverlapByLinearLabels(thisRecord.labelInfoList, thisRecord.dirVec, nameLayoutInfo, nameMoveDirVec);
  }
};
// [NOTICE] not consider ignore.
function moveIfOverlap(basedLayoutInfo, movableLayoutInfo, moveDirVec) {
  var mtv = new zrender_lib_core_Point_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A();
  if ((0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .labelIntersect */ .EA)(basedLayoutInfo, movableLayoutInfo, mtv, {
    direction: Math.atan2(moveDirVec.y, moveDirVec.x),
    bidirectional: false,
    touchThreshold: 0.05
  })) {
    (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .labelLayoutApplyTranslation */ .Gm)(movableLayoutInfo, mtv);
  }
}
function moveIfOverlapByLinearLabels(baseLayoutInfoList, baseDirVec, movableLayoutInfo, moveDirVec) {
  // Detect and move from far to close.
  var sameDir = zrender_lib_core_Point_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.dot(moveDirVec, baseDirVec) >= 0;
  for (var idx = 0, len = baseLayoutInfoList.length; idx < len; idx++) {
    var labelInfo = baseLayoutInfoList[sameDir ? idx : len - 1 - idx];
    if (!labelInfo.label.ignore) {
      moveIfOverlap(labelInfo, movableLayoutInfo, moveDirVec);
    }
  }
}
/**
 * @caution
 * - Ensure it is called after the data processing stage finished.
 * - It might be called before `CahrtView#render`, sush as called at `CoordinateSystem#update`,
 *  thus ensure the result the same whenever it is called.
 *
 * A builder for a straight-line axis.
 *
 * A final axis is translated and rotated from a "standard axis".
 * So opt.position and opt.rotation is required.
 *
 * A "standard axis" is the axis [0,0]-->[abs(axisExtent[1]-axisExtent[0]),0]
 * for example: [0,0]-->[50,0]
 */
var AxisBuilder = /** @class */function () {
  /**
   * [CAUTION]: axisModel.axis.extent/scale must be ready to use.
   */
  function AxisBuilder(axisModel, api, opt, shared) {
    this.group = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A();
    this._axisModel = axisModel;
    this._api = api;
    this._local = {};
    this._shared = shared || new AxisBuilderSharedContext(resolveAxisNameOverlapDefault);
    this._resetCfgDetermined(opt);
  }
  /**
   * Regarding axis label related configurations, only the change of label.x/y is supported; other
   * changes are not necessary and not performant. To be specific, only `axis.position`
   * (and consequently `labelOffset`) and `axis.extent` can be changed, and assume everything in
   * `axisModel` are not changed.
   * Axis line related configurations can be changed since this method can only be called
   * before they are created.
   */
  AxisBuilder.prototype.updateCfg = function (opt) {
    if (false) { var ready; }
    var raw = this._cfg.raw;
    raw.position = opt.position;
    raw.labelOffset = opt.labelOffset;
    this._resetCfgDetermined(raw);
  };
  /**
   * [CAUTION] For debug usage. Never change it outside!
   */
  AxisBuilder.prototype.__getRawCfg = function () {
    return this._cfg.raw;
  };
  AxisBuilder.prototype._resetCfgDetermined = function (raw) {
    var axisModel = this._axisModel;
    // FIXME:
    //  Currently there is no uniformed way to set default values if an option
    //  is specified null/undefined by user (intentionally or unintentionally),
    //  e.g. null/undefined is not a illegal value for `nameLocation`.
    //  Try to use `getDefaultOption` to address it. But radar has no `getDefaultOption`.
    var axisModelDefaultOption = axisModel.getDefaultOption ? axisModel.getDefaultOption() : {};
    // Default value
    var axisName = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(raw.axisName, axisModel.get('name'));
    var nameMoveOverlapOption = axisModel.get('nameMoveOverlap');
    if (nameMoveOverlapOption == null || nameMoveOverlapOption === 'auto') {
      nameMoveOverlapOption = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(raw.defaultNameMoveOverlap, true);
    }
    var cfg = {
      raw: raw,
      position: raw.position,
      rotation: raw.rotation,
      nameDirection: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(raw.nameDirection, 1),
      tickDirection: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(raw.tickDirection, 1),
      labelDirection: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(raw.labelDirection, 1),
      labelOffset: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(raw.labelOffset, 0),
      silent: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(raw.silent, true),
      axisName: axisName,
      nameLocation: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve3)(axisModel.get('nameLocation'), axisModelDefaultOption.nameLocation, 'end'),
      shouldNameMoveOverlap: hasAxisName(axisName) && nameMoveOverlapOption,
      optionHideOverlap: axisModel.get(['axisLabel', 'hideOverlap']),
      showMinorTicks: axisModel.get(['minorTick', 'show'])
    };
    if (false) {}
    this._cfg = cfg;
    // FIXME Not use a separate text group?
    var transformGroup = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A({
      x: cfg.position[0],
      y: cfg.position[1],
      rotation: cfg.rotation
    });
    transformGroup.updateTransform();
    this._transformGroup = transformGroup;
    var record = this._shared.ensureRecord(axisModel);
    record.transGroup = this._transformGroup;
    record.dirVec = new zrender_lib_core_Point_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(Math.cos(-cfg.rotation), Math.sin(-cfg.rotation));
  };
  AxisBuilder.prototype.build = function (axisPartNameMap, extraParams) {
    var _this = this;
    if (!axisPartNameMap) {
      axisPartNameMap = {
        axisLine: true,
        axisTickLabelEstimate: false,
        axisTickLabelDetermine: true,
        axisName: true
      };
    }
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)(AXIS_BUILDER_AXIS_PART_NAMES, function (partName) {
      if (axisPartNameMap[partName]) {
        builders[partName](_this._cfg, _this._local, _this._shared, _this._axisModel, _this.group, _this._transformGroup, _this._api, extraParams || {});
      }
    });
    return this;
  };
  /**
   * Currently only get text align/verticalAlign by rotation.
   * NO `position` is involved, otherwise it have to be performed for each `updateAxisLabelChangableProps`.
   */
  AxisBuilder.innerTextLayout = function (axisRotation, textRotation, direction) {
    var rotationDiff = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .remRadian */ ._7)(textRotation - axisRotation);
    var textAlign;
    var textVerticalAlign;
    if ((0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .isRadianAroundZero */ .dh)(rotationDiff)) {
      // Label is parallel with axis line.
      textVerticalAlign = direction > 0 ? 'top' : 'bottom';
      textAlign = 'center';
    } else if ((0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .isRadianAroundZero */ .dh)(rotationDiff - PI)) {
      // Label is inverse parallel with axis line.
      textVerticalAlign = direction > 0 ? 'bottom' : 'top';
      textAlign = 'center';
    } else {
      textVerticalAlign = 'middle';
      if (rotationDiff > 0 && rotationDiff < PI) {
        textAlign = direction > 0 ? 'right' : 'left';
      } else {
        textAlign = direction > 0 ? 'left' : 'right';
      }
    }
    return {
      rotation: rotationDiff,
      textAlign: textAlign,
      textVerticalAlign: textVerticalAlign
    };
  };
  AxisBuilder.makeAxisEventDataBase = function (axisModel) {
    var eventData = {
      componentType: axisModel.mainType,
      componentIndex: axisModel.componentIndex
    };
    eventData[axisModel.mainType + 'Index'] = axisModel.componentIndex;
    return eventData;
  };
  AxisBuilder.isLabelSilent = function (axisModel) {
    var tooltipOpt = axisModel.get('tooltip');
    return axisModel.get('silent')
    // Consider mouse cursor, add these restrictions.
    || !(axisModel.get('triggerEvent') || tooltipOpt && tooltipOpt.show);
  };
  return AxisBuilder;
}();
;
// Sorted by dependency order.
var AXIS_BUILDER_AXIS_PART_NAMES = ['axisLine', 'axisTickLabelEstimate', 'axisTickLabelDetermine', 'axisName'];
var builders = {
  axisLine: function (cfg, local, shared, axisModel, group, transformGroup, api) {
    if (false) { var ready; }
    var shown = axisModel.get(['axisLine', 'show']);
    if (shown === 'auto') {
      shown = true;
      if (cfg.raw.axisLineAutoShow != null) {
        shown = !!cfg.raw.axisLineAutoShow;
      }
    }
    if (!shown) {
      return;
    }
    var extent = axisModel.axis.getExtent();
    var matrix = transformGroup.transform;
    var pt1 = [extent[0], 0];
    var pt2 = [extent[1], 0];
    var inverse = pt1[0] > pt2[0];
    if (matrix) {
      (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__.applyTransform)(pt1, pt1, matrix);
      (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__.applyTransform)(pt2, pt2, matrix);
    }
    var lineStyle = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.extend)({
      lineCap: 'round'
    }, axisModel.getModel(['axisLine', 'lineStyle']).getLineStyle());
    var pathBaseProp = {
      strokeContainThreshold: cfg.raw.strokeContainThreshold || 5,
      silent: true,
      z2: 1,
      style: lineStyle
    };
    if (axisModel.get(['axisLine', 'breakLine']) && (0,_scale_break_js__WEBPACK_IMPORTED_MODULE_10__/* .hasBreaks */ .Bd)(axisModel.axis.scale)) {
      (0,_axisBreakHelper_js__WEBPACK_IMPORTED_MODULE_11__/* .getAxisBreakHelper */ .D)().buildAxisBreakLine(axisModel, group, transformGroup, pathBaseProp);
    } else {
      var line = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.extend)({
        shape: {
          x1: pt1[0],
          y1: pt1[1],
          x2: pt2[0],
          y2: pt2[1]
        }
      }, pathBaseProp));
      _util_graphic_js__WEBPACK_IMPORTED_MODULE_13__.subPixelOptimizeLine(line.shape, line.style.lineWidth);
      line.anid = 'line';
      group.add(line);
    }
    var arrows = axisModel.get(['axisLine', 'symbol']);
    if (arrows != null) {
      var arrowSize = axisModel.get(['axisLine', 'symbolSize']);
      if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.isString)(arrows)) {
        // Use the same arrow for start and end point
        arrows = [arrows, arrows];
      }
      if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.isString)(arrowSize) || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.isNumber)(arrowSize)) {
        // Use the same size for width and height
        arrowSize = [arrowSize, arrowSize];
      }
      var arrowOffset = (0,_util_symbol_js__WEBPACK_IMPORTED_MODULE_14__/* .normalizeSymbolOffset */ .hV)(axisModel.get(['axisLine', 'symbolOffset']) || 0, arrowSize);
      var symbolWidth_1 = arrowSize[0];
      var symbolHeight_1 = arrowSize[1];
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)([{
        rotate: cfg.rotation + Math.PI / 2,
        offset: arrowOffset[0],
        r: 0
      }, {
        rotate: cfg.rotation - Math.PI / 2,
        offset: arrowOffset[1],
        r: Math.sqrt((pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) + (pt1[1] - pt2[1]) * (pt1[1] - pt2[1]))
      }], function (point, index) {
        if (arrows[index] !== 'none' && arrows[index] != null) {
          var symbol = (0,_util_symbol_js__WEBPACK_IMPORTED_MODULE_14__/* .createSymbol */ .v5)(arrows[index], -symbolWidth_1 / 2, -symbolHeight_1 / 2, symbolWidth_1, symbolHeight_1, lineStyle.stroke, true);
          // Calculate arrow position with offset
          var r = point.r + point.offset;
          var pt = inverse ? pt2 : pt1;
          symbol.attr({
            rotation: point.rotate,
            x: pt[0] + r * Math.cos(cfg.rotation),
            y: pt[1] - r * Math.sin(cfg.rotation),
            silent: true,
            z2: 11
          });
          group.add(symbol);
        }
      });
    }
  },
  /**
   * [CAUTION] This method can be called multiple times, following the change due to `resetCfg` called
   *  in size measurement. Thus this method should be idempotent, and should be performant.
   */
  axisTickLabelEstimate: function (cfg, local, shared, axisModel, group, transformGroup, api, extraParams) {
    if (false) { var ready; }
    var needCallLayout = dealLastTickLabelResultReusable(local, group, extraParams);
    if (needCallLayout) {
      layOutAxisTickLabel(cfg, local, shared, axisModel, group, transformGroup, api, _coord_axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_15__/* .AxisTickLabelComputingKind */ .fm.estimate);
    }
  },
  /**
   * Finish axis tick label build.
   * Can be only called once.
   */
  axisTickLabelDetermine: function (cfg, local, shared, axisModel, group, transformGroup, api, extraParams) {
    if (false) { var ready; }
    var needCallLayout = dealLastTickLabelResultReusable(local, group, extraParams);
    if (needCallLayout) {
      layOutAxisTickLabel(cfg, local, shared, axisModel, group, transformGroup, api, _coord_axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_15__/* .AxisTickLabelComputingKind */ .fm.determine);
    }
    var ticksEls = buildAxisMajorTicks(cfg, group, transformGroup, axisModel);
    syncLabelIgnoreToMajorTicks(cfg, local.labelLayoutList, ticksEls);
    buildAxisMinorTicks(cfg, group, transformGroup, axisModel, cfg.tickDirection);
  },
  /**
   * [CAUTION] This method can be called multiple times, following the change due to `resetCfg` called
   *  in size measurement. Thus this method should be idempotent, and should be performant.
   */
  axisName: function (cfg, local, shared, axisModel, group, transformGroup, api, extraParams) {
    var sharedRecord = shared.ensureRecord(axisModel);
    if (false) { var ready; }
    // Remove the existing name result created in estimation phase.
    if (local.nameEl) {
      group.remove(local.nameEl);
      local.nameEl = sharedRecord.nameLayout = sharedRecord.nameLocation = null;
    }
    var name = cfg.axisName;
    if (!hasAxisName(name)) {
      return;
    }
    var nameLocation = cfg.nameLocation;
    var nameDirection = cfg.nameDirection;
    var textStyleModel = axisModel.getModel('nameTextStyle');
    var gap = axisModel.get('nameGap') || 0;
    var extent = axisModel.axis.getExtent();
    var gapStartEndSignal = axisModel.axis.inverse ? -1 : 1;
    var pos = new zrender_lib_core_Point_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(0, 0);
    var nameMoveDirVec = new zrender_lib_core_Point_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A(0, 0);
    if (nameLocation === 'start') {
      pos.x = extent[0] - gapStartEndSignal * gap;
      nameMoveDirVec.x = -gapStartEndSignal;
    } else if (nameLocation === 'end') {
      pos.x = extent[1] + gapStartEndSignal * gap;
      nameMoveDirVec.x = gapStartEndSignal;
    } else {
      // 'middle' or 'center'
      pos.x = (extent[0] + extent[1]) / 2;
      pos.y = cfg.labelOffset + nameDirection * gap;
      nameMoveDirVec.y = nameDirection;
    }
    var mt = zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.create();
    nameMoveDirVec.transform(zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_4__.rotate(mt, mt, cfg.rotation));
    var nameRotation = axisModel.get('nameRotate');
    if (nameRotation != null) {
      nameRotation = nameRotation * PI / 180; // To radian.
    }
    var labelLayout;
    var axisNameAvailableWidth;
    if ((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .isNameLocationCenter */ .SS)(nameLocation)) {
      labelLayout = AxisBuilder.innerTextLayout(cfg.rotation, nameRotation != null ? nameRotation : cfg.rotation,
      // Adapt to axis.
      nameDirection);
    } else {
      labelLayout = endTextLayout(cfg.rotation, nameLocation, nameRotation || 0, extent);
      axisNameAvailableWidth = cfg.raw.axisNameAvailableWidth;
      if (axisNameAvailableWidth != null) {
        axisNameAvailableWidth = Math.abs(axisNameAvailableWidth / Math.sin(labelLayout.rotation));
        !isFinite(axisNameAvailableWidth) && (axisNameAvailableWidth = null);
      }
    }
    var textFont = textStyleModel.getFont();
    var truncateOpt = axisModel.get('nameTruncate', true) || {};
    var ellipsis = truncateOpt.ellipsis;
    var maxWidth = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve)(cfg.raw.nameTruncateMaxWidth, truncateOpt.maxWidth, axisNameAvailableWidth);
    var nameMarginLevel = extraParams.nameMarginLevel || 0;
    var textEl = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Ay({
      x: pos.x,
      y: pos.y,
      rotation: labelLayout.rotation,
      silent: AxisBuilder.isLabelSilent(axisModel),
      style: (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_17__/* .createTextStyle */ .VB)(textStyleModel, {
        text: name,
        font: textFont,
        overflow: 'truncate',
        width: maxWidth,
        ellipsis: ellipsis,
        fill: textStyleModel.getTextColor() || axisModel.get(['axisLine', 'lineStyle', 'color']),
        align: textStyleModel.get('align') || labelLayout.textAlign,
        verticalAlign: textStyleModel.get('verticalAlign') || labelLayout.textVerticalAlign
      }),
      z2: 1
    });
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_13__.setTooltipConfig({
      el: textEl,
      componentModel: axisModel,
      itemName: name
    });
    textEl.__fullText = name;
    // Id for animation
    textEl.anid = 'name';
    if (axisModel.get('triggerEvent')) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = 'axisName';
      eventData.name = name;
      (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_18__/* .getECData */ .z)(textEl).eventData = eventData;
    }
    transformGroup.add(textEl);
    textEl.updateTransform();
    local.nameEl = textEl;
    var nameLayout = sharedRecord.nameLayout = (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)({
      label: textEl,
      priority: textEl.z2,
      defaultAttr: {
        ignore: textEl.ignore
      },
      marginDefault: (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .isNameLocationCenter */ .SS)(nameLocation)
      // Make axis name visually far from axis labels.
      // (but not too aggressive, consider multiple small charts)
      ? DEFAULT_CENTER_NAME_MARGIN_LEVELS[nameMarginLevel]
      // top/button margin is set to `0` to inserted the xAxis name into the indention
      // above the axis labels to save space. (see example below.)
      : DEFAULT_ENDS_NAME_MARGIN_LEVELS[nameMarginLevel]
    });
    sharedRecord.nameLocation = nameLocation;
    group.add(textEl);
    textEl.decomposeTransform();
    if (cfg.shouldNameMoveOverlap && nameLayout) {
      var record = shared.ensureRecord(axisModel);
      if (false) {}
      shared.resolveAxisNameOverlap(cfg, shared, axisModel, nameLayout, nameMoveDirVec, record);
    }
  }
};
function layOutAxisTickLabel(cfg, local, shared, axisModel, group, transformGroup, api, kind) {
  if (!axisLabelBuildResultExists(local)) {
    buildAxisLabel(cfg, local, group, kind, axisModel, api);
  }
  var labelLayoutList = local.labelLayoutList;
  updateAxisLabelChangableProps(cfg, axisModel, labelLayoutList, transformGroup);
  adjustBreakLabels(axisModel, cfg.rotation, labelLayoutList);
  var optionHideOverlap = cfg.optionHideOverlap;
  fixMinMaxLabelShow(axisModel, labelLayoutList, optionHideOverlap);
  if (optionHideOverlap) {
    // This bit fixes the label overlap issue for the time chart.
    // See https://github.com/apache/echarts/issues/14266 for more.
    (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .hideOverlap */ .If)(
    // Filter the already ignored labels by the previous overlap resolving methods.
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.filter)(labelLayoutList, function (layout) {
      return layout && !layout.label.ignore;
    }));
  }
  // Always call it even this axis has no name, since it serves in overlapping detection
  // and grid outerBounds on other axis.
  resetOverlapRecordToShared(cfg, shared, axisModel, labelLayoutList);
}
;
function endTextLayout(rotation, textPosition, textRotate, extent) {
  var rotationDiff = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .remRadian */ ._7)(textRotate - rotation);
  var textAlign;
  var textVerticalAlign;
  var inverse = extent[0] > extent[1];
  var onLeft = textPosition === 'start' && !inverse || textPosition !== 'start' && inverse;
  if ((0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .isRadianAroundZero */ .dh)(rotationDiff - PI / 2)) {
    textVerticalAlign = onLeft ? 'bottom' : 'top';
    textAlign = 'center';
  } else if ((0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .isRadianAroundZero */ .dh)(rotationDiff - PI * 1.5)) {
    textVerticalAlign = onLeft ? 'top' : 'bottom';
    textAlign = 'center';
  } else {
    textVerticalAlign = 'middle';
    if (rotationDiff < PI * 1.5 && rotationDiff > PI / 2) {
      textAlign = onLeft ? 'left' : 'right';
    } else {
      textAlign = onLeft ? 'right' : 'left';
    }
  }
  return {
    rotation: rotationDiff,
    textAlign: textAlign,
    textVerticalAlign: textVerticalAlign
  };
}
/**
 * Assume `labelLayoutList` has no `label.ignore: true`.
 * Assume `labelLayoutList` have been sorted by value ascending order.
 */
function fixMinMaxLabelShow(axisModel, labelLayoutList, optionHideOverlap) {
  var axis = axisModel.axis;
  var customValuesOption = axisModel.get(['axisLabel', 'customValues']);
  if ((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .shouldShowAllLabels */ .PJ)(axis)) {
    return;
  }
  // FIXME
  // Have not consider onBand yet, where tick els is more than label els.
  // Assert no ignore in labels.
  function deal(showMinMaxLabelOption, outmostLabelIdx, innerLabelIdx) {
    var outmostLabelLayout = (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)(labelLayoutList[outmostLabelIdx]);
    var innerLabelLayout = (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)(labelLayoutList[innerLabelIdx]);
    var scale = axis.scale;
    if (!outmostLabelLayout || !innerLabelLayout) {
      return;
    }
    if (showMinMaxLabelOption == null) {
      if (!optionHideOverlap && customValuesOption) {
        // In this case, users are unlikely to expect labels to be hidden.
        return;
      }
      var tick = getLabelInner(outmostLabelLayout.label).labelInfo.tick;
      if (
      // TimeScale does not expand extent to "nice", so eliminate labels that are not nice.
      (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_19__/* .isTimeScale */ .oY)(scale) && tick.notNice
      // Category axis does not expect tick that out of axisLabel.internal to be displayed
      // unless required.
      || (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_19__/* .isOrdinalScale */ .wl)(scale) && tick.offInterval) {
        ignoreEl(outmostLabelLayout.label);
        return;
      }
    }
    if (showMinMaxLabelOption === false || outmostLabelLayout.suggestIgnore) {
      ignoreEl(outmostLabelLayout.label);
      return;
    }
    if (innerLabelLayout.suggestIgnore) {
      ignoreEl(innerLabelLayout.label);
      return;
    }
    // PENDING: Originally we thought `optionHideOverlap === false` means do not hide anything,
    //  since currently the bounding rect of text might not accurate enough and might slightly bigger,
    //  which causes false positive. But `optionHideOverlap: null/undfined` is falsy and likely
    //  be treated as false.
    // In most fonts the glyph does not reach the boundary of the bounding rect.
    // This is needed to avoid too aggressive to hide two elements that meet at the edge
    // due to compact layout by the same bounding rect or OBB.
    var touchThreshold = 0.1;
    // This treatment is for backward compatibility. And `!optionHideOverlap` implies that
    // the user accepts the visual touch between adjacent labels, thus "hide min/max label"
    // should be conservative, since the space might be sufficient in this case.
    if (!optionHideOverlap) {
      var marginForce = [0, 0, 0, 0];
      // Make a copy to apply `ignoreMargin`.
      outmostLabelLayout = (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .newLabelLayoutWithGeometry */ .PG)({
        marginForce: marginForce
      }, outmostLabelLayout);
      innerLabelLayout = (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .newLabelLayoutWithGeometry */ .PG)({
        marginForce: marginForce
      }, innerLabelLayout);
    }
    if ((0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .labelIntersect */ .EA)(outmostLabelLayout, innerLabelLayout, null, {
      touchThreshold: touchThreshold
    })) {
      if (showMinMaxLabelOption) {
        ignoreEl(innerLabelLayout.label);
      } else {
        ignoreEl(outmostLabelLayout.label);
      }
    }
  }
  // If min or max are user set, we need to check
  // If the tick on min(max) are overlap on their neighbour tick
  // If they are overlapped, we need to hide the min(max) tick label
  var showMinLabelOption = axisModel.get(['axisLabel', 'showMinLabel']);
  var showMaxLabelOption = axisModel.get(['axisLabel', 'showMaxLabel']);
  var labelsLen = labelLayoutList.length;
  deal(showMinLabelOption, 0, 1);
  deal(showMaxLabelOption, labelsLen - 1, labelsLen - 2);
}
// Under default settings, it is visually odd to display a tick without its label,
// since ticks extend from axis line towards labels and serve as visual guide.
// PENDING: Is there opposite cases?
function syncLabelIgnoreToMajorTicks(cfg, labelLayoutList, tickEls) {
  if (cfg.showMinorTicks) {
    // It probably unreasonable to hide major ticks when show minor ticks.
    return;
  }
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)(labelLayoutList, function (labelLayout) {
    if (labelLayout && labelLayout.label.ignore) {
      for (var idx = 0; idx < tickEls.length; idx++) {
        var tickEl = tickEls[idx];
        // Assume small array, linear search is fine for performance.
        // PENDING: measure?
        var tickInner = getTickInner(tickEl);
        var labelInner = getLabelInner(labelLayout.label);
        if (tickInner.tickValue != null && !tickInner.onBand && tickInner.tickValue === labelInner.labelInfo.tick.value) {
          ignoreEl(tickEl);
          return;
        }
      }
    }
  });
}
function ignoreEl(el) {
  el && (el.ignore = true);
}
function createTicks(ticksCoords, tickTransform, tickEndCoord, tickLineStyle, anidPrefix) {
  var tickEls = [];
  var pt1 = [];
  var pt2 = [];
  for (var i = 0; i < ticksCoords.length; i++) {
    var tickCoord = ticksCoords[i].coord;
    pt1[0] = tickCoord;
    pt1[1] = 0;
    pt2[0] = tickCoord;
    pt2[1] = tickEndCoord;
    if (tickTransform) {
      (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__.applyTransform)(pt1, pt1, tickTransform);
      (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__.applyTransform)(pt2, pt2, tickTransform);
    }
    // Tick line, Not use group transform to have better line draw
    var tickEl = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A({
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: tickLineStyle,
      z2: 2,
      autoBatch: true,
      silent: true
    });
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_13__.subPixelOptimizeLine(tickEl.shape, tickEl.style.lineWidth);
    tickEl.anid = anidPrefix + '_' + ticksCoords[i].tickValue;
    tickEls.push(tickEl);
    var inner = getTickInner(tickEl);
    inner.onBand = !!ticksCoords[i].onBand;
    inner.tickValue = ticksCoords[i].tickValue;
  }
  return tickEls;
}
function buildAxisMajorTicks(cfg, group, transformGroup, axisModel) {
  var axis = axisModel.axis;
  var tickModel = axisModel.getModel('axisTick');
  var shown = tickModel.get('show');
  if (shown === 'auto') {
    shown = true;
    if (cfg.raw.axisTickAutoShow != null) {
      shown = !!cfg.raw.axisTickAutoShow;
    }
  }
  if (!shown || axis.scale.isBlank()) {
    return [];
  }
  var lineStyleModel = tickModel.getModel('lineStyle');
  var tickEndCoord = cfg.tickDirection * tickModel.get('length');
  var ticksCoords = axis.getTicksCoords();
  var ticksEls = createTicks(ticksCoords, transformGroup.transform, tickEndCoord, (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.defaults)(lineStyleModel.getLineStyle(), {
    stroke: axisModel.get(['axisLine', 'lineStyle', 'color'])
  }), 'ticks');
  for (var i = 0; i < ticksEls.length; i++) {
    group.add(ticksEls[i]);
  }
  return ticksEls;
}
function buildAxisMinorTicks(cfg, group, transformGroup, axisModel, tickDirection) {
  var axis = axisModel.axis;
  var minorTickModel = axisModel.getModel('minorTick');
  if (!cfg.showMinorTicks || axis.scale.isBlank()) {
    return;
  }
  var minorTicksCoords = axis.getMinorTicksCoords();
  if (!minorTicksCoords.length) {
    return;
  }
  var lineStyleModel = minorTickModel.getModel('lineStyle');
  var tickEndCoord = tickDirection * minorTickModel.get('length');
  var minorTickLineStyle = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.defaults)(lineStyleModel.getLineStyle(), (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.defaults)(axisModel.getModel('axisTick').getLineStyle(), {
    stroke: axisModel.get(['axisLine', 'lineStyle', 'color'])
  }));
  for (var i = 0; i < minorTicksCoords.length; i++) {
    var minorTicksEls = createTicks(minorTicksCoords[i], transformGroup.transform, tickEndCoord, minorTickLineStyle, 'minorticks_' + i);
    for (var k = 0; k < minorTicksEls.length; k++) {
      group.add(minorTicksEls[k]);
    }
  }
}
// Return whether need to call `layOutAxisTickLabel` again.
function dealLastTickLabelResultReusable(local, group, extraParams) {
  if (axisLabelBuildResultExists(local)) {
    var axisLabelsCreationContext = local.axisLabelsCreationContext;
    if (false) {}
    var noPxChangeTryDetermine = axisLabelsCreationContext.out.noPxChangeTryDetermine;
    if (extraParams.noPxChange) {
      var canDetermine = true;
      for (var idx = 0; idx < noPxChangeTryDetermine.length; idx++) {
        canDetermine = canDetermine && noPxChangeTryDetermine[idx]();
      }
      if (canDetermine) {
        return false;
      }
    }
    if (noPxChangeTryDetermine.length) {
      // Remove the result of `buildAxisLabel`
      group.remove(local.labelGroup);
      axisLabelBuildResultSet(local, null, null, null);
    }
  }
  return true;
}
function buildAxisLabel(cfg, local, group, kind, axisModel, api) {
  var axis = axisModel.axis;
  var show = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve)(cfg.raw.axisLabelShow, axisModel.get(['axisLabel', 'show']));
  var labelGroup = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A();
  group.add(labelGroup);
  var axisLabelCreationCtx = (0,_coord_axisTickLabelBuilder_js__WEBPACK_IMPORTED_MODULE_15__/* .createAxisLabelsComputingContext */ .eP)(kind);
  if (!show || axis.scale.isBlank()) {
    axisLabelBuildResultSet(local, [], labelGroup, axisLabelCreationCtx);
    return;
  }
  var labelModel = axisModel.getModel('axisLabel');
  var labels = axis.getViewLabels(axisLabelCreationCtx);
  // Special label rotate.
  var labelRotation = ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve)(cfg.raw.labelRotate, labelModel.get('rotate')) || 0) * PI / 180;
  var labelLayout = AxisBuilder.innerTextLayout(cfg.rotation, labelRotation, cfg.labelDirection);
  var rawCategoryData = axisModel.getCategories && axisModel.getCategories(true);
  var labelEls = [];
  var triggerEvent = axisModel.get('triggerEvent');
  var z2Min = Infinity;
  var z2Max = -Infinity;
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)(labels, function (labelItem, index) {
    var _a;
    var labelItemTick = labelItem.tick;
    var formattedLabel = labelItem.formattedLabel;
    var rawLabel = labelItem.rawLabel;
    var itemLabelModel = labelModel;
    var tickValue = (0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .getTickValueOutermost */ .NQ)(axis.scale, labelItemTick);
    if (rawCategoryData && rawCategoryData[tickValue]) {
      var rawCategoryItem = rawCategoryData[tickValue];
      if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(rawCategoryItem) && rawCategoryItem.textStyle) {
        itemLabelModel = new _model_Model_js__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A(rawCategoryItem.textStyle, labelModel, axisModel.ecModel);
      }
    }
    var textColor = itemLabelModel.getTextColor() || axisModel.get(['axisLine', 'lineStyle', 'color']);
    var align = itemLabelModel.getShallow('align', true) || labelLayout.textAlign;
    var alignMin = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(itemLabelModel.getShallow('alignMinLabel', true), align);
    var alignMax = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(itemLabelModel.getShallow('alignMaxLabel', true), align);
    var verticalAlign = itemLabelModel.getShallow('verticalAlign', true) || itemLabelModel.getShallow('baseline', true) || labelLayout.textVerticalAlign;
    var verticalAlignMin = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(itemLabelModel.getShallow('verticalAlignMinLabel', true), verticalAlign);
    var verticalAlignMax = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(itemLabelModel.getShallow('verticalAlignMaxLabel', true), verticalAlign);
    var z2 = 10 + (((_a = labelItemTick.time) === null || _a === void 0 ? void 0 : _a.level) || 0);
    z2Min = Math.min(z2Min, z2);
    z2Max = Math.max(z2Max, z2);
    var textEl = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Ay({
      // --- transform props start ---
      // All of the transform props MUST not be set here, but should be set in
      // `updateAxisLabelChangableProps`, because they may change in estimation,
      // and need to calculate based on global coord sys by `decomposeTransform`.
      x: 0,
      y: 0,
      rotation: 0,
      // --- transform props end ---
      silent: AxisBuilder.isLabelSilent(axisModel),
      z2: z2,
      style: (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_17__/* .createTextStyle */ .VB)(itemLabelModel, {
        text: formattedLabel,
        align: index === 0 ? alignMin : index === labels.length - 1 ? alignMax : align,
        verticalAlign: index === 0 ? verticalAlignMin : index === labels.length - 1 ? verticalAlignMax : verticalAlign,
        fill: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.isFunction)(textColor) ? textColor(
        // (1) In category axis with data zoom, tick is not the original
        // index of axis.data. So tick should not be exposed to user
        // in category axis.
        // (2) Compatible with previous version, which always use formatted label as
        // input. But in interval scale the formatted label is like '223,445', which
        // maked user replace ','. So we modify it to return original val but remain
        // it as 'string' to avoid error in replacing.
        axis.type === 'category' ? rawLabel : axis.type === 'value' ? tickValue + '' : tickValue, index) : textColor
      })
    });
    textEl.anid = 'label_' + tickValue;
    var inner = getLabelInner(textEl);
    inner.labelInfo = labelItem;
    inner.layoutRotation = labelLayout.rotation;
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_13__.setTooltipConfig({
      el: textEl,
      componentModel: axisModel,
      itemName: formattedLabel,
      formatterParamsExtra: {
        isTruncated: function () {
          return textEl.isTruncated;
        },
        value: rawLabel,
        tickIndex: index
      }
    });
    // Pack data for mouse event
    if (triggerEvent) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = 'axisLabel';
      eventData.value = rawLabel;
      eventData.tickIndex = index;
      var labelItemTickBreak = labelItem.tick["break"];
      if (labelItemTickBreak) {
        var labelItemTickBreakParsedBreak = labelItemTickBreak.parsedBreak;
        eventData["break"] = {
          // type: labelItem.break.type,
          start: labelItemTickBreakParsedBreak.vmin,
          end: labelItemTickBreakParsedBreak.vmax
        };
      }
      if (axis.type === 'category') {
        eventData.dataIndex = tickValue;
      }
      (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_18__/* .getECData */ .z)(textEl).eventData = eventData;
      if (labelItemTickBreak) {
        addBreakEventHandler(axisModel, api, textEl, labelItemTickBreak);
      }
    }
    labelEls.push(textEl);
    labelGroup.add(textEl);
  });
  var labelLayoutList = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.map)(labelEls, function (label) {
    return {
      label: label,
      priority: getLabelInner(label).labelInfo.tick["break"] ? label.z2 + (z2Max - z2Min + 1) // Make break labels be highest priority.
      : label.z2,
      defaultAttr: {
        ignore: label.ignore
      }
    };
  });
  axisLabelBuildResultSet(local, labelLayoutList, labelGroup, axisLabelCreationCtx);
}
// Indicate that `layOutAxisTickLabel` has been called.
function axisLabelBuildResultExists(local) {
  return !!local.labelLayoutList;
}
function axisLabelBuildResultSet(local, labelLayoutList, labelGroup, axisLabelsCreationContext) {
  // Ensure the same lifetime.
  local.labelLayoutList = labelLayoutList;
  local.labelGroup = labelGroup;
  local.axisLabelsCreationContext = axisLabelsCreationContext;
}
function updateAxisLabelChangableProps(cfg, axisModel, labelLayoutList, transformGroup) {
  var labelMargin = axisModel.get(['axisLabel', 'margin']);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)(labelLayoutList, function (layout, idx) {
    var geometry = (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)(layout);
    if (!geometry) {
      return;
    }
    var labelEl = geometry.label;
    var inner = getLabelInner(labelEl);
    // See the comment in `suggestIgnore`.
    geometry.suggestIgnore = labelEl.ignore;
    // Currently no `ignore:true` is set in `buildAxisLabel`
    // But `ignore:true` may be set subsequently for overlap handling, thus reset it here.
    labelEl.ignore = false;
    (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_21__/* .copyTransform */ .IT)(_tmpLayoutEl, _tmpLayoutElReset);
    var axis = axisModel.axis;
    _tmpLayoutEl.x = axis.dataToCoord((0,_coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .getTickValueOutermost */ .NQ)(axis.scale, inner.labelInfo.tick));
    _tmpLayoutEl.y = cfg.labelOffset + cfg.labelDirection * labelMargin;
    _tmpLayoutEl.rotation = inner.layoutRotation;
    transformGroup.add(_tmpLayoutEl);
    _tmpLayoutEl.updateTransform();
    transformGroup.remove(_tmpLayoutEl);
    _tmpLayoutEl.decomposeTransform();
    (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_21__/* .copyTransform */ .IT)(labelEl, _tmpLayoutEl);
    labelEl.markRedraw();
    (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .setLabelLayoutDirty */ .LC)(geometry, true);
    (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)(geometry);
  });
}
var _tmpLayoutEl = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A();
var _tmpLayoutElReset = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A();
function hasAxisName(axisName) {
  return !!axisName;
}
function addBreakEventHandler(axisModel, api, textEl, visualBreak) {
  textEl.on('click', function (params) {
    var payload = {
      type: _axisAction_js__WEBPACK_IMPORTED_MODULE_23__/* .AXIS_BREAK_EXPAND_ACTION_TYPE */ .vb,
      breaks: [{
        start: visualBreak.parsedBreak.breakOption.start,
        end: visualBreak.parsedBreak.breakOption.end
      }]
    };
    payload[axisModel.axis.dim + "AxisIndex"] = axisModel.componentIndex;
    api.dispatchAction(payload);
  });
}
function adjustBreakLabels(axisModel, axisRotation, labelLayoutList) {
  var scaleBreakHelper = (0,_scale_break_js__WEBPACK_IMPORTED_MODULE_10__/* .getScaleBreakHelper */ .mn)();
  if (!scaleBreakHelper) {
    return;
  }
  var breakLabelIndexPairs = scaleBreakHelper.retrieveAxisBreakPairs(labelLayoutList, function (layoutInfo) {
    return layoutInfo && getLabelInner(layoutInfo.label).labelInfo.tick["break"];
  }, true);
  var moveOverlap = axisModel.get(['breakLabelLayout', 'moveOverlap'], true);
  if (moveOverlap === true || moveOverlap === 'auto') {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each)(breakLabelIndexPairs, function (idxPair) {
      (0,_axisBreakHelper_js__WEBPACK_IMPORTED_MODULE_11__/* .getAxisBreakHelper */ .D)().adjustBreakLabelPair(axisModel.axis.inverse, axisRotation, [(0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)(labelLayoutList[idxPair[0]]), (0,_label_labelLayoutHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .ensureLabelLayoutWithGeometry */ .jj)(labelLayoutList[idxPair[1]])]);
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxisBuilder);

/***/ }),

/***/ 48884:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35980);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55736);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88367);
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75454);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _label_labelStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88908);

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




function symbolNeedsDraw(data, point, idx, opt) {
  return point && !isNaN(point[0]) && !isNaN(point[1]) && !(opt && opt.isIgnore && opt.isIgnore(idx))
  // We do not set clipShape on group, because it will cut part of
  // the symbol element shape. We use the same clip shape here as
  // the line clip.
  && !(opt && opt.clipShape && !opt.clipShape.contain(point[0], point[1])) && data.getItemVisual(idx, 'symbol') !== 'none';
}
function normalizeUpdateOpt(opt) {
  if (opt != null && !(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(opt)) {
    opt = {
      isIgnore: opt
    };
  }
  return opt || {};
}
function makeSeriesScope(data) {
  var seriesModel = data.hostModel;
  var emphasisModel = seriesModel.getModel('emphasis');
  return {
    emphasisItemStyle: emphasisModel.getModel('itemStyle').getItemStyle(),
    blurItemStyle: seriesModel.getModel(['blur', 'itemStyle']).getItemStyle(),
    selectItemStyle: seriesModel.getModel(['select', 'itemStyle']).getItemStyle(),
    focus: emphasisModel.get('focus'),
    blurScope: emphasisModel.get('blurScope'),
    emphasisDisabled: emphasisModel.get('disabled'),
    hoverScale: emphasisModel.get('scale'),
    labelStatesModels: (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_1__/* .getLabelStatesModels */ .lx)(seriesModel),
    cursorStyle: seriesModel.get('cursor')
  };
}
function createEl(SymbolCtor, data, newIdx, seriesScope, symbolUpdateOpt, point, group) {
  var symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
  symbolEl.setPosition(point);
  data.setItemGraphicEl(newIdx, symbolEl);
  group.add(symbolEl);
  return symbolEl;
}
var SymbolDraw = /** @class */function () {
  function SymbolDraw(SymbolCtor) {
    this.group = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
    this._SymbolCtor = SymbolCtor || _Symbol_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A;
  }
  /**
   * Update symbols draw by new data
   */
  SymbolDraw.prototype.updateData = function (data, opt) {
    // Remove progressive els.
    this._progressiveEls = null;
    opt = normalizeUpdateOpt(opt);
    var group = this.group;
    var seriesModel = data.hostModel;
    var oldData = this._data;
    var SymbolCtor = this._SymbolCtor;
    var disableAnimation = opt.disableAnimation;
    var seriesScope = this._seriesScope = makeSeriesScope(data);
    var symbolUpdateOpt = {
      disableAnimation: disableAnimation
    };
    var getSymbolPoint = opt.getSymbolPoint || function (idx) {
      return data.getItemLayout(idx);
    };
    // There is no oldLineData only when first rendering or switching from
    // stream mode to normal mode, where previous elements should be removed.
    if (!oldData) {
      group.removeAll();
    }
    data.diff(oldData).add(function (newIdx) {
      var point = getSymbolPoint(newIdx);
      if (symbolNeedsDraw(data, point, newIdx, opt)) {
        createEl(SymbolCtor, data, newIdx, seriesScope, symbolUpdateOpt, point, group);
      }
    }).update(function (newIdx, oldIdx) {
      var symbolEl = oldData.getItemGraphicEl(oldIdx);
      var point = getSymbolPoint(newIdx);
      if (!symbolNeedsDraw(data, point, newIdx, opt)) {
        group.remove(symbolEl);
        return;
      }
      var newSymbolType = data.getItemVisual(newIdx, 'symbol') || 'circle';
      var oldSymbolType = symbolEl && symbolEl.getSymbolType && symbolEl.getSymbolType();
      if (!symbolEl
      // Create a new if symbol type changed.
      || oldSymbolType && oldSymbolType !== newSymbolType) {
        group.remove(symbolEl);
        symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
        symbolEl.setPosition(point);
      } else {
        symbolEl.updateData(data, newIdx, seriesScope, symbolUpdateOpt);
        var target = {
          x: point[0],
          y: point[1]
        };
        disableAnimation ? symbolEl.attr(target) : _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* .updateProps */ .oi(symbolEl, target, seriesModel);
      }
      // Add back
      group.add(symbolEl);
      data.setItemGraphicEl(newIdx, symbolEl);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && el.fadeOut(function () {
        group.remove(el);
      }, seriesModel);
    }).execute();
    this._getSymbolPoint = getSymbolPoint;
    this._data = data;
  };
  ;
  SymbolDraw.prototype.updateLayout = function (opt) {
    var data = this._data;
    if (!data) {
      return;
    }
    var symbolDraw = this;
    var store = data.getStore();
    for (var idx = 0, len = store.count(); idx < len; idx++) {
      var el = data.getItemGraphicEl(idx);
      var point = symbolDraw._getSymbolPoint(idx);
      // FIXME: [FIXME_SYMBOL_CLIP_CONSIDERING_COORD_SYS_ALIGNMENT_DURING_ANIMATION]
      //  See VIEW_COORD_SYS animation (by center/zoom change) and FIXME_VIEW_COORD_SYS_SYNC_BACK.
      //  If we create symbols when roaming them into the clip area, they can not be laid out
      //  based on the intermediate state but can only based on the final state of VIEW_COORD_SYS,
      //  and introduce visual artifacts.
      // Consider clip, need to handle create or remove.
      if (symbolNeedsDraw(data, point, idx, opt)) {
        el = el || createEl(symbolDraw._SymbolCtor, data, idx, symbolDraw._seriesScope, {
          disableAnimation: true
        }, point, symbolDraw.group);
        el.stopAnimation();
        el.setPosition(point);
        el.markRedraw();
      } else if (el) {
        symbolDraw.group.remove(el);
        data.setItemGraphicEl(idx, null);
      }
    }
  };
  ;
  SymbolDraw.prototype.incrementalPrepareUpdate = function (data) {
    this._seriesScope = makeSeriesScope(data);
    this._data = null;
    this.group.removeAll();
  };
  ;
  SymbolDraw.prototype.incrementalUpdate = function (taskParams, data, incrementalId, opt) {
    // Clear
    this._progressiveEls = [];
    opt = normalizeUpdateOpt(opt);
    function updateIncrementalAndHover(el) {
      if (!el.isGroup) {
        el.incremental = incrementalId;
        el.ensureState('emphasis').hoverLayer = _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.HOVER_LAYER_FOR_INCREMENTAL;
      }
    }
    for (var idx = taskParams.start; idx < taskParams.end; idx++) {
      var point = data.getItemLayout(idx);
      if (symbolNeedsDraw(data, point, idx, opt)) {
        var el = new this._SymbolCtor(data, idx, this._seriesScope);
        el.traverse(updateIncrementalAndHover);
        el.setPosition(point);
        this.group.add(el);
        data.setItemGraphicEl(idx, el);
        this._progressiveEls.push(el);
      }
    }
  };
  ;
  SymbolDraw.prototype.eachRendered = function (cb) {
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.traverseElements(this._progressiveEls || this.group, cb);
  };
  SymbolDraw.prototype.remove = function (enableAnimation) {
    var group = this.group;
    var data = this._data;
    // Incremental model do not have this._data.
    if (data && enableAnimation) {
      data.eachItemGraphicEl(function (el) {
        el.fadeOut(function () {
          group.remove(el);
        }, data.hostModel);
      });
    } else {
      group.removeAll();
    }
  };
  ;
  return SymbolDraw;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SymbolDraw);

/***/ }),

/***/ 50755:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ parseXML)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);

function parseXML(svg) {
    if ((0,_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(svg)) {
        var parser = new DOMParser();
        svg = parser.parseFromString(svg, 'text/xml');
    }
    var svgNode = svg;
    if (svgNode.nodeType === 9) {
        svgNode = svgNode.firstChild;
    }
    while (svgNode.nodeName.toLowerCase() !== 'svg' || svgNode.nodeType !== 1) {
        svgNode = svgNode.nextSibling;
    }
    return svgNode;
}


/***/ }),

/***/ 50834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ installParallelActions)
/* harmony export */ });

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
var actionInfo = {
  type: 'axisAreaSelect',
  event: 'axisAreaSelected'
  // update: 'updateVisual'
};
function installParallelActions(registers) {
  registers.registerAction(actionInfo, function (payload, ecModel) {
    ecModel.eachComponent({
      mainType: 'parallelAxis',
      query: payload
    }, function (parallelAxisModel) {
      parallelAxisModel.axis.model.setActiveIntervals(payload.intervals);
    });
  });
  /**
   * @payload
   */
  registers.registerAction('parallelAxisExpand', function (payload, ecModel) {
    ecModel.eachComponent({
      mainType: 'parallel',
      query: payload
    }, function (parallelModel) {
      parallelModel.setAxisExpand(payload);
    });
  });
}

/***/ }),

/***/ 51544:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bs: () => (/* binding */ registerRoamActionSimply),
/* harmony export */   LZ: () => (/* binding */ isRoamPayloadHasZoom),
/* harmony export */   QB: () => (/* binding */ createIsInSelfByPointerCheckerEl),
/* harmony export */   ao: () => (/* binding */ createViewCoordSysSimply),
/* harmony export */   jg: () => (/* binding */ updateRoamControllerSimply)
/* harmony export */ });
/* harmony import */ var _coord_View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55103);
/* harmony import */ var _util_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66402);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88367);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30582);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11138);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);

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
 * An abstraction for some similar impl in roaming.
 *
 * Require action like `registerRoamActionSimply`.
 */
function updateRoamControllerSimply(componentOrSeries, api, controller,
// Can use `createIsInSelfByPointerCheckerEl`
isInSelf, clipRect, extraOnRoam, roamTypeDefault, geoBackwardCompat) {
  var coordSys = (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .getOwnRoamViewCoordSys */ .Nl)(componentOrSeries);
  if (!coordSys) {
    controller.disable();
    return;
  }
  controller.enable(
  // NOTE:
  //  If roamTypeDefault is null/undefined, roamType will be set as true.
  // PENDING:
  //  In MapSeries case, it has long been retrieving `roam` option from the first MapSeries
  //  that are not filtered out by a legend. But that requires `roam: true` to be set in all
  //  MapSeries option, otherwise if a legend hides the `roam: true` MapSeries, the map can
  //  not be roamed unexpectedly.
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2)(componentOrSeries.get('roam'), roamTypeDefault), {
    api: api,
    zInfo: {
      component: componentOrSeries
    },
    triggerInfo: {
      roamTrigger: componentOrSeries.get('roamTrigger'),
      isInSelf: isInSelf,
      isInClip: function (e, x, y) {
        return !clipRect || clipRect.contain(x, y);
      }
    }
  });
  function dispatchAction(extra) {
    var mainType = componentOrSeries.mainType;
    var payload = (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_2__.payloadDisableAnimation)((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults)({
      type: makeViewCoordSysActionType(mainType, componentOrSeries.subType, _util_types_js__WEBPACK_IMPORTED_MODULE_3__/* .ROAM_ACTION_TYPE_SUFFIX */ .Ev)
    }, extra));
    if (geoBackwardCompat) {
      payload.componentType = mainType;
    }
    // Like `seriesId`, `geoId`.
    payload[mainType + "Id"] = componentOrSeries.id;
    api.dispatchAction(payload);
  }
  controller.off('pan').off('zoom')
  // NOTICE: 'pan' and 'zoom' listener should do nothing except `api.dispatchAction`,
  // the rest logic should be performed in the action handler and `updateTransform`;
  // otherwise, it can cause inconsistency if users trigger this action explicitly.
  .on('pan', function (event) {
    extraOnRoam && extraOnRoam('pan');
    dispatchAction({
      dx: event.dx,
      dy: event.dy
    });
  }).on('zoom', function (event) {
    extraOnRoam && extraOnRoam('zoom');
    dispatchAction({
      zoom: event.scale,
      originX: event.originX,
      originY: event.originY
    });
  });
}
function createIsInSelfByPointerCheckerEl(pointerCheckerEl) {
  return function (e, x, y) {
    tmpRectCII.copy(pointerCheckerEl.getBoundingRect());
    tmpRectCII.applyTransform(pointerCheckerEl.getComputedTransform());
    return tmpRectCII.contain(x, y);
  };
}
var tmpRectCII = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay(0, 0, 0, 0);
function registerRoamActionSimply(registers, mainType, subType) {
  var actionType = makeViewCoordSysActionType(mainType, subType, _util_types_js__WEBPACK_IMPORTED_MODULE_3__/* .ROAM_ACTION_TYPE_SUFFIX */ .Ev);
  registers.registerAction({
    type: actionType,
    event: actionType,
    // If `mainType` is a coord sys, 'update:' should be 'updateTransform' to
    // broadcast the update. But currently there is no such case required.
    // If 'updateTransform' is used, the owner of VIEW_COORD_SYS update firstly
    // in the action handler as follows, and then series and components laid
    // out on this VIEW_COORD_SYS update in `View['updateTransform']`.
    update: 'none'
  }, function (payload, ecModel, api) {
    ecModel.eachComponent((0,_util_model_js__WEBPACK_IMPORTED_MODULE_5__/* .makeQueryConditionKindA */ .dr)(payload, mainType, subType), function (componentOrSeries) {
      (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .ownRoamModelCoordSysUpdateInAction */ .X$)(payload, componentOrSeries);
      (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .ownRoamViewUpdateDirectlyInAction */ .jR)(payload, componentOrSeries, ecModel, api);
    });
  });
}
function makeViewCoordSysActionType(mainType, subType, suffix) {
  // e.g. 'treeRoam', 'sankeyRoam', 'geoRoam'
  return (mainType !== _util_types_js__WEBPACK_IMPORTED_MODULE_3__/* .COMPONENT_MAIN_TYPE_SERIES */ .t7 ? mainType : subType === 'map' ? 'geo' // Historical setting.
  : subType) + suffix;
}
function isRoamPayloadHasZoom(payload) {
  return payload.zoom != null;
}
function createViewCoordSysSimply(componentOrSeries, api,
// VIEW_COORD_SYS DataRect init:
x, y, width, height,
// VIEW_COORD_SYS ViewRect init:
// Use DataRect by default, which means DataRect is in pixel space.
viewRect) {
  var viewCoordSys = new _coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay(null, (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .useLegacyViewCoordSysCenterBase */ .kx)(componentOrSeries.ecModel, api));
  (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .viewCoordSysSetBoundingRect */ .Q3)(viewCoordSys, x, y, width, height);
  viewRect ? (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .viewCoordSysSetViewRect */ .Xj)(viewCoordSys, viewRect.x, viewRect.y, viewRect.width, viewRect.height) : (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .viewCoordSysSetViewRect */ .Xj)(viewCoordSys, x, y, width, height);
  (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_0__/* .viewCoordSysSetRoamOptionFromModel */ .dh)(viewCoordSys, componentOrSeries);
  return viewCoordSys;
}

/***/ }),

/***/ 53745:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   N: () => (/* binding */ geo2DDimensions)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55103);
/* harmony import */ var _geoSourceManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67023);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11138);
/* harmony import */ var zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80252);

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







var GEO_DEFAULT_PARAMS = {
  'geoJSON': {
    aspectScale: 0.75,
    invertLongitute: true
  },
  'geoSVG': {
    aspectScale: 1,
    invertLongitute: false
  }
};
var geo2DDimensions = ['lng', 'lat'];
var Geo = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(Geo, _super); // See VIEW_COORD_SYS_TRANS_OVERALL_BACKWARD_COMPATIBILITY
  function Geo(name, map, opt) {
    var _this = _super.call(this) || this;
    _this.dimensions = geo2DDimensions;
    _this.type = 'geo';
    // Only store specified name coord via `addGeoCoord`.
    _this._nameCoordMap = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.createHashMap();
    _this.name = name;
    var projection = opt.projection;
    var source = _geoSourceManager_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.load(map, opt.nameMap, opt.nameProperty);
    var resource = _geoSourceManager_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.getGeoResource(map);
    var resourceType = _this.resourceType = resource ? resource.type : null;
    var regions = _this.regions = source.regions;
    var defaultParams = GEO_DEFAULT_PARAMS[resource.type];
    _this._clip = opt.clip;
    // Not invert longitude if projection exits.
    var invertLongitute = projection ? false : defaultParams.invertLongitute;
    _this.view = new _View_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay(invertLongitute, (0,_View_js__WEBPACK_IMPORTED_MODULE_3__/* .useLegacyViewCoordSysCenterBase */ .kx)(opt.ecModel, opt.api), _this);
    _this.map = map;
    _this._regionsMap = source.regionsMap;
    _this.regions = source.regions;
    if (false) {}
    _this.projection = projection;
    var boundingRect;
    if (projection) {
      // Can't reuse the raw bounding rect
      for (var i = 0; i < regions.length; i++) {
        var regionRect = regions[i].getBoundingRect(projection);
        boundingRect = boundingRect || regionRect.clone();
        boundingRect.union(regionRect);
      }
    } else {
      boundingRect = source.boundingRect;
    }
    (0,_View_js__WEBPACK_IMPORTED_MODULE_3__/* .viewCoordSysSetBoundingRect */ .Q3)(_this.view, boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height);
    // aspectScale and invertLongitute actually is the parameters default raw projection.
    // So we ignore them if projection is given.
    // Ignore default aspect scale if projection exits.
    _this.aspectScale = projection ? 1 : zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2(opt.aspectScale, defaultParams.aspectScale);
    return _this;
  }
  Geo.prototype.getRegion = function (name) {
    return this._regionsMap.get(name);
  };
  Geo.prototype.getRegionByCoord = function (coord) {
    var regions = this.regions;
    for (var i = 0; i < regions.length; i++) {
      var region = regions[i];
      if (region.type === 'geoJSON' && region.contain(coord)) {
        return regions[i];
      }
    }
  };
  /**
   * Add geoCoord for indexing by name
   */
  Geo.prototype.addGeoCoord = function (name, geoCoord) {
    this._nameCoordMap.set(name, geoCoord);
  };
  /**
   * Get geoCoord by name
   */
  Geo.prototype.getGeoCoord = function (name) {
    var region = this._regionsMap.get(name);
    // Calculate center only on demand.
    return this._nameCoordMap.get(name) || region && region.getCenter();
  };
  Geo.prototype.dataToPoint = function (data, noRoam, out) {
    if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isString(data)) {
      // Map area name to geoCoord
      data = this.getGeoCoord(data);
    }
    if (data) {
      var projection = this.projection;
      if (projection) {
        // projection may return null point.
        data = projection.project(data);
      }
      return data && this.view.dataToPoint(data, noRoam, out);
    }
  };
  Geo.prototype.pointToData = function (point, reserved, out) {
    var projection = this.projection;
    if (projection) {
      // projection may return null point.
      point = projection.unproject(point);
    }
    // FIXME: if no `point`, should return [NaN, NaN], rather than undefined.
    //  null/undefined has special meaning in `convertFromPixel`.
    return point && this.view.pointToData(point, out);
  };
  Geo.prototype.convertToPixel = function (ecModel, finder, value) {
    var coordSys = getCoordSys(finder);
    return coordSys === this ? coordSys.dataToPoint(value) : null;
  };
  Geo.prototype.convertFromPixel = function (ecModel, finder, pixel) {
    var coordSys = getCoordSys(finder);
    return coordSys === this ? coordSys.pointToData(pixel) : null;
  };
  Geo.prototype.containPoint = function (point) {
    return this.view.containPoint(point);
  };
  Geo.prototype.getArea = function (tolerance) {
    tolerance = tolerance || 0;
    var rect = (0,_View_js__WEBPACK_IMPORTED_MODULE_3__/* .viewCoordSysCopyViewRect */ .cH)(null, this.view);
    rect.x -= tolerance;
    rect.y -= tolerance;
    rect.width += 2 * tolerance;
    rect.height += 2 * tolerance;
    return rect;
  };
  Geo.prototype.shouldClip = function () {
    return this._clip;
  };
  /**
   * @implements CoordinateSystem['getBoundingRect']
   */
  Geo.prototype.getBoundingRect = function () {
    return this.view.getBoundingRect();
  };
  /**
   * @implements CoordinateSystem['getViewRect']
   */
  Geo.prototype.getViewRect = function () {
    return this.view.getViewRect();
  };
  /**
   * @implements CoordinateSystem['getRoamTransform']
   */
  Geo.prototype.getRoamTransform = function () {
    return this.view.getRoamTransform();
  };
  return Geo;
}(zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay // See VIEW_COORD_SYS_TRANS_OVERALL_BACKWARD_COMPATIBILITY
);
;
function getCoordSys(finder) {
  var geoModel = finder.geoModel;
  var seriesModel = finder.seriesModel;
  return geoModel ? geoModel.coordinateSystem : seriesModel ? seriesModel.coordinateSystem // For map series.
  || (seriesModel.getReferringComponents('geo', _util_model_js__WEBPACK_IMPORTED_MODULE_5__/* .SINGLE_REFERRING */ .US).models[0] || {}).coordinateSystem : null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Geo);

/***/ }),

/***/ 55103:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $o: () => (/* binding */ VIEW_COORD_SYS_TRANS_ROAM),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   D7: () => (/* binding */ viewCoordSysCopyBoundingRect),
/* harmony export */   G6: () => (/* binding */ VIEW_COORD_SYS_TRANS_RAW),
/* harmony export */   Nl: () => (/* binding */ getOwnRoamViewCoordSys),
/* harmony export */   P4: () => (/* binding */ viewCoordSysCopyTrans),
/* harmony export */   Q3: () => (/* binding */ viewCoordSysSetBoundingRect),
/* harmony export */   T$: () => (/* binding */ clampByZoomLimit),
/* harmony export */   X$: () => (/* binding */ ownRoamModelCoordSysUpdateInAction),
/* harmony export */   Xj: () => (/* binding */ viewCoordSysSetViewRect),
/* harmony export */   YP: () => (/* binding */ calcCompensationScaleToPreserveNodeSize),
/* harmony export */   ZD: () => (/* binding */ VIEW_COORD_SYS_TRANS_OVERALL),
/* harmony export */   _: () => (/* binding */ viewCoordSysGetZoomOption),
/* harmony export */   cH: () => (/* binding */ viewCoordSysCopyViewRect),
/* harmony export */   dh: () => (/* binding */ viewCoordSysSetRoamOptionFromModel),
/* harmony export */   jR: () => (/* binding */ ownRoamViewUpdateDirectlyInAction),
/* harmony export */   kx: () => (/* binding */ useLegacyViewCoordSysCenterBase),
/* harmony export */   nT: () => (/* binding */ applyViewCoordSysTransToElement),
/* harmony export */   rj: () => (/* binding */ viewCoordSysCopyOverallMatrix),
/* harmony export */   yD: () => (/* binding */ isViewCoordSys)
/* harmony export */ });
/* unused harmony export VIEW_COORD_SYS_TYPE */
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30582);
/* harmony import */ var zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80252);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84408);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11916);
/* harmony import */ var _core_ExtensionAPI_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(28704);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88367);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(55736);
/* harmony import */ var zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43041);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2103);

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
 * @tutorial [VIEW_COORD_SYS_ANIMATION]
 *
 *  Some VIEW_COORD_SYS may need to support roaming animation, which may be required when the original
 *  inputs (such as `center/zoom/left/top/right/bottomwidth/height/etc.`) are changed via `setOption`.
 *  Roaming animation requires strict visual alignment between VIEW_COORD_SYS itself (consider "geo map")
 *  and its content (e.g., scatter series).
 *  A logically correct implementation is probably applying animation to VIEW_COORD_SYS's inputs and
 *  calculate VIEW_COORD_SYS's transformation and lay out its dependent series per frame via
 *  `dispatchAction`-ish pattern. But this approach require more mechanism to be introduced and careful
 *  refactoring.
 *  Instead, we currently still follow the conventional implementation - create animation separately on
 *  each element (typically via `graphic.updateProps`) . See VIEW_COORD_SYS_ANIMATION_PROPS_CONSTRAINT.
 *
 *  [VIEW_COORD_SYS_ANIMATION_PROPS_CONSTRAINT]:
 *    The animation should only interpolate `x/y/scaleX/scaleY`, thereby ensuring visual alignment, even
 *    though `MapDraw` applies animations only on a "VIEW_COORD_SYS_TRANS_ROAM" but scatter series applies
 *    animation on a "VIEW_COORD_SYS_TRANS_OVERALL".
 *    But this constraint must always be respected by all relevant components and series.
 *
 *  [VIEW_COORD_SYS_ANIMATION_INTERRUPTION]:
 *    The animation should be able to be interrupted, such as when users roam it by mouse or touch.
 *    When interrupted, `center` and `zoom` must be synchronized back to the VIEW_COORD_SYS and host models
 *    (e.g., geo components or map series). Otherwise, a next `setOption` can cause unexpected result due to
 *    the outdated `center` and `zoom`.
 *    But see FIXME_VIEW_COORD_SYS_SYNC_BACK for some existing bugs.
 *
 *  [VIEW_COORD_SYS_UPDATE_FLOW]:
 *    To avoid bidirectional flow, we consider the original inputs (center/zoom/dataRect/viewRect/etc.) as
 *    the single source of truth, and always calculate transformations based on that.
 *    - Roaming interactions ('pan'/'zoom') can trigger an update to the original inputs via
 *      `dispatchAction({type: 'xxxRoam', ...})`.
 *    - Roaming animation can synchronize back to the original inputs when interrupted.
 *      See `syncBackEl`: It is zrender elements that are assigned with VIEW_COORD_SYS_TRANSFORMATION,
 *      and may be modified outside, typically by animation.
 */
/**
 * @tutorial [VIEW_COORD_SYS_TRANSFORMATION]
 *
 *  @tutorial [VIEW_COORD_SYS_TRANS_RAW]
 *    It is the transformation from `ViewInner['dataRect']` to `ViewInner['viewRect']`.
 *    - ViewInner['dataRect']:
 *      A rect in a source space (or say, data space).
 *      The unit is defined by the source. For example,
 *        - for geo source, the unit defined as lat/lng,
 *        - for SVG source, the unit is the same as the width/height defined in SVG.
 *        - for series.graph/series.tree/series.sankey, the unit defined as px directly.
 *    - ViewInner['viewRect']:
 *      A rect in the canvas pixel space.
 *      For example, it can be ec option left/right/top/bottom/width/height of a component or series.
 *    NOTICE:
 *      - ViewInner['dataRect'] and ViewInner['viewRect'] affect the behavior when centerOption contains
 *        absolute values. See VIEW_COORD_SYS_CENTER_ZOOM_DEFINITION .
 *
 *  @tutorial [VIEW_COORD_SYS_TRANS_ROAM]
 *    It is built with respect to `RoamOptionMixin['center']` and `RoamOptionMixin['zoom']`.
 *    [VIEW_COORD_SYS_CENTER_ZOOM_DEFINITION]:
 *      {pxSpace} <-roamTrans- {viewRectSpace} <-rawTrans- {dataRectSpace} <-- ...
 *                     |                                         |
 *                 zoomOption                                centerOption
 *      `RoamOptionMixin['center']` is a user specified point on the space of `ViewInner['dataRect']`,
 *      which will be located to the center of `ViewInner['viewRect']`.
 *      It can also be a percent value (e.g. '50%'), based on ViewInner['dataRect'].width/height` (since v6).
 *      Under this definition, users can use '0%' to map the top-left of `ViewInner['dataRect']`
 *      to the center of `ViewInner['viewRect']`.
 *      NOTICE:
 *        - `RoamOptionMixin['center']` is in a linear space regardless of `GeoCommonOptionMixin['projection']`
 *        - Absolute values in centerOption may hardly have a rigorous meaningful definition if the layout
 *          is auto-calculated, since users are unlikely to known the exact value of the bounding rect.
 *          And it is affected by the settings of ViewInner['dataRect'] and ViewInner['viewRect'].
 *          Therefore, percent centerOption is preferred.
 *      Use cases:
 *        geo and map series (`MapDraw`) use this transformation for roamming, since the source
 *        has been converted with respect to VIEW_COORD_SYS_TRANS_RAW.
 *
 *  @tutorial [VIEW_COORD_SYS_TRANS_OVERALL]
 *    This is the result of
 *      `matrix_left_multiply(VIEW_COORD_SYS_TRANS_ROAM, VIEW_COORD_SYS_TRANS_RAW)`.
 *    Use case:
 *      sankey/tree/graph series use this transformation for roamming.
 *
 *  @tutorial [VIEW_COORD_SYS_TRANSFORMATION_FORMULA]
 *    [Basic]:
 *      {pxSpace} <-roamTrans- {viewRectSpace} <-rawTrans- {dataRectSpace} <-- ...
 *      pxPoint = roamTrans * rawTrans * dataPoint
 *      overallTrans = roamTrans * rawTrans
 *    [e.g., geo case]:
 *             pxPoint = roamTrans * (rawTrans * (projection * dataPoint))
 *      Hence: pxPoint = group_syncBackType_ROAM * (rawTrans * (projection * dataPoint))
 *      Hence: pxPoint = group_syncBackType_ROAM * rawTrans_projection_precalculated_point
 *    [e.g., graph series case]:
 *             pxPoint = (roamTrans * rawTrans) * upper_els
 *      Hence: pxPoint = group_syncBackType_OVERALL * upper_els
 *      (NOTE: upper_els can have their own transformations)
 *
 * @see viewCoordSysCopyTrans for fetching transformations.
 */
var VIEW_COORD_SYS_TRANS_RAW = 0;
var VIEW_COORD_SYS_TRANS_ROAM = 1;
var VIEW_COORD_SYS_TRANS_OVERALL = 2;
function inner(viewCoordSys) {
  return viewCoordSys;
}
var VIEW_COORD_SYS_TYPE = 'view';
/**
 * [VIEW_COORD_SYS]
 *
 * @final [NOTICE] Inheritance of this class is not recommended. Use composition instead.
 */
var View = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(View, _super);
  function View(invertY, legacyCenterBase, legacyGeo) {
    var _this = _super.call(this) || this;
    _this.type = VIEW_COORD_SYS_TYPE;
    _this.dimensions = ['x', 'y'];
    var viewInner = inner(_this);
    viewInner.invertY = invertY;
    viewInner.lgCt = legacyCenterBase;
    viewInner.lgGeo = legacyGeo;
    var trans = viewInner.trans = [];
    trans[VIEW_COORD_SYS_TRANS_RAW] = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableCreate */ .Rd)();
    trans[VIEW_COORD_SYS_TRANS_ROAM] = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableCreate */ .Rd)();
    trans[VIEW_COORD_SYS_TRANS_OVERALL] = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableCreate */ .Rd)();
    viewInner.mtRaw = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
    viewInner.mtRawInv = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
    viewInner.mtOverall = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
    viewInner.mtOverallInv = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
    viewInner.zoom = 1;
    return _this;
  }
  /**
   * @implements CoordinateSystem['getBoundingRect']
   * @see VIEW_COORD_SYS_TRANS_RAW
   *
   * This is a rect in data space.
   * For historicall reason, the name is `getBoundingRect` - preserve it for backward compatibility.
   */
  View.prototype.getBoundingRect = function () {
    return viewCoordSysCopyBoundingRect(null, this);
  };
  /**
   * @implements CoordinateSystem['getViewRect']
   * @see VIEW_COORD_SYS_TRANS_RAW
   */
  View.prototype.getViewRect = function () {
    return viewCoordSysCopyViewRect(null, this);
  };
  /**
   * @implements CoordinateSystem['getRoamTransform']
   */
  View.prototype.getRoamTransform = function () {
    return (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableGetLocalTransform */ .Ed)(inner(this).trans[VIEW_COORD_SYS_TRANS_ROAM]);
  };
  View.prototype.dataToPoint = function (data, noRoam, out) {
    var transform = noRoam ? inner(this).mtRaw : inner(this).mtOverall;
    out = out || [];
    return transform ? (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.applyTransform)(out, data, transform) : (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.copy)(out, data);
  };
  View.prototype.pointToData = function (point, reserved, out) {
    out = out || [];
    var invTransform = inner(this).mtOverallInv;
    return invTransform ? (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.applyTransform)(out, point, invTransform) : (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.copy)(out, point);
  };
  View.prototype.convertToPixel = function (ecModel, finder, value) {
    var coordSys = getCoordSys(finder);
    return coordSys === this ? coordSys.dataToPoint(value) : null;
  };
  View.prototype.convertFromPixel = function (ecModel, finder, pixel) {
    var coordSys = getCoordSys(finder);
    return coordSys === this ? coordSys.pointToData(pixel) : null;
  };
  View.prototype.containPoint = function (point) {
    var viewInner = inner(this);
    (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCopy */ .iZ)(tmpPixelRectForContain, viewInner.dataRect);
    (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectApplyTransform */ .zQ)(tmpPixelRectForContain, tmpPixelRectForContain, viewInner.mtOverall);
    return (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectContain */ .rd)(tmpPixelRectForContain, point[0], point[1]);
  };
  View.dimensions = ['x', 'y'];
  return View;
}(zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay);
var tmpPixelRectForContain = (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCreate */ .r_)();
function viewCoordSysCopyOverallMatrix(out, viewCoordSys) {
  return (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.copy)(out || [], inner(viewCoordSys).mtOverall);
}
function viewCoordSysGetZoomOption(viewCoordSys) {
  return inner(viewCoordSys).zoom;
}
function viewCoordSysCopyBoundingRect(out, viewCoordSys) {
  return (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCopy */ .iZ)(out || (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCreate */ .r_)(), inner(viewCoordSys).dataRect);
}
function viewCoordSysCopyViewRect(out, viewCoordSys) {
  return (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCopy */ .iZ)(out || (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCreate */ .r_)(), inner(viewCoordSys).viewRect);
}
function viewCoordSysCopyTrans(out, viewCoordSys, transKind
// @return The input `out` or create an object.
) {
  return (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .copyTransform */ .IT)(out || (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableCreate */ .Rd)(), inner(viewCoordSys).trans[transKind]);
}
function viewCoordSysIsInputReady(viewInner) {
  return !!(viewInner.dataRect && viewInner.viewRect);
  // NOTE: Other parameters has default values. Only parameters
  // above are required to be input.
}
function calcOverallTransFromSyncBackEl(out, viewInner, syncBackEl, syncBackType) {
  if (syncBackType === VIEW_COORD_SYS_TRANS_ROAM) {
    calcOverallTrans(out, viewInner.trans[VIEW_COORD_SYS_TRANS_RAW], syncBackEl);
  } else {
    (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .copyTransform */ .IT)(out, syncBackEl);
  }
}
function calcRoamTransFromOverallTrans(out, viewInner, overallTrans) {
  // Convert overallTrans to roamTrans. If update animation is applied to overallTrans,
  // we assume that rawTrans is changed instantly, and roamTrans takes that animation.
  // Formula:
  //  overallTrans = roamTrans * rawTrans
  //  overallTrans * invert(rawTrans) = roamTrans
  (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableGetLocalTransform */ .Ed)(overallTrans, tmpMtRTO);
  (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.mul)(tmpMtRTO, tmpMtRTO, viewInner.mtRawInv);
  (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.decomposeTransform)(out, tmpMtRTO);
}
var tmpMtRTO = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
/**
 * [NOTICE]
 *  The definition of this center has always been irrelevant to some other series center like
 *  'series-pie.center' - this center is a point in the space of `ViewInner['dataRect'].x/y`,
 *  rather than canvas viewport, and the unit is not necessarily pixel (e.g., in geo case).
 */
function viewCoordSysSetRoamOptionFromModel(viewCoordSys, hostModel) {
  var viewInner = inner(viewCoordSys);
  viewInner.centerOption = hostModel.getShallow('center');
  var zoomLimit = viewInner.zoomLimit = hostModel.getShallow('scaleLimit');
  var zoomOption = hostModel.getShallow('zoom');
  viewInner.zoom = clampByZoomLimit(zoomOption || 1, zoomLimit) || 1;
  if (viewCoordSysIsInputReady(viewInner)) {
    viewCoordSysUpdateTransform(viewInner);
  }
}
/**
 * @see ViewInner['dataRect']
 */
function viewCoordSysSetBoundingRect(viewCoordSys, x, y, width, height) {
  var viewInner = inner(viewCoordSys);
  viewInner.dataRect = new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay(x, y, width, height);
  if (viewCoordSysIsInputReady(viewInner)) {
    viewCoordSysUpdateTransform(viewInner);
  }
}
/**
 * @see ViewInner['viewRect']
 */
function viewCoordSysSetViewRect(viewCoordSys, x, y, width, height) {
  var viewInner = inner(viewCoordSys);
  viewInner.viewRect = new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay(x, y, width, height);
  if (viewCoordSysIsInputReady(viewInner)) {
    viewCoordSysUpdateTransform(viewInner);
  }
}
function viewCoordSysUpdateTransform(viewInner) {
  // The order matters.
  viewCoordSysUpdateRawTrans(viewInner);
  viewCoordSysUpdateRoamTrans(viewInner);
  viewCoordSysUpdateOverallTrans(viewInner);
}
function viewCoordSysUpdateRawTrans(viewInner) {
  var dataRect = viewInner.dataRect;
  var viewRect = viewInner.viewRect;
  var rawTrans = viewInner.trans[VIEW_COORD_SYS_TRANS_RAW];
  var invertY = viewInner.invertY;
  if (invertY) {
    dataRect = (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCopy */ .iZ)(tmpRectURT, dataRect);
    dataRect.y = -dataRect.y - dataRect.height;
  }
  (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCalculateTransform */ .Zv)(tmpMtURT, dataRect, viewRect);
  (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.decomposeTransform)(rawTrans, tmpMtURT);
  if (invertY) {
    rawTrans.scaleY = -rawTrans.scaleY;
  }
  var mtRaw = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableGetLocalTransform */ .Ed)(rawTrans, viewInner.mtRaw);
  (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.invert)(viewInner.mtRawInv, mtRaw);
}
var tmpMtURT = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
var tmpRectURT = (0,zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* .boundingRectCreate */ .r_)();
/**
 * NOTICE: It depends on `viewCoordSysUpdateRawTrans`.
 */
function viewCoordSysUpdateRoamTrans(viewInner) {
  var viewRectCenter = viewCoordSysGetViewRectCenter(viewInner);
  var roamViewCenter = parseCenterOption(tmpCenterURT, viewInner, viewInner.centerOption) ? (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.applyTransform)(tmpCenterURT, tmpCenterURT, viewInner.mtRaw) : viewRectCenter;
  var zoom = viewInner.zoom;
  var roamTrans = viewInner.trans[VIEW_COORD_SYS_TRANS_ROAM];
  roamTrans.x = viewRectCenter[0] - zoom * roamViewCenter[0];
  roamTrans.y = viewRectCenter[1] - zoom * roamViewCenter[1];
  roamTrans.scaleX = roamTrans.scaleY = zoom;
  // [VIEW_COORD_SYS_APPLY_ROAM_CENTER_AND_ZOOM]
  // Ordinarily, the definition is:
  //  roamTrans.originX = roamViewCenter[0];
  //  roamTrans.originY = roamViewCenter[1];
  //  roamTrans.x = viewRectCenter[0] - roamViewCenter[0];
  //  roamTrans.y = viewRectCenter[1] - roamViewCenter[1];
  //  roamTrans.scaleX = roamTrans.scaleY = zoom;
  // But `el.originX`/`originY` should not be set.
  // (see VIEW_COORD_SYS_ANIMATION_PROPS_CONSTRAINT for the reason),
  // so we use the above formula instead.
}
var tmpCenterURT = [];
/**
 * NOTICE: It depends on `viewCoordSysUpdateRoamTrans` and `viewCoordSysUpdateRawTrans`
 */
function viewCoordSysUpdateOverallTrans(viewInner) {
  var trans = viewInner.trans;
  var roamTrans = trans[VIEW_COORD_SYS_TRANS_ROAM];
  var rawTrans = trans[VIEW_COORD_SYS_TRANS_RAW];
  var overallTrans = trans[VIEW_COORD_SYS_TRANS_OVERALL];
  calcOverallTrans(overallTrans, rawTrans, roamTrans);
  var mtOverall = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableGetLocalTransform */ .Ed)(overallTrans, viewInner.mtOverall);
  var mtOverallInv = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.invert)(viewInner.mtOverallInv, mtOverall);
  legacyCopyOverallTrans(viewInner, overallTrans, mtOverall, mtOverallInv);
  legacyCopyOverallTrans(viewInner.lgGeo, overallTrans, mtOverall, mtOverallInv);
}
/**
 * [VIEW_COORD_SYS_TRANS_OVERALL_BACKWARD_COMPATIBILITY]
 *   VIEW_COORD_SYS_TRANS_OVERALL transformable has long been View or Geo instance itself.
 *   We keep backward compatibility, since some users may have visited it directly (e.g.
 *   for drawing a computed bounding rect).
 */
function legacyCopyOverallTrans(target, overallTrans, mtOverall, mtOverallInv) {
  if (target) {
    (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .copyTransform */ .IT)(target, overallTrans);
    (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.copy)(target.transform || (target.transform = []), mtOverall);
    (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.copy)(target.invTransform || (target.invTransform = []), mtOverallInv);
  }
}
function calcOverallTrans(out, rawTrans, roamTrans) {
  (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableGetLocalTransform */ .Ed)(rawTrans, tmpMtCOT1);
  (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableGetLocalTransform */ .Ed)(roamTrans, tmpMtCOT2);
  (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.mul)(tmpMtCOT2, tmpMtCOT2, tmpMtCOT1);
  (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.decomposeTransform)(out, tmpMtCOT2);
}
var tmpMtCOT1 = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
var tmpMtCOT2 = (0,zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_2__.create)();
function getCoordSys(finder) {
  var seriesModel = finder.seriesModel;
  return seriesModel ? seriesModel.coordinateSystem : null; // e.g., graph.
}
function viewCoordSysGetViewRectCenter(viewInner) {
  var viewRect = viewInner.viewRect;
  tmpViewRectCenter[0] = viewRect.x + viewRect.width / 2;
  tmpViewRectCenter[1] = viewRect.y + viewRect.height / 2;
  return tmpViewRectCenter;
}
var tmpViewRectCenter = [];
function isViewCoordSys(coordSys) {
  return coordSys && coordSys.type === 'view';
}
/**
 * NOTICE:
 *  - `syncBackEl` should be in the pixel space without any other transformation
 *    in its accesters, otherwise the roaming may incorrect.
 *  - `syncBackEl` can be a `Group`, having its own descendants and transformation.
 *    But in this case, `dataToPoint` can only reach the space of `syncBackEl` itself.
 */
function applyViewCoordSysTransToElement(syncBackEl, syncBackType, viewCoordSys,
// If NullUndefined, no animation.
// Typically, there should be no animation in the first render and in `__updateOnOwnRoam`.
animatableModel) {
  var viewInner = inner(viewCoordSys);
  viewInner.syncBackEl = syncBackEl;
  viewInner.syncBackType = syncBackType;
  if (!animatableModel) {
    viewCoordSysCopyTrans(syncBackEl, viewCoordSys, syncBackType);
    syncBackEl.dirty();
  } else {
    (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_6__/* .updateProps */ .oi)(syncBackEl, viewCoordSysCopyTrans(null, viewCoordSys, syncBackType), animatableModel);
  }
}
/**
 * FIXME: [FIXME_VIEW_COORD_SYS_SYNC_BACK]
 *  Currently the "sync back" is only performed on roam action. But these cases are not
 *  covered:
 *  1. Consider both center change and series data adding is requested via `setOption`
 *    and animation is not finished, the new added series symbols should lay out based
 *    on the "intermediate state" rather than the "final state" of the VIEW_COORD_SYS,
 *    otherwise, visual artifacts can arise.
 *  2. See the case of FIXME_SYMBOL_CLIP_CONSIDERING_COORD_SYS_ALIGNMENT_DURING_ANIMATION .
 */
function viewCoordSysSyncBack(viewCoordSys, hostModel, otherModelsToSync, payload) {
  var viewInner = inner(viewCoordSys);
  var syncBackEl = viewInner.syncBackEl;
  if (syncBackEl) {
    if (false) {}
    // @see VIEW_COORD_SYS_ANIMATION_INTERRUPTION
    syncBackEl.stopAnimation();
    // syncBackEl may have been changed regardless of animation,
    // therefore, need to sync back.
    calcOverallTransFromSyncBackEl(tmpTransSB1, viewInner, syncBackEl, viewInner.syncBackType);
  } else {
    (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .copyTransform */ .IT)(tmpTransSB1, viewInner.trans[VIEW_COORD_SYS_TRANS_OVERALL]);
  }
  // Sync back to model.
  calcRoamTransFromOverallTrans(tmpTransSB2, viewInner, tmpTransSB1);
  payload ? applyRoamPayloadToOverallTrans(tmpTransSB1, tmpTransSB2, viewInner, payload) : (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .copyTransform */ .IT)(tmpTransSB1, tmpTransSB2);
  calcRoamTransFromOverallTrans(tmpTransSB1, viewInner, tmpTransSB1);
  syncBackToRoamOptionFromRoamTrans(viewInner, hostModel, otherModelsToSync, tmpTransSB1);
}
var tmpTransSB1 = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableCreate */ .Rd)();
var tmpTransSB2 = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .transformableCreate */ .Rd)();
/**
 * Invert to `center` and `zoom` of VIEW_COORD_SYS and host models based on
 *  - `syncBackEl` or VIEW_COORD_SYS_TRANS_OVERALL
 *  - Delta in `payload`.
 *
 * Should be only called in action handlers.
 *
 * @see RoamHostView['__updateOnOwnRoam']
 */
function ownRoamModelCoordSysUpdateInAction(payload, hostModel,
// This is only used for MAP_SERIES_GROUP, where the change need to sync to all series,
// otherwise when legend filter some series and the other series take the responsibility
// to draw map, or roam then legend restored, the result will be incorrect.
otherModelsToSync) {
  // NOTE: VIEW_COORD_SYS instances are depended on by this action handler.
  // Under the current design, actions should not be triggered before `setOption`
  // being called, therefore coord sys instances always exist.
  var viewCoordSys = getOwnRoamViewCoordSys(hostModel);
  if (viewCoordSys) {
    // Sync back to model.
    viewCoordSysSyncBack(viewCoordSys, hostModel, otherModelsToSync, payload);
    // Recalculate from model.
    viewCoordSysSetRoamOptionFromModel(viewCoordSys, hostModel);
  }
}
function getOwnRoamViewCoordSys(hostModel) {
  return hostModel.__ownRoamView ? hostModel.__ownRoamView() : null;
}
function ownRoamViewUpdateDirectlyInAction(payload, componentOrSeries, ecModel, api) {
  // Tricky: disable animation in `updateProps` of `graphic.ts`.
  ecModel.setUpdatePayload((0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.payloadDisableAnimation)(payload));
  var componentOrSeriesView = (0,_core_ExtensionAPI_js__WEBPACK_IMPORTED_MODULE_7__/* .getViewOfComponentOrSeries */ .k)(api, componentOrSeries);
  if (componentOrSeriesView && componentOrSeriesView.__updateOnOwnRoam) {
    componentOrSeriesView.__updateOnOwnRoam(payload, componentOrSeries, api);
  }
}
function applyRoamPayloadToOverallTrans(targetOverallTrans, roamTrans, viewInner, payload) {
  // NOTE: payload.dx/dy should always applied to pixel space, i.e., "overallTrans".
  if (payload.dx != null && payload.dy != null) {
    targetOverallTrans.x += payload.dx;
    targetOverallTrans.y += payload.dy;
  }
  var deltaZoom = payload.zoom;
  if (deltaZoom != null) {
    // Although `zoomOption` is defined on roamTrans
    var oldZoom = getZoomFromRoamTrans(roamTrans);
    var newZoom = clampByZoomLimit(oldZoom * deltaZoom, viewInner.zoomLimit);
    var deltaZoom2 = newZoom / oldZoom;
    // Keep the mouse center when scaling.
    targetOverallTrans.x -= (payload.originX - targetOverallTrans.x) * (deltaZoom2 - 1);
    targetOverallTrans.y -= (payload.originY - targetOverallTrans.y) * (deltaZoom2 - 1);
    // Although `zoomOption` is defined on roamTrans,
    // deltaZoom can be applied to overallTrans directly.
    targetOverallTrans.scaleX *= deltaZoom2;
    targetOverallTrans.scaleY *= deltaZoom2;
  }
}
function getZoomFromRoamTrans(trans) {
  if (false) {}
  return trans.scaleX;
}
function parseCenterOption(
// `out` is a center in `dataRect` space.
out, viewInner, centerOption
// @return Whether a valid center is obtained.
) {
  if (false) {}
  var dataRect = viewInner.dataRect;
  if (!centerOption) {
    return false;
  }
  // #16904 introduced percentage string here, such as '33%'. But it was based on canvas
  // width/height, which is not reasonable - the unit may incorrect, and it is unpredictable if
  // the `ViewInner['dataRect']` is not calculated based on the current canvas rect. Therefore the percentage
  // value is changed to based on `ViewInner['dataRect'].width/height` since v6. Under this definition, users
  // can use '0%' to map the top-left of `ViewInner['dataRect']` to the center of `ViewInner['viewRect']`.
  var lgCt = viewInner.lgCt;
  if (lgCt) {
    (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.set)(out, (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .parsePercent */ .lo)(centerOption[0], lgCt.w), (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .parsePercent */ .lo)(centerOption[1], lgCt.h));
  } else if (dataRect) {
    (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.set)(out, (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .parsePercent */ .lo)(centerOption[0], dataRect.width, dataRect.x), (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .parsePercent */ .lo)(centerOption[1], dataRect.height, dataRect.y));
  }
  return true;
}
/**
 * An inverse operation to `parseCenterOption`.
 * Mainly for percentage center option.
 */
function invertBackToCenterOption(viewInner, center) {
  var lastCenterOption = viewInner.centerOption;
  var dataRect = viewInner.dataRect;
  if (false) {}
  return !lastCenterOption || viewInner.lgCt ? center.slice() : [invertToPercentPerCenterDim(0, center, lastCenterOption, dataRect), invertToPercentPerCenterDim(1, center, lastCenterOption, dataRect)];
}
function invertToPercentPerCenterDim(dimIdx, center, lastCenterOption, dataRect) {
  return lastCenterOption && dataRect && dataRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.WH[dimIdx]] && (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .isPositionSizeOptionPercent */ .N9)(lastCenterOption[dimIdx]) ? (center[dimIdx] - dataRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.XY[dimIdx]]) / dataRect[_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.WH[dimIdx]] * 100 + '%' : center[dimIdx];
}
function useLegacyViewCoordSysCenterBase(ecModel, api) {
  return api && ecModel && ecModel.getShallow('legacyViewCoordSysCenterBase') ? {
    w: api.getWidth(),
    h: api.getHeight()
  } : null;
}
/**
 * @see VIEW_COORD_SYS_ANIMATION_INTERRUPTION
 */
function syncBackToRoamOptionFromRoamTrans(viewInner, hostModel, otherModelsToSync, roamTrans) {
  // This is the inverse operation of `viewCoordSysSetRoamOptionFromModel`.
  var viewRectCenter = viewCoordSysGetViewRectCenter(viewInner);
  var zoom = getZoomFromRoamTrans(roamTrans);
  var notZoomNearZero = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_8__/* .mathAbs */ .NY)(zoom) > 1e-6;
  tmpCenterITR[0] = notZoomNearZero ? (viewRectCenter[0] - roamTrans.x) / zoom : viewRectCenter[0]; // Unlikely to occur.
  tmpCenterITR[1] = notZoomNearZero ? (viewRectCenter[1] - roamTrans.y) / zoom : viewRectCenter[1]; // Unlikely to occur.
  (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_3__.applyTransform)(tmpCenterITR, tmpCenterITR, viewInner.mtRawInv);
  var centerOption = invertBackToCenterOption(viewInner, tmpCenterITR);
  syncBackRoamOptionToRoamHostModel(hostModel, centerOption, zoom);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_9__.each)(otherModelsToSync, function (otherModel) {
    if (otherModel !== hostModel) {
      syncBackRoamOptionToRoamHostModel(otherModel, centerOption.slice(), zoom);
    }
  });
}
var tmpCenterITR = [];
/**
 * Models should be updated, otherwise consequent `setOption()` can cause outdated `center`
 * and `zoom` to be used.
 */
function syncBackRoamOptionToRoamHostModel(hostModel, center, zoom) {
  var option = hostModel.option;
  option.center = center;
  option.zoom = zoom;
}
function clampByZoomLimit(zoom, zoomLimit) {
  if (zoomLimit) {
    var zoomMin = zoomLimit.min || 0;
    var zoomMax = zoomLimit.max || Infinity;
    zoom = Math.max(Math.min(zoomMax, zoom), zoomMin);
  }
  return zoom;
}
function calcCompensationScaleToPreserveNodeSize(viewCoordSys, model) {
  var nodeScaleRatio = model.getShallow('nodeScaleRatio', true) || 1;
  var viewInner = inner(viewCoordSys);
  // Scale node when zoom changes
  return ((viewInner.zoom - 1) * nodeScaleRatio + 1) / (viewInner.trans[VIEW_COORD_SYS_TRANS_OVERALL].scaleX || 1);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);

/***/ }),

/***/ 56664:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95615);

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


var defaultOption = {
  show: true,
  // zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: false,
  // Axis name displayed.
  name: '',
  // 'start' | 'middle' | 'end'
  nameLocation: 'end',
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: '...',
    placeholder: '.'
  },
  // Use global text style by default.
  nameTextStyle: {
    // textMargin: never, // The default value will be specified based on `nameLocation`.
  },
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: false,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: false,
  tooltip: {
    show: false
  },
  axisPointer: {},
  axisLine: {
    show: true,
    onZero: 'auto',
    onZeroAxisIndex: null,
    lineStyle: {
      color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.axisLine,
      width: 1,
      type: 'solid'
    },
    // The arrow at both ends the the axis.
    symbol: ['none', 'none'],
    symbolSize: [10, 15],
    breakLine: true
  },
  axisTick: {
    show: true,
    // Whether axisTick is inside the grid or outside the grid.
    inside: false,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: false,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12,
    color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.axisLabel,
    // In scenarios like axis labels, when labels text's progression direction matches the label
    // layout direction (e.g., when all letters are in a single line), extra start/end margin is
    // needed to prevent the text from appearing visually joined. In the other case, when lables
    // are stacked (e.g., having rotation or horizontal labels on yAxis), the layout needs to be
    // compact, so NO extra top/bottom margin should be applied.
    textMargin: [0, 3]
  },
  splitLine: {
    show: true,
    showMinLine: true,
    showMaxLine: true,
    lineStyle: {
      color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.axisSplitLine,
      width: 1,
      type: 'solid'
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: [_visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.backgroundTint, _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.backgroundTransparent]
    }
  },
  breakArea: {
    show: true,
    itemStyle: {
      color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.neutral00,
      // Break border color should be darker than the splitLine
      // because it has opacity and should be more prominent
      borderColor: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.border,
      borderWidth: 1,
      borderType: [3, 3],
      opacity: 0.6
    },
    zigzagAmplitude: 4,
    zigzagMinSpan: 4,
    zigzagMaxSpan: 20,
    zigzagZ: 100,
    expandOnClick: true
  },
  breakLabelLayout: {
    moveOverlap: 'auto'
  }
};
var categoryAxis = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: true,
  // Set false to faster category collection.
  deduplication: null,
  jitter: 0,
  jitterOverlap: true,
  jitterMargin: 2,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: false
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: false,
    interval: 'auto',
    show: 'auto'
  },
  axisLabel: {
    interval: 'auto'
  }
}, defaultOption);
var valueAxis = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge({
  boundaryGap: [0, 0],
  axisLine: {
    // Not shown when other axis is categoryAxis in cartesian
    show: 'auto'
  },
  axisTick: {
    // Not shown when other axis is categoryAxis in cartesian
    show: 'auto'
  },
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  splitNumber: 5,
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: false,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Length of minor tick
    length: 3,
    // Line style
    lineStyle: {
      // Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: false,
    lineStyle: {
      color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.axisMinorSplitLine,
      width: 1
    }
  }
}, defaultOption);
var timeAxis = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge({
  splitNumber: 6,
  axisLabel: {
    // The default value of TimeScale is determined in `AxisBuilder`
    // showMinLabel: false,
    // showMaxLabel: false,
    rich: {
      primary: {
        fontWeight: 'bold'
      }
    }
  },
  splitLine: {
    show: false
  }
}, valueAxis);
var logAxis = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults({
  logBase: 10
}, valueAxis);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  category: categoryAxis,
  value: valueAxis,
  time: timeAxis,
  log: logAxis
});

/***/ }),

/***/ 59160:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _Axis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13943);

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


var ParallelAxis = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(ParallelAxis, _super);
  function ParallelAxis(dim, scale, coordExtent, axisType, axisIndex) {
    var _this = _super.call(this, dim, scale, coordExtent) || this;
    _this.type = axisType || 'value';
    _this.axisIndex = axisIndex;
    return _this;
  }
  ParallelAxis.prototype.isHorizontal = function () {
    return this.coordinateSystem.getModel().get('layout') !== 'horizontal';
  };
  return ParallelAxis;
}(_Axis_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParallelAxis);

/***/ }),

/***/ 60560:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ fixDiaoyuIsland)
/* harmony export */ });

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
// Fix for 钓鱼岛
// let Region = require('../Region');
// let zrUtil = require('zrender/lib/core/util');
// let geoCoord = [126, 25];
var points = [[[123.45165252685547, 25.73527164402261], [123.49731445312499, 25.73527164402261], [123.49731445312499, 25.750734064600884], [123.45165252685547, 25.750734064600884], [123.45165252685547, 25.73527164402261]]];
function fixDiaoyuIsland(mapType, region) {
  if (mapType === 'china' && region.name === '台湾') {
    region.geometries.push({
      type: 'polygon',
      exterior: points[0]
    });
  }
}

/***/ }),

/***/ 60818:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $h: () => (/* binding */ buildAllMapSeriesGroups),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   DF: () => (/* binding */ getMainMapSeries),
/* harmony export */   O4: () => (/* binding */ SERIES_TYPE_MAP),
/* harmony export */   PI: () => (/* binding */ mapSeriesNeedsDrawMap),
/* harmony export */   sL: () => (/* binding */ mapSeriesGroupHasOwnGeo)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _helper_createSeriesDataSimply_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45897);
/* harmony import */ var _model_Series_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(85539);
/* harmony import */ var _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(67023);
/* harmony import */ var _data_helper_sourceHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2199);
/* harmony import */ var _component_tooltip_tooltipMarkup_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3079);
/* harmony import */ var _util_symbol_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22469);
/* harmony import */ var _core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18807);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(95615);

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










var SERIES_TYPE_MAP = 'map';
var MapSeries = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(MapSeries, _super);
  function MapSeries() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = MapSeries.type;
    _this.getTooltipPosition = function (dataIndex) {
      if (dataIndex != null) {
        var name_1 = this.getData().getName(dataIndex);
        var geo = this.coordinateSystem;
        var region = geo.getRegion(name_1);
        return region && geo.dataToPoint(region.getCenter());
      }
    };
    return _this;
  }
  MapSeries.prototype.getInitialData = function (option) {
    var data = (0,_helper_createSeriesDataSimply_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, {
      coordDimensions: ['value'],
      encodeDefaulter: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.curry(_data_helper_sourceHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .makeSeriesEncodeForNameBased */ .ln, this)
    });
    var dataNameIndexMap = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.createHashMap();
    var toAppendItems = [];
    for (var i = 0, len = data.count(); i < len; i++) {
      var name_2 = data.getName(i);
      dataNameIndexMap.set(name_2, i);
    }
    var geoSource = _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.load(this.getMapType(), this.option.nameMap, this.option.nameProperty);
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each(geoSource.regions, function (region) {
      var name = region.name;
      var dataNameIdx = dataNameIndexMap.get(name);
      // apply specified echarts style in GeoJSON data
      var specifiedGeoJSONRegionStyle = region.properties && region.properties.echartsStyle;
      var dataItem;
      if (dataNameIdx == null) {
        dataItem = {
          name: name
        };
        toAppendItems.push(dataItem);
      } else {
        dataItem = data.getRawDataItem(dataNameIdx);
      }
      specifiedGeoJSONRegionStyle && zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.merge(dataItem, specifiedGeoJSONRegionStyle);
    });
    // Complete data with missing regions. The consequent processes (like visual
    // map and render) can not be performed without a "full data". For example,
    // find `dataIndex` by name.
    data.appendData(toAppendItems);
    return data;
  };
  /**
   * If no host geo model, return null, which means using a
   * inner exclusive geo model.
   */
  MapSeries.prototype.getHostGeoModel = function () {
    if ((0,_core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_5__/* .decideCoordSysUsageKind */ .kP)(this).kind === _core_CoordinateSystem_js__WEBPACK_IMPORTED_MODULE_5__/* .COORD_SYS_USAGE_KIND_BOX */ .bX) {
      // Always use an internal geo if specify as `COORD_SYS_USAGE_KIND_BOX`.
      // Notice that currently we do not support laying out a geo based on
      // another geo, but preserve the possibility.
      return;
    }
    return this.getReferringComponents('geo', {
      useDefault: false,
      enableAll: false,
      enableNone: false
    }).models[0];
  };
  MapSeries.prototype.getMapType = function () {
    return (this.getHostGeoModel() || this).option.map;
  };
  // _fillOption(option, mapName) {
  // Shallow clone
  // option = zrUtil.extend({}, option);
  // option.data = geoCreator.getFilledRegions(option.data, mapName, option.nameMap);
  // return option;
  // }
  MapSeries.prototype.getRawValue = function (dataIndex) {
    // Use value stored in data instead because it is calculated from multiple series
    // FIXME Provide all value of multiple series ?
    var data = this.getData();
    return data.get(data.mapDimension('value'), dataIndex);
  };
  /**
   * Get model of region
   */
  MapSeries.prototype.getRegionModel = function (regionName) {
    var data = this.getData();
    return data.getItemModel(data.indexOfName(regionName));
  };
  /**
   * Map tooltip formatter
   */
  MapSeries.prototype.formatTooltip = function (dataIndex, multipleSeries, dataType) {
    // FIXME originalData and data is a bit confusing
    var data = this.getData();
    var value = this.getRawValue(dataIndex);
    var name = data.getName(dataIndex);
    var seriesNames = [];
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.each(this.seriesGroup.f, function (mapSeries) {
      var otherIndex = mapSeries.originalData.indexOfName(name);
      var valueDim = data.mapDimension('value');
      if (!isNaN(mapSeries.originalData.get(valueDim, otherIndex))) {
        seriesNames.push(mapSeries.name);
      }
    });
    return (0,_component_tooltip_tooltipMarkup_js__WEBPACK_IMPORTED_MODULE_6__/* .createTooltipMarkup */ .Qx)('section', {
      header: seriesNames.join(', '),
      noHeader: !seriesNames.length,
      blocks: [(0,_component_tooltip_tooltipMarkup_js__WEBPACK_IMPORTED_MODULE_6__/* .createTooltipMarkup */ .Qx)('nameValue', {
        name: name,
        value: value
      })]
    });
  };
  MapSeries.prototype.getLegendIcon = function (opt) {
    var iconType = opt.icon || 'roundRect';
    var icon = (0,_util_symbol_js__WEBPACK_IMPORTED_MODULE_7__/* .createSymbol */ .v5)(iconType, 0, 0, opt.itemWidth, opt.itemHeight, opt.itemStyle.fill);
    icon.setStyle(opt.itemStyle);
    // Map do not use itemStyle.borderWidth as border width
    icon.style.stroke = 'none';
    // No rotation because no series visual symbol for map
    if (iconType.indexOf('empty') > -1) {
      icon.style.stroke = icon.style.fill;
      icon.style.fill = _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.neutral00;
      icon.style.lineWidth = 2;
    }
    return icon;
  };
  MapSeries.prototype.__ownRoamView = function () {
    return mapSeriesNeedsDrawMap(this) ? this.coordinateSystem.view : null;
  };
  MapSeries.type = 'series.' + SERIES_TYPE_MAP;
  MapSeries.dependencies = ['geo'];
  MapSeries.layoutMode = 'box';
  MapSeries.defaultOption = {
    // 一级层叠
    // zlevel: 0,
    // 二级层叠
    z: 2,
    coordinateSystem: 'geo',
    // map should be explicitly specified since ec3.
    map: '',
    // If `geoIndex` is not specified, a exclusive geo will be
    // created. Otherwise use the specified geo component, and
    // `map` and `mapType` are ignored.
    // geoIndex: 0,
    // 'center' | 'left' | 'right' | 'x%' | {number}
    left: 'center',
    // 'center' | 'top' | 'bottom' | 'x%' | {number}
    top: 'center',
    // right
    // bottom
    // width:
    // height
    // Aspect is width / height. Inited to be geoJson bbox aspect
    // This parameter is used for scale this aspect
    // Default value:
    // for geoSVG source: 1,
    // for geoJSON source: 0.75.
    aspectScale: null,
    // Layout with center and size
    // If you want to put map in a fixed size box with right aspect ratio
    // This two properties may be more convenient.
    // layoutCenter: [50%, 50%]
    // layoutSize: 100
    showLegendSymbol: true,
    // Define left-top, right-bottom coords to control view
    // For example, [ [180, 90], [-180, -90] ],
    // higher priority than center and zoom
    boundingCoords: null,
    // Default on center of map
    center: null,
    zoom: 1,
    scaleLimit: null,
    selectedMode: true,
    label: {
      show: false,
      color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.tertiary
    },
    // scaleLimit: null,
    itemStyle: {
      borderWidth: 0.5,
      borderColor: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.border,
      areaColor: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.background
    },
    emphasis: {
      label: {
        show: true,
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.primary
      },
      itemStyle: {
        areaColor: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.highlight
      }
    },
    select: {
      label: {
        show: true,
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.primary
      },
      itemStyle: {
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A.color.highlight
      }
    },
    nameProperty: 'name'
  };
  return MapSeries;
}(_model_Series_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A);
/**
 * Has exclusive geo, rahter than depends on a separate geo componet.
 */
function mapSeriesGroupHasOwnGeo(groupKey) {
  return groupKey.indexOf('i') === 0;
}
function mapSeriesNeedsDrawMap(mapSeries) {
  // Within a MAP_SERIES_GROUP, only `mainSeries` has `needsDrawMap: true`.
  return getMainMapSeries(mapSeries.seriesGroup) === mapSeries && !mapSeries.getHostGeoModel();
}
function getMainMapSeries(mapSeriesGroup) {
  // The first series after filtering in a MAP_SERIES_GROUP.
  return mapSeriesGroup.f[0];
}
/**
 * @tutorial [MAP_SERIES_GROUP]
 *  - For map series that reference external geo components (typically via `geoIndex` or `geoId` in ec option),
 *    a map series group is all map series that reference to the same geo component.
 *  - For other map series,
 *    a map series group is all map series that use the same `map` in ec option.
 *  NOTICE: series filtering (typically by legend) matters:
 *   If this method is executed before series filtering, all series are included,
 *   otherwise, series filtered out are excluded.
 *   When legend disables the original first series, the original second series takes the responsibility
 *   to render map (via its `MapDraw`).
 */
function buildAllMapSeriesGroups(ecModel, beforeSeriesFiltering) {
  var allMapSeriesGroups = {};
  ecModel.eachRawSeriesByType(SERIES_TYPE_MAP, function (seriesModel) {
    var hostGeoModel = seriesModel.getHostGeoModel();
    var key = hostGeoModel ? 'o' + hostGeoModel.id : 'i' + seriesModel.getMapType();
    var group = allMapSeriesGroups[key] = allMapSeriesGroups[key] || {
      f: [],
      r: []
    };
    if (!ecModel.isSeriesFiltered(seriesModel) && !beforeSeriesFiltering) {
      group.f.push(seriesModel);
    }
    group.r.push(seriesModel);
  });
  return allMapSeriesGroups;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapSeries);

/***/ }),

/***/ 64579:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ GeoJSONResource)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _parseGeoJson_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87706);
/* harmony import */ var _fix_nanhai_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(81837);
/* harmony import */ var _fix_textCoord_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71576);
/* harmony import */ var _fix_diaoyuIsland_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(60560);
/* harmony import */ var zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30582);

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


// Built-in GEO fixer.




var DEFAULT_NAME_PROPERTY = 'name';
var GeoJSONResource = /** @class */function () {
  function GeoJSONResource(mapName, geoJSON, specialAreas) {
    this.type = 'geoJSON';
    this._parsedMap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
    this._mapName = mapName;
    this._specialAreas = specialAreas;
    // PENDING: delay the parse to the first usage to rapid up the FMP?
    this._geoJSON = parseInput(geoJSON);
  }
  /**
   * @param nameMap can be null/undefined
   * @param nameProperty can be null/undefined
   */
  GeoJSONResource.prototype.load = function (nameMap, nameProperty) {
    nameProperty = nameProperty || DEFAULT_NAME_PROPERTY;
    var parsed = this._parsedMap.get(nameProperty);
    if (!parsed) {
      var rawRegions = this._parseToRegions(nameProperty);
      parsed = this._parsedMap.set(nameProperty, {
        regions: rawRegions,
        boundingRect: calculateBoundingRect(rawRegions)
      });
    }
    var regionsMap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
    var finalRegions = [];
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(parsed.regions, function (region) {
      var regionName = region.name;
      // Try use the alias in geoNameMap
      if (nameMap && (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(nameMap, regionName)) {
        region = region.cloneShallow(regionName = nameMap[regionName]);
      }
      finalRegions.push(region);
      regionsMap.set(regionName, region);
    });
    return {
      regions: finalRegions,
      boundingRect: parsed.boundingRect || new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay(0, 0, 0, 0),
      regionsMap: regionsMap
    };
  };
  GeoJSONResource.prototype._parseToRegions = function (nameProperty) {
    var mapName = this._mapName;
    var geoJSON = this._geoJSON;
    var rawRegions;
    // https://jsperf.com/try-catch-performance-overhead
    try {
      rawRegions = geoJSON ? (0,_parseGeoJson_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(geoJSON, nameProperty) : [];
    } catch (e) {
      throw new Error('Invalid geoJson format\n' + e.message);
    }
    (0,_fix_nanhai_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(mapName, rawRegions);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(rawRegions, function (region) {
      var regionName = region.name;
      (0,_fix_textCoord_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(mapName, region);
      (0,_fix_diaoyuIsland_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(mapName, region);
      // Some area like Alaska in USA map needs to be tansformed
      // to look better
      var specialArea = this._specialAreas && this._specialAreas[regionName];
      if (specialArea) {
        region.transformTo(specialArea.left, specialArea.top, specialArea.width, specialArea.height);
      }
    }, this);
    return rawRegions;
  };
  /**
   * Only for exporting to users.
   * **MUST NOT** used internally.
   */
  GeoJSONResource.prototype.getMapForUser = function () {
    return {
      // For backward compatibility, use geoJson
      // PENDING: it has been returning them without clone.
      // do we need to avoid outsite modification?
      geoJson: this._geoJSON,
      geoJSON: this._geoJSON,
      specialAreas: this._specialAreas
    };
  };
  return GeoJSONResource;
}();

function calculateBoundingRect(regions) {
  var rect;
  for (var i = 0; i < regions.length; i++) {
    var regionRect = regions[i].getBoundingRect();
    rect = rect || regionRect.clone();
    rect.union(regionRect);
  }
  return rect;
}
function parseInput(source) {
  return !(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isString)(source) ? source : typeof JSON !== 'undefined' && JSON.parse ? JSON.parse(source) : new Function('return (' + source + ');')();
}

/***/ }),

/***/ 64900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_Eventful_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(34463);
/* harmony import */ var zrender_lib_core_event_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52812);
/* harmony import */ var _interactionMutex_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34906);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11138);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88367);
/* harmony import */ var _cursorHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5215);

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








;
/**
 * An manager of zoom and pan(darg) hehavior.
 * But it is not responsible for updating the view, since view updates vary and can
 * not be handled in a uniform way.
 *
 * Note: regarding view updates:
 *  - Transformabe views typically use `coord/View` (e.g., geo and series.graph roaming).
 *    Some commonly used view update logic has been organized into `roamHelper.ts`.
 *  - Non-transformable views handle updates themselves, possibly involving re-layout,
 *    (e.g., treemap).
 *  - Some scenarios do not require transformation (e.g., dataZoom roaming for cartesian,
 *    brush component).
 */
var RoamController = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(RoamController, _super);
  function RoamController(zr) {
    var _this = _super.call(this) || this;
    _this._zr = zr;
    // Avoid two roamController bind the same handler
    var mousedownHandler = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.bind)(_this._mousedownHandler, _this);
    var mousemoveHandler = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.bind)(_this._mousemoveHandler, _this);
    var mouseupHandler = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.bind)(_this._mouseupHandler, _this);
    var mousewheelHandler = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.bind)(_this._mousewheelHandler, _this);
    var pinchHandler = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.bind)(_this._pinchHandler, _this);
    /**
     * Notice:
     *  - only enable needed types. For example, if 'zoom'
     *    is not needed, 'zoom' should not be enabled, otherwise
     *    default mousewheel behaviour (scroll page) will be disabled.
     *  - This method is idempotent.
     */
    _this.enable = function (controlType, rawOpt) {
      var zInfo = rawOpt.zInfo;
      var _a = (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_2__.retrieveZInfo)(zInfo.component),
        z = _a.z,
        zlevel = _a.zlevel;
      var zInfoParsed = {
        component: zInfo.component,
        z: z,
        zlevel: zlevel,
        // By default roam controller is the lowest z2 comparing to other elememts in a component.
        z2: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.retrieve2)(zInfo.z2, -Infinity)
      };
      var triggerInfo = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)({}, rawOpt.triggerInfo);
      this._opt = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults)((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)({}, rawOpt), {
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        // By default, wheel do not trigger move.
        moveOnMouseWheel: false,
        preventDefaultMouseMove: true,
        zInfoParsed: zInfoParsed,
        triggerInfo: triggerInfo,
        cursorGrab: 'grab',
        cursorGrabbing: 'grabbing'
      });
      if (controlType == null) {
        controlType = true;
      }
      // A quick optimization for repeatedly calling `enable` during roaming.
      // Assert `disable` is only affected by `controlType`.
      if (!this._enabled || this._controlType !== controlType) {
        // Disable previous first
        this.disable();
        this._enabled = true;
        if (controlType === true || controlType === 'move' || controlType === 'pan') {
          addRoamZrListener(zr, 'mousedown', mousedownHandler, zInfoParsed);
          addRoamZrListener(zr, 'mousemove', mousemoveHandler, zInfoParsed);
          addRoamZrListener(zr, 'mouseup', mouseupHandler, zInfoParsed);
        }
        if (controlType === true || controlType === 'scale' || controlType === 'zoom') {
          addRoamZrListener(zr, 'mousewheel', mousewheelHandler, zInfoParsed);
          addRoamZrListener(zr, 'pinch', pinchHandler, zInfoParsed);
        }
      }
    };
    _this.disable = function () {
      if (this._enabled) {
        this._enabled = false;
        removeRoamZrListener(zr, 'mousedown', mousedownHandler);
        removeRoamZrListener(zr, 'mousemove', mousemoveHandler);
        removeRoamZrListener(zr, 'mouseup', mouseupHandler);
        removeRoamZrListener(zr, 'mousewheel', mousewheelHandler);
        removeRoamZrListener(zr, 'pinch', pinchHandler);
      }
    };
    return _this;
  }
  RoamController.prototype.isDragging = function () {
    return this._dragging;
  };
  RoamController.prototype.isPinching = function () {
    return this._pinching;
  };
  RoamController.prototype._checkPointer = function (e, x, y) {
    var opt = this._opt;
    var zInfoParsed = opt.zInfoParsed;
    if ((0,_cursorHelper_js__WEBPACK_IMPORTED_MODULE_3__/* .onIrrelevantElement */ .I)(e, opt.api, zInfoParsed.component)) {
      return false;
    }
    ;
    var triggerInfo = opt.triggerInfo;
    var roamTrigger = triggerInfo.roamTrigger;
    var inArea = false;
    if (roamTrigger === 'global') {
      inArea = true;
    }
    if (!inArea) {
      inArea = triggerInfo.isInSelf(e, x, y);
    }
    if (inArea && triggerInfo.isInClip && !triggerInfo.isInClip(e, x, y)) {
      inArea = false;
    }
    return inArea;
  };
  RoamController.prototype._decideCursorStyle = function (e, x, y, forReverse) {
    // If this cursor style decision is not strictly consistent with zrender,
    // it's fine - zr will set the cursor on the next mousemove.
    // This `grab` cursor style should take the lowest precedence. If the hovring element already
    // have a cursor, zrender will set it to be non-'default' before entering this handler.
    // (note, e.target is never silent, e.topTarget can be silent be irrelevant.)
    var target = e.target;
    if (!target && this._checkPointer(e, x, y)) {
      // To indicate users that this area is draggable, otherwise users probably cannot kwown
      // that when hovering out of the shape but still inside the bounding rect.
      return this._opt.cursorGrab;
    }
    if (forReverse) {
      return target && target.cursor || 'default';
    }
  };
  RoamController.prototype.dispose = function () {
    this.disable();
  };
  RoamController.prototype._mousedownHandler = function (e) {
    if (zrender_lib_core_event_js__WEBPACK_IMPORTED_MODULE_4__/* .isMiddleOrRightButtonOnMouseUpDown */ .W5(e) || eventConsumed(e)) {
      return;
    }
    var el = e.target;
    while (el) {
      if (el.draggable) {
        return;
      }
      // check if host is draggable
      el = el.__hostTarget || el.parent;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    // To determine dragging start, only by checking on mosedown, but not mousemove.
    // Mouse can be out of target when mouse moving.
    if (this._checkPointer(e, x, y)) {
      this._x = x;
      this._y = y;
      this._dragging = true;
    }
  };
  RoamController.prototype._mousemoveHandler = function (e) {
    var zr = this._zr;
    if (e.gestureEvent === 'pinch' || _interactionMutex_js__WEBPACK_IMPORTED_MODULE_5__/* .isTaken */ .Ck(zr, 'globalPan') || eventConsumed(e)) {
      return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    if (!this._dragging || !isAvailableBehavior('moveOnMouseMove', e, this._opt)) {
      var cursorStyle = this._decideCursorStyle(e, x, y, false);
      if (cursorStyle) {
        zr.setCursorStyle(cursorStyle);
      }
      return;
    }
    zr.setCursorStyle(this._opt.cursorGrabbing);
    var oldX = this._x;
    var oldY = this._y;
    var dx = x - oldX;
    var dy = y - oldY;
    this._x = x;
    this._y = y;
    if (this._opt.preventDefaultMouseMove) {
      zrender_lib_core_event_js__WEBPACK_IMPORTED_MODULE_4__/* .stop */ .ds(e.event);
    }
    e.__ecRoamConsumed = true;
    trigger(this, 'pan', 'moveOnMouseMove', e, {
      dx: dx,
      dy: dy,
      oldX: oldX,
      oldY: oldY,
      newX: x,
      newY: y,
      isAvailableBehavior: null
    });
  };
  RoamController.prototype._mouseupHandler = function (e) {
    if (eventConsumed(e)) {
      return;
    }
    var zr = this._zr;
    if (!zrender_lib_core_event_js__WEBPACK_IMPORTED_MODULE_4__/* .isMiddleOrRightButtonOnMouseUpDown */ .W5(e)) {
      this._dragging = false;
      var cursorStyle = this._decideCursorStyle(e, e.offsetX, e.offsetY, true);
      if (cursorStyle) {
        zr.setCursorStyle(cursorStyle);
      }
    }
  };
  RoamController.prototype._mousewheelHandler = function (e) {
    if (eventConsumed(e)) {
      return;
    }
    var shouldZoom = isAvailableBehavior('zoomOnMouseWheel', e, this._opt);
    var shouldMove = isAvailableBehavior('moveOnMouseWheel', e, this._opt);
    var wheelDelta = e.wheelDelta;
    var absWheelDeltaDelta = Math.abs(wheelDelta);
    var originX = e.offsetX;
    var originY = e.offsetY;
    // wheelDelta maybe -0 in chrome mac.
    if (wheelDelta === 0 || !shouldZoom && !shouldMove) {
      return;
    }
    // If both `shouldZoom` and `shouldMove` is true, trigger
    // their event both, and the final behavior is determined
    // by event listener themselves.
    if (shouldZoom) {
      // Convenience:
      // Mac and VM Windows on Mac: scroll up: zoom out.
      // Windows: scroll up: zoom in.
      // FIXME: Should do more test in different environment.
      // wheelDelta is too complicated in difference nvironment
      // (https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel),
      // although it has been normallized by zrender.
      // wheelDelta of mouse wheel is bigger than touch pad.
      var factor = absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1;
      var scale = wheelDelta > 0 ? factor : 1 / factor;
      this._checkTriggerMoveZoom(this, 'zoom', 'zoomOnMouseWheel', e, {
        scale: scale,
        originX: originX,
        originY: originY,
        isAvailableBehavior: null
      });
    }
    if (shouldMove) {
      // FIXME: Should do more test in different environment.
      var absDelta = Math.abs(wheelDelta);
      // wheelDelta of mouse wheel is bigger than touch pad.
      var scrollDelta = (wheelDelta > 0 ? 1 : -1) * (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05);
      this._checkTriggerMoveZoom(this, 'scrollMove', 'moveOnMouseWheel', e, {
        scrollDelta: scrollDelta,
        originX: originX,
        originY: originY,
        isAvailableBehavior: null
      });
    }
  };
  RoamController.prototype._pinchHandler = function (e) {
    if (_interactionMutex_js__WEBPACK_IMPORTED_MODULE_5__/* .isTaken */ .Ck(this._zr, 'globalPan') || eventConsumed(e)) {
      return;
    }
    var scale = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
    this._checkTriggerMoveZoom(this, 'zoom', null, e, {
      scale: scale,
      originX: e.pinchX,
      originY: e.pinchY,
      isAvailableBehavior: null
    });
  };
  RoamController.prototype._checkTriggerMoveZoom = function (controller, eventName, behaviorToCheck, e, contollerEvent) {
    if (controller._checkPointer(e, contollerEvent.originX, contollerEvent.originY)) {
      // When mouse is out of roamController rect,
      // default befavoius should not be be disabled, otherwise
      // page sliding is disabled, contrary to expectation.
      zrender_lib_core_event_js__WEBPACK_IMPORTED_MODULE_4__/* .stop */ .ds(e.event);
      e.__ecRoamConsumed = true;
      trigger(controller, eventName, behaviorToCheck, e, contollerEvent);
    }
  };
  return RoamController;
}(zrender_lib_core_Eventful_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A);
function eventConsumed(e) {
  return e.__ecRoamConsumed;
}
var innerZrStore = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_7__/* .makeInner */ .$r)();
function ensureZrStore(zr) {
  var store = innerZrStore(zr);
  store.roam = store.roam || {};
  store.uniform = store.uniform || {};
  return store;
}
/**
 * Listeners are sorted by z2/z/zlevel in descending order.
 * This decides the precedence between different roam controllers if they are overlapped.
 *
 * [MEMO]: It's not easy to perfectly reconcile the conflicts caused by overlap.
 *  - Consider cases:
 *    - Multiple roam controllers overlapped.
 *      - Usually only the topmost can trigger roam.
 *    - Roam controllers overlap with other zr elements:
 *      - zr elements are relevant or irrelevent to the host of the roam controller. e.g., axis split line
 *        or series elements is relevant to a cartesian and should trigger roam.
 *      - zr elements is above or below the roam controller host, which affects the precedence of interaction.
 *      - zr elements may not silent only for triggering tooltip by hovering, which is available to roam;
 *        or may not silent for click, where roam is not preferable.
 *  - Approach - `addRoamZrListener+pointerChecker+onIrrelevantElement` (currently used):
 *    - Resolve the precedence between different roam controllers
 *    - But cannot prevent the handling on other zr elements that under the roam controller in z-order.
 *  - Approach - "use an invisible zr elements to receive the zr events to trigger roam":
 *    - More complicated in impl.
 *    - May cause bad cases where zr event cannot be receive due to other non-silient zr elements covering it.
 */
function addRoamZrListener(zr, eventType, listener, zInfoParsed) {
  var store = ensureZrStore(zr);
  var roam = store.roam;
  var listenerList = roam[eventType] = roam[eventType] || [];
  var idx = 0;
  for (; idx < listenerList.length; idx++) {
    var currZInfo = listenerList[idx].zInfoParsed;
    if ((currZInfo.zlevel - zInfoParsed.zlevel || currZInfo.z - zInfoParsed.z || currZInfo.z2 - zInfoParsed.z2
    // If all equals, the latter added one has a higher precedence.
    ) <= 0) {
      break;
    }
  }
  listenerList.splice(idx, 0, {
    listener: listener,
    zInfoParsed: zInfoParsed
  });
  ensureUniformListener(zr, eventType);
}
function removeRoamZrListener(zr, eventType, listener) {
  var store = ensureZrStore(zr);
  var listenerList = store.roam[eventType] || [];
  for (var idx = 0; idx < listenerList.length; idx++) {
    if (listenerList[idx].listener === listener) {
      listenerList.splice(idx, 1);
      if (!listenerList.length) {
        removeUniformListener(zr, eventType);
      }
      return;
    }
  }
}
function ensureUniformListener(zr, eventType) {
  var store = ensureZrStore(zr);
  if (!store.uniform[eventType]) {
    zr.on(eventType, store.uniform[eventType] = function (event) {
      var listenerList = store.roam[eventType];
      if (listenerList) {
        for (var i = 0; i < listenerList.length; i++) {
          listenerList[i].listener(event);
        }
      }
    });
  }
}
function removeUniformListener(zr, eventType) {
  var store = ensureZrStore(zr);
  var uniform = store.uniform;
  if (uniform[eventType]) {
    zr.off(eventType, uniform[eventType]);
    uniform[eventType] = null;
  }
}
function trigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  // Also provide behavior checker for event listener, for some case that
  // multiple components share one listener.
  contollerEvent.isAvailableBehavior = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.bind)(isAvailableBehavior, null, behaviorToCheck, e);
  // TODO should not have type issue.
  controller.trigger(eventName, contollerEvent);
}
// settings: {
//     zoomOnMouseWheel
//     moveOnMouseMove
//     moveOnMouseWheel
// }
// The value can be: true / false / 'shift' / 'ctrl' / 'alt'.
function isAvailableBehavior(behaviorToCheck, e, settings) {
  var setting = settings[behaviorToCheck];
  return !behaviorToCheck || setting && (!(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isString)(setting) || e.event[setting + 'Key']);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RoamController);

/***/ }),

/***/ 66928:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ getDefaultInterpolatedLabel),
/* harmony export */   i: () => (/* binding */ getDefaultLabel)
/* harmony export */ });
/* harmony import */ var _data_helper_dataProvider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16351);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);

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
 * @return label string. Not null/undefined
 */
function getDefaultLabel(data, dataIndex) {
  var labelDims = data.mapDimensionsAll('defaultedLabel');
  var len = labelDims.length;
  // Simple optimization (in lots of cases, label dims length is 1)
  if (len === 1) {
    var rawVal = (0,_data_helper_dataProvider_js__WEBPACK_IMPORTED_MODULE_0__/* .retrieveRawValue */ .QE)(data, dataIndex, labelDims[0]);
    return rawVal != null ? rawVal + '' : null;
  } else if (len) {
    var vals = [];
    for (var i = 0; i < labelDims.length; i++) {
      vals.push((0,_data_helper_dataProvider_js__WEBPACK_IMPORTED_MODULE_0__/* .retrieveRawValue */ .QE)(data, dataIndex, labelDims[i]));
    }
    return vals.join(' ');
  }
}
function getDefaultInterpolatedLabel(data, interpolatedValue) {
  var labelDims = data.mapDimensionsAll('defaultedLabel');
  if (!(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(interpolatedValue)) {
    return interpolatedValue + '';
  }
  var vals = [];
  for (var i = 0; i < labelDims.length; i++) {
    var dimIndex = data.getDimensionIndex(labelDims[i]);
    if (dimIndex >= 0) {
      vals.push(interpolatedValue[dimIndex]);
    }
  }
  return vals.join(' ');
}

/***/ }),

/***/ 67023:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _GeoSVGResource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86361);
/* harmony import */ var _GeoJSONResource_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64579);

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



var storage = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Compatible with previous `echarts.registerMap`.
   *
   * @usage
   * ```js
   *
   * echarts.registerMap('USA', geoJson, specialAreas);
   *
   * echarts.registerMap('USA', {
   *     geoJson: geoJson,
   *     specialAreas: {...}
   * });
   * echarts.registerMap('USA', {
   *     geoJSON: geoJson,
   *     specialAreas: {...}
   * });
   *
   * echarts.registerMap('airport', {
   *     svg: svg
   * }
   * ```
   *
   * Note:
   * Do not support that register multiple geoJSON or SVG
   * one map name. Because different geoJSON and SVG have
   * different unit. It's not easy to make sure how those
   * units are mapping/normalize.
   * If intending to use multiple geoJSON or SVG, we can
   * use multiple geo coordinate system.
   */
  registerMap: function (mapName, rawDef, rawSpecialAreas) {
    if (rawDef.svg) {
      var resource = new _GeoSVGResource_js__WEBPACK_IMPORTED_MODULE_1__/* .GeoSVGResource */ .w(mapName, rawDef.svg);
      storage.set(mapName, resource);
    } else {
      // Recommend:
      //     echarts.registerMap('eu', { geoJSON: xxx, specialAreas: xxx });
      // Backward compatibility:
      //     echarts.registerMap('eu', geoJSON, specialAreas);
      //     echarts.registerMap('eu', { geoJson: xxx, specialAreas: xxx });
      var geoJSON = rawDef.geoJson || rawDef.geoJSON;
      if (geoJSON && !rawDef.features) {
        rawSpecialAreas = rawDef.specialAreas;
      } else {
        geoJSON = rawDef;
      }
      var resource = new _GeoJSONResource_js__WEBPACK_IMPORTED_MODULE_2__/* .GeoJSONResource */ .U(mapName, geoJSON, rawSpecialAreas);
      storage.set(mapName, resource);
    }
  },
  getGeoResource: function (mapName) {
    return storage.get(mapName);
  },
  /**
   * Only for exporting to users.
   * **MUST NOT** used internally.
   */
  getMapForUser: function (mapName) {
    var resource = storage.get(mapName);
    // Do not support return SVG until some real requirement come.
    return resource && resource.type === 'geoJSON' && resource.getMapForUser();
  },
  load: function (mapName, nameMap, nameProperty) {
    var resource = storage.get(mapName);
    if (!resource) {
      if (false) {}
      return;
    }
    return resource.load(nameMap, nameProperty);
  }
});

/***/ }),

/***/ 67614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35980);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88367);
/* harmony import */ var _Line_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9776);
/* harmony import */ var _label_labelStyle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88908);

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



var LineDraw = /** @class */function () {
  function LineDraw(LineCtor) {
    this.group = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
    this._LineCtor = LineCtor || _Line_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A;
  }
  LineDraw.prototype.updateData = function (lineData) {
    var _this = this;
    // Remove progressive els.
    this._progressiveEls = null;
    var lineDraw = this;
    var group = lineDraw.group;
    var oldLineData = lineDraw._lineData;
    lineDraw._lineData = lineData;
    // There is no oldLineData only when first rendering or switching from
    // stream mode to normal mode, where previous elements should be removed.
    if (!oldLineData) {
      group.removeAll();
    }
    var seriesScope = makeSeriesScope(lineData);
    lineData.diff(oldLineData).add(function (idx) {
      _this._doAdd(lineData, idx, seriesScope);
    }).update(function (newIdx, oldIdx) {
      _this._doUpdate(oldLineData, lineData, oldIdx, newIdx, seriesScope);
    }).remove(function (idx) {
      group.remove(oldLineData.getItemGraphicEl(idx));
    }).execute();
  };
  ;
  LineDraw.prototype.updateLayout = function () {
    var lineData = this._lineData;
    // Do not support update layout in incremental mode.
    if (!lineData) {
      return;
    }
    lineData.eachItemGraphicEl(function (el, idx) {
      el.updateLayout(lineData, idx);
    }, this);
  };
  ;
  LineDraw.prototype.incrementalPrepareUpdate = function (lineData) {
    this._seriesScope = makeSeriesScope(lineData);
    this._lineData = null;
    this.group.removeAll();
  };
  ;
  LineDraw.prototype.incrementalUpdate = function (taskParams, lineData, incrementalId) {
    this._progressiveEls = [];
    function updateIncrementalAndHover(el) {
      if (!el.isGroup && !isEffectObject(el)) {
        el.incremental = incrementalId;
        el.ensureState('emphasis').hoverLayer = _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__.HOVER_LAYER_FOR_INCREMENTAL;
      }
    }
    for (var idx = taskParams.start; idx < taskParams.end; idx++) {
      var itemLayout = lineData.getItemLayout(idx);
      if (lineNeedsDraw(itemLayout)) {
        var el = new this._LineCtor(lineData, idx, this._seriesScope);
        el.traverse(updateIncrementalAndHover);
        this.group.add(el);
        lineData.setItemGraphicEl(idx, el);
        this._progressiveEls.push(el);
      }
    }
  };
  ;
  LineDraw.prototype.remove = function () {
    this.group.removeAll();
  };
  ;
  LineDraw.prototype.eachRendered = function (cb) {
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__.traverseElements(this._progressiveEls || this.group, cb);
  };
  LineDraw.prototype._doAdd = function (lineData, idx, seriesScope) {
    var itemLayout = lineData.getItemLayout(idx);
    if (!lineNeedsDraw(itemLayout)) {
      return;
    }
    var el = new this._LineCtor(lineData, idx, seriesScope);
    lineData.setItemGraphicEl(idx, el);
    this.group.add(el);
  };
  LineDraw.prototype._doUpdate = function (oldLineData, newLineData, oldIdx, newIdx, seriesScope) {
    var itemEl = oldLineData.getItemGraphicEl(oldIdx);
    if (!lineNeedsDraw(newLineData.getItemLayout(newIdx))) {
      this.group.remove(itemEl);
      return;
    }
    if (!itemEl) {
      itemEl = new this._LineCtor(newLineData, newIdx, seriesScope);
    } else {
      itemEl.updateData(newLineData, newIdx, seriesScope);
    }
    newLineData.setItemGraphicEl(newIdx, itemEl);
    this.group.add(itemEl);
  };
  return LineDraw;
}();
function isEffectObject(el) {
  return el.animators && el.animators.length > 0;
}
function makeSeriesScope(lineData) {
  var hostModel = lineData.hostModel;
  var emphasisModel = hostModel.getModel('emphasis');
  return {
    lineStyle: hostModel.getModel('lineStyle').getLineStyle(),
    emphasisLineStyle: emphasisModel.getModel(['lineStyle']).getLineStyle(),
    blurLineStyle: hostModel.getModel(['blur', 'lineStyle']).getLineStyle(),
    selectLineStyle: hostModel.getModel(['select', 'lineStyle']).getLineStyle(),
    emphasisDisabled: emphasisModel.get('disabled'),
    blurScope: emphasisModel.get('blurScope'),
    focus: emphasisModel.get('focus'),
    labelStatesModels: (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_3__/* .getLabelStatesModels */ .lx)(hostModel)
  };
}
function isPointNaN(pt) {
  return isNaN(pt[0]) || isNaN(pt[1]);
}
function lineNeedsDraw(pts) {
  return pts && !isPointNaN(pts[0]) && !isPointNaN(pts[1]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LineDraw);

/***/ }),

/***/ 71576:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ fixTextCoords)
/* harmony export */ });

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
var coordsOffsetMap = {
  '南海诸岛': [32, 80],
  // 全国
  '广东': [0, -10],
  '香港': [10, 5],
  '澳门': [-10, 10],
  // '北京': [-10, 0],
  '天津': [5, 5]
};
function fixTextCoords(mapType, region) {
  if (mapType === 'china') {
    var coordFix = coordsOffsetMap[region.name];
    if (coordFix) {
      var cp = region.getCenter();
      cp[0] += coordFix[0] / 10.5;
      cp[1] += -coordFix[1] / (10.5 / 0.75);
      region.setCenter(cp);
    }
  }
}

/***/ }),

/***/ 74614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _helper_MapDraw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99239);
/* harmony import */ var _view_Component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26349);
/* harmony import */ var _util_innerStore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83604);
/* harmony import */ var _util_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36015);

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





var GeoView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(GeoView, _super);
  function GeoView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = GeoView.type;
    _this.focusBlurEnabled = true;
    return _this;
  }
  GeoView.prototype.init = function (ecModel, api) {
    this._api = api;
  };
  GeoView.prototype.render = function (geoModel, ecModel, api, payload) {
    this._model = geoModel;
    if (!geoModel.get('show')) {
      this._mapDraw && this._mapDraw.remove();
      this._mapDraw = null;
      return;
    }
    if (!this._mapDraw) {
      this._mapDraw = new _helper_MapDraw_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(api);
    }
    var mapDraw = this._mapDraw;
    mapDraw.draw(geoModel, ecModel, api, this, payload);
    mapDraw.group.on('click', this._handleRegionClick, this);
    mapDraw.group.silent = geoModel.get('silent');
    this.group.add(mapDraw.group);
    this.updateSelectStatus(geoModel, ecModel, api);
  };
  /**
   * @implements RoamHostView['__updateOnOwnRoam']
   */
  GeoView.prototype.__updateOnOwnRoam = function (payload, model, api) {
    var mapDraw = this._mapDraw;
    if (mapDraw) {
      mapDraw.__updateOnOwnRoam(model);
    }
  };
  GeoView.prototype._handleRegionClick = function (e) {
    var eventData;
    (0,_util_event_js__WEBPACK_IMPORTED_MODULE_2__/* .findEventDispatcher */ .R)(e.target, function (current) {
      return (eventData = (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_3__/* .getECData */ .z)(current).eventData) != null;
    }, true);
    if (eventData) {
      this._api.dispatchAction({
        type: 'geoToggleSelect',
        geoId: this._model.id,
        name: eventData.name
      });
    }
  };
  GeoView.prototype.updateSelectStatus = function (model, ecModel, api) {
    var _this = this;
    this._mapDraw.group.traverse(function (node) {
      var eventData = (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_3__/* .getECData */ .z)(node).eventData;
      if (eventData) {
        _this._model.isSelected(eventData.name) ? api.enterSelect(node) : api.leaveSelect(node);
        // No need to traverse children.
        return true;
      }
    });
  };
  GeoView.prototype.findHighDownDispatchers = function (name) {
    return this._mapDraw && this._mapDraw.findHighDownDispatchers(name, this._model);
  };
  GeoView.prototype.dispose = function () {
    this._mapDraw && this._mapDraw.remove();
  };
  GeoView.type = 'geo';
  return GeoView;
}(_view_Component_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeoView);

/***/ }),

/***/ 74742:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46678);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7791);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13213);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15451);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(89487);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(88367);
/* harmony import */ var _view_Component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26349);

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





var RadarView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(RadarView, _super);
  function RadarView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = RadarView.type;
    return _this;
  }
  RadarView.prototype.render = function (radarModel, ecModel, api) {
    var group = this.group;
    group.removeAll();
    this._buildAxes(radarModel, api);
    this._buildSplitLineAndArea(radarModel);
  };
  RadarView.prototype._buildAxes = function (radarModel, api) {
    var radar = radarModel.coordinateSystem;
    var indicatorAxes = radar.getIndicatorAxes();
    var axisBuilders = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map(indicatorAxes, function (indicatorAxis) {
      var axisName = indicatorAxis.model.get('showName') ? indicatorAxis.name : ''; // hide name
      var axisBuilder = new _axis_AxisBuilder_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay(indicatorAxis.model, api, {
        axisName: axisName,
        position: [radar.cx, radar.cy],
        rotation: indicatorAxis.angle,
        labelDirection: -1,
        tickDirection: -1,
        nameDirection: 1
      });
      return axisBuilder;
    });
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(axisBuilders, function (axisBuilder) {
      axisBuilder.build();
      this.group.add(axisBuilder.group);
    }, this);
  };
  RadarView.prototype._buildSplitLineAndArea = function (radarModel) {
    var radar = radarModel.coordinateSystem;
    var indicatorAxes = radar.getIndicatorAxes();
    if (!indicatorAxes.length) {
      return;
    }
    var shape = radarModel.get('shape');
    var splitLineModel = radarModel.getModel('splitLine');
    var splitAreaModel = radarModel.getModel('splitArea');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var areaStyleModel = splitAreaModel.getModel('areaStyle');
    var showSplitLine = splitLineModel.get('show');
    var showSplitArea = splitAreaModel.get('show');
    var splitLineColors = lineStyleModel.get('color');
    var splitAreaColors = areaStyleModel.get('color');
    var splitLineColorsArr = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArray(splitLineColors) ? splitLineColors : [splitLineColors];
    var splitAreaColorsArr = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isArray(splitAreaColors) ? splitAreaColors : [splitAreaColors];
    var splitLines = [];
    var splitAreas = [];
    function getColorIndex(areaOrLine, areaOrLineColorList, idx) {
      var colorIndex = idx % areaOrLineColorList.length;
      areaOrLine[colorIndex] = areaOrLine[colorIndex] || [];
      return colorIndex;
    }
    if (shape === 'circle') {
      var ticksRadius = indicatorAxes[0].getTicksCoords();
      var cx = radar.cx;
      var cy = radar.cy;
      for (var i = 0; i < ticksRadius.length; i++) {
        if (showSplitLine) {
          var colorIndex = getColorIndex(splitLines, splitLineColorsArr, i);
          splitLines[colorIndex].push(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A({
            shape: {
              cx: cx,
              cy: cy,
              r: ticksRadius[i].coord
            }
          }));
        }
        if (showSplitArea && i < ticksRadius.length - 1) {
          var colorIndex = getColorIndex(splitAreas, splitAreaColorsArr, i);
          splitAreas[colorIndex].push(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A({
            shape: {
              cx: cx,
              cy: cy,
              r0: ticksRadius[i].coord,
              r: ticksRadius[i + 1].coord
            }
          }));
        }
      }
    }
    // Polyyon
    else {
      var realSplitNumber_1;
      var axesTicksPoints = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map(indicatorAxes, function (indicatorAxis, idx) {
        var ticksCoords = indicatorAxis.getTicksCoords();
        realSplitNumber_1 = realSplitNumber_1 == null ? ticksCoords.length - 1 : Math.min(ticksCoords.length - 1, realSplitNumber_1);
        return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map(ticksCoords, function (tickCoord) {
          return radar.coordToPoint(tickCoord.coord, idx);
        });
      });
      var prevPoints = [];
      for (var i = 0; i <= realSplitNumber_1; i++) {
        var points = [];
        for (var j = 0; j < indicatorAxes.length; j++) {
          points.push(axesTicksPoints[j][i]);
        }
        // Close
        if (points[0]) {
          points.push(points[0].slice());
        } else {
          if (false) {}
        }
        if (showSplitLine) {
          var colorIndex = getColorIndex(splitLines, splitLineColorsArr, i);
          splitLines[colorIndex].push(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A({
            shape: {
              points: points
            }
          }));
        }
        if (showSplitArea && prevPoints) {
          var colorIndex = getColorIndex(splitAreas, splitAreaColorsArr, i - 1);
          splitAreas[colorIndex].push(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A({
            shape: {
              points: points.concat(prevPoints)
            }
          }));
        }
        prevPoints = points.slice().reverse();
      }
    }
    var lineStyle = lineStyleModel.getLineStyle();
    var areaStyle = areaStyleModel.getAreaStyle();
    // Add splitArea before splitLine
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(splitAreas, function (splitAreas, idx) {
      this.group.add(_util_graphic_js__WEBPACK_IMPORTED_MODULE_7__.mergePath(splitAreas, {
        style: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults({
          stroke: 'none',
          fill: splitAreaColorsArr[idx % splitAreaColorsArr.length]
        }, areaStyle),
        silent: true
      }));
    }, this);
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each(splitLines, function (splitLines, idx) {
      this.group.add(_util_graphic_js__WEBPACK_IMPORTED_MODULE_7__.mergePath(splitLines, {
        style: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults({
          fill: 'none',
          stroke: splitLineColorsArr[idx % splitLineColorsArr.length]
        }, lineStyle),
        silent: true
      }));
    }, this);
  };
  RadarView.type = 'radar';
  return RadarView;
}(_view_Component_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadarView);

/***/ }),

/***/ 75001:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IndicatorAxis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44113);
/* harmony import */ var _scale_Interval_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17322);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(84408);
/* harmony import */ var _RadarModel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94126);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _axisAlignTicks_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7654);
/* harmony import */ var _util_layout_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58263);
/* harmony import */ var _scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43834);
/* harmony import */ var _scale_helper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54275);
/* harmony import */ var _axisStatistics_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(77596);

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










var Radar = /** @class */function () {
  function Radar(radarModel, ecModel, api) {
    this.type = _RadarModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COORD_SYS_TYPE_RADAR */ .C9;
    /**
     *
     * Radar dimensions
     */
    this.dimensions = [];
    this._model = radarModel;
    this._indicatorAxes = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map)(radarModel.getIndicatorModels(), function (indicatorModel, idx) {
      var dim = 'indicator_' + idx;
      var indicatorAxis = new _IndicatorAxis_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(dim, new _scale_Interval_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A()
      // (indicatorModel.get('axisType') === 'log') ? new LogScale() : new IntervalScale()
      );
      indicatorAxis.name = indicatorModel.get('name');
      // Inject model and axis
      indicatorAxis.model = indicatorModel;
      indicatorModel.axis = indicatorAxis;
      this.dimensions.push(dim);
      return indicatorAxis;
    }, this);
    this.resize(radarModel, api);
  }
  Radar.prototype.getIndicatorAxes = function () {
    return this._indicatorAxes;
  };
  Radar.prototype.dataToPoint = function (value, indicatorIndex) {
    var indicatorAxis = this._indicatorAxes[indicatorIndex];
    return this.coordToPoint(indicatorAxis.dataToCoord(value), indicatorIndex);
  };
  // TODO: API should be coordToPoint([coord, indicatorIndex])
  Radar.prototype.coordToPoint = function (coord, indicatorIndex) {
    var indicatorAxis = this._indicatorAxes[indicatorIndex];
    var angle = indicatorAxis.angle;
    var x = this.cx + coord * Math.cos(angle);
    var y = this.cy - coord * Math.sin(angle);
    return [x, y];
  };
  Radar.prototype.pointToData = function (pt) {
    var dx = pt[0] - this.cx;
    var dy = pt[1] - this.cy;
    var radius = Math.sqrt(dx * dx + dy * dy);
    dx /= radius;
    dy /= radius;
    var radian = Math.atan2(-dy, dx);
    // Find the closest angle
    // FIXME index can calculated directly
    var minRadianDiff = Infinity;
    var closestAxis;
    var closestAxisIdx = -1;
    for (var i = 0; i < this._indicatorAxes.length; i++) {
      var indicatorAxis = this._indicatorAxes[i];
      var diff = Math.abs(radian - indicatorAxis.angle);
      if (diff < minRadianDiff) {
        closestAxis = indicatorAxis;
        closestAxisIdx = i;
        minRadianDiff = diff;
      }
    }
    return [closestAxisIdx, +(closestAxis && closestAxis.coordToData(radius))];
  };
  Radar.prototype.resize = function (radarModel, api) {
    var refContainer = (0,_util_layout_js__WEBPACK_IMPORTED_MODULE_4__/* .createBoxLayoutReference */ .Lj)(radarModel, api).refContainer;
    var center = radarModel.get('center');
    var clockwise = radarModel.get('clockwise') || false;
    var viewSize = Math.min(refContainer.width, refContainer.height) / 2;
    this.cx = _util_number_js__WEBPACK_IMPORTED_MODULE_5__/* .parsePercent */ .lo(center[0], refContainer.width) + refContainer.x;
    this.cy = _util_number_js__WEBPACK_IMPORTED_MODULE_5__/* .parsePercent */ .lo(center[1], refContainer.height) + refContainer.y;
    this.startAngle = radarModel.get('startAngle') * Math.PI / 180;
    // radius may be single value like `20`, `'80%'`, or array like `[10, '80%']`
    var radius = radarModel.get('radius');
    if ((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isString)(radius) || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(radius)) {
      radius = [0, radius];
    }
    this.r0 = _util_number_js__WEBPACK_IMPORTED_MODULE_5__/* .parsePercent */ .lo(radius[0], viewSize);
    this.r = _util_number_js__WEBPACK_IMPORTED_MODULE_5__/* .parsePercent */ .lo(radius[1], viewSize);
    var sign = clockwise ? -1 : 1;
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(this._indicatorAxes, function (indicatorAxis, idx) {
      indicatorAxis.setExtent(this.r0, this.r);
      var angle = this.startAngle + sign * idx * Math.PI * 2 / this._indicatorAxes.length;
      // Normalize to [-PI, PI]
      angle = Math.atan2(Math.sin(angle), Math.cos(angle));
      indicatorAxis.angle = angle;
    }, this);
  };
  Radar.prototype.update = function (ecModel, api) {
    var indicatorAxes = this._indicatorAxes;
    var radarModel = this._model;
    var splitNumber = (0,_scale_helper_js__WEBPACK_IMPORTED_MODULE_6__/* .ensureValidSplitNumber */ .Ev)(radarModel.get('splitNumber'), _RadarModel_js__WEBPACK_IMPORTED_MODULE_0__/* .RADAR_DEFAULT_SPLIT_NUMBER */ ._5);
    var dummyScale = new _scale_Interval_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
    dummyScale.setExtent(0, splitNumber);
    dummyScale.setConfig({
      interval: 1
    });
    // Force all the axis fixing the maxSplitNumber.
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(indicatorAxes, function (indicatorAxis) {
      (0,_scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_7__/* .scaleRawExtentInfoCreate */ .DT)(indicatorAxis, _scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_7__/* .AXIS_EXTENT_INFO_BUILD_FROM_COORD_SYS_UPDATE */ .ex);
      (0,_axisAlignTicks_js__WEBPACK_IMPORTED_MODULE_8__/* .scaleCalcAlign */ .R)(indicatorAxis, dummyScale);
    });
  };
  Radar.prototype.convertToPixel = function (ecModel, finder, value) {
    console.warn('Not implemented.');
    return null;
  };
  Radar.prototype.convertFromPixel = function (ecModel, finder, pixel) {
    console.warn('Not implemented.');
    return null;
  };
  Radar.prototype.containPoint = function (point) {
    console.warn('Not implemented.');
    return false;
  };
  Radar.create = function (ecModel, api) {
    var radarList = [];
    ecModel.eachComponent(_RadarModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COMPONENT_TYPE_RADAR */ .ql, function (radarModel) {
      var radar = new Radar(radarModel, ecModel, api);
      radarList.push(radar);
      radarModel.coordinateSystem = radar;
    });
    ecModel.eachSeriesByType(_RadarModel_js__WEBPACK_IMPORTED_MODULE_0__/* .SERIES_TYPE_RADAR */ .Wd, function (radarSeries) {
      if (radarSeries.get('coordinateSystem') === _RadarModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COORD_SYS_TYPE_RADAR */ .C9) {
        // Inject coordinate system
        // @ts-ignore
        var radar = radarSeries.coordinateSystem = radarList[radarSeries.get('radarIndex') || 0];
        if (radar) {
          (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(radar.getIndicatorAxes(), function (indicatorAxis) {
            (0,_axisStatistics_js__WEBPACK_IMPORTED_MODULE_9__/* .associateSeriesWithAxis */ .Lb)(indicatorAxis, radarSeries, _RadarModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COORD_SYS_TYPE_RADAR */ .C9);
          });
        }
      }
    });
    return radarList;
  };
  /**
   * Radar dimensions is based on the data
   */
  Radar.dimensions = [];
  return Radar;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Radar);

/***/ }),

/***/ 75454:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _util_symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22469);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55736);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35980);
/* harmony import */ var _util_innerStore_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(83604);
/* harmony import */ var _util_states_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33955);
/* harmony import */ var _labelHelper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66928);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _label_labelStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88908);
/* harmony import */ var zrender_lib_graphic_Image_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(46422);

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










var Symbol = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(Symbol, _super);
  function Symbol(data, idx, seriesScope, opts) {
    var _this = _super.call(this) || this;
    _this.updateData(data, idx, seriesScope, opts);
    return _this;
  }
  Symbol.prototype._createSymbol = function (symbolType, data, idx, symbolSize, z2, keepAspect) {
    // Remove paths created before
    this.removeAll();
    // let symbolPath = createSymbol(
    //     symbolType, -0.5, -0.5, 1, 1, color
    // );
    // If width/height are set too small (e.g., set to 1) on ios10
    // and macOS Sierra, a circle stroke become a rect, no matter what
    // the scale is set. So we set width/height as 2. See #4150.
    var symbolPath = (0,_util_symbol_js__WEBPACK_IMPORTED_MODULE_1__/* .createSymbol */ .v5)(symbolType, -1, -1, 2, 2, null, keepAspect);
    symbolPath.attr({
      z2: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.retrieve2)(z2, 100),
      culling: true,
      scaleX: symbolSize[0] / 2,
      scaleY: symbolSize[1] / 2
    });
    // Rewrite drift method
    symbolPath.drift = driftSymbol;
    this._symbolType = symbolType;
    this.add(symbolPath);
  };
  /**
   * Stop animation
   * @param {boolean} toLastFrame
   */
  Symbol.prototype.stopSymbolAnimation = function (toLastFrame) {
    this.childAt(0).stopAnimation(null, toLastFrame);
  };
  Symbol.prototype.getSymbolType = function () {
    return this._symbolType;
  };
  /**
   * FIXME:
   * Caution: This method breaks the encapsulation of this module,
   * but it indeed brings convenience. So do not use the method
   * unless you detailedly know all the implements of `Symbol`,
   * especially animation.
   *
   * Get symbol path element.
   */
  Symbol.prototype.getSymbolPath = function () {
    return this.childAt(0);
  };
  /**
   * Highlight symbol
   */
  Symbol.prototype.highlight = function () {
    (0,_util_states_js__WEBPACK_IMPORTED_MODULE_3__/* .enterEmphasis */ .HY)(this.childAt(0));
  };
  /**
   * Downplay symbol
   */
  Symbol.prototype.downplay = function () {
    (0,_util_states_js__WEBPACK_IMPORTED_MODULE_3__/* .leaveEmphasis */ .SD)(this.childAt(0));
  };
  /**
   * @param {number} zlevel
   * @param {number} z
   */
  Symbol.prototype.setZ = function (zlevel, z) {
    var symbolPath = this.childAt(0);
    symbolPath.zlevel = zlevel;
    symbolPath.z = z;
  };
  Symbol.prototype.setDraggable = function (draggable, hasCursorOption) {
    var symbolPath = this.childAt(0);
    symbolPath.draggable = draggable;
    symbolPath.cursor = !hasCursorOption && draggable ? 'move' : symbolPath.cursor;
  };
  /**
   * Update symbol properties
   */
  Symbol.prototype.updateData = function (data, idx, seriesScope, opts) {
    this.silent = false;
    var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
    var seriesModel = data.hostModel;
    var symbolSize = Symbol.getSymbolSize(data, idx);
    var z2 = Symbol.getSymbolZ2(data, idx);
    var isInit = symbolType !== this._symbolType;
    var disableAnimation = opts && opts.disableAnimation;
    if (isInit) {
      var keepAspect = data.getItemVisual(idx, 'symbolKeepAspect');
      this._createSymbol(symbolType, data, idx, symbolSize, z2, keepAspect);
    } else {
      var symbolPath = this.childAt(0);
      symbolPath.silent = false;
      var target = {
        scaleX: symbolSize[0] / 2,
        scaleY: symbolSize[1] / 2
      };
      disableAnimation ? symbolPath.attr(target) : _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* .updateProps */ .oi(symbolPath, target, seriesModel, idx);
      (0,_util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* .saveOldStyle */ .ap)(symbolPath);
    }
    this._updateCommon(data, idx, symbolSize, seriesScope, opts);
    if (isInit) {
      var symbolPath = this.childAt(0);
      if (!disableAnimation) {
        var target = {
          scaleX: this._sizeX,
          scaleY: this._sizeY,
          style: {
            // Always fadeIn. Because it has fadeOut animation when symbol is removed..
            opacity: symbolPath.style.opacity
          }
        };
        symbolPath.scaleX = symbolPath.scaleY = 0;
        symbolPath.style.opacity = 0;
        _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* .initProps */ .LW(symbolPath, target, seriesModel, idx);
      }
    }
    if (disableAnimation) {
      // Must stop leave transition manually if don't call initProps or updateProps.
      this.childAt(0).stopAnimation('leave');
    }
  };
  Symbol.prototype._updateCommon = function (data, idx, symbolSize, seriesScope, opts) {
    var symbolPath = this.childAt(0);
    var seriesModel = data.hostModel;
    var emphasisItemStyle;
    var blurItemStyle;
    var selectItemStyle;
    var focus;
    var blurScope;
    var emphasisDisabled;
    var labelStatesModels;
    var hoverScale;
    var cursorStyle;
    if (seriesScope) {
      emphasisItemStyle = seriesScope.emphasisItemStyle;
      blurItemStyle = seriesScope.blurItemStyle;
      selectItemStyle = seriesScope.selectItemStyle;
      focus = seriesScope.focus;
      blurScope = seriesScope.blurScope;
      labelStatesModels = seriesScope.labelStatesModels;
      hoverScale = seriesScope.hoverScale;
      cursorStyle = seriesScope.cursorStyle;
      emphasisDisabled = seriesScope.emphasisDisabled;
    }
    if (!seriesScope || data.hasItemOption) {
      var itemModel = seriesScope && seriesScope.itemModel ? seriesScope.itemModel : data.getItemModel(idx);
      var emphasisModel = itemModel.getModel('emphasis');
      emphasisItemStyle = emphasisModel.getModel('itemStyle').getItemStyle();
      selectItemStyle = itemModel.getModel(['select', 'itemStyle']).getItemStyle();
      blurItemStyle = itemModel.getModel(['blur', 'itemStyle']).getItemStyle();
      focus = emphasisModel.get('focus');
      blurScope = emphasisModel.get('blurScope');
      emphasisDisabled = emphasisModel.get('disabled');
      labelStatesModels = (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_5__/* .getLabelStatesModels */ .lx)(itemModel);
      hoverScale = emphasisModel.getShallow('scale');
      cursorStyle = itemModel.getShallow('cursor');
    }
    var symbolRotate = data.getItemVisual(idx, 'symbolRotate');
    symbolPath.attr('rotation', (symbolRotate || 0) * Math.PI / 180 || 0);
    var symbolOffset = (0,_util_symbol_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeSymbolOffset */ .hV)(data.getItemVisual(idx, 'symbolOffset'), symbolSize);
    if (symbolOffset) {
      symbolPath.x = symbolOffset[0];
      symbolPath.y = symbolOffset[1];
    }
    cursorStyle && symbolPath.attr('cursor', cursorStyle);
    var symbolStyle = data.getItemVisual(idx, 'style');
    var visualColor = symbolStyle.fill;
    if (symbolPath instanceof zrender_lib_graphic_Image_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay) {
      var pathStyle = symbolPath.style;
      symbolPath.useStyle((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.extend)({
        // TODO other properties like x, y ?
        image: pathStyle.image,
        x: pathStyle.x,
        y: pathStyle.y,
        width: pathStyle.width,
        height: pathStyle.height
      }, symbolStyle));
    } else {
      if (symbolPath.__isEmptyBrush) {
        // fill and stroke will be swapped if it's empty.
        // So we cloned a new style to avoid it affecting the original style in visual storage.
        // TODO Better implementation. No empty logic!
        symbolPath.useStyle((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, symbolStyle));
      } else {
        symbolPath.useStyle(symbolStyle);
      }
      // Disable decal because symbol scale will been applied on the decal.
      symbolPath.style.decal = null;
      symbolPath.setColor(visualColor, opts && opts.symbolInnerColor);
      symbolPath.style.strokeNoScale = true;
    }
    var liftZ = data.getItemVisual(idx, 'liftZ');
    var z2Origin = this._z2;
    if (liftZ != null) {
      if (z2Origin == null) {
        this._z2 = symbolPath.z2;
        symbolPath.z2 += liftZ;
      }
    } else if (z2Origin != null) {
      symbolPath.z2 = z2Origin;
      this._z2 = null;
    }
    var useNameLabel = opts && opts.useNameLabel;
    (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_5__/* .setLabelStyle */ .qM)(symbolPath, labelStatesModels, {
      labelFetcher: seriesModel,
      labelDataIndex: idx,
      defaultText: getLabelDefaultText,
      inheritColor: visualColor,
      defaultOpacity: symbolStyle.opacity
    });
    // Do not execute util needed.
    function getLabelDefaultText(idx) {
      return useNameLabel ? data.getName(idx) : (0,_labelHelper_js__WEBPACK_IMPORTED_MODULE_7__/* .getDefaultLabel */ .i)(data, idx);
    }
    this._sizeX = symbolSize[0] / 2;
    this._sizeY = symbolSize[1] / 2;
    var emphasisState = symbolPath.ensureState('emphasis');
    emphasisState.style = emphasisItemStyle;
    symbolPath.ensureState('select').style = selectItemStyle;
    symbolPath.ensureState('blur').style = blurItemStyle;
    // null / undefined / true means to use default strategy.
    // 0 / false / negative number / NaN / Infinity means no scale.
    var scaleRatio = hoverScale == null || hoverScale === true ? Math.max(1.1, 3 / this._sizeY)
    // PENDING: restrict hoverScale > 1? It seems unreasonable to scale down
    : isFinite(hoverScale) && hoverScale > 0 ? +hoverScale : 1;
    // always set scale to allow resetting
    emphasisState.scaleX = this._sizeX * scaleRatio;
    emphasisState.scaleY = this._sizeY * scaleRatio;
    this.setSymbolScale(1);
    (0,_util_states_js__WEBPACK_IMPORTED_MODULE_3__/* .toggleHoverEmphasis */ .Lm)(this, focus, blurScope, emphasisDisabled);
  };
  Symbol.prototype.setSymbolScale = function (scale) {
    this.scaleX = this.scaleY = scale;
  };
  Symbol.prototype.fadeOut = function (cb, seriesModel, opt) {
    var symbolPath = this.childAt(0);
    var dataIndex = (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_8__/* .getECData */ .z)(this).dataIndex;
    var animationOpt = opt && opt.animation;
    // Avoid mistaken hover when fading out
    this.silent = symbolPath.silent = true;
    // Not show text when animating
    if (opt && opt.fadeLabel) {
      var textContent = symbolPath.getTextContent();
      if (textContent) {
        _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* .removeElement */ .Nz(textContent, {
          style: {
            opacity: 0
          }
        }, seriesModel, {
          dataIndex: dataIndex,
          removeOpt: animationOpt,
          cb: function () {
            symbolPath.removeTextContent();
          }
        });
      }
    } else {
      symbolPath.removeTextContent();
    }
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_4__/* .removeElement */ .Nz(symbolPath, {
      style: {
        opacity: 0
      },
      scaleX: 0,
      scaleY: 0
    }, seriesModel, {
      dataIndex: dataIndex,
      cb: cb,
      removeOpt: animationOpt
    });
  };
  Symbol.getSymbolSize = function (data, idx) {
    return (0,_util_symbol_js__WEBPACK_IMPORTED_MODULE_1__/* .normalizeSymbolSize */ .xU)(data.getItemVisual(idx, 'symbolSize'));
  };
  Symbol.getSymbolZ2 = function (data, idx) {
    return data.getItemVisual(idx, 'z2');
  };
  return Symbol;
}(_util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A);
function driftSymbol(dx, dy) {
  this.parent.drift(dx, dy);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Symbol);

/***/ }),

/***/ 75854:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _axisPointer_modelHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80864);
/* harmony import */ var _view_Component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26349);

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



var axisPointerClazz = {};
/**
 * Base class of AxisView.
 */
var AxisView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(AxisView, _super);
  function AxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = AxisView.type;
    return _this;
  }
  /**
   * @override
   */
  AxisView.prototype.render = function (axisModel, ecModel, api, payload) {
    // FIXME
    // This process should proformed after coordinate systems updated
    // (axis scale updated), and should be performed each time update.
    // So put it here temporarily, although it is not appropriate to
    // put a model-writing procedure in `view`.
    this.axisPointerClass && _axisPointer_modelHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .fixValue */ .h_(axisModel);
    _super.prototype.render.apply(this, arguments);
    this._doUpdateAxisPointerClass(axisModel, api, true);
  };
  /**
   * Action handler.
   */
  AxisView.prototype.updateAxisPointer = function (axisModel, ecModel, api, payload) {
    this._doUpdateAxisPointerClass(axisModel, api, false);
  };
  /**
   * @override
   */
  AxisView.prototype.remove = function (ecModel, api) {
    var axisPointer = this._axisPointer;
    axisPointer && axisPointer.remove(api);
  };
  /**
   * @override
   */
  AxisView.prototype.dispose = function (ecModel, api) {
    this._disposeAxisPointer(api);
    _super.prototype.dispose.apply(this, arguments);
  };
  AxisView.prototype._doUpdateAxisPointerClass = function (axisModel, api, forceRender) {
    var Clazz = AxisView.getAxisPointerClass(this.axisPointerClass);
    if (!Clazz) {
      return;
    }
    var axisPointerModel = _axisPointer_modelHelper_js__WEBPACK_IMPORTED_MODULE_1__/* .getAxisPointerModel */ .mg(axisModel);
    axisPointerModel ? (this._axisPointer || (this._axisPointer = new Clazz())).render(axisModel, axisPointerModel, api, forceRender) : this._disposeAxisPointer(api);
  };
  AxisView.prototype._disposeAxisPointer = function (api) {
    this._axisPointer && this._axisPointer.dispose(api);
    this._axisPointer = null;
  };
  AxisView.registerAxisPointerClass = function (type, clazz) {
    if (false) {}
    axisPointerClazz[type] = clazz;
  };
  ;
  AxisView.getAxisPointerClass = function (type) {
    return type && axisPointerClazz[type];
  };
  ;
  AxisView.type = 'axis';
  return AxisView;
}(_view_Component_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxisView);

/***/ }),

/***/ 80694:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var _view_Component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26349);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _util_throttle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56485);

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




var CLICK_THRESHOLD = 5; // > 4
var ParallelView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(ParallelView, _super);
  function ParallelView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = ParallelView.type;
    return _this;
  }
  ParallelView.prototype.render = function (parallelModel, ecModel, api) {
    this._model = parallelModel;
    this._api = api;
    if (!this._handlers) {
      this._handlers = {};
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(handlers, function (handler, eventName) {
        api.getZr().on(eventName, this._handlers[eventName] = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.bind)(handler, this));
      }, this);
    }
    (0,_util_throttle_js__WEBPACK_IMPORTED_MODULE_2__/* .createOrUpdate */ .N)(this, '_throttledDispatchExpand', parallelModel.get('axisExpandRate'), 'fixRate');
  };
  ParallelView.prototype.dispose = function (ecModel, api) {
    (0,_util_throttle_js__WEBPACK_IMPORTED_MODULE_2__/* .clear */ .IU)(this, '_throttledDispatchExpand');
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(this._handlers, function (handler, eventName) {
      api.getZr().off(eventName, handler);
    });
    this._handlers = null;
  };
  /**
   * @internal
   * @param {Object} [opt] If null, cancel the last action triggering for debounce.
   */
  ParallelView.prototype._throttledDispatchExpand = function (opt) {
    this._dispatchExpand(opt);
  };
  /**
   * @internal
   */
  ParallelView.prototype._dispatchExpand = function (opt) {
    opt && this._api.dispatchAction((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.extend)({
      type: 'parallelAxisExpand'
    }, opt));
  };
  ParallelView.type = 'parallel';
  return ParallelView;
}(_view_Component_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);
var handlers = {
  mousedown: function (e) {
    if (checkTrigger(this, 'click')) {
      this._mouseDownPoint = [e.offsetX, e.offsetY];
    }
  },
  mouseup: function (e) {
    var mouseDownPoint = this._mouseDownPoint;
    if (checkTrigger(this, 'click') && mouseDownPoint) {
      var point = [e.offsetX, e.offsetY];
      var dist = Math.pow(mouseDownPoint[0] - point[0], 2) + Math.pow(mouseDownPoint[1] - point[1], 2);
      if (dist > CLICK_THRESHOLD) {
        return;
      }
      var result = this._model.coordinateSystem.getSlidedAxisExpandWindow([e.offsetX, e.offsetY]);
      result.behavior !== 'none' && this._dispatchExpand({
        axisExpandWindow: result.axisExpandWindow
      });
    }
    this._mouseDownPoint = null;
  },
  mousemove: function (e) {
    // Should do nothing when brushing.
    if (this._mouseDownPoint || !checkTrigger(this, 'mousemove')) {
      return;
    }
    var model = this._model;
    var result = model.coordinateSystem.getSlidedAxisExpandWindow([e.offsetX, e.offsetY]);
    var behavior = result.behavior;
    behavior === 'jump' && this._throttledDispatchExpand.debounceNextCall(model.get('axisExpandDebounce'));
    this._throttledDispatchExpand(behavior === 'none' ? null // Cancel the last trigger, in case that mouse slide out of the area quickly.
    : {
      axisExpandWindow: result.axisExpandWindow,
      // Jumping uses animation, and sliding suppresses animation.
      animation: behavior === 'jump' ? null : {
        duration: 0 // Disable animation.
      }
    });
  }
};
function checkTrigger(view, triggerOn) {
  var model = view._model;
  return model.get('axisExpandable') && model.get('axisExpandTriggerOn') === triggerOn;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParallelView);

/***/ }),

/***/ 80864:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fo: () => (/* binding */ collect),
/* harmony export */   Yc: () => (/* binding */ getAxisInfo),
/* harmony export */   h_: () => (/* binding */ fixValue),
/* harmony export */   mg: () => (/* binding */ getAxisPointerModel),
/* harmony export */   og: () => (/* binding */ makeKey)
/* harmony export */ });
/* harmony import */ var _model_Model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77571);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);

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


// Build axisPointerModel, mergin tooltip.axisPointer model for each axis.
// allAxesInfo should be updated when setOption performed.
function collect(ecModel, api) {
  var result = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      triggerEmphasis,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: false,
    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  collectAxesInfo(result, ecModel, api);
  // Check seriesInvolved for performance, in case too many series in some chart.
  result.seriesInvolved && collectSeriesInfo(result, ecModel);
  return result;
}
function collectAxesInfo(result, ecModel, api) {
  var globalTooltipModel = ecModel.getComponent('tooltip');
  var globalAxisPointerModel = ecModel.getComponent('axisPointer');
  // links can only be set on global.
  var linksOption = globalAxisPointerModel.get('link', true) || [];
  var linkGroups = [];
  // Collect axes info.
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(api.getCoordinateSystems(), function (coordSys) {
    // Some coordinate system do not support axes, like geo.
    if (!coordSys.axisPointerEnabled) {
      return;
    }
    var coordSysKey = makeKey(coordSys.model);
    var axesInfoInCoordSys = result.coordSysAxesInfo[coordSysKey] = {};
    result.coordSysMap[coordSysKey] = coordSys;
    // Set tooltip (like 'cross') is a convenient way to show axisPointer
    // for user. So we enable setting tooltip on coordSys model.
    var coordSysModel = coordSys.model;
    var baseTooltipModel = coordSysModel.getModel('tooltip', globalTooltipModel);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(coordSys.getAxes(), (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.curry)(saveTooltipAxisInfo, false, null));
    // If axis tooltip used, choose tooltip axis for each coordSys.
    // Notice this case: coordSys is `grid` but not `cartesian2D` here.
    if (coordSys.getTooltipAxes && globalTooltipModel
    // If tooltip.showContent is set as false, tooltip will not
    // show but axisPointer will show as normal.
    && baseTooltipModel.get('show')) {
      // Compatible with previous logic. But series.tooltip.trigger: 'axis'
      // or series.data[n].tooltip.trigger: 'axis' are not support any more.
      var triggerAxis = baseTooltipModel.get('trigger') === 'axis';
      var cross = baseTooltipModel.get(['axisPointer', 'type']) === 'cross';
      var tooltipAxes = coordSys.getTooltipAxes(baseTooltipModel.get(['axisPointer', 'axis']));
      if (triggerAxis || cross) {
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(tooltipAxes.baseAxes, (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.curry)(saveTooltipAxisInfo, cross ? 'cross' : true, triggerAxis));
      }
      if (cross) {
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(tooltipAxes.otherAxes, (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.curry)(saveTooltipAxisInfo, 'cross', false));
      }
    }
    // fromTooltip: true | false | 'cross'
    // triggerTooltip: true | false | null
    function saveTooltipAxisInfo(fromTooltip, triggerTooltip, axis) {
      var axisPointerModel = axis.model.getModel('axisPointer', globalAxisPointerModel);
      var axisPointerShow = axisPointerModel.get('show');
      if (!axisPointerShow || axisPointerShow === 'auto' && !fromTooltip && !isHandleTrigger(axisPointerModel)) {
        return;
      }
      if (triggerTooltip == null) {
        triggerTooltip = axisPointerModel.get('triggerTooltip');
      }
      axisPointerModel = fromTooltip ? makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) : axisPointerModel;
      var snap = axisPointerModel.get('snap');
      var triggerEmphasis = axisPointerModel.get('triggerEmphasis');
      var axisKey = makeKey(axis.model);
      var involveSeries = triggerTooltip || snap || axis.type === 'category';
      // If result.axesInfo[key] exist, override it (tooltip has higher priority).
      var axisInfo = result.axesInfo[axisKey] = {
        key: axisKey,
        axis: axis,
        coordSys: coordSys,
        axisPointerModel: axisPointerModel,
        triggerTooltip: triggerTooltip,
        triggerEmphasis: triggerEmphasis,
        involveSeries: involveSeries,
        snap: snap,
        useHandle: isHandleTrigger(axisPointerModel),
        seriesModels: [],
        linkGroup: null
      };
      axesInfoInCoordSys[axisKey] = axisInfo;
      result.seriesInvolved = result.seriesInvolved || involveSeries;
      var groupIndex = getLinkGroupIndex(linksOption, axis);
      if (groupIndex != null) {
        var linkGroup = linkGroups[groupIndex] || (linkGroups[groupIndex] = {
          axesInfo: {}
        });
        linkGroup.axesInfo[axisKey] = axisInfo;
        linkGroup.mapper = linksOption[groupIndex].mapper;
        axisInfo.linkGroup = linkGroup;
      }
    }
  });
}
function makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) {
  var tooltipAxisPointerModel = baseTooltipModel.getModel('axisPointer');
  var fields = ['type', 'snap', 'lineStyle', 'shadowStyle', 'label', 'animation', 'animationDurationUpdate', 'animationEasingUpdate', 'z'];
  var volatileOption = {};
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(fields, function (field) {
    volatileOption[field] = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.clone)(tooltipAxisPointerModel.get(field));
  });
  // category axis do not auto snap, otherwise some tick that do not
  // has value can not be hovered. value/time/log axis default snap if
  // triggered from tooltip and trigger tooltip.
  volatileOption.snap = axis.type !== 'category' && !!triggerTooltip;
  // Compatible with previous behavior, tooltip axis does not show label by default.
  // Only these properties can be overridden from tooltip to axisPointer.
  if (tooltipAxisPointerModel.get('type') === 'cross') {
    volatileOption.type = 'line';
  }
  var labelOption = volatileOption.label || (volatileOption.label = {});
  // Follow the convention, do not show label when triggered by tooltip by default.
  labelOption.show == null && (labelOption.show = false);
  if (fromTooltip === 'cross') {
    // When 'cross', both axes show labels.
    var tooltipAxisPointerLabelShow = tooltipAxisPointerModel.get(['label', 'show']);
    labelOption.show = tooltipAxisPointerLabelShow != null ? tooltipAxisPointerLabelShow : true;
    // If triggerTooltip, this is a base axis, which should better not use cross style
    // (cross style is dashed by default)
    if (!triggerTooltip) {
      var crossStyle = volatileOption.lineStyle = tooltipAxisPointerModel.get('crossStyle');
      crossStyle && (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.defaults)(labelOption, crossStyle.textStyle);
    }
  }
  return axis.model.getModel('axisPointer', new _model_Model_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(volatileOption, globalAxisPointerModel, ecModel));
}
function collectSeriesInfo(result, ecModel) {
  // Prepare data for axis trigger
  ecModel.eachSeries(function (seriesModel) {
    // Notice this case: this coordSys is `cartesian2D` but not `grid`.
    var coordSys = seriesModel.coordinateSystem;
    var seriesTooltipTrigger = seriesModel.get(['tooltip', 'trigger'], true);
    var seriesTooltipShow = seriesModel.get(['tooltip', 'show'], true);
    if (!coordSys || !coordSys.model // PENDING: radar do not have a model.
    || seriesTooltipTrigger === 'none' || seriesTooltipTrigger === false || seriesTooltipTrigger === 'item' || seriesTooltipShow === false || seriesModel.get(['axisPointer', 'show'], true) === false) {
      return;
    }
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(result.coordSysAxesInfo[makeKey(coordSys.model)], function (axisInfo) {
      var axis = axisInfo.axis;
      if (coordSys.getAxis(axis.dim) === axis) {
        axisInfo.seriesModels.push(seriesModel);
        axisInfo.seriesDataCount == null && (axisInfo.seriesDataCount = 0);
        axisInfo.seriesDataCount += seriesModel.getData().count();
      }
    });
  });
}
/**
 * For example:
 * {
 *     axisPointer: {
 *         links: [{
 *             xAxisIndex: [2, 4],
 *             yAxisIndex: 'all'
 *         }, {
 *             xAxisId: ['a5', 'a7'],
 *             xAxisName: 'xxx'
 *         }]
 *     }
 * }
 */
function getLinkGroupIndex(linksOption, axis) {
  var axisModel = axis.model;
  var dim = axis.dim;
  for (var i = 0; i < linksOption.length; i++) {
    var linkOption = linksOption[i] || {};
    if (checkPropInLink(linkOption[dim + 'AxisId'], axisModel.id) || checkPropInLink(linkOption[dim + 'AxisIndex'], axisModel.componentIndex) || checkPropInLink(linkOption[dim + 'AxisName'], axisModel.name)) {
      return i;
    }
  }
}
function checkPropInLink(linkPropValue, axisPropValue) {
  return linkPropValue === 'all' || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(linkPropValue) && (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.indexOf)(linkPropValue, axisPropValue) >= 0 || linkPropValue === axisPropValue;
}
function fixValue(axisModel) {
  var axisInfo = getAxisInfo(axisModel);
  if (!axisInfo) {
    return;
  }
  var axisPointerModel = axisInfo.axisPointerModel;
  var scale = axisInfo.axis.scale;
  var option = axisPointerModel.option;
  var status = axisPointerModel.get('status');
  var value = axisPointerModel.get('value');
  // Parse init value for category and time axis.
  if (value != null) {
    value = scale.parse(value);
  }
  var useHandle = isHandleTrigger(axisPointerModel);
  // If `handle` used, `axisPointer` will always be displayed, so value
  // and status should be initialized.
  if (status == null) {
    option.status = useHandle ? 'show' : 'hide';
  }
  var extent = scale.getExtent();
  if (
  // Pick a value on axis when initializing.
  value == null
  // If both `handle` and `dataZoom` are used, value may be out of axis extent,
  // where we should re-pick a value to keep `handle` displaying normally.
  || value > extent[1]) {
    // Make handle displayed on the end of the axis when init, which looks better.
    value = extent[1];
  }
  if (value < extent[0]) {
    value = extent[0];
  }
  option.value = value;
  if (useHandle) {
    option.status = axisInfo.axis.scale.isBlank() ? 'hide' : 'show';
  }
}
function getAxisInfo(axisModel) {
  var coordSysAxesInfo = (axisModel.ecModel.getComponent('axisPointer') || {}).coordSysAxesInfo;
  return coordSysAxesInfo && coordSysAxesInfo.axesInfo[makeKey(axisModel)];
}
function getAxisPointerModel(axisModel) {
  var axisInfo = getAxisInfo(axisModel);
  return axisInfo && axisInfo.axisPointerModel;
}
function isHandleTrigger(axisPointerModel) {
  return !!axisPointerModel.get(['handle', 'show']);
}
/**
 * @param {module:echarts/model/Model} model
 * @return {string} unique key
 */
function makeKey(model) {
  return model.type + '||' + model.id;
}

/***/ }),

/***/ 81837:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ fixNanhai)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _Region_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47904);

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
// Fix for 南海诸岛


var geoCoord = [126, 25];
var nanhaiName = '南海诸岛';
var points = [[[0, 3.5], [7, 11.2], [15, 11.9], [30, 7], [42, 0.7], [52, 0.7], [56, 7.7], [59, 0.7], [64, 0.7], [64, 0], [5, 0], [0, 3.5]], [[13, 16.1], [19, 14.7], [16, 21.7], [11, 23.1], [13, 16.1]], [[12, 32.2], [14, 38.5], [15, 38.5], [13, 32.2], [12, 32.2]], [[16, 47.6], [12, 53.2], [13, 53.2], [18, 47.6], [16, 47.6]], [[6, 64.4], [8, 70], [9, 70], [8, 64.4], [6, 64.4]], [[23, 82.6], [29, 79.8], [30, 79.8], [25, 82.6], [23, 82.6]], [[37, 70.7], [43, 62.3], [44, 62.3], [39, 70.7], [37, 70.7]], [[48, 51.1], [51, 45.5], [53, 45.5], [50, 51.1], [48, 51.1]], [[51, 35], [51, 28.7], [53, 28.7], [53, 35], [51, 35]], [[52, 22.4], [55, 17.5], [56, 17.5], [53, 22.4], [52, 22.4]], [[58, 12.6], [62, 7], [63, 7], [60, 12.6], [58, 12.6]], [[0, 3.5], [0, 93.1], [64, 93.1], [64, 0], [63, 0], [63, 92.4], [1, 92.4], [1, 3.5], [0, 3.5]]];
for (var i = 0; i < points.length; i++) {
  for (var k = 0; k < points[i].length; k++) {
    points[i][k][0] /= 10.5;
    points[i][k][1] /= -10.5 / 0.75;
    points[i][k][0] += geoCoord[0];
    points[i][k][1] += geoCoord[1];
  }
}
function fixNanhai(mapType, regions) {
  if (mapType === 'china') {
    for (var i = 0; i < regions.length; i++) {
      // Already exists.
      if (regions[i].name === nanhaiName) {
        return;
      }
    }
    regions.push(new _Region_js__WEBPACK_IMPORTED_MODULE_0__/* .GeoJSONRegion */ .cn(nanhaiName, zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map(points, function (exterior) {
      return {
        type: 'polygon',
        exterior: exterior
      };
    }), geoCoord));
  }
}

/***/ }),

/***/ 82419:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var _coord_parallel_parallelPreprocessor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(246);
/* harmony import */ var _ParallelView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80694);
/* harmony import */ var _coord_parallel_ParallelModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37838);
/* harmony import */ var _coord_parallel_parallelCreator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23347);
/* harmony import */ var _coord_axisModelCreator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6592);
/* harmony import */ var _coord_parallel_AxisModel_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43132);
/* harmony import */ var _axis_ParallelAxisView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(87781);
/* harmony import */ var _axis_parallelAxisAction_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50834);

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








var defaultAxisOption = {
  type: 'value',
  areaSelectStyle: {
    width: 20,
    borderWidth: 1,
    borderColor: 'rgba(160,197,232)',
    color: 'rgba(160,197,232)',
    opacity: 0.3
  },
  realtime: true,
  z: 10
};
function install(registers) {
  registers.registerComponentView(_ParallelView_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
  registers.registerComponentModel(_coord_parallel_ParallelModel_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay);
  registers.registerCoordinateSystem('parallel', _coord_parallel_parallelCreator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
  registers.registerPreprocessor(_coord_parallel_parallelPreprocessor_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);
  registers.registerComponentModel(_coord_parallel_AxisModel_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A);
  registers.registerComponentView(_axis_ParallelAxisView_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A);
  (0,_coord_axisModelCreator_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(registers, 'parallel', _coord_parallel_AxisModel_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, defaultAxisOption);
  (0,_axis_parallelAxisAction_js__WEBPACK_IMPORTED_MODULE_7__/* .installParallelActions */ .o)(registers);
}

/***/ }),

/***/ 84020:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fs: () => (/* binding */ convertToEC4StyleForCustomSerise),
/* harmony export */   ex: () => (/* binding */ isEC4CompatibleStyle),
/* harmony export */   lH: () => (/* binding */ convertFromEC4CompatibleStyle)
/* harmony export */ });
/* unused harmony export warnDeprecated */
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95615);

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


var deprecatedLogs = {};
/**
 * Whether need to call `convertEC4CompatibleStyle`.
 */
function isEC4CompatibleStyle(style, elType, hasOwnTextContentOption, hasOwnTextConfig) {
  // Since echarts5, `RectText` is separated from its host element and style.text
  // does not exist any more. The compat work brings some extra burden on performance.
  // So we provide:
  // `legacy: true` force make compat.
  // `legacy: false`, force do not compat.
  // `legacy` not set: auto detect whether legacy.
  //     But in this case we do not compat (difficult to detect and rare case):
  //     Because custom series and graphic component support "merge", users may firstly
  //     only set `textStrokeWidth` style or secondly only set `text`.
  return style && (style.legacy || style.legacy !== false && !hasOwnTextContentOption && !hasOwnTextConfig && elType !== 'tspan'
  // Difficult to detect whether legacy for a "text" el.
  && (elType === 'text' || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(style, 'text')));
}
/**
 * `EC4CompatibleStyle` is style that might be in echarts4 format or echarts5 format.
 * @param hostStyle The properties might be modified.
 * @return If be text el, `textContentStyle` and `textConfig` will not be returned.
 *         Otherwise a `textContentStyle` and `textConfig` will be created, whose props area
 *         retried from the `hostStyle`.
 */
function convertFromEC4CompatibleStyle(hostStyle, elType, isNormal) {
  var srcStyle = hostStyle;
  var textConfig;
  var textContent;
  var textContentStyle;
  if (elType === 'text') {
    textContentStyle = srcStyle;
  } else {
    textContentStyle = {};
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'text') && (textContentStyle.text = srcStyle.text);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'rich') && (textContentStyle.rich = srcStyle.rich);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'textFill') && (textContentStyle.fill = srcStyle.textFill);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'textStroke') && (textContentStyle.stroke = srcStyle.textStroke);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'fontFamily') && (textContentStyle.fontFamily = srcStyle.fontFamily);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'fontSize') && (textContentStyle.fontSize = srcStyle.fontSize);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'fontStyle') && (textContentStyle.fontStyle = srcStyle.fontStyle);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'fontWeight') && (textContentStyle.fontWeight = srcStyle.fontWeight);
    textContent = {
      type: 'text',
      style: textContentStyle,
      // ec4 does not support rectText trigger.
      // And when text position is different in normal and emphasis
      // => hover text trigger emphasis;
      // => text position changed, leave mouse pointer immediately;
      // That might cause incorrect state.
      silent: true
    };
    textConfig = {};
    var hasOwnPos = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'textPosition');
    if (isNormal) {
      textConfig.position = hasOwnPos ? srcStyle.textPosition : 'inside';
    } else {
      hasOwnPos && (textConfig.position = srcStyle.textPosition);
    }
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'textPosition') && (textConfig.position = srcStyle.textPosition);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'textOffset') && (textConfig.offset = srcStyle.textOffset);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'textRotation') && (textConfig.rotation = srcStyle.textRotation);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(srcStyle, 'textDistance') && (textConfig.distance = srcStyle.textDistance);
  }
  convertEC4CompatibleRichItem(textContentStyle, hostStyle);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(textContentStyle.rich, function (richItem) {
    convertEC4CompatibleRichItem(richItem, richItem);
  });
  return {
    textConfig: textConfig,
    textContent: textContent
  };
}
/**
 * The result will be set to `out`.
 */
function convertEC4CompatibleRichItem(out, richItem) {
  if (!richItem) {
    return;
  }
  // (1) For simplicity, make textXXX properties (deprecated since ec5) has
  // higher priority. For example, consider in ec4 `borderColor: 5, textBorderColor: 10`
  // on a rect means `borderColor: 4` on the rect and `borderColor: 10` on an attached
  // richText in ec5.
  // (2) `out === richItem` if and only if `out` is text el or rich item.
  // So we can overwrite existing props in `out` since textXXX has higher priority.
  richItem.font = richItem.textFont || richItem.font;
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textStrokeWidth') && (out.lineWidth = richItem.textStrokeWidth);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textAlign') && (out.align = richItem.textAlign);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textVerticalAlign') && (out.verticalAlign = richItem.textVerticalAlign);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textLineHeight') && (out.lineHeight = richItem.textLineHeight);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textWidth') && (out.width = richItem.textWidth);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textHeight') && (out.height = richItem.textHeight);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBackgroundColor') && (out.backgroundColor = richItem.textBackgroundColor);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textPadding') && (out.padding = richItem.textPadding);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBorderColor') && (out.borderColor = richItem.textBorderColor);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBorderWidth') && (out.borderWidth = richItem.textBorderWidth);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBorderRadius') && (out.borderRadius = richItem.textBorderRadius);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBoxShadowColor') && (out.shadowColor = richItem.textBoxShadowColor);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBoxShadowBlur') && (out.shadowBlur = richItem.textBoxShadowBlur);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBoxShadowOffsetX') && (out.shadowOffsetX = richItem.textBoxShadowOffsetX);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textBoxShadowOffsetY') && (out.shadowOffsetY = richItem.textBoxShadowOffsetY);
}
/**
 * Convert to pure echarts4 format style.
 * `itemStyle` will be modified, added with ec4 style properties from
 * `textStyle` and `textConfig`.
 *
 * [Caveat]: For simplicity, `insideRollback` in ec4 does not compat, where
 * `styleEmphasis: {textFill: 'red'}` will remove the normal auto added stroke.
 */
function convertToEC4StyleForCustomSerise(itemStl, txStl, txCfg) {
  var out = itemStl;
  // See `custom.ts`, a trick to set extra `textPosition` firstly.
  out.textPosition = out.textPosition || txCfg.position || 'inside';
  txCfg.offset != null && (out.textOffset = txCfg.offset);
  txCfg.rotation != null && (out.textRotation = txCfg.rotation);
  txCfg.distance != null && (out.textDistance = txCfg.distance);
  var isInside = out.textPosition.indexOf('inside') >= 0;
  var hostFill = itemStl.fill || _visual_tokens_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.color.neutral99;
  convertToEC4RichItem(out, txStl);
  var textFillNotSet = out.textFill == null;
  if (isInside) {
    if (textFillNotSet) {
      out.textFill = txCfg.insideFill || _visual_tokens_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.color.neutral00;
      !out.textStroke && txCfg.insideStroke && (out.textStroke = txCfg.insideStroke);
      !out.textStroke && (out.textStroke = hostFill);
      out.textStrokeWidth == null && (out.textStrokeWidth = 2);
    }
  } else {
    if (textFillNotSet) {
      out.textFill = itemStl.fill || txCfg.outsideFill || _visual_tokens_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.color.neutral00;
    }
    !out.textStroke && txCfg.outsideStroke && (out.textStroke = txCfg.outsideStroke);
  }
  out.text = txStl.text;
  out.rich = txStl.rich;
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(txStl.rich, function (richItem) {
    convertToEC4RichItem(richItem, richItem);
  });
  return out;
}
function convertToEC4RichItem(out, richItem) {
  if (!richItem) {
    return;
  }
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'fill') && (out.textFill = richItem.fill);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'stroke') && (out.textStroke = richItem.fill);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'lineWidth') && (out.textStrokeWidth = richItem.lineWidth);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'font') && (out.font = richItem.font);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'fontStyle') && (out.fontStyle = richItem.fontStyle);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'fontWeight') && (out.fontWeight = richItem.fontWeight);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'fontSize') && (out.fontSize = richItem.fontSize);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'fontFamily') && (out.fontFamily = richItem.fontFamily);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'align') && (out.textAlign = richItem.align);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'verticalAlign') && (out.textVerticalAlign = richItem.verticalAlign);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'lineHeight') && (out.textLineHeight = richItem.lineHeight);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'width') && (out.textWidth = richItem.width);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'height') && (out.textHeight = richItem.height);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'backgroundColor') && (out.textBackgroundColor = richItem.backgroundColor);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'padding') && (out.textPadding = richItem.padding);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'borderColor') && (out.textBorderColor = richItem.borderColor);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'borderWidth') && (out.textBorderWidth = richItem.borderWidth);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'borderRadius') && (out.textBorderRadius = richItem.borderRadius);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'shadowColor') && (out.textBoxShadowColor = richItem.shadowColor);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'shadowBlur') && (out.textBoxShadowBlur = richItem.shadowBlur);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'shadowOffsetX') && (out.textBoxShadowOffsetX = richItem.shadowOffsetX);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'shadowOffsetY') && (out.textBoxShadowOffsetY = richItem.shadowOffsetY);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textShadowColor') && (out.textShadowColor = richItem.textShadowColor);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textShadowBlur') && (out.textShadowBlur = richItem.textShadowBlur);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textShadowOffsetX') && (out.textShadowOffsetX = richItem.textShadowOffsetX);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(richItem, 'textShadowOffsetY') && (out.textShadowOffsetY = richItem.textShadowOffsetY);
}
function warnDeprecated(deprecated, insteadApproach) {
  if (false) { var key; }
}

/***/ }),

/***/ 86361:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ GeoSVGResource)
/* harmony export */ });
/* harmony import */ var zrender_lib_tool_parseSVG_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32744);
/* harmony import */ var zrender_lib_graphic_Group_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35980);
/* harmony import */ var zrender_lib_graphic_shape_Rect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19137);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30582);
/* harmony import */ var zrender_lib_tool_parseXML_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50755);
/* harmony import */ var _Region_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47904);

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
 * "region available" means that: enable users to set attribute `name="xxx"` on those tags
 * to make it be a region.
 * 1. region styles and its label styles can be defined in echarts opton:
 * ```js
 * geo: {
 *     regions: [{
 *         name: 'xxx',
 *         itemStyle: { ... },
 *         label: { ... }
 *     }, {
 *         ...
 *     },
 *     ...]
 * };
 * ```
 * 2. name can be duplicated in different SVG tag. All of the tags with the same name share
 * a region option. For exampel if there are two <path> representing two lung lobes. They have
 * no common parents but both of them need to display label "lung" inside.
 */
var REGION_AVAILABLE_SVG_TAG_MAP = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)(['rect', 'circle', 'line', 'ellipse', 'polygon', 'polyline', 'path',
// <text> <tspan> are also enabled because some SVG might paint text itself,
// but still need to trigger events or tooltip.
'text', 'tspan',
// <g> is also enabled because this case: if multiple tags share one name
// and need label displayed, every tags will display the name, which is not
// expected. So we can put them into a <g name="xxx">. Thereby only one label
// displayed and located based on the bounding rect of the <g>.
'g']);
var GeoSVGResource = /** @class */function () {
  function GeoSVGResource(mapName, svg) {
    this.type = 'geoSVG';
    // All used graphics. key: hostKey, value: root
    this._usedGraphicMap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
    // All unused graphics.
    this._freedGraphics = [];
    this._mapName = mapName;
    // Only perform parse to XML object here, which might be time
    // consiming for large SVG.
    // Although convert XML to zrender element is also time consiming,
    // if we do it here, the clone of zrender elements has to be
    // required. So we do it once for each geo instance, util real
    // performance issues call for optimizing it.
    this._parsedXML = (0,zrender_lib_tool_parseXML_js__WEBPACK_IMPORTED_MODULE_1__/* .parseXML */ .h)(svg);
  }
  GeoSVGResource.prototype.load = function /* nameMap: NameMap */
  () {
    // In the "load" stage, graphic need to be built to
    // get boundingRect for geo coordinate system.
    var firstGraphic = this._firstGraphic;
    // Create the return data structure only when first graphic created.
    // Because they will be used in geo coordinate system update stage,
    // and `regions` will be mounted at `geo` coordinate system,
    // in which there is no "view" info, so that it should better not to
    // make references to graphic elements.
    if (!firstGraphic) {
      firstGraphic = this._firstGraphic = this._buildGraphic(this._parsedXML);
      this._freedGraphics.push(firstGraphic);
      this._boundingRect = this._firstGraphic.boundingRect.clone();
      // PENDING: `nameMap` will not be supported until some real requirement come.
      // if (nameMap) {
      //     named = applyNameMap(named, nameMap);
      // }
      var _a = createRegions(firstGraphic.named),
        regions = _a.regions,
        regionsMap = _a.regionsMap;
      this._regions = regions;
      this._regionsMap = regionsMap;
    }
    return {
      boundingRect: this._boundingRect,
      regions: this._regions,
      regionsMap: this._regionsMap
    };
  };
  GeoSVGResource.prototype._buildGraphic = function (svgXML) {
    var result;
    var rootFromParse;
    try {
      result = svgXML && (0,zrender_lib_tool_parseSVG_js__WEBPACK_IMPORTED_MODULE_2__/* .parseSVG */ .cM)(svgXML, {
        ignoreViewBox: true,
        ignoreRootClip: true
      }) || {};
      rootFromParse = result.root;
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.assert)(rootFromParse != null);
    } catch (e) {
      throw new Error('Invalid svg format\n' + e.message);
    }
    // Note: we keep the covenant that the root has no transform. So always add an extra root.
    var root = new zrender_lib_graphic_Group_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
    root.add(rootFromParse);
    root.isGeoSVGGraphicRoot = true;
    // [THE_RULE_OF_VIEWPORT_AND_VIEWBOX]
    //
    // Consider: `<svg width="..." height="..." viewBox="...">`
    // - the `width/height` we call it `svgWidth/svgHeight` for short.
    // - `(0, 0, svgWidth, svgHeight)` defines the viewport of the SVG, or say,
    //   "viewport boundingRect", or `boundingRect` for short.
    // - `viewBox` defines the transform from the real content ot the viewport.
    //   `viewBox` has the same unit as the content of SVG.
    //   If `viewBox` exists, a transform is defined, so the unit of `svgWidth/svgHeight` become
    //   different from the content of SVG. Otherwise, they are the same.
    //
    // If both `svgWidth/svgHeight/viewBox` are specified in a SVG file, the transform rule will be:
    // 0. `boundingRect` is `(0, 0, svgWidth, svgHeight)`. Set it to Geo['_rect'] (View['_rect']).
    // 1. Make a transform from `viewBox` to `boundingRect`.
    //    Note: only support `preserveAspectRatio 'xMidYMid'` here. That is, this transform will preserve
    //    the aspect ratio.
    // 2. Make a transform from boundingRect to Geo['_viewRect'] (View['_viewRect'])
    //    (`Geo`/`View` will do this job).
    //    Note: this transform might not preserve aspect radio, which depending on how users specify
    //    viewRect in echarts option (e.g., `geo.left/top/width/height` will not preserve aspect ratio,
    //    but `geo.layoutCenter/layoutSize` will preserve aspect ratio).
    //
    // If `svgWidth/svgHeight` not specified, we use `viewBox` as the `boundingRect` to make the SVG
    // layout look good.
    //
    // If neither `svgWidth/svgHeight` nor `viewBox` are not specified, we calculate the boundingRect
    // of the SVG content and use them to make SVG layout look good.
    var svgWidth = result.width;
    var svgHeight = result.height;
    var viewBoxRect = result.viewBoxRect;
    var boundingRect = this._boundingRect;
    if (!boundingRect) {
      var bRectX = void 0;
      var bRectY = void 0;
      var bRectWidth = void 0;
      var bRectHeight = void 0;
      if (svgWidth != null) {
        bRectX = 0;
        bRectWidth = svgWidth;
      } else if (viewBoxRect) {
        bRectX = viewBoxRect.x;
        bRectWidth = viewBoxRect.width;
      }
      if (svgHeight != null) {
        bRectY = 0;
        bRectHeight = svgHeight;
      } else if (viewBoxRect) {
        bRectY = viewBoxRect.y;
        bRectHeight = viewBoxRect.height;
      }
      // If both viewBox and svgWidth/svgHeight not specified,
      // we have to determine how to layout those element to make them look good.
      if (bRectX == null || bRectY == null) {
        var calculatedBoundingRect = rootFromParse.getBoundingRect();
        if (bRectX == null) {
          bRectX = calculatedBoundingRect.x;
          bRectWidth = calculatedBoundingRect.width;
        }
        if (bRectY == null) {
          bRectY = calculatedBoundingRect.y;
          bRectHeight = calculatedBoundingRect.height;
        }
      }
      boundingRect = this._boundingRect = new zrender_lib_core_BoundingRect_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay(bRectX, bRectY, bRectWidth, bRectHeight);
    }
    if (viewBoxRect) {
      var viewBoxTransform = (0,zrender_lib_tool_parseSVG_js__WEBPACK_IMPORTED_MODULE_2__/* .makeViewBoxTransform */ .ps)(viewBoxRect, boundingRect);
      // Only support `preserveAspectRatio 'xMidYMid'`
      rootFromParse.scaleX = rootFromParse.scaleY = viewBoxTransform.scale;
      rootFromParse.x = viewBoxTransform.x;
      rootFromParse.y = viewBoxTransform.y;
    }
    // SVG needs to clip based on `viewBox`. And some SVG files really rely on this feature.
    // They do not strictly confine all of the content inside a display rect, but deliberately
    // use a `viewBox` to define a displayable rect.
    // PENDING:
    // The drawback of the `setClipPath` here is: the region label (genereted by echarts) near the
    // edge might also be clipped, because region labels are put as `textContent` of the SVG path.
    root.setClipPath(new zrender_lib_graphic_shape_Rect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A({
      shape: boundingRect.plain()
    }));
    var named = [];
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(result.named, function (namedItem) {
      if (REGION_AVAILABLE_SVG_TAG_MAP.get(namedItem.svgNodeTagLower) != null) {
        named.push(namedItem);
        setSilent(namedItem.el);
      }
    });
    return {
      root: root,
      boundingRect: boundingRect,
      named: named
    };
  };
  /**
   * Consider:
   * (1) One graphic element can not be shared by different `geoView` running simultaneously.
   *     Notice, also need to consider multiple echarts instances share a `mapRecord`.
   * (2) Converting SVG to graphic elements is time consuming.
   * (3) In the current architecture, `load` should be called frequently to get boundingRect,
   *     and it is called without view info.
   * So we maintain graphic elements in this module, and enables `view` to use/return these
   * graphics from/to the pool with it's uid.
   */
  GeoSVGResource.prototype.useGraphic = function (hostKey /* , nameMap: NameMap */) {
    var usedRootMap = this._usedGraphicMap;
    var svgGraphic = usedRootMap.get(hostKey);
    if (svgGraphic) {
      return svgGraphic;
    }
    svgGraphic = this._freedGraphics.pop()
    // use the first boundingRect to avoid duplicated boundingRect calculation.
    || this._buildGraphic(this._parsedXML);
    usedRootMap.set(hostKey, svgGraphic);
    // PENDING: `nameMap` will not be supported until some real requirement come.
    // `nameMap` can only be obtained from echarts option.
    // The original `named` must not be modified.
    // if (nameMap) {
    //     svgGraphic = extend({}, svgGraphic);
    //     svgGraphic.named = applyNameMap(svgGraphic.named, nameMap);
    // }
    return svgGraphic;
  };
  GeoSVGResource.prototype.freeGraphic = function (hostKey) {
    var usedRootMap = this._usedGraphicMap;
    var svgGraphic = usedRootMap.get(hostKey);
    if (svgGraphic) {
      usedRootMap.removeKey(hostKey);
      this._freedGraphics.push(svgGraphic);
    }
  };
  return GeoSVGResource;
}();

function setSilent(el) {
  // Only named element has silent: false, other elements should
  // act as background and has no user interaction.
  el.silent = false;
  // text|tspan will be converted to group.
  if (el.isGroup) {
    el.traverse(function (child) {
      child.silent = false;
    });
  }
}
function createRegions(named) {
  var regions = [];
  var regionsMap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
  // Create resions only for the first graphic.
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(named, function (namedItem) {
    // Region has feature to calculate center for tooltip or other features.
    // If there is a <g name="xxx">, the center should be the center of the
    // bounding rect of the g.
    if (namedItem.namedFrom != null) {
      return;
    }
    var region = new _Region_js__WEBPACK_IMPORTED_MODULE_6__/* .GeoSVGRegion */ .U5(namedItem.name, namedItem.el);
    // PENDING: if `nameMap` supported, this region can not be mounted on
    // `this`, but can only be created each time `load()` called.
    regions.push(region);
    // PENDING: if multiple tag named with the same name, only one will be
    // found by `_regionsMap`. `_regionsMap` is used to find a coordinate
    // by name. We use `region.getCenter()` as the coordinate.
    regionsMap.set(namedItem.name, region);
  });
  return {
    regions: regions,
    regionsMap: regionsMap
  };
}
// PENDING: `nameMap` will not be supported until some real requirement come.
// /**
//  * Use the alias in geoNameMap.
//  * The input `named` must not be modified.
//  */
// function applyNameMap(
//     named: GeoSVGGraphicRecord['named'],
//     nameMap: NameMap
// ): GeoSVGGraphicRecord['named'] {
//     const result = [] as GeoSVGGraphicRecord['named'];
//     for (let i = 0; i < named.length; i++) {
//         let regionGraphic = named[i];
//         const name = regionGraphic.name;
//         if (nameMap && nameMap.hasOwnProperty(name)) {
//             regionGraphic = extend({}, regionGraphic);
//             regionGraphic.name = name;
//         }
//         result.push(regionGraphic);
//     }
//     return result;
// }

/***/ }),

/***/ 86553:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ isGeoLikeCoordSys),
/* harmony export */   g: () => (/* binding */ isCoordinateSystemType)
/* harmony export */ });

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
function isCoordinateSystemType(coordSys, type) {
  return coordSys.type === type;
}
function isGeoLikeCoordSys(coordSys) {
  var dimensions = coordSys.dimensions;
  // Not use coordSys.type === 'geo' because coordSys maybe extended
  return dimensions[0] === 'lng' && dimensions[1] === 'lat' && !!coordSys.getViewRect;
}

/***/ }),

/***/ 86799:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42924);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29129);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13807);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12682);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2103);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95615);

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
 * Line path for bezier and straight line draw
 */



var straightLineProto = _util_graphic_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.prototype;
var bezierCurveProto = _util_graphic_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.prototype;
var StraightLineShape = /** @class */function () {
  function StraightLineShape() {
    // Start point
    this.x1 = 0;
    this.y1 = 0;
    // End point
    this.x2 = 0;
    this.y2 = 0;
    this.percent = 1;
  }
  return StraightLineShape;
}();
var CurveShape = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_2__/* .__extends */ .C6)(CurveShape, _super);
  function CurveShape() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return CurveShape;
}(StraightLineShape);
function isStraightLine(shape) {
  return isNaN(+shape.cpx1) || isNaN(+shape.cpy1);
}
var ECLinePath = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_2__/* .__extends */ .C6)(ECLinePath, _super);
  function ECLinePath(opts) {
    var _this = _super.call(this, opts) || this;
    _this.type = 'ec-line';
    return _this;
  }
  ECLinePath.prototype.getDefaultStyle = function () {
    return {
      stroke: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.color.neutral99,
      fill: null
    };
  };
  ECLinePath.prototype.getDefaultShape = function () {
    return new StraightLineShape();
  };
  ECLinePath.prototype.buildPath = function (ctx, shape) {
    if (isStraightLine(shape)) {
      straightLineProto.buildPath.call(this, ctx, shape);
    } else {
      bezierCurveProto.buildPath.call(this, ctx, shape);
    }
  };
  ECLinePath.prototype.pointAt = function (t) {
    if (isStraightLine(this.shape)) {
      return straightLineProto.pointAt.call(this, t);
    } else {
      return bezierCurveProto.pointAt.call(this, t);
    }
  };
  ECLinePath.prototype.tangentAt = function (t) {
    var shape = this.shape;
    var p = isStraightLine(shape) ? [shape.x2 - shape.x1, shape.y2 - shape.y1] : bezierCurveProto.tangentAt.call(this, t);
    return zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_4__.normalize(p, p);
  };
  return ECLinePath;
}(_util_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ECLinePath);

/***/ }),

/***/ 87617:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ sliderMove)
/* harmony export */ });
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84408);

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
 * Calculate slider move result.
 * Usage:
 * (1) If both handle0 and handle1 are needed to be moved, set minSpan the same as
 * maxSpan and the same as `Math.abs(handleEnd[1] - handleEnds[0])`.
 * (2) If handle0 is forbidden to cross handle1, set minSpan as `0`.
 *
 * [CAVEAT]
 *  This method is inefficient due to the use of `addSafe`.
 *
 * @param delta Move length.
 * @param handleEnds handleEnds[0] can be bigger then handleEnds[1].
 *              handleEnds will be modified in this method.
 * @param extent handleEnds is restricted by extent.
 *              extent[0] should less or equals than extent[1].
 * @param handleIndex Can be 'all', means that both move the two handleEnds.
 * @param minSpan The range of dataZoom can not be smaller than that.
 *              If not set, handle0 and cross handle1. If set as a non-negative
 *              number (including `0`), handles will push each other when reaching
 *              the minSpan.
 * @param maxSpan The range of dataZoom can not be larger than that.
 * @return The input handleEnds.
 */
function sliderMove(delta, handleEnds, extent, handleIndex, minSpan, maxSpan) {
  delta = delta || 0;
  // Consider `7.1e-9 - 7e-9` get `1.0000000000000007e-10`, so use `addSafe`
  // to remove rounding error whenever possible.
  var extentSpan = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_0__/* .addSafe */ .Tr)(extent[1], -extent[0]);
  // Notice maxSpan and minSpan can be null/undefined.
  if (minSpan != null) {
    minSpan = restrict(minSpan, [0, extentSpan]);
  }
  if (maxSpan != null) {
    maxSpan = Math.max(maxSpan, minSpan != null ? minSpan : 0);
  }
  if (handleIndex === 'all') {
    var handleSpan = Math.abs((0,_util_number_js__WEBPACK_IMPORTED_MODULE_0__/* .addSafe */ .Tr)(handleEnds[1], -handleEnds[0]));
    handleSpan = restrict(handleSpan, [0, extentSpan]);
    minSpan = maxSpan = restrict(handleSpan, [minSpan, maxSpan]);
    handleIndex = 0;
  }
  handleEnds[0] = restrict(handleEnds[0], extent);
  handleEnds[1] = restrict(handleEnds[1], extent);
  var originalDistSign = getSpanSign(handleEnds, handleIndex);
  handleEnds[handleIndex] += delta;
  // Restrict in extent.
  var extentMinSpan = minSpan || 0;
  var realExtent = extent.slice();
  originalDistSign.sign < 0 ? realExtent[0] = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_0__/* .addSafe */ .Tr)(realExtent[0], extentMinSpan) : realExtent[1] = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_0__/* .addSafe */ .Tr)(realExtent[1], -extentMinSpan);
  handleEnds[handleIndex] = restrict(handleEnds[handleIndex], realExtent);
  // Expand span.
  var currDistSign;
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (minSpan != null && (currDistSign.sign !== originalDistSign.sign || currDistSign.span < minSpan)) {
    // If minSpan exists, 'cross' is forbidden.
    handleEnds[1 - handleIndex] = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_0__/* .addSafe */ .Tr)(handleEnds[handleIndex], originalDistSign.sign * minSpan);
  }
  // Shrink span.
  currDistSign = getSpanSign(handleEnds, handleIndex);
  if (maxSpan != null && currDistSign.span > maxSpan) {
    handleEnds[1 - handleIndex] = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_0__/* .addSafe */ .Tr)(handleEnds[handleIndex], currDistSign.sign * maxSpan);
  }
  return handleEnds;
}
function getSpanSign(handleEnds, handleIndex) {
  var dist = handleEnds[handleIndex] - handleEnds[1 - handleIndex];
  // If `handleEnds[0] === handleEnds[1]`, always believe that handleEnd[0]
  // is at left of handleEnds[1] for non-cross case.
  return {
    span: Math.abs(dist),
    sign: dist > 0 ? -1 : dist < 0 ? 1 : handleIndex ? -1 : 1
  };
}
function restrict(value, extend) {
  return Math.min(extend[1] != null ? extend[1] : Infinity, Math.max(extend[0] != null ? extend[0] : -Infinity, value));
}

/***/ }),

/***/ 87781:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11916);
/* harmony import */ var _AxisBuilder_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46678);
/* harmony import */ var _helper_BrushController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(94907);
/* harmony import */ var _helper_brushHelper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(32284);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35980);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(88367);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30582);
/* harmony import */ var _view_Component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26349);

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







var ParallelAxisView = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .C6)(ParallelAxisView, _super);
  function ParallelAxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = ParallelAxisView.type;
    return _this;
  }
  ParallelAxisView.prototype.init = function (ecModel, api) {
    _super.prototype.init.apply(this, arguments);
    (this._brushController = new _helper_BrushController_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(api.getZr())).on('brush', zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.bind(this._onBrush, this));
  };
  ParallelAxisView.prototype.render = function (axisModel, ecModel, api, payload) {
    if (fromAxisAreaSelect(axisModel, ecModel, payload)) {
      return;
    }
    this.axisModel = axisModel;
    this.api = api;
    this.group.removeAll();
    var oldAxisGroup = this._axisGroup;
    this._axisGroup = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
    this.group.add(this._axisGroup);
    if (!axisModel.get('show')) {
      return;
    }
    var coordSysModel = getCoordSysModel(axisModel, ecModel);
    var coordSys = coordSysModel.coordinateSystem;
    var areaSelectStyle = axisModel.getAreaSelectStyle();
    var areaWidth = areaSelectStyle.width;
    var dim = axisModel.axis.dim;
    var axisLayout = coordSys.getAxisLayout(dim);
    var builderOpt = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.extend({
      strokeContainThreshold: areaWidth
    }, axisLayout);
    var axisBuilder = new _AxisBuilder_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay(axisModel, api, builderOpt);
    axisBuilder.build();
    this._axisGroup.add(axisBuilder.group);
    this._refreshBrushController(builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api);
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__.groupTransition(oldAxisGroup, this._axisGroup, axisModel);
  };
  // /**
  //  * @override
  //  */
  // updateVisual(axisModel, ecModel, api, payload) {
  //     this._brushController && this._brushController
  //         .updateCovers(getCoverInfoList(axisModel));
  // }
  ParallelAxisView.prototype._refreshBrushController = function (builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api) {
    // After filtering, axis may change, select area needs to be update.
    var extent = axisModel.axis.getExtent();
    var extentLen = extent[1] - extent[0];
    var extra = Math.min(30, Math.abs(extentLen) * 0.1); // Arbitrary value.
    // width/height might be negative, which will be
    // normalized in BoundingRect.
    var rect = _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Ay.create({
      x: extent[0],
      y: -areaWidth / 2,
      width: extentLen,
      height: areaWidth
    });
    rect.x -= extra;
    rect.width += 2 * extra;
    this._brushController.mount({
      enableGlobalPan: true,
      rotation: builderOpt.rotation,
      x: builderOpt.position[0],
      y: builderOpt.position[1]
    }).setPanels([{
      panelId: 'pl',
      clipPath: _helper_brushHelper_js__WEBPACK_IMPORTED_MODULE_7__/* .makeRectPanelClipPath */ .wd(rect),
      isTargetByCursor: _helper_brushHelper_js__WEBPACK_IMPORTED_MODULE_7__/* .makeRectIsTargetByCursor */ .x$(rect, api, coordSysModel),
      getLinearBrushOtherExtent: _helper_brushHelper_js__WEBPACK_IMPORTED_MODULE_7__/* .makeLinearBrushOtherExtent */ .wx(rect, 0)
    }]).enableBrush({
      brushType: 'lineX',
      brushStyle: areaSelectStyle,
      removeOnClick: true
    }).updateCovers(getCoverInfoList(axisModel));
  };
  ParallelAxisView.prototype._onBrush = function (eventParam) {
    var coverInfoList = eventParam.areas;
    // Do not cache these object, because the mey be changed.
    var axisModel = this.axisModel;
    var axis = axisModel.axis;
    var intervals = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.map(coverInfoList, function (coverInfo) {
      return [axis.coordToData(coverInfo.range[0], true), axis.coordToData(coverInfo.range[1], true)];
    });
    // If realtime is true, action is not dispatched on drag end, because
    // the drag end emits the same params with the last drag move event,
    // and may have some delay when using touch pad.
    if (!axisModel.option.realtime === eventParam.isEnd || eventParam.removeOnClick) {
      // jshint ignore:line
      this.api.dispatchAction({
        type: 'axisAreaSelect',
        parallelAxisId: axisModel.id,
        intervals: intervals
      });
    }
  };
  ParallelAxisView.prototype.dispose = function () {
    this._brushController.dispose();
  };
  ParallelAxisView.type = 'parallelAxis';
  return ParallelAxisView;
}(_view_Component_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A);
function fromAxisAreaSelect(axisModel, ecModel, payload) {
  return payload && payload.type === 'axisAreaSelect' && ecModel.findComponents({
    mainType: 'parallelAxis',
    query: payload
  })[0] === axisModel;
}
function getCoverInfoList(axisModel) {
  var axis = axisModel.axis;
  return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_2__.map(axisModel.activeIntervals, function (interval) {
    return {
      brushType: 'lineX',
      panelId: 'pl',
      range: [axis.dataToCoord(interval[0], true), axis.dataToCoord(interval[1], true)]
    };
  });
}
function getCoordSysModel(axisModel, ecModel) {
  return ecModel.getComponent('parallel', axisModel.get('parallelIndex'));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ParallelAxisView);

/***/ }),

/***/ 92161:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ getAxisBreakHelper)
/* harmony export */ });
/* unused harmony export registerAxisBreakHelperImpl */

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
var _impl = null;
function registerAxisBreakHelperImpl(impl) {
  if (!_impl) {
    _impl = impl;
  }
}
function getAxisBreakHelper() {
  return _impl;
}

/***/ }),

/***/ 93345:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);

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

var Cartesian = /** @class */function () {
  function Cartesian(name) {
    this.type = 'cartesian';
    this._dimList = [];
    this._axes = {};
    this.name = name || '';
  }
  Cartesian.prototype.getAxis = function (dim) {
    return this._axes[dim];
  };
  Cartesian.prototype.getAxes = function () {
    return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.map(this._dimList, function (dim) {
      return this._axes[dim];
    }, this);
  };
  Cartesian.prototype.getAxesByScale = function (scaleType) {
    scaleType = scaleType.toLowerCase();
    return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.filter(this.getAxes(), function (axis) {
      return axis.scale.type === scaleType;
    });
  };
  Cartesian.prototype.addAxis = function (axis) {
    var dim = axis.dim;
    this._axes[dim] = axis;
    this._dimList.push(dim);
  };
  return Cartesian;
}();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cartesian);

/***/ }),

/***/ 94126:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   C9: () => (/* binding */ COORD_SYS_TYPE_RADAR),
/* harmony export */   Wd: () => (/* binding */ SERIES_TYPE_RADAR),
/* harmony export */   _5: () => (/* binding */ RADAR_DEFAULT_SPLIT_NUMBER),
/* harmony export */   ql: () => (/* binding */ COMPONENT_TYPE_RADAR)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var _axisDefault_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56664);
/* harmony import */ var _model_Model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(77571);
/* harmony import */ var _axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80222);
/* harmony import */ var _model_Component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(79057);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(95615);
/* harmony import */ var _util_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83884);

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








var valueAxisDefault = _axisDefault_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.value;
var COORD_SYS_TYPE_RADAR = 'radar';
var COMPONENT_TYPE_RADAR = COORD_SYS_TYPE_RADAR;
var SERIES_TYPE_RADAR = COORD_SYS_TYPE_RADAR;
var RADAR_DEFAULT_SPLIT_NUMBER = 5;
function defaultsShow(opt, show) {
  return zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults({
    show: show
  }, opt);
}
var RadarModel = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_2__/* .__extends */ .C6)(RadarModel, _super);
  function RadarModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = RadarModel.type;
    return _this;
  }
  RadarModel.prototype.optionUpdated = function () {
    var boundaryGap = this.get('boundaryGap');
    var splitNumber = this.get('splitNumber');
    var clockwise = this.get('clockwise');
    var scale = this.get('scale');
    var axisLine = this.get('axisLine');
    var axisTick = this.get('axisTick');
    // let axisType = this.get('axisType');
    var axisLabel = this.get('axisLabel');
    var nameTextStyle = this.get('axisName');
    var showName = this.get(['axisName', 'show']);
    var nameFormatter = this.get(['axisName', 'formatter']);
    var nameGap = this.get('axisNameGap');
    var triggerEvent = this.get('triggerEvent');
    var indicatorModels = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.map(this.get('indicator') || [], function (indicatorOpt) {
      // PENDING
      if (indicatorOpt.max != null && indicatorOpt.max > 0 && !indicatorOpt.min) {
        indicatorOpt.min = 0;
      } else if (indicatorOpt.min != null && indicatorOpt.min < 0 && !indicatorOpt.max) {
        indicatorOpt.max = 0;
      }
      var iNameTextStyle = nameTextStyle;
      if (indicatorOpt.color != null) {
        iNameTextStyle = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.defaults({
          color: indicatorOpt.color
        }, nameTextStyle);
      }
      // Use same configuration
      var innerIndicatorOpt = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge(zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.clone(indicatorOpt), {
        boundaryGap: boundaryGap,
        splitNumber: splitNumber,
        clockwise: clockwise,
        scale: scale,
        axisLine: axisLine,
        axisTick: axisTick,
        // axisType: axisType,
        axisLabel: axisLabel,
        // Compatible with 2 and use text
        name: indicatorOpt.text,
        showName: showName,
        nameLocation: 'end',
        nameGap: nameGap,
        // min: 0,
        nameTextStyle: iNameTextStyle,
        triggerEvent: triggerEvent
      }, false);
      if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isString(nameFormatter)) {
        var indName = innerIndicatorOpt.name;
        innerIndicatorOpt.name = nameFormatter.replace('{value}', indName != null ? indName : '');
      } else if (zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(nameFormatter)) {
        innerIndicatorOpt.name = nameFormatter(innerIndicatorOpt.name, innerIndicatorOpt);
      }
      var model = new _model_Model_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(innerIndicatorOpt, null, this.ecModel);
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.mixin(model, _axisModelCommonMixin_js__WEBPACK_IMPORTED_MODULE_4__/* .AxisModelCommonMixin */ .L.prototype);
      // For triggerEvent.
      model.mainType = 'radar';
      model.componentIndex = this.componentIndex;
      // FIXME: construct an AxisBaseModel directly, rather than mixin.
      // @ts-ignore
      model.uid = (0,_util_component_js__WEBPACK_IMPORTED_MODULE_5__/* .getUID */ .$Q)('ec_radar');
      return model;
    }, this);
    this._indicatorModels = indicatorModels;
  };
  RadarModel.prototype.getIndicatorModels = function () {
    return this._indicatorModels;
  };
  RadarModel.type = COMPONENT_TYPE_RADAR;
  RadarModel.defaultOption = {
    // zlevel: 0,
    z: 0,
    center: ['50%', '50%'],
    radius: '50%',
    startAngle: 90,
    clockwise: false,
    axisName: {
      show: true,
      color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.color.axisLabel
      // formatter: null
      // textStyle: {}
    },
    boundaryGap: [0, 0],
    splitNumber: RADAR_DEFAULT_SPLIT_NUMBER,
    axisNameGap: 15,
    scale: false,
    // Polygon or circle
    shape: 'polygon',
    axisLine: zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.merge({
      lineStyle: {
        color: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.color.neutral20
      }
    }, valueAxisDefault.axisLine),
    axisLabel: defaultsShow(valueAxisDefault.axisLabel, false),
    axisTick: defaultsShow(valueAxisDefault.axisTick, false),
    // axisType: 'value',
    splitLine: defaultsShow(valueAxisDefault.splitLine, true),
    splitArea: defaultsShow(valueAxisDefault.splitArea, true),
    // {text, min, max}
    indicator: []
  };
  return RadarModel;
}(_model_Component_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadarModel);

/***/ }),

/***/ 94177:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var _coord_geo_GeoModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13958);
/* harmony import */ var _coord_geo_geoCreator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45835);
/* harmony import */ var _util_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66402);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11916);
/* harmony import */ var _chart_map_MapSeries_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(60818);
/* harmony import */ var _GeoView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(74614);
/* harmony import */ var _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67023);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11138);
/* harmony import */ var _coord_View_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(55103);

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









function registerMap(mapName, geoJson, specialAreas) {
  _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.registerMap(mapName, geoJson, specialAreas);
}
function install(registers) {
  registers.registerCoordinateSystem('geo', _coord_geo_geoCreator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A);
  registers.registerComponentModel(_coord_geo_GeoModel_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A);
  registers.registerComponentView(_GeoView_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);
  registers.registerImpl('registerMap', registerMap);
  registers.registerImpl('getMap', function (mapName) {
    return _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getMapForUser(mapName);
  });
  function makeAction(method, actionInfo) {
    actionInfo.update = 'geo:updateSelectStatus';
    registers.registerAction(actionInfo, function (payload, ecModel) {
      var selected = {};
      var allSelected = [];
      ecModel.eachComponent({
        mainType: 'geo',
        query: payload
      }, function (geoModel) {
        geoModel[method](payload.name);
        var geo = geoModel.coordinateSystem;
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each)(geo.regions, function (region) {
          selected[region.name] = geoModel.isSelected(region.name) || false;
        });
        // Notice: there might be duplicated name in different regions.
        var names = [];
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_4__.each)(selected, function (v, name) {
          selected[name] && names.push(name);
        });
        allSelected.push({
          geoIndex: geoModel.componentIndex,
          // Use singular, the same naming convention as the event `selectchanged`.
          name: names
        });
      });
      return {
        selected: selected,
        allSelected: allSelected,
        name: payload.name
      };
    });
  }
  makeAction('toggleSelected', {
    type: 'geoToggleSelect',
    event: 'geoselectchanged'
  });
  makeAction('select', {
    type: 'geoSelect',
    event: 'geoselected'
  });
  makeAction('unSelect', {
    type: 'geoUnSelect',
    event: 'geounselected'
  });
  /**
   * @payload
   * @property {string} [componentType=series]
   * @property {number} [dx]
   * @property {number} [dy]
   * @property {number} [zoom]
   * @property {number} [originX]
   * @property {number} [originY]
   */
  registers.registerAction({
    type: 'geoRoam',
    event: 'geoRoam',
    update: 'updateTransform'
  }, function (payload, ecModel, api) {
    // `payload.componentType` is supported only for backward compatibility.
    var mainType = payload.componentType || (payload.geoId != null || payload.geoName != null || payload.geoIndex != null ? 'geo' : _util_types_js__WEBPACK_IMPORTED_MODULE_5__/* .COMPONENT_MAIN_TYPE_SERIES */ .t7);
    var isSeries = mainType === _util_types_js__WEBPACK_IMPORTED_MODULE_5__/* .COMPONENT_MAIN_TYPE_SERIES */ .t7;
    if (mainType !== 'geo' && !isSeries) {
      return;
    }
    var subType = isSeries ? 'map' : null;
    ecModel.eachComponent((0,_util_model_js__WEBPACK_IMPORTED_MODULE_6__/* .makeQueryConditionKindA */ .dr)(payload, mainType, subType), function (componentOrSeries) {
      if (isSeries
      // Only when `needsDrawMap: true`, the `MapSeries` host geo coord sys and call `MapDraw`.
      && !(0,_chart_map_MapSeries_js__WEBPACK_IMPORTED_MODULE_7__/* .mapSeriesNeedsDrawMap */ .PI)(componentOrSeries)) {
        return;
      }
      // Since 'updateTransform' is used, geo model and view update firstly here, and then series
      // and components laid out on this VIEW_COORD_SYS update in `View['updateTransform']`.
      (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_8__/* .ownRoamModelCoordSysUpdateInAction */ .X$)(payload, componentOrSeries, isSeries ? componentOrSeries.seriesGroup.r : null);
      (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_8__/* .ownRoamViewUpdateDirectlyInAction */ .jR)(payload, componentOrSeries, ecModel, api);
    });
  });
}

/***/ }),

/***/ 94907:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42924);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11916);
/* harmony import */ var zrender_lib_core_Eventful_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(34463);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35980);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(19137);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(88367);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15451);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(89487);
/* harmony import */ var _interactionMutex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34906);
/* harmony import */ var _data_DataDiffer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11645);
/* harmony import */ var _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95615);

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







var BRUSH_PANEL_GLOBAL = true;
var mathMin = Math.min;
var mathMax = Math.max;
var mathPow = Math.pow;
var COVER_Z = 10000;
var UNSELECT_THRESHOLD = 6;
var MIN_RESIZE_LINE_WIDTH = 6;
var MUTEX_RESOURCE_KEY = 'globalPan';
var DIRECTION_MAP = {
  w: [0, 0],
  e: [0, 1],
  n: [1, 0],
  s: [1, 1]
};
var CURSOR_MAP = {
  w: 'ew',
  e: 'ew',
  n: 'ns',
  s: 'ns',
  ne: 'nesw',
  sw: 'nesw',
  nw: 'nwse',
  se: 'nwse'
};
var DEFAULT_BRUSH_OPT = {
  brushStyle: {
    lineWidth: 2,
    stroke: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.backgroundTint,
    fill: _visual_tokens_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.color.borderTint
  },
  transformable: true,
  brushMode: 'single',
  removeOnClick: false
};
var baseUID = 0;
/**
 * params:
 *     areas: Array.<Array>, coord relates to container group,
 *                             If no container specified, to global.
 *     opt {
 *         isEnd: boolean,
 *         removeOnClick: boolean
 *     }
 */
var BrushController = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__/* .__extends */ .C6)(BrushController, _super);
  function BrushController(zr) {
    var _this = _super.call(this) || this;
    /**
     * @internal
     */
    _this._track = [];
    /**
     * @internal
     */
    _this._covers = [];
    _this._handlers = {};
    if (false) {}
    _this._zr = zr;
    _this.group = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
    _this._uid = 'brushController_' + baseUID++;
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(pointerHandlers, function (handler, eventName) {
      this._handlers[eventName] = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.bind)(handler, this);
    }, _this);
    return _this;
  }
  /**
   * If set to `false`, select disabled.
   */
  BrushController.prototype.enableBrush = function (brushOption) {
    if (false) {}
    this._brushType && this._doDisableBrush();
    brushOption.brushType && this._doEnableBrush(brushOption);
    return this;
  };
  BrushController.prototype._doEnableBrush = function (brushOption) {
    var zr = this._zr;
    // Consider roam, which takes globalPan too.
    if (!this._enableGlobalPan) {
      _interactionMutex_js__WEBPACK_IMPORTED_MODULE_4__/* .take */ .s(zr, MUTEX_RESOURCE_KEY, this._uid);
    }
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(this._handlers, function (handler, eventName) {
      zr.on(eventName, handler);
    });
    this._brushType = brushOption.brushType;
    this._brushOption = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.merge)((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.clone)(DEFAULT_BRUSH_OPT), brushOption, true);
  };
  BrushController.prototype._doDisableBrush = function () {
    var zr = this._zr;
    _interactionMutex_js__WEBPACK_IMPORTED_MODULE_4__/* .release */ ._r(zr, MUTEX_RESOURCE_KEY, this._uid);
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(this._handlers, function (handler, eventName) {
      zr.off(eventName, handler);
    });
    this._brushType = this._brushOption = null;
  };
  /**
   * @param panelOpts If not pass, it is global brush.
   */
  BrushController.prototype.setPanels = function (panelOpts) {
    if (panelOpts && panelOpts.length) {
      var panels_1 = this._panels = {};
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(panelOpts, function (panelOpts) {
        panels_1[panelOpts.panelId] = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.clone)(panelOpts);
      });
    } else {
      this._panels = null;
    }
    return this;
  };
  BrushController.prototype.mount = function (opt) {
    opt = opt || {};
    if (false) {}
    this._enableGlobalPan = opt.enableGlobalPan;
    var thisGroup = this.group;
    this._zr.add(thisGroup);
    thisGroup.attr({
      x: opt.x || 0,
      y: opt.y || 0,
      rotation: opt.rotation || 0,
      scaleX: opt.scaleX || 1,
      scaleY: opt.scaleY || 1
    });
    this._transform = thisGroup.getLocalTransform();
    return this;
  };
  // eachCover(cb, context): void {
  //     each(this._covers, cb, context);
  // }
  /**
   * Update covers.
   * @param coverConfigList
   *        If coverConfigList is null/undefined, all covers removed.
   */
  BrushController.prototype.updateCovers = function (coverConfigList) {
    if (false) {}
    coverConfigList = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.map)(coverConfigList, function (coverConfig) {
      return (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.merge)((0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.clone)(DEFAULT_BRUSH_OPT), coverConfig, true);
    });
    var tmpIdPrefix = '\0-brush-index-';
    var oldCovers = this._covers;
    var newCovers = this._covers = [];
    var controller = this;
    var creatingCover = this._creatingCover;
    new _data_DataDiffer_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A(oldCovers, coverConfigList, oldGetKey, getKey).add(addOrUpdate).update(addOrUpdate).remove(remove).execute();
    return this;
    function getKey(brushOption, index) {
      return (brushOption.id != null ? brushOption.id : tmpIdPrefix + index) + '-' + brushOption.brushType;
    }
    function oldGetKey(cover, index) {
      return getKey(cover.__brushOption, index);
    }
    function addOrUpdate(newIndex, oldIndex) {
      var newBrushInternal = coverConfigList[newIndex];
      // Consider setOption in event listener of brushSelect,
      // where updating cover when creating should be forbidden.
      if (oldIndex != null && oldCovers[oldIndex] === creatingCover) {
        newCovers[newIndex] = oldCovers[oldIndex];
      } else {
        var cover = newCovers[newIndex] = oldIndex != null ? (oldCovers[oldIndex].__brushOption = newBrushInternal, oldCovers[oldIndex]) : endCreating(controller, createCover(controller, newBrushInternal));
        updateCoverAfterCreation(controller, cover);
      }
    }
    function remove(oldIndex) {
      if (oldCovers[oldIndex] !== creatingCover) {
        controller.group.remove(oldCovers[oldIndex]);
      }
    }
  };
  BrushController.prototype.unmount = function () {
    if (false) {}
    this.enableBrush(false);
    // container may 'removeAll' outside.
    clearCovers(this);
    this._zr.remove(this.group);
    if (false) {}
    return this;
  };
  BrushController.prototype.dispose = function () {
    this.unmount();
    this.off();
  };
  return BrushController;
}(zrender_lib_core_Eventful_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A);
function createCover(controller, brushOption) {
  var cover = coverRenderers[brushOption.brushType].createCover(controller, brushOption);
  cover.__brushOption = brushOption;
  updateZ(cover, brushOption);
  controller.group.add(cover);
  return cover;
}
function endCreating(controller, creatingCover) {
  var coverRenderer = getCoverRenderer(creatingCover);
  if (coverRenderer.endCreating) {
    coverRenderer.endCreating(controller, creatingCover);
    updateZ(creatingCover, creatingCover.__brushOption);
  }
  return creatingCover;
}
function updateCoverShape(controller, cover) {
  var brushOption = cover.__brushOption;
  getCoverRenderer(cover).updateCoverShape(controller, cover, brushOption.range, brushOption);
}
function updateZ(cover, brushOption) {
  var z = brushOption.z;
  z == null && (z = COVER_Z);
  cover.traverse(function (el) {
    el.z = z;
    el.z2 = z; // Consider in given container.
  });
}
function updateCoverAfterCreation(controller, cover) {
  getCoverRenderer(cover).updateCommon(controller, cover);
  updateCoverShape(controller, cover);
}
function getCoverRenderer(cover) {
  return coverRenderers[cover.__brushOption.brushType];
}
// return target panel or `true` (means global panel)
function getPanelByPoint(controller, e, localCursorPoint) {
  var panels = controller._panels;
  if (!panels) {
    return BRUSH_PANEL_GLOBAL; // Global panel
  }
  var panel;
  var transform = controller._transform;
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(panels, function (pn) {
    pn.isTargetByCursor(e, localCursorPoint, transform) && (panel = pn);
  });
  return panel;
}
// Return a panel or true
function getPanelByCover(controller, cover) {
  var panels = controller._panels;
  if (!panels) {
    return BRUSH_PANEL_GLOBAL; // Global panel
  }
  var panelId = cover.__brushOption.panelId;
  // User may give cover without coord sys info,
  // which is then treated as global panel.
  return panelId != null ? panels[panelId] : BRUSH_PANEL_GLOBAL;
}
function clearCovers(controller) {
  var covers = controller._covers;
  var originalLength = covers.length;
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(covers, function (cover) {
    controller.group.remove(cover);
  }, controller);
  covers.length = 0;
  return !!originalLength;
}
function trigger(controller, opt) {
  var areas = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.map)(controller._covers, function (cover) {
    var brushOption = cover.__brushOption;
    var range = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.clone)(brushOption.range);
    return {
      brushType: brushOption.brushType,
      panelId: brushOption.panelId,
      range: range
    };
  });
  controller.trigger('brush', {
    areas: areas,
    isEnd: !!opt.isEnd,
    removeOnClick: !!opt.removeOnClick
  });
}
function shouldShowCover(controller) {
  var track = controller._track;
  if (!track.length) {
    return false;
  }
  var p2 = track[track.length - 1];
  var p1 = track[0];
  var dx = p2[0] - p1[0];
  var dy = p2[1] - p1[1];
  var dist = mathPow(dx * dx + dy * dy, 0.5);
  return dist > UNSELECT_THRESHOLD;
}
function getTrackEnds(track) {
  var tail = track.length - 1;
  tail < 0 && (tail = 0);
  return [track[0], track[tail]];
}
;
function createBaseRectCover(rectRangeConverter, controller, brushOption, edgeNameSequences) {
  var cover = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
  cover.add(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A({
    name: 'main',
    style: makeStyle(brushOption),
    silent: true,
    draggable: true,
    cursor: 'move',
    drift: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.curry)(driftRect, rectRangeConverter, controller, cover, ['n', 's', 'w', 'e']),
    ondragend: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.curry)(trigger, controller, {
      isEnd: true
    })
  }));
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(edgeNameSequences, function (nameSequence) {
    cover.add(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A({
      name: nameSequence.join(''),
      style: {
        opacity: 0
      },
      draggable: true,
      silent: true,
      invisible: true,
      drift: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.curry)(driftRect, rectRangeConverter, controller, cover, nameSequence),
      ondragend: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.curry)(trigger, controller, {
        isEnd: true
      })
    }));
  });
  return cover;
}
function updateBaseRect(controller, cover, localRange, brushOption) {
  var lineWidth = brushOption.brushStyle.lineWidth || 0;
  var handleSize = mathMax(lineWidth, MIN_RESIZE_LINE_WIDTH);
  var x = localRange[0][0];
  var y = localRange[1][0];
  var xa = x - lineWidth / 2;
  var ya = y - lineWidth / 2;
  var x2 = localRange[0][1];
  var y2 = localRange[1][1];
  var x2a = x2 - handleSize + lineWidth / 2;
  var y2a = y2 - handleSize + lineWidth / 2;
  var width = x2 - x;
  var height = y2 - y;
  var widtha = width + lineWidth;
  var heighta = height + lineWidth;
  updateRectShape(controller, cover, 'main', x, y, width, height);
  if (brushOption.transformable) {
    updateRectShape(controller, cover, 'w', xa, ya, handleSize, heighta);
    updateRectShape(controller, cover, 'e', x2a, ya, handleSize, heighta);
    updateRectShape(controller, cover, 'n', xa, ya, widtha, handleSize);
    updateRectShape(controller, cover, 's', xa, y2a, widtha, handleSize);
    updateRectShape(controller, cover, 'nw', xa, ya, handleSize, handleSize);
    updateRectShape(controller, cover, 'ne', x2a, ya, handleSize, handleSize);
    updateRectShape(controller, cover, 'sw', xa, y2a, handleSize, handleSize);
    updateRectShape(controller, cover, 'se', x2a, y2a, handleSize, handleSize);
  }
}
function updateCommon(controller, cover) {
  var brushOption = cover.__brushOption;
  var transformable = brushOption.transformable;
  var mainEl = cover.childAt(0);
  mainEl.useStyle(makeStyle(brushOption));
  mainEl.attr({
    silent: !transformable,
    cursor: transformable ? 'move' : 'default'
  });
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)([['w'], ['e'], ['n'], ['s'], ['s', 'e'], ['s', 'w'], ['n', 'e'], ['n', 'w']], function (nameSequence) {
    var el = cover.childOfName(nameSequence.join(''));
    var globalDir = nameSequence.length === 1 ? getGlobalDirection1(controller, nameSequence[0]) : getGlobalDirection2(controller, nameSequence);
    el && el.attr({
      silent: !transformable,
      invisible: !transformable,
      cursor: transformable ? CURSOR_MAP[globalDir] + '-resize' : null
    });
  });
}
function updateRectShape(controller, cover, name, x, y, w, h) {
  var el = cover.childOfName(name);
  el && el.setShape(pointsToRect(clipByPanel(controller, cover, [[x, y], [x + w, y + h]])));
}
function makeStyle(brushOption) {
  return (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.defaults)({
    strokeNoScale: true
  }, brushOption.brushStyle);
}
function formatRectRange(x, y, x2, y2) {
  var min = [mathMin(x, x2), mathMin(y, y2)];
  var max = [mathMax(x, x2), mathMax(y, y2)];
  return [[min[0], max[0]], [min[1], max[1]] // y range
  ];
}
function getTransform(controller) {
  return _util_graphic_js__WEBPACK_IMPORTED_MODULE_8__.getTransform(controller.group);
}
function getGlobalDirection1(controller, localDirName) {
  var map = {
    w: 'left',
    e: 'right',
    n: 'top',
    s: 'bottom'
  };
  var inverseMap = {
    left: 'w',
    right: 'e',
    top: 'n',
    bottom: 's'
  };
  var dir = _util_graphic_js__WEBPACK_IMPORTED_MODULE_8__.transformDirection(map[localDirName], getTransform(controller));
  return inverseMap[dir];
}
function getGlobalDirection2(controller, localDirNameSeq) {
  var globalDir = [getGlobalDirection1(controller, localDirNameSeq[0]), getGlobalDirection1(controller, localDirNameSeq[1])];
  (globalDir[0] === 'e' || globalDir[0] === 'w') && globalDir.reverse();
  return globalDir.join('');
}
function driftRect(rectRangeConverter, controller, cover, dirNameSequence, dx, dy) {
  var brushOption = cover.__brushOption;
  var rectRange = rectRangeConverter.toRectRange(brushOption.range);
  var localDelta = toLocalDelta(controller, dx, dy);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(dirNameSequence, function (dirName) {
    var ind = DIRECTION_MAP[dirName];
    rectRange[ind[0]][ind[1]] += localDelta[ind[0]];
  });
  brushOption.range = rectRangeConverter.fromRectRange(formatRectRange(rectRange[0][0], rectRange[1][0], rectRange[0][1], rectRange[1][1]));
  updateCoverAfterCreation(controller, cover);
  trigger(controller, {
    isEnd: false
  });
}
function driftPolygon(controller, cover, dx, dy) {
  var range = cover.__brushOption.range;
  var localDelta = toLocalDelta(controller, dx, dy);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.each)(range, function (point) {
    point[0] += localDelta[0];
    point[1] += localDelta[1];
  });
  updateCoverAfterCreation(controller, cover);
  trigger(controller, {
    isEnd: false
  });
}
function toLocalDelta(controller, dx, dy) {
  var thisGroup = controller.group;
  var localD = thisGroup.transformCoordToLocal(dx, dy);
  var localZero = thisGroup.transformCoordToLocal(0, 0);
  return [localD[0] - localZero[0], localD[1] - localZero[1]];
}
function clipByPanel(controller, cover, data) {
  var panel = getPanelByCover(controller, cover);
  return panel && panel !== BRUSH_PANEL_GLOBAL ? panel.clipPath(data, controller._transform) : (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.clone)(data);
}
function pointsToRect(points) {
  var xmin = mathMin(points[0][0], points[1][0]);
  var ymin = mathMin(points[0][1], points[1][1]);
  var xmax = mathMax(points[0][0], points[1][0]);
  var ymax = mathMax(points[0][1], points[1][1]);
  return {
    x: xmin,
    y: ymin,
    width: xmax - xmin,
    height: ymax - ymin
  };
}
function resetCursor(controller, e, localCursorPoint) {
  if (
  // Check active
  !controller._brushType
  // resetCursor should be always called when mouse is in zr area,
  // but not called when mouse is out of zr area to avoid bad influence
  // if `mousemove`, `mouseup` are triggered from `document` event.
  || isOutsideZrArea(controller, e.offsetX, e.offsetY)) {
    return;
  }
  var zr = controller._zr;
  var covers = controller._covers;
  var currPanel = getPanelByPoint(controller, e, localCursorPoint);
  // Check whether in covers.
  if (!controller._dragging) {
    for (var i = 0; i < covers.length; i++) {
      var brushOption = covers[i].__brushOption;
      if (currPanel && (currPanel === BRUSH_PANEL_GLOBAL || brushOption.panelId === currPanel.panelId) && coverRenderers[brushOption.brushType].contain(covers[i], localCursorPoint[0], localCursorPoint[1])) {
        // Use cursor style set on cover.
        return;
      }
    }
  }
  currPanel && zr.setCursorStyle('crosshair');
}
function preventDefault(e) {
  var rawE = e.event;
  rawE.preventDefault && rawE.preventDefault();
}
function mainShapeContain(cover, x, y) {
  return cover.childOfName('main').contain(x, y);
}
function updateCoverByMouse(controller, e, localCursorPoint, isEnd) {
  var creatingCover = controller._creatingCover;
  var panel = controller._creatingPanel;
  var thisBrushOption = controller._brushOption;
  var eventParams;
  controller._track.push(localCursorPoint.slice());
  if (shouldShowCover(controller) || creatingCover) {
    if (panel && !creatingCover) {
      thisBrushOption.brushMode === 'single' && clearCovers(controller);
      var brushOption = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.clone)(thisBrushOption);
      brushOption.brushType = determineBrushType(brushOption.brushType, panel);
      brushOption.panelId = panel === BRUSH_PANEL_GLOBAL ? null : panel.panelId;
      creatingCover = controller._creatingCover = createCover(controller, brushOption);
      controller._covers.push(creatingCover);
    }
    if (creatingCover) {
      var coverRenderer = coverRenderers[determineBrushType(controller._brushType, panel)];
      var coverBrushOption = creatingCover.__brushOption;
      coverBrushOption.range = coverRenderer.getCreatingRange(clipByPanel(controller, creatingCover, controller._track));
      if (isEnd) {
        endCreating(controller, creatingCover);
        coverRenderer.updateCommon(controller, creatingCover);
      }
      updateCoverShape(controller, creatingCover);
      eventParams = {
        isEnd: isEnd
      };
    }
  } else if (isEnd && thisBrushOption.brushMode === 'single' && thisBrushOption.removeOnClick) {
    // Help user to remove covers easily, only by a tiny drag, in 'single' mode.
    // But a single click do not clear covers, because user may have casual
    // clicks (for example, click on other component and do not expect covers
    // disappear).
    // Only some cover removed, trigger action, but not every click trigger action.
    if (getPanelByPoint(controller, e, localCursorPoint) && clearCovers(controller)) {
      eventParams = {
        isEnd: isEnd,
        removeOnClick: true
      };
    }
  }
  return eventParams;
}
function determineBrushType(brushType, panel) {
  if (brushType === 'auto') {
    if (false) {}
    return panel.defaultBrushType;
  }
  return brushType;
}
var pointerHandlers = {
  mousedown: function (e) {
    if (this._dragging) {
      // In case some browser do not support globalOut,
      // and release mouse out side the browser.
      handleDragEnd(this, e);
    } else if (!e.target || !e.target.draggable) {
      preventDefault(e);
      var localCursorPoint = this.group.transformCoordToLocal(e.offsetX, e.offsetY);
      this._creatingCover = null;
      var panel = this._creatingPanel = getPanelByPoint(this, e, localCursorPoint);
      if (panel) {
        this._dragging = true;
        this._track = [localCursorPoint.slice()];
      }
    }
  },
  mousemove: function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = this.group.transformCoordToLocal(x, y);
    resetCursor(this, e, localCursorPoint);
    if (this._dragging) {
      preventDefault(e);
      var eventParams = updateCoverByMouse(this, e, localCursorPoint, false);
      eventParams && trigger(this, eventParams);
    }
  },
  mouseup: function (e) {
    handleDragEnd(this, e);
  }
};
function handleDragEnd(controller, e) {
  if (controller._dragging) {
    preventDefault(e);
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = controller.group.transformCoordToLocal(x, y);
    var eventParams = updateCoverByMouse(controller, e, localCursorPoint, true);
    controller._dragging = false;
    controller._track = [];
    controller._creatingCover = null;
    // trigger event should be at final, after procedure will be nested.
    eventParams && trigger(controller, eventParams);
  }
}
function isOutsideZrArea(controller, x, y) {
  var zr = controller._zr;
  return x < 0 || x > zr.getWidth() || y < 0 || y > zr.getHeight();
}
/**
 * key: brushType
 */
var coverRenderers = {
  lineX: getLineRenderer(0),
  lineY: getLineRenderer(1),
  rect: {
    createCover: function (controller, brushOption) {
      function returnInput(range) {
        return range;
      }
      return createBaseRectCover({
        toRectRange: returnInput,
        fromRectRange: returnInput
      }, controller, brushOption, [['w'], ['e'], ['n'], ['s'], ['s', 'e'], ['s', 'w'], ['n', 'e'], ['n', 'w']]);
    },
    getCreatingRange: function (localTrack) {
      var ends = getTrackEnds(localTrack);
      return formatRectRange(ends[1][0], ends[1][1], ends[0][0], ends[0][1]);
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      updateBaseRect(controller, cover, localRange, brushOption);
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  },
  polygon: {
    createCover: function (controller, brushOption) {
      var cover = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
      // Do not use graphic.Polygon because graphic.Polyline do not close the
      // border of the shape when drawing, which is a better experience for user.
      cover.add(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A({
        name: 'main',
        style: makeStyle(brushOption),
        silent: true
      }));
      return cover;
    },
    getCreatingRange: function (localTrack) {
      return localTrack;
    },
    endCreating: function (controller, cover) {
      cover.remove(cover.childAt(0));
      // Use graphic.Polygon close the shape.
      cover.add(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A({
        name: 'main',
        draggable: true,
        drift: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.curry)(driftPolygon, controller, cover),
        ondragend: (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_3__.curry)(trigger, controller, {
          isEnd: true
        })
      }));
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      cover.childAt(0).setShape({
        points: clipByPanel(controller, cover, localRange)
      });
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  }
};
function getLineRenderer(xyIndex) {
  return {
    createCover: function (controller, brushOption) {
      return createBaseRectCover({
        toRectRange: function (range) {
          var rectRange = [range, [0, 100]];
          xyIndex && rectRange.reverse();
          return rectRange;
        },
        fromRectRange: function (rectRange) {
          return rectRange[xyIndex];
        }
      }, controller, brushOption, [[['w'], ['e']], [['n'], ['s']]][xyIndex]);
    },
    getCreatingRange: function (localTrack) {
      var ends = getTrackEnds(localTrack);
      var min = mathMin(ends[0][xyIndex], ends[1][xyIndex]);
      var max = mathMax(ends[0][xyIndex], ends[1][xyIndex]);
      return [min, max];
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      var otherExtent;
      // If brushWidth not specified, fit the panel.
      var panel = getPanelByCover(controller, cover);
      if (panel !== BRUSH_PANEL_GLOBAL && panel.getLinearBrushOtherExtent) {
        otherExtent = panel.getLinearBrushOtherExtent(xyIndex);
      } else {
        var zr = controller._zr;
        otherExtent = [0, [zr.getWidth(), zr.getHeight()][1 - xyIndex]];
      }
      var rectRange = [localRange, otherExtent];
      xyIndex && rectRange.reverse();
      updateBaseRect(controller, cover, rectRange, brushOption);
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BrushController);

/***/ }),

/***/ 98585:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11916);
/* harmony import */ var zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(43041);
/* harmony import */ var _util_layout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58263);
/* harmony import */ var _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69663);
/* harmony import */ var _ParallelAxis_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59160);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(88367);
/* harmony import */ var _util_number_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(84408);
/* harmony import */ var _component_helper_sliderMove_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(87617);
/* harmony import */ var _ParallelModel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37838);
/* harmony import */ var _axisNiceTicks_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(81888);
/* harmony import */ var _scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43834);

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
 * Parallel Coordinates
 * <https://en.wikipedia.org/wiki/Parallel_coordinates>
 */











var Parallel = /** @class */function () {
  function Parallel(parallelModel, ecModel, api) {
    this.type = _ParallelModel_js__WEBPACK_IMPORTED_MODULE_0__/* .COORD_SYS_TYPE_PARALLEL */ .ti;
    /**
     * key: dimension
     */
    this._axesMap = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.createHashMap)();
    /**
     * key: dimension
     * value: {position: [], rotation, }
     */
    this._axesLayout = {};
    this.dimensions = parallelModel.dimensions;
    this._model = parallelModel;
    this._init(parallelModel, ecModel, api);
  }
  Parallel.prototype._init = function (parallelModel, ecModel, api) {
    var dimensions = parallelModel.dimensions;
    var parallelAxisIndex = parallelModel.parallelAxisIndex;
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(dimensions, function (dim, idx) {
      var axisIndex = parallelAxisIndex[idx];
      var axisModel = ecModel.getComponent('parallelAxis', axisIndex);
      var axisType = _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_2__/* .determineAxisType */ .J5(axisModel);
      var axis = this._axesMap.set(dim, new _ParallelAxis_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(dim, _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_2__/* .createScaleByModel */ .f$(axisModel, axisType, false), [0, 0], axisType, axisIndex));
      axis.onBand = _coord_axisHelper_js__WEBPACK_IMPORTED_MODULE_2__/* .isAxisOnBand */ .M2(axis.scale, axisModel);
      axis.inverse = axisModel.get('inverse');
      // Injection
      axisModel.axis = axis;
      axis.model = axisModel;
      axis.coordinateSystem = axisModel.coordinateSystem = this;
    }, this);
  };
  /**
   * Update axis scale after data processed
   */
  Parallel.prototype.update = function (ecModel, api) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(this.dimensions, function (dim) {
      var axis = this._axesMap.get(dim);
      (0,_scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_4__/* .scaleRawExtentInfoCreate */ .DT)(axis, _scaleRawExtentInfo_js__WEBPACK_IMPORTED_MODULE_4__/* .AXIS_EXTENT_INFO_BUILD_FROM_COORD_SYS_UPDATE */ .ex);
      (0,_axisNiceTicks_js__WEBPACK_IMPORTED_MODULE_5__/* .scaleCalcNice */ .Z0)(axis);
    }, this);
  };
  Parallel.prototype.containPoint = function (point) {
    var layoutInfo = this._makeLayoutInfo();
    var axisBase = layoutInfo.axisBase;
    var layoutBase = layoutInfo.layoutBase;
    var pixelDimIndex = layoutInfo.pixelDimIndex;
    var pAxis = point[1 - pixelDimIndex];
    var pLayout = point[pixelDimIndex];
    return pAxis >= axisBase && pAxis <= axisBase + layoutInfo.axisLength && pLayout >= layoutBase && pLayout <= layoutBase + layoutInfo.layoutLength;
  };
  Parallel.prototype.getModel = function () {
    return this._model;
  };
  /**
   * Resize the parallel coordinate system.
   */
  Parallel.prototype.resize = function (parallelModel, api) {
    var refContainer = _util_layout_js__WEBPACK_IMPORTED_MODULE_6__/* .createBoxLayoutReference */ .Lj(parallelModel, api).refContainer;
    this._rect = _util_layout_js__WEBPACK_IMPORTED_MODULE_6__/* .getLayoutRect */ .dV(parallelModel.getBoxLayoutParams(), refContainer);
    this._layoutAxes();
  };
  Parallel.prototype.getRect = function () {
    return this._rect;
  };
  Parallel.prototype._makeLayoutInfo = function () {
    var parallelModel = this._model;
    var rect = this._rect;
    var xy = ['x', 'y'];
    var wh = ['width', 'height'];
    var layout = parallelModel.get('layout');
    var pixelDimIndex = layout === 'horizontal' ? 0 : 1;
    var layoutLength = rect[wh[pixelDimIndex]];
    var layoutExtent = [0, layoutLength];
    var axisCount = this.dimensions.length;
    var axisExpandWidth = restrict(parallelModel.get('axisExpandWidth'), layoutExtent);
    var axisExpandCount = restrict(parallelModel.get('axisExpandCount') || 0, [0, axisCount]);
    var axisExpandable = parallelModel.get('axisExpandable') && axisCount > 3 && axisCount > axisExpandCount && axisExpandCount > 1 && axisExpandWidth > 0 && layoutLength > 0;
    // `axisExpandWindow` is According to the coordinates of [0, axisExpandLength],
    // for sake of consider the case that axisCollapseWidth is 0 (when screen is narrow),
    // where collapsed axes should be overlapped.
    var axisExpandWindow = parallelModel.get('axisExpandWindow');
    var winSize;
    if (!axisExpandWindow) {
      winSize = restrict(axisExpandWidth * (axisExpandCount - 1), layoutExtent);
      var axisExpandCenter = parallelModel.get('axisExpandCenter') || (0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathFloor */ .Zr)(axisCount / 2);
      axisExpandWindow = [axisExpandWidth * axisExpandCenter - winSize / 2];
      axisExpandWindow[1] = axisExpandWindow[0] + winSize;
    } else {
      winSize = restrict(axisExpandWindow[1] - axisExpandWindow[0], layoutExtent);
      axisExpandWindow[1] = axisExpandWindow[0] + winSize;
    }
    var axisCollapseWidth = (layoutLength - winSize) / (axisCount - axisExpandCount);
    // Avoid axisCollapseWidth is too small.
    axisCollapseWidth < 3 && (axisCollapseWidth = 0);
    // Find the first and last indices > ewin[0] and < ewin[1].
    var winInnerIndices = [(0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathFloor */ .Zr)((0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .round */ .LI)(axisExpandWindow[0] / axisExpandWidth, 1)) + 1, (0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathCeil */ .ih)((0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .round */ .LI)(axisExpandWindow[1] / axisExpandWidth, 1)) - 1];
    // Pos in ec coordinates.
    var axisExpandWindow0Pos = axisCollapseWidth / axisExpandWidth * axisExpandWindow[0];
    return {
      layout: layout,
      pixelDimIndex: pixelDimIndex,
      layoutBase: rect[xy[pixelDimIndex]],
      layoutLength: layoutLength,
      axisBase: rect[xy[1 - pixelDimIndex]],
      axisLength: rect[wh[1 - pixelDimIndex]],
      axisExpandable: axisExpandable,
      axisExpandWidth: axisExpandWidth,
      axisCollapseWidth: axisCollapseWidth,
      axisExpandWindow: axisExpandWindow,
      axisCount: axisCount,
      winInnerIndices: winInnerIndices,
      axisExpandWindow0Pos: axisExpandWindow0Pos
    };
  };
  Parallel.prototype._layoutAxes = function () {
    var rect = this._rect;
    var axes = this._axesMap;
    var dimensions = this.dimensions;
    var layoutInfo = this._makeLayoutInfo();
    var layout = layoutInfo.layout;
    axes.each(function (axis) {
      var axisExtent = [0, layoutInfo.axisLength];
      var idx = axis.inverse ? 1 : 0;
      axis.setExtent(axisExtent[idx], axisExtent[1 - idx]);
    });
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(dimensions, function (dim, idx) {
      var posInfo = (layoutInfo.axisExpandable ? layoutAxisWithExpand : layoutAxisWithoutExpand)(idx, layoutInfo);
      var positionTable = {
        horizontal: {
          x: posInfo.position,
          y: layoutInfo.axisLength
        },
        vertical: {
          x: 0,
          y: posInfo.position
        }
      };
      var rotationTable = {
        horizontal: _util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathPI */ .SS / 2,
        vertical: 0
      };
      var position = [positionTable[layout].x + rect.x, positionTable[layout].y + rect.y];
      var rotation = rotationTable[layout];
      var transform = zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_8__.create();
      zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_8__.rotate(transform, transform, rotation);
      zrender_lib_core_matrix_js__WEBPACK_IMPORTED_MODULE_8__.translate(transform, transform, position);
      // TODO
      // tick layout info
      // TODO
      // update dimensions info based on axis order.
      this._axesLayout[dim] = {
        position: position,
        rotation: rotation,
        transform: transform,
        axisNameAvailableWidth: posInfo.axisNameAvailableWidth,
        axisLabelShow: posInfo.axisLabelShow,
        nameTruncateMaxWidth: posInfo.nameTruncateMaxWidth,
        tickDirection: 1,
        labelDirection: 1
      };
    }, this);
  };
  /**
   * Get axis by dim.
   */
  Parallel.prototype.getAxis = function (dim) {
    return this._axesMap.get(dim);
  };
  /**
   * Convert a dim value of a single item of series data to Point.
   */
  Parallel.prototype.dataToPoint = function (value, dim) {
    return this.axisCoordToPoint(this._axesMap.get(dim).dataToCoord(value), dim);
  };
  /**
   * Travel data for one time, get activeState of each data item.
   * @param start the start dataIndex that travel from.
   * @param end the next dataIndex of the last dataIndex will be travel.
   */
  Parallel.prototype.eachActiveState = function (data, callback, start, end) {
    start == null && (start = 0);
    end == null && (end = data.count());
    var axesMap = this._axesMap;
    var dimensions = this.dimensions;
    var dataDimensions = [];
    var axisModels = [];
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.each)(dimensions, function (axisDim) {
      dataDimensions.push(data.mapDimension(axisDim));
      axisModels.push(axesMap.get(axisDim).model);
    });
    var hasActiveSet = this.hasAxisBrushed();
    for (var dataIndex = start; dataIndex < end; dataIndex++) {
      var activeState = void 0;
      if (!hasActiveSet) {
        activeState = 'normal';
      } else {
        activeState = 'active';
        var values = data.getValues(dataDimensions, dataIndex);
        for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
          var state = axisModels[j].getActiveState(values[j]);
          if (state === 'inactive') {
            activeState = 'inactive';
            break;
          }
        }
      }
      callback(activeState, dataIndex);
    }
  };
  /**
   * Whether has any activeSet.
   */
  Parallel.prototype.hasAxisBrushed = function () {
    var dimensions = this.dimensions;
    var axesMap = this._axesMap;
    var hasActiveSet = false;
    for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
      if (axesMap.get(dimensions[j]).model.getActiveState() !== 'normal') {
        hasActiveSet = true;
      }
    }
    return hasActiveSet;
  };
  /**
   * Convert coords of each axis to Point.
   *  Return point. For example: [10, 20]
   */
  Parallel.prototype.axisCoordToPoint = function (coord, dim) {
    var axisLayout = this._axesLayout[dim];
    return _util_graphic_js__WEBPACK_IMPORTED_MODULE_9__.applyTransform([coord, 0], axisLayout.transform);
  };
  /**
   * Get axis layout.
   */
  Parallel.prototype.getAxisLayout = function (dim) {
    return (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_1__.clone)(this._axesLayout[dim]);
  };
  /**
   * @return {Object} {axisExpandWindow, delta, behavior: 'jump' | 'slide' | 'none'}.
   */
  Parallel.prototype.getSlidedAxisExpandWindow = function (point) {
    var layoutInfo = this._makeLayoutInfo();
    var pixelDimIndex = layoutInfo.pixelDimIndex;
    var axisExpandWindow = layoutInfo.axisExpandWindow.slice();
    var winSize = axisExpandWindow[1] - axisExpandWindow[0];
    var extent = [0, layoutInfo.axisExpandWidth * (layoutInfo.axisCount - 1)];
    // Out of the area of coordinate system.
    if (!this.containPoint(point)) {
      return {
        behavior: 'none',
        axisExpandWindow: axisExpandWindow
      };
    }
    // Convert the point from global to expand coordinates.
    var pointCoord = point[pixelDimIndex] - layoutInfo.layoutBase - layoutInfo.axisExpandWindow0Pos;
    // For dragging operation convenience, the window should not be
    // slided when mouse is the center area of the window.
    var delta;
    var behavior = 'slide';
    var axisCollapseWidth = layoutInfo.axisCollapseWidth;
    var triggerArea = this._model.get('axisExpandSlideTriggerArea');
    // But consider touch device, jump is necessary.
    var useJump = triggerArea[0] != null;
    if (axisCollapseWidth) {
      if (useJump && axisCollapseWidth && pointCoord < winSize * triggerArea[0]) {
        behavior = 'jump';
        delta = pointCoord - winSize * triggerArea[2];
      } else if (useJump && axisCollapseWidth && pointCoord > winSize * (1 - triggerArea[0])) {
        behavior = 'jump';
        delta = pointCoord - winSize * (1 - triggerArea[2]);
      } else {
        (delta = pointCoord - winSize * triggerArea[1]) >= 0 && (delta = pointCoord - winSize * (1 - triggerArea[1])) <= 0 && (delta = 0);
      }
      delta *= layoutInfo.axisExpandWidth / axisCollapseWidth;
      delta ? (0,_component_helper_sliderMove_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)(delta, axisExpandWindow, extent, 'all')
      // Avoid nonsense triger on mousemove.
      : behavior = 'none';
    }
    // When screen is too narrow, make it visible and slidable, although it is hard to interact.
    else {
      var winSize2 = axisExpandWindow[1] - axisExpandWindow[0];
      var pos = extent[1] * pointCoord / winSize2;
      axisExpandWindow = [(0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathMax */ .JB)(0, pos - winSize2 / 2)];
      axisExpandWindow[1] = (0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathMin */ .rp)(extent[1], axisExpandWindow[0] + winSize2);
      axisExpandWindow[0] = axisExpandWindow[1] - winSize2;
    }
    return {
      axisExpandWindow: axisExpandWindow,
      behavior: behavior
    };
  };
  return Parallel;
}();
function restrict(len, extent) {
  return (0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathMin */ .rp)((0,_util_number_js__WEBPACK_IMPORTED_MODULE_7__/* .mathMax */ .JB)(len, extent[0]), extent[1]);
}
function layoutAxisWithoutExpand(axisIndex, layoutInfo) {
  var step = layoutInfo.layoutLength / (layoutInfo.axisCount - 1);
  return {
    position: step * axisIndex,
    axisNameAvailableWidth: step,
    axisLabelShow: true
  };
}
function layoutAxisWithExpand(axisIndex, layoutInfo) {
  var layoutLength = layoutInfo.layoutLength;
  var axisExpandWidth = layoutInfo.axisExpandWidth;
  var axisCount = layoutInfo.axisCount;
  var axisCollapseWidth = layoutInfo.axisCollapseWidth;
  var winInnerIndices = layoutInfo.winInnerIndices;
  var position;
  var axisNameAvailableWidth = axisCollapseWidth;
  var axisLabelShow = false;
  var nameTruncateMaxWidth;
  if (axisIndex < winInnerIndices[0]) {
    position = axisIndex * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  } else if (axisIndex <= winInnerIndices[1]) {
    position = layoutInfo.axisExpandWindow0Pos + axisIndex * axisExpandWidth - layoutInfo.axisExpandWindow[0];
    axisNameAvailableWidth = axisExpandWidth;
    axisLabelShow = true;
  } else {
    position = layoutLength - (axisCount - 1 - axisIndex) * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  }
  return {
    position: position,
    axisNameAvailableWidth: axisNameAvailableWidth,
    axisLabelShow: axisLabelShow,
    nameTruncateMaxWidth: nameTruncateMaxWidth
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parallel);

/***/ }),

/***/ 99175:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   aB: () => (/* binding */ updateLeaveTo),
/* harmony export */   h8: () => (/* binding */ applyLeaveTransition),
/* harmony export */   ho: () => (/* binding */ isTransitionAll),
/* harmony export */   rd: () => (/* binding */ ELEMENT_ANIMATABLE_PROPS),
/* harmony export */   rh: () => (/* binding */ applyUpdateTransition)
/* harmony export */ });
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11138);
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var zrender_lib_animation_Animator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(34242);
/* harmony import */ var zrender_lib_graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34685);
/* harmony import */ var _basicTransition_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55736);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12682);
/* harmony import */ var zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80252);

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








var LEGACY_TRANSFORM_PROPS_MAP = {
  position: ['x', 'y'],
  scale: ['scaleX', 'scaleY'],
  origin: ['originX', 'originY']
};
var LEGACY_TRANSFORM_PROPS = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(LEGACY_TRANSFORM_PROPS_MAP);
var TRANSFORM_PROPS_MAP = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.reduce)(zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .TRANSFORMABLE_PROPS */ .Wx, function (obj, key) {
  obj[key] = 1;
  return obj;
}, {});
var transformPropNamesStr = zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .TRANSFORMABLE_PROPS */ .Wx.join(', ');
// '' means root
var ELEMENT_ANIMATABLE_PROPS = ['', 'style', 'shape', 'extra'];
;
var transitionInnerStore = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_2__/* .makeInner */ .$r)();
;
function getElementAnimationConfig(animationType, el, elOption, parentModel, dataIndex) {
  var animationProp = animationType + "Animation";
  var config = (0,_basicTransition_js__WEBPACK_IMPORTED_MODULE_3__/* .getAnimationConfig */ .Jw)(animationType, parentModel, dataIndex) || {};
  var userDuring = transitionInnerStore(el).userDuring;
  // Only set when duration is > 0 and it's need to be animated.
  if (config.duration > 0) {
    // For simplicity, if during not specified, the previous during will not work any more.
    config.during = userDuring ? (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.bind)(duringCall, {
      el: el,
      userDuring: userDuring
    }) : null;
    config.setToFinal = true;
    config.scope = animationType;
  }
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(config, elOption[animationProp]);
  return config;
}
function applyUpdateTransition(el, elOption, animatableModel, opts) {
  opts = opts || {};
  var dataIndex = opts.dataIndex,
    isInit = opts.isInit,
    clearStyle = opts.clearStyle;
  var hasAnimation = animatableModel.isAnimationEnabled();
  // Save the meta info for further morphing. Like apply on the sub morphing elements.
  var store = transitionInnerStore(el);
  var styleOpt = elOption.style;
  store.userDuring = elOption.during;
  var transFromProps = {};
  var propsToSet = {};
  prepareTransformAllPropsFinal(el, elOption, propsToSet);
  if (el.type === 'compound') {
    /**
     * We cannot directly clone shape for compoundPath,
     * because it makes the path to be an object instead of a Path instance,
     * and thus missing `buildPath` method.
     */
    var paths = el.shape.paths;
    var optionPaths = elOption.shape.paths;
    for (var i = 0; i < optionPaths.length; i++) {
      var path = optionPaths[i];
      prepareShapeOrExtraAllPropsFinal('shape', path, paths[i]);
    }
  } else {
    prepareShapeOrExtraAllPropsFinal('shape', elOption, propsToSet);
    prepareShapeOrExtraAllPropsFinal('extra', elOption, propsToSet);
  }
  if (!isInit && hasAnimation) {
    prepareTransformTransitionFrom(el, elOption, transFromProps);
    prepareShapeOrExtraTransitionFrom('shape', el, elOption, transFromProps);
    prepareShapeOrExtraTransitionFrom('extra', el, elOption, transFromProps);
    prepareStyleTransitionFrom(el, elOption, styleOpt, transFromProps);
  }
  propsToSet.style = styleOpt;
  applyPropsDirectly(el, propsToSet, clearStyle);
  applyMiscProps(el, elOption);
  if (hasAnimation) {
    if (isInit) {
      var enterFromProps_1 = {};
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each)(ELEMENT_ANIMATABLE_PROPS, function (propName) {
        var prop = propName ? elOption[propName] : elOption;
        if (prop && prop.enterFrom) {
          if (propName) {
            enterFromProps_1[propName] = enterFromProps_1[propName] || {};
          }
          (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(propName ? enterFromProps_1[propName] : enterFromProps_1, prop.enterFrom);
        }
      });
      var config = getElementAnimationConfig('enter', el, elOption, animatableModel, dataIndex);
      if (config.duration > 0) {
        el.animateFrom(enterFromProps_1, config);
      }
    } else {
      applyPropsTransition(el, elOption, dataIndex || 0, animatableModel, transFromProps);
    }
  }
  // Store leave to be used in leave transition.
  updateLeaveTo(el, elOption);
  styleOpt ? el.dirty() : el.markRedraw();
}
function updateLeaveTo(el, elOption) {
  // Try merge to previous set leaveTo
  var leaveToProps = transitionInnerStore(el).leaveToProps;
  for (var i = 0; i < ELEMENT_ANIMATABLE_PROPS.length; i++) {
    var propName = ELEMENT_ANIMATABLE_PROPS[i];
    var prop = propName ? elOption[propName] : elOption;
    if (prop && prop.leaveTo) {
      if (!leaveToProps) {
        leaveToProps = transitionInnerStore(el).leaveToProps = {};
      }
      if (propName) {
        leaveToProps[propName] = leaveToProps[propName] || {};
      }
      (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(propName ? leaveToProps[propName] : leaveToProps, prop.leaveTo);
    }
  }
}
function applyLeaveTransition(el, elOption, animatableModel, onRemove) {
  if (el) {
    var parent_1 = el.parent;
    var leaveToProps = transitionInnerStore(el).leaveToProps;
    if (leaveToProps) {
      // TODO TODO use leave after leaveAnimation in series is introduced
      // TODO Data index?
      var config = getElementAnimationConfig('update', el, elOption, animatableModel, 0);
      config.done = function () {
        parent_1 && parent_1.remove(el);
        onRemove && onRemove();
      };
      el.animateTo(leaveToProps, config);
    } else {
      parent_1 && parent_1.remove(el);
      onRemove && onRemove();
    }
  }
}
function isTransitionAll(transition) {
  return transition === 'all';
}
function applyPropsDirectly(el,
// Can be null/undefined
allPropsFinal, clearStyle) {
  var styleOpt = allPropsFinal.style;
  if (!el.isGroup && styleOpt) {
    if (clearStyle) {
      el.useStyle({});
      // When style object changed, how to trade the existing animation?
      // It is probably complicated and not needed to cover all the cases.
      // But still need consider the case:
      // (1) When using init animation on `style.opacity`, and before the animation
      //     ended users triggers an update by mousewhel. At that time the init
      //     animation should better be continued rather than terminated.
      //     So after `useStyle` called, we should change the animation target manually
      //     to continue the effect of the init animation.
      // (2) PENDING: If the previous animation targeted at a `val1`, and currently we need
      //     to update the value to `val2` and no animation declared, should be terminate
      //     the previous animation or just modify the target of the animation?
      //     Therotically That will happen not only on `style` but also on `shape` and
      //     `transfrom` props. But we haven't handle this case at present yet.
      // (3) PENDING: Is it proper to visit `animators` and `targetName`?
      var animators = el.animators;
      for (var i = 0; i < animators.length; i++) {
        var animator = animators[i];
        // targetName is the "topKey".
        if (animator.targetName === 'style') {
          animator.changeTarget(el.style);
        }
      }
    }
    el.setStyle(styleOpt);
  }
  if (allPropsFinal) {
    // Not set style here.
    allPropsFinal.style = null;
    // Set el to the final state firstly.
    allPropsFinal && el.attr(allPropsFinal);
    allPropsFinal.style = styleOpt;
  }
}
function applyPropsTransition(el, elOption, dataIndex, model,
// Can be null/undefined
transFromProps) {
  if (transFromProps) {
    var config = getElementAnimationConfig('update', el, elOption, model, dataIndex);
    if (config.duration > 0) {
      el.animateFrom(transFromProps, config);
    }
  }
}
function applyMiscProps(el, elOption) {
  // Merge by default.
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(elOption, 'silent') && (el.silent = elOption.silent);
  (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(elOption, 'ignore') && (el.ignore = elOption.ignore);
  if (el instanceof zrender_lib_graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(elOption, 'invisible') && (el.invisible = elOption.invisible);
  }
  if (el instanceof _util_graphic_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Ay) {
    (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(elOption, 'autoBatch') && (el.autoBatch = elOption.autoBatch);
  }
}
// Use it to avoid it be exposed to user.
var tmpDuringScope = {};
var transitionDuringAPI = {
  // Usually other props do not need to be changed in animation during.
  setTransform: function (key, val) {
    if (false) {}
    tmpDuringScope.el[key] = val;
    return this;
  },
  getTransform: function (key) {
    if (false) {}
    return tmpDuringScope.el[key];
  },
  setShape: function (key, val) {
    if (false) {}
    var el = tmpDuringScope.el;
    var shape = el.shape || (el.shape = {});
    shape[key] = val;
    el.dirtyShape && el.dirtyShape();
    return this;
  },
  getShape: function (key) {
    if (false) {}
    var shape = tmpDuringScope.el.shape;
    if (shape) {
      return shape[key];
    }
  },
  setStyle: function (key, val) {
    if (false) {}
    var el = tmpDuringScope.el;
    var style = el.style;
    if (style) {
      if (false) {}
      style[key] = val;
      el.dirtyStyle && el.dirtyStyle();
    }
    return this;
  },
  getStyle: function (key) {
    if (false) {}
    var style = tmpDuringScope.el.style;
    if (style) {
      return style[key];
    }
  },
  setExtra: function (key, val) {
    if (false) {}
    var extra = tmpDuringScope.el.extra || (tmpDuringScope.el.extra = {});
    extra[key] = val;
    return this;
  },
  getExtra: function (key) {
    if (false) {}
    var extra = tmpDuringScope.el.extra;
    if (extra) {
      return extra[key];
    }
  }
};
function assertNotReserved(key) {
  if (false) {}
}
function duringCall() {
  // Do not provide "percent" until some requirements come.
  // Because consider thies case:
  // enterFrom: {x: 100, y: 30}, transition: 'x'.
  // And enter duration is different from update duration.
  // Thus it might be confused about the meaning of "percent" in during callback.
  var scope = this;
  var el = scope.el;
  if (!el) {
    return;
  }
  // If el is remove from zr by reason like legend, during still need to called,
  // because el will be added back to zr and the prop value should not be incorrect.
  var latestUserDuring = transitionInnerStore(el).userDuring;
  var scopeUserDuring = scope.userDuring;
  // Ensured a during is only called once in each animation frame.
  // If a during is called multiple times in one frame, maybe some users' calculation logic
  // might be wrong (not sure whether this usage exists).
  // The case of a during might be called twice can be: by default there is a animator for
  // 'x', 'y' when init. Before the init animation finished, call `setOption` to start
  // another animators for 'style'/'shape'/'extra'.
  if (latestUserDuring !== scopeUserDuring) {
    // release
    scope.el = scope.userDuring = null;
    return;
  }
  tmpDuringScope.el = el;
  // Give no `this` to user in "during" calling.
  scopeUserDuring(transitionDuringAPI);
  // FIXME: if in future meet the case that some prop will be both modified in `during` and `state`,
  // consider the issue that the prop might be incorrect when return to "normal" state.
}
function prepareShapeOrExtraTransitionFrom(mainAttr, fromEl, elOption, transFromProps) {
  var attrOpt = elOption[mainAttr];
  if (!attrOpt) {
    return;
  }
  var elPropsInAttr = fromEl[mainAttr];
  var transFromPropsInAttr;
  if (elPropsInAttr) {
    var transition = elOption.transition;
    var attrTransition = attrOpt.transition;
    if (attrTransition) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      if (isTransitionAll(attrTransition)) {
        (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.extend)(transFromPropsInAttr, elPropsInAttr);
      } else {
        var transitionKeys = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeToArray */ .qB)(attrTransition);
        for (var i = 0; i < transitionKeys.length; i++) {
          var key = transitionKeys[i];
          var elVal = elPropsInAttr[key];
          transFromPropsInAttr[key] = elVal;
        }
      }
    } else if (isTransitionAll(transition) || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.indexOf)(transition, mainAttr) >= 0) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      var elPropsInAttrKeys = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(elPropsInAttr);
      for (var i = 0; i < elPropsInAttrKeys.length; i++) {
        var key = elPropsInAttrKeys[i];
        var elVal = elPropsInAttr[key];
        if (isNonStyleTransitionEnabled(attrOpt[key], elVal)) {
          transFromPropsInAttr[key] = elVal;
        }
      }
    }
  }
}
function prepareShapeOrExtraAllPropsFinal(mainAttr, elOption, allProps) {
  var attrOpt = elOption[mainAttr];
  if (!attrOpt) {
    return;
  }
  var allPropsInAttr = allProps[mainAttr] = {};
  var keysInAttr = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(attrOpt);
  for (var i = 0; i < keysInAttr.length; i++) {
    var key = keysInAttr[i];
    // To avoid share one object with different element, and
    // to avoid user modify the object inexpectedly, have to clone.
    allPropsInAttr[key] = (0,zrender_lib_animation_Animator_js__WEBPACK_IMPORTED_MODULE_6__/* .cloneValue */ .F)(attrOpt[key]);
  }
}
function prepareTransformTransitionFrom(el, elOption, transFromProps) {
  var transition = elOption.transition;
  var transitionKeys = isTransitionAll(transition) ? zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .TRANSFORMABLE_PROPS */ .Wx : (0,_util_model_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeToArray */ .qB)(transition || []);
  for (var i = 0; i < transitionKeys.length; i++) {
    var key = transitionKeys[i];
    if (key === 'style' || key === 'shape' || key === 'extra') {
      continue;
    }
    var elVal = el[key];
    if (false) {}
    // Do not clone, animator will perform that clone.
    transFromProps[key] = elVal;
  }
}
function prepareTransformAllPropsFinal(el, elOption, allProps) {
  for (var i = 0; i < LEGACY_TRANSFORM_PROPS.length; i++) {
    var legacyName = LEGACY_TRANSFORM_PROPS[i];
    var xyName = LEGACY_TRANSFORM_PROPS_MAP[legacyName];
    var legacyArr = elOption[legacyName];
    if (legacyArr) {
      allProps[xyName[0]] = legacyArr[0];
      allProps[xyName[1]] = legacyArr[1];
    }
  }
  for (var i = 0; i < zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .TRANSFORMABLE_PROPS */ .Wx.length; i++) {
    var key = zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_1__/* .TRANSFORMABLE_PROPS */ .Wx[i];
    if (elOption[key] != null) {
      allProps[key] = elOption[key];
    }
  }
}
function prepareStyleTransitionFrom(fromEl, elOption, styleOpt, transFromProps) {
  if (!styleOpt) {
    return;
  }
  var fromElStyle = fromEl.style;
  var transFromStyleProps;
  if (fromElStyle) {
    var styleTransition = styleOpt.transition;
    var elTransition = elOption.transition;
    if (styleTransition && !isTransitionAll(styleTransition)) {
      var transitionKeys = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_2__/* .normalizeToArray */ .qB)(styleTransition);
      !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});
      for (var i = 0; i < transitionKeys.length; i++) {
        var key = transitionKeys[i];
        var elVal = fromElStyle[key];
        // Do not clone, see `checkNonStyleTansitionRefer`.
        transFromStyleProps[key] = elVal;
      }
    } else if (fromEl.getAnimationStyleProps && (isTransitionAll(elTransition) || isTransitionAll(styleTransition) || (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.indexOf)(elTransition, 'style') >= 0)) {
      var animationProps = fromEl.getAnimationStyleProps();
      var animationStyleProps = animationProps ? animationProps.style : null;
      if (animationStyleProps) {
        !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});
        var styleKeys = (0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.keys)(styleOpt);
        for (var i = 0; i < styleKeys.length; i++) {
          var key = styleKeys[i];
          if (animationStyleProps[key]) {
            var elVal = fromElStyle[key];
            transFromStyleProps[key] = elVal;
          }
        }
      }
    }
  }
}
function isNonStyleTransitionEnabled(optVal, elVal) {
  // The same as `checkNonStyleTansitionRefer`.
  return !(0,zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(optVal) ? optVal != null && isFinite(optVal) : optVal !== elVal;
}
var checkTransformPropRefer;
if (false) {}

/***/ }),

/***/ 99239:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11916);
/* harmony import */ var _RoamController_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64900);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35980);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19137);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(89487);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15451);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(251);
/* harmony import */ var _util_graphic_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(88367);
/* harmony import */ var _util_states_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(33955);
/* harmony import */ var _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(67023);
/* harmony import */ var _util_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83884);
/* harmony import */ var _label_labelStyle_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(88908);
/* harmony import */ var _util_innerStore_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(83604);
/* harmony import */ var _util_decal_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(20518);
/* harmony import */ var _coord_View_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55103);
/* harmony import */ var zrender_lib_graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(34685);
/* harmony import */ var _util_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11138);
/* harmony import */ var _roamHelper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(51544);
/* harmony import */ var zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(80252);
/* harmony import */ var zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2103);

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
 * Only these tags enable use `itemStyle` if they are named in SVG.
 * Other tags like <text> <tspan> <image> might not suitable for `itemStyle`.
 * They will not be considered to be styled until some requirements come.
 */
var OPTION_STYLE_ENABLED_TAGS = ['rect', 'circle', 'line', 'ellipse', 'polygon', 'polyline', 'path'];
var OPTION_STYLE_ENABLED_TAG_MAP = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap(OPTION_STYLE_ENABLED_TAGS);
var STATE_TRIGGER_TAG_MAP = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap(OPTION_STYLE_ENABLED_TAGS.concat(['g']));
var LABEL_HOST_MAP = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap(OPTION_STYLE_ENABLED_TAGS.concat(['g']));
var mapLabelRaw = (0,_util_model_js__WEBPACK_IMPORTED_MODULE_1__/* .makeInner */ .$r)();
function getFixedItemStyle(model) {
  var itemStyle = model.getItemStyle();
  var areaColor = model.get('areaColor');
  // If user want the color not to be changed when hover,
  // they should both set areaColor and color to be null.
  if (areaColor != null) {
    itemStyle.fill = areaColor;
  }
  return itemStyle;
}
// Only stroke can be used for line.
// Using fill in style if stroke not exits.
// TODO Not sure yet. Perhaps a separate `lineStyle`?
function fixLineStyle(styleHost) {
  var style = styleHost.style;
  if (style) {
    style.stroke = style.stroke || style.fill;
    style.fill = null;
  }
}
var MapDraw = /** @class */function () {
  function MapDraw(api) {
    var group = this.group = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
    var transformGroup = this._transformGroup = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
    group.add(transformGroup);
    this.uid = (0,_util_component_js__WEBPACK_IMPORTED_MODULE_3__/* .getUID */ .$Q)('ec_map_draw');
    this._controller = new _RoamController_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(api.getZr());
    transformGroup.add(this._regionsGroup = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A());
    transformGroup.add(this._svgGroup = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A());
  }
  MapDraw.prototype.draw = function (mapOrGeoModel, ecModel, api, fromView, payload) {
    var mapDraw = this;
    // Map series has data. GEO model that controlled by map series
    // will be assigned with map data. Other GEO model has no data.
    var data = mapOrGeoModel.getData && mapOrGeoModel.getData();
    if (isGeoModel(mapOrGeoModel)) {
      ecModel.eachComponent({
        mainType: 'series',
        subType: 'map'
      }, function (mapSeries) {
        if (!data && mapSeries.getHostGeoModel() === mapOrGeoModel) {
          data = mapSeries.getData();
        }
      });
    }
    var geo = mapOrGeoModel.coordinateSystem;
    var viewCoordSys = geo.view;
    var regionsGroup = this._regionsGroup;
    var transformGroup = this._transformGroup;
    // No animation when first draw or in action
    var isFirstDraw = !regionsGroup.childAt(0) || payload;
    var clipRect;
    if (geo.shouldClip()) {
      clipRect = (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .viewCoordSysCopyViewRect */ .cH)(null, viewCoordSys);
      this.group.setClipPath(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A({
        shape: clipRect.clone()
      }));
    } else {
      this.group.removeClipPath();
    }
    (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .applyViewCoordSysTransToElement */ .nT)(transformGroup, _coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .VIEW_COORD_SYS_TRANS_ROAM */ .$o, viewCoordSys, isFirstDraw ? null : mapOrGeoModel);
    var isVisualEncodedByVisualMap = data && data.getVisual('visualMeta') && data.getVisual('visualMeta').length > 0;
    if (geo.resourceType === 'geoJSON') {
      this._buildGeoJSON(viewCoordSys, api, geo, mapOrGeoModel, data, isVisualEncodedByVisualMap);
    } else if (geo.resourceType === 'geoSVG') {
      this._buildSVG(viewCoordSys, api, geo, mapOrGeoModel, data, isVisualEncodedByVisualMap);
    }
    (0,_roamHelper_js__WEBPACK_IMPORTED_MODULE_7__/* .updateRoamControllerSimply */ .jg)(mapOrGeoModel, api, this._controller, function (e, x, y) {
      return mapOrGeoModel.coordinateSystem.containPoint([x, y]);
    }, clipRect, function () {
      mapDraw._mouseDownFlag = false;
    }, false,
    // Default roam type.
    true);
    this._updateMapSelectHandler(mapOrGeoModel, regionsGroup, api, fromView);
  };
  MapDraw.prototype.__updateOnOwnRoam = function (mapOrGeoModel) {
    (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .applyViewCoordSysTransToElement */ .nT)(this._transformGroup, _coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .VIEW_COORD_SYS_TRANS_ROAM */ .$o, mapOrGeoModel.coordinateSystem.view, null);
  };
  MapDraw.prototype._buildGeoJSON = function (viewCoordSys, api, geo, mapOrGeoModel, data, isVisualEncodedByVisualMap) {
    var regionsGroupByName = this._regionsGroupByName = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap();
    var regionsInfoByName = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap();
    var regionsGroup = this._regionsGroup;
    var projection = geo.projection;
    var projectionStream = projection && projection.stream;
    var transMt = (0,zrender_lib_core_Transformable_js__WEBPACK_IMPORTED_MODULE_8__/* .transformableGetLocalTransform */ .Ed)((0,_coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .viewCoordSysCopyTrans */ .P4)(null, viewCoordSys, _coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .VIEW_COORD_SYS_TRANS_RAW */ .G6));
    function transformPoint(point, project) {
      if (project) {
        // projection may return null point.
        point = project(point);
      }
      return point && (0,zrender_lib_core_vector_js__WEBPACK_IMPORTED_MODULE_9__.applyTransform)([], point, transMt);
    }
    ;
    function transformPolygonPoints(inPoints) {
      var outPoints = [];
      // If projectionStream is provided. Use it instead of single point project.
      var project = !projectionStream && projection && projection.project;
      for (var i = 0; i < inPoints.length; ++i) {
        var newPt = transformPoint(inPoints[i], project);
        newPt && outPoints.push(newPt);
      }
      return outPoints;
    }
    function getPolyShape(points) {
      return {
        shape: {
          points: transformPolygonPoints(points)
        }
      };
    }
    regionsGroup.removeAll();
    // Only when the resource is GeoJSON, there is `geo.regions`.
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(geo.regions, function (region) {
      var regionName = region.name;
      // Consider in GeoJson properties.name may be duplicated, for example,
      // there is multiple region named "United Kindom" or "France" (so many
      // colonies). And it is not appropriate to merge them in geo, which
      // will make them share the same label and bring trouble in label
      // location calculation.
      var regionGroup = regionsGroupByName.get(regionName);
      var _a = regionsInfoByName.get(regionName) || {},
        dataIdx = _a.dataIdx,
        regionModel = _a.regionModel;
      if (!regionGroup) {
        regionGroup = regionsGroupByName.set(regionName, new _util_graphic_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A());
        regionsGroup.add(regionGroup);
        dataIdx = data ? data.indexOfName(regionName) : null;
        regionModel = isGeoModel(mapOrGeoModel) ? mapOrGeoModel.getRegionModel(regionName) : data ? data.getItemModel(dataIdx) : null;
        var silent = regionModel.get('silent', true);
        silent != null && (regionGroup.silent = silent);
        regionsInfoByName.set(regionName, {
          dataIdx: dataIdx,
          regionModel: regionModel
        });
      }
      var polygonSubpaths = [];
      var polylineSubpaths = [];
      zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(region.geometries, function (geometry) {
        // Polygon and MultiPolygon
        if (geometry.type === 'polygon') {
          var polys = [geometry.exterior].concat(geometry.interiors || []);
          if (projectionStream) {
            polys = projectPolys(polys, projectionStream);
          }
          zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(polys, function (poly) {
            polygonSubpaths.push(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A(getPolyShape(poly)));
          });
        }
        // LineString and MultiLineString
        else {
          var points = geometry.points;
          if (projectionStream) {
            points = projectPolys(points, projectionStream, true);
          }
          zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(points, function (points) {
            polylineSubpaths.push(new _util_graphic_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A(getPolyShape(points)));
          });
        }
      });
      var centerPt = transformPoint(region.getCenter(), projection && projection.project);
      function createCompoundPath(subpaths, isLine) {
        if (!subpaths.length) {
          return;
        }
        var compoundPath = new _util_graphic_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A({
          culling: true,
          segmentIgnoreThreshold: 1,
          shape: {
            paths: subpaths
          }
        });
        regionGroup.add(compoundPath);
        applyOptionStyleForRegion(api, data, isVisualEncodedByVisualMap, compoundPath, dataIdx, regionModel);
        resetLabelForRegion(mapOrGeoModel, data, compoundPath, regionName, regionModel, dataIdx, centerPt);
        if (isLine) {
          fixLineStyle(compoundPath);
          zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(compoundPath.states, fixLineStyle);
        }
      }
      createCompoundPath(polygonSubpaths);
      createCompoundPath(polylineSubpaths, true);
    });
    // Ensure children have been added to `regionGroup` before calling them.
    regionsGroupByName.each(function (regionGroup, regionName) {
      var _a = regionsInfoByName.get(regionName),
        dataIdx = _a.dataIdx,
        regionModel = _a.regionModel;
      resetEventTriggerForRegion(mapOrGeoModel, data, regionGroup, regionName, regionModel, dataIdx);
      resetTooltipForRegion(mapOrGeoModel, data, regionGroup, regionName, regionModel);
      resetStateTriggerForRegion(mapOrGeoModel, regionGroup, regionName, regionModel);
    }, this);
  };
  MapDraw.prototype._buildSVG = function (viewCoordSys, api, geo, mapOrGeoModel, data, isVisualEncodedByVisualMap) {
    var mapName = geo.map;
    (0,_coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .viewCoordSysCopyTrans */ .P4)(this._svgGroup, viewCoordSys, _coord_View_js__WEBPACK_IMPORTED_MODULE_5__/* .VIEW_COORD_SYS_TRANS_RAW */ .G6);
    if (this._svgResourceChanged(mapName)) {
      this._freeSVG();
      this._useSVG(mapName);
    }
    var svgDispatcherMap = this._svgDispatcherMap = zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.createHashMap();
    var focusSelf = false;
    zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(this._svgGraphicRecord.named, function (namedItem) {
      // Note that we also allow different elements have the same name.
      // For example, a glyph of a city and the label of the city have
      // the same name and their tooltip info can be defined in a single
      // region option.
      var regionName = namedItem.name;
      var svgNodeTagLower = namedItem.svgNodeTagLower;
      var el = namedItem.el;
      var dataIdx = data ? data.indexOfName(regionName) : null;
      var regionModel = mapOrGeoModel.getRegionModel(regionName);
      if (OPTION_STYLE_ENABLED_TAG_MAP.get(svgNodeTagLower) != null && el instanceof zrender_lib_graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Ay) {
        applyOptionStyleForRegion(api, data, isVisualEncodedByVisualMap, el, dataIdx, regionModel);
      }
      if (el instanceof zrender_lib_graphic_Displayable_js__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Ay) {
        el.culling = true;
      }
      var silent = regionModel.get('silent', true);
      silent != null && (el.silent = silent);
      // We do not know how the SVG like so we'd better not to change z2.
      // Otherwise it might bring some unexpected result. For example,
      // an area hovered that make some inner city can not be clicked.
      el.z2EmphasisLift = 0;
      // If self named:
      if (!namedItem.namedFrom) {
        // label should batter to be displayed based on the center of <g>
        // if it is named rather than displayed on each child.
        if (LABEL_HOST_MAP.get(svgNodeTagLower) != null) {
          resetLabelForRegion(mapOrGeoModel, data, el, regionName, regionModel, dataIdx, null);
        }
        resetEventTriggerForRegion(mapOrGeoModel, data, el, regionName, regionModel, dataIdx);
        resetTooltipForRegion(mapOrGeoModel, data, el, regionName, regionModel);
        if (STATE_TRIGGER_TAG_MAP.get(svgNodeTagLower) != null) {
          var focus_1 = resetStateTriggerForRegion(mapOrGeoModel, el, regionName, regionModel);
          if (focus_1 === 'self') {
            focusSelf = true;
          }
          var els = svgDispatcherMap.get(regionName) || svgDispatcherMap.set(regionName, []);
          els.push(el);
        }
      }
    }, this);
    this._enableBlurEntireSVG(focusSelf, mapOrGeoModel);
  };
  MapDraw.prototype._enableBlurEntireSVG = function (focusSelf, mapOrGeoModel) {
    // It's a little complicated to support blurring the entire geoSVG in series-map.
    // So do not support it until some requirements come.
    // At present, in series-map, only regions can be blurred.
    if (focusSelf && isGeoModel(mapOrGeoModel)) {
      var blurStyle = mapOrGeoModel.getModel(['blur', 'itemStyle']).getItemStyle();
      // Only support `opacity` here. Because not sure that other props are suitable for
      // all of the elements generated by SVG (especially for Text/TSpan/Image/... ).
      var opacity_1 = blurStyle.opacity;
      this._svgGraphicRecord.root.traverse(function (el) {
        if (!el.isGroup) {
          // PENDING: clear those settings to SVG elements when `_freeSVG`.
          // (Currently it happen not to be needed.)
          (0,_util_states_js__WEBPACK_IMPORTED_MODULE_14__/* .setDefaultStateProxy */ .DW)(el);
          var style = el.ensureState('blur').style || {};
          // Do not overwrite the region style that already set from region option.
          if (style.opacity == null && opacity_1 != null) {
            style.opacity = opacity_1;
          }
          // If `ensureState('blur').style = {}`, there will be default opacity.
          // Enable `stateTransition` (animation).
          el.ensureState('emphasis');
        }
      });
    }
  };
  MapDraw.prototype.remove = function () {
    this._regionsGroup.removeAll();
    this._regionsGroupByName = null;
    this._svgGroup.removeAll();
    this._freeSVG();
    this._controller.disable();
  };
  MapDraw.prototype.findHighDownDispatchers = function (name, geoModel) {
    if (name == null) {
      return [];
    }
    var geo = geoModel.coordinateSystem;
    if (geo.resourceType === 'geoJSON') {
      var regionsGroupByName = this._regionsGroupByName;
      if (regionsGroupByName) {
        var regionGroup = regionsGroupByName.get(name);
        return regionGroup ? [regionGroup] : [];
      }
    } else if (geo.resourceType === 'geoSVG') {
      return this._svgDispatcherMap && this._svgDispatcherMap.get(name) || [];
    }
  };
  MapDraw.prototype._svgResourceChanged = function (mapName) {
    return this._svgMapName !== mapName;
  };
  MapDraw.prototype._useSVG = function (mapName) {
    var resource = _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A.getGeoResource(mapName);
    if (resource && resource.type === 'geoSVG') {
      var svgGraphic = resource.useGraphic(this.uid);
      this._svgGroup.add(svgGraphic.root);
      this._svgGraphicRecord = svgGraphic;
      this._svgMapName = mapName;
    }
  };
  MapDraw.prototype._freeSVG = function () {
    var mapName = this._svgMapName;
    if (mapName == null) {
      return;
    }
    var resource = _coord_geo_geoSourceManager_js__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A.getGeoResource(mapName);
    if (resource && resource.type === 'geoSVG') {
      resource.freeGraphic(this.uid);
    }
    this._svgGraphicRecord = null;
    this._svgDispatcherMap = null;
    this._svgGroup.removeAll();
    this._svgMapName = null;
  };
  /**
   * FIXME: this is a temporarily workaround.
   * When `geoRoam` the elements need to be reset in `MapView['render']`, because the props like
   * `ignore` might have been modified by `LabelManager`, and `LabelManager#addLabelsOfSeries`
   * will subsequently cache `defaultAttr` like `ignore`. If do not do this reset, the modified
   * props will have no chance to be restored.
   * Note: This reset should be after `clearStates` in `renderSeries` because `useStates` in
   * `renderSeries` will cache the modified `ignore` to `el._normalState`.
   * TODO:
   * Use clone/immutable in `LabelManager`?
   */
  MapDraw.prototype.resetForLabelLayout = function () {
    this.group.traverse(function (el) {
      var label = el.getTextContent();
      if (label) {
        label.ignore = mapLabelRaw(label).ignore;
      }
    });
  };
  MapDraw.prototype._updateMapSelectHandler = function (mapOrGeoModel, regionsGroup, api, fromView) {
    var mapDraw = this;
    regionsGroup.off('mousedown');
    regionsGroup.off('click');
    if (mapOrGeoModel.get('selectedMode')) {
      regionsGroup.on('mousedown', function () {
        mapDraw._mouseDownFlag = true;
      });
      regionsGroup.on('click', function (e) {
        if (!mapDraw._mouseDownFlag) {
          return;
        }
        mapDraw._mouseDownFlag = false;
      });
    }
  };
  return MapDraw;
}();
;
function applyOptionStyleForRegion(api, data, isVisualEncodedByVisualMap, el, dataIndex, regionModel) {
  // All of the path are using `itemStyle`, because
  // (1) Some SVG also use fill on polyline (The different between
  // polyline and polygon is "open" or "close" but not fill or not).
  // (2) For the common props like opacity, if some use itemStyle
  // and some use `lineStyle`, it might confuse users.
  // (3) Most SVG use <path>, where can not detect whether to draw a "line"
  // or a filled shape, so use `itemStyle` for <path>.
  var normalStyleModel = regionModel.getModel('itemStyle');
  var emphasisStyleModel = regionModel.getModel(['emphasis', 'itemStyle']);
  var blurStyleModel = regionModel.getModel(['blur', 'itemStyle']);
  var selectStyleModel = regionModel.getModel(['select', 'itemStyle']);
  // NOTE: DON'T use 'style' in visual when drawing map.
  // This component is used for drawing underlying map for both geo component and map series.
  var normalStyle = getFixedItemStyle(normalStyleModel);
  var emphasisStyle = getFixedItemStyle(emphasisStyleModel);
  var selectStyle = getFixedItemStyle(selectStyleModel);
  var blurStyle = getFixedItemStyle(blurStyleModel);
  // Update the itemStyle if has data visual
  if (data) {
    // Only visual color of each item will be used. It can be encoded by visualMap
    // But visual color of series is used in symbol drawing
    // Visual color for each series is for the symbol draw
    var style = data.getItemVisual(dataIndex, 'style');
    var decal = data.getItemVisual(dataIndex, 'decal');
    if (isVisualEncodedByVisualMap && style.fill) {
      normalStyle.fill = style.fill;
    }
    if (decal) {
      normalStyle.decal = (0,_util_decal_js__WEBPACK_IMPORTED_MODULE_16__/* .createOrUpdatePatternFromDecal */ .w)(decal, api);
    }
  }
  // SVG text, tspan and image can be named but not supporeted
  // to be styled by region option yet.
  el.setStyle(normalStyle);
  el.style.strokeNoScale = true;
  el.ensureState('emphasis').style = emphasisStyle;
  el.ensureState('select').style = selectStyle;
  el.ensureState('blur').style = blurStyle;
  // Enable blur
  (0,_util_states_js__WEBPACK_IMPORTED_MODULE_14__/* .setDefaultStateProxy */ .DW)(el);
}
function resetLabelForRegion(mapOrGeoModel, data, el, regionName, regionModel,
// Exist only if `viewBuildCtx.data` exists.
dataIdx,
// If labelXY not provided, use `textConfig.position: 'inside'`
labelXY) {
  var isDataNaN = data && isNaN(data.get(data.mapDimension('value'), dataIdx));
  var itemLayout = data && data.getItemLayout(dataIdx);
  // In the following cases label will be drawn
  // 1. In map series and data value is NaN
  // 2. In geo component
  // 3. Region has no series legendIcon, which will be add a showLabel flag in mapSymbolLayout
  if (isGeoModel(mapOrGeoModel) || isDataNaN || itemLayout && itemLayout.showLabel) {
    var query = !isGeoModel(mapOrGeoModel) ? dataIdx : regionName;
    var labelFetcher = void 0;
    // Consider dataIdx not found.
    if (!data || dataIdx >= 0) {
      labelFetcher = mapOrGeoModel;
    }
    var specifiedTextOpt = labelXY ? {
      normal: {
        align: 'center',
        verticalAlign: 'middle'
      }
    } : null;
    // Caveat: must be called after `setDefaultStateProxy(el);` called.
    // because textContent will be assign with `el.stateProxy` inside.
    (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_17__/* .setLabelStyle */ .qM)(el, (0,_label_labelStyle_js__WEBPACK_IMPORTED_MODULE_17__/* .getLabelStatesModels */ .lx)(regionModel), {
      labelFetcher: labelFetcher,
      labelDataIndex: query,
      defaultText: regionName
    }, specifiedTextOpt);
    var textEl = el.getTextContent();
    if (textEl) {
      mapLabelRaw(textEl).ignore = textEl.ignore;
      if (el.textConfig && labelXY) {
        // Compute a relative offset based on the el bounding rect.
        var rect = el.getBoundingRect().clone();
        // Need to make sure the percent position base on the same rect in normal and
        // emphasis state. Otherwise if using boundingRect of el, but the emphasis state
        // has borderWidth (even 0.5px), the text position will be changed obviously
        // if the position is very big like ['1234%', '1345%'].
        el.textConfig.layoutRect = rect;
        el.textConfig.position = [(labelXY[0] - rect.x) / rect.width * 100 + '%', (labelXY[1] - rect.y) / rect.height * 100 + '%'];
      }
    }
    // PENDING:
    // If labelLayout is enabled (test/label-layout.html), el.dataIndex should be specified.
    // But el.dataIndex is also used to determine whether user event should be triggered,
    // where el.seriesIndex or el.dataModel must be specified. At present for a single el
    // there is not case that "only label layout enabled but user event disabled", so here
    // we depends `resetEventTriggerForRegion` to do the job of setting `el.dataIndex`.
    el.disableLabelAnimation = true;
  } else {
    el.removeTextContent();
    el.removeTextConfig();
    el.disableLabelAnimation = null;
  }
}
function resetEventTriggerForRegion(mapOrGeoModel, data, eventTrigger, regionName, regionModel,
// Exist only if `viewBuildCtx.data` exists.
dataIdx) {
  // setItemGraphicEl, setHoverStyle after all polygons and labels
  // are added to the regionGroup
  if (data) {
    // FIXME: when series-map use a SVG map, and there are duplicated name specified
    // on different SVG elements, after `data.setItemGraphicEl(...)`:
    // (1) all of them will be mounted with `dataIndex`, `seriesIndex`, so that tooltip
    // can be triggered only mouse hover. That's correct.
    // (2) only the last element will be kept in `data`, so that if trigger tooltip
    // by `dispatchAction`, only the last one can be found and triggered. That might be
    // not correct. We will fix it in future if anyone demanding that.
    data.setItemGraphicEl(dataIdx, eventTrigger);
  }
  // series-map will not trigger "geoselectchange" no matter it is
  // based on a declared geo component. Because series-map will
  // trigger "selectchange". If it trigger both the two events,
  // If users call `chart.dispatchAction({type: 'toggleSelect'})`,
  // it not easy to also fire event "geoselectchanged".
  else {
    // Package custom mouse event for geo component
    (0,_util_innerStore_js__WEBPACK_IMPORTED_MODULE_18__/* .getECData */ .z)(eventTrigger).eventData = {
      componentType: 'geo',
      componentIndex: mapOrGeoModel.componentIndex,
      geoIndex: mapOrGeoModel.componentIndex,
      name: regionName,
      region: regionModel && regionModel.option || {}
    };
  }
}
function resetTooltipForRegion(mapOrGeoModel, data, el, regionName, regionModel) {
  if (!data) {
    _util_graphic_js__WEBPACK_IMPORTED_MODULE_19__.setTooltipConfig({
      el: el,
      componentModel: mapOrGeoModel,
      itemName: regionName,
      // @ts-ignore FIXME:TS fix the "compatible with each other"?
      itemTooltipOption: regionModel.get('tooltip')
    });
  }
}
function resetStateTriggerForRegion(mapOrGeoModel, el, regionName, regionModel) {
  // @ts-ignore FIXME:TS fix the "compatible with each other"?
  el.highDownSilentOnTouch = !!mapOrGeoModel.get('selectedMode');
  // @ts-ignore FIXME:TS fix the "compatible with each other"?
  var emphasisModel = regionModel.getModel('emphasis');
  var focus = emphasisModel.get('focus');
  (0,_util_states_js__WEBPACK_IMPORTED_MODULE_14__/* .toggleHoverEmphasis */ .Lm)(el, focus, emphasisModel.get('blurScope'), emphasisModel.get('disabled'));
  if (isGeoModel(mapOrGeoModel)) {
    (0,_util_states_js__WEBPACK_IMPORTED_MODULE_14__/* .enableComponentHighDownFeatures */ .ml)(el, mapOrGeoModel, regionName);
  }
  return focus;
}
function projectPolys(rings,
// Polygons include exterior and interiors. Or polylines.
createStream, isLine) {
  var polygons = [];
  var curPoly;
  function startPolygon() {
    curPoly = [];
  }
  function endPolygon() {
    if (curPoly.length) {
      polygons.push(curPoly);
      curPoly = [];
    }
  }
  var stream = createStream({
    polygonStart: startPolygon,
    polygonEnd: endPolygon,
    lineStart: startPolygon,
    lineEnd: endPolygon,
    point: function (x, y) {
      // May have NaN values from stream.
      if (isFinite(x) && isFinite(y)) {
        curPoly.push([x, y]);
      }
    },
    sphere: function () {}
  });
  !isLine && stream.polygonStart();
  zrender_lib_core_util_js__WEBPACK_IMPORTED_MODULE_0__.each(rings, function (ring) {
    stream.lineStart();
    for (var i = 0; i < ring.length; i++) {
      stream.point(ring[i][0], ring[i][1]);
    }
    stream.lineEnd();
  });
  !isLine && stream.polygonEnd();
  return polygons;
}
function isGeoModel(mapOrGeoModel) {
  return mapOrGeoModel.mainType === 'geo';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapDraw);
// @ts-ignore FIXME:TS fix the "compatible with each other"?

/***/ })

}]);