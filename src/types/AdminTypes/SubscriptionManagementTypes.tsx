/**
 * SubscriptionManagementTypes.tsx
 * TypeScript types and interfaces for the Subscription Management feature.
 */

// ============================================================================
// Subscription Types
// ============================================================================

/** A subscription displayed in the list table */
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
// Component Props Types
// ============================================================================

/** Props for SubscriptionSearchBar component */
export interface SubscriptionSearchBarProps {
  value: string
  onChange: (value: string) => void
}

/** Props for SubscriptionStatusBadge component */
export interface SubscriptionStatusBadgeProps {
  status: "Active" | "Trial" | "Past Due"
  size?: "sm" | "md"
}

/** Props for SubscriptionTypeBadge component */
export interface SubscriptionTypeBadgeProps {
  type: "Field Owner" | "Player"
  size?: "sm" | "md"
}

/** Props for SubscriptionPlanBadge component */
export interface SubscriptionPlanBadgeProps {
  plan: "Bronze" | "Silver" | "Gold" | "Premium"
  size?: "sm" | "md"
}

/** Props for SubscriptionCountryFlag component */
export interface SubscriptionCountryFlagProps {
  countryCode: string
}

/** Props for SubscriptionActionDropdown component */
export interface SubscriptionActionDropdownProps {
  subscription: Subscription
  onViewDetails: (subscription: Subscription) => void
}
