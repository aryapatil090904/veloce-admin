import SideNavBar from "@/components/SideNavBar";
import TopNavBar from "@/components/TopNavBar";
import SessionExpiredModal from "@/components/SessionExpiredModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      <SideNavBar />
      <TopNavBar />
      <SessionExpiredModal />
      <main className="ml-64 pt-20 p-8 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
