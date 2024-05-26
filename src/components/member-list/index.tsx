import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import MemberListItem from "@/components/member-list/member-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface MemberListProps {
  serverId: string;
}

export default async function MemberList({ serverId }: MemberListProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const members = await db.member.findMany({
    where: {
      serverId,
    },
    include: {
      profile: true,
    },
  });

  const currentMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  return (
    <div className="h-full bg-background">
      <div className="flex h-12 items-center border-b px-3">Thành viên</div>
      <ScrollArea className="p-1">
        {members?.map((member) => (
          <MemberListItem
            key={member.id}
            currentMember={currentMember}
            member={member}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
