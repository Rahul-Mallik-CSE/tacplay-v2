"use client"

/**
 * SettingsProfileAvatar.tsx
 * Reusable avatar component for displaying profile image or initials.
 * Supports different sizes and shows initials fallback when no image.
 */

import React from "react"
import type { SettingsProfileAvatarProps } from "@/types/DashboardTypes/SettingsTypes"

/** Generate initials from full name */
function getInitials(fullName: string): string {
  if (!fullName) return "U"

  const parts = fullName.trim().split(/\s+/).filter(Boolean)

  return (
    parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "U"
  )
}

/** Size classes mapping */
const SIZE_CLASSES = {
  sm: "w-12 h-12 text-lg",
  md: "w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl",
  lg: "w-24 h-24 text-3xl",
}

function SettingsProfileAvatar({
  imageUrl,
  fullName,
  size = "md",
}: SettingsProfileAvatarProps) {
  const initials = getInitials(fullName)
  const sizeClass = SIZE_CLASSES[size]

  return (
    <div
      className={`${sizeClass} rounded-full bg-linear-to-br from-custom-red/30 to-custom-yellow/30 flex items-center justify-center shrink-0`}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="font-bold text-primary">{initials}</span>
      )}
    </div>
  )
}

export default SettingsProfileAvatar
