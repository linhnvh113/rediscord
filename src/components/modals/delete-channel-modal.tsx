"use client";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { useDeleteChannel } from "@/services/queries/channel.query";

export default function DeleteChannelModal() {
  const router = useRouter();

  const { type, data, isOpen, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "DELETE_CHANNEL";

  const { mutate } = useDeleteChannel();

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa kênh</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa <strong>{data.channel?.name}</strong> không?
            Hành động này không thể được bỏ dỡ giữa chừng.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              mutate(data.channel!.id, {
                onSuccess: () => {
                  router.refresh();
                },
              })
            }
          >
            Xóa kênh
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
