import { Menu } from "lucide-react";

import ChannelNav from "@/components/channel-nav";
import ServerNav from "@/components/server-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileToggleProps {
  serverId: string;
}

export default function MobileToggle({ serverId }: MobileToggleProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-20">
          <ServerNav />
        </div>
        <ChannelNav serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
