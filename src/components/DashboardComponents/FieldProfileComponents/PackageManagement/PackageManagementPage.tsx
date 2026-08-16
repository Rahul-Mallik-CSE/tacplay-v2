"use client"

/**
 * PackageManagementPage.tsx
 * Page component for package management section.
 * Wraps PackageManagementTab with page-specific styling.
 */

import React from "react"
import PackageManagementTab from "./PackageManagementTab"

export default function PackageManagementPage() {
  return (
    <div className="space-y-6">
      <PackageManagementTab />
    </div>
  )
}
