"use client"

import React from "react"
import { DollarSign, ClipboardList, Users, UserCheck, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { AnalyticsSummary, StatChange } from "@/types/DashboardTypes/AnalyticsTypes"

interface StatCardsProps {
  summary?: AnalyticsSummary | null
}

function getCurrencySymbol(currency?: string): string {
  if (!currency) return "€"
  switch (currency.toUpperCase()) {
    case "EUR":
      return "€"
    case "USD":
      return "$"
    case "GBP":
      return "£"
    default:
      return currency
  }
}

function formatAmount(val?: string | number, currency?: string): string {
  if (val === undefined || val === null) return "0.00"
  const num = typeof val === "number" ? val : parseFloat(String(val)) || 0
  const symbol = getCurrencySymbol(currency)
  return `${symbol} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function StatCards({ summary }: StatCardsProps) {
  if (!summary) return null

  const renderChange = (change?: StatChange) => {
    if (!change) return null
    const isUp = change.direction === "up" || change.is_positive
    return (
      <span
        className={`inline-flex items-center text-xs font-semibold ${
          isUp ? "text-emerald-400" : "text-custom-red"
        }`}
      >
        {isUp ? (
          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
        ) : (
          <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
        )}
        {change.display}
      </span>
    )
  }

  const cards = [
    {
      title: summary.total_revenue?.label || "Total Revenue",
      value: formatAmount(summary.total_revenue?.value, summary.total_revenue?.currency),
      change: summary.total_revenue?.change,
      subtitle: summary.total_revenue?.subtitle || "All time",
      icon: DollarSign,
      iconBg: "bg-custom-red/10 text-custom-red border-custom-red/20",
    },
    {
      title: summary.total_booking?.label || "Total Booking",
      value: summary.total_booking?.value !== undefined ? String(summary.total_booking.value) : "0",
      change: summary.total_booking?.change,
      subtitle: summary.total_booking?.subtitle || "vs last month",
      icon: ClipboardList,
      iconBg: "bg-custom-yellow/10 text-custom-yellow border-custom-yellow/20",
    },
    {
      title: summary.total_player?.label || "Total Player",
      value: summary.total_player?.value !== undefined ? String(summary.total_player.value) : "0",
      change: summary.total_player?.change,
      subtitle: summary.total_player?.subtitle || "vs last month",
      icon: Users,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      title: summary.check_in_rate?.label || "Check-in Rate",
      value: summary.check_in_rate?.display || "0.0%",
      change: summary.check_in_rate?.change,
      subtitle:
        summary.check_in_rate?.checked_in !== undefined &&
        summary.check_in_rate?.total_players !== undefined
          ? `${summary.check_in_rate.checked_in}/${summary.check_in_rate.total_players} players`
          : summary.check_in_rate?.subtitle || "vs last month",
      icon: UserCheck,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      title: summary.average_revenue?.label || "Avg. Revenue",
      value: formatAmount(summary.average_revenue?.value, summary.average_revenue?.currency),
      change: summary.average_revenue?.change,
      subtitle: summary.average_revenue?.subtitle || "vs last month",
      icon: TrendingUp,
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="rounded-xl border border-white/5 bg-card/60 backdrop-blur-xs p-4 sm:p-5 flex flex-col justify-between hover:border-white/10 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm text-secondary font-medium truncate">
                {card.title}
              </span>
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${card.iconBg}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                {card.value}
              </div>
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                {renderChange(card.change)}
                <span className="text-xs text-secondary truncate">
                  {card.subtitle}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
