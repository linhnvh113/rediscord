import { Users } from "lucide-react";

import MemberList from "@/components/member-list";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ToggleMemberListProps {
  serverId: string;
}

export default function ToggleMemberList({ serverId }: ToggleMemberListProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Users />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <MemberList serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
