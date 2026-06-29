import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 py-4 md:py-6 flex items-center justify-between bg-black/60 backdrop-blur-md">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/logo1.png"
            alt="HARTNER Logo"
            width={200}
            height={44}
            style={{ width: 'auto', height: 'auto' }}
            className="w-auto h-[40px] md:h-[44px]"
          />
        </div>

        {/* Menu */}
        <ul className="hidden lg:flex gap-5 xl:gap-8 text-sm xl:text-base font-semibold flex-shrink-0">
          <li>
            <Link href="/" className="hover:text-yellow-500 transition-colors">STARTSEITE</Link>
          </li>

          <li>
            <Link href="/leistungen" className="hover:text-yellow-500 transition-colors">LEISTUNGEN</Link>
          </li>

          <li>
            <Link href="/uber-uns" className="hover:text-yellow-500 transition-colors">ÜBER UNS</Link>
          </li>

          <li>
            <Link href="/immobilien" className="hover:text-yellow-500 transition-colors">IMMOBILIEN</Link>
          </li>

          <li>
            <Link href="/kontakt" className="hover:text-yellow-500 transition-colors">KONTAKT</Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
          <div className="flex items-center gap-2 xl:gap-3 text-sm xl:text-base">
            <FaPhoneAlt className="text-yellow-500" />
            <span>+43 664 - 45 45 404</span>
          </div>

          <button className="bg-yellow-400 text-black px-4 xl:px-6 py-2.5 xl:py-3 text-sm xl:text-base font-semibold hover:bg-yellow-500 transition-all duration-300">
            KONTAKT AUFNEHMEN
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;