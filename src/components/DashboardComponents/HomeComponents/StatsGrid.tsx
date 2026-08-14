"use client";

/**
 * StatsGrid.tsx
 * Renders the responsive grid of stats cards with icons and translations.
 */

import { type ReactNode } from "react";
import { CalendarCheck, Gamepad2, Trophy, Euro } from "lucide-react";
import { useTranslation } from "react-i18next";
import StatsCard from "./StatsCard";
import type { DashboardMark1Item } from "@/types/DashboardTypes/HomeTypes";

/** Icon mapping for each stats card key */
const STATS_ICON_BY_KEY: Record<string, ReactNode> = {
  total_revenue: <Euro className="w-4 h-4" />,
  total_bookings: <CalendarCheck className="w-4 h-4" />,
  upcoming_sessions: <Gamepad2 className="w-4 h-4" />,
  matches_hosted: <Trophy className="w-4 h-4" />,
};

/** Map stats card keys to their i18n translation keys */
const getStatsTranslationKey = (key: string) => {
  if (key === "total_revenue") return "totalRevenue";
  if (key === "total_bookings") return "totalBookings";
  if (key === "upcoming_sessions") return "upcomingSessions";
  if (key === "matches_hosted") return "matchesHosted";
  return key;
};

interface StatsGridProps {
  items: DashboardMark1Item[];
}

const StatsGrid = ({ items }: StatsGridProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <StatsCard
          key={item.key}
          title={t(`home.${getStatsTranslationKey(item.key)}`, {
            defaultValue: item.label,
          })}
          value={item.value}
          change={item.change.display}
          isPositive={item.change.is_positive}
          showCurrencyIcon={item.key === "total_revenue"}
          icon={
            STATS_ICON_BY_KEY[item.key] ?? <Euro className="w-4 h-4" />
          }
        />
      ))}
    </div>
  );
};

export default StatsGrid;
