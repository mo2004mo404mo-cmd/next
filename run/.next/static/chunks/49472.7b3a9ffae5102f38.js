"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[49472],{

/***/ 1501:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ createWithEqualityFn)
/* harmony export */ });
/* unused harmony export useStoreWithEqualityFn */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(94577);
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35867);




const { useSyncExternalStoreWithSelector } = use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_1__;
const identity = (arg) => arg;
function useStoreWithEqualityFn(api, selector = identity, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getInitialState,
    selector,
    equalityFn
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(slice);
  return slice;
}
const createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
  const api = (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_2__/* .createStore */ .y)(createState);
  const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
  Object.assign(useBoundStoreWithEqualityFn, api);
  return useBoundStoreWithEqualityFn;
};
const createWithEqualityFn = ((createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl);




/***/ }),

/***/ 18504:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ VerticalBlurShader)
/* harmony export */ });
const VerticalBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    v: { value: 1 / 512 }
  },
  vertexShader: (
    /* glsl */
    `
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `
  ),
  fragmentShader: (
    /* glsl */
    `

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `
  )
};

//# sourceMappingURL=VerticalBlurShader.js.map


/***/ }),

/***/ 18654:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ OrbitControls)
/* harmony export */ });
/* unused harmony export MapControls */
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97650);
/* harmony import */ var _EventDispatcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72057);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};


const _ray = /* @__PURE__ */ new three__WEBPACK_IMPORTED_MODULE_0__/* .Ray */ .RlV();
const _plane = /* @__PURE__ */ new three__WEBPACK_IMPORTED_MODULE_0__/* .Plane */ .Zcv();
const TILT_LIMIT = Math.cos(70 * (Math.PI / 180));
const moduloWrapAround = (offset, capacity) => (offset % capacity + capacity) % capacity;
class OrbitControls extends _EventDispatcher_js__WEBPACK_IMPORTED_MODULE_1__/* .EventDispatcher */ .Q {
  constructor(object, domElement) {
    super();
    __publicField(this, "object");
    __publicField(this, "domElement");
    // Set to false to disable this control
    __publicField(this, "enabled", true);
    // "target" sets the location of focus, where the object orbits around
    __publicField(this, "target", new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0());
    // How far you can dolly in and out ( PerspectiveCamera only )
    __publicField(this, "minDistance", 0);
    __publicField(this, "maxDistance", Infinity);
    // How far you can zoom in and out ( OrthographicCamera only )
    __publicField(this, "minZoom", 0);
    __publicField(this, "maxZoom", Infinity);
    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    __publicField(this, "minPolarAngle", 0);
    // radians
    __publicField(this, "maxPolarAngle", Math.PI);
    // radians
    // How far you can orbit horizontally, upper and lower limits.
    // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
    __publicField(this, "minAzimuthAngle", -Infinity);
    // radians
    __publicField(this, "maxAzimuthAngle", Infinity);
    // radians
    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    __publicField(this, "enableDamping", false);
    __publicField(this, "dampingFactor", 0.05);
    // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
    // Set to false to disable zooming
    __publicField(this, "enableZoom", true);
    __publicField(this, "zoomSpeed", 1);
    // Set to false to disable rotating
    __publicField(this, "enableRotate", true);
    __publicField(this, "rotateSpeed", 1);
    // Set to false to disable panning
    __publicField(this, "enablePan", true);
    __publicField(this, "panSpeed", 1);
    __publicField(this, "screenSpacePanning", true);
    // if false, pan orthogonal to world-space direction camera.up
    __publicField(this, "keyPanSpeed", 7);
    // pixels moved per arrow key push
    __publicField(this, "zoomToCursor", false);
    // Set to true to automatically rotate around the target
    // If auto-rotate is enabled, you must call controls.update() in your animation loop
    __publicField(this, "autoRotate", false);
    __publicField(this, "autoRotateSpeed", 2);
    // 30 seconds per orbit when fps is 60
    __publicField(this, "reverseOrbit", false);
    // true if you want to reverse the orbit to mouse drag from left to right = orbits left
    __publicField(this, "reverseHorizontalOrbit", false);
    // true if you want to reverse the horizontal orbit direction
    __publicField(this, "reverseVerticalOrbit", false);
    // true if you want to reverse the vertical orbit direction
    // The four arrow keys
    __publicField(this, "keys", { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" });
    // Mouse buttons
    __publicField(this, "mouseButtons", {
      LEFT: three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.ROTATE,
      MIDDLE: three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.DOLLY,
      RIGHT: three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.PAN
    });
    // Touch fingers
    __publicField(this, "touches", { ONE: three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.ROTATE, TWO: three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.DOLLY_PAN });
    __publicField(this, "target0");
    __publicField(this, "position0");
    __publicField(this, "zoom0");
    // the target DOM element for key events
    __publicField(this, "_domElementKeyEvents", null);
    __publicField(this, "getPolarAngle");
    __publicField(this, "getAzimuthalAngle");
    __publicField(this, "setPolarAngle");
    __publicField(this, "setAzimuthalAngle");
    __publicField(this, "getDistance");
    // Not used in most scenarios, however they can be useful for specific use cases
    __publicField(this, "getZoomScale");
    __publicField(this, "listenToKeyEvents");
    __publicField(this, "stopListenToKeyEvents");
    __publicField(this, "saveState");
    __publicField(this, "reset");
    __publicField(this, "update");
    __publicField(this, "connect");
    __publicField(this, "dispose");
    // Dolly in programmatically
    __publicField(this, "dollyIn");
    // Dolly out programmatically
    __publicField(this, "dollyOut");
    // Get the current scale
    __publicField(this, "getScale");
    // Set the current scale (these are not used in most scenarios, however they can be useful for specific use cases)
    __publicField(this, "setScale");
    this.object = object;
    this.domElement = domElement;
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.getPolarAngle = () => spherical.phi;
    this.getAzimuthalAngle = () => spherical.theta;
    this.setPolarAngle = (value) => {
      let phi = moduloWrapAround(value, 2 * Math.PI);
      let currentPhi = spherical.phi;
      if (currentPhi < 0)
        currentPhi += 2 * Math.PI;
      if (phi < 0)
        phi += 2 * Math.PI;
      let phiDist = Math.abs(phi - currentPhi);
      if (2 * Math.PI - phiDist < phiDist) {
        if (phi < currentPhi) {
          phi += 2 * Math.PI;
        } else {
          currentPhi += 2 * Math.PI;
        }
      }
      sphericalDelta.phi = phi - currentPhi;
      scope.update();
    };
    this.setAzimuthalAngle = (value) => {
      let theta = moduloWrapAround(value, 2 * Math.PI);
      let currentTheta = spherical.theta;
      if (currentTheta < 0)
        currentTheta += 2 * Math.PI;
      if (theta < 0)
        theta += 2 * Math.PI;
      let thetaDist = Math.abs(theta - currentTheta);
      if (2 * Math.PI - thetaDist < thetaDist) {
        if (theta < currentTheta) {
          theta += 2 * Math.PI;
        } else {
          currentTheta += 2 * Math.PI;
        }
      }
      sphericalDelta.theta = theta - currentTheta;
      scope.update();
    };
    this.getDistance = () => scope.object.position.distanceTo(scope.target);
    this.listenToKeyEvents = (domElement2) => {
      domElement2.addEventListener("keydown", onKeyDown);
      this._domElementKeyEvents = domElement2;
    };
    this.stopListenToKeyEvents = () => {
      this._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
      this._domElementKeyEvents = null;
    };
    this.saveState = () => {
      scope.target0.copy(scope.target);
      scope.position0.copy(scope.object.position);
      scope.zoom0 = scope.object.zoom;
    };
    this.reset = () => {
      scope.target.copy(scope.target0);
      scope.object.position.copy(scope.position0);
      scope.object.zoom = scope.zoom0;
      scope.object.updateProjectionMatrix();
      scope.dispatchEvent(changeEvent);
      scope.update();
      state = STATE.NONE;
    };
    this.update = (() => {
      const offset = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
      const up = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0(0, 1, 0);
      const quat = new three__WEBPACK_IMPORTED_MODULE_0__/* .Quaternion */ .PTz().setFromUnitVectors(object.up, up);
      const quatInverse = quat.clone().invert();
      const lastPosition = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
      const lastQuaternion = new three__WEBPACK_IMPORTED_MODULE_0__/* .Quaternion */ .PTz();
      const twoPI = 2 * Math.PI;
      return function update() {
        const position = scope.object.position;
        quat.setFromUnitVectors(object.up, up);
        quatInverse.copy(quat).invert();
        offset.copy(position).sub(scope.target);
        offset.applyQuaternion(quat);
        spherical.setFromVector3(offset);
        if (scope.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }
        if (scope.enableDamping) {
          spherical.theta += sphericalDelta.theta * scope.dampingFactor;
          spherical.phi += sphericalDelta.phi * scope.dampingFactor;
        } else {
          spherical.theta += sphericalDelta.theta;
          spherical.phi += sphericalDelta.phi;
        }
        let min = scope.minAzimuthAngle;
        let max = scope.maxAzimuthAngle;
        if (isFinite(min) && isFinite(max)) {
          if (min < -Math.PI)
            min += twoPI;
          else if (min > Math.PI)
            min -= twoPI;
          if (max < -Math.PI)
            max += twoPI;
          else if (max > Math.PI)
            max -= twoPI;
          if (min <= max) {
            spherical.theta = Math.max(min, Math.min(max, spherical.theta));
          } else {
            spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
          }
        }
        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
        spherical.makeSafe();
        if (scope.enableDamping === true) {
          scope.target.addScaledVector(panOffset, scope.dampingFactor);
        } else {
          scope.target.add(panOffset);
        }
        if (scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera) {
          spherical.radius = clampDistance(spherical.radius);
        } else {
          spherical.radius = clampDistance(spherical.radius * scale);
        }
        offset.setFromSpherical(spherical);
        offset.applyQuaternion(quatInverse);
        position.copy(scope.target).add(offset);
        if (!scope.object.matrixAutoUpdate)
          scope.object.updateMatrix();
        scope.object.lookAt(scope.target);
        if (scope.enableDamping === true) {
          sphericalDelta.theta *= 1 - scope.dampingFactor;
          sphericalDelta.phi *= 1 - scope.dampingFactor;
          panOffset.multiplyScalar(1 - scope.dampingFactor);
        } else {
          sphericalDelta.set(0, 0, 0);
          panOffset.set(0, 0, 0);
        }
        let zoomChanged = false;
        if (scope.zoomToCursor && performCursorZoom) {
          let newRadius = null;
          if (scope.object instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .PerspectiveCamera */ .ubm && scope.object.isPerspectiveCamera) {
            const prevRadius = offset.length();
            newRadius = clampDistance(prevRadius * scale);
            const radiusDelta = prevRadius - newRadius;
            scope.object.position.addScaledVector(dollyDirection, radiusDelta);
            scope.object.updateMatrixWorld();
          } else if (scope.object.isOrthographicCamera) {
            const mouseBefore = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0(mouse.x, mouse.y, 0);
            mouseBefore.unproject(scope.object);
            scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
            scope.object.updateProjectionMatrix();
            zoomChanged = true;
            const mouseAfter = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0(mouse.x, mouse.y, 0);
            mouseAfter.unproject(scope.object);
            scope.object.position.sub(mouseAfter).add(mouseBefore);
            scope.object.updateMatrixWorld();
            newRadius = offset.length();
          } else {
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
            scope.zoomToCursor = false;
          }
          if (newRadius !== null) {
            if (scope.screenSpacePanning) {
              scope.target.set(0, 0, -1).transformDirection(scope.object.matrix).multiplyScalar(newRadius).add(scope.object.position);
            } else {
              _ray.origin.copy(scope.object.position);
              _ray.direction.set(0, 0, -1).transformDirection(scope.object.matrix);
              if (Math.abs(scope.object.up.dot(_ray.direction)) < TILT_LIMIT) {
                object.lookAt(scope.target);
              } else {
                _plane.setFromNormalAndCoplanarPoint(scope.object.up, scope.target);
                _ray.intersectPlane(_plane, scope.target);
              }
            }
          }
        } else if (scope.object instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .OrthographicCamera */ .qUd && scope.object.isOrthographicCamera) {
          zoomChanged = scale !== 1;
          if (zoomChanged) {
            scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
            scope.object.updateProjectionMatrix();
          }
        }
        scale = 1;
        performCursorZoom = false;
        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
          scope.dispatchEvent(changeEvent);
          lastPosition.copy(scope.object.position);
          lastQuaternion.copy(scope.object.quaternion);
          zoomChanged = false;
          return true;
        }
        return false;
      };
    })();
    this.connect = (domElement2) => {
      scope.domElement = domElement2;
      scope.domElement.style.touchAction = "none";
      scope.domElement.addEventListener("contextmenu", onContextMenu);
      scope.domElement.addEventListener("pointerdown", onPointerDown);
      scope.domElement.addEventListener("pointercancel", onPointerUp);
      scope.domElement.addEventListener("wheel", onMouseWheel);
    };
    this.dispose = () => {
      var _a, _b, _c, _d, _e, _f;
      if (scope.domElement) {
        scope.domElement.style.touchAction = "auto";
      }
      (_a = scope.domElement) == null ? void 0 : _a.removeEventListener("contextmenu", onContextMenu);
      (_b = scope.domElement) == null ? void 0 : _b.removeEventListener("pointerdown", onPointerDown);
      (_c = scope.domElement) == null ? void 0 : _c.removeEventListener("pointercancel", onPointerUp);
      (_d = scope.domElement) == null ? void 0 : _d.removeEventListener("wheel", onMouseWheel);
      (_e = scope.domElement) == null ? void 0 : _e.ownerDocument.removeEventListener("pointermove", onPointerMove);
      (_f = scope.domElement) == null ? void 0 : _f.ownerDocument.removeEventListener("pointerup", onPointerUp);
      if (scope._domElementKeyEvents !== null) {
        scope._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
      }
    };
    const scope = this;
    const changeEvent = { type: "change" };
    const startEvent = { type: "start" };
    const endEvent = { type: "end" };
    const STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let state = STATE.NONE;
    const EPS = 1e-6;
    const spherical = new three__WEBPACK_IMPORTED_MODULE_0__/* .Spherical */ .YHV();
    const sphericalDelta = new three__WEBPACK_IMPORTED_MODULE_0__/* .Spherical */ .YHV();
    let scale = 1;
    const panOffset = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
    const rotateStart = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const rotateEnd = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const rotateDelta = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const panStart = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const panEnd = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const panDelta = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const dollyStart = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const dollyEnd = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const dollyDelta = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    const dollyDirection = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
    const mouse = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
    let performCursorZoom = false;
    const pointers = [];
    const pointerPositions = {};
    function getAutoRotationAngle() {
      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }
    function getZoomScale() {
      return Math.pow(0.95, scope.zoomSpeed);
    }
    function rotateLeft(angle) {
      if (scope.reverseOrbit || scope.reverseHorizontalOrbit) {
        sphericalDelta.theta += angle;
      } else {
        sphericalDelta.theta -= angle;
      }
    }
    function rotateUp(angle) {
      if (scope.reverseOrbit || scope.reverseVerticalOrbit) {
        sphericalDelta.phi += angle;
      } else {
        sphericalDelta.phi -= angle;
      }
    }
    const panLeft = (() => {
      const v = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
      return function panLeft2(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    })();
    const panUp = (() => {
      const v = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
      return function panUp2(distance, objectMatrix) {
        if (scope.screenSpacePanning === true) {
          v.setFromMatrixColumn(objectMatrix, 1);
        } else {
          v.setFromMatrixColumn(objectMatrix, 0);
          v.crossVectors(scope.object.up, v);
        }
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    })();
    const pan = (() => {
      const offset = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
      return function pan2(deltaX, deltaY) {
        const element = scope.domElement;
        if (element && scope.object instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .PerspectiveCamera */ .ubm && scope.object.isPerspectiveCamera) {
          const position = scope.object.position;
          offset.copy(position).sub(scope.target);
          let targetDistance = offset.length();
          targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180);
          panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
        } else if (element && scope.object instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .OrthographicCamera */ .qUd && scope.object.isOrthographicCamera) {
          panLeft(
            deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth,
            scope.object.matrix
          );
          panUp(
            deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight,
            scope.object.matrix
          );
        } else {
          console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
          scope.enablePan = false;
        }
      };
    })();
    function setScale(newScale) {
      if (scope.object instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .PerspectiveCamera */ .ubm && scope.object.isPerspectiveCamera || scope.object instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .OrthographicCamera */ .qUd && scope.object.isOrthographicCamera) {
        scale = newScale;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        scope.enableZoom = false;
      }
    }
    function dollyOut(dollyScale) {
      setScale(scale / dollyScale);
    }
    function dollyIn(dollyScale) {
      setScale(scale * dollyScale);
    }
    function updateMouseParameters(event) {
      if (!scope.zoomToCursor || !scope.domElement) {
        return;
      }
      performCursorZoom = true;
      const rect = scope.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      mouse.x = x / w * 2 - 1;
      mouse.y = -(y / h) * 2 + 1;
      dollyDirection.set(mouse.x, mouse.y, 1).unproject(scope.object).sub(scope.object.position).normalize();
    }
    function clampDistance(dist) {
      return Math.max(scope.minDistance, Math.min(scope.maxDistance, dist));
    }
    function handleMouseDownRotate(event) {
      rotateStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownDolly(event) {
      updateMouseParameters(event);
      dollyStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownPan(event) {
      panStart.set(event.clientX, event.clientY);
    }
    function handleMouseMoveRotate(event) {
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;
      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }
      rotateStart.copy(rotateEnd);
      scope.update();
    }
    function handleMouseMoveDolly(event) {
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);
      if (dollyDelta.y > 0) {
        dollyOut(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyIn(getZoomScale());
      }
      dollyStart.copy(dollyEnd);
      scope.update();
    }
    function handleMouseMovePan(event) {
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      scope.update();
    }
    function handleMouseWheel(event) {
      updateMouseParameters(event);
      if (event.deltaY < 0) {
        dollyIn(getZoomScale());
      } else if (event.deltaY > 0) {
        dollyOut(getZoomScale());
      }
      scope.update();
    }
    function handleKeyDown(event) {
      let needsUpdate = false;
      switch (event.code) {
        case scope.keys.UP:
          pan(0, scope.keyPanSpeed);
          needsUpdate = true;
          break;
        case scope.keys.BOTTOM:
          pan(0, -scope.keyPanSpeed);
          needsUpdate = true;
          break;
        case scope.keys.LEFT:
          pan(scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;
        case scope.keys.RIGHT:
          pan(-scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;
      }
      if (needsUpdate) {
        event.preventDefault();
        scope.update();
      }
    }
    function handleTouchStartRotate() {
      if (pointers.length == 1) {
        rotateStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        rotateStart.set(x, y);
      }
    }
    function handleTouchStartPan() {
      if (pointers.length == 1) {
        panStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        panStart.set(x, y);
      }
    }
    function handleTouchStartDolly() {
      const dx = pointers[0].pageX - pointers[1].pageX;
      const dy = pointers[0].pageY - pointers[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }
    function handleTouchStartDollyPan() {
      if (scope.enableZoom)
        handleTouchStartDolly();
      if (scope.enablePan)
        handleTouchStartPan();
    }
    function handleTouchStartDollyRotate() {
      if (scope.enableZoom)
        handleTouchStartDolly();
      if (scope.enableRotate)
        handleTouchStartRotate();
    }
    function handleTouchMoveRotate(event) {
      if (pointers.length == 1) {
        rotateEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        rotateEnd.set(x, y);
      }
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;
      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }
      rotateStart.copy(rotateEnd);
    }
    function handleTouchMovePan(event) {
      if (pointers.length == 1) {
        panEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        panEnd.set(x, y);
      }
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
    }
    function handleTouchMoveDolly(event) {
      const position = getSecondPointerPosition(event);
      const dx = event.pageX - position.x;
      const dy = event.pageY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
      dollyOut(dollyDelta.y);
      dollyStart.copy(dollyEnd);
    }
    function handleTouchMoveDollyPan(event) {
      if (scope.enableZoom)
        handleTouchMoveDolly(event);
      if (scope.enablePan)
        handleTouchMovePan(event);
    }
    function handleTouchMoveDollyRotate(event) {
      if (scope.enableZoom)
        handleTouchMoveDolly(event);
      if (scope.enableRotate)
        handleTouchMoveRotate(event);
    }
    function onPointerDown(event) {
      var _a, _b;
      if (scope.enabled === false)
        return;
      if (pointers.length === 0) {
        (_a = scope.domElement) == null ? void 0 : _a.ownerDocument.addEventListener("pointermove", onPointerMove);
        (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.addEventListener("pointerup", onPointerUp);
      }
      addPointer(event);
      if (event.pointerType === "touch") {
        onTouchStart(event);
      } else {
        onMouseDown(event);
      }
    }
    function onPointerMove(event) {
      if (scope.enabled === false)
        return;
      if (event.pointerType === "touch") {
        onTouchMove(event);
      } else {
        onMouseMove(event);
      }
    }
    function onPointerUp(event) {
      var _a, _b, _c;
      removePointer(event);
      if (pointers.length === 0) {
        (_a = scope.domElement) == null ? void 0 : _a.releasePointerCapture(event.pointerId);
        (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.removeEventListener("pointermove", onPointerMove);
        (_c = scope.domElement) == null ? void 0 : _c.ownerDocument.removeEventListener("pointerup", onPointerUp);
      }
      scope.dispatchEvent(endEvent);
      state = STATE.NONE;
    }
    function onMouseDown(event) {
      let mouseAction;
      switch (event.button) {
        case 0:
          mouseAction = scope.mouseButtons.LEFT;
          break;
        case 1:
          mouseAction = scope.mouseButtons.MIDDLE;
          break;
        case 2:
          mouseAction = scope.mouseButtons.RIGHT;
          break;
        default:
          mouseAction = -1;
      }
      switch (mouseAction) {
        case three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.DOLLY:
          if (scope.enableZoom === false)
            return;
          handleMouseDownDolly(event);
          state = STATE.DOLLY;
          break;
        case three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.ROTATE:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          } else {
            if (scope.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          }
          break;
        case three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.PAN:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          } else {
            if (scope.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }
    function onMouseMove(event) {
      if (scope.enabled === false)
        return;
      switch (state) {
        case STATE.ROTATE:
          if (scope.enableRotate === false)
            return;
          handleMouseMoveRotate(event);
          break;
        case STATE.DOLLY:
          if (scope.enableZoom === false)
            return;
          handleMouseMoveDolly(event);
          break;
        case STATE.PAN:
          if (scope.enablePan === false)
            return;
          handleMouseMovePan(event);
          break;
      }
    }
    function onMouseWheel(event) {
      if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) {
        return;
      }
      event.preventDefault();
      scope.dispatchEvent(startEvent);
      handleMouseWheel(event);
      scope.dispatchEvent(endEvent);
    }
    function onKeyDown(event) {
      if (scope.enabled === false || scope.enablePan === false)
        return;
      handleKeyDown(event);
    }
    function onTouchStart(event) {
      trackPointer(event);
      switch (pointers.length) {
        case 1:
          switch (scope.touches.ONE) {
            case three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.ROTATE:
              if (scope.enableRotate === false)
                return;
              handleTouchStartRotate();
              state = STATE.TOUCH_ROTATE;
              break;
            case three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.PAN:
              if (scope.enablePan === false)
                return;
              handleTouchStartPan();
              state = STATE.TOUCH_PAN;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        case 2:
          switch (scope.touches.TWO) {
            case three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.DOLLY_PAN:
              if (scope.enableZoom === false && scope.enablePan === false)
                return;
              handleTouchStartDollyPan();
              state = STATE.TOUCH_DOLLY_PAN;
              break;
            case three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.DOLLY_ROTATE:
              if (scope.enableZoom === false && scope.enableRotate === false)
                return;
              handleTouchStartDollyRotate();
              state = STATE.TOUCH_DOLLY_ROTATE;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }
    function onTouchMove(event) {
      trackPointer(event);
      switch (state) {
        case STATE.TOUCH_ROTATE:
          if (scope.enableRotate === false)
            return;
          handleTouchMoveRotate(event);
          scope.update();
          break;
        case STATE.TOUCH_PAN:
          if (scope.enablePan === false)
            return;
          handleTouchMovePan(event);
          scope.update();
          break;
        case STATE.TOUCH_DOLLY_PAN:
          if (scope.enableZoom === false && scope.enablePan === false)
            return;
          handleTouchMoveDollyPan(event);
          scope.update();
          break;
        case STATE.TOUCH_DOLLY_ROTATE:
          if (scope.enableZoom === false && scope.enableRotate === false)
            return;
          handleTouchMoveDollyRotate(event);
          scope.update();
          break;
        default:
          state = STATE.NONE;
      }
    }
    function onContextMenu(event) {
      if (scope.enabled === false)
        return;
      event.preventDefault();
    }
    function addPointer(event) {
      pointers.push(event);
    }
    function removePointer(event) {
      delete pointerPositions[event.pointerId];
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId == event.pointerId) {
          pointers.splice(i, 1);
          return;
        }
      }
    }
    function trackPointer(event) {
      let position = pointerPositions[event.pointerId];
      if (position === void 0) {
        position = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector2 */ .I9Y();
        pointerPositions[event.pointerId] = position;
      }
      position.set(event.pageX, event.pageY);
    }
    function getSecondPointerPosition(event) {
      const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
      return pointerPositions[pointer.pointerId];
    }
    this.dollyIn = (dollyScale = getZoomScale()) => {
      dollyIn(dollyScale);
      scope.update();
    };
    this.dollyOut = (dollyScale = getZoomScale()) => {
      dollyOut(dollyScale);
      scope.update();
    };
    this.getScale = () => {
      return scale;
    };
    this.setScale = (newScale) => {
      setScale(newScale);
      scope.update();
    };
    this.getZoomScale = () => {
      return getZoomScale();
    };
    if (domElement !== void 0)
      this.connect(domElement);
    this.update();
  }
}
class MapControls extends OrbitControls {
  constructor(object, domElement) {
    super(object, domElement);
    this.screenSpacePanning = false;
    this.mouseButtons.LEFT = three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.PAN;
    this.mouseButtons.RIGHT = three__WEBPACK_IMPORTED_MODULE_0__/* .MOUSE */ .kBv.ROTATE;
    this.touches.ONE = three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.PAN;
    this.touches.TWO = three__WEBPACK_IMPORTED_MODULE_0__/* .TOUCH */ .wtR.DOLLY_ROTATE;
  }
}

//# sourceMappingURL=OrbitControls.js.map


/***/ }),

/***/ 21728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hl: () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75860);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29625);
/* harmony import */ var react_use_measure__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(80661);
/* harmony import */ var its_fine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(72019);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* harmony import */ var scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88745);











function CanvasImpl({
  ref,
  children,
  fallback,
  resize,
  style,
  gl,
  events = _events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.f,
  eventSource,
  eventPrefix,
  shadows,
  linear,
  flat,
  legacy,
  orthographic,
  frameloop,
  dpr,
  performance,
  raycaster,
  camera,
  scene,
  onPointerMissed,
  onCreated,
  ...props
}) {
  // Create a known catalogue of Threejs-native elements
  // This will include the entire THREE namespace by default, users can extend
  // their own elements by using the createRoot API instead
  react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.e)(three__WEBPACK_IMPORTED_MODULE_4__), []);
  const Bridge = (0,_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.u)();
  const [containerRef, containerRect] = (0,react_use_measure__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)({
    scroll: true,
    debounce: {
      scroll: 50,
      resize: 0
    },
    ...resize
  });
  const canvasRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const divRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(ref, () => canvasRef.current);
  const handlePointerMissed = (0,_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.a)(onPointerMissed);
  const pointerMissed = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => handlePointerMissed.current == null ? void 0 : handlePointerMissed.current(event), [handlePointerMissed]);
  const [block, setBlock] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const [error, setError] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);

  // Suspend this component if block is a promise (2nd run)
  if (block) throw block;
  // Throw exception outwards if anything within canvas throws
  if (error) throw error;
  const root = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);

  // Waits for an async renderer without hiding the canvas
  const [gate, waitFor] = (0,_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.b)();
  const rootState = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const eventTarget = () => eventSource ? (0,_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.i)(eventSource) ? eventSource.current : eventSource : divRef.current;

  // Insertion effects survive Activity hiding and StrictMode effect replay. Only
  // final removal releases the root, including removal while hidden from React 19.2
  react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect(() => {
    return () => {
      const current = root.current;
      root.current = null;
      current == null ? void 0 : current.unmount();
    };
  }, []);
  (0,_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.c)(() => {
    const canvas = canvasRef.current;
    if (containerRect.width > 0 && containerRect.height > 0 && canvas) {
      if (!root.current) root.current = (0,_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.d)(canvas);
      root.current.configure({
        gl,
        scene,
        events,
        shadows,
        linear,
        flat,
        legacy,
        orthographic,
        frameloop,
        dpr,
        performance,
        raycaster,
        camera,
        size: containerRect,
        // Forwards to the latest onPointerMissed, so a new callback does not update the store
        onPointerMissed: pointerMissed,
        onCreated: state => {
          var _eventTarget;
          rootState.current = state;
          // A ref to an ancestor is not attached yet. The effect below settles it
          state.events.connect == null ? void 0 : state.events.connect((_eventTarget = eventTarget()) != null ? _eventTarget : divRef.current);
          // Set up compute function
          if (eventPrefix) {
            state.setEvents({
              compute: (event, state) => {
                const x = event[eventPrefix + 'X'];
                const y = event[eventPrefix + 'Y'];
                state.pointer.set(x / state.size.width * 2 - 1, -(y / state.size.height) * 2 + 1);
                state.raycaster.setFromCamera(state.pointer, state.camera);
              }
            });
          }
          // Call onCreated callback
          onCreated == null ? void 0 : onCreated(state);
        }
      }).catch(setError);

      // Pending re-runs this effect once the renderer lands. Rejected is reported by the catch
      if (root.current.ready.status === 'fulfilled') {
        root.current.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Bridge, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.E, {
            set: setError,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
              fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_events_e51d7528_esm_js__WEBPACK_IMPORTED_MODULE_3__.B, {
                set: setBlock
              }),
              children: children != null ? children : null
            })
          })
        }));
      } else if (root.current.ready.status === 'pending') {
        waitFor(root.current.ready);
      }
    }
  });

  // Refs on ancestors attach after our layout effect
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    var _rootState$current;
    const state = (_rootState$current = rootState.current) == null ? void 0 : _rootState$current.get();
    const target = eventTarget();
    if (state && target && state.events.connected !== target) state.events.connect == null ? void 0 : state.events.connect(target);
  });

  // Before 19.2, React skips insertion cleanups in a subtree Suspense has hidden but keeps its
  // passive effects connected. A canvas that left the document was removed rather than hidden
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      var _root$current;
      if (!canvas.isConnected) (_root$current = root.current) == null ? void 0 : _root$current.unmount();
    };
  }, []);

  // When the event source is not this div, we need to set pointer-events to none
  // Or else the canvas will block events from reaching the event source
  const pointerEvents = eventSource ? 'none' : 'auto';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    ref: divRef,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents,
      ...style
    },
    ...props,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      ref: containerRef,
      style: {
        width: '100%',
        height: '100%'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("canvas", {
        ref: canvasRef,
        style: {
          display: 'block'
        },
        children: fallback
      })
    }), gate]
  });
}

/**
 * A DOM canvas which accepts threejs elements as children.
 * @see https://docs.pmnd.rs/react-three-fiber/api/canvas
 */
function Canvas(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(its_fine__WEBPACK_IMPORTED_MODULE_6__/* .FiberProvider */ .Af, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CanvasImpl, {
      ...props
    })
  });
}




/***/ }),

/***/ 31091:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ OrbitControls)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(99753);
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75860);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var three_stdlib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18654);





const OrbitControls = /* @__PURE__ */react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  makeDefault,
  camera,
  regress,
  domElement,
  enableDamping = true,
  keyEvents = false,
  onChange,
  onStart,
  onEnd,
  ...restProps
}, ref) => {
  const invalidate = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.invalidate);
  const defaultCamera = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.camera);
  const gl = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.gl);
  const events = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.events);
  const setEvents = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.setEvents);
  const set = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.set);
  const get = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.get);
  const performance = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => new three_stdlib__WEBPACK_IMPORTED_MODULE_2__/* .OrbitControls */ .N(explCamera), [explCamera]);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.F)(() => {
    if (controls.enabled) controls.update();
  }, -1);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (keyEvents) {
      controls.connect(keyEvents === true ? explDomElement : keyEvents);
    }
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [keyEvents, explDomElement, regress, controls, invalidate]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const callback = e => {
      invalidate();
      if (regress) performance.regress();
      if (onChange) onChange(e);
    };
    const onStartCb = e => {
      if (onStart) onStart(e);
    };
    const onEndCb = e => {
      if (onEnd) onEnd(e);
    };
    controls.addEventListener('change', callback);
    controls.addEventListener('start', onStartCb);
    controls.addEventListener('end', onEndCb);
    return () => {
      controls.removeEventListener('start', onStartCb);
      controls.removeEventListener('end', onEndCb);
      controls.removeEventListener('change', callback);
    };
  }, [onChange, onStart, onEnd, controls, invalidate, setEvents]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      // @ts-ignore https://github.com/three-types/three-ts-types/pull/1398
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("primitive", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)({
    ref: ref,
    object: controls,
    enableDamping: enableDamping
  }, restProps));
});




/***/ }),

/***/ 38426:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Grid3x3)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "grid-3x3",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
                key: "afitv7"
            }
        ],
        [
            "path",
            {
                d: "M3 9h18",
                key: "1pudct"
            }
        ],
        [
            "path",
            {
                d: "M3 15h18",
                key: "5xshup"
            }
        ],
        [
            "path",
            {
                d: "M9 3v18",
                key: "fh3hqa"
            }
        ],
        [
            "path",
            {
                d: "M15 3v18",
                key: "14nvp0"
            }
        ]
    ],
    aliases: [
        "grid",
        "grid-3-x-3"
    ]
};
__iconData.node;
const Grid3x3 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=grid-3x3.mjs.map


/***/ }),

/***/ 40810:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ HorizontalBlurShader)
/* harmony export */ });
const HorizontalBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    h: { value: 1 / 512 }
  },
  vertexShader: (
    /* glsl */
    `
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `
  ),
  fragmentShader: (
    /* glsl */
    `
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `
  )
};

//# sourceMappingURL=HorizontalBlurShader.js.map


/***/ }),

/***/ 45282:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ OBJLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97650);


// o object_name | g group_name
const _object_pattern = /^[og]\s*(.+)?/;
// mtllib file_reference
const _material_library_pattern = /^mtllib /;
// usemtl material_name
const _material_use_pattern = /^usemtl /;
// usemap map_name
const _map_use_pattern = /^usemap /;
const _face_vertex_data_separator_pattern = /\s+/;

const _vA = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
const _vB = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
const _vC = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();

const _ab = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();
const _cb = new three__WEBPACK_IMPORTED_MODULE_0__/* .Vector3 */ .Pq0();

const _color = new three__WEBPACK_IMPORTED_MODULE_0__/* .Color */ .Q1f();

function ParserState() {

	const state = {
		objects: [],
		object: {},

		vertices: [],
		normals: [],
		colors: [],
		uvs: [],

		materials: {},
		materialLibraries: [],

		startObject: function ( name, fromDeclaration ) {

			// If the current object (initial from reset) is not from a g/o declaration in the parsed
			// file. We need to use it for the first parsed g/o to keep things in sync.
			if ( this.object && this.object.fromDeclaration === false ) {

				this.object.name = name;
				this.object.fromDeclaration = ( fromDeclaration !== false );
				return;

			}

			const previousMaterial = ( this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined );

			if ( this.object && typeof this.object._finalize === 'function' ) {

				this.object._finalize( true );

			}

			this.object = {
				name: name || '',
				fromDeclaration: ( fromDeclaration !== false ),

				geometry: {
					vertices: [],
					normals: [],
					colors: [],
					uvs: [],
					hasUVIndices: false
				},
				materials: [],
				smooth: true,

				startMaterial: function ( name, libraries ) {

					const previous = this._finalize( false );

					// New usemtl declaration overwrites an inherited material, except if faces were declared
					// after the material, then it must be preserved for proper MultiMaterial continuation.
					if ( previous && ( previous.inherited || previous.groupCount <= 0 ) ) {

						this.materials.splice( previous.index, 1 );

					}

					const material = {
						index: this.materials.length,
						name: name || '',
						mtllib: ( Array.isArray( libraries ) && libraries.length > 0 ? libraries[ libraries.length - 1 ] : '' ),
						smooth: ( previous !== undefined ? previous.smooth : this.smooth ),
						groupStart: ( previous !== undefined ? previous.groupEnd : 0 ),
						groupEnd: - 1,
						groupCount: - 1,
						inherited: false,

						clone: function ( index ) {

							const cloned = {
								index: ( typeof index === 'number' ? index : this.index ),
								name: this.name,
								mtllib: this.mtllib,
								smooth: this.smooth,
								groupStart: 0,
								groupEnd: - 1,
								groupCount: - 1,
								inherited: false
							};
							cloned.clone = this.clone.bind( cloned );
							return cloned;

						}
					};

					this.materials.push( material );

					return material;

				},

				currentMaterial: function () {

					if ( this.materials.length > 0 ) {

						return this.materials[ this.materials.length - 1 ];

					}

					return undefined;

				},

				_finalize: function ( end ) {

					const lastMultiMaterial = this.currentMaterial();
					if ( lastMultiMaterial && lastMultiMaterial.groupEnd === - 1 ) {

						lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
						lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
						lastMultiMaterial.inherited = false;

					}

					// Ignore objects tail materials if no face declarations followed them before a new o/g started.
					if ( end && this.materials.length > 1 ) {

						for ( let mi = this.materials.length - 1; mi >= 0; mi -- ) {

							if ( this.materials[ mi ].groupCount <= 0 ) {

								this.materials.splice( mi, 1 );

							}

						}

					}

					// Guarantee at least one empty material, this makes the creation later more straight forward.
					if ( end && this.materials.length === 0 ) {

						this.materials.push( {
							name: '',
							smooth: this.smooth
						} );

					}

					return lastMultiMaterial;

				}
			};

			// Inherit previous objects material.
			// Spec tells us that a declared material must be set to all objects until a new material is declared.
			// If a usemtl declaration is encountered while this new object is being parsed, it will
			// overwrite the inherited material. Exception being that there was already face declarations
			// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

			if ( previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function' ) {

				const declared = previousMaterial.clone( 0 );
				declared.inherited = true;
				this.object.materials.push( declared );

			}

			this.objects.push( this.object );

		},

		finalize: function () {

			if ( this.object && typeof this.object._finalize === 'function' ) {

				this.object._finalize( true );

			}

		},

		parseVertexIndex: function ( value, len ) {

			const index = parseInt( value, 10 );
			return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

		},

		parseNormalIndex: function ( value, len ) {

			const index = parseInt( value, 10 );
			return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

		},

		parseUVIndex: function ( value, len ) {

			const index = parseInt( value, 10 );
			return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

		},

		addVertex: function ( a, b, c ) {

			const src = this.vertices;
			const dst = this.object.geometry.vertices;

			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
			dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
			dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

		},

		addVertexPoint: function ( a ) {

			const src = this.vertices;
			const dst = this.object.geometry.vertices;

			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

		},

		addVertexLine: function ( a ) {

			const src = this.vertices;
			const dst = this.object.geometry.vertices;

			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

		},

		addNormal: function ( a, b, c ) {

			const src = this.normals;
			const dst = this.object.geometry.normals;

			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
			dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
			dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

		},

		addFaceNormal: function ( a, b, c ) {

			const src = this.vertices;
			const dst = this.object.geometry.normals;

			_vA.fromArray( src, a );
			_vB.fromArray( src, b );
			_vC.fromArray( src, c );

			_cb.subVectors( _vC, _vB );
			_ab.subVectors( _vA, _vB );
			_cb.cross( _ab );

			_cb.normalize();

			dst.push( _cb.x, _cb.y, _cb.z );
			dst.push( _cb.x, _cb.y, _cb.z );
			dst.push( _cb.x, _cb.y, _cb.z );

		},

		addColor: function ( a, b, c ) {

			const src = this.colors;
			const dst = this.object.geometry.colors;

			if ( src[ a ] !== undefined ) dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
			if ( src[ b ] !== undefined ) dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
			if ( src[ c ] !== undefined ) dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

		},

		addUV: function ( a, b, c ) {

			const src = this.uvs;
			const dst = this.object.geometry.uvs;

			dst.push( src[ a + 0 ], src[ a + 1 ] );
			dst.push( src[ b + 0 ], src[ b + 1 ] );
			dst.push( src[ c + 0 ], src[ c + 1 ] );

		},

		addDefaultUV: function () {

			const dst = this.object.geometry.uvs;

			dst.push( 0, 0 );
			dst.push( 0, 0 );
			dst.push( 0, 0 );

		},

		addUVLine: function ( a ) {

			const src = this.uvs;
			const dst = this.object.geometry.uvs;

			dst.push( src[ a + 0 ], src[ a + 1 ] );

		},

		addFace: function ( a, b, c, ua, ub, uc, na, nb, nc ) {

			const vLen = this.vertices.length;

			let ia = this.parseVertexIndex( a, vLen );
			let ib = this.parseVertexIndex( b, vLen );
			let ic = this.parseVertexIndex( c, vLen );

			this.addVertex( ia, ib, ic );
			this.addColor( ia, ib, ic );

			// normals

			if ( na !== undefined && na !== '' ) {

				const nLen = this.normals.length;

				ia = this.parseNormalIndex( na, nLen );
				ib = this.parseNormalIndex( nb, nLen );
				ic = this.parseNormalIndex( nc, nLen );

				this.addNormal( ia, ib, ic );

			} else {

				this.addFaceNormal( ia, ib, ic );

			}

			// uvs

			if ( ua !== undefined && ua !== '' ) {

				const uvLen = this.uvs.length;

				ia = this.parseUVIndex( ua, uvLen );
				ib = this.parseUVIndex( ub, uvLen );
				ic = this.parseUVIndex( uc, uvLen );

				this.addUV( ia, ib, ic );

				this.object.geometry.hasUVIndices = true;

			} else {

				// add placeholder values (for inconsistent face definitions)

				this.addDefaultUV();

			}

		},

		addPointGeometry: function ( vertices ) {

			this.object.geometry.type = 'Points';

			const vLen = this.vertices.length;

			for ( let vi = 0, l = vertices.length; vi < l; vi ++ ) {

				const index = this.parseVertexIndex( vertices[ vi ], vLen );

				this.addVertexPoint( index );
				this.addColor( index );

			}

		},

		addLineGeometry: function ( vertices, uvs ) {

			this.object.geometry.type = 'Line';

			const vLen = this.vertices.length;
			const uvLen = this.uvs.length;

			for ( let vi = 0, l = vertices.length; vi < l; vi ++ ) {

				this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

			}

			for ( let uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

				this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

			}

		}

	};

	state.startObject( '', false );

	return state;

}


/**
 * A loader for the OBJ format.
 *
 * The [OBJ format]{@link https://en.wikipedia.org/wiki/Wavefront_.obj_file} is a simple data-format that
 * represents 3D geometry in a human readable format as the position of each vertex, the UV position of
 * each texture coordinate vertex, vertex normals, and the faces that make each polygon defined as a list
 * of vertices, and texture vertices.
 *
 * ```js
 * const loader = new OBJLoader();
 * const object = await loader.loadAsync( 'models/monster.obj' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
 */
class OBJLoader extends three__WEBPACK_IMPORTED_MODULE_0__/* .Loader */ .aHM {

	/**
	 * Constructs a new OBJ loader.
	 *
	 * @param {LoadingManager} [manager] - The loading manager.
	 */
	constructor( manager ) {

		super( manager );

		/**
		 * A reference to a material creator.
		 *
		 * @type {?MaterialCreator}
		 * @default null
		 */
		this.materials = null;

	}

	/**
	 * Starts loading from the given URL and passes the loaded OBJ asset
	 * to the `onLoad()` callback.
	 *
	 * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
	 * @param {function(Group)} onLoad - Executed when the loading process has been finished.
	 * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
	 * @param {onErrorCallback} onError - Executed when errors occur.
	 */
	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new three__WEBPACK_IMPORTED_MODULE_0__/* .FileLoader */ .Y9S( this.manager );
		loader.setPath( this.path );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );
		loader.load( url, function ( text ) {

			try {

				onLoad( scope.parse( text ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );

			}

		}, onProgress, onError );

	}

	/**
	 * Sets the material creator for this OBJ. This object is loaded via {@link MTLLoader}.
	 *
	 * @param {MaterialCreator} materials - An object that creates the materials for this OBJ.
	 * @return {OBJLoader} A reference to this loader.
	 */
	setMaterials( materials ) {

		this.materials = materials;

		return this;

	}

	/**
	 * Parses the given OBJ data and returns the resulting group.
	 *
	 * @param {string} text - The raw OBJ data as a string.
	 * @return {Group} The parsed OBJ.
	 */
	parse( text ) {

		const state = new ParserState();

		if ( text.indexOf( '\r\n' ) !== - 1 ) {

			// This is faster than String.split with regex that splits on both
			text = text.replace( /\r\n/g, '\n' );

		}

		if ( text.indexOf( '\\\n' ) !== - 1 ) {

			// join lines separated by a line continuation character (\)
			text = text.replace( /\\\n/g, '' );

		}

		const lines = text.split( '\n' );
		let result = [];

		for ( let i = 0, l = lines.length; i < l; i ++ ) {

			const line = lines[ i ].trimStart();

			if ( line.length === 0 ) continue;

			const lineFirstChar = line.charAt( 0 );

			// @todo invoke passed in handler if any
			if ( lineFirstChar === '#' ) continue; // skip comments

			if ( lineFirstChar === 'v' ) {

				const data = line.split( _face_vertex_data_separator_pattern );

				switch ( data[ 0 ] ) {

					case 'v':
						state.vertices.push(
							parseFloat( data[ 1 ] ),
							parseFloat( data[ 2 ] ),
							parseFloat( data[ 3 ] )
						);
						if ( data.length >= 7 ) {

							_color.setRGB(
								parseFloat( data[ 4 ] ),
								parseFloat( data[ 5 ] ),
								parseFloat( data[ 6 ] ),
								three__WEBPACK_IMPORTED_MODULE_0__/* .SRGBColorSpace */ .er$
							);

							state.colors.push( _color.r, _color.g, _color.b );

						} else {

							// if no colors are defined, add placeholders so color and vertex indices match

							state.colors.push( undefined, undefined, undefined );

						}

						break;
					case 'vn':
						state.normals.push(
							parseFloat( data[ 1 ] ),
							parseFloat( data[ 2 ] ),
							parseFloat( data[ 3 ] )
						);
						break;
					case 'vt':
						state.uvs.push(
							parseFloat( data[ 1 ] ),
							parseFloat( data[ 2 ] )
						);
						break;

				}

			} else if ( lineFirstChar === 'f' ) {

				const lineData = line.slice( 1 ).trim();
				const vertexData = lineData.split( _face_vertex_data_separator_pattern );
				const faceVertices = [];

				// Parse the face vertex data into an easy to work with format

				for ( let j = 0, jl = vertexData.length; j < jl; j ++ ) {

					const vertex = vertexData[ j ];

					if ( vertex.length > 0 ) {

						const vertexParts = vertex.split( '/' );
						faceVertices.push( vertexParts );

					}

				}

				// Draw an edge between the first vertex and all subsequent vertices to form an n-gon

				const v1 = faceVertices[ 0 ];

				for ( let j = 1, jl = faceVertices.length - 1; j < jl; j ++ ) {

					const v2 = faceVertices[ j ];
					const v3 = faceVertices[ j + 1 ];

					state.addFace(
						v1[ 0 ], v2[ 0 ], v3[ 0 ],
						v1[ 1 ], v2[ 1 ], v3[ 1 ],
						v1[ 2 ], v2[ 2 ], v3[ 2 ]
					);

				}

			} else if ( lineFirstChar === 'l' ) {

				const lineParts = line.substring( 1 ).trim().split( ' ' );
				let lineVertices = [];
				const lineUVs = [];

				if ( line.indexOf( '/' ) === - 1 ) {

					lineVertices = lineParts;

				} else {

					for ( let li = 0, llen = lineParts.length; li < llen; li ++ ) {

						const parts = lineParts[ li ].split( '/' );

						if ( parts[ 0 ] !== '' ) lineVertices.push( parts[ 0 ] );
						if ( parts[ 1 ] !== '' ) lineUVs.push( parts[ 1 ] );

					}

				}

				state.addLineGeometry( lineVertices, lineUVs );

			} else if ( lineFirstChar === 'p' ) {

				const lineData = line.slice( 1 ).trim();
				const pointData = lineData.split( ' ' );

				state.addPointGeometry( pointData );

			} else if ( ( result = _object_pattern.exec( line ) ) !== null ) {

				// o object_name
				// or
				// g group_name

				// WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
				// let name = result[ 0 ].slice( 1 ).trim();
				const name = ( ' ' + result[ 0 ].slice( 1 ).trim() ).slice( 1 );

				state.startObject( name );

			} else if ( _material_use_pattern.test( line ) ) {

				// material

				state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

			} else if ( _material_library_pattern.test( line ) ) {

				// mtl file

				state.materialLibraries.push( line.substring( 7 ).trim() );

			} else if ( _map_use_pattern.test( line ) ) {

				// the line is parsed but ignored since the loader assumes textures are defined MTL files
				// (according to https://www.okino.com/conv/imp_wave.htm, 'usemap' is the old-style Wavefront texture reference method)

				console.warn( 'THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.' );

			} else if ( lineFirstChar === 's' ) {

				result = line.split( ' ' );

				// smooth shading

				// @todo Handle files that have varying smooth values for a set of faces inside one geometry,
				// but does not define a usemtl for each face set.
				// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
				// This requires some care to not create extra material on each smooth value for "normal" obj files.
				// where explicit usemtl defines geometry groups.
				// Example asset: examples/models/obj/cerberus/Cerberus.obj

				/*
					 * http://paulbourke.net/dataformats/obj/
					 *
					 * From chapter "Grouping" Syntax explanation "s group_number":
					 * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
					 * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
					 * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
					 * than 0."
					 */
				if ( result.length > 1 ) {

					const value = result[ 1 ].trim().toLowerCase();
					state.object.smooth = ( value !== '0' && value !== 'off' );

				} else {

					// ZBrush can produce "s" lines #11707
					state.object.smooth = true;

				}

				const material = state.object.currentMaterial();
				if ( material ) material.smooth = state.object.smooth;

			} else {

				// Handle null terminated files without exception
				if ( line === '\0' ) continue;

				console.warn( 'THREE.OBJLoader: Unexpected line: "' + line + '"' );

			}

		}

		state.finalize();

		const container = new three__WEBPACK_IMPORTED_MODULE_0__/* .Group */ .YJl();
		container.materialLibraries = [].concat( state.materialLibraries );

		const hasPrimitives = ! ( state.objects.length === 1 && state.objects[ 0 ].geometry.vertices.length === 0 );

		if ( hasPrimitives === true ) {

			for ( let i = 0, l = state.objects.length; i < l; i ++ ) {

				const object = state.objects[ i ];
				const geometry = object.geometry;
				const materials = object.materials;
				const isLine = ( geometry.type === 'Line' );
				const isPoints = ( geometry.type === 'Points' );
				let hasVertexColors = false;

				// Skip o/g line declarations that did not follow with any faces
				if ( geometry.vertices.length === 0 ) continue;

				const buffergeometry = new three__WEBPACK_IMPORTED_MODULE_0__/* .BufferGeometry */ .LoY();

				buffergeometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__/* .Float32BufferAttribute */ .qtW( geometry.vertices, 3 ) );

				if ( geometry.normals.length > 0 ) {

					buffergeometry.setAttribute( 'normal', new three__WEBPACK_IMPORTED_MODULE_0__/* .Float32BufferAttribute */ .qtW( geometry.normals, 3 ) );

				}

				if ( geometry.colors.length > 0 ) {

					hasVertexColors = true;
					buffergeometry.setAttribute( 'color', new three__WEBPACK_IMPORTED_MODULE_0__/* .Float32BufferAttribute */ .qtW( geometry.colors, 3 ) );

				}

				if ( geometry.hasUVIndices === true ) {

					buffergeometry.setAttribute( 'uv', new three__WEBPACK_IMPORTED_MODULE_0__/* .Float32BufferAttribute */ .qtW( geometry.uvs, 2 ) );

				}

				// Create materials

				const createdMaterials = [];

				for ( let mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

					const sourceMaterial = materials[ mi ];
					const materialHash = sourceMaterial.name + '_' + sourceMaterial.smooth + '_' + hasVertexColors;
					let material = state.materials[ materialHash ];

					if ( this.materials !== null ) {

						material = this.materials.create( sourceMaterial.name );

						// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
						if ( isLine && material && ! ( material instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .LineBasicMaterial */ .mrM ) ) {

							const materialLine = new three__WEBPACK_IMPORTED_MODULE_0__/* .LineBasicMaterial */ .mrM();
							three__WEBPACK_IMPORTED_MODULE_0__/* .Material */ .imn.prototype.copy.call( materialLine, material );
							materialLine.color.copy( material.color );
							material = materialLine;

						} else if ( isPoints && material && ! ( material instanceof three__WEBPACK_IMPORTED_MODULE_0__/* .PointsMaterial */ .BH$ ) ) {

							const materialPoints = new three__WEBPACK_IMPORTED_MODULE_0__/* .PointsMaterial */ .BH$( { size: 10, sizeAttenuation: false } );
							three__WEBPACK_IMPORTED_MODULE_0__/* .Material */ .imn.prototype.copy.call( materialPoints, material );
							materialPoints.color.copy( material.color );
							materialPoints.map = material.map;
							material = materialPoints;

						}

					}

					if ( material === undefined ) {

						if ( isLine ) {

							material = new three__WEBPACK_IMPORTED_MODULE_0__/* .LineBasicMaterial */ .mrM();

						} else if ( isPoints ) {

							material = new three__WEBPACK_IMPORTED_MODULE_0__/* .PointsMaterial */ .BH$( { size: 1, sizeAttenuation: false } );

						} else {

							material = new three__WEBPACK_IMPORTED_MODULE_0__/* .MeshPhongMaterial */ .tXL();

						}

						material.name = sourceMaterial.name;
						material.flatShading = sourceMaterial.smooth ? false : true;
						material.vertexColors = hasVertexColors;

						state.materials[ materialHash ] = material;

					}

					createdMaterials.push( material );

				}

				// Create mesh

				let mesh;

				if ( createdMaterials.length > 1 ) {

					for ( let mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

						const sourceMaterial = materials[ mi ];
						buffergeometry.addGroup( sourceMaterial.groupStart, sourceMaterial.groupCount, mi );

					}

					if ( isLine ) {

						mesh = new three__WEBPACK_IMPORTED_MODULE_0__/* .LineSegments */ .DXC( buffergeometry, createdMaterials );

					} else if ( isPoints ) {

						mesh = new three__WEBPACK_IMPORTED_MODULE_0__/* .Points */ .ONl( buffergeometry, createdMaterials );

					} else {

						mesh = new three__WEBPACK_IMPORTED_MODULE_0__/* .Mesh */ .eaF( buffergeometry, createdMaterials );

					}

				} else {

					if ( isLine ) {

						mesh = new three__WEBPACK_IMPORTED_MODULE_0__/* .LineSegments */ .DXC( buffergeometry, createdMaterials[ 0 ] );

					} else if ( isPoints ) {

						mesh = new three__WEBPACK_IMPORTED_MODULE_0__/* .Points */ .ONl( buffergeometry, createdMaterials[ 0 ] );

					} else {

						mesh = new three__WEBPACK_IMPORTED_MODULE_0__/* .Mesh */ .eaF( buffergeometry, createdMaterials[ 0 ] );

					}

				}

				mesh.name = object.name;

				container.add( mesh );

			}

		} else {

			// if there is only the default parser state object with no geometry data, interpret data as point cloud

			if ( state.vertices.length > 0 ) {

				const material = new three__WEBPACK_IMPORTED_MODULE_0__/* .PointsMaterial */ .BH$( { size: 1, sizeAttenuation: false } );

				const buffergeometry = new three__WEBPACK_IMPORTED_MODULE_0__/* .BufferGeometry */ .LoY();

				buffergeometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__/* .Float32BufferAttribute */ .qtW( state.vertices, 3 ) );

				if ( state.colors.length > 0 && state.colors[ 0 ] !== undefined ) {

					buffergeometry.setAttribute( 'color', new three__WEBPACK_IMPORTED_MODULE_0__/* .Float32BufferAttribute */ .qtW( state.colors, 3 ) );
					material.vertexColors = true;

				}

				const points = new three__WEBPACK_IMPORTED_MODULE_0__/* .Points */ .ONl( buffergeometry, material );
				container.add( points );

			}

		}

		return container;

	}

}




/***/ }),

/***/ 47603:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Sun)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "sun",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "4",
                key: "4exip2"
            }
        ],
        [
            "path",
            {
                d: "M12 2v2",
                key: "tus03m"
            }
        ],
        [
            "path",
            {
                d: "M12 20v2",
                key: "1lh1kg"
            }
        ],
        [
            "path",
            {
                d: "m4.93 4.93 1.41 1.41",
                key: "149t6j"
            }
        ],
        [
            "path",
            {
                d: "m17.66 17.66 1.41 1.41",
                key: "ptbguv"
            }
        ],
        [
            "path",
            {
                d: "M2 12h2",
                key: "1t8f8n"
            }
        ],
        [
            "path",
            {
                d: "M20 12h2",
                key: "1q8mjw"
            }
        ],
        [
            "path",
            {
                d: "m6.34 17.66-1.41 1.41",
                key: "1m8zz5"
            }
        ],
        [
            "path",
            {
                d: "m19.07 4.93-1.41 1.41",
                key: "1shlcs"
            }
        ]
    ]
};
__iconData.node;
const Sun = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=sun.mjs.map


/***/ }),

/***/ 49667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Html)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(99753);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12669);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97650);
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75860);






const v1 = /* @__PURE__ */new three__WEBPACK_IMPORTED_MODULE_2__/* .Vector3 */ .Pq0();
const v2 = /* @__PURE__ */new three__WEBPACK_IMPORTED_MODULE_2__/* .Vector3 */ .Pq0();
const v3 = /* @__PURE__ */new three__WEBPACK_IMPORTED_MODULE_2__/* .Vector3 */ .Pq0();
const v4 = /* @__PURE__ */new three__WEBPACK_IMPORTED_MODULE_2__/* .Vector2 */ .I9Y();
function defaultCalculatePosition(el, camera, size) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  objectPos.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf];
}
function isObjectBehindCamera(el, camera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
  const deltaCamObj = objectPos.sub(cameraPos);
  const camDir = camera.getWorldDirection(v3);
  return deltaCamObj.angleTo(camDir) > Math.PI / 2;
}
function isObjectVisible(el, camera, raycaster, occlude) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld);
  const screenPos = elPos.clone();
  screenPos.project(camera);
  v4.set(screenPos.x, screenPos.y);
  raycaster.setFromCamera(v4, camera);
  const intersects = raycaster.intersectObjects(occlude, true);
  if (intersects.length) {
    const intersectionDistance = intersects[0].distance;
    const pointDistance = elPos.distanceTo(raycaster.ray.origin);
    return pointDistance < intersectionDistance;
  }
  return true;
}
function objectScale(el, camera) {
  if (camera instanceof three__WEBPACK_IMPORTED_MODULE_2__/* .OrthographicCamera */ .qUd) {
    return camera.zoom;
  } else if (camera instanceof three__WEBPACK_IMPORTED_MODULE_2__/* .PerspectiveCamera */ .ubm) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const vFOV = camera.fov * Math.PI / 180;
    const dist = objectPos.distanceTo(cameraPos);
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist;
    return 1 / scaleFOV;
  } else {
    return 1;
  }
}
function objectZIndex(el, camera, zIndexRange) {
  if (camera instanceof three__WEBPACK_IMPORTED_MODULE_2__/* .PerspectiveCamera */ .ubm || camera instanceof three__WEBPACK_IMPORTED_MODULE_2__/* .OrthographicCamera */ .qUd) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const dist = objectPos.distanceTo(cameraPos);
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near);
    const B = zIndexRange[1] - A * camera.far;
    return Math.round(A * dist + B);
  }
  return undefined;
}
const epsilon = value => Math.abs(value) < 1e-10 ? 0 : value;
function getCSSMatrix(matrix, multipliers, prepend = '') {
  let matrix3d = 'matrix3d(';
  for (let i = 0; i !== 16; i++) {
    matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? ',' : ')');
  }
  return prepend + matrix3d;
}
const getCameraCSSMatrix = (multipliers => {
  return matrix => getCSSMatrix(matrix, multipliers);
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]);
const getObjectCSSMatrix = (scaleMultipliers => {
  return (matrix, factor) => getCSSMatrix(matrix, scaleMultipliers(factor), 'translate(-50%,-50%)');
})(f => [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1]);
function isRefObject(ref) {
  return ref && typeof ref === 'object' && 'current' in ref;
}
const Html = /* @__PURE__ */react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  children,
  eps = 0.001,
  style,
  className,
  prepend,
  center,
  fullscreen,
  portal,
  distanceFactor,
  sprite = false,
  transform = false,
  occlude,
  onOcclude,
  castShadow,
  receiveShadow,
  material,
  geometry,
  zIndexRange = [16777271, 0],
  calculatePosition = defaultCalculatePosition,
  as = 'div',
  wrapperClass,
  pointerEvents = 'auto',
  ...props
}, ref) => {
  const {
    gl,
    camera,
    scene,
    size,
    raycaster,
    events,
    viewport
  } = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.D)();
  const [el] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => document.createElement(as));
  const root = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const group = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const oldZoom = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);
  const oldPosition = react__WEBPACK_IMPORTED_MODULE_0__.useRef([0, 0]);
  const transformOuterRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const transformInnerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  // Append to the connected element, which makes HTML work with views
  const target = (portal == null ? void 0 : portal.current) || events.connected || gl.domElement.parentNode;
  const occlusionMeshRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const isMeshSizeSet = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const isRayCastOcclusion = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return occlude && occlude !== 'blending' || Array.isArray(occlude) && occlude.length && isRefObject(occlude[0]);
  }, [occlude]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    const el = gl.domElement;
    if (occlude && occlude === 'blending') {
      el.style.zIndex = `${Math.floor(zIndexRange[0] / 2)}`;
      el.style.position = 'absolute';
      el.style.pointerEvents = 'none';
    } else {
      el.style.zIndex = null;
      el.style.position = null;
      el.style.pointerEvents = null;
    }
  }, [occlude]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    if (group.current) {
      const currentRoot = root.current = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(el);
      scene.updateMatrixWorld();
      if (transform) {
        el.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;
      } else {
        const vec = calculatePosition(group.current, camera, size);
        el.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vec[0]}px,${vec[1]}px,0);transform-origin:0 0;`;
      }
      if (target) {
        if (prepend) target.prepend(el);else target.appendChild(el);
      }
      return () => {
        if (target) target.removeChild(el);
        currentRoot.unmount();
      };
    }
  }, [target, transform]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    if (wrapperClass) el.className = wrapperClass;
  }, [wrapperClass]);
  const styles = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    if (transform) {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: size.width,
        height: size.height,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none'
      };
    } else {
      return {
        position: 'absolute',
        transform: center ? 'translate3d(-50%,-50%,0)' : 'none',
        ...(fullscreen && {
          top: -size.height / 2,
          left: -size.width / 2,
          width: size.width,
          height: size.height
        }),
        ...style
      };
    }
  }, [style, center, fullscreen, size, transform]);
  const transformInnerStyles = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    position: 'absolute',
    pointerEvents
  }), [pointerEvents]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    isMeshSizeSet.current = false;
    if (transform) {
      var _root$current;
      (_root$current = root.current) == null || _root$current.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        ref: transformOuterRef,
        style: styles
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        ref: transformInnerRef,
        style: transformInnerStyles
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        ref: ref,
        className: className,
        style: style,
        children: children
      }))));
    } else {
      var _root$current2;
      (_root$current2 = root.current) == null || _root$current2.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        ref: ref,
        style: styles,
        className: className,
        children: children
      }));
    }
  });
  const visible = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_3__.F)(gl => {
    if (group.current) {
      camera.updateMatrixWorld();
      group.current.updateWorldMatrix(true, false);
      const vec = transform ? oldPosition.current : calculatePosition(group.current, camera, size);
      if (transform || Math.abs(oldZoom.current - camera.zoom) > eps || Math.abs(oldPosition.current[0] - vec[0]) > eps || Math.abs(oldPosition.current[1] - vec[1]) > eps) {
        const isBehindCamera = isObjectBehindCamera(group.current, camera);
        let raytraceTarget = false;
        if (isRayCastOcclusion) {
          if (Array.isArray(occlude)) {
            raytraceTarget = occlude.map(item => item.current);
          } else if (occlude !== 'blending') {
            raytraceTarget = [scene];
          }
        }
        const previouslyVisible = visible.current;
        if (raytraceTarget) {
          const isvisible = isObjectVisible(group.current, camera, raycaster, raytraceTarget);
          visible.current = isvisible && !isBehindCamera;
        } else {
          visible.current = !isBehindCamera;
        }
        if (previouslyVisible !== visible.current) {
          if (onOcclude) onOcclude(!visible.current);else el.style.display = visible.current ? 'block' : 'none';
        }
        const halfRange = Math.floor(zIndexRange[0] / 2);
        const zRange = occlude ? isRayCastOcclusion //
        ? [zIndexRange[0], halfRange] : [halfRange - 1, 0] : zIndexRange;
        el.style.zIndex = `${objectZIndex(group.current, camera, zRange)}`;
        if (transform) {
          const [widthHalf, heightHalf] = [size.width / 2, size.height / 2];
          const fov = camera.projectionMatrix.elements[5] * heightHalf;
          const {
            isOrthographicCamera,
            top,
            left,
            bottom,
            right
          } = camera;
          const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse);
          const cameraTransform = isOrthographicCamera ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)` : `translateZ(${fov}px)`;
          let matrix = group.current.matrixWorld;
          if (sprite) {
            matrix = camera.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(group.current.scale);
            matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0;
            matrix.elements[15] = 1;
          }
          el.style.width = size.width + 'px';
          el.style.height = size.height + 'px';
          el.style.perspective = isOrthographicCamera ? '' : `${fov}px`;
          if (transformOuterRef.current && transformInnerRef.current) {
            transformOuterRef.current.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`;
            transformInnerRef.current.style.transform = getObjectCSSMatrix(matrix, 1 / ((distanceFactor || 10) / 400));
          }
        } else {
          const scale = distanceFactor === undefined ? 1 : objectScale(group.current, camera) * distanceFactor;
          el.style.transform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale})`;
        }
        oldPosition.current = vec;
        oldZoom.current = camera.zoom;
      }
    }
    if (!isRayCastOcclusion && occlusionMeshRef.current && !isMeshSizeSet.current) {
      if (transform) {
        if (transformOuterRef.current) {
          const el = transformOuterRef.current.children[0];
          if (el != null && el.clientWidth && el != null && el.clientHeight) {
            const {
              isOrthographicCamera
            } = camera;
            if (isOrthographicCamera || geometry) {
              if (props.scale) {
                if (!Array.isArray(props.scale)) {
                  occlusionMeshRef.current.scale.setScalar(1 / props.scale);
                } else if (props.scale instanceof three__WEBPACK_IMPORTED_MODULE_2__/* .Vector3 */ .Pq0) {
                  occlusionMeshRef.current.scale.copy(props.scale.clone().divideScalar(1));
                } else {
                  occlusionMeshRef.current.scale.set(1 / props.scale[0], 1 / props.scale[1], 1 / props.scale[2]);
                }
              }
            } else {
              const ratio = (distanceFactor || 10) / 400;
              const w = el.clientWidth * ratio;
              const h = el.clientHeight * ratio;
              occlusionMeshRef.current.scale.set(w, h, 1);
            }
            isMeshSizeSet.current = true;
          }
        }
      } else {
        const ele = el.children[0];
        if (ele != null && ele.clientWidth && ele != null && ele.clientHeight) {
          const ratio = 1 / viewport.factor;
          const w = ele.clientWidth * ratio;
          const h = ele.clientHeight * ratio;
          occlusionMeshRef.current.scale.set(w, h, 1);
          isMeshSizeSet.current = true;
        }
        occlusionMeshRef.current.lookAt(gl.camera.position);
      }
    }
  });
  const shaders = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    vertexShader: !transform ? /* glsl */`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      ` : undefined,
    fragmentShader: /* glsl */`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `
  }), [transform]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("group", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({}, props, {
    ref: group
  }), occlude && !isRayCastOcclusion && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mesh", {
    castShadow: castShadow,
    receiveShadow: receiveShadow,
    ref: occlusionMeshRef
  }, geometry || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("planeGeometry", null), material || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("shaderMaterial", {
    side: three__WEBPACK_IMPORTED_MODULE_2__/* .DoubleSide */ .$EB,
    vertexShader: shaders.vertexShader,
    fragmentShader: shaders.fragmentShader
  })));
});




/***/ }),

/***/ 69326:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DY: () => (/* binding */ suspend),
/* harmony export */   IU: () => (/* binding */ clear),
/* harmony export */   uv: () => (/* binding */ preload)
/* harmony export */ });
/* unused harmony export peek */
const isPromise = promise => typeof promise === 'object' && typeof promise.then === 'function';

const globalCache = [];

function shallowEqualArrays(arrA, arrB, equal = (a, b) => a === b) {
  if (arrA === arrB) return true;
  if (!arrA || !arrB) return false;
  const len = arrA.length;
  if (arrB.length !== len) return false;

  for (let i = 0; i < len; i++) if (!equal(arrA[i], arrB[i])) return false;

  return true;
}

function query(fn, keys = null, preload = false, config = {}) {
  // If no keys were given, the function is the key
  if (keys === null) keys = [fn];

  for (const entry of globalCache) {
    // Find a match
    if (shallowEqualArrays(keys, entry.keys, entry.equal)) {
      // If we're pre-loading and the element is present, just return
      if (preload) return undefined; // If an error occurred, throw

      if (Object.prototype.hasOwnProperty.call(entry, 'error')) throw entry.error; // If a response was successful, return

      if (Object.prototype.hasOwnProperty.call(entry, 'response')) {
        if (config.lifespan && config.lifespan > 0) {
          if (entry.timeout) clearTimeout(entry.timeout);
          entry.timeout = setTimeout(entry.remove, config.lifespan);
        }

        return entry.response;
      } // If the promise is still unresolved, throw


      if (!preload) throw entry.promise;
    }
  } // The request is new or has changed.


  const entry = {
    keys,
    equal: config.equal,
    remove: () => {
      const index = globalCache.indexOf(entry);
      if (index !== -1) globalCache.splice(index, 1);
    },
    promise: // Execute the promise
    (isPromise(fn) ? fn : fn(...keys) // When it resolves, store its value
    ).then(response => {
      entry.response = response; // Remove the entry in time if a lifespan was given

      if (config.lifespan && config.lifespan > 0) {
        entry.timeout = setTimeout(entry.remove, config.lifespan);
      }
    }) // Store caught errors, they will be thrown in the render-phase to bubble into an error-bound
    .catch(error => entry.error = error)
  }; // Register the entry

  globalCache.push(entry); // And throw the promise, this yields control back to React

  if (!preload) throw entry.promise;
  return undefined;
}

const suspend = (fn, keys, config) => query(fn, keys, false, config);

const preload = (fn, keys, config) => void query(fn, keys, true, config);

const peek = keys => {
  var _globalCache$find;

  return (_globalCache$find = globalCache.find(entry => shallowEqualArrays(keys, entry.keys, entry.equal))) == null ? void 0 : _globalCache$find.response;
};

const clear = keys => {
  if (keys === undefined || keys.length === 0) globalCache.splice(0, globalCache.length);else {
    const entry = globalCache.find(entry => shallowEqualArrays(keys, entry.keys, entry.equal));
    if (entry) entry.remove();
  }
};




/***/ }),

/***/ 72019:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Af: () => (/* binding */ h),
/* harmony export */   Go: () => (/* binding */ N),
/* harmony export */   Nz: () => (/* binding */ l),
/* harmony export */   u5: () => (/* binding */ m),
/* harmony export */   y3: () => (/* binding */ M)
/* harmony export */ });
/* unused harmony exports useContainer, useContextMap, useNearestChild, useNearestParent */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);

const v = /* @__PURE__ */ (() => {
  var e, t;
  return typeof window != "undefined" && (((e = window.document) == null ? void 0 : e.createElement) || ((t = window.navigator) == null ? void 0 : t.product) === "ReactNative");
})() ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
function l(e, t, i) {
  if (!e) return;
  if (i(e) === !0) return e;
  let n = t ? e.return : e.child;
  for (; n; ) {
    const o = l(n, t, i);
    if (o) return o;
    n = t ? null : n.sibling;
  }
}
function b(e) {
  try {
    return Object.defineProperties(e, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {
        }
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {
        }
      }
    });
  } catch (t) {
    return e;
  }
}
const p = /* @__PURE__ */ b(/* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null));
class h extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  render() {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(p.Provider, { value: this._reactInternals }, this.props.children);
  }
}
function m() {
  const e = react__WEBPACK_IMPORTED_MODULE_0__.useContext(p);
  if (e === null) throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
  const t = react__WEBPACK_IMPORTED_MODULE_0__.useId();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    for (const n of [e, e == null ? void 0 : e.alternate]) {
      if (!n) continue;
      const o = l(n, !1, (d) => {
        let s = d.memoizedState;
        for (; s; ) {
          if (s.memoizedState === t) return !0;
          s = s.next;
        }
      });
      if (o) return o;
    }
  }, [e, t]);
}
function C() {
  const e = m(), t = r.useMemo(
    () => l(e, !0, (i) => {
      var n;
      return ((n = i.stateNode) == null ? void 0 : n.containerInfo) != null;
    }),
    [e]
  );
  return t == null ? void 0 : t.stateNode.containerInfo;
}
function F(e) {
  const t = m(), i = r.useRef(void 0);
  return v(() => {
    var n;
    i.current = (n = l(
      t,
      !1,
      (o) => typeof o.type == "string" && (e === void 0 || o.type === e)
    )) == null ? void 0 : n.stateNode;
  }, [t]), i;
}
function R(e) {
  const t = m(), i = r.useRef(void 0);
  return v(() => {
    var n;
    i.current = (n = l(
      t,
      !0,
      (o) => typeof o.type == "string" && (e === void 0 || o.type === e)
    )) == null ? void 0 : n.stateNode;
  }, [t]), i;
}
const w = Symbol.for("react.context"), E = (e) => e !== null && typeof e == "object" && "$$typeof" in e && e.$$typeof === w;
function g() {
  const e = m(), [t] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => /* @__PURE__ */ new Map());
  t.clear();
  let i = e;
  for (; i; ) {
    const n = i.type;
    E(n) && n !== p && !t.has(n) && t.set(n, react__WEBPACK_IMPORTED_MODULE_0__.use(b(n))), i = i.return;
  }
  return t;
}
function M() {
  const e = g();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => Array.from(e.keys()).reduce(
      (t, i) => (n) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(t, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(i.Provider, { ...n, value: e.get(i) })),
      (t) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(h, { ...t })
    ),
    [e]
  );
}
function x(e) {
  if (typeof requestAnimationFrame == "function") {
    const i = requestAnimationFrame(e);
    return () => cancelAnimationFrame(i);
  }
  const t = setTimeout(e, 16);
  return () => clearTimeout(t);
}
function N() {
  if (!react__WEBPACK_IMPORTED_MODULE_0__.Activity) throw new Error("its-fine: useActivityBridge requires React 19.2 or later!");
  const e = m(), [t] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
    const i = [];
    let n = !1;
    l(e, !0, (u) => {
      var c, a;
      if (u.elementType === react__WEBPACK_IMPORTED_MODULE_0__.Activity) {
        const y = ((c = u.child) == null ? void 0 : c.tag) === 22 ? u.child.stateNode : null;
        if (typeof (y == null ? void 0 : y._visibility) != "number")
          throw new Error("its-fine: unsupported React Activity internals!");
        i.push(y);
      } else u.tag === 22 && ((a = u.return) == null ? void 0 : a.elementType) !== react__WEBPACK_IMPORTED_MODULE_0__.Activity && (n = !0);
    });
    let o = "hidden";
    const d = /* @__PURE__ */ new Set();
    let s;
    const f = {
      mounted: !1,
      connected: !1,
      subscribe(u) {
        return d.add(u), () => {
          d.delete(u);
        };
      },
      sync(u) {
        f.mounted && !f.connected && n && i.length > 0 ? s || (s = x(() => {
          s = void 0, f.sync(!0);
        })) : (s == null || s(), s = void 0);
        let c = o;
        if (f.mounted ? f.connected ? c = "visible" : u && (c = i.every((a) => (a._visibility & 1) !== 0) ? "visible" : "hidden") : c = "hidden", o !== c) {
          o = c;
          for (const a of d) a();
        }
      },
      Bridge({ children: u }) {
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          react__WEBPACK_IMPORTED_MODULE_0__.Activity,
          {
            mode: react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
              f.subscribe,
              () => o,
              () => "hidden"
            )
          },
          u
        );
      }
    };
    return f;
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect(() => (t.mounted = !0, queueMicrotask(() => t.sync(!1)), () => {
    t.mounted = !1, queueMicrotask(() => t.sync(!1));
  }), [t]), react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => (t.connected = !0, t.sync(!1), () => {
    t.connected = !1, t.sync(!0);
  }), [t]), t.Bridge;
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ 72057:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ EventDispatcher)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EventDispatcher {
  constructor() {
    // not defined in @types/three
    __publicField(this, "_listeners");
  }
  /**
   * Adds a listener to an event type.
   * @param type The type of event to listen to.
   * @param listener The function that gets called when the event is fired.
   */
  addEventListener(type, listener) {
    if (this._listeners === void 0)
      this._listeners = {};
    const listeners = this._listeners;
    if (listeners[type] === void 0) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }
  /**
      * Checks if listener is added to an event type.
      * @param type The type of event to listen to.
      * @param listener The function that gets called when the event is fired.
      */
  hasEventListener(type, listener) {
    if (this._listeners === void 0)
      return false;
    const listeners = this._listeners;
    return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
  }
  /**
      * Removes a listener from an event type.
      * @param type The type of the listener that gets removed.
      * @param listener The listener function that gets removed.
      */
  removeEventListener(type, listener) {
    if (this._listeners === void 0)
      return;
    const listeners = this._listeners;
    const listenerArray = listeners[type];
    if (listenerArray !== void 0) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }
  /**
      * Fire an event type.
      * @param event The event that gets fired.
      */
  dispatchEvent(event) {
    if (this._listeners === void 0)
      return;
    const listeners = this._listeners;
    const listenerArray = listeners[event.type];
    if (listenerArray !== void 0) {
      event.target = this;
      const array = listenerArray.slice(0);
      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
      event.target = null;
    }
  }
}

//# sourceMappingURL=EventDispatcher.js.map


/***/ }),

/***/ 77930:
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function push(heap, node) {
  var index = heap.length;
  heap.push(node);
  a: for (; 0 < index; ) {
    var parentIndex = (index - 1) >>> 1,
      parent = heap[parentIndex];
    if (0 < compare(parent, node))
      (heap[parentIndex] = node), (heap[index] = parent), (index = parentIndex);
    else break a;
  }
}
function peek(heap) {
  return 0 === heap.length ? null : heap[0];
}
function pop(heap) {
  if (0 === heap.length) return null;
  var first = heap[0],
    last = heap.pop();
  if (last !== first) {
    heap[0] = last;
    a: for (
      var index = 0, length = heap.length, halfLength = length >>> 1;
      index < halfLength;

    ) {
      var leftIndex = 2 * (index + 1) - 1,
        left = heap[leftIndex],
        rightIndex = leftIndex + 1,
        right = heap[rightIndex];
      if (0 > compare(left, last))
        rightIndex < length && 0 > compare(right, left)
          ? ((heap[index] = right),
            (heap[rightIndex] = last),
            (index = rightIndex))
          : ((heap[index] = left),
            (heap[leftIndex] = last),
            (index = leftIndex));
      else if (rightIndex < length && 0 > compare(right, last))
        (heap[index] = right), (heap[rightIndex] = last), (index = rightIndex);
      else break a;
    }
  }
  return first;
}
function compare(a, b) {
  var diff = a.sortIndex - b.sortIndex;
  return 0 !== diff ? diff : a.id - b.id;
}
exports.unstable_now = void 0;
if ("object" === typeof performance && "function" === typeof performance.now) {
  var localPerformance = performance;
  exports.unstable_now = function () {
    return localPerformance.now();
  };
} else {
  var localDate = Date,
    initialTime = localDate.now();
  exports.unstable_now = function () {
    return localDate.now() - initialTime;
  };
}
var taskQueue = [],
  timerQueue = [],
  taskIdCounter = 1,
  currentTask = null,
  currentPriorityLevel = 3,
  isPerformingWork = !1,
  isHostCallbackScheduled = !1,
  isHostTimeoutScheduled = !1,
  needsPaint = !1,
  localSetTimeout = "function" === typeof setTimeout ? setTimeout : null,
  localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null,
  localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
function advanceTimers(currentTime) {
  for (var timer = peek(timerQueue); null !== timer; ) {
    if (null === timer.callback) pop(timerQueue);
    else if (timer.startTime <= currentTime)
      pop(timerQueue),
        (timer.sortIndex = timer.expirationTime),
        push(taskQueue, timer);
    else break;
    timer = peek(timerQueue);
  }
}
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime);
  if (!isHostCallbackScheduled)
    if (null !== peek(taskQueue))
      (isHostCallbackScheduled = !0),
        isMessageLoopRunning ||
          ((isMessageLoopRunning = !0), schedulePerformWorkUntilDeadline());
    else {
      var firstTimer = peek(timerQueue);
      null !== firstTimer &&
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
}
var isMessageLoopRunning = !1,
  taskTimeoutID = -1,
  frameInterval = 5,
  startTime = -1;
function shouldYieldToHost() {
  return needsPaint
    ? !0
    : exports.unstable_now() - startTime < frameInterval
      ? !1
      : !0;
}
function performWorkUntilDeadline() {
  needsPaint = !1;
  if (isMessageLoopRunning) {
    var currentTime = exports.unstable_now();
    startTime = currentTime;
    var hasMoreWork = !0;
    try {
      a: {
        isHostCallbackScheduled = !1;
        isHostTimeoutScheduled &&
          ((isHostTimeoutScheduled = !1),
          localClearTimeout(taskTimeoutID),
          (taskTimeoutID = -1));
        isPerformingWork = !0;
        var previousPriorityLevel = currentPriorityLevel;
        try {
          b: {
            advanceTimers(currentTime);
            for (
              currentTask = peek(taskQueue);
              null !== currentTask &&
              !(
                currentTask.expirationTime > currentTime && shouldYieldToHost()
              );

            ) {
              var callback = currentTask.callback;
              if ("function" === typeof callback) {
                currentTask.callback = null;
                currentPriorityLevel = currentTask.priorityLevel;
                var continuationCallback = callback(
                  currentTask.expirationTime <= currentTime
                );
                currentTime = exports.unstable_now();
                if ("function" === typeof continuationCallback) {
                  currentTask.callback = continuationCallback;
                  advanceTimers(currentTime);
                  hasMoreWork = !0;
                  break b;
                }
                currentTask === peek(taskQueue) && pop(taskQueue);
                advanceTimers(currentTime);
              } else pop(taskQueue);
              currentTask = peek(taskQueue);
            }
            if (null !== currentTask) hasMoreWork = !0;
            else {
              var firstTimer = peek(timerQueue);
              null !== firstTimer &&
                requestHostTimeout(
                  handleTimeout,
                  firstTimer.startTime - currentTime
                );
              hasMoreWork = !1;
            }
          }
          break a;
        } finally {
          (currentTask = null),
            (currentPriorityLevel = previousPriorityLevel),
            (isPerformingWork = !1);
        }
        hasMoreWork = void 0;
      }
    } finally {
      hasMoreWork
        ? schedulePerformWorkUntilDeadline()
        : (isMessageLoopRunning = !1);
    }
  }
}
var schedulePerformWorkUntilDeadline;
if ("function" === typeof localSetImmediate)
  schedulePerformWorkUntilDeadline = function () {
    localSetImmediate(performWorkUntilDeadline);
  };
else if ("undefined" !== typeof MessageChannel) {
  var channel = new MessageChannel(),
    port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = function () {
    port.postMessage(null);
  };
} else
  schedulePerformWorkUntilDeadline = function () {
    localSetTimeout(performWorkUntilDeadline, 0);
  };
function requestHostTimeout(callback, ms) {
  taskTimeoutID = localSetTimeout(function () {
    callback(exports.unstable_now());
  }, ms);
}
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_cancelCallback = function (task) {
  task.callback = null;
};
exports.unstable_forceFrameRate = function (fps) {
  0 > fps || 125 < fps
    ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      )
    : (frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5);
};
exports.unstable_getCurrentPriorityLevel = function () {
  return currentPriorityLevel;
};
exports.unstable_next = function (eventHandler) {
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      var priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_requestPaint = function () {
  needsPaint = !0;
};
exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_scheduleCallback = function (
  priorityLevel,
  callback,
  options
) {
  var currentTime = exports.unstable_now();
  "object" === typeof options && null !== options
    ? ((options = options.delay),
      (options =
        "number" === typeof options && 0 < options
          ? currentTime + options
          : currentTime))
    : (options = currentTime);
  switch (priorityLevel) {
    case 1:
      var timeout = -1;
      break;
    case 2:
      timeout = 250;
      break;
    case 5:
      timeout = 1073741823;
      break;
    case 4:
      timeout = 1e4;
      break;
    default:
      timeout = 5e3;
  }
  timeout = options + timeout;
  priorityLevel = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: options,
    expirationTime: timeout,
    sortIndex: -1
  };
  options > currentTime
    ? ((priorityLevel.sortIndex = options),
      push(timerQueue, priorityLevel),
      null === peek(taskQueue) &&
        priorityLevel === peek(timerQueue) &&
        (isHostTimeoutScheduled
          ? (localClearTimeout(taskTimeoutID), (taskTimeoutID = -1))
          : (isHostTimeoutScheduled = !0),
        requestHostTimeout(handleTimeout, options - currentTime)))
    : ((priorityLevel.sortIndex = timeout),
      push(taskQueue, priorityLevel),
      isHostCallbackScheduled ||
        isPerformingWork ||
        ((isHostCallbackScheduled = !0),
        isMessageLoopRunning ||
          ((isMessageLoopRunning = !0), schedulePerformWorkUntilDeadline())));
  return priorityLevel;
};
exports.unstable_shouldYield = shouldYieldToHost;
exports.unstable_wrapCallback = function (callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;
    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
};


/***/ }),

/***/ 80661:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ j)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
function g(n,t){let o;return(...i)=>{window.clearTimeout(o),o=window.setTimeout(()=>n(...i),t)}}function j({debounce:n,scroll:t,polyfill:o,offsetSize:i}={debounce:0,scroll:!1,offsetSize:!1}){const a=o||(typeof window=="undefined"?class{}:window.ResizeObserver);if(!a)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");const[c,h]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),e=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:c,orientationHandler:null}),d=n?typeof n=="number"?n:n.scroll:null,f=n?typeof n=="number"?n:n.resize:null,w=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(w.current=!0,()=>void(w.current=!1)));const[z,m,s]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{const r=()=>{if(!e.current.element)return;const{left:y,top:C,width:H,height:O,bottom:S,right:x,x:B,y:R}=e.current.element.getBoundingClientRect(),l={left:y,top:C,width:H,height:O,bottom:S,right:x,x:B,y:R};e.current.element instanceof HTMLElement&&i&&(l.height=e.current.element.offsetHeight,l.width=e.current.element.offsetWidth),Object.freeze(l),w.current&&!D(e.current.lastBounds,l)&&h(e.current.lastBounds=l)};return[r,f?g(r,f):r,d?g(r,d):r]},[h,i,d,f]);function v(){e.current.scrollContainers&&(e.current.scrollContainers.forEach(r=>r.removeEventListener("scroll",s,!0)),e.current.scrollContainers=null),e.current.resizeObserver&&(e.current.resizeObserver.disconnect(),e.current.resizeObserver=null),e.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",e.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",e.current.orientationHandler))}function b(){e.current.element&&(e.current.resizeObserver=new a(s),e.current.resizeObserver.observe(e.current.element),t&&e.current.scrollContainers&&e.current.scrollContainers.forEach(r=>r.addEventListener("scroll",s,{capture:!0,passive:!0})),e.current.orientationHandler=()=>{s()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",e.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",e.current.orientationHandler))}const L=r=>{!r||r===e.current.element||(v(),e.current.element=r,e.current.scrollContainers=E(r),b())};return X(s,!!t),W(m),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{v(),b()},[t,s,m]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>v,[]),[L,c,z]}function W(n){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{const t=n;return window.addEventListener("resize",t),()=>void window.removeEventListener("resize",t)},[n])}function X(n,t){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(t){const o=n;return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)}},[n,t])}function E(n){const t=[];if(!n||n===document.body)return t;const{overflow:o,overflowX:i,overflowY:a}=window.getComputedStyle(n);return[o,i,a].some(c=>c==="auto"||c==="scroll")&&t.push(n),[...t,...E(n.parentElement)]}const k=["x","y","top","bottom","left","right","width","height"],D=(n,t)=>k.every(o=>n[o]===t[o]);
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 83678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ ContactShadows)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(99753);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97650);
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75860);
/* harmony import */ var three_stdlib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40810);
/* harmony import */ var three_stdlib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18504);






const ContactShadows = /* @__PURE__ */react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  scale = 10,
  frames = Infinity,
  opacity = 1,
  width = 1,
  height = 1,
  blur = 1,
  near = 0,
  far = 10,
  resolution = 512,
  smooth = true,
  color = '#000000',
  depthWrite = false,
  renderOrder,
  ...props
}, fref) => {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const scene = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.scene);
  const gl = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.D)(state => state.gl);
  const shadowCamera = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  width = width * (Array.isArray(scale) ? scale[0] : scale || 1);
  height = height * (Array.isArray(scale) ? scale[1] : scale || 1);
  const [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur] = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const renderTarget = new three__WEBPACK_IMPORTED_MODULE_2__/* .WebGLRenderTarget */ .nWS(resolution, resolution);
    const renderTargetBlur = new three__WEBPACK_IMPORTED_MODULE_2__/* .WebGLRenderTarget */ .nWS(resolution, resolution);
    renderTargetBlur.texture.generateMipmaps = renderTarget.texture.generateMipmaps = false;
    const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_2__/* .PlaneGeometry */ .bdM(width, height).rotateX(Math.PI / 2);
    const blurPlane = new three__WEBPACK_IMPORTED_MODULE_2__/* .Mesh */ .eaF(planeGeometry);
    const depthMaterial = new three__WEBPACK_IMPORTED_MODULE_2__/* .MeshDepthMaterial */ .CSG();
    depthMaterial.depthTest = depthMaterial.depthWrite = false;
    depthMaterial.onBeforeCompile = shader => {
      shader.uniforms = {
        ...shader.uniforms,
        ucolor: {
          value: new three__WEBPACK_IMPORTED_MODULE_2__/* .Color */ .Q1f(color)
        }
      };
      shader.fragmentShader = shader.fragmentShader.replace(`void main() {`,
      //
      `uniform vec3 ucolor;
           void main() {
          `);
      shader.fragmentShader = shader.fragmentShader.replace('vec4( vec3( 1.0 - fragCoordZ ), opacity );',
      // Colorize the shadow, multiply by the falloff so that the center can remain darker
      'vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );');
    };
    const horizontalBlurMaterial = new three__WEBPACK_IMPORTED_MODULE_2__/* .ShaderMaterial */ .BKk(three_stdlib__WEBPACK_IMPORTED_MODULE_3__/* .HorizontalBlurShader */ .F);
    const verticalBlurMaterial = new three__WEBPACK_IMPORTED_MODULE_2__/* .ShaderMaterial */ .BKk(three_stdlib__WEBPACK_IMPORTED_MODULE_4__/* .VerticalBlurShader */ .r);
    verticalBlurMaterial.depthTest = horizontalBlurMaterial.depthTest = false;
    return [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur];
  }, [resolution, width, height, scale, color]);
  const blurShadows = blur => {
    blurPlane.visible = true;
    blurPlane.material = horizontalBlurMaterial;
    horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
    horizontalBlurMaterial.uniforms.h.value = blur * 1 / 256;
    gl.setRenderTarget(renderTargetBlur);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.material = verticalBlurMaterial;
    verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture;
    verticalBlurMaterial.uniforms.v.value = blur * 1 / 256;
    gl.setRenderTarget(renderTarget);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.visible = false;
  };
  let count = 0;
  let initialBackground;
  let initialOverrideMaterial;
  (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_1__.F)(() => {
    if (shadowCamera.current && (frames === Infinity || count < frames)) {
      count++;
      initialBackground = scene.background;
      initialOverrideMaterial = scene.overrideMaterial;
      ref.current.visible = false;
      scene.background = null;
      scene.overrideMaterial = depthMaterial;
      gl.setRenderTarget(renderTarget);
      gl.render(scene, shadowCamera.current);
      blurShadows(blur);
      if (smooth) blurShadows(blur * 0.4);
      gl.setRenderTarget(null);
      ref.current.visible = true;
      scene.overrideMaterial = initialOverrideMaterial;
      scene.background = initialBackground;
    }
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(fref, () => ref.current, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("group", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)({
    "rotation-x": Math.PI / 2
  }, props, {
    ref: ref
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mesh", {
    renderOrder: renderOrder,
    geometry: planeGeometry,
    scale: [1, -1, 1],
    rotation: [-Math.PI / 2, 0, 0]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("meshBasicMaterial", {
    transparent: true,
    map: renderTarget.texture,
    opacity: opacity,
    depthWrite: depthWrite
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("orthographicCamera", {
    ref: shadowCamera,
    args: [-width / 2, width / 2, height / 2, -height / 2, near, far]
  }));
});




/***/ }),

/***/ 88745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(77930);
} else {}


/***/ }),

/***/ 89034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ EyeOff)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "eye-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
                key: "ct8e1f"
            }
        ],
        [
            "path",
            {
                d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
                key: "151rxh"
            }
        ],
        [
            "path",
            {
                d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
                key: "13bj9a"
            }
        ],
        [
            "path",
            {
                d: "m2 2 20 20",
                key: "1ooewy"
            }
        ]
    ]
};
__iconData.node;
const EyeOff = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=eye-off.mjs.map


/***/ }),

/***/ 92298:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RotateCcw)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "rotate-ccw",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
                key: "1357e3"
            }
        ],
        [
            "path",
            {
                d: "M3 3v5h5",
                key: "1xhq8a"
            }
        ]
    ]
};
__iconData.node;
const RotateCcw = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=rotate-ccw.mjs.map


/***/ }),

/***/ 99753:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ })

}]);