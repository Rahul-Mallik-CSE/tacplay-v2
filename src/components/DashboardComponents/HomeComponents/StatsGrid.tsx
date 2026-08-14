"use client";

/**
 * StatsGrid.tsx
 * Renders the responsive grid of stats cards with icons and translations.
 */

import { type ReactNode } from "react";
import {
  CircleDollarSign,
  ClipboardCheck,
  Hourglass,
  Crosshair,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import StatsCard from "./StatsCard";
import type { DashboardMark1Item } from "@/types/DashboardTypes/HomeTypes";

/** Icon mapping for each stats card key — matches the provided design */
const STATS_ICON_BY_KEY: Record<string, ReactNode> = {
  total_revenue: <CircleDollarSign className="w-5 h-5" />,
  total_bookings: <ClipboardCheck className="w-5 h-5" />,
  upcoming_sessions: <Hourglass className="w-5 h-5" />,
  matches_hosted: <Crosshair className="w-5 h-5" />,
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
          value={item.value_display}
          change={item.change.display}
          isPositive={item.change.is_positive}
          showCurrencyIcon={item.key === "total_revenue"}
          icon={
            STATS_ICON_BY_KEY[item.key] ?? (
              <CircleDollarSign className="w-5 h-5" />
            )
          }
          subtitle={item.subtitle}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
