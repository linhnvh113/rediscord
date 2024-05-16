"use client";

import { useEffect, useState } from "react";

import type { Channel } from "@prisma/client";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import UserAvatar from "@/components/user-avatar";
import { CHANNEL_ICON_MAP, ICON_MAP } from "@/constants";
import type { Member } from "@/types";

interface ChannelNavSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data: Channel[] | Member[];
  }[];
}

export default function ChannelNavSearch({ data }: ChannelNavSearchProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams<{ serverId: string }>();

  const handleItemSelect = ({
    type,
    id,
  }: {
    type: "channel" | "member";
    id: string;
  }) => {
    setOpen(false);

    return type === "member"
      ? router.push(`/servers/${params?.serverId}/conversations/${id}`)
      : router.push(`/servers/${params?.serverId}/channels/${id}`);
  };

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", keydown);

    return () => document.removeEventListener("keydown", keydown);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <p className="text-sm font-semibold">Search</p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">CTRL</span>
          <span>K</span>
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map((d) => (
                  <CommandItem
                    key={d.id}
                    onSelect={() => handleItemSelect({ type, id: d.id })}
                    // className="flex items-center gap-2"
                  >
                    {type === "channel" ? (
                      <>
                        {CHANNEL_ICON_MAP[d.type]}
                        <span>{d.name}</span>
                      </>
                    ) : (
                      <>
                        <UserAvatar src={d.profile.imageUrl} />
                        {ICON_MAP[d.role]}
                        <span>{d.profile.name}</span>
                      </>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
