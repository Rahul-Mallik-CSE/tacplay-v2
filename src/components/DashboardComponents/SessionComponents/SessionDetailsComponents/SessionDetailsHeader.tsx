"use client"

/**
 * SessionDetailsHeader.tsx
 * Header component for session details page.
 * Contains back button, title, and action buttons (Edit, View Info).
 */

import React from "react"
import { ArrowLeft, Eye, Pencil } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

/** Props for SessionDetailsHeader component */
interface SessionDetailsHeaderProps {
  onEdit: () => void
  onViewInfo: () => void
}

function SessionDetailsHeader({ onEdit, onViewInfo }: SessionDetailsHeaderProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/sessions">
          <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          {t("sessions.details.title")}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={onEdit}
          className="cursor-pointer flex gap-2 bg-transparent border border-white/10 hover:bg-white/5 text-primary hover:text-white"
        >
          <Pencil className="w-4 h-4" />
          <span className="hidden sm:inline">
            {t("sessions.details.editButton")}
          </span>
        </Button>
        <Button
          onClick={onViewInfo}
          className="cursor-pointer flex gap-2"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">
            {t("sessions.details.viewInfo")}
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SessionDetailsHeader
