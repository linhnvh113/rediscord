"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import EmojiPicker from "@/components/emoji-picker";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateDM } from "@/services/queries/direct-message.query";
import { useCreateMessage } from "@/services/queries/message.query";

interface ChatInputProps {
  type: "channel" | "conversation";
  name: string;
  query: Record<string, string>;
}

const formSchema = z.object({
  content: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ChatInput({ type, name, query }: ChatInputProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: mutateCreateMessage } = useCreateMessage();
  const { mutate: mutateCreateDM } = useCreateDM();

  const isLoading = form.formState.isLoading;

  const onSubmit = async (body: FormSchema) => {
    if (type === "channel") {
      mutateCreateMessage(
        { ...body, channelId: query.channelId, serverId: query.serverId },
        {
          onSuccess: () => {
            form.reset();
          },
        },
      );
    } else {
      mutateCreateDM(
        { ...body, conversationId: query.conversationId },
        {
          onSuccess: () => {
            form.reset();
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    // onClick={() => {}}
                    className="absolute left-8 top-7 size-6"
                  >
                    <Plus />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6"
                    placeholder={`#${name}`}
                    autoComplete="off"
                    {...field}
                  />
                  <div className="absolute right-8 top-7">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
