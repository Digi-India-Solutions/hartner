"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";

export default function ImmobilienPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProperties() {
            try {
                const res = await fetch(
                    "https://hartapi.digiindiasolutions.com/api/properties"
                );

                const json = await res.json();

                const all = json.data || [];

                const published = all.filter(
                    (item) => item.status === "published"
                );

                setProperties(published.reverse());
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProperties();
    }, []);

    return (
        <>
            <section className="property-section font-sans">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h3 className="property-section-title text-center py-4">
                        Alle Immobilien
                    </h3>

                    <div className="grid grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id || property._id}
                                property={property}
                            />
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}