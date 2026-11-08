import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, CheckCircle2, MapPin, Ruler, House, Share2 } from "lucide-react";
import { getProperty, formatPrice } from "@/lib/api";
import InquiryForm from "@/components/InquiryForm";

interface Props { params: Promise<{slug: string}>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await getProperty(slug);
    return { title: property.title, description: property.description.slice(0, 155) };
  } catch { return { title: "Property Details" }; }
}

export default async function PropertyDetails({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug).catch(() => null);
  if (!property) notFound();
  const photos = [property.image_url, ...property.gallery.filter(url => url !== property.image_url)];
  return <div className="container property-details">
    <Link className="back-link" href="/properties"><ArrowLeft size={17}/> Back to Listings</Link>
    <div className="details-heading"><div><p className="eyebrow">EXCEPTIONAL PROPERTY</p><h1>{property.title}</h1><p><MapPin size={17}/>{property.address}, {property.city}, {property.state} {property.postal_code}</p></div><div><span className="details-price">{formatPrice(property.price, property.status)}</span><span className="details-badge">{property.status === "rent" ? "For Rent" : property.status === "sale" ? "For Sale" : "Sold"}</span></div></div>
    <div className="details-gallery"><div className="details-main-photo"><Image src={property.image_url} fill priority sizes="(max-width: 900px) 100vw, 80vw" alt={property.title}/></div>{photos.slice(1, 3).map((photo, index) => <div className="details-extra-photo" key={photo}><Image src={photo} fill sizes="300px" alt={`${property.title} view ${index+2}`}/></div>)}</div>
    <div className="details-grid"><article className="details-body"><div className="details-facts"><span><BedDouble size={22}/><strong>{property.bedrooms}</strong><small>Bedrooms</small></span><span><Bath size={22}/><strong>{property.bathrooms}</strong><small>Bathrooms</small></span><span><Ruler size={22}/><strong>{property.area_sqft.toLocaleString()}</strong><small>Square Feet</small></span><span><House size={22}/><strong>{property.property_type}</strong><small>Property Type</small></span></div>
      <h2>About This Property</h2><p>{property.description}</p><h2>Property Highlights</h2><div className="detail-highlights"><span><CheckCircle2/> Professionally presented listing</span><span><CheckCircle2/> Dedicated property advisor</span><span><CheckCircle2/> Personalized viewing assistance</span><span><CheckCircle2/> Full-service support</span></div>
      {property.agent && <div className="listing-agent"><h2>Your Property Advisor</h2><div><strong>{property.agent.name}</strong><p>{property.agent.title} · {property.agent.years_experience}+ years experience</p></div></div>}
    </article><aside className="details-sidebar"><InquiryForm category="property" propertyId={property.id} headline="Interested in this property?"/></aside></div>
  </div>;
}
