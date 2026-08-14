"use client";

/**
 * RecentBookingCard.tsx
 * Displays a list of recent bookings with image, name, session, price, and status.
 */

import Image from "next/image";
import DataSection from "./DataSection";
import type { RecentBookingCardProps } from "@/types/DashboardTypes/HomeTypes";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-amber-500/15 text-amber-400",
  cancelled: "bg-red-500/15 text-red-400",
};

const RecentBookingCard = ({
  title,
  viewAllLabel,
  items,
  onViewAll,
}: RecentBookingCardProps) => {
  return (
    <DataSection
      title={title}
      viewAllLabel={viewAllLabel}
      onViewAll={onViewAll}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 py-3 ${
            index < items.length - 1 ? "border-b border-white/5" : ""
          }`}
        >
          {/* Thumbnail */}
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative">
            <Image
              src={item.imageUrl}
              alt={item.playerName}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {item.playerName}
            </p>
            <p className="text-xs text-[#71717a] truncate">
              {item.sessionName}
            </p>
          </div>

          {/* Price + Status */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-sm font-semibold text-white">
              {item.price}
            </span>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-md capitalize ${
                STATUS_STYLES[item.status] ?? STATUS_STYLES.pending
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </DataSection>
  );
};

export default RecentBookingCard;
