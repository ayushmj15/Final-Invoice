"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useReconcileStore, MatchResult } from "@/store/reconcile-store";
import stringSimilarity from "string-similarity";

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
  
  const purchaseData = useReconcileStore(state => state.purchaseData);
  const gstrData = useReconcileStore(state => state.gstrData);
  const setResults = useReconcileStore(state => state.setResults);
  const isMatchingStarted = useRef(false);

  useEffect(() => {
    // If no data, redirect back
    if (purchaseData.length === 0 || gstrData.length === 0) {
      router.push("/reconcile");
      return;
    }

    if (isMatchingStarted.current) return;
    isMatchingStarted.current = true;

    // Simulate processing stages for UI
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    // Run actual matching logic in a timeout to not block initial render
    setTimeout(() => {
      const results: MatchResult[] = [];
      let idCounter = 1;

      // Extract just the supplier names from GSTR for fuzzy matching
      const gstrSupplierNames = gstrData.map(g => String(g.supplier));

      // Go through each purchase record and find best match in GSTR
      purchaseData.forEach(purchase => {
        let bestMatch: any = null;
        let highestConfidence = 0;
        let matchInsights: string[] = [];
        let status: MatchResult["status"] = "Missing";
        let suggestion: string | null = null;

        // 1. Normalize strings
        const normalizeSupplier = (name: string) => {
            let n = String(name).toLowerCase();
            n = n.replace(/[^a-z0-9\s]/g, ''); // remove punctuation
            n = n.replace(/\b(sri|shri|sree)\b/g, 'sree');
            n = n.replace(/\b(m\/s|ms)\b/g, '');
            n = n.replace(/\b(co|company|ltd|limited|pvt|private|inc|corp)\b/g, '');
            return n.trim();
        };

        const pInvNormal = String(purchase.invoice).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const pSuppNormal = normalizeSupplier(purchase.supplier || "");

        // 2. Gather Candidates (anything with a somewhat similar name, similar invoice, or exact amount)
        let candidates = gstrData.filter(g => {
            const gInvNormal = String(g.invoice).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const gSuppNormal = normalizeSupplier(g.supplier || "");
            
            // Candidate if invoice matches (even partially)
            if (pInvNormal && gInvNormal && (pInvNormal.includes(gInvNormal) || gInvNormal.includes(pInvNormal))) return true;
            
            // Candidate if supplier is fuzzy match
            if (pSuppNormal && gSuppNormal && stringSimilarity.compareTwoStrings(pSuppNormal, gSuppNormal) > 0.4) return true;
            
            // Candidate if amount is exactly the same or very close
            const pAmt = Number(purchase.amount || 0);
            const gAmt = Number(g.amount || 0);
            if (pAmt > 0 && Math.abs(pAmt - gAmt) <= 2) return true;

            return false;
        });

        // If no candidates found by heuristics, fallback to checking all (expensive but safe)
        if (candidates.length === 0) {
            candidates = gstrData; 
        }

        // 3. Evaluate Candidates
        candidates.forEach(gstr => {
            let confidence = 0;
            let insights = [];
            
            // Supplier Score (Max 40)
            const gSuppNormal = normalizeSupplier(gstr.supplier || "");
            let suppScore = stringSimilarity.compareTwoStrings(pSuppNormal, gSuppNormal);
            
            if (suppScore > 0.85) {
                confidence += 40;
                insights.push("Supplier name highly matches");
            } else if (suppScore > 0.4) {
                confidence += suppScore * 40;
                insights.push("Supplier name partially matches");
            } else {
                insights.push("Supplier names differ");
            }

            // Invoice Score (Max 40)
            const gInvNormal = String(gstr.invoice).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            if (pInvNormal && gInvNormal && pInvNormal === gInvNormal) {
                confidence += 40;
                insights.push("Invoice numbers match exactly");
            } else if (pInvNormal && gInvNormal && (pInvNormal.includes(gInvNormal) || gInvNormal.includes(pInvNormal))) {
                confidence += 25;
                insights.push("Invoice numbers partially match");
            } else {
                insights.push("Invoice numbers differ");
            }

            // Amount Score (Max 20)
            const pAmt = Number(purchase.amount || 0);
            const gAmt = Number(gstr.amount || 0);
            const amtDiff = Math.abs(pAmt - gAmt);
            
            if (amtDiff <= 2) { // Allow up to 2 units rounding difference without penalty
                confidence += 20;
                if (amtDiff > 0) insights.push("Amounts match with minor rounding");
                else insights.push("Amounts match exactly");
            } else if (pAmt > 0 && (amtDiff / pAmt) <= 0.05) { // within 5%
                confidence += 10;
                insights.push("Amounts differ slightly (within 5%)");
            } else {
                insights.push("Significant amount difference");
            }

            // Small boost for near-perfect matches
            if (confidence >= 95) confidence = 100;

            if (confidence > highestConfidence) {
                highestConfidence = confidence;
                bestMatch = gstr;
                matchInsights = insights;
            }
        });

        if (bestMatch) {
            // Determine status based on confidence
            if (highestConfidence >= 90) {
                status = "Matched";
                suggestion = null;
            } else if (highestConfidence >= 60) {
                status = "Review";
                suggestion = "Verify if these two records correspond to the same transaction.";
            } else {
                status = "Mismatch";
                suggestion = "Significant differences found. Manual reconciliation required.";
            }

            results.push({
                id: `res-${idCounter++}`,
                bookSupplier: String(purchase.supplier),
                bookInvoice: String(purchase.invoice),
                bookDate: String(purchase.date),
                bookAmount: purchase.amount?.toString() || "0",
                gstrSupplier: String(bestMatch.supplier),
                gstrInvoice: String(bestMatch.invoice),
                gstrDate: String(bestMatch.date),
                gstrAmount: bestMatch.amount?.toString() || "0",
                confidence: Math.round(highestConfidence),
                status,
                insights: matchInsights,
                suggestion
            });

            // Remove matched item from pool so it's not matched again (basic greedy approach)
            const idx = gstrData.indexOf(bestMatch);
            if (idx > -1) gstrData.splice(idx, 1);

        } else {
            // No match found
            results.push({
                id: `res-${idCounter++}`,
                bookSupplier: String(purchase.supplier),
                bookInvoice: String(purchase.invoice),
                bookDate: String(purchase.date),
                bookAmount: purchase.amount?.toString() || "0",
                gstrSupplier: "-",
                gstrInvoice: "-",
                gstrDate: "-",
                gstrAmount: "-",
                confidence: 0,
                status: "Missing",
                insights: ["No corresponding record found in GSTR-2B"],
                suggestion: "Check if the supplier failed to file their returns."
            });
        }
      });

      // Save results
      setResults(results);

      // Finish up UI
      clearInterval(stageInterval);
      setCurrentStage(stages.length - 1);
      setTimeout(() => router.push("/reconcile/results"), 1000);

    }, 2000); // Give the UI a bit of time to show the cool animation

    return () => clearInterval(stageInterval);
  }, [router, purchaseData, gstrData, setResults]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0a0a0a] overflow-hidden">
      
      {/* Central Rotating AI Orb */}
      <div className="relative mb-16 flex items-center justify-center h-64 w-64">
        <div className="absolute inset-0 bg-[#FF6B2C] rounded-full opacity-20 blur-[60px] animate-pulse" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 bg-[#FF6B2C] rounded-full z-10 shadow-[0_0_40px_rgba(255,107,44,0.6)]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute w-40 h-40 border border-[#FF6B2C]/30 rounded-full flex items-center justify-start"
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white] -ml-1.5" />
        </motion.div>
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
