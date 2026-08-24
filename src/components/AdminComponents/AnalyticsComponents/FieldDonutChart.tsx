"use client"

import { useTranslation } from "react-i18next"
import { DonutChart } from "@/components/AdminComponents/SharedComponents"
import type { DonutChartDataItem } from "@/types/AdminTypes/AnalyticsTypes"

interface FieldDonutChartProps {
  data: DonutChartDataItem[]
}

export default function FieldDonutChart({ data }: FieldDonutChartProps) {
  const { t } = useTranslation("dashboard")

  return (
    <DonutChart
      data={data}
      title={t("adminAnalytics.field")}
      centerLabel="32,346"
      centerSubLabel={t("adminAnalytics.totalFieldLabel")}
      defaultTimeRange="Week"
    />
  )
}
