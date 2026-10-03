"use client"

/**
 * FieldDetailsPage.tsx
 * Page component for field details section.
 * Wraps ArenaInfoTab with API data fetching.
 */

import React from "react"
import ArenaInfoTab from "./ArenaInfoTab"

export default function FieldDetailsPage() {
  return (
    <div className="space-y-6">
      <ArenaInfoTab />
    </div>
  )
}
