"use client"

import { useTranslation } from "react-i18next"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { UpgradeFieldPlanModalProps } from "@/types/AdminTypes/FieldManagementTypes"

export default function UpgradeFieldPlanModal({
  field,
  open,
  onOpenChange,
  onConfirm,
}: UpgradeFieldPlanModalProps) {
  const { t } = useTranslation("dashboard")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-white/10 max-w-md" showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
            <svg
              className="w-7 h-7 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <DialogTitle className="text-lg font-semibold text-primary">
            {t("fieldManagement.upgradeModal.title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            {t("fieldManagement.upgradeModal.description", {
              name: field?.fieldName || "",
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-3 sm:gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 px-4 py-2.5 bg-muted border border-white/10 text-primary rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors cursor-pointer"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={() => {
              onConfirm("Gold")
              onOpenChange(false)
            }}
            className="flex-1 px-4 py-2.5 bg-custom-red text-white rounded-lg text-sm font-medium hover:bg-custom-red/90 transition-colors cursor-pointer"
          >
            {t("fieldManagement.upgradeModal.confirm")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
