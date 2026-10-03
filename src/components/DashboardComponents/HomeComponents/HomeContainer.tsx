"use client";

/**
 * HomeContainer.tsx
 * Container component that orchestrates the dashboard home layout.
 * Fetches data from /api/arena/overview/ via RTK Query.
 */

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSelectedRange,
  openUpgradeModal,
  closeUpgradeModal,
} from "@/redux/features/dashboard/home/homeSlice";
import { useGetArenaOverviewQuery } from "@/redux/features/dashboard/home/homeAPI";

import HomeHeader from "./HomeHeader";
import StatsGrid from "./StatsGrid";
import RevenueChart from "./RevenueChart";
import SessionPieChart from "./SessionPieChart";
import BookingBarChart from "./BookingBarChart";
import DataSectionsGrid from "./DataSectionsGrid";
import DashboardLoading from "./DashboardLoading";
import UpgradeModal from "@/components/SharedComponents/UpgradeModal";
import type { DashboardRange } from "@/types/DashboardTypes/HomeTypes";

const RANGE_OPTIONS: DashboardRange[] = ["day", "week", "month", "year"];

const HomeContainer = () => {
  const { t } = useTranslation("dashboard");
  const dispatch = useAppDispatch();
  const selectedRange = useAppSelector((state) => state.home.selectedRange);
  const isUpgradeModalOpen = useAppSelector(
    (state) => state.home.isUpgradeModalOpen,
  );

  const { data: response, isLoading, isError } = useGetArenaOverviewQuery();

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError || !response?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#ADADAD] text-sm">
          {t("home.errorLoading", "Failed to load dashboard data.")}
        </p>
      </div>
    );
  }

  const payload = response.data;
  const header = payload.analytics_header;
  const statsItems = payload.mark_1.items;

  const revenueSection = payload.mark_2;
  const revenueRanges = revenueSection.range_options.filter(
    (option): option is DashboardRange =>
      RANGE_OPTIONS.includes(option as DashboardRange),
  );
  const visibleRanges =
    revenueRanges.length > 0 ? revenueRanges : RANGE_OPTIONS;

  const isBronze =
    payload.subscription.plan_code === "field_bronze_monthly" ||
    !payload.subscription.can_view_advanced_analytics;

  return (
    <div className="">
      <div className="space-y-4 md:space-y-6">
        <HomeHeader
          title={header.title}
          subtitle={header.subtitle}
          yearRange={header.year_range}
        />

        <StatsGrid items={statsItems} />

        {/* Charts row: 3 columns on large screens, stacked on smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart
            title={revenueSection.title}
            valueDisplay={revenueSection.value_display}
            legends={revenueSection.legends}
            chartData={revenueSection.chart}
            selectedRange={selectedRange}
            rangeOptions={visibleRanges}
            onRangeChange={(range) => dispatch(setSelectedRange(range))}
            isLocked={isBronze}
            onUpgradeClick={() => dispatch(openUpgradeModal())}
          />

          <BookingBarChart
            title={payload.mark_4.title}
            valueDisplay={payload.mark_4.value_display}
            subtitle={payload.mark_4.subtitle}
            totalsDisplay={payload.mark_4.totals_display}
            legends={payload.mark_4.legends}
            chartData={payload.mark_4.chart}
            isLocked={isBronze}
            onUpgradeClick={() => dispatch(openUpgradeModal())}
          />

          <SessionPieChart
            title={payload.mark_3.title}
            centerValueDisplay={payload.mark_3.center_value_display}
            items={payload.mark_3.items}
            isLocked={isBronze}
            onUpgradeClick={() => dispatch(openUpgradeModal())}
          />
        </div>

        {/* Data sections: Recent Booking, Today's Sessions, Upcoming Sessions */}
        <DataSectionsGrid
          recentBookings={payload.mark_6.items}
          todaySessions={payload.mark_7.items}
          upcomingSessions={payload.mark_8.items}
          labels={{
            recentBooking: t("home.recentBooking", "Recent Booking"),
            todaySessions: t("home.todaySessions", "Today's Sessions"),
            upcomingSessions: t("home.upcomingSessions", "Upcoming Sessions"),
            viewAll: t("home.viewAll", "View All"),
          }}
        />
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => dispatch(closeUpgradeModal())}
      />
    </div>
  );
};

export default HomeContainer;
