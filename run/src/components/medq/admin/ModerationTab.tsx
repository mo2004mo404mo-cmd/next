'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flag,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Trash2,
  Loader2,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ADMIN_COLORS,
  REPORT_REASON_COLORS,
  REPORT_STATUS_COLORS,
  getInitials,
  formatRelative,
  formatDate,
} from './shared';

/* ────────────────────── Types ────────────────────── */

interface ReportQuestion {
  id: string;
  text: string;
  type: string;
  system: string;
  topic: string;
  difficulty: string;
  isAIGenerated: boolean;
}

interface ReportReporter {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface ReportItem {
  id: string;
  questionId: string;
  userId: string;
  reason: string;
  comment: string | null;
  status: string;
  createdAt: string;
  question: ReportQuestion;
  user: ReportReporter;
}

interface ReportsResponse {
  reports: ReportItem[];
  total: number;
  page: number;
  totalPages: number;
  statusBreakdown: Record<string, number>;
}

/* ────────────────────── Component ────────────────────── */

export default function ModerationTab() {
  const [data, setData] = useState<ReportsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Action state
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ReportItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        status: statusFilter,
      });
      const res = await fetch(`/api/admin/reports?${params}`);
      if (!res.ok) throw new Error('Failed to fetch reports');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load moderation queue');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusUpdate = async (reportId: string, newStatus: 'reviewed' | 'resolved') => {
    setBusyId(reportId);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update report');
      }
      toast.success(`Marked as ${newStatus}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update report');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/reports/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete report');
      toast.success('Report deleted');
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      toast.error('Failed to delete report');
    } finally {
      setDeleting(false);
    }
  };

  /* ── Loading state ── */
  if (loading && !data) {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl animate-pulse"
            style={{ background: ADMIN_COLORS.card, border: `1px solid ${ADMIN_COLORS.cardBorder}` }}
          />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-xs" style={{ color: ADMIN_COLORS.muted }}>No moderation data available.</p>
      </div>
    );
  }

  const reports = data.reports || [];
  const totalPages = data.totalPages || 1;
  const total = data.total || 0;

  return (
    <div className="space-y-4">
      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-bold" style={{ color: ADMIN_COLORS.text }}>Content Moderation</h3>
          <p className="text-[10px]" style={{ color: ADMIN_COLORS.muted }}>
            Review reported questions · {total} item{total === 1 ? '' : 's'} match current filter
          </p>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border"
          style={{
            background: ADMIN_COLORS.card,
            borderColor: ADMIN_COLORS.cardBorder,
            color: ADMIN_COLORS.muted,
          }}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* ── Status Filter Pills ── */}
      <div
        className="flex items-center gap-2 flex-wrap p-2 rounded-xl"
        style={{ background: ADMIN_COLORS.card, border: `1px solid ${ADMIN_COLORS.cardBorder}` }}
      >
        {[
          { key: 'pending', label: 'Pending' },
          { key: 'reviewed', label: 'Reviewed' },
          { key: 'resolved', label: 'Resolved' },
          { key: 'all', label: 'All' },
        ].map((opt) => {
          const isActive = statusFilter === opt.key;
          const count = opt.key === 'all' ? total : (data.statusBreakdown[opt.key] ?? 0);
          return (
            <button
              key={opt.key}
              onClick={() => { setStatusFilter(opt.key); setPage(1); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={{
                background: isActive ? ADMIN_COLORS.amber : 'transparent',
                color: isActive ? '#0c0e14' : ADMIN_COLORS.muted,
              }}
            >
              {opt.label}
              <span
                className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                style={{
                  background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.05)',
                  color: isActive ? '#0c0e14' : ADMIN_COLORS.muted,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Reports List ── */}
      {reports.length === 0 ? (
        <div
          className="rounded-2xl py-16 text-center"
          style={{ background: ADMIN_COLORS.card, border: `1px solid ${ADMIN_COLORS.cardBorder}` }}
        >
          <CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: ADMIN_COLORS.green }} />
          <p className="text-xs font-medium" style={{ color: ADMIN_COLORS.text }}>All clear!</p>
          <p className="text-[10px] mt-1" style={{ color: ADMIN_COLORS.muted }}>
            No reports match this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report, idx) => {
            const reasonColor = REPORT_REASON_COLORS[report.reason] ?? ADMIN_COLORS.muted;
            const statusColor = REPORT_STATUS_COLORS[report.status] ?? ADMIN_COLORS.muted;
            const isBusy = busyId === report.id;
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className="rounded-2xl border p-4"
                style={{ background: ADMIN_COLORS.card, borderColor: ADMIN_COLORS.cardBorder }}
              >
                {/* ── Top row: reporter + timestamp ── */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: `${ADMIN_COLORS.blue}20`, color: ADMIN_COLORS.blue }}
                    >
                      {getInitials(report.user.name, report.user.email)}
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: ADMIN_COLORS.text }}>
                        {report.user.name || report.user.email || 'Unknown reporter'}
                      </p>
                      <p className="text-[10px]" style={{ color: ADMIN_COLORS.muted }}>
                        {formatRelative(report.createdAt)} · {formatDate(report.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant="outline"
                      className="text-[9px] uppercase tracking-wider font-semibold"
                      style={{
                        background: `${reasonColor}15`,
                        color: reasonColor,
                        borderColor: `${reasonColor}30`,
                      }}
                    >
                      {report.reason}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[9px] uppercase tracking-wider font-semibold"
                      style={{
                        background: `${statusColor}15`,
                        color: statusColor,
                        borderColor: `${statusColor}30`,
                      }}
                    >
                      {report.status}
                    </Badge>
                  </div>
                </div>

                {/* ── Question preview ── */}
                <div
                  className="rounded-lg p-3 mb-3"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${ADMIN_COLORS.cardBorder}` }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: `${ADMIN_COLORS.purple}15`, color: ADMIN_COLORS.purple }}
                    >
                      {report.question.type}
                    </span>
                    {report.question.system && (
                      <span className="text-[10px]" style={{ color: ADMIN_COLORS.muted }}>
                        {report.question.system}{report.question.topic ? ` · ${report.question.topic}` : ''}
                      </span>
                    )}
                    {report.question.isAIGenerated && (
                      <span
                        className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: `${ADMIN_COLORS.cyan}15`, color: ADMIN_COLORS.cyan }}
                      >
                        AI
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: ADMIN_COLORS.text }}>
                    {report.question.text || <em style={{ color: ADMIN_COLORS.dimmed }}>(empty question text)</em>}
                  </p>
                </div>

                {/* ── Reporter comment ── */}
                {report.comment && (
                  <div className="flex items-start gap-2 mb-3">
                    <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: ADMIN_COLORS.muted }} />
                    <p className="text-[11px] italic" style={{ color: ADMIN_COLORS.muted }}>
                      &ldquo;{report.comment}&rdquo;
                    </p>
                  </div>
                )}

                {/* ── Action buttons ── */}
                <div className="flex items-center justify-end gap-2">
                  {report.status !== 'reviewed' && report.status !== 'resolved' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleStatusUpdate(report.id, 'reviewed')}
                      disabled={isBusy}
                      className="h-7 px-2.5 text-[11px]"
                      style={{ color: ADMIN_COLORS.blue }}
                    >
                      {isBusy ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Flag className="w-3 h-3 mr-1" />}
                      Mark Reviewed
                    </Button>
                  )}
                  {report.status !== 'resolved' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(report.id, 'resolved')}
                      disabled={isBusy}
                      className="h-7 px-2.5 text-[11px]"
                      style={{ background: ADMIN_COLORS.green, color: '#0c0e14' }}
                    >
                      {isBusy ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                      Resolve
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteTarget(report)}
                    disabled={isBusy}
                    className="h-7 px-2.5 text-[11px]"
                    style={{ color: ADMIN_COLORS.red }}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{ background: ADMIN_COLORS.card, border: `1px solid ${ADMIN_COLORS.cardBorder}` }}
        >
          <span className="text-[10px]" style={{ color: ADMIN_COLORS.muted }}>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="h-8 px-2 text-xs"
              style={{ color: ADMIN_COLORS.muted }}
            >
              Previous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="h-8 px-2 text-xs"
              style={{ color: ADMIN_COLORS.muted }}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent style={{ background: '#1a1e2b', borderColor: 'rgba(255,255,255,0.1)', color: ADMIN_COLORS.text }}>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: ADMIN_COLORS.text }}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" style={{ color: ADMIN_COLORS.red }} />
                Delete Report
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: ADMIN_COLORS.muted }}>
              Permanently delete this report? This removes it from the audit queue but keeps the underlying question intact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ color: ADMIN_COLORS.muted, borderColor: 'rgba(255,255,255,0.1)' }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              style={{ background: ADMIN_COLORS.red, color: '#fff' }}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 mr-1.5" />
                  Delete Report
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
