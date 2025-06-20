"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { navItems } from "../../lib/constants";
import { useSidebarMode } from "./sidebar-context";

export default function DashboardSideNav() {
  const { mode, setMode } = useSidebarMode();
  const pathname = usePathname();

  const sidebarClass = cn(
    "group fixed left-0 top-12 z-30 h-[calc(100vh-3rem)] bg-white/70 dark:bg-background/70 backdrop-blur-lg border-r border-border shadow-sm hidden md:flex flex-col justify-between px-2 py-6 overflow-hidden transition-all duration-300 ease-in-out",
    mode === "collapsed" && "w-[60px] hover:w-[60px]",
    mode === "expanded" && "w-[220px] hover:w-[220px]",
    mode === "hover" && "w-[60px] hover:w-[220px]"
  );

  return (
    <>
      <aside className={sidebarClass}>
        <div className="space-y-2">
          {navItems.map(({ name, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={cn(
                  "flex items-center gap-4 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon size={20} className="shrink-0" />
                <span
                  className={cn(
                    "whitespace-nowrap transition-opacity duration-300 text-sm",
                    mode === "collapsed"
                      ? "opacity-0"
                      : mode === "expanded"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
        <SideBarToggle />
      </aside>
    </>
  );
}

const SideBarToggle = () => {
  const { mode, setMode } = useSidebarMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="px-3 py-2 cursor-pointer">
          <Sidebar size={16} className="text-muted-foreground hover:text-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <div className="px-2 py-1">
          <p className="text-xs text-muted-foreground truncate">Sidebar control</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <label
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setMode("collapsed")}
          >
            <Input
              type="radio"
              name="sidebar-mode"
              checked={mode === "collapsed"}
              onChange={() => setMode("collapsed")}
              className="size-4"
            />
            <span className="text-xs text-muted-foreground">Collapsed</span>
          </label>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <label
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setMode("hover")}
          >
            <Input
              type="radio"
              name="sidebar-mode"
              checked={mode === "hover"}
              onChange={() => setMode("hover")}
              className="size-4"
            />
            <span className="text-xs text-muted-foreground">Expand on hover</span>
          </label>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <label
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setMode("expanded")}
          >
            <Input
              type="radio"
              name="sidebar-mode"
              checked={mode === "expanded"}
              onChange={() => setMode("expanded")}
              className="size-4"
            />
            <span className="text-xs text-muted-foreground">Always expanded</span>
          </label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
