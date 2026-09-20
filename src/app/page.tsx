import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ProductDemo } from "@/components/home/product-demo";
import { Features } from "@/components/home/features";
import { DataVisualization } from "@/components/home/data-viz";
import { BuiltForSmallBiz } from "@/components/home/built-for-small-biz";
import { AIExplanation } from "@/components/home/ai-explanation";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f1115]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProductDemo />
      <Features />
      <DataVisualization />
      <BuiltForSmallBiz />
      <AIExplanation />
      <Footer />
    </main>
  );
}
