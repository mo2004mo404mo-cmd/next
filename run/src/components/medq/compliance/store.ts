import { create } from 'zustand';

/* ═══════════════════════════════════════════════════════════════
   COMPLIANCE STORE
   Manages encryption settings, audit logging, data retention
   ═══════════════════════════════════════════════════════════════ */

export type EncryptionLevel = 'none' | 'transport' | 'e2e';

export interface AuditLogEntry {
  id: string;
  eventType: string;
  userId: string;
  userName?: string;
  resource: string;
  action: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface ComplianceSettings {
  encryptionLevel: EncryptionLevel;
  retentionDays: number;
  auditLogging: boolean;
  baaSigned: boolean;
  baaSignedDate?: string;
  baaOrganization?: string;
  baaDocumentId?: string;
}

export interface RetentionStats {
  totalMessages: number;
  messagesToDelete: number;
  oldestMessage: string | null;
  lastRetentionRun: string | null;
  nextScheduledRun: string | null;
}

interface ComplianceState {
  settings: ComplianceSettings;
  auditLogs: AuditLogEntry[];
  retentionStats: RetentionStats;
  loading: boolean;
  error: string | null;

  // Actions
  setSettings: (settings: ComplianceSettings) => void;
  updateSetting: <K extends keyof ComplianceSettings>(key: K, value: ComplianceSettings[K]) => void;
  setAuditLogs: (logs: AuditLogEntry[]) => void;
  addAuditLog: (entry: AuditLogEntry) => void;
  setRetentionStats: (stats: RetentionStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultSettings: ComplianceSettings = {
  encryptionLevel: 'transport',
  retentionDays: 365,
  auditLogging: true,
  baaSigned: false,
};

const defaultRetentionStats: RetentionStats = {
  totalMessages: 0,
  messagesToDelete: 0,
  oldestMessage: null,
  lastRetentionRun: null,
  nextScheduledRun: null,
};

export const useComplianceStore = create<ComplianceState>((set) => ({
  settings: defaultSettings,
  auditLogs: [],
  retentionStats: defaultRetentionStats,
  loading: false,
  error: null,

  setSettings: (settings) => set({ settings }),
  updateSetting: (key, value) => set((s) => ({ settings: { ...s.settings, [key]: value } })),
  setAuditLogs: (logs) => set({ auditLogs: logs }),
  addAuditLog: (entry) => set((s) => ({ auditLogs: [entry, ...s.auditLogs].slice(0, 500) })),
  setRetentionStats: (stats) => set({ retentionStats: stats }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ settings: defaultSettings, auditLogs: [], retentionStats: defaultRetentionStats, loading: false, error: null }),
}));
