/**
 * SubscriptionTypes.tsx
 * TypeScript types and interfaces for the Subscription feature.
 */

// ============================================================================
// Plan Types
// ============================================================================

/** A subscription plan definition */
export interface SubscriptionPlan {
  id: string
  name: string
  code: string
  price: number
  annualPrice: number
  currency: string
  billing_cycle: string
  description: string
  logo: string
  features: string[]
  is_popular?: boolean
}

/** Current subscription status */
export interface CurrentSubscription {
  plan_name: string
  plan_code: string
  price: number
  currency: string
  billing_cycle: string
  next_billing_date: string
  status: "active" | "inactive" | "cancelled"
}

// ============================================================================
// Billing History Types
// ============================================================================

/** A single billing history record */
export interface BillingHistoryRecord {
  id: string
  date: string
  description: string
  amount: string
  currency: string
  status: "Paid" | "Pending" | "Failed" | "Refunded"
  invoice_id: string
}

// ============================================================================
// Payment Method Types
// ============================================================================

/** A payment method card */
export interface PaymentMethodCard {
  id: string
  card_type: "visa" | "mastercard" | "amex" | "discover"
  last_four: string
  expiry_month: string
  expiry_year: string
  is_default: boolean
  cardholder_name?: string
  billing_address?: string
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for CurrentPlanCard component */
export interface CurrentPlanCardProps {
  subscription: CurrentSubscription
  onManageBilling: () => void
  onUpgradePlan: () => void
}

/** Props for PlanCard component */
export interface PlanCardProps {
  plan: SubscriptionPlan
  isSelected: boolean
  isCurrentPlan: boolean
  onSelect: (planCode: string) => void
  billingCycle: "monthly" | "annual"
}

/** Props for PlanCardsSection component */
export interface PlanCardsSectionProps {
  plans: SubscriptionPlan[]
  currentPlanCode: string
  selectedPlanCode: string
  billingCycle: "monthly" | "annual"
  onSelectPlan: (planCode: string) => void
  onBillingCycleChange: (cycle: "monthly" | "annual") => void
}

/** Props for AnnualBillingBanner component */
export interface AnnualBillingBannerProps {
  onSwitchToAnnual: () => void
}

/** Props for BillingToggle component */
export interface BillingToggleProps {
  billingCycle: "monthly" | "annual"
  onToggle: (cycle: "monthly" | "annual") => void
}

/** Props for BillingHistoryContainer */
export interface BillingHistoryContainerProps {
  data: BillingHistoryRecord[]
}

/** Props for PrimaryPaymentCard */
export interface PrimaryPaymentCardProps {
  card: PaymentMethodCard
  onUpdateCard: () => void
}

/** Props for OtherPaymentCard */
export interface OtherPaymentCardProps {
  card: PaymentMethodCard
  onSetDefault: (id: string) => void
  onRemove: (id: string) => void
}

/** Props for PaymentMethodContainer */
export interface PaymentMethodContainerProps {
  primaryCard: PaymentMethodCard
  otherCards: PaymentMethodCard[]
  onAddCard: () => void
  onUpdateCard: () => void
  onSetDefault: (id: string) => void
  onRemoveCard: (id: string) => void
}
