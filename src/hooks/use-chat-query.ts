import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import qs from "query-string";

import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();
  const params = useParams();

  const fetchMessages = async ({ pageParam }: { pageParam?: string }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true },
    );

    const response = await fetch(url);
    return response.json();
  };

  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => fetchMessages({ pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchInterval: isConnected ? false : 1000,
  });
};
