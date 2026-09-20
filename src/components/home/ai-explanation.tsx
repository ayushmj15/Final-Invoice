"use client";

import { motion } from "framer-motion";
import { Database, Zap, FileSearch } from "lucide-react";

export function AIExplanation() {
  const nodes = [
    { label: "Supplier Name", delay: 0 },
    { label: "Invoice Number", delay: 0.1 },
    { label: "GSTIN", delay: 0.2 },
    { label: "Date", delay: 0.3 },
    { label: "Amount", delay: 0.4 },
    { label: "Tax", delay: 0.5 },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            Not just matching.<br />
            <span className="text-[#FF6B2C]">Understanding.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Traditional tools break when an invoice says "INV/001" in your books but "INV-001" in GSTR-2B. Our AI looks at the complete picture.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Signal Nodes */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 w-full">
            {nodes.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: node.delay }}
                className="bg-[#181a1f] border border-white/10 px-6 py-3 rounded-full text-sm font-medium text-zinc-300 shadow-sm flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-zinc-500" />
                {node.label}
              </motion.div>
            ))}
          </div>

          {/* Connection Lines connecting nodes to engine */}
          <div className="relative w-full h-24 flex justify-center mb-4">
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <motion.path
                d="M 50% 0 L 50% 100%"
                fill="none"
                stroke="#FF6B2C"
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                opacity={0.5}
              />
              <motion.path
                d="M 20% 0 Q 50% 50 50% 100%"
                fill="none"
                stroke="#FF6B2C"
                strokeWidth="1"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                opacity={0.3}
              />
              <motion.path
                d="M 80% 0 Q 50% 50 50% 100%"
                fill="none"
                stroke="#FF6B2C"
                strokeWidth="1"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                opacity={0.3}
              />
            </svg>
          </div>

          {/* AI Engine Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-[#181a1f] to-[#0f1115] border border-white/10 rounded-3xl p-8 mb-12 shadow-[0_0_50px_-12px_rgba(255,107,44,0.15)] relative w-full max-w-md text-center"
          >
            <div className="absolute inset-0 rounded-3xl border border-[#FF6B2C]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-16 h-16 mx-auto bg-[#FF6B2C]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#FF6B2C]/30 relative">
              <div className="absolute inset-0 bg-[#FF6B2C] opacity-20 blur-md rounded-full animate-pulse" />
              <Zap className="w-8 h-8 text-[#FF6B2C] relative z-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Matching Engine</h3>
            <p className="text-sm text-zinc-400">
              Analyzes semantic similarity, normalizes strings, and calculates probabilistic match scores.
            </p>
          </motion.div>

          <div className="relative w-full h-16 flex justify-center mb-4">
             <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <motion.path
                d="M 50% 0 L 50% 100%"
                fill="none"
                stroke="#FF6B2C"
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                opacity={0.8}
              />
             </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#181a1f] border border-green-500/30 px-8 py-4 rounded-2xl text-center shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]"
          >
            <div className="text-3xl font-bold text-white mb-1">Match Probability</div>
            <div className="text-green-500 font-medium text-sm flex items-center justify-center gap-2">
              <FileSearch className="w-4 h-4" />
              High Confidence Output
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
