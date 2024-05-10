import { useMutation } from "@tanstack/react-query";

import { directMessageApi } from "@/services/api/direct-message.api";

export const useCreateDM = () => {
  return useMutation({
    mutationFn: directMessageApi.create,
  });
};

export const useUpdateDM = () => {
  return useMutation({
    mutationFn: directMessageApi.update,
  });
};

export const useDeleteDM = () => {
  return useMutation({
    mutationFn: directMessageApi.delete,
  });
};
