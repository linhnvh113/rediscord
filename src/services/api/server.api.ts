import type { CreateServerDto, UpdateServerDto } from "@/schemas/server.schema";

export const serverApi = {
  create: async (createServerDto: CreateServerDto) => {
    const res = await fetch("/api/servers", {
      method: "POST",
      body: JSON.stringify(createServerDto),
    });

    return res.json();
  },

  update: async (updateServerDto: UpdateServerDto) => {
    const res = await fetch(`/api/servers/${updateServerDto.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateServerDto),
    });

    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`/api/servers/${id}`, {
      method: "DELETE",
    });

    return res.json();
  },

  generateInviteCode: async (serverId: string) => {
    const res = await fetch(`/api/servers/${serverId}/invite-code`, {
      method: "PATCH",
    });

    return res.json();
  },
};
