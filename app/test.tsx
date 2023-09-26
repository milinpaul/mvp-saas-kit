"use client";

import React from "react";

import { Button } from "@/co/ui/button";
import { sendWelcomeEmail } from "@/lib/resend";

function Test() {
  return (
    <Button
      onClick={async () => {
        try {
          const result = await sendWelcomeEmail({
            firstName: "Milin",
            to: "milin.seby@gmail.com",
          });

          if (result.id) {
            alert(`Email with Id ${result.id} sent successfully!`);
          }
        } catch (error) {
          alert(`Error occurred: ${error}`);
        }
      }}
    >
      Send Email
    </Button>
  );
}

export default Test;
