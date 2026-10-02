"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { resolveAccountType } from "@/redux/features/auth/authSlice";
import AnimatedLoading from "@/components/SharedComponents/AnimatedLoading";

/**
 * Root page — redirects to the correct destination based on auth state.
 * • Not authenticated → /sign-in
 * • Admin → /admin
 * • Field owner → /dashboard
 */
export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const accountType = resolveAccountType(user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/sign-in");
      return;
    }

    if (accountType === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, accountType, router]);

  return <AnimatedLoading />;
}
