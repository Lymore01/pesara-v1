"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSidebar } from "./Nav/sidebar-context";

export function ProjectContextResetter() {
  const pathname = usePathname();
  const { setProject } = useSidebar();

  useEffect(() => {
    if (!pathname.includes("/dashboard/project/")) {
      setProject("");
    }
  }, [pathname, setProject]);

  return null;
}
