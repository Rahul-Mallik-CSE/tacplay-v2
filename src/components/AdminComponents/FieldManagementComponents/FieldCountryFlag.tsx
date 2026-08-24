"use client"

import ReactCountryFlag from "react-country-flag"
import type { FieldCountryFlagProps } from "@/types/AdminTypes/FieldManagementTypes"

export default function FieldCountryFlag({
  countryCode,
}: FieldCountryFlagProps) {
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{ width: "1.5em", height: "1.5em" }}
    />
  )
}
