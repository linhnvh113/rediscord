import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { updateServerSchema } from "@/schemas/server.schema";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json(
        { status: "fail", message: "Unauthorized" },
        { status: 401 },
      );
    }

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const data = await req.json();
    const dataParsed = updateServerSchema.safeParse(data);

    if (dataParsed.success) {
      const server = await db.server.update({
        data: {
          name: dataParsed.data.name,
          imageUrl: dataParsed.data.imageUrl,
        },
        where: {
          id: params.serverId,
        },
      });

      return NextResponse.json(
        { status: "success", message: "OK", data: server },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { status: "fail", message: "Invalid data" },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal server" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.server.delete({
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json("", { status: 200 });
  } catch (error) {
    console.log("[DELETE] /server/:serverId", error);
    return new NextResponse("Internal server", { status: 500 });
  }
}
