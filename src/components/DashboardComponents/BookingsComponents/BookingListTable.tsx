"use client"

/**
 * BookingListTable.tsx
 * Main booking list table component using the shared CustomTable.
 * Handles search, pagination, row click to open details sheet,
 * and dropdown actions for cancel/view details.
 */

import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegEye, FaTrashAlt } from "react-icons/fa"
import CustomTable from "@/components/SharedComponents/CustomTable"
import BookingSearchBar from "./BookingSearchBar"
import BookingStatusBadge from "./BookingStatusBadge"
import BookingMatchTypeDot from "./BookingMatchTypeDot"
import BookingDetailsSheet from "./BookingDetailsSheet"
import BookingCancelDialog from "./BookingCancelDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockBookingListData } from "../../../mock-data/DashboardMockData/booking-list-mock-data"
import type { BookingListItem } from "@/types/DashboardTypes/BookingsTypes"

function BookingListTable() {
  const { t } = useTranslation("dashboard")

  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [cancelBookingId, setCancelBookingId] = useState<number | null>(null)

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockBookingListData
    const normalizedSearch = search.trim().toLowerCase()
    return mockBookingListData.filter((item) =>
      [
        item.display_booking_id,
        item.player_name,
        item.match_date,
        item.match_type,
        item.package_name,
        item.amount_display,
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

  const handleRowClick = (row: BookingListItem) => {
    setSelectedBookingId(row.booking_id)
    setSheetOpen(true)
  }

  const handleViewDetails = (row: BookingListItem) => {
    setSelectedBookingId(row.booking_id)
    setSheetOpen(true)
  }

  const handleCancelClick = (row: BookingListItem) => {
    setCancelBookingId(row.booking_id)
    setCancelDialogOpen(true)
  }

  const handleCancelConfirm = (reason: string) => {
    setCancelDialogOpen(false)
    setCancelBookingId(null)
  }

  const columns: {
    header: string
    accessor: keyof BookingListItem | ((row: BookingListItem) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("bookings.columns.bookingId"),
      accessor: (row: BookingListItem) => (
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-custom-red" />
          {row.display_booking_id}
        </span>
      ),
    },
    {
      header: t("bookings.columns.playerName"),
      accessor: "player_name",
    },
    {
      header: t("bookings.columns.sessionDate"),
      accessor: "match_date",
    },
    {
      header: t("bookings.columns.package"),
      accessor: "package_name",
    },
    {
      header: t("bookings.columns.matchType"),
      accessor: (row: BookingListItem) => (
        <BookingMatchTypeDot type={row.match_type} />
      ),
    },
    {
      header: t("bookings.columns.amount"),
      accessor: "amount_display",
    },
    {
      header: t("bookings.columns.checkInStatus"),
      accessor: (row: BookingListItem) => (
        <BookingStatusBadge status={row.check_in_status} size="sm" />
      ),
    },
    {
      header: t("bookings.columns.status"),
      accessor: (row: BookingListItem) => (
        <BookingStatusBadge status={row.status} size="sm" />
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
            handleCancelClick(row)
          }}
          className="cursor-pointer text-primary gap-2 focus:bg-white/5"
        >
          <FaTrashAlt className="w-3.5 h-3.5" />
          {t("bookings.actions.cancel")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            handleViewDetails(row)
          }}
          className="cursor-pointer text-primary gap-2 focus:bg-white/5"
        >
          <FaRegEye className="w-3.5 h-3.5" />
          {t("bookings.actions.viewDetails")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  type TableRow = BookingListItem & Record<string, unknown>

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {t("bookings.title")}
          </h1>
          <p className="text-sm text-secondary mt-1">{t("bookings.subtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <BookingSearchBar value={search} onChange={handleSearchChange} />
        </div>
      </div>

      <CustomTable
        data={filteredData as unknown as TableRow[]}
        columns={columns as { header: string; accessor: keyof TableRow | ((row: TableRow) => React.ReactNode); className?: string }[]}
        actionRenderer={(row) => actionRenderer(row as BookingListItem)}
        onRowClick={(row) => handleRowClick(row as BookingListItem)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(size) => {
          setItemsPerPage(size)
          setCurrentPage(1)
        }}
        minTableWidth="min-w-[900px]"
      />

      <BookingDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        bookingId={selectedBookingId}
      />

      <BookingCancelDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleCancelConfirm}
      />
    </div>
  )
}

export default BookingListTable
