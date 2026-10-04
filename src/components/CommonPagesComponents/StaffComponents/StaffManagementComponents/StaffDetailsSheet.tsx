"use client"

import React, { useState } from "react"
import { ArrowLeft, Loader2, Mail, Phone } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "react-toastify"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next"
import StaffAvatar from "./StaffAvatar"
import StaffStatusBadge from "./StaffStatusBadge"
import StaffInfoRow from "./StaffInfoRow"
import AssignedSessionRow from "./AssignedSessionRow"
import {
  useGetStaffDetailsQuery,
  useUpdateStaffStatusMutation,
  useDeleteStaffMutation,
} from "@/redux/features/shared/staff/staffAPI"
import type { StaffDetailsSheetProps } from "@/types/CommonPageTypes/StaffTypes"

function formatDateTime(dateStr?: string | null): string {
  if (!dateStr) return "Never"
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return dateStr
  }
}

function formatDateOnly(dateStr?: string | null): string {
  if (!dateStr) return "N/A"
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

function StaffDetailsSheet({
  open,
  onOpenChange,
  staffId,
  onStaffUpdated,
}: StaffDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const { data: detailsData, isLoading } = useGetStaffDetailsQuery(
    staffId as number,
    { skip: !open || !staffId }
  )
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateStaffStatusMutation()
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation()

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  if (!open) return null

  const details = detailsData?.data

  const handleEditStaff = () => {
    onOpenChange(false)
    router.push(`${basePath}/staff/staff-management/edit-staff/${staffId}`)
  }

  const handleToggleStatus = async () => {
    if (!staffId || !details) return
    const nextStatus = !details.is_active
    try {
      const res = await updateStatus({
        id: staffId,
        is_active: nextStatus,
      }).unwrap()
      toast.success(
        res?.message ||
          (nextStatus ? "Staff account activated successfully." : "Staff account disabled successfully.")
      )
      onStaffUpdated?.()
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.data?.detail || "Failed to update staff status."
      )
    }
  }

  const handleDeleteStaff = async () => {
    if (!staffId) return
    try {
      const res = await deleteStaff(staffId).unwrap()
      toast.success(res?.message || "Staff deleted successfully.")
      setDeleteConfirmOpen(false)
      onOpenChange(false)
      onStaffUpdated?.()
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.data?.detail || "Failed to delete staff member."
      )
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
        >
          <SheetHeader className="p-5 pb-0">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors self-start"
              aria-label="Close details"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl">
                {t("staff.staffDetails")}
              </SheetTitle>
              <span className="px-3 py-1 text-xs font-medium rounded-md bg-amber-700/30 text-amber-400 border border-amber-600/30">
                {t("staff.staffRolePermission")}
              </span>
            </div>
            <SheetDescription className="text-sm text-secondary">
              {t("staff.staffDetailsSubtitle")}
            </SheetDescription>
          </SheetHeader>

          <div className="px-5 pb-5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-custom-yellow mb-2" />
                <p className="text-sm text-secondary">Loading staff details...</p>
              </div>
            ) : details ? (
              <>
                <div className="flex items-start gap-4 mt-6">
                  <StaffAvatar
                    src={details.profile_image}
                    alt={details.staff_name}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-primary truncate">
                        {details.staff_name}
                      </h3>
                      <StaffStatusBadge
                        status={details.status || (details.is_active ? "Active" : "Inactive")}
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-secondary mt-1 flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{details.email}</span>
                    </p>
                    <p className="text-sm text-secondary mt-1 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{details.phone}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleEditStaff}
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                  >
                    <span>&#9998;</span>
                    {t("staff.editStaff")}
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t("staff.staffInfo")}
                  </h3>
                  <div className="divide-y divide-white/5">
                    <StaffInfoRow
                      label={t("staff.info.fullName")}
                      value={details.staff_name}
                    />
                    <StaffInfoRow
                      label={t("staff.info.role")}
                      value={details.role_name}
                    />
                    <StaffInfoRow
                      label={t("staff.info.joined")}
                      value={formatDateOnly(details.joined_at || details.created_at)}
                    />
                    <StaffInfoRow
                      label={t("staff.info.status")}
                      value={
                        <StaffStatusBadge
                          status={details.status || (details.is_active ? "Active" : "Inactive")}
                          size="sm"
                        />
                      }
                    />
                    <StaffInfoRow
                      label={t("staff.info.lastLogin")}
                      value={formatDateTime(details.last_login)}
                    />
                    <StaffInfoRow
                      label={t("staff.info.scannerAccess")}
                      value={
                        <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-700/30 text-amber-400 border border-amber-600/30">
                          {details.scanner_access || (details.has_scanner_access ? "Scanner" : "None")}
                        </span>
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-primary">
                      {t("staff.assignedSessionToday")}
                    </h3>
                  </div>
                  <div>
                    {details.assigned_sessions_today &&
                    details.assigned_sessions_today.length > 0 ? (
                      details.assigned_sessions_today.map((session, index) => (
                        <AssignedSessionRow key={index} session={session} />
                      ))
                    ) : (
                      <p className="text-sm text-secondary py-3">
                        No assigned sessions for today
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    disabled={isUpdatingStatus}
                    onClick={handleToggleStatus}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                      details.is_active
                        ? "border-custom-yellow text-custom-yellow hover:bg-custom-yellow/10"
                        : "border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                    } disabled:opacity-50`}
                  >
                    {isUpdatingStatus && <Loader2 className="w-4 h-4 animate-spin" />}
                    {details.is_active ? t("staff.disableAccount") : "Activate Account"}
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={() => setDeleteConfirmOpen(true)}
                    className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {t("staff.deleteStaff")}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
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
              onClick={() => setDeleteConfirmOpen(false)}
              className="px-6 py-2.5 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {t("staff.cancel", "Cancel")}
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteStaff}
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

export default StaffDetailsSheet
