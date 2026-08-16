"use client"

/**
 * BookingCancelDialog.tsx
 * Confirmation dialog for cancelling a booking.
 * Shows an info icon, title, reason textarea, and confirm/cancel buttons.
 */

import React, { useState } from "react"
import { Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next"
import type { BookingCancelDialogProps } from "@/types/DashboardTypes/BookingsTypes"

function BookingCancelDialog({
  open,
  onOpenChange,
  onConfirm,
}: BookingCancelDialogProps) {
  const { t } = useTranslation("dashboard")
  const [reason, setReason] = useState("")

  const handleConfirm = () => {
    onConfirm(reason)
    setReason("")
  }

  const handleCancel = () => {
    onOpenChange(false)
    setReason("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 max-w-md"
      >
        <DialogHeader className="items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-custom-red/20 flex items-center justify-center">
              <Info className="w-7 h-7 text-custom-red" />
            </div>
            <DialogTitle className="text-xl text-center">
              {t("bookings.cancelDialog.title")}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            {t("bookings.cancelDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("bookings.cancelDialog.reasonPlaceholder")}
            rows={5}
            className="w-full bg-muted/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-secondary/60 outline-none focus:border-white/20 transition-colors resize-none"
          />
        </div>

        <DialogFooter className="flex-row gap-3 sm:justify-center mt-4">
          <button
            onClick={handleCancel}
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer"
          >
            {t("bookings.cancelDialog.confirmButton")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingCancelDialog
