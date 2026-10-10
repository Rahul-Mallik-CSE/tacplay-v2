/**
 * SubscriptionTypes.tsx
 * TypeScript types and interfaces for the Subscription feature.
 */

// ============================================================================
// Plan Types
// ============================================================================

/** A subscription plan definition */
export interface SubscriptionPlan {
  id: string | number
  name: string
  code: string
  price: number | string
  annualPrice?: number
  currency: string
  billing_cycle: string
  duration_days?: number
  description: string
  logo: string
  features: string[]
  is_popular?: boolean
  is_active?: boolean
  is_current?: boolean
  button_text?: string
}

/** Current subscription status */
export interface CurrentSubscription {
  has_active_subscription?: boolean
  plan_name: string
  plan_code: string
  price: number | string
  currency: string
  billing_cycle: string
  started_at?: string
  expires_at?: string
  next_billing_date?: string
  days_left?: number
  status: "active" | "inactive" | "cancelled" | string
  show_upgrade_popup?: boolean
}

// ============================================================================
// Backend API Contract Types
// ============================================================================

export interface SubscriptionStatusData {
  has_active_subscription: boolean
  plan_code: string
  plan_name: string
  billing_cycle: string
  price: string
  currency: string
  started_at: string
  expires_at: string
  days_left: number
  status: "active" | "inactive" | "cancelled" | string
  show_upgrade_popup: boolean
}

export interface SubscriptionStatusResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: SubscriptionStatusData
  requestId?: string
}

export interface SubscriptionPlanItem {
  id: number
  name: string
  code: string
  billing_cycle: "monthly" | "yearly"
  price: string
  currency: string
  duration_days: number
  description: string
  is_active: boolean
  is_current: boolean
  button_text: string
}

export interface SubscriptionPlansResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: SubscriptionPlanItem[]
  requestId?: string
}

export interface UpgradeSubscriptionPayload {
  plan_code: string
}

export interface UpgradeSubscriptionData {
  invoice_id: string
  plan_code: string
  plan_name: string
  amount: string
  currency: string
  payment_status: string
  upgrade_status: string
  payment_url: string
  stripe_checkout_session_id: string
  created_at: string
}

export interface UpgradeSubscriptionResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: UpgradeSubscriptionData
  requestId?: string
}

export interface BillingHistoryItem {
  invoice_id: string
  date: string
  plan: string
  price: string
  currency: string
  payment_status: string
  paid_at: string
}

export interface BillingHistoryResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: BillingHistoryItem[]
  requestId?: string
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
  onManageBilling?: () => void
  onUpgradePlan: () => void
}

/** Props for PlanCard component */
export interface PlanCardProps {
  plan: SubscriptionPlan
  isSelected: boolean
  isCurrentPlan: boolean
  onSelect: (planCode: string) => void
  billingCycle: "monthly" | "annual"
  isUpgrading?: boolean
}

/** Props for PlanCardsSection component */
export interface PlanCardsSectionProps {
  plans: SubscriptionPlan[]
  currentPlanCode: string
  selectedPlanCode: string
  billingCycle: "monthly" | "annual"
  onSelectPlan: (planCode: string) => void
  onBillingCycleChange: (cycle: "monthly" | "annual") => void
  upgradingPlanCode?: string | null
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
