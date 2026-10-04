"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet from "@/components/SharedComponents/FilterSheet"
import StaffSearchBar from "./StaffSearchBar"
import StaffStatusBadge from "./StaffStatusBadge"
import StaffAvatar from "./StaffAvatar"
import StaffActionDropdown from "./StaffActionDropdown"
import StaffDetailsSheet from "./StaffDetailsSheet"
import StaffListLoading from "./StaffListLoading"
import {
  useGetStaffListQuery,
  useGetRolesQuery,
} from "@/redux/features/shared/staff/staffAPI"
import type { StaffItem } from "@/types/CommonPageTypes/StaffTypes"

function formatLastLogin(val?: string | null): string {
  if (!val) return "Never"
  try {
    const d = new Date(val)
    if (isNaN(d.getTime())) return val
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return val
  }
}

function StaffListTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [staffFilters, setStaffFilters] = useState<Record<string, string[]>>({})

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Fetch roles for filter options
  const { data: rolesResponse } = useGetRolesQuery()

  // Extract selected status & role filters
  const selectedStatuses = staffFilters[t("filterSheet.status", "Status")] || []
  const selectedRoles = staffFilters[t("filterSheet.role", "Role")] || []

  const activeStatusParam = useMemo(() => {
    if (selectedStatuses.length === 1) {
      return selectedStatuses[0].toLowerCase() // "active" or "inactive"
    }
    return undefined
  }, [selectedStatuses])

  const activeRoleParam = useMemo(() => {
    if (selectedRoles.length === 1) {
      return selectedRoles[0]
    }
    return undefined
  }, [selectedRoles])

  // Query staff from backend API
  const {
    data: staffResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetStaffListQuery({
    search: debouncedSearch || undefined,
    role_name: activeRoleParam,
    status: activeStatusParam,
    page: currentPage,
    page_size: itemsPerPage,
    sort_by: "staff_name",
    sort_order: "asc",
  })

  const staffList = useMemo(() => {
    let list = staffResponse?.data || []
    // If multiple roles were selected in filter sheet, filter locally if backend only takes 1
    if (selectedRoles.length > 1) {
      list = list.filter((item) => selectedRoles.includes(item.role_name))
    }
    // If multiple statuses selected (both Active & Inactive), show both
    return list
  }, [staffResponse, selectedRoles])

  const meta = staffResponse?.meta || {
    current_page: currentPage,
    page_size: itemsPerPage,
    total_items: staffList.length,
    total_pages: Math.max(1, Math.ceil(staffList.length / itemsPerPage)),
    has_next: false,
    has_previous: false,
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleRowClick = (row: StaffItem) => {
    setSelectedStaffId(row.id)
    setSheetOpen(true)
  }

  const handleViewDetails = (staff: StaffItem | any) => {
    setSelectedStaffId(staff.id || staff.staff_id)
    setSheetOpen(true)
  }

  const handleCreateNewStaff = () => {
    router.push(`${basePath}/staff/staff-management/add-staff`)
  }

  const roleFilterOptions = useMemo(() => {
    if (rolesResponse?.data && rolesResponse.data.length > 0) {
      return rolesResponse.data.map((r) => ({
        label: r.role_name,
        value: r.role_name,
      }))
    }
    return [
      { label: t("staff.roles.owner", "Owner"), value: "Owner" },
      { label: t("staff.roles.manager", "Manager"), value: "Manager" },
      { label: t("staff.roles.umpire", "Umpire"), value: "Umpire" },
      { label: t("staff.roles.scanner", "Scanner"), value: "Scanner" },
    ]
  }, [rolesResponse, t])

  const columns: {
    header: string
    accessor: keyof StaffItem | ((row: StaffItem) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("staff.columns.staff", "Staff"),
      accessor: (row: StaffItem) => (
        <div className="flex items-center gap-3">
          <StaffAvatar src={row.profile_image} alt={row.staff_name} />
          <div>
            <p className="text-sm font-medium text-primary">{row.staff_name}</p>
            <p className="text-xs text-secondary">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: t("staff.columns.role", "Role"),
      accessor: "role_name",
    },
    {
      header: t("staff.columns.assignedSessions", "Assigned Sessions"),
      accessor: "assigned_sessions",
    },
    {
      header: t("staff.columns.checkedInToday", "Checked In Today"),
      accessor: "checked_in_today",
    },
    {
      header: t("staff.columns.lastLogin", "Last Login"),
      accessor: (row: StaffItem) => (
        <span className="text-xs text-secondary">
          {formatLastLogin(row.last_login)}
        </span>
      ),
    },
    {
      header: t("staff.columns.status", "Status"),
      accessor: (row: StaffItem) => (
        <StaffStatusBadge
          status={row.status || (row.is_active ? "Active" : "Inactive")}
          size="sm"
        />
      ),
    },
  ]

  const actionRenderer = (row: StaffItem) => (
    <StaffActionDropdown
      staff={row}
      onViewDetails={handleViewDetails}
      onActionComplete={refetch}
    />
  )

  type TableRow = StaffItem & Record<string, unknown>

  const hasActiveFilters =
    selectedStatuses.length > 0 || selectedRoles.length > 0

  if (isLoading && !staffResponse) {
    return <StaffListLoading />
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("staff.title")}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <StaffSearchBar value={search} onChange={handleSearchChange} />
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setFilterSheetOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors cursor-pointer ${
                hasActiveFilters
                  ? "border-custom-yellow/60 text-custom-yellow bg-custom-yellow/10"
                  : "border-white/10 text-primary hover:bg-white/5"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t("staff.filter")}
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-custom-yellow" />
              )}
            </button>
            <button
              onClick={handleCreateNewStaff}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors cursor-pointer shrink-0"
            >
              {t("staff.createNewStaff")}
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        {isFetching && (
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] z-10 flex items-center justify-center pointer-events-none rounded-xl" />
        )}
        <CustomTable
          data={staffList as unknown as TableRow[]}
          columns={
            columns as {
              header: string
              accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
              className?: string
            }[]
          }
          actionRenderer={(row) => actionRenderer(row as StaffItem)}
          onRowClick={(row) => handleRowClick(row as StaffItem)}
          serverPagination={true}
          currentPage={meta.current_page}
          totalPages={meta.total_pages}
          additionalCount={meta.total_items}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(size) => {
            setItemsPerPage(size)
            setCurrentPage(1)
          }}
          minTableWidth="min-w-[900px]"
        />
      </div>

      <StaffDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        staffId={selectedStaffId}
        onStaffUpdated={refetch}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filter")}
        filterGroups={[
          {
            title: t("filterSheet.status", "Status"),
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
          {
            title: t("filterSheet.role", "Role"),
            options: roleFilterOptions,
          },
        ]}
        selectedFilters={staffFilters}
        onFilterChange={(newFilters) => {
          setStaffFilters(newFilters)
          setCurrentPage(1)
        }}
      />
    </div>
  )
}

export default StaffListTable
