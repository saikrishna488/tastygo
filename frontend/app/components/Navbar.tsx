"use client";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Bell, Package, LogOut } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "@/states/global_states.js";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [user] = useAtom<any>(userAtom);
  const router = useRouter();

  const menuItems = [
    { label: "Profile", href: "/profile", icon: <User className="h-5 w-5" /> },
    { label: "Orders", href: "/orders", icon: <Package className="h-5 w-5" /> },
    { label: "Cart", href: "/cart", icon: <ShoppingCart className="h-5 w-5" /> },
    { label: "Notifications", href: "/notifications", icon: <Bell className="h-5 w-5" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md dark:bg-gray-900 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              TastyGo
            </span>
          </Link>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link href="/cart" className="relative p-1">
              <ShoppingCart className="h-6 w-6 text-gray-700 transition-colors hover:text-red-500 dark:text-white" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                2
              </span>
            </Link>

            {/* User Section */}
            {user?.name ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-lg font-semibold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden text-sm font-medium text-gray-700 dark:text-white sm:block">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg dark:bg-gray-800 transition-all duration-200 ease-in-out">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 transition-all duration-150 ease-in-out hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    ))}
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-red-500 transition-all duration-150 ease-in-out hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        // Add logout functionality here
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="ml-2">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
