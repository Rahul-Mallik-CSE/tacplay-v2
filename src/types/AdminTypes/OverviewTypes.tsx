"use client"

export interface OverviewStatCard {
  title: string
  value: string | number
  subtitle: string
  change?: string
  icon: React.ElementType
}

export interface RevenueOverTimeData {
  month: string
  revenue: number
}

export interface SubscriptionChartData {
  month: string
  field: number
  player: number
}

export interface DonutChartDataItem {
  name: string
  value: number
  amount: string
  percentage: string
  color: string
}

export interface CountryRevenueData {
  country: string
  countryCode: string
  amount: string
  percentage: string
}

export interface RecentActivityItem {
  id: number
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  description: string
  time: string
}

export interface RecentFieldItem {
  id: number
  fieldName: string
  fieldId: string
  description: string
  ownerName: string
  ownerEmail: string
  subscription: string
  countryCode: string
  createdDate: string
  createdTime: string
  booking: number
  bookingChange: number
  revenue: string
  status: string
}

export interface OverviewPageData {
  stats: OverviewStatCard[]
  revenueOverTime: RevenueOverTimeData[]
  subscriptionChart: SubscriptionChartData[]
  subscriptionDonut: DonutChartDataItem[]
  revenueByCountry: CountryRevenueData[]
  recentActivity: RecentActivityItem[]
  recentFields: RecentFieldItem[]
}
