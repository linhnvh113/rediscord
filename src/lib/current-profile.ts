import { auth, getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};

export const currentProfilePageRouter = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
