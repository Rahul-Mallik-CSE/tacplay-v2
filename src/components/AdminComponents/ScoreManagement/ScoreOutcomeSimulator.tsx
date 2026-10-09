/**
 * ScoreOutcomeSimulator.tsx
 * Real-time point calculation preview and scenario simulator based on current score rules.
 */

import React from "react"
import { Trophy, Scale, ShieldAlert, Sparkles, TrendingUp } from "lucide-react"

export interface ScoreOutcomeSimulatorProps {
  winScore: number
  drawScore: number
  lossScore: number
}

export default function ScoreOutcomeSimulator({
  winScore,
  drawScore,
  lossScore,
}: ScoreOutcomeSimulatorProps) {
  // Sample hypothetical record: 3 Wins, 1 Draw, 1 Loss
  const sampleWins = 3
  const sampleDraws = 1
  const sampleLosses = 1

  const winTotal = sampleWins * winScore
  const drawTotal = sampleDraws * drawScore
  const lossTotal = sampleLosses * lossScore
  const netTotal = winTotal + drawTotal + lossTotal

  return (
    <div className="rounded-2xl bg-card border border-white/5 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-custom-yellow/10 border border-custom-yellow/20 flex items-center justify-center text-custom-yellow">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-primary">
              Live Simulation & Ranking Impact
            </h4>
            <p className="text-xs text-muted-foreground">
              Preview how points accumulate under these rules for a sample player session
            </p>
          </div>
        </div>

        {/* Total Points Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/40 border border-white/10 self-start sm:self-auto">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-secondary">Sample 5-Match Net:</span>
          <span
            className={`font-mono text-sm font-black ${
              netTotal >= 0 ? "text-emerald-400" : "text-custom-red"
            }`}
          >
            {netTotal >= 0 ? `+${netTotal}` : netTotal} pts
          </span>
        </div>
      </div>

      {/* Scenario Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Win Scenario */}
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">1 Match Win</p>
              <p className="text-[11px] text-muted-foreground">Victory outcome</p>
            </div>
          </div>
          <span className="text-base font-mono font-black text-emerald-400">
            {winScore > 0 ? `+${winScore}` : winScore} pts
          </span>
        </div>

        {/* Draw Scenario */}
        <div className="p-4 rounded-xl bg-custom-yellow/5 border border-custom-yellow/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-custom-yellow/10 border border-custom-yellow/20 flex items-center justify-center text-custom-yellow">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">1 Match Draw</p>
              <p className="text-[11px] text-muted-foreground">Tied outcome</p>
            </div>
          </div>
          <span className="text-base font-mono font-black text-custom-yellow">
            {drawScore > 0 ? `+${drawScore}` : drawScore} pts
          </span>
        </div>

        {/* Loss Scenario */}
        <div className="p-4 rounded-xl bg-custom-red/5 border border-custom-red/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-custom-red/10 border border-custom-red/20 flex items-center justify-center text-custom-red">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">1 Match Loss</p>
              <p className="text-[11px] text-muted-foreground">Defeat outcome</p>
            </div>
          </div>
          <span
            className={`text-base font-mono font-black ${
              lossScore < 0
                ? "text-custom-red"
                : lossScore > 0
                ? "text-emerald-400"
                : "text-muted-foreground"
            }`}
          >
            {lossScore > 0 ? `+${lossScore}` : lossScore} pts
          </span>
        </div>
      </div>
    </div>
  )
}
