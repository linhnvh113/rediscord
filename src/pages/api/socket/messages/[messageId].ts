import type { NextApiRequest, NextApiResponse } from "next";

import { currentProfilePageRouter } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePageRouter(req);
    const { messageId, serverId, channelId } = req.query;
    const { content } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!channelId) {
      return res.status(401).json({ error: "Unauthorized" });
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
      return;
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return;
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id,
    );

    if (!member) {
      return;
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      return;
    }

    const isMessageOwner = message.memberId === member.id;
    const isAdmin = member.role === "ADMIN";
    const isModerator = member.role === "MODERATOR";
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return;
    }

    if (req.method === "DELETE") {
      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return;
      }

      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content: content as string,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    const emitKey = `channelId:${channel.id}:messages:update`;
    res.socket.server.io.emit(emitKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[]");
    return res.status(500).json({ err: "internal server" });
  }
}
