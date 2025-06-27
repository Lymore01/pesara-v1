"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Checkout } from "./checkout";

export default function CheckoutUI({ projectName }: { projectName?: string }) {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-foreground text-base">{projectName}`s Checkout UI</h1>
        <Button
          type="submit"
          variant="outline"
          className="text-xs dark:hover:bg-brand-accent text-foreground dark:bg-brand flex items-center cursor-pointer"
          onClick={() => router.push(`/dashboard/project/${projectName}/credentials/checkout/edit`)}
        >
          Edit Checkout UI
        </Button>
      </div>
      <Checkout />
    </div>
  );
}
