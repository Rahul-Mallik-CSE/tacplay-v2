"use client"

/**
 * PackageActionDropdown.tsx
 * Three-dot action dropdown for package management.
 * Shows Delete, Edit, Duplicate, and Deactivate options.
 */

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Trash2, Pencil, Copy, AlertTriangle } from "lucide-react"
import { useTranslation } from "react-i18next"
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
  onDelete,
  onDuplicate,
  onDeactivate,
}: PackageActionDropdownProps) {
  const { t } = useTranslation("dashboard")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-primary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[180px]">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(pkg)
              setIsOpen(false)
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {t("arena.packagesTab.deletePackage")}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(pkg)
              setIsOpen(false)
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            {t("arena.packagesTab.editPackage")}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate(pkg)
              setIsOpen(false)
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Copy className="w-4 h-4" />
            {t("arena.packagesTab.duplicate")}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDeactivate(pkg)
              setIsOpen(false)
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            {t("arena.packagesTab.deactivate")}
          </button>
        </div>
      )}
    </div>
  )
}
