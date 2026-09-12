"use client"

import { useTranslation } from "react-i18next"
import { X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  value: string
}

export interface FilterGroup {
  title: string
  options: FilterOption[]
}

interface FilterChipGroupProps {
  group: FilterGroup
  selectedValues: string[]
  onToggle: (value: string) => void
}

function FilterChipGroup({ group, selectedValues, onToggle }: FilterChipGroupProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-primary">{group.title}</h4>
      <div className="flex flex-wrap gap-2">
        {group.options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer",
                isSelected
                  ? "bg-red-700 text-white border-primary"
                  : "bg-white/5 text-secondary border-white/10 hover:bg-white/10 hover:text-primary"
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  filterGroups: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (filters: Record<string, string[]>) => void
  onApply?: () => void
  onReset?: () => void
}

export default function FilterSheet({
  open,
  onOpenChange,
  title,
  filterGroups,
  selectedFilters,
  onFilterChange,
  onApply,
  onReset,
}: FilterSheetProps) {
  const { t } = useTranslation("dashboard")

  const handleToggle = (groupTitle: string, value: string) => {
    const current = selectedFilters[groupTitle] || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onFilterChange({ ...selectedFilters, [groupTitle]: updated })
  }

  const handleReset = () => {
    const empty: Record<string, string[]> = {}
    filterGroups.forEach((g) => { empty[g.title] = [] })
    onFilterChange(empty)
    onReset?.()
  }

  const handleApply = () => {
    onApply?.()
    onOpenChange(false)
  }

  const activeCount = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0,
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" showCloseButton={false} className="bg-gray-950 border-none w-full sm:max-w-sm p-0 flex flex-col">
        <SheetHeader className="border-b border-white/5 px-5 py-4">
          <SheetTitle className="text-lg font-bold text-primary flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenChange(false)}
                className="p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-secondary" />
              </button>
              <span>{title}</span>
            </div>
            {activeCount > 0 && (
              <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                {activeCount} active
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {filterGroups.map((group) => (
            <FilterChipGroup
              key={group.title}
              group={group}
              selectedValues={selectedFilters[group.title] || []}
              onToggle={(value) => handleToggle(group.title, value)}
            />
          ))}
        </div>

        <SheetFooter className="border-t border-white/5 px-5 py-4 flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 border-white/10 text-secondary hover:text-primary hover:bg-white/5 cursor-pointer"
          >
            {t("filterSheet.reset", "Reset")}
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-red-700 text-white hover:bg-primary/90 cursor-pointer"
          >
            {t("filterSheet.apply", "Apply Filters")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
