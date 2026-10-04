"use client"

/**
 * PlayerDetailsSheet.tsx
 * Slide-out sheet component for viewing a specific player's details within a session.
 * Flow:
 * 1. Player MUST be checked in first via POST /api/session/owner/sessions/{sessionId}/check-in/
 * 2. Only after check-in is complete can scores be selected and submitted via POST /api/session/owner/sessions/{sessionId}/submit-result/
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
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import SessionInfoRow from "./SessionInfoRow"
import PlayerDetailsSheetLoading from "./PlayerDetailsSheetLoading"
import {
  useGetSessionPlayerInfoQuery,
  useCheckInPlayerMutation,
  useSubmitResultMutation,
} from "@/redux/features/dashboard/session/sessionAPI"
import type { PlayerDetailsSheetProps } from "@/types/DashboardTypes/SessionTypes"

function PlayerDetailsSheet({
  open,
  onOpenChange,
  sessionId,
  bookingId,
  onSuccess,
}: PlayerDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [matchStatus, setMatchStatus] = useState<string>("Win")

  // Fetch player details
  const {
    data: playerResponse,
    isLoading,
    isError,
    refetch,
  } = useGetSessionPlayerInfoQuery(
    { sessionId: sessionId ?? 0, bookingId: bookingId ?? 0 },
    { skip: !sessionId || !bookingId || !open }
  )

  const [checkInPlayer, { isLoading: isCheckingIn }] = useCheckInPlayerMutation()
  const [submitResult, { isLoading: isSubmittingResult }] = useSubmitResultMutation()

  const details = playerResponse?.data
  const scoreManagement = details?.score_management
  const isCheckedIn = Boolean(scoreManagement?.checked_in)
  const resultDisplay = scoreManagement?.result_display

  // Sync matchStatus when data loads
  useEffect(() => {
    if (resultDisplay) {
      const formatted =
        resultDisplay.charAt(0).toUpperCase() + resultDisplay.slice(1).toLowerCase()
      setMatchStatus(formatted)
    }
  }, [resultDisplay])

  const statusTone = isCheckedIn
    ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
    : "bg-custom-yellow/20 text-yellow-400 border-custom-yellow/30"

  const statusOptions = ["Win", "Loss", "Draw"]

  /** Step 1: Check in the player */
  const handleCheckIn = async () => {
    if (!sessionId || !bookingId) return
    try {
      const res = await checkInPlayer({
        sessionId,
        booking_ids: [bookingId],
      }).unwrap()
      toast.success(res.message || "Player check-in completed successfully.")
      refetch()
      onSuccess?.()
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to check in player."
      toast.error(errorMsg)
    }
  }

  /** Step 2: Submit final score for player (only allowed after check-in) */
  const handleSubmitPlayerResult = async () => {
    if (!sessionId || !bookingId) return
    if (!isCheckedIn) {
      toast.error("Please check in the player first before submitting the result.")
      return
    }
    try {
      const res = await submitResult({
        sessionId,
        payload: {
          players: [
            {
              booking_id: bookingId,
              result: matchStatus.toLowerCase(),
            },
          ],
        },
      }).unwrap()
      toast.success(res.message || "Final result submitted successfully.")
      refetch()
      onSuccess?.()
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to submit result."
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
              <span className={`px-3 py-1 text-xs font-medium rounded-md border flex items-center gap-1.5 ${statusTone}`}>
                {isCheckedIn ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Checked-In</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Not Checked-In</span>
                  </>
                )}
              </span>
            </div>
            <SheetTitle className="text-xl font-bold text-primary mt-2">
              Player Details & Score Management
            </SheetTitle>
            <SheetDescription className="text-sm text-secondary">
              {details?.player_info?.player_name ? `${details.player_info.player_name} - ` : ""}
              {details?.player_info?.team_name || "Team Player"}
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <div className="px-5 py-4">
            {isLoading ? (
              <PlayerDetailsSheetLoading />
            ) : isError || !details ? (
              <div className="p-8 text-center text-sm text-secondary">
                Failed to load player details.
              </div>
            ) : (
              <>
                {/* Player Info Section */}
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 text-custom-red">
                    Player Info
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-3 border border-white/5">
                    <SessionInfoRow label="Team Name" value={details.player_info.team_name} />
                    <SessionInfoRow label="Player ID" value={details.player_info.player_id} />
                    <SessionInfoRow label="Player Name" value={details.player_info.player_name} />
                    <SessionInfoRow label="Email" value={details.player_info.email} />
                    <SessionInfoRow label="Contact Number" value={details.player_info.contact_number} />
                  </div>
                </div>

                {/* Booking Info Section */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 text-custom-red">
                    Booking Info
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-3 border border-white/5">
                    <SessionInfoRow label="Booking ID" value={details.booking_info.booking_id} />
                    <SessionInfoRow label="Transaction ID" value={details.booking_info.transaction_id} />
                    <SessionInfoRow label="Amount" value={`€${details.booking_info.amount}`} />
                    <SessionInfoRow label="Platform Fee" value={`€${details.booking_info.platform_fee}`} />
                    <SessionInfoRow label="Net Profit" value={`€${details.booking_info.net_profit}`} />
                    <SessionInfoRow label="Payment Method" value={details.booking_info.payment_method} />
                    <SessionInfoRow label="Date & Time" value={details.booking_info.date_time} />
                    <SessionInfoRow
                      label="Payment Status"
                      value={
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30 capitalize">
                          {details.booking_info.payment_status}
                        </span>
                      }
                    />
                  </div>
                </div>

                {/* Score Management Section (Available only AFTER check-in) */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 text-custom-yellow">
                    Score Management
                  </h3>
                  {isCheckedIn ? (
                    <div className="space-y-3">
                      <div className="bg-[#0c0a0c] border border-white/5 rounded-2xl p-1.5 flex items-center">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setMatchStatus(status)}
                            className={`flex-1 py-2 cursor-pointer text-sm font-semibold rounded-xl transition-all duration-200 ${
                              matchStatus === status
                                ? "bg-[#e2b83b] text-black shadow-md"
                                : "text-secondary hover:text-white"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                      {scoreManagement?.awarded_score !== undefined && (
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs">
                          <span className="text-secondary">Current Awarded Score:</span>
                          <span className="font-bold text-primary">
                            {scoreManagement.awarded_score > 0
                              ? `+${scoreManagement.awarded_score}`
                              : scoreManagement.awarded_score}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl border border-custom-yellow/30 bg-custom-yellow/10 space-y-1.5">
                      <div className="flex items-center gap-2 text-custom-yellow font-semibold text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Check-In Required First</span>
                      </div>
                      <p className="text-xs text-secondary/90 leading-relaxed">
                        This player is not checked in yet. You must check in the player first before score recording and final results can be submitted.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Buttons: Check In first, then Submit Score */}
        {details && (
          <SheetFooter className="px-5 py-4 border-t border-white/5 flex-row gap-3 justify-center">
            {!isCheckedIn ? (
              <Button
                onClick={handleCheckIn}
                disabled={isCheckingIn}
                className="w-full py-2.5 rounded-lg bg-custom-yellow text-black text-sm font-bold hover:bg-custom-yellow/80 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-custom-yellow/10"
              >
                {isCheckingIn ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking In Player...
                  </span>
                ) : (
                  "Check In Player"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleSubmitPlayerResult}
                disabled={isSubmittingResult}
                className="w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/80 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingResult ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Score...
                  </span>
                ) : (
                  "Submit Score"
                )}
              </Button>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default PlayerDetailsSheet
