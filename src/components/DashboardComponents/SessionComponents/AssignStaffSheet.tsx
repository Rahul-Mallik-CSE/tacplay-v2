"use client"

/**
 * AssignStaffSheet.tsx
 * Slide-out sheet for assigning staff to a session.
 * Shows a table of staff members with checkboxes and assign buttons.
 * Uses mock data for demonstration without API integration.
 */

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ArrowLeft, UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { mockStaffListData } from "@/mock-data/DashboardMockData/staff-mock-data"
import SessionConfirmModal from "./SessionConfirmModal"
import type { AssignStaffSheetProps } from "@/types/DashboardTypes/SessionTypes"

function AssignStaffSheet({ open, onOpenChange, sessionName }: AssignStaffSheetProps) {
  const { t } = useTranslation("dashboard")
  const [selectedStaff, setSelectedStaff] = useState<Set<number>>(new Set([1, 3, 4]))
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingStaffId, setPendingStaffId] = useState<number | null>(null)
  const [confirmType, setConfirmType] = useState<"assign" | "cancel">("assign")

  const staffData = mockStaffListData

  // Handle assign button click - open confirmation
  const handleAssignClick = (staffId: number) => {
    if (selectedStaff.has(staffId)) {
      // If already selected, unassign
      setPendingStaffId(staffId)
      setConfirmType("cancel")
      setConfirmOpen(true)
    } else {
      // If not selected, assign
      setPendingStaffId(staffId)
      setConfirmType("assign")
      setConfirmOpen(true)
    }
  }

  // Handle confirm assign/cancel
  const handleConfirm = () => {
    if (pendingStaffId !== null) {
      if (confirmType === "assign") {
        const newSelected = new Set(selectedStaff)
        newSelected.add(pendingStaffId)
        setSelectedStaff(newSelected)
      } else {
        const newSelected = new Set(selectedStaff)
        newSelected.delete(pendingStaffId)
        setSelectedStaff(newSelected)
      }
    }
    setConfirmOpen(false)
    setPendingStaffId(null)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
        >
          {/* Header */}
          <SheetHeader className="p-5 pb-0">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onOpenChange(false)}
                className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
            </div>
            <SheetTitle className="text-xl font-bold text-primary">
              {t("sessions.assignStaff.title")}
            </SheetTitle>
            <SheetDescription className="text-sm text-secondary">
              {sessionName ? `${sessionName} - ` : ""}{t("sessions.assignStaff.subtitle")}
            </SheetDescription>
          </SheetHeader>

          {/* Staff Table */}
          <div className="px-4 pt-4">
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
                    {staffData.map((staff) => (
                      <tr
                        key={staff.staff_id}
                        className="border-b border-white/5 hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={staff.avatar}
                              alt={staff.full_name}
                              className="w-8 h-8 rounded-full object-cover bg-muted shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-primary truncate">{staff.full_name}</p>
                              <p className="text-[10px] text-secondary truncate">{staff.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-primary/80 py-2.5 px-2 whitespace-nowrap">
                          {staff.role}
                        </td>
                        <td className="text-primary/80 py-2.5 px-2 text-center whitespace-nowrap">
                          {staff.assigned_sessions}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => handleAssignClick(staff.staff_id)}
                            className={`cursor-pointer p-1.5 rounded-lg transition-colors ${
                              selectedStaff.has(staff.staff_id)
                                ? "bg-custom-red hover:bg-custom-red/80 text-white"
                                : "bg-custom-red/20 hover:bg-custom-red/30 text-custom-red"
                            }`}
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
