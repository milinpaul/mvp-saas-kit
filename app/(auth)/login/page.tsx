import React from "react";
import { Icons } from "@/co/Icons";
import Title from "@/co/ui/title";
import LoginForm from "./form";

export const metadata = {
  title: "Login to Remarks.io",
};

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-10 w-10" />
          <Title>Welcome back</Title>
          <p className="text-sm text-muted-foreground">
            Enter your details to login to your account
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
