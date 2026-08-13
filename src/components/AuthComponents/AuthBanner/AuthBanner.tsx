"use client";

import React from "react";
import Image from "next/image";
import headTitle from "../../../../public/heading-up.png";
import BannerSlides from "./BannerSlides";

interface AuthBannerProps {
  children: React.ReactNode;
}

export default function AuthBanner({ children }: AuthBannerProps) {
  return (
    <div className="flex min-h-screen w-full bg-root-bg">
      <div className="hidden lg:flex lg:w-1/2 relative flex-col">
        <div className="absolute top-6 left-6 z-10">
          <Image
            src="/TACPLAY Logo.png"
            alt="TacPlay Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="relative flex-1 m-4 rounded-2xl overflow-hidden">
          <Image
            src="/banner.png"
            alt="Arena Banner"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <BannerSlides />

            <div className="mt-6">
              <Image
                src={headTitle}
                alt="Tagline"
                width={300}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
