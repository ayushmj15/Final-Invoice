"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProductDemo() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6B2C]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            See the intelligence in action.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Our AI understands that "Sri Lakshmi Traders" and "Sree Laxmi Traders" are the same business, preventing false mismatches.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-[#12141a] border border-white/10 rounded-3xl p-8 md:p-12 relative shadow-2xl">
            
            {/* The Dashboard Mockup */}
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 relative z-10">
              
              {/* Purchase Record Card */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 bg-[#181a1f] rounded-2xl p-6 border border-white/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Purchase Record</span>
                  <span className="px-2 py-1 bg-white/5 text-zinc-400 rounded text-xs">Excel Upload</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Supplier</div>
                    <div className="text-white font-medium">Sri Lakshmi Traders</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Invoice</div>
                      <div className="text-zinc-300 font-mono text-sm">INV-1045</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Date</div>
                      <div className="text-zinc-300 text-sm">12 Aug 2026</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Amount</div>
                    <div className="text-2xl font-bold text-white">₹12,400</div>
                  </div>
                </div>
              </motion.div>

              {/* Match Confidence Center */}
              <div className="flex flex-col items-center justify-center py-8 md:py-0 relative z-20">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                  className="w-32 h-32 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 flex flex-col items-center justify-center relative shadow-[0_0_30px_-5px_rgba(255,107,44,0.3)] backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-[#FF6B2C]">97.4%</div>
                  <div className="text-[10px] uppercase font-semibold text-[#FF6B2C] tracking-widest text-center mt-1">Match<br/>Confidence</div>
                  
                  {/* Rotating dashed ring */}
                  <motion.svg 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)]"
                  >
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#FF6B2C" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
                  </motion.svg>
                </motion.div>
              </div>

              {/* GSTR-2B Record Card */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 bg-[#181a1f] rounded-2xl p-6 border border-white/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">GSTR-2B Record</span>
                  <span className="px-2 py-1 bg-[#FF6B2C]/10 text-[#FF6B2C] rounded text-xs font-medium border border-[#FF6B2C]/20">Auto-fetched</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Supplier</div>
                    <div className="text-white font-medium">Sree Laxmi Traders</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Invoice</div>
                      <div className="text-zinc-300 font-mono text-sm">INV1045</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Date</div>
                      <div className="text-zinc-300 text-sm">13 Aug 2026</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Amount</div>
                    <div className="text-2xl font-bold text-white">₹12,400</div>
                  </div>
                </div>
              </motion.div>
              
            </div>

            {/* AI Insights Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-[#0f1115] rounded-xl p-6 border border-white/5 flex flex-col md:flex-row gap-8 items-start md:items-center"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-3">AI Insights</div>
                <ul className="space-y-2">
                  {[
                    "Supplier names are highly similar phonetically",
                    "Invoice numbers match after normalization",
                    "Amounts match exactly",
                    "Date difference: 1 day (acceptable range)"
                  ].map((insight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-auto bg-[#181a1f] p-4 rounded-lg border border-white/5">
                <div className="text-xs text-zinc-500 mb-2">Suggested Correction:</div>
                <div className="text-sm text-white flex items-center gap-2">
                  <span className="line-through text-zinc-500">Sree Laxmi</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                  <span className="text-[#FF6B2C]">Sri Lakshmi Traders</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
