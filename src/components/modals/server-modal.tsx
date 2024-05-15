"use client";

import ServerForm from "@/components/forms/server-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FORM_NAME } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";

export default function ServerModal() {
  const { type, isOpen, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "SERVER";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tủy chỉnh máy chủ của bạn</DialogTitle>
          <DialogDescription>
            Hãy cá nhân hóa máy chủ bằng cách đặt tên và thêm biểu tượng đại
            diện. Bạn có thể thay đỏi bất cứ lúc nào.
          </DialogDescription>
        </DialogHeader>
        <ServerForm />
        <DialogFooter>
          <Button type="submit" form={FORM_NAME.SERVER}>
            Tạo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
