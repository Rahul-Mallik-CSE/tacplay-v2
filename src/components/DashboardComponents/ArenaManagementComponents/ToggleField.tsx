"use client"

import { Switch } from "@/components/ui/switch"
import { useTranslation } from "react-i18next"

interface ToggleFieldProps {
  label: string
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}

export default function ToggleField({
  label,
  checked,
  disabled = false,
  onCheckedChange,
}: ToggleFieldProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex items-center justify-between py-3 border-t border-white/5">
      <label className="text-sm font-medium text-primary">{label}</label>
      <div className="flex items-center gap-3">
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className="data-[state=checked]:bg-custom-yellow"
        />
        <span className="text-sm text-muted-foreground">
          {checked ? t("arena.on") : t("arena.off")}
        </span>
      </div>
    </div>
  )
}
