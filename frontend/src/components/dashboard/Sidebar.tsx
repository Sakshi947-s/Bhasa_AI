"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Languages, 
  Mic, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Upload, label: "Uploads", href: "/dashboard/uploads" },
  { icon: FileText, label: "Summaries", href: "/dashboard/summaries" },
  { icon: Languages, label: "Translations", href: "/dashboard/translations" },
  { icon: Mic, label: "Voice AI", href: "/dashboard/voice" },
  { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 glass-dark border-r border-white/10 text-white p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-secondary to-accent-purple flex items-center justify-center">
          <Globe size={24} />
        </div>
        <span className="text-xl font-bold font-poppins">BhashaBridge</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                : "hover:bg-blue-400/10 text-blue-100/60 hover:text-white"
            )}
          >
            <item.icon size={22} className={cn(
              "transition-transform duration-200 group-hover:scale-110",
              pathname === item.href ? "text-white" : "text-blue-100/60 group-hover:text-white"
            )} />
            <span className="font-medium">{item.label}</span>
            {pathname === item.href && (
              <ChevronRight size={16} className="ml-auto opacity-50" />
            )}
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-blue-100/60 hover:text-white hover:bg-blue-400/10",
            pathname === "/dashboard/settings" && "text-white bg-blue-400/10"
          )}
        >
          <Settings size={22} />
          <span className="font-medium">Settings</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full text-left">
          <LogOut size={22} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
