"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type React from "react";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

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
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col space-y-4 px-6 py-4"
          >
            <NavLinkMobile href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLinkMobile>
            <NavLinkMobile
              href="/albums"
              onClick={() => setMobileMenuOpen(false)}
            >
              Albums
            </NavLinkMobile>
            <NavLinkMobile
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </NavLinkMobile>
            <NavLinkMobile
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLinkMobile>
            <Button
              className="bg-indigo-700 hover:bg-indigo-900 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Button>
          </motion.div>
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
      className="text-gray-300 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
