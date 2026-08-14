/**
 * home-mock-data.ts
 * Mock data for the Dashboard Home page analytics overview.
 * Provides realistic sample data for stats cards, revenue chart,
 * session distribution, and booking source breakdown.
 */

import type { DashboardOverviewData } from "@/types/DashboardTypes/HomeTypes";

/** Mock dashboard overview data used when API is not connected */
export const mockDashboardOverview: DashboardOverviewData = {
  dashboard_title: "Arena Analytics",
  analytics_header: {
    title: "Analytics Report",
    subtitle: "Analytics support form 2025 to 2026",
    report_type: "All Reports",
    year_range: "2025-2026",
  },
  mark_1: {
    title: "Key Metrics",
    items: [
      {
        key: "total_revenue",
        label: "Total Revenue",
        value: 12450,
        value_display: "12,450",
        change: {
          value: "12.5",
          display: "+12.5%",
          direction: "up",
          is_positive: true,
        },
      },
      {
        key: "total_bookings",
        label: "Total Bookings",
        value: 342,
        value_display: "342",
        change: {
          value: "8.2",
          display: "+8.2%",
          direction: "up",
          is_positive: true,
        },
      },
      {
        key: "upcoming_sessions",
        label: "Upcoming Sessions",
        value: 28,
        value_display: "28",
        change: {
          value: "3.1",
          display: "-3.1%",
          direction: "down",
          is_positive: false,
        },
      },
      {
        key: "matches_hosted",
        label: "Matches Hosted",
        value: 156,
        value_display: "156",
        change: {
          value: "5.7",
          display: "+5.7%",
          direction: "up",
          is_positive: true,
        },
      },
    ],
  },
  mark_2: {
    title: "Revenue",
    value: "12,450",
    value_display: "€12,450",
    selected_range: "month",
    range_options: ["week", "month", "year"],
    legends: [
      { key: "revenue_growth", label: "Revenue Growth" },
      { key: "booking_count", label: "Booking Count" },
    ],
    chart: [
      { key: "w1", label: "Week 1", revenue_growth: 1800, booking_count: 42 },
      { key: "w2", label: "Week 2", revenue_growth: 2200, booking_count: 51 },
      { key: "w3", label: "Week 3", revenue_growth: 1950, booking_count: 45 },
      { key: "w4", label: "Week 4", revenue_growth: 2600, booking_count: 60 },
      { key: "w5", label: "Week 5", revenue_growth: 2100, booking_count: 48 },
      { key: "w6", label: "Week 6", revenue_growth: 2800, booking_count: 65 },
      { key: "w7", label: "Week 7", revenue_growth: 2400, booking_count: 55 },
      { key: "w8", label: "Week 8", revenue_growth: 3100, booking_count: 72 },
    ],
  },
  mark_3: {
    title: "Session Distribution",
    center_value: 156,
    center_value_display: "156 Total Sessions",
    items: [
      { key: "ranked", label: "Ranked Match", value: 98 },
      { key: "social", label: "Social Match", value: 58 },
    ],
  },
  mark_4: {
    title: "Booking Source Breakdown",
    value: 342,
    value_display: "342",
    subtitle: "Total Bookings",
    totals_display: "Premium: 215 | Free: 127",
    legends: [
      { key: "premium", label: "Premium" },
      { key: "free", label: "Free" },
    ],
    chart: [
      { key: "mon", label: "Mon", premium: 18, free: 12 },
      { key: "tue", label: "Tue", premium: 22, free: 15 },
      { key: "wed", label: "Wed", premium: 25, free: 10 },
      { key: "thu", label: "Thu", premium: 20, free: 18 },
      { key: "fri", label: "Fri", premium: 30, free: 20 },
      { key: "sat", label: "Sat", premium: 35, free: 25 },
      { key: "sun", label: "Sun", premium: 28, free: 16 },
    ],
  },
  field: {
    id: 1,
    field_name: "Arena Pro Complex",
  },
  subscription: {
    plan_code: "field_silver_monthly",
    is_paid: true,
    can_view_advanced_analytics: true,
    show_upgrade_popup: false,
  },
};
