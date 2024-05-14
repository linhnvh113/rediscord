import type { ChannelType } from "@prisma/client";

export type CreateChannelBody = {
  name: string;
  type: ChannelType;
  serverId: string;
};

export type UpdateChannelBody = {
  id: string;
} & Partial<CreateChannelBody>;

export const channelApi = {
  create: async (body: CreateChannelBody) => {
    const res = await fetch("/api/channels", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return res.json();
  },

  update: async (body: UpdateChannelBody) => {
    const res = await fetch(`/api/channels/${body.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return res.json();
  },

  delete: async (id: string) => {
    await fetch(`/api/channels/${id}`, {
      method: "DELETE",
    });
  },
};
