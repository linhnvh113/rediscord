"use client";

import type { Server } from "@prisma/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import AppTooltip from "@/components/app-tooltip";
import { cn } from "@/lib/utils";

interface ServerNavItemProps {
  server: Server;
}

export default function ServerNavItem({ server }: ServerNavItemProps) {
  const { id, name, imageUrl } = server;

  const router = useRouter();
  const params = useParams();

  return (
    <AppTooltip side="right" align="center" label={name}>
      <div className="group relative mb-2 flex items-center">
        <div
          className={cn(
            "absolute left-0 w-1 rounded-r-full bg-background transition-all",
            params?.serverId !== id && "group-hover:h-5",
            params?.serverId === id ? "h-9" : "h-2",
          )}
        />
        <button
          type="button"
          className={cn(
            "group relative mx-auto flex size-12 overflow-hidden rounded-3xl transition-all group-hover:rounded-2xl",
            params?.serverId === id && "rounded-2xl bg-background/10",
          )}
          onClick={() => {
            router.push(`/servers/${id}`);
          }}
        >
          <Image
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={name}
            priority
          />
        </button>
      </div>
    </AppTooltip>
  );
}
