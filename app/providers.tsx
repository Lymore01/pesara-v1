"use client";

import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
