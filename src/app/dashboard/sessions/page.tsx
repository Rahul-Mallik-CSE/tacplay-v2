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
        <SessionTable />
  )
}

export default SessionsPage
