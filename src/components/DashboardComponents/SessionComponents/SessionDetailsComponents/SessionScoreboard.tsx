"use client"

/**
 * SessionScoreboard.tsx
 * Scoreboard component displaying team logos, names, scores, and capacity.
 * Features a skewed red box for session info/timer and diagonal red lines
 * separating scoreboard sections, matching the Image 5 design.
 */

import React from "react"
import { useTranslation } from "react-i18next"

/** Props for team data */
interface TeamData {
  name: string
  logo: string | null
  score: number
}

/** Props for team capacity data */
interface TeamCapacity {
  team_a_capacity: number
  team_b_capacity: number
}

/** Props for SessionScoreboard component */
interface SessionScoreboardProps {
  sessionName: string
  time: string
  teamA: TeamData
  teamB: TeamData
  capacity: TeamCapacity
}

function SessionScoreboard({
  sessionName,
  time,
  teamA,
  teamB,
  capacity,
}: SessionScoreboardProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="rounded-xl relative overflow-hidden">
      <div className="bg-card rounded-xl relative overflow-hidden">
        {/* Match ID + Timer — skewed red box */}
        <div className="flex items-center justify-center">
          <div
            className="bg-custom-red px-8 py-2"
            style={{
              transform: "skewX(-20deg)",
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
              boxShadow: "0 4px 12px rgba(152, 0, 9, 0.5)",
            }}
          >
            <div
              className="flex items-center gap-3"
              style={{ transform: "skewX(20deg)" }}
            >
              <span className="text-white text-xs font-semibold">
                {sessionName}
              </span>
              <div className="w-px h-3 bg-white/30" />
              <div className="flex items-center gap-2">
                <span className="text-white text-xs sm:text-sm font-medium tabular-nums">
                  {time}
                </span>
                {/* Progress bar */}
                <div className="w-16 h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scoreboard */}
        <div className="relative border-4 border-border/20 rounded-4xl shadow-4xl shadow-amber-700 mt-2">
          <div className="grid grid-cols-5 items-center px-3 py-5 sm:px-6 sm:py-8 relative">
            {/* Diagonal Red Lines */}
            <div className="absolute right-[80%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20" />
            <div className="absolute right-[60%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20" />
            <div className="absolute right-[40%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20" />
            <div className="absolute right-[20%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-20" />

            {/* Team A Logo + Name */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden relative shrink-0">
                {teamA.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={teamA.logo}
                    alt={teamA.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="max-w-4 sm:max-w-6 md:max-w-none">
                <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                  {teamA.name}
                </p>
              </div>
            </div>

            {/* Team A Score */}
            <div className="text-center">
              <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                {teamA.score}
              </p>
              <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                {t("sessions.details.score")}
              </p>
            </div>

            {/* Center - Team Full */}
            <div className="text-center">
              <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                {`${capacity.team_a_capacity} / ${capacity.team_b_capacity}`}
              </p>
              <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                {t("sessions.details.teamFull")}
              </p>
            </div>

            {/* Team B Score */}
            <div className="text-center">
              <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                {teamB.score}
              </p>
              <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                {t("sessions.details.score")}
              </p>
            </div>

            {/* Team B Logo + Name */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden relative shrink-0">
                {teamB.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={teamB.logo}
                    alt={teamB.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="max-w-4 sm:max-w-6 md:max-w-none">
                <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                  {teamB.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionScoreboard
