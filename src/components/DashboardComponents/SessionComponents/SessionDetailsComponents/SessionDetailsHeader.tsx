"use client"

/**
 * SessionDetailsHeader.tsx
 * Header component for session details page.
 * Contains back button, title, View Session Info button, and optional Result Summary button.
 */

import React from "react"
import { ArrowLeft, Eye, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

/** Props for SessionDetailsHeader component */
interface SessionDetailsHeaderProps {
  onViewInfo: () => void
  onViewResultSummary?: () => void
  isCompleted?: boolean
  sessionName?: string
}

function SessionDetailsHeader({
  onViewInfo,
  onViewResultSummary,
  isCompleted,
  sessionName,
}: SessionDetailsHeaderProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/sessions">
          <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            {t("sessions.details.title", "Session Details")}
          </h1>
          {sessionName && (
            <p className="text-xs text-secondary">{sessionName}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {isCompleted && onViewResultSummary && (
          <Button
            onClick={onViewResultSummary}
            className="cursor-pointer flex-1 sm:flex-none flex gap-2 bg-custom-yellow/20 hover:bg-custom-yellow/30 text-custom-yellow border border-custom-yellow/40"
          >
            <Trophy className="w-4 h-4" />
            <span>Result Summary</span>
          </Button>
        )}
        <Button
          onClick={onViewInfo}
          className="cursor-pointer flex-1 sm:flex-none flex gap-2 bg-custom-red hover:bg-custom-red/80 text-white"
        >
          <Eye className="w-4 h-4" />
          <span>{t("sessions.details.viewSessionInfo", "View Session Info")}</span>
        </Button>
      </div>
    </div>
  )
}

export default SessionDetailsHeader
