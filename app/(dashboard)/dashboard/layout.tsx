import React from "react";

import { getCurrentUser } from "@/lib/session";
import Header from "./header";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="h-full lg:container">
      <Header />
      {children}
    </div>
  );
}

export default DashboardLayout;
