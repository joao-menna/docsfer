// contexts/ToastContext.jsx
import { createContext, useContext, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ severity = "info", summary, detail, life = 4000 }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, severity, summary, detail, life };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove toast after specified time
    setTimeout(() => {
      removeToast(id);
    }, life);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getToastIcon = (severity) => {
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

  const getToastStyles = (severity) => {
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

  const getCloseButtonStyles = (severity) => {
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
    <ToastContext.Provider value={{ addToast }}>
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
