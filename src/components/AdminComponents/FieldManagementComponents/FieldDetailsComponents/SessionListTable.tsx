"use client"

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import CustomTable from "@/components/SharedComponents/CustomTable"
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

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockSessionData
    const normalizedSearch = search.trim().toLowerCase()
    return mockSessionData.filter((item) =>
      [item.sessionName, item.assignStaff, item.matchType, item.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch)),
    )
  }, [search])

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
          {/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-muted text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {t("common.filter")}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-muted text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button> */}
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
    </div>
  )
}

export default SessionListTable
