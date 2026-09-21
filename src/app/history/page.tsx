"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Search, History, Trash2, Calendar, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();
  const user = useAppStore(state => state.user);
  const history = useAppStore(state => state.history);
  const clearHistory = useAppStore(state => state.clearHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!mounted || !user) {
    return null;
  }

  const filteredHistory = history.filter(h => 
    h.fileName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.date.includes(searchTerm)
  );

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
              <History className="w-8 h-8 text-[#FF6B2C]" />
              Export History
            </h1>
            <p className="text-zinc-400">View and manage your past reconciliation exports.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search exports..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#12141a] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B2C]/50 transition-colors"
              />
            </div>
            {history.length > 0 && (
              <Button variant="outline" onClick={clearHistory} className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <div className="bg-[#12141a] border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <History className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No history yet</h3>
            <p className="text-zinc-500 mb-8 max-w-md">You haven't exported any reconciliations. Start a new reconciliation to generate your first report.</p>
            <Button variant="primary" onClick={() => router.push("/reconcile")}>
              Start Reconciliation
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => {
              const date = new Date(item.date);
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.id}
                  className="bg-[#12141a] border border-white/5 hover:border-white/10 transition-colors rounded-2xl p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B2C]/10 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-6 h-6 text-[#FF6B2C]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{item.fileName}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {date.toLocaleDateString()} at {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:block"></span>
                        <span>{item.totalRecords} records</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex flex-col items-center">
                        <span className="text-green-500 font-semibold">{item.matchedCount}</span>
                        <span className="text-zinc-500 text-xs">Matched</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-yellow-500 font-semibold">{item.reviewCount}</span>
                        <span className="text-zinc-500 text-xs">Review</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-red-500 font-semibold">{item.mismatchCount}</span>
                        <span className="text-zinc-500 text-xs">Mismatch</span>
                      </div>
                    </div>
                    
                    <Button variant="secondary" size="sm" className="shrink-0" onClick={() => alert("Downloading past report feature is simulated. In a real app, this would fetch from a database.")}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
            
            {filteredHistory.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                No exports match your search.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
