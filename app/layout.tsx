import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type React from "react"; // Import React

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
          <Header />
          <div className="py-24">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}

import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata = {
  generator: "v0.dev",
};
