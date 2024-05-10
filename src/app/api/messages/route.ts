import type { Message } from "@prisma/client";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");
    if (!channelId) {
      return new NextResponse("Channel id is missing", {
        status: 400,
      });
    }

    let messages: Message[] = [];
    if (cursor) {
      messages = await db.message.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: 10,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (messages.length === 10) {
      nextCursor = messages[10 - 1].id;
    }

    return NextResponse.json(
      {
        items: messages,
        nextCursor,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("[GET] /messages");
    return new NextResponse("Internal Server", {
      status: 500,
    });
  }
}
