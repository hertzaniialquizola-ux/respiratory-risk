"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/cities", label: "Cities Covered" },
] as const;

function navLinkClass(isActive: boolean) {
  return isActive
    ? "text-primary font-bold border-b-2 border-primary pb-1 flex items-center px-sm pt-1 font-label-md text-label-md"
    : "text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-label-md text-label-md flex items-center px-sm py-2";
}

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-surface/80 backdrop-blur-xl w-full sticky top-0 z-50 border-b border-surface-container-low shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-4 h-16 w-full">
        <Link
          href="/"
          className="font-headline-md text-headline-md text-primary tracking-tight"
        >
          Respiratory Risk Assessment
        </Link>

        <div className="hidden md:flex gap-gutter h-full items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={navLinkClass(pathname === href)}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-sm">
          <Link
            href="/get-started"
            className="bg-primary text-on-primary font-label-md text-label-md px-lg py-sm rounded-full hover:bg-primary-container transition-colors duration-200 hidden md:inline-flex"
          >
            Get Started
          </Link>
          <button
            type="button"
            className="md:hidden text-on-surface p-1"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface-container-lowest px-margin-mobile py-gutter flex flex-col gap-sm">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={navLinkClass(pathname === href)}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="bg-primary text-on-primary font-label-md text-label-md px-lg py-sm rounded-full text-center mt-sm"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
