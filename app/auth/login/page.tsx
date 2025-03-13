"use client";
import { AuthContextProvider } from "@/app/context/AuthContextProvider";
import { LoginForm } from "../../components/login-form";

export default function LoginPage() {
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
