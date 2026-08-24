"use client"

import { useTranslation } from "react-i18next"
import { mockOverviewData } from "../../../mock-data/AdminMockData/overview-mock-data"
import OverviewHeader from "./OverviewHeader"
import SubscriptionDonutChart from "./SubscriptionDonutChart"
import RevenueByCountryOverview from "./RevenueByCountryOverview"
import RecentFieldTable from "./RecentFieldTable"
import {
  AdminStatCards,
  RevenueAreaChart,
  SubscriptionBarChart,
  RecentActivityList,
} from "@/components/AdminComponents/SharedComponents"

export default function OverviewPage() {
  const { t } = useTranslation("dashboard")
  const data = mockOverviewData

  return (
    <div className="space-y-6">
      <OverviewHeader />

      <AdminStatCards stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <RevenueAreaChart data={data.revenueOverTime} />
        <SubscriptionBarChart data={data.subscriptionChart} />
        <SubscriptionDonutChart data={data.subscriptionDonut} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RevenueByCountryOverview data={data.revenueByCountry} />
        <RecentActivityList
          activities={data.recentActivity}
          viewAllLabel={t("adminOverview.viewAll")}
        />
      </div>

      <RecentFieldTable fields={data.recentFields} />
    </div>
  )
}
