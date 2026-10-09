"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface SessionTableSkeletonProps {
  rowCount?: number
  showControls?: boolean
}

export default function SessionTableSkeleton({
  rowCount = 8,
  showControls = true,
}: SessionTableSkeletonProps) {
  return (
    <div className="w-full space-y-5 animate-pulse">
      {/* Top Header & Search/Filter Controls */}
      {showControls && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-lg bg-white/10 shrink-0" />
            <Skeleton className="h-8 md:h-9 w-44 bg-white/10 rounded-lg" />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Skeleton className="h-10 w-full sm:w-64 bg-white/10 rounded-lg" />
            <Skeleton className="h-10 w-24 bg-white/10 rounded-lg shrink-0" />
          </div>
        </div>
      )}

      {/* Table Container Skeleton */}
      <div className="rounded-xl overflow-hidden border border-white/5 bg-card/40">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            {/* Header */}
            <thead>
              <tr className="bg-muted/50 border-b border-white/5">
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-28 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-24 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-28 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-22 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-16 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-16 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-16 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-left">
                  <Skeleton className="h-4 w-18 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-right">
                  <Skeleton className="h-4 w-12 bg-white/10 ml-auto" />
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-white/5">
              {Array.from({ length: rowCount }).map((_, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  {/* Session Name & ID */}
                  <td className="py-4 px-4">
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-32 bg-white/10" />
                      <Skeleton className="h-3 w-16 bg-white/5" />
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-4">
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-24 bg-white/10" />
                      <Skeleton className="h-3 w-32 bg-white/5" />
                    </div>
                  </td>

                  {/* Field / Staff */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28 bg-white/10" />
                        <Skeleton className="h-3 w-36 bg-white/5" />
                      </div>
                    </div>
                  </td>

                  {/* Match Type */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-2.5 h-2.5 rounded-full bg-emerald-400/40" />
                      <Skeleton className="h-4 w-16 bg-white/10" />
                    </div>
                  </td>

                  {/* Player */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-12 font-mono bg-white/10" />
                  </td>

                  {/* Booked */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-12 font-mono bg-white/10" />
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-16 font-medium bg-white/10" />
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-6 w-20 rounded-md bg-white/10" />
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <Skeleton className="h-8 w-8 rounded-full bg-white/10 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-2 pt-1 gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          <Skeleton className="h-9 w-9 rounded-md bg-white/10" />
          <Skeleton className="h-9 w-9 rounded-md bg-custom-red/40" />
          <Skeleton className="h-9 w-9 rounded-md bg-white/10" />
          <Skeleton className="h-9 w-9 rounded-md bg-white/10" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28 bg-white/10" />
          <Skeleton className="h-8 w-24 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  )
}
