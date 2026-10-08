"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import {
  setSelectedYear,
  setRevenuePeriod,
  setSubscriptionPeriod,
  setCountryPeriod,
} from "@/redux/features/admin/overview/overviewSlice"
import { useGetAdminOverviewQuery } from "@/redux/features/admin/overview/overviewAPI"
import OverviewHeader from "./OverviewHeader"
import SubscriptionDonutChart from "./SubscriptionDonutChart"
import RevenueByCountryOverview from "./RevenueByCountryOverview"
import RecentFieldTable from "./RecentFieldTable"
import AdminOverviewLoading from "./AdminOverviewLoading"
import {
  AdminStatCards,
  RevenueAreaChart,
  SubscriptionBarChart,
  RecentActivityList,
} from "@/components/AdminComponents/SharedComponents"
import {
  LayoutGrid,
  Users,
  UserCheck,
  CreditCard,
  DollarSign,
  Crown,
} from "lucide-react"
import type { AdminOverviewData } from "@/types/AdminTypes/OverviewTypes"

function exportAdminOverviewCSV(data: AdminOverviewData) {
  try {
    const lines: string[] = []
    lines.push(`"Tacplay Admin Overview Report"`)
    lines.push(`Period: Year ${data.header?.selected_year || ""}`)
    lines.push("")

    // Summary Metrics
    lines.push("SUMMARY METRICS")
    lines.push("Metric,Value,Change")
    if (data.analytics_cards?.total_field) {
      lines.push(
        `"Total Field","${data.analytics_cards.total_field.value}","${data.analytics_cards.total_field.change?.display || ""}"`
      )
    }
    if (data.analytics_cards?.total_player) {
      lines.push(
        `"Total Player","${data.analytics_cards.total_player.value}","${data.analytics_cards.total_player.change?.display || ""}"`
      )
    }
    if (data.analytics_cards?.premium_player) {
      lines.push(
        `"Premium Player","${data.analytics_cards.premium_player.value}","${data.analytics_cards.premium_player.change?.display || ""}"`
      )
    }
    if (data.analytics_cards?.total_revenue) {
      lines.push(
        `"Total Revenue","${data.analytics_cards.total_revenue.display || data.analytics_cards.total_revenue.value}","${data.analytics_cards.total_revenue.change?.display || ""}"`
      )
    }
    if (data.analytics_cards?.total_subscription) {
      lines.push(
        `"Total Subscription","${data.analytics_cards.total_subscription.value}","${data.analytics_cards.total_subscription.change?.display || ""}"`
      )
    }

    // Revenue Over Time
    lines.push("")
    lines.push("REVENUE OVER TIME")
    lines.push("Month,Amount")
    ;(data.revenue_over_time?.items || []).forEach((item) => {
      lines.push(`"${item.label}","${item.amount}"`)
    })

    // Active Subscriptions
    lines.push("")
    lines.push("SUBSCRIPTION ACTIVITY")
    lines.push("Month,Field,Player")
    ;(data.subscription_chart?.items || []).forEach((item) => {
      lines.push(`"${item.label}","${item.field}","${item.player}"`)
    })

    // Subscription Breakdown
    lines.push("")
    lines.push("SUBSCRIPTION BREAKDOWN")
    lines.push("Plan,Count,Percentage")
    ;(data.subscription_breakdown?.items || []).forEach((item) => {
      lines.push(`"${item.plan}","${item.count}","${item.percentage_display}"`)
    })

    // Revenue by Country
    lines.push("")
    lines.push("REVENUE BY COUNTRY")
    lines.push("Country,Code,Revenue,Percentage")
    ;(data.revenue_by_country?.items || []).forEach((item) => {
      lines.push(
        `"${item.country}","${item.country_code || ""}","${item.revenue}","${item.percentage_display}"`
      )
    })

    // Recent Fields
    lines.push("")
    lines.push("RECENT FIELDS")
    lines.push(
      "Field Name,Owner,Email,Subscription,Country,Bookings,Revenue,Status"
    )
    ;(data.recent_fields?.items || []).forEach((f) => {
      lines.push(
        `"${f.field_name}","${f.owner?.name || ""}","${f.owner?.email || ""}","${f.subscription?.name || ""}","${f.country?.name || ""}","${f.booking_count}","${f.revenue}","${f.status}"`
      )
    })

    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `admin_overview_${data.header?.selected_year || "report"}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Overview report downloaded successfully.")
  } catch {
    toast.error("Failed to export overview report.")
  }
}

export default function OverviewPage() {
  const { t } = useTranslation("dashboard")
  const dispatch = useDispatch()
  const [isExporting, setIsExporting] = useState(false)

  const {
    selectedYear,
    revenuePeriod,
    subscriptionPeriod,
    countryPeriod,
  } = useSelector((state: RootState) => state.adminOverview)

  const {
    data: overviewRes,
    isLoading,
    isError,
    refetch,
  } = useGetAdminOverviewQuery({
    year: selectedYear ?? 2026,
    revenue_period: revenuePeriod,
    subscription_period: subscriptionPeriod,
    country_period: countryPeriod,
  })

  if (isLoading) {
    return <AdminOverviewLoading />
  }

  const data = overviewRes?.data
  const header = data?.header
  const cards = data?.analytics_cards
  const revenueSection = data?.revenue_over_time
  const subscriptionChartSection = data?.subscription_chart
  const subscriptionBreakdown = data?.subscription_breakdown
  const countryRevenueSection = data?.revenue_by_country
  const recentActivitySection = data?.recent_activity
  const recentFieldsSection = data?.recent_fields

  const handleExport = () => {
    if (!data) {
      toast.error("No overview data available to export.")
      return
    }
    setIsExporting(true)
    exportAdminOverviewCSV(data)
    setIsExporting(false)
  }

  // Format Stat Cards
  const statCards = cards
    ? [
        {
          title: cards.total_field.label || "Total Field",
          value: cards.total_field.value,
          change: cards.total_field.change.display,
          isPositive: cards.total_field.change.is_positive,
          isNeutral: cards.total_field.change.direction === "same",
          icon: LayoutGrid,
        },
        {
          title: cards.total_player.label || "Total Player",
          value: cards.total_player.value,
          change: cards.total_player.change.display,
          isPositive: cards.total_player.change.is_positive,
          isNeutral: cards.total_player.change.direction === "same",
          icon: Users,
        },
        {
          title: cards.premium_player.label || "Premium Player",
          value: cards.premium_player.value,
          change: cards.premium_player.change.display,
          isPositive: cards.premium_player.change.is_positive,
          isNeutral: cards.premium_player.change.direction === "same",
          icon: UserCheck,
        },
        {
          title: cards.total_revenue.label || "Total Revenue",
          value: cards.total_revenue.display || `€${cards.total_revenue.value}`,
          change: cards.total_revenue.change.display,
          isPositive: cards.total_revenue.change.is_positive,
          isNeutral: cards.total_revenue.change.direction === "same",
          icon: DollarSign,
        },
        {
          title: cards.total_subscription.label || "Total Subscription",
          value: cards.total_subscription.value,
          change: cards.total_subscription.change.display,
          isPositive: cards.total_subscription.change.is_positive,
          isNeutral: cards.total_subscription.change.direction === "same",
          icon: CreditCard,
        },
      ]
    : []

  // Format Revenue Over Time Chart
  const revenueChartData = (revenueSection?.items || []).map((item) => ({
    month: item.label,
    revenue: parseFloat(item.amount) || 0,
  }))

  // Format Subscription Chart
  const subscriptionBarData = (
    subscriptionChartSection?.items || []
  ).map((item) => ({
    month: item.label,
    field: item.field,
    player: item.player,
  }))

  // Format Recent Activities
  const recentActivities = (recentActivitySection?.items || []).map(
    (item, idx) => {
      let formattedTime = ""
      if (item.created_at) {
        try {
          const d = new Date(item.created_at)
          formattedTime = d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        } catch {
          formattedTime = item.created_at
        }
      }

      return {
        id: idx + 1,
        icon: item.type === "new_subscription" ? Crown : Users,
        iconColor:
          item.type === "new_subscription"
            ? "text-custom-yellow"
            : "text-emerald-400",
        iconBg:
          item.type === "new_subscription"
            ? "bg-custom-yellow/10"
            : "bg-emerald-500/10",
        title: item.title,
        description: item.description,
        time: formattedTime,
      }
    }
  )

  return (
    <div className="space-y-6">
      <OverviewHeader
        title={header?.title}
        subtitle={header?.subtitle}
        selectedYear={selectedYear}
        availableYears={
          header?.available_years || overviewRes?.meta?.available_years
        }
        exportAvailable={header?.export_available}
        onYearChange={(yr) => dispatch(setSelectedYear(yr))}
        onExport={handleExport}
        isExporting={isExporting}
      />

      {isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 flex items-center justify-between">
          <span>Failed to load overview data.</span>
          <button
            onClick={() => refetch()}
            className="underline hover:text-white font-medium cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {statCards.length > 0 && <AdminStatCards stats={statCards} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <RevenueAreaChart
          data={revenueChartData}
          title={revenueSection?.title}
          showPeriodSelector={false}
        />
        <SubscriptionBarChart
          data={subscriptionBarData}
          title={subscriptionChartSection?.title}
          showPeriodSelector={false}
        />
        <SubscriptionDonutChart
          items={subscriptionBreakdown?.items}
          totalPremium={subscriptionBreakdown?.total_premium}
          selectedPeriod={subscriptionBreakdown?.selected_period}
          periodOptions={subscriptionBreakdown?.period_options}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RevenueByCountryOverview
          items={countryRevenueSection?.items}
          selectedPeriod={countryPeriod}
          periodOptions={countryRevenueSection?.period_options}
          onPeriodChange={(val) => dispatch(setCountryPeriod(val))}
        />
        <RecentActivityList
          activities={recentActivities}
          viewAllLabel={
            recentActivitySection?.view_all?.available
              ? t("adminOverview.viewAll")
              : undefined
          }
        />
      </div>

      <RecentFieldTable fields={recentFieldsSection?.items} />
    </div>
  )
}
