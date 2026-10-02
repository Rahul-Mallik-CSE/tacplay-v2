/** @format */

"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardComponents/CommonComponents/DashboardLayout";
import RouteGuard from "@/components/SharedComponents/RouteGuard";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles="field_owner">
      <DashboardLayout>{children}</DashboardLayout>
    </RouteGuard>
  );
}
