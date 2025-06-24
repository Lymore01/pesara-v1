"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type SidebarMode = "collapsed" | "expanded" | "hover";

interface SidebarContextProps {
  mode: SidebarMode;
  setMode: (mode: SidebarMode) => void;
  project: string | null;
  setProject: (project: string) => void;
}

const SidebarModeContext = createContext<SidebarContextProps>({
  mode: "hover",
  setMode: () => {},
  project: null,
  setProject: () => {},
});

export const useSidebar = () => {
  const context = useContext(SidebarModeContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
};

export function SidebarModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<SidebarMode>("hover");
  const [project, setProject] = useState<string>("");

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      mode,
      setMode,
      project,
      setProject,
    }),
    [mode, setMode, project, setProject]
  );
  return <SidebarModeContext.Provider value={contextValue}>{children}</SidebarModeContext.Provider>;
}
