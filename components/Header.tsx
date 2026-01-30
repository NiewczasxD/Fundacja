"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#o-nas", label: "O nas" },
    { href: "#projekty", label: "Projekty" },
    { href: "#zespol", label: "Zespół" },
    { href: "#galeria", label: "Galeria" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/ivelpl",
      label: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/ivel_pl/",
      label: "Instagram",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav className="container-custom" aria-label="Główne menu nawigacyjne">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-0 rounded"
            aria-label="Fundacja IVEL - Strona główna"
            onClick={(e) => (e.currentTarget as HTMLAnchorElement).blur()}
          >
            <Image
              src="/logo.png"
              alt="Fundacja IVEL"
              width={200}
              height={67}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation + Social */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-0 rounded px-2 py-1"
                    onClick={(e) => (e.currentTarget as HTMLAnchorElement).blur()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors p-2 rounded focus:outline-none focus:ring-0"
                  aria-label={social.label}
                  onClick={(e) => (e.currentTarget as HTMLAnchorElement).blur()}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-secondary focus:outline-none focus:ring-0 rounded"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Otwórz menu"
            onClick={(e) => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              (e.currentTarget as HTMLButtonElement).blur();
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden pb-4"
            role="menu"
            aria-label="Menu mobilne"
          >
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-0 rounded px-2 py-2"
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      (e.currentTarget as HTMLAnchorElement).blur();
                    }}
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex gap-3 pt-2 border-t border-gray-200">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors p-2 rounded focus:outline-none focus:ring-0"
                    aria-label={social.label}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      (e.currentTarget as HTMLAnchorElement).blur();
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
