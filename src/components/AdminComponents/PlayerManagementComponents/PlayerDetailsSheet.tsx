"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import {
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Trophy,
  Users,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Loader2,
  Clock,
  Mail,
  Phone,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import PlayerMembershipBadge from "./PlayerMembershipBadge"
import PlayerStatusBadge from "./PlayerStatusBadge"
import { useGetAdminPlayerDetailQuery } from "@/redux/features/admin/playerManagement/playerManagementAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type {
  PlayerDetailsSheetProps,
  AdminPlayerListItem,
} from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerDetailsSheet({
  playerId,
  player,
  open,
  onOpenChange,
  onToggleStatus,
  onBlockPlayer,
  onUpgradePlan,
}: PlayerDetailsSheetProps) {
  const { t } = useTranslation("dashboard")

  // Resolve ID from playerId prop or player object
  const resolvedId =
    playerId ||
    (player && "user_id" in player ? player.user_id : null) ||
    (player && "id" in player ? player.id : null)

  const {
    data: detailResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetAdminPlayerDetailQuery(resolvedId as number, {
    skip: !open || !resolvedId,
  })

  const detailData = detailResponse?.data

  // Fallback to player object if available
  const playerName =
    detailData?.user?.full_name ||
    detailData?.player_info?.player_name ||
    (player && "full_name" in player ? player.full_name : "") ||
    (player && "name" in player ? player.name : "Player Details")

  const username =
    detailData?.user?.username_display ||
    detailData?.player_info?.username_display ||
    (detailData?.user?.username ? `@${detailData.user.username}` : "") ||
    (player && "username" in player ? player.username : "")

  const location =
    detailData?.user?.location ||
    detailData?.player_info?.location ||
    detailData?.user?.country ||
    (player && "country" in player ? player.country : "") ||
    (player && "location" in player ? player.location : "")

  const rawImage =
    detailData?.profile_summary?.profile_image ||
    detailData?.user?.profile_image ||
    (player && "profile_image" in player ? player.profile_image : null) ||
    (player && "avatar" in player ? player.avatar : null)
  const avatarUrl = toAbsoluteMediaUrl(rawImage)

  const status =
    detailData?.user?.status ||
    detailData?.player_info?.status ||
    (player && "status" in player ? player.status : "active")
  const isCurrentlyActive = (status || "").toLowerCase() === "active"

  const handleToggle = () => {
    if (player) {
      if (onToggleStatus) {
        onToggleStatus(player)
      } else if (onBlockPlayer) {
        onBlockPlayer(player)
      }
    }
  }

  const handleUpgrade = () => {
    if (player && onUpgradePlan) {
      onUpgradePlan(player)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-white/10 p-0 overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1.5 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <PlayerStatusBadge status={status} size="sm" />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-2xl font-bold text-primary truncate">
                {playerName}
              </SheetTitle>
              {username && (
                <SheetDescription className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm truncate">
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{username}</span>
                </SheetDescription>
              )}
              {location && (
                <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-xs truncate">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              )}
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted shrink-0 overflow-hidden border border-white/10">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={playerName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-primary text-xl font-bold">
                  {playerName.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-xl bg-white/5" />
                ))}
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-32 bg-white/10 rounded" />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-full bg-white/5 rounded" />
                ))}
              </div>
            </div>
          ) : isError ? (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              Failed to load player details. Please try again.
            </div>
          ) : (
            <>
              {/* Stats Metrics Grid */}
              {detailData?.stats && (
                <div className="grid grid-cols-4 gap-2 bg-muted/40 rounded-xl p-3 border border-white/5">
                  <div className="text-center p-1">
                    <p className="text-lg sm:text-xl font-bold text-primary">
                      {detailData.stats.booking?.value ?? 0}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                      {t("playerManagement.details.booking", "Bookings")}
                    </p>
                  </div>
                  <div className="text-center p-1 border-l border-white/5">
                    <p className="text-lg sm:text-xl font-bold text-primary">
                      {detailData.stats.rank?.display || `#${detailData.stats.rank?.value ?? 0}`}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                      {t("playerManagement.details.rank", "Rank")}
                    </p>
                  </div>
                  <div className="text-center p-1 border-l border-white/5">
                    <p className="text-lg sm:text-xl font-bold text-primary">
                      {detailData.stats.points?.value?.toLocaleString() ?? 0}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                      {t("playerManagement.details.points", "Points")}
                    </p>
                  </div>
                  <div className="text-center p-1 border-l border-white/5">
                    <p className="text-lg sm:text-xl font-bold text-primary">
                      {detailData.stats.team?.value ?? 0}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                      {t("playerManagement.details.team", "Team")}
                    </p>
                  </div>
                </div>
              )}

              {/* Player Information Section */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-primary">
                  {t("playerManagement.details.playerInfo", "Player Information")}
                </h3>

                <div className="rounded-xl border border-white/5 bg-card/60 p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      {t("playerManagement.details.playerName", "Player Name")}
                    </span>
                    <span className="font-medium text-primary">
                      {detailData?.player_info?.player_name || playerName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="text-xs font-mono">ID</span>
                      {t("playerManagement.details.playerId", "Player ID")}
                    </span>
                    <span className="font-mono text-primary font-medium">
                      {detailData?.player_info?.player_id || detailData?.user?.display_id || "-"}
                    </span>
                  </div>

                  {detailData?.player_info?.player_owner?.name && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        {t("playerManagement.details.playerOwner", "Field Owner")}
                      </span>
                      <span className="font-medium text-primary">
                        {detailData.player_info.player_owner.name}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5" />
                      {t("playerManagement.details.plan", "Plan")}
                    </span>
                    <PlayerMembershipBadge
                      membership={
                        detailData?.player_info?.plan?.display ||
                        detailData?.player_info?.plan?.plan_name ||
                        detailData?.stats?.subscription_plan ||
                        "Free"
                      }
                      size="sm"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      {t("playerManagement.details.email", "Email")}
                    </span>
                    <span className="font-medium text-primary text-xs sm:text-sm truncate max-w-[200px]">
                      {detailData?.player_info?.email || detailData?.user?.email || "-"}
                    </span>
                  </div>

                  {detailData?.player_info?.contact_number && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" />
                        {t("playerManagement.details.contactNumber", "Contact Number")}
                      </span>
                      <span className="font-medium text-primary">
                        {detailData.player_info.contact_number}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {t("playerManagement.details.member", "Member Since")}
                    </span>
                    <span className="font-medium text-primary">
                      {detailData?.player_info?.member || detailData?.user?.member_since || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Match History Section */}
              {detailData?.match_history && detailData.match_history.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-primary">
                      {t("playerManagement.details.matchHistory", "Recent Match History")}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {detailData.match_history.length} matches
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {detailData.match_history.map((match) => (
                      <div
                        key={match.booking_id}
                        className="rounded-xl border border-white/5 bg-card/60 p-3.5 space-y-2 hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-primary">
                            {match.session_name || match.field_name}
                          </span>
                          <span className="text-xs font-mono font-medium text-muted-foreground">
                            {match.display_booking_id}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {match.session_date}
                          </span>
                          <span className="text-primary font-medium">
                            ${match.payment_amount}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase bg-white/5 text-muted-foreground">
                            {match.match_type}
                          </span>
                          {match.team && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400">
                              Team {match.team}
                            </span>
                          )}
                          <span className="ml-auto text-[11px] font-medium capitalize text-emerald-400">
                            {match.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${isCurrentlyActive
                    ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                    : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                    }`}
                >
                  {isCurrentlyActive ? (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      {t("playerManagement.actions.blockPlayer", "Block Player")}
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      {t("playerManagement.actions.activatePlayer", "Activate Player")}
                    </>
                  )}
                </button>

                {detailData?.actions?.upgrade_plan?.available !== false && (
                  <button
                    type="button"
                    onClick={handleUpgrade}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg text-sm font-semibold hover:bg-yellow-500/20 transition-colors cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    {t("playerManagement.actions.upgradePlan", "Upgrade Plan")}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
