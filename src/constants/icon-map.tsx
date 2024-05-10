import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

export const ICON_MAP = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 size-4 text-primary" />,
  ADMIN: <ShieldAlert className="ml-2 size-4 text-destructive" />,
};

export const CHANNEL_ICON_MAP = {
  TEXT: <Hash className="mr-2 size-4" />,
  VOICE: <Mic className="mr-2 size-4" />,
  VIDEO: <Video className="mr-2 size-4" />,
};
