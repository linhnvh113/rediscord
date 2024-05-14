export type CreateMessageBody = {
  content: string;
  fileUrl?: string;
};

export type UpdateMessageBody = {
  id: string;
} & Partial<CreateMessageBody>;
