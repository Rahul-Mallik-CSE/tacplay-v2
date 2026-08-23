"use client"

import React from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { useTranslation } from "react-i18next"
import StaffAvatar from "./StaffAvatar"
import StaffStatusBadge from "./StaffStatusBadge"
import StaffInfoRow from "./StaffInfoRow"
import AssignedSessionRow from "./AssignedSessionRow"
import { mockStaffDetails } from "../../../../mock-data/DashboardMockData/staff-mock-data"
import type { StaffDetailsSheetProps } from "@/types/DashboardTypes/StaffTypes"

function StaffDetailsSheet({
  open,
  onOpenChange,
  staffId,
}: StaffDetailsSheetProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const details = staffId ? mockStaffDetails : null

  if (!open) return null

  const handleEditStaff = () => {
    onOpenChange(false)
    router.push(`/dashboard/staff/staff-management/edit-staff/${staffId}`)
  }

  return (
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
          {details ? (
            <>
              <div className="flex items-start gap-4 mt-6">
                <StaffAvatar
                  src={details.staff.avatar}
                  alt={details.staff.full_name}
                  size="lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-primary">
                      {details.staff.full_name}
                    </h3>
                    <StaffStatusBadge status={details.staff.status} size="sm" />
                  </div>
                  <p className="text-sm text-secondary mt-1 flex items-center gap-2">
                    <span>&#9993;</span>
                    {details.staff.email}
                  </p>
                  <p className="text-sm text-secondary mt-1 flex items-center gap-2">
                    <span>&#9742;</span>
                    {details.staff.phone}
                  </p>
                </div>
                <button
                  onClick={handleEditStaff}
                  className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>&#9998;</span>
                  {t("staff.editStaff")}
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {t("staff.staffInfo")}
                </h3>
                <div>
                  <StaffInfoRow
                    label={t("staff.info.fullName")}
                    value={details.staff.full_name}
                  />
                  <StaffInfoRow
                    label={t("staff.info.role")}
                    value={details.staff.role}
                  />
                  <StaffInfoRow
                    label={t("staff.info.joined")}
                    value={details.staff.joined_date}
                  />
                  <StaffInfoRow
                    label={t("staff.info.status")}
                    value={details.staff.status}
                  />
                  <StaffInfoRow
                    label={t("staff.info.lastLogin")}
                    value={details.staff.last_login}
                  />
                  <StaffInfoRow
                    label={t("staff.info.scannerAccess")}
                    value={
                      <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-700/30 text-amber-400 border border-amber-600/30">
                        {details.staff.scanner_access}
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
                  <button className="text-sm text-custom-red hover:underline cursor-pointer">
                    {t("staff.viewAll")}
                  </button>
                </div>
                <div>
                  {details.assigned_sessions_today.map((session, index) => (
                    <AssignedSessionRow key={index} session={session} />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button className="flex-1 py-2.5 rounded-lg border border-custom-yellow text-custom-yellow text-sm font-medium hover:bg-custom-yellow/10 transition-colors cursor-pointer">
                  {t("staff.disableAccount")}
                </button>
                <button className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer">
                  {t("staff.deleteStaff")}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default StaffDetailsSheet
