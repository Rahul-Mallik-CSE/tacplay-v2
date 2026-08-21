"use client"

/**
 * SessionDetailsContainer.tsx
 * Main container component for the Session Details page.
 * Manages dialog state, displays scoreboard and player cards.
 * Uses mock data for demonstration without API integration.
 */

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import SessionDetailsHeader from "./SessionDetailsHeader"
import SessionScoreboard from "./SessionScoreboard"
import SessionPlayerCard from "./SessionPlayerCard"
import SessionInfoSheet from "./SessionInfoSheet"
import PlayerDetailsSheet from "./PlayerDetailsSheet"
import type { SessionPlayerCardModel } from "./SessionPlayerCard"
import { mockSessionDetails } from "@/mock-data/DashboardMockData/sessions-mock-data"

function SessionDetailsContainer() {
  const { t } = useTranslation("dashboard")

  // Local state for sheets
  const [sessionInfoOpen, setSessionInfoOpen] = useState(false)
  const [playerDetailsOpen, setPlayerDetailsOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

  // Use mock data for demonstration (no API integration)
  const details = mockSessionDetails

  // Map team players to card models
  const teamAPlayers: SessionPlayerCardModel[] = details.team_a_players.map(
    (player) => ({
      id: player.player_id,
      bookingId: player.booking_id,
      name: player.name,
      win: player.wins.count,
      loses: player.losses.count,
      played: player.wins.count + player.losses.count + player.draws.count,
      rank: player.rank,
      score: player.awarded_score,
      image: player.image,
      team: "A" as const,
    }),
  )

  const teamBPlayers: SessionPlayerCardModel[] = details.team_b_players.map(
    (player) => ({
      id: player.player_id,
      bookingId: player.booking_id,
      name: player.name,
      win: player.wins.count,
      loses: player.losses.count,
      played: player.wins.count + player.losses.count + player.draws.count,
      rank: player.rank,
      score: player.awarded_score,
      image: player.image,
      team: "B" as const,
    }),
  )

  /** Handle viewing player details */
  const handleViewPlayerDetails = (player: SessionPlayerCardModel) => {
    setSelectedBookingId(player.bookingId)
    setPlayerDetailsOpen(true)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <SessionDetailsHeader
        onViewInfo={() => setSessionInfoOpen(true)}
      />

      {/* Scoreboard */}
      <SessionScoreboard
        sessionName={details.session_name}
        time={details.time}
        teamA={details.top_summary.team_a}
        teamB={details.top_summary.team_b}
        capacity={details.top_summary.team_full}
      />

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left column - Team A */}
        <div className="space-y-4">
          {teamAPlayers.map((player, index) => (
            <SessionPlayerCard
              key={`teamA-${index}`}
              player={player}
              onViewDetails={handleViewPlayerDetails}
            />
          ))}
          {teamAPlayers.length === 0 ? (
            <div className="text-sm text-secondary">
              {t("sessions.details.noPlayersTeamA")}
            </div>
          ) : null}
        </div>

        {/* Right column - Team B */}
        <div className="space-y-4">
          {teamBPlayers.map((player, index) => (
            <SessionPlayerCard
              key={`teamB-${index}`}
              player={player}
              onViewDetails={handleViewPlayerDetails}
            />
          ))}
          {teamBPlayers.length === 0 ? (
            <div className="text-sm text-secondary">
              {t("sessions.details.noPlayersTeamB")}
            </div>
          ) : null}
        </div>
      </div>

      {/* Sheets */}
      <SessionInfoSheet
        open={sessionInfoOpen}
        onOpenChange={setSessionInfoOpen}
        sessionId={1}
      />
      <PlayerDetailsSheet
        key={selectedBookingId ?? "session-player-sheet"}
        open={playerDetailsOpen}
        onOpenChange={setPlayerDetailsOpen}
        sessionId={1}
        bookingId={selectedBookingId}
      />
    </div>
  )
}

export default SessionDetailsContainer
