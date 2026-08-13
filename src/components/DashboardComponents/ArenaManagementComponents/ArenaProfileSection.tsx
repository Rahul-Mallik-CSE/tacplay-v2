"use client"

import React from "react"
import { Crown } from "lucide-react"
import { useTranslation } from "react-i18next"
import Image from "next/image"

interface ArenaProfileSectionProps {
  fullName: string
  email: string
  profileImageUrl: string | null
  showProBadge: boolean
}

function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "AO"
  )
}

export default function ArenaProfileSection({
  fullName,
  email,
  profileImageUrl,
  showProBadge,
}: ArenaProfileSectionProps) {
  const { t } = useTranslation("dashboard")
  const initials = getInitials(fullName)

  return (
    <div className="relative z-20 px-4 sm:px-6 pb-4">
      <div className="relative -mt-10 sm:-mt-12 md:-mt-14 mb-3 flex items-end justify-between">
        <div className="flex items-end gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-card bg-muted overflow-hidden shrink-0 relative">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={`${fullName} profile`}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-custom-red/40 to-custom-yellow/40 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-primary">
                  {initials}
                </span>
              </div>
            )}
          </div>
          <div className="pb-1">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
              {fullName}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        {showProBadge && (
          <div className="pb-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-custom-red text-white text-xs sm:text-sm font-semibold shadow-md shadow-custom-red/25">
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cdba20]" />
              {t("arena.pro")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
