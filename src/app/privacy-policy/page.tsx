"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert prose-zinc max-w-none space-y-8"
          >
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <div className="text-zinc-400 space-y-4 leading-relaxed">
                <p>
                  At InvoiceMatch AI, we collect information that you provide directly to us when you create an account, upload invoices, or communicate with our support team. This may include:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Account information (name, email address, company details)</li>
                  <li>Financial data (invoices, GSTR-2B data) uploaded for reconciliation</li>
                  <li>Usage data (how you interact with our service)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <div className="text-zinc-400 space-y-4 leading-relaxed">
                <p>
                  The primary purpose of collecting your information is to provide you with accurate invoice reconciliation services. Specifically, we use your data to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Process and match your purchase registers with GSTR-2B data.</li>
                  <li>Improve the accuracy of our AI models.</li>
                  <li>Provide customer support and respond to your inquiries.</li>
                  <li>Send important notices regarding your account or our service.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
              <div className="text-zinc-400 space-y-4 leading-relaxed">
                <p>
                  We take the security of your financial data very seriously. All data transmitted to and from InvoiceMatch AI is encrypted using industry-standard protocols. We implement strict access controls and regular security audits to ensure your data remains protected. We do not sell your personal or financial data to third parties.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
              <div className="text-zinc-400 space-y-4 leading-relaxed">
                <p>
                  We retain your account information and uploaded data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. You can request the deletion of your account and associated data at any time by contacting our support team.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
              <div className="text-zinc-400 space-y-4 leading-relaxed">
                <p>
                  If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@invoicematch.ai" className="text-[#FF6B2C] hover:underline">privacy@invoicematch.ai</a>.
                </p>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
