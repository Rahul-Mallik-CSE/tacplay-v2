"use client"

import React from "react"
import type { SubscriptionCountryFlagProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

const FLAG_EMOJIS: Record<string, string> = {
  ES: "\u{1F1EA}\u{1F1F8}",
  US: "\u{1F1FA}\u{1F1F8}",
  GB: "\u{1F1EC}\u{1F1E7}",
  DE: "\u{1F1E9}\u{1F1EA}",
  FR: "\u{1F1EB}\u{1F1F7}",
  IT: "\u{1F1EE}\u{1F1F9}",
  PT: "\u{1F1F5}\u{1F1F9}",
  NL: "\u{1F1F3}\u{1F1F1}",
  BR: "\u{1F1E7}\u{1F1F7}",
  AR: "\u{1F1E6}\u{1F1F7}",
}

function SubscriptionCountryFlag({ countryCode }: SubscriptionCountryFlagProps) {
  const flag = FLAG_EMOJIS[countryCode] || "\u{1F3F3}\uFE0F"

  return (
    <span className="text-lg" title={countryCode}>
      {flag}
    </span>
  )
}

export default SubscriptionCountryFlag
