"use client";

import { useState } from "react";

import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  ShieldQuestion,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import { ICON_MAP } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";

export default function MemberModal() {
  const [loadingId, setLoadingId] = useState("");

  const { type, data, isOpen, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "MEMBER";

  const onRoleChange = () => {};

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quản lý thành viên</DialogTitle>
          <DialogDescription>2 thành viên</DialogDescription>
        </DialogHeader>
        <ScrollArea>
          {data.server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-2">
              <UserAvatar src={member.profile?.imageUrl} />
              <div className="flex flex-col gap-1">
                <div className="item-center flex gap-1 text-xs font-semibold">
                  {member.profile?.name}
                  {ICON_MAP[member.role]}
                </div>
                <p className="text-xs">{member.profile?.email}</p>
              </div>
              {data.server?.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="ml-auto">
                      <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="mr-2 size-4" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="ml-auto size-4" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check className="ml-auto size-4" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Gavel className="mr-2 size-4" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto  size-4 animate-spin" />
              )}
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="server-form">
            Create Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
