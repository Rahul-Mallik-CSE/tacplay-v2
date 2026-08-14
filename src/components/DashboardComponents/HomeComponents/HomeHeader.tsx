"use client";

/**
 * HomeHeader.tsx
 * Renders the dashboard header with title, subtitle, and all-reports button.
 * Range selector is now inside the RevenueChart component.
 */

import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HomeHeaderProps {
  title: string | null;
  subtitle: string | null;
  reportType: string | null;
}

const HomeHeader = ({
  title,
  subtitle,
  reportType,
}: HomeHeaderProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {title ?? t("home.analyticsReport")}
        </h1>
        <p className="text-sm text-secondary mt-0.5">
          {subtitle ?? t("home.analyticsSupport")}
        </p>
      </div>
      <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-primary text-sm font-medium px-4 py-2 rounded-lg border border-white/5 transition-colors">
        <FileText className="w-4 h-4" />
        {reportType ?? t("home.allReports")}
      </button>
    </div>
  );
};

export default HomeHeader;
