"use client"

import { Pen, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

interface EditSaveButtonProps {
  isEditing: boolean
  isSaving: boolean
  onToggleEdit: () => void
  onSave: () => void
}

export default function EditSaveButton({
  isEditing,
  isSaving,
  onToggleEdit,
  onSave,
}: EditSaveButtonProps) {
  const { t } = useTranslation("dashboard")

  return (
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
  )
}
