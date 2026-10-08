"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { PlayerStatusConfirmDialogProps } from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerStatusConfirmDialog({
  open,
  onOpenChange,
  player,
  targetAction,
  onConfirm,
  isLoading = false,
}: PlayerStatusConfirmDialogProps) {
  const { t } = useTranslation("dashboard")

  if (!player) return null

  const isDisable = targetAction === "disable"
  const playerName =
    ("full_name" in player && player.full_name) ||
    ("name" in player && player.name) ||
    "this player"
  const displayId =
    ("display_id" in player && player.display_id) ||
    ("userId" in player && player.userId) ||
    ""

  return (
    <Dialog open={open} onOpenChange={isLoading ? () => {} : onOpenChange}>
      <DialogContent
        className="bg-card border-white/10 max-w-md text-center sm:text-center"
        showCloseButton={false}
      >
        <DialogHeader className="items-center text-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
              isDisable ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {isDisable ? (
              <AlertTriangle className="w-7 h-7" />
            ) : (
              <CheckCircle2 className="w-7 h-7" />
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-primary">
            {isDisable
              ? t("playerManagement.confirmDialog.blockTitle", "Block Player Account")
              : t("playerManagement.confirmDialog.activateTitle", "Activate Player Account")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-2 leading-relaxed">
            {isDisable ? (
              <>
                Are you sure you want to block{" "}
                <span className="font-semibold text-primary">{playerName}</span>
                {displayId ? ` (${displayId})` : ""}? The player will not be able to log in or book sessions until unblocked.
              </>
            ) : (
              <>
                Are you sure you want to activate{" "}
                <span className="font-semibold text-primary">{playerName}</span>
                {displayId ? ` (${displayId})` : ""}? Their account access and privileges will be fully restored.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-row gap-3 sm:justify-center mt-6">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 bg-muted text-primary text-sm font-medium hover:bg-muted/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("common.cancel", "Cancel")}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed text-white ${
              isDisable
                ? "bg-custom-red hover:bg-custom-red/90"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {t("common.processing", "Processing...")}
              </>
            ) : isDisable ? (
              t("playerManagement.actions.blockPlayer", "Block Player")
            ) : (
              t("playerManagement.actions.activatePlayer", "Activate Player")
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
