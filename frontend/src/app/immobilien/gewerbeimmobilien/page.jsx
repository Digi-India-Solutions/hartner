import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Investmentimmobilien() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen pt-32 pb-20 px-4">
      <h1 className="text-4xl md:text-6xl text-center font-serif mb-16 text-black">
        Gewerbeimmobilien
      </h1>

      <div className="flex justify-start">
        <Link
          href="/immobilien/investmentimmobilien/id"
          className="bg-white shadow-lg rounded-[30px] overflow-hidden hover:shadow-2xl transition max-w-[650px] w-full"
        >
          {/* Image */}
          <Image
            src="/images/card.jpg"
            alt="Villa"
            width={700}
            height={500}
            className="w-full h-[250px] md:h-[350px] object-cover"
          />

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title + Price */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <h2 className="text-2xl md:text-4xl font-serif text-black leading-tight">
                Exklusive Villa mit Pool und Garten
              </h2>

              <p className="text-2xl md:text-4xl text-[#c8a052] whitespace-nowrap">
                € 2.850.000
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-5 text-gray-500">
              <MapPin size={18} className="text-[#c8a052]" />
              <p>Hietzing, Wien, Österreich</p>
            </div>

            {/* Divider */}
            <div className="border-t my-8"></div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <ArrowRight className="text-[#c8a052] mt-1" />
                <div>
                  <p className="text-blue-600 text-lg">
                    Widmung
                  </p>
                  <p className="font-semibold text-black text-xl">
                    Wohngebiet
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ArrowRight className="text-[#c8a052] mt-1" />
                <div>
                  <p className="text-blue-600 text-lg">
                    Leerstand
                  </p>
                  <p className="font-semibold text-black text-xl">
                    Nein
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ArrowRight className="text-[#c8a052] mt-1" />
                <div>
                  <p className="text-blue-600 text-lg">
                    Befristungen
                  </p>
                  <p className="font-semibold text-black text-xl">
                    Keine
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ArrowRight className="text-[#c8a052] mt-1" />
                <div>
                  <p className="text-blue-600 text-lg">
                    Unbefristete Vermietung
                  </p>
                  <p className="font-semibold text-black text-xl">
                    Ja
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t mt-8"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}