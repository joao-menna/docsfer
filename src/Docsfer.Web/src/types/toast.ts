export type ToastSeverity = "success" | "error" | "warn" | "info";

export type AddToastArgs = {
  severity?: ToastSeverity;
  summary: string;
  detail?: string;
  life?: number;
};

export type ToastContextType = {
  addToast: (args: AddToastArgs) => void;
  removeToast: (id: string) => void;
};
