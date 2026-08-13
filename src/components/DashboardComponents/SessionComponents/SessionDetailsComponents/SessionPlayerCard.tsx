"use client"

/**
 * SessionPlayerCard.tsx
 * Player card component displaying individual player stats.
 * Shows player image, name, stats (win/lose/played/rank/score),
 * and a "View Details" button. Team A gets red theme, Team B gets gold theme.
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

  return (
    <div
      className={`bg-gradient-to-br ${teamGradient} border ${teamBorder} rounded-xl p-4 ${teamGlow}`}
    >
      <div className="flex items-center gap-4">
        {/* Player Image */}
        <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
          {player.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-custom-red/30 to-custom-yellow/30 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {player.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-primary truncate">
            {player.name}
          </h4>
          <button
            onClick={() => onViewDetails(player)}
            className="cursor-pointer text-xs text-custom-yellow hover:text-custom-yellow/80 transition-colors"
          >
            {t("sessions.details.viewInfo")}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-2 mt-4">
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

        {/* Played */}
        <div className="bg-secondary/10 rounded-lg p-2 text-center">
          <p className="text-xs font-medium text-secondary">
            {t("sessions.details.score")}
          </p>
          <p className="text-sm font-bold text-primary">{player.played}</p>
        </div>

        {/* Rank */}
        <div className="bg-secondary/10 rounded-lg p-2 text-center">
          <p className="text-xs font-medium text-secondary">
            {t("sessions.details.champion")}
          </p>
          <p className="text-sm font-bold text-primary">#{player.rank}</p>
        </div>

        {/* Score */}
        <div className={`${statBg} rounded-lg p-2 text-center`}>
          <p className={`text-xs font-medium ${statText}`}>
            {t("sessions.details.score")}
          </p>
          <p className="text-sm font-bold text-primary">{player.score}</p>
        </div>
      </div>
    </div>
  )
}

export default SessionPlayerCard
