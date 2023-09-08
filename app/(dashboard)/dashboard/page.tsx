import React from "react";
import { Metadata } from "next";

import Title from "@/co/ui/title";
import { getCurrentUser } from "@/lib/session";

type ParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
  parent: any;
};

export async function generateMetadata({
  params,
  parent,
}: ParamProps): Promise<Metadata> {
  console.log("params", parent);
  return {
    title: "...",
  };
}

// export const metadata = {
//   title: "Dashboard | MVP",
//   description: "The home for all your links.",
// };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div>
      <Title>Dashboard</Title>
      {JSON.stringify(user)}
    </div>
  );
}
