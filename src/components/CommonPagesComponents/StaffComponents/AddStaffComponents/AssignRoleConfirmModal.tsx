"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle, Loader2 } from "lucide-react"
import type { AssignRoleConfirmModalProps } from "@/types/CommonPageTypes/StaffTypes"

function AssignRoleConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isLoading = false,
}: AssignRoleConfirmModalProps) {
  const { t } = useTranslation("dashboard")

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-card border border-white/10 text-center"
        showCloseButton={false}
      >
        <DialogHeader className="items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <DialogTitle className="text-xl text-center">
            {t("staff.confirmAssignTitle", "Are you certain you wish to proceed with assigning staff?")}
          </DialogTitle>
          <DialogDescription className="text-center text-secondary">
            Are you sure you want to create this staff member? Login credentials will be sent to the email address provided.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center mt-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
          >
            {t("staff.cancel", "Cancel")}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("common.yesSure", "Yes, Sure")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AssignRoleConfirmModal
