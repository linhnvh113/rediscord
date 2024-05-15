import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

export const ICON_MAP = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 size-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="ml-2 size-4 text-destructive" />,
};

export const CHANNEL_ICON_MAP = {
  TEXT: <Hash className="mr-2 size-4 text-muted-foreground" />,
  VOICE: <Mic className="mr-2 size-4 text-muted-foreground" />,
  VIDEO: <Video className="mr-2 size-4 text-muted-foreground" />,
};
