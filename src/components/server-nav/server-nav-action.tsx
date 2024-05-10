"use client";

import { Plus } from "lucide-react";

import AppTooltip from "@/components/app-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";

export default function ServerNavAction() {
  const { onOpen } = useModalStore();

  return (
    <AppTooltip side="right" align="center" label="Create a server">
      <div className="group flex items-center">
        <button
          type="button"
          className="mx-3 flex size-12 items-center justify-center overflow-hidden rounded-3xl bg-background transition-all group-hover:rounded-2xl group-hover:bg-emerald-500 dark:bg-neutral-700"
          onClick={() => onOpen("SERVER")}
        >
          <Plus className="text-emerald-500 transition group-hover:text-white" />
        </button>
      </div>
    </AppTooltip>
  );
}
