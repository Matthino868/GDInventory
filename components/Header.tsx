"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

interface HeaderProps {
  session: any;
}

export default function Header({ session }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/dashboard/list", label: "Bestellijst" },
    { href: "/dashboard/calendar", label: "Kalender" },
  ];

  if (!session) return null;

  return (
    <header className="bg-gray-100 border-b p-4 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <Image
          src="/global_discounter_bv.png"
          alt="Logo"
          width={160}
          height={32}
          className="block"
        />
      </div>

      <button
        aria-label="Toggle menu"
        className="lg:hidden p-2 rounded hover:bg-gray-200"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {menuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-full left-0 right-0 bg-gray-100 border-t border-gray-300 shadow-md lg:shadow-none lg:border-none lg:bg-transparent lg:flex lg:items-center lg:static lg:space-x-8 lg:block`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-2 hover:text-indigo-600 font-medium text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:ml-6 gap-3 px-4 py-2 border-t border-gray-300 lg:border-none">
          <span className="text-gray-700">{session.user?.name}</span>
          <SignOutButton />
        </div>
      </nav>
    </header>
  );
}
