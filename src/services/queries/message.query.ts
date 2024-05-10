import { useMutation } from "@tanstack/react-query";

import { messageApi } from "@/services/api/message.api";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: messageApi.create,
  });
};

export const useUpdateMessage = () => {
  return useMutation({
    mutationFn: messageApi.update,
  });
};

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: messageApi.delete,
  });
};
