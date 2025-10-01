import { useState, useRef, useEffect, type PropsWithChildren } from "react";
import * as Toast from "@radix-ui/react-toast";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { type AddToastArgs, type ToastSeverity } from "@/types/toast";
import { ToastContext } from "@/services/utils/useToastContext";

// Toast types
type ToastObj = {
  id: string;
  severity: ToastSeverity;
  summary: string;
  detail?: string;
  life: number;
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastObj[]>([]);
  const timeouts = useRef<{ [id: string]: NodeJS.Timeout }>({});

  const addToast = ({
    severity = "info",
    summary,
    detail,
    life = 4000,
  }: AddToastArgs) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    const newToast: ToastObj = { id, severity, summary, detail, life };

    setToasts((prev) => [...prev, newToast]);

    timeouts.current[id] = setTimeout(() => {
      removeToast(id);
    }, life);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id]);
      delete timeouts.current[id];
    }
  };

  useEffect(() => {
    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
      timeouts.current = {};
    };
  }, []);

  const getToastIcon = (severity: ToastSeverity) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warn":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getToastStyles = (severity: ToastSeverity) => {
    switch (severity) {
      case "success":
        return "bg-green-50 border-green-200 text-green-900";
      case "error":
        return "bg-red-50 border-red-200 text-red-900";
      case "warn":
        return "bg-yellow-50 border-yellow-200 text-yellow-900";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-900";
    }
  };

  const getCloseButtonStyles = (severity: ToastSeverity) => {
    switch (severity) {
      case "success":
        return "text-green-700 hover:bg-green-100";
      case "error":
        return "text-red-700 hover:bg-red-100";
      case "warn":
        return "text-yellow-700 hover:bg-yellow-100";
      case "info":
      default:
        return "text-blue-700 hover:bg-blue-100";
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        {/* Render all toasts */}
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className={`grid grid-cols-[auto_max-content] gap-x-4 items-center p-4 rounded-lg shadow-lg border ${getToastStyles(
              toast.severity
            )} 
                data-[state=open]:animate-slideIn data-[state=closed]:animate-hide 
                data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] 
                data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] 
                data-[swipe=end]:animate-swipeOut`}
            open={true}
            onOpenChange={(open) => !open && removeToast(toast.id)}
            duration={toast.life}
          >
            <div className="flex items-center gap-2">
              {getToastIcon(toast.severity)}
              <div>
                <Toast.Title className="font-semibold text-sm">
                  {toast.summary}
                </Toast.Title>
                {toast.detail && (
                  <Toast.Description className="text-sm opacity-90 mt-1">
                    {toast.detail}
                  </Toast.Description>
                )}
              </div>
            </div>
            <Toast.Close
              className={`shrink-0 rounded-full p-1 hover:bg-black/10 transition-colors ${getCloseButtonStyles(
                toast.severity
              )}`}
              aria-label="Close"
              onClick={() => removeToast(toast.id)}
            >
              <XCircle className="w-4 h-4" />
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
