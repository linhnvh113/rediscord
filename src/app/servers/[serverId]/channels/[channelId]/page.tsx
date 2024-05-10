import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface PageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader
        type="channel"
        name={channel.name}
        serverId={params.serverId}
      />
      <ChatMessages
        currentMember={member}
        name={channel.name}
        type="channel"
        apiUrl="/api/messages"
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        type="channel"
        name="general"
        query={{
          serverId: params.serverId,
          channelId: params.channelId,
        }}
      />
    </div>
  );
}
