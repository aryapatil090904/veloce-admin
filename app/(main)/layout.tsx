import SideNavBar from "@/components/SideNavBar";
import TopNavBar from "@/components/TopNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      <SideNavBar />
      <TopNavBar />
      <main className="ml-64 pt-20 p-8 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
