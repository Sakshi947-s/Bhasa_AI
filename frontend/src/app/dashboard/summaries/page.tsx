"use client";

import { motion } from "framer-motion";
import { FileText, Search, Filter, ArrowRight, Clock, Trash2 } from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function SummariesPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/documents")
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDocClick = (docId: string, filename: string) => {
    localStorage.setItem("current_document_id", docId);
    localStorage.setItem("current_filename", filename);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-1">Summaries</h1>
          <p className="text-blue-100/50">Manage and view your AI-generated document summaries.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 border-white/5">
            <Search size={18} className="text-blue-100/50" />
            <input 
              type="text" 
              placeholder="Search summaries..." 
              className="bg-transparent border-none outline-none text-sm w-48 text-white placeholder:text-blue-100/40"
            />
          </div>
          <button className="glass p-2.5 rounded-xl hover:bg-white/10 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-20 opacity-50 italic">Loading your documents...</div>
        ) : documents.length === 0 ? (
          <div className="glass p-12 rounded-[2rem] border-white/5 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-400/5 flex items-center justify-center text-blue-100/20">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">No summaries yet</h3>
              <p className="text-sm text-blue-100/40 max-w-xs mx-auto">Upload a document in the Dashboard or Uploads page to see your AI-powered summaries here.</p>
            </div>
            <Link href="/dashboard/uploads" className="bg-secondary text-white px-6 py-2 rounded-xl font-bold text-sm mt-2">
              Upload Now
            </Link>
          </div>
        ) : (
          documents.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-5 rounded-[2rem] border-white/5 flex items-center justify-between group hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-400/5 flex items-center justify-center text-secondary">
                  <FileText size={24} />
                </div>
                <div>
                  <Link 
                    href="/dashboard/analysis" 
                    onClick={() => handleDocClick(item.id, item.name)}
                    className="font-bold hover:text-secondary transition-colors block"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-4 text-xs text-blue-100/40 mt-1">
                    <span className="flex items-center gap-1"><Clock size={12} /> Just now</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-400/5 uppercase tracking-tighter">{item.language}</span>
                    <span className="text-slate-600">•</span>
                    <span>{Math.round(item.length / 1000)} KB</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2.5 rounded-xl hover:bg-red-500/10 text-blue-100/40 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={18} />
                </button>
                <Link 
                  href="/dashboard/analysis" 
                  onClick={() => handleDocClick(item.id, item.name)}
                  className="p-2.5 rounded-xl bg-blue-400/5 hover:bg-white/10 text-white transition-all"
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
