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
  Shield,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import PermissionSwitch from "./PermissionSwitch"
import type { PermissionCategorySectionProps } from "@/types/CommonPageTypes/StaffTypes"

const ICON_MAP: Record<string, React.ElementType> = {
  // Named icons
  LayoutGrid,
  Calendar,
  QrCode,
  Trophy,
  Users,
  CreditCard,
  Megaphone,
  HelpCircle,
  Shield,
  // API category keys
  dashboard_overview: LayoutGrid,
  booking_session: Calendar,
  scanner_checkin: QrCode,
  scores_matches: Trophy,
  management: Users,
  billing_subscription: CreditCard,
  marketing_permissions: Megaphone,
  other: HelpCircle,
}

function PermissionCategorySection({
  category,
  onCategoryToggle,
  onPermissionToggle,
}: PermissionCategorySectionProps) {
  const IconComponent = ICON_MAP[category.icon] || ICON_MAP[category.id] || LayoutGrid

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-card/40">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
        <div className="flex items-center gap-3">
          <IconComponent className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-primary">{category.name}</span>
        </div>
        <Switch
          checked={category.enabled}
          onCheckedChange={(checked) => onCategoryToggle(category.id, checked)}
          size="sm"
          className="data-[state=checked]:bg-custom-yellow data-[state=unchecked]:bg-input cursor-pointer"
        />
      </div>

      {category.enabled && (
        <div className="px-4 py-3 flex flex-wrap gap-6 md:gap-8 lg:gap-10 xl:gap-12">
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
