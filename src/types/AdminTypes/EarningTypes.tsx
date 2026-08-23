/**
 * EarningTypes.tsx
 * TypeScript types and interfaces for the Earning feature.
 */

// ============================================================================
// Earning Types
// ============================================================================

/** An earning transaction displayed in the list table */
export interface EarningTransaction {
  id: number
  transaction_id: string
  user_name: string
  user_email: string
  user_id: string
  type: "Field Owner" | "Player" | "Marketplace"
  country: string
  country_code: string
  plan: "Bronze" | "Silver" | "Gold" | "Premium" | null
  amount: number
  date: string
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for EarningSearchBar component */
export interface EarningSearchBarProps {
  value: string
  onChange: (value: string) => void
}

/** Props for EarningTypeBadge component */
export interface EarningTypeBadgeProps {
  type: "Field Owner" | "Player" | "Marketplace"
  size?: "sm" | "md"
}

/** Props for EarningPlanBadge component */
export interface EarningPlanBadgeProps {
  plan: "Bronze" | "Silver" | "Gold" | "Premium" | null
  size?: "sm" | "md"
}

/** Props for EarningCountryFlag component */
export interface EarningCountryFlagProps {
  countryCode: string
}
