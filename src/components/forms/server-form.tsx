"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import FileUpload from "@/components/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FORM_NAME } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import {
  createServerSchema,
  type CreateServerDto,
} from "@/schemas/server.schema";
import {
  useCreateServer,
  useUpdateServer,
} from "@/services/queries/server.query";

const defaultValues: CreateServerDto = {
  name: "",
  imageUrl: "",
};

export default function ServerForm() {
  const router = useRouter();

  const { data, onClose } = useModalStore();

  const form = useForm<CreateServerDto>({
    defaultValues: data.server ?? defaultValues,
    resolver: zodResolver(createServerSchema),
  });

  const { mutate: mutateCreateServer } = useCreateServer();
  const { mutate: mutateUpdateServer } = useUpdateServer();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (body: CreateServerDto) => {
    if (data.server) {
      mutateUpdateServer(
        { id: data.server.id, ...body },
        {
          onSuccess: () => {
            form.reset();
            onClose();
            router.refresh();
          },
        },
      );
    } else {
      mutateCreateServer(body, {
        onSuccess: () => {
          form.reset();
          onClose();
          router.refresh();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        id={FORM_NAME.SERVER}
        name={FORM_NAME.SERVER}
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <FileUpload
                  value={field.value}
                  endpoint="serverImage"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold">TÊN MÁY CHỦ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Nhập tên máy chủ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
