import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f1115] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#181a1f] border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#FF6B2C]" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                InvoiceMatch <span className="text-[#FF6B2C]">AI</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Find every match. Catch every mismatch.
            </p>
            <p className="text-zinc-500 text-xs">
              Built for India&apos;s micro-businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm text-zinc-400 hover:text-[#FF6B2C] transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-[#FF6B2C] transition-colors">How It Works</Link></li>
              <li><Link href="/reconcile" className="text-sm text-zinc-400 hover:text-[#FF6B2C] transition-colors">Start Reconciliation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-zinc-400 hover:text-[#FF6B2C] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-[#FF6B2C] transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-zinc-400 hover:text-[#FF6B2C] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-[#FF6B2C] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} InvoiceMatch AI. All rights reserved.
          </p>
          <p className="text-zinc-600 text-xs">
            Disclaimer: AI suggestions should be reviewed before making accounting or tax decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
