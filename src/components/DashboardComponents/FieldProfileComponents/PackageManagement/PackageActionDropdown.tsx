"use client"

/**
 * PackageActionDropdown.tsx
 * Three-dot action dropdown for package management.
 * Shows Delete, Edit, Duplicate, and Deactivate options.
 */

import { MoreVertical, Pencil } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import type { PackageItem } from "@/types/DashboardTypes/ArenaManagementTypes"

interface PackageActionDropdownProps {
  pkg: PackageItem
  onEdit: (pkg: PackageItem) => void
  onDelete: (pkg: PackageItem) => void
  onDuplicate: (pkg: PackageItem) => void
  onDeactivate: (pkg: PackageItem) => void
}

export default function PackageActionDropdown({
  pkg,
  onEdit,
}: PackageActionDropdownProps) {
  const { t } = useTranslation("dashboard")

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(pkg)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors cursor-pointer outline-none inline-flex items-center justify-center"
          aria-label="Package Actions"
        >
          <MoreVertical className="w-5 h-5 text-primary" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="w-48 bg-card border border-white/10 rounded-lg shadow-xl z-50 py-1 backdrop-blur-md"
      >
        <DropdownMenuItem
          onClick={handleEdit}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-primary cursor-pointer focus:bg-white/5 outline-none"
        >
          <Pencil className="w-4 h-4 text-secondary" />
          <span>{t("arena.packagesTab.editPackage", "Edit Package")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
