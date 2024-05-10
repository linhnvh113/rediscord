"use client";

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
  const { type, isOpen, data, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "MESSAGE_FILE";

  return (
    <Dialog open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an attachment</DialogTitle>
          <DialogDescription>Send a file as a message</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" form="server-form">
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
