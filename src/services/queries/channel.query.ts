import { useMutation } from "@tanstack/react-query";

import { channelApi } from "@/services/api/channel.api";

export const useCreateChannel = () => {
  return useMutation({
    mutationFn: channelApi.create,
  });
};

export const useUpdateChannel = () => {
  return useMutation({
    mutationFn: channelApi.update,
  });
};

export const useDeleteChannel = () => {
  return useMutation({
    mutationFn: channelApi.delete,
  });
};
