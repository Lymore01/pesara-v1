"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { DollarSign, Github, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Documentation", href: "/docs" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export const Header = () => {
  const [open, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const router = useRouter();

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-background/70 border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto w-[80%] px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="rounded-full p-1 bg-foreground group-hover:rotate-12 transition">
            <DollarSign size={18} className="text-black font-semibold" />
          </div>
          <span className="font-cal text-lg text-foreground tracking-wide">Pesara</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden lg:block">
            <Button onClick={() => router.push("/login")}>Get Started</Button>
          </div>
          <Button variant="outline" size="icon">
            <a
              href="https://github.com/Lymore01/trackify-dev/"
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

          <button
            onClick={toggleMenu}
            className="lg:hidden size-10 grid place-content-center rounded-full bg-black text-white"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white dark:bg-background px-4 py-4 border-t border-border">
          <ul className="space-y-4 text-muted-foreground">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="block hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Button
                className="w-full"
                onClick={() => {
                  router.push("/login");
                  setIsOpen(false);
                }}
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
