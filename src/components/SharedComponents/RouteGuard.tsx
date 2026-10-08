/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { resolveAccountType } from "@/redux/features/auth/authSlice";
import AnimatedLoading from "@/components/SharedComponents/AnimatedLoading";
import type { AccountType } from "@/types/AuthTypes";

interface RouteGuardProps {
  children: React.ReactNode;
  /**
   * Which account types are allowed to view the wrapped content.
   * - `"field_owner"` → only field owners (user dashboard)
   * - `"admin"` → only admins (admin dashboard)
   * - `["admin", "field_owner"]` → both
   */
  allowedRoles: AccountType | AccountType[];
}

/**
 * Client-side route guard that checks authentication AND role.
 *
 * • Not authenticated → redirect to `/sign-in`
 * • Authenticated but wrong role → redirect to the user's *correct* dashboard
 *   (prevents admins from seeing field-owner pages and vice versa)
 * • Authenticated + correct role → render children
 */
export default function RouteGuard({
  children,
  allowedRoles,
}: RouteGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const [authorised, setAuthorised] = useState(false);

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const accountType = resolveAccountType(user);

  useEffect(() => {
    // 1. Not authenticated → send to sign-in
    if (!isAuthenticated) {
      router.replace("/sign-in");
      return;
    }

    // 2. Authenticated but role not determined yet (should be rare)
    if (!accountType) {
      router.replace("/sign-in");
      return;
    }

    // 3. Authenticated but wrong role → send to their own dashboard
    if (!roles.includes(accountType as AccountType)) {
      if (accountType === "admin" || accountType === "admin_staff") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
      return;
    }

    // 4. All checks passed
    setAuthorised(true);
  }, [isAuthenticated, accountType, roles, router]);

  if (!authorised) {
    return <AnimatedLoading />;
  }

  return <>{children}</>;
}
