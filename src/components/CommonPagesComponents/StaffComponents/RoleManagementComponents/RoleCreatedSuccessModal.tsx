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
import { ShieldCheck, Loader2 } from "lucide-react"
import type { RoleCreatedSuccessModalProps } from "@/types/CommonPageTypes/StaffTypes"

function RoleCreatedSuccessModal({
  open,
  onOpenChange,
  onCreateRole,
  onCreateAndAssignStaff,
  onCreateAnother,
  onAssignStaff,
  roleName = "",
  permissionsCount = 0,
  isLoading = false,
}: RoleCreatedSuccessModalProps) {
  const { t } = useTranslation("dashboard")

  const handleCreateRole = () => {
    if (onCreateRole) {
      onCreateRole()
    } else if (onCreateAnother) {
      onCreateAnother()
    }
  }

  const handleCreateAndAssignStaff = () => {
    if (onCreateAndAssignStaff) {
      onCreateAndAssignStaff()
    } else if (onAssignStaff) {
      onAssignStaff()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-card border border-white/10 text-center"
        showCloseButton={true}
      >
        <DialogHeader className="items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <DialogTitle className="text-xl text-center">
            {roleName ? `Create "${roleName}" Role` : t("staff.createRoleTitle", "Create Staff Role")}
          </DialogTitle>
          <DialogDescription className="text-center text-secondary mt-1">
            {permissionsCount > 0
              ? `Are you sure you want to create this role with ${permissionsCount} permission${permissionsCount > 1 ? "s" : ""}?`
              : "Are you sure you want to create this staff role?"}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-3 justify-center items-center mt-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleCreateRole}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg border border-custom-yellow/60 text-custom-yellow bg-custom-yellow/10 hover:bg-custom-yellow/20 text-xs sm:text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
            Create Role
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleCreateAndAssignStaff}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg bg-custom-red text-white text-xs sm:text-xs font-semibold whitespace-nowrap hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
            Create and Assign Staff
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RoleCreatedSuccessModal
