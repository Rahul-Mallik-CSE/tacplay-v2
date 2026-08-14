/**
 * HomeTypes.tsx
 * TypeScript types for the Dashboard Home page analytics overview.
 * Covers stats cards, revenue chart, session pie chart, and booking bar chart.
 */

import type { ReactNode } from "react";

// ============================================================================
// Shared Types
// ============================================================================

/** Available time range options for the dashboard */
export type DashboardRange = "week" | "month" | "year";

/** Props for the shared chart tooltip component */
export type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
};

// ============================================================================
// Stats Card Types
// ============================================================================

/** Change indicator for a stats card (up/down trend with display text) */
export type DashboardChange = {
  value: string;
  display: string;
  direction: "up" | "down" | "neutral";
  is_positive: boolean;
};

/** Single stats card item (revenue, bookings, sessions, matches) */
export type DashboardMark1Item = {
  key:
    | "total_revenue"
    | "total_bookings"
    | "upcoming_sessions"
    | "matches_hosted"
    | string;
  label: string;
  value: string | number;
  value_display: string;
  subtitle: string;
  change: DashboardChange;
};

/** Props for the StatsCard component */
export type StatsCardProps = {
  title: string;
  value: number | string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
  showCurrencyIcon?: boolean;
  subtitle?: string;
};

// ============================================================================
// Revenue Chart Types
// ============================================================================

/** Legend entry for charts (color-coded labels) */
export type DashboardLegend = {
  key: string;
  label: string;
};

/** Revenue area chart data point (revenue growth + booking count per period) */
export type DashboardMark2ChartItem = {
  key: string;
  label: string;
  revenue_growth: number;
  booking_count: number;
};

/** Props for the RevenueChart component */
export type RevenueChartProps = {
  title: string;
  valueDisplay: string;
  legends: DashboardLegend[];
  chartData: DashboardMark2ChartItem[];
  selectedRange?: DashboardRange;
  rangeOptions?: DashboardRange[];
  onRangeChange?: (range: DashboardRange) => void;
  isLocked?: boolean;
  onUpgradeClick?: () => void;
};

// ============================================================================
// Session Pie Chart Types
// ============================================================================

/** Session pie chart item (ranked vs social session counts) */
export type DashboardMark3Item = {
  key: string;
  label: string;
  value: number;
};

/** Color palette for pie chart segments (red for check-in, yellow for late, white for no-show) */
export const PIE_CHART_COLORS = ["#980009", "#b4971e", "#d1d5db"] as const;

/** Props for the SessionPieChart component */
export type SessionPieChartProps = {
  title: string;
  centerValueDisplay: string;
  items: DashboardMark3Item[];
  isLocked?: boolean;
  onUpgradeClick?: () => void;
};

// ============================================================================
// Booking Bar Chart Types
// ============================================================================

/** Booking bar chart data point (premium vs free booking counts) */
export type DashboardMark4ChartItem = {
  key: string;
  label: string;
  premium: number;
  free: number;
};

/** Props for the BookingBarChart component */
export type BookingBarChartProps = {
  title: string;
  valueDisplay: string;
  subtitle: string;
  totalsDisplay: string;
  legends: DashboardLegend[];
  chartData: DashboardMark4ChartItem[];
  isLocked?: boolean;
  onUpgradeClick?: () => void;
};

// ============================================================================
// Dashboard Overview Types
// ============================================================================

/** Complete dashboard overview data structure */
export type DashboardOverviewData = {
  dashboard_title: string;
  analytics_header: {
    title: string;
    subtitle: string;
    report_type: string;
    year_range: string;
  };
  mark_1: {
    title: string;
    items: DashboardMark1Item[];
  };
  mark_2: {
    title: string;
    value: string;
    value_display: string;
    selected_range: string;
    range_options: string[];
    legends: DashboardLegend[];
    chart: DashboardMark2ChartItem[];
  };
  mark_3: {
    title: string;
    center_value: number;
    center_value_display: string;
    items: DashboardMark3Item[];
  };
  mark_4: {
    title: string;
    value: number;
    value_display: string;
    subtitle: string;
    totals_display: string;
    legends: DashboardLegend[];
    chart: DashboardMark4ChartItem[];
  };
  field: {
    id: number;
    field_name: string;
  };
  subscription: {
    plan_code: string;
    is_paid: boolean;
    can_view_advanced_analytics: boolean;
    show_upgrade_popup: boolean;
  };
};

/** API response wrapper for dashboard overview */
export type DashboardOverviewResponse = {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: DashboardOverviewData;
  requestId: string;
};
