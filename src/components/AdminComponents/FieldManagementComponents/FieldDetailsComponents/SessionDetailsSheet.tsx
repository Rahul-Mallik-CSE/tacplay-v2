"use client"

import { useTranslation } from "react-i18next"
import { ArrowLeft, Clock, Calendar, MapPin, Users, Award, Shield, Loader2 } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import SessionStatusBadge from "./SessionStatusBadge"
import { useGetAdminSessionDetailQuery } from "@/redux/features/admin/fieldManagement/fieldManagementAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type {
  SessionDetailsSheetProps,
  AdminSessionPlayerItem,
} from "@/types/AdminTypes/FieldManagementTypes"

export default function SessionDetailsSheet({
  sessionId,
  open,
  onOpenChange,
}: SessionDetailsSheetProps) {
  const { t } = useTranslation("dashboard")

  const {
    data: detailResponse,
    isLoading,
    isFetching,
  } = useGetAdminSessionDetailQuery(sessionId!, {
    skip: !sessionId || !open,
  })

  const detail = detailResponse?.data
  const summary = detail?.session_summary
  const scoreboard = detail?.scoreboard
  const sessionInfo = detail?.session
  const teamAPlayers = detail?.team_a_players || []
  const teamBPlayers = detail?.team_b_players || []
  const stats = detail?.stats

  if (!open && !sessionId) return null

  const sessionName =
    summary?.session_name || sessionInfo?.session_name || t("fieldManagement.sessionDetails.title", "Session Detail")
  const sessionCode = summary?.session_id || scoreboard?.middle?.session_code || (sessionId ? `#CH ${sessionId}` : "")
  const fieldName = sessionInfo?.field_name || ""
  const location = sessionInfo?.field_location || ""
  const status = summary?.status_display || summary?.status || sessionInfo?.status_display || sessionInfo?.status || "open"

  const leftLogo = scoreboard?.left_team?.logo ? toAbsoluteMediaUrl(scoreboard.left_team.logo) : null
  const rightLogo = scoreboard?.right_team?.logo ? toAbsoluteMediaUrl(scoreboard.right_team.logo) : null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-xl bg-card border-white/10 p-0 overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onOpenChange(false)}
              className="cursor-pointer p-1.5 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-primary"
              aria-label="Close"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-lg md:text-xl font-bold text-primary truncate">
                {sessionName}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-2 mt-1 text-muted-foreground text-sm truncate">
                <span className="font-semibold text-custom-yellow">{sessionCode}</span>
                {fieldName && (
                  <>
                    <span>•</span>
                    <span className="truncate">{fieldName}</span>
                  </>
                )}
              </SheetDescription>
            </div>
            <SessionStatusBadge status={status} size="md" />
          </div>
        </SheetHeader>

        {isLoading && !detail ? (
          <div className="p-6 space-y-6 animate-pulse">
            {/* Scoreboard Skeleton */}
            <div className="rounded-2xl bg-gradient-to-br from-card via-muted/40 to-card border border-white/10 p-5 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 flex flex-col items-center text-center space-y-2">
                  <Skeleton className="w-14 h-14 rounded-full bg-white/10" />
                  <Skeleton className="h-4 w-20 bg-white/10" />
                  <Skeleton className="h-7 w-12 bg-white/10" />
                  <Skeleton className="h-3 w-16 bg-white/5" />
                </div>
                <div className="px-3 flex flex-col items-center text-center space-y-2">
                  <Skeleton className="h-5 w-10 bg-white/10 rounded" />
                  <Skeleton className="h-4 w-14 bg-white/10" />
                  <Skeleton className="h-3 w-10 bg-white/5" />
                </div>
                <div className="flex-1 flex flex-col items-center text-center space-y-2">
                  <Skeleton className="w-14 h-14 rounded-full bg-white/10" />
                  <Skeleton className="h-4 w-20 bg-white/10" />
                  <Skeleton className="h-7 w-12 bg-white/10" />
                  <Skeleton className="h-3 w-16 bg-white/5" />
                </div>
              </div>
            </div>

            {/* Field Info Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-36 bg-white/10" />
              <div className="space-y-3 bg-muted/30 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24 bg-white/5" />
                  <Skeleton className="h-4 w-36 bg-white/10" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24 bg-white/5" />
                  <Skeleton className="h-4 w-48 bg-white/10" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24 bg-white/5" />
                  <Skeleton className="h-4 w-20 bg-white/10" />
                </div>
              </div>
            </div>

            {/* Schedule & Capacity Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3.5 rounded-xl bg-muted/30 border border-white/5 space-y-2">
                  <Skeleton className="h-3 w-16 bg-white/5" />
                  <Skeleton className="h-4 w-24 bg-white/10" />
                </div>
              ))}
            </div>

            {/* Team Rosters Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-32 bg-white/10" />
              {[1, 2].map((i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/30 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-9 h-9 rounded-full bg-white/10" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24 bg-white/10" />
                      <Skeleton className="h-3 w-32 bg-white/5" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-16 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {isFetching && (
              <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Updating session...</span>
              </div>
            )}

            {/* Scoreboard Widget */}
            {scoreboard && (
              <div className="rounded-2xl bg-gradient-to-br from-card via-muted/40 to-card border border-white/10 p-5 shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  {/* Left Team */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-muted/60 border border-white/10 overflow-hidden relative flex items-center justify-center mb-2">
                      {leftLogo ? (
                        <Image
                          src={leftLogo}
                          alt={scoreboard.left_team.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <Shield className="w-6 h-6 text-custom-yellow" />
                      )}
                    </div>
                    <p className="text-sm font-bold text-primary truncate max-w-[120px]">
                      {scoreboard.left_team.name || "Team A"}
                    </p>
                    <span className="text-2xl font-black text-emerald-400 mt-1">
                      {scoreboard.left_team.score ?? 0}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {scoreboard.left_team.player_count} / {scoreboard.left_team.player_limit} Players
                    </span>
                  </div>

                  {/* Middle Match Details */}
                  <div className="px-3 flex flex-col items-center text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      VS
                    </span>
                    <div className="flex items-center gap-1 text-custom-yellow font-bold text-sm mt-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{scoreboard.middle?.match_clock_text || summary?.match_clock_text || "13:00"}</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 font-mono">
                      {scoreboard.middle?.team_full_text || summary?.team_full_text}
                    </span>
                  </div>

                  {/* Right Team */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-muted/60 border border-white/10 overflow-hidden relative flex items-center justify-center mb-2">
                      {rightLogo ? (
                        <Image
                          src={rightLogo}
                          alt={scoreboard.right_team.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <Shield className="w-6 h-6 text-red-400" />
                      )}
                    </div>
                    <p className="text-sm font-bold text-primary truncate max-w-[120px]">
                      {scoreboard.right_team.name || "Team B"}
                    </p>
                    <span className="text-2xl font-black text-primary mt-1">
                      {scoreboard.right_team.score ?? 0}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {scoreboard.right_team.player_count} / {scoreboard.right_team.player_limit} Players
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Field & Venue Info */}
            <div>
              <h3 className="text-base font-bold text-primary mb-3">
                {t("fieldManagement.sessionDetails.fieldInfo", "Field & Venue Info")}
              </h3>
              <div className="space-y-3 bg-muted/30 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("fieldManagement.sessionDetails.fieldName", "Field Name")}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {fieldName || "Tacplay Arena"}
                  </span>
                </div>
                {location && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-muted-foreground shrink-0">
                      {t("fieldManagement.sessionDetails.location", "Location")}
                    </span>
                    <span className="text-sm font-medium text-primary text-right flex items-center gap-1 justify-end">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                      <span>{location}</span>
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("fieldManagement.sessionDetails.entryFee", "Entry Fee")}
                  </span>
                  <span className="text-sm font-semibold text-emerald-400">
                    {sessionInfo?.entry_fee_with_currency || "€0.00"}
                  </span>
                </div>
              </div>
            </div>

            {/* Session Schedule & Capacity */}
            <div>
              <h3 className="text-base font-bold text-primary mb-3">
                {t("fieldManagement.sessionDetails.scheduleInfo", "Schedule & Capacity")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-muted/30 border border-white/5">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Match Date</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {summary?.match_date || "N/A"}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-muted/30 border border-white/5">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Time</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {summary?.start_time && summary?.end_time
                      ? `${summary.start_time} - ${summary.end_time}`
                      : "N/A"}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-muted/30 border border-white/5 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Capacity</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {stats?.team_full_text || `${stats?.total_bookings ?? 0} / ${stats?.total_capacity ?? 0}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Team A Players */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-primary flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>{sessionInfo?.team_a_name || "Team A"} Players</span>
                </h3>
                <span className="text-xs text-muted-foreground">
                  {teamAPlayers.length} registered
                </span>
              </div>
              {teamAPlayers.length === 0 ? (
                <div className="p-4 rounded-xl bg-muted/20 border border-white/5 text-center text-xs text-muted-foreground">
                  No players registered for this team.
                </div>
              ) : (
                <div className="space-y-2">
                  {teamAPlayers.map((player: AdminSessionPlayerItem) => {
                    const avatar = player.player_avatar ? toAbsoluteMediaUrl(player.player_avatar) : null
                    return (
                      <div
                        key={player.booking_id}
                        className="p-3 rounded-xl bg-muted/30 border border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-muted overflow-hidden relative border border-white/10 flex items-center justify-center">
                            {avatar ? (
                              <Image
                                src={avatar}
                                alt={player.player_name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <span className="text-xs font-bold text-muted-foreground">
                                {player.player_name.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary">
                              {player.player_name}
                            </p>
                            {player.card_stats && (
                              <p className="text-[11px] text-muted-foreground">
                                W: {player.card_stats.win} • L: {player.card_stats.loss} • Rank #{player.card_stats.rank}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            +{player.awarded_score} pts
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Team B Players */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-primary flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span>{sessionInfo?.team_b_name || "Team B"} Players</span>
                </h3>
                <span className="text-xs text-muted-foreground">
                  {teamBPlayers.length} registered
                </span>
              </div>
              {teamBPlayers.length === 0 ? (
                <div className="p-4 rounded-xl bg-muted/20 border border-white/5 text-center text-xs text-muted-foreground">
                  No players registered for Team B.
                </div>
              ) : (
                <div className="space-y-2">
                  {teamBPlayers.map((player: AdminSessionPlayerItem) => {
                    const avatar = player.player_avatar ? toAbsoluteMediaUrl(player.player_avatar) : null
                    return (
                      <div
                        key={player.booking_id}
                        className="p-3 rounded-xl bg-muted/30 border border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-muted overflow-hidden relative border border-white/10 flex items-center justify-center">
                            {avatar ? (
                              <Image
                                src={avatar}
                                alt={player.player_name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <span className="text-xs font-bold text-muted-foreground">
                                {player.player_name.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary">
                              {player.player_name}
                            </p>
                            {player.card_stats && (
                              <p className="text-[11px] text-muted-foreground">
                                W: {player.card_stats.win} • L: {player.card_stats.loss} • Rank #{player.card_stats.rank}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-primary bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            +{player.awarded_score} pts
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
