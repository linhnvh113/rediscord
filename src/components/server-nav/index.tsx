import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { ModeToggle } from "@/components/mode-toggle";
import ServerNavAction from "@/components/server-nav/server-nav-action";
import ServerNavItem from "@/components/server-nav/server-nav-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ServerNav() {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <aside className="sticky top-0 z-30 h-screen">
      <div className="flex h-full flex-col items-center space-y-4 bg-background py-3">
        <ServerNavAction />
        <Separator className="mx-auto h-0.5 w-10 rounded-md" />
        <ScrollArea className="w-full flex-1">
          {servers.map((server) => (
            <ServerNavItem key={server.id} server={server} />
          ))}
        </ScrollArea>
        <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
          <ModeToggle />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "size-12",
              },
            }}
          />
        </div>
      </div>
    </aside>
  );
}
