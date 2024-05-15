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
      className="mb-2 flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:bg-accent"
      onClick={onClickMember}
    >
      <UserAvatar src={member.profile?.imageUrl} />
      <h4>{member.profile?.name}</h4>
    </div>
  );
}
