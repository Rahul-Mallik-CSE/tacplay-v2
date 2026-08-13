"use client"

/**
 * ArenaLightbox.tsx
 * Fullscreen image viewer overlay with keyboard navigation (Escape, Arrow keys),
 * thumbnail strip, and prev/next buttons. Locks body scroll when open.
 */

import React, { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import type { ArenaLightboxProps } from "@/types/DashboardTypes/ArenaManagementTypes"

export default function ArenaLightbox({
  isOpen,
  imageUrls,
  currentSlide,
  onClose,
  onSlideChange,
}: ArenaLightboxProps) {
  const nextSlide = useCallback(() => {
    onSlideChange((currentSlide + 1) % imageUrls.length)
  }, [currentSlide, imageUrls.length, onSlideChange])

  const prevSlide = useCallback(() => {
    onSlideChange(
      (currentSlide - 1 + imageUrls.length) % imageUrls.length,
    )
  }, [currentSlide, imageUrls.length, onSlideChange])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") nextSlide()
      else if (e.key === "ArrowLeft") prevSlide()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, nextSlide, prevSlide])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 cursor-pointer z-50 shadow-lg"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative w-full max-w-5xl h-[65vh] md:h-[75vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageUrls[currentSlide]}
          alt={`Arena Cover Full ${currentSlide + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain rounded-lg shadow-2xl transition-all duration-500 ease-in-out border border-white/10"
        />

        {imageUrls.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/5 shadow-md"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/5 shadow-md"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </>
        )}
      </div>

      {imageUrls.length > 1 && (
        <div
          className="mt-6 flex flex-col items-center gap-4 z-40"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center gap-2 max-w-[90vw] overflow-x-auto py-1 px-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/5 shadow-inner">
            {imageUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => onSlideChange(idx)}
                className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden transition-all duration-300 border-2 cursor-pointer shrink-0 ${
                  idx === currentSlide
                    ? "border-custom-yellow scale-105 shadow-md shadow-custom-yellow/30"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={url}
                  alt={`Thumb ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="text-white/60 text-xs sm:text-sm font-semibold select-none tracking-wider">
            {currentSlide + 1} / {imageUrls.length}
          </div>
        </div>
      )}
    </div>
  )
}
