"use client"

import ReactCountryFlag from "react-country-flag"
import { Globe } from "lucide-react"
import type { PlayerCountryFlagProps } from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerCountryFlag({
  countryCode,
  countryName,
  size = "sm",
}: PlayerCountryFlagProps) {
  const isIsoCode = countryCode && typeof countryCode === "string" && countryCode.trim().length === 2
  const displayName = countryName || (countryCode && !isIsoCode ? countryCode : "")

  return (
    <div className="flex items-center gap-2">
      {isIsoCode ? (
        <ReactCountryFlag
          countryCode={countryCode.trim().toUpperCase()}
          svg
          style={{
            width: size === "sm" ? "1.5em" : "2em",
            height: size === "sm" ? "1.5em" : "2em",
            borderRadius: "3px",
          }}
        />
      ) : (
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <Globe className="w-3 h-3 text-muted-foreground" />
        </div>
      )}
      {displayName && (
        <span className="text-sm text-primary">{displayName}</span>
      )}
    </div>
  )
}
