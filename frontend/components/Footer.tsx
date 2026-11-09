import Link from "next/link";
import { HousePlus, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><Link href="/" className="brand footer-brand"><span className="brand-mark"><HousePlus size={28} /></span><span><strong>YourEhome</strong><small>PREMIUM REAL ESTATE</small></span></Link>
        <p>Connecting people to exceptional homes and smarter property decisions.</p></div>
      <div><h4>Quick Links</h4><Link href="/">Home</Link><Link href="/properties">Explore Listings</Link><Link href="/about">Our Story</Link><Link href="/agents">Our Agents</Link> 
        <Link
          href="/privacy"
          className="text-sm text-slate-400 hover:text-white"
        >
          Privacy Policy
        </Link>

      </div>
      
      <div><h4>Our Services</h4><Link href="/services">Buy &amp; Sell Homes</Link><Link href="/services">Property Investment</Link><Link href="/services">Market Advice</Link><Link href="/contact">Consultation</Link></div>
      <div><h4>Contact Us</h4><span><MapPin size={16} /> Serving buyers and sellers nationwide</span><span><Phone size={16} /> Contact us via inquiry form</span><span><Mail size={16} /> hello@yourehome.example</span><Link className="footer-action" href="/contact">Get in touch <ArrowUpRight size={15} /></Link></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} YourEhome. All rights reserved.</span><span>Demo property data and contact information — replace before launch.</span></div>
  </footer>;
}
