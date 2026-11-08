import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
export const metadata: Metadata = { title: "About Us" };
export default function AboutPage() { return <><section className="page-intro"><div className="container"><p className="eyebrow">ABOUT YOUREHOME</p><h1>More than property. <em>A place to belong.</em></h1><p>A modern approach to real estate, designed around what matters most to you.</p></div></section>
    <section className="container about-layout section"><div className="about-photo"><Image fill sizes="(max-width: 900px) 100vw, 50vw" src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1400&q=85" alt="Beautifully designed welcoming living space"/></div><div><p className="eyebrow">OUR APPROACH</p><h2>Finding home should feel <em>extraordinary.</em></h2><p>YourEhome is a demonstration real estate brand built around a simple belief: every buyer, seller, and investor deserves honest guidance, clear information, and a seamless experience.</p><p>We pair thoughtful technology with a personal touch, helping you explore the market and connect with the right property advisors.</p><div className="about-values"><span><Compass/> Guidance without guesswork</span><span><ShieldCheck/> Transparency at every step</span><span><HeartHandshake/> People before transactions</span></div><Link href="/contact" className="button button-primary">Talk to Our Team <ArrowRight size={17}/></Link></div></section>
  </>; }
