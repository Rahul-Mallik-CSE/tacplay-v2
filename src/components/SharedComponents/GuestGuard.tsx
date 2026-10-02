/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { resolveAccountType } from "@/redux/features/auth/authSlice";
import AnimatedLoading from "@/components/SharedComponents/AnimatedLoading";

/**
 * Wraps the (auth) route group.
 * If the user is already authenticated, redirect them to their dashboard
 * instead of showing sign-in / sign-up pages.
 *
 * The `pendingEmail` exception allows returning to OTP/reset pages during
 * the forgot-password or signup verification flows.
 */
export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, pendingEmail } = useAppSelector(
    (s) => s.auth,
  );
  const [ready, setReady] = useState(false);

  const accountType = resolveAccountType(user);

  useEffect(() => {
    // If the user has a pending verification flow, let them stay on auth pages
    if (pendingEmail) {
      setReady(true);
      return;
    }

    if (isAuthenticated && accountType) {
      // Already logged in — send them to their dashboard
      if (accountType === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
      return;
    }

    setReady(true);
  }, [isAuthenticated, accountType, pendingEmail, router]);

  if (!ready) {
    return <AnimatedLoading />;
  }

  return <>{children}</>;
}
