"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, MessageSquareText, Clock3 } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
function ContactContent() {
  const params = useSearchParams();
  const consultation = params.get("consultation") === "1";
  return <><section className="page-intro"><div className="container"><p className="eyebrow">LET'S CONNECT</p><h1>Let's find your <em>next chapter.</em></h1><p>Questions about a property or ready to start searching? We would love to hear from you.</p></div></section><section className="container section contact-grid"><div className="contact-aside"><p className="eyebrow">CONTACT OUR TEAM</p><h2>We're here to <em>help.</em></h2><p>Have a question or want help from a property advisor? Send us a message and we’ll get back to you.</p><div className="contact-feature"><MessageSquareText/><span><strong>Property advice</strong><small>Tell us what you’re looking for</small></span></div><div className="contact-feature"><Clock3/><span><strong>Consultation requests</strong><small>Share a preferred date for a callback</small></span></div><div className="contact-feature"><Mail/><span><strong>Quick communication</strong><small>We’ll respond using the contact information you provide</small></span></div></div><InquiryForm key={consultation ? "consultation" : "contact"} category={consultation ? "consultation" : "contact"} headline={consultation ? "Request a Consultation" : "Send Us a Message"}/></section></>;
}
export default function ContactPage() { return <Suspense fallback={<div className="container section">Loading contact form...</div>}><ContactContent/></Suspense>; }
