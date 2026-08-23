"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegEye, FaEdit, FaTrashAlt } from "react-icons/fa"
import { FiAlertCircle } from "react-icons/fi"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { StaffMember } from "@/types/DashboardTypes/StaffTypes"

interface StaffActionDropdownProps {
  staff: StaffMember
  onViewDetails: (staff: StaffMember) => void
}

function StaffActionDropdown({ staff, onViewDetails }: StaffActionDropdownProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/dashboard/staff/staff-management/edit-staff/${staff.staff_id}`)
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    onViewDetails(staff)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
        >
          <BsThreeDotsVertical className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-card border border-white/10 w-44"
      >
        <DropdownMenuItem
          onClick={handleViewDetails}
          className="cursor-pointer text-primary gap-2 focus:bg-white/5"
        >
          <FaRegEye className="w-3.5 h-3.5" />
          {t("staff.viewDetails")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleEdit}
          className="cursor-pointer text-primary gap-2 focus:bg-white/5"
        >
          <FaEdit className="w-3.5 h-3.5" />
          {t("staff.editStaff")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer text-primary gap-2 focus:bg-white/5"
        >
          <FaTrashAlt className="w-3.5 h-3.5" />
          {t("staff.deleteStaff")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer text-primary gap-2 focus:bg-white/5"
        >
          <FiAlertCircle className="w-3.5 h-3.5" />
          {t("staff.disableAccount")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StaffActionDropdown
