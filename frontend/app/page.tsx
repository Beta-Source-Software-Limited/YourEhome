import Link from "next/link";
import { ArrowRight, Award, BadgeCheck, BarChart3, Handshake, House, KeyRound, MapPin, ShieldCheck, Star, UsersRound } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import FeaturedProperties from "@/components/FeaturedProperties";
import AgentsPreview from "@/components/AgentsPreview";

const services = [
  { icon: House, title: "Buy & Sell Homes", copy: "Expert support from the first viewing through a confident closing." },
  { icon: BarChart3, title: "Property Investment", copy: "Find opportunities that align with your long-term goals." },
  { icon: Handshake, title: "Personalized Advice", copy: "A dedicated advisor who understands what matters to you." },
  { icon: KeyRound, title: "End-to-End Support", copy: "Guidance through negotiations, paperwork, and every next step." },
];

export default function HomePage() {
  return <>
    <section className="hero"><div className="hero-photo"/><div className="hero-overlay"/><div className="container hero-inner">
      <div className="hero-copy"><p className="eyebrow">PREMIUM REAL ESTATE SOLUTIONS</p><h1>Find Your<br/><em>Dream Property.</em></h1><p>Discover exceptional homes, investment opportunities, and personalized real estate services with YourEhome.</p>
        <div className="hero-points"><span><ShieldCheck size={17}/> Trusted Advisors</span><span><BadgeCheck size={17}/> Premium Listings</span><span><MapPin size={17}/> Local Expertise</span></div>
      </div>
      <HeroSearch/>
    </div></section>
    <FeaturedProperties/>
    <section className="stats-band"><div className="container stats-grid"><div><House/><strong>2,500+</strong><span>Properties Sold*</span></div><div><UsersRound/><strong>10,000+</strong><span>Happy Clients*</span></div><div><Award/><strong>15+</strong><span>Years of Experience*</span></div><div><Star/><strong>4.9/5</strong><span>Client Satisfaction*</span></div></div><p className="stats-disclaimer">*Illustrative layout figures; replace with verified company metrics.</p></section>
    <section className="section services-section"><div className="container"><div className="section-top services-heading"><div><p className="eyebrow">OUR SERVICES</p><h2>Why Choose <em>YourEhome?</em></h2></div><p>More than a real estate company — we’re your trusted partner in finding, buying, selling, and investing in the right property.</p></div>
      <div className="services-grid">{services.map(({icon: Icon,title,copy}) => <div className="service-card" key={title}><div className="service-icon"><Icon size={27}/></div><h3>{title}</h3><p>{copy}</p></div>)}</div>
    </div></section>
    <AgentsPreview/>
    <section className="section testimonial-section"><div className="container"><p className="eyebrow">OUR PROMISE</p><h2>Real estate, made <em>personal.</em></h2><div className="promise-grid"><div><span className="quote-mark">“</span><p>Every property search is more than a transaction. We help you find the place where your next chapter begins.</p><span className="promise-author">— YourEhome Team</span></div><div className="promise-panel"><BadgeCheck size={32}/><h3>Committed to clarity</h3><p>Explore with confidence, compare options, and connect with an advisor whenever you need guidance.</p><Link href="/about" className="text-link">Discover our approach <ArrowRight size={17}/></Link></div></div></div></section>
    <section className="container cta-area"><div className="cta-banner"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Ready to Make <em>Your Move?</em></h2><p>Whether you're buying, selling, or investing, we're here to help you achieve your real estate goals.</p></div><div className="cta-buttons"><Link className="button button-light" href="/contact?consultation=1">Book a Consultation <ArrowRight size={16}/></Link><Link className="cta-link" href="/properties">Explore Listings <ArrowRight size={16}/></Link></div></div></section>
  </>;
}
