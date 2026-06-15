"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success", duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full sm:w-auto pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl glass-panel text-white font-medium border-l-4 border-l-brand-terracotta-600 bg-brand-slate-900/90"
              style={{
                borderLeftColor:
                  t.type === "success"
                    ? "#0d9488"
                    : t.type === "error"
                    ? "#ef4444"
                    : "#ea580c",
              }}
            >
              <div className="flex items-center gap-3">
                {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-brand-emerald-500 shrink-0" />}
                {t.type === "error" && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
                {t.type === "info" && <Info className="w-5 h-5 text-brand-terracotta-500 shrink-0" />}
                <p className="text-sm font-medium text-brand-slate-100">{t.message}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-brand-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
