/**
 * EarningsTypes.tsx
 * Shared TypeScript types and interfaces for the Earnings feature.
 * Centralizes all type definitions used across earnings components.
 */

/** Query parameters for fetching earnings list */
export type EarningsListQuery = {
  page: number
  limit: number
  search?: string
}

/** Earnings summary statistics */
export type EarningsSummary = {
  total_revenue: string
  total_revenue_display: string
  paid_transactions: number
}

/** Pagination metadata from API response */
export type EarningsMeta = {
  page: number
  limit: number
  total: number
  totalPage: number
  filters: {
    search: string
    plan: string
    payment_method: string
    currency: string
    session_id: string
    session_type: string
    date_from: string
    date_to: string
    amount_min: string
    amount_max: string
  }
  sorting: {
    sort_by: string
    order: string
  }
  summary: EarningsSummary
}

/** Single earnings item in the list table */
export type EarningsListItem = {
  transaction_id: number
  display_transaction_id: string
  payment_reference: string
  user_name: string
  user_id: number
  display_user_id: string
  user_email: string
  plan: string
  session_id: number
  display_session_id: string
  session_name: string
  session_type: string
  session_type_display: string
  amount: string
  amount_display: string
  currency: string
  date: string
  date_display: string
  field_name: string
  payment_method: string
  payment_method_display: string
  payment_status: string
  status: string
  can_view: boolean
}

/** API response structure for earnings list */
export type EarningsListResponse = {
  success: boolean
  message: string
  meta: EarningsMeta
  data: EarningsListItem[]
  requestId: string
}

/** Detailed transaction response with nested objects */
export type TransactionDetailsResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    transaction_details: {
      title: string
      subtitle: string
      status: string
      status_display: string
      player_info: {
        booking_id: number
        display_booking_id: string
        session_id: number
        display_session_id: string
        player_name: string
        player_id: number
        display_player_id: string
        email: string
      }
      payment_info: {
        transaction_id: number
        display_transaction_id: string
        amount: string
        amount_display: string
        platform_fee_label: string
        platform_fee: string
        platform_fee_display: string
        net_profit: string
        net_profit_display: string
        payment_method: string
        payment_method_display: string
        date_time: string
        date_time_display: string
      }
      actions: {
        cancel_button_text: string
        download_button_text: string
        can_download: boolean
        can_print: boolean
      }
    }
  }
  requestId: string
}

/** Type alias for earnings transaction */
export type EarningsTransaction = EarningsListItem

/** Props for EarningPaymentBadge component */
export interface EarningPaymentBadgeProps {
  method: string
}

/** Props for EarningMatchTypeDot component */
export interface EarningMatchTypeDotProps {
  type: string
}

/** Props for EarningInfoRow component */
export interface EarningInfoRowProps {
  label: string
  value: React.ReactNode
}

/** Props for EarningSearchBar component */
export interface EarningSearchBarProps {
  value: string
  onChange: (value: string) => void
}

/** Props for TransactionDetailsSheet component */
export interface TransactionDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transactionId: number | null
}
