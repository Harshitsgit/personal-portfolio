"use client";

import { Button } from "@/components/ui/button";
import { Camera, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react"; // Added import for React

export default function Header() {
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 fixed top-0 left-0 right-0 z-50 header-background"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Camera className="w-8 h-8 text-indigo-500" />
          <span className="text-white font-medium text-xl">
            Mr. Ag EditoGrapher
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/albums">Albums</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {/* <Button variant="ghost" className="text-white hover:text-purple-400">
          Sign In
        </Button> */}
          <Button className="bg-indigo-700 hover:bg-indigo-900 text-white">
            Contact Us
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </motion.nav>
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
    </Link>
  );
}
