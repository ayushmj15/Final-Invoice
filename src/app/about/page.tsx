"use client";

import { motion } from "framer-motion";
import { Users, Target, Shield, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
  const values = [
    {
      icon: <Users className="w-6 h-6 text-[#FF6B2C]" />,
      title: "Built for Businesses",
      description: "We understand the unique challenges faced by small to medium enterprises in India and build solutions tailored for them."
    },
    {
      icon: <Target className="w-6 h-6 text-[#FF6B2C]" />,
      title: "Accuracy First",
      description: "Our AI is trained to catch the smallest mismatches, ensuring your reconciliation process is foolproof."
    },
    {
      icon: <Shield className="w-6 h-6 text-[#FF6B2C]" />,
      title: "Data Security",
      description: "Your financial data is encrypted and handled with the highest standards of security and privacy."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B2C]" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Empowering India's <span className="text-[#FF6B2C]">Micro-businesses</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              InvoiceMatch AI was born out of a simple observation: businesses spend countless hours manually matching GST invoices, a process prone to human error. We decided to fix that.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#12141a] border border-white/10 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF6B2C] rounded-full blur-[120px] opacity-5 pointer-events-none" />
            
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>
                We believe that technology should be an enabler, not a hurdle. For millions of small and medium enterprises across India, compliance and reconciliation are major pain points that take time away from what truly matters—growing the business.
              </p>
              <p>
                By leveraging advanced Artificial Intelligence, InvoiceMatch AI automates the tedious task of matching purchase registers with GSTR-2B data. Our mission is to provide an accessible, fast, and highly accurate tool that gives business owners peace of mind.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-[#12141a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
