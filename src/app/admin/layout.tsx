/** @format */

"use client";

import React from "react";
import AdminLayout from "@/components/AdminComponents/CommonComponents/AdminLayout";
import RouteGuard from "@/components/SharedComponents/RouteGuard";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles="admin">
      <AdminLayout>{children}</AdminLayout>
    </RouteGuard>
  );
}
