"use client"

/**
 * SessionInfoSheet.tsx
 * Slide-out sheet component that displays comprehensive session information.
 * Integrated with:
 * - GET /api/session/owner/sessions/{id}/info/
 * - POST /api/session/owner/sessions/{id}/start/
 * - PATCH /api/session/owner/sessions/{id}/cancel/
 * - POST /api/session/owner/sessions/{id}/submit-result/
 */

import React, { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { ArrowLeft, Loader2, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import SessionInfoRow from "./SessionInfoRow"
import SessionResultSelector from "./SessionResultSelector"
import SessionInfoSheetLoading from "./SessionInfoSheetLoading"
import {
  useGetSessionInfoQuery,
  useStartMatchMutation,
  useCancelMatchMutation,
  useSubmitResultMutation,
} from "@/redux/features/dashboard/session/sessionAPI"
import type { SessionInfoSheetProps } from "@/types/DashboardTypes/SessionTypes"

function SessionInfoSheet({
  open,
  onOpenChange,
  sessionId,
  onMatchStatusChange,
  onViewResultSummary,
}: SessionInfoSheetProps) {
  const { t } = useTranslation("dashboard")
  const [teamAResult, setTeamAResult] = useState<"win" | "loss" | "draw">("win")

  // API query
  const {
    data: infoResponse,
    isLoading,
    isError,
    refetch,
  } = useGetSessionInfoQuery(sessionId ?? 0, {
    skip: !sessionId || !open,
  })

  // API mutations
  const [startMatch, { isLoading: isStarting }] = useStartMatchMutation()
  const [cancelMatch, { isLoading: isCancelling }] = useCancelMatchMutation()
  const [submitResult, { isLoading: isSubmittingResult }] = useSubmitResultMutation()

  const isSubmitting = isStarting || isCancelling || isSubmittingResult

  const details = infoResponse?.data
  const currentStatus = details?.status?.toLowerCase()
  const isOpenStatus = currentStatus === "open"
  const isOngoingStatus = currentStatus === "ongoing"
  const isCompletedStatus =
    currentStatus === "completed" || currentStatus === "complete"
  const isCancelledStatus =
    currentStatus === "cancelled" || currentStatus === "canceled"
  const isCompletedOrCancelled = isCompletedStatus || isCancelledStatus

  const teamBResult: "win" | "loss" | "draw" =
    teamAResult === "draw" ? "draw" : teamAResult === "win" ? "loss" : "win"

  const updateFromTeamA = (result: "win" | "loss" | "draw") => {
    setTeamAResult(result)
  }

  const updateFromTeamB = (result: "win" | "loss" | "draw") => {
    if (result === "draw") {
      setTeamAResult("draw")
      return
    }
    setTeamAResult(result === "win" ? "loss" : "win")
  }

  // Handle Match Start
  const handleStartMatch = async () => {
    if (!sessionId) return
    try {
      const res = await startMatch(sessionId).unwrap()
      toast.success(res.message || t("sessions.details.startedSuccess", "Match started successfully."))
      refetch()
      onMatchStatusChange?.()
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("sessions.details.startedFailed", "Failed to start match.")
      toast.error(errorMsg)
    }
  }

  // Handle Match Cancel
  const handleCancelMatch = async () => {
    if (!sessionId) return
    try {
      const res = await cancelMatch(sessionId).unwrap()
      toast.success(res.message || t("sessions.details.cancelledSuccess", "Match cancelled successfully."))
      refetch()
      onMatchStatusChange?.()
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("sessions.details.cancelledFailed", "Failed to cancel match.")
      toast.error(errorMsg)
    }
  }

  // Handle Team Result Submission
  const handleSubmitTeamResult = async () => {
    if (!sessionId) return
    try {
      const res = await submitResult({
        sessionId,
        payload: {
          team_a_result: teamAResult,
          team_b_result: teamBResult,
        },
      }).unwrap()
      toast.success(res.message || t("sessions.details.resultSuccess", "Final result submitted successfully."))
      refetch()
      onMatchStatusChange?.()
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("sessions.details.resultFailed", "Failed to submit final result.")
      toast.error(errorMsg)
    }
  }

  if (!open) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0 flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <SheetHeader className="p-5 pb-3 border-b border-white/5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onOpenChange(false)}
                className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-md border ${
                  isOpenStatus
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : isOngoingStatus
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                    : isCompletedStatus
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-secondary/20 text-secondary border-secondary/30"
                }`}
              >
                {details?.status_display || t("common.status")}
              </span>
            </div>
            <SheetTitle className="text-xl font-bold text-primary mt-2">
              {t("sessions.details.viewSessionInfo", "Session Information")}
            </SheetTitle>
            <SheetDescription className="text-sm text-secondary">
              {details?.session_info?.session_name ? `${details.session_info.session_name} - ` : ""}
              {t("sessions.details.title", "Session Details")}
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <div className="px-5 py-4">
            {isLoading ? (
              <SessionInfoSheetLoading />
            ) : isError || !details ? (
              <div className="p-8 text-center text-sm text-secondary">
                Failed to load session information.
              </div>
            ) : (
              <>
                {/* Field Info Section */}
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 text-custom-red">
                    {t("sessions.details.fieldInfo", "Field Info")}
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-3 border border-white/5">
                    <SessionInfoRow
                      label={t("sessions.details.fieldId", "Field ID")}
                      value={details.field_info.field_id}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.fieldName", "Field Name")}
                      value={details.field_info.field_name}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.location", "Location")}
                      value={details.field_info.location}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.contactNumber", "Contact Number")}
                      value={details.field_info.contact_number}
                    />
                  </div>
                </div>

                {/* Session Info Section */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 text-custom-red">
                    {t("sessions.details.sessionInfo", "Session Info")}
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-3 border border-white/5">
                    <SessionInfoRow
                      label={t("sessions.details.sessionId", "Session ID")}
                      value={details.session_info.session_id}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.matchType", "Match Type")}
                      value={
                        <span className="flex items-center gap-2 justify-end">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              details.session_info.match_type.toLowerCase() === "ranked"
                                ? "bg-custom-red"
                                : "bg-custom-yellow"
                            }`}
                          />
                          {details.session_info.match_type_display}
                        </span>
                      }
                    />
                    <SessionInfoRow
                      label={t("sessions.details.sessionDate", "Session Date")}
                      value={details.session_info.session_date}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.time", "Time")}
                      value={details.session_info.time}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.sessionType", "Session Type")}
                      value={details.session_info.session_type}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.team", "Team")}
                      value={details.session_info.team ?? "N/A"}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.playerPerTeam", "Player Per Team")}
                      value={details.session_info.player_per_team}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.packages", "Packages")}
                      value={details.session_info.packages}
                    />
                  </div>
                </div>

                {/* Team Info Section */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 text-custom-red">
                    {t("sessions.details.teamInfo", "Team Info")}
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-3 border border-white/5">
                    <SessionInfoRow
                      label={t("sessions.details.teamAName", "Team A Name")}
                      value={details.team_info.team_a_name || "Team A"}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.teamAScore", "Team A Score")}
                      value={String(details.team_info.team_a_score)}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.teamBName", "Team B Name")}
                      value={details.team_info.team_b_name || "Team B"}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.teamBScore", "Team B Score")}
                      value={String(details.team_info.team_b_score)}
                    />
                    <SessionInfoRow
                      label={t("sessions.details.champion", "Champion")}
                      value={details.team_info.champion || "---"}
                    />
                  </div>
                </div>

                {/* Result Selector for Ongoing Matches */}
                {isOngoingStatus && (
                  <div className="mt-5 space-y-3">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider text-custom-yellow">
                      {t("sessions.details.teamResult", "Score Giving / Result Submission")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <SessionResultSelector
                        title={details.team_info.team_a_name || "Team A"}
                        value={teamAResult}
                        onChange={updateFromTeamA}
                      />
                      <SessionResultSelector
                        title={details.team_info.team_b_name || "Team B"}
                        value={teamBResult}
                        onChange={updateFromTeamB}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {details && (
          <SheetFooter className="px-5 py-4 border-t border-white/5 flex-row gap-3">
            {isOpenStatus && (
              <>
                <Button
                  onClick={handleCancelMatch}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-transparent rounded-lg border border-custom-red/40 text-custom-red text-sm font-medium hover:bg-custom-red/10 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isCancelling ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    t("sessions.details.matchCancel", "Match Cancel")
                  )}
                </Button>
                <Button
                  onClick={handleStartMatch}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-custom-red hover:bg-custom-red/80 text-white disabled:opacity-50 cursor-pointer"
                >
                  {isStarting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    t("sessions.details.matchStart", "Match Start")
                  )}
                </Button>
              </>
            )}

            {isOngoingStatus && (
              <Button
                onClick={handleSubmitTeamResult}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-custom-yellow hover:bg-custom-yellow/80 text-black font-semibold disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingResult ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Final Result...
                  </span>
                ) : (
                  t("sessions.details.submitResult", "Submit Final Result")
                )}
              </Button>
            )}

            {isCompletedStatus && (
              <Button
                onClick={() => {
                  onOpenChange(false)
                  onViewResultSummary?.()
                }}
                className="w-full py-2.5 bg-custom-yellow/20 text-custom-yellow border border-custom-yellow/30 hover:bg-custom-yellow/30 font-semibold cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                View Result Summary
              </Button>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SessionInfoSheet
