import type { Server as NetServer, Socket } from "net";

import type {
  Server as PrismaServer,
  Channel as PrismaChannel,
  Member as PrismaMember,
  Profile as PrismaProfile,
  Message as PrismaMessage,
  DirectMessage as PrismaDirectMessage,
  Conversation as PrismaConversation,
} from "@prisma/client";
import type { NextApiResponse } from "next";
import type { Server as SocketServer } from "socket.io";

export type Member = PrismaMember & {
  profile?: PrismaProfile;
};

export type Channel = PrismaChannel;

export type Server = PrismaServer & {
  members: Member[];
};

export type Message = PrismaMessage & {
  member: Member;
};

export type DirectMessage = PrismaDirectMessage & {
  member: Member;
};

export type Conversation = PrismaConversation & {
  directMessage?: DirectMessage[];
  memberOne: Member;
  memberTwo: Member;
};

export type NextApiResponseSocket = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketServer;
    };
  };
};

export type QueryObject = Record<string, string | string[]> | null;

export type ChannelParams = {
  serverId: string;
  channelId: string;
};

export type ConversationParams = {
  serverId: string;
  memberId: string;
};
