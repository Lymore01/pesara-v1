import DashSubLayout from "@/features/dashboard/components/dash-sub-layout";
import DashboardSideNav from "@/features/dashboard/components/Nav/side-nav";
import { SidebarModeProvider } from "@/features/dashboard/components/Nav/sidebar-context";
import DashboardTopNav from "@/features/dashboard/components/Nav/top-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | pesara",
  description: "Pesara Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarModeProvider>
      <main className="max-w-8xl w-[100vw] min-h-screen overflow-x-hidden">
        {/* top nav */}
        <DashboardTopNav />
        <DashboardSideNav />
        <DashSubLayout>{children}</DashSubLayout>
      </main>
    </SidebarModeProvider>
  );
}
