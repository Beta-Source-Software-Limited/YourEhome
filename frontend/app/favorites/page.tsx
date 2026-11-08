"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { useFavorites } from "@/components/useFavorites";
import { listProperties } from "@/lib/api";
import type { Property } from "@/lib/types";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    // Fetch all paginated entries so saved homes can be found even after filtering.
    let cancelled = false;
    async function load() {
      try {
        const first = await listProperties("page=1");
        const pages = Math.ceil(first.count / 9);
        const rest = await Promise.all(Array.from({ length: Math.max(pages-1, 0) }, (_, i) => listProperties(`page=${i+2}`)));
        if (!cancelled) setProperties([...first.results, ...rest.flatMap(page => page.results)]);
      } catch { if (!cancelled) setError(true); }
    }
    load(); return () => { cancelled = true; };
  }, []);
  const saved = properties.filter(property => favorites.includes(property.slug));
  return <><section className="page-intro"><div className="container"><p className="eyebrow">YOUR COLLECTION</p><h1>Saved <em>properties.</em></h1><p>Keep the homes you love in one place on this device.</p></div></section><section className="container section">{error && <p className="notice error">Unable to load saved listings right now.</p>}{saved.length === 0 && !error ? <div className="empty-results"><h2>No saved homes yet</h2><p>Tap the heart icon on any listing to add it to your collection.</p><Link href="/properties" className="button button-primary">Explore Listings</Link></div> : <div className="property-grid">{saved.map(property => <PropertyCard key={property.id} property={property}/>)}</div>}</section></>;
}
