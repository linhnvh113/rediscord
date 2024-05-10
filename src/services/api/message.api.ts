import qs from "query-string";

import { MESSAGE_API_URL } from "@/constants";

type CreateMessageBody = {
  content: string;
  fileUrl?: string;
  serverId: string;
  channelId: string;
};

type UpdateMessageBody = {
  id: string;
} & Partial<CreateMessageBody>;

export const messageApi = {
  create: async (body: CreateMessageBody) => {
    const res = await fetch("/api/socket/messages", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  },

  update: async (body: UpdateMessageBody) => {
    const res = await fetch(`/api/socket/messages/${body.id}`, {
      method: "patch",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  },

  delete: async (id: string) => {
    await fetch("", {
      method: "delete",
    });
  },
};
