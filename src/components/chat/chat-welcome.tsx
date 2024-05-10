import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  type: "channel" | "conversation";
  name: string;
}

export default function ChatWelcome({ type, name }: ChatWelcomeProps) {
  return (
    <div className="mb-4 space-y-2 px-4">
      {type === "channel" && (
        <div className="flex size-20 items-center justify-center rounded-full">
          <Hash className="size-12" />
        </div>
      )}
      <p className="text-xl font-bold md:text-3xl">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-sm">
        {type === "channel"
          ? `This is the start of the ${name} channel`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
}
