'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Users as UsersIcon,
  RefreshCw,
  TrendingUp,
  Calendar,
  Layers,
  Loader2,
} from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts';
import { TabResponsiveContainer } from '../TabResponsiveContainer';
import { toast } from 'sonner';
import {
  ADMIN_COLORS, formatNumber, formatDate,
} from './shared';

/* ────────────────────── Types ────────────────────── */

interface AnalyticsSummary {
  dau: number;
  mau: number;
  totalUsers: number;
  cohortSize: number;
  newUsersLastWindow: number;
}

interface AnalyticsResponse {
  windowDays: number;
  generatedAt: string;
  summary: AnalyticsSummary;
  dauSeries: { date: string; users: number }[];
  newUsersSeries: { date: string; signups: number }[];
  retentionCurve: { day: string; users: number; pct: number }[];
  featureUsage: { category: string; count: number }[];
  tierBreakdown: Record<string, number>;
}

/* ────────────────────── Component ────────────────────── */

export default function AnalyticsTab() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [windowDays, setWindowDays] = useState(30);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?days=${windowDays}`);
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [windowDays]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Loading state ── */
  if (loading && !data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl animate-pulse"
              style={{ background: ADMIN_COLORS.card, border: `1px solid ${ADMIN_COLORS.cardBorder}` }}
            />
          ))}
        </div>
        <div
          className="h-72 rounded-2xl animate-pulse"
          style={{ background: ADMIN_COLORS.card, border: `1px solid ${ADMIN_COLORS.cardBorder}` }}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-xs" style={{ color: ADMIN_COLORS.muted }}>No analytics data available.</p>
      </div>
    );
  }

  const summaryCards = [
    {
      label: 'DAU (24h)',
      value: formatNumber(data.summary.dau),
      icon: <Activity className="w-5 h-5" />,
      color: ADMIN_COLORS.green,
    },
    {
      label: 'MAU (30d)',
      value: formatNumber(data.summary.mau),
      icon: <UsersIcon className="w-5 h-5" />,
      color: ADMIN_COLORS.blue,
    },
    {
      label: 'Total Users',
      value: formatNumber(data.summary.totalUsers),
      icon: <UsersIcon className="w-5 h-5" />,
      color: ADMIN_COLORS.purple,
    },
    {
      label: `New in ${windowDays}d`,
      value: formatNumber(data.summary.newUsersLastWindow),
      icon: <TrendingUp className="w-5 h-5" />,
      color: ADMIN_COLORS.amber,
    },
  ];

  // Shorten date keys for x-axis labels
  const fmtDay = (s: string) => {
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : `${d.getMonth() + 1}/${d.getDate()}`;
  };

  // Tier breakdown chart data
  const tierData = (['free', 'premium', 'pro'] as const).map((t) => ({
    tier: t,
    users: data.tierBreakdown[t] ?? 0,
  }));

  return (
    <div className="space-y-6">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-bold" style={{ color: ADMIN_COLORS.text }}>Analytics Dashboard</h3>
          <p className="text-[10px]" style={{ color: ADMIN_COLORS.muted }}>
            Generated {formatDate(data.generatedAt)} · Window: {data.windowDays}d
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Window selector */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg border"
            style={{ background: ADMIN_COLORS.card, borderColor: ADMIN_COLORS.cardBorder }}
          >
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setWindowDays(d)}
                disabled={refreshing}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium transition-all"
                style={{
                  background: windowDays === d ? ADMIN_COLORS.green : 'transparent',
                  color: windowDays === d ? '#0c0e14' : ADMIN_COLORS.muted,
                }}
              >
                {d}d
              </button>
            ))}
          </div>
          {/* Refresh */}
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
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="rounded-2xl p-4 border"
            style={{ background: ADMIN_COLORS.card, borderColor: ADMIN_COLORS.cardBorder }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${card.color}15` }}
              >
                <span style={{ color: card.color }}>{card.icon}</span>
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: ADMIN_COLORS.text }}>{card.value}</p>
            <p className="text-[10px] mt-0.5" style={{ color: ADMIN_COLORS.muted }}>{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── DAU Chart ── */}
      <ChartCard
        title="Daily Active Users"
        subtitle={`DAU over the last ${data.windowDays} days`}
        icon={<Activity className="w-4 h-4" style={{ color: ADMIN_COLORS.green }} />}
      >
        <TabResponsiveContainer width="100%" height={260}>
          <AreaChart data={data.dauSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="dauGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ADMIN_COLORS.green} stopOpacity={0.4} />
                <stop offset="100%" stopColor={ADMIN_COLORS.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" tickFormatter={fmtDay} tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" />
            <YAxis tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
              labelStyle={{ color: ADMIN_COLORS.muted }}
              labelFormatter={(l) => `Date: ${formatDate(l as string)}`}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke={ADMIN_COLORS.green}
              strokeWidth={2}
              fill="url(#dauGradient)"
              name="DAU"
            />
          </AreaChart>
        </TabResponsiveContainer>
      </ChartCard>

      {/* ── New Users Chart ── */}
      <ChartCard
        title="New Signups"
        subtitle={`Signups per day over the last ${data.windowDays} days`}
        icon={<UsersIcon className="w-4 h-4" style={{ color: ADMIN_COLORS.blue }} />}
      >
        <TabResponsiveContainer width="100%" height={240}>
          <BarChart data={data.newUsersSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" tickFormatter={fmtDay} tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" />
            <YAxis tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
              labelStyle={{ color: ADMIN_COLORS.muted }}
              labelFormatter={(l) => `Date: ${formatDate(l as string)}`}
            />
            <Bar dataKey="signups" fill={ADMIN_COLORS.blue} name="Signups" radius={[4, 4, 0, 0]} />
          </BarChart>
        </TabResponsiveContainer>
      </ChartCard>

      {/* ── Two-column: Retention + Tier Breakdown ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="7-Day Retention"
          subtitle={`Cohort: ${data.summary.cohortSize} user${data.summary.cohortSize === 1 ? '' : 's'} who signed up 7 days ago`}
          icon={<Calendar className="w-4 h-4" style={{ color: ADMIN_COLORS.purple }} />}
        >
          <TabResponsiveContainer width="100%" height={240}>
            <LineChart data={data.retentionCurve} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" />
              <YAxis
                tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }}
                stroke="rgba(255,255,255,0.06)"
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
                labelStyle={{ color: ADMIN_COLORS.muted }}
                formatter={((v: any, n: any) => (n === 'pct' ? [`${v}%`, 'Retention'] : [v, n])) as any}
              />
              <Line type="monotone" dataKey="pct" stroke={ADMIN_COLORS.purple} strokeWidth={2.5} dot={{ r: 4, fill: ADMIN_COLORS.purple }} />
            </LineChart>
          </TabResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Tier Breakdown"
          subtitle="Users by subscription tier (snapshot)"
          icon={<Layers className="w-4 h-4" style={{ color: ADMIN_COLORS.amber }} />}
        >
          <TabResponsiveContainer width="100%" height={240}>
            <BarChart data={tierData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" allowDecimals={false} />
              <YAxis type="category" dataKey="tier" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" width={60} />
              <Tooltip
                contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
                labelStyle={{ color: ADMIN_COLORS.muted }}
              />
              <Bar dataKey="users" name="Users" radius={[0, 4, 4, 0]}>
                {tierData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.tier === 'pro' ? ADMIN_COLORS.amber : entry.tier === 'premium' ? ADMIN_COLORS.purple : ADMIN_COLORS.muted} />
                ))}
              </Bar>
            </BarChart>
          </TabResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Feature Usage ── */}
      <ChartCard
        title="Feature Usage"
        subtitle={`Aggregated feature usage by category over the last ${data.windowDays} days`}
        icon={<Layers className="w-4 h-4" style={{ color: ADMIN_COLORS.cyan }} />}
      >
        {data.featureUsage.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-xs" style={{ color: ADMIN_COLORS.muted }}>No feature usage recorded in this window.</p>
          </div>
        ) : (
          <TabResponsiveContainer width="100%" height={Math.max(220, data.featureUsage.length * 36)}>
            <BarChart
              data={data.featureUsage}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }}
                stroke="rgba(255,255,255,0.06)"
                width={130}
              />
              <Tooltip
                contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
                labelStyle={{ color: ADMIN_COLORS.muted }}
              />
              <Bar dataKey="count" name="Usage Count" fill={ADMIN_COLORS.cyan} radius={[0, 4, 4, 0]} />
            </BarChart>
          </TabResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

/* ────────────────────── Helpers ────────────────────── */

// Local import of Cell — kept inline to avoid bloating the top-level import list.
import { Cell } from 'recharts';

function ChartCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border p-4"
      style={{ background: ADMIN_COLORS.card, borderColor: ADMIN_COLORS.cardBorder }}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h4 className="text-xs font-bold" style={{ color: ADMIN_COLORS.text }}>{title}</h4>
      </div>
      {subtitle && <p className="text-[10px] mb-3" style={{ color: ADMIN_COLORS.muted }}>{subtitle}</p>}
      {children}
    </motion.div>
  );
}
