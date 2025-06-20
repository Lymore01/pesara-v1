"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export const Profile = () => {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={user?.image ?? "/images/aside.png"}
          width={36}
          height={36}
          alt="User profile picture"
          className="rounded-full border-2 border-border object-cover shadow-sm hover:ring-2 hover:ring-primary transition-all duration-200 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1">
          <p className="text-sm font-semibold">{user?.name || "User"}</p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email || "user@pesara.africa"}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-sm"
          >
            <User size={14} /> Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-sm"
          >
            <Settings size={14} /> Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="text-muted-foreground text-xs hover:bg-red-50 flex items-center gap-2 transition-colors rounded-sm"
        >
          <LogOut size={14} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
