import { useMutation } from "@tanstack/react-query";

import { serverApi } from "@/services/api/server.api";

export const useCreateServer = () => {
  return useMutation({
    mutationFn: serverApi.create,
  });
};

export const useUpdateServer = () => {
  return useMutation({
    mutationFn: serverApi.update,
  });
};

export const useDeleteServer = () => {
  return useMutation({
    mutationFn: serverApi.delete,
  });
};

export const useGenerateInviteCode = () => {
  return useMutation({
    mutationFn: serverApi.generateInviteCode,
  });
};
