"use client"

import React, { useState } from "react"
import Image from "next/image"
import { User } from "lucide-react"
import { toAbsoluteMediaUrl, cn } from "@/lib/utils"
import type { StaffAvatarProps } from "@/types/CommonPageTypes/StaffTypes"

function getInitials(name: string): string {
  if (!name) return ""
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
  )
}

function StaffAvatar({ src, alt, size = "md", className }: StaffAvatarProps) {
  const [hasError, setHasError] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-20 h-20 text-xl",
  }

  const absoluteUrl = toAbsoluteMediaUrl(src)
  const initials = getInitials(alt)

  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative",
        className
      )}
    >
      {absoluteUrl && !hasError ? (
        <Image
          src={absoluteUrl}
          alt={alt || "Staff avatar"}
          fill
          unoptimized
          sizes="80px"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : initials ? (
        <span className="font-semibold text-primary/80 select-none">
          {initials}
        </span>
      ) : (
        <User className="w-1/2 h-1/2 text-secondary" />
      )}
    </div>
  )
}

export default StaffAvatar
