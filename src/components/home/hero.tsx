"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0f1115]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF6B2C] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#E94E1B] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 pt-32 pb-20"
      >
        {/* Left Content */}
        <div className="flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#FF6B2C]" />
            <span className="text-xs font-medium text-[#FF6B2C] tracking-wide uppercase">
              AI-Powered GST Reconciliation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            Find every match.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] to-[#FF8A3D]">
              Catch every mismatch.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-zinc-400 mb-10 max-w-xl leading-relaxed"
          >
            Automatically compare your purchase records with GSTR-2B and identify genuine mismatches using intelligent invoice matching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/reconcile" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full group">
                Start Reconciliation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full text-zinc-300 hover:text-white">
                See How It Works ↓
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right 3D Visualization */}
        <div className="relative w-full h-[500px] flex items-center justify-center lg:justify-end perspective-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md"
          >
            {/* AI Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#FF6B2C] rounded-full blur-xl opacity-40 animate-pulse" />
            
            {/* Book Card */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 left-0 w-64 bg-[#181a1f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-20"
              style={{ transform: "rotateY(10deg) rotateX(5deg)" }}
            >
              <div className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Books</div>
              <div className="font-mono text-sm text-[#FF6B2C] mb-1">INV-1045</div>
              <div className="text-white font-medium text-base mb-2">Sri Lakshmi Traders</div>
              <div className="text-xl font-semibold text-white">₹12,400</div>
            </motion.div>

            {/* Glowing Connection Line */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10 overflow-visible pointer-events-none">
              <motion.path
                d="M 64 80 Q 200 250 350 380"
                fill="transparent"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E94E1B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Match Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B2C]/20 border border-[#FF6B2C]/50 text-[#FF6B2C] text-xs font-bold px-3 py-1 rounded-full z-30 backdrop-blur-md"
            >
              97% MATCH
            </motion.div>

            {/* GSTR-2B Card */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-10 right-0 w-64 bg-[#181a1f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-20"
              style={{ transform: "rotateY(-10deg) rotateX(-5deg)" }}
            >
              <div className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">GSTR-2B</div>
              <div className="font-mono text-sm text-zinc-300 mb-1">INV1045</div>
              <div className="text-white font-medium text-base mb-2">Sree Laxmi Traders</div>
              <div className="text-xl font-semibold text-white">₹12,400</div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
