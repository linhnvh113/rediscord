"use client";

import { Plus } from "lucide-react";

import AppTooltip from "@/components/app-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";

export default function ServerNavAction() {
  const { onOpen } = useModalStore();

  return (
    <AppTooltip side="right" align="center" label="Tạo máy chủ">
      <div className="group">
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-3xl bg-accent transition-all group-hover:rounded-2xl group-hover:bg-emerald-500"
          onClick={() => onOpen("SERVER")}
        >
          <Plus className="text-emerald-500 transition-all group-hover:text-white" />
        </button>
      </div>
    </AppTooltip>
  );
}
