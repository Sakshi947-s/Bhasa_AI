"use client";

import { motion } from "framer-motion";
import { Mic, Play, Volume2, Headphones, Sparkles, ArrowRight, Settings2 } from "lucide-react";

export default function VoiceAIPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-1">Voice AI</h1>
          <p className="text-slate-400">Listen to your documents in natural regional voices.</p>
        </div>
        <button className="glass p-2.5 rounded-xl hover:bg-white/10 transition-all">
          <Settings2 size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Voice Control */}
        <div className="lg:col-span-2 glass rounded-[3rem] p-12 border-white/5 bg-linear-to-br from-accent-purple/10 to-transparent flex flex-col items-center justify-center text-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-3xl animate-pulse" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-32 h-32 rounded-full bg-linear-to-tr from-accent-purple via-pink-500 to-secondary flex items-center justify-center shadow-2xl group"
            >
              <Mic size={48} className="text-white group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Voice Assistant is Ready</h2>
            <p className="text-slate-400 max-w-sm">"Explain the risk clauses in Hindi"</p>
          </div>

          <div className="flex items-center gap-2 h-12">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: [4, Math.random() * 32 + 8, 4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                className="w-1.5 bg-accent-purple/40 rounded-full"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <button className="glass py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm hover:bg-white/10 transition-all">
              <Headphones size={18} /> Select Voice
            </button>
            <button className="glass py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm hover:bg-white/10 transition-all">
              <Volume2 size={18} /> Speed: 1.0x
            </button>
          </div>
        </div>

        {/* Saved Audio List */}
        <div className="space-y-6">
          <h3 className="font-bold px-2">Recent Explanations</h3>
          <div className="space-y-3">
            <VoiceHistoryCard title="Lease Risks (Hindi)" date="2h ago" />
            <VoiceHistoryCard title="Medical Summary (Tamil)" date="5h ago" />
            <VoiceHistoryCard title="Farmer Guide (Bengali)" date="Yesterday" />
            <VoiceHistoryCard title="Policy Overview (English)" date="2 days ago" />
          </div>

          <div className="glass p-6 rounded-3xl border-white/5 bg-secondary/5">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-sm">
              <Sparkles size={16} className="text-secondary" />
              Pro Tip
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              You can download these voice explanations as MP3 files to listen offline or share via WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceHistoryCard({ title, date }: { title: string, date: string }) {
  return (
    <div className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between hover:bg-white/5 transition-all group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
          <Play size={18} />
        </div>
        <div>
          <div className="font-bold text-sm">{title}</div>
          <div className="text-[10px] text-slate-500">{date}</div>
        </div>
      </div>
      <button className="text-slate-600 hover:text-white transition-colors">
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
