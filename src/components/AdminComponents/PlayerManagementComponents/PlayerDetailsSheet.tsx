"use client"

import { useTranslation } from "react-i18next"
import { ArrowLeft, User, MapPin } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import PlayerMembershipBadge from "./PlayerMembershipBadge"
import type { PlayerDetailsSheetProps } from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerDetailsSheet({
  player,
  open,
  onOpenChange,
  onBlockPlayer,
  onUpgradePlan,
}: PlayerDetailsSheetProps) {
  const { t } = useTranslation("dashboard")

  if (!player) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:w-[420px] bg-card border-white/10 p-0 overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1 hover:bg-white/5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-2xl font-bold text-primary">
                {player.name}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-1 mt-1 text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                {player.username}
              </SheetDescription>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5" />
                {player.location}
              </div>
            </div>
            <div className="w-20 h-20 rounded-xl bg-muted shrink-0 overflow-hidden">
              <img
                src={player.avatar}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </SheetHeader>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-2 bg-muted/30 rounded-xl p-4 mb-8">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">
                {player.bookings}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("playerManagement.details.booking")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary">#{player.rank}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("playerManagement.details.rank")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary">
                {player.points.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("playerManagement.details.points")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-primary">{player.teams}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("playerManagement.details.team")}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-primary mb-4">
            {t("playerManagement.details.playerInfo")}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.playerName")}
              </span>
              <span className="text-sm font-medium text-primary">
                {player.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.username")}
              </span>
              <span className="text-sm font-medium text-primary">
                {player.username}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.playerId")}
              </span>
              <span className="text-sm font-medium text-primary">
                {player.playerId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.playerOwner")}
              </span>
              <span className="text-sm font-medium text-primary">
                {player.ownerName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.plan")}
              </span>
              <PlayerMembershipBadge membership={player.membership} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.email")}
              </span>
              <span className="text-sm font-medium text-primary">
                {player.email}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.contactNumber")}
              </span>
              <span className="text-sm font-medium text-primary">
                {player.contactNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("playerManagement.details.member")}
              </span>
              <span className="text-sm font-medium text-primary">
                {player.memberSince}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={() => {
                onBlockPlayer(player)
                onOpenChange(false)
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              {t("playerManagement.actions.blockPlayer")}
            </button>
            <button
              onClick={() => {
                onUpgradePlan(player)
                onOpenChange(false)
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/20 transition-colors cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              {t("playerManagement.actions.upgradePlan")}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
