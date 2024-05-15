import type { MemberRole } from "@prisma/client";
import qs from "query-string";

import type { QueryObject } from "@/types";

export type ChangeRoleBody = {
  id: string;
  role: MemberRole;
};

export const memberApi = {
  changeRole: async (body: ChangeRoleBody, queryObject?: QueryObject) => {
    const url = qs.stringifyUrl({
      url: `/api/members/${body.id}`,
      query: { ...queryObject },
    });

    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return res.json();
  },

  kick: async (id: string, queryObject?: QueryObject) => {
    const url = qs.stringifyUrl({
      url: `/api/members/${id}`,
      query: { ...queryObject },
    });

    const res = await fetch(url, {
      method: "DELETE",
    });

    return res.json();
  },
};
