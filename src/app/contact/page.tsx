"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, User, Send, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Get in <span className="text-[#FF6B2C]">Touch</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Have questions about InvoiceMatch AI or want to explore an enterprise integration? Our team is here to help you out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                <p className="text-zinc-400 mb-8">
                  Fill out the form and we'll get back to you within 24 hours. We're also available for quick chats and direct support.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#12141a] border border-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#FF6B2C]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email Support</h4>
                    <p className="text-zinc-400 text-sm">support@invoicematch.ai</p>
                    <p className="text-zinc-500 text-xs mt-1">Available 24/7 for urgent issues</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#12141a] border border-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#FF6B2C]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Sales & Partnerships</h4>
                    <p className="text-zinc-400 text-sm">sales@invoicematch.ai</p>
                    <p className="text-zinc-500 text-xs mt-1">Mon-Fri, 9am - 6pm IST</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#12141a] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FF6B2C] rounded-full blur-[100px] opacity-10 pointer-events-none" />
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 min-h-[300px]">
                  <div className="w-16 h-16 bg-[#181a1f] border border-white/10 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#FF6B2C]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-zinc-400">Thanks for reaching out. We'll get back to you shortly.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe" 
                        className="w-full bg-[#181a1f] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#FF6B2C]/50 focus:ring-1 focus:ring-[#FF6B2C]/50 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="name@company.com" 
                        className="w-full bg-[#181a1f] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#FF6B2C]/50 focus:ring-1 focus:ring-[#FF6B2C]/50 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Message</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="How can we help you?" 
                      rows={4}
                      className="w-full bg-[#181a1f] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B2C]/50 focus:ring-1 focus:ring-[#FF6B2C]/50 transition-all placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full py-3 mt-2" 
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
