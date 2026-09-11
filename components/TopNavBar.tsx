"use client";

import { useState, useEffect } from "react";
import { logoutUser } from "@/app/api/auth";

export default function TopNavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const [userRole, setUserRole] = useState("Admin Control");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          const name = [parsed.firstName, parsed.lastName].filter(Boolean).join(" ");
          if (name) setUserName(name);
          if (parsed.role) setUserRole(`${parsed.role} Control`);
        } catch (e) {
          // fallback to default
        }
      }
    }
  }, []);

  return (
    <header className="h-16 fixed top-0 right-0 left-64 z-40 bg-surface/60 backdrop-blur-xl flex justify-between items-center px-8">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
          <input 
            className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/50 outline-none" 
            placeholder="Search members, activities, or systems..." 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors relative">
            notifications
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">dark_mode</button>
        </div>
        
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="text-right">
              <p className="text-sm font-bold font-headline text-on-surface">{userName}</p>
              <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{userRole}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors overflow-hidden flex items-center justify-center bg-primary/10">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-primary transition-colors">
              {showDropdown ? "expand_less" : "expand_more"}
            </span>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl bg-surface-container-high border border-outline-variant/20 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
              <button
                onClick={logoutUser}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
