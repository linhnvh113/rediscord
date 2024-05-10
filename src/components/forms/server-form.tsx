"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useModalStore } from "@/hooks/use-modal-store";
import { useCreateServer } from "@/services/queries/server.query";

const formSchema = z.object({
  name: z.string().min(1, "Hãy đặt tên máy chủ"),
  imageUrl: z.string().min(1, "Hãy đặt biểu tượng máy chủ"),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  imageUrl: "",
};

export default function ServerForm() {
  const router = useRouter();

  const { data, onClose } = useModalStore();

  const form = useForm<FormSchema>({
    defaultValues: data.server ?? defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { mutate: mutateCreateServer } = useCreateServer();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (body: FormSchema) => {
    mutateCreateServer(body, {
      onSuccess: () => {
        form.reset();
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        id="server-form"
        name="server-form"
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <FileUpload
                  value={field.value}
                  endpoint="serverImage"
                  onChange={field.onChange}
                />
              </FormControl>
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
