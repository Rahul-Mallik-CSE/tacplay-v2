import type {
  AnalyticsPageData,
  RevenueOverTimeData,
  SubscriptionChartData,
  DonutChartDataItem,
  CountryRevenueData,
} from "@/types/AdminTypes/AnalyticsTypes"
import {
  LayoutGrid,
  Users,
  UserCheck,
  DollarSign,
  CreditCard,
} from "lucide-react"

export const mockAnalyticsRevenueOverTime: RevenueOverTimeData[] = [
  { month: "Jan", revenue: 800 },
  { month: "Feb", revenue: 1200 },
  { month: "Mar", revenue: 1500 },
  { month: "Apr", revenue: 1800 },
  { month: "May", revenue: 2200 },
  { month: "Jun", revenue: 3200 },
]

export const mockAnalyticsSubscriptionChart: SubscriptionChartData[] = [
  { month: "Jan", field: 45000, player: 55000 },
  { month: "Feb", field: 85000, player: 95000 },
  { month: "Mar", field: 50000, player: 70000 },
  { month: "Apr", field: 40000, player: 60000 },
  { month: "May", field: 35000, player: 55000 },
  { month: "Jun", field: 45000, player: 65000 },
]

export const mockFieldDonut: DonutChartDataItem[] = [
  {
    name: "adminAnalytics.gold",
    value: 6700,
    amount: "6,700",
    percentage: "39.2%",
    color: "#EF4444",
  },
  {
    name: "adminAnalytics.silver",
    value: 9302,
    amount: "9,302",
    percentage: "36.1%",
    color: "#EAB308",
  },
  {
    name: "adminAnalytics.bronze",
    value: 3985,
    amount: "3,985",
    percentage: "14.9%",
    color: "#6366F1",
  },
]

export const mockPlayerDonut: DonutChartDataItem[] = [
  {
    name: "adminAnalytics.premium",
    value: 6700,
    amount: "6,700",
    percentage: "39.2%",
    color: "#EF4444",
  },
  {
    name: "adminAnalytics.free",
    value: 3985,
    amount: "3,985",
    percentage: "14.9%",
    color: "#6366F1",
  },
]

export const mockRevenueByCountry: CountryRevenueData[] = [
  { country: "Span", countryCode: "ES", amount: "\u20AC8,12,450", percentage: "39.2%" },
  { country: "Germany", countryCode: "DE", amount: "\u20AC8,12,450", percentage: "36.1%" },
  { country: "France", countryCode: "FR", amount: "\u20AC8,12,450", percentage: "14.9%" },
  { country: "US", countryCode: "US", amount: "\u20AC8,12,450", percentage: "9.8%" },
  { country: "Ireland", countryCode: "IE", amount: "\u20AC8,12,450", percentage: "9.8%" },
]

export const mockRevenueByCommission: CountryRevenueData[] = [
  { country: "Span", countryCode: "ES", amount: "\u20AC8,12,450", percentage: "39.2%" },
  { country: "Germany", countryCode: "DE", amount: "\u20AC8,12,450", percentage: "36.1%" },
  { country: "France", countryCode: "FR", amount: "\u20AC8,12,450", percentage: "14.9%" },
  { country: "US", countryCode: "US", amount: "\u20AC8,12,450", percentage: "9.8%" },
  { country: "Ireland", countryCode: "IE", amount: "\u20AC8,12,450", percentage: "9.8%" },
]

export const mockRevenueByCampaign: CountryRevenueData[] = [
  { country: "Span", countryCode: "ES", amount: "\u20AC8,12,450", percentage: "39.2%" },
  { country: "Germany", countryCode: "DE", amount: "\u20AC8,12,450", percentage: "36.1%" },
  { country: "France", countryCode: "FR", amount: "\u20AC8,12,450", percentage: "14.9%" },
  { country: "US", countryCode: "US", amount: "\u20AC8,12,450", percentage: "9.8%" },
  { country: "Ireland", countryCode: "IE", amount: "\u20AC8,12,450", percentage: "9.8%" },
]

export const mockAnalyticsData: AnalyticsPageData = {
  stats: [
    {
      title: "adminAnalytics.totalField",
      value: "1243",
      subtitle: "analytics.vsLastMonth",
      change: "+18%",
      icon: LayoutGrid,
    },
    {
      title: "adminAnalytics.totalPlayer",
      value: "9856",
      subtitle: "analytics.vsLastMonth",
      change: "+18%",
      icon: Users,
    },
    {
      title: "adminAnalytics.premiumPlayer",
      value: "2,628",
      subtitle: "analytics.vsLastMonth",
      change: "+18%",
      icon: UserCheck,
    },
    {
      title: "adminAnalytics.totalRevenue",
      value: "\u20AC2,628",
      subtitle: "analytics.vsLastMonth",
      change: "+18%",
      icon: DollarSign,
    },
    {
      title: "adminAnalytics.totalSubscription",
      value: "262",
      subtitle: "analytics.vsLastMonth",
      change: "+18%",
      icon: CreditCard,
    },
  ],
  revenueOverTime: mockAnalyticsRevenueOverTime,
  subscriptionChart: mockAnalyticsSubscriptionChart,
  fieldDonut: mockFieldDonut,
  playerDonut: mockPlayerDonut,
  revenueByCountry: mockRevenueByCountry,
  revenueByCommission: mockRevenueByCommission,
  revenueByCampaign: mockRevenueByCampaign,
}
