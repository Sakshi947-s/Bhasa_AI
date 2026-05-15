import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-white overflow-hidden dark">
      <Sidebar />
      <main className="flex-1 ml-72 p-8 relative min-h-screen">
        {/* Animated Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-accent-blue/20 rounded-full blur-[150px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-purple/15 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-6xl mx-auto h-full relative z-10">
          {children}
        </div>
      </main>
    </div>

  );
}
