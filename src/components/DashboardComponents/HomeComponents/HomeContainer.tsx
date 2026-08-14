"use client";

/**
 * HomeContainer.tsx
 * Container component that orchestrates the dashboard home layout:
 * header, stats grid, revenue chart, session pie chart, and booking bar chart.
 * Manages state for time range selection and upgrade modal.
 */

import { useState } from "react";
import HomeHeader from "./HomeHeader";
import StatsGrid from "./StatsGrid";
import RevenueChart from "./RevenueChart";
import SessionPieChart from "./SessionPieChart";
import BookingBarChart from "./BookingBarChart";
import DashboardLoading from "./DashboardLoading";
import UpgradeModal from "@/components/SharedComponents/UpgradeModal";
import { mockDashboardOverview } from "@/mock-data/DashboardMockData/home-mock-data";
import type { DashboardRange } from "@/types/DashboardTypes/HomeTypes";

const RANGE_OPTIONS: DashboardRange[] = ["week", "month", "year"];

const HomeContainer = () => {
  const [selectedRange, setSelectedRange] =
    useState<DashboardRange>("month");
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isLoading] = useState(false);

  const payload = mockDashboardOverview;
  const header = payload.analytics_header;
  const statsItems = payload.mark_1.items;

  const revenueSection = payload.mark_2;
  const revenueRanges = revenueSection.range_options.filter(
    (option): option is DashboardRange =>
      RANGE_OPTIONS.includes(option as DashboardRange),
  );
  const visibleRanges =
    revenueRanges.length > 0 ? revenueRanges : RANGE_OPTIONS;

  const isBronze = payload.subscription.plan_code === "field_bronze_monthly";

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <HomeHeader
          title={header.title}
          subtitle={header.subtitle}
          reportType={header.report_type}
        />

        <StatsGrid items={statsItems} />

        {/* Charts row: 3 columns on large screens, stacked on smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart
            title={revenueSection.title}
            valueDisplay={revenueSection.value}
            legends={revenueSection.legends}
            chartData={revenueSection.chart}
            selectedRange={selectedRange}
            rangeOptions={visibleRanges}
            onRangeChange={setSelectedRange}
            isLocked={isBronze}
            onUpgradeClick={() => setIsUpgradeModalOpen(true)}
          />

          <BookingBarChart
            title={payload.mark_4.title}
            valueDisplay={payload.mark_4.value_display}
            subtitle={payload.mark_4.subtitle}
            totalsDisplay={payload.mark_4.totals_display}
            legends={payload.mark_4.legends}
            chartData={payload.mark_4.chart}
            isLocked={isBronze}
            onUpgradeClick={() => setIsUpgradeModalOpen(true)}
          />

          <SessionPieChart
            title={payload.mark_3.title}
            centerValueDisplay={payload.mark_3.center_value_display}
            items={payload.mark_3.items}
            isLocked={isBronze}
            onUpgradeClick={() => setIsUpgradeModalOpen(true)}
          />
        </div>
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
};

export default HomeContainer;
