"use client"

/**
 * SessionDetailsHeader.tsx
 * Header component for session details page.
 * Contains back button, title, and View Session Info action button.
 */

import React from "react"
import { ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

/** Props for SessionDetailsHeader component */
interface SessionDetailsHeaderProps {
  onViewInfo: () => void
}

function SessionDetailsHeader({ onViewInfo }: SessionDetailsHeaderProps) {
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
          onClick={onViewInfo}
          className="cursor-pointer flex gap-2 bg-custom-red hover:bg-custom-red/80 text-white"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">
            {t("sessions.details.viewSessionInfo")}
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SessionDetailsHeader
