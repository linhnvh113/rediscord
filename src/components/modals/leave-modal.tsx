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
import { useLeaveServer } from "@/services/queries/server.query";

export default function LeaveModal() {
  const { type, data, isOpen, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "LEAVE";

  const { mutate } = useLeaveServer();

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Rời '${data.server?.name}'`}</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn rời khỏi <strong>{data.channel?.name}</strong>? Bạn
            sẽ không thể gia nhập lại máy chủ trừ khi bạn được mời lại.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(data.server!.id)}>
            Rời phòng
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
