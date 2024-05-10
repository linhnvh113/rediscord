"use client";

import type { MouseEvent } from "react";

import { MemberRole } from "@prisma/client";
import { ChevronDown, Plus } from "lucide-react";

import AppTooltip from "@/components/app-tooltip";
import ChannelNavItem from "@/components/channel-nav/channel-nav-item";
import { Button } from "@/components/ui/button";
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

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onOpen("CHANNEL");
  };

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <div className="flex cursor-pointer select-none items-center justify-between">
          <ChevronDown className="size-4" />
          <p className="flex-1 text-xs font-semibold uppercase">{label}</p>
          {role !== MemberRole.GUEST && (
            <AppTooltip label="Create Channel" side="top">
              <Button
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={handleClick}
              >
                <Plus className="size-4" />
              </Button>
            </AppTooltip>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {channels.map((channel) => (
          <ChannelNavItem key={channel.id} channel={channel} role={role} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
