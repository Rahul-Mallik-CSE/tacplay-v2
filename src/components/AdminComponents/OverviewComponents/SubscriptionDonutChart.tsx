"use client"

import { useTranslation } from "react-i18next"
import { DonutChart } from "@/components/AdminComponents/SharedComponents"
import type { DonutChartDataItem } from "@/types/AdminTypes/OverviewTypes"

interface SubscriptionDonutChartProps {
  data: DonutChartDataItem[]
}

export default function SubscriptionDonutChart({
  data,
}: SubscriptionDonutChartProps) {
  const { t } = useTranslation("dashboard")

  return (
    <DonutChart
      data={data}
      title={t("adminAnalytics.subscription")}
      centerLabel="32,346"
      centerSubLabel={t("adminAnalytics.totalPremium")}
      defaultTimeRange={t("adminAnalytics.week")}
    />
  )
}
