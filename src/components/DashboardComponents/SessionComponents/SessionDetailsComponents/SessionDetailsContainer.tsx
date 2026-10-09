"use client"

/**
 * SessionDetailsContainer.tsx
 * Main container component for the Session Details page.
 * Fully integrated with:
 * - GET /api/session/owner/sessions/{id}/
 * - SessionInfoSheet
 * - PlayerDetailsSheet
 * - SessionResultSummaryModal
 */

import React, { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useTranslation } from "react-i18next"
import SessionDetailsHeader from "./SessionDetailsHeader"
import SessionScoreboard from "./SessionScoreboard"
import SessionPlayerCard from "./SessionPlayerCard"
import SessionInfoSheet from "./SessionInfoSheet"
import PlayerDetailsSheet from "./PlayerDetailsSheet"
import SessionResultSummaryModal from "./SessionResultSummaryModal"
import SessionDetailsLoading from "./SessionDetailsLoading"
import type { SessionPlayerCardModel } from "./SessionPlayerCard"
import { useGetSessionDetailsQuery } from "@/redux/features/dashboard/session/sessionAPI"

function SessionDetailsContainer() {
  const { t } = useTranslation("dashboard")
  const params = useParams()
  const rawId = (params?.["session-id"] as string) || (params?.sessionId as string)
  const sessionId = rawId ? Number(rawId) : null

  // Local state for sheets & modals
  const [sessionInfoOpen, setSessionInfoOpen] = useState(false)
  const [playerDetailsOpen, setPlayerDetailsOpen] = useState(false)
  const [resultSummaryOpen, setResultSummaryOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null)

  // Fetch session details from API
  const {
    data: detailsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetSessionDetailsQuery(sessionId ?? 0, {
    skip: !sessionId || isNaN(sessionId),
  })

  const details = detailsResponse?.data
  const isCompleted =
    details?.status?.toLowerCase() === "completed" ||
    details?.status?.toLowerCase() === "complete"

  // Map team A players to card models
  const teamAPlayers: SessionPlayerCardModel[] = (details?.team_a_players || []).map(
    (player) => ({
      id: player.player_id,
      bookingId: player.booking_id,
      name: player.name,
      win: player.wins?.count ?? 0,
      loses: player.losses?.count ?? 0,
      played:
        (player.wins?.count ?? 0) +
        (player.losses?.count ?? 0) +
        (player.draws?.count ?? 0),
      rank: player.rank ?? 0,
      score: player.awarded_score ?? player.score ?? 0,
      image: player.image,
      team: "A" as const,
      checkedIn: Boolean(player.checked_in),
    })
  )

  // Map team B players to card models
  const teamBPlayers: SessionPlayerCardModel[] = (details?.team_b_players || []).map(
    (player) => ({
      id: player.player_id,
      bookingId: player.booking_id,
      name: player.name,
      win: player.wins?.count ?? 0,
      loses: player.losses?.count ?? 0,
      played:
        (player.wins?.count ?? 0) +
        (player.losses?.count ?? 0) +
        (player.draws?.count ?? 0),
      rank: player.rank ?? 0,
      score: player.awarded_score ?? player.score ?? 0,
      image: player.image,
      team: "B" as const,
      checkedIn: Boolean(player.checked_in),
    })
  )

  /** Handle viewing player details */
  const handleViewPlayerDetails = (player: SessionPlayerCardModel) => {
    setSelectedBookingId(player.bookingId)
    setPlayerDetailsOpen(true)
  }

  if (isLoading) {
    return <SessionDetailsLoading />
  }

  if (isError || !details) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/sessions">
            <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Session Details</h1>
        </div>
        <div className="p-12 text-center bg-card rounded-2xl border border-white/5 space-y-3">
          <p className="text-secondary text-sm">Failed to load session details or session not found.</p>
          <Link href="/dashboard/sessions">
            <button className="px-4 py-2 bg-custom-red text-white text-xs rounded-lg hover:bg-custom-red/80 cursor-pointer">
              Back to Sessions
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <SessionDetailsHeader
        onViewInfo={() => setSessionInfoOpen(true)}
        onViewResultSummary={() => setResultSummaryOpen(true)}
        isCompleted={isCompleted}
        sessionName={details.session_name}
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
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-primary">
              {details.team_a_name || "Team A"}
            </h3>
            <span className="text-xs text-secondary font-mono">
              {details.top_summary.team_full.team_a_display ||
                `${teamAPlayers.length} / ${details.team_a_player || 0}`}
            </span>
          </div>
          {teamAPlayers.map((player, index) => (
            <SessionPlayerCard
              key={`teamA-${player.bookingId || index}`}
              player={player}
              onViewDetails={handleViewPlayerDetails}
            />
          ))}
          {teamAPlayers.length === 0 ? (
            <div className="p-6 text-center text-sm text-secondary bg-card/40 rounded-xl border border-white/5">
              {t("sessions.details.noPlayersTeamA", "No players in Team A")}
            </div>
          ) : null}
        </div>

        {/* Right column - Team B */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-primary">
              {details.team_b_name || "Team B"}
            </h3>
            <span className="text-xs text-secondary font-mono">
              {details.top_summary.team_full.team_b_display ||
                `${teamBPlayers.length} / ${details.team_b_player || 0}`}
            </span>
          </div>
          {teamBPlayers.map((player, index) => (
            <SessionPlayerCard
              key={`teamB-${player.bookingId || index}`}
              player={player}
              onViewDetails={handleViewPlayerDetails}
            />
          ))}
          {teamBPlayers.length === 0 ? (
            <div className="p-6 text-center text-sm text-secondary bg-card/40 rounded-xl border border-white/5">
              {t("sessions.details.noPlayersTeamB", "No players in Team B")}
            </div>
          ) : null}
        </div>
      </div>

      {/* Sheets & Modals */}
      <SessionInfoSheet
        open={sessionInfoOpen}
        onOpenChange={setSessionInfoOpen}
        sessionId={sessionId}
        onMatchStatusChange={() => refetch()}
        onViewResultSummary={() => setResultSummaryOpen(true)}
        teamAPlayers={details?.team_a_players}
        teamBPlayers={details?.team_b_players}
      />

      <PlayerDetailsSheet
        key={selectedBookingId ?? "session-player-sheet"}
        open={playerDetailsOpen}
        onOpenChange={setPlayerDetailsOpen}
        sessionId={sessionId}
        bookingId={selectedBookingId}
        sessionType={details?.session_type}
        onSuccess={() => refetch()}
      />

      <SessionResultSummaryModal
        open={resultSummaryOpen}
        onOpenChange={setResultSummaryOpen}
        sessionId={sessionId}
      />
    </div>
  )
}

export default SessionDetailsContainer
