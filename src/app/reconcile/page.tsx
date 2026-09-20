"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UploadCloud, FileSpreadsheet, FileText, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReconcileUploadPage() {
  const router = useRouter();
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null);
  const [gstrFile, setGstrFile] = useState<File | null>(null);
  const [isHoveringPurchase, setIsHoveringPurchase] = useState(false);
  const [isHoveringGstr, setIsHoveringGstr] = useState(false);

  // Mocking file upload for demo purposes
  const handleFileUpload = (type: "purchase" | "gstr") => {
    // We just mock a file instead of real file upload for the UI demo
    const mockFile = new File(["dummy content"], type === "purchase" ? "purchase_records.xlsx" : "gstr_2b.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    if (type === "purchase") {
      setPurchaseFile(mockFile);
    } else {
      setGstrFile(mockFile);
    }
  };

  const handleStartMatching = () => {
    if (purchaseFile && gstrFile) {
      router.push("/reconcile/processing");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Start a reconciliation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400"
          >
            Upload your purchase books and GSTR-2B data to begin AI matching.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Purchase Records Upload */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${isHoveringPurchase || purchaseFile ? "border-[#FF6B2C] bg-[#FF6B2C]/5" : "border-zinc-800 bg-[#12141a] hover:border-zinc-600"}`}
            onMouseEnter={() => setIsHoveringPurchase(true)}
            onMouseLeave={() => setIsHoveringPurchase(false)}
            onClick={() => !purchaseFile && handleFileUpload("purchase")}
          >
            {purchaseFile ? (
              <div className="flex flex-col items-center justify-center w-full">
                <FileSpreadsheet className="w-16 h-16 text-[#FF6B2C] mb-4" />
                <div className="text-white font-medium mb-1">{purchaseFile.name}</div>
                <div className="text-zinc-500 text-sm mb-6">1,248 records detected</div>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setPurchaseFile(null); }} className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300">
                  <Trash2 className="w-4 h-4 mr-2" /> Remove File
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-6">
                  <UploadCloud className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Purchase Records</h3>
                <p className="text-zinc-500 text-sm mb-6 max-w-[200px]">Drag & drop your Excel/CSV file here or click to browse</p>
                <Button variant="secondary" size="sm" className="pointer-events-none">Browse Files</Button>
              </div>
            )}
          </motion.div>

          {/* GSTR-2B Upload */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${isHoveringGstr || gstrFile ? "border-[#FF6B2C] bg-[#FF6B2C]/5" : "border-zinc-800 bg-[#12141a] hover:border-zinc-600"}`}
            onMouseEnter={() => setIsHoveringGstr(true)}
            onMouseLeave={() => setIsHoveringGstr(false)}
            onClick={() => !gstrFile && handleFileUpload("gstr")}
          >
            {gstrFile ? (
              <div className="flex flex-col items-center justify-center w-full">
                <FileText className="w-16 h-16 text-[#FF6B2C] mb-4" />
                <div className="text-white font-medium mb-1">{gstrFile.name}</div>
                <div className="text-zinc-500 text-sm mb-6">1,231 records detected</div>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setGstrFile(null); }} className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300">
                  <Trash2 className="w-4 h-4 mr-2" /> Remove File
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-6">
                  <UploadCloud className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">GSTR-2B</h3>
                <p className="text-zinc-500 text-sm mb-6 max-w-[200px]">Drag & drop your Excel/CSV file here or click to browse</p>
                <Button variant="secondary" size="sm" className="pointer-events-none">Browse Files</Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: purchaseFile && gstrFile ? 1 : 0, y: purchaseFile && gstrFile ? 0 : 20 }}
          className="flex justify-center"
        >
          <Button 
            size="lg" 
            variant="primary" 
            disabled={!purchaseFile || !gstrFile}
            onClick={handleStartMatching}
            className="group box-glow text-lg px-12"
          >
            Start AI Matching
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
