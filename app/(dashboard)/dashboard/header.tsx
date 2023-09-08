"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/co/ui/button";

function Header() {
  return (
    <div>
      <div>Header</div>
      <Button onClick={async () => await signOut()}>Sign Out</Button>
    </div>
  );
}

export default Header;
