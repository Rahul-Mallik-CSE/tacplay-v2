"use client"

/**
 * BookingDetailsSheet.tsx
 * Slide-out sheet component that displays detailed booking information.
 * Shows three sections: Player Info, Session Info, and Payment Info.
 * Includes a "Mark Checked In" button with confirmation dialog.
 * Uses local mock data instead of API calls.
 */

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { useTranslation } from "react-i18next"
import BookingInfoRow from "./BookingInfoRow"
import BookingStatusBadge from "./BookingStatusBadge"
import BookingMatchTypeDot from "./BookingMatchTypeDot"
import BookingDetailsConfirmDialog from "./BookingDetailsConfirmDialog"
import { mockBookingDetails } from "../../../mock-data/DashboardMockData/booking-list-mock-data"
import type { BookingDetailsSheetProps } from "@/types/DashboardTypes/BookingListTypes"

function BookingDetailsSheet({
  open,
  onOpenChange,
  bookingId,
}: BookingDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [confirmOpen, setConfirmOpen] = useState(false)

  // Use mock data for demonstration (no API integration)
  const details = bookingId ? mockBookingDetails.data : null

  if (!open) return null

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
        >
          {/* Header with back button and status */}
          <SheetHeader className="p-5 pb-0">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onOpenChange(false)}
                className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
              <SheetTitle>{t("bookings.details.title")}</SheetTitle>
              <BookingStatusBadge
                status={details?.booking.status ?? "pending"}
              />
            </div>
            <SheetDescription className="text-sm text-secondary">
              {t("bookings.details.subtitle")}
            </SheetDescription>
          </SheetHeader>

          {/* Details content */}
          <div className="px-5 pb-5">
            {details ? (
              <>
                {/* Player Info Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("bookings.details.playerInfo")}
                  </h3>
                  <div>
                    <BookingInfoRow
                      label="Player ID"
                      value={details.player.display_player_id}
                    />
                    <BookingInfoRow
                      label="Player Name"
                      value={details.player.full_name}
                    />
                    <BookingInfoRow
                      label="Email"
                      value={details.player.email}
                    />
                    <BookingInfoRow
                      label="Contact Number"
                      value={details.player.contact_number ?? "-"}
                    />
                    <BookingInfoRow
                      label="Location"
                      value={details.player.location}
                    />
                  </div>
                </div>

                {/* Session Info Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("bookings.details.sessionInfo")}
                  </h3>
                  <div>
                    <BookingInfoRow
                      label="Session ID"
                      value={`#CH ${details.session.id}`}
                    />
                    <BookingInfoRow
                      label="Session Name"
                      value={details.session.session_name}
                    />
                    <BookingInfoRow
                      label="Arena Name"
                      value={details.session.field_name}
                    />
                    <BookingInfoRow
                      label="Match Type"
                      value={
                        <BookingMatchTypeDot
                          type={details.session.match_type}
                        />
                      }
                    />
                    <BookingInfoRow
                      label="Session Date"
                      value={details.session.match_date}
                    />
                    <BookingInfoRow
                      label="Time"
                      value={`${details.session.start_time} to ${details.session.end_time}`}
                    />
                  </div>
                </div>

                {/* Payment Info Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("bookings.details.paymentInfo")}
                  </h3>
                  <div>
                    <BookingInfoRow
                      label="Booking ID"
                      value={details.booking.display_booking_id}
                    />
                    <BookingInfoRow
                      label="Transaction Ref"
                      value={details.booking.payment_reference}
                    />
                    <BookingInfoRow
                      label="Amount"
                      value={details.payment.total_amount_display}
                    />
                    <BookingInfoRow
                      label="Platform Fee"
                      value={details.payment.commission_amount}
                    />
                    <BookingInfoRow
                      label="Payment Method"
                      value={details.payment.payment_method}
                    />
                    <BookingInfoRow
                      label="Payment Status"
                      value={
                        <BookingStatusBadge
                          status={details.booking.payment_status}
                          size="sm"
                        />
                      }
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Footer with action button */}
          <SheetFooter className="px-5 pb-5 pt-2 justify-center">
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer"
            >
              {t("bookings.details.markCheckedIn")}
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Confirmation dialog */}
      <BookingDetailsConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => setConfirmOpen(false)}
      />
    </>
  )
}

export default BookingDetailsSheet
