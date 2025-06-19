"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password. Please try again.",
  OAuthAccountNotLinked:
    "This email is already linked to another provider. Try using that method instead.",
  default: "An unexpected error occurred. Please try again.",
  OAuthCallback:
    "Something went wrong during authentication. Please try again or use a different provider.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "default";
  const errorMessage = errorMessages[error] || error || errorMessages["default"];

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="transition-colors max-w-md w-full text-center bg-background p-8 rounded-xl shadow-lg border border-border hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
        <div className="flex justify-center mb-4">
          <div className="bg-destructive/20 p-3 rounded-full">
            <AlertTriangle className="text-destructive" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Authentication Error</h1>
        <p className="text-muted-foreground mb-6">{errorMessage}</p>

        <Link
          href="/sign-in"
          className="inline-block text-sm font-medium text-primary hover:underline transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    </main>
  );
}
