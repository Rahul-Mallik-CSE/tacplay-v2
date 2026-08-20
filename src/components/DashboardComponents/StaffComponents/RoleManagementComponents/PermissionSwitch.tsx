"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { Switch } from "@/components/ui/switch"
import type { PermissionSwitchProps } from "@/types/DashboardTypes/StaffTypes"

function PermissionSwitch({ label, checked, onCheckedChange }: PermissionSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        size="sm"
        className="data-[state=checked]:bg-custom-yellow data-[state=unchecked]:bg-input"
      />
      <span className="text-sm text-primary">{label}</span>
    </div>
  )
}

export default PermissionSwitch
