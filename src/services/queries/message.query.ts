import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { messageApi } from "@/services/api/message.api";
import {
  type CreateMessageBody,
  type UpdateMessageBody,
} from "@/types/message.types";

export const useCreateMessage = () => {
  const params = useParams();

  return useMutation({
    mutationFn: (body: CreateMessageBody) => messageApi.create(body, params),
  });
};

export const useUpdateMessage = () => {
  const params = useParams();

  return useMutation({
    mutationFn: (body: UpdateMessageBody) => messageApi.update(body, params),
  });
};

export const useDeleteMessage = () => {
  const params = useParams();

  return useMutation({
    mutationFn: (id: string) => messageApi.delete(id, params),
  });
};

export const useSendAttachment = () => {
  const params = useParams();

  return useMutation({
    mutationFn: (body: CreateMessageBody) =>
      messageApi.sendAttachment(body, params),
  });
};
