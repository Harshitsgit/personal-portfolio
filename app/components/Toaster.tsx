"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

interface ToasterProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toaster({
  message,
  type,
  onClose,
}: Readonly<ToasterProps>) {
  useEffect(() => {
    // Automatically hide the toast after 2 seconds
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded-lg text-white shadow-lg flex items-center gap-2 transition-transform transform ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
      <button onClick={onClose} className="ml-2">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
