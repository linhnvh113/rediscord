import type { NextApiRequest, NextApiResponse } from "next";

import { currentProfilePageRouter } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const { content, fileUrl, serverId, channelId } = req.body;

    const profile = await currentProfilePageRouter(req);
    if (!profile) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(400).json({ error: "Server id is missing" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel id is missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content is missing" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = server?.members.find(
      (member) => member.profileId === profile.id,
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        content: content as string,
        fileUrl: fileUrl as string,
        channelId: channel.id,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const emitKey = `channelId:${channel.id}:messages`;

    res?.socket?.server?.io?.emit(emitKey, message);

    return res.status(201).json(message);
  } catch (error) {
    console.log("[POST] /messages");
    return res.status(500).json({ message: "Internal Error" });
  }
}
