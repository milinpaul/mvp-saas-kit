"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Button, buttonVariants } from "@/co/ui/button";
import { Input } from "@/co/ui/input";
import { cn } from "@/lib/utils";
import { userLoginSchema } from "@/lib/validations/authSchema";
import { Icons } from "@/co/Icons";
import { routes } from "@/lib/routes";
import { toastError, toastSuccess } from "@/co/ui/toast";

type FormData = z.infer<typeof userLoginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userLoginSchema),
  });
  const router = useRouter();

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      const { email, password } = data;

      const signInUser = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
        callbackUrl: routes.dashboard,
      });

      setIsLoading(false);

      toastSuccess(`Welcome to SaaS Kit!`);

      if (signInUser?.error) {
        return toastError(`Error occured while signin. ${signInUser.error}`);
      }

      return router.push(routes.dashboard);
    } catch (error: any) {
      setIsLoading(false);
      return toastError("Error when signin..");
    }
  }

  return (
    <div className={cn("grid gap-6 mt-20")}>
      <Button variant="outline">Sign in with Google</Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            {...register("email")}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
          <Input
            id="password"
            placeholder="********"
            type="password"
            autoCorrect="off"
            disabled={isLoading}
            {...register("password")}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
