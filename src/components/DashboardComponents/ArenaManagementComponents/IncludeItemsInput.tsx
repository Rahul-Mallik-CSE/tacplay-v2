"use client"

import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useState } from "react"

interface IncludeItemsInputProps {
  items: string[]
  isEditing: boolean
  onAdd: (value: string) => void
  onRemove: (value: string) => void
}

export default function IncludeItemsInput({
  items,
  isEditing,
  onAdd,
  onRemove,
}: IncludeItemsInputProps) {
  const { t } = useTranslation("dashboard")
  const [inputValue, setInputValue] = useState("")

  const handleAdd = () => {
    if (!inputValue.trim()) return
    onAdd(inputValue.trim())
    setInputValue("")
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter" || !isEditing) return
    event.preventDefault()
    handleAdd()
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary">
        {t("onboardingFields.packages.includeLabel")}
      </label>
      <div className="flex gap-2">
        <Input
          placeholder={t("arena.packagesTab.placeholder")}
          className="bg-input/30 border-white/10 text-primary h-11"
          readOnly={!isEditing}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          variant="default"
          size="sm"
          disabled={!isEditing}
          className="h-11 px-4"
          onClick={handleAdd}
        >
          {t("arena.add")}
        </Button>
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {item}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onRemove(item)}
                  className="flex items-center justify-center hover:text-destructive transition-colors"
                  aria-label={`Remove ${item}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
