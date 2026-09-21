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

        // Try to find exact invoice number match first
        const pInvNormal = String(purchase.invoice).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        
        let possibleMatches = gstrData.filter(g => {
            const gInvNormal = String(g.invoice).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            return gInvNormal === pInvNormal;
        });

        // If no exact invoice match, try fuzzy matching supplier names
        if (possibleMatches.length === 0) {
            if (gstrSupplierNames.length > 0 && purchase.supplier) {
                const matchScores = stringSimilarity.findBestMatch(String(purchase.supplier), gstrSupplierNames);
                if (matchScores.bestMatch.rating > 0.6) {
                    possibleMatches = gstrData.filter(g => String(g.supplier) === matchScores.bestMatch.target);
                }
            }
        }

        if (possibleMatches.length > 0) {
            // Pick the best among possible matches by comparing amounts and supplier similarity
            possibleMatches.forEach(gstr => {
                let confidence = 0;
                let insights = [];
                
                // 1. Supplier Name similarity
                let suppScore = 0;
                if (purchase.supplier && gstr.supplier) {
                    suppScore = stringSimilarity.compareTwoStrings(String(purchase.supplier), String(gstr.supplier));
                }
                confidence += suppScore * 40; // 40% weight
                if (suppScore > 0.9) insights.push("Supplier name nearly identical");
                else if (suppScore > 0.6) insights.push("Supplier name partially matches");

                // 2. Invoice Number
                const pInv = String(purchase.invoice).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                const gInv = String(gstr.invoice).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                if (pInv === gInv) {
                    confidence += 40; // 40% weight
                    insights.push("Invoice numbers match exactly");
                } else if (pInv.includes(gInv) || gInv.includes(pInv)) {
                    confidence += 20;
                    insights.push("Invoice numbers partially match (possible padding difference)");
                }

                // 3. Amount
                const amtDiff = Math.abs((purchase.amount || 0) - (gstr.amount || 0));
                if (amtDiff < 1) {
                    confidence += 20; // 20% weight
                    insights.push("Amounts match exactly");
                } else if (amtDiff < 10) {
                    confidence += 10;
                    insights.push("Minor rounding difference in amounts");
                } else {
                    insights.push("Significant amount difference");
                }

                if (confidence > highestConfidence) {
                    highestConfidence = confidence;
                    bestMatch = gstr;
                    matchInsights = insights;
                }
            });
        }

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
