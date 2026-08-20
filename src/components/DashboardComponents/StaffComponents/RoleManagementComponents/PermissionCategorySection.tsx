"use client"

import React from "react"
import {
  LayoutGrid,
  Calendar,
  QrCode,
  Trophy,
  Users,
  CreditCard,
  Megaphone,
  HelpCircle,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import PermissionSwitch from "./PermissionSwitch"
import type { PermissionCategorySectionProps } from "@/types/DashboardTypes/StaffTypes"

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutGrid,
  Calendar,
  QrCode,
  Trophy,
  Users,
  CreditCard,
  Megaphone,
  HelpCircle,
}

function PermissionCategorySection({
  category,
  onCategoryToggle,
  onPermissionToggle,
}: PermissionCategorySectionProps) {
  const IconComponent = ICON_MAP[category.icon] || LayoutGrid

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
        <div className="flex items-center gap-3">
          <IconComponent className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-primary">{category.name}</span>
        </div>
        <Switch
          checked={category.enabled}
          onCheckedChange={(checked) => onCategoryToggle(category.id, checked)}
          size="sm"
          className="data-[state=checked]:bg-custom-yellow data-[state=unchecked]:bg-input"
        />
      </div>

      {category.enabled && (
        <div className="px-4 py-3 flex flex-wrap gap-6">
          {category.permissions.map((permission) => (
            <PermissionSwitch
              key={permission.id}
              label={permission.name}
              checked={permission.enabled}
              onCheckedChange={(checked) =>
                onPermissionToggle(category.id, permission.id, checked)
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PermissionCategorySection
