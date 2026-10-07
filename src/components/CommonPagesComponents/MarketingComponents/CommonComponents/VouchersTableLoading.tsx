"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface VouchersTableLoadingProps {
  title?: string
  subtitle?: string
  rowCount?: number
}

export default function VouchersTableLoading({
  title,
  subtitle,
  rowCount = 8,
}: VouchersTableLoadingProps) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          {title ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
              {subtitle && <p className="text-sm text-secondary mt-1">{subtitle}</p>}
            </>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-8 w-56 bg-white/10" />
              <Skeleton className="h-4 w-72 bg-white/5" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search bar skeleton */}
          <Skeleton className="h-10 w-full sm:w-64 rounded-lg bg-white/10" />

          {/* Create voucher button skeleton */}
          <Skeleton className="h-10 w-44 rounded-lg bg-custom-red/40 shrink-0" />
        </div>
      </div>

      {/* Table Skeleton matching CustomTable layout */}
      <div className="rounded-xl overflow-hidden border border-white/5 bg-card/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            {/* Header */}
            <thead className="bg-muted/50 border-b border-white/5">
              <tr>
                <th className="py-4 px-4">
                  <Skeleton className="h-3.5 w-24 bg-white/10" />
                </th>
                <th className="py-4 px-4">
                  <Skeleton className="h-3.5 w-20 bg-white/10" />
                </th>
                <th className="py-4 px-4">
                  <Skeleton className="h-3.5 w-18 bg-white/10" />
                </th>
                <th className="py-4 px-4">
                  <Skeleton className="h-3.5 w-24 bg-white/10" />
                </th>
                <th className="py-4 px-4">
                  <Skeleton className="h-3.5 w-16 bg-white/10" />
                </th>
                <th className="py-4 px-4">
                  <Skeleton className="h-3.5 w-28 bg-white/10" />
                </th>
                <th className="py-4 px-4">
                  <Skeleton className="h-3.5 w-16 bg-white/10" />
                </th>
                <th className="py-4 px-4 text-right">
                  <Skeleton className="h-3.5 w-10 bg-white/10 ml-auto" />
                </th>
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="divide-y divide-white/5">
              {Array.from({ length: rowCount }).map((_, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  {/* Voucher code */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-28 bg-custom-yellow/30" />
                      <Skeleton className="h-3 w-36 bg-white/5" />
                    </div>
                  </td>

                  {/* Session */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-20 bg-white/10" />
                  </td>

                  {/* Discount */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-16 bg-white/10" />
                  </td>

                  {/* Min order */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-20 bg-white/10" />
                  </td>

                  {/* Used */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-12 bg-white/10" />
                  </td>

                  {/* Duration */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-4 w-28 bg-white/10" />
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <Skeleton className="h-6 w-18 rounded-md bg-white/10" />
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <Skeleton className="h-8 w-8 rounded-full bg-white/5 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 bg-white/5" />
          <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28 bg-white/5" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
            <Skeleton className="h-8 w-8 rounded-md bg-custom-red/40" />
            <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}
