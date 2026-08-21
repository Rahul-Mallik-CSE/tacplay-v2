"use client"

/**
 * SessionTable.tsx
 * Main sessions list table component with filters, pagination,
 * action dropdown menu, and row click to navigate to session details.
 * Uses mock data for demonstration without API integration.
 */

import React, { useMemo, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Calendar, Filter, MoreVertical, Pencil, Copy, Users, Eye } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import SessionMatchTypeDot from "./SessionMatchTypeDot"
import SessionStatusBadge from "./SessionStatusBadge"
import { Switch } from "@/components/ui/switch"
import { mockSessionsListData } from "@/mock-data/DashboardMockData/sessions-mock-data"
import AssignStaffSheet from "./AssignStaffSheet"
import type {
  SessionsListItem,
} from "@/types/DashboardTypes/SessionTypes"

/** Items per page options */
const PAGE_SIZE_OPTIONS = [10, 25, 50] as const

function SessionTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  // Local state for filters, pagination
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [openActionId, setOpenActionId] = useState<number | null>(null)
  const [disabledSessions, setDisabledSessions] = useState<Set<number>>(new Set())
  const [assignSheetOpen, setAssignSheetOpen] = useState(false)
  const [assignSheetSessionId, setAssignSheetSessionId] = useState<number | null>(null)
  const [assignSheetSessionName, setAssignSheetSessionName] = useState("")
  const actionMenuRef = useRef<HTMLDivElement>(null)

  // Close action menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter and paginate mock data
  const filteredData = useMemo(() => {
    return mockSessionsListData.filter((item) => {
      if (!search.trim()) return true
      const query = search.toLowerCase()
      return (
        item.session_name.toLowerCase().includes(query) ||
        item.session_id.toLowerCase().includes(query) ||
        item.assign_staff.toLowerCase().includes(query)
      )
    })
  }, [search])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage)
  const endIndex = startIndex + currentData.length

  // Handle row click to navigate to session details
  const handleRowClick = (row: SessionsListItem) => {
    router.push(`/dashboard/sessions/${row.id}`)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === currentData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(currentData.map((row) => row.id)))
    }
  }

  // Handle individual row select
  const handleRowSelect = (id: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  // Handle disable toggle
  const handleDisableToggle = (id: number) => {
    const newDisabled = new Set(disabledSessions)
    if (newDisabled.has(id)) {
      newDisabled.delete(id)
    } else {
      newDisabled.add(id)
    }
    setDisabledSessions(newDisabled)
  }

  // Handle assign staff from action menu
  const handleAssignStaff = (row: SessionsListItem) => {
    setAssignSheetSessionId(row.id)
    setAssignSheetSessionName(row.session_name)
    setAssignSheetOpen(true)
    setOpenActionId(null)
  }

  // Generate page numbers for pagination
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("...")
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="w-full space-y-6">
      

      {/* Search, Filter, Calendar, Create Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {t("sessions.title")}
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              type="text"
              placeholder={t("common.search")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full sm:w-64 bg-muted border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-primary outline-none placeholder:text-secondary"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t("common.filter")}</span>
          </button>

          {/* Calendar Button */}
          <button className="flex items-center gap-2 bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4" />
          </button>
          {/* Create New Session */}
          <Link href="/dashboard/sessions/create-session">
            <button className="flex cursor-pointer items-center gap-2 bg-custom-red hover:bg-custom-red/80 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              {t("sessions.createNew")}
            </button>
          </Link>
        </div>

        
      </div>

      {/* Table */}
      <div className="w-full space-y-3 sm:space-y-4 overflow-x-auto">
        <div className="rounded-xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-muted/50 hover:bg-muted/50 border-b border-white/5">
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-center whitespace-nowrap w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === currentData.length && currentData.length > 0}
                      onChange={handleSelectAll}
                      className="cursor-pointer accent-custom-yellow w-4 h-4"
                    />
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("sessions.columns.sessionName")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("sessions.columns.dateTime")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("sessions.columns.assignStaff")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("sessions.columns.matchType")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-center whitespace-nowrap">
                    {t("sessions.columns.players")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-center whitespace-nowrap">
                    {t("sessions.columns.booked")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-right whitespace-nowrap">
                    {t("sessions.columns.price")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-center whitespace-nowrap">
                    {t("sessions.columns.status")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-center whitespace-nowrap">
                    {t("common.action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    <td className="py-3 sm:py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                        className="cursor-pointer accent-custom-yellow w-4 h-4"
                      />
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap font-medium">
                      {row.session_name}
                    </td>
                    <td className="py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      <div className="text-primary/80">
                        {row.date_time.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      {row.assign_staff}
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      <SessionMatchTypeDot type={row.match_type_display} />
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap text-center">
                      {row.player}
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap text-center">
                      {row.booked}
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap text-right">
                      ${row.price}
                    </td>
                    <td className="py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap text-center">
                      <SessionStatusBadge status={row.status_display} />
                    </td>
                    <td className="py-3 sm:py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block" ref={openActionId === row.id ? actionMenuRef : undefined}>
                        <button
                          onClick={() => setOpenActionId(openActionId === row.id ? null : row.id)}
                          className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
                        >
                          <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                        </button>

                        {/* Action Dropdown Menu */}
                        {openActionId === row.id && (
                          <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-card border border-white/10 rounded-lg shadow-xl py-1">
                            {/* Disable Toggle */}
                            <div className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5">
                              <span className="flex items-center gap-2 text-sm text-primary">
                                <Pencil className="w-4 h-4" />
                                {t("sessions.actions.disable")}
                              </span>
                              <Switch
                                size="sm"
                                checked={!disabledSessions.has(row.id)}
                                onCheckedChange={() => handleDisableToggle(row.id)}
                              />
                            </div>

                            {/* Edit Session */}
                            <button
                              onClick={() => {
                                setOpenActionId(null)
                                router.push(`/dashboard/sessions/${row.id}`)
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <Pencil className="w-4 h-4" />
                              {t("sessions.actions.editSession")}
                            </button>

                            {/* Duplicate */}
                            <button
                              onClick={() => setOpenActionId(null)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <Copy className="w-4 h-4" />
                              {t("sessions.actions.duplicate")}
                            </button>

                            {/* Assign Staff */}
                            <button
                              onClick={() => handleAssignStaff(row)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <Users className="w-4 h-4" />
                              {t("sessions.actions.assignStaff")}
                            </button>

                            {/* View Details */}
                            <button
                              onClick={() => {
                                setOpenActionId(null)
                                router.push(`/dashboard/sessions/${row.id}`)
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                              {t("sessions.actions.viewDetails")}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 gap-3 flex-wrap">
          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <span key={index}>
                {page === "..." ? (
                  <span className="text-xs sm:text-sm h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center text-secondary">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`text-xs sm:text-sm h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-custom-red text-white hover:bg-custom-red/80"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </span>
            ))}
          </div>

          {/* Showing info + Items per page */}
          <div className="flex items-center gap-3">
            <p className="text-xs text-secondary">
              {t("table.showing", {
                from: filteredData.length === 0 ? 0 : startIndex + 1,
                to: Math.min(endIndex, filteredData.length),
                total: filteredData.length,
              })}
            </p>

            {/* Items per page select */}
            <div className="relative">
              <select
                className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-2 pr-8 outline-none appearance-none cursor-pointer"
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value))
                  setCurrentPage(1)
                }}
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {t("common.show")} {size}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-secondary pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Assign Staff Sheet */}
      <AssignStaffSheet
        open={assignSheetOpen}
        onOpenChange={setAssignSheetOpen}
        sessionId={assignSheetSessionId}
        sessionName={assignSheetSessionName}
      />
    </div>
  )
}

/** ChevronDown icon for select dropdown */
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default SessionTable
