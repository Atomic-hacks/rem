import Sidebar from "@/components/agent-profile/Sidebar";

export default function AgentProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f8f6f4]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}