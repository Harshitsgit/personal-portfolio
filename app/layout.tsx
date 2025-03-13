import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type React from "react"; // Import React
import "./globals.css";
import { ToastContextProvider } from "./context/ToastContextProvider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-black text-white">
          <ToastContextProvider>{children}</ToastContextProvider>
        </main>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
};
