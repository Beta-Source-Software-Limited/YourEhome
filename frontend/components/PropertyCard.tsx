"use client";
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Heart, MapPin, MoveUpRight, Ruler } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/api";
import { useFavorites } from "./useFavorites";

export default function PropertyCard({ property }: { property: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(property.slug);
  return <article className="property-card">
    <div className="property-image">
      <Link href={`/properties/${property.slug}`} aria-label={`View ${property.title}`}>
        <Image src={property.image_url} alt={property.title} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" />
      </Link>
      <span className={`property-badge ${property.status === "rent" ? "badge-sand" : ""}`}>{property.status === "rent" ? "For Rent" : property.status === "sold" ? "Sold" : "For Sale"}</span>
      <button className={`favorite-button ${liked ? "liked" : ""}`} type="button" onClick={() => toggleFavorite(property.slug)} aria-label={liked ? "Remove from favorites" : "Add to favorites"} aria-pressed={liked}><Heart size={20} fill={liked ? "currentColor" : "none"}/></button>
    </div>
    <div className="property-content"><div className="property-title-row"><h3><Link href={`/properties/${property.slug}`}>{property.title}</Link></h3><MoveUpRight size={17}/></div>
      <strong className="property-price">{formatPrice(property.price, property.status)}</strong>
      <p className="property-location"><MapPin size={15}/>{property.city}, {property.state}</p>
      <div className="property-meta"><span><BedDouble size={16}/>{property.bedrooms} Beds</span><span><Bath size={16}/>{property.bathrooms} Baths</span><span><Ruler size={16}/>{property.area_sqft.toLocaleString()} sqft</span></div>
    </div>
  </article>;
}
