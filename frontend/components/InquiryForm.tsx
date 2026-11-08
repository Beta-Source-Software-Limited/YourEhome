"use client";
import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { sendInquiry } from "@/lib/api";
import type { InquiryPayload } from "@/lib/types";

interface Props { category: InquiryPayload["category"]; propertyId?: number; headline?: string; }

export default function InquiryForm({ category, propertyId, headline = "Send us a message" }: Props) {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload: InquiryPayload = {
      category, ...(propertyId ? { property: propertyId } : {}),
      name: String(fields.get("name") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      phone: String(fields.get("phone") || "").trim(),
      message: String(fields.get("message") || "").trim(),
    };
    const preferredDate = String(fields.get("preferred_date") || "");
    if (preferredDate) payload.preferred_date = preferredDate;
    setSending(true);
    try { const result = await sendInquiry(payload); setFeedback({ ok: true, text: result.message }); form.reset(); }
    catch (error) { setFeedback({ ok: false, text: error instanceof Error ? error.message : "Something went wrong." }); }
    finally { setSending(false); }
  }
  return <div className="inquiry-panel"><h3>{headline}</h3><p>Tell us what you are looking for. Our team will be in touch.</p>
    <form onSubmit={submit} className="inquiry-form">
      <label>Full name <input name="name" required maxLength={120} autoComplete="name" placeholder="Your full name" /></label>
      <div className="form-two"><label>Email address <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>Phone (optional) <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Phone number" /></label></div>
      {category === "consultation" && <label>Preferred date (optional) <input name="preferred_date" type="date" min={new Date().toISOString().slice(0,10)}/></label>}
      <label>Message <textarea name="message" required maxLength={3000} rows={5} placeholder="How can we help you?" /></label>
      {feedback && <div role="status" className={`form-feedback ${feedback.ok ? "success" : "error"}`}>{feedback.ok && <CheckCircle2 size={17}/>} {feedback.text}</div>}
      <button className="button button-primary form-submit" type="submit" disabled={sending}>{sending ? <><LoaderCircle className="spin" size={17}/> Sending...</> : <>Send Message <Send size={16}/></>}</button>
    </form>
  </div>;
}
