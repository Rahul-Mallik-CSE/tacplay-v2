"use client"

/**
 * Session Details Page
 * Main route page for /dashboard/sessions/[session-id].
 * Renders the SessionDetailsContainer component inside a centered layout.
 */

import React from "react"
import SessionDetailsContainer from "@/components/DashboardComponents/SessionComponents/SessionDetailsComponents/SessionDetailsContainer"

function SessionDetailsPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto">
        <SessionDetailsContainer />
      </div>
    </div>
  )
}

export default SessionDetailsPage
