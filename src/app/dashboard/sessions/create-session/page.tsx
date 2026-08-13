"use client"

/**
 * Create Session Page
 * Main route page for /dashboard/sessions/create-session.
 * Renders the CreateSessionContainer component inside a centered layout.
 */

import React from "react"
import CreateSessionContainer from "@/components/DashboardComponents/SessionComponents/CreateSessionComponents/CreateSessionContainer"

function CreateSessionPage() {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto">
        <CreateSessionContainer />
      </div>
    </div>
  )
}

export default CreateSessionPage
