/**
 * ScoreManagementTypes.tsx
 * Type definitions for Admin Player Score Settings.
 * Centralizes all data models and payload types for:
 * - GET /api/admin/player-score-setting/
 * - POST /api/admin/player-score-setting/
 * - PATCH /api/admin/player-score-setting/
 */

export interface PlayerScoreSettingData {
  exists: boolean
  id?: number
  win_score: number
  loss_score: number
  draw_score: number
  created_at?: string
  updated_at?: string
}

export interface PlayerScoreSettingResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: PlayerScoreSettingData
  requestId?: string
}

export interface CreatePlayerScoreSettingPayload {
  win_score: number
  loss_score: number
  draw_score: number
}

export interface UpdatePlayerScoreSettingPayload {
  win_score?: number
  loss_score?: number
  draw_score?: number
}
