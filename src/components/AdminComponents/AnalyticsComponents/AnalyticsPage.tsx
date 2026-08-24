"use client"

import { useTranslation } from "react-i18next"
import { mockAnalyticsData } from "../../../mock-data/AdminMockData/analytics-mock-data"
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

export default function AnalyticsPage() {
  const { t } = useTranslation("dashboard")
  const data = mockAnalyticsData

  return (
    <div className="space-y-6">
      <AnalyticsHeader />

      <AdminStatCards stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <RevenueAreaChart data={data.revenueOverTime} />
        <SubscriptionBarChart data={data.subscriptionChart} />
        <FieldDonutChart data={data.fieldDonut} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <PlayerDonutChart data={data.playerDonut} />
        <RevenueByCountry data={data.revenueByCountry} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RevenueByList
          data={data.revenueByCommission}
          title={t("adminAnalytics.revenueByCommission")}
        />
        <RevenueByList
          data={data.revenueByCampaign}
          title={t("adminAnalytics.revenueByCampaign")}
        />
      </div>
    </div>
  )
}
