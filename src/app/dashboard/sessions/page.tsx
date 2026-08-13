"use client"

/**
 * Sessions Page
 * Main route page for /dashboard/sessions.
 * Renders the SessionTable component inside a centered layout.
 */

import React from "react"
import SessionTable from "@/components/DashboardComponents/SessionComponents/SessionTable"

function SessionsPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto">
        <SessionTable />
      </div>
    </div>
  )
}

export default SessionsPage
