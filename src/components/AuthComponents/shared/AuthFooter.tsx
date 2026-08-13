"use client";

import React from "react";
import Link from "next/link";

interface AuthFooterLink {
  label: string;
  href: string;
  linkText: string;
}

interface AuthFooterProps {
  message: string;
  link: AuthFooterLink;
}

export default function AuthFooter({ message, link }: AuthFooterProps) {
  return (
    <p className="text-sm text-center text-muted-foreground">
      {message}{" "}
      <Link
        href={link.href}
        className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
      >
        {link.linkText}
      </Link>
    </p>
  );
}
