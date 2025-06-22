import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Users } from "lucide-react";

export default function PesaraTooltip({ content }: { content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info size={12} />
      </TooltipTrigger>
      <TooltipContent className="bg-accent max-w-sm" align="end">
        <p className="text-foreground dark:text-muted-foreground">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
