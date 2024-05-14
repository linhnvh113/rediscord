"use client";

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
import { useDeleteMessage } from "@/services/queries/message.query";

export default function DeleteMessageModal() {
  const { type, data, isOpen, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "DELETE_MESSAGE";

  const { mutate } = useDeleteMessage();

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa tin nhắn</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa tin nhắn này?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(data.message!.id)}>
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
