"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/co/ui/button";
import { toastSuccess } from "@/co/ui/toast";

function Header() {
  const handleSignOut = async () => {
    await signOut();
    toastSuccess("Successfully Signout!");
  };
  return (
    <div>
      <div>Header</div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}

export default Header;
