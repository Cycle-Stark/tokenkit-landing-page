"use client";

import { useToast } from "./useToast";

export function useCopy() {
  const { toaster } = useToast();

  function copyText(val: string, res?: string) {
    navigator.clipboard.writeText(val);
    toaster("success", `${res ? res : "copied!"}`);
  }

  return copyText;
}
