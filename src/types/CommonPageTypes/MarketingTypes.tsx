/**
 * MarketingTypes.tsx
 * TypeScript types and interfaces for the Marketing feature and API integration.
 */

// ============================================================================
// Marketing Overview API Response Types
// ============================================================================

export interface MarketingOverviewParams {
  year?: number | string;
}

export interface MarketingMeta {
  selected_year: number;
  available_years: number[];
  recent_limit: number;
}

export interface MarketingFilterOption {
  value: string;
  label: string;
}

export interface MarketingHeaderFilters {
  selected_year: number;
  available_years: number[];
  year_query_param: string;
  recent_limit: number;
  campaign_types: MarketingFilterOption[];
  statuses: MarketingFilterOption[];
}

export interface MarketingHeader {
  title: string;
  subtitle: string;
  selected_year: number;
  available_years: number[];
  filters: MarketingHeaderFilters;
}

export interface MetricChange {
  value: number;
  display: string;
  direction: "up" | "down" | "same";
  is_positive: boolean;
}

export interface MarketingSummaryItem {
  section: number;
  label: string;
  value: number;
  subtitle: string;
  change: MetricChange | null;
}

export interface MarketingSummary {
  total_campaigns: MarketingSummaryItem;
  emails_sent: MarketingSummaryItem;
  sms_sent: MarketingSummaryItem;
  push_sent: MarketingSummaryItem;
}

export interface TopPerformingCampaignItem {
  rank: number;
  id: number;
  campaign_name: string;
  campaign_type: "sms" | "email" | "push" | string;
  campaign_type_display: string;
  image: string | null;
  audience: string;
  audience_count: number;
  sent_count: number;
  bookings: number;
  revenue: string;
  currency: string;
  performance_percentage: number;
  performance_display: string;
  status: string;
}

export interface ViewAllLink {
  available: boolean;
  endpoint: string;
}

export interface TopPerformingCampaignsSection {
  section: number;
  title: string;
  items: TopPerformingCampaignItem[];
  view_all: ViewAllLink;
}

export interface ActiveVoucherItem {
  id: number;
  voucher_code: string;
  discount_percentage: number;
  discount_display: string;
  used_count: number;
  usage_limit: number | null;
  used_display: string;
  start_date: string | null;
  end_date: string | null;
  expires: string | null;
  status: string;
  session_id?: number | null;
  session_name?: string | null;
}

export interface ActiveVouchersSection {
  section: number;
  title: string;
  items: ActiveVoucherItem[];
  view_all: ViewAllLink;
}

export interface QuickActionItem {
  key: string;
  label: string;
  campaign_type?: "email" | "sms" | "push" | string;
  method: string;
  endpoint: string;
}

export interface QuickActionsSection {
  section: number;
  title: string;
  items: QuickActionItem[];
}

export interface CampaignActions {
  can_edit: boolean;
  can_delete: boolean;
  can_duplicate: boolean;
  detail_endpoint?: string;
  duplicate_endpoint?: string;
}

export interface RecentCampaignItem {
  id: number;
  campaign_name: string;
  image: string | null;
  campaign_type: "sms" | "email" | "push" | string;
  campaign_type_display: string;
  audience: string;
  audience_display: string;
  audience_count: number;
  scheduled_at: string | null;
  display_date: string;
  bookings: number;
  booking_change: MetricChange;
  revenue: string;
  currency: string;
  status: "sent" | "failed" | "scheduled" | "draft" | string;
  status_display: string;
  sent_count: number;
  failed_count: number;
  actions: CampaignActions;
}

export interface RecentCampaignsSection {
  section: number;
  title: string;
  columns: string[];
  items: RecentCampaignItem[];
  showing: number;
  total: number;
  view_all: ViewAllLink;
}

export interface MarketingOverviewData {
  header: MarketingHeader;
  summary: MarketingSummary;
  top_performing_campaigns: TopPerformingCampaignsSection;
  active_vouchers: ActiveVouchersSection;
  quick_actions: QuickActionsSection;
  recent_campaigns: RecentCampaignsSection;
}

export interface MarketingOverviewResponse {
  success: boolean;
  message: string;
  meta: MarketingMeta;
  data: MarketingOverviewData;
  requestId?: string;
}

// ============================================================================
// Legacy & Common Campaign Types
// ============================================================================

/** Campaign type enum */
export type CampaignType = "Email" | "Push" | "SMS" | "email" | "push" | "sms";

/** Campaign status enum */
export type CampaignStatus =
  | "Active"
  | "Complete"
  | "Schedule"
  | "Draft"
  | "Expired"
  | "Sent"
  | "Failed"
  | "active"
  | "complete"
  | "schedule"
  | "scheduled"
  | "draft"
  | "expired"
  | "sent"
  | "failed";

/** A campaign displayed in the list table */
export interface Campaign {
  campaign_id: number;
  name: string;
  description: string;
  type: CampaignType;
  audience: number;
  scheduled_date: string;
  scheduled_time: string;
  booking_count: number;
  booking_change: number;
  revenue: number;
  status: CampaignStatus;
  image?: string;
}

// ============================================================================
// Voucher Types
// ============================================================================

/** Voucher status enum */
export type VoucherStatus = "Active" | "Schedule" | "Expired" | "active" | "schedule" | "expired";

/** A voucher displayed in the list table */
export interface Voucher {
  voucher_id: number;
  code: string;
  discount: string;
  used: number;
  total: number;
  expires: string;
  revenue: number;
  status: VoucherStatus;
  description?: string;
}

// ============================================================================
// UI Stats & Actions Types
// ============================================================================

/** Marketing overview stats card */
export interface MarketingStat {
  title: string;
  value: string | number;
  subtitle: string;
  change?: string;
  icon: string;
}

/** Top performing campaign */
export interface TopPerformingCampaign {
  rank: number;
  name: string;
  revenue: number;
  bookings: number;
}

/** Active voucher for overview */
export interface ActiveVoucher {
  code: string;
  discount: string;
  used: number;
  total: number;
  expires: string;
}

/** Quick action item */
export interface QuickAction {
  label: string;
  href: string;
  icon: string;
  color: string;
}

// ============================================================================
// Campaign Form Types
// ============================================================================

/** Email campaign form data */
export interface EmailCampaignForm {
  campaign_name: string;
  email_subject: string;
  preheader_text: string;
  email_body: string;
  image: File | null;
  from_name: string;
  from_email: string;
  schedule: "now" | "later";
  schedule_date?: string;
  audience: "all" | "active";
}

/** SMS campaign form data */
export interface SmsCampaignForm {
  campaign_name: string;
  sender_id: string;
  notification_type: "Promotional" | "Alert" | "Update" | "Reminder";
  schedule: "now" | "later";
  schedule_date?: string;
  audience: "all" | "active";
}

/** Push notification form data */
export interface PushCampaignForm {
  campaign_name: string;
  notification_type: "Promotional" | "Alert" | "Update" | "Reminder";
  schedule: "now" | "later";
  schedule_date?: string;
  deep_link: string;
  image: File | null;
  audience: "all" | "active";
}

/** Voucher form data */
export interface VoucherForm {
  voucher_code: string;
  select_session: string;
  discount_value: number;
  minimum_order_value: string;
  description: string;
  schedule: "active" | "scheduled";
  start_date?: string;
  end_date?: string;
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for CampaignStatusBadge component */
export interface CampaignStatusBadgeProps {
  status: CampaignStatus | string;
  size?: "sm" | "md";
}

/** Props for CampaignTypeBadge component */
export interface CampaignTypeBadgeProps {
  type: CampaignType | string;
}

/** Props for VoucherStatusBadge component */
export interface VoucherStatusBadgeProps {
  status: VoucherStatus | string;
}

// ============================================================================
// Campaign List & Creation API Types
// ============================================================================

export interface CampaignQueryParams {
  search?: string;
  campaign_type?: string;
  page?: number;
  limit?: number;
  status?: string;
}

export interface CampaignListItem {
  id: number;
  campaign_name: string;
  campaign_type: "email" | "sms" | "push" | string;
  audience: string;
  audience_count: number;
  scheduled_at: string | null;
  bookings: number;
  revenue: string;
  status: string;
  created_at: string;
}

export interface CampaignListMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CampaignListResponse {
  success: boolean;
  message: string;
  meta: CampaignListMeta;
  data: CampaignListItem[];
  requestId?: string;
}

export interface CreateSmsPayload {
  campaign_name: string;
  audience: string;
  sender_id: string;
  sms_body: string;
  notification_type: string;
  schedule_type: string;
  action: string;
  scheduled_at?: string | null;
}

export interface CreateCampaignResponse {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data?: Record<string, unknown>;
  requestId?: string;
}

/** Props for CampaignActionMenu component */
export interface CampaignActionMenuProps {
  campaign: Campaign | RecentCampaignItem | CampaignListItem;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDuplicate?: (id: number) => void;
}

/** Props for VoucherActionMenu component */
export interface VoucherActionMenuProps {
  voucher: Voucher | ActiveVoucherItem;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onDuplicate: (id: number) => void;
}
