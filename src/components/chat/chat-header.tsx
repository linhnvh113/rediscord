import { Hash } from "lucide-react";

import ChatVideoButton from "@/components/chat/chat-video-button";
import MobileToggle from "@/components/mobile-toggle";
import SocketIndicator from "@/components/socket-indicator";
import UserAvatar from "@/components/user-avatar";

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
    <div className="text-md flex h-12 items-center gap-3 border-b px-3 font-semibold">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Hash />}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="size-8 md:size-8" />
      )}
      <span className="text-md font-semibold">{name}</span>
      <div className="ml-auto flex items-center gap-3">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
}
