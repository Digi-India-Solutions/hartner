"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

const ITEMS_PER_LOAD = 12;

export default function CategoryPage() {
  const { category, id } = useParams();

  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    gewerbeimmobilien: "Gewerbeimmobilien",
    investmentimmobilien: "Investmentimmobilien",
    mietobjekte: "Mietobjekte",
    wohnimmobilien: "Wohnimmobilien",
  };

  const selectedCategory = categoryMap[category];

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);

        const res = await fetch(
          "https://hartapi.digiindiasolutions.com/api/properties"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        const json = await res.json();

        const all = json.data || json || [];

        const filtered = all.filter(
          (item) =>
            item.category === selectedCategory &&
            item.status === "published"
        );

        setProperties(filtered.reverse());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (selectedCategory) {
      fetchProperties();
    }
  }, [selectedCategory]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200
      ) {
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_LOAD, properties.length)
        );
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [properties]);

  if (!selectedCategory) {
    return (
      <div className="py-32 text-center">
        Invalid Category
      </div>
    );
  }


  console.log("this is the new immobilien page:", selectedCategory);

  return (
    <section className="property-section font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <h3 className="property-section-title text-center py-4">
          {selectedCategory}
        </h3>

        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 border-4 border-[#c8a052] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🏡</p>

            <h2 className="text-2xl font-serif mb-2">
              Derzeit keine Immobilien verfügbar
            </h2>

            <p className="text-gray-500">
              In dieser Kategorie sind aktuell keine Objekte verfügbar.
            </p>
          </div>
        )}
        
        {!loading && properties.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties
                .slice(0, visibleCount)
                .map((property) => (
                  <PropertyCard
                    key={property.id || property._id}
                    property={property}
                  />
                ))}
            </div>

            {visibleCount < properties.length && (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-[#c8a052] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}


// "use client";
// export const dynamic = "force-dynamic";

// import { use, useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { BsGeoAltFill } from "react-icons/bs";
 
// const categoryInfo = {
//   gewerbeimmobilien: {
//     title: "Gewerbeimmobilien",
//     description:
//       "Anlageobjekte, Zinshäuser und Wohnprojekte mit nachhaltiger Rendite.",
//   },
//   investmentimmobilien: {
//     title: "Investmentimmobilien",
//     description:
//       "Anlageobjekte, Zinshäuser und Wohnprojekte mit nachhaltiger Rendite.",
//   },
//   mietobjekte: {
//     title: "Mietobjekte",
//     description: "Wir vermitteln Mietwohnungen und Gewerbeimmobilien.",
//   },
//   wohnimmobilien: {
//     title: "Wohnimmobilien",
//     description: "Villen, Wohnungen und Baugrundstücke.",
//   },
// };

// export default function CategoryListingPage({ params }) {
//   const { category } = use(params);

//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchProperties() {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(
//           `https://hartapi.digiindiasolutions.com/api/properties?category=${category}`
//         );
//         if (!res.ok) throw new Error("Daten konnten nicht geladen werden");
//         const data = await res.json();
//         setProperties(data.data || data || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProperties();
//   }, [category]);
//   const getImageUrl = (img) => {
//     if (!img) return "/images/card.jpg";
//     const url = typeof img === "string" ? img : img?.url;
//     if (!url) return "/images/card.jpg";
//     if (url.startsWith("http") || url.startsWith("data:")) return url;
//     if (url.startsWith("/wp-content") || url.startsWith("/wp-includes")) {
//       return `https://hartner.digiindiasolutions.com${url}`;
//     }
//     return `https://hartapi.digiindiasolutions.com${url}`;
//   };
//   const imageLoader = ({ src }) => src;

//   const info = categoryInfo[category];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-12 h-12 border-4 border-[#c8a052] border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center px-4">
//         <div>
//           <p className="text-6xl mb-4">⚠️</p>
//           <h2 className="text-3xl font-serif text-black mb-2 font-bold">
//             Fehler beim Laden
//           </h2>
//           <p className="text-gray-500">{error}</p>
//           <Link
//             href="/immobilien"
//             className="inline-block mt-6 bg-[#c8a052] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#b0893f] transition"
//           >
//             Zurück zur Übersicht
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-[#fcfcfc] py-20 font-sans min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">

//         {/* Breadcrumb */}
//         <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
//           <Link href="/immobilien" className="hover:text-[#c8a052]">
//             Immobilien
//           </Link>
//           <span>/</span>
//           <span className="text-gray-900 font-medium">
//             {info?.title || category}
//           </span>
//         </nav>

//         {/* Header */}
//         <div className="mb-16">
//           <span className="text-[#c8a052] text-sm font-semibold tracking-widest block uppercase mb-4">
//             UNSERE LEISTUNGEN
//           </span>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight max-w-4xl">
//             {info?.title || category}
//           </h2>
//           {info?.description && (
//             <p className="text-gray-600 text-lg mt-4 max-w-2xl">
//               {info.description}
//             </p>
//           )}
//         </div>

//         {/* Grid Cards */}
//         {properties.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-6xl mb-4">🏚️</p>
//             <p className="text-gray-500 text-lg">
//               Aktuell keine Immobilien in dieser Kategorie verfügbar.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {properties.map((item) => (
//               <Link
//                 href={`/immobilien/${category}/${item.id}`}
//                 key={item.id}
//                 className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
//               >
//                 <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
//                   <Image
//                     loader={imageLoader}
//                     src={getImageUrl(item.images?.[0])}
//                     alt={item.title}
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover transition-transform duration-750 ease-out group-hover:scale-105"
//                   />
//                 </div>

//                 <div className="p-6 flex flex-col flex-grow">
//                   <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#c8a052] transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   {item.address && (
//                     <p className="text-gray-500 text-sm flex items-center gap-2 mb-3">
//                       <BsGeoAltFill className="text-[#c8a052]" size={14} />
//                       {item.address}
//                     </p>
//                   )}
//                   {(item.details?.kaufpreis || item.details?.miete_monatlich) && (
//                     <p className="text-[#c8a052] font-bold text-lg mt-auto">
//                       {item.details?.kaufpreis || item.details?.miete_monatlich}
//                     </p>
//                   )}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }