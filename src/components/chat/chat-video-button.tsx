"use client";

import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AppTooltip from "@/components/app-tooltip";

export default function ChatVideoButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const handleClick = () => {
    isVideo
      ? router.push(pathname ?? "")
      : router.push(`${pathname}?video=${isVideo ? undefined : true}`);
  };

  const Icon = isVideo ? VideoOff : Video;
  const label = isVideo ? "End video call" : "Start video call";

  return (
    <AppTooltip side="bottom" label={label}>
      <button onClick={handleClick}>
        <Icon className="size-6" />
      </button>
    </AppTooltip>
  );
}
