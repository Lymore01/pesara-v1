"use client";

import { useMutation } from "@tanstack/react-query";
import { registerSchema } from "../lib/zod/schema";
import { AuthForm } from "./forms/auth-form";
import AuthComponentLayout from "./layout/layout";
import { toast } from "sonner";
import { RegisterType } from "../lib/types";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RegisterType) => {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Registration error");
      }
      return response.json();
    },
  });

  const handleSignUp = async (data: RegisterType) => {
    try {
      const res = await mutateAsync(data);
      toast.success(res.message);
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInRes?.error) {
        toast.error(signInRes.error);
      } else {
        router.push(res.redirectUrl);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <AuthComponentLayout type="sign-up">
      <AuthForm
        schema={registerSchema}
        fields={[
          { name: "email", label: "Email", placeholder: "Enter your email" },
          { name: "password", label: "Password", placeholder: "Enter password", type: "password" },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Confirm password",
            type: "password",
          },
        ]}
        submitLabel="Create Account"
        onSubmit={handleSignUp}
        isPending={isPending}
      />
    </AuthComponentLayout>
  );
}
