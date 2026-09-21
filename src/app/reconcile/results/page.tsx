"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Search, CheckCircle2, AlertCircle, XCircle, ArrowRight, X, FileQuestion, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReconcileStore, MatchResult } from "@/store/reconcile-store";
import { useAppStore } from "@/store/app-store";
import * as XLSX from "xlsx";

export default function ResultsDashboard() {
  const router = useRouter();
  const results = useReconcileStore(state => state.results);
  const addHistoryRecord = useAppStore(state => state.addHistoryRecord);
  
  const [activeTab, setActiveTab] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState<MatchResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (results.length === 0) {
      router.push("/reconcile");
    }
  }, [results, router]);

  if (!mounted || results.length === 0) return null; // Prevents hydration mismatch and flash of empty screen

  const tabs = ["All", "Matched", "Review", "Mismatch", "Missing"];
  
  const filteredData = results.filter(item => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  const matchedCount = results.filter(r => r.status === "Matched").length;
  const reviewCount = results.filter(r => r.status === "Review").length;
  const mismatchCount = results.filter(r => r.status === "Mismatch").length;
  const missingCount = results.filter(r => r.status === "Missing").length;

  const handleExport = () => {
    // 1. Create a simplified JSON array for export
    const exportData = results.map(r => ({
      "Book Supplier": r.bookSupplier,
      "Book Invoice": r.bookInvoice,
      "Book Date": r.bookDate,
      "Book Amount": r.bookAmount,
      "GSTR Supplier": r.gstrSupplier,
      "GSTR Invoice": r.gstrInvoice,
      "GSTR Date": r.gstrDate,
      "GSTR Amount": r.gstrAmount,
      "Match Confidence (%)": r.confidence,
      "Status": r.status,
      "AI Insights": r.insights.join("; "),
      "Suggested Action": r.suggestion || ""
    }));

    // 2. Generate Excel file (using Blob to prevent corruption)
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reconciliation Results");
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
    const fileName = `Reconciliation_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // 3. Save to History
    addHistoryRecord({
      totalRecords: results.length,
      matchedCount,
      mismatchCount,
      reviewCount,
      missingCount,
      fileName
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden relative">
      <div className="container mx-auto px-6 py-8 flex-1 flex flex-col max-w-7xl">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Reconciliation Complete</h1>
            <p className="text-zinc-400 text-sm">{results.length} purchase records analyzed against GSTR-2B</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-[#12141a] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-xs text-zinc-500 font-medium">Matched</div>
                <div className="text-lg font-bold text-white leading-none">{matchedCount}</div>
              </div>
            </div>
            <div className="bg-[#12141a] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-xs text-zinc-500 font-medium">Review</div>
                <div className="text-lg font-bold text-white leading-none">{reviewCount}</div>
              </div>
            </div>
            <div className="bg-[#12141a] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <div className="text-xs text-zinc-500 font-medium">Mismatch</div>
                <div className="text-lg font-bold text-white leading-none">{mismatchCount}</div>
              </div>
            </div>
            <div className="bg-[#12141a] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
              <FileQuestion className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-xs text-zinc-500 font-medium">Missing</div>
                <div className="text-lg font-bold text-white leading-none">{missingCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex bg-[#12141a] p-1 rounded-lg border border-white/5 overflow-x-auto max-w-full">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={() => router.push("/history")} className="hidden sm:flex border-white/10">
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search invoices..." 
                className="w-full bg-[#12141a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B2C]/50 transition-colors"
              />
            </div>
            <Button variant="secondary" size="sm" onClick={handleExport} className="hidden sm:flex group">
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#12141a] border border-white/5 rounded-2xl flex-1 overflow-hidden flex flex-col shadow-xl">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-zinc-900/50">
                  <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Supplier</th>
                  <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Book Invoice</th>
                  <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">GSTR Invoice</th>
                  <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Book Amt</th>
                  <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">GSTR Amt</th>
                  <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Confidence</th>
                  <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedInvoice(row)}
                    className="hover:bg-zinc-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="p-4 text-sm font-medium text-white max-w-[200px] truncate" title={row.bookSupplier}>{row.bookSupplier}</td>
                    <td className="p-4 text-sm text-zinc-400 font-mono">{row.bookInvoice}</td>
                    <td className="p-4 text-sm text-zinc-400 font-mono">{row.gstrInvoice}</td>
                    <td className="p-4 text-sm text-white font-medium">{row.bookAmount}</td>
                    <td className="p-4 text-sm text-white font-medium">{row.gstrAmount}</td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${row.confidence >= 90 ? "bg-green-500" : row.confidence >= 60 ? "bg-yellow-500" : "bg-red-500"}`} 
                            style={{ width: `${Math.max(row.confidence, 5)}%` }} // At least 5% so bar is slightly visible
                          />
                        </div>
                        <span className={`font-mono text-xs ${row.confidence >= 90 ? "text-green-400" : row.confidence >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                          {row.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border whitespace-nowrap
                        ${row.status === "Matched" ? "bg-green-500/10 text-green-400 border-green-500/20" : 
                          row.status === "Review" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : 
                          row.status === "Mismatch" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-zinc-500">
                      No records found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Comparison Side Panel */}
      <AnimatePresence>
        {selectedInvoice && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#0f1115] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Invoice Comparison</h3>
                  <p className="text-sm text-zinc-400 mt-1">Reviewing potential matches and differences</p>
                </div>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Score & Status */}
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 
                    ${selectedInvoice.confidence >= 90 ? "border-green-500 text-green-500" : 
                      selectedInvoice.confidence >= 60 ? "border-yellow-500 text-yellow-500" : 
                      selectedInvoice.status === "Missing" ? "border-zinc-600 text-zinc-500" : "border-red-500 text-red-500"}`}>
                    <span className="text-2xl font-bold">{selectedInvoice.confidence}%</span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Match Status</div>
                    <div className={`text-xl font-bold ${
                      selectedInvoice.status === "Matched" ? "text-green-500" : 
                      selectedInvoice.status === "Review" ? "text-yellow-500" : 
                      selectedInvoice.status === "Missing" ? "text-zinc-500" : "text-red-500"
                    }`}>
                      {selectedInvoice.status}
                    </div>
                  </div>
                </div>

                {/* Side-by-side data */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Purchase Book */}
                  <div className="bg-[#181a1f] border border-white/5 rounded-xl p-5">
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Purchase Book</div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Supplier</div>
                        <div className="text-sm font-medium text-white break-words">{selectedInvoice.bookSupplier}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Invoice Number</div>
                        <div className="text-sm font-mono text-zinc-300 break-words">{selectedInvoice.bookInvoice}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Date</div>
                        <div className="text-sm text-zinc-300">{selectedInvoice.bookDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Amount</div>
                        <div className="text-lg font-bold text-white">{selectedInvoice.bookAmount}</div>
                      </div>
                    </div>
                  </div>

                  {/* GSTR-2B */}
                  <div className="bg-[#181a1f] border border-[#FF6B2C]/20 rounded-xl p-5 opacity-90">
                    <div className="text-xs font-semibold text-[#FF6B2C] uppercase tracking-wider mb-4 border-b border-[#FF6B2C]/10 pb-2">GSTR-2B Match</div>
                    
                    {selectedInvoice.status === "Missing" ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <FileQuestion className="w-8 h-8 text-zinc-600 mb-2" />
                        <span className="text-sm text-zinc-500">No match found in GSTR-2B data.</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Supplier</div>
                          <div className={`text-sm font-medium break-words ${selectedInvoice.bookSupplier !== selectedInvoice.gstrSupplier ? "text-yellow-400" : "text-white"}`}>
                            {selectedInvoice.gstrSupplier}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Invoice Number</div>
                          <div className={`text-sm font-mono break-words ${selectedInvoice.bookInvoice !== selectedInvoice.gstrInvoice ? "text-yellow-400" : "text-zinc-300"}`}>
                            {selectedInvoice.gstrInvoice}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Date</div>
                          <div className={`text-sm ${selectedInvoice.bookDate !== selectedInvoice.gstrDate ? "text-yellow-400" : "text-zinc-300"}`}>
                            {selectedInvoice.gstrDate}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 mb-1">Amount</div>
                          <div className={`text-lg font-bold ${selectedInvoice.bookAmount !== selectedInvoice.gstrAmount ? "text-red-400" : "text-white"}`}>
                            {selectedInvoice.gstrAmount}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <div className="text-sm font-semibold text-white mb-3">AI Reasoning</div>
                  <ul className="space-y-2 mb-4">
                    {selectedInvoice.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${selectedInvoice.status === "Missing" ? "text-zinc-500" : "text-[#FF6B2C]"}`} />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedInvoice.suggestion && (
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                      <div className="text-xs text-zinc-500 mb-1">Suggested Action:</div>
                      <div className="text-sm text-white">{selectedInvoice.suggestion}</div>
                    </div>
                  )}
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-[#0a0a0a]">
                <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                  Close
                </Button>
                {selectedInvoice.status !== "Matched" && (
                  <Button variant="secondary" className="border-zinc-700">
                    Flag Issue
                  </Button>
                )}
                {selectedInvoice.status !== "Missing" && (
                  <Button variant="primary">
                    {selectedInvoice.status === "Matched" ? "Mark as Correct" : "Accept Suggestion"}
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
