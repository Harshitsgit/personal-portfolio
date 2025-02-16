"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type React from "react";

export default function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 fixed top-0 left-0 right-0 z-50 bg-black/50"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Camera className="w-8 h-8 text-indigo-500" />
          <span className="text-white font-medium text-xl">
            Mr. Ag EditoGrapher
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/albums">Albums</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button className="bg-indigo-700 hover:bg-indigo-900 text-white">
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40"
              onClick={toggleDrawer} // Close when clicking outside
            />

            {/* Drawer Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black/90 backdrop-blur-md z-50 flex flex-col items-start space-y-6 px-6 py-10"
            >
              {/* Close Button */}
              <button
                onClick={toggleDrawer}
                className="absolute top-4 right-4 text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Links */}
              <div className="flex flex-col justify-start pt-12 w-full h-full items-center gap-8">
                <NavLinkMobile href="/" onClick={toggleDrawer}>
                  Home
                </NavLinkMobile>
                <NavLinkMobile href="/albums" onClick={toggleDrawer}>
                  Albums
                </NavLinkMobile>
                <NavLinkMobile href="/services" onClick={toggleDrawer}>
                  Services
                </NavLinkMobile>
                <NavLinkMobile href="/about" onClick={toggleDrawer}>
                  About
                </NavLinkMobile>

                {/* Contact Button */}
                <Button
                  size="sm"
                  className="bg-indigo-700 hover:bg-indigo-900 text-white px-3 py-1 text-sm w-32"
                  onClick={toggleDrawer}
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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

function NavLinkMobile({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-white transition-colors text-lg"
    >
      {children}
    </Link>
  );
}
