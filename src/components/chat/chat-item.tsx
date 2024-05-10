"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Member } from "@prisma/client";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppTooltip from "@/components/app-tooltip";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import { DATE_FORMAT, ICON_MAP } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn, getFileType } from "@/lib/utils";
import { useUpdateMessage } from "@/services/queries/message.query";
import type { Message } from "@/types";

interface ChatItemProps {
  message: Message;
  currentMember: Member;
}

const formSchema = z.object({
  content: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ChatItem({ message, currentMember }: ChatItemProps) {
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: message.content,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const { onOpen } = useModalStore();

  const fileType = getFileType(message.fileUrl);

  const isAdmin = currentMember.role === "ADMIN";
  const isModerator = currentMember.role === "MODERATOR";
  const isOwner = currentMember.id === message.member.id;

  const canEditMessage = !message.deleted && isOwner && !message.fileUrl;
  const canDeleteMessage =
    !message.deleted && (isAdmin || isModerator || isOwner);

  const isPdf = fileType === "pdf" && message.fileUrl;
  const isImage = !isPdf && message.fileUrl;

  const isLoading = form.formState.isLoading;

  const { mutate: mutateUpdateMessage } = useUpdateMessage();

  const onAvatarClick = () => {
    if (message.member.id === currentMember.id) {
      return;
    }

    router.push(
      `/servers/${params.serverId}/conversations/${message.member.id}`,
    );
  };

  const onSubmit = async (values: FormSchema) => {
    mutateUpdateMessage(
      { id: message.id, values, query: params },
      {
        onSuccess: () => {
          form.reset();
          setIsEditing(false);
        },
      },
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="group relative flex items-center p-4 hover:bg-accent">
      <div className="group flex items-start gap-2">
        <UserAvatar
          src={message.member.profile?.imageUrl}
          onClick={onAvatarClick}
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-sm font-semibold hover:underline">
              {message.member.profile?.name}
            </span>
            <AppTooltip label={message.member.role}>
              {ICON_MAP[message.member.role]}
            </AppTooltip>
            <span className="ml-2 text-xs">
              {format(new Date(message.createdAt), DATE_FORMAT)}
            </span>
          </div>
          {isImage && (
            <Link
              href={message.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-2 flex aspect-square size-48 items-center overflow-hidden rounded-md"
            >
              <Image
                src={message.fileUrl}
                fill
                alt={message.content}
                className="object-cover"
              />
            </Link>
          )}
          {/* {isPdf && <div></div>} */}
          {!message.fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm",
                message.deleted && "mt-1 text-xs italic",
              )}
            >
              {message.content}
              {message.updatedAt !== message.createdAt && !message.deleted && (
                <span className="mx-2 text-xs">(edited)</span>
              )}
            </p>
          )}
          {!message.fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input disabled={isLoading} {...field} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm">
                  Save
                </Button>
              </form>
              <span className="mt-1 text-xs">
                Press esc to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-2 rounded-sm border p-1 group-hover:flex">
          {canEditMessage && (
            <AppTooltip label="Edit">
              <Edit
                className="ml-auto size-4"
                onClick={() => setIsEditing(true)}
              />
            </AppTooltip>
          )}
          <AppTooltip label="Delete">
            <Trash
              className="ml-auto size-4"
              onClick={() => onOpen("DELETE_MESSAGE")}
            />
          </AppTooltip>
        </div>
      )}
    </div>
  );
}
