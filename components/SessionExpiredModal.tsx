"use client";

import { useEffect, useState } from "react";
import { logoutUser } from "@/app/api/auth";

export default function SessionExpiredModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Your session has expired. Please login again.");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const handleAuthError = (event: CustomEvent<{ message?: string }>) => {
      if (event.detail?.message) {
        setMessage(event.detail.message);
      }
      setIsOpen(true);
    };

    window.addEventListener("auth-expired", handleAuthError as EventListener);
    return () => {
      window.removeEventListener("auth-expired", handleAuthError as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          logoutUser();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-red-500/30 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse">
          <span className="material-symbols-outlined text-4xl">lock_clock</span>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-headline font-bold text-on-surface">Session Expired</h2>
          <p className="text-sm font-body text-on-surface-variant leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high border border-white/5 flex items-center justify-center gap-3">
          <span className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></span>
          <span className="text-xs font-bold font-label text-secondary tracking-widest uppercase">
            Redirecting to login in {countdown}s...
          </span>
        </div>

        <button
          onClick={logoutUser}
          className="w-full bg-secondary text-on-secondary font-display font-bold text-sm tracking-widest py-3.5 rounded-xl hover:bg-secondary/90 transition-all cursor-pointer"
        >
          LOG IN NOW
        </button>
      </div>
    </div>
  );
}
