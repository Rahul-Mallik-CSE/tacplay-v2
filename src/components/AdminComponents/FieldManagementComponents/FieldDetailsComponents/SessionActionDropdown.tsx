"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Eye } from "lucide-react"
import type { SessionActionDropdownProps } from "@/types/AdminTypes/FieldManagementTypes"

export default function SessionActionDropdown({
  session,
  onViewDetails,
}: SessionActionDropdownProps) {
  const { t } = useTranslation("dashboard")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
        className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
      >
        <svg
          className="w-5 h-5 text-muted-foreground"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-white/10 rounded-lg shadow-lg z-50 py-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails(session)
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            {t("fieldManagement.actions.viewDetails")}
          </button>
        </div>
      )}
    </div>
  )
}
