/**
 * SessionTypes.tsx
 * Shared TypeScript types and interfaces for the Sessions feature.
 * Centralizes all type definitions used across session components and API endpoints.
 */

/** Status filter options for session list */
export type SessionStatusFilter =
  | "all"
  | "open"
  | "ongoing"
  | "completed"
  | "full"
  | "cancelled"
  | string

/** Match type filter options for session list */
export type SessionMatchTypeFilter = "all" | "ranked" | "social" | string

/** Query parameters for fetching sessions list */
export interface SessionsListQuery {
  page?: number
  limit?: number
  status?: string
  match_type?: string
  search?: string
  session_visibility?: string
  session_type?: string
  match_date?: string
  staff_id?: number | string
  date_from?: string
  date_to?: string
  sort_by?: string
  sort_order?: "asc" | "desc"
}

/** Assigned staff on a session list item */
export interface SessionAssignedStaffSummary {
  id: number
  staff_name: string
  role_id?: number
  role_name?: string
  email?: string
  profile_image?: string | null
}

/** Price object in session list item */
export interface SessionPrice {
  amount: string
  display: string
}

/** Single session item in the list table */
export interface SessionsListItem {
  id: number
  session_id: string
  session_name: string
  date: string
  time: string
  date_time?: string
  assigned_staff?: SessionAssignedStaffSummary[]
  assign_staff?: string
  match_type: string
  match_type_display: string
  player: string
  booked: string
  price: SessionPrice | number | string
  status: string
  status_display: string
  disabled?: boolean
}

/** API response structure for sessions list */
export interface SessionsListResponse {
  meta: {
    page: number
    limit: number
    total: number
    totalPage: number
    filters?: {
      search?: string
      match_type?: string
      session_visibility?: string
      session_type?: string
      status?: string
      match_date?: string
      staff_id?: string
      date_from?: string
      date_to?: string
      sort_by?: string
      sort_order?: string
    }
  }
  data: SessionsListItem[]
}

/** Staff member from GET /api/session/owner/sessions/staff/ */
export interface SessionStaffItem {
  id: number
  staff_name: string
  email: string
  phone: string
  profile_image: string | null
  role_id: number
  role_name: string
  active_sessions: number
  is_active: boolean
}

/** Response for GET /api/session/owner/sessions/staff/ */
export interface SessionStaffListResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: SessionStaffItem[]
  requestId?: string
}

/** Payload for POST /api/session/owner/sessions/{id}/assign-staff/ */
export interface AssignStaffPayload {
  staff_ids: number[]
}

/** Response for POST /api/session/owner/sessions/{id}/assign-staff/ */
export interface AssignStaffResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    session_id: number
    session_name: string
    assigned_staff: Array<{
      id: number
      staff_name: string
      email?: string
      profile_image?: string | null
      role_id?: number
      role_name?: string
    }>
  }
  requestId?: string
}

/** Player data within a session team */
export interface SessionTeamPlayer {
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

/** Detailed session response with team players from GET /api/session/owner/sessions/{id}/ */
export interface SessionDetailsResponse {
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
    team_a_name: string | null
    team_b_name: string | null
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
        name: string | null
        logo: string | null
        score: number
      }
      team_b: {
        name: string | null
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

/** Session info response for info sheet GET /api/session/owner/sessions/{id}/info/ */
export interface SessionInfoResponse {
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
  requestId?: string
}

/** Response for match start POST /api/session/owner/sessions/{id}/start/ */
export interface SessionStartMatchResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    id: number
    status: string
    status_display: string
  }
  requestId?: string
}

/** Response for match cancel PATCH /api/session/owner/sessions/{id}/cancel/ */
export interface SessionCancelMatchResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    id: number
    status: string
    status_display: string
  }
  requestId?: string
}

/** Player info response for player details sheet GET /api/session/owner/sessions/{sessionId}/players/{bookingId}/ */
export interface SessionPlayerInfoResponse {
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
  requestId?: string
}

/** Payload for checking in players POST /api/session/owner/sessions/{id}/check-in/ */
export interface SessionCheckInPayload {
  booking_ids: number[]
}

/** Response for checking in players */
export interface SessionCheckInResponse {
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
  requestId?: string
}

/** Payload for submitting session result POST /api/session/owner/sessions/{id}/submit-result/ */
export type SessionSubmitResultPayload =
  | {
      team_a_result: "win" | "loss" | "draw" | string
      team_b_result: "win" | "loss" | "draw" | string
    }
  | {
      players: Array<{
        booking_id: number
        result: "win" | "loss" | "draw" | string
      }>
    }

/** Response for submitting session result */
export interface SessionSubmitResultResponse {
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
  requestId?: string
}

/** Response for creating a session POST /api/session/owner/sessions/create/ */
export interface CreateSessionResponse {
  success: boolean
  message: string
  data: {
    id: number
    team_a_logo?: string | null
    team_b_logo?: string | null
    session_name: string
    field_name?: string
    field_type?: string
    game_type?: string
    match_type: string
    session_visibility: string
    description: string
    match_date: string
    start_time: string
    start_time_period: string
    end_time: string
    end_time_period: string
    duration?: number
    booking_cut_off_time: number
    booking_cut_off_unit: string
    team_a_player: number
    team_b_player: number
    session_type: string
    team_a_name?: string | null
    team_b_name?: string | null
    entry_fee: number
    team_a_score?: number
    team_b_score?: number
    status: string
    owner?: number
  }
}

/** Result summary response GET /api/session/owner/sessions/{id}/result-summary/ */
export interface SessionResultSummaryResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    session_id: string
    session_name: string
    match_date: string
    time: string
    field_name: string
    champion: string | null
    team_a: {
      name: string | null
      logo: string | null
      score: number
      result: string
      result_display: string
    }
    team_b: {
      name: string | null
      logo: string | null
      score: number
      result: string
      result_display: string
    }
  }
  requestId?: string
}

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
  status?: string
  matchType?: string
  onStatusChange: (status: string) => void
  onMatchTypeChange: (matchType: string) => void
}

/** Props for SessionInfoSheet component */
export interface SessionInfoSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: number | null
  onMatchStatusChange?: () => void
  onViewResultSummary?: () => void
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
  onSuccess?: () => void
}

/** Props for AssignStaffSheet component */
export interface AssignStaffSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: number | null
  sessionName?: string
  currentStaffIds?: number[]
  onAssigned?: () => void
}

/** Props for SessionConfirmModal component */
export interface SessionConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  type: "assign" | "cancel"
}

/** Props for SessionResultSummaryModal component */
export interface SessionResultSummaryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: number | null
}
