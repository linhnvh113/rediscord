"use client";

import { Fragment, useRef, type ElementRef, useEffect } from "react";

import { Loader2, ServerCrash } from "lucide-react";

import ChatItem from "@/components/chat/chat-item";
import ChatWelcome from "@/components/chat/chat-welcome";
import { Button } from "@/components/ui/button";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { registerServiceWorker } from "@/lib/serviceWorker";
import type { Group, Member, Message } from "@/types";

interface ChatMessagesProps {
  type: "channel" | "conversation";
  name: string; // Channel name or member name
  currentMember: Member;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export default function ChatMessages({
  currentMember,
  name,
  type,
  apiUrl,
  paramKey,
  paramValue,
}: ChatMessagesProps) {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const queryKey = `chat:${paramValue}`;
  const addKey = `chat:${paramValue}:messages`;
  const updateKey = `chat:${paramValue}:messages:update`;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.error(error);
      }
    }
    void setUpServiceWorker();
  }, []);

  useChatSocket({ addKey, updateKey, queryKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="my-4 size-7 animate-spin" />
        <p className="text-xs">Loading messages...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
        <ServerCrash className="my-4 size-7" />
        <p className="text-xs">Something went wrong!</p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex flex-1 flex-col overflow-y-auto py-4">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="my-4 size-6 animate-spin" />
          ) : (
            <Button
              variant="link"
              onClick={() => fetchNextPage()}
              className="italic text-muted-foreground"
            >
              Load previous messages
            </Button>
          )}
        </div>
      )}
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages.map((group: Group, i) => (
          <Fragment key={i}>
            {group.items.map((message: Message) => (
              <ChatItem
                key={message.id}
                type={type}
                message={message}
                currentMember={currentMember}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
