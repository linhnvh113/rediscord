/* eslint-disable */

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import webPush, { WebPushError } from "web-push";

export async function POST(req: Request) {
  try {
    const { serverId, channelId, body } = await req.json();

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized");
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
      },
      include: {
        members: {
          include: { profile: true },
        },
      },
    });

    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    const recipientIds = server!.members
      .map((member) => member.profile.userId)
      .filter((id) => id !== profile.userId);

    console.log(recipientIds);

    if (!recipientIds.length) {
      return NextResponse.json({ message: "no recipients" });
    }

    const recipients = await clerkClient.users.getUserList({
      userId: recipientIds,
    });

    const pushPromises = recipients.data
      .map((recipient) => {
        const subscriptions = recipient.privateMetadata.subscriptions || [];
        return subscriptions.map((subscription) =>
          webPush
            .sendNotification(
              subscription,
              JSON.stringify({
                title: `${profile.name} (${server?.name} - #${channel?.name})`,
                body,
                icon: profile.imageUrl,
                data: {
                  serverId,
                  channelId,
                },
              }),
              {
                vapidDetails: {
                  subject: "mailto:linhnguyen11032002@gmail.com",
                  publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
                  privateKey: process.env.NEXT_PUBLIC_WEB_PUSH_PRIVATE_KEY!,
                },
              },
            )
            .catch((error) => {
              console.error("Error sending push notification: ", error);
              if (error instanceof WebPushError && error.statusCode === 410) {
                console.log("Push subscription expired, deleting...");

                clerkClient.users.updateUser(recipient.id, {
                  privateMetadata: {
                    subscriptions:
                      recipient.privateMetadata.subscriptions?.filter(
                        (s) => s.endpoint !== subscription.endpoint,
                      ),
                  },
                });
              }
            }),
        );
      })
      .flat();

    await Promise.all(pushPromises);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
