'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Shield, Lock, FileText, Trash2, Download, AlertTriangle,
  CheckCircle2, XCircle, Clock, Search, Filter, RefreshCw,
  Eye, ChevronDown, Calendar, Building2, Save, Loader2,
} from 'lucide-react';
import { useComplianceStore, type ComplianceSettings, type AuditLogEntry, type EncryptionLevel } from './store';

/* ═══════════════════════════════════════════════════════════════
   COLOR CONSTANTS (MedQ Dark Theme)
   ═══════════════════════════════════════════════════════════════ */
const C = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, rgba(255,255,255,0.03))',
  cardSolid: '#151821',
  cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
  green: 'var(--medq-accent-green, #00e5a0)',
  amber: 'var(--medq-accent-amber, #f59e0b)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  orange: 'var(--medq-accent-amber, #f97316)',
  text: 'var(--medq-text, #e8ecf4)',
  muted: '#8b95a8',
  dimmed: '#5a6478',
  cyan: 'var(--medq-accent-cyan, #22d3ee)',
  purple: 'var(--medq-accent-purple, #8b5cf6)',
};

const SEVERITY_CONFIG = {
  info: { color: C.cyan, bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)' },
  warning: { color: C.amber, bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  critical: { color: C.danger, bg: 'rgba(255,87,87,0.08)', border: 'rgba(255,87,87,0.2)' },
};

const ENCRYPTION_LEVELS: { value: EncryptionLevel; label: string; description: string; color: string }[] = [
  { value: 'none', label: 'None', description: 'No encryption. Messages stored and transmitted in plaintext. Not recommended for healthcare.', color: C.danger },
  { value: 'transport', label: 'Transport (TLS)', description: 'Messages encrypted in transit via TLS. Server can read messages. Standard for most web apps.', color: C.amber },
  { value: 'e2e', label: 'End-to-End', description: 'Client-side encryption using Signal Protocol. Server cannot read messages. Recommended for HIPAA compliance.', color: C.green },
];

/* ═══════════════════════════════════════════════════════════════
   COMPLIANCE DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
export default function ComplianceDashboard() {
  const store = useComplianceStore();
  const [activeSection, setActiveSection] = useState<'settings' | 'audit' | 'retention' | 'baa'>('settings');
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [retentionRunning, setRetentionRunning] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      useComplianceStore.getState().setLoading(true);
      try {
        const res = await fetch('/api/compliance');
        if (res.ok) {
          const data = await res.json();
          useComplianceStore.getState().setSettings(data.settings);
        }
      } catch (e) {
        console.error('Failed to load compliance settings:', e);
      } finally {
        useComplianceStore.getState().setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Load audit logs
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await fetch(`/api/audit/log?limit=100`);
        if (res.ok) {
          const data = await res.json();
          useComplianceStore.getState().setAuditLogs(data.logs || []);
        }
      } catch (e) {
        console.error('Failed to load audit logs:', e);
      }
    };
    if (activeSection === 'audit') loadLogs();
  }, [activeSection]);

  // Save settings
  const saveSettings = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/compliance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store.settings),
      });
      if (res.ok) {
        const data = await res.json();
        useComplianceStore.getState().setSettings(data.settings);
      }
    } catch (e) {
      console.error('Failed to save settings:', e);
    } finally {
      setSaving(false);
    }
  }, [store.settings]);

  // Execute retention
  const executeRetention = useCallback(async () => {
    setRetentionRunning(true);
    try {
      const res = await fetch('/api/compliance/retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ retentionDays: store.settings.retentionDays }),
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Retention executed: ${data.messagesPurged} messages purged.`);
      }
    } catch (e) {
      console.error('Retention error:', e);
    } finally {
      setRetentionRunning(false);
    }
  }, [store.settings.retentionDays]);

  // Filter audit logs
  const filteredLogs = store.auditLogs.filter((log) => {
    if (severityFilter !== 'all' && log.severity !== severityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (log.details || '').toLowerCase().includes(q) ||
        (log.action || '').toLowerCase().includes(q) ||
        (log.eventType || '').toLowerCase().includes(q) ||
        (log.resource || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sections = [
    { key: 'settings' as const, label: 'Encryption & Settings', icon: <Lock className="w-4 h-4" /> },
    { key: 'audit' as const, label: 'Audit Logs', icon: <Eye className="w-4 h-4" /> },
    { key: 'retention' as const, label: 'Data Retention', icon: <Trash2 className="w-4 h-4" /> },
    { key: 'baa' as const, label: 'BAA Document', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <Shield className="w-5 h-5" style={{ color: C.purple }} />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: C.text }}>HIPAA Compliance</h2>
          <p className="text-[11px]" style={{ color: C.dimmed }}>Encryption, audit logging, data retention, and BAA management</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: C.cardSolid }}>
        {sections.map((sec) => (
          <button
            key={sec.key}
            onClick={() => setActiveSection(sec.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[12px] font-medium transition-all"
            style={{
              background: activeSection === sec.key ? 'rgba(139,92,246,0.12)' : 'transparent',
              color: activeSection === sec.key ? C.purple : C.dimmed,
              border: activeSection === sec.key ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
            }}
          >
            {sec.icon}
            <span className="hidden sm:inline">{sec.label}</span>
          </button>
        ))}
      </div>

      {/* ── Settings Section ── */}
      {activeSection === 'settings' && (
        <div className="space-y-4">
          {/* Encryption Level */}
          <div className="rounded-xl p-5" style={{ background: C.cardSolid, border: `1px solid ${C.cardBorder}` }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Encryption Level</h3>
            <div className="space-y-2">
              {ENCRYPTION_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => useComplianceStore.getState().updateSetting('encryptionLevel', level.value)}
                  className="w-full text-left p-3 rounded-lg transition-all"
                  style={{
                    background: store.settings.encryptionLevel === level.value ? `${level.color}10` : C.card,
                    border: `1px solid ${store.settings.encryptionLevel === level.value ? `${level.color}30` : C.cardBorder}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: level.color }}
                    />
                    <span className="text-sm font-semibold" style={{ color: level.color }}>{level.label}</span>
                    {store.settings.encryptionLevel === level.value && (
                      <CheckCircle2 className="w-4 h-4 ml-auto" style={{ color: level.color }} />
                    )}
                  </div>
                  <p className="text-[11px] ml-5" style={{ color: C.dimmed }}>{level.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Other Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: C.cardSolid, border: `1px solid ${C.cardBorder}` }}>
              <h3 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Data Retention</h3>
              <p className="text-[11px] mb-3" style={{ color: C.dimmed }}>Messages older than this period will be automatically purged</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={30}
                  max={3650}
                  value={store.settings.retentionDays}
                  onChange={(e) => useComplianceStore.getState().updateSetting('retentionDays', parseInt(e.target.value) || 365)}
                  className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: C.card, border: `1px solid ${C.cardBorder}`, color: C.text }}
                />
                <span className="text-[11px]" style={{ color: C.dimmed }}>days</span>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ background: C.cardSolid, border: `1px solid ${C.cardBorder}` }}>
              <h3 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Audit Logging</h3>
              <p className="text-[11px] mb-3" style={{ color: C.dimmed }}>Record all access events and compliance actions</p>
              <button
                onClick={() => useComplianceStore.getState().updateSetting('auditLogging', !store.settings.auditLogging)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{
                  background: store.settings.auditLogging ? `${C.green}12` : `${C.danger}12`,
                  color: store.settings.auditLogging ? C.green : C.danger,
                  border: `1px solid ${store.settings.auditLogging ? `${C.green}25` : `${C.danger}25`}`,
                }}
              >
                {store.settings.auditLogging ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {store.settings.auditLogging ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: `${C.purple}15`,
              color: C.purple,
              border: `1px solid ${C.purple}30`,
            }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Compliance Settings
          </button>
        </div>
      )}

      {/* ── Audit Logs Section ── */}
      {activeSection === 'audit' && (
        <div className="space-y-3">
          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.dimmed }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit logs..."
                className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: C.cardSolid, border: `1px solid ${C.cardBorder}`, color: C.text }}
              />
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: C.cardSolid, border: `1px solid ${C.cardBorder}`, color: C.text }}
            >
              <option value="all">All Severity</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Log Entries */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.cardBorder}` }}>
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8" style={{ color: C.dimmed }}>
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No audit logs found</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: C.cardBorder }}>
                {filteredLogs.slice(0, 50).map((log) => {
                  const sevConfig = SEVERITY_CONFIG[log.severity as keyof typeof SEVERITY_CONFIG] || SEVERITY_CONFIG.info;
                  return (
                    <div key={log.id} className="p-3 hover:bg-white/[0.02] transition-colors" style={{ background: C.cardSolid }}>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: sevConfig.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[12px] font-semibold" style={{ color: sevConfig.color }}>
                              {log.eventType}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: sevConfig.bg, color: sevConfig.color, border: `1px solid ${sevConfig.border}` }}>
                              {log.severity}
                            </span>
                            <span className="text-[10px]" style={{ color: C.dimmed }}>
                              {log.resource}
                            </span>
                          </div>
                          <p className="text-[11px] mt-0.5" style={{ color: C.muted }}>{log.details}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px]" style={{ color: C.dimmed }}>
                              <Clock className="w-3 h-3 inline mr-0.5" />
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                            {log.userId && (
                              <span className="text-[10px]" style={{ color: C.dimmed }}>
                                User: {log.userId.slice(0, 8)}...
                              </span>
                            )}
                            {log.ipAddress && (
                              <span className="text-[10px]" style={{ color: C.dimmed }}>
                                IP: {log.ipAddress}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Data Retention Section ── */}
      {activeSection === 'retention' && (
        <div className="space-y-4">
          <div className="rounded-xl p-5" style={{ background: C.cardSolid, border: `1px solid ${C.cardBorder}` }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Data Retention Policy</h3>
            <p className="text-[11px] mb-4" style={{ color: C.dimmed }}>
              Messages older than {store.settings.retentionDays} days will be permanently purged. This action cannot be undone.
              HIPAA requires a minimum of 6 years (2,190 days) for some record types.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
                <span className="text-[10px] uppercase" style={{ color: C.dimmed }}>Retention Period</span>
                <p className="text-lg font-bold" style={{ color: C.cyan }}>{store.settings.retentionDays} days</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: C.card, border: `1px solid ${C.cardBorder}` }}>
                <span className="text-[10px] uppercase" style={{ color: C.dimmed }}>Policy Status</span>
                <p className="text-lg font-bold" style={{ color: C.green }}>Active</p>
              </div>
            </div>

            <button
              onClick={executeRetention}
              disabled={retentionRunning}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: `${C.danger}12`,
                color: C.danger,
                border: `1px solid ${C.danger}25`,
              }}
            >
              {retentionRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Execute Retention Now
            </button>
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: C.amber }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: C.amber }}>Important Notice</p>
                <p className="text-[11px] mt-1" style={{ color: C.muted }}>
                  Executing retention will permanently modify messages older than the retention period.
                  Ensure you have proper backups and that your retention policy complies with applicable
                  regulations (HIPAA requires minimum 6-year retention for designated record sets).
                  This action is logged in the audit trail.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BAA Section ── */}
      {activeSection === 'baa' && (
        <div className="space-y-4">
          <div className="rounded-xl p-5" style={{ background: C.cardSolid, border: `1px solid ${C.cardBorder}` }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Business Associate Agreement (BAA)</h3>
            <p className="text-[11px] mb-4" style={{ color: C.dimmed }}>
              A BAA is required between a covered entity (healthcare organization) and a business associate
              (this platform) for HIPAA compliance when handling PHI. Without a signed BAA, this platform
              should not be used for protected health information.
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[10px] font-bold uppercase mb-1 block" style={{ color: C.dimmed }}>Organization Name</label>
                <input
                  type="text"
                  value={store.settings.baaOrganization || ''}
                  onChange={(e) => useComplianceStore.getState().updateSetting('baaOrganization', e.target.value)}
                  placeholder="Enter organization name..."
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: C.card, border: `1px solid ${C.cardBorder}`, color: C.text }}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => useComplianceStore.getState().updateSetting('baaSigned', !store.settings.baaSigned)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: store.settings.baaSigned ? `${C.green}12` : `${C.danger}12`,
                    color: store.settings.baaSigned ? C.green : C.danger,
                    border: `1px solid ${store.settings.baaSigned ? `${C.green}25` : `${C.danger}25`}`,
                  }}
                >
                  {store.settings.baaSigned ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  BAA {store.settings.baaSigned ? 'Signed' : 'Not Signed'}
                </button>
                {store.settings.baaSigned && store.settings.baaSignedDate && (
                  <span className="text-[11px]" style={{ color: C.dimmed }}>
                    Signed on: {new Date(store.settings.baaSignedDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                // Generate and download BAA template
                const baaText = generateBAATemplate(store.settings.baaOrganization || '[Organization Name]');
                const blob = new Blob([baaText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `BAA-${(store.settings.baaOrganization || 'template').replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: `${C.purple}12`, color: C.purple, border: `1px solid ${C.purple}25` }}
            >
              <Download className="w-4 h-4" />
              Download BAA Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BAA DOCUMENT TEMPLATE GENERATOR
   ═══════════════════════════════════════════════════════════════ */
function generateBAATemplate(organizationName: string): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return `
BUSINESS ASSOCIATE AGREEMENT
==============================

This Business Associate Agreement ("BAA") is entered into as of ${date}
("Effective Date"), by and between:

COVERED ENTITY:  ${organizationName}
                 ("Covered Entity")

BUSINESS ASSOCIATE:  MedQ Platform
                     ("Business Associate")

RECITALS
--------

WHEREAS, Covered Entity is a covered entity as defined under the Health
Insurance Portability and Accountability Act of 1996 ("HIPAA"),
as amended by the Health Information Technology for Economic and Clinical
Health Act ("HITECH Act"); and

WHEREAS, Business Associate provides certain services to Covered Entity
that involve the creation, receipt, maintenance, or transmission of
Protected Health Information ("PHI"); and

WHEREAS, the parties desire to comply with the requirements of HIPAA,
the HITECH Act, and implementing regulations at 45 CFR Parts 160 and 164;

NOW, THEREFORE, the parties agree as follows:

1. DEFINITIONS
--------------

1.1 "Protected Health Information" or "PHI" means individually identifiable
health information held by or on behalf of Business Associate that is
created, received, maintained, or transmitted on behalf of Covered Entity.

1.2 "Breach" means the acquisition, access, use, or disclosure of PHI
in a manner not permitted by HIPAA which compromises the security or
privacy of such PHI.

1.3 "Data Aggregation" means the combining of PHI created or received
by Business Associate on behalf of Covered Entity.

1.4 "Designated Record Set" means a group of records maintained by or
for a covered entity that is the medical or billing records about
individuals; enrollment, payment, claims adjudication, and case
management records; or records used to make decisions about individuals.

1.5 "Security Incident" means the attempted or successful unauthorized
access, use, disclosure, modification, or destruction of information
or interference with system operations in an information system.

1.6 All other capitalized terms not defined herein shall have the same
meaning as those terms in the HIPAA Rules.

2. OBLIGATIONS OF BUSINESS ASSOCIATE
-------------------------------------

2.1 Business Associate shall not use or disclose PHI other than as
permitted or required by this Agreement or as required by law.

2.2 Business Associate shall use appropriate safeguards to prevent use
or disclosure of PHI other than as provided for by this Agreement.

2.3 Business Associate shall implement administrative, physical, and
technical safeguards that reasonably and appropriately protect the
confidentiality, integrity, and availability of PHI.

2.4 Business Associate shall ensure that any agent or subcontractor
to whom it provides PHI agrees to the same restrictions and conditions
that apply to Business Associate under this Agreement.

2.5 Business Associate shall report to Covered Entity any Security
Incident or Breach of which it becomes aware, without unreasonable
delay, and in no event later than thirty (30) calendar days after
discovery.

2.6 Business Associate shall make available to Covered Entity PHI in
a Designated Record Set, as necessary for Covered Entity to fulfill
its obligations under 45 CFR § 164.524 (access) and § 164.526
(amendment).

2.7 Business Associate shall make available to Covered Entity
information required to provide an accounting of disclosures of PHI
in accordance with 45 CFR § 164.528.

3. OBLIGATIONS OF COVERED ENTITY
----------------------------------

3.1 Covered Entity shall notify Business Associate of any limitation
in the notice of privacy practices of Covered Entity, in accordance
with 45 CFR § 164.520, or any changes in such limitation, that may
affect Business Associate's use or disclosure of PHI.

3.2 Covered Entity shall notify Business Associate of any changes in,
or revocation of, permission by an individual to use or disclose PHI,
to the extent that such changes may affect Business Associate's use
or disclosure of PHI.

3.3 Covered Entity shall notify Business Associate of any restriction
on the use or disclosure of PHI to which Covered Entity has agreed
in accordance with 45 CFR § 164.522.

4. PERMITTED USES AND DISCLOSURES
-----------------------------------

4.1 Business Associate may use or disclose PHI as necessary to perform
the services described in the underlying service agreement.

4.2 Business Associate may use PHI for the proper management and
administration of Business Associate or to carry out the legal
responsibilities of Business Associate.

4.3 Business Associate may use or disclose PHI for Data Aggregation
purposes for the lawful purposes of Covered Entity, provided that
such use is consistent with the applicable requirements of HIPAA.

4.4 Business Associate may de-identify PHI in accordance with
45 CFR § 164.514(b) and use or disclose such de-identified information
for any purpose.

5. TERM AND TERMINATION
-------------------------

5.1 This Agreement shall be effective as of the Effective Date and
shall terminate upon the earlier of: (a) the termination of the
underlying service agreement; or (b) mutual written agreement.

5.2 Upon termination of this Agreement, Business Associate shall
return or destroy all PHI received from Covered Entity, or created
or received by Business Associate on behalf of Covered Entity, that
Business Associate still maintains in any form.

5.3 If return or destruction of PHI is not feasible, Business
Associate shall continue to protect such PHI in accordance with the
terms of this Agreement for as long as Business Associate retains
such PHI.

6. ENCRYPTION AND SECURITY STANDARDS
---------------------------------------

6.1 Business Associate shall implement end-to-end encryption for all
PHI transmitted between parties using the Signal Protocol (Double
Ratchet Algorithm) with AES-256-GCM encryption.

6.2 Business Associate shall use WebRTC with SRTP encryption for all
video communications involving PHI, with key verification via Short
Authentication Strings (SAS).

6.3 Business Associate shall maintain audit logging of all access
to PHI, including user identification, timestamp, and action performed.

6.4 Business Associate shall implement data retention policies in
accordance with applicable federal and state requirements, with a
minimum retention period as specified by Covered Entity.

6.5 Business Associate shall conduct regular security risk assessments
and implement remediation measures as required by 45 CFR § 164.308(a)(1).

7. BREACH NOTIFICATION
------------------------

7.1 Business Associate shall notify Covered Entity of any Breach
of unsecured PHI without unreasonable delay, and in no event later
than thirty (30) calendar days after discovery of such Breach.

7.2 Such notification shall include: (a) identification of each
individual whose unsecured PHI has been, or is reasonably believed
to have been, accessed, acquired, used, or disclosed; (b) a brief
description of what happened; (c) a description of the types of
PHI involved; (d) steps individuals should take to protect themselves;
and (e) what Business Associate is doing to investigate and mitigate
harm.

8. INDEMNIFICATION
--------------------

8.1 Business Associate shall indemnify and hold harmless Covered Entity
from and against any and all claims, damages, losses, costs, and
expenses arising out of or relating to Business Associate's breach
of this Agreement or any use or disclosure of PHI by Business
Associate not permitted by this Agreement.

9. MISCELLANEOUS
------------------

9.1 This Agreement shall be governed by and construed in accordance
with the laws of the jurisdiction in which Covered Entity is located.

9.2 Any amendment to this Agreement shall be in writing and signed
by both parties.

9.3 If any provision of this Agreement is held to be invalid or
unenforceable, the remaining provisions shall remain in full force
and effect.

9.4 This Agreement constitutes the entire agreement between the
parties with respect to the subject matter hereof and supersedes
all prior agreements and understandings, whether written or oral.


IN WITNESS WHEREOF, the parties have executed this Agreement as of
the Effective Date.

COVERED ENTITY:

Name:    ${organizationName}
By:      __________________________
Title:   __________________________
Date:    __________________________

BUSINESS ASSOCIATE:

Name:    MedQ Platform
By:      __________________________
Title:   __________________________
Date:    __________________________

---
This BAA template is provided for informational purposes only and does not
constitute legal advice. Both parties should consult with qualified legal
counsel before executing this agreement.
`.trim();
}
