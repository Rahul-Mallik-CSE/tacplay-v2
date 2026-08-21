"use client"

/**
 * SessionConfirmModal.tsx
 * Confirmation modal for session assign and cancel actions.
 * Shows an info icon, confirmation text, and Cancel/Yes buttons.
 */

import React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { SessionConfirmModalProps } from "@/types/DashboardTypes/SessionTypes"

function SessionConfirmModal({ open, onOpenChange, onConfirm, type }: SessionConfirmModalProps) {
  const { t } = useTranslation("dashboard")

  const message = type === "assign"
    ? t("sessions.assignStaff.confirmAssign")
    : t("sessions.assignStaff.confirmCancel")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 sm:max-w-md text-center"
      >
        {/* Info Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-custom-red/20 flex items-center justify-center">
            <Info className="w-8 h-8 text-custom-red" />
          </div>
        </div>

        {/* Message */}
        <p className="text-lg font-semibold text-primary mt-2">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 bg-transparent rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-custom-red hover:bg-custom-red/80 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer"
          >
            {t("sessions.assignStaff.yesSure")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SessionConfirmModal
