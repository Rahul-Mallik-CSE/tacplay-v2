/**
 * BookingListTypes.tsx
 * Shared TypeScript types and interfaces for the Booking List feature.
 * Centralizes all type definitions used across booking list components.
 */

/** Query parameters for fetching booking list */
export type BookingListQuery = {
  page?: number
  limit?: number
  search?: string
  status?: string
  team?: string
  match_type?: string
  session_id?: number | string
  date_from?: string
  date_to?: string
  package_id?: number | string
  check_in_status?: string | string[]
  sort_by?: string
  sort_order?: "asc" | "desc"
}

/** Pagination metadata from API response */
export type BookingListMeta = {
  page: number
  limit: number
  total: number
  totalPage: number
  filters?: {
    search?: string
    status?: string
    team?: string
    match_type?: string
    session_id?: string
    date_from?: string
    date_to?: string
    package_id?: string
    check_in_status?: string | string[]
    sort_by?: string
    sort_order?: string
  }
}

/** Single booking item in the list table */
export type BookingListItem = {
  booking_id: number
  display_booking_id: string
  player_name: string
  player_id: number
  display_player_id: string
  player_email: string
  session_id: number
  session_name: string
  field_name: string
  match_date: string
  booking_date: string
  booking_flow: string
  match_type: string
  team: string
  team_display: string
  player_count: number
  package_id?: number | null
  package_name?: string | null
  check_in_status: "pending" | "checked_in" | "no_show" | string
  check_in_status_display?: string
  checked_in?: boolean
  checked_in_at?: string | null
  amount: string
  amount_display: string
  payment_status: "unpaid" | "pending" | "paid" | "failed" | string
  status: "unpaid" | "pending" | "paid" | "failed" | string
  can_view: boolean
}

/** API response structure for booking list */
export type BookingListResponse = {
  success: boolean
  message: string
  meta: BookingListMeta
  data: BookingListItem[]
  requestId: string
}

/** Detailed booking data model */
export type BookingDetailsData = {
  booking: {
    id: number
    display_booking_id: string
    status: string
    payment_status: string
    payment_reference?: string | null
    transaction_id?: string | null
    booking_flow: string
    team: string
    team_display: string
    player_count: number
    created_at: string
    paid_at?: string | null
    confirmed_at?: string | null
    cancellation_reason?: string | null
    cancelled_at?: string | null
    date_time?: string
  }
  player: {
    id: number
    display_player_id: string
    full_name: string
    email: string
    contact_number: string | null
    location?: string | null
    profile_image: string | null
  }
  session: {
    id: number
    session_name: string
    field_name: string
    match_type: string
    package_name?: string | null
    session_visibility?: string
    match_date: string
    start_time: string
    end_time: string
    team_a_name?: string | null
    team_b_name?: string | null
    entry_fee: string
    status: string
  }
  payment: {
    entry_fee_total?: string
    package_fee?: string
    commission_rate?: string
    commission_amount?: string
    net_profit?: string
    total_amount: string
    total_amount_display: string
    currency: string
    payment_method: string
  }
  package: {
    id: number
    package_name: string
    package_fee: string
    description: string
    include_items: string[]
  } | null
  selected_players: Array<{
    id: number
    full_name: string
    email: string
    profile_image: string | null
  }>
  session_booking?: {
    id: number
    status: string
    paid_amount: string
    payment_status: string
    checked_in?: boolean
    checked_in_at?: string | null
    no_show?: boolean
  }
}

/** Detailed booking response with nested objects */
export type BookingDetailsResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: BookingDetailsData
  requestId: string
}

/** Props for BookingStatusBadge component */
export interface BookingStatusBadgeProps {
  status: string
  size?: "sm" | "md"
}

/** Props for BookingMatchTypeDot component */
export interface BookingMatchTypeDotProps {
  type: string
}

/** Props for BookingInfoRow component */
export interface BookingInfoRowProps {
  label: string
  value: React.ReactNode
}

/** Props for BookingSearchBar component */
export interface BookingSearchBarProps {
  value: string
  onChange: (value: string) => void
}

/** Props for BookingDetailsSheet component */
export interface BookingDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingId: number | null
}

/** Response structure for booking cancellation */
export interface CancelBookingResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    booking_id: number
    status: string
    payment_status: string
    cancellation_reason: string
    cancelled_at: string
    cancelled_player_ids: number[]
    session_bookings_cancelled: number
  }
  requestId: string
}

/** Response structure for booking player check-in */
export interface CheckInBookingResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    booking_id: number
    session_id: number
    check_in_status: string
    check_in_status_display: string
    checked_in_players: Array<{
      session_booking_id: number
      player_id: number
      player_name: string
      checked_in: boolean
      checked_in_at: string
    }>
  }
  requestId: string
}

/** Props for BookingDetailsConfirmDialog component */
export interface BookingDetailsConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading?: boolean
}

/** Props for BookingCancelDialog component */
export interface BookingCancelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string) => void
  isLoading?: boolean
}
