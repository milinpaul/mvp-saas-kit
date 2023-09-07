import React from "react";
import AuthForm from "./form";
import { Icons } from "@/co/Icons";
import Title from "@/co/ui/title";

export const metadata = {
  title: "Create an account",
  description: "Create an account to start bookmarking.",
};

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-10 w-10" />
          <Title>Create an account</Title>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        <AuthForm />
      </div>
    </div>
  );
}
