"use client"

import React from "react"
import { useTranslation } from "react-i18next"

interface StaffLayoutProps {
  children: React.ReactNode
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  const { t } = useTranslation("dashboard")

  return (

      <div className=" space-y-6">
        {children}
      </div>

  )
}
