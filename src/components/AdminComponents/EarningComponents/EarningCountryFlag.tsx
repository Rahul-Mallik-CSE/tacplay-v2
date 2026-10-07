"use client"

import React from "react"
import ReactCountryFlag from "react-country-flag"
import type { EarningCountryFlagProps } from "@/types/AdminTypes/EarningTypes"

function EarningCountryFlag({ countryCode, countryName }: EarningCountryFlagProps) {
  if (countryCode && countryCode.length === 2) {
    return (
      <div className="flex items-center gap-1.5" title={countryName || countryCode}>
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          style={{ width: "1.4em", height: "1.4em" }}
        />
        {countryName && (
          <span className="text-xs text-primary hidden md:inline">{countryName}</span>
        )}
      </div>
    )
  }

  return (
    <span className="text-xs text-secondary font-medium" title={countryName || ""}>
      {countryName || countryCode || "—"}
    </span>
  )
}

export default EarningCountryFlag
