"use client";

/**
 * StatsCard.tsx
 * Displays a single key metric card with title, icon, value,
 * change indicator, and comparison subtitle.
 */

import { TrendingUp, TrendingDown } from "lucide-react";
import type { StatsCardProps } from "@/types/DashboardTypes/HomeTypes";

const StatsCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
  showCurrencyIcon,
  subtitle,
}: StatsCardProps) => {
  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex flex-col min-w-0 flex-1">
      {/* Row 1: Title left, icon right */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-secondary">{title}</h3>
        <span className="text-secondary opacity-70">{icon}</span>
      </div>

      {/* Row 2: Value left, change badge right */}
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
          {showCurrencyIcon && <span className="text-2xl">€</span>}
          {value}
        </h2>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${
            isPositive
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          ({change})
        </span>
      </div>

      {/* Row 3: Comparison subtitle */}
      {subtitle && (
        <p className="text-xs text-secondary mt-auto">{subtitle}</p>
      )}
    </div>
  );
};

export default StatsCard;
