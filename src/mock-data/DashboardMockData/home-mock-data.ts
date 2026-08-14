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
        value: 60000,
        value_display: "60K",
        subtitle: "vs. $5,281 last 20 days",
        change: {
          value: "4.3",
          display: "+4.3%",
          direction: "up",
          is_positive: true,
        },
      },
      {
        key: "total_bookings",
        label: "Total Bookings",
        value: 48100,
        value_display: "48.1K",
        subtitle: "vs. $5,281 last 20 days",
        change: {
          value: "4.3",
          display: "+4.3%",
          direction: "up",
          is_positive: true,
        },
      },
      {
        key: "upcoming_sessions",
        label: "Upcoming Sessions",
        value: 9856,
        value_display: "9856",
        subtitle: "vs. $5,281 last 20 days",
        change: {
          value: "4.3",
          display: "+4.3%",
          direction: "down",
          is_positive: false,
        },
      },
      {
        key: "matches_hosted",
        label: "Matches Hosted",
        value: 262,
        value_display: "262",
        subtitle: "vs. $5,281 last 20 days",
        change: {
          value: "4.3",
          display: "+4.3%",
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
  recent_bookings: [
    {
      id: "b1",
      playerName: "James Smith",
      sessionName: "Weekend Open Play",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
      price: "$45",
      status: "confirmed",
    },
    {
      id: "b2",
      playerName: "James Smith",
      sessionName: "Weekend Open Play",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=100&fit=crop",
      price: "$45",
      status: "confirmed",
    },
    {
      id: "b3",
      playerName: "James Smith",
      sessionName: "Weekend Open Play",
      imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=100&h=100&fit=crop",
      price: "$45",
      status: "pending",
    },
    {
      id: "b4",
      playerName: "James Smith",
      sessionName: "Weekend Open Play",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop",
      price: "$45",
      status: "confirmed",
    },
  ],
  today_sessions: [
    {
      id: "s1",
      playerName: "James Smith",
      sessionName: "Beginner Walk-On",
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
    {
      id: "s2",
      playerName: "James Smith",
      sessionName: "Beginner Walk-On",
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
    {
      id: "s3",
      playerName: "James Smith",
      sessionName: "Beginner Walk-On",
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
    {
      id: "s4",
      playerName: "James Smith",
      sessionName: "Beginner Walk-On",
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
  ],
  upcoming_sessions: [
    {
      id: "u1",
      month: "FEB",
      day: "02",
      sessionName: "Beginner Walk-On",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
    {
      id: "u2",
      month: "FEB",
      day: "02",
      sessionName: "Beginner Walk-On",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
    {
      id: "u3",
      month: "FEB",
      day: "02",
      sessionName: "Beginner Walk-On",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
    {
      id: "u4",
      month: "FEB",
      day: "02",
      sessionName: "Beginner Walk-On",
      timeRange: "9:00 AM - 1:00 PM",
      playersCount: "24/30",
    },
  ],
};
