"use client"

/**
 * SessionTable.tsx
 * Main sessions list table component using reusable CustomTable.
 * Integrated with:
 * - GET /api/session/owner/sessions/
 * Supports debounced search, calendar date search, multi-filter sheet,
 * server pagination, staff assignment sheet, and commented-out actions per requirements.
 */

import React, { useMemo, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Calendar as CalendarIcon, Filter, MoreVertical, Users, Eye, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import SessionMatchTypeDot from "./SessionMatchTypeDot"
import SessionStatusBadge from "./SessionStatusBadge"
import AssignStaffSheet from "./AssignStaffSheet"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet, { FilterGroup } from "@/components/SharedComponents/FilterSheet"
import {
  useGetSessionsQuery,
  useGetSessionStaffQuery,
} from "@/redux/features/dashboard/session/sessionAPI"
import type {
  SessionsListItem,
  SessionsListQuery,
} from "@/types/DashboardTypes/SessionTypes"

function SessionTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  // Pagination & Search state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Calendar search state
  const [calendarDate, setCalendarDate] = useState<string>("")
  const [showCalendarPicker, setShowCalendarPicker] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Action menu & Sheets state
  const [openActionId, setOpenActionId] = useState<number | null>(null)
  const [assignSheetOpen, setAssignSheetOpen] = useState(false)
  const [assignSheetSessionId, setAssignSheetSessionId] = useState<number | null>(null)
  const [assignSheetSessionName, setAssignSheetSessionName] = useState("")
  const [assignSheetCurrentStaffIds, setAssignSheetCurrentStaffIds] = useState<number[]>([])

  // Filter Sheet state
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [sessionFilters, setSessionFilters] = useState<Record<string, string[]>>({
    Status: [],
    "Match Type": [],
    Visibility: [],
    "Session Type": [],
    Staff: [],
    "Sort By": [],
    "Sort Order": ["desc"],
  })

  // Date range filters
  const [dateFrom, setDateFrom] = useState<string>("")
  const [dateTo, setDateTo] = useState<string>("")

  const actionMenuRef = useRef<HTMLDivElement>(null)

  // Debounce search by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionId(null)
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendarPicker(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch staff list to populate staff filter options dynamically
  const { data: staffListResponse } = useGetSessionStaffQuery()
  const staffOptions = useMemo(() => {
    return (
      staffListResponse?.data?.map((st) => ({
        label: st.staff_name,
        value: String(st.id),
      })) || []
    )
  }, [staffListResponse])

  // Build query parameters for API request
  const queryParams: SessionsListQuery = useMemo(() => {
    const params: SessionsListQuery = {
      page: currentPage,
      limit: itemsPerPage,
    }

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim()
    }

    if (calendarDate) {
      params.match_date = calendarDate
    }

    if (sessionFilters["Status"]?.length) {
      params.status = sessionFilters["Status"][0].toLowerCase()
    }

    if (sessionFilters["Match Type"]?.length) {
      params.match_type = sessionFilters["Match Type"][0].toLowerCase()
    }

    if (sessionFilters["Visibility"]?.length) {
      params.session_visibility = sessionFilters["Visibility"][0].toLowerCase()
    }

    if (sessionFilters["Session Type"]?.length) {
      params.session_type = sessionFilters["Session Type"][0]
    }

    if (sessionFilters["Staff"]?.length) {
      params.staff_id = sessionFilters["Staff"][0]
    }

    if (sessionFilters["Sort By"]?.length) {
      params.sort_by = sessionFilters["Sort By"][0]
    }

    if (sessionFilters["Sort Order"]?.length) {
      params.sort_order = sessionFilters["Sort Order"][0] as "asc" | "desc"
    }

    if (dateFrom) {
      params.date_from = dateFrom
    }

    if (dateTo) {
      params.date_to = dateTo
    }

    return params
  }, [
    currentPage,
    itemsPerPage,
    debouncedSearch,
    calendarDate,
    sessionFilters,
    dateFrom,
    dateTo,
  ])

  // Fetch sessions list via RTK Query
  const {
    data: sessionsResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetSessionsQuery(queryParams)

  const sessionsData = sessionsResponse?.data || []
  const totalEntries = sessionsResponse?.meta?.total ?? 0
  const totalPages = sessionsResponse?.meta?.totalPage ?? 1

  // Handle row click to navigate to session details
  const handleRowClick = (row: SessionsListItem) => {
    router.push(`/dashboard/sessions/${row.id}`)
  }

  // Handle assign staff from action menu
  const handleAssignStaff = (row: SessionsListItem) => {
    setAssignSheetSessionId(row.id)
    setAssignSheetSessionName(row.session_name)
    setAssignSheetCurrentStaffIds(row.assigned_staff?.map((s) => s.id) || [])
    setAssignSheetOpen(true)
    setOpenActionId(null)
  }

  // Define table columns
  const columns = useMemo(
    () => [
      {
        header: t("sessions.columns.sessionName"),
        accessor: (row: SessionsListItem) => (
          <div>
            <p className="font-semibold text-primary">{row.session_name}</p>
            <p className="text-xs text-secondary font-mono">{row.session_id}</p>
          </div>
        ),
        className: "font-medium",
      },
      {
        header: t("sessions.columns.dateTime"),
        accessor: (row: SessionsListItem) => (
          <div className="text-primary/90">
            <div>{row.date}</div>
            <div className="text-xs text-secondary">{row.time}</div>
          </div>
        ),
      },
      {
        header: t("sessions.columns.assignStaff"),
        accessor: (row: SessionsListItem) => {
          if (!row.assigned_staff || row.assigned_staff.length === 0) {
            return <span className="text-secondary/60 text-xs italic">Unassigned</span>
          }
          return (
            <div className="max-w-[160px] truncate" title={row.assigned_staff.map((s) => s.staff_name).join(", ")}>
              <span className="text-primary/90 text-xs">
                {row.assigned_staff.map((s) => s.staff_name).join(", ")}
              </span>
            </div>
          )
        },
      },
      {
        header: t("sessions.columns.matchType"),
        accessor: (row: SessionsListItem) => (
          <SessionMatchTypeDot type={row.match_type_display || row.match_type} />
        ),
      },
      {
        header: t("sessions.columns.players"),
        accessor: (row: SessionsListItem) => (
          <span className="text-primary/80 font-medium">{row.player}</span>
        ),
        className: "text-center",
      },
      {
        header: t("sessions.columns.booked"),
        accessor: (row: SessionsListItem) => (
          <span className="text-primary/80 font-medium">{row.booked}</span>
        ),
        className: "text-center",
      },
      {
        header: t("sessions.columns.price"),
        accessor: (row: SessionsListItem) => {
          if (typeof row.price === "object" && row.price !== null) {
            return row.price.display || `€${row.price.amount}`
          }
          return typeof row.price === "number" ? `€${row.price}` : row.price || "-"
        },
        className: "text-right font-medium",
      },
      {
        header: t("sessions.columns.status"),
        accessor: (row: SessionsListItem) => (
          <SessionStatusBadge status={row.status_display || row.status} />
        ),
        className: "text-center",
      },
    ],
    [t]
  )

  // Custom action renderer with dropdown menu
  const actionRenderer = (row: SessionsListItem) => (
    <div className="relative inline-block" ref={openActionId === row.id ? actionMenuRef : undefined}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpenActionId(openActionId === row.id ? null : row.id)
        }}
        className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
      >
        <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
      </button>

      {/* Action Dropdown Menu */}
      {openActionId === row.id && (
        <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-card border border-white/10 rounded-lg shadow-xl py-1">
          {/* 
            Disable Toggle - commented out per user instruction
            <div className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5">
              <span className="flex items-center gap-2 text-sm text-primary">
                <Pencil className="w-4 h-4" />
                {t("sessions.actions.disable")}
              </span>
              <Switch size="sm" checked={!disabledSessions.has(row.id)} onCheckedChange={() => handleDisableToggle(row.id)} />
            </div>
          */}

          {/* 
            Edit Session - commented out per user instruction
            <button
              onClick={(e) => {
                e.stopPropagation()
                setOpenActionId(null)
                router.push(`/dashboard/sessions/${row.id}`)
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              {t("sessions.actions.editSession")}
            </button>
          */}

          {/* 
            Duplicate - commented out per user instruction
            <button
              onClick={(e) => {
                e.stopPropagation()
                setOpenActionId(null)
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              {t("sessions.actions.duplicate")}
            </button>
          */}

          {/* Assign Staff */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAssignStaff(row)
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-custom-red" />
            {t("sessions.actions.assignStaff")}
          </button>

          {/* View Details */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpenActionId(null)
              router.push(`/dashboard/sessions/${row.id}`)
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-secondary" />
            {t("sessions.actions.viewDetails")}
          </button>
        </div>
      )}
    </div>
  )

  // Dynamic filter groups based on user prompt API parameters
  const filterGroups: FilterGroup[] = useMemo(
    () => [
      {
        title: "Status",
        type: "single",
        options: [
          { label: t("sessions.filters.open", "Open"), value: "open" },
          { label: t("sessions.filters.ongoing", "Ongoing"), value: "ongoing" },
          { label: t("sessions.filters.completed", "Completed"), value: "completed" },
          { label: t("sessions.filters.full", "Full"), value: "full" },
          { label: t("sessions.filters.cancelled", "Cancelled"), value: "cancelled" },
        ],
      },
      {
        title: "Match Type",
        type: "single",
        options: [
          { label: t("sessions.filters.ranked", "Ranked"), value: "ranked" },
          { label: t("sessions.filters.social", "Social"), value: "social" },
        ],
      },
      {
        title: "Visibility",
        type: "single",
        options: [
          { label: "Premium", value: "premium" },
          { label: "Public", value: "public" },
          { label: "Private", value: "private" },
        ],
      },
      {
        title: "Session Type",
        type: "single",
        options: [
          { label: "Individual Player", value: "manual_player" },
          { label: "Teams", value: "teams" },
        ],
      },
      ...(staffOptions.length > 0
        ? [
            {
              title: "Staff",
              type: "single" as const,
              options: staffOptions,
            },
          ]
        : []),
      {
        title: "Sort By",
        type: "single",
        options: [
          { label: "Match Date", value: "match_date" },
          { label: "Session Name", value: "session_name" },
          { label: "Status", value: "status" },
          { label: "Entry Fee", value: "entry_fee" },
        ],
      },
      {
        title: "Sort Order",
        type: "single",
        options: [
          { label: "Descending", value: "desc" },
          { label: "Ascending", value: "asc" },
        ],
      },
    ],
    [t, staffOptions]
  )

  const activeFilterCount = useMemo(() => {
    let count = Object.entries(sessionFilters).reduce((sum, [key, arr]) => {
      // Don't count default Sort Order "desc" as active filter
      if (key === "Sort Order" && arr.length === 1 && arr[0] === "desc") return sum
      return sum + (arr?.length || 0)
    }, 0)
    if (calendarDate) count += 1
    if (dateFrom || dateTo) count += 1
    return count
  }, [sessionFilters, calendarDate, dateFrom, dateTo])

  const clearAllFilters = () => {
    setSessionFilters({
      Status: [],
      "Match Type": [],
      Visibility: [],
      "Session Type": [],
      Staff: [],
      "Sort By": [],
      "Sort Order": ["desc"],
    })
    setCalendarDate("")
    setDateFrom("")
    setDateTo("")
    setCurrentPage(1)
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
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-muted border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-primary outline-none placeholder:text-secondary focus:border-custom-red/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setFilterSheetOpen(true)}
            className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer ${
              activeFilterCount > 0
                ? "bg-custom-red/20 border-custom-red/40 text-custom-red"
                : "bg-muted border-white/10 text-primary hover:bg-white/5"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t("common.filter")}</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-custom-red text-white text-[11px] rounded-full flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Calendar Search Popover */}
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => setShowCalendarPicker(!showCalendarPicker)}
              title="Search by match date"
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                calendarDate
                  ? "bg-custom-red text-white border-custom-red"
                  : "bg-muted border-white/10 text-primary hover:bg-white/5"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              {calendarDate && (
                <span className="text-xs font-mono hidden md:inline">{calendarDate}</span>
              )}
            </button>

            {showCalendarPicker && (
              <div className="absolute right-0 top-full mt-2 z-50 bg-card border border-white/10 rounded-xl p-4 shadow-2xl w-72 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-semibold text-primary">Match Date Filter</span>
                  {calendarDate && (
                    <button
                      onClick={() => {
                        setCalendarDate("")
                        setCurrentPage(1)
                      }}
                      className="text-[11px] text-custom-red hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div>
                  <label className="text-[11px] text-secondary block mb-1">Select date</label>
                  <input
                    type="date"
                    value={calendarDate}
                    onChange={(e) => {
                      setCalendarDate(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full bg-muted border border-white/10 rounded-lg px-3 py-2 text-xs text-primary outline-none focus:border-custom-red/50"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setShowCalendarPicker(false)}
                    className="px-3 py-1.5 rounded-lg bg-custom-red text-white text-xs font-medium cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Create New Session */}
          <Link href="/dashboard/sessions/create-session">
            <button className="flex cursor-pointer items-center gap-2 bg-custom-red hover:bg-custom-red/80 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              {t("sessions.createNew")}
            </button>
          </Link>
        </div>
      </div>

      {/* Active Filter Badges */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-secondary">Active filters:</span>
          {calendarDate && (
            <span className="bg-custom-red/20 text-custom-red border border-custom-red/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span>Date: {calendarDate}</span>
              <button onClick={() => setCalendarDate("")} className="cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {Object.entries(sessionFilters).map(([group, values]) => {
            if (group === "Sort Order" && values[0] === "desc") return null
            return values.map((val) => (
              <span
                key={`${group}-${val}`}
                className="bg-white/10 text-primary border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5"
              >
                <span className="text-secondary">{group}:</span>
                <span className="capitalize">{val}</span>
                <button
                  onClick={() => {
                    const current = sessionFilters[group] || []
                    setSessionFilters({
                      ...sessionFilters,
                      [group]: current.filter((v) => v !== val),
                    })
                    setCurrentPage(1)
                  }}
                  className="cursor-pointer text-secondary hover:text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          })}
          <button
            onClick={clearAllFilters}
            className="text-xs text-custom-red hover:underline ml-2 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table / Loading */}
      {isLoading ? (
        <div className="p-16 flex flex-col items-center justify-center space-y-3 bg-card/40 rounded-xl border border-white/5">
          <Loader2 className="w-8 h-8 text-custom-red animate-spin" />
          <p className="text-sm text-secondary">Loading sessions...</p>
        </div>
      ) : (
        <div className="relative">
          {isFetching && (
            <div className="absolute top-2 right-2 z-10">
              <Loader2 className="w-4 h-4 text-custom-red animate-spin" />
            </div>
          )}
          <CustomTable
            data={sessionsData as unknown as Record<string, unknown>[]}
            columns={
              columns as unknown as {
                header: string
                accessor:
                  | keyof Record<string, unknown>
                  | ((row: Record<string, unknown>) => React.ReactNode)
                className?: string
              }[]
            }
            onRowClick={(row) => handleRowClick(row as unknown as SessionsListItem)}
            actionRenderer={(row) => actionRenderer(row as unknown as SessionsListItem)}
            serverPagination={true}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            additionalCount={totalEntries}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(limit) => {
              setItemsPerPage(limit)
              setCurrentPage(1)
            }}
            minTableWidth="min-w-[900px]"
          />
        </div>
      )}

      {/* Assign Staff Sheet */}
      <AssignStaffSheet
        open={assignSheetOpen}
        onOpenChange={setAssignSheetOpen}
        sessionId={assignSheetSessionId}
        sessionName={assignSheetSessionName}
        currentStaffIds={assignSheetCurrentStaffIds}
        onAssigned={() => refetch()}
      />

      {/* Filter Sheet */}
      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter")}
        filterGroups={filterGroups}
        selectedFilters={sessionFilters}
        onFilterChange={(newFilters) => {
          setSessionFilters(newFilters)
          setCurrentPage(1)
        }}
        onReset={clearAllFilters}
      />
    </div>
  )
}

export default SessionTable
