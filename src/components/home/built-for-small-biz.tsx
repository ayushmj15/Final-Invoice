"use client";

import { motion } from "framer-motion";
import { Store, UserCircle, Users } from "lucide-react";

export function BuiltForSmallBiz() {
  return (
    <section className="py-24 bg-white dark:bg-[#fafafa]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900"
          >
            Enterprise-grade reconciliation.<br />
            <span className="text-zinc-400">Without enterprise complexity.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-2xl mx-auto text-lg"
          >
            We built InvoiceMatch AI specifically for Indian businesses that don&apos;t have expensive ERP systems but still need perfect GST compliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <BizCard 
            icon={<Store />}
            title="Small Traders"
            description="Reconcile monthly purchase bills against GSTR-2B effortlessly without hiring extra help."
            delay={0.2}
          />
          <BizCard 
            icon={<UserCircle />}
            title="Freelancers & Professionals"
            description="Ensure you get every rupee of Input Tax Credit you deserve without accounting headaches."
            delay={0.3}
          />
          <BizCard 
            icon={<Users />}
            title="Micro MSMEs"
            description="Process hundreds of supplier invoices in seconds. Scale your compliance as you grow."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

function BizCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-white rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-center mb-6 text-zinc-900">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-zinc-900">{title}</h3>
      <p className="text-zinc-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
