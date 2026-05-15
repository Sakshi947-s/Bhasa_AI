"use client";

import { motion } from "framer-motion";
import { Upload, ArrowRight, MousePointer2, MessageSquare, Mic } from "lucide-react";
import Link from "next/link";

const languages = [
  "नमस्ते", "Hello", "வணக்கம்", "नमस्कार", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", "નમસ્તે", "नमस्ते", "ഹലോ"
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full">
                AI-Powered Multilingual Assistant
              </span>
              <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-tight mb-6">
                Understand Any Document in <span className="text-gradient">Your Own Language.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                AI-powered summarization, translation, and voice explanation for every Indian. 
                Bridge the language gap instantly with BhashaBridge AI.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/dashboard" className="group flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                  <Upload size={20} />
                  Upload Document
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#demo" className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg glass hover:bg-white/80 transition-all">
                  Try Live Demo
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Visuals */}
          <div className="flex-1 relative w-full max-w-lg">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative aspect-square glass rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden border-2 border-white/50"
            >
              {/* Multilingual Floating Texts */}
              {languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                    y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 4, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                  className="absolute text-xl font-bold text-slate-400 select-none pointer-events-none"
                >
                  {lang}
                </motion.div>
              ))}

              {/* Main AI Icon */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-linear-to-tr from-accent-cyan via-accent-blue to-accent-purple flex items-center justify-center shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 blur-sm" />
                  <Languages size={64} className="text-white relative z-10" />
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary shadow-lg animate-float" style={{ animationDelay: '0s' }}>
                    <Mic size={24} />
                  </div>
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <MessageSquare size={24} />
                  </div>
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    <MousePointer2 size={24} />
                  </div>
                </div>
              </div>

              {/* Scan Line Animation */}
              <motion.div 
                animate={{ y: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-transparent via-accent-cyan to-transparent opacity-50 blur-xs"
              />
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 glass rounded-3xl flex items-center justify-center shadow-xl rotate-12 -z-10 overflow-hidden">
              <div className="w-full h-2 bg-secondary/20 absolute top-4 left-0" />
              <div className="w-full h-2 bg-secondary/20 absolute top-10 left-0" />
              <div className="w-1/2 h-2 bg-secondary/20 absolute top-16 left-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Languages({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
    </svg>
  );
}
