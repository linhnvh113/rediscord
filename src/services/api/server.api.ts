export type CreateServerBody = {
  name: string;
  imageUrl: string;
};

export type UpdateServerBody = {
  id: string;
} & Partial<CreateServerBody>;

export const serverApi = {
  create: async (body: CreateServerBody) => {
    const response = await fetch("/api/servers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return response.json();
  },

  update: async (body: UpdateServerBody) => {
    const response = await fetch(`/api/server/${body.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return response.json();
  },

  generateInviteCode: async (serverId: string) => {
    const response = await fetch(`/api/servers/${serverId}/invite-code`, {
      method: "PATCH",
    });

    return response.json();
  },
};
