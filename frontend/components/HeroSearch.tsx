"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [status, setStatus] = useState("sale");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("status", status);
    if (search.trim()) params.set("search", search.trim());
    if (type) params.set("property_type", type);
    if (budget) params.set("max_price", budget);
    router.push(`/properties?${params.toString()}`);
  }
  return <form className="hero-search" onSubmit={submit}>
    <div className="search-tabs">{[{ key: "sale", label: "Buy" }, { key: "rent", label: "Rent" }].map(item => <button type="button" key={item.key} className={status === item.key ? "selected" : ""} onClick={() => { setStatus(item.key); setBudget(""); }}>{item.label}</button>)}<button type="button" onClick={() => router.push("/services")}>Invest</button></div>
    <div className="search-inputs"><label><MapPin size={19}/><span><small>Location</small><input value={search} onChange={event => setSearch(event.target.value)} placeholder="City, neighborhood or ZIP"/></span></label>
      <label><SlidersHorizontal size={19}/><span><small>Property Type</small><select value={type} onChange={event => setType(event.target.value)}><option value="">Any Type</option><option value="house">House</option><option value="apartment">Apartment</option><option value="villa">Villa</option><option value="land">Land</option><option value="commercial">Commercial</option></select></span></label>
      <label><span><small>Budget</small><select value={budget} onChange={event => setBudget(event.target.value)}><option value="">Any Budget</option>{(status === "rent" ? [["3000", "Up to $3,000/mo"], ["5000", "Up to $5,000/mo"], ["10000", "Up to $10,000/mo"]] : [["500000", "Up to $500k"], ["1000000", "Up to $1M"], ["2000000", "Up to $2M"], ["5000000", "Up to $5M"]]).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></span></label>
      <button className="button button-primary search-submit" type="submit"><Search size={18}/> Search Properties</button>
    </div>
  </form>;
}
