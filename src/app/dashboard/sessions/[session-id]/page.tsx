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
        <SessionDetailsContainer />
  )
}

export default SessionDetailsPage
