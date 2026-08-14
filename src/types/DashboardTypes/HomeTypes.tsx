/**
 * HomeTypes.tsx
 * TypeScript types for the Dashboard Home page analytics overview.
 * Covers stats cards, revenue chart, session pie chart, and booking bar chart.
 */

/** Available time range options for the dashboard */
export type DashboardRange = "week" | "month" | "year";

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
  change: DashboardChange;
};

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

/** Session pie chart item (ranked vs social session counts) */
export type DashboardMark3Item = {
  key: string;
  label: string;
  value: number;
};

/** Booking bar chart data point (premium vs free booking counts) */
export type DashboardMark4ChartItem = {
  key: string;
  label: string;
  premium: number;
  free: number;
};

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
