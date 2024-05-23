import type { ReactNode } from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ChannelNav from "@/components/channel-nav";
import MemberList from "@/components/member-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface LayoutProps {
  children: ReactNode;
  params: {
    serverId: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_240px]">
      <div className="hidden md:block">
        <ChannelNav serverId={params.serverId} />
      </div>
      <main className="flex-1">{children}</main>
      <div className="hidden lg:block">
        <MemberList members={server.members} />
      </div>
    </div>
  );
}
