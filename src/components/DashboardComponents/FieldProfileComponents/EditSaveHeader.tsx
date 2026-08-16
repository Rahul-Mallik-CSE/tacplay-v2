"use client"

import { Pen, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

interface EditSaveHeaderProps {
  title: string
  subtitle: string
  isEditing: boolean
  isSaving: boolean
  onToggleEdit: () => void
  onSave: () => void
}

export default function EditSaveHeader({
  title,
  subtitle,
  isEditing,
  isSaving,
  onToggleEdit,
  onSave,
}: EditSaveHeaderProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="w-fit flex items-center gap-2"
          onClick={onToggleEdit}
        >
          <Pen className="w-4 h-4" />
          {isEditing ? t("arena.cancelEdit") : t("arena.editInfo")}
        </Button>
        {isEditing && (
          <Button
            variant="default"
            size="sm"
            className="w-fit flex items-center gap-2"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {t("arena.save")}
          </Button>
        )}
      </div>
    </div>
  )
}
