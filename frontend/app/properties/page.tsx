"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search, SlidersHorizontal, ArrowLeft, ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { listProperties } from "@/lib/api";
import type { Property } from "@/lib/types";

function PropertyCatalog() {
  const initial = useSearchParams();
  const [search, setSearch] = useState(initial.get("search") || "");
  const [status, setStatus] = useState(initial.get("status") || "");
  const [type, setType] = useState(initial.get("property_type") || "");
  const [maxPrice, setMaxPrice] = useState(initial.get("max_price") || "");
  const [ordering, setOrdering] = useState("");
  const [page, setPage] = useState(1);
  const [properties, setProperties] = useState<Property[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sync the initial search state when navigating from the hero search.
  useEffect(() => {
    setSearch(initial.get("search") || ""); setStatus(initial.get("status") || "");
    setType(initial.get("property_type") || ""); setMaxPrice(initial.get("max_price") || ""); setPage(1);
  }, [initial]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (type) params.set("property_type", type);
    if (maxPrice) params.set("max_price", maxPrice);
    if (ordering) params.set("ordering", ordering);
    setLoading(true); setError("");
    const timer = setTimeout(() => {
      listProperties(params.toString()).then(data => {
        if (!cancelled) { setProperties(data.results); setCount(data.count); setLoading(false); }
      }).catch(() => { if (!cancelled) { setError("We could not load the listings. Check the API connection and try again."); setLoading(false); }});
    }, 200);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [search, status, type, maxPrice, ordering, page]);

  function clear() { setSearch(""); setStatus(""); setType(""); setMaxPrice(""); setOrdering(""); setPage(1); }
  return <><section className="page-intro"><div className="container"><p className="eyebrow">EXPLORE THE POSSIBILITIES</p><h1>Find a place to <em>call yours.</em></h1><p>Discover spaces that fit your lifestyle, goals, and aspirations.</p></div></section>
    <section className="container listings-layout"><aside className="filters-panel"><div className="filter-header"><h2><SlidersHorizontal size={20}/> Filters</h2><button onClick={clear} type="button">Reset all</button></div>
      <label>Search location or keyword <div className="filter-search"><Search size={18}/><input value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} placeholder="City, address, keyword"/></div></label>
      <label>Listing status <select value={status} onChange={event => { setStatus(event.target.value); setMaxPrice(""); setPage(1); }}><option value="">All listings</option><option value="sale">For Sale</option><option value="rent">For Rent</option><option value="sold">Sold</option></select></label>
      <label>Property type <select value={type} onChange={event => { setType(event.target.value); setPage(1); }}><option value="">All property types</option><option value="house">House</option><option value="apartment">Apartment</option><option value="villa">Villa</option><option value="land">Land</option><option value="commercial">Commercial</option></select></label>
      <label>Maximum price ($) <input value={maxPrice} type="number" min="0" onChange={event => { setMaxPrice(event.target.value); setPage(1); }} placeholder="No maximum"/></label>
    </aside><div className="listings-content"><div className="results-bar"><span>{loading ? "Finding properties..." : `${count} properties found`}</span><label>Sort by <select value={ordering} onChange={event => { setOrdering(event.target.value); setPage(1); }}><option value="">Featured first</option><option value="price">Price: low to high</option><option value="-price">Price: high to low</option><option value="-created_at">Newest first</option><option value="-area_sqft">Largest first</option></select></label></div>
      {error && <p className="notice error">{error}</p>}
      {!error && !loading && properties.length === 0 && <div className="empty-results"><h3>No matching properties</h3><p>Try broadening your filters to discover more options.</p><button className="button button-primary" onClick={clear}>Clear filters</button></div>}
      <div className="property-grid catalog-grid">{properties.map(property => <PropertyCard property={property} key={property.id}/>)}</div>
      {count > 9 && <div className="pagination"><button disabled={page === 1 || loading} onClick={() => setPage(p => p-1)}><ArrowLeft size={16}/> Previous</button><span>Page {page} of {Math.ceil(count / 9)}</span><button disabled={page >= Math.ceil(count / 9) || loading} onClick={() => setPage(p => p+1)}>Next <ArrowRight size={16}/></button></div>}
    </div></section></>;
}

export default function PropertiesPage() { return <Suspense fallback={<div className="container section">Loading listings...</div>}><PropertyCatalog/></Suspense>; }
