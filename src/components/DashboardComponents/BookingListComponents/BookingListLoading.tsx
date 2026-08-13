"use client"

/**
 * BookingListLoading.tsx
 * Skeleton loading state component for the booking list.
 * Renders placeholder rows and headers matching the table layout
 * while data is being fetched from the API.
 */

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

/** Number of skeleton rows to display during loading */
const SKELETON_ROW_COUNT = 13

/** Number of columns in the booking table */
const COLUMN_COUNT = 7

function BookingListLoading() {
  return (
    <div className="space-y-5">
      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Search bar skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Skeleton className="h-10 w-full sm:w-72 rounded-lg" />
      </div>

      {/* Table skeleton */}
      <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-7 gap-3 px-4 py-3 border-b border-white/5">
          {Array.from({ length: COLUMN_COUNT }).map((_, index) => (
            <Skeleton key={`booking-header-${index}`} className="h-4 w-16" />
          ))}
        </div>

        {/* Body rows */}
        <div className="space-y-3 p-4">
          {Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIndex) => (
            <div
              key={`booking-row-${rowIndex}`}
              className="grid grid-cols-7 gap-3"
            >
              {Array.from({ length: COLUMN_COUNT }).map((__, columnIndex) => (
                <Skeleton
                  key={`booking-cell-${rowIndex}-${columnIndex}`}
                  className="h-5 md:h-8 w-full"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingListLoading
