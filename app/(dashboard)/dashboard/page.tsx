import React from "react";

import Title from "@/co/ui/title";
import { getCurrentUser } from "@/lib/session";
import { getSiteTitle, siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: getSiteTitle("Dashboard"),
  description: siteConfig.description,
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div>
      <Title>Dashboard</Title>
      {JSON.stringify(user)}
    </div>
  );
}
