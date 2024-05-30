import { MemberRole } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { createServerSchema } from "@/schemas/server.schema";

export async function POST(req: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const data = await req.json();
    const dataParsed = createServerSchema.safeParse(data);

    if (dataParsed.success) {
      const server = await db.server.create({
        data: {
          ...dataParsed.data,
          profileId: profile.id,
          channels: {
            create: {
              name: "general",
              profileId: profile.id,
            },
          },
          members: {
            create: {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          },
        },
      });

      return NextResponse.json({
        status: "success",
        message: "Created",
        data: server,
      });
    } else {
      return NextResponse.json({
        status: "fail",
        message: "Invalid data",
        error: dataParsed.error,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal server", error },
      { status: 500 },
    );
  }
}
