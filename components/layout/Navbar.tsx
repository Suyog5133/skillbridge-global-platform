"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon, LogoMark, MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#jobs", label: "Find Jobs" },
  { href: "#talent", label: "Find Talent" },
  { href: "#freelance", label: "Freelance Projects" },
  { href: "#companies", label: "For Companies" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    window.setTimeout(() => setOpen(false), 0);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy/8 bg-white/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <LogoMark className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-tight text-navy sm:text-base">
            SkillBridge Global
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="#login" variant="ghost" size="sm">
            Login
          </Button>
          <Button href="#get-started" size="sm">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-navy/8 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 px-1">
              <Button href="#login" variant="outline" onClick={closeMenu}>
                Login
              </Button>
              <Button href="#get-started" onClick={closeMenu}>
                Get Started
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
