import React from "react";

import Title from "@/co/ui/title";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Dashboard | Remarks.io",
  description: "The home for all your links.",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  console.log("user", user);
  return (
    <div>
      <Title>Dashboard</Title>
      {JSON.stringify(user)}
    </div>
  );
}
