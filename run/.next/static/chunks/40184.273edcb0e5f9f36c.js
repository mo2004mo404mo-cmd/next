"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[40184],{

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

/***/ 40184:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeviceSecurityDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84507);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42763);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66609);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16092);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50981);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(70299);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(95000);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(15532);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(69203);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(67033);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(50626);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7428);
/* harmony import */ var _barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(25879);
/* harmony import */ var _lib_security_fingerprint_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(61634);
/* __next_internal_client_entry_do_not_use__ default auto */ 
// ─────────────────────────────────────────────────────────────────────────
// DeviceSecurityDialog — device security panel.
// ─────────────────────────────────────────────────────────────────────────
// Opened from the "Device Security" item in UserMenu. Shows:
//
//   1. Current device summary (browser · OS · location · last IP)
//      with a trust score progress bar + "Log out from this device" button.
//   2. All known devices for this account, with revoke buttons for any
//      device that is NOT the current one.
//
// CRITICAL — how "this device" is identified:
// The current device is identified by matching the LOCAL fingerprint hash
// (collected in this browser via collectFingerprint()) against the
// fingerprintHash field of each row returned by /api/security/devices.
//
// Previous implementation used `devices[0]` (the most recently seen row,
// since the API sorts by lastSeenAt DESC). That was WRONG because it
// assumed the current browser was always the most recent verifier. When
// device B just signed in, B's lastSeenAt > A's, so A's dialog would
// incorrectly label B as "This device" — confusing and dangerous.
//
// The local fingerprint is collected by DeviceSessionTracker on app boot
// (and cached in fingerprint-client.ts), so calling getFingerprintHash()
// here is essentially free after the first call.
//
// Location ("Cairo, Egypt" style, like Telegram) comes from server-side
// IP geolocation performed in /api/security/verify — see lookupIpGeo in
// src/lib/security/fingerprint-server.ts. The browser is never asked to
// report its own IP.
//
// The dialog polls /api/security/devices every 30s while open so the user
// sees live updates. It also listens for `medq:device-verified` so it
// refreshes immediately when DeviceSessionTracker fires.
//
// Privacy note: this dialog deliberately does NOT expose the raw fingerprint
// hash or its component signals (canvas / WebGL / audio / fonts) to the
// user. Those are internal identifiers — exposing them would not help the
// user audit their devices, and could aid an attacker who has read access
// to the user's screen. We only show user-meaningful fields: browser name,
// OS name, location, last IP, trust score, sign-in count.
// ─────────────────────────────────────────────────────────────────────────






// A device is considered "active now" if its lastSeenAt is within this window.
// DeviceSessionTracker re-verifies every 30 min + on focus after 5 min away,
// so any device seen within the last 5 min is almost certainly still using
// the app right now.
const ACTIVE_NOW_WINDOW_MS = 5 * 60 * 1000;
function DeviceSecurityDialog({ open, onClose }) {
    const [devices, setDevices] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [revokingHash, setRevokingHash] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [lastRefreshAt, setLastRefreshAt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    // Local fingerprint hash of THIS browser — used to identify which row
    // in the devices list corresponds to the current device. Collected
    // client-side (canvas/webgl/audio/fonts hash, no IP, no PII).
    const [localFpHash, setLocalFpHash] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [signingOut, setSigningOut] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const refresh = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setLoading(true);
        try {
            const devRes = await fetch('/api/security/devices');
            if (devRes.ok) {
                const body = await devRes.json();
                setDevices(body?.devices ?? []);
            }
            setLastRefreshAt(Date.now());
        } catch (e) {
            console.warn('[DeviceSecurityDialog] refresh failed:', e);
        } finally{
            setLoading(false);
        }
    }, []);
    // ── Collect THIS browser's fingerprint hash on dialog open.
    // getFingerprintHash() is memoized in fingerprint-client.ts — after the
    // first call (which DeviceSessionTracker already made on boot), this is
    // a synchronous cache hit. We still treat it as async to be safe.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        let cancelled = false;
        (0,_lib_security_fingerprint_client__WEBPACK_IMPORTED_MODULE_5__/* .getFingerprintHash */ .b)().then((hash)=>{
            if (!cancelled) setLocalFpHash(hash);
        }).catch((e)=>{
            console.warn('[DeviceSecurityDialog] could not collect local fingerprint:', e);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        open
    ]);
    // ── Fetch devices when the dialog opens, then poll every 30s while it
    // stays open. Also listen for the device-verified window event so we
    // refresh the instant DeviceSessionTracker finishes a verify.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        refresh();
        const interval = setInterval(refresh, 30000);
        const onVerified = ()=>refresh();
        if (true) {
            window.addEventListener('medq:device-verified', onVerified);
        }
        return ()=>{
            clearInterval(interval);
            if (true) {
                window.removeEventListener('medq:device-verified', onVerified);
            }
        };
    }, [
        open,
        refresh
    ]);
    const handleRevoke = async (hash, label)=>{
        if (!confirm(`Revoke this device?\n\n${label || 'Unknown device'}\n\n` + `The next time someone tries to sign in from this device, they will be ` + `blocked and you'll get a critical security alert. This cannot be undone.`)) return;
        setRevokingHash(hash);
        try {
            const res = await fetch('/api/security/devices', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fingerprintHash: hash,
                    reason: 'Revoked by user from Device Security panel'
                })
            });
            if (!res.ok) {
                const body = await res.json().catch(()=>({}));
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error(body?.error || `Failed to revoke device (HTTP ${res.status})`);
                return;
            }
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.success('Device revoked', {
                description: 'Future sign-in attempts from this device will be blocked.'
            });
            await refresh();
        } catch (e) {
            console.warn('[DeviceSecurityDialog] revoke failed:', e);
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Network error while revoking device');
        } finally{
            setRevokingHash(null);
        }
    };
    // ── "Log out from this device" — ends the current session via Auth.js v5.
    // This is the Telegram-style "Log Out" button. It does NOT revoke the
    // device (the row stays in the list with its trust score intact, so the
    // next sign-in from this device is recognized as a returning device).
    // If the user wants to fully forget this device, they can use the
    // "Revoke" action from the All Known Devices list.
    const handleSignOutThisDevice = async ()=>{
        if (!confirm('Log out from this device?\n\n' + 'You will be signed out and redirected to the home page. ' + 'The device will remain in your trusted list — your trust score ' + 'is preserved for the next sign-in.')) return;
        setSigningOut(true);
        try {
            await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__/* .signOut */ .CI)({
                redirect: false
            });
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.success('Logged out', {
                description: 'You have been signed out from this device.'
            });
            onClose();
            if (true) {
                window.location.href = '/';
            }
        } catch (e) {
            console.warn('[DeviceSecurityDialog] sign out failed:', e);
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Could not log out — please try again.');
        } finally{
            setSigningOut(false);
        }
    };
    // ── Derived state ──
    // Match the LOCAL fingerprint hash against the rows returned by the API.
    // If we haven't collected the local hash yet (rare — getFingerprintHash
    // is async), we show a "Identifying this device…" placeholder instead of
    // guessing.
    const currentDevice = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!localFpHash) return undefined;
        return devices.find((d)=>d.fingerprintHash === localFpHash);
    }, [
        devices,
        localFpHash
    ]);
    // Sort: current device first (if identified), then the rest by lastSeenAt
    // desc (server already sorts by lastSeenAt desc, so we just need to
    // surface the current device to the top).
    const sortedDevices = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!currentDevice) return devices;
        const rest = devices.filter((d)=>d.id !== currentDevice.id);
        return [
            currentDevice,
            ...rest
        ];
    }, [
        devices,
        currentDevice
    ]);
    // Active session = device seen within the last 5 min. This counts the
    // current device (which re-verifies every 30 min) plus any other device
    // that's actively using the app right now.
    const activeCount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const now = Date.now();
        return devices.filter((d)=>!d.revoked && now - Date.parse(d.lastSeenAt) < ACTIVE_NOW_WINDOW_MS).length;
    }, [
        devices
    ]);
    // True while we're waiting for either: (a) the device list to load for
    // the first time, or (b) the local fingerprint hash to be collected.
    const isInitializing = loading && devices.length === 0 || !localFpHash;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_3__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: (o)=>{
            if (!o) onClose();
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_3__/* .DialogContent */ .Cf, {
            className: "max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-white/[0.06] p-0",
            style: {
                background: '#0f1117',
                color: '#e8ecf4'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_3__/* .DialogHeader */ .c7, {
                    className: "px-6 pt-6 pb-3 border-b border-white/[0.04] sticky top-0 z-10",
                    style: {
                        background: '#0f1117'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_3__/* .DialogTitle */ .L3, {
                            className: "flex items-center gap-2 text-base font-bold",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    className: "w-4 h-4",
                                    style: {
                                        color: '#00e5a0'
                                    }
                                }),
                                "Device Security",
                                activeCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "ml-1 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                                    style: {
                                        background: 'rgba(0,229,160,0.10)',
                                        color: '#00e5a0'
                                    },
                                    title: `${activeCount} device${activeCount === 1 ? '' : 's'} active in the last 5 minutes`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "w-1.5 h-1.5 rounded-full inline-block",
                                            style: {
                                                background: '#00e5a0',
                                                boxShadow: '0 0 0 0 rgba(0,229,160,0.6)',
                                                animation: 'medq-pulse 2s infinite'
                                            }
                                        }),
                                        activeCount,
                                        " active"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_3__/* .DialogDescription */ .rr, {
                            className: "text-[11px] text-[#5a6478] mt-1",
                            children: "Review the devices signed in to your account. If you see one you don't recognize, revoke it — future sign-in attempts from that device will be blocked and you'll get a security alert."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                    children: `
          @keyframes medq-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(0,229,160,0.6); }
            70%  { box-shadow: 0 0 0 6px rgba(0,229,160,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,229,160,0); }
          }
        `
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-6 py-5 space-y-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between mb-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                            className: "text-xs font-bold uppercase tracking-wider text-[#5a6478] flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5",
                                                    style: {
                                                        color: '#00e5a0'
                                                    }
                                                }),
                                                "This Device"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: refresh,
                                            disabled: loading,
                                            className: "text-[10px] text-[#5a6478] hover:text-[#e8ecf4] flex items-center gap-1 disabled:opacity-50 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: `w-3 h-3 ${loading ? 'animate-spin' : ''}`
                                                }),
                                                lastRefreshAt ? `Updated ${formatRelative(lastRefreshAt)}` : 'Refresh'
                                            ]
                                        })
                                    ]
                                }),
                                isInitializing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 text-xs text-[#8b95a8] py-6 justify-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                            className: "w-4 h-4 animate-spin"
                                        }),
                                        devices.length === 0 ? 'Loading devices…' : 'Identifying this device…'
                                    ]
                                }) : currentDevice ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CurrentDeviceCard, {
                                    device: currentDevice,
                                    onSignOut: handleSignOutThisDevice,
                                    signingOut: signingOut
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-xs text-[#5a6478] py-6 text-center border border-dashed border-white/[0.06] rounded-lg",
                                    children: [
                                        "No device record for this browser yet.",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "mt-2 text-[10px] text-[#5a6478]",
                                            children: "DeviceSessionTracker will register it on the next verify cycle."
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                    className: "text-xs font-bold uppercase tracking-wider text-[#5a6478] mb-3 flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5",
                                            style: {
                                                color: '#a78bfa'
                                            }
                                        }),
                                        "All Known Devices (",
                                        devices.length,
                                        ")",
                                        activeCount > 0 && activeCount < devices.length && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "ml-1 text-[#00e5a0] font-normal normal-case tracking-normal",
                                            children: [
                                                "\xb7 ",
                                                activeCount,
                                                " active"
                                            ]
                                        })
                                    ]
                                }),
                                devices.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-xs text-[#5a6478] py-4 text-center border border-dashed border-white/[0.06] rounded-lg",
                                    children: "No devices registered yet."
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "space-y-2",
                                    children: sortedDevices.map((d)=>{
                                        const isCurrent = currentDevice?.id === d.id;
                                        const isRevoking = revokingHash === d.fingerprintHash;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DeviceRowCard, {
                                            device: d,
                                            isCurrent: isCurrent,
                                            onRevoke: isCurrent ? undefined : ()=>handleRevoke(d.fingerprintHash, d.label),
                                            revoking: isRevoking
                                        }, d.id);
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "text-[10px] text-[#5a6478] text-center pt-2 border-t border-white/[0.04]",
                            children: "Trust score grows with each successful sign-in from the same browser. New devices start at 50; trusted devices reach 70+ after repeated use."
                        })
                    ]
                })
            ]
        })
    });
}
// ─────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────
function CurrentDeviceCard({ device, onSignOut, signingOut }) {
    const trustColor = device.trustScore >= 70 ? '#00e5a0' : device.trustScore >= 40 ? '#f59e0b' : '#ff5757';
    const trustLabel = device.trustScore >= 70 ? 'Trusted' : device.trustScore >= 40 ? 'Building trust' : 'Low trust';
    const isMobile = /iOS|Android/i.test(device.osGuess);
    const isActiveNow = Date.now() - Date.parse(device.lastSeenAt) < ACTIVE_NOW_WINDOW_MS;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl p-4",
        style: {
            background: 'rgba(0,229,160,0.04)',
            border: '1px solid rgba(0,229,160,0.12)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3 mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 relative",
                        style: {
                            background: 'rgba(0,229,160,0.10)',
                            border: '1px solid rgba(0,229,160,0.20)'
                        },
                        children: [
                            isMobile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-5 h-5",
                                style: {
                                    color: '#00e5a0'
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-5 h-5",
                                style: {
                                    color: '#00e5a0'
                                }
                            }),
                            isActiveNow && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full",
                                style: {
                                    background: '#00e5a0',
                                    border: '2px solid #0f1117'
                                },
                                title: "Active now"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-sm font-bold text-[#e8ecf4] flex items-center gap-1.5 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "truncate",
                                        children: device.label || `${device.browserGuess} on ${device.osGuess}`
                                    }),
                                    isActiveNow && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded inline-flex items-center gap-1",
                                        style: {
                                            background: 'rgba(0,229,160,0.15)',
                                            color: '#00e5a0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-2.5 h-2.5"
                                            }),
                                            "Active"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-[11px] text-[#8b95a8] mt-0.5",
                                children: [
                                    device.browserGuess,
                                    " \xb7 ",
                                    device.osGuess
                                ]
                            }),
                            device.revoked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-[10px] mt-1 flex items-center gap-1 font-bold",
                                style: {
                                    color: '#ff5757'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    "Revoked — sign-in blocked"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-right flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "text-[10px] uppercase tracking-wider text-[#5a6478]",
                                children: "Trust"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "text-lg font-bold",
                                style: {
                                    color: trustColor
                                },
                                children: device.trustScore
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "text-[9px]",
                                style: {
                                    color: trustColor
                                },
                                children: trustLabel
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "h-1.5 rounded-full mb-3 overflow-hidden",
                style: {
                    background: 'rgba(255,255,255,0.05)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-full rounded-full transition-all",
                    style: {
                        width: `${Math.min(100, device.trustScore)}%`,
                        background: trustColor
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-2 text-[10px]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailRow, {
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                            className: "w-3 h-3"
                        }),
                        label: "Location",
                        value: device.lastGeo || 'Unknown'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailRow, {
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                            className: "w-3 h-3"
                        }),
                        label: "Last IP",
                        value: device.lastIp || '—'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailRow, {
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                            className: "w-3 h-3"
                        }),
                        label: "First seen",
                        value: formatRelative(Date.parse(device.firstSeenAt))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailRow, {
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                            className: "w-3 h-3"
                        }),
                        label: "Last seen",
                        value: formatRelative(Date.parse(device.lastSeenAt))
                    })
                ]
            }),
            device.lastGeo && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "text-[9px] text-[#5a6478] mt-2 italic",
                children: "Location is approximate — resolved by the server from your sign-in IP."
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-3 pt-3 border-t border-white/[0.04]",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: onSignOut,
                    disabled: signingOut,
                    className: "w-full text-[11px] font-bold py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                    style: {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#e8ecf4'
                    },
                    onMouseEnter: (e)=>{
                        if (!signingOut) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    },
                    onMouseLeave: (e)=>{
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    },
                    children: [
                        signingOut ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5 animate-spin"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        }),
                        signingOut ? 'Logging out…' : 'Log out from this device'
                    ]
                })
            })
        ]
    });
}
function DeviceRowCard({ device, isCurrent, onRevoke, revoking }) {
    const isMobile = /iOS|Android/i.test(device.osGuess);
    const trustColor = device.trustScore >= 70 ? '#00e5a0' : device.trustScore >= 40 ? '#f59e0b' : '#ff5757';
    const isActiveNow = !device.revoked && Date.now() - Date.parse(device.lastSeenAt) < ACTIVE_NOW_WINDOW_MS;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-lg p-3 flex items-center gap-3",
        style: {
            background: isCurrent ? 'rgba(0,229,160,0.04)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${isCurrent ? 'rgba(0,229,160,0.10)' : 'rgba(255,255,255,0.04)'}`,
            opacity: device.revoked ? 0.55 : 1
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 relative",
                style: {
                    background: 'rgba(255,255,255,0.04)'
                },
                children: [
                    isMobile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                        className: "w-4 h-4 text-[#8b95a8]"
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                        className: "w-4 h-4 text-[#8b95a8]"
                    }),
                    isActiveNow && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full",
                        style: {
                            background: '#00e5a0',
                            border: '1.5px solid #0f1117'
                        },
                        title: "Active now"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-xs font-bold text-[#e8ecf4] truncate flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "truncate",
                                children: device.label || `${device.browserGuess} · ${device.osGuess}`
                            }),
                            isCurrent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0",
                                style: {
                                    background: 'rgba(0,229,160,0.15)',
                                    color: '#00e5a0'
                                },
                                children: "This device"
                            }),
                            isActiveNow && !isCurrent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0",
                                style: {
                                    background: 'rgba(0,229,160,0.10)',
                                    color: '#00e5a0'
                                },
                                children: "Active"
                            }),
                            device.revoked && !isCurrent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0",
                                style: {
                                    background: 'rgba(255,87,87,0.15)',
                                    color: '#ff5757'
                                },
                                children: "Revoked"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-[10px] text-[#5a6478] mt-0.5 truncate",
                        children: [
                            device.browserGuess,
                            " \xb7 ",
                            device.osGuess,
                            device.lastGeo ? ` · ${device.lastGeo}` : ''
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-[10px] text-[#5a6478] mt-0.5",
                        children: [
                            "Last seen ",
                            formatRelative(Date.parse(device.lastSeenAt)),
                            " \xb7 Trust ",
                            device.trustScore,
                            "/100 \xb7 ",
                            device.loginCount,
                            " sign-ins"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-shrink-0 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-12 text-right",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-1.5 rounded-full overflow-hidden",
                            style: {
                                background: 'rgba(255,255,255,0.05)'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-full rounded-full",
                                style: {
                                    width: `${Math.min(100, device.trustScore)}%`,
                                    background: trustColor
                                }
                            })
                        })
                    }),
                    !isCurrent && !device.revoked && onRevoke && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: onRevoke,
                        disabled: revoking,
                        className: "p-1.5 rounded-md text-[#ff5757] hover:bg-[#ff5757]/10 disabled:opacity-50 cursor-pointer transition-colors",
                        title: "Revoke this device",
                        children: revoking ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5 animate-spin"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Clock_Fingerprint_Globe_Loader2_LogOut_MapPin_Monitor_Radio_RefreshCw_ShieldAlert_ShieldCheck_Smartphone_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    })
                ]
            })
        ]
    });
}
function DetailRow({ icon, label, value }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-1.5 min-w-0",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-[#5a6478] flex-shrink-0",
                children: icon
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "text-[#5a6478] flex-shrink-0",
                children: [
                    label,
                    ":"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-[#e8ecf4] truncate",
                title: value,
                children: value
            })
        ]
    });
}
// ── helpers ──
function formatRelative(ms) {
    if (!ms || Number.isNaN(ms)) return 'unknown';
    const diffSec = Math.max(0, Math.floor((Date.now() - ms) / 1000));
    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)}d ago`;
    return new Date(ms).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}


/***/ }),

/***/ 42763:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cf: () => (/* binding */ DialogContent),
/* harmony export */   Es: () => (/* binding */ DialogFooter),
/* harmony export */   L3: () => (/* binding */ DialogTitle),
/* harmony export */   c7: () => (/* binding */ DialogHeader),
/* harmony export */   lG: () => (/* binding */ Dialog),
/* harmony export */   rr: () => (/* binding */ DialogDescription)
/* harmony export */ });
/* unused harmony exports DialogClose, DialogOverlay, DialogPortal, DialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82741);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32949);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45477);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49387);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(52579);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11975);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(31799);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89239);
/* harmony import */ var _barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9005);
/* __next_internal_client_entry_do_not_use__ Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogOverlay,DialogPortal,DialogTitle,DialogTrigger auto */ 





function Dialog({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .DialogRoot */ .D, {
        "data-slot": "dialog",
        ...props
    });
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ _jsx(DialogPrimitive.Trigger, {
        "data-slot": "dialog-trigger",
        ...props
    });
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogPortal */ .Z, {
        "data-slot": "dialog-portal",
        ...props
    });
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ _jsx(DialogPrimitive.Close, {
        "data-slot": "dialog-close",
        ...props
    });
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogBackdrop */ .X, {
        "data-slot": "dialog-overlay",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
        ...props
    });
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogPopup */ .h, {
                "data-slot": "dialog-content",
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogClose */ .H, {
                        "data-slot": "dialog-close",
                        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                            variant: "ghost",
                            className: "absolute top-2 right-2",
                            size: "icon-sm"
                        }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "sr-only",
                                children: "Close"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "dialog-header",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("flex flex-col gap-2", className),
        ...props
    });
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        "data-slot": "dialog-footer",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className),
        ...props,
        children: [
            children,
            showCloseButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogClose */ .H, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                    variant: "outline"
                }),
                children: "Close"
            })
        ]
    });
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogTitle */ .L, {
        "data-slot": "dialog-title",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("font-heading text-base leading-none font-medium", className),
        ...props
    });
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_11__/* .DialogDescription */ .r, {
        "data-slot": "dialog-description",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
        ...props
    });
}



/***/ }),

/***/ 70299:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Monitor)
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
    name: "monitor",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "20",
                height: "14",
                x: "2",
                y: "3",
                rx: "2",
                key: "48i651"
            }
        ],
        [
            "line",
            {
                x1: "8",
                x2: "16",
                y1: "21",
                y2: "21",
                key: "1svkeh"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12",
                y1: "17",
                y2: "21",
                key: "vw1qmm"
            }
        ]
    ]
};
__iconData.node;
const Monitor = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=monitor.mjs.map


/***/ }),

/***/ 89239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button),
/* harmony export */   r: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35684);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18460);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__/* .cva */ .F)("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        "data-slot": "button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    });
}



/***/ })

}]);