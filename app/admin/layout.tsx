import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Navbar } from "../components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full border-0">
        <Navbar>
          <SidebarTrigger />
        </Navbar>
        {children}
      </main>
    </SidebarProvider>
  );
}
