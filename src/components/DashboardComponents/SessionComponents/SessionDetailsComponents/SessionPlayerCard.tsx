"use client"

/**
 * SessionPlayerCard.tsx
 * Player card component displaying individual player stats.
 * Shows player image with premium badge, name, stats (win/lose/played/rank/score),
 * and a "View Player Info" button. Team A gets red theme, Team B gets gold theme.
 * Uses Next Image with toAbsoluteMediaUrl.
 */

import React from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { toAbsoluteMediaUrl } from "@/lib/utils"

/** Player card model interface */
export interface SessionPlayerCardModel {
  id: number
  bookingId: number
  name: string
  win: number
  loses: number
  played: number
  rank: number
  score: number
  image: string | null
  team: "A" | "B"
  checkedIn?: boolean
}

/** Props for SessionPlayerCard component */
interface SessionPlayerCardProps {
  player: SessionPlayerCardModel
  onViewDetails: (player: SessionPlayerCardModel) => void
}

function SessionPlayerCard({ player, onViewDetails }: SessionPlayerCardProps) {
  const { t } = useTranslation("dashboard")

  // Team-based theming
  const isTeamA = player.team === "A"
  const teamGradient = isTeamA
    ? "from-custom-red/20 to-custom-red/5"
    : "from-custom-yellow/20 to-custom-yellow/5"
  const teamBorder = isTeamA ? "border-custom-red/20" : "border-custom-yellow/20"
  const teamGlow = isTeamA
    ? "shadow-[0_0_15px_rgba(152,0,9,0.15)]"
    : "shadow-[0_0_15px_rgba(205,186,32,0.15)]"
  const statBg = isTeamA ? "bg-custom-red/10" : "bg-custom-yellow/10"
  const statText = isTeamA ? "text-custom-red" : "text-custom-yellow"
  const viewDetailsBg = isTeamA
    ? "bg-custom-red hover:bg-custom-red/80"
    : "bg-custom-yellow hover:bg-custom-yellow/80 text-black font-medium"

  const playerImageUrl = toAbsoluteMediaUrl(player.image) ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random`

  return (
    <div
      className={`bg-gradient-to-br ${teamGradient} border ${teamBorder} rounded-xl p-4 ${teamGlow}`}
    >
      <div className="flex items-start gap-4">
        {/* Player Image with Premium Badge */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden relative border border-white/10 bg-muted">
            <Image
              src={playerImageUrl}
              alt={player.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          {/* Premium Badge */}
          <div className="absolute -top-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-white/20 bg-black">
            <Image
              src="/Tacplay-logo.png"
              alt="Premium"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <h4 className="text-sm font-semibold text-primary truncate">
                {player.name}
              </h4>
              <span
                className={`px-2 py-0.5 text-[10px] rounded-full font-medium shrink-0 border ${
                  player.checkedIn
                    ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
                    : "bg-custom-yellow/15 text-yellow-400 border-custom-yellow/25"
                }`}
              >
                {player.checkedIn ? "Checked-In" : "Check-In Pending"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onViewDetails(player)}
              className={`cursor-pointer text-xs px-3 py-1.5 rounded-md ${viewDetailsBg} transition-colors shrink-0 ml-2`}
            >
              {t("sessions.details.viewPlayerInfo", "View Player Info")}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {/* Win */}
            <div className={`${statBg} rounded-lg p-2 text-center`}>
              <p className={`text-xs font-medium ${statText}`}>
                {t("sessions.details.win", "Win")}
              </p>
              <p className="text-sm font-bold text-primary">{player.win}</p>
            </div>

            {/* Loses */}
            <div className="bg-secondary/10 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-secondary">
                {t("sessions.details.loss", "Loss")}
              </p>
              <p className="text-sm font-bold text-primary">{player.loses}</p>
            </div>

            {/* Played or Rank */}
            <div className="bg-secondary/10 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-secondary">
                {isTeamA ? t("sessions.details.played", "Played") : t("sessions.details.rank", "Rank")}
              </p>
              <p className="text-sm font-bold text-primary">
                {isTeamA ? player.played : player.rank}
              </p>
            </div>

            {/* Score */}
            <div className={`${statBg} rounded-lg p-2 text-center`}>
              <p className={`text-xs font-medium ${statText}`}>
                {t("sessions.details.score", "Score")}
              </p>
              <p
                className={`text-sm font-bold ${
                  player.score > 0
                    ? "text-emerald-400"
                    : player.score < 0
                    ? "text-custom-red"
                    : "text-primary"
                }`}
              >
                {player.score > 0 ? `+${player.score}` : player.score === 0 ? "00" : player.score}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionPlayerCard
