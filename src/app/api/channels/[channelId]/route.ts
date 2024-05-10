import type { ChannelType } from "@prisma/client";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } },
) {
  try {
    const { searchParams } = new URL(req.url);

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const { name, type } = await req.json();

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    const channel = await db.channel.update({
      data: {
        name: name as string,
        type: type as ChannelType,
      },
      where: {
        id: params.channelId,
        serverId,
      },
    });

    return NextResponse.json(channel, { status: 200 });
  } catch (error) {
    console.log("[PATCH] /channels/:channelId", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } },
) {}
