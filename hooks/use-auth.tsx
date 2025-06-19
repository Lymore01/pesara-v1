import { UserType } from "@/features/auth/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useAuth(): UserType {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  return user?.userData?.user;
}
