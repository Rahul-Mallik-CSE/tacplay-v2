/**
 * home-mock-data.ts
 * Mock data for the Dashboard Home page analytics overview.
 * Shape matches the real /api/arena/overview/ response.
 * Used only as a fallback reference — HomeContainer now uses the live API.
 */

import type { DashboardOverviewData } from "@/types/DashboardTypes/HomeTypes";

/** Mock dashboard overview data (matches real API shape) */
export const mockDashboardOverview: DashboardOverviewData = {
  dashboard_title: "Dashboard",
  analytics_header: {
    title: "Analytics Report",
    subtitle: "Analytics support from 2025 to 2026",
    report_type: "All Reports",
    year_range: "2025 - 2026",
  },
  mark_1: {
    title: "Key Metrics",
    items: [
      {
        key: "total_revenue",
        label: "Total Revenue",
        value: "60000.00",
        value_display: "$60K",
        subtitle: "vs. $5,281 last 20 days",
        change: { value: "+4.30%", display: "4.3%", direction: "up", is_positive: true },
      },
      {
        key: "total_bookings",
        label: "Total Bookings",
        value: 48100,
        value_display: "48.1K",
        subtitle: "vs. $5,281 last 20 days",
        change: { value: "+4.30%", display: "4.3%", direction: "up", is_positive: true },
      },
      {
        key: "upcoming_sessions",
        label: "Upcoming Sessions",
        value: 9856,
        value_display: "9856",
        subtitle: "vs. $5,281 last 20 days",
        change: { value: "-4.30%", display: "4.3%", direction: "down", is_positive: false },
      },
      {
        key: "matches_hosted",
        label: "Matches Hosted",
        value: 262,
        value_display: "262",
        subtitle: "vs. $5,281 last 20 days",
        change: { value: "+4.30%", display: "4.3%", direction: "up", is_positive: true },
      },
    ],
  },
  mark_2: {
    title: "Total Revenue",
    value: "650500.00",
    value_display: "$650.5K",
    selected_range: "week",
    range_options: ["day", "week", "month", "year"],
    legends: [
      { key: "revenue_growth", label: "Revenue Growth" },
      { key: "booking_count", label: "Booking Count" },
    ],
    chart: [
      { key: "2026-09-26", label: "Sat", revenue_growth: 800, booking_count: 900 },
      { key: "2026-09-27", label: "Sun", revenue_growth: 1500, booking_count: 500 },
      { key: "2026-09-28", label: "Mon", revenue_growth: 1800, booking_count: 1500 },
      { key: "2026-09-29", label: "Tue", revenue_growth: 2200, booking_count: 2000 },
      { key: "2026-09-30", label: "Wed", revenue_growth: 3000, booking_count: 2500 },
      { key: "2026-10-01", label: "Thu", revenue_growth: 3500, booking_count: 3200 },
      { key: "2026-10-02", label: "Fri", revenue_growth: 4200, booking_count: 3800 },
    ],
  },
  mark_3: {
    title: "Session Distribution",
    center_value: 40,
    center_value_display: "40 Sessions",
    items: [
      { key: "social_match", label: "Social Match", value: 25 },
      { key: "ranked_match", label: "Ranked Match", value: 15 },
    ],
  },
  mark_4: {
    title: "Booking Source Breakdown",
    value: 48,
    value_display: "48",
    subtitle: "Premium / Free",
    totals_display: "32 / 16",
    legends: [
      { key: "premium", label: "Premium" },
      { key: "free", label: "Free" },
    ],
    chart: [
      { key: "2026-09-26", label: "Sat", premium: 2500, free: 2000 },
      { key: "2026-09-27", label: "Sun", premium: 2000, free: 2500 },
      { key: "2026-09-28", label: "Mon", premium: 2800, free: 1800 },
      { key: "2026-09-29", label: "Tue", premium: 2200, free: 1500 },
      { key: "2026-09-30", label: "Wed", premium: 2400, free: 1800 },
      { key: "2026-10-01", label: "Thu", premium: 2200, free: 1200 },
      { key: "2026-10-02", label: "Fri", premium: 3000, free: 900 },
    ],
  },
  mark_5: {
    title: "Today's Attendances",
    total_players: 30,
    checked_in: 24,
    checked_in_percentage: 80,
    late: 4,
    late_percentage: 13,
    no_show: 2,
    no_show_percentage: 7,
  },
  mark_6: {
    title: "Recent Booking",
    items: [
      {
        booking_id: 1,
        player_id: 1,
        player_name: "James Smith",
        player_image: null,
        session_id: 1,
        session_name: "Weekend Open Play",
        amount: "45.00",
        currency: "eur",
        status: "paid",
        payment_status: "paid",
        created_at: "2026-10-02T09:00:00Z",
      },
      {
        booking_id: 2,
        player_id: 2,
        player_name: "Sarah Connor",
        player_image: null,
        session_id: 2,
        session_name: "Beginner Walk-On",
        amount: "30.00",
        currency: "eur",
        status: "paid",
        payment_status: "paid",
        created_at: "2026-10-02T10:30:00Z",
      },
    ],
  },
  mark_7: {
    title: "Today's Sessions",
    items: [
      {
        session_id: 1,
        session_name: "Beginner Walk-On",
        match_date: "2026-10-03",
        start_time: "09:00:00",
        start_time_period: "AM",
        end_time: "13:00:00",
        end_time_period: "PM",
        match_type: "social",
        session_visibility: "public",
        status: "upcoming",
        booked_players: 24,
        total_capacity: 30,
        capacity_display: "24/30",
      },
    ],
  },
  mark_8: {
    title: "Upcoming Sessions",
    items: [
      {
        session_id: 2,
        session_name: "Weekend Ranked",
        match_date: "2026-10-10",
        start_time: "14:00:00",
        start_time_period: "PM",
        end_time: "17:00:00",
        end_time_period: "PM",
        match_type: "ranked",
        session_visibility: "premium",
        status: "upcoming",
        booked_players: 10,
        total_capacity: 20,
        capacity_display: "10/20",
      },
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
