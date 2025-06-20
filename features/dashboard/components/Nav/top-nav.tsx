"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Profile } from "@/components/nav/profile";
import { Button } from "@/components/ui/button";
import { AlignLeft, DollarSign, Github, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProjectName } from "../get-project-name";

export default function DashboardTopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-background/70 border-b border-border shadow-sm">
      <nav className="max-w-8xl mx-4 px-4 sm:px-6 lg:px-1 flex items-center justify-between h-12">
        <div className="flex items-center gap-2 group">
          <Link href="/" className="rounded-full p-1 bg-brand group-hover:rotate-12 transition">
            <DollarSign size={18} className="text-white font-semibold" />
          </Link>
          <span className="text-muted-foreground hover:text-foreground text-xs">/</span>
          <div className="items-center flex gap-2">
            <LayoutDashboard size={16} className="text-muted-foreground hover:text-foreground" />
            <p className="text-foreground text-xs">Projects</p>
          </div>
          {getProjectName(pathname)}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />

          <Button variant="outline" size="icon">
            <a
              href="https://github.com/Lymore01/pesara-v1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github
                size={16}
                className="text-muted-foreground hover:text-foreground transition-colors"
              />
            </a>
          </Button>
          <Profile />
        </div>
      </nav>
      <div className="flex md:hidden border-t border-border shadow-sm px-4 h-12 items-center mx-4 gap-2 text-sm">
        <AlignLeft size={16} className="text-muted-foreground hover:text-foreground" />
        Menu
      </div>
    </header>
  );
}
