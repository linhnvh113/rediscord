import MemberListItem from "@/components/member-list/member-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Member } from "@/types";

interface MemberListProps {
  members?: Member[];
}

export default function MemberList({ members }: MemberListProps) {
  return (
    <div className="h-full bg-background">
      <div className="flex h-12 items-center border-b px-3">Thành viên</div>
      <ScrollArea className="p-1">
        {members.map((member) => (
          <MemberListItem key={member.id} member={member} />
        ))}
      </ScrollArea>
    </div>
  );
}
