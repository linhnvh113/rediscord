"use client";

import { MemberRole } from "@prisma/client";
import { ChevronDown, Plus } from "lucide-react";

import AppTooltip from "@/components/app-tooltip";
import ChannelNavItem from "@/components/channel-nav/channel-nav-item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useModalStore } from "@/hooks/use-modal-store";
import type { Channel } from "@/types";

interface ChannelNavSectionProps {
  label: string;
  role?: MemberRole;
  channels: Channel[];
}

export default function ChannelNavSection({
  label,
  role,
  channels,
}: ChannelNavSectionProps) {
  const { onOpen } = useModalStore();

  return (
    <Collapsible defaultOpen className="mt-4">
      <div className="flex items-center justify-between pr-3">
        <CollapsibleTrigger asChild>
          <div className="my-2 flex items-center justify-between">
            <p className="flex flex-1 cursor-pointer select-none items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent-foreground">
              <ChevronDown className="size-3" />
              <span>{label}</span>
            </p>
          </div>
        </CollapsibleTrigger>
        {role !== MemberRole.GUEST && (
          <AppTooltip label="Tạo kênh" side="top">
            <button type="button" onClick={() => onOpen("CHANNEL")}>
              <Plus className="size-4 text-muted-foreground hover:text-accent-foreground" />
            </button>
          </AppTooltip>
        )}
      </div>

      <CollapsibleContent className="space-y-1">
        {channels.map((channel) => (
          <ChannelNavItem key={channel.id} channel={channel} role={role} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
