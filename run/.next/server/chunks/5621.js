"use strict";
exports.id = 5621;
exports.ids = [5621];
exports.modules = {

/***/ 95607:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ getDefaultFormSubmitter)
/* harmony export */ });
/**
 * Returns the default button a browser uses for implicit form submission.
 *
 * This is useful for custom form controls that need to mirror native Enter key behavior.
 * Clicking the returned submitter preserves browser semantics such as the submitter's click
 * event, `SubmitEvent.submitter`, and submitter-specific attributes.
 *
 * The function follows the controls exposed by `form.elements`, which includes controls associated
 * through the `form` attribute. Disabled submitters can be returned because the default button is
 * determined before disabled state is considered; clicking a disabled submitter is a no-op.
 */
function getDefaultFormSubmitter(form) {
  if (!form) {
    return null;
  }
  for (const candidate of form.elements) {
    const tagName = candidate.tagName;
    if (tagName === 'BUTTON' || tagName === 'INPUT') {
      const button = candidate;

      // Intentionally excludes input[type="image"]: Chromium omits it from form.elements,
      // so supporting it would require separate traversal for an exotic submitter type.
      if (button.type === 'submit') {
        return button;
      }
    }
  }
  return null;
}

/***/ }),

/***/ 297789:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ useAriaLabelledBy)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(816942);
/* harmony import */ var _useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8231);
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

/***/ 332304:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ useFieldItemContext)
/* harmony export */ });
/* unused harmony export FieldItemContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ FieldItemContext,useFieldItemContext auto */ 
const FieldItemContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext({
    disabled: false
});
if (false) {}
function useFieldItemContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FieldItemContext);
    return context;
}


/***/ }),

/***/ 361814:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ useCheckboxGroupContext)
/* harmony export */ });
/* unused harmony export CheckboxGroupContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ CheckboxGroupContext,useCheckboxGroupContext auto */ 
const CheckboxGroupContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useCheckboxGroupContext() {
    return react__WEBPACK_IMPORTED_MODULE_0__.useContext(CheckboxGroupContext);
}


/***/ }),

/***/ 503616:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ getCheckboxStateAttributesMapping)
/* harmony export */ });
/* harmony import */ var _internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(847310);
/* harmony import */ var _root_CheckboxRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(550768);


function getCheckboxStateAttributesMapping(state) {
  return {
    checked(value) {
      if (state.indeterminate) {
        // `data-indeterminate` is already handled by the `indeterminate` prop.
        return {};
      }
      if (value) {
        return {
          [_root_CheckboxRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .checked */ .KD]: ''
        };
      }
      return {
        [_root_CheckboxRootDataAttributes_mjs__WEBPACK_IMPORTED_MODULE_0__/* .unchecked */ .VJ]: ''
      };
    },
    ..._internals_field_constants_constants_mjs__WEBPACK_IMPORTED_MODULE_1__/* .fieldValidityMapping */ .dc
  };
}

/***/ }),

/***/ 532948:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ CheckboxRoot)
/* harmony export */ });
/* unused harmony export PARENT_CHECKBOX */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(317526);
/* harmony import */ var _base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(653574);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(816942);
/* harmony import */ var _base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(92806);
/* harmony import */ var _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(520618);
/* harmony import */ var _base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(960977);
/* harmony import */ var _base_ui_utils_getDefaultFormSubmitter__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(95607);
/* harmony import */ var _utils_getCheckboxStateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(503616);
/* harmony import */ var _utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(423403);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(671775);
/* harmony import */ var _internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8231);
/* harmony import */ var _merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(356479);
/* harmony import */ var _internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(640902);
/* harmony import */ var _internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(389983);
/* harmony import */ var _internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(668854);
/* harmony import */ var _internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(813102);
/* harmony import */ var _field_item_FieldItemContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(332304);
/* harmony import */ var _internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(425318);
/* harmony import */ var _internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(650484);
/* harmony import */ var _internals_labelable_provider_useAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(297789);
/* harmony import */ var _internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(201625);
/* harmony import */ var _checkbox_group_CheckboxGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(361814);
/* harmony import */ var _CheckboxRootContext_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(593212);
/* harmony import */ var _internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(369827);
/* harmony import */ var _internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(460485);
/* harmony import */ var _internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(771788);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(548249);
/* __next_internal_client_entry_do_not_use__ PARENT_CHECKBOX,CheckboxRoot auto */ 



























const PARENT_CHECKBOX = 'data-parent';
/**
 * Represents the checkbox itself.
 * Renders a `<span>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
 */ const CheckboxRoot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function CheckboxRoot(componentProps, forwardedRef) {
    const { checked: checkedProp, className, defaultChecked = false, 'aria-labelledby': ariaLabelledByProp, disabled: disabledProp = false, form, id: idProp, indeterminate = false, inputRef: inputRefProp, name: nameProp, onCheckedChange, parent = false, readOnly = false, render, required = false, uncheckedValue, value: valueProp, nativeButton = false, style, ...elementProps } = componentProps;
    const { clearErrors } = (0,_internals_form_context_FormContext_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useFormContext */ .x)();
    const { disabled: rootDisabled, name: fieldName, setDirty, setFilled, setTouched, state: fieldState, validationMode, validityData, validation: localValidation } = (0,_internals_field_root_context_FieldRootContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useFieldRootContext */ .V$)();
    const fieldItemContext = (0,_field_item_FieldItemContext_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useFieldItemContext */ .c)();
    const { labelId, registerControlId, getDescriptionProps } = (0,_internals_labelable_provider_LabelableContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useLabelableContext */ .H)();
    const groupContext = (0,_checkbox_group_CheckboxGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useCheckboxGroupContext */ .L)();
    const parentContext = groupContext?.allValues === undefined ? undefined : groupContext.parent;
    const isGroupedWithParent = parentContext !== undefined;
    const disabled = rootDisabled || fieldItemContext.disabled || groupContext?.disabled || disabledProp;
    const name = fieldName ?? nameProp;
    const value = valueProp ?? name;
    const id = (0,_internals_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_7__/* .useBaseUiId */ .e)();
    // A `CheckboxGroup` is the field's control and takes its name from `aria-labelledby`, so the
    // checkboxes sharing its labelable scope must not claim the field's control id: they would all
    // render that one id and collide. A `Field.Item` opens a scope the checkbox does own.
    const ownsControlId = groupContext?.registerControlId !== registerControlId;
    // `|| undefined` rather than `??`: an empty `id` falls back to the scope's control id.
    const controlId = (0,_internals_labelable_provider_useLabelableId_mjs__WEBPACK_IMPORTED_MODULE_8__/* .useLabelableId */ .l)({
        id: idProp || undefined,
        enabled: ownsControlId
    });
    const rootId = nativeButton ? controlId : id;
    let groupProps = {};
    if (isGroupedWithParent) {
        if (parent) {
            groupProps = parentContext.getParentProps();
        } else if (value !== undefined) {
            groupProps = parentContext.getChildProps(value);
        }
    }
    const { checked: groupChecked = checkedProp, indeterminate: groupIndeterminate = indeterminate, onCheckedChange: groupOnChange, ...otherGroupProps } = groupProps;
    const groupValue = groupContext?.value;
    const controlRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const setFocused = (0,_internals_field_root_context_useSetFieldFocused_mjs__WEBPACK_IMPORTED_MODULE_9__/* .useSetFieldFocused */ .N)(disabled, controlRef);
    const { getButtonProps, buttonRef } = (0,_internals_use_button_useButton_mjs__WEBPACK_IMPORTED_MODULE_10__/* .useButton */ .s)({
        disabled,
        native: nativeButton
    });
    const validation = groupContext?.validation ?? localValidation;
    const [checked, setCheckedState] = (0,_base_ui_utils_useControlled__WEBPACK_IMPORTED_MODULE_11__/* .useControlled */ .q)({
        controlled: value !== undefined && groupValue !== undefined && !parent ? groupValue.includes(value) : groupChecked,
        default: defaultChecked,
        name: 'Checkbox',
        state: 'checked'
    });
    const computedChecked = isGroupedWithParent ? Boolean(groupChecked) : checked;
    const computedIndeterminate = isGroupedWithParent ? groupIndeterminate || indeterminate : indeterminate;
    (0,_internals_field_register_control_useRegisterFieldControl_mjs__WEBPACK_IMPORTED_MODULE_12__/* .useRegisterFieldControl */ .I)(controlRef, id, checked, undefined, !groupContext && !disabled, nameProp);
    const registerChildId = parentContext?.registerChildId;
    const inputRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const registerFieldInput = validation.registerInput;
    const registeredInputValue = groupContext ? value : undefined;
    const registerInput = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((element)=>registerFieldInput(element, {
            controlRef,
            value: registeredInputValue
        }), [
        registerFieldInput,
        registeredInputValue
    ]);
    const mergedInputRef = (0,_base_ui_utils_useMergedRefs__WEBPACK_IMPORTED_MODULE_13__/* .useMergedRefs */ .a)(inputRefProp, inputRef, parent ? undefined : registerInput);
    const ariaLabelledBy = (0,_internals_labelable_provider_useAriaLabelledBy_mjs__WEBPACK_IMPORTED_MODULE_14__/* .useAriaLabelledBy */ .B)(ariaLabelledByProp, labelId, inputRef, !nativeButton, controlId, elementProps['aria-label']);
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_15__/* .useIsoLayoutEffect */ .g)(()=>{
        if (inputRef.current) {
            // Re-assert on `checked` changes too: clicking the input natively resets `indeterminate`.
            inputRef.current.indeterminate = computedIndeterminate;
        }
        // Inside a group, the group derives the filled state from its value.
        if (!groupContext) {
            setFilled(checked);
        }
    }, [
        checked,
        computedIndeterminate,
        groupContext,
        setFilled
    ]);
    (0,_internals_useValueChanged_mjs__WEBPACK_IMPORTED_MODULE_16__/* .useValueChanged */ .x)(checked, ()=>{
        if (groupContext) {
            return;
        }
        clearErrors(name);
        setDirty(checked !== validityData.initialValue);
        validation.change(checked);
    });
    const inputProps = (0,_merge_props_index_mjs__WEBPACK_IMPORTED_MODULE_17__/* .mergeProps */ .v6)({
        checked,
        disabled,
        form,
        // parent checkboxes unset `name` to be excluded from form submission
        name: parent ? undefined : name,
        // Set `id` to stop Chrome warning about an unassociated input.
        // When using a native button, the `id` is applied to the button instead.
        id: nativeButton ? undefined : controlId,
        required,
        ref: mergedInputRef,
        style: name ? _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_18__/* .visuallyHiddenInput */ .a : _base_ui_utils_visuallyHidden__WEBPACK_IMPORTED_MODULE_18__/* .visuallyHidden */ .Q,
        tabIndex: -1,
        type: 'checkbox',
        'aria-hidden': true,
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
            const details = (0,_internals_createBaseUIEventDetails_mjs__WEBPACK_IMPORTED_MODULE_19__/* .createChangeEventDetails */ .d)(_internals_reasons_mjs__WEBPACK_IMPORTED_MODULE_20__/* .none */ .dv, event.nativeEvent);
            onCheckedChange?.(nextChecked, details);
            if (details.isCanceled) {
                return;
            }
            groupOnChange?.(nextChecked, details);
            if (details.isCanceled) {
                return;
            }
            setCheckedState(nextChecked);
            if (value !== undefined && groupContext !== undefined && !parent && !isGroupedWithParent) {
                const nextGroupValue = nextChecked ? [
                    ...groupContext.value,
                    value
                ] : groupContext.value.filter((item)=>item !== value);
                groupContext.setValue(nextGroupValue, details);
            }
        },
        onClick (event) {
            // The click dispatched from the root's `onClick` is an implementation detail
            // and must not reach ancestors, which already receive the original click.
            event.stopPropagation();
        },
        onFocus () {
            controlRef.current?.focus();
        }
    }, // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    valueProp !== undefined ? {
        value: (groupContext ? checked && valueProp : valueProp) || ''
    } : _base_ui_utils_empty__WEBPACK_IMPORTED_MODULE_21__/* .EMPTY_OBJECT */ .t0, getDescriptionProps, (props)=>validation.getValidationProps(disabled, props));
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        if (!parentContext || value === undefined) {
            return undefined;
        }
        const disabledStates = parentContext.disabledStatesRef.current;
        disabledStates.set(value, disabled);
        return ()=>{
            disabledStates.delete(value);
        };
    }, [
        parentContext,
        disabled,
        value
    ]);
    const state = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>({
            ...fieldState,
            checked: computedChecked,
            disabled,
            readOnly,
            required,
            indeterminate: computedIndeterminate
        }), [
        fieldState,
        computedChecked,
        disabled,
        readOnly,
        required,
        computedIndeterminate
    ]);
    const stateAttributesMapping = (0,_utils_getCheckboxStateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_22__/* .getCheckboxStateAttributesMapping */ .G)(state);
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_23__/* .useRenderElement */ .o)('span', componentProps, {
        state,
        ref: [
            buttonRef,
            controlRef,
            forwardedRef
        ],
        props: [
            {
                id: rootId,
                role: 'checkbox',
                'aria-checked': computedIndeterminate ? 'mixed' : computedChecked,
                'aria-readonly': readOnly || undefined,
                'aria-required': required || undefined,
                'aria-labelledby': ariaLabelledBy,
                [PARENT_CHECKBOX]: parent ? '' : undefined,
                onFocus () {
                    setFocused(true);
                },
                onBlur () {
                    const inputEl = inputRef.current;
                    if (!inputEl) {
                        return;
                    }
                    setTouched(true);
                    setFocused(false);
                    if (validationMode === 'onBlur') {
                        validation.commit(groupContext ? groupValue : inputEl.checked);
                    }
                },
                onKeyDown (event) {
                    if (event.key !== 'Enter') {
                        return;
                    }
                    // Let consumer `preventDefault()` handlers opt out while defensively stopping
                    // any remaining Base UI Enter handling from treating the checkbox as a button.
                    event.preventBaseUIHandler();
                    if (event.defaultPrevented) {
                        return;
                    }
                    const formToSubmit = inputRef.current?.form ?? null;
                    const currentTarget = event.currentTarget;
                    const nativeEvent = event.nativeEvent;
                    const originalPreventDefault = event.preventDefault;
                    const originalNativePreventDefault = nativeEvent.preventDefault;
                    let preventDefaultCalledAfterPropagation = false;
                    event.preventDefault = ()=>{
                        preventDefaultCalledAfterPropagation = true;
                        originalPreventDefault.call(event);
                    };
                    nativeEvent.preventDefault = ()=>{
                        preventDefaultCalledAfterPropagation = true;
                        originalNativePreventDefault.call(nativeEvent);
                    };
                    // Enter should not activate/toggle the checkbox. Cancel the native button behavior
                    // without setting React's synthetic `defaultPrevented`, so ancestor React handlers
                    // can still opt out by calling `preventDefault()` during propagation.
                    originalNativePreventDefault.call(nativeEvent);
                    (0,_base_ui_utils_owner__WEBPACK_IMPORTED_MODULE_24__/* .getWindow */ .zk)(currentTarget).queueMicrotask(()=>{
                        event.preventDefault = originalPreventDefault;
                        nativeEvent.preventDefault = originalNativePreventDefault;
                        if (!preventDefaultCalledAfterPropagation) {
                            (0,_base_ui_utils_getDefaultFormSubmitter__WEBPACK_IMPORTED_MODULE_25__/* .getDefaultFormSubmitter */ .N)(formToSubmit)?.click();
                        }
                    });
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
                    (0,_utils_dispatchClickWithModifiers_mjs__WEBPACK_IMPORTED_MODULE_26__/* .dispatchClickWithModifiers */ .B)(input, event);
                }
            },
            elementProps,
            otherGroupProps,
            getButtonProps,
            getDescriptionProps,
            (props)=>validation.getValidationProps(disabled, props)
        ],
        stateAttributesMapping
    });
    // `useRenderElement` always returns an element here, so the cast only narrows `props`.
    const renderedId = element.props.id;
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_15__/* .useIsoLayoutEffect */ .g)(()=>{
        if (!registerChildId || parent || value === undefined || renderedId === undefined) {
            return undefined;
        }
        return registerChildId(value, renderedId);
    }, [
        registerChildId,
        parent,
        value,
        renderedId
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_CheckboxRootContext_mjs__WEBPACK_IMPORTED_MODULE_27__/* .CheckboxRootContext */ .p.Provider, {
        value: state,
        children: [
            element,
            !checked && !groupContext && name && !parent && uncheckedValue !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
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

/***/ 550768:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KD: () => (/* binding */ checked),
/* harmony export */   VJ: () => (/* binding */ unchecked)
/* harmony export */ });
/* unused harmony exports indeterminate, disabled, readonly, required, valid, invalid, touched, dirty, filled, focused */
/**
 * Present when the checkbox is checked.
 */
const checked = 'data-checked';
/**
 * Present when the checkbox is not checked.
 */
const unchecked = 'data-unchecked';
/**
 * Present when the checkbox is in an indeterminate state.
 */
const indeterminate = 'data-indeterminate';
/**
 * Present when the checkbox is disabled.
 */
const disabled = 'data-disabled';
/**
 * Present when the checkbox is readonly.
 */
const readonly = 'data-readonly';
/**
 * Present when the checkbox is required.
 */
const required = 'data-required';
/**
 * Present when the checkbox is in a valid state (when wrapped in Field.Root).
 */
const valid = 'data-valid';
/**
 * Present when the checkbox is in an invalid state (when wrapped in Field.Root).
 */
const invalid = 'data-invalid';
/**
 * Present when the checkbox has been touched (when wrapped in Field.Root).
 */
const touched = 'data-touched';
/**
 * Present when the checkbox's value has changed (when wrapped in Field.Root).
 */
const dirty = 'data-dirty';
/**
 * Present when the checkbox is checked (when wrapped in Field.Root).
 */
const filled = 'data-filled';
/**
 * Present when the checkbox is focused (when wrapped in Field.Root).
 */
const focused = 'data-focused';

/***/ }),

/***/ 593212:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ useCheckboxRootContext),
/* harmony export */   p: () => (/* binding */ CheckboxRootContext)
/* harmony export */ });
/* harmony import */ var _base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854729);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* __next_internal_client_entry_do_not_use__ CheckboxRootContext,useCheckboxRootContext auto */ 

const CheckboxRootContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
if (false) {}
function useCheckboxRootContext() {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(CheckboxRootContext);
    if (context === undefined) {
        throw new Error( false ? 0 : (0,_base_ui_utils_formatErrorMessage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(14));
    }
    return context;
}


/***/ }),

/***/ 636839:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ CheckboxIndicator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _root_CheckboxRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(593212);
/* harmony import */ var _internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(671775);
/* harmony import */ var _utils_getCheckboxStateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(503616);
/* harmony import */ var _internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(562340);
/* harmony import */ var _internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(529118);
/* harmony import */ var _internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(583758);
/* __next_internal_client_entry_do_not_use__ CheckboxIndicator auto */ 






/**
 * Indicates whether the checkbox is ticked.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
 */ const CheckboxIndicator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function CheckboxIndicator(componentProps, forwardedRef) {
    const { render, className, style, keepMounted = false, ...elementProps } = componentProps;
    const rootState = (0,_root_CheckboxRootContext_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useCheckboxRootContext */ .W)();
    const rendered = rootState.checked || rootState.indeterminate;
    const { mounted, transitionStatus, setMounted } = (0,_internals_useTransitionStatus_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useTransitionStatus */ .$)(rendered);
    const indicatorRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const state = {
        ...rootState,
        transitionStatus
    };
    (0,_internals_useOpenChangeComplete_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useOpenChangeComplete */ .v)({
        batch: true,
        enabled: !rendered,
        open: rendered,
        ref: indicatorRef,
        onComplete () {
            if (!rendered) {
                setMounted(false);
            }
        }
    });
    const baseStateAttributesMapping = (0,_utils_getCheckboxStateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_4__/* .getCheckboxStateAttributesMapping */ .G)(rootState);
    const stateAttributesMapping = {
        ...baseStateAttributesMapping,
        ..._internals_stateAttributesMapping_mjs__WEBPACK_IMPORTED_MODULE_5__/* .transitionStatusMapping */ .G
    };
    const shouldRender = keepMounted || mounted;
    const element = (0,_internals_useRenderElement_mjs__WEBPACK_IMPORTED_MODULE_6__/* .useRenderElement */ .o)('span', componentProps, {
        ref: [
            forwardedRef,
            indicatorRef
        ],
        state,
        stateAttributesMapping,
        props: elementProps
    });
    if (!shouldRender) {
        return null;
    }
    return element;
});
if (false) {}


/***/ })

};
;