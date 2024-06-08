"use client";

import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/hooks/use-modal-store";
import type { Server } from "@/types";

interface ChannelNavHeaderProps {
  server: Server;
  role?: MemberRole;
}

export default function ChannelNavHeader({
  server,
  role,
}: ChannelNavHeaderProps) {
  const { onOpen } = useModalStore();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 select-none justify-between rounded-none border-b"
        >
          {server.name}
          <ChevronDown className="hidden sm:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-0.5 text-xs text-muted-foreground">
        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2 text-primary"
            onClick={() => onOpen("INVITE", { server })}
          >
            Mời mọi người
            <UserPlus size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2"
            onClick={() => onOpen("SERVER", { server })}
          >
            Cài đặt máy chủ
            <Settings size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2"
            onClick={() => onOpen("MEMBER", { server })}
          >
            Quản lý thành viên
            <User size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2"
            onClick={() => onOpen("CHANNEL")}
          >
            Tạo kênh
            <PlusCircle size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-destructive"
            onClick={() => onOpen("DELETE_SERVER", { server })}
          >
            Xóa máy chủ
            <Trash size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-destructive"
            onClick={() => onOpen("LEAVE", { server })}
          >
            Rời khỏi máy chủ
            <LogOut size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
