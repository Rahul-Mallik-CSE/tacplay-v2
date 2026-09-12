"use client"

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Filter } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet from "@/components/SharedComponents/FilterSheet"
import SessionSearchBar from "./SessionSearchBar"
import SessionStatusBadge from "./SessionStatusBadge"
import SessionActionDropdown from "./SessionActionDropdown"
import SessionDetailsSheet from "./SessionDetailsSheet"
import {
  mockSessionData,
  mockSessionDetail,
} from "../../../../mock-data/AdminMockData/field-management-mock-data"
import type {
  Session,
  SessionDetail,
} from "@/types/AdminTypes/FieldManagementTypes"

function SessionListTable() {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedSession, setSelectedSession] = useState<SessionDetail | null>(
    null,
  )
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [sessionFilters, setSessionFilters] = useState<Record<string, string[]>>({})

  const filteredData = useMemo(() => {
    let result = mockSessionData
    if (search.trim()) {
      const normalizedSearch = search.trim().toLowerCase()
      result = result.filter((item) =>
        [item.sessionName, item.assignStaff, item.matchType, item.status]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch)),
      )
    }
    const statusFilters = sessionFilters[t("filterSheet.status", "Status")] || []
    const matchTypeFilters = sessionFilters[t("filterSheet.matchType", "Match Type")] || []
    if (statusFilters.length > 0) {
      result = result.filter((item) => statusFilters.includes(item.status))
    }
    if (matchTypeFilters.length > 0) {
      result = result.filter((item) => matchTypeFilters.includes(item.matchType))
    }
    return result
  }, [search, sessionFilters, t])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleViewDetails = (_session: Session) => {
    setSelectedSession(mockSessionDetail)
    setIsDetailsSheetOpen(true)
  }

  const columns: {
    header: string
    accessor: keyof Session | ((row: Session) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("fieldManagement.sessionColumns.sessionName"),
      accessor: (row: Session) => (
        <span className="text-sm font-medium text-primary">
          {row.sessionName}
        </span>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.dateTime"),
      accessor: (row: Session) => (
        <div>
          <p className="text-sm text-primary">{row.date}</p>
          <p className="text-xs text-muted-foreground">{row.time}</p>
        </div>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.assignStaff"),
      accessor: (row: Session) => (
        <span className="text-sm text-primary">{row.assignStaff}</span>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.matchType"),
      accessor: (row: Session) => (
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-sm text-primary">{row.matchType}</span>
        </div>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.player"),
      accessor: (row: Session) => (
        <span className="text-sm text-primary">{row.player}</span>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.booked"),
      accessor: (row: Session) => (
        <span className="text-sm text-primary">{row.booked}</span>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.price"),
      accessor: (row: Session) => (
        <span className="text-sm text-primary">{row.price}</span>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.status"),
      accessor: (row: Session) => (
        <SessionStatusBadge status={row.status} size="sm" />
      ),
    },
  ]

  type TableRow = Session & Record<string, unknown>

  const actionRenderer = (row: Session) => (
    <SessionActionDropdown
      session={row}
      onViewDetails={handleViewDetails}
    />
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("fieldManagement.sessionTitle")}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <SessionSearchBar value={search} onChange={handleSearchChange} />
          <button
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-muted text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            {t("common.filter")}
          </button>
        </div>
      </div>

      <CustomTable
        data={filteredData as unknown as TableRow[]}
        columns={
          columns as {
            header: string
            accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
            className?: string
          }[]
        }
        actionRenderer={(row) => actionRenderer(row as Session)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(size) => {
          setItemsPerPage(size)
          setCurrentPage(1)
        }}
        minTableWidth="min-w-[900px]"
      />

      <SessionDetailsSheet
        session={selectedSession}
        open={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter")}
        filterGroups={[
          {
            title: t("filterSheet.status", "Status"),
            options: [
              { label: t("fieldManagement.sessionStatus.open"), value: "Open" },
              { label: t("fieldManagement.sessionStatus.ongoing"), value: "Ongoing" },
              { label: t("fieldManagement.sessionStatus.full"), value: "Full" },
              { label: t("fieldManagement.sessionStatus.booking"), value: "Booking" },
              { label: t("fieldManagement.sessionStatus.failed"), value: "Failed" },
            ],
          },
          {
            title: t("filterSheet.matchType", "Match Type"),
            options: [
              { label: "Ranked", value: "Ranked" },
              { label: "Social", value: "Social" },
            ],
          },
        ]}
        selectedFilters={sessionFilters}
        onFilterChange={setSessionFilters}
      />
    </div>
  )
}

export default SessionListTable
