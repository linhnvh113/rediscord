import type { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppTooltipProps {
  children: ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "end" | "start";
}

export default function AppTooltip({
  children,
  label,
  align,
  side,
}: AppTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="text-sm font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
