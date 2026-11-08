import type { Metadata } from "next";
import AgentsPreview from "@/components/AgentsPreview";
export const metadata: Metadata = { title: "Our Agents" };
export default function AgentsPage() { return <><section className="page-intro"><div className="container"><p className="eyebrow">PEOPLE FIRST</p><h1>Meet the people behind <em>YourEhome.</em></h1><p>Connect with advisors who make your real estate goals their priority.</p></div></section><AgentsPreview full/></>; }
