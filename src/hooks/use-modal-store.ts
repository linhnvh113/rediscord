import { create } from "zustand";

import type { Channel, DirectMessage, Message, Server } from "@/types";

export type ModalType =
  | "SERVER"
  | "INVITE"
  | "MEMBER"
  | "CHANNEL"
  | "MESSAGE_FILE"
  | "DELETE_SERVER"
  | "DELETE_CHANNEL"
  | "DELETE_MESSAGE"
  | "LEAVE";

interface ModalData {
  server?: Server;
  channel?: Channel;
  message?: Message | DirectMessage;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
