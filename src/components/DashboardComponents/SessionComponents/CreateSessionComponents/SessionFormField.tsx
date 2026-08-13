"use client"

/**
 * SessionFormField.tsx
 * Reusable form field wrapper component.
 * Displays a label above the form input children.
 */

import React from "react"

/** Props for SessionFormField component */
interface SessionFormFieldProps {
  label: string
  children: React.ReactNode
}

function SessionFormField({ label, children }: SessionFormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-primary font-medium">{label}</label>
      {children}
    </div>
  )
}

export default SessionFormField
