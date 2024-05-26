"use client";

import useActiveMember from "@/hooks/use-active-member";

export const ActiveProvider = () => {
  useActiveMember();
  return null;
};
