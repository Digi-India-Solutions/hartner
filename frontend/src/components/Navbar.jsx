import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 py-6 md:py-8 flex items-center justify-between bg-black/60 backdrop-blur-md">

        {/* Logo */}
        <div>
          <Image
            src="/images/logo1.jpeg"
            alt="HARTNER Logo"
            width={230}
            height={50}
          />
        </div>

        {/* Menu */}
        <ul className="hidden lg:flex gap-10 text-base font-semibold">
          <li>
            <Link href="/">STARTSEITE</Link>
          </li>

          <li>
            <Link href="/leistungen">LEISTUNGEN</Link>
          </li>

          <li>
            <Link href="/uber-uns">ÜBER UNS</Link>
          </li>

          <li>
            <Link href="/immobilien">IMMOBILIEN</Link>
          </li>

          <li>
            <Link href="/kontakt">KONTAKT</Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-3 text-base">
            <FaPhoneAlt />
            <span>+43 664 - 45 45 404</span>
          </div>

          <button className="bg-yellow-400 text-black px-6 py-3 font-semibold">
            KONTAKT AUFNEHMEN
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;