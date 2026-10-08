"use client"

import type React from "react"

// UI Component Types (backwards-compatible)
export interface AdminStatCard {
  title: string
  value: string | number
  subtitle: string
  change?: string
  isPositive?: boolean
  isNeutral?: boolean
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

// Backend API Types
export interface AdminAnalyticsChange {
  value: number
  display: string
  direction: "up" | "down" | "same" | string
  is_positive: boolean
}

export interface AdminAnalyticsSummaryItem {
  section: number
  label: string
  value: number | string
  currency?: string
  display?: string
  subtitle: string
  change: AdminAnalyticsChange
}

export interface AdminAnalyticsSummary {
  total_field: AdminAnalyticsSummaryItem
  total_player: AdminAnalyticsSummaryItem
  premium_player: AdminAnalyticsSummaryItem
  total_revenue: AdminAnalyticsSummaryItem
  total_subscription: AdminAnalyticsSummaryItem
}

export interface RevenueOverTimeItem {
  month_number: number
  month: string
  revenue: string | number
}

export interface RevenueOverTimeSection {
  section: number
  title: string
  period: string
  year: number
  currency: string
  items: RevenueOverTimeItem[]
}

export interface ActiveSubscriptionSeries {
  key: string
  label: string
}

export interface ActiveSubscriptionItem {
  month_number: number
  month: string
  field: number
  player: number
}

export interface ActiveSubscriptionChartSection {
  section: number
  title: string
  series: ActiveSubscriptionSeries[]
  items: ActiveSubscriptionItem[]
}

export interface FieldSubscriptionItem {
  plan: string
  count: number
  percentage: number
}

export interface FieldSubscriptionsSection {
  section: number
  title: string
  total: number
  items: FieldSubscriptionItem[]
}

export interface PlayerReportItem {
  key: string
  label: string
  value: number
  percentage: number
}

export interface PlayerReportSection {
  section: number
  title: string
  total_player: number
  items: PlayerReportItem[]
}

export interface RevenueByCountryItem {
  country_id?: number
  country: string
  country_code: string
  revenue: string
  currency: string
  percentage: number
}

export interface RevenueByCountrySection {
  section: number
  title: string
  currency: string
  items: RevenueByCountryItem[]
}

export interface RevenueByCommissionItem {
  country: string
  country_code: string
  commission: string
  currency: string
  percentage: number
}

export interface RevenueByCommissionSection {
  section: number
  title: string
  currency: string
  items: RevenueByCommissionItem[]
}

export interface CampaignFieldInfo {
  id: number
  field_name: string
}

export interface RevenueByCampaignItem {
  campaign_id: number
  campaign_name: string
  campaign_type: string
  audience: string
  audience_count: number
  sent_count: number
  failed_count: number
  status: string
  field?: CampaignFieldInfo
  revenue: string
  currency: string
  percentage: number
  created_at: string
}

export interface RevenueByCampaignSection {
  section: number
  title: string
  period: string
  currency: string
  attribution_available: boolean
  attribution_note?: string
  items: RevenueByCampaignItem[]
}

export interface AdminAnalyticsFilterMonth {
  value: number
  label: string
}

export interface AdminAnalyticsFilters {
  selected: {
    year: number
    month: number
    revenue_period: string
    subscription_period: string
    country_period: string
    campaign_period: string
  }
  options: {
    years: number[]
    months: AdminAnalyticsFilterMonth[]
    periods: string[]
  }
}

export interface AdminAnalyticsHeaderInfo {
  title: string
  selected_year: number
  available_years: number[]
  export_available: boolean
}

export interface AdminAnalyticsData {
  filters: AdminAnalyticsFilters
  header: AdminAnalyticsHeaderInfo
  summary: AdminAnalyticsSummary
  revenue_over_time: RevenueOverTimeSection
  active_subscription_chart: ActiveSubscriptionChartSection
  field_subscriptions: FieldSubscriptionsSection
  player_report: PlayerReportSection
  revenue_by_country: RevenueByCountrySection
  revenue_by_commission: RevenueByCommissionSection
  country_revenue_table?: RevenueByCountrySection
  revenue_by_campaign: RevenueByCampaignSection
}

export interface AdminAnalyticsApiResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: AdminAnalyticsData
  requestId?: string
}

export interface AdminAnalyticsQueryParams {
  year?: number
  month?: number
  revenue_period?: string
  subscription_period?: string
  country_period?: string
  campaign_period?: string
}
