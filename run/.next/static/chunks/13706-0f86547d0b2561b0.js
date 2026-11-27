"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[13706],{

/***/ 10244:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ useSubscription),
/* harmony export */   d: () => (/* binding */ SubscriptionProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useSubscription,SubscriptionProvider auto */ 


const SubscriptionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    tier: 'free',
    adsEnabled: true,
    credits: {
        balance: 0,
        totalEarned: 0,
        totalSpent: 0
    },
    usage: {},
    loading: true,
    canAccess: ()=>true,
    trackUsage: async ()=>{},
    refresh: async ()=>{},
    setShowUpgradeModal: ()=>{},
    showUpgradeModal: false
});
const useSubscription = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SubscriptionContext);
function SubscriptionLoadingSkeleton() {
    return /*#__PURE__*/ _jsx("div", {
        className: "min-h-screen flex flex-col items-center justify-center",
        style: {
            background: '#0c0e14'
        },
        children: /*#__PURE__*/ _jsxs("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5a0] to-[#00b87a] flex items-center justify-center shadow-lg shadow-[#00e5a0]/25",
                    children: /*#__PURE__*/ _jsx(Loader2, {
                        className: "w-7 h-7 text-[#0c0e14] animate-spin"
                    })
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ _jsxs("p", {
                            className: "text-sm font-semibold text-[#e8ecf4]",
                            style: {
                                fontFamily: "'Space Grotesk', sans-serif"
                            },
                            children: [
                                "Loading Med",
                                /*#__PURE__*/ _jsx("span", {
                                    className: "text-[#00e5a0]",
                                    children: "Q"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-[10px] text-[#5a6478] mt-1",
                            children: "Preparing your study environment..."
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "flex items-center gap-1 mt-2",
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '0ms'
                            }
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '150ms'
                            }
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '300ms'
                            }
                        })
                    ]
                })
            ]
        })
    });
}
function SubscriptionProvider({ children }) {
    const [tier, setTier] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('free');
    const [credits, setCredits] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        balance: 0,
        totalEarned: 0,
        totalSpent: 0
    });
    const [usage, setUsage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [showUpgradeModal, setShowUpgradeModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const hasFetchedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const refresh = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        // Fast path: if we're offline, don't even try to fetch — just clear
        // loading state immediately so the app shell renders with the default
        // 'free' tier values. The SW would return a 503 anyway, but skipping
        // the round-trip avoids a flash of the loading skeleton when the user
        // reloads the page offline.
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch('/api/subscription');
            if (res.ok) {
                const data = await res.json();
                setTier(data.tier || 'free');
                setCredits(data.credits || {
                    balance: 0,
                    totalEarned: 0,
                    totalSpent: 0
                });
                setUsage(data.usage || {});
            }
        } catch (e) {
            console.error('Subscription refresh error:', e);
        } finally{
            setLoading(false);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!hasFetchedRef.current) {
            hasFetchedRef.current = true;
            refresh();
        }
    }, [
        refresh
    ]);
    // When the network comes back online, re-fetch the subscription data
    // (it was skipped during the offline fast-path above). This ensures
    // the correct tier/credits/usage are restored as soon as connectivity
    // returns, instead of waiting for the next manual refresh.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleOnline = ()=>{
            // hasFetchedRef.current is already true, so we call refresh() directly
            refresh();
        };
        window.addEventListener('online', handleOnline);
        return ()=>window.removeEventListener('online', handleOnline);
    }, [
        refresh
    ]);
    const canAccess = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((category)=>{
        const entry = usage[category];
        if (!entry) return true;
        return entry.used < entry.limit;
    }, [
        usage
    ]);
    const trackUsage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (category)=>{
        // OFFLINE GUARD: skip usage tracking entirely when offline.
        // Usage tracking is best-effort analytics — when the network is down,
        // we should NOT attempt the fetch, because:
        //   1. It throws a "Failed to fetch" TypeError that pollutes the
        //      browser console (the error is caught, but `console.error`
        //      still surfaces it, which is what the user sees).
        //   2. /api/subscription/usage is intentionally NOT in the SW's
        //      QUEUEABLE_PATTERNS list (usage tracking isn't a critical
        //      write that needs to be replayed — it's just analytics).
        //   3. The synthetic 202 path would add complexity for no benefit.
        // Telegram-style: app should appear completely normal offline.
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            return;
        }
        try {
            const res = await fetch('/api/subscription/usage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category
                })
            });
            if (res.ok) {
                const data = await res.json();
                setUsage((prev)=>({
                        ...prev,
                        [category]: data
                    }));
            }
        } catch (e) {
            // SILENT FAIL: do not log network errors to console.error —
            // they're expected when the network is flaky, and surfacing
            // them creates the impression that the app is broken.
            // Only log non-network errors (which are programming bugs).
            const isNetworkError = e instanceof TypeError && (e.message === 'Failed to fetch' || e.message.includes('fetch'));
            if (!isNetworkError) {
                console.error('Track usage error:', e);
            }
        }
    }, []);
    const adsEnabled = tier === 'free';
    // if (loading) {
    //   return <SubscriptionLoadingSkeleton />;
    // }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SubscriptionContext.Provider, {
        value: {
            tier,
            adsEnabled,
            credits,
            usage,
            loading,
            canAccess,
            trackUsage,
            refresh,
            setShowUpgradeModal,
            showUpgradeModal
        },
        children: children
    });
}


/***/ }),

/***/ 27436:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_SETTINGS: () => (/* binding */ DEFAULT_SETTINGS),
/* harmony export */   SETTINGS_KEY: () => (/* binding */ SETTINGS_KEY),
/* harmony export */   SettingsProvider: () => (/* binding */ SettingsProvider),
/* harmony export */   loadSettings: () => (/* binding */ loadSettings),
/* harmony export */   playSound: () => (/* binding */ playSound),
/* harmony export */   saveSettings: () => (/* binding */ saveSettings),
/* harmony export */   useSettings: () => (/* binding */ useSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ DEFAULT_SETTINGS,SETTINGS_KEY,loadSettings,saveSettings,playSound,useSettings,SettingsProvider auto */ 

const DEFAULT_SETTINGS = {
    notifications: true,
    soundEffects: true,
    dailyReminder: true,
    reminderTime: '08:00',
    language: 'en',
    theme: 'dark',
    autoPlayAudio: false,
    compactMode: false,
    showUsageMeters: true,
    adPersonalization: true,
    highYieldMode: false,
    pronunciationEnabled: true,
    pronunciationSpeed: 0.8
};
const SETTINGS_KEY = 'medq-settings';
function loadSettings() {
    if (false) {}
    try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) return {
            ...DEFAULT_SETTINGS,
            ...JSON.parse(saved)
        };
    } catch  {}
    return DEFAULT_SETTINGS;
}
function saveSettings(settings) {
    if (false) {}
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
/* ── Sound Utility ── */ const audioCache = new Map();
function getAudio(type) {
    if (false) {}
    // Use Web Audio API to generate synthetic sounds (no external files needed)
    const cacheKey = type;
    if (audioCache.has(cacheKey)) return audioCache.get(cacheKey);
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        // Different sound profiles
        switch(type){
            case 'correct':
                {
                    // Pleasant ascending tone
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
                    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.4);
                    break;
                }
            case 'wrong':
                {
                    // Descending buzz
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
                    gain.gain.setValueAtTime(0.08, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.3);
                    break;
                }
            case 'achievement':
                {
                    // Triumphant ascending arpeggio
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
                    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
                    oscillator.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
                    gain.gain.setValueAtTime(0.12, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.6);
                    break;
                }
            case 'click':
                {
                    // Short click
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                    gain.gain.setValueAtTime(0.05, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.05);
                    break;
                }
            case 'notification':
                {
                    // Gentle chime
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
                    oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.15); // C#6
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.4);
                    break;
                }
        }
        return null; // Web Audio API doesn't return an HTMLAudioElement, but we play immediately
    } catch  {
        return null;
    }
}
// Simple sound player using Web Audio API
let audioCtx = null;
function getAudioContext() {
    if (false) {}
    try {
        if (!audioCtx || audioCtx.state === 'closed') {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    } catch  {
        return null;
    }
}
function playSound(type) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        switch(type){
            case 'correct':
                {
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
                    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.35);
                    break;
                }
            case 'wrong':
                {
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
                    gain.gain.setValueAtTime(0.06, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.25);
                    break;
                }
            case 'achievement':
                {
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
                    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
                    oscillator.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24);
                    gain.gain.setValueAtTime(0.12, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.55);
                    break;
                }
            case 'click':
                {
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                    gain.gain.setValueAtTime(0.04, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.04);
                    break;
                }
            case 'notification':
                {
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.12);
                    gain.gain.setValueAtTime(0.08, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.35);
                    break;
                }
        }
    } catch (e) {
    // Silent fail - sounds are optional
    }
}
const SettingsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    settings: DEFAULT_SETTINGS,
    updateSetting: ()=>{},
    resetSettings: ()=>{},
    playSoundIfEnabled: ()=>{}
});
const useSettings = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SettingsContext);
function SettingsProvider({ children }) {
    const [settings, setSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>{
        if (true) {
            return loadSettings();
        }
        return DEFAULT_SETTINGS;
    });
    const initialized = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    // Listen for settings changes from other tabs/components
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleStorage = (e)=>{
            if (e.key === SETTINGS_KEY && e.newValue) {
                try {
                    setSettings({
                        ...DEFAULT_SETTINGS,
                        ...JSON.parse(e.newValue)
                    });
                } catch  {}
            }
        };
        window.addEventListener('storage', handleStorage);
        return ()=>window.removeEventListener('storage', handleStorage);
    }, []);
    // Apply theme to document
    // NOTE: Theme toggling is now driven by `useTheme` (from @/lib/hooks/use-theme)
    // which toggles the `.dark` class on <html>. The legacy `medq-light` / `medq-dark`
    // classes are kept as no-op markers for backwards compatibility with any code
    // that reads them — they don't drive styling. The `settings.theme` field is
    // preserved so the Settings dialog can still display the user's preference,
    // but the actual DOM class is owned by useTheme.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        if (settings.theme === 'light') {
            root.classList.add('medq-light');
            root.classList.remove('medq-dark');
        } else {
            root.classList.add('medq-dark');
            root.classList.remove('medq-light');
        }
    }, [
        settings.theme
    ]);
    // Apply compact mode class
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        if (settings.compactMode) {
            root.classList.add('medq-compact');
        } else {
            root.classList.remove('medq-compact');
        }
    }, [
        settings.compactMode
    ]);
    // Daily Study Reminder - schedule browser notifications
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (false) {}
        if (!settings.dailyReminder) return;
        // Request notification permission
        const requestNotifPermission = async ()=>{
            if ('Notification' in window && Notification.permission === 'default') {
                await Notification.requestPermission();
            }
        };
        requestNotifPermission();
        // Track the last reminder date to avoid duplicate notifications
        const LAST_REMINDER_KEY = 'medq-last-reminder-date';
        // Check every 30 seconds if it's time for the reminder
        const interval = setInterval(()=>{
            try {
                const now = new Date();
                const [hours, minutes] = settings.reminderTime.split(':').map(Number);
                const isTime = now.getHours() === hours && now.getMinutes() === minutes;
                const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
                const lastReminder = localStorage.getItem(LAST_REMINDER_KEY);
                if (isTime && lastReminder !== todayStr) {
                    localStorage.setItem(LAST_REMINDER_KEY, todayStr);
                    // Try browser notification first
                    if ('Notification' in window && Notification.permission === 'granted') {
                        new Notification('MedQ Study Reminder 📚', {
                            body: 'Time for your daily study session! Keep your streak going.',
                            icon: '/favicon.ico',
                            tag: 'medq-daily-reminder'
                        });
                    }
                    // Also play notification sound if enabled
                    if (settings.soundEffects) {
                        playSound('notification');
                    }
                }
            } catch  {}
        }, 30000); // Check every 30 seconds
        return ()=>clearInterval(interval);
    }, [
        settings.dailyReminder,
        settings.reminderTime,
        settings.soundEffects
    ]);
    const updateSetting = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((key, value)=>{
        setSettings((prev)=>{
            const updated = {
                ...prev,
                [key]: value
            };
            saveSettings(updated);
            return updated;
        });
    }, []);
    const resetSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setSettings(DEFAULT_SETTINGS);
        saveSettings(DEFAULT_SETTINGS);
    }, []);
    const playSoundIfEnabled = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((type)=>{
        if (settings.soundEffects) {
            playSound(type);
        }
    }, [
        settings.soundEffects
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsContext.Provider, {
        value: {
            settings,
            updateSetting,
            resetSettings,
            playSoundIfEnabled
        },
        children: children
    });
}


/***/ }),

/***/ 40980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29722);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(622);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .$)(inputs));
}


/***/ }),

/***/ 72264:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ DropdownMenuGroup),
/* harmony export */   SQ: () => (/* binding */ DropdownMenuContent),
/* harmony export */   _2: () => (/* binding */ DropdownMenuItem),
/* harmony export */   lp: () => (/* binding */ DropdownMenuLabel),
/* harmony export */   mB: () => (/* binding */ DropdownMenuSeparator),
/* harmony export */   rI: () => (/* binding */ DropdownMenu),
/* harmony export */   ty: () => (/* binding */ DropdownMenuTrigger)
/* harmony export */ });
/* unused harmony exports DropdownMenuPortal, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83873);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33417);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90469);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(56385);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8613);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(43981);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83227);
/* harmony import */ var _base_ui_react_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(30030);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ DropdownMenu,DropdownMenuPortal,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuGroup,DropdownMenuLabel,DropdownMenuItem,DropdownMenuCheckboxItem,DropdownMenuRadioGroup,DropdownMenuRadioItem,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuSub,DropdownMenuSubTrigger,DropdownMenuSubContent auto */ 




function DropdownMenu({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_2__/* .MenuRoot */ .i, {
        "data-slot": "dropdown-menu",
        ...props
    });
}
function DropdownMenuPortal({ ...props }) {
    return /*#__PURE__*/ _jsx(MenuPrimitive.Portal, {
        "data-slot": "dropdown-menu-portal",
        ...props
    });
}
function DropdownMenuTrigger({ asChild, children, ...props }) {
    if (asChild && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(children)) {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(children, {
            ...props,
            ...children.props,
            'data-slot': 'dropdown-menu-trigger',
            onClick: (event)=>{
                children.props.onClick?.(event);
                props.onClick?.(event);
            },
            onPointerDown: (event)=>{
                children.props.onPointerDown?.(event);
                props.onPointerDown?.(event);
            },
            onKeyDown: (event)=>{
                children.props.onKeyDown?.(event);
                props.onKeyDown?.(event);
            },
            onMouseDown: (event)=>{
                children.props.onMouseDown?.(event);
                props.onMouseDown?.(event);
            },
            onFocus: (event)=>{
                children.props.onFocus?.(event);
                props.onFocus?.(event);
            },
            onBlur: (event)=>{
                children.props.onBlur?.(event);
                props.onBlur?.(event);
            },
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(children.props.className, props.className)
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_4__/* .MenuTrigger */ .c, {
        "data-slot": "dropdown-menu-trigger",
        ...props,
        children: children
    });
}
function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_5__/* .MenuPortal */ .g, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_6__/* .MenuPositioner */ .y, {
            className: "isolate z-50 outline-none",
            align: align,
            alignOffset: alignOffset,
            side: side,
            sideOffset: sideOffset,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_7__/* .MenuPopup */ ._, {
                "data-slot": "dropdown-menu-content",
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props
            })
        })
    });
}
function DropdownMenuGroup({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_8__/* .MenuGroup */ .r, {
        "data-slot": "dropdown-menu-group",
        ...props
    });
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "dropdown-menu-label",
        "data-inset": inset,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className),
        ...props
    });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_9__/* .MenuItem */ .D, {
        "data-slot": "dropdown-menu-item",
        "data-inset": inset,
        "data-variant": variant,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", className),
        ...props
    });
}
function DropdownMenuSub({ ...props }) {
    return /*#__PURE__*/ _jsx(MenuPrimitive.SubmenuRoot, {
        "data-slot": "dropdown-menu-sub",
        ...props
    });
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return /*#__PURE__*/ _jsxs(MenuPrimitive.SubmenuTrigger, {
        "data-slot": "dropdown-menu-sub-trigger",
        "data-inset": inset,
        className: cn("flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ _jsx(ChevronRightIcon, {
                className: "ml-auto"
            })
        ]
    });
}
function DropdownMenuSubContent({ align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...props }) {
    return /*#__PURE__*/ _jsx(DropdownMenuContent, {
        "data-slot": "dropdown-menu-sub-content",
        className: cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
        align: align,
        alignOffset: alignOffset,
        side: side,
        sideOffset: sideOffset,
        ...props
    });
}
function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }) {
    return /*#__PURE__*/ _jsxs(MenuPrimitive.CheckboxItem, {
        "data-slot": "dropdown-menu-checkbox-item",
        "data-inset": inset,
        className: cn("relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ _jsx("span", {
                className: "pointer-events-none absolute right-2 flex items-center justify-center",
                "data-slot": "dropdown-menu-checkbox-item-indicator",
                children: /*#__PURE__*/ _jsx(MenuPrimitive.CheckboxItemIndicator, {
                    children: /*#__PURE__*/ _jsx(CheckIcon, {})
                })
            }),
            children
        ]
    });
}
function DropdownMenuRadioGroup({ ...props }) {
    return /*#__PURE__*/ _jsx(MenuPrimitive.RadioGroup, {
        "data-slot": "dropdown-menu-radio-group",
        ...props
    });
}
function DropdownMenuRadioItem({ className, children, inset, ...props }) {
    return /*#__PURE__*/ _jsxs(MenuPrimitive.RadioItem, {
        "data-slot": "dropdown-menu-radio-item",
        "data-inset": inset,
        className: cn("relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            /*#__PURE__*/ _jsx("span", {
                className: "pointer-events-none absolute right-2 flex items-center justify-center",
                "data-slot": "dropdown-menu-radio-item-indicator",
                children: /*#__PURE__*/ _jsx(MenuPrimitive.RadioItemIndicator, {
                    children: /*#__PURE__*/ _jsx(CheckIcon, {})
                })
            }),
            children
        ]
    });
}
function DropdownMenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_menu__WEBPACK_IMPORTED_MODULE_10__/* .Separator */ .w, {
        "data-slot": "dropdown-menu-separator",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("-mx-1 my-1 h-px bg-border", className),
        ...props
    });
}
function DropdownMenuShortcut({ className, ...props }) {
    return /*#__PURE__*/ _jsx("span", {
        "data-slot": "dropdown-menu-shortcut",
        className: cn("ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground", className),
        ...props
    });
}



/***/ })

}]);