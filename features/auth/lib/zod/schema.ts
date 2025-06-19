import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string({ required_error: "Please confirm your password" }).optional(),
    salt: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const sessionSchema = z.object({
  id: z.string(),
  email: z.string(),
});
