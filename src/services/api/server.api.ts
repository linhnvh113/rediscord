export type CreateServerBody = {
  name: string;
  imageUrl: string;
};

export type UpdateServerBody = {
  id: string;
} & Partial<CreateServerBody>;

export const serverApi = {
  create: async (body: CreateServerBody) => {
    const res = await fetch("/api/servers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return res.json();
  },

  update: async (body: UpdateServerBody) => {
    const res = await fetch(`/api/servers/${body.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
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
