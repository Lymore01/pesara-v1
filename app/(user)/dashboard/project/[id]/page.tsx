import { Metadata } from "next";
import { Terminal, KeyRound, BarChart2, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projectName = params.id;
  return {
    title: `${decodeURI(projectName)} | Dashboard | Pesara`,
    description: `Manage and configure your ${projectName} project in Pesara.`,
  };
}

export default function Project({ params }: Props) {
  const projectName = decodeURI(params.id);

  return (
    <div className="max-w-3xl mx-auto py-14 px-0 md:px-6 space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">
          🎉 Project Created: <span className="text-primary">{projectName}</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          Welcome to Pesara – your one-stop solution for integrating mobile money payments with
          M-PESA & Airtel Money. Use this dashboard to monitor activity, configure APIs, and start
          accepting payments with ease.
        </p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-md">
        <h2 className="font-semibold text-lg mb-4">🚀 Quick Start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <QuickStep
            icon={KeyRound}
            title="Generate API Keys"
            description="Create secure keys for backend integration."
          />
          <QuickStep
            icon={Terminal}
            title="Hosted Checkout"
            description="Use our pre-built checkout to start collecting money instantly."
          />
          <QuickStep
            icon={BarChart2}
            title="Track Transactions"
            description="View your payment history and get real-time analytics."
          />
          <QuickStep
            icon={FileText}
            title="Read the Docs"
            description={
              <Link
                href="https://pesara.dev/docs"
                target="_blank"
                className="underline text-blue-500"
              >
                View developer documentation
              </Link>
            }
          />
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 text-xs text-muted-foreground">
        💡{" "}
        <span>
          Want to personalize your project? Head to the <strong>Settings</strong> tab to upload a
          logo, add payment provider, manage team access, and configure webhooks.
        </span>
      </div>

      <div className="flex justify-center">
        <Link
          href={`/dashboard/${projectName}/settings`}
          className={cn(
            "px-6 py-3 text-sm rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition"
          )}
        >
          Go to Project Settings
        </Link>
      </div>
    </div>
  );
}

function QuickStep({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-accent p-2 rounded-md text-primary">
        <Icon size={18} />
      </div>
      <div className="space-y-0.5">
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
}
