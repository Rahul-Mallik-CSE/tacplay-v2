"use client"

import React from "react"

// ============================================================================
// Admin Player API Response Types
// ============================================================================

export interface PlayerActionPayload {
  action: "disable" | "activate" | string
}

export interface PlayerApiAction {
  key: string
  label: string
  method: "GET" | "POST" | "PATCH" | "DELETE" | string
  endpoint: string
  payload?: PlayerActionPayload
}

export interface PlayerMembershipInfo {
  type: string
  display: string
  plan_id?: number
  plan_name: string
  plan_code?: string
}

export interface PlayerRankInfo {
  value: number
  display: string
  score: number
}

export interface PlayerJoinedInfo {
  datetime: string
  date_display: string
  time_display: string
}

export interface PlayerLastActiveInfo {
  datetime: string | null
  display: string
}

export interface PlayerStatusInfo {
  value: string
  display: string
  is_active: boolean
}

export interface AdminPlayerListItem {
  user_id: number
  display_id: string
  full_name: string
  email: string
  country: string
  session_played?: number
  matches_played?: number
  total_spent?: string
  status: string
  subscription_plan: string
  can_view: boolean
  profile_image: string | null
  player_id: string
  user: {
    id: number
    display_id: string
    name: string
    email: string
    profile_image: string | null
  }
  country_info: {
    name: string
    code: string | null
  }
  membership: PlayerMembershipInfo
  rank: PlayerRankInfo
  joined: PlayerJoinedInfo
  last_active: PlayerLastActiveInfo
  status_info: PlayerStatusInfo
  actions?: PlayerApiAction[]
}

export interface PlayerFilterOption {
  label: string
  value: string
}

export interface PlayerSortOption {
  label: string
  sort_by: string
  order: "asc" | "desc"
}

export interface PlayerListFiltersMeta {
  selected: {
    status: string | null
    membership: string | null
    country: string | null
  }
  options: {
    status: PlayerFilterOption[]
    membership: PlayerFilterOption[]
    country: PlayerFilterOption[]
  }
}

export interface PlayerListSortingMeta {
  selected: {
    sort_by: string
    order: "asc" | "desc"
  }
  options: PlayerSortOption[]
}

export interface PlayerListMeta {
  page: number
  limit: number
  total: number
  totalPage: number
  search: string
  filters?: PlayerListFiltersMeta
  sorting?: PlayerListSortingMeta
  table?: {
    title: string
    columns: string[]
  }
}

export interface AdminPlayerListResponse {
  success: boolean
  message: string
  meta: PlayerListMeta
  data: AdminPlayerListItem[]
  requestId?: string
}

export interface AdminPlayerQueryParams {
  search?: string
  status?: string
  membership?: string
  country?: string
  sort_by?: string
  order?: "asc" | "desc"
  page?: number
  limit?: number
}

// ============================================================================
// Player Detail API Types
// ============================================================================

export interface PlayerUserDetail {
  id: number
  display_id: string
  full_name: string
  email: string
  contact_number: string | null
  location: string | null
  country: string | null
  gender: string | null
  profile_image: string | null
  status: string
  joined_at: string
  username: string
  username_display: string
  member_since: string
}

export interface PlayerStatMetric {
  value: number
  label: string
  display?: string
}

export interface PlayerStatsDetail {
  subscription_plan: string
  total_match_play?: number
  booking: PlayerStatMetric
  rank: PlayerStatMetric
  points: PlayerStatMetric
  team: PlayerStatMetric
}

export interface PlayerMatchHistoryItem {
  booking_id: number
  display_booking_id: string
  player_name: string
  session_date: string
  match_type: string
  payment_amount: string
  check_in_status: string
  status: string
  payment_status: string
  field_name: string
  session_name: string
  team: string
  can_view: boolean
}

export interface PlayerOwnerInfo {
  id: number
  name: string
  email: string
}

export interface PlayerInfoDetail {
  player_name: string
  username: string
  username_display: string
  player_id: string
  player_owner?: PlayerOwnerInfo | null
  plan: {
    type: string
    display: string
    plan_name: string
    plan_code?: string
  }
  email: string
  contact_number: string | null
  member: string
  country: string
  location: string
  status: string
}

export interface PlayerProfileSummary {
  name: string
  username: string
  username_display: string
  location: string | null
  profile_image: string | null
}

export interface PlayerDetailActions {
  block_player?: {
    key: string
    label: string
    method: string
    endpoint: string
    payload: {
      action: "disable" | "activate"
    }
  }
  upgrade_plan?: {
    key: string
    label: string
    available: boolean
    player_id: number
    current_plan: {
      type: string
      display: string
      plan_name: string
      plan_code: string
    }
  }
}

export interface AdminPlayerDetailData {
  user: PlayerUserDetail
  stats: PlayerStatsDetail
  match_history: PlayerMatchHistoryItem[]
  player_info: PlayerInfoDetail
  profile_summary: PlayerProfileSummary
  actions?: PlayerDetailActions
}

export interface AdminPlayerDetailResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: AdminPlayerDetailData
  requestId?: string
}

// Status update
export interface UpdatePlayerStatusPayload {
  action: "disable" | "activate"
}

export interface UpdatePlayerStatusResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    user_id: number
    is_active: boolean
  }
  requestId?: string
}

// ============================================================================
// Legacy UI Component Types (Kept for backwards compatibility)
// ============================================================================

export interface Player {
  id: number
  name: string
  email: string
  userId: string
  countryCode: string
  membership: "Premium" | "Free" | string
  rank: number
  joined: string
  lastActive: string
  status: "Active" | "Block" | "Blocked" | string
  avatar: string
  username: string
  location: string
  bookings: number
  points: number
  teams: number
  playerId: string
  ownerName: string
  contactNumber: string
  memberSince: string
}

export interface PlayerSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export interface PlayerMembershipBadgeProps {
  membership: "Premium" | "Free" | string
  size?: "sm" | "md"
}

export interface PlayerStatusBadgeProps {
  status: "Active" | "Block" | "Blocked" | string
  size?: "sm" | "md"
}

export interface PlayerCountryFlagProps {
  countryCode?: string | null
  countryName?: string | null
  size?: "sm" | "md"
}

export interface PlayerActionDropdownProps {
  player: AdminPlayerListItem | Player
  onViewDetails: (player: AdminPlayerListItem | Player) => void
  onToggleStatus: (player: AdminPlayerListItem | Player) => void
  onBlockPlayer?: (player: AdminPlayerListItem | Player) => void
}

export interface PlayerDetailsSheetProps {
  playerId: number | null
  player?: AdminPlayerListItem | Player | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onToggleStatus: (player: AdminPlayerListItem | Player) => void
  onBlockPlayer?: (player: AdminPlayerListItem | Player) => void
  onUpgradePlan?: (player: AdminPlayerListItem | Player) => void
}

export interface UpgradePlanModalProps {
  player: AdminPlayerListItem | Player | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export interface PlayerStatusConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  player: AdminPlayerListItem | Player | null
  targetAction: "disable" | "activate"
  onConfirm: () => void
  isLoading?: boolean
}
