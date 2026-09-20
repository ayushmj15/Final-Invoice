"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function DataVisualization() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Stop matching rows.<br />
              <span className="text-zinc-500">Start seeing insights.</span>
            </h2>
            <p className="text-zinc-400 mb-10 max-w-lg leading-relaxed">
              Process thousands of invoices in seconds. Get a clear overview of your reconciliation status instantly, so you know exactly where to focus your attention.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <StatCard label="Invoices Analyzed" value={1248} />
              <StatCard label="Matched" value={1183} color="text-green-500" />
              <StatCard label="Needs Review" value={43} color="text-yellow-500" />
              <StatCard label="Mismatches" value={22} color="text-red-500" />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Circular Chart Background */}
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#181a1f" strokeWidth="10" />
                
                {/* 95% Match Arc */}
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#FF6B2C" 
                  strokeWidth="10" 
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 283" }}
                  whileInView={{ strokeDasharray: "268.85 283" }} // 95% of 2*pi*45
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-5xl font-bold text-white mb-2"
                >
                  95%
                </motion.div>
                <div className="text-sm font-medium text-zinc-400 uppercase tracking-widest">
                  Matched
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, color = "text-white" }: { label: string, value: number, color?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500;
      const incrementTime = 20;
      const step = Math.ceil((end / duration) * incrementTime);
      
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="bg-[#12141a] border border-white/5 p-6 rounded-2xl">
      <div className={`text-3xl font-bold mb-2 ${color}`}>{count.toLocaleString()}</div>
      <div className="text-sm text-zinc-500 font-medium">{label}</div>
    </div>
  );
}
