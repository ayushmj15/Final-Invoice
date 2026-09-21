import { create } from 'zustand';

export type InvoiceRecord = {
  supplier: string;
  invoice: string;
  date: string;
  amount: number;
  raw?: any;
};

export type MatchResult = {
  id: string;
  bookSupplier: string;
  bookInvoice: string;
  bookDate: string;
  bookAmount: string;
  gstrSupplier: string;
  gstrInvoice: string;
  gstrDate: string;
  gstrAmount: string;
  confidence: number;
  status: "Matched" | "Review" | "Mismatch" | "Missing";
  insights: string[];
  suggestion: string | null;
};

interface ReconcileState {
  purchaseData: InvoiceRecord[];
  gstrData: InvoiceRecord[];
  results: MatchResult[];
  
  setPurchaseData: (data: InvoiceRecord[]) => void;
  setGstrData: (data: InvoiceRecord[]) => void;
  setResults: (results: MatchResult[]) => void;
  clearData: () => void;
}

export const useReconcileStore = create<ReconcileState>((set) => ({
  purchaseData: [],
  gstrData: [],
  results: [],
  
  setPurchaseData: (data) => set({ purchaseData: data }),
  setGstrData: (data) => set({ gstrData: data }),
  setResults: (results) => set({ results }),
  
  clearData: () => set({ purchaseData: [], gstrData: [], results: [] }),
}));
