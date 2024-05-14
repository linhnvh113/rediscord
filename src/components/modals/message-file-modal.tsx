"use client";

import AttachmentForm from "@/components/forms/attachment-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";

export default function MessageFileModal() {
  const { type, isOpen, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "MESSAGE_FILE";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đính kèm tệp</DialogTitle>
          <DialogDescription>Gửi tập tin dưới dạng tin nhắn</DialogDescription>
        </DialogHeader>
        <AttachmentForm />
        <DialogFooter>
          <Button type="submit" form="attachment-form">
            Gửi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
