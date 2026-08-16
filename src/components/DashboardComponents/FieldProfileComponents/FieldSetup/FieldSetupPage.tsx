"use client"

/**
 * FieldSetupPage.tsx
 * Page component for field setup section.
 * Wraps FieldSetupTab with page-specific styling.
 */

import React from "react"
import FieldSetupTab from "./FieldSetupTab"

export default function FieldSetupPage() {
  return (
    <div className="space-y-6">
      <FieldSetupTab />
    </div>
  )
}
