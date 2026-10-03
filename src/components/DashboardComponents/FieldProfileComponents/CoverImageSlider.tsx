"use client"

/**
 * CoverImageSlider.tsx
 * Static profile cover image component displaying /profile-cover.png.
 */

import React from "react"
import Image from "next/image"
import type { CoverImageSliderProps } from "@/types/DashboardTypes/ArenaManagementTypes"

export default function CoverImageSlider({
  coverImage = "/profile-cover.png",
  imageUrls,
  onOpenLightbox,
}: Partial<CoverImageSliderProps> = {}) {
  const imageSrc = coverImage || imageUrls?.[0] || "/profile-cover.png"

  return (
    <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-72 overflow-hidden rounded-t-xl bg-muted">
      <Image
        src={imageSrc}
        alt="Profile Cover"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        onClick={onOpenLightbox}
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
    </div>
  )
}

export { CoverImageSlider as CoverImage }
