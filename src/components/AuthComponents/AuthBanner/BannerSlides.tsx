"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Slide {
  title: string;
  description: string;
}

interface BannerSlidesProps {
  onSlideChange?: (index: number) => void;
}

export default function BannerSlides({ onSlideChange }: BannerSlidesProps) {
  const { t } = useTranslation("dashboard");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: t("auth.slides.commandArenaTitle"),
      description: t("auth.slides.commandArenaDesc"),
    },
    {
      title: t("auth.slides.manageBattlesTitle"),
      description: t("auth.slides.manageBattlesDesc"),
    },
    {
      title: t("auth.slides.growCommunityTitle"),
      description: t("auth.slides.growCommunityDesc"),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        onSlideChange?.(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, onSlideChange]);

  return (
    <>
      <h2 className="text-2xl xl:text-3xl font-bold text-white mb-2">
        {slides[currentSlide].title}
      </h2>
      <p className="text-sm text-white/70 max-w-md">
        {slides[currentSlide].description}
      </p>

      <div className="flex gap-2 mt-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              onSlideChange?.(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}
