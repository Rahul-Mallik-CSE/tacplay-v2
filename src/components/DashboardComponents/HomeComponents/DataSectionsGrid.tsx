"use client";

/**
 * DataSectionsGrid.tsx
 * 3-column responsive grid for Recent Booking, Today's Sessions, and Upcoming Sessions.
 * lg: 3 columns side by side, below md: stacked vertically.
 */

import RecentBookingCard from "./RecentBookingCard";
import TodaySessionCard from "./TodaySessionCard";
import UpcomingSessionCard from "./UpcomingSessionCard";
import type {
  RecentBookingItem,
  TodaySessionItem,
  UpcomingSessionItem,
} from "@/types/DashboardTypes/HomeTypes";

interface DataSectionsGridProps {
  recentBookings: RecentBookingItem[];
  todaySessions: TodaySessionItem[];
  upcomingSessions: UpcomingSessionItem[];
  labels: {
    recentBooking: string;
    todaySessions: string;
    upcomingSessions: string;
    viewAll: string;
  };
}

const DataSectionsGrid = ({
  recentBookings,
  todaySessions,
  upcomingSessions,
  labels,
}: DataSectionsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RecentBookingCard
        title={labels.recentBooking}
        viewAllLabel={labels.viewAll}
        items={recentBookings}
      />
      <TodaySessionCard
        title={labels.todaySessions}
        viewAllLabel={labels.viewAll}
        items={todaySessions}
      />
      <UpcomingSessionCard
        title={labels.upcomingSessions}
        viewAllLabel={labels.viewAll}
        items={upcomingSessions}
      />
    </div>
  );
};

export default DataSectionsGrid;
