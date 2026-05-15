"use client";

import { motion } from "framer-motion";
import { Languages, Search, Globe, ArrowRight, Clock, FileText } from "lucide-react";
import Link from "next/link";

const translations = [
  { id: 1, name: "Medical_Report_Sakshi.jpg", source: "English", target: "Hindi", date: "2 hours ago" },
  { id: 2, name: "Land_Registry_Notice.pdf", source: "Marathi", target: "English", date: "Yesterday" },
  { id: 3, name: "Farmer_Scheme_Details.pdf", source: "English", target: "Bengali", date: "3 days ago" },
  { id: 4, name: "Legal_Summons_v1.pdf", source: "Telugu", target: "Hindi", date: "1 week ago" },
];

export default function TranslationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold font-poppins mb-1">Translations</h1>
        <p className="text-slate-400">Your multilingual document bridge history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {translations.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-[2.5rem] border-white/5 group hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Globe size={24} />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12} /> {item.date}
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-4 truncate">{item.name}</h3>
            
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl mb-6">
              <div className="flex-1 text-center">
                <div className="text-[10px] text-slate-500 uppercase mb-1">From</div>
                <div className="font-bold text-sm">{item.source}</div>
              </div>
              <ArrowRight size={16} className="text-slate-600" />
              <div className="flex-1 text-center">
                <div className="text-[10px] text-secondary uppercase mb-1">To</div>
                <div className="font-bold text-sm text-secondary">{item.target}</div>
              </div>
            </div>

            <Link href="/dashboard/analysis" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-sm">
              View Translation <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
