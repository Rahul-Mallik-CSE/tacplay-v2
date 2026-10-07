"use client"

import React from "react"
import { DollarSign, Mail, MessageSquare, Bell, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import type { MarketingSummary, MetricChange } from "@/types/CommonPageTypes/MarketingTypes"

const iconMap: Record<string, React.ReactNode> = {
  dollar: <DollarSign className="w-5 h-5 text-primary" />,
  email: <Mail className="w-5 h-5 text-primary" />,
  sms: <MessageSquare className="w-5 h-5 text-primary" />,
  push: <Bell className="w-5 h-5 text-primary" />,
}

interface StatItem {
  title: string
  value: string | number
  subtitle: string
  change?: MetricChange | null
  icon: "dollar" | "email" | "sms" | "push"
  href: string
}

interface StatsCardsProps {
  summary?: MarketingSummary
}

export default function StatsCards({ summary }: StatsCardsProps) {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.startsWith("/admin") ? "/admin" : "/dashboard"

  const stats: StatItem[] = [
    {
      title: summary?.total_campaigns?.label || t("marketing.totalCampaigns", "Total Campaigns"),
      value: summary?.total_campaigns?.value ?? 0,
      subtitle: summary?.total_campaigns?.subtitle || t("marketing.allTime", "All time"),
      change: summary?.total_campaigns?.change ?? null,
      icon: "dollar",
      href: `${basePath}/marketing/campaigns`,
    },
    {
      title: summary?.emails_sent?.label || t("marketing.emailsSent", "Emails Sent"),
      value: summary?.emails_sent?.value ?? 0,
      subtitle: summary?.emails_sent?.subtitle || t("marketing.vsLastMonth", "vs last month"),
      change: summary?.emails_sent?.change ?? null,
      icon: "email",
      href: `${basePath}/marketing/email`,
    },
    {
      title: summary?.sms_sent?.label || t("marketing.smsSent", "SMS Sent"),
      value: summary?.sms_sent?.value ?? 0,
      subtitle: summary?.sms_sent?.subtitle || t("marketing.vsLastMonth", "vs last month"),
      change: summary?.sms_sent?.change ?? null,
      icon: "sms",
      href: `${basePath}/marketing/sms`,
    },
    {
      title: summary?.push_sent?.label || t("marketing.pushSent", "Push Sent"),
      value: summary?.push_sent?.value ?? 0,
      subtitle: summary?.push_sent?.subtitle || t("marketing.vsLastMonth", "vs last month"),
      change: summary?.push_sent?.change ?? null,
      icon: "push",
      href: `${basePath}/marketing/push-notification`,
    },
  ]

  const renderChangeBadge = (change?: MetricChange | null) => {
    if (!change) return null

    const isUp = change.direction === "up" || (change.is_positive && change.value > 0)
    const isDown = change.direction === "down" || (!change.is_positive && change.value < 0)

    if (isDown) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
          <TrendingDown className="w-3 h-3" />
          {change.display}
        </span>
      )
    }

    if (isUp) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">
          <TrendingUp className="w-3 h-3" />
          {change.display}
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-secondary bg-white/5 px-1.5 py-0.5 rounded">
        <Minus className="w-3 h-3" />
        {change.display}
      </span>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          onClick={() => {
            if (stat.href) router.push(stat.href)
          }}
          className="bg-card border border-white/5 hover:border-white/15 rounded-xl p-4 md:p-5 flex flex-col justify-between cursor-pointer transition-all hover:bg-white/[0.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-secondary font-medium">{stat.title}</span>
            <span className="p-2 bg-white/5 rounded-lg border border-white/5">
              {iconMap[stat.icon]}
            </span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {renderChangeBadge(stat.change)}
              <span className="text-xs text-secondary">{stat.subtitle}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
