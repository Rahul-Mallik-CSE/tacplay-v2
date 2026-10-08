"use client"

import { useTranslation } from "react-i18next"
import { AlertTriangle, CheckCircle2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
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

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleStatus) {
      onToggleStatus(player)
    } else if (onBlockPlayer) {
      onBlockPlayer(player)
    }
  }

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
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
  const blockAction = apiActions?.find(
    (a) => a.key === "block" || a.key === "enable" || a.key === "activate" || a.key === "disable"
  )

  const statusLabel = blockAction?.label || (
    isCurrentlyActive
      ? t("playerManagement.actions.blockPlayer", "Block Player")
      : t("playerManagement.actions.enablePlayer", "Enable Player")
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center text-muted-foreground hover:text-primary outline-none"
          aria-label="Player Actions"
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
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="w-48 bg-card border border-white/10 rounded-lg shadow-xl z-50 py-1 backdrop-blur-md"
      >
        <DropdownMenuItem
          onClick={handleStatusClick}
          className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm cursor-pointer focus:bg-white/5 outline-none"
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
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDetailsClick}
          className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-primary cursor-pointer focus:bg-white/5 outline-none"
        >
          <Eye className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{t("playerManagement.actions.viewDetails", "View Details")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
