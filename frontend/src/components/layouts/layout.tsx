import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <>
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <main className="min-h-screen flex flex-1 flex-col py-10 px-6">
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}
