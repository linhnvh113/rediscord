import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import MediaRoom from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface PageProps {
  params: {
    serverId: string;
    memberId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId,
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;
  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader
        type="conversation"
        serverId={params.serverId}
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
      />
      {searchParams.video && (
        <MediaRoom chatId={conversation.id} video={true} audio={true} />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            type="conversation"
            currentMember={currentMember}
            name={otherMember.profile.name}
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
          />
          <ChatInput
            type="conversation"
            name={otherMember.profile.name}
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
}
