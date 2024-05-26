"use client";

import { useParams, useRouter } from "next/navigation";

import UserAvatar from "@/components/user-avatar";
import { useMemberStore } from "@/hooks/use-member-store";
import { cn } from "@/lib/utils";
import type { ConversationParams, Member } from "@/types";

interface MemberListItemProps {
  member: Member;
  currentMember: Member;
}

export default function MemberListItem({
  member,
  currentMember,
}: MemberListItemProps) {
  const router = useRouter();
  const params = useParams<ConversationParams>();

  const { members } = useMemberStore();

  const isOnline = members.includes(member.profileId);

  const onClickMember = () => {
    if (member.id === currentMember.id) return;
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <div
      className={cn(
        "mb-2 flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:bg-accent",
        isOnline ? "" : "opacity-30",
      )}
      onClick={onClickMember}
    >
      <div className="relative">
        <UserAvatar src={member.profile?.imageUrl} className="relative" />
        <div
          className={cn(
            "absolute bottom-0 right-0 z-10 size-3 rounded-full",
            isOnline ? "bg-green-500" : "hidden",
          )}
        />
      </div>

      <h4>{member.profile?.name}</h4>
    </div>
  );
}
