/* eslint-disable */

import { db } from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import webPush, { WebPushError } from "web-push";

export async function POST(req: Request) {
  try {
    // const event = await req.json();

    // const event = JSON.parse(rawBody);

    // console.log("Push web hook body: ", JSON.stringify(event));

    // const recipients = await db.member.findMany({
    //   where: {
    //     serverId: "49511e11-6c9a-4daa-9dc5-f062dc69a7c5",
    //   },
    // });

    const server = await db.server.findFirst({
      where: {
        id: "49511e11-6c9a-4daa-9dc5-f062dc69a7c5",
      },
      include: {
        members: {
          include: { profile: true },
        },
      },
    });

    const recipientIds = server!.members.map((member) => member.profile.userId);
    // .filter((id) => id !== sender.id);
    // const channelId = event.channel.id;

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
                // title: sender.name,
                // body: event.message.text,
                // icon: sender.image,
                // image:
                //   event.message.attachments[0]?.image_url ||
                //   event.message.attachments[0]?.thumb_url,
                // channelId,
                title: "test noti",
              }),
              {
                vapidDetails: {
                  subject: "mailto:florian@flowchat.com",
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
