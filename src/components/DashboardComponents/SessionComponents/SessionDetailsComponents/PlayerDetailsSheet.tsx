"use client"

/**
 * PlayerDetailsSheet.tsx
 * Slide-out sheet component for viewing a specific player's details within a session.
 * Shows three sections: Player Info, Booking Info, and Score Management.
 * Includes check-in and score submit buttons.
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
import PlayerDetailsSheetLoading from "./PlayerDetailsSheetLoading"
import { mockPlayerDetails } from "@/mock-data/DashboardMockData/sessions-mock-data"
import type { PlayerDetailsSheetProps } from "@/types/DashboardTypes/SessionTypes"

function PlayerDetailsSheet({ open, onOpenChange, sessionId, bookingId }: PlayerDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [matchStatus, setMatchStatus] = useState<string | null>(null)
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use mock data for demonstration (no API integration)
  const details = mockPlayerDetails?.data
  const scoreManagement = details?.score_management
  const resultDisplay = scoreManagement?.result_display

  const statusTone = scoreManagement?.checked_in
    ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
    : "bg-custom-yellow/20 text-yellow-400 border-custom-yellow/30"

  const normalizedStatus = resultDisplay
    ? resultDisplay.charAt(0).toUpperCase() + resultDisplay.slice(1).toLowerCase()
    : "Pending"

  const statusOptions = ["Win", "Loss", "Draw"]
  const activeMatchStatus = matchStatus ?? normalizedStatus

  /** Handle check-in */
  const handleCheckIn = async () => {
    setIsCheckingIn(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success("Player check-in completed successfully.")
    setIsCheckingIn(false)
  }

  /** Handle score submission */
  const handleSubmitPlayerResult = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success("Final result submitted successfully.")
    setIsSubmitting(false)
  }

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
              className={`px-3 py-1 text-xs font-medium rounded-md border ${statusTone}`}
            >
              {scoreManagement?.checked_in ? "Checked-In" : "Not Checked-In"}
            </span>
          </div>
          <SheetTitle className="text-xl md:text-xl font-bold text-primary">
            Player Details & Score Management
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {t("bookings.details.subtitle")}
          </SheetDescription>
        </SheetHeader>

        {/* Content */}
        <div className="px-5 pb-5">
          {details ? (
            <>
              {/* Player Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Player Info
                </h3>
                <div>
                  <SessionInfoRow label="Team Name" value={details.player_info.team_name} />
                  <SessionInfoRow label="Player ID" value={details.player_info.player_id} />
                  <SessionInfoRow label="Player Name" value={details.player_info.player_name} />
                  <SessionInfoRow label="Email" value={details.player_info.email} />
                  <SessionInfoRow label="Contact Number" value={details.player_info.contact_number} />
                </div>
              </div>

              {/* Booking Info Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Booking Info
                </h3>
                <div>
                  <SessionInfoRow label="Booking ID" value={details.booking_info.booking_id} />
                  <SessionInfoRow label="Transaction ID" value={details.booking_info.transaction_id} />
                  <SessionInfoRow label="Amount" value={details.booking_info.amount} />
                  <SessionInfoRow label="Platform Fee" value={details.booking_info.platform_fee} />
                  <SessionInfoRow label="Net Profit" value={details.booking_info.net_profit} />
                  <SessionInfoRow label="Payment Method" value={details.booking_info.payment_method} />
                  <SessionInfoRow label="Date & Time" value={details.booking_info.date_time} />
                  <SessionInfoRow
                    label="Payment Status"
                    value={
                      <span className="px-3 py-0.5 text-xs font-medium rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30">
                        {details.booking_info.payment_status}
                      </span>
                    }
                  />
                </div>
              </div>

              {/* Score Management Section */}
              {scoreManagement?.show_result_selector ? (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Score Management
                  </h3>
                  <div className="bg-[#0c0a0c] border border-white/5 rounded-2xl p-1.5 flex items-center">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => setMatchStatus(status)}
                        className={`flex-1 py-2 cursor-pointer text-sm font-semibold rounded-xl transition-all duration-200 ${
                          activeMatchStatus === status
                            ? "bg-[#e2b83b] text-black shadow-md"
                            : "text-secondary hover:text-white"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        {/* Footer Buttons */}
        {details ? (
          <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3 justify-center">
            {scoreManagement?.show_check_in_button ? (
              <Button
                onClick={handleCheckIn}
                disabled={isCheckingIn}
                className="flex-1 py-2.5 rounded-lg bg-custom-yellow text-black text-sm font-medium hover:bg-custom-yellow/80 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isCheckingIn ? "Checking In..." : "Checked In"}
              </Button>
            ) : null}

            {scoreManagement?.show_result_selector && scoreManagement?.show_submit_button ? (
              <Button
                onClick={handleSubmitPlayerResult}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Score Submit"}
              </Button>
            ) : null}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

export default PlayerDetailsSheet
