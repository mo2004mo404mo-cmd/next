"use strict";
exports.id = 8163;
exports.ids = [8163];
exports.modules = {

/***/ 121618:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _field_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(253639);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ Input auto */ 


/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */ const Input = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Input(props, forwardedRef) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_field_index_mjs__WEBPACK_IMPORTED_MODULE_2__/* .FieldControl */ .s, {
        ref: forwardedRef,
        ...props
    });
});
if (false) {}


/***/ }),

/***/ 201625:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useLabelableId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(943512);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(925685);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(317526);
/* harmony import */ var _useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8231);
/* harmony import */ var _LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(650484);
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

/***/ 253639:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ FieldControl)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(943512);
/* harmony import */ var _base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(324077);
/* harmony import */ var _internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(389983);
/* harmony import */ var _internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(668854);
/* harmony import */ var _internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(813102);
/* harmony import */ var _internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(425318);
/* harmony import */ var _internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(650484);
/* harmony import */ var _internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(201625);
/* harmony import */ var _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(847310);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(671775);
/* harmony import */ var _internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(771788);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(369827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(460485);
/* __next_internal_client_entry_do_not_use__ FieldControl auto */ 














/**
 * The form control to label and validate.
 * Renders an `<input>` element.
 *
 * You can omit this part and use any Base UI input component instead. For example,
 * [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
 * or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */ const FieldControl = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function FieldControl(componentProps, forwardedRef) {
    const { render, className, id: idProp, name: nameProp, value, disabled: disabledProp = false, onValueChange, defaultValue, autoFocus = false, style, ...elementProps } = componentProps;
    const { state: fieldState, name: fieldName, disabled: fieldDisabled, setTouched, setDirty, validityData, setFilled, validationMode, validation } = (0,_internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useFieldRootContext */ .V$)();
    const { clearErrors, elementRef: formElementRef, submitCountRef } = (0,_internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useFormContext */ .x)();
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const state = {
        ...fieldState,
        disabled
    };
    const { labelId } = (0,_internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useLabelableContext */ .H)();
    const id = (0,_internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useLabelableId */ .l)({
        id: idProp
    });
    const isControlled = value !== undefined;
    // The DOM value is always a string, so dirty comparisons must serialize the controlled value.
    const serializedValue = value == null ? undefined : String(value);
    const getValueFromInput = (0,_base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_5__/* .useStableCallback */ .K)(()=>validation.inputRef.current?.value);
    (0,_internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useRegisterFieldControl */ .I)(validation.inputRef, id, serializedValue, getValueFromInput, !disabled, nameProp);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_7__/* .useIsoLayoutEffect */ .g)(()=>{
        const currentValue = serializedValue ?? validation.inputRef.current?.value;
        if (currentValue !== undefined) {
            setFilled(currentValue !== '');
        }
    }, [
        serializedValue,
        defaultValue,
        validation.inputRef,
        setFilled
    ]);
    (0,_internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useValueChanged */ .x)(serializedValue, ()=>{
        if (serializedValue === undefined) {
            return;
        }
        clearErrors(name);
        setDirty(serializedValue !== (validityData.initialValue ?? ''));
        validation.change(serializedValue);
    });
    const inputRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const setFocused = (0,_internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_9__/* .useSetFieldFocused */ .N)(disabled, inputRef);
    const enterValidationTimeout = (0,_base_ui_utils_useTimeout__WEBPACK_IMPORTED_MODULE_10__/* .useTimeout */ .Z)();
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_11__/* .useRenderElement */ .o)('input', componentProps, {
        ref: [
            forwardedRef,
            inputRef
        ],
        state,
        props: [
            {
                id,
                disabled,
                name,
                ref: validation.inputRef,
                'aria-labelledby': labelId,
                autoFocus,
                ...isControlled ? {
                    value
                } : {
                    defaultValue
                },
                onChange (event) {
                    const inputValue = event.currentTarget.value;
                    const details = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_12__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_13__/* .none */ .dv, event.nativeEvent);
                    onValueChange?.(inputValue, details);
                    // Controlled values sync from the `value` prop instead, so that a value the consumer
                    // rejects or rewrites never reaches the field state.
                    if (isControlled) {
                        return;
                    }
                    // `validation.change` reads `markedDirtyRef`, so update dirty before validating.
                    setDirty(inputValue !== (validityData.initialValue ?? ''));
                    setFilled(inputValue !== '');
                    // Workaround for https://github.com/react/react/issues/9023
                    if (!event.nativeEvent.defaultPrevented && !details.isCanceled) {
                        clearErrors(name);
                        validation.change(inputValue);
                    }
                },
                onFocus () {
                    setFocused(true);
                },
                onBlur (event) {
                    setTouched(true);
                    setFocused(false);
                    if (validationMode === 'onBlur') {
                        const inputValue = event.currentTarget.value;
                        validation.commit(inputValue);
                        if (isControlled) {
                            // Controlled blur handlers can normalize the value before this microtask runs.
                            // A rewrite back to the initial value is a programmatic reset: the field looks
                            // pristine, so committing it would only surface `valueMissing` noise.
                            queueMicrotask(()=>{
                                const nextValue = validation.inputRef.current?.value;
                                if (nextValue !== undefined && nextValue !== inputValue && nextValue !== (validityData.initialValue ?? '')) {
                                    validation.commit(nextValue);
                                }
                            });
                        }
                    }
                },
                onKeyDown (event) {
                    if (event.currentTarget.tagName === 'INPUT' && event.key === 'Enter') {
                        setTouched(true);
                        const value = event.currentTarget.value;
                        const form = event.currentTarget.form;
                        if (form && form === formElementRef.current && !event.defaultPrevented) {
                            const input = event.currentTarget;
                            const submitCount = submitCountRef.current;
                            // Implicit submission runs after keydown. Fall back unless Form handles it first.
                            enterValidationTimeout.start(0, ()=>{
                                if (submitCountRef.current === submitCount) {
                                    validation.commit(input.value);
                                }
                            });
                        } else {
                            validation.commit(value);
                        }
                    }
                }
            },
            elementProps,
            (props)=>validation.getValidationProps(disabled, props)
        ],
        stateAttributesMapping: _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_14__/* .fieldValidityMapping */ .dc
    });
    return element;
});
if (false) {}


/***/ }),

/***/ 389983:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V$: () => (/* binding */ useFieldRootContext)
/* harmony export */ });
/* unused harmony exports DEFAULT_FIELD_ROOT_CONTEXT, FieldRootContext */
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(854729);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(317526);
/* harmony import */ var _field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(847310);
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

/***/ 425318:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ useFormContext)
/* harmony export */ });
/* unused harmony export FormContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(317526);
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

/***/ 521654:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ cva)
/* harmony export */ });
/* unused harmony export cx */
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(699314);
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

/***/ 560336:
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

/***/ 650484:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useLabelableContext)
/* harmony export */ });
/* unused harmony export LabelableContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(317526);
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

/***/ 668854:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ useSetFieldFocused)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useStableCallback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(943512);
/* harmony import */ var _FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(389983);
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

/***/ 813102:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ useRegisterFieldControl)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useRefWithInit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(925685);
/* harmony import */ var _field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(389983);
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

/***/ 847310:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZV: () => (/* binding */ DEFAULT_VALIDITY_STATE),
/* harmony export */   dc: () => (/* binding */ fieldValidityMapping),
/* harmony export */   mk: () => (/* binding */ DEFAULT_FIELD_ROOT_STATE)
/* harmony export */ });
/* unused harmony export DEFAULT_FIELD_STATE_ATTRIBUTES */
/* harmony import */ var _field_control_FieldControlDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(560336);

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

/***/ })

};
;