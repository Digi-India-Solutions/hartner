"use client";

import { Building, Workflow, UserCheck, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about-us" className="bg-[#111111] overflow-hidden scroll-mt-20">
      <div className="container-fluid p-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 items-stretch">
          
          {/* LEFT: content column (spans 2 of 4 columns, i.e., 50% width) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0d0d0d] to-[#1c1c1c] p-8 md:p-12 lg:p-[55px_35px] flex flex-col justify-center">
            <span className="text-[#c8a052] text-xs font-semibold tracking-widest block uppercase mb-4">
              ÜBER UNS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[58px] font-serif font-bold text-white leading-[1.1] mb-6">
              Persönlich. Kompetent. Vertrauenswürdig.
            </h2>
            <p className="text-[#cfcfcf] text-base md:text-lg leading-[1.9] mb-5">
              Bei Haertner Immobilien stehen Sie im Mittelpunkt. Wir nehmen uns Zeit, hören zu und entwickeln Lösungen, die wirklich zu Ihnen passen.
            </p>
            <p className="text-[#cfcfcf] text-base md:text-lg leading-[1.9] mb-0">
              Unsere Erfahrung, Diskretion und Leidenschaft für Immobilien machen den Unterschied für Eigentümer, Käufer und Investoren.
            </p>
          </div>

          {/* CENTER: portrait column (spans 1 of 4 columns, i.e., 25% width) */}
          <div className="lg:col-span-1 h-[450px] lg:h-auto min-h-[460px] lg:min-h-0">
            <img
              src="https://hartner.digiindiasolutions.com/wp-content/themes/hartner-theme/images/portrait.jpeg"
              alt="Gerold Hartner Portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT: features list column (spans 1 of 4 columns, i.e., 25% width) */}
          <div className="lg:col-span-1 bg-[#161616] p-8 md:p-12 lg:p-[55px_20px] flex flex-col justify-center">
            <div className="flex flex-col gap-10">
              
              <div className="flex items-center gap-[25px]">
                <Building size={42} className="text-[#c8a25a] shrink-0" />
                <span className="font-serif text-white text-xl lg:text-[24px] leading-[1.5] font-medium">
                  Ausgezeichnete Marktkenntnis
                </span>
              </div>

              <div className="flex items-center gap-[25px]">
                <Workflow size={42} className="text-[#c8a25a] shrink-0" />
                <span className="font-serif text-white text-xl lg:text-[24px] leading-[1.5] font-medium">
                  Maßgeschneiderte Lösungen
                </span>
              </div>

              <div className="flex items-center gap-[25px]">
                <UserCheck size={42} className="text-[#c8a25a] shrink-0" />
                <span className="font-serif text-white text-xl lg:text-[24px] leading-[1.5] font-medium">
                  Persönlicher Service
                </span>
              </div>

              <div className="flex items-center gap-[25px]">
                <ShieldCheck size={42} className="text-[#c8a25a] shrink-0" />
                <span className="font-serif text-white text-xl lg:text-[24px] leading-[1.5] font-medium">
                  Diskretion & Vertrauen
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}