/**
 * SessionTypes.tsx
 * Shared TypeScript types and interfaces for the Sessions feature.
 * Centralizes all type definitions used across session components.
 */

/** Status filter options for session list */
export type SessionStatusFilter =
  | "all"
  | "open"
  | "ongoing"
  | "completed"
  | "cancelled"

/** Match type filter options for session list */
export type SessionMatchTypeFilter = "all" | "ranked" | "social"

/** Query parameters for fetching sessions list */
export type SessionsListQuery = {
  page: number
  limit: number
  status?: SessionStatusFilter
  match_type?: SessionMatchTypeFilter
}

/** Single session item in the list table */
export type SessionsListItem = {
  id: number
  session_id: string
  session_name: string
  date: string
  time: string
  match_type: string
  match_type_display: string
  player: string
  booked: string
  status: string
  status_display: string
}

/** API response structure for sessions list */
export type SessionsListResponse = {
  meta: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
  data: SessionsListItem[]
}

/** Detailed session response with team players */
export type SessionDetailsResponse = {
  success: boolean
  data: {
    id: number
    session_id: string
    session_name: string
    match_type: string
    match_type_display: string
    session_visibility: string
    description: string
    match_date: string
    start_time: string
    start_time_period: string
    end_time: string
    end_time_period: string
    time: string
    duration: number
    booking_cut_off_time: number
    booking_cut_off_unit: string
    team_a_player: number
    team_b_player: number
    session_type: string
    team_a_name: string
    team_b_name: string
    team_a_logo: string | null
    team_b_logo: string | null
    entry_fee: number
    team_a_score: number
    team_b_score: number
    status: string
    status_display: string
    owner: number
    top_summary: {
      team_a: {
        name: string
        logo: string | null
        score: number
      }
      team_b: {
        name: string
        logo: string | null
        score: number
      }
      team_full: {
        booked_display: string
        team_a_booked: number
        team_b_booked: number
        team_a_capacity: number
        team_b_capacity: number
        team_a_display: string
        team_b_display: string
      }
    }
    team_a_players: SessionTeamPlayer[]
    team_b_players: SessionTeamPlayer[]
  }
}

/** Player data within a session team */
export type SessionTeamPlayer = {
  player_id: number
  booking_id: number
  name: string
  image: string | null
  wins: {
    count: number
    points: number
  }
  losses: {
    count: number
    points: number
  }
  draws: {
    count: number
    points: number
  }
  rank: number
  score: number
  score_display: string
  email: string
  season_points: number
  checked_in: boolean
  checked_in_at: string | null
  result: string
  result_display: string
  awarded_score: number
}

/** Session info response for info sheet */
export type SessionInfoResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    status: string
    status_display: string
    field_info: {
      field_id: string
      field_name: string
      location: string
      contact_number: string
    }
    session_info: {
      session_id: string
      session_name: string
      match_type: string
      match_type_display: string
      session_date: string
      time: string
      session_type: string
      team: string | null
      player_per_team: string
      packages: string
    }
    team_info: {
      team_a_name: string
      team_a_score: number
      team_b_name: string
      team_b_score: number
      champion: string
      team_a_booked: number
      team_b_booked: number
      team_a_capacity: number
      team_b_capacity: number
    }
    actions: {
      can_start_match: boolean
      can_submit_final_result: boolean
      can_cancel_match: boolean
      primary_button: string
    }
  }
  requestId: string
}

/** Player info response for player details sheet */
export type SessionPlayerInfoResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    session_id: number
    booking_id: number
    session_type: string
    session_type_display: string
    session_status: string
    session_status_display: string
    player_info: {
      team_name: string
      player_id: string
      player_name: string
      email: string
      contact_number: string
    }
    booking_info: {
      booking_id: string
      transaction_id: string
      amount: string
      platform_fee: string
      net_profit: string
      payment_method: string
      date_time: string
      payment_status: string
    }
    score_management: {
      checked_in: boolean
      checked_in_at: string | null
      result: string
      result_display: string
      awarded_score: number
      show_result_selector: boolean
      show_check_in_button: boolean
      show_submit_button: boolean
    }
  }
  requestId: string
}

/** Action response for session operations */
export type SessionActionResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    id: number
    status: string
    status_display: string
  }
  requestId: string
}

/** Payload for submitting session result */
export type SessionSubmitResultPayload =
  | {
      team_a_result: "win" | "loss" | "draw"
      team_b_result: "win" | "loss" | "draw"
    }
  | {
      players: Array<{
        booking_id: number
        result: "win" | "loss" | "draw"
      }>
    }

/** Response for submitting session result */
export type SessionSubmitResultResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    id: number
    status: string
    status_display: string
    team_a_score?: number
    team_b_score?: number
    champion?: string | null
  }
  requestId: string
}

/** Payload for checking in players */
export type SessionCheckInPayload = {
  booking_ids: number[]
}

/** Response for checking in players */
export type SessionCheckInResponse = {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    id: number
    status: string
    status_display: string
    checked_in_count: number
    total_player_count: number
    checked_in_display: string
  }
  requestId: string
}

/** Response for creating a session */
export type CreateSessionResponse = {
  success: boolean
  message: string
  data: {
    id: number
    team_a_logo: string | null
    team_b_logo: string | null
    session_name: string
    match_type: string
    session_visibility: string
    description: string
    match_date: string
    start_time: string
    start_time_period: string
    end_time: string
    end_time_period: string
    duration: number
    booking_cut_off_time: number
    booking_cut_off_unit: string
    team_a_player: number
    team_b_player: number
    session_type: string
    team_a_name: string | null
    team_b_name: string | null
    entry_fee: number
    team_a_score: number
    team_b_score: number
    status: string
    owner: number
  }
}

/** Payload for creating a session (FormData) */
export type CreateSessionPayload = FormData

/** Props for SessionMatchTypeDot component */
export interface SessionMatchTypeDotProps {
  type: string
}

/** Props for SessionStatusBadge component */
export interface SessionStatusBadgeProps {
  status: string
}

/** Props for SessionFilters component */
export interface SessionFiltersProps {
  status: SessionStatusFilter
  matchType: SessionMatchTypeFilter
  onStatusChange: (status: SessionStatusFilter) => void
  onMatchTypeChange: (matchType: SessionMatchTypeFilter) => void
}

/** Props for SessionInfoSheet component */
export interface SessionInfoSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: number | null
}

/** Props for EditSessionSheet component */
export interface EditSessionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: number | null
}

/** Props for PlayerDetailsSheet component */
export interface PlayerDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: number | null
  bookingId: number | null
}
