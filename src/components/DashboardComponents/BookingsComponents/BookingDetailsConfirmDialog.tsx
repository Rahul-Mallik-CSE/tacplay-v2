"use client"

/**
 * BookingDetailsConfirmDialog.tsx
 * Confirmation dialog for booking actions like marking checked-in.
 * Shows an alert icon with confirm/cancel buttons.
 */

import React from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next"
import type { BookingDetailsConfirmDialogProps } from "@/types/DashboardTypes/BookingsTypes"

function BookingDetailsConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: BookingDetailsConfirmDialogProps) {
  const { t } = useTranslation("dashboard")

  return (
    <Dialog open={open} onOpenChange={isLoading ? () => {} : onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 max-w-sm"
      >
        <DialogHeader className="items-center">
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="w-6 h-6 text-custom-red" />
            <DialogTitle>{t("bookings.details.confirmCheckIn", "Confirm Check-In")}</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-secondary text-center mt-1">
            {t("bookings.details.confirmDescription", "Are you sure you want to mark this player as checked in?")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-3 sm:justify-center mt-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("common.cancel", "Cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {t("common.processing", "Processing...")}
              </>
            ) : (
              t("common.yesSure", "Yes, sure")
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingDetailsConfirmDialog
