import { useEffect } from "react";

import { useQueryClient, type InfiniteData } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import type { Group, Message } from "@/types";

interface ChatSocketProps {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on(updateKey, (message: Message) => {
      queryClient.setQueryData(
        [queryKey],
        (oldData: InfiniteData<Group, unknown>) => {
          if (!oldData?.pages || oldData.pages.length === 0) {
            return oldData;
          }

          const newData = oldData.pages.map((page: Group) => {
            return {
              ...page,
              items: page.items.map((item) =>
                item.id === message.id ? message : item,
              ),
            };
          });

          return {
            ...oldData,
            pages: newData,
          };
        },
      );
    });

    socket.on(addKey, (message: Message) => {
      queryClient.setQueryData(
        [queryKey],
        (oldData: InfiniteData<Group, unknown>) => {
          if (!oldData?.pages || oldData.pages.length === 0) {
            return {
              pages: [
                {
                  items: [message],
                },
              ],
            };
          }

          const newData = [...oldData.pages];

          newData[0] = {
            ...newData[0],
            items: [message, ...newData[0].items],
          };

          return {
            ...oldData,
            pages: newData,
          };
        },
      );
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, updateKey, queryKey, socket]);
};
