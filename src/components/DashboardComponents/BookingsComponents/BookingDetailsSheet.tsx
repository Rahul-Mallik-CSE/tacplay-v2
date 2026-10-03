"use client"

/**
 * BookingDetailsSheet.tsx
 * Slide-out sheet component that displays detailed booking information.
 * Integrated with /api/arena/bookings/:id/ endpoint via RTK Query.
 * Shows sections: Player Info, Session Info, Package Details, and Payment Info.
 * Includes a "Mark Checked In" button with confirmation dialog (static action).
 */

import React, { useState } from "react"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"
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
import {
  useGetBookingDetailsQuery,
  useCheckInBookingMutation,
} from "@/redux/features/dashboard/bookings/bookingsAPI"
import type { BookingDetailsSheetProps } from "@/types/DashboardTypes/BookingsTypes"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"

function formatDate(dateString?: string | null): string {
  if (!dateString) return "-"
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

function formatDateTime(dateString?: string | null): string {
  if (!dateString) return "-"
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return dateString
  }
}

function BookingDetailsSheet({
  open,
  onOpenChange,
  bookingId,
}: BookingDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const [confirmOpen, setConfirmOpen] = useState(false)

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetBookingDetailsQuery(bookingId as number, {
    skip: !open || !bookingId,
  })

  const [checkInBooking, { isLoading: isCheckingIn }] = useCheckInBookingMutation()

  const details = response?.data

  const isCheckedIn =
    details?.session_booking?.checked_in === true ||
    details?.booking?.status === "checked_in"
  const isCancelled = details?.booking?.status === "cancelled"

  const handleConfirmCheckIn = async () => {
    if (!bookingId) return
    try {
      const res = await checkInBooking(bookingId).unwrap()
      toast.success(res.message || "Player checked in successfully.")
      setConfirmOpen(false)
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to check in player."
      toast.error(errorMsg)
    }
  }

  if (!open) return null

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
        >
          {/* Header with back button, title and status */}
          <SheetHeader className="p-5 pb-0">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors w-fit"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <div className="flex items-center justify-between mt-2">
              <SheetTitle className="text-xl">
                {t("bookings.details.title", "Booking Details")}
              </SheetTitle>
              {details?.booking?.status && (
                <BookingStatusBadge status={details.booking.status} />
              )}
            </div>
            <SheetDescription className="text-sm text-secondary">
              {t("bookings.details.subtitle", "View complete booking information")}
            </SheetDescription>
          </SheetHeader>

          {/* Details content */}
          <div className="px-5 pb-5">
            {isLoading || (isFetching && !details) ? (
              <div className="space-y-6 mt-6">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ) : isError || !details ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-custom-red/80" />
                <p className="text-primary font-medium text-sm">
                  {t("bookings.details.errorLoading", "Failed to load booking details")}
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-primary transition-colors cursor-pointer"
                >
                  {t("common.tryAgain", "Try Again")}
                </button>
              </div>
            ) : (
              <>
                {/* Player Info Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("bookings.details.playerInfo", "Player Info")}
                  </h3>
                  <div>
                    <BookingInfoRow
                      label={t("bookings.details.playerId", "Player ID")}
                      value={details.player.display_player_id || `#CN ${details.player.id}`}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.playerName", "Player Name")}
                      value={details.player.full_name}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.email", "Email")}
                      value={details.player.email}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.contactNumber", "Contact Number")}
                      value={details.player.contact_number ?? "-"}
                    />
                    {details.player.location && (
                      <BookingInfoRow
                        label={t("bookings.details.location", "Location")}
                        value={details.player.location}
                      />
                    )}
                  </div>
                </div>

                {/* Session Info Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("bookings.details.sessionInfo", "Session Info")}
                  </h3>
                  <div>
                    <BookingInfoRow
                      label={t("bookings.details.sessionId", "Session Name")}
                      value={details.session.session_name}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.arenaName", "Arena Name")}
                      value={details.session.field_name}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.package", "Package")}
                      value={details.package?.package_name ?? details.session.package_name ?? "-"}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.matchType", "Match Type")}
                      value={
                        <BookingMatchTypeDot
                          type={details.session.match_type}
                        />
                      }
                    />
                    <BookingInfoRow
                      label={t("bookings.details.sessionDate", "Session Date")}
                      value={formatDate(details.session.match_date)}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.time", "Time")}
                      value={`${details.session.start_time} to ${details.session.end_time}`}
                    />
                    {details.session.session_visibility && (
                      <BookingInfoRow
                        label={t("bookings.details.visibility", "Visibility")}
                        value={
                          details.session.session_visibility.charAt(0).toUpperCase() +
                          details.session.session_visibility.slice(1)
                        }
                      />
                    )}
                    <BookingInfoRow
                      label={t("bookings.details.team", "Team")}
                      value={
                        details.booking.team_display ||
                        (details.booking.team ? `Team ${details.booking.team}` : "-")
                      }
                    />
                    <BookingInfoRow
                      label={t("bookings.details.playerCount", "Players")}
                      value={details.booking.player_count}
                    />
                  </div>
                </div>

                {/* Package Details (if selected) */}
                {details.package && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {t("bookings.details.packageDetails", "Package Details")}
                    </h3>
                    <div>
                      <BookingInfoRow
                        label={t("bookings.details.packageName", "Package Name")}
                        value={details.package.package_name}
                      />
                      <BookingInfoRow
                        label={t("bookings.details.packageFee", "Package Fee")}
                        value={`€${details.package.package_fee}`}
                      />
                      {details.package.description && (
                        <BookingInfoRow
                          label={t("bookings.details.packageDescription", "Description")}
                          value={details.package.description}
                        />
                      )}
                      {details.package.include_items && details.package.include_items.length > 0 && (
                        <BookingInfoRow
                          label={t("bookings.details.includedItems", "Included Items")}
                          value={
                            <div className="flex flex-wrap gap-1 justify-end">
                              {details.package.include_items.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded text-primary"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          }
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Info Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("bookings.details.paymentInfo", "Payment Info")}
                  </h3>
                  <div>
                    <BookingInfoRow
                      label={t("bookings.details.bookingId", "Booking ID")}
                      value={details.booking.display_booking_id || `#CH ${details.booking.id}`}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.paymentReference", "Payment Reference")}
                      value={
                        details.booking.payment_reference ||
                        details.booking.transaction_id ||
                        "-"
                      }
                    />
                    {details.payment.entry_fee_total && (
                      <BookingInfoRow
                        label={t("bookings.details.entryFee", "Entry Fee")}
                        value={`€${details.payment.entry_fee_total}`}
                      />
                    )}
                    {details.payment.package_fee && (
                      <BookingInfoRow
                        label={t("bookings.details.packageFee", "Package Fee")}
                        value={`€${details.payment.package_fee}`}
                      />
                    )}
                    {details.payment.commission_amount && (
                      <BookingInfoRow
                        label={t("bookings.details.platformFee", "Platform Fee")}
                        value={`€${details.payment.commission_amount}`}
                      />
                    )}
                    <BookingInfoRow
                      label={t("bookings.details.totalAmount", "Total Amount")}
                      value={
                        details.payment.total_amount_display ||
                        (details.payment.total_amount ? `€${details.payment.total_amount}` : "-")
                      }
                    />
                    <BookingInfoRow
                      label={t("bookings.details.paymentMethod", "Payment Method")}
                      value={
                        details.payment.payment_method
                          ? details.payment.payment_method.toUpperCase()
                          : "-"
                      }
                    />
                    <BookingInfoRow
                      label={t("bookings.details.dateTime", "Date & Time")}
                      value={formatDateTime(
                        details.booking.paid_at ||
                        details.booking.confirmed_at ||
                        details.booking.created_at ||
                        details.booking.date_time
                      )}
                    />
                    <BookingInfoRow
                      label={t("bookings.details.paymentStatus", "Payment Status")}
                      value={
                        <BookingStatusBadge
                          status={details.booking.payment_status}
                          size="sm"
                        />
                      }
                    />
                  </div>
                </div>

                {/* Check-In Status Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("bookings.details.checkInInfo", "Check-In Status")}
                  </h3>
                  <div>
                    <BookingInfoRow
                      label={t("bookings.details.checkInStatus", "Status")}
                      value={
                        <BookingStatusBadge
                          status={
                            details.session_booking?.checked_in
                              ? "checked_in"
                              : details.session_booking?.no_show
                              ? "no_show"
                              : "pending"
                          }
                          size="sm"
                        />
                      }
                    />
                    {details.session_booking?.checked_in_at && (
                      <BookingInfoRow
                        label={t("bookings.details.checkedInAt", "Checked In At")}
                        value={formatDateTime(details.session_booking.checked_in_at)}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with action button */}
          <SheetFooter className="px-5 pb-5 pt-2 justify-center">
            {isLoading || (isFetching && !details) ? (
              <Skeleton className="w-full h-10 rounded-lg" />
            ) : isError || !details ? null : (
              <button
                disabled={isCheckedIn || isCancelled}
                onClick={() => setConfirmOpen(true)}
                className={cn(
                  "w-full py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isCheckedIn
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                    : isCancelled
                    ? "bg-white/5 text-secondary border border-white/10 cursor-not-allowed"
                    : "bg-custom-red text-white hover:bg-custom-red/80 cursor-pointer"
                )}
              >
                {isCheckedIn
                  ? t("bookings.details.alreadyCheckedIn", "Checked In")
                  : isCancelled
                  ? t("bookings.details.bookingCancelled", "Booking Cancelled")
                  : t("bookings.details.markCheckedIn", "Mark Checked In")}
              </button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Confirmation dialog */}
      <BookingDetailsConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmCheckIn}
        isLoading={isCheckingIn}
      />
    </>
  )
}

export default BookingDetailsSheet
