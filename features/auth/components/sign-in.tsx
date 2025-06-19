"use client";

import { useRouter } from "next/navigation";
import { AuthForm } from "./forms/auth-form";
import AuthComponentLayout from "./layout/layout";
import { useMutation } from "@tanstack/react-query";
import { LoginType } from "../lib/types";
import { toast } from "sonner";
import { loginSchema } from "../lib/zod/schema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { PersonStandingIcon } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: async (data: LoginType) => {
  //     const response = await fetch("/api/auth/sign-in", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       const res = await response.json();
  //       throw new Error(res.message || "Login error");
  //     }
  //     return response.json();
  //   },
  // });
  const handleLogin = async (data: LoginType) => {
    setPending(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      setPending(false);
      if (res?.error === "CredentialsSignin") {
        toast.error("Invalid email or password.");
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <AuthComponentLayout type="sign-in">
      <AuthForm
        schema={loginSchema}
        fields={[
          { name: "email", label: "Email", placeholder: "Enter your email..." },
          { name: "password", label: "Password", placeholder: "Enter password", type: "password" },
        ]}
        submitLabel="Login"
        onSubmit={handleLogin}
        isPending={pending}
      />
    </AuthComponentLayout>
  );
}
