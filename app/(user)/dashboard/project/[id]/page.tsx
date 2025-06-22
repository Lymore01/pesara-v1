import { Metadata } from "next";
import Success from "@/features/dashboard/components/success-screen";
import { stats } from "@/features/dashboard/lib/constants";
import { StatsCard } from "@/features/dashboard/lib/types";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/features/dashboard/lib/utils";
import { Separator } from "@/components/ui/separator";
import PaymentLogs from "@/features/dashboard/components/tables/payments/page";

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
  return (
    // display on configured projects only
    // <Success params={params} />
    <div className="min-h-screen space-y-8">
      <HeaderSection projectName={params.id} />
      <Separator />
      <PaymentLogs />
    </div>
  );
}

const HeaderSection = ({ projectName }: { projectName: string }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-2xl">{projectName}</h1>
      <div className="flex gap-2 items-center">
        {stats.map((stat: StatsCard) => (
          <StatusCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
};

const StatusCard = ({ stat }: { stat: StatsCard }) => {
  return (
    <div
      className={cn(
        "rounded-sm border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2 cursor-pointer hover:bg-accent transition-colors group relative",
        stat.title === "Total Revenue" && "bg-brand hover:bg-brand-accent"
      )}
    >
      <h1 className="text-sm text-muted-foreground">{stat.title}</h1>
      <p
        className={cn("font-semibold text-xl", stat.title === "Failed Payments" && stat.classNames)}
      >
        {stat.title === "Total Revenue" ? <span>ksh. {formatMoney(stat.value)}</span> : stat.value}
      </p>
    </div>
  );
};
