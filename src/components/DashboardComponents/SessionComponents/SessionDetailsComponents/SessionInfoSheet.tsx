"use client"

/**
 * SessionInfoSheet.tsx
 * Slide-out sheet component that displays comprehensive session information.
 * Shows three sections: Field Info, Session Info, and Team Info.
 * Includes ResultSelector for ongoing matches.
 * Uses mock data for demonstration without API integration.
 */

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import SessionInfoRow from "./SessionInfoRow"
import SessionResultSelector from "./SessionResultSelector"
import SessionInfoSheetLoading from "./SessionInfoSheetLoading"
import { mockSessionInfo } from "../../../DashboardMockData/sessions-mock-data"
import type { SessionInfoSheetProps } from "@/types/DashboardTypes/SessionTypes"

function SessionInfoSheet({ open, onOpenChange, sessionId }: SessionInfoSheetProps) {
  const { t } = useTranslation("dashboard")
  const [teamAResult, setTeamAResult] = useState<"win" | "loss" | "draw">("win")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use mock data for demonstration (no API integration)
  const details = mockSessionInfo?.data
  const currentStatus = details?.status?.toLowerCase()
  const isOpenStatus = currentStatus === "open"
  const isOngoingStatus = currentStatus === "ongoing"
  const isCompletedOrCancelled =
    currentStatus === "completed" ||
    currentStatus === "complete" ||
    currentStatus === "cancelled" ||
    currentStatus === "canceled"

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

  const handleStartMatch = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success(t("sessions.details.startedSuccess"))
    setIsSubmitting(false)
  }

  const handleCancelMatch = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success(t("sessions.details.cancelledSuccess"))
    setIsSubmitting(false)
  }

  const handleSubmitTeamResult = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success(t("sessions.details.resultSuccess"))
    setIsSubmitting(false)
  }

  if (!open) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
      >
        {/* Header */}
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-md border ${
                currentStatus === "open"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-secondary/20 text-secondary border-secondary/30"
              }`}
            >
              {details?.status_display || t("common.status")}
            </span>
          </div>
          <SheetTitle className="text-xl font-bold text-primary">
            {t("sessions.details.viewInfo")}
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {t("sessions.details.title")}
          </SheetDescription>
        </SheetHeader>

        {/* Content */}
        <div className="px-5">
          {details ? (
            <>
              {/* Field Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {t("sessions.details.fieldInfo")}
                </h3>
                <div>
                  <SessionInfoRow label={t("sessions.details.fieldId")} value={details.field_info.field_id} />
                  <SessionInfoRow label={t("sessions.details.fieldName")} value={details.field_info.field_name} />
                  <SessionInfoRow label={t("sessions.details.location")} value={details.field_info.location} />
                  <SessionInfoRow label={t("sessions.details.contactNumber")} value={details.field_info.contact_number} />
                </div>
              </div>

              {/* Session Info Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {t("sessions.details.sessionInfo")}
                </h3>
                <div>
                  <SessionInfoRow label={t("sessions.details.sessionId")} value={details.session_info.session_id} />
                  <SessionInfoRow
                    label={t("sessions.details.matchType")}
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
                  <SessionInfoRow label={t("sessions.details.sessionDate")} value={details.session_info.session_date} />
                  <SessionInfoRow label={t("sessions.details.time")} value={details.session_info.time} />
                  <SessionInfoRow label={t("sessions.details.sessionType")} value={details.session_info.session_type} />
                  <SessionInfoRow label={t("sessions.details.team")} value={details.session_info.team ?? "N/A"} />
                  <SessionInfoRow label={t("sessions.details.playerPerTeam")} value={details.session_info.player_per_team} />
                  <SessionInfoRow label={t("sessions.details.packages")} value={details.session_info.packages} />
                </div>
              </div>

              {/* Team Info Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {t("sessions.details.teamInfo")}
                </h3>
                <div>
                  <SessionInfoRow label={t("sessions.details.teamAName")} value={details.team_info.team_a_name} />
                  <SessionInfoRow label={t("sessions.details.teamAScore")} value={String(details.team_info.team_a_score)} />
                  <SessionInfoRow label={t("sessions.details.teamBName")} value={details.team_info.team_b_name} />
                  <SessionInfoRow label={t("sessions.details.teamBScore")} value={String(details.team_info.team_b_score)} />
                  <SessionInfoRow label={t("sessions.details.champion")} value={details.team_info.champion} />
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Result Selector for Ongoing Matches */}
        {details && isOngoingStatus ? (
          <div className="px-5 pt-2 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">{t("sessions.details.teamResult")}</p>
              <div className="grid grid-cols-2 gap-3">
                <SessionResultSelector
                  title={details.team_info.team_a_name}
                  value={teamAResult}
                  onChange={updateFromTeamA}
                />
                <SessionResultSelector
                  title={details.team_info.team_b_name}
                  value={teamBResult}
                  onChange={updateFromTeamB}
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer Buttons */}
        {details && !isCompletedOrCancelled ? (
          <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
            {isOpenStatus ? (
              <>
                <Button
                  onClick={handleCancelMatch}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-transparent rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? t("common.loading") : t("sessions.details.matchCancel")}
                </Button>
                <Button
                  onClick={handleStartMatch}
                  disabled={isSubmitting}
                  className="flex-1 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? t("common.loading") : t("sessions.details.matchStart")}
                </Button>
              </>
            ) : null}

            {isOngoingStatus ? (
              <Button
                onClick={handleSubmitTeamResult}
                disabled={isSubmitting}
                className="w-full disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? t("common.loading") : t("sessions.details.submitResult")}
              </Button>
            ) : null}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

export default SessionInfoSheet
