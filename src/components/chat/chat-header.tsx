import type { Channel, Member } from "@prisma/client";
import { Hash } from "lucide-react";

import MobileToggle from "@/components/mobile-toggle";
import SocketIndicator from "@/components/socket-indicator";

type ChatHeaderProps = {
  type: "channel" | "conversation";
  name: string; // channel name or member name
  serverId: string;
  imageUrl?: string;
};

export default function ChatHeader({
  type,
  name,
  serverId,
  imageUrl,
}: ChatHeaderProps) {
  if (type === "channel") {
  }
  return (
    <div className="text-md flex h-11 items-center border-b px-3 font-semibold">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Hash className="mr-2" />}
      <span className="text-md font-semibold">{name}</span>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
}
