"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Pen } from "lucide-react"
import { useTranslation } from "react-i18next"
import Image from "next/image"

interface CoverImageSliderProps {
  imageUrls: string[]
  onOpenLightbox: () => void
  onOpenManageModal: () => void
}

export default function CoverImageSlider({
  imageUrls,
  onOpenLightbox,
  onOpenManageModal,
}: CoverImageSliderProps) {
  const { t } = useTranslation("dashboard")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentSlide((prev) => (prev + 1) % imageUrls.length)
  }

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentSlide((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  useEffect(() => {
    if (imageUrls.length <= 1 || isHovered) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageUrls.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [imageUrls.length, isHovered])

  useEffect(() => {
    if (currentSlide >= imageUrls.length) {
      setCurrentSlide(Math.max(0, imageUrls.length - 1))
    }
  }, [imageUrls.length, currentSlide])

  return (
    <div
      className="relative w-full h-40 sm:h-52 md:h-64 lg:h-72 overflow-hidden rounded-t-xl group/slider bg-muted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative">
        {imageUrls.map((url, idx) => (
          <div
            key={url + idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              idx === currentSlide
                ? "opacity-100 z-10 scale-100"
                : "opacity-0 z-0 scale-95"
            } transform transition-all duration-700 overflow-hidden flex items-center justify-center`}
          >
            <Image
              src={url}
              alt=""
              fill
              sizes="100vw"
              className="object-cover blur-xl opacity-40 select-none pointer-events-none scale-110"
            />
            <Image
              src={url}
              alt={`Arena Cover ${idx + 1}`}
              fill
              sizes="100vw"
              className="relative max-w-full max-h-full object-contain z-10 transition-transform duration-700 hover:scale-102 cursor-pointer"
              onClick={onOpenLightbox}
            />
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {imageUrls.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 cursor-pointer shadow-lg"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 cursor-pointer shadow-lg"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md border border-white/10 text-white select-none shadow-md">
            {currentSlide + 1} / {imageUrls.length}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {imageUrls.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide
                    ? "w-5 bg-custom-yellow shadow-md shadow-custom-yellow/50"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <button
        type="button"
        onClick={onOpenLightbox}
        className="absolute left-4 top-4 z-20 w-8 h-8 rounded-lg flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 cursor-pointer shadow-md"
        aria-label="Maximize Cover View"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOpenManageModal()
        }}
        className="absolute right-4 top-4 z-20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-300 sm:opacity-0 sm:group-hover/slider:opacity-100 opacity-100 cursor-pointer shadow-md text-xs font-semibold"
        aria-label="Manage Cover Images"
      >
        <Pen className="w-3.5 h-3.5" />
        {t("arena.editSliderImages", "Edit Slider")}
      </button>
    </div>
  )
}
