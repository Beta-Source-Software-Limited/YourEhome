"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { listAgents } from "@/lib/api";
import type { Agent } from "@/lib/types";

export default function AgentsPreview({ full = false }: { full?: boolean }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => { listAgents().then(setAgents).catch(() => setError(true)); }, []);
  return <section className="section agents-section"><div className="container">
    {!full && <div className="section-top"><div><p className="eyebrow">OUR EXPERTS</p><h2>Meet Our <em>Top Agents</em></h2></div><Link href="/agents" className="text-link">View All Agents <ArrowRight size={17}/></Link></div>}
    {error && <p className="notice error">Unable to load agents right now.</p>}
    {!error && agents.length === 0 && <p className="muted">Loading our property advisors...</p>}
    <div className="agents-grid">{(full ? agents : agents.slice(0, 4)).map(agent => <article className="agent-card" key={agent.id}>
      <div className="agent-photo">{agent.photo_url && <Image src={agent.photo_url} alt={agent.name} fill sizes="120px"/>}</div>
      <div><h3>{agent.name} <BadgeCheck size={15}/></h3><p>{agent.title}</p><small>{agent.years_experience}+ Years Experience</small></div>
    </article>)}</div>
  </div></section>;
}
