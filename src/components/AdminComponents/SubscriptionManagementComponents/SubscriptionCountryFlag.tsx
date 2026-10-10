"use client"

import React from "react"
import ReactCountryFlag from "react-country-flag"
import { Globe } from "lucide-react"
import type { SubscriptionCountryFlagProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

function SubscriptionCountryFlag({
  countryCode,
  countryName,
  size = "sm",
}: SubscriptionCountryFlagProps) {
  const isIsoCode =
    countryCode &&
    typeof countryCode === "string" &&
    countryCode.trim().length === 2

  const displayName =
    countryName || (countryCode && !isIsoCode ? countryCode : "")

  return (
    <div className="flex items-center gap-2">
      {isIsoCode ? (
        <ReactCountryFlag
          countryCode={countryCode.trim().toUpperCase()}
          svg
          style={{
            width: size === "sm" ? "1.4em" : "1.8em",
            height: size === "sm" ? "1.4em" : "1.8em",
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

export default SubscriptionCountryFlag
