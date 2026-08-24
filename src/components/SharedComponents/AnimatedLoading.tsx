"use client"

import Image from "next/image"

export default function AnimatedLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative mb-8">
        <div className="w-24 h-24 border-5 border-white/10 border-t-custom-red rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/Tacplay-logo-2.png"
            alt="TacPlay"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-custom-red rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3 h-3 bg-custom-red rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3 h-3 bg-custom-red rounded-full animate-bounce" />
      </div>
    </div>
  )
}
