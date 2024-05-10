import MemberListItem from "@/components/member-list/member-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Member } from "@/types";

interface MemberListProps {
  members: Member[];
}

export default function MemberList({ members }: MemberListProps) {
  return (
    <div className="h-full border-l bg-background">
      <ScrollArea className="px-3 py-8">
        {members.map((member) => (
          <MemberListItem key={member.id} member={member} />
        ))}
      </ScrollArea>
    </div>
  );
}
