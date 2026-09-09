"use client"

/**
 * SessionTable.tsx
 * Main sessions list table component using reusable CustomTable.
 * Includes search, filters, action dropdown menu, and row click navigation.
 */

import React, { useMemo, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Calendar, Filter, MoreVertical, Pencil, Copy, Users, Eye } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import SessionMatchTypeDot from "./SessionMatchTypeDot"
import SessionStatusBadge from "./SessionStatusBadge"
import { Switch } from "@/components/ui/switch"
import { mockSessionsListData } from "@/mock-data/DashboardMockData/sessions-mock-data"
import AssignStaffSheet from "./AssignStaffSheet"
import CustomTable from "@/components/SharedComponents/CustomTable"
import type {
  SessionsListItem,
} from "@/types/DashboardTypes/SessionTypes"

function SessionTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()

  // Local state for filters
  const [search, setSearch] = useState("")
  const [openActionId, setOpenActionId] = useState<number | null>(null)
  const [disabledSessions, setDisabledSessions] = useState<Set<number>>(new Set())
  const [assignSheetOpen, setAssignSheetOpen] = useState(false)
  const [assignSheetSessionId, setAssignSheetSessionId] = useState<number | null>(null)
  const [assignSheetSessionName, setAssignSheetSessionName] = useState("")
  const actionMenuRef = useRef<HTMLDivElement>(null)

  // Close action menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter mock data
  const filteredData = useMemo(() => {
    return mockSessionsListData.filter((item) => {
      if (!search.trim()) return true
      const query = search.toLowerCase()
      return (
        item.session_name.toLowerCase().includes(query) ||
        item.session_id.toLowerCase().includes(query) ||
        item.assign_staff.toLowerCase().includes(query)
      )
    })
  }, [search])

  // Handle row click to navigate to session details
  const handleRowClick = (row: SessionsListItem) => {
    router.push(`/dashboard/sessions/${row.id}`)
  }

  // Handle disable toggle
  const handleDisableToggle = (id: number) => {
    const newDisabled = new Set(disabledSessions)
    if (newDisabled.has(id)) {
      newDisabled.delete(id)
    } else {
      newDisabled.add(id)
    }
    setDisabledSessions(newDisabled)
  }

  // Handle assign staff from action menu
  const handleAssignStaff = (row: SessionsListItem) => {
    setAssignSheetSessionId(row.id)
    setAssignSheetSessionName(row.session_name)
    setAssignSheetOpen(true)
    setOpenActionId(null)
  }

  // Define table columns
  const columns = useMemo(() => [
    {
      header: t("sessions.columns.sessionName"),
      accessor: "session_name" as keyof SessionsListItem,
      className: "font-medium",
    },
    {
      header: t("sessions.columns.dateTime"),
      accessor: (row: SessionsListItem) => (
        <div className="text-primary/80">
          {row.date_time.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      ),
    },
    {
      header: t("sessions.columns.assignStaff"),
      accessor: "assign_staff" as keyof SessionsListItem,
    },
    {
      header: t("sessions.columns.matchType"),
      accessor: (row: SessionsListItem) => (
        <SessionMatchTypeDot type={row.match_type_display} />
      ),
    },
    {
      header: t("sessions.columns.players"),
      accessor: "player" as keyof SessionsListItem,
      className: "text-center",
    },
    {
      header: t("sessions.columns.booked"),
      accessor: "booked" as keyof SessionsListItem,
      className: "text-center",
    },
    {
      header: t("sessions.columns.price"),
      accessor: (row: SessionsListItem) => `$${row.price}`,
      className: "text-right",
    },
    {
      header: t("sessions.columns.status"),
      accessor: (row: SessionsListItem) => (
        <SessionStatusBadge status={row.status_display} />
      ),
      className: "text-center",
    },
  ], [t])

  // Custom action renderer with dropdown menu
  const actionRenderer = (row: SessionsListItem) => (
    <div className="relative inline-block" ref={openActionId === row.id ? actionMenuRef : undefined}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpenActionId(openActionId === row.id ? null : row.id)
        }}
        className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
      >
        <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
      </button>

      {/* Action Dropdown Menu */}
      {openActionId === row.id && (
        <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-card border border-white/10 rounded-lg shadow-xl py-1">
          {/* Disable Toggle */}
          <div className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5">
            <span className="flex items-center gap-2 text-sm text-primary">
              <Pencil className="w-4 h-4" />
              {t("sessions.actions.disable")}
            </span>
            <Switch
              size="sm"
              checked={!disabledSessions.has(row.id)}
              onCheckedChange={() => handleDisableToggle(row.id)}
            />
          </div>

          {/* Edit Session */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpenActionId(null)
              router.push(`/dashboard/sessions/${row.id}`)
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            {t("sessions.actions.editSession")}
          </button>

          {/* Duplicate */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpenActionId(null)
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            {t("sessions.actions.duplicate")}
          </button>

          {/* Assign Staff */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAssignStaff(row)
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4" />
            {t("sessions.actions.assignStaff")}
          </button>

          {/* View Details */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpenActionId(null)
              router.push(`/dashboard/sessions/${row.id}`)
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            {t("sessions.actions.viewDetails")}
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full space-y-6">
      {/* Search, Filter, Calendar, Create Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {t("sessions.title")}
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              type="text"
              placeholder={t("common.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-muted border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-primary outline-none placeholder:text-secondary"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t("common.filter")}</span>
          </button>

          {/* Calendar Button */}
          <button className="flex items-center gap-2 bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4" />
          </button>
          {/* Create New Session */}
          <Link href="/dashboard/sessions/create-session">
            <button className="flex cursor-pointer items-center gap-2 bg-custom-red hover:bg-custom-red/80 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              {t("sessions.createNew")}
            </button>
          </Link>
        </div>
      </div>

      {/* Reusable CustomTable with internal pagination */}
      <CustomTable
        data={filteredData as unknown as Record<string, unknown>[]}
        columns={columns as { header: string; accessor: keyof Record<string, unknown> | ((row: Record<string, unknown>) => React.ReactNode); className?: string }[]}
        onRowClick={(row) => handleRowClick(row as unknown as SessionsListItem)}
        actionRenderer={(row) => actionRenderer(row as unknown as SessionsListItem)}
        minTableWidth="min-w-[900px]"
      />

      {/* Assign Staff Sheet */}
      <AssignStaffSheet
        open={assignSheetOpen}
        onOpenChange={setAssignSheetOpen}
        sessionId={assignSheetSessionId}
        sessionName={assignSheetSessionName}
      />
    </div>
  )
}

export default SessionTable
