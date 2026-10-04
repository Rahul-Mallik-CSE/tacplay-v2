/**
 * AnalyticsTypes.tsx
 * TypeScript interfaces and types for Field Owner Analytics feature.
 */

export interface StatChange {
  value: number
  display: string
  direction: "up" | "down" | string
  is_positive: boolean
}

export interface SummaryMetric {
  section: number
  label: string
  value: string | number
  currency?: string
  subtitle: string
  change?: StatChange
}

export interface SummaryCheckInRateMetric {
  section: number
  label: string
  value: number
  display: string
  checked_in: number
  total_players: number
  subtitle: string
  change?: StatChange
}

export interface AnalyticsSummary {
  total_revenue: SummaryMetric
  total_booking: SummaryMetric
  total_player: SummaryMetric
  check_in_rate: SummaryCheckInRateMetric
  average_revenue: SummaryMetric
}

export interface RevenueOverTimeItem {
  month_number?: number
  label: string
  value: string | number
  change?: StatChange
}

export interface RevenueOverTimeSection {
  section: number
  title: string
  period: string
  year: number
  month: number
  currency: string
  items: RevenueOverTimeItem[]
}

export interface BookingVsCheckinItem {
  date: string
  label: string
  bookings: number
  check_ins: number
}

export interface BookingVsCheckinsSection {
  section: number
  title: string
  period: string
  year: number
  month: number
  legend: {
    bookings: string
    check_ins: string
  }
  items: BookingVsCheckinItem[]
}

export interface RevenueSourceItem {
  key: string
  label: string
  revenue: string
  booking_count: number
  percentage: number
  percentage_display: string
  color?: string
}

export interface RevenueSourceSection {
  section: number
  title: string
  period: string
  start_date: string
  end_date: string
  total_revenue: string
  currency: string
  center: {
    value: number
    label: string
  }
  items: RevenueSourceItem[]
}

export interface TopPerformingPackageItem {
  package_id: number
  package_name: string
  description: string
  image: string | null
  booking: {
    value: number
    change: StatChange
  }
  revenue: string
  player: number
  conversion_rate: {
    value: number
    display: string
  }
  package_fee?: string
}

export interface TopPerformingPackagesSection {
  section: number
  title: string
  year: number
  columns: string[]
  items: TopPerformingPackageItem[]
  total_packages: number
  showing: number
  has_more: boolean
  view_all?: {
    section: number
    available: boolean
    query_param: string
  }
}

export interface FilterMonthOption {
  value: number
  label: string
}

export interface AnalyticsFilterOptions {
  years: number[]
  months: FilterMonthOption[]
  revenue_periods: string[]
  booking_checkin_periods: string[]
  revenue_source_periods: string[]
}

export interface AnalyticsSelectedFilters {
  year: number
  month: number
  revenue_period: string
  booking_checkin_period: string
  revenue_source_period: string
}

export interface AnalyticsFilters {
  selected: AnalyticsSelectedFilters
  options: AnalyticsFilterOptions
}

export interface AnalyticsFieldInfo {
  id: number
  field_name: string
}

export interface AnalyticsSubscriptionInfo {
  plan_code: string
  is_paid: boolean
}

export interface AnalyticsData {
  filters: AnalyticsFilters
  summary: AnalyticsSummary
  revenue_over_time: RevenueOverTimeSection
  booking_vs_checkins: BookingVsCheckinsSection
  revenue_source: RevenueSourceSection
  top_performing_packages: TopPerformingPackagesSection
  field?: AnalyticsFieldInfo
  subscription?: AnalyticsSubscriptionInfo
}

export interface AnalyticsApiResponse {
  success: boolean
  message: string
  meta?: Record<string, unknown>
  data: AnalyticsData
  requestId?: string
}

export interface AnalyticsQueryParams {
  year?: number
  month?: number
  revenue_period?: string
  booking_checkin_period?: string
  revenue_source_period?: string
  package_limit?: number
}
