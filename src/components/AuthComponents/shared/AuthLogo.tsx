"use client";

import React from "react";
import Image from "next/image";

interface AuthLogoProps {
  className?: string;
}

export default function AuthLogo({ className = "h-12" }: AuthLogoProps) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <Image
        src="/Tacplay-logo-2.png"
        alt="TacPlay"
        width={200}
        height={200}
        className={`object-contain ${className}`}
        priority
      />
    </div>
  );
}
