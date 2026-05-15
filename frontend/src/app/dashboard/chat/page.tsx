"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, Plus, ArrowRight, Clock, Trash2, Send, Zap } from "lucide-react";
import { useState } from "react";

const recentChats = [
  { id: 1, title: "Lease Agreement Risks", doc: "Legal_v2.pdf", date: "2 hours ago" },
  { id: 2, title: "Medical Report Inquiry", doc: "Health_Sakshi.jpg", date: "Yesterday" },
  { id: 3, title: "Farmer Scheme FAQ", doc: "Govt_Scheme.pdf", date: "3 days ago" },
];

export default function ChatPage() {
  const [input, setInput] = useState("");

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-1">AI Chat</h1>
          <p className="text-slate-400">Context-aware conversations with all your documents.</p>
        </div>
        <button className="bg-secondary text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
          <Plus size={20} />
          New Chat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Chat History Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 border-white/5">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-slate-500"
            />
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest px-2 mb-4">Recent Conversations</h3>
            {recentChats.map((chat) => (
              <div key={chat.id} className="glass p-4 rounded-2xl border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-sm truncate pr-4">{chat.title}</div>
                  <button className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock size={10} /> {chat.date}
                  </div>
                  <div className="text-[10px] font-bold text-secondary">{chat.doc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat Area */}
        <div className="lg:col-span-8 glass rounded-[3rem] border-white/5 flex flex-col overflow-hidden bg-white/5 relative">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-accent-cyan/5 pointer-events-none" />

          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-secondary to-accent-cyan flex items-center justify-center text-white shadow-2xl">
              <MessageSquare size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Select a document to start chatting</h2>
              <p className="text-slate-400 max-w-sm mx-auto">
                Ask specific questions about dates, risks, payments, or summaries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-4">
              <SuggestionCard text="What is the total amount in this document?" />
              <SuggestionCard text="Summarize this in 5 bullet points." />
              <SuggestionCard text="Are there any hidden risks or penalties?" />
              <SuggestionCard text="Explain this legal term in simple Hindi." />
            </div>
          </div>

          <div className="p-6 border-t border-white/10 bg-black/20">
            <div className="glass px-6 py-4 rounded-[2rem] flex items-center gap-4 border-white/10 shadow-2xl">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask BhashaBridge anything..." 
                className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder:text-slate-500"
              />
              <button className="p-3 rounded-full bg-secondary text-white hover:scale-110 transition-transform active:scale-95 shadow-lg shadow-secondary/20">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({ text }: { text: string }) {
  return (
    <div className="glass p-4 rounded-2xl border-white/5 hover:border-secondary/30 hover:bg-secondary/5 transition-all cursor-pointer text-left group">
      <div className="text-xs text-slate-400 group-hover:text-white transition-colors">{text}</div>
    </div>
  );
}
