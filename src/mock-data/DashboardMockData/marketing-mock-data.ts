/**
 * marketing-mock-data.ts
 * Mock data for the Marketing feature.
 */

import type {
  Campaign,
  Voucher,
  TopPerformingCampaign,
  ActiveVoucher,
  QuickAction,
} from "@/types/DashboardTypes/MarketingTypes"

// ============================================================================
// Marketing Overview Stats
// ============================================================================

export const mockMarketingStats = [
  {
    title: "Total Campaigns",
    value: 18,
    subtitle: "All time",
    icon: "dollar",
  },
  {
    title: "Emails Sent",
    value: 1243,
    subtitle: "vs last month",
    change: "+18%",
    icon: "email",
  },
  {
    title: "SMS Sent",
    value: 9856,
    subtitle: "vs last month",
    change: "+18%",
    icon: "sms",
  },
  {
    title: "Push Sent",
    value: 262,
    subtitle: "vs last month",
    change: "+18%",
    icon: "push",
  },
]

// ============================================================================
// Top Performing Campaigns
// ============================================================================

export const mockTopPerformingCampaigns: TopPerformingCampaign[] = [
  { rank: 1, name: "Weekend Warried offer", revenue: 960, bookings: 48 },
  { rank: 2, name: "Tournament Early Birds", revenue: 960, bookings: 48 },
  { rank: 3, name: "Paintball Madrid Promo", revenue: 960, bookings: 48 },
]

// ============================================================================
// Active Vouchers (Overview)
// ============================================================================

export const mockActiveVouchers: ActiveVoucher[] = [
  { code: "FRIDAY20", discount: "20% OFF", used: 64, total: 200, expires: "May 1, 2024" },
  { code: "WELCOME22", discount: "30% OFF", used: 23, total: 100, expires: "Dec 2, 2025" },
  { code: "NEWYEARS2027", discount: "25% OFF", used: 20, total: 400, expires: "Dec 2, 2025" },
  { code: "MADRIDOPEN", discount: "35% OFF", used: 12, total: 120, expires: "Dec 2, 2025" },
  { code: "BIRTHDAY2", discount: "155 OFF", used: 34, total: 210, expires: "Dec 2, 2025" },
]

// ============================================================================
// Quick Actions
// ============================================================================

export const mockQuickActions: QuickAction[] = [
  { label: "Create Email Campaign", href: "/dashboard/marketing/overview/create-email", icon: "email", color: "blue" },
  { label: "Create SMS Campaign", href: "/dashboard/marketing/overview/create-sms", icon: "sms", color: "green" },
  { label: "Create Push Campaign", href: "/dashboard/marketing/overview/create-push", icon: "push", color: "purple" },
  { label: "Create Voucher/Discount", href: "/dashboard/marketing/overview/create-voucher", icon: "voucher", color: "orange" },
]

// ============================================================================
// All Campaigns
// ============================================================================

export const mockCampaigns: Campaign[] = [
  {
    campaign_id: 1,
    name: "Beginner Package",
    description: "Perfect for first-time players",
    type: "Email",
    audience: 220,
    scheduled_date: "May 2, 2026",
    scheduled_time: "10:00 AM",
    booking_count: 86,
    booking_change: 18,
    revenue: 2200,
    status: "Schedule",
  },
  {
    campaign_id: 2,
    name: "Advanced Package",
    description: "For Experienced Players",
    type: "Email",
    audience: 340,
    scheduled_date: "May 2, 2026",
    scheduled_time: "10:00 AM",
    booking_count: 86,
    booking_change: 18,
    revenue: 2200,
    status: "Complete",
  },
  {
    campaign_id: 3,
    name: "Tournament Package",
    description: "Fore competitive events",
    type: "Push",
    audience: 120,
    scheduled_date: "May 2, 2026",
    scheduled_time: "10:00 AM",
    booking_count: 86,
    booking_change: 18,
    revenue: 2200,
    status: "Schedule",
  },
  {
    campaign_id: 4,
    name: "Tournament Package",
    description: "Fore competitive events",
    type: "Push",
    audience: 180,
    scheduled_date: "May 2, 2026",
    scheduled_time: "10:00 AM",
    booking_count: 86,
    booking_change: 18,
    revenue: 2200,
    status: "Active",
  },
  {
    campaign_id: 5,
    name: "Private Group Package",
    description: "For Private group bookings",
    type: "SMS",
    audience: 400,
    scheduled_date: "May 2, 2026",
    scheduled_time: "10:00 AM",
    booking_count: 86,
    booking_change: 18,
    revenue: 2200,
    status: "Schedule",
  },
  {
    campaign_id: 6,
    name: "Weekend Warrior Special",
    description: "Weekend promotion package",
    type: "Email",
    audience: 280,
    scheduled_date: "May 3, 2026",
    scheduled_time: "11:00 AM",
    booking_count: 92,
    booking_change: 22,
    revenue: 2800,
    status: "Active",
  },
  {
    campaign_id: 7,
    name: "Summer Camp Promo",
    description: "Summer camp early bird offer",
    type: "Email",
    audience: 150,
    scheduled_date: "May 4, 2026",
    scheduled_time: "09:00 AM",
    booking_count: 65,
    booking_change: 12,
    revenue: 1500,
    status: "Schedule",
  },
  {
    campaign_id: 8,
    name: "Birthday Party Special",
    description: "Birthday celebration package",
    type: "Push",
    audience: 200,
    scheduled_date: "May 5, 2026",
    scheduled_time: "10:30 AM",
    booking_count: 78,
    booking_change: 15,
    revenue: 1950,
    status: "Complete",
  },
  {
    campaign_id: 9,
    name: "Team Building Event",
    description: "Corporate team building offers",
    type: "SMS",
    audience: 350,
    scheduled_date: "May 6, 2026",
    scheduled_time: "08:00 AM",
    booking_count: 95,
    booking_change: 25,
    revenue: 3200,
    status: "Active",
  },
  {
    campaign_id: 10,
    name: "Late Night Sessions",
    description: "Late night gaming sessions",
    type: "Email",
    audience: 180,
    scheduled_date: "May 7, 2026",
    scheduled_time: "06:00 PM",
    booking_count: 42,
    booking_change: 8,
    revenue: 980,
    status: "Schedule",
  },
  {
    campaign_id: 11,
    name: "VIP Members Offer",
    description: "Exclusive VIP member discount",
    type: "Push",
    audience: 90,
    scheduled_date: "May 8, 2026",
    scheduled_time: "12:00 PM",
    booking_count: 35,
    booking_change: 10,
    revenue: 1200,
    status: "Active",
  },
  {
    campaign_id: 12,
    name: "Referral Bonus",
    description: "Refer a friend bonus campaign",
    type: "SMS",
    audience: 500,
    scheduled_date: "May 9, 2026",
    scheduled_time: "10:00 AM",
    booking_count: 110,
    booking_change: 30,
    revenue: 4500,
    status: "Schedule",
  },
  {
    campaign_id: 13,
    name: "Weekend Tournament",
    description: "Weekend tournament special",
    type: "Email",
    audience: 260,
    scheduled_date: "May 10, 2026",
    scheduled_time: "09:30 AM",
    booking_count: 88,
    booking_change: 20,
    revenue: 2600,
    status: "Complete",
  },
  {
    campaign_id: 14,
    name: "New Player Welcome",
    description: "Welcome offer for new players",
    type: "Push",
    audience: 130,
    scheduled_date: "May 11, 2026",
    scheduled_time: "11:30 AM",
    booking_count: 55,
    booking_change: 14,
    revenue: 1100,
    status: "Schedule",
  },
  {
    campaign_id: 15,
    name: "Holiday Special",
    description: "Holiday season promotion",
    type: "SMS",
    audience: 600,
    scheduled_date: "May 12, 2026",
    scheduled_time: "08:30 AM",
    booking_count: 130,
    booking_change: 35,
    revenue: 5200,
    status: "Active",
  },
]

// ============================================================================
// Voucher List
// ============================================================================

export const mockVouchers: Voucher[] = [
  {
    voucher_id: 1,
    code: "FRIDAY20",
    discount: "20% OFF",
    used: 64,
    total: 200,
    expires: "May 1, 2024",
    revenue: 123,
    status: "Active",
  },
  {
    voucher_id: 2,
    code: "NEWYEARS2027",
    discount: "25% OFF",
    used: 20,
    total: 400,
    expires: "Dec 2, 2025",
    revenue: 954,
    status: "Schedule",
  },
  {
    voucher_id: 3,
    code: "NEWYEARS2027",
    discount: "25% OFF",
    used: 20,
    total: 400,
    expires: "Dec 2, 2025",
    revenue: 954,
    status: "Schedule",
  },
  {
    voucher_id: 4,
    code: "FRIDAY20",
    discount: "20% OFF",
    used: 64,
    total: 200,
    expires: "May 1, 2024",
    revenue: 123,
    status: "Active",
  },
  {
    voucher_id: 5,
    code: "WELCOME22",
    discount: "30% OFF",
    used: 23,
    total: 100,
    expires: "Dec 2, 2025",
    revenue: 430,
    status: "Active",
  },
  {
    voucher_id: 6,
    code: "MADRIDOPEN",
    discount: "35% OFF",
    used: 12,
    total: 120,
    expires: "Dec 2, 2025",
    revenue: 954,
    status: "Schedule",
  },
  {
    voucher_id: 7,
    code: "MADRIDOPEN",
    discount: "35% OFF",
    used: 12,
    total: 120,
    expires: "Dec 2, 2025",
    revenue: 954,
    status: "Schedule",
  },
  {
    voucher_id: 8,
    code: "WELCOME22",
    discount: "30% OFF",
    used: 23,
    total: 100,
    expires: "Dec 2, 2025",
    revenue: 430,
    status: "Active",
  },
  {
    voucher_id: 9,
    code: "BIRTHDAY2",
    discount: "155 OFF",
    used: 34,
    total: 210,
    expires: "Dec 2, 2025",
    revenue: 954,
    status: "Schedule",
  },
  {
    voucher_id: 10,
    code: "BIRTHDAY2",
    discount: "155 OFF",
    used: 34,
    total: 210,
    expires: "Dec 2, 2025",
    revenue: 954,
    status: "Schedule",
  },
]
