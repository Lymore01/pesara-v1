"use client";

import { useEffect } from "react";
import { useSidebar } from "./Nav/sidebar-context";

export function ProjectContextSetter({ project }: { project: string }) {
  const { setProject } = useSidebar();

  useEffect(() => {
    if (project) {
      setProject(project);
    }
  }, [project, setProject]);

  return null;
}
