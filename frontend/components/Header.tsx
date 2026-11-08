"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarDays, HousePlus, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" }, { label: "Listings", href: "/properties" },
  { label: "About", href: "/about" }, { label: "Agents", href: "/agents" },
  { label: "Services", href: "/services" }, { label: "Saved", href: "/favorites" }, { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="YourEhome home">
          <span className="brand-mark"><HousePlus size={29} strokeWidth={2.2} /></span>
          <span><strong>YourEhome</strong><small>PREMIUM REAL ESTATE</small></span>
        </Link>
        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} className={pathname === link.href ? "active" : ""} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
        <Link href="/contact?consultation=1" className="button button-primary nav-cta"><CalendarDays size={17}/> Book Consultation</Link>
        <button type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
