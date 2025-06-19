"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="">
      <p>User: {session?.user.email}</p>
      <p>UserId: {session?.user.id}</p>
      <p>Name: {session?.user.name}</p>
      <Button
        onClick={() =>
          signOut({
            callbackUrl: "/sign-in",
          })
        }
      >
        Logout
      </Button>
    </div>
  );
}
