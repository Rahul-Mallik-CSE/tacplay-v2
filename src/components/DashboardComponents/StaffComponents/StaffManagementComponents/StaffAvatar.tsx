"use client"

import React from "react"
import type { StaffAvatarProps } from "@/types/DashboardTypes/StaffTypes"

function StaffAvatar({ src, alt, size = "md" }: StaffAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = "none"
        }}
      />
    </div>
  )
}

export default StaffAvatar
