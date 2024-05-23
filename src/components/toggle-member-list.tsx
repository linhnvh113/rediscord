import { Users } from "lucide-react";

import MemberList from "@/components/member-list";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Member } from "@/types";

interface ToggleMemberListProps {
  members?: Member[];
}

export default function ToggleMemberList({ members }: ToggleMemberListProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Users />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-1/2 p-0">
        <MemberList members={members} />
      </SheetContent>
    </Sheet>
  );
}
