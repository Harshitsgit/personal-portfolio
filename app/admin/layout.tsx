"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Navbar } from "../components/Navbar";
import {
  AuthContext,
  AuthContextProvider,
} from "../context/AuthContextProvider";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { Apiresponse } from "@/types";
import { Models } from "appwrite";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);
  useEffect(() => {
    const checkSession = async () => {
      const userData: Apiresponse<Models.User<Models.Preferences>> =
        await authService.getUser();
      if (userData.data) {
        signIn({ $id: userData.data.$id });
      } else router.push("/auth/login");
    };

    checkSession();
  });
  return (
    <AuthContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full border-0">
          <Navbar>
            <SidebarTrigger />
          </Navbar>
          {children}
        </main>
      </SidebarProvider>
    </AuthContextProvider>
  );
}
