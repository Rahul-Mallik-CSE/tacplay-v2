/**
 * MarketingTypes.tsx
 * TypeScript types and interfaces for the Marketing feature.
 */

// ============================================================================
// Campaign Types
// ============================================================================

/** Campaign type enum */
export type CampaignType = "Email" | "Push" | "SMS"

/** Campaign status enum */
export type CampaignStatus = "Active" | "Complete" | "Schedule" | "Draft"

/** A campaign displayed in the list table */
export interface Campaign {
  campaign_id: number
  name: string
  description: string
  type: CampaignType
  audience: number
  scheduled_date: string
  scheduled_time: string
  booking_count: number
  booking_change: number
  revenue: number
  status: CampaignStatus
  image?: string
}

// ============================================================================
// Voucher Types
// ============================================================================

/** Voucher status enum */
export type VoucherStatus = "Active" | "Schedule" | "Expired"

/** A voucher displayed in the list table */
export interface Voucher {
  voucher_id: number
  code: string
  discount: string
  used: number
  total: number
  expires: string
  revenue: number
  status: VoucherStatus
  description?: string
}

// ============================================================================
// Overview Types
// ============================================================================

/** Marketing overview stats card */
export interface MarketingStat {
  title: string
  value: string | number
  subtitle: string
  change?: string
  icon: string
}

/** Top performing campaign */
export interface TopPerformingCampaign {
  rank: number
  name: string
  revenue: number
  bookings: number
}

/** Active voucher for overview */
export interface ActiveVoucher {
  code: string
  discount: string
  used: number
  total: number
  expires: string
}

/** Quick action item */
export interface QuickAction {
  label: string
  href: string
  icon: string
  color: string
}

// ============================================================================
// Campaign Form Types
// ============================================================================

/** Email campaign form data */
export interface EmailCampaignForm {
  campaign_name: string
  email_subject: string
  preheader_text: string
  email_body: string
  image: File | null
  from_name: string
  from_email: string
  schedule: "now" | "later"
  schedule_date?: string
  audience: "all" | "active"
}

/** SMS campaign form data */
export interface SmsCampaignForm {
  campaign_name: string
  sender_id: string
  notification_type: "Promotional" | "Alert" | "Update" | "Reminder"
  schedule: "now" | "later"
  schedule_date?: string
  audience: "all" | "active"
}

/** Push notification form data */
export interface PushCampaignForm {
  campaign_name: string
  notification_type: "Promotional" | "Alert" | "Update" | "Reminder"
  schedule: "now" | "later"
  schedule_date?: string
  deep_link: string
  image: File | null
  audience: "all" | "active"
}

/** Voucher form data */
export interface VoucherForm {
  voucher_code: string
  select_session: string
  discount_value: number
  minimum_order_value: string
  description: string
  schedule: "active" | "scheduled"
  start_date?: string
  end_date?: string
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for CampaignStatusBadge component */
export interface CampaignStatusBadgeProps {
  status: CampaignStatus
  size?: "sm" | "md"
}

/** Props for CampaignTypeBadge component */
export interface CampaignTypeBadgeProps {
  type: CampaignType
}

/** Props for VoucherStatusBadge component */
export interface VoucherStatusBadgeProps {
  status: VoucherStatus
}

/** Props for CampaignActionMenu component */
export interface CampaignActionMenuProps {
  campaign: Campaign
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  onDuplicate: (id: number) => void
}

/** Props for VoucherActionMenu component */
export interface VoucherActionMenuProps {
  voucher: Voucher
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  onDuplicate: (id: number) => void
}
