import { useState } from "react";
import toast from "react-hot-toast";

export function useToast() {
  const [toastId, setToastId] = useState<string | undefined>("");

  const toaster = (
    type: "loading" | "success" | "error" | "custom",
    message: string
  ) => {
    let _toastId: string | undefined = toast.loading("Please wait...");

    switch (type) {
      case "loading":
        _toastId = toast.loading(message, {
          id: _toastId,
        });
        break;
      case "success":
        _toastId = toast.success(message, {
          id: _toastId,
        });
        break;
      case "error":
        _toastId = toast.error(message, {
          id: _toastId,
        });
        break;
      case "custom":
        _toastId = toast.custom(message, {
          id: _toastId,
        });
        break;
      default:
        _toastId = toast.success(message, {
          id: _toastId,
        });
        break;
    }

    setToastId(_toastId);
  };

  return { toastId, toaster };
}
