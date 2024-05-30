import type {
  CreateChannelDto,
  UpdateChannelDto,
} from "@/schemas/channel.schema";

export const channelApi = {
  create: async (createChannelDto: CreateChannelDto) => {
    const res = await fetch("/api/channels", {
      method: "POST",
      body: JSON.stringify(createChannelDto),
    });

    return res.json();
  },

  update: async (updateChannelDto: UpdateChannelDto) => {
    const res = await fetch(`/api/channels/${updateChannelDto.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateChannelDto),
    });

    return res.json();
  },

  delete: async (id: string) => {
    await fetch(`/api/channels/${id}`, {
      method: "DELETE",
    });
  },
};
