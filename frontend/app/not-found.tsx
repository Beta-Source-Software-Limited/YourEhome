import Link from "next/link";
export default function NotFound() { return <section className="container section"><p className="eyebrow">404</p><h1>We couldn't find this page.</h1><p>Try browsing our available properties instead.</p><Link href="/" className="button button-primary">Back to Home</Link></section>; }
