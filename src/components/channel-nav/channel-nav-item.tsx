"use client";

import type { MouseEvent } from "react";

import { type Channel, MemberRole } from "@prisma/client";
import { Edit, Lock, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import AppTooltip from "@/components/app-tooltip";
import { Button } from "@/components/ui/button";
import { CHANNEL_ICON_MAP } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

interface ChannelNavItemProps {
  channel: Channel;
  role?: MemberRole;
}

export default function ChannelNavItem({ channel, role }: ChannelNavItemProps) {
  const router = useRouter();
  const params = useParams<{ serverId: string; channelId: string }>();

  const { onOpen } = useModalStore();

  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    onOpen("CHANNEL", { channel });
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    onOpen("DELETE_CHANNEL", { channel });
  };

  const handleClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "group w-full justify-start px-2 text-muted-foreground",
        params?.channelId === channel.id && "bg-accent text-accent-foreground",
      )}
      onClick={handleClick}
    >
      {CHANNEL_ICON_MAP[channel.type]}
      <span className="line-clamp-1 text-sm font-semibold">{channel.name}</span>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2">
          <AppTooltip label="Edit">
            <Edit
              className="hidden size-4 group-hover:block"
              onClick={handleEditClick}
            />
          </AppTooltip>
          <AppTooltip label="Delete">
            <Trash
              className="hidden size-4 group-hover:block"
              onClick={handleDeleteClick}
            />
          </AppTooltip>
        </div>
      )}
      {channel.name === "general" && <Lock className="ml-auto size-4" />}
    </Button>
  );
}
