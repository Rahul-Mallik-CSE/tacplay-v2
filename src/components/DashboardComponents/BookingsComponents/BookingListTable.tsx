"use client"

/**
 * BookingListTable.tsx
 * Main booking list table component integrated with /api/arena/bookings/
 * Handles real-time search with debounce, server-side pagination,
 * dynamic multi-filter sheet, row selection for detailed view, and status badges.
 */

import React, { useMemo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegEye } from "react-icons/fa"
import { Filter, X, RefreshCw, AlertCircle } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import BookingSearchBar from "./BookingSearchBar"
import BookingStatusBadge from "./BookingStatusBadge"
import BookingMatchTypeDot from "./BookingMatchTypeDot"
import BookingDetailsSheet from "./BookingDetailsSheet"
import BookingCancelDialog from "./BookingCancelDialog"
import BookingListLoading from "./BookingListLoading"
import FilterSheet, { FilterGroup } from "@/components/SharedComponents/FilterSheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetBookingsQuery } from "@/redux/features/dashboard/bookings/bookingsAPI"
import type { BookingListItem, BookingListQuery } from "@/types/DashboardTypes/BookingsTypes"

function formatDate(dateString?: string | null): string {
  if (!dateString) return "-"
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

function BookingListTable() {
  const { t } = useTranslation("dashboard")

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [bookingFilters, setBookingFilters] = useState<Record<string, string[]>>({
    Status: [],
    "Check-In Status": [],
    "Match Type": [],
    Team: [],
    "Sort By": [],
    "Sort Order": [],
  })

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  // Build query parameters for API request
  const queryParams: BookingListQuery = useMemo(() => {
    const params: BookingListQuery = {
      page: currentPage,
      limit: itemsPerPage,
    }

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim()
    }

    if (bookingFilters["Status"]?.length) {
      params.status = bookingFilters["Status"][0]
    }

    if (bookingFilters["Check-In Status"]?.length) {
      params.check_in_status = bookingFilters["Check-In Status"]
    }

    if (bookingFilters["Match Type"]?.length) {
      params.match_type = bookingFilters["Match Type"][0]
    }

    if (bookingFilters["Team"]?.length) {
      params.team = bookingFilters["Team"][0]
    }

    if (bookingFilters["Sort By"]?.length) {
      params.sort_by = bookingFilters["Sort By"][0]
    }

    if (bookingFilters["Sort Order"]?.length) {
      params.sort_order = bookingFilters["Sort Order"][0] as "asc" | "desc"
    }

    return params
  }, [currentPage, itemsPerPage, debouncedSearch, bookingFilters])

  // Fetch bookings list via RTK Query
  const {
    data: bookingsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetBookingsQuery(queryParams)

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleRowClick = (row: BookingListItem) => {
    setSelectedBookingId(row.booking_id)
    setSheetOpen(true)
  }

  const handleViewDetails = (row: BookingListItem) => {
    setSelectedBookingId(row.booking_id)
    setSheetOpen(true)
  }

  const handleRemoveFilter = (groupTitle: string, value: string) => {
    const current = bookingFilters[groupTitle] || []
    setBookingFilters({
      ...bookingFilters,
      [groupTitle]: current.filter((v) => v !== value),
    })
    setCurrentPage(1)
  }

  const handleClearAllFilters = () => {
    setBookingFilters({
      Status: [],
      "Check-In Status": [],
      "Match Type": [],
      Team: [],
      "Sort By": [],
      "Sort Order": [],
    })
    setCurrentPage(1)
  }

  const activeFilterCount = useMemo(() => {
    return Object.values(bookingFilters).reduce(
      (sum, arr) => sum + (arr?.length || 0),
      0,
    )
  }, [bookingFilters])

  const filterGroups: FilterGroup[] = useMemo(
    () => [
      {
        title: "Status",
        type: "single",
        options: [
          { label: "Paid", value: "paid" },
          { label: "Pending", value: "pending" },
          { label: "Unpaid", value: "unpaid" },
          { label: "Failed", value: "failed" },
        ],
      },
      {
        title: "Check-In Status",
        type: "multiple",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Checked In", value: "checked_in" },
          { label: "No Show", value: "no_show" },
        ],
      },
      {
        title: "Match Type",
        type: "single",
        options: [
          { label: "Ranked", value: "ranked" },
          { label: "Social", value: "social" },
        ],
      },
      {
        title: "Team",
        type: "single",
        options: [
          { label: "Team A", value: "A" },
          { label: "Team B", value: "B" },
        ],
      },
      {
        title: "Sort By",
        type: "single",
        options: [
          { label: "Booking Date", value: "booking_date" },
          { label: "Amount", value: "amount" },
          { label: "Match Date", value: "match_date" },
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
    [],
  )

  const columns: {
    header: string
    accessor: keyof BookingListItem | ((row: BookingListItem) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("bookings.columns.bookingId", "Booking ID"),
      accessor: (row: BookingListItem) => (
        <span className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-custom-red" />
          {row.display_booking_id || `#CH ${row.booking_id}`}
        </span>
      ),
    },
    {
      header: t("bookings.columns.playerName", "Player Name"),
      accessor: (row: BookingListItem) => (
        <div className="flex flex-col">
          <span className="font-medium text-primary">{row.player_name || "-"}</span>
          {row.player_email && (
            <span className="text-xs text-secondary">{row.player_email}</span>
          )}
        </div>
      ),
    },
    {
      header: t("bookings.columns.sessionDate", "Session Date"),
      accessor: (row: BookingListItem) => formatDate(row.match_date),
    },
    {
      header: t("bookings.columns.package", "Package"),
      accessor: (row: BookingListItem) => (
        <span className="text-secondary">{row.package_name || "-"}</span>
      ),
    },
    {
      header: t("bookings.columns.matchType", "Match Type"),
      accessor: (row: BookingListItem) => (
        <BookingMatchTypeDot type={row.match_type} />
      ),
    },
    {
      header: t("bookings.columns.amount", "Amount"),
      accessor: (row: BookingListItem) => (
        <span className="font-medium text-primary">
          {row.amount_display || (row.amount ? `€${row.amount}` : "-")}
        </span>
      ),
    },
    {
      header: t("bookings.columns.checkInStatus", "Check-in Status"),
      accessor: (row: BookingListItem) => (
        <BookingStatusBadge
          status={row.check_in_status_display || row.check_in_status}
          size="sm"
        />
      ),
    },
    {
      header: t("bookings.columns.status", "Payment Status"),
      accessor: (row: BookingListItem) => (
        <BookingStatusBadge
          status={row.payment_status || row.status}
          size="sm"
        />
      ),
    },
  ]

  const actionRenderer = (row: BookingListItem) => (
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
        className="bg-card border border-white/10 w-40"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            handleViewDetails(row)
          }}
          className="cursor-pointer text-primary gap-2 focus:bg-white/5"
        >
          <FaRegEye className="w-3.5 h-3.5" />
          {t("bookings.actions.viewDetails", "View Details")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  type TableRow = BookingListItem & Record<string, unknown>

  // Initial loading state
  if (isLoading && !bookingsResponse) {
    return <BookingListLoading />
  }

  return (
    <div className="space-y-5">
      {/* Top Header & Search/Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("bookings.title", "Bookings")}
          </h1>
          <p className="text-sm text-secondary mt-1">
            {t("bookings.subtitle", "View and manage all arena booking requests and history.")}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <BookingSearchBar value={search} onChange={handleSearchChange} />

          {/* Filter Button with active count badge */}
          <button
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer relative shrink-0"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t("common.filter", "Filter")}</span>
            {activeFilterCount > 0 && (
              <span className="bg-custom-red text-white text-xs font-semibold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Bar */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-secondary">Active filters:</span>
          {Object.entries(bookingFilters).flatMap(([groupTitle, values]) =>
            values.map((val) => (
              <span
                key={`${groupTitle}-${val}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-primary"
              >
                <span className="text-secondary">{groupTitle}:</span>
                <span className="capitalize">{val.replace(/_/g, " ")}</span>
                <button
                  onClick={() => handleRemoveFilter(groupTitle, val)}
                  className="hover:text-custom-red transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )),
          )}
          <button
            onClick={handleClearAllFilters}
            className="text-xs text-custom-red hover:underline ml-1 cursor-pointer font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Error state alert */}
      {isError && (
        <div className="p-4 rounded-xl bg-custom-red/10 border border-custom-red/20 flex items-center justify-between gap-3 text-sm text-red-400">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{t("bookings.errorFetching", "Failed to fetch bookings. Please try again.")}</span>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-custom-red/20 hover:bg-custom-red/30 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t("common.retry", "Retry")}
          </button>
        </div>
      )}

      {/* Bookings Table */}
      <div className="relative">
        {isFetching && (
          <div className="absolute top-2 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-black/80 text-secondary border border-white/10">
              <RefreshCw className="w-3 h-3 animate-spin text-custom-red" />
              Updating...
            </span>
          </div>
        )}

        <CustomTable
          data={((bookingsResponse?.data ?? []) as unknown as TableRow[])}
          columns={
            columns as {
              header: string
              accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
              className?: string
            }[]
          }
          actionRenderer={(row) => actionRenderer(row as BookingListItem)}
          onRowClick={(row) => handleRowClick(row as BookingListItem)}
          serverPagination={true}
          currentPage={currentPage}
          totalPages={bookingsResponse?.meta?.totalPage ?? 1}
          additionalCount={bookingsResponse?.meta?.total ?? 0}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(size) => {
            setItemsPerPage(size)
            setCurrentPage(1)
          }}
          minTableWidth="min-w-[900px]"
        />
      </div>

      {/* Details Slide-out Sheet */}
      <BookingDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        bookingId={selectedBookingId}
      />

      {/* Cancel Dialog (kept for future actions) */}
      <BookingCancelDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={() => setCancelDialogOpen(false)}
      />

      {/* Filter Sheet */}
      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filters")}
        filterGroups={filterGroups}
        selectedFilters={bookingFilters}
        onFilterChange={(newFilters) => {
          setBookingFilters(newFilters)
          setCurrentPage(1)
        }}
        onReset={handleClearAllFilters}
      />
    </div>
  )
}

export default BookingListTable
