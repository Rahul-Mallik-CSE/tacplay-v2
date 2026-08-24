"use client"

import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"
import CustomTable from "@/components/SharedComponents/CustomTable"
import type { RecentFieldItem } from "@/types/AdminTypes/OverviewTypes"

interface RecentFieldTableProps {
  fields: RecentFieldItem[]
}

export default function RecentFieldTable({ fields }: RecentFieldTableProps) {
  const { t } = useTranslation("dashboard")

  type TableRow = RecentFieldItem & Record<string, unknown>

  const getSubscriptionColor = (sub: string) => {
    switch (sub) {
      case "Gold":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "Sliver":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "Bronze":
        return "bg-custom-yellow/20 text-yellow-400 border border-custom-yellow/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "pending":
        return "bg-custom-yellow/20 text-yellow-400 border border-custom-yellow/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const columns = [
    {
      header: t("adminAnalytics.field"),
      accessor: (row: TableRow) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted/50 rounded-md shrink-0" />
          <div>
            <p className="text-sm font-medium text-primary">
              {t(row.fieldName as string)}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("adminAnalytics.fieldId")}: {row.fieldId as string}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("adminAnalytics.owner"),
      accessor: (row: TableRow) => (
        <div>
          <p className="text-sm font-medium text-primary">
            {row.ownerName as string}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.ownerEmail as string}
          </p>
        </div>
      ),
    },
    {
      header: t("adminAnalytics.subscription"),
      accessor: (row: TableRow) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getSubscriptionColor(
            row.subscription as string
          )}`}
        >
          {row.subscription as string}
        </span>
      ),
    },
    {
      header: t("adminAnalytics.country"),
      accessor: (row: TableRow) => (
        <ReactCountryFlag
          countryCode={row.countryCode as string}
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
      ),
    },
    {
      header: t("adminAnalytics.created"),
      accessor: (row: TableRow) => (
        <div>
          <p className="text-sm text-primary">{row.createdDate as string}</p>
          <p className="text-xs text-muted-foreground">
            {row.createdTime as string}
          </p>
        </div>
      ),
    },
    {
      header: t("adminAnalytics.booking"),
      accessor: (row: TableRow) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary font-medium">
            {row.booking as number}
          </span>
          <span className="text-xs text-emerald-400">
            +{row.bookingChange as number}%
          </span>
        </div>
      ),
    },
    {
      header: t("adminAnalytics.revenue"),
      accessor: (row: TableRow) => (
        <span className="text-sm text-primary font-medium">
          {row.revenue as string}
        </span>
      ),
    },
    {
      header: t("adminAnalytics.status"),
      accessor: (row: TableRow) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
            row.status as string
          )}`}
        >
          {row.status as string}
        </span>
      ),
    },
  ]

  const actionRenderer = (_row: TableRow) => (
    <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center">
      <svg
        className="w-5 h-5 text-muted-foreground"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </button>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          {t("adminOverview.recentField")}
        </h2>
        <button className="text-sm text-custom-red hover:underline font-medium cursor-pointer">
          {t("adminOverview.viewAllField")}
        </button>
      </div>
      <CustomTable
        data={fields as unknown as TableRow[]}
        columns={columns as { header: string; accessor: keyof TableRow | ((row: TableRow) => React.ReactNode); className?: string }[]}
        actionRenderer={actionRenderer}
        itemsPerPage={5}
        minTableWidth="min-w-[900px]"
      />
    </div>
  )
}
