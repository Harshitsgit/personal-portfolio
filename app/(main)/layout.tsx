import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type React from "react"; // Import React
import Header from "../components/header";
import Footer from "../components/footer";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export const metadata = {
  generator: "v0.dev",
};
