"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
const Navbar = function ({ children }: { children: React.ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const handleSignOut = async () => {
    await authService.signOut();
    router.push("/auth/login");
  };
  return (
    <nav className="bg-black text-white py-4 shadow-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left-aligned children */}
        <div className="flex items-center">{children}</div>

        {/* Profile Dropdown - Right-aligned */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span>Profile Image</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.83a.75.75 0 01-1.08 0L5.22 8.25a.75.75 0 01.01-1.04z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden z-40">
              <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Action
              </li>
              <li className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Another action
              </li>
              <li>
                <hr className="border-gray-300" />
              </li>
              <li
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleSignOut}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSignOut();
                }}
                tabIndex={0}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
