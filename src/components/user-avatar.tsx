import type { HTMLAttributes } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
}

export default function UserAvatar({
  src,
  className,
  ...props
}: UserAvatarProps) {
  // Implement your component logic and rendering here

  return (
    <Avatar className={cn("size-7 md:size-10", className)} {...props}>
      <AvatarImage src={src} />
    </Avatar>
  );
}
