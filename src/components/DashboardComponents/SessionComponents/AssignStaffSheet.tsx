"use client"

/**
 * AssignStaffSheet.tsx
 * Slide-out sheet for assigning staff to a session.
 * Fully integrated with:
 * - GET /api/session/owner/sessions/staff/
 * - POST /api/session/owner/sessions/{sessionId}/assign-staff/
 */

import React, { useState, useEffect } from "react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { ArrowLeft, UserPlus, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import {
  useGetSessionStaffQuery,
  useAssignStaffMutation,
} from "@/redux/features/dashboard/session/sessionAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import SessionConfirmModal from "./SessionConfirmModal"
import type { AssignStaffSheetProps } from "@/types/DashboardTypes/SessionTypes"

function AssignStaffSheet({
  open,
  onOpenChange,
  sessionId,
  sessionName,
  currentStaffIds = [],
  onAssigned,
}: AssignStaffSheetProps) {
  const { t } = useTranslation("dashboard")
  const [selectedStaff, setSelectedStaff] = useState<Set<number>>(new Set())
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingStaffId, setPendingStaffId] = useState<number | null>(null)
  const [confirmType, setConfirmType] = useState<"assign" | "cancel">("assign")

  // Fetch staff list from API
  const { data: staffResponse, isLoading: isStaffLoading } = useGetSessionStaffQuery(
    undefined,
    { skip: !open }
  )
  const [assignStaff, { isLoading: isAssigning }] = useAssignStaffMutation()

  // Sync selected staff whenever sheet opens or currentStaffIds changes
  useEffect(() => {
    if (open) {
      setSelectedStaff(new Set(currentStaffIds))
    }
  }, [open, currentStaffIds])

  const staffData = staffResponse?.data || []

  // Handle individual toggle click with confirm modal
  const handleAssignClick = (staffId: number) => {
    setPendingStaffId(staffId)
    if (selectedStaff.has(staffId)) {
      setConfirmType("cancel")
    } else {
      setConfirmType("assign")
    }
    setConfirmOpen(true)
  }

  // Handle confirm assign/cancel
  const handleConfirm = async () => {
    if (pendingStaffId === null || !sessionId) {
      setConfirmOpen(false)
      return
    }

    const nextSelected = new Set(selectedStaff)
    if (confirmType === "assign") {
      nextSelected.add(pendingStaffId)
    } else {
      nextSelected.delete(pendingStaffId)
    }

    try {
      const res = await assignStaff({
        sessionId,
        staff_ids: Array.from(nextSelected),
      }).unwrap()

      setSelectedStaff(nextSelected)
      toast.success(res.message || t("sessions.assignStaff.assignedSuccess", "Staff assigned successfully."))
      onAssigned?.()
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to assign staff."
      toast.error(errorMsg)
    } finally {
      setConfirmOpen(false)
      setPendingStaffId(null)
    }
  }

  // Direct save all changes
  const handleSaveAll = async () => {
    if (!sessionId) return
    try {
      const res = await assignStaff({
        sessionId,
        staff_ids: Array.from(selectedStaff),
      }).unwrap()
      toast.success(res.message || "Staff assignment updated successfully.")
      onAssigned?.()
      onOpenChange(false)
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to update staff assignment."
      toast.error(errorMsg)
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0 flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <SheetHeader className="p-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onOpenChange(false)}
                  className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </button>
                {selectedStaff.size > 0 && (
                  <span className="text-xs bg-custom-red/20 text-custom-red border border-custom-red/30 px-2.5 py-0.5 rounded-full font-medium">
                    {selectedStaff.size} {t("sessions.assignStaff.assigned", "assigned")}
                  </span>
                )}
              </div>
              <SheetTitle className="text-xl font-bold text-primary mt-2">
                {t("sessions.assignStaff.title")}
              </SheetTitle>
              <SheetDescription className="text-sm text-secondary">
                {sessionName ? `${sessionName} - ` : ""}
                {t("sessions.assignStaff.subtitle")}
              </SheetDescription>
            </SheetHeader>

            {/* Staff Table */}
            <div className="px-4 pt-4">
              {isStaffLoading ? (
                <div className="p-10 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-7 h-7 text-custom-red animate-spin" />
                  <p className="text-xs text-secondary">Loading staff members...</p>
                </div>
              ) : staffData.length === 0 ? (
                <div className="p-8 text-center text-sm text-secondary">
                  No staff members found.
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden border border-white/5">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-muted/50 border-b border-white/5">
                          <th className="font-medium text-secondary text-xs py-2.5 px-3 text-left">
                            {t("sessions.assignStaff.staffName")}
                          </th>
                          <th className="font-medium text-secondary text-xs py-2.5 px-2 text-left whitespace-nowrap">
                            {t("sessions.assignStaff.role")}
                          </th>
                          <th className="font-medium text-secondary text-xs py-2.5 px-2 text-center whitespace-nowrap">
                            {t("sessions.assignStaff.activeSession")}
                          </th>
                          <th className="font-medium text-secondary text-xs py-2.5 px-3 text-center whitespace-nowrap">
                            {t("sessions.assignStaff.status")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffData.map((staff) => {
                          const isAssigned = selectedStaff.has(staff.id)
                          const avatarUrl = toAbsoluteMediaUrl(staff.profile_image)

                          return (
                            <tr
                              key={staff.id}
                              className="border-b border-white/5 hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted shrink-0 border border-white/10">
                                    {avatarUrl ? (
                                      <Image
                                        src={avatarUrl}
                                        alt={staff.staff_name}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-secondary">
                                        {staff.staff_name.charAt(0).toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium text-primary truncate">
                                      {staff.staff_name}
                                    </p>
                                    <p className="text-[10px] text-secondary truncate">
                                      {staff.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-primary/80 py-2.5 px-2 whitespace-nowrap">
                                {staff.role_name || "-"}
                              </td>
                              <td className="text-primary/80 py-2.5 px-2 text-center whitespace-nowrap">
                                {staff.active_sessions}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleAssignClick(staff.id)}
                                  disabled={isAssigning}
                                  title={isAssigned ? "Remove from session" : "Assign to session"}
                                  className={`cursor-pointer p-1.5 rounded-lg transition-colors inline-flex items-center justify-center ${
                                    isAssigned
                                      ? "bg-custom-red hover:bg-custom-red/80 text-white"
                                      : "bg-custom-red/20 hover:bg-custom-red/30 text-custom-red"
                                  }`}
                                >
                                  {isAssigned ? (
                                    <Check className="w-3.5 h-3.5" />
                                  ) : (
                                    <UserPlus className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Save Button */}
          <SheetFooter className="p-4 border-t border-white/5 flex flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-white/10 text-secondary hover:text-primary hover:bg-white/5 cursor-pointer"
            >
              {t("common.cancel", "Cancel")}
            </Button>
            <Button
              onClick={handleSaveAll}
              disabled={isAssigning || !sessionId}
              className="flex-1 bg-custom-red hover:bg-custom-red/80 text-white cursor-pointer"
            >
              {isAssigning ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Assignment"
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Confirm Modal */}
      <SessionConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirm}
        type={confirmType}
      />
    </>
  )
}

export default AssignStaffSheet
