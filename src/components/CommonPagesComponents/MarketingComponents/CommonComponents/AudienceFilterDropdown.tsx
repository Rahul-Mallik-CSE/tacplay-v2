"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Filter } from "lucide-react"

interface AudienceFilterDropdownProps {
  value: "all" | "active"
  onChange: (value: "all" | "active") => void
}

export default function AudienceFilterDropdown({ value, onChange }: AudienceFilterDropdownProps) {
  const { t } = useTranslation("dashboard")
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-primary hover:bg-white/10 transition-colors cursor-pointer"
      >
        <Filter className="w-4 h-4" />
        {t("marketing.form.filter")}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-card border border-white/10 rounded-xl shadow-lg py-2">
          <button
            onClick={() => {
              onChange("all")
              setOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                value === "all" ? "border-custom-yellow" : "border-white/20"
              }`}
            >
              {value === "all" && (
                <div className="w-2 h-2 rounded-full bg-custom-yellow" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{t("marketing.form.allPlayer")}</p>
              <p className="text-xs text-secondary">{t("marketing.form.sendNowLabel")}</p>
            </div>
          </button>
          <button
            onClick={() => {
              onChange("active")
              setOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                value === "active" ? "border-custom-yellow" : "border-white/20"
              }`}
            >
              {value === "active" && (
                <div className="w-2 h-2 rounded-full bg-custom-yellow" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{t("marketing.form.activePlayers")}</p>
              <p className="text-xs text-secondary">{t("marketing.form.sendNowLabel")}</p>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
