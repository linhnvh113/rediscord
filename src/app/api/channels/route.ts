import type { ChannelType } from "@prisma/client";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
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

    if (name === "general") {
      return new NextResponse("Channel name cannot be 'general'", {
        status: 404,
      });
    }

    const channel = await db.channel.create({
      data: {
        name: name as string,
        type: type as ChannelType,
        serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    console.log("[POST] /channels", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
