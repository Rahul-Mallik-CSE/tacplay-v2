"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { Eye } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import type {
  RecentTicketsTableProps,
  TicketListItem,
} from "@/types/DashboardTypes/HelpSupportTypes"

function RecentTicketsTable({
  tickets,
  onViewAll,
  onViewTicket,
}: RecentTicketsTableProps) {
  const { t } = useTranslation("dashboard")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      case "in_progress":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "resolved":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "closed":
        return "bg-secondary/20 text-secondary border border-secondary/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      case "low":
        return "bg-secondary/20 text-secondary border border-secondary/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return t("helpSupport.status.open")
      case "in_progress":
        return t("helpSupport.status.inProgress")
      case "resolved":
        return t("helpSupport.status.resolved")
      case "closed":
        return t("helpSupport.status.closed")
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "low":
        return t("helpSupport.priority.low")
      case "medium":
        return t("helpSupport.priority.medium")
      case "high":
        return t("helpSupport.priority.high")
      default:
        return priority
    }
  }

  const columns: {
    header: string
    accessor:
      | keyof TicketListItem
      | ((row: TicketListItem) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("helpSupport.table.ticketId"),
      accessor: "display_ticket_id",
    },
    {
      header: t("helpSupport.table.subject"),
      accessor: "subject",
    },
    {
      header: t("helpSupport.table.category"),
      accessor: "category",
    },
    {
      header: t("helpSupport.table.status"),
      accessor: (row: TicketListItem) => (
        <div
          className={`w-24 px-2 py-1 flex justify-center items-center rounded-md text-xs font-medium ${getStatusColor(row.status)}`}
        >
          {getStatusLabel(row.status)}
        </div>
      ),
    },
    {
      header: t("helpSupport.table.priority"),
      accessor: (row: TicketListItem) => (
        <div
          className={`w-20 px-2 py-1 flex justify-center items-center rounded-md text-xs font-medium ${getPriorityColor(row.priority)}`}
        >
          {getPriorityLabel(row.priority)}
        </div>
      ),
    },
    {
      header: t("helpSupport.table.lastUpdate"),
      accessor: "last_update",
    },
  ]

  const actionRenderer = (row: TicketListItem) => (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onViewTicket(row)
      }}
      className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
    >
      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60" />
    </button>
  )

  type TableRow = TicketListItem & Record<string, unknown>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">
          {t("helpSupport.recentTickets")}
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm text-custom-red hover:text-custom-red/80 transition-colors cursor-pointer"
        >
          {t("helpSupport.viewAllTickets")}
        </button>
      </div>

      <CustomTable
        data={tickets as unknown as TableRow[]}
        columns={
          columns as {
            header: string
            accessor:
              | keyof TableRow
              | ((row: TableRow) => React.ReactNode)
            className?: string
          }[]
        }
        actionRenderer={(row) => actionRenderer(row as TicketListItem)}
        onRowClick={(row) => onViewTicket(row as TicketListItem)}
        itemsPerPage={5}
        minTableWidth="min-w-[800px]"
      />
    </div>
  )
}

export default RecentTicketsTable
