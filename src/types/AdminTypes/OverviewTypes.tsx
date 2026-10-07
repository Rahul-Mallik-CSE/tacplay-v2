"use client"

import React from "react"

// ============================================================================
// Legacy Component Types (Kept for compatibility)
// ============================================================================

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

// ============================================================================
// Admin Overview API Response Types
// ============================================================================

export interface AdminOverviewQueryParams {
  year?: number | string
  revenue_period?: string
  subscription_period?: string
  country_period?: string
}

export interface AdminOverviewHeader {
  title: string
  subtitle: string
  selected_year: number
  available_years: number[]
  export_available: boolean
  export_format: string[]
}

export interface AnalyticsMetricChange {
  value: number
  display: string
  direction: "up" | "down" | "same" | string
  is_positive: boolean
}

export interface AnalyticsCardItem {
  label: string
  value: string | number
  currency?: string
  display?: string
  change: AnalyticsMetricChange
}

export interface AnalyticsCardsSection {
  total_field: AnalyticsCardItem
  total_player: AnalyticsCardItem
  premium_player: AnalyticsCardItem
  total_revenue: AnalyticsCardItem
  total_subscription: AnalyticsCardItem
}

export interface RevenueOverTimeApiItem {
  month_number: number
  label: string
  amount: string
}

export interface PeriodOption {
  label: string
  value: string
}

export interface RevenueOverTimeSection {
  title: string
  selected_period: string
  period_options: PeriodOption[]
  year: number
  currency: string
  items: RevenueOverTimeApiItem[]
}

export interface SubscriptionChartApiItem {
  month_number: number
  label: string
  field: number
  player: number
}

export interface SubscriptionChartSection {
  title: string
  selected_period: string
  period_options: PeriodOption[]
  series: Array<{ key: string; label: string }>
  items: SubscriptionChartApiItem[]
}

export interface SubscriptionBreakdownItem {
  plan: string
  count: number
  percentage: number
  percentage_display: string
}

export interface SubscriptionBreakdownSection {
  title: string
  selected_period: string
  period_options: PeriodOption[]
  total_premium: number
  items: SubscriptionBreakdownItem[]
}

export interface RevenueByCountryApiItem {
  country_id: number | null
  country: string
  country_code: string | null
  revenue: string
  currency: string
  percentage: number
  percentage_display: string
}

export interface RevenueByCountrySection {
  title: string
  selected_period: string
  period_options: PeriodOption[]
  items: RevenueByCountryApiItem[]
}

export interface RecentActivityApiItem {
  type: string
  title: string
  description: string
  created_at: string
}

export interface RecentActivitySection {
  title: string
  items: RecentActivityApiItem[]
  view_all: {
    available: boolean
  }
}

export interface RecentFieldOwner {
  id: number
  name: string
  email: string
}

export interface RecentFieldSubscription {
  name: string
  code: string | null
}

export interface RecentFieldCountry {
  id: number | null
  name: string
  code: string | null
}

export interface RecentFieldApiItem {
  id: number
  field_name: string
  description: string
  owner: RecentFieldOwner
  subscription: RecentFieldSubscription
  country: RecentFieldCountry
  created_at: string
  booking_count: number
  revenue: string
  currency: string
  status: string
  actions: {
    view: boolean
    edit: boolean
  }
}

export interface RecentFieldsSection {
  title: string
  columns: string[]
  items: RecentFieldApiItem[]
  view_all: {
    available: boolean
  }
}

export interface FilterOptionBlock<T = string | number> {
  selected: T
  query_param: string
  options: T[]
}

export interface AdminOverviewFilters {
  year: FilterOptionBlock<number>
  revenue_period: FilterOptionBlock<string>
  subscription_period: FilterOptionBlock<string>
  country_period: FilterOptionBlock<string>
}

export interface AdminOverviewData {
  header: AdminOverviewHeader
  analytics_cards: AnalyticsCardsSection
  revenue_over_time: RevenueOverTimeSection
  subscription_chart: SubscriptionChartSection
  subscription_breakdown: SubscriptionBreakdownSection
  revenue_by_country: RevenueByCountrySection
  recent_activity: RecentActivitySection
  recent_fields: RecentFieldsSection
  filters: AdminOverviewFilters
}

export interface AdminOverviewResponse {
  success: boolean
  message: string
  meta: {
    selected_year: number
    available_years: number[]
  }
  data: AdminOverviewData
  requestId?: string
}
