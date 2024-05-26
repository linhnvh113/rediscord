import { type NextApiRequest, type NextApiResponse } from "next";

import { currentProfilePageRouter } from "@/lib/current-profile";
import { pusherServer } from "@/lib/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const profile = await currentProfilePageRouter(req);
  if (!profile) return res.status(401).json({ error: "Unauthorized" });

  const socketId = req.body.socket_id as string;
  const channel = req.body.channel_name as string;

  const data = {
    user_id: profile.id,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return res.send(authResponse);
}
