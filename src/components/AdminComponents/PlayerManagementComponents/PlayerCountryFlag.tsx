"use client"

import ReactCountryFlag from "react-country-flag"
import { useTranslation } from "react-i18next"
import type { PlayerCountryFlagProps } from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerCountryFlag({
  countryCode,
  size = "sm",
}: PlayerCountryFlagProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex items-center gap-2">
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: size === "sm" ? "1.5em" : "2em",
          height: size === "sm" ? "1.5em" : "2em",
        }}
      />
    </div>
  )
}
