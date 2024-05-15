import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FileUpload from "@/components/file-upload";
import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { FORM_NAME } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import { useSendAttachment } from "@/services/queries/message.query";

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Hãy chọn tệp tải lên.",
  }),
});

const defaultValues: FormData = {
  fileUrl: "",
};

type FormData = z.infer<typeof formSchema>;

export default function AttachmentForm() {
  const { onClose } = useModalStore();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { mutate: sendAttachment } = useSendAttachment();

  const onSubmit = async (formData: FormData) => {
    sendAttachment(
      { ...formData, content: formData.fileUrl },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        id={FORM_NAME.ATTACHMENT}
        name={FORM_NAME.ATTACHMENT}
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <FileUpload
                  value={field.value}
                  endpoint="messageFile"
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
