"use client";

/**
 * RecentBookingCard.tsx
 * Displays a list of recent bookings with avatar, player name, session name, amount, and status.
 * Shows first 5 items; "View All" button appears when there are more than 5.
 */

import { useState } from "react";
import Image from "next/image";
import DataSection from "./DataSection";
import type {
  RecentBookingCardProps,
  RecentBookingItem,
} from "@/types/DashboardTypes/HomeTypes";

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-[#E4FAE0] text-[#07B129]",
  confirmed: "bg-[#E4FAE0] text-[#07B129]",
  pending: "bg-[#FDEFE2] text-[#EB7101]",
  cancelled: "bg-red-500/15 text-red-400",
};

const PREVIEW_COUNT = 5;

/** Format currency amount — e.g. "809.00" + "eur" → "€809.00" */
const formatAmount = (amount: string, currency: string) => {
  const symbols: Record<string, string> = {
    eur: "€",
    usd: "$",
    gbp: "£",
  };
  const symbol = symbols[currency.toLowerCase()] ?? currency.toUpperCase() + " ";
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
};

const BookingRow = ({ item }: { item: RecentBookingItem }) => {
  const avatarSrc = item.player_image
    ? item.player_image.startsWith("http")
      ? item.player_image
      : `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}${item.player_image}`
    : "/default-avatar.png";

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      {/* Thumbnail */}
      <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 relative bg-white/5">
        <Image
          src={avatarSrc}
          alt={item.player_name}
          fill
          sizes="44px"
          className="object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/default-avatar.png";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {item.player_name}
        </p>
        <p className="text-xs text-[#ADADAD] truncate">{item.session_name}</p>
      </div>

      {/* Amount + Status */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-sm font-semibold text-[#ADADAD]">
          {formatAmount(item.amount, item.currency)}
        </span>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-sm capitalize ${
            STATUS_STYLES[item.payment_status] ??
            STATUS_STYLES[item.status] ??
            STATUS_STYLES.pending
          }`}
        >
          {item.payment_status || item.status}
        </span>
      </div>
    </div>
  );
};

const RecentBookingCard = ({
  title,
  viewAllLabel,
  items,
}: RecentBookingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const showViewAll = items.length > PREVIEW_COUNT;
  const visibleItems = isExpanded ? items : items.slice(0, PREVIEW_COUNT);

  return (
    <DataSection
      title={title}
      viewAllLabel={isExpanded ? "−" : viewAllLabel}
      showViewAll={showViewAll}
      onViewAll={() => setIsExpanded((prev) => !prev)}
      isExpanded={isExpanded}
    >
      {visibleItems.map((item) => (
        <BookingRow key={item.booking_id} item={item} />
      ))}
    </DataSection>
  );
};

export default RecentBookingCard;
