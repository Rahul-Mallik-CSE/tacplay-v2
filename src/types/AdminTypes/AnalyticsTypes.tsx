"use client"

export interface AdminStatCard {
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

export interface AnalyticsPageData {
  stats: AdminStatCard[]
  revenueOverTime: RevenueOverTimeData[]
  subscriptionChart: SubscriptionChartData[]
  fieldDonut: DonutChartDataItem[]
  playerDonut: DonutChartDataItem[]
  revenueByCountry: CountryRevenueData[]
  revenueByCommission: CountryRevenueData[]
  revenueByCampaign: CountryRevenueData[]
}
