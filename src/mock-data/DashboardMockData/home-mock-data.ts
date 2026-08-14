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
    title: "Total Revenue",
    value: "650.5K",
    value_display: "$650.5K",
    selected_range: "month",
    range_options: ["week", "month", "year"],
    legends: [
      { key: "revenue_growth", label: "Revenue Growth" },
      { key: "booking_count", label: "Booking Count" },
    ],
    chart: [
      { key: "jan", label: "Jan", revenue_growth: 800, booking_count: 900 },
      { key: "feb", label: "Feb", revenue_growth: 1500, booking_count: 500 },
      { key: "mar", label: "Mar", revenue_growth: 1800, booking_count: 1500 },
      { key: "apr", label: "Apr", revenue_growth: 2200, booking_count: 2000 },
      { key: "may", label: "May", revenue_growth: 3000, booking_count: 2500 },
      { key: "jun", label: "Jun", revenue_growth: 3500, booking_count: 3200 },
    ],
  },
  mark_3: {
    title: "Today's Attendances",
    center_value: 40,
    center_value_display: "40\nCheck In",
    items: [
      { key: "check_in", label: "Check In", value: 60 },
      { key: "late", label: "Late", value: 30 },
      { key: "no_show", label: "No Show", value: 10 },
    ],
  },
  mark_4: {
    title: "Booking Source Breakdown",
    value: 650500,
    value_display: "$650.5K",
    subtitle: "",
    totals_display: "",
    legends: [
      { key: "premium", label: "Premium" },
      { key: "free", label: "Free" },
    ],
    chart: [
      { key: "jan", label: "Jan", premium: 2500, free: 2000 },
      { key: "feb", label: "Feb", premium: 2000, free: 2500 },
      { key: "mar", label: "Mar", premium: 2800, free: 1800 },
      { key: "apr", label: "Apr", premium: 2200, free: 1500 },
      { key: "may", label: "May", premium: 2400, free: 1800 },
      { key: "jun", label: "Jun", premium: 2200, free: 1200 },
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
