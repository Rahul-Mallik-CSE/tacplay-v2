"use client"

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import StaffSearchBar from "./StaffSearchBar"
import StaffStatusBadge from "./StaffStatusBadge"
import StaffAvatar from "./StaffAvatar"
import StaffActionDropdown from "./StaffActionDropdown"
import StaffDetailsSheet from "./StaffDetailsSheet"
import { mockStaffListData } from "../../../../mock-data/DashboardMockData/staff-mock-data"
import type { StaffMember } from "@/types/DashboardTypes/StaffTypes"

function StaffListTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null)

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockStaffListData
    const normalizedSearch = search.trim().toLowerCase()
    return mockStaffListData.filter((item) =>
      [
        item.full_name,
        item.email,
        item.role,
        item.status,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch)),
    )
  }, [search])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleRowClick = (row: StaffMember) => {
    setSelectedStaffId(row.staff_id)
    setSheetOpen(true)
  }

  const handleViewDetails = (staff: StaffMember) => {
    setSelectedStaffId(staff.staff_id)
    setSheetOpen(true)
  }

  const handleCreateNewStaff = () => {
    router.push("/dashboard/staff/staff-management/add-staff")
  }

  const columns: {
    header: string
    accessor: keyof StaffMember | ((row: StaffMember) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("staff.columns.staff"),
      accessor: (row: StaffMember) => (
        <div className="flex items-center gap-3">
          <StaffAvatar src={row.avatar} alt={row.full_name} />
          <div>
            <p className="text-sm font-medium text-primary">{row.full_name}</p>
            <p className="text-xs text-secondary">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: t("staff.columns.role"),
      accessor: "role",
    },
    {
      header: t("staff.columns.assignedSessions"),
      accessor: "assigned_sessions",
    },
    {
      header: t("staff.columns.checkedInToday"),
      accessor: "checked_in_today",
    },
    {
      header: t("staff.columns.lastLogin"),
      accessor: "last_login",
    },
    {
      header: t("staff.columns.status"),
      accessor: (row: StaffMember) => (
        <StaffStatusBadge status={row.status} size="sm" />
      ),
    },
  ]

  const actionRenderer = (row: StaffMember) => (
    <StaffActionDropdown staff={row} onViewDetails={handleViewDetails} />
  )

  type TableRow = StaffMember & Record<string, unknown>

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {t("staff.title")}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <StaffSearchBar value={search} onChange={handleSearchChange} />
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
            {t("staff.filter")}
          </button>
          <button
            onClick={handleCreateNewStaff}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer"
          >
            {t("staff.createNewStaff")}
          </button>
        </div>
      </div>

      <CustomTable
        data={filteredData as unknown as TableRow[]}
        columns={columns as { header: string; accessor: keyof TableRow | ((row: TableRow) => React.ReactNode); className?: string }[]}
        actionRenderer={(row) => actionRenderer(row as StaffMember)}
        onRowClick={(row) => handleRowClick(row as StaffMember)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(size) => {
          setItemsPerPage(size)
          setCurrentPage(1)
        }}
        minTableWidth="min-w-[900px]"
      />

      <StaffDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        staffId={selectedStaffId}
      />
    </div>
  )
}

export default StaffListTable
