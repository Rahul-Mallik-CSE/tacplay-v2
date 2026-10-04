"use client"

import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  setYear,
  setMonth,
  setRevenuePeriod,
  setBookingCheckinPeriod,
  setRevenueSourcePeriod,
} from "@/redux/features/dashboard/analytics/analyticsSlice"
import { useGetAnalyticsQuery } from "@/redux/features/dashboard/analytics/analyticsAPI"
import AnalyticsHeader from "./AnalyticsHeader"
import StatCards from "./StatCards"
import RevenueOverTimeChart from "./RevenueOverTimeChart"
import BookingVsCheckinsChart from "./BookingVsCheckinsChart"
import RevenueSourceChart from "./RevenueSourceChart"
import TopPackagesTable from "./TopPackagesTable"
import type { AnalyticsData } from "@/types/DashboardTypes/AnalyticsTypes"

function exportAnalyticsCSV(data: AnalyticsData) {
  try {
    const lines: string[] = []
    lines.push(`Field: "${data.field?.field_name || "Tacplay Arena"}"`)
    lines.push(
      `Period: Year ${data.filters.selected.year}, Month ${data.filters.selected.month}`
    )
    lines.push("")
    lines.push("SUMMARY METRICS")
    lines.push("Metric,Value,Change,Subtitle")
    if (data.summary.total_revenue) {
      lines.push(
        `"Total Revenue","${data.summary.total_revenue.currency || "EUR"} ${data.summary.total_revenue.value}","${data.summary.total_revenue.change?.display || ""}","${data.summary.total_revenue.subtitle || ""}"`
      )
    }
    if (data.summary.total_booking) {
      lines.push(
        `"Total Booking","${data.summary.total_booking.value}","${data.summary.total_booking.change?.display || ""}","${data.summary.total_booking.subtitle || ""}"`
      )
    }
    if (data.summary.total_player) {
      lines.push(
        `"Total Player","${data.summary.total_player.value}","${data.summary.total_player.change?.display || ""}","${data.summary.total_player.subtitle || ""}"`
      )
    }
    if (data.summary.check_in_rate) {
      lines.push(
        `"Check-in Rate","${data.summary.check_in_rate.display}","${data.summary.check_in_rate.change?.display || ""}","${data.summary.check_in_rate.subtitle || ""}"`
      )
    }
    if (data.summary.average_revenue) {
      lines.push(
        `"Avg Revenue","${data.summary.average_revenue.currency || "EUR"} ${data.summary.average_revenue.value}","${data.summary.average_revenue.change?.display || ""}","${data.summary.average_revenue.subtitle || ""}"`
      )
    }

    lines.push("")
    lines.push("TOP PERFORMING PACKAGES")
    lines.push("Package Name,Bookings,Revenue,Players,Conversion Rate")
    ;(data.top_performing_packages?.items || []).forEach((pkg) => {
      lines.push(
        `"${pkg.package_name}","${pkg.booking?.value ?? 0}","${pkg.revenue}","${pkg.player ?? 0}","${pkg.conversion_rate?.display || ""}"`
      )
    })

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `analytics_${data.filters.selected.year}_${data.filters.selected.month}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Analytics report downloaded successfully.")
  } catch {
    toast.error("Failed to export analytics report.")
  }
}

export default function AnalyticsPage() {
  const dispatch = useAppDispatch()
  const { year, month, revenuePeriod, bookingCheckinPeriod, revenueSourcePeriod } =
    useAppSelector((state) => state.analytics)

  const [isExporting, setIsExporting] = useState(false)

  const {
    data: analyticsResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetAnalyticsQuery({
    year,
    month,
    revenue_period: revenuePeriod,
    booking_checkin_period: bookingCheckinPeriod,
    revenue_source_period: revenueSourcePeriod,
  })

  const analyticsData = analyticsResponse?.data

  // Sync initial Redux filters with backend's selected filters on first response
  useEffect(() => {
    if (analyticsData?.filters?.selected) {
      const selected = analyticsData.filters.selected
      if (selected.year && selected.year !== year) {
        dispatch(setYear(selected.year))
      }
      if (selected.month && selected.month !== month) {
        dispatch(setMonth(selected.month))
      }
    }
  }, [analyticsData?.filters?.selected])

  const handleExport = () => {
    if (!analyticsData) {
      toast.error("No analytics data available to export.")
      return
    }
    setIsExporting(true)
    exportAnalyticsCSV(analyticsData)
    setIsExporting(false)
  }

  // Error State
  if (error && !analyticsData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-custom-red/10 border border-custom-red/20 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7 text-custom-red" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">Failed to load analytics</h2>
        <p className="text-sm text-secondary max-w-md mb-6">
          Could not retrieve analytics data from the server. Please check your connection or try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="flex items-center gap-2 px-5 py-2.5 bg-custom-red text-white text-sm font-medium rounded-lg hover:bg-custom-red/80 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    )
  }

  // Loading Skeleton State
  if (isLoading && !analyticsData) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted rounded-lg" />
            <div className="h-4 w-72 bg-muted rounded-lg" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-28 bg-muted rounded-lg" />
            <div className="h-10 w-24 bg-muted rounded-lg" />
            <div className="h-10 w-32 bg-muted rounded-lg" />
          </div>
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted/60 rounded-xl border border-white/5 p-4" />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-[360px] bg-muted/60 rounded-xl border border-white/5" />
          <div className="h-[360px] bg-muted/60 rounded-xl border border-white/5" />
          <div className="h-[360px] bg-muted/60 rounded-xl border border-white/5" />
        </div>

        {/* Table skeleton */}
        <div className="h-64 bg-muted/60 rounded-xl border border-white/5" />
      </div>
    )
  }

  return (
    <div className="space-y-6 relative">
      {/* Background fetching indicator */}
      {isFetching && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/80 border border-white/10 text-[11px] text-secondary backdrop-blur-xs z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-custom-yellow animate-ping" />
          Updating...
        </div>
      )}

      {/* Header */}
      <AnalyticsHeader
        selectedYear={year}
        selectedMonth={month}
        yearOptions={analyticsData?.filters?.options?.years || [2024, 2025, 2026, 2027]}
        monthOptions={analyticsData?.filters?.options?.months || []}
        onYearChange={(newYear) => dispatch(setYear(newYear))}
        onMonthChange={(newMonth) => dispatch(setMonth(newMonth))}
        onExportReport={handleExport}
        fieldName={analyticsData?.field?.field_name}
        isExporting={isExporting}
      />

      {/* Stat Cards */}
      <StatCards summary={analyticsData?.summary} />

      {/* 3 Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueOverTimeChart
          section={analyticsData?.revenue_over_time}
          selectedPeriod={revenuePeriod}
          periodOptions={analyticsData?.filters?.options?.revenue_periods}
          onPeriodChange={(p) => dispatch(setRevenuePeriod(p))}
        />
        <BookingVsCheckinsChart
          section={analyticsData?.booking_vs_checkins}
          selectedPeriod={bookingCheckinPeriod}
          periodOptions={analyticsData?.filters?.options?.booking_checkin_periods}
          onPeriodChange={(p) => dispatch(setBookingCheckinPeriod(p))}
        />
        <RevenueSourceChart
          section={analyticsData?.revenue_source}
          selectedPeriod={revenueSourcePeriod}
          periodOptions={analyticsData?.filters?.options?.revenue_source_periods}
          onPeriodChange={(p) => dispatch(setRevenueSourcePeriod(p))}
        />
      </div>

      {/* Top Performing Packages Table */}
      <TopPackagesTable
        section={analyticsData?.top_performing_packages}
        currency={analyticsData?.revenue_source?.currency || "EUR"}
      />
    </div>
  )
}
