"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { BsEnvelope, BsInstagram } from "react-icons/bs";

// Basic input sanitization to strip potential script tags/injections
function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setStatus("error");
      return;
    }

    startTransition(async () => {
      try {
        setStatus("idle");

        const { supabase } = await import("@/lib/supabase");
        await supabase.from("contact_leads").insert([
          {
            name: cleanName,
            email: cleanEmail,
            created_at: new Date().toISOString(),
          },
        ]);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "258081ac-8cd8-4aef-9f1b-ceaea255e5bb",
            subject: "New Project Inquiry — A&B Construction",
            from_name: cleanName,
            replyto: cleanEmail,
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
          }),
        });

        const result = await response.json();
        if (!result.success) throw new Error("Dispatch gate failed");

        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } catch (err) {
        setStatus("error");
      }
    });
  };

  return (
    <div className="bg-stone-50 text-stone-900 font-sans">
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Tender Engagement
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight uppercase leading-tight">
            Let's Build Something <br />
            <span className="font-extrabold text-amber-500">
              Beautiful Together.
            </span>
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs tracking-widest font-extrabold text-amber-600 uppercase block mb-1">
                Direct Contact
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 uppercase">
                Core Hub Coordinates
              </h2>
            </div>

            <div className="space-y-4 text-sm font-medium text-stone-700">
              <div className="border-l-2 border-amber-600 pl-4">
                <h3 className="text-stone-900 font-extrabold text-xs uppercase mb-1">
                  Corporate HQ
                </h3>
                <p>📍 B-2/86 Madangir, Dr. Ambedkar Nagar, New Delhi, 110062</p>
              </div>
              <div className="border-l-2 border-amber-600 pl-4 space-y-1">
                <h3 className="text-stone-900 font-extrabold text-xs uppercase mb-1">
                  Direct Lines
                </h3>
                <a href="tel:9818141722" className="block hover:text-amber-600">
                  📞 +91 98181 41722
                </a>
                <a href="tel:9717211784" className="block hover:text-amber-600">
                  📞 +91 97172 11784
                </a>
              </div>
              <div className="border-l-2 border-amber-600 pl-4">
                <h3 className="text-stone-900 font-extrabold text-xs uppercase mb-1">
                  Official Mailbox
                </h3>
                <a
                  href="mailto:contact@abconstructions.co.in"
                  className="block hover:text-amber-600 break-all"
                >
                  ✉️ contact@abconstructions.co.in
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="mailto:contact@abconstructions.co.in"
                className="w-12 h-12 flex items-center justify-center bg-stone-200 text-stone-900 hover:bg-amber-600 hover:text-white transition-all rounded-full"
                title="Email Us"
              >
                <BsEnvelope size={20} />
              </a>
              <a
                href="https://www.instagram.com/abconstruction1977"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-stone-200 text-stone-900 hover:bg-amber-600 hover:text-white transition-all rounded-full"
                title="Follow Instagram"
              >
                <BsInstagram size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-stone-200 p-6 sm:p-8 rounded-sm shadow-sm">
            <h2 className="font-extrabold text-stone-900 uppercase text-lg mb-6">
              Send Operational Query
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-600 font-bold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-amber-600 rounded-sm text-stone-900 min-h-[48px]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-stone-600 font-bold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-amber-600 rounded-sm text-stone-900 min-h-[48px]"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-stone-600 font-bold mb-1">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-amber-600 rounded-sm text-stone-900 min-h-[120px]"
                  placeholder="Describe material type, location, and project scope..."
                />
              </div>

              {status === "success" && (
                <p className="text-emerald-700 font-bold text-xs uppercase">
                  ✓ Message sent successfully! We will get back to you shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-rose-700 font-bold text-xs uppercase">
                  ✕ Dispatch error. Please verify form values and try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-amber-600 text-white text-xs font-extrabold uppercase tracking-widest hover:bg-amber-500 transition-colors shadow-md disabled:bg-stone-400 min-h-[50px] rounded-sm"
              >
                {isPending ? "Sending Query..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
