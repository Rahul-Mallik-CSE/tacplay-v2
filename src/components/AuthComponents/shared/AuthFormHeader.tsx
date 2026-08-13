"use client";

import React from "react";

interface AuthFormHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function AuthFormHeader({
  title,
  description,
  className = "",
}: AuthFormHeaderProps) {
  return (
    <div className={`text-center space-y-2 ${className}`}>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground text-center max-w-sm">
        {description}
      </p>
    </div>
  );
}
