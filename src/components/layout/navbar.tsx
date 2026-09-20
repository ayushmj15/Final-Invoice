"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CheckCircle2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(15, 17, 21, 0)", "rgba(15, 17, 21, 0.8)"]
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      <motion.header
        style={{
          backgroundColor: navBackground,
          borderBottom: "1px solid",
          borderColor: navBorder,
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#181a1f] border border-white/10 group-hover:border-[#FF6B2C]/50 transition-colors">
              <CheckCircle2 className="w-6 h-6 text-[#FF6B2C]" />
              <div className="absolute inset-0 bg-[#FF6B2C] opacity-20 blur-md rounded-full group-hover:opacity-40 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              InvoiceMatch <span className="text-[#FF6B2C]">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <Link href="/signin" className="text-sm text-zinc-300 hover:text-white transition-colors font-medium">
                Sign In
              </Link>
              <Link href="/reconcile">
                <Button size="sm" variant="primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0f1115] pt-24 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-6 text-lg">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-300 hover:text-white block w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-6 mt-6 border-t border-white/10">
                <Link
                  href="/signin"
                  className="text-zinc-300 hover:text-white block w-full mb-6"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link href="/reconcile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full" variant="primary">
                    Get Started
                  </Button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
