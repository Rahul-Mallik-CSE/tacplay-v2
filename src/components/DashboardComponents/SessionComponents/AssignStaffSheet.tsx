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

  const staffData = mockStaffListData

  // Handle staff selection toggle
  const handleStaffSelect = (staffId: number) => {
    const newSelected = new Set(selectedStaff)
    if (newSelected.has(staffId)) {
      newSelected.delete(staffId)
    } else {
      newSelected.add(staffId)
    }
    setSelectedStaff(newSelected)
  }

  // Handle assign button click - open confirmation
  const handleAssignClick = (staffId: number) => {
    if (selectedStaff.has(staffId)) {
      // If already selected, unassign
      setPendingStaffId(staffId)
      setConfirmOpen(true)
    } else {
      // If not selected, assign directly
      const newSelected = new Set(selectedStaff)
      newSelected.add(staffId)
      setSelectedStaff(newSelected)
    }
  }

  // Handle confirm assign/cancel
  const handleConfirm = () => {
    if (pendingStaffId !== null) {
      const newSelected = new Set(selectedStaff)
      newSelected.delete(pendingStaffId)
      setSelectedStaff(newSelected)
    }
    setConfirmOpen(false)
    setPendingStaffId(null)
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedStaff.size === staffData.length) {
      setSelectedStaff(new Set())
    } else {
      setSelectedStaff(new Set(staffData.map((s) => s.staff_id)))
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
          <div className="px-5 pt-4">
            <div className="rounded-xl overflow-hidden border border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-white/5">
                      <th className="font-medium text-secondary text-xs py-3 px-4 text-center w-10">
                        <input
                          type="checkbox"
                          checked={selectedStaff.size === staffData.length}
                          onChange={handleSelectAll}
                          className="cursor-pointer accent-custom-yellow w-4 h-4"
                        />
                      </th>
                      <th className="font-medium text-secondary text-xs py-3 px-4 text-left whitespace-nowrap">
                        {t("sessions.assignStaff.staffName")}
                      </th>
                      <th className="font-medium text-secondary text-xs py-3 px-4 text-left whitespace-nowrap">
                        {t("sessions.assignStaff.role")}
                      </th>
                      <th className="font-medium text-secondary text-xs py-3 px-4 text-center whitespace-nowrap">
                        {t("sessions.assignStaff.activeSession")}
                      </th>
                      <th className="font-medium text-secondary text-xs py-3 px-4 text-center whitespace-nowrap">
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
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedStaff.has(staff.staff_id)}
                            onChange={() => handleStaffSelect(staff.staff_id)}
                            className="cursor-pointer accent-custom-yellow w-4 h-4"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={staff.avatar}
                              alt={staff.full_name}
                              className="w-10 h-10 rounded-full object-cover bg-muted"
                            />
                            <div>
                              <p className="text-sm font-medium text-primary">{staff.full_name}</p>
                              <p className="text-xs text-secondary">{staff.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-primary/80 py-3 px-4 text-xs whitespace-nowrap">
                          {staff.role}
                        </td>
                        <td className="text-primary/80 py-3 px-4 text-xs text-center whitespace-nowrap">
                          {staff.assigned_sessions}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleAssignClick(staff.staff_id)}
                            className={`cursor-pointer p-2 rounded-lg transition-colors ${
                              selectedStaff.has(staff.staff_id)
                                ? "bg-custom-red hover:bg-custom-red/80 text-white"
                                : "bg-custom-red/20 hover:bg-custom-red/30 text-custom-red"
                            }`}
                          >
                            <UserPlus className="w-4 h-4" />
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
        type="cancel"
      />
    </>
  )
}

export default AssignStaffSheet
