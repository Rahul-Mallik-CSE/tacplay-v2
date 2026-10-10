/**
 * SubscriptionManagementTypes.tsx
 * TypeScript types and interfaces for the Subscription Management feature.
 */

// ============================================================================
// Subscription API & Entity Types
// ============================================================================

export interface AdminSubscriptionSubscriber {
  id: number
  display_id: string
  name: string
  owner_name: string | null
  email: string
}

export interface AdminSubscriptionType {
  value: string
  display: string
}

export interface AdminSubscriptionPlan {
  id: number
  name: string
  display_name: string
  code: string
  billing_cycle: string
  price: string
  currency: string
  is_premium: boolean
}

export interface AdminSubscriptionCountry {
  id: number | null
  name: string
  code: string
}

export interface AdminSubscriptionAmount {
  value: string
  currency: string
}

export interface AdminSubscriptionBillingCycle {
  value: string
  display: string
}

export interface AdminSubscriptionStatus {
  value: string
  display: string
}

export interface AdminSubscriptionItem {
  subscription_id: number
  subscriber: AdminSubscriptionSubscriber
  type: AdminSubscriptionType
  plan: AdminSubscriptionPlan
  country: AdminSubscriptionCountry
  amount: AdminSubscriptionAmount
  billing_cycle: AdminSubscriptionBillingCycle
  status: AdminSubscriptionStatus
  started_at: string | null
  next_billing_date: string | null
  expires_at: string | null
  auto_renew: boolean
  payment_reference: string | null
  actions: {
    view?: boolean
    [key: string]: unknown
  }
}

/** A subscription displayed in legacy mock data */
export interface Subscription {
  id: number
  subscriber_name: string
  subscriber_id: string
  avatar: string
  type: "Field Owner" | "Player"
  plan: "Bronze" | "Silver" | "Gold" | "Premium"
  country: string
  country_code: string
  amount: number
  billing_cycle: "Monthly" | "Yearly"
  status: "Active" | "Trial" | "Past Due"
  next_billing_date: string
}

// ============================================================================
// API Response & Query Types
// ============================================================================

export interface FilterOption {
  label: string
  value: string
}

export interface SortOption {
  label: string
  sort_by: string
  sort_order: "asc" | "desc"
}

export interface AdminSubscriptionMetaFilters {
  search: string
  type: string
  plan: string
  country: string
  billing_cycle: string
  status: string
  sort_by: string
  sort_order: string
}

export interface AdminSubscriptionFilterOptions {
  type: FilterOption[]
  plan: FilterOption[]
  country: FilterOption[]
  billing_cycle: FilterOption[]
  status: FilterOption[]
}

export interface AdminSubscriptionMeta {
  page: number
  limit: number
  total: number
  totalPage: number
  filters: AdminSubscriptionMetaFilters
  filter_options: AdminSubscriptionFilterOptions
  sort_options: SortOption[]
}

export interface AdminSubscriptionListResponse {
  success: boolean
  message: string
  meta: AdminSubscriptionMeta
  data: AdminSubscriptionItem[]
  requestId?: string
}

export interface AdminSubscriptionQueryParams {
  search?: string
  type?: string
  plan?: string
  country?: string
  billing_cycle?: string
  status?: string
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: "asc" | "desc"
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for SubscriptionSearchBar component */
export interface SubscriptionSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

/** Props for SubscriptionStatusBadge component */
export interface SubscriptionStatusBadgeProps {
  status: string
  size?: "sm" | "md"
}

/** Props for SubscriptionTypeBadge component */
export interface SubscriptionTypeBadgeProps {
  type: string
  size?: "sm" | "md"
}

/** Props for SubscriptionPlanBadge component */
export interface SubscriptionPlanBadgeProps {
  plan: string
  size?: "sm" | "md"
}

/** Props for SubscriptionCountryFlag component */
export interface SubscriptionCountryFlagProps {
  countryCode: string
  countryName?: string
  size?: "sm" | "md"
}

/** Props for SubscriptionActionDropdown component */
export interface SubscriptionActionDropdownProps {
  subscription: AdminSubscriptionItem
  onViewDetails: (subscription: AdminSubscriptionItem) => void
}

/** Props for SubscriptionDetailsSheet component */
export interface SubscriptionDetailsSheetProps {
  subscription: AdminSubscriptionItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}
