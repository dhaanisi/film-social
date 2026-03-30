"use client";

import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { Film, Menu, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { env } from "@/env";

type HeaderProps = {
  dictionary: Dictionary;
};

export const Header = ({ dictionary }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);

  const navLinks = [
    { title: "Features", href: "#features" },
    { title: "Community", href: "#community" },
    { title: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b border-cyan/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link className="flex items-center gap-2.5" href="/">
          <Film className="h-5 w-5 text-cyan" />
          <span className="text-lg font-bold tracking-tighter">
            <span className="text-cyan">CELLU</span>
            <span className="text-foreground">LOID</span>
          </span>
          <span className="hidden text-[9px] tracking-widest text-muted-foreground/40 sm:inline">
            v1.0
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button asChild key={link.title} size="sm" variant="ghost">
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden md:inline-flex"
            size="sm"
            variant="ghost"
          >
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-up`}>
              Get Started <MoveRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            className="md:hidden"
            onClick={() => setOpen(!isOpen)}
            size="icon"
            variant="ghost"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen ? (
        <div className="border-t border-cyan/10 bg-background px-4 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                className="text-sm text-muted-foreground transition-colors hover:text-cyan"
                href={link.href}
                key={link.title}
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <div className="border-t border-cyan/10 pt-4">
              <Button asChild className="w-full" size="sm" variant="outline">
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>
                  Sign in
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
