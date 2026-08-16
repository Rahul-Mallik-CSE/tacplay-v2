"use client"

/**
 * FieldDetailsPage.tsx
 * Page component for field details section.
 * Wraps ArenaInfoTab with page-specific styling.
 */

import React from "react"
import { useTranslation } from "react-i18next"
import { mockArenaInfo } from "../../../../mock-data/DashboardMockData/arena-management-mock-data"
import ArenaInfoTab from "./ArenaInfoTab"

export default function FieldDetailsPage() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-6">
      <ArenaInfoTab arenaInfo={mockArenaInfo} />
    </div>
  )
}
