"use client"

import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import IncludeItemsInput from "./IncludeItemsInput"
import type { PackageItem } from "@/types/DashboardTypes/ArenaManagementTypes"

type PackageForm = {
  id?: number
  package_name: string
  description: string
  package_fee: string
  include_items: string[]
  is_active: boolean
}

interface PackageCardProps {
  pkg: PackageForm
  index: number
  isEditing: boolean
  onUpdate: (index: number, patch: Partial<PackageForm>) => void
  onRemove: (index: number) => void
  onAddItem: (index: number, value: string) => void
  onRemoveItem: (index: number, value: string) => void
}

export default function PackageCard({
  pkg,
  index,
  isEditing,
  onUpdate,
  onRemove,
  onAddItem,
  onRemoveItem,
}: PackageCardProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-primary">
          {t("arena.packagesTab.type", { index: index + 1 })}
        </h3>
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          {t("onboardingFields.packages.nameLabel")}
        </label>
        <Input
          value={pkg.package_name}
          onChange={(event) =>
            onUpdate(index, { package_name: event.target.value })
          }
          readOnly={!isEditing}
          className="bg-input/30 border-white/10 text-primary h-11"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          {t("onboardingFields.packages.descLabel")}
        </label>
        <Textarea
          value={pkg.description}
          onChange={(event) =>
            onUpdate(index, { description: event.target.value })
          }
          readOnly={!isEditing}
          className="bg-input/30 border-white/10 text-primary min-h-25"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          {t("onboardingFields.packages.feeLabel")}
        </label>
        <Input
          type="number"
          inputMode="decimal"
          step="0.01"
          value={pkg.package_fee}
          onChange={(event) =>
            onUpdate(index, { package_fee: event.target.value })
          }
          readOnly={!isEditing}
          className="bg-input/30 border-white/10 text-primary h-11"
        />
      </div>

      <div className="flex items-center justify-between py-2 border-t border-white/5">
        <label className="text-sm font-medium text-primary">
          {t("arena.packagesTab.active")}
        </label>
        <div className="flex items-center gap-3">
          <Switch
            checked={pkg.is_active}
            onCheckedChange={(checked) =>
              onUpdate(index, { is_active: checked })
            }
            disabled={!isEditing}
            className="data-[state=checked]:bg-custom-yellow"
          />
          <span className="text-sm text-muted-foreground">
            {pkg.is_active ? t("arena.on") : t("arena.off")}
          </span>
        </div>
      </div>

      <IncludeItemsInput
        items={pkg.include_items}
        isEditing={isEditing}
        onAdd={(value) => onAddItem(index, value)}
        onRemove={(value) => onRemoveItem(index, value)}
      />
    </div>
  )
}
