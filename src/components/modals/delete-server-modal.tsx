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

export default function DeleteServerModal() {
  const { type, data, isOpen, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "DELETE_SERVER";

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Xóa '${data.server?.name}'`}</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa <strong>{data.server?.name}</strong>? Hành động
            này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction>Xóa máy chủ</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
