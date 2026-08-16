"use client"

/**
 * PayoutDetailsPage.tsx
 * Page component for payout details section.
 * Wraps PayoutDetailsTab with page-specific styling.
 */

import React from "react"
import PayoutDetailsTab from "./PayoutDetailsTab"

export default function PayoutDetailsPage() {
  return (
    <div className="space-y-6">
      <PayoutDetailsTab />
    </div>
  )
}
