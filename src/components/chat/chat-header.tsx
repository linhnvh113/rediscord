import { Hash } from "lucide-react";

import ChatVideoButton from "@/components/chat/chat-video-button";
import MobileToggle from "@/components/mobile-toggle";
import SocketIndicator from "@/components/socket-indicator";
import ToggleMemberList from "@/components/toggle-member-list";
import UserAvatar from "@/components/user-avatar";
import type { Member } from "@/types";

type ChatHeaderProps = {
  type: "channel" | "conversation";
  name: string; // channel name or member name
  serverId: string;
  imageUrl?: string;
  members?: Member[];
};

export default function ChatHeader({
  type,
  name,
  serverId,
  imageUrl,
  members,
}: ChatHeaderProps) {
  if (type === "channel") {
  }
  return (
    <div className="text-md flex h-12 items-center gap-3 border-b px-3 font-semibold">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Hash className="text-muted-foreground" />}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="size-8 md:size-8" />
      )}
      <span className="text-md font-semibold">{name}</span>
      <div className="ml-auto flex items-center gap-3">
        {type === "conversation" && <ChatVideoButton />}
        <ToggleMemberList members={members} />
        <SocketIndicator />
      </div>
    </div>
  );
}
