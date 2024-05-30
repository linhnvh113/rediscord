import { z } from "zod";

export const createServerSchema = z.object({
  name: z.string().trim().min(1, "Hãy đặt tên máy chủ"),
  imageUrl: z.string().min(1, "Hãy đặt biểu tượng máy chủ"),
});

export const updateServerSchema = z.object({
  id: z.string().min(1, "Thiếu id máy chủ"),
  name: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type CreateServerDto = z.infer<typeof createServerSchema>;

export type UpdateServerDto = z.infer<typeof updateServerSchema>;
