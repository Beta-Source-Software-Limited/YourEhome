import Link from "next/link";
export default function NotFound() { return <section className="container section"><h1>Property not found</h1><p>This listing may have been removed or the link may be incorrect.</p><Link className="button button-primary" href="/properties">Browse Properties</Link></section>; }
