"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegEye, FaEdit, FaTrashAlt } from "react-icons/fa"
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  useUpdateStaffStatusMutation,
  useDeleteStaffMutation,
} from "@/redux/features/shared/staff/staffAPI"
import type { StaffItem, StaffMember } from "@/types/CommonPageTypes/StaffTypes"

interface StaffActionDropdownProps {
  staff: StaffItem | StaffMember
  onViewDetails: (staff: StaffItem | StaffMember) => void
  onActionComplete?: () => void
}

function StaffActionDropdown({
  staff,
  onViewDetails,
  onActionComplete,
}: StaffActionDropdownProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const staffId = "id" in staff ? staff.id : staff.staff_id
  const isActive = "is_active" in staff ? staff.is_active : staff.status === "Active"

  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateStaffStatusMutation()
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`${basePath}/staff/staff-management/edit-staff/${staffId}`)
  }

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation()
    onViewDetails(staff)
  }

  const handleToggleStatus = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextStatus = !isActive
    try {
      const res = await updateStatus({
        id: staffId,
        is_active: nextStatus,
      }).unwrap()
      toast.success(
        res?.message ||
          (nextStatus ? "Staff account activated successfully." : "Staff account disabled successfully.")
      )
      onActionComplete?.()
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.data?.detail || "Failed to update staff status."
      )
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteStaff(staffId).unwrap()
      toast.success(res?.message || "Staff deleted successfully.")
      setDeleteDialogOpen(false)
      onActionComplete?.()
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.data?.detail || "Failed to delete staff member."
      )
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
            aria-label="Open staff actions"
          >
            <BsThreeDotsVertical className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-card border border-white/10 w-48"
        >
          <DropdownMenuItem
            onClick={handleView}
            className="cursor-pointer text-primary gap-2 focus:bg-white/5"
          >
            <FaRegEye className="w-3.5 h-3.5 text-secondary" />
            {t("staff.viewDetails")}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleEdit}
            className="cursor-pointer text-primary gap-2 focus:bg-white/5"
          >
            <FaEdit className="w-3.5 h-3.5 text-secondary" />
            {t("staff.editStaff")}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleToggleStatus}
            disabled={isUpdatingStatus}
            className="cursor-pointer text-primary gap-2 focus:bg-white/5"
          >
            {isUpdatingStatus ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isActive ? (
              <FiAlertCircle className="w-3.5 h-3.5 text-custom-yellow" />
            ) : (
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            )}
            {isActive ? t("staff.disableAccount") : "Activate Account"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              setDeleteDialogOpen(true)
            }}
            className="cursor-pointer text-custom-red gap-2 focus:bg-white/5 focus:text-custom-red"
          >
            <FaTrashAlt className="w-3.5 h-3.5" />
            {t("staff.deleteStaff")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border border-white/10 text-center">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">Delete Staff Member</DialogTitle>
            <DialogDescription className="text-center text-secondary mt-2">
              Are you sure you want to delete this staff member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center mt-4">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setDeleteDialogOpen(false)}
              className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {t("staff.cancel", "Cancel")}
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("staff.deleteStaff", "Delete Staff")}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default StaffActionDropdown
