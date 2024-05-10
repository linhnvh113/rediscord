"use client";

import { useParams, useRouter } from "next/navigation";

import UserAvatar from "@/components/user-avatar";
import type { Member } from "@/types";

interface MemberListItemProps {
  member: Member;
}

export default function MemberListItem({ member }: MemberListItemProps) {
  const router = useRouter();
  const params = useParams<{ serverId: string }>();

  const onClickMember = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <div
      className="mb-4 flex cursor-pointer items-center gap-2 rounded p-1.5 hover:bg-zinc-700"
      onClick={onClickMember}
    >
      <UserAvatar src={member.profile?.imageUrl} className="size-2" />
      <h4>{member.profile?.name}</h4>
    </div>
  );
}
