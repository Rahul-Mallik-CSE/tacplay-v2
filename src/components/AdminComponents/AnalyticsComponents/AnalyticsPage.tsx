"use client"

import React, { useEffect, useState, useMemo } from "react"
import { toast } from "react-toastify"
import {
  AlertCircle,
  RefreshCw,
  LayoutGrid,
  Users,
  UserCheck,
  DollarSign,
  CreditCard,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  setAdminYear,
  setAdminMonth,
  setAdminRevenuePeriod,
  setAdminSubscriptionPeriod,
  setAdminCountryPeriod,
  setAdminCampaignPeriod,
} from "@/redux/features/admin/analytics/analyticsSlice"
import { useGetAdminPlatformAnalyticsQuery } from "@/redux/features/admin/analytics/analyticsAPI"
import AnalyticsHeader from "./AnalyticsHeader"
import RevenueByCountry from "./RevenueByCountry"
import RevenueByList from "./RevenueByList"
import FieldDonutChart from "./FieldDonutChart"
import PlayerDonutChart from "./PlayerDonutChart"
import {
  AdminStatCards,
  RevenueAreaChart,
  SubscriptionBarChart,
} from "@/components/AdminComponents/SharedComponents"
import type {
  AdminAnalyticsData,
  DonutChartDataItem,
  CountryRevenueData,
} from "@/types/AdminTypes/AnalyticsTypes"

function exportAdminAnalyticsCSV(data: AdminAnalyticsData) {
  try {
    const lines: string[] = []
    lines.push(`"Tacplay Platform Analytics Report"`)
    lines.push(
      `Period: Year ${data.filters?.selected?.year || ""}, Month ${data.filters?.selected?.month || ""}`
    )
    lines.push("")

    // Summary
    lines.push("SUMMARY METRICS")
    lines.push("Metric,Value,Change,Subtitle")
    if (data.summary?.total_field) {
      lines.push(
        `"Total Field","${data.summary.total_field.value}","${data.summary.total_field.change?.display || ""}","${data.summary.total_field.subtitle || ""}"`
      )
    }
    if (data.summary?.total_player) {
      lines.push(
        `"Total Player","${data.summary.total_player.value}","${data.summary.total_player.change?.display || ""}","${data.summary.total_player.subtitle || ""}"`
      )
    }
    if (data.summary?.premium_player) {
      lines.push(
        `"Premium Player","${data.summary.premium_player.value}","${data.summary.premium_player.change?.display || ""}","${data.summary.premium_player.subtitle || ""}"`
      )
    }
    if (data.summary?.total_revenue) {
      lines.push(
        `"Total Revenue","${data.summary.total_revenue.display || data.summary.total_revenue.value}","${data.summary.total_revenue.change?.display || ""}","${data.summary.total_revenue.subtitle || ""}"`
      )
    }
    if (data.summary?.total_subscription) {
      lines.push(
        `"Total Subscription","${data.summary.total_subscription.value}","${data.summary.total_subscription.change?.display || ""}","${data.summary.total_subscription.subtitle || ""}"`
      )
    }

    // Revenue Over Time
    lines.push("")
    lines.push("REVENUE OVER TIME")
    lines.push("Month,Revenue")
    ;(data.revenue_over_time?.items || []).forEach((item) => {
      lines.push(`"${item.month}","${item.revenue}"`)
    })

    // Active Subscriptions
    lines.push("")
    lines.push("ACTIVE SUBSCRIPTIONS")
    lines.push("Month,Field,Player")
    ;(data.active_subscription_chart?.items || []).forEach((item) => {
      lines.push(`"${item.month}","${item.field}","${item.player}"`)
    })

    // Field Subscriptions
    lines.push("")
    lines.push("FIELD SUBSCRIPTION PLANS")
    lines.push("Plan,Count,Percentage")
    ;(data.field_subscriptions?.items || []).forEach((item) => {
      lines.push(`"${item.plan}","${item.count}","${item.percentage}%"`)
    })

    // Player Report
    lines.push("")
    lines.push("PLAYER MEMBERSHIP REPORT")
    lines.push("Tier,Count,Percentage")
    ;(data.player_report?.items || []).forEach((item) => {
      lines.push(`"${item.label}","${item.value}","${item.percentage}%"`)
    })

    // Revenue by Country
    lines.push("")
    lines.push("REVENUE BY COUNTRY")
    lines.push("Country,Code,Revenue,Percentage")
    ;(data.revenue_by_country?.items || []).forEach((item) => {
      lines.push(
        `"${item.country}","${item.country_code}","${item.revenue}","${item.percentage}%"`
      )
    })

    // Revenue by Commission
    lines.push("")
    lines.push("REVENUE BY COMMISSION")
    lines.push("Country,Code,Commission,Percentage")
    ;(data.revenue_by_commission?.items || []).forEach((item) => {
      lines.push(
        `"${item.country}","${item.country_code}","${item.commission}","${item.percentage}%"`
      )
    })

    // Revenue by Campaign
    lines.push("")
    lines.push("REVENUE BY CAMPAIGN")
    lines.push("Campaign Name,Type,Status,Audience,Sent,Revenue,Percentage")
    ;(data.revenue_by_campaign?.items || []).forEach((item) => {
      lines.push(
        `"${item.campaign_name}","${item.campaign_type}","${item.status}","${item.audience_count}","${item.sent_count}","${item.revenue}","${item.percentage}%"`
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
      `admin_analytics_${data.filters?.selected?.year || "report"}_${data.filters?.selected?.month || ""}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Admin analytics report downloaded successfully.")
  } catch {
    toast.error("Failed to export analytics report.")
  }
}

export default function AnalyticsPage() {
  const { t } = useTranslation("dashboard")
  const dispatch = useAppDispatch()

  const {
    year,
    month,
    revenuePeriod,
    subscriptionPeriod,
    countryPeriod,
    campaignPeriod,
  } = useAppSelector((state) => state.adminAnalytics)

  const [isExporting, setIsExporting] = useState(false)

  const {
    data: analyticsResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetAdminPlatformAnalyticsQuery({
    year,
    month,
    revenue_period: revenuePeriod,
    subscription_period: subscriptionPeriod,
    country_period: countryPeriod,
    campaign_period: campaignPeriod,
  })

  const analyticsData = analyticsResponse?.data

  // Sync initial Redux filters with backend's selected filters on first response
  useEffect(() => {
    if (analyticsData?.filters?.selected) {
      const selected = analyticsData.filters.selected
      if (selected.year && selected.year !== year) {
        dispatch(setAdminYear(selected.year))
      }
      if (selected.month && selected.month !== month) {
        dispatch(setAdminMonth(selected.month))
      }
    }
  }, [analyticsData?.filters?.selected])

  const handleExport = () => {
    if (!analyticsData) {
      toast.error("No analytics data available to export.")
      return
    }
    setIsExporting(true)
    exportAdminAnalyticsCSV(analyticsData)
    setIsExporting(false)
  }

  // Period Options formatted for dropdowns
  const periodOptions = useMemo(() => {
    const rawPeriods = analyticsData?.filters?.options?.periods || [
      "day",
      "week",
      "month",
      "year",
    ]
    return rawPeriods.map((p) => ({
      label: p.charAt(0).toUpperCase() + p.slice(1),
      value: p,
    }))
  }, [analyticsData?.filters?.options?.periods])

  // Stat Cards Mapping
  const statCardsData = useMemo(() => {
    const s = analyticsData?.summary
    return [
      {
        title: s?.total_field?.label || t("adminAnalytics.totalField", "Total Field"),
        value: s?.total_field?.value !== undefined ? s.total_field.value : 0,
        subtitle: s?.total_field?.subtitle || "vs last month",
        change: s?.total_field?.change?.display,
        isPositive: s?.total_field?.change?.is_positive,
        isNeutral: s?.total_field?.change?.direction === "same",
        icon: LayoutGrid,
      },
      {
        title: s?.total_player?.label || t("adminAnalytics.totalPlayer", "Total Player"),
        value: s?.total_player?.value !== undefined ? s.total_player.value : 0,
        subtitle: s?.total_player?.subtitle || "vs last month",
        change: s?.total_player?.change?.display,
        isPositive: s?.total_player?.change?.is_positive,
        isNeutral: s?.total_player?.change?.direction === "same",
        icon: Users,
      },
      {
        title:
          s?.premium_player?.label ||
          t("adminAnalytics.premiumPlayer", "Premium Player"),
        value: s?.premium_player?.value !== undefined ? s.premium_player.value : 0,
        subtitle: s?.premium_player?.subtitle || "vs last month",
        change: s?.premium_player?.change?.display,
        isPositive: s?.premium_player?.change?.is_positive,
        isNeutral: s?.premium_player?.change?.direction === "same",
        icon: UserCheck,
      },
      {
        title: s?.total_revenue?.label || t("adminAnalytics.totalRevenue", "Total Revenue"),
        value:
          s?.total_revenue?.display ||
          (s?.total_revenue?.value !== undefined
            ? `€${s.total_revenue.value}`
            : "€0.00"),
        subtitle: s?.total_revenue?.subtitle || "vs last month",
        change: s?.total_revenue?.change?.display,
        isPositive: s?.total_revenue?.change?.is_positive,
        isNeutral: s?.total_revenue?.change?.direction === "same",
        icon: DollarSign,
      },
      {
        title:
          s?.total_subscription?.label ||
          t("adminAnalytics.totalSubscription", "Total Subscription"),
        value:
          s?.total_subscription?.value !== undefined
            ? s.total_subscription.value
            : 0,
        subtitle: s?.total_subscription?.subtitle || "vs last month",
        change: s?.total_subscription?.change?.display,
        isPositive: s?.total_subscription?.change?.is_positive,
        isNeutral: s?.total_subscription?.change?.direction === "same",
        icon: CreditCard,
      },
    ]
  }, [analyticsData?.summary, t])

  // Revenue Over Time Mapping
  const revenueOverTimeData = useMemo(() => {
    return (
      analyticsData?.revenue_over_time?.items?.map((item) => ({
        month: item.month,
        revenue:
          typeof item.revenue === "string"
            ? parseFloat(item.revenue) || 0
            : Number(item.revenue) || 0,
      })) || []
    )
  }, [analyticsData?.revenue_over_time?.items])

  // Subscription Bar Chart Mapping
  const subscriptionChartData = useMemo(() => {
    return (
      analyticsData?.active_subscription_chart?.items?.map((item) => ({
        month: item.month,
        field: item.field,
        player: item.player,
      })) || []
    )
  }, [analyticsData?.active_subscription_chart?.items])

  // Field Donut Chart Mapping
  const fieldDonutData: DonutChartDataItem[] = useMemo(() => {
    const planColorMap: Record<string, string> = {
      gold: "#EF4444",
      silver: "#EAB308",
      bronze: "#6366F1",
    }

    return (
      analyticsData?.field_subscriptions?.items?.map((item) => ({
        name: item.plan,
        value: item.count,
        amount: item.count.toLocaleString(),
        percentage: `${item.percentage}%`,
        color: planColorMap[item.plan.toLowerCase()] || "#94A3B8",
      })) || []
    )
  }, [analyticsData?.field_subscriptions?.items])

  // Player Donut Chart Mapping
  const playerDonutData: DonutChartDataItem[] = useMemo(() => {
    return (
      analyticsData?.player_report?.items?.map((item) => ({
        name: item.label,
        value: item.value,
        amount: item.value.toLocaleString(),
        percentage: `${item.percentage}%`,
        color: item.key === "premium" ? "#EF4444" : "#6366F1",
      })) || []
    )
  }, [analyticsData?.player_report?.items])

  // Revenue By Country Mapping
  const revenueByCountryData: CountryRevenueData[] = useMemo(() => {
    return (
      analyticsData?.revenue_by_country?.items?.map((item) => ({
        country: item.country,
        countryCode: item.country_code,
        amount: `€${item.revenue}`,
        percentage: `${item.percentage}%`,
      })) || []
    )
  }, [analyticsData?.revenue_by_country?.items])

  // Revenue By Commission Mapping
  const revenueByCommissionData: CountryRevenueData[] = useMemo(() => {
    return (
      analyticsData?.revenue_by_commission?.items?.map((item) => ({
        country: item.country,
        countryCode: item.country_code,
        amount: `€${item.commission}`,
        percentage: `${item.percentage}%`,
      })) || []
    )
  }, [analyticsData?.revenue_by_commission?.items])

  // Error State
  if (error && !analyticsData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-custom-red/10 border border-custom-red/20 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7 text-custom-red" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">
          Failed to load analytics
        </h2>
        <p className="text-sm text-secondary max-w-md mb-6">
          Could not retrieve admin platform analytics from the server. Please check your connection or try again.
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
            <div className="h-8 w-52 bg-muted rounded-lg" />
            <div className="h-4 w-80 bg-muted rounded-lg" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-muted rounded-lg" />
            <div className="h-10 w-28 bg-muted rounded-lg" />
            <div className="h-10 w-36 bg-muted rounded-lg" />
          </div>
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-muted/60 rounded-xl border border-white/5 p-4"
            />
          ))}
        </div>

        {/* Top charts row skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="h-[360px] bg-muted/60 rounded-xl border border-white/5" />
          <div className="h-[360px] bg-muted/60 rounded-xl border border-white/5" />
          <div className="h-[360px] bg-muted/60 rounded-xl border border-white/5" />
        </div>

        {/* Middle row skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="h-[380px] bg-muted/60 rounded-xl border border-white/5" />
          <div className="h-[380px] bg-muted/60 rounded-xl border border-white/5" />
        </div>

        {/* Bottom row skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="h-[340px] bg-muted/60 rounded-xl border border-white/5" />
          <div className="h-[340px] bg-muted/60 rounded-xl border border-white/5" />
        </div>
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
        yearOptions={
          analyticsData?.filters?.options?.years || [2025, 2026, 2027]
        }
        monthOptions={analyticsData?.filters?.options?.months || []}
        onYearChange={(newYear) => dispatch(setAdminYear(newYear))}
        onMonthChange={(newMonth) => dispatch(setAdminMonth(newMonth))}
        onExportReport={handleExport}
        isExporting={isExporting}
        title={analyticsData?.header?.title}
      />

      {/* Stat Cards */}
      <AdminStatCards stats={statCardsData} />

      {/* 3 Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <RevenueAreaChart
          data={revenueOverTimeData}
          title={
            analyticsData?.revenue_over_time?.title ||
            t("adminAnalytics.revenueOverTime", "Revenue Over Time")
          }
          showPeriodSelector={false}
        />
        <SubscriptionBarChart
          data={subscriptionChartData}
          title={
            analyticsData?.active_subscription_chart?.title ||
            t("adminAnalytics.subscriptionChart", "Active Subscription")
          }
          showPeriodSelector={false}
        />
        <FieldDonutChart
          data={fieldDonutData}
          total={analyticsData?.field_subscriptions?.total}
          title={
            analyticsData?.field_subscriptions?.title ||
            t("adminAnalytics.field", "Field Subscriptions")
          }
        />
      </div>

      {/* Middle Row: Player Donut & Revenue by Country */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <PlayerDonutChart
          data={playerDonutData}
          total={analyticsData?.player_report?.total_player}
          title={
            analyticsData?.player_report?.title ||
            t("adminAnalytics.player", "Player Membership")
          }
        />
        <RevenueByCountry
          data={revenueByCountryData}
          title={
            analyticsData?.revenue_by_country?.title ||
            t("adminAnalytics.revenueByCountry", "Revenue By Country")
          }
          selectedPeriod={countryPeriod}
          periodOptions={periodOptions}
          onPeriodChange={(p) => dispatch(setAdminCountryPeriod(p))}
        />
      </div>

      {/* Bottom Row: Revenue by Commission & Revenue by Campaign */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RevenueByList
          data={revenueByCommissionData}
          type="country"
          title={
            analyticsData?.revenue_by_commission?.title ||
            t("adminAnalytics.revenueByCommission", "Revenue by Commission")
          }
          selectedPeriod={countryPeriod}
          periodOptions={periodOptions}
          onPeriodChange={(p) => dispatch(setAdminCountryPeriod(p))}
        />
        <RevenueByList
          campaignItems={analyticsData?.revenue_by_campaign?.items || []}
          type="campaign"
          title={
            analyticsData?.revenue_by_campaign?.title ||
            t("adminAnalytics.revenueByCampaign", "Revenue by Campaign")
          }
          attributionNote={
            analyticsData?.revenue_by_campaign?.attribution_note
          }
          currency={analyticsData?.revenue_by_campaign?.currency || "EUR"}
          selectedPeriod={campaignPeriod}
          periodOptions={periodOptions}
          onPeriodChange={(p) => dispatch(setAdminCampaignPeriod(p))}
        />
      </div>
    </div>
  )
}
