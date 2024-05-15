import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { memberApi, type ChangeRoleBody } from "@/services/api/member.api";

export const useChangeRoleMember = () => {
  const params = useParams();

  return useMutation({
    mutationFn: (body: ChangeRoleBody) => memberApi.changeRole(body, params),
  });
};

export const useKickMember = () => {
  const params = useParams();

  return useMutation({
    mutationFn: (id: string) => memberApi.kick(id, params),
  });
};
