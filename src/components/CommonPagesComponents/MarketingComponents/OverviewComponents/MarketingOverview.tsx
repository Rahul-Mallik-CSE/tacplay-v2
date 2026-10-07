"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { AlertCircle, RefreshCw, ChevronDown } from "lucide-react"
import StatsCards from "./StatsCards"
import TopPerformingCampaigns from "./TopPerformingCampaigns"
import ActiveVouchers from "./ActiveVouchers"
import QuickActions from "./QuickActions"
import RecentCampaigns from "./RecentCampaigns"
import MarketingOverviewLoading from "./MarketingOverviewLoading"
import { useGetMarketingOverviewQuery } from "@/redux/features/shared/marketing/marketingAPI"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setSelectedYear } from "@/redux/features/shared/marketing/marketingSlice"
import { getErrorMessage } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MarketingOverview() {
  const { t } = useTranslation("dashboard")
  const dispatch = useAppDispatch()
  const reduxSelectedYear = useAppSelector((state) => state.marketing.selectedYear)

  const {
    data: overviewResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMarketingOverviewQuery(
    reduxSelectedYear ? { year: reduxSelectedYear } : undefined
  )

  const overviewData = overviewResponse?.data
  const meta = overviewResponse?.meta

  const availableYears =
    overviewData?.header?.available_years ||
    meta?.available_years || [new Date().getFullYear()]

  const currentYear =
    reduxSelectedYear ||
    overviewData?.header?.selected_year ||
    meta?.selected_year ||
    availableYears[0]

  const title = overviewData?.header?.title || t("marketing.title", "Marketing Analytics report")
  const subtitle =
    overviewData?.header?.subtitle || t("marketing.subtitle", "Analytics support")

  if (isLoading) {
    return <MarketingOverviewLoading />
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
            <p className="text-sm text-secondary mt-1">{subtitle}</p>
          </div>
        </div>

        <div className="bg-card border border-red-500/20 rounded-xl p-8 md:p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-primary">
              {t("marketing.errorTitle", "Failed to Load Overview")}
            </h3>
            <p className="text-sm text-secondary mt-1">
              {getErrorMessage(error, "Unable to fetch marketing overview. Please try again.")}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-root-bg font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            {t("common.tryAgain", "Try Again")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
          <p className="text-sm text-secondary mt-1">{subtitle}</p>
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2">
          {availableYears.length > 1 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-sm font-medium text-primary transition-colors cursor-pointer">
                  <span>{currentYear}</span>
                  <ChevronDown className="w-4 h-4 text-secondary" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-white/10 text-primary">
                {availableYears.map((yr) => (
                  <DropdownMenuItem
                    key={yr}
                    onClick={() => dispatch(setSelectedYear(yr))}
                    className={`cursor-pointer ${
                      yr === currentYear ? "text-custom-yellow font-semibold" : ""
                    }`}
                  >
                    {yr}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white/5 rounded-lg border border-white/10 text-sm font-medium text-primary">
              <span>{currentYear}</span>
            </div>
          )}

          {isFetching && !isLoading && (
            <RefreshCw className="w-4 h-4 text-secondary animate-spin" />
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <StatsCards summary={overviewData?.summary} />

      {/* Secondary Highlights Grid (Top Performing, Active Vouchers, Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <TopPerformingCampaigns data={overviewData?.top_performing_campaigns} />
        <ActiveVouchers data={overviewData?.active_vouchers} />
        <QuickActions data={overviewData?.quick_actions} />
      </div>

      {/* Recent Campaigns Table with Actions & Filters */}
      <RecentCampaigns
        data={overviewData?.recent_campaigns}
        filters={overviewData?.header?.filters}
        onRefetch={refetch}
      />
    </div>
  )
}
