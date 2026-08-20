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
import { CheckCircle } from "lucide-react"
import type { RoleCreatedSuccessModalProps } from "@/types/DashboardTypes/StaffTypes"

function RoleCreatedSuccessModal({
  open,
  onOpenChange,
  onCreateAnother,
  onAssignStaff,
}: RoleCreatedSuccessModalProps) {
  const { t } = useTranslation("dashboard")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border border-white/10 text-center" showCloseButton={false}>
        <DialogHeader className="items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <DialogTitle className="text-xl text-center">
            {t("staff.roleCreatedSuccess")}
          </DialogTitle>
          <DialogDescription className="text-center text-secondary">
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center">
          <button
            onClick={onCreateAnother}
            className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t("staff.createAnotherRole")}
          </button>
          <button
            onClick={onAssignStaff}
            className="px-6 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer"
          >
            {t("staff.assignStaff")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RoleCreatedSuccessModal
