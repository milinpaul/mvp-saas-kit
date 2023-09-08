"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { buttonVariants } from "@/co/ui/button";
import { Input } from "@/co/ui/input";
import { cn } from "@/lib/utils";
import { userRegisterSchema } from "@/lib/validations/authSchema";
import { Icons } from "@/co/Icons";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { toastError, toastSuccess } from "@/co/ui/toast";

type FormData = z.infer<typeof userRegisterSchema>;

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const router = useRouter();

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      const { name, email, password, confirmPassword } = data;

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      setIsLoading(false);

      if (response.ok) {
        toastSuccess(`${name} successfully registered. Please login.`);
        return router.push(routes.dashboard);
      }

      return toastError("Your sign in request failed. Please try again.");
    } catch (error) {
      setIsLoading(false);
      return toastError("Your sign in request failed. Please try again.");
    }
  }

  return (
    <div className={cn("grid gap-6 mt-20")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Input
            id="name"
            placeholder="Your Name"
            type="text"
            autoCorrect="off"
            disabled={isLoading}
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
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
          <Input
            id="confirmPassword"
            placeholder="********"
            type="password"
            autoCorrect="off"
            disabled={isLoading}
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword && (
            <p className="px-1 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
