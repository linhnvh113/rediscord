import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const { name, imageUrl } = await req.json();

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      data: {
        name: name as string,
        imageUrl: imageUrl as string,
      },
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[PATCH] /server/:serverId", error);
    return new NextResponse("Internal server", { status: 500 });
  }
}
