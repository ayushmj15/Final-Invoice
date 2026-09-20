"use client";

import { motion } from "framer-motion";
import { UploadCloud, Zap, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Upload",
      description: "Securely upload your Purchase Book and GSTR-2B files in Excel or CSV format.",
      icon: <UploadCloud className="w-8 h-8 text-[#FF6B2C]" />,
      animation: (
        <div className="relative w-full h-32 flex justify-center items-center gap-4">
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 3, delay: 0 }}
            className="w-20 h-24 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-2"
          >
            <div className="w-10 h-2 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="w-12 h-2 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="w-8 h-2 bg-zinc-200 dark:bg-zinc-700 rounded" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            className="w-20 h-24 bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 rounded-lg flex flex-col items-center justify-center gap-2"
          >
            <div className="w-10 h-2 bg-[#FF6B2C]/40 rounded" />
            <div className="w-12 h-2 bg-[#FF6B2C]/40 rounded" />
            <div className="w-8 h-2 bg-[#FF6B2C]/40 rounded" />
          </motion.div>
        </div>
      )
    },
    {
      id: "02",
      title: "AI Matches",
      description: "Our ML engine normalizes supplier names and compares amounts instantly.",
      icon: <Zap className="w-8 h-8 text-[#FF6B2C]" />,
      animation: (
        <div className="relative w-full h-32 flex flex-col justify-center items-center gap-2">
          <div className="text-sm font-mono text-zinc-500">Sri Lakshmi Traders</div>
          <motion.div animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <Zap className="w-5 h-5 text-[#FF6B2C]" />
          </motion.div>
          <div className="text-sm font-mono text-zinc-500">Sree Laxmi Traders</div>
        </div>
      )
    },
    {
      id: "03",
      title: "Get Results",
      description: "Review matches, resolve mismatches, and download your reconciliation report.",
      icon: <CheckCircle className="w-8 h-8 text-[#FF6B2C]" />,
      animation: (
        <div className="relative w-full h-32 flex flex-col justify-center gap-3 px-6">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            className="h-2 bg-green-500 rounded-full" 
          />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "60%" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-2 bg-yellow-500 rounded-full" 
          />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "20%" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-2 bg-red-500 rounded-full" 
          />
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">
            How it works
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            A beautiful 3-step process to eliminate hours of manual spreadsheet matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-zinc-50 dark:bg-[#12141a] rounded-3xl p-8 border border-zinc-100 dark:border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 text-[120px] font-black text-zinc-100 dark:text-white/5 opacity-50 select-none z-0">
                {step.id}
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-8 shadow-sm">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">{step.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="w-full bg-white dark:bg-[#0f1115] rounded-xl border border-zinc-200 dark:border-white/5 overflow-hidden">
                  {step.animation}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
