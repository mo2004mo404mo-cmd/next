'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useSettings, playSound } from '@/components/medq/SettingsContext';
import { clearPronunciationCache } from '@/lib/pronunciation';
import {
  Settings, Bell, Volume2, Moon, Sun, Globe, Shield, Trash2,
  Loader2, RotateCcw, HardDrive, ChevronRight, Download,
  FileText, Bookmark, Database, AudioWaveform, Smartphone, Check, Cpu, Key,
} from 'lucide-react';
import ByokHub from '@/components/medq/byok/ByokHub';
import { OfflineAIManager } from '@/components/medq/offline-ai/OfflineAIManager';
import { usePushNotifications } from '@/components/medq/usePushNotifications';
import { useInstallApp } from '@/components/medq/useInstallApp';
import InstallModal from '@/components/medq/InstallModal';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { settings, updateSetting, resetSettings } = useSettings();
  const [resetting, setResetting] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [showByok, setShowByok] = useState(false);
  const {
    supported: pushSupported,
    unavailableReason: pushUnavailable,
    permission: pushPermission,
    enabled: pushEnabled,
    enable: enablePush,
    disable: disablePush,
  } = usePushNotifications();
  const [pushBusy, setPushBusy] = useState(false);

  // ── Install App ──
  const {
    platform: installPlatform,
    canPrompt,
    isInstalled,
    installing,
    install,
    instructions: installInstructions,
  } = useInstallApp();
  const [installModalOpen, setInstallModalOpen] = useState(false);

  const handleInstallClick = async () => {
    const result = await install();
    if (result.ok && result.method === 'native') {
      toast.success('MedQ installed! Find it on your Home Screen.');
      setInstallModalOpen(false);
    } else if (result.ok && result.method === 'instructions') {
      // Show the modal with platform-specific instructions
      setInstallModalOpen(true);
    } else if (!result.ok && result.reason === 'dismissed') {
      // User dismissed the native prompt — show fallback instructions
      setInstallModalOpen(true);
      toast.info('No problem — you can install later from your browser menu.');
    } else if (!result.ok && result.reason === 'installed') {
      setInstallModalOpen(true);
    }
  };

  const handleTogglePush = async (next: boolean) => {
    setPushBusy(true);
    try {
      if (next) {
        const result = await enablePush();
        if (!result.ok) {
          toast.error(result.error || 'Failed to enable push notifications');
        } else {
          toast.success('Push notifications enabled — you’ll get reminders even when the tab is closed');
        }
      } else {
        await disablePush();
        toast.success('Push notifications disabled');
      }
    } finally {
      setPushBusy(false);
    }
  };

  const handleExport = async (type: 'progress' | 'notes' | 'bookmarks' | 'all') => {
    setExporting(type);
    try {
      const res = await fetch(`/api/export?type=${type}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Export failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Extract filename from Content-Disposition header, or use default
      const disposition = res.headers.get('Content-Disposition');
      let filename = `medq-${type}-${new Date().toISOString().split('T')[0]}.json`;
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match) filename = match[1];
      }
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`${type === 'all' ? 'All data' : type.charAt(0).toUpperCase() + type.slice(1)} exported successfully!`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to export data');
    } finally {
      setExporting(null);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    await new Promise(r => setTimeout(r, 500));
    resetSettings();
    setResetting(false);
    toast.success('Settings reset to defaults');
  };

  const handleClearCache = () => {
    try {
      const keysToKeep = ['medq-settings', 'medq-daily-bonus-date', 'authjs.session-token', 'next-auth.session-token'];
      const allKeys = Object.keys(localStorage);
      for (const key of allKeys) {
        if (!keysToKeep.some(k => key.startsWith(k))) {
          localStorage.removeItem(key);
        }
      }
      if ('caches' in window) {
        caches.keys().then(names => names.forEach(name => caches.delete(name)));
      }
      toast.success('Cache cleared successfully');
    } catch {
      toast.error('Failed to clear cache');
    }
  };

  return (
    <>
      <Dialog open={open && !showByok} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg rounded-2xl border-white/[0.06] p-0 overflow-hidden"
        style={{ background: '#151821' }}
      >
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-lg font-bold text-[#e8ecf4] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#00e5a0]" />
            Settings
          </DialogTitle>
          <DialogDescription className="text-xs text-[#5a6478]">
            Customize your MedQ experience
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-4 space-y-5 max-h-[65vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>

          {/* ── Notifications ── */}
          <SettingsSection title="Notifications" icon={<Bell className="w-4 h-4" />}>
            <ToggleRow
              label="Push Notifications"
              description={settings.notifications ? "You'll see the notification bell in the header" : "Notification bell is hidden"}
              checked={settings.notifications}
              onChange={(v) => updateSetting('notifications', v)}
            />

            {/* ── System Push Notifications (Web Push) ── */}
            <div className="py-2 px-2 rounded-lg border border-white/[0.04] bg-[#0c0e14]/30 mt-2">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#e8ecf4]">System Push Notifications</p>
                  <p className="text-[10px] text-[#5a6478] mt-0.5">
                    {!pushSupported && pushUnavailable === 'iframe' && 'Not available inside the preview frame — open the app in a standalone browser tab'}
                    {!pushSupported && !pushUnavailable && 'Not supported in this browser'}
                    {pushSupported && pushPermission === 'denied' && 'Blocked in browser settings — enable in site permissions'}
                    {pushSupported && pushPermission !== 'denied' && pushEnabled && 'Active — you’ll get notifications even with the tab closed'}
                    {pushSupported && pushPermission !== 'denied' && !pushEnabled && 'Get reminders for daily challenge, friend requests, and more'}
                  </p>
                </div>
                <Switch
                  checked={pushEnabled}
                  onCheckedChange={handleTogglePush}
                  disabled={!pushSupported || pushPermission === 'denied' || pushBusy}
                />
              </div>
              {pushBusy && (
                <p className="text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin" /> Working…
                </p>
              )}
            </div>

            <ToggleRow
              label="Daily Study Reminder"
              description="Receive a daily reminder to study"
              checked={settings.dailyReminder}
              onChange={(v) => updateSetting('dailyReminder', v)}
            />
            {settings.dailyReminder && (
              <div className="ml-8 mt-1 flex items-center gap-3">
                <Label className="text-[10px] text-[#5a6478]">Reminder time</Label>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => updateSetting('reminderTime', e.target.value)}
                  className="h-7 px-2 text-xs rounded-md border border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4]"
                />
              </div>
            )}
          </SettingsSection>

          {/* ── Install App ── */}
          <SettingsSection title="Install App" icon={<Smartphone className="w-4 h-4" />}>
            <div className="py-2">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#e8ecf4]">
                    {isInstalled ? 'MedQ is installed' : 'Install MedQ as an app'}
                  </p>
                  <p className="text-[10px] text-[#5a6478] mt-0.5 leading-relaxed">
                    {isInstalled
                      ? 'You\'re running the installed PWA right now. Launch it from your Home Screen next time.'
                      : installPlatform === 'ios'
                        ? 'Add to iPhone Home Screen for full-screen, offline access.'
                        : installPlatform === 'chromium'
                          ? 'Install as a standalone app with offline access & push notifications.'
                          : 'Open in Chrome, Edge, or Safari to install as an app.'}
                  </p>
                </div>
                {isInstalled ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/20">
                    <Check className="w-3.5 h-3.5 text-[#00e5a0]" />
                    <span className="text-[11px] font-semibold text-[#00e5a0]">Installed</span>
                  </div>
                ) : (
                  <button
                    onClick={handleInstallClick}
                    disabled={installing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e5a0] text-[#0c0e14] text-[11px] font-bold hover:bg-[#00e5a0]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {installing ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Installing…
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3" />
                        Install
                      </>
                    )}
                  </button>
                )}
              </div>
              {!isInstalled && installPlatform === 'chromium' && !canPrompt && (
                <p className="text-[10px] text-[#5a6478] leading-relaxed mt-1">
                  Tip: If the Install button doesn&apos;t do anything, your browser may have
                  blocked the prompt. Open the browser menu (⋮) → &ldquo;Install MedQ&rdquo; manually.
                </p>
              )}
              {!isInstalled && installPlatform === 'other' && (
                <p className="text-[10px] text-[#5a6478] leading-relaxed mt-1">
                  Your current browser doesn&apos;t support one-tap PWA install. Try Chrome,
                  Edge, or Safari for the best experience.
                </p>
              )}
            </div>
          </SettingsSection>

          {/* ── Audio & Playback ── */}
          <SettingsSection title="Audio & Playback" icon={<Volume2 className="w-4 h-4" />}>
            <ToggleRow
              label="Sound Effects"
              description={settings.soundEffects ? "Sounds play for correct/wrong answers & achievements" : "All sounds are muted"}
              checked={settings.soundEffects}
              onChange={(v) => updateSetting('soundEffects', v)}
            />
            <div className="ml-8 mt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => playSound('correct')}
                className="h-6 px-2 text-[9px] text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10"
              >
                \ud83d\udd0a Preview sound
              </Button>
            </div>
            <ToggleRow
              label="Auto-play Audio"
              description="Automatically play audio explanations for questions"
              checked={settings.autoPlayAudio}
              onChange={(v) => updateSetting('autoPlayAudio', v)}
            />
          </SettingsSection>

          {/* ── Pronunciation ── */}
          <SettingsSection title="Pronunciation" icon={<AudioWaveform className="w-4 h-4" />}>
            <ToggleRow
              label="Term Pronunciation"
              description={settings.pronunciationEnabled ? "Speaker icons appear next to medical terms — tap to hear" : "Pronunciation buttons are hidden"}
              checked={settings.pronunciationEnabled}
              onChange={(v) => updateSetting('pronunciationEnabled', v)}
            />
            {settings.pronunciationEnabled && (
              <div className="ml-8 mt-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#e8ecf4]">Speed</p>
                    <p className="text-[10px] text-[#5a6478]">{(settings.pronunciationSpeed * 100).toFixed(0)}% — {settings.pronunciationSpeed <= 0.6 ? 'Very slow' : settings.pronunciationSpeed <= 0.8 ? 'Slow & clear' : settings.pronunciationSpeed <= 1.0 ? 'Normal' : 'Fast'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateSetting('pronunciationSpeed', Math.max(0.5, Math.round((settings.pronunciationSpeed - 0.1) * 10) / 10))}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border border-white/[0.06] hover:bg-white/[0.06] transition-colors text-[#8b95a8]"
                    >
                      -
                    </button>
                    <div className="w-16 h-1.5 rounded-full bg-[#3a4055] relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-[#00e5a0]"
                        style={{ width: `${((settings.pronunciationSpeed - 0.5) / 1.0) * 100}%` }}
                      />
                    </div>
                    <button
                      onClick={() => updateSetting('pronunciationSpeed', Math.min(1.5, Math.round((settings.pronunciationSpeed + 0.1) * 10) / 10))}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border border-white/[0.06] hover:bg-white/[0.06] transition-colors text-[#8b95a8]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearPronunciationCache();
                    toast.success('Pronunciation cache cleared');
                  }}
                  className="h-6 px-2 text-[9px] text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10"
                >
                  Clear pronunciation cache
                </Button>
              </div>
            )}
          </SettingsSection>

          {/* ── Display ── */}
          <SettingsSection title="Display" icon={settings.theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}>
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 mr-3">
                <p className="text-xs font-medium text-[#e8ecf4]">Theme</p>
                <p className="text-[10px] text-[#5a6478]">{settings.theme === 'dark' ? 'Dark mode active' : 'Light mode active'}</p>
              </div>
              <div className="flex items-center gap-1 bg-[#0c0e14]/50 rounded-lg p-0.5 border border-white/[0.06]">
                <button
                  onClick={() => updateSetting('theme', 'dark')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${
                    settings.theme === 'dark' ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#5a6478] hover:text-[#8b95a8]'
                  }`}
                >
                  <Moon className="w-3 h-3" /> Dark
                </button>
                <button
                  onClick={() => updateSetting('theme', 'light')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${
                    settings.theme === 'light' ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#5a6478] hover:text-[#8b95a8]'
                  }`}
                >
                  <Sun className="w-3 h-3" /> Light
                </button>
              </div>
            </div>
            <ToggleRow
              label="Compact Mode"
              description={settings.compactMode ? "Reduced spacing — more content visible" : "Normal spacing — comfortable reading"}
              checked={settings.compactMode}
              onChange={(v) => updateSetting('compactMode', v)}
            />
            <ToggleRow
              label="Show Usage Meters"
              description={settings.showUsageMeters ? "Usage limits shown in the header" : "Usage meters hidden from header"}
              checked={settings.showUsageMeters}
              onChange={(v) => updateSetting('showUsageMeters', v)}
            />
          </SettingsSection>

          {/* ── Language & Region ── */}
          <SettingsSection title="Language & Region" icon={<Globe className="w-4 h-4" />}>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-xs font-medium text-[#e8ecf4]">Language</p>
                <p className="text-[10px] text-[#5a6478]">Choose your preferred language</p>
              </div>
              <Select value={settings.language} onValueChange={(v) => {
                if (v === null) return;
                updateSetting('language', v);
                if (v !== 'en') {
                  toast.info('Language preference saved — multi-language support coming soon!');
                }
              }}>
                <SelectTrigger className="w-[140px] h-8 text-xs rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: '#1a1e2b', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <SelectItem value="en" className="text-xs text-[#8b95a8]">English</SelectItem>
                  <SelectItem value="ar" className="text-xs text-[#8b95a8]">العربية</SelectItem>
                  <SelectItem value="es" className="text-xs text-[#8b95a8]">Español</SelectItem>
                  <SelectItem value="fr" className="text-xs text-[#8b95a8]">Français</SelectItem>
                  <SelectItem value="de" className="text-xs text-[#8b95a8]">Deutsch</SelectItem>
                  <SelectItem value="pt" className="text-xs text-[#8b95a8]">Português</SelectItem>
                  <SelectItem value="tr" className="text-xs text-[#8b95a8]">Türkçe</SelectItem>
                  <SelectItem value="hi" className="text-xs text-[#8b95a8]">हिन्दी</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SettingsSection>

          {/* ── Privacy ── */}
          <SettingsSection title="Privacy" icon={<Shield className="w-4 h-4" />}>
            <ToggleRow
              label="Ad Personalization"
              description={settings.adPersonalization ? "Ads may be personalized based on interests" : "Only generic ads shown"}
              checked={settings.adPersonalization}
              onChange={(v) => updateSetting('adPersonalization', v)}
            />
          </SettingsSection>

          {/* ── AI Providers — opens the full provider workspace ── */}
          <SettingsSection title="AI Providers" icon={<Key className="w-4 h-4" />}>
            <button
              onClick={() => setShowByok(true)}
              className="w-full flex items-center justify-between py-2 group text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Key className="w-3.5 h-3.5 text-[#5a6478] group-hover:text-[#00e5a0] transition-colors" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#e8ecf4]">Manage API keys</p>
                  <p className="text-[10px] text-[#5a6478]">Configure providers and available models</p>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#3a4055] group-hover:text-[#5a6478] transition-colors" />
            </button>
          </SettingsSection>

          {/* ── Offline AI Engine — on-device LLM, works with no internet ── */}
          <SettingsSection title="Offline AI Engine" icon={<Cpu className="w-4 h-4" />}>
            <OfflineAIManager />
          </SettingsSection>

          {/* ── Data & Storage ── */}
          <SettingsSection title="Data & Storage" icon={<HardDrive className="w-4 h-4" />}>
            <button
              onClick={handleClearCache}
              className="w-full flex items-center justify-between py-2 group"
            >
              <div className="flex items-center gap-2">
                <Trash2 className="w-3.5 h-3.5 text-[#5a6478]" />
                <div className="text-left">
                  <p className="text-xs font-medium text-[#e8ecf4]">Clear Cache</p>
                  <p className="text-[10px] text-[#5a6478]">Remove cached data and temporary files</p>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#3a4055] group-hover:text-[#5a6478] transition-colors" />
            </button>
          </SettingsSection>

          {/* ── Data Export ── */}
          <SettingsSection title="Data Export" icon={<Download className="w-4 h-4" />}>
            <ExportRow
              label="Export Progress"
              description="Study sessions, streaks & achievements"
              icon={<FileText className="w-3.5 h-3.5" />}
              loading={exporting === 'progress'}
              onClick={() => handleExport('progress')}
            />
            <ExportRow
              label="Export Notes"
              description="All your question notes"
              icon={<FileText className="w-3.5 h-3.5" />}
              loading={exporting === 'notes'}
              onClick={() => handleExport('notes')}
            />
            <ExportRow
              label="Export Bookmarks"
              description="All bookmarked questions"
              icon={<Bookmark className="w-3.5 h-3.5" />}
              loading={exporting === 'bookmarks'}
              onClick={() => handleExport('bookmarks')}
            />
            <ExportRow
              label="Export Everything"
              description="All data combined into one file"
              icon={<Database className="w-3.5 h-3.5" />}
              loading={exporting === 'all'}
              onClick={() => handleExport('all')}
              highlight
            />
          </SettingsSection>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.04] flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleReset}
            disabled={resetting}
            className="text-[10px] text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 h-8 px-2"
          >
            {resetting ? (
              <><Loader2 className="w-3 h-3 animate-spin mr-1" />Resetting...</>
            ) : (
              <><RotateCcw className="w-3 h-3 mr-1" />Reset All</>
            )}
          </Button>
          <Button
            onClick={onClose}
            className="h-9 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs rounded-lg"
          >
            Done
          </Button>
        </div>
      </DialogContent>

      {/* Install modal — opened by the "Install App" button above */}
      <InstallModal
        open={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
        instructions={installInstructions}
        installing={installing}
      />

      </Dialog>

      <Dialog open={showByok} onOpenChange={setShowByok}>
        <DialogContent
          className="w-[min(92vw,72rem)] rounded-2xl border-white/[0.06] p-0 overflow-hidden"
          style={{ background: '#151821', maxWidth: 'none' }}
        >
          <DialogHeader className="px-6 pt-6 pb-3 border-b border-white/[0.06]">
            <DialogTitle className="text-lg font-bold text-[#e8ecf4] flex items-center gap-2">
              <Key className="w-5 h-5 text-[#00e5a0]" />
              AI Providers
            </DialogTitle>
            <DialogDescription className="text-xs text-[#5a6478]">
              Manage encrypted API keys and model preferences across your devices
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[calc(90vh-7rem)] overflow-y-auto px-6 py-5" style={{ scrollbarWidth: 'thin' }}>
            <ByokHub />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ── Sub-components ── */

function SettingsSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#00e5a0]">{icon}</span>
        <h3 className="text-xs font-bold text-[#8b95a8] uppercase tracking-wider">{title}</h3>
      </div>
      <div className="ml-1 space-y-0.5 pl-4 border-l border-white/[0.04]">
        {children}
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1 mr-3">
        <p className="text-xs font-medium text-[#e8ecf4]">{label}</p>
        <p className="text-[10px] text-[#5a6478]">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-[#00e5a0] data-[state=unchecked]:bg-[#3a4055]"
      />
    </div>
  );
}

function ExportRow({ label, description, icon, loading, onClick, highlight }: {
  label: string;
  description: string;
  icon: React.ReactNode;
  loading: boolean;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-between py-2 group disabled:opacity-60"
    >
      <div className="flex items-center gap-2">
        <span className={highlight ? 'text-[#00e5a0]' : 'text-[#5a6478]'}>
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
        </span>
        <div className="text-left">
          <p className={`text-xs font-medium ${highlight ? 'text-[#00e5a0]' : 'text-[#e8ecf4]'}`}>
            {label}
          </p>
          <p className="text-[10px] text-[#5a6478]">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-[#3a4055] group-hover:text-[#5a6478] transition-colors" />
    </button>
  );
}
