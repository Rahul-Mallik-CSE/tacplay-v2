import type {
  AnalyticsData,
  RevenueOverTimeData,
  BookingCheckinData,
  RevenueSourceItem,
  TopPackageRow,
} from "@/types/DashboardTypes/ArenaManagementTypes"
import { DollarSign, ClipboardList, Users, UserCheck, TrendingUp } from "lucide-react"

export const mockRevenueOverTime: RevenueOverTimeData[] = [
  { month: "Jan", revenue: 800 },
  { month: "Feb", revenue: 1200 },
  { month: "Mar", revenue: 1500 },
  { month: "Apr", revenue: 1800 },
  { month: "May", revenue: 2200 },
  { month: "Jun", revenue: 3200 },
]

export const mockBookingVsCheckins: BookingCheckinData[] = [
  { month: "Jan", bookings: 55, checkins: 45 },
  { month: "Feb", bookings: 80, checkins: 65 },
  { month: "Mar", bookings: 60, checkins: 50 },
  { month: "Apr", bookings: 70, checkins: 55 },
  { month: "May", bookings: 50, checkins: 40 },
  { month: "Jun", bookings: 65, checkins: 50 },
]

export const mockRevenueSources: RevenueSourceItem[] = [
  { name: "Walk-in", value: 40, amount: "€ 2,150", percentage: "39.2%", color: "#EF4444" },
  { name: "Online Booking", value: 35, amount: "€ 1,980", percentage: "36.1%", color: "#EAB308" },
  { name: "Package", value: 15, amount: "€ 400", percentage: "14.9%", color: "#6366F1" },
  { name: "Other", value: 10, amount: "€ 130", percentage: "9.8%", color: "#F97316" },
]

export const mockTopPackages: TopPackageRow[] = [
  {
    id: 1,
    packageName: "Beginner Package",
    description: "Perfect for first-time players",
    booking: 86,
    bookingChange: 38,
    revenue: "€ 35",
    player: 35,
    conversionRate: 38,
  },
  {
    id: 2,
    packageName: "Advanced Package",
    description: "For Experienced Players",
    booking: 86,
    bookingChange: 38,
    revenue: "€ 35",
    player: 35,
    conversionRate: 38,
  },
  {
    id: 3,
    packageName: "Tournament Package",
    description: "Fore competitive events",
    booking: 86,
    bookingChange: 38,
    revenue: "€ 35",
    player: 35,
    conversionRate: 38,
  },
  {
    id: 4,
    packageName: "Tournament Package",
    description: "Fore competitive events",
    booking: 86,
    bookingChange: 38,
    revenue: "€ 35",
    player: 35,
    conversionRate: 38,
  },
  {
    id: 5,
    packageName: "Birthday Party package",
    description: "Perfect for first-time players",
    booking: 86,
    bookingChange: 38,
    revenue: "€ 35",
    player: 35,
    conversionRate: 38,
  },
]

export const mockAnalyticsData: AnalyticsData = {
  stats: [
    {
      title: "Total Revenue",
      value: 18,
      subtitle: "All time",
      icon: DollarSign,
    },
    {
      title: "Total Booking",
      value: "1,243",
      subtitle: "vs last month",
      change: "+18%",
      icon: ClipboardList,
    },
    {
      title: "Total Player",
      value: "9,856",
      subtitle: "vs last month",
      change: "+18%",
      icon: Users,
    },
    {
      title: "Check-in Rate",
      value: 262,
      subtitle: "vs last month",
      change: "+18%",
      icon: UserCheck,
    },
    {
      title: "Avg. Revenue",
      value: "€2,628",
      subtitle: "vs last month",
      change: "+18%",
      icon: TrendingUp,
    },
  ],
  revenueOverTime: mockRevenueOverTime,
  bookingVsCheckins: mockBookingVsCheckins,
  revenueSources: mockRevenueSources,
  topPackages: mockTopPackages,
}
