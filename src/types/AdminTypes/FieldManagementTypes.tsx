"use client"

// ==========================================
// Field Owner List Types
// ==========================================

export interface FieldOwnerSubscription {
  id: number
  name: string
  full_name: string
  code: string
  billing_cycle: string
  price: string
  currency: string
}

export interface FieldOwnerCountryInfo {
  id: number
  name: string
  code: string
}

export interface FieldOwnerBookingStats {
  count: number
  change: {
    value: number
    display: string
    direction: "up" | "down" | "same" | string
    is_positive: boolean
  }
  current_month: number
  previous_month: number
}

export interface FieldOwnerRevenue {
  value: string
  currency: string
  display: string
}

export interface FieldOwnerAction {
  key: string
  label: string
  method: string
  endpoint: string
  payload?: {
    action?: string
    [key: string]: unknown
  }
}

export interface FieldOwnerNestedField {
  id: number
  display_id: string
  field_name: string
  description: string
  image: string | null
}

export interface FieldOwnerNestedOwner {
  id: number
  name: string
  email: string
}

export interface FieldOwnerItem {
  user_id: number
  display_id: string
  owner_name: string
  field_name: string
  email: string
  country: string
  apply_date: string
  status: "approved" | "pending" | "suspended" | "flagged" | string
  can_view: boolean
  field: FieldOwnerNestedField
  owner: FieldOwnerNestedOwner
  subscription: FieldOwnerSubscription
  country_info: FieldOwnerCountryInfo
  created_at: string
  booking: FieldOwnerBookingStats
  revenue: FieldOwnerRevenue
  actions: FieldOwnerAction[]
}

export interface FilterOption {
  label: string
  value: string
}

export interface FieldOwnerListMeta {
  page: number
  limit: number
  total: number
  totalPage: number
  search?: string
  filters?: {
    selected?: {
      status?: string | null
      subscription?: string | null
      country?: string | null
    }
    options?: {
      status?: FilterOption[]
      subscription?: FilterOption[]
      country?: FilterOption[]
    }
  }
  sort?: {
    selected?: string
    options?: FilterOption[]
  }
}

export interface FieldOwnerListResponse {
  success: boolean
  message: string
  meta: FieldOwnerListMeta
  data: FieldOwnerItem[]
  requestId?: string
}

export interface FieldOwnerQueryParams {
  search?: string
  status?: string
  subscription?: string
  country?: string
  sort?: string
  page?: number
  limit?: number
}

// ==========================================
// Field Owner Status Update Types
// ==========================================

export type FieldOwnerStatusAction = "approve" | "suspend" | "activate"

export interface UpdateFieldOwnerStatusPayload {
  action: FieldOwnerStatusAction | string
}

export interface UpdateFieldOwnerStatusResponse {
  success: boolean
  message: string
  data?: unknown
}

// ==========================================
// Field Owner Details Types
// ==========================================

export interface FieldOwnerDetailUser {
  id: number
  display_id: string
  full_name: string
  email: string
  contact_number: string
  country: string
  profile_image: string | null
  status: string
  joined_at: string
  member_display: string
}

export interface FieldOwnerDetailField {
  id: number
  field_name: string
  description: string
  full_address: string
  business_name: string
  business_type: string
  approval_status: string
  submitted_at: string
  approved_at: string | null
  rejection_reason: string | null
  display_id: string
  image: string | null
  city: string
  country: string
  location_display: string
}

export interface FieldOwnerDetailStats {
  subscription_plan: string
  subscription_assigned_by: string
  is_admin_assigned: boolean
  adminAssignedBy: string | null
  total_session: number
  rank_match: number
  social_match: number
  total_revenue: string
  rating: {
    value: number | null
    display: string | null
    available: boolean
  }
  total_bookings: {
    value: number
    label: string
  }
  total_revenue_v2: {
    value: string
    currency: string
    display: string
    label: string
  }
  check_in_rate: {
    value: number
    display: string
    checked_in: number
    total_players: number
    label: string
  }
}

export interface FieldOwnerDetailFieldInfo {
  field_name: string
  field_id: string
  field_owner: string
  plan: {
    name: string
    plan_id: number
    code: string
  }
  email: string
  contact_number: string
  member: string
}

export interface FieldOwnerDetailFieldSummary {
  field_name: string
  location: string
  image: string | null
}

export interface UpgradePlanOption {
  id: number
  name: string
  code: string
  billing_cycle: string
  price: string
  currency: string
  is_premium: boolean
}

export interface FieldOwnerDetailActions {
  view_all_sessions?: {
    key: string
    label: string
    method: string
    endpoint: string
  }
  field_status?: {
    key: string
    label: string
    method: string
    endpoint: string
    payload: {
      action: string
    }
  }
  upgrade_plan?: {
    key: string
    label: string
    available: boolean
    current_plan: string
    plans: UpgradePlanOption[]
  }
}

export interface FieldOwnerSessionHistoryItem {
  session_id: number
  display_session_id: string
  session_name: string
  field_id: string
  player: string
  amount: string
  status: string
  can_view: boolean
  match_type: string
  match_date: string
  start_time: string
  end_time: string
}

export interface FieldOwnerDetailData {
  user: FieldOwnerDetailUser
  field: FieldOwnerDetailField
  stats: FieldOwnerDetailStats
  field_info: FieldOwnerDetailFieldInfo
  field_summary: FieldOwnerDetailFieldSummary
  actions: FieldOwnerDetailActions
  session_history: FieldOwnerSessionHistoryItem[]
}

export interface FieldOwnerDetailResponse {
  success: boolean
  message: string
  meta: {
    page?: number
    limit?: number
    total?: number
  }
  data: FieldOwnerDetailData
  requestId?: string
}

// ==========================================
// Admin Session Management Types
// ==========================================

export interface AdminSessionQueryParams {
  search?: string
  status?: string
  match_type?: string
  date?: string
  page?: number
  limit?: number
}

export interface AdminSessionStaff {
  id: number
  name: string
  email: string
  role: string
  profile_image: string | null
}

export interface AdminSessionField {
  id: number
  field_name: string
}

export interface AdminSessionDateTime {
  date: string
  date_display: string
  start_time: string
  start_time_display: string
  end_time: string
  end_time_display: string
  display: string
}

export interface AdminSessionMatchType {
  value: string
  display: string
}

export interface AdminSessionPlayerCapacity {
  booked: number
  capacity: number
  display: string
}

export interface AdminSessionBooked {
  count: number
  capacity: number
  display: string
}

export interface AdminSessionPrice {
  value: string
  currency: string
  display: string
}

export interface AdminSessionListItem {
  id: number
  session_id?: string
  display_session_id?: string
  session_name: string
  field_id?: string
  field?: AdminSessionField
  field_name?: string
  player?: string
  amount?: string
  status: string
  status_display?: string
  date_time?: AdminSessionDateTime
  assigned_staff?: AdminSessionStaff | null
  match_type: AdminSessionMatchType | string
  player_capacity?: AdminSessionPlayerCapacity
  booked?: AdminSessionBooked | string
  price?: AdminSessionPrice | string | number
  can_view?: boolean
  date?: string
  time?: string
  match_date?: string
  start_time?: string
  end_time?: string
  assign_staff?: string
  assignStaff?: string
  matchType?: string
}

export interface AdminSessionListResponse {
  success: boolean
  message: string
  meta: {
    page: number
    limit: number
    total: number
    totalPage: number
    search?: string
    filters?: {
      selected?: Record<string, unknown>
      options?: Record<string, FilterOption[]>
    }
  }
  data: AdminSessionListItem[]
  requestId?: string
}

export interface AdminSessionSummary {
  session_id: string
  session_name: string
  status: string
  status_display: string
  team_full_text: string
  team_a_booked: number
  team_b_booked: number
  team_a_limit: number
  team_b_limit: number
  match_clock_text: string
  match_date: string
  start_time: string
  end_time: string
}

export interface ScoreboardTeam {
  name: string
  logo: string | null
  score: number
  player_count: number
  player_limit: number
}

export interface AdminSessionScoreboard {
  left_team: ScoreboardTeam
  middle: {
    team_full_text: string
    session_code: string
    match_clock_text: string
  }
  right_team: ScoreboardTeam
}

export interface AdminSessionGeneralInfo {
  id: number
  session_name: string
  field_name: string
  field_location: string
  entry_fee_with_currency: string
  status: string
  status_display: string
  team_a_name: string
  team_b_name: string
  team_a_score: number
  team_b_score: number
}

export interface AdminSessionPlayerItem {
  booking_id: number
  player_id: number
  player_name: string
  player_avatar: string | null
  team: string
  result: string
  awarded_score: number
  card_stats?: {
    win: number
    loss: number
    draw: number
    played: number
    rank: number
    score: string
  }
}

export interface AdminSessionStats {
  team_a_count: number
  team_b_count: number
  total_bookings: number
  team_full_text: string
  team_a_limit: number
  team_b_limit: number
  total_capacity: number
}

export interface AdminSessionDetailData {
  session_summary: AdminSessionSummary
  scoreboard: AdminSessionScoreboard
  session: AdminSessionGeneralInfo
  team_a_players: AdminSessionPlayerItem[]
  team_b_players: AdminSessionPlayerItem[]
  stats: AdminSessionStats
}

export interface AdminSessionDetailResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: AdminSessionDetailData
  requestId?: string
}

// ==========================================
// Backward Compatible / UI Types
// ==========================================

export interface Field {
  id: number
  fieldName: string
  fieldId: string
  description: string
  ownerName: string
  ownerEmail: string
  plan: "Gold" | "Silver" | "Sliver" | "Bronze" | string
  countryCode: string
  createdDate: string
  createdTime: string
  booking: number
  bookingChange: number
  revenue: string
  image: string
  location: string
  rating: number
  totalBookings: number
  totalRevenue: string
  checkInRate: number
  contactNumber: string
  memberSince: string
  status?: string
}

export interface Session {
  id: number
  sessionName: string
  date: string
  time: string
  assignStaff: string
  matchType: string
  matchTypeColor: string
  player: string
  booked: string
  price: string
  status: "Failed" | "Booking" | "Full" | "Ongoing" | "Open" | "Completed" | "Cancelled" | string
}

export interface SessionDetail {
  id: number
  status: "Failed" | "Booking" | "Full" | "Ongoing" | "Open" | "Completed" | "Cancelled" | string
  fieldInfo: {
    fieldId: string
    fieldName: string
    location: string
    contactNumber: string
  }
  sessionInfo: {
    sessionId: string
    sessionName: string
    matchType: string
    matchTypeColor: string
    sessionDate: string
    time: string
    sessionType: string
    team: number
    playerPerTeam: string
    packages: string
  }
  teamInfo: {
    teamAName: string
    teamAScore: number
    teamBName: string
    teamBScore: number
    champion: string
  }
}

// ==========================================
// UI Component Props Types
// ==========================================

export interface FieldSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export interface FieldPlanBadgeProps {
  plan: "Gold" | "Silver" | "Sliver" | "Bronze" | string
  size?: "sm" | "md"
}

export interface FieldCountryFlagProps {
  countryCode: string
}

export interface FieldActionDropdownProps {
  field: FieldOwnerItem
  onViewDetails: (field: FieldOwnerItem) => void
  onStatusAction: (field: FieldOwnerItem, action: FieldOwnerStatusAction) => void
}

export interface FieldDetailsSheetProps {
  fieldId: number | null
  initialField?: FieldOwnerItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusAction: (userId: number, action: FieldOwnerStatusAction) => void
  onUpgradePlan?: (field: FieldOwnerDetailData | FieldOwnerItem) => void
  onViewAllSession: () => void
}

export interface UpgradeFieldPlanModalProps {
  field: FieldOwnerDetailData | FieldOwnerItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (plan: string) => void
}

export interface SessionSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export interface SessionStatusBadgeProps {
  status: string
  size?: "sm" | "md"
}

export interface SessionActionDropdownProps {
  session: AdminSessionListItem
  onViewDetails: (session: AdminSessionListItem) => void
}

export interface SessionDetailsSheetProps {
  sessionId: number | string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}
