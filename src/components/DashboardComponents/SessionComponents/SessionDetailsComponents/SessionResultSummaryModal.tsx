"use client"

import React from "react"
import Image from "next/image"
import { Trophy, Calendar, MapPin, Clock, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGetResultSummaryQuery } from "@/redux/features/dashboard/session/sessionAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type { SessionResultSummaryModalProps } from "@/types/DashboardTypes/SessionTypes"

function SessionResultSummaryModal({
  open,
  onOpenChange,
  sessionId,
}: SessionResultSummaryModalProps) {
  const { data: response, isLoading, isError } = useGetResultSummaryQuery(
    sessionId ?? 0,
    { skip: !sessionId || !open },
  )

  const summary = response?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-white/10 text-primary p-0 overflow-hidden">
        <DialogHeader className="p-5 pb-3 border-b border-white/5 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <Trophy className="w-5 h-5 text-custom-yellow" />
            Match Result Summary
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 rounded-md hover:bg-white/10 text-secondary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {isLoading ? (
          <div className="p-10 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-custom-red border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-secondary">Loading result summary...</p>
          </div>
        ) : isError || !summary ? (
          <div className="p-8 text-center text-sm text-secondary">
            Failed to load result summary.
          </div>
        ) : (
          <div className="p-5 space-y-6">
            {/* Session Info Bar */}
            <div className="bg-muted/40 rounded-xl p-3.5 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary text-sm">
                  {summary.session_name}
                </span>
                <span className="text-secondary font-mono">{summary.session_id}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-secondary">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-custom-red" />
                  {summary.match_date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-custom-yellow" />
                  {summary.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {summary.field_name}
                </span>
              </div>
            </div>

            {/* Champion Banner if present */}
            {summary.champion && (
              <div className="bg-custom-yellow/15 border border-custom-yellow/30 rounded-xl p-3 text-center">
                <p className="text-xs text-custom-yellow uppercase tracking-wider font-semibold">
                  Champion
                </p>
                <p className="text-base font-bold text-white mt-0.5">{summary.champion}</p>
              </div>
            )}

            {/* Teams Comparison */}
            <div className="grid grid-cols-2 gap-3">
              {/* Team A */}
              <div
                className={`rounded-2xl p-4 border text-center flex flex-col items-center justify-between ${
                  summary.team_a?.result === "win"
                    ? "bg-custom-yellow/10 border-custom-yellow/30 shadow-[0_0_15px_rgba(205,186,32,0.15)]"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-black/40 mb-2">
                  {summary.team_a?.logo ? (
                    <Image
                      src={toAbsoluteMediaUrl(summary.team_a.logo) || summary.team_a.logo}
                      alt={summary.team_a.name || "Team A"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-secondary text-sm">
                      A
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-sm text-primary mb-1">
                  {summary.team_a?.name || "Team A"}
                </h4>
                <div className="my-2">
                  <span className="text-3xl font-black text-primary">
                    {summary.team_a?.score ?? 0}
                  </span>
                  <p className="text-[10px] text-secondary">Score</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    summary.team_a?.result === "win"
                      ? "bg-custom-yellow text-black"
                      : summary.team_a?.result === "draw"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-custom-red/20 text-custom-red border border-custom-red/30"
                  }`}
                >
                  {summary.team_a?.result_display || summary.team_a?.result || "N/A"}
                </span>
              </div>

              {/* Team B */}
              <div
                className={`rounded-2xl p-4 border text-center flex flex-col items-center justify-between ${
                  summary.team_b?.result === "win"
                    ? "bg-custom-yellow/10 border-custom-yellow/30 shadow-[0_0_15px_rgba(205,186,32,0.15)]"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-black/40 mb-2">
                  {summary.team_b?.logo ? (
                    <Image
                      src={toAbsoluteMediaUrl(summary.team_b.logo) || summary.team_b.logo}
                      alt={summary.team_b.name || "Team B"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-secondary text-sm">
                      B
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-sm text-primary mb-1">
                  {summary.team_b?.name || "Team B"}
                </h4>
                <div className="my-2">
                  <span className="text-3xl font-black text-primary">
                    {summary.team_b?.score ?? 0}
                  </span>
                  <p className="text-[10px] text-secondary">Score</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    summary.team_b?.result === "win"
                      ? "bg-custom-yellow text-black"
                      : summary.team_b?.result === "draw"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-custom-red/20 text-custom-red border border-custom-red/30"
                  }`}
                >
                  {summary.team_b?.result_display || summary.team_b?.result || "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SessionResultSummaryModal
