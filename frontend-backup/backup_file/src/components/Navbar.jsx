"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white font-sans">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 py-5 flex items-center justify-between bg-black/85 backdrop-blur-md border-b border-white/5">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logo1.png"
              alt="HARTNER Logo"
              width={200}
              height={44}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="w-auto h-[40px] md:h-[44px]"
            />
          </Link>
        </div>

        {/* Menu */}
        <ul className="hidden lg:flex gap-6 xl:gap-10 text-sm font-semibold tracking-wider flex-shrink-0">
          <li>
            <Link href="/immobilien" className="hover:text-[#c8a052] transition-colors duration-300">
              IMMOBILIEN
            </Link>
          </li>
          <li>
            <Link href="/#properties" className="hover:text-[#c8a052] transition-colors duration-300">
              LEISTUNGEN
            </Link>
          </li>
          <li>
            <Link href="/#about-us" className="hover:text-[#c8a052] transition-colors duration-300">
              ÜBER UNS
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="hover:text-[#c8a052] transition-colors duration-300">
              KONTAKT
            </Link>
          </li>
        </ul>

        {/* Right Side Info */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 flex-shrink-0">
          <a
            href="tel:+436644545404"
            className="flex items-center gap-2 text-sm xl:text-base font-semibold hover:text-[#c8a052] transition-colors duration-300"
          >
            <Phone size={16} className="text-[#c8a052]" />
            <span>+43 664 - 45 45 404</span>
          </a>

          <a
            href="mailto:gerold@hartner-immobilien.at"
            className="bg-[#c8a052] hover:bg-[#b0893f] text-white px-5 py-3 text-sm font-semibold rounded-md flex items-center gap-2 shadow-sm transition-all duration-300"
          >
            <Mail size={16} />
            <span>KONTAKT AUFNEHMEN</span>
          </a>
        </div>

      </div>
    </header>
  );
}