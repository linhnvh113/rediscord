import { NextResponse } from "next/server";
import { v4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    console.log("run here");

    const server = await db.server.update({
      data: {
        inviteCode: v4(),
      },
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("PATCH /server/:serverId/invite-code");
    return new NextResponse("Internal Server", { status: 500 });
  }
}
