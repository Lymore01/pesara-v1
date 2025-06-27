"use client";

import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Credentials({ projectName }: { projectName: string }) {
  const router = useRouter();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const fakeKeys = {
    publicKey: "pk_test_4f27ac1d03d245bdbf56d",
    secretKey: "sk_test_b52c9e7e19cf4f93acde9",
    webhookSecret: "whsec_9b7dc2b83fa8411e8a3b",
    checkoutUrl: "https://checkout.pesara.com/checkout/1234567890",
  };

  return (
    <div className="w-full space-y-6 bg-muted/30">
      <div className="p-6 space-y-6 ">
        <CredentialRow
          label="Public API Key"
          value={fakeKeys.publicKey}
          onCopy={() => handleCopy(fakeKeys.publicKey)}
          copied={copiedKey === fakeKeys.publicKey}
          description="Used to identify your project when making requests from the frontend. Safe to share in client-side code."
        />

        <CredentialRow
          label="Secret API Key"
          value={fakeKeys.secretKey}
          masked
          onCopy={() => handleCopy(fakeKeys.secretKey)}
          copied={copiedKey === fakeKeys.secretKey}
          description="Used to authenticate requests from your server to Pesara. Keep this key confidential and never expose it in client-side code."
        />

        <CredentialRow
          label="Webhook Secret"
          value={fakeKeys.webhookSecret}
          masked
          onCopy={() => handleCopy(fakeKeys.webhookSecret)}
          copied={copiedKey === fakeKeys.webhookSecret}
          description="Used to verify that incoming webhook requests are genuinely from Pesara. Keep this key secure and use it to validate webhook signatures."
        />
      </div>
      <div className="mt-4 flex w-full border-t border-border p-6">
        <CredentialRow
          label="Checkout url"
          value={fakeKeys.checkoutUrl}
          onCopy={() => handleCopy(fakeKeys.checkoutUrl)}
          copied={copiedKey === fakeKeys.checkoutUrl}
          description="The URL to redirect users for checkout. This is where you can direct users to complete their payments."
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/project/${projectName}/credentials/checkout`)}
            className="h-8"
          >
            Open Checkout
          </Button>
        </CredentialRow>
      </div>
      <div className="mt-4 flex w-full border-t border-border p-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Click to refresh your API keys. This will generate new keys and invalidate the old ones.
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="h-8"
          >
            <RefreshCw size={14} />
            Refresh Keys
          </Button>
        </div>
      </div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
  onCopy: () => void;
  copied?: boolean;
  masked?: boolean;
  description?: string;
  children?: React.ReactNode;
}

const CredentialRow = ({
  label,
  value,
  onCopy,
  copied,
  masked,
  description,
  children,
}: RowProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4">
      <label className="w-48 text-sm font-medium">{label}</label>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex-1 flex items-center gap-2 bg-background border border-border rounded px-3 py-2">
          <span
            className={cn(
              "truncate text-muted-foreground text-sm font-mono",
              masked && "blur-sm select-none"
            )}
          >
            {value}
          </span>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={onCopy}
            title="Copy to clipboard"
          >
            {copied ? <span className="text-green-600 text-xs">✔</span> : <Copy size={14} />}
          </Button>
        </div>
        <p className="text-foreground text-sm dark:text-muted-foreground">{description}</p>
        <div className="flex items-center justify-end">{children}</div>
      </div>
    </div>
  );
};
