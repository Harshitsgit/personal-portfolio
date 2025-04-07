"use client";
import {
  AuthContext,
  AuthContextProvider,
} from "@/app/context/AuthContextProvider";
import { LoginForm } from "../../components/login-form";
import { useContext, useEffect } from "react";
import { Apiresponse } from "@/types";
import { Models } from "appwrite";
import { authService } from "@/services";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);
  useEffect(() => {
    const checkSession = async () => {
      const userData: Apiresponse<Models.User<Models.Preferences>> =
        await authService.getUser();
      if (userData.data) {
        signIn({ $id: userData.data.$id });
        router.push("/admin/home");
      }
    };

    checkSession();
  });
  return (
    <AuthContextProvider>
      <div className="flex bg-black min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className=" max-w-sm md:max-w-2xl">
          <LoginForm />
        </div>
      </div>
    </AuthContextProvider>
  );
}
