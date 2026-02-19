import TopNav from "@/components/TopNav";

export default function PurchaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
