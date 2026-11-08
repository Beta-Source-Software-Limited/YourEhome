"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { listProperties } from "@/lib/api";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    listProperties("featured=true&page_size=9").then(data => setProperties(data.results.slice(0, 4))).catch(() => setError("Listings are unavailable. Please check that the API is running."));
  }, []);
  return <section className="section" id="featured"><div className="container">
    <div className="section-top"><div><p className="eyebrow">FEATURED LISTINGS</p><h2>Handpicked Properties <em>for You</em></h2></div><Link className="text-link" href="/properties">View All Listings <ArrowRight size={17}/></Link></div>
    {error && <p className="notice error">{error}</p>}
    {!error && properties.length === 0 && <p className="muted">Loading exceptional properties...</p>}
    <div className="property-grid">{properties.map(property => <PropertyCard key={property.id} property={property}/>)}</div>
  </div></section>;
}
