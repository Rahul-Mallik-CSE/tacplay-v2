"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { AlertTriangle, CheckCircle2, Eye } from "lucide-react"
import type {
  PlayerActionDropdownProps,
  AdminPlayerListItem,
} from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerActionDropdown({
  player,
  onViewDetails,
  onToggleStatus,
  onBlockPlayer,
}: PlayerActionDropdownProps) {
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

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    if (onToggleStatus) {
      onToggleStatus(player)
    } else if (onBlockPlayer) {
      onBlockPlayer(player)
    }
  }

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    onViewDetails(player)
  }

  // Determine current status
  const rawStatus =
    ("status_info" in player && player.status_info?.value) ||
    ("status" in player && player.status) ||
    "active"
  const isCurrentlyActive = rawStatus.toLowerCase() === "active"

  // Check if player has actions array from API
  const apiActions = "actions" in player ? (player as AdminPlayerListItem).actions : undefined
  const blockAction = apiActions?.find((a) => a.key === "block" || a.key === "enable" || a.key === "activate" || a.key === "disable")

  const statusLabel = blockAction?.label || (
    isCurrentlyActive
      ? t("playerManagement.actions.blockPlayer", "Block Player")
      : t("playerManagement.actions.enablePlayer", "Enable Player")
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center text-muted-foreground hover:text-primary"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-white/10 rounded-lg shadow-xl z-50 py-1 backdrop-blur-md">
          <button
            type="button"
            onClick={handleStatusClick}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            {isCurrentlyActive ? (
              <>
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-red-400 font-medium">{statusLabel}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-medium">{statusLabel}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDetailsClick}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            <Eye className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{t("playerManagement.actions.viewDetails", "View Details")}</span>
          </button>
        </div>
      )}
    </div>
  )
}
