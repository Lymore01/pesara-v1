"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "./Nav/sidebar-context";

export default function DashSubLayout({ children }: { children: React.ReactNode }) {
  const { mode } = useSidebar();

  const marginLeft = mode === "expanded" ? "md:ml-[220px]" : "md:ml-16";
  return (
    <section
      className={cn(
        "mt-24 md:mt-12 py-8 px-8 md:px-16 transition-all duration-300 ease-in-out",
        marginLeft
      )}
    >
      {children}
    </section>
  );
}
