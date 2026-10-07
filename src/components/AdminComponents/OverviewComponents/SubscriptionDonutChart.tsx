"use client"

import { useTranslation } from "react-i18next"
import { DonutChart } from "@/components/AdminComponents/SharedComponents"
import type {
  DonutChartDataItem,
  SubscriptionBreakdownItem,
  PeriodOption,
} from "@/types/AdminTypes/OverviewTypes"

interface SubscriptionDonutChartProps {
  data?: DonutChartDataItem[]
  items?: SubscriptionBreakdownItem[]
  totalPremium?: number
  selectedPeriod?: string
  periodOptions?: PeriodOption[]
  onPeriodChange?: (period: string) => void
}

const PLAN_COLORS: Record<string, string> = {
  gold: "#EF4444",
  silver: "#EAB308",
  bronze: "#6366F1",
  free: "#94A3B8",
}

export default function SubscriptionDonutChart({
  data,
  items,
  totalPremium,
  selectedPeriod = "week",
}: SubscriptionDonutChartProps) {
  const { t } = useTranslation("dashboard")

  const formattedData: DonutChartDataItem[] = items
    ? items.map((item) => {
        const key = item.plan.toLowerCase()
        return {
          name: item.plan,
          value: item.count,
          amount: String(item.count),
          percentage: item.percentage_display,
          color: PLAN_COLORS[key] || "#94A3B8",
        }
      })
    : data || []

  const centerValue = totalPremium !== undefined
    ? totalPremium.toLocaleString()
    : formattedData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()

  return (
    <DonutChart
      data={formattedData}
      title={t("adminAnalytics.subscription")}
      centerLabel={centerValue}
      centerSubLabel={t("adminAnalytics.totalPremium")}
      defaultTimeRange={selectedPeriod}
    />
  )
}
