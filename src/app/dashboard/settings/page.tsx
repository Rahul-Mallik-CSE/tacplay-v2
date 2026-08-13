"use client"

/**
 * Settings Page
 * Main route page for /dashboard/settings.
 * Renders the SettingsContainer component inside a centered layout.
 */

import React from "react"
import SettingsContainer from "@/components/DashboardComponents/SettingComponents/SettingsContainer"

function SettingsPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto">
        <SettingsContainer />
      </div>
    </div>
  )
}

export default SettingsPage
