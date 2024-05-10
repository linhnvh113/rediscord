export type CreateDirectMessageBody = {
  content: string;
  fileUrl?: string;
  conversationId: string;
};

export type UpdateDirectMessageBody = {
  id: string;
} & Partial<CreateDirectMessageBody>;

export const directMessageApi = {
  create: async (body: CreateDirectMessageBody) => {
    const res = await fetch("/api/socket/direct-messages", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  },

  update: async (body: UpdateDirectMessageBody) => {
    const res = await fetch(`/api/socket/direct-messages/${body.id}`, {
      method: "patch",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  },

  delete: async (id: string) => {
    await fetch(`/api/socket/direct-messages/${id}`, {
      method: "delete",
    });
  },
};
