"use client"

/**
 * SessionPlayerCard.tsx
 * Player card component displaying individual player stats.
 * Shows player image with premium badge, name, stats (win/lose/played/rank/score),
 * and a "View Details" button. Team A gets red theme, Team B gets gold theme.
 * Uses Unsplash for player images and premium logo from public folder.
 */

import React from "react"
import { useTranslation } from "react-i18next"

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
  const viewDetailsBg = isTeamA ? "bg-custom-red hover:bg-custom-red/80" : "bg-custom-yellow hover:bg-custom-yellow/80"

  return (
    <div
      className={`bg-gradient-to-br ${teamGradient} border ${teamBorder} rounded-xl p-4 ${teamGlow}`}
    >
      <div className="flex items-start gap-4">
        {/* Player Image with Premium Badge */}
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={player.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random`}
            alt={player.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
          />
          {/* Premium Badge */}
          <div className="absolute -top-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Tacplay-logo.png"
              alt="Premium"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-primary truncate">
              {player.name}
            </h4>
            <button
              onClick={() => onViewDetails(player)}
              className={`cursor-pointer text-xs px-3 py-1 rounded-md ${viewDetailsBg} text-white transition-colors shrink-0 ml-2`}
            >
              {t("sessions.details.viewInfo")}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {/* Win */}
            <div className={`${statBg} rounded-lg p-2 text-center`}>
              <p className={`text-xs font-medium ${statText}`}>
                {t("sessions.details.win")}
              </p>
              <p className="text-sm font-bold text-primary">{player.win}</p>
            </div>

            {/* Loses */}
            <div className="bg-secondary/10 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-secondary">
                {t("sessions.details.loss")}
              </p>
              <p className="text-sm font-bold text-primary">{player.loses}</p>
            </div>

            {/* Played or Rank */}
            <div className="bg-secondary/10 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-secondary">
                {isTeamA ? t("sessions.details.played") : t("sessions.details.rank")}
              </p>
              <p className="text-sm font-bold text-primary">
                {isTeamA ? player.played : player.rank}
              </p>
            </div>

            {/* Score */}
            <div className={`${statBg} rounded-lg p-2 text-center`}>
              <p className={`text-xs font-medium ${statText}`}>
                {t("sessions.details.score")}
              </p>
              <p className={`text-sm font-bold ${player.score > 0 ? "text-emerald-400" : player.score < 0 ? "text-custom-red" : "text-primary"}`}>
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
