"use client"

import React, { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ChevronRight, Search, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SelectRoleDropdownProps } from "@/types/DashboardTypes/StaffTypes"

function SelectRoleDropdown({ value, onChange, roles, onCreateNewRole }: SelectRoleDropdownProps) {
  const { t } = useTranslation("dashboard")
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectedRole = roles.find((r) => r.name === value)

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-primary mb-2">
        {t("staff.selectRole")}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm text-left transition-colors cursor-pointer",
          isOpen
            ? "border-custom-yellow/50 bg-muted"
            : "border-white/10 bg-muted hover:border-white/20",
          selectedRole ? "text-primary" : "text-secondary"
        )}
      >
        <span>{selectedRole ? selectedRole.name : t("staff.selectRole")}</span>
        <ChevronRight className={cn("w-4 h-4 transition-transform", isOpen && "rotate-90")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-white/10 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input
                type="text"
                placeholder={t("staff.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
              />
            </div>
          </div>

          <div className="p-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                onCreateNewRole()
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-custom-red hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {t("staff.createNewRole")}
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto p-1">
            {filteredRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  onChange(role.name)
                  setIsOpen(false)
                  setSearch("")
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer",
                  value === role.name
                    ? "bg-custom-red/10 text-custom-red"
                    : "text-primary hover:bg-white/5"
                )}
              >
                {role.name}
              </button>
            ))}
            {filteredRoles.length === 0 && (
              <p className="text-center text-sm text-secondary py-3">
                No roles found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectRoleDropdown
