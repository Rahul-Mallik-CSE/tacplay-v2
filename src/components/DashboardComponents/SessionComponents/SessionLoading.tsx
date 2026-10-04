"use client"

/**
 * SessionLoading.tsx
 * Skeleton loading state component for the sessions list.
 * Matches the exact columns, headers, badges, and layout of the SessionTable.
 */

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

/** Skeleton table component for sessions list */
export function SessionTableSkeleton({ rowCount = 8 }: { rowCount?: number }) {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl overflow-hidden border border-white/5 bg-card/40">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Table Header */}
            <div className="bg-muted/50 border-b border-white/5 px-4 py-3.5 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-2">
                <Skeleton className="h-4 w-24 bg-white/10" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-24 bg-white/10" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-24 bg-white/10" />
              </div>
              <div className="col-span-1">
                <Skeleton className="h-4 w-18 bg-white/10" />
              </div>
              <div className="col-span-1 text-center">
                <Skeleton className="h-4 w-14 bg-white/10 mx-auto" />
              </div>
              <div className="col-span-1 text-center">
                <Skeleton className="h-4 w-14 bg-white/10 mx-auto" />
              </div>
              <div className="col-span-1 text-right">
                <Skeleton className="h-4 w-14 bg-white/10 ml-auto" />
              </div>
              <div className="col-span-1 text-center">
                <Skeleton className="h-4 w-16 bg-white/10 mx-auto" />
              </div>
              <div className="col-span-1 text-right">
                <Skeleton className="h-4 w-8 bg-white/10 ml-auto" />
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <div
                  key={`session-skeleton-row-${rowIndex}`}
                  className="px-4 py-4 grid grid-cols-12 gap-3 items-center hover:bg-white/[0.02] transition-colors"
                >
                  {/* Session Name & ID */}
                  <div className="col-span-2 space-y-1.5">
                    <Skeleton className="h-4 w-28 bg-white/10" />
                    <Skeleton className="h-3 w-16 bg-white/5" />
                  </div>

                  {/* Date & Time */}
                  <div className="col-span-2 space-y-1.5">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                    <Skeleton className="h-3 w-28 bg-white/5" />
                  </div>

                  {/* Assigned Staff */}
                  <div className="col-span-2 flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full bg-white/10 shrink-0" />
                    <Skeleton className="h-4 w-20 bg-white/10" />
                  </div>

                  {/* Match Type */}
                  <div className="col-span-1 flex items-center gap-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full bg-custom-red/30 shrink-0" />
                    <Skeleton className="h-3.5 w-14 bg-white/10" />
                  </div>

                  {/* Players */}
                  <div className="col-span-1 text-center">
                    <Skeleton className="h-4 w-10 bg-white/10 mx-auto" />
                  </div>

                  {/* Booked */}
                  <div className="col-span-1 text-center">
                    <Skeleton className="h-4 w-10 bg-white/10 mx-auto" />
                  </div>

                  {/* Price */}
                  <div className="col-span-1 text-right">
                    <Skeleton className="h-4 w-14 bg-white/10 ml-auto" />
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-1 flex justify-center">
                    <Skeleton className="h-6 w-18 rounded-md bg-white/10" />
                  </div>

                  {/* Action Icon */}
                  <div className="col-span-1 flex justify-end">
                    <Skeleton className="h-8 w-8 rounded-full bg-white/5 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-2 pt-1 flex-wrap gap-3">
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
          <Skeleton className="h-8 w-8 rounded-md bg-custom-red/40" />
          <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
          <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-36 bg-white/10" />
          <Skeleton className="h-8 w-24 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  )
}

/** Full page loading component for sessions list route */
function SessionLoading() {
  return (
    <div className="w-full space-y-6">
      {/* Top Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Skeleton className="h-9 w-44 bg-white/10" />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Skeleton className="h-10 w-full sm:w-64 rounded-lg bg-white/10" />
          <Skeleton className="h-10 w-24 rounded-lg bg-white/10" />
          <Skeleton className="h-10 w-11 rounded-lg bg-white/10" />
          <Skeleton className="h-10 w-36 rounded-lg bg-custom-red/40" />
        </div>
      </div>

      {/* Table Skeleton */}
      <SessionTableSkeleton rowCount={8} />
    </div>
  )
}

export default SessionLoading
