import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  type: "channel" | "conversation";
  name: string;
}

export default function ChatWelcome({ type, name }: ChatWelcomeProps) {
  return (
    <div className="mb-4 space-y-2 px-4">
      {type === "channel" && (
        <div className="flex size-20 items-center justify-center rounded-full bg-accent">
          <Hash className="size-12" />
        </div>
      )}
      <p className="text-xl font-bold md:text-3xl">
        {type === "channel" ? `Chào mừng bạn đến với #${name}!` : `${name}`}
      </p>
      <p className="text-sm text-muted-foreground">
        {type === "channel"
          ? `Đây là sự khởi đầu của kênh #${name}.`
          : `Đây là phần mở đầu trong lịch sử các tin nhắn trực tiếp của bạn với ${name}.`}
      </p>
    </div>
  );
}
