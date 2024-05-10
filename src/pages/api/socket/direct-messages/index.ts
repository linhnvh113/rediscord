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
    const { content, fileUrl, conversationId } = req.body;

    const profile = await currentProfilePageRouter(req);
    if (!profile) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "conversationId id is missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content is missing" });
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
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.directMessage.create({
      data: {
        content: content as string,
        fileUrl: fileUrl as string,
        conversationId: conversationId as string,
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

    const emitKey = `conversationId:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(emitKey, message);

    return res.status(201).json(message);
  } catch (error) {
    console.log("[POST] /messages");
    return res.status(500).json({ message: "Internal Error" });
  }
}
