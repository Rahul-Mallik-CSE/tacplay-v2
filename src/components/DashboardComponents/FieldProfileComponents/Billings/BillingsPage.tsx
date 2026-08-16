"use client"

/**
 * BillingsPage.tsx
 * Page component for billings section.
 * Wraps BillingsTab with page-specific styling.
 */

import React from "react"
import BillingsTab from "./BillingsTab"

export default function BillingsPage() {
  return (
    <div className="space-y-6">
      <BillingsTab />
    </div>
  )
}
