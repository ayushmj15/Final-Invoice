"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brain, FileSpreadsheet, Percent, ShieldCheck, Wand2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function Features() {
  return (
    <section id="features" className="py-24 bg-[#fafafa] dark:bg-[#0f1115]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">
            Everything you need. <br />
            <span className="text-[#FF6B2C]">Nothing you don't.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Powerful AI reconciliation wrapped in a simple, fast interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Brain />}
            title="Intelligent Matching"
            description="Understands small differences in supplier names, invoice numbers, and formatting automatically."
          />
          <FeatureCard 
            icon={<ShieldCheck />}
            title="GST-Aware"
            description="Designed specifically around Indian GST invoice data, HSN codes, and standard tax rates."
          />
          <FeatureCard 
            icon={<Percent />}
            title="Match Confidence"
            description="Every matched record receives a clear percentage confidence score based on similarity."
          />
          <FeatureCard 
            icon={<FileSpreadsheet />}
            title="Smart Review"
            description="Only uncertain records require manual verification. High confidence matches are cleared instantly."
          />
          <FeatureCard 
            icon={<Wand2 />}
            title="Suggested Corrections"
            description="Identify likely data entry errors and formatting inconsistencies with one-click fixes."
          />
          <FeatureCard 
            icon={<Download />}
            title="Export Reports"
            description="Download detailed reconciliation results as Excel or CSV files for your accountant."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white dark:bg-[#181a1f] p-8 rounded-3xl border border-zinc-200 dark:border-white/5 overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 dark:opacity-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 44, 0.15), transparent 40%)`
        }}
      />
      
      <div className="relative z-10">
        <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 text-zinc-900 dark:text-zinc-400 group-hover:text-[#FF6B2C] group-hover:border-[#FF6B2C]/30 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white group-hover:text-[#FF6B2C] transition-colors">{title}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
