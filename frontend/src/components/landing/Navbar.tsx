"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto mt-4 max-w-7xl glass rounded-3xl"
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-secondary to-accent-purple shadow-lg">
          <Languages className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight font-poppins">
          Bhasha<span className="text-secondary">Bridge</span> AI
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#features" className="text-sm font-medium hover:text-secondary transition-colors">Features</Link>
        <Link href="#how-it-works" className="text-sm font-medium hover:text-secondary transition-colors">How it Works</Link>
        <Link href="#languages" className="text-sm font-medium hover:text-secondary transition-colors">Languages</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-black/5 transition-colors">Login</Link>
        <Link href="/dashboard" className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-full hover:shadow-xl hover:scale-105 transition-all active:scale-95">
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
}
