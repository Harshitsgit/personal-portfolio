"use client";
import { createContext, useContext, useState } from "react";
import Toaster from "../components/Toaster";

interface Toast {
  message: string;
  type: "success" | "error";
}

interface ToastContextProps {
  showToast: (message: string, type: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
