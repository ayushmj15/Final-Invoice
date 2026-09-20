"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

const stages = [
  "Reading files...",
  "Cleaning invoice data...",
  "Normalizing supplier names...",
  "Comparing invoice numbers...",
  "Calculating similarities...",
  "Running ML matcher...",
  "Generating reconciliation report..."
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // Simulate processing time
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => router.push("/reconcile/results"), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200); // 1.2s per stage for demo purposes

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0a0a0a] overflow-hidden">
      
      {/* Central Rotating AI Orb */}
      <div className="relative mb-16 flex items-center justify-center h-64 w-64">
        {/* Glow */}
        <div className="absolute inset-0 bg-[#FF6B2C] rounded-full opacity-20 blur-[60px] animate-pulse" />
        
        {/* Core */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 bg-[#FF6B2C] rounded-full z-10 shadow-[0_0_40px_rgba(255,107,44,0.6)]"
        />
        
        {/* Orbit 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute w-40 h-40 border border-[#FF6B2C]/30 rounded-full flex items-center justify-start"
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white] -ml-1.5" />
        </motion.div>
        
        {/* Orbit 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute w-56 h-56 border border-zinc-700/50 rounded-full flex items-center justify-start"
        >
          <div className="w-2 h-2 rounded-full bg-zinc-400 -ml-1" />
        </motion.div>
      </div>

      <div className="w-full max-w-md bg-[#12141a] border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10">
        <h2 className="text-2xl font-semibold text-white mb-6 tracking-tight text-center">
          Analyzing Invoices
        </h2>
        
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStage;
            const isCurrent = index === currentStage;
            const isPending = index > currentStage;

            return (
              <motion.div 
                key={stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
                className={`flex items-center gap-3 ${isCurrent ? "text-white" : isCompleted ? "text-zinc-500" : "text-zinc-700"}`}
              >
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-[#FF6B2C]" />}
                {isCurrent && <Loader2 className="w-5 h-5 text-[#FF6B2C] animate-spin" />}
                {isPending && <Circle className="w-5 h-5" />}
                
                <span className={`text-sm font-medium ${isCurrent ? "text-white" : ""}`}>
                  {stage}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#FF6B2C]"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
