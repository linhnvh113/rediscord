import qs from "query-string";

import { REQUEST_HEADER } from "@/constants";
import type { QueryObject } from "@/types";
import type {
  CreateMessageBody,
  UpdateMessageBody,
} from "@/types/message.types";

export const messageApi = {
  create: async (body: CreateMessageBody, queryObject?: QueryObject) => {
    const url = qs.stringifyUrl({
      url: "/api/socket/messages",
      query: { ...queryObject },
    });

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: REQUEST_HEADER,
    });

    return res.json();
  },

  update: async (body: UpdateMessageBody, queryObject?: QueryObject) => {
    const url = qs.stringifyUrl({
      url: `/api/socket/messages/${body.id}`,
      query: { ...queryObject },
    });

    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: REQUEST_HEADER,
    });

    return res.json();
  },

  delete: async (id: string, queryObject?: QueryObject) => {
    const url = qs.stringifyUrl({
      url: `/api/socket/messages/${id}`,
      query: { ...queryObject },
    });

    const res = await fetch(url, {
      method: "DELETE",
    });

    return res.json();
  },

  sendAttachment: async (
    body: CreateMessageBody,
    queryObject?: QueryObject,
  ) => {
    const url = qs.stringifyUrl({
      url: "/api/socket/messages",
      query: { ...queryObject },
    });

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: REQUEST_HEADER,
    });

    return res.json();
  },
};
