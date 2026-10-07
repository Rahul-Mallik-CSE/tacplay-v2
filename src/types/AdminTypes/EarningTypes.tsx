/**
 * EarningTypes.tsx
 * TypeScript types and interfaces for the Admin Earning feature.
 */

// ============================================================================
// Earning API Types
// ============================================================================

export interface EarningUser {
  id: number
  display_id: string
  name: string
  email: string
}

export interface EarningCountry {
  id: number | null
  name: string
  code: string | null
}

export interface EarningPlanInfo {
  id: number
  name: string
  full_name: string
  code: string
}

export interface EarningTransactionItem {
  transaction_id: number
  display_transaction_id: string
  payment_reference: string | null
  user_name: string
  user_id: number
  display_user_id: string
  plan: string | null
  amount: string
  amount_display: string
  currency: string
  date: string
  date_display: string
  session_name: string | null
  payment_method: string
  type: string
  type_display: string
  user: EarningUser
  country: EarningCountry
  plan_info?: EarningPlanInfo
}

export interface EarningOption {
  label: string
  value: string
}

export interface EarningSortOption {
  label: string
  sort_by: string
  order: "asc" | "desc"
}

export interface EarningSummary {
  total_revenue: string
  total_revenue_display: string
  paid_transactions: number
}

export interface EarningFilterOptions {
  type: EarningOption[]
  plan: EarningOption[]
  country: EarningOption[]
  payment_method?: EarningOption[]
  currency?: EarningOption[]
}

export interface EarningMetaFilters {
  search?: string
  plan?: string
  payment_method?: string
  currency?: string
  date_from?: string
  date_to?: string
  amount_min?: string
  amount_max?: string
  type?: string
  country?: string
}

export interface EarningSorting {
  sort_by: string
  order: "asc" | "desc" | string
}

export interface EarningMeta {
  page: number
  limit: number
  total: number
  totalPage: number
  filters?: EarningMetaFilters
  sorting?: EarningSorting
  summary?: EarningSummary
  filter_options?: EarningFilterOptions
  sort_options?: EarningSortOption[]
  table?: {
    title: string
    columns: string[]
  }
}

export interface AdminEarningResponse {
  success: boolean
  message: string
  meta: EarningMeta
  data: EarningTransactionItem[]
  requestId?: string
}

export interface AdminEarningQueryParams {
  search?: string
  type?: string
  plan?: string
  country?: string
  sort_by?: string
  order?: "asc" | "desc"
  page?: number
  limit?: number
  payment_method?: string
  currency?: string
  date_from?: string
  date_to?: string
  amount_min?: string
  amount_max?: string
}

// ============================================================================
// Legacy Component Props & UI Types (Kept for backwards compatibility)
// ============================================================================

export interface EarningTransaction {
  id: number
  transaction_id: string
  user_name: string
  user_email: string
  user_id: string
  type: "Field Owner" | "Player" | "Marketplace" | string
  country: string
  country_code: string
  plan: "Bronze" | "Silver" | "Gold" | "Premium" | string | null
  amount: number
  date: string
}

export interface EarningSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export interface EarningTypeBadgeProps {
  type: "Field Owner" | "Player" | "Marketplace" | string
  size?: "sm" | "md"
}

export interface EarningPlanBadgeProps {
  plan: "Bronze" | "Silver" | "Gold" | "Premium" | string | null
  size?: "sm" | "md"
}

export interface EarningCountryFlagProps {
  countryCode?: string | null
  countryName?: string
}
