import type {
  Server as PrismaServer,
  Channel as PrismaChannel,
  Member as PrismaMember,
  Profile as PrismaProfile,
  Message as PrismaMessage,
} from "@prisma/client";

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
