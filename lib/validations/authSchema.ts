import * as z from "zod";

export const userRegisterSchema = z
  .object({
    name: z.string().nonempty({
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Email is empty or invalid",
    }),
    password: z.string().min(6, {
      message: "Password contain at least 6 character(s)",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password contain at least 6 character(s)",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userLoginSchema = z.object({
  email: z.string().email({
    message: "Email is empty or invalid",
  }),
  password: z.string().min(6, {
    message: "Password contain at least 6 character(s)",
  }),
});
