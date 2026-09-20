import { Navbar } from "@/components/layout/navbar";

export default function ReconcileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 flex flex-col">
        {children}
      </main>
    </div>
  );
}
