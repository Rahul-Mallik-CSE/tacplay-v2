"use client"

import { useTranslation } from "react-i18next"
import { DonutChart } from "@/components/AdminComponents/SharedComponents"
import type { DonutChartDataItem } from "@/types/AdminTypes/AnalyticsTypes"

interface PlayerDonutChartProps {
  data: DonutChartDataItem[]
}

export default function PlayerDonutChart({ data }: PlayerDonutChartProps) {
  const { t } = useTranslation("dashboard")

  return (
    <DonutChart
      data={data}
      title={t("adminAnalytics.player")}
      centerLabel="32,346"
      centerSubLabel={t("adminAnalytics.totalPlayerLabel")}
      defaultTimeRange="Week"
    />
  )
}
