"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[27719],{

/***/ 1272:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ useRegisterFieldControl)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14187);
/* harmony import */ var _field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12991);
/* __next_internal_client_entry_do_not_use__ useRegisterFieldControl auto */ 


function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
    const { registerFieldControl } = (0,_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useFieldRootContext */ .V$)();
    const sourceRef = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_1__/* .useRefWithInit */ .j)(()=>Symbol());
    // Re-register without unregistering first: re-registration with the same id updates the
    // form's fields Map entry in place, while a delete + re-add would move the field to the
    // end of the Map every time its value changes.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const source = sourceRef.current;
        if (!enabled) {
            registerFieldControl(source, undefined);
            return;
        }
        const registration = {
            controlRef,
            getValue: getFormValueOverride,
            id,
            name,
            value
        };
        registerFieldControl(source, registration);
    }, [
        controlRef,
        enabled,
        getFormValueOverride,
        id,
        name,
        registerFieldControl,
        sourceRef,
        value
    ]);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const source = sourceRef.current;
        return ()=>{
            registerFieldControl(source, undefined);
        };
    }, [
        registerFieldControl,
        sourceRef
    ]);
}


/***/ }),

/***/ 3017:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useLabelableId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23068);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14187);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8994);
/* harmony import */ var _useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62955);
/* harmony import */ var _LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57960);
/* __next_internal_client_entry_do_not_use__ useLabelableId auto */ 






function useLabelableId(params = {}) {
    const { id, enabled = true } = params;
    const { controlId, registerControlId, resetControlId } = (0,_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useLabelableContext */ .H)();
    // Deliberately not seeded with `id`: on React 17 the seed would stick around after the
    // `id` prop is removed, leaving the control on a stale id forever.
    const defaultId = (0,_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useBaseUiId */ .e)();
    const controlSourceRef = (0,_base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__/* .useRefWithInit */ .j)(()=>Symbol());
    const hasRegisteredRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const hadExplicitIdRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const unregisterControlId = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__/* .useStableCallback */ .K)(()=>{
        if (!hasRegisteredRef.current || registerControlId === _noop_mjs__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE) {
            return;
        }
        hasRegisteredRef.current = false;
        registerControlId(controlSourceRef.current, undefined);
    });
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!enabled || registerControlId === _noop_mjs__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE) {
            unregisterControlId();
            return undefined;
        }
        let nextId;
        if (id !== undefined) {
            hadExplicitIdRef.current = true;
            nextId = id;
        } else if (hadExplicitIdRef.current) {
            nextId = defaultId;
        } else {
            // An id-less replacement must claim the provider's fallback so a previously registered
            // explicit id is not retained after its control unmounts.
            resetControlId();
            return undefined;
        }
        // Either the control never had an explicit `id`, or React 17 has not assigned the
        // fallback id yet. Neither is worth registering.
        if (nextId === undefined) {
            unregisterControlId();
            return undefined;
        }
        hasRegisteredRef.current = true;
        registerControlId(controlSourceRef.current, nextId);
        return undefined;
    }, [
        id,
        enabled,
        registerControlId,
        resetControlId,
        defaultId,
        controlSourceRef,
        unregisterControlId
    ]);
    // Unregistering in the layout phase, not a passive effect: a replacement control's layout
    // effect would otherwise run first and still see the outgoing control's registration.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__/* .useIsoLayoutEffect */ .g)(()=>{
        return unregisterControlId;
    }, [
        unregisterControlId
    ]);
    // The provider's id wins until registration runs: the label renders `htmlFor` from the
    // provider's pre-registration state, so preempting it with an explicit `id` here would
    // leave the pair unassociated in server-rendered markup.
    return (enabled ? controlId : undefined) ?? id ?? defaultId;
}


/***/ }),

/***/ 4402:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ useSetFieldFocused)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23068);
/* harmony import */ var _FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12991);
/* __next_internal_client_entry_do_not_use__ useSetFieldFocused auto */ 


/**
 * Returns the field's `setFocused`, recording which control the focused state belongs to.
 *
 * Disabling or unmounting a focused control moves focus away without firing `blur`, so the focused
 * state would otherwise stay latched. A field can have several focus targets, so a control only
 * clears the shared state when focus last landed on itself. The stable callback doubles as that
 * identity.
 */ function useSetFieldFocused(disabled, focusTargetRef, onFocusedChange) {
    const { setFocused, focusOwnerRef } = (0,_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useFieldRootContext */ .V$)();
    const setFieldFocused = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__/* .useStableCallback */ .K)((focused)=>{
        // A disabled target can still be focused (`aria-disabled` elements stay programmatically
        // focusable), but must not publish the field's focused styling.
        if (focused ? !disabled : focusOwnerRef.current === setFieldFocused) {
            focusOwnerRef.current = focused && setFieldFocused;
            onFocusedChange?.(focused);
            setFocused(focused);
        }
    });
    // Re-run when `disabled` changes so a focused control releases the field even when the browser
    // does not fire `blur`. The setup reclaims focus that no focus event reported: StrictMode
    // re-running effects after a mount-time focus, a control focused before hydration, or an
    // `aria-disabled` control re-enabled while it kept focus.
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const el = focusTargetRef.current;
        const root = el?.getRootNode();
        if (root?.activeElement === el) {
            setFieldFocused(true);
        }
        return ()=>setFieldFocused(false);
    }, [
        disabled,
        focusTargetRef,
        setFieldFocused
    ]);
    return setFieldFocused;
}


/***/ }),

/***/ 10232:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ useFormContext)
/* harmony export */ });
/* unused harmony export FormContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8994);
/* __next_internal_client_entry_do_not_use__ FormContext,useFormContext auto */ 

const FormContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    elementRef: {
        current: null
    },
    formRef: {
        current: {
            fields: new Map()
        }
    },
    errors: {},
    clearErrors: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    validationMode: 'onSubmit',
    submitCountRef: {
        current: 0
    }
});
if (false) {}
function useFormContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(FormContext);
}


/***/ }),

/***/ 12991:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V$: () => (/* binding */ useFieldRootContext)
/* harmony export */ });
/* unused harmony exports DEFAULT_FIELD_ROOT_CONTEXT, FieldRootContext */
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8994);
/* harmony import */ var _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95478);
/* __next_internal_client_entry_do_not_use__ DEFAULT_FIELD_ROOT_CONTEXT,FieldRootContext,useFieldRootContext auto */ 




const DEFAULT_FIELD_ROOT_CONTEXT = {
    invalid: undefined,
    name: undefined,
    validityData: {
        state: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_VALIDITY_STATE */ .ZV,
        errors: [],
        error: '',
        value: '',
        initialValue: null
    },
    setValidityData: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    disabled: undefined,
    setTouched: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    setDirty: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    setFilled: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    setFocused: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    focusOwnerRef: {
        current: undefined
    },
    validationMode: 'onSubmit',
    shouldValidateOnChange: ()=>false,
    state: _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_FIELD_ROOT_STATE */ .mk,
    registerFieldControl: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
    validation: {
        getValidationProps: (_disabled, props = _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .EMPTY_OBJECT */ .t0)=>props,
        inputRef: {
            current: null
        },
        registeredInputs: new Map(),
        registerInput: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,
        getInputControl: ()=>null,
        commit: async ()=>{},
        change: _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE
    }
};
const FieldRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
if (false) {}
function useFieldRootContext(optional = true) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FieldRootContext);
    if (context.setValidityData === _noop_mjs__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE && !optional) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(28));
    }
    return context;
}


/***/ }),

/***/ 18460:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ cva)
/* harmony export */ });
/* unused harmony export cx */
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29722);
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ 
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx__WEBPACK_IMPORTED_MODULE_0__/* .clsx */ .$;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };



/***/ }),

/***/ 19805:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowDown)
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
    name: "arrow-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 5v14",
                key: "s699le"
            }
        ],
        [
            "path",
            {
                d: "m19 12-7 7-7-7",
                key: "1idqje"
            }
        ]
    ]
};
__iconData.node;
const ArrowDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-down.mjs.map


/***/ }),

/***/ 20270:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ServerCrash)
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
    name: "server-crash",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
                key: "4b9dqc"
            }
        ],
        [
            "path",
            {
                d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
                key: "22nnkd"
            }
        ],
        [
            "path",
            {
                d: "M6 6h.01",
                key: "1utrut"
            }
        ],
        [
            "path",
            {
                d: "M6 18h.01",
                key: "uhywen"
            }
        ],
        [
            "path",
            {
                d: "m13 6-4 6h6l-4 6",
                key: "14hqih"
            }
        ]
    ]
};
__iconData.node;
const ServerCrash = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=server-crash.mjs.map


/***/ }),

/***/ 22200:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Server)
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
    name: "server",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "20",
                height: "8",
                x: "2",
                y: "2",
                rx: "2",
                ry: "2",
                key: "ngkwjq"
            }
        ],
        [
            "rect",
            {
                width: "20",
                height: "8",
                x: "2",
                y: "14",
                rx: "2",
                ry: "2",
                key: "iecqi9"
            }
        ],
        [
            "line",
            {
                x1: "6",
                x2: "6.01",
                y1: "6",
                y2: "6",
                key: "16zg32"
            }
        ],
        [
            "line",
            {
                x1: "6",
                x2: "6.01",
                y1: "18",
                y2: "18",
                key: "nzw8ys"
            }
        ]
    ]
};
__iconData.node;
const Server = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=server.mjs.map


/***/ }),

/***/ 38158:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowUp)
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
    name: "arrow-up",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m5 12 7-7 7 7",
                key: "hav0vg"
            }
        ],
        [
            "path",
            {
                d: "M12 19V5",
                key: "x0mq9r"
            }
        ]
    ]
};
__iconData.node;
const ArrowUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-up.mjs.map


/***/ }),

/***/ 39857:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ SwitchRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(50602);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55218);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(66652);
/* harmony import */ var _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(46468);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8994);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(88401);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(62955);
/* harmony import */ var _internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(42176);
/* harmony import */ var _SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(85848);
/* harmony import */ var _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(40250);
/* harmony import */ var _utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(44137);
/* harmony import */ var _internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12991);
/* harmony import */ var _internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4402);
/* harmony import */ var _internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1272);
/* harmony import */ var _internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10232);
/* harmony import */ var _internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57960);
/* harmony import */ var _internals_labelable_provider_useAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(48243);
/* harmony import */ var _internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3017);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7049);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(76175);
/* harmony import */ var _internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(42240);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95155);
/* __next_internal_client_entry_do_not_use__ SwitchRoot auto */ 





















/**
 * Represents the switch itself.
 * Renders a `<span>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */ 
const SwitchRoot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SwitchRoot(componentProps, forwardedRef) {
    const { checked: checkedProp, className, defaultChecked, 'aria-labelledby': ariaLabelledByProp, form, id: idProp, inputRef: externalInputRef, name: nameProp, nativeButton = false, onCheckedChange, readOnly = false, required = false, disabled: disabledProp = false, render, uncheckedValue, value, style, ...elementProps } = componentProps;
    const { clearErrors } = (0,_internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useFormContext */ .x)();
    const { state: fieldState, setTouched, setDirty, validityData, setFilled, validationMode, disabled: fieldDisabled, name: fieldName, validation } = (0,_internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useFieldRootContext */ .V$)();
    const { labelId } = (0,_internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useLabelableContext */ .H)();
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const inputRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const handleInputRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_5__/* .useMergedRefs */ .a)(inputRef, externalInputRef, validation.inputRef);
    const switchRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const setFocused = (0,_internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useSetFieldFocused */ .N)(disabled, switchRef);
    const id = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useBaseUiId */ .e)();
    const controlId = (0,_internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useLabelableId */ .l)({
        id: idProp
    });
    const hiddenInputId = nativeButton ? undefined : controlId;
    const [checked, setCheckedState] = (0,_base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_9__/* .useControlled */ .q)({
        controlled: checkedProp,
        default: Boolean(defaultChecked),
        name: 'Switch',
        state: 'checked'
    });
    (0,_internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useRegisterFieldControl */ .I)(switchRef, id, checked, undefined, !disabled, nameProp);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_11__/* .useIsoLayoutEffect */ .g)(()=>{
        setFilled(checked);
    }, [
        checked,
        setFilled
    ]);
    (0,_internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_12__/* .useValueChanged */ .x)(checked, ()=>{
        clearErrors(name);
        setDirty(checked !== validityData.initialValue);
        validation.change(checked);
    });
    const { getButtonProps, buttonRef } = (0,_internals_use_button_index_mjs__WEBPACK_IMPORTED_MODULE_13__/* .useButton */ .s)({
        disabled,
        native: nativeButton
    });
    const ariaLabelledBy = (0,_internals_labelable_provider_useAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_14__/* .useAriaLabelledBy */ .B)(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId, elementProps['aria-label']);
    const rootProps = {
        id: nativeButton ? controlId : id,
        role: 'switch',
        'aria-checked': checked,
        'aria-readonly': readOnly || undefined,
        'aria-required': required || undefined,
        'aria-labelledby': ariaLabelledBy,
        onFocus () {
            setFocused(true);
        },
        onBlur () {
            const element = inputRef.current;
            if (!element || disabled) {
                return;
            }
            setTouched(true);
            setFocused(false);
            if (validationMode === 'onBlur') {
                validation.commit(element.checked);
            }
        },
        onClick (event) {
            if (readOnly || disabled) {
                return;
            }
            event.preventDefault();
            const input = inputRef.current;
            if (!input) {
                return;
            }
            (0,_utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_15__/* .dispatchClickWithModifiers */ .B)(input, event);
        }
    };
    const inputProps = {
        ...validation.getValidationProps(disabled),
        checked,
        disabled,
        form,
        id: hiddenInputId,
        name,
        required,
        style: name ? _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_16__/* .visuallyHiddenInput */ .a : _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_16__/* .visuallyHidden */ .Q,
        tabIndex: -1,
        type: 'checkbox',
        'aria-hidden': true,
        ref: handleInputRef,
        onChange (event) {
            // Workaround for https://github.com/react/react/issues/9023
            if (event.nativeEvent.defaultPrevented) {
                return;
            }
            if (readOnly) {
                event.preventDefault();
                return;
            }
            const nextChecked = event.currentTarget.checked;
            const eventDetails = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_17__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_18__/* .none */ .dv, event.nativeEvent);
            onCheckedChange?.(nextChecked, eventDetails);
            if (eventDetails.isCanceled) {
                return;
            }
            setCheckedState(nextChecked);
        },
        onClick (event) {
            // The click dispatched from the root's `onClick` is an implementation detail
            // and must not reach ancestors, which already receive the original click.
            event.stopPropagation();
        },
        onFocus () {
            switchRef.current?.focus();
        },
        // React <19 sets an empty value if `undefined` is passed explicitly
        // To avoid this, we only set the value if it's defined
        ...value !== undefined ? {
            value
        } : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_19__/* .EMPTY_OBJECT */ .t0
    };
    const state = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...fieldState,
            checked,
            disabled,
            readOnly,
            required
        }), [
        fieldState,
        checked,
        disabled,
        readOnly,
        required
    ]);
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_20__/* .useRenderElement */ .o)('span', componentProps, {
        state,
        ref: [
            forwardedRef,
            switchRef,
            buttonRef
        ],
        props: [
            rootProps,
            elementProps,
            getButtonProps,
            (props)=>validation.getValidationProps(disabled, props)
        ],
        stateAttributesMapping: _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_21__/* .stateAttributesMapping */ .P
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_22__/* .SwitchRootContext */ .u.Provider, {
        value: state,
        children: [
            element,
            !checked && name && uncheckedValue !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "hidden",
                form: form,
                name: name,
                value: uncheckedValue,
                disabled: disabled
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                ...inputProps,
                suppressHydrationWarning: true
            })
        ]
    });
});
if (false) {}


/***/ }),

/***/ 40250:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ stateAttributesMapping)
/* harmony export */ });
/* harmony import */ var _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95478);
/* harmony import */ var _root_SwitchRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77658);


const stateAttributesMapping = {
  ..._internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_0__/* .fieldValidityMapping */ .dc,
  checked(value) {
    if (value) {
      return {
        [_root_SwitchRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .checked */ .KD]: ''
      };
    }
    return {
      [_root_SwitchRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_1__/* .unchecked */ .VJ]: ''
    };
  }
};

/***/ }),

/***/ 46405:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Eraser)
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
    name: "eraser",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
                key: "g5wo59"
            }
        ],
        [
            "path",
            {
                d: "m5.082 11.09 8.828 8.828",
                key: "1wx5vj"
            }
        ]
    ]
};
__iconData.node;
const Eraser = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=eraser.mjs.map


/***/ }),

/***/ 48243:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ useAriaLabelledBy)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62955);
/* __next_internal_client_entry_do_not_use__ useAriaLabelledBy auto */ 


function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId, ariaLabel) {
    const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    const generatedLabelId = (0,_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useBaseUiId */ .e)(labelSourceId ? `${labelSourceId}-label` : undefined);
    // A non-blank `aria-label` wins over any associated label, as it does on native inputs.
    const hasAriaLabel = Boolean(ariaLabel?.trim());
    const implicitLabelId = hasAriaLabel ? undefined : labelId;
    const ariaLabelledBy = explicitAriaLabelledBy ?? implicitLabelId ?? fallbackAriaLabelledBy;
    // Fallback for <span> controls labelled by wrapping/sibling native <label>.
    // Run after every commit so DOM association changes (e.g. label mount/unmount)
    // are reflected even when props/state deps are unchanged.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || hasAriaLabel || !enableFallback ? undefined : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
        if (fallbackAriaLabelledBy !== nextAriaLabelledBy) {
            setFallbackAriaLabelledBy(nextAriaLabelledBy);
        }
    });
    return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
    const label = findAssociatedLabel(labelSource);
    if (!label) {
        return undefined;
    }
    if (!label.id && generatedLabelId) {
        label.id = generatedLabelId;
    }
    return label.id || undefined;
}
function findAssociatedLabel(labelSource) {
    if (!labelSource) {
        return undefined;
    }
    // Fast path before the expensive `.labels` read.
    const parent = labelSource.parentElement;
    if (parent && parent.tagName === 'LABEL') {
        return parent;
    }
    const controlId = labelSource.id;
    if (controlId) {
        const nextSibling = labelSource.nextElementSibling;
        if (nextSibling && nextSibling.htmlFor === controlId) {
            return nextSibling;
        }
    }
    const labels = labelSource.labels;
    return labels && labels[0];
}


/***/ }),

/***/ 49960:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LayoutDashboard)
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
    name: "layout-dashboard",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "7",
                height: "9",
                x: "3",
                y: "3",
                rx: "1",
                key: "10lvy0"
            }
        ],
        [
            "rect",
            {
                width: "7",
                height: "5",
                x: "14",
                y: "3",
                rx: "1",
                key: "16une8"
            }
        ],
        [
            "rect",
            {
                width: "7",
                height: "9",
                x: "14",
                y: "12",
                rx: "1",
                key: "1hutg5"
            }
        ],
        [
            "rect",
            {
                width: "7",
                height: "5",
                x: "3",
                y: "16",
                rx: "1",
                key: "ldoo1y"
            }
        ]
    ]
};
__iconData.node;
const LayoutDashboard = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=layout-dashboard.mjs.map


/***/ }),

/***/ 50602:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ useControlled)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useControlled auto */ // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes, dependency arrays are intentionally ignored
/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */ 

// A defined default guarantees a defined value. Otherwise, preserve `undefined`,
// including when callers pass an explicit generic argument.
function useControlled({ controlled, default: defaultProp, name, state = 'value' }) {
    // isControlled is ignored in the hook dependency lists as it should never change.
    const { current: isControlled } = react__WEBPACK_IMPORTED_MODULE_0__.useRef(controlled !== undefined);
    // Wrap the default so a function value is stored as-is instead of being called as an initializer.
    const [valueState, setValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(()=>defaultProp);
    // Keep the initial mode, but use the initial default if a controlled value disappears.
    // This preserves the defined-default overload while the mode-switch warning is emitted below.
    const value = isControlled && controlled !== undefined ? controlled : valueState;
    if (false) {}
    const setValueIfUncontrolled = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((newValue)=>{
        if (!isControlled) {
            setValue(newValue);
        }
    }, []);
    return [
        value,
        setValueIfUncontrolled
    ];
}
function serializeToDevModeString(input) {
    let nextId = 0;
    const seen = new WeakMap();
    try {
        const result = JSON.stringify(input, function replacer(key, value) {
            if (key === '_owner' && this != null && typeof this === 'object' && '$$typeof' in this) {
                return undefined;
            }
            if (typeof value === 'bigint') {
                return `__bigint__:${value}`;
            }
            if (value !== null && typeof value === 'object') {
                const id = seen.get(value);
                if (id !== undefined) {
                    return `__object__:${id}`;
                }
                seen.set(value, nextId);
                nextId += 1;
            }
            return value;
        });
        return result ?? `__top__:${typeof input}`;
    } catch  {
        return '__unserializable__';
    }
}


/***/ }),

/***/ 51128:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Link2)
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
    name: "link-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M9 17H7A5 5 0 0 1 7 7h2",
                key: "8i5ue5"
            }
        ],
        [
            "path",
            {
                d: "M15 7h2a5 5 0 1 1 0 10h-2",
                key: "1b9ql8"
            }
        ],
        [
            "line",
            {
                x1: "8",
                x2: "16",
                y1: "12",
                y2: "12",
                key: "1jonct"
            }
        ]
    ]
};
__iconData.node;
const Link2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=link-2.mjs.map


/***/ }),

/***/ 57960:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useLabelableContext)
/* harmony export */ });
/* unused harmony export LabelableContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8994);
/* __next_internal_client_entry_do_not_use__ LabelableContext,useLabelableContext auto */ 

/**
 * A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
 * with an accessible name (label) and description.
 */ const LabelableContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    controlId: undefined,
    registerControlId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    resetControlId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    labelId: undefined,
    setLabelId: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    messageIds: [],
    setMessageIds: _noop_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE,
    getDescriptionProps: (externalProps)=>externalProps
});
if (false) {}
function useLabelableContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LabelableContext);
}


/***/ }),

/***/ 65472:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Link2Off)
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
    name: "link-2-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M9 17H7A5 5 0 0 1 7 7",
                key: "10o201"
            }
        ],
        [
            "path",
            {
                d: "M15 7h2a5 5 0 0 1 4 8",
                key: "1d3206"
            }
        ],
        [
            "line",
            {
                x1: "8",
                x2: "12",
                y1: "12",
                y2: "12",
                key: "rvw6j4"
            }
        ],
        [
            "line",
            {
                x1: "2",
                x2: "22",
                y1: "2",
                y2: "22",
                key: "a6p6uj"
            }
        ]
    ]
};
__iconData.node;
const Link2Off = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=link-2-off.mjs.map


/***/ }),

/***/ 70966:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gq: () => (/* binding */ invalid),
/* harmony export */   rZ: () => (/* binding */ valid)
/* harmony export */ });
/* unused harmony exports disabled, touched, dirty, filled, focused */
/**
 * Present when the field is disabled.
 */
const disabled = 'data-disabled';
/**
 * Present when the field is in a valid state.
 */
const valid = 'data-valid';
/**
 * Present when the field is in an invalid state.
 */
const invalid = 'data-invalid';
/**
 * Present when the field has been touched.
 */
const touched = 'data-touched';
/**
 * Present when the field's value has changed.
 */
const dirty = 'data-dirty';
/**
 * Present when the field is filled.
 */
const filled = 'data-filled';
/**
 * Present when the field control is focused.
 */
const focused = 'data-focused';

/***/ }),

/***/ 77658:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KD: () => (/* binding */ checked),
/* harmony export */   VJ: () => (/* binding */ unchecked)
/* harmony export */ });
/* unused harmony exports disabled, readonly, required, valid, invalid, touched, dirty, filled, focused */
/**
 * Present when the switch is checked.
 */
const checked = 'data-checked';
/**
 * Present when the switch is not checked.
 */
const unchecked = 'data-unchecked';
/**
 * Present when the switch is disabled.
 */
const disabled = 'data-disabled';
/**
 * Present when the switch is readonly.
 */
const readonly = 'data-readonly';
/**
 * Present when the switch is required.
 */
const required = 'data-required';
/**
 * Present when the switch is in a valid state (when wrapped in Field.Root).
 */
const valid = 'data-valid';
/**
 * Present when the switch is in an invalid state (when wrapped in Field.Root).
 */
const invalid = 'data-invalid';
/**
 * Present when the switch has been touched (when wrapped in Field.Root).
 */
const touched = 'data-touched';
/**
 * Present when the switch's value has changed (when wrapped in Field.Root).
 */
const dirty = 'data-dirty';
/**
 * Present when the switch is active (when wrapped in Field.Root).
 */
const filled = 'data-filled';
/**
 * Present when the switch is focused (when wrapped in Field.Root).
 */
const focused = 'data-focused';

/***/ }),

/***/ 85848:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ useSwitchRootContext),
/* harmony export */   u: () => (/* binding */ SwitchRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25803);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ SwitchRootContext,useSwitchRootContext auto */ 

const SwitchRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useSwitchRootContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(SwitchRootContext);
    if (context === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(63));
    }
    return context;
}


/***/ }),

/***/ 89455:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ SwitchThumb)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _root_SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85848);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88401);
/* harmony import */ var _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40250);
/* __next_internal_client_entry_do_not_use__ SwitchThumb auto */ 



/**
 * The movable part of the switch that indicates whether the switch is on or off.
 * Renders a `<span>`.
 *
 * Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
 */ const SwitchThumb = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function SwitchThumb(componentProps, forwardedRef) {
    const { render, className, style, ...elementProps } = componentProps;
    const state = (0,_root_SwitchRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useSwitchRootContext */ .b)();
    return (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useRenderElement */ .o)('span', componentProps, {
        state,
        ref: forwardedRef,
        stateAttributesMapping: _stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_3__/* .stateAttributesMapping */ .P,
        props: elementProps
    });
});
if (false) {}


/***/ }),

/***/ 90710:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Bot)
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
    name: "bot",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 8V4H8",
                key: "hb8ula"
            }
        ],
        [
            "rect",
            {
                width: "16",
                height: "12",
                x: "4",
                y: "8",
                rx: "2",
                key: "enze0r"
            }
        ],
        [
            "path",
            {
                d: "M2 14h2",
                key: "vft8re"
            }
        ],
        [
            "path",
            {
                d: "M20 14h2",
                key: "4cs60a"
            }
        ],
        [
            "path",
            {
                d: "M15 13v2",
                key: "1xurst"
            }
        ],
        [
            "path",
            {
                d: "M9 13v2",
                key: "rq6x2g"
            }
        ]
    ]
};
__iconData.node;
const Bot = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=bot.mjs.map


/***/ }),

/***/ 95478:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZV: () => (/* binding */ DEFAULT_VALIDITY_STATE),
/* harmony export */   dc: () => (/* binding */ fieldValidityMapping),
/* harmony export */   mk: () => (/* binding */ DEFAULT_FIELD_ROOT_STATE)
/* harmony export */ });
/* unused harmony export DEFAULT_FIELD_STATE_ATTRIBUTES */
/* harmony import */ var _field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70966);

const DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
const DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
const DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  ...DEFAULT_FIELD_STATE_ATTRIBUTES
};
const fieldValidityMapping = {
  valid(value) {
    if (value === null) {
      return null;
    }
    if (value) {
      return {
        [_field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .valid */ .rZ]: ''
      };
    }
    return {
      [_field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .invalid */ .Gq]: ''
    };
  }
};

/***/ }),

/***/ 96339:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LogIn)
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
    name: "log-in",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m10 17 5-5-5-5",
                key: "1bsop3"
            }
        ],
        [
            "path",
            {
                d: "M15 12H3",
                key: "6jk70r"
            }
        ],
        [
            "path",
            {
                d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
                key: "u53s6r"
            }
        ]
    ]
};
__iconData.node;
const LogIn = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=log-in.mjs.map


/***/ })

}]);