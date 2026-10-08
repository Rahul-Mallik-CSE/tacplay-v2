"use client"

import { useTranslation } from "react-i18next"
import { DonutChart } from "@/components/AdminComponents/SharedComponents"
import type { DonutChartDataItem } from "@/types/AdminTypes/AnalyticsTypes"

interface PlayerDonutChartProps {
  data: DonutChartDataItem[]
  total?: number
  title?: string
}

export default function PlayerDonutChart({ data, total, title }: PlayerDonutChartProps) {
  const { t } = useTranslation("dashboard")

  const totalCalculated =
    total !== undefined ? total : data.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <DonutChart
      data={data}
      title={title || t("adminAnalytics.player", "Player")}
      centerLabel={totalCalculated.toLocaleString()}
      centerSubLabel={t("adminAnalytics.totalPlayerLabel", "Total Player")}
    />
  )
}
