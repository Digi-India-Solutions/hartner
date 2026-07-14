"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1f242b] border-t border-white/5 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo1.png"
                alt="Hartner Immobilien Logo"
                width={200}
                height={44}
                className="w-auto h-[40px] md:h-[44px] object-contain"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm font-semibold tracking-wider">
            <Link
              href="/impressum"
              className="hover:text-[#c8a052] transition-colors duration-300"
            >
              IMPRESSUM
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-[#c8a052] transition-colors duration-300"
            >
              DATENSCHUTZ
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-right font-light">
            © 2026 Bei Haertner Immobilien stehen
          </div>

        </div>
      </div>
    </footer>
  );
}