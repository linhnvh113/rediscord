"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORM_NAME } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import {
  createChannelSchema,
  type CreateChannelDto,
} from "@/schemas/channel.schema";
import {
  useCreateChannel,
  useUpdateChannel,
} from "@/services/queries/channel.query";

const defaultValues: CreateChannelDto = {
  name: "",
  type: ChannelType.TEXT,
  serverId: "",
};

export default function ChannelForm() {
  const router = useRouter();
  const params = useParams<{ serverId: string }>();

  const { data, onClose } = useModalStore();

  const form = useForm<CreateChannelDto>({
    defaultValues: data.channel ?? defaultValues,
    resolver: zodResolver(createChannelSchema),
  });

  const { mutate: createChannel } = useCreateChannel();
  const { mutate: updateChannel } = useUpdateChannel();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (body: CreateChannelDto) => {
    if (data.channel) {
      updateChannel(
        { id: data.channel.id, ...body },
        {
          onSuccess: () => {
            form.reset();
            onClose();
            router.refresh();
          },
        },
      );
    } else {
      createChannel(
        { ...body, serverId: params!.serverId },
        {
          onSuccess: () => {
            form.reset();
            onClose();
            router.refresh();
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form
        id={FORM_NAME.CHANNEL}
        name={FORM_NAME.CHANNEL}
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold">TÊN KÊNH</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} placeholder="kênh-mới" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold">LOẠI KÊNH</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại kênh" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ChannelType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
