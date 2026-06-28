import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
    <footer className="bg-black/10 backdrop-blur-md border-t border-white/10">
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-20 py-8">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div>
            <Image
              src="/images/logo1.jpeg"
              alt="Hartner Immobilien"
              width={250}
              height={70}
              className="object-contain"
            />
          </div>

          {/* Links */}
          <div className="flex gap-10">
  <Link
    href="/impressum"
    className="hover:text-yellow-500 transition"
  >
    IMPRESSUM
  </Link>

  <Link
    href="/datenschutz"
    className="hover:text-yellow-500 transition"
  >
    DATENSCHUTZ
  </Link>
</div>

          {/* Copyright */}
          <div className="text-gray-300 text-lg text-center lg:text-right">
            © 2026 Bei Haertner Immobilien stehen
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;