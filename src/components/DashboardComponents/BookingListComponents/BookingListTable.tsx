"use client"

/**
 * BookingListTable.tsx
 * Main booking list table component with search, pagination,
 * and row click to open details sheet. Uses mock data for
 * demonstration without API integration.
 */

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import BookingSearchBar from "./BookingSearchBar"
import BookingStatusBadge from "./BookingStatusBadge"
import BookingMatchTypeDot from "./BookingMatchTypeDot"
import BookingListLoading from "./BookingListLoading"
import BookingDetailsSheet from "./BookingDetailsSheet"
import { mockBookingListData } from "../../../mock-data/DashboardMockData/booking-list-mock-data"
import type { BookingListItem } from "@/types/DashboardTypes/BookingListTypes"

/** Items per page options */
const PAGE_SIZE_OPTIONS = [10, 25, 50] as const

function BookingListTable() {
  const { t } = useTranslation("dashboard")

  // Local state for search, pagination, and sheet
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

  // Filter and paginate mock data
  const filteredData = useMemo(() => {
    if (!search.trim()) return mockBookingListData
    const normalizedSearch = search.trim().toLowerCase()
    return mockBookingListData.filter((item) =>
      [
        item.display_booking_id,
        item.player_name,
        item.match_date,
        item.match_type,
        item.payment_status,
        item.team_display,
        item.status,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch)),
    )
  }, [search])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage)
  const endIndex = startIndex + currentData.length

  // Handle search change with page reset
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  // Handle row click to open details sheet
  const handleRowClick = (booking: BookingListItem) => {
    setSelectedBookingId(booking.booking_id)
    setSheetOpen(true)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
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
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {t("bookings.title")}
        </h1>
        <p className="text-sm text-secondary mt-1">{t("bookings.subtitle")}</p>
      </div>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <BookingSearchBar value={search} onChange={handleSearchChange} />
      </div>

      {/* Table */}
      <div className="w-full space-y-3 sm:space-y-4 overflow-x-auto">
        <div className="rounded-xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="bg-muted/50 hover:bg-muted/50 border-b border-white/5">
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("bookings.columns.bookingId")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("bookings.columns.playerName")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("bookings.columns.sessionDate")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("bookings.columns.matchType")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("bookings.columns.paymentStatus")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("bookings.columns.team")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-left whitespace-nowrap">
                    {t("bookings.columns.status")}
                  </th>
                  <th className="font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 px-4 text-right whitespace-nowrap">
                    {t("common.action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr
                    key={row.booking_id}
                    className="border-b border-white/5 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-custom-red" />
                        {row.display_booking_id}
                      </span>
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      {row.player_name}
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      {row.match_date}
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      <BookingMatchTypeDot type={row.match_type} />
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      <BookingStatusBadge status={row.payment_status} size="sm" />
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      {row.team_display}
                    </td>
                    <td className="text-primary/80 py-3 sm:py-4 px-4 text-xs sm:text-sm whitespace-nowrap">
                      <BookingStatusBadge status={row.status} size="sm" />
                    </td>
                    <td className="text-right py-3 sm:py-4 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowClick(row)
                        }}
                        className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-custom-yellow"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 gap-3 flex-wrap">
          <p className="text-xs text-secondary">
            {t("table.showing", {
              from: filteredData.length === 0 ? 0 : startIndex + 1,
              to: Math.min(endIndex, filteredData.length),
              total: filteredData.length,
            })}
          </p>
          <div className="flex items-center gap-2">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4 text-secondary hover:text-primary transition-colors cursor-pointer ${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
            >
              &laquo; Prev
            </button>

            {/* Page numbers */}
            <div className="hidden sm:flex items-center gap-1">
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

            {/* Mobile current page */}
            <span className="sm:hidden text-xs h-8 w-8 flex items-center justify-center bg-custom-red text-white rounded-md">
              {currentPage}
            </span>

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4 text-secondary hover:text-primary transition-colors cursor-pointer ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              Next &raquo;
            </button>

            {/* Items per page select */}
            <select
              className="bg-muted border border-white/10 text-primary text-xs rounded-md px-2 py-1.5 outline-none"
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
          </div>
        </div>
      </div>

      {/* Details sheet */}
      <BookingDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        bookingId={selectedBookingId}
      />
    </div>
  )
}

export default BookingListTable
