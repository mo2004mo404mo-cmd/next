'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Coins,
  CreditCard,
  RefreshCw,
  TrendingUp,
  Wallet,
  AlertCircle,
  Users as UsersIcon,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts';
import { TabResponsiveContainer } from '../TabResponsiveContainer';
import { toast } from 'sonner';
import {
  ADMIN_COLORS, formatUsd, formatNumber, formatDate, getInitials,
} from './shared';

/* ────────────────────── Types ────────────────────── */

interface RevenueResponse {
  windowDays: number;
  generatedAt: string;
  summary: {
    totalUsd: number;
    totalCreditsEarned: number;
    totalCreditsInWallets: number;
    paidOrders: number;
    refundedOrders: number;
    pendingOrders: number;
    walletCount: number;
    totalEarnedAll: number;
    totalSpentAll: number;
  };
  dailySeries: { date: string; usd: number; adRevenue: number; subscriptionRev: number }[];
  paymentBreakdown: { subscription: { count: number; usd: number }; credits: { count: number; usd: number } };
  topPayouts: { userId: string; name: string; email: string; image: string | null; credits: number }[];
  creditFlow: {
    earnedByCategory: { category: string; amount: number }[];
    spentByCategory: { category: string; amount: number }[];
  };
}

/* ────────────────────── Component ────────────────────── */

export default function RevenueTab() {
  const [data, setData] = useState<RevenueResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [windowDays, setWindowDays] = useState(30);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(`/api/admin/revenue?days=${windowDays}`);
      if (!res.ok) throw new Error('Failed to fetch revenue');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load revenue data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [windowDays]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <p className="text-xs" style={{ color: ADMIN_COLORS.muted }}>No revenue data available.</p>
      </div>
    );
  }

  const summaryCards = [
    {
      label: 'Total Revenue (USD)',
      value: formatUsd(data.summary.totalUsd),
      icon: <DollarSign className="w-5 h-5" />,
      color: ADMIN_COLORS.green,
      sub: `${data.summary.paidOrders} paid order${data.summary.paidOrders === 1 ? '' : 's'}`,
    },
    {
      label: 'Credits Earned (Ad Pool)',
      value: formatNumber(data.summary.totalCreditsEarned),
      icon: <Coins className="w-5 h-5" />,
      color: ADMIN_COLORS.amber,
      sub: 'GroupAdRevenueShare',
    },
    {
      label: 'Credits in Wallets',
      value: formatNumber(data.summary.totalCreditsInWallets),
      icon: <Wallet className="w-5 h-5" />,
      color: ADMIN_COLORS.cyan,
      sub: `${data.summary.walletCount} wallet${data.summary.walletCount === 1 ? '' : 's'}`,
    },
    {
      label: 'Pending Orders',
      value: formatNumber(data.summary.pendingOrders),
      icon: <CreditCard className="w-5 h-5" />,
      color: ADMIN_COLORS.purple,
      sub: `${data.summary.refundedOrders} refunded`,
    },
  ];

  const fmtDay = (s: string) => {
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : `${d.getMonth() + 1}/${d.getDate()}`;
  };

  // Pie data for payment breakdown
  const paymentPie = [
    { name: 'Subscription', value: data.paymentBreakdown.subscription.usd, color: ADMIN_COLORS.purple },
    { name: 'Credits', value: data.paymentBreakdown.credits.usd, color: ADMIN_COLORS.amber },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-bold" style={{ color: ADMIN_COLORS.text }}>Revenue Tracking</h3>
          <p className="text-[10px]" style={{ color: ADMIN_COLORS.muted }}>
            Generated {formatDate(data.generatedAt)} · Window: {data.windowDays}d
          </p>
        </div>
        <div className="flex items-center gap-2">
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
            {card.sub && <p className="text-[9px] mt-1" style={{ color: ADMIN_COLORS.dimmed }}>{card.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* ── Revenue Time Series ── */}
      <ChartCard
        title="Revenue (USD)"
        subtitle={`Daily revenue over the last ${data.windowDays} days`}
        icon={<TrendingUp className="w-4 h-4" style={{ color: ADMIN_COLORS.green }} />}
      >
        <TabResponsiveContainer width="100%" height={260}>
          <AreaChart data={data.dailySeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="usdGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ADMIN_COLORS.green} stopOpacity={0.4} />
                <stop offset="100%" stopColor={ADMIN_COLORS.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" tickFormatter={fmtDay} tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" />
            <YAxis tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
              labelStyle={{ color: ADMIN_COLORS.muted }}
              labelFormatter={(l) => `Date: ${formatDate(l as string)}`}
              formatter={((v: any) => [`$${Number(v).toFixed(2)}`, 'Revenue']) as any}
            />
            <Area
              type="monotone"
              dataKey="usd"
              stroke={ADMIN_COLORS.green}
              strokeWidth={2}
              fill="url(#usdGradient)"
              name="Revenue (USD)"
            />
          </AreaChart>
        </TabResponsiveContainer>
      </ChartCard>

      {/* ── Two-column: Payment Pie + Top Payouts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Payment breakdown pie */}
        <ChartCard
          title="Payment Breakdown"
          subtitle="Subscription vs credit-pack purchases"
          icon={<CreditCard className="w-4 h-4" style={{ color: ADMIN_COLORS.purple }} />}
        >
          {paymentPie.length === 0 ? (
            <EmptyChart label="No paid orders in this window." />
          ) : (
            <TabResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={paymentPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {paymentPie.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
                  formatter={((v: any, n: any) => [`$${Number(v).toFixed(2)}`, n]) as any}
                />
              </PieChart>
            </TabResponsiveContainer>
          )}
          {/* Legend / breakdown table */}
          <div className="mt-3 space-y-1.5">
            <PaymentRow
              label="Subscription"
              color={ADMIN_COLORS.purple}
              count={data.paymentBreakdown.subscription.count}
              usd={data.paymentBreakdown.subscription.usd}
            />
            <PaymentRow
              label="Credit Packs"
              color={ADMIN_COLORS.amber}
              count={data.paymentBreakdown.credits.count}
              usd={data.paymentBreakdown.credits.usd}
            />
          </div>
        </ChartCard>

        {/* Top payouts */}
        <ChartCard
          title="Top Ad-Pool Earners"
          subtitle="Top 10 users by GroupAdRevenueShare credits earned"
          icon={<UsersIcon className="w-4 h-4" style={{ color: ADMIN_COLORS.amber }} />}
        >
          {data.topPayouts.length === 0 ? (
            <EmptyChart label="No ad-pool payouts in this window." />
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {data.topPayouts.map((p, idx) => (
                <div
                  key={p.userId}
                  className="flex items-center justify-between gap-3 p-2 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="text-[10px] font-bold w-5 text-center flex-shrink-0"
                      style={{ color: idx < 3 ? ADMIN_COLORS.amber : ADMIN_COLORS.dimmed }}
                    >
                      {idx + 1}
                    </span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: `${ADMIN_COLORS.blue}20`, color: ADMIN_COLORS.blue }}
                    >
                      {getInitials(p.name, p.email)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: ADMIN_COLORS.text }}>
                        {p.name || 'Unnamed'}
                      </p>
                      <p className="text-[10px] truncate" style={{ color: ADMIN_COLORS.muted }}>
                        {p.email || '—'}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold flex-shrink-0"
                    style={{ color: ADMIN_COLORS.amber }}
                  >
                    {formatNumber(p.credits)} cr
                  </span>
                </div>
              ))}
            </div>
          )}
        </ChartCard>
      </div>

      {/* ── Credit Flow (Earned vs Spent by Category) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Credits Earned"
          subtitle="By category over the window"
          icon={<Coins className="w-4 h-4" style={{ color: ADMIN_COLORS.green }} />}
        >
          {data.creditFlow.earnedByCategory.length === 0 ? (
            <EmptyChart label="No credit earnings recorded." />
          ) : (
            <TabResponsiveContainer width="100%" height={Math.max(220, data.creditFlow.earnedByCategory.length * 36)}>
              <BarChart data={data.creditFlow.earnedByCategory} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" allowDecimals={false} />
                <YAxis type="category" dataKey="category" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" width={130} />
                <Tooltip
                  contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
                  labelStyle={{ color: ADMIN_COLORS.muted }}
                />
                <Bar dataKey="amount" name="Credits Earned" fill={ADMIN_COLORS.green} radius={[0, 4, 4, 0]} />
              </BarChart>
            </TabResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard
          title="Credits Spent"
          subtitle="By category over the window"
          icon={<Coins className="w-4 h-4" style={{ color: ADMIN_COLORS.red }} />}
        >
          {data.creditFlow.spentByCategory.length === 0 ? (
            <EmptyChart label="No credit spending recorded." />
          ) : (
            <TabResponsiveContainer width="100%" height={Math.max(220, data.creditFlow.spentByCategory.length * 36)}>
              <BarChart data={data.creditFlow.spentByCategory} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" allowDecimals={false} />
                <YAxis type="category" dataKey="category" tick={{ fill: ADMIN_COLORS.muted, fontSize: 10 }} stroke="rgba(255,255,255,0.06)" width={130} />
                <Tooltip
                  contentStyle={{ background: '#1a1e2b', border: `1px solid ${ADMIN_COLORS.cardBorder}`, borderRadius: 8, fontSize: 11, color: ADMIN_COLORS.text }}
                  labelStyle={{ color: ADMIN_COLORS.muted }}
                />
                <Bar dataKey="amount" name="Credits Spent" fill={ADMIN_COLORS.red} radius={[0, 4, 4, 0]} />
              </BarChart>
            </TabResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* ── Refund warning if any ── */}
      {data.summary.refundedOrders > 0 && (
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{
            background: `${ADMIN_COLORS.amber}10`,
            border: `1px solid ${ADMIN_COLORS.amber}40`,
          }}
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ADMIN_COLORS.amber }} />
          <div>
            <p className="text-xs font-medium" style={{ color: ADMIN_COLORS.text }}>
              {data.summary.refundedOrders} refunded order{data.summary.refundedOrders === 1 ? '' : 's'} in this window.
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: ADMIN_COLORS.muted }}>
              Refunds are not deducted from the totals above. Investigate each refund in the audit log.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────── Helpers ────────────────────── */

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

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <p className="text-[11px]" style={{ color: ADMIN_COLORS.dimmed }}>{label}</p>
    </div>
  );
}

function PaymentRow({
  label,
  color,
  count,
  usd,
}: {
  label: string;
  color: string;
  count: number;
  usd: number;
}) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
        <span style={{ color: ADMIN_COLORS.text }}>{label}</span>
        <span style={{ color: ADMIN_COLORS.dimmed }}>({count})</span>
      </div>
      <span className="font-semibold" style={{ color: ADMIN_COLORS.text }}>{formatUsd(usd)}</span>
    </div>
  );
}
