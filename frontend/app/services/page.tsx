import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardCheck, Handshake, House, KeyRound, SearchCheck } from "lucide-react";
export const metadata: Metadata = { title: "Services" };
const services = [
  { Icon: House, title: "Buy Your Dream Home", description: "Discover exceptional properties that match your budget, preferred location, and lifestyle." },
  { Icon: KeyRound, title: "Sell With Confidence", description: "Present your home at its best and make informed decisions with the help of expert advisors." },
  { Icon: BarChart3, title: "Real Estate Investment", description: "Explore property opportunities and review options with your investment goals in mind." },
  { Icon: SearchCheck, title: "Property Search", description: "Browse curated listings, apply useful filters, and compare relevant property details." },
  { Icon: ClipboardCheck, title: "Transaction Guidance", description: "Stay informed through the steps involved in offers, paperwork, and closing." },
  { Icon: Handshake, title: "Personal Consultation", description: "Get tailored support from a real estate specialist who listens to your needs." },
];
export default function ServicesPage() { return <><section className="page-intro"><div className="container"><p className="eyebrow">HOW WE HELP</p><h1>Expertise for <em>every move.</em></h1><p>Personalized real estate services for every stage of your journey.</p></div></section><section className="container section"><div className="services-grid full-services-grid">{services.map(({Icon, title, description}) => <article className="service-card" key={title}><div className="service-icon"><Icon size={30}/></div><h3>{title}</h3><p>{description}</p><Link href="/contact" className="text-link">Get started <ArrowRight size={16}/></Link></article>)}</div></section></>; }
