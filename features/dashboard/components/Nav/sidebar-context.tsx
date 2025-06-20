"use client";

import React, { createContext, useContext, useState } from "react";

export type SidebarMode = "collapsed" | "expanded" | "hover";

const SidebarModeContext = createContext<{
  mode: SidebarMode;
  setMode: (mode: SidebarMode) => void;
}>({
  mode: "hover",
  setMode: () => {},
});

export const useSidebarMode = () => useContext(SidebarModeContext);

export function SidebarModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<SidebarMode>("hover");
  return (
    <SidebarModeContext.Provider value={{ mode, setMode }}>{children}</SidebarModeContext.Provider>
  );
}
