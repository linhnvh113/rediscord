import type { NextApiRequest } from "next";

import { currentProfilePageRouter } from "@/lib/current-profile";
import { db } from "@/lib/db";
import type { NextApiResponseSocket } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseSocket,
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePageRouter(req);
    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const { content, conversationId } = req.body;
    const { directMessageId } = req.query;

    if (!directMessageId) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id,
            },
          },
          {
            memberTwo: {
              profileId: profile.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!conversation) {
      return res
        .status(404)
        .json({ error: "No conversation found with this id." });
    }

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return res.status(404).json({ error: "No member found with this id." });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!directMessage || directMessage.deleted) {
      return res
        .status(404)
        .json({ error: "No direct message found with this id." });
    }

    const isMessageOwner = directMessage.memberId === member.id;
    const isAdmin = member.role === "ADMIN";
    const isModerator = member.role === "MODERATOR";
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return res.status(403).json({ error: "No permission" });
    }

    if (req.method === "DELETE") {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
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

      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
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

    const emitKey = `chat:${conversation.id}:messages:update`;
    res.socket.server.io.emit(emitKey, directMessage);

    return res.status(200).json(directMessage);
  } catch (error) {
    console.log("[]");
    return res.status(500).json({ error: "Internal Server" });
  }
}
