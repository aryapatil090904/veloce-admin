"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import veloceLogo from "@/app/assets/veloceLogo.png";

export default function SideNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Members", icon: "group", href: "/members" },
    { name: "Attendance", icon: "calendar_today", href: "/attendance" },
    { name: "Classes & Bookings", icon: "event_available", href: "/bookings" },
    { name: "Command Center", icon: "dashboard", href: "/dashboard" },
    { name: "Demo Library", icon: "video_library", href: "/demo-library" },
    { name: "Social", icon: "forum", href: "/social" },
    { name: "Achievements", icon: "military_tech", href: "/achievements" },
    { name: "Goals", icon: "track_changes", href: "/goals" },
    { name: "Staff", icon: "badge", href: "/staff" },
    { name: "Inquiries", icon: "support_agent", href: "/inquiries" },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-low flex flex-col z-50">
      <div className="pt-8 pb-12 px-6 flex justify-center items-center shrink-0">
        <img 
          alt="VELOCE Logo" 
          src={veloceLogo.src} 
          className="w-48 h-auto object-contain"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <nav className="flex-1 space-y-2 pb-4">
          {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={
                isActive 
                  ? "flex items-center gap-4 py-3 px-4 rounded-xl text-primary font-bold border-r-4 border-primary bg-primary/10" 
                  : "flex items-center gap-4 py-3 px-4 rounded-xl transition-colors hover:bg-surface-bright/5 hover:text-primary group"
              }
            >
              <span className={`material-symbols-outlined shrink-0 ${isActive ? "" : "text-on-surface-variant group-hover:text-primary"}`}>
                {item.icon}
              </span>
              <span className={`font-label tracking-tight whitespace-nowrap ${isActive ? "" : "font-medium text-on-surface-variant group-hover:text-primary"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 pt-4 border-t border-outline-variant/10 shrink-0">
        <Link href="/settings" className="flex items-center gap-4 py-2 px-4 rounded-xl transition-colors hover:bg-surface-bright/5 hover:text-primary group">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">settings</span>
          <span className="font-label tracking-tight text-on-surface-variant group-hover:text-primary">Settings</span>
        </Link>
        <Link href="/support" className="flex items-center gap-4 py-2 px-4 rounded-xl transition-colors hover:bg-surface-bright/5 hover:text-primary group">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">help_outline</span>
          <span className="font-label tracking-tight text-on-surface-variant group-hover:text-primary">Support</span>
        </Link>
      </div>
      </div>
    </aside>
  );
}
