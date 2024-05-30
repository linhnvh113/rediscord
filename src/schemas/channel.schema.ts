import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const createChannelSchema = z.object({
  name: z
    .string()
    .min(1, "Hãy đặt tên kênh")
    .refine((name) => name !== "general", {
      message: "Tên kênh không thể là 'general'",
    }),
  type: z.nativeEnum(ChannelType),
  serverId: z.string().min(1, "Thiếu server id"),
});

export const updateChannelSchema = z.object({
  id: z.string().min(1, "Thiếu id kênh"),
  name: z
    .string()
    .optional()
    .refine((name) => name !== "general", {
      message: "Tên kênh không thể là 'general'",
    }),
  type: z.nativeEnum(ChannelType).optional(),
});

export type CreateChannelDto = z.infer<typeof createChannelSchema>;

export type UpdateChannelDto = z.infer<typeof updateChannelSchema>;
