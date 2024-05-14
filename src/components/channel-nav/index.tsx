import { auth } from "@clerk/nextjs/server";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import ChannelNavHeader from "@/components/channel-nav/channel-nav-header";
import ChannelNavSearch from "@/components/channel-nav/channel-nav-search";
import ChannelNavSection from "@/components/channel-nav/channel-nav-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ChannelNavProps {
  serverId: string;
}

export default async function ChannelNav({ serverId }: ChannelNavProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const server = await db.server.findFirst({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const voiceChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VOICE,
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role;

  const searchData = [
    {
      label: "Text Channels",
      channels: textChannels,
    },
    {
      label: "Voice Channels",
      channels: voiceChannels,
    },
    {
      label: "Video Channels",
      channels: videoChannels,
    },
  ];

  return (
    <aside className="sticky top-0 h-screen">
      <div className="flex h-full flex-col border-x bg-background">
        <ChannelNavHeader server={server} role={role} />
        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
            <ChannelNavSearch data={searchData} />
          </div>
          <Separator className="my-2" />
          {!!textChannels?.length && (
            <ChannelNavSection
              label="Text Channels"
              role={role}
              channels={textChannels}
            />
          )}
          {!!voiceChannels?.length && (
            <ChannelNavSection
              label="Voice Channels"
              role={role}
              channels={voiceChannels}
            />
          )}
          {!!videoChannels?.length && (
            <ChannelNavSection
              label="Video Channels"
              role={role}
              channels={videoChannels}
            />
          )}
        </ScrollArea>
      </div>
    </aside>
  );
}
