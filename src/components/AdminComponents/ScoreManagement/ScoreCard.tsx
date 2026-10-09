/**
 * ScoreCard.tsx
 * Interactive card component for configuring a match outcome score (Win, Loss, Draw).
 * Features gradient border, numeric stepper (- / +), and instant validation.
 */

import React from "react"
import { LucideIcon, Plus, Minus } from "lucide-react"

export interface ScoreCardProps {
  title: string
  badgeLabel: string
  description: string
  icon: LucideIcon
  value: number
  onChange: (val: number) => void
  disabled?: boolean
  isEditable?: boolean
  variant: "win" | "draw" | "loss"
  step?: number
}

export default function ScoreCard({
  title,
  badgeLabel,
  description,
  icon: Icon,
  value,
  onChange,
  disabled = false,
  isEditable = false,
  variant,
  step = 1,
}: ScoreCardProps) {
  // Theme configuration based on variant
  const config = {
    win: {
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]",
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      accentText: "text-emerald-400",
      buttonBg: "hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
    },
    draw: {
      gradient: "from-custom-yellow/10 via-custom-yellow/5 to-transparent",
      border: "border-custom-yellow/20 hover:border-custom-yellow/40",
      glow: "hover:shadow-[0_0_25px_rgba(205,186,32,0.15)]",
      badge: "bg-custom-yellow/15 text-custom-yellow border-custom-yellow/30",
      iconBg: "bg-custom-yellow/10 text-custom-yellow border-custom-yellow/20",
      accentText: "text-custom-yellow",
      buttonBg: "hover:bg-custom-yellow/20 text-custom-yellow border-custom-yellow/20",
    },
    loss: {
      gradient: "from-custom-red/10 via-custom-red/5 to-transparent",
      border: "border-custom-red/20 hover:border-custom-red/40",
      glow: "hover:shadow-[0_0_25px_rgba(152,0,9,0.15)]",
      badge: "bg-custom-red/15 text-custom-red border-custom-red/30",
      iconBg: "bg-custom-red/10 text-custom-red border-custom-red/20",
      accentText: "text-custom-red",
      buttonBg: "hover:bg-custom-red/20 text-custom-red border-custom-red/20",
    },
  }[variant]

  const handleDecrement = () => {
    if (disabled) return
    onChange(value - step)
  }

  const handleIncrement = () => {
    if (disabled) return
    onChange(value + step)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === "" || raw === "-") {
      // allow typing negative sign or backspacing
      onChange(0)
      return
    }
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed)) {
      onChange(parsed)
    }
  }

  const displaySign = value > 0 ? `+${value}` : `${value}`

  return (
    <div
      className={`relative rounded-2xl bg-card border ${config.border} bg-gradient-to-br ${config.gradient} p-6 transition-all duration-300 ${config.glow} flex flex-col justify-between`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border ${config.iconBg}`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.badge}`}
          >
            {badgeLabel}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-primary mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Value Display / Stepper */}
      {!isEditable ? (
        <div className="space-y-3">
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <div
              className={`text-3xl sm:text-4xl font-black tracking-tight ${config.accentText}`}
            >
              {displaySign}{" "}
              <span className="text-sm font-semibold text-muted-foreground font-mono">
                pts
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1">
              Configured point value
            </span>
          </div>

          {/* Formatted Summary Indicator */}
          <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
            <span>Awarded to player:</span>
            <span className={`font-mono font-bold ${config.accentText}`}>
              {displaySign} pts
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-2 shadow-inner">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled}
              aria-label={`Decrease ${title}`}
              className={`cursor-pointer w-10 h-10 rounded-lg flex items-center justify-center border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${config.buttonBg}`}
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="flex-1 text-center">
              <input
                type="number"
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
                className={`w-full bg-transparent text-center text-2xl font-black outline-none tracking-tight ${config.accentText}`}
              />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                Points
              </span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled}
              aria-label={`Increase ${title}`}
              className={`cursor-pointer w-10 h-10 rounded-lg flex items-center justify-center border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${config.buttonBg}`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Formatted Summary Indicator */}
          <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
            <span>Awarded to player:</span>
            <span className={`font-mono font-bold ${config.accentText}`}>
              {displaySign} pts
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
