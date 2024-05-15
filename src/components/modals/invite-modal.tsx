"use client";

import { useState } from "react";

import { Check, Copy, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { useGenerateInviteCode } from "@/services/queries/server.query";
import type { Server } from "@/types";

export default function InviteModal() {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { type, data, isOpen, onOpen, onClose } = useModalStore();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "INVITE";

  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

  const handleCopy = () => {
    void navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  const { mutate: generateInviteCode } = useGenerateInviteCode();

  const handleGenerateNewLink = async () => {
    setIsLoading(true);
    generateInviteCode(data.server!.id, {
      onSuccess: (data) => {
        setIsLoading(false);
        onOpen("INVITE", { server: data as Server });
      },
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mời mọi người</DialogTitle>
        </DialogHeader>
        <div>
          <Label className="text-xs font-bold">GỬI LINK MỜI CHO HỌ</Label>
          <div className="mt-2 flex items-center gap-2">
            <Input value={inviteUrl} readOnly />
            <Button size="icon" onClick={handleCopy}>
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="mt-4 text-xs"
            onClick={handleGenerateNewLink}
          >
            TẠO LINK MỚI
            <RefreshCw className="ml-2 size-3" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
