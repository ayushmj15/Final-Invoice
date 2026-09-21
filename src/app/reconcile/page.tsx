"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UploadCloud, FileSpreadsheet, FileText, Trash2, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { useReconcileStore, InvoiceRecord } from "@/store/reconcile-store";

export default function ReconcileUploadPage() {
  const router = useRouter();
  const setPurchaseData = useReconcileStore(state => state.setPurchaseData);
  const setGstrData = useReconcileStore(state => state.setGstrData);

  const [purchaseFile, setPurchaseFile] = useState<File | null>(null);
  const [gstrFile, setGstrFile] = useState<File | null>(null);
  const [purchaseError, setPurchaseError] = useState<string>("");
  const [gstrError, setGstrError] = useState<string>("");
  const [isParsing, setIsParsing] = useState(false);

  const purchaseInputRef = useRef<HTMLInputElement>(null);
  const gstrInputRef = useRef<HTMLInputElement>(null);

  const parseExcelFile = (file: File): Promise<InvoiceRecord[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json: any[] = XLSX.utils.sheet_to_json(worksheet);
          
          const parsedRecords: InvoiceRecord[] = json.map(row => {
            // Very lenient auto-detection of common column names
            const getVal = (keys: string[]) => {
              const key = Object.keys(row).find(k => keys.some(searchKey => k.toLowerCase().includes(searchKey)));
              return key ? row[key] : "";
            };

            const supplier = getVal(["supplier", "party", "name", "vendor"]);
            const invoice = getVal(["invoice", "bill", "doc"]);
            const date = getVal(["date"]);
            const amount = parseFloat(getVal(["amount", "value", "total", "net"])) || 0;

            return {
              supplier: String(supplier),
              invoice: String(invoice),
              date: String(date),
              amount,
              raw: row
            };
          }).filter(r => r.supplier || r.invoice); // filter empty rows

          resolve(parsedRecords);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "purchase" | "gstr") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "purchase") {
      setPurchaseFile(file);
      setPurchaseError("");
    } else {
      setGstrFile(file);
      setGstrError("");
    }
  };

  const handleStartMatching = async () => {
    if (!purchaseFile || !gstrFile) return;
    
    setIsParsing(true);
    try {
      const purchaseRecords = await parseExcelFile(purchaseFile);
      const gstrRecords = await parseExcelFile(gstrFile);
      
      if (purchaseRecords.length === 0) {
        setPurchaseError("Could not find required columns or data in Purchase file.");
        setIsParsing(false);
        return;
      }
      if (gstrRecords.length === 0) {
        setGstrError("Could not find required columns or data in GSTR-2B file.");
        setIsParsing(false);
        return;
      }

      setPurchaseData(purchaseRecords);
      setGstrData(gstrRecords);
      router.push("/reconcile/processing");
    } catch (err) {
      console.error(err);
      alert("Error parsing files. Ensure they are valid Excel/CSV files.");
      setIsParsing(false);
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
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${purchaseFile ? "border-[#FF6B2C] bg-[#FF6B2C]/5" : purchaseError ? "border-red-500/50 bg-red-500/5" : "border-zinc-800 bg-[#12141a] hover:border-zinc-600 cursor-pointer"}`}
              onClick={() => !purchaseFile && purchaseInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={purchaseInputRef} 
                accept=".xlsx,.xls,.csv"
                onChange={(e) => handleFileUpload(e, "purchase")}
              />
              {purchaseFile ? (
                <div className="flex flex-col items-center justify-center w-full">
                  <FileSpreadsheet className="w-16 h-16 text-[#FF6B2C] mb-4" />
                  <div className="text-white font-medium mb-1 truncate max-w-[250px]">{purchaseFile.name}</div>
                  <div className="text-zinc-500 text-sm mb-6">Ready to parse</div>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setPurchaseFile(null); if(purchaseInputRef.current) purchaseInputRef.current.value=''; }} className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300">
                    <Trash2 className="w-4 h-4 mr-2" /> Remove File
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-6">
                    <UploadCloud className="w-8 h-8 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Purchase Records</h3>
                  <p className="text-zinc-500 text-sm mb-6 max-w-[200px]">Drag & drop your Excel/CSV file here or click to browse</p>
                  <Button variant="secondary" size="sm" className="pointer-events-none">Browse Files</Button>
                </div>
              )}
            </motion.div>
            {purchaseError && <div className="text-red-400 text-sm mt-3 flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4" /> {purchaseError}</div>}
          </div>

          {/* GSTR-2B Upload */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${gstrFile ? "border-[#FF6B2C] bg-[#FF6B2C]/5" : gstrError ? "border-red-500/50 bg-red-500/5" : "border-zinc-800 bg-[#12141a] hover:border-zinc-600 cursor-pointer"}`}
              onClick={() => !gstrFile && gstrInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={gstrInputRef} 
                accept=".xlsx,.xls,.csv"
                onChange={(e) => handleFileUpload(e, "gstr")}
              />
              {gstrFile ? (
                <div className="flex flex-col items-center justify-center w-full">
                  <FileText className="w-16 h-16 text-[#FF6B2C] mb-4" />
                  <div className="text-white font-medium mb-1 truncate max-w-[250px]">{gstrFile.name}</div>
                  <div className="text-zinc-500 text-sm mb-6">Ready to parse</div>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setGstrFile(null); if(gstrInputRef.current) gstrInputRef.current.value=''; }} className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300">
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
            {gstrError && <div className="text-red-400 text-sm mt-3 flex items-center justify-center gap-1"><AlertCircle className="w-4 h-4" /> {gstrError}</div>}
          </div>
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
            disabled={!purchaseFile || !gstrFile || isParsing}
            isLoading={isParsing}
            onClick={handleStartMatching}
            className="group box-glow text-lg px-12"
          >
            {isParsing ? "Parsing Files..." : "Start AI Matching"}
            {!isParsing && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
