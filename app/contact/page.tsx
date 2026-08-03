"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import Image from "next/image";
import { BsEnvelope, BsInstagram } from "react-icons/bs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Basic input sanitization to strip potential script tags/injections
function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  // GSAP Animation Start: Hero Cinematic Reveal & Contact Details Stagger
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".contact-hero-badge",
            ".contact-hero-rule",
            ".contact-hero-title-line",
            ".contact-info-block",
            ".contact-social-btn",
            ".contact-form-container",
          ],
          { opacity: 1, y: 0, scaleX: 1, clearProps: "filter,clipPath" },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Hero Entrance Timeline
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
          .fromTo(
            ".contact-hero-badge",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.1 },
          )
          .fromTo(
            ".contact-hero-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "expo.out" },
            "-=0.2",
          )
          .fromTo(
            ".contact-hero-title-line",
            {
              opacity: 0,
              y: 40,
              filter: "blur(8px)",
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 1,
              stagger: 0.18,
              ease: "expo.out",
            },
            "-=0.3",
          );

        // 2. Hero Parallax Scroll Effect
        gsap.to(".contact-hero-content", {
          y: -40,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // 3. Contact Coordinates Entrance Timeline
        const contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".contact-info-wrapper",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        contactTl
          .fromTo(
            ".contact-info-block",
            { opacity: 0, x: -25 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power2.out",
            },
          )
          .fromTo(
            ".contact-social-btn",
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(1.5)",
            },
            "-=0.2",
          )
          .fromTo(
            ".contact-form-container",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.4",
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
  // GSAP Animation End: Hero Cinematic Reveal & Contact Details Stagger

  // GSAP Animation Start: Status Message Notification Reveal
  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateStatus = contextSafe(() => {
    if (!statusRef.current || status === "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      statusRef.current,
      { opacity: 0, y: -10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
    );
  });

  useEffect(() => {
    animateStatus();
  }, [status, animateStatus]);
  // GSAP Animation End: Status Message Notification Reveal

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
    <div ref={containerRef} className="bg-stone-50 text-stone-900 font-sans">
      <section
        ref={heroRef}
        className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="contact-hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="contact-hero-badge text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Tender Engagement
          </span>
          <span
            className="contact-hero-rule block h-[2px] w-14 bg-amber-500/70 origin-left mb-4"
            aria-hidden="true"
          />
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight uppercase leading-tight">
            <span className="contact-hero-title-line block">
              Let's Build Something
            </span>
            <span className="contact-hero-title-line font-extrabold text-amber-500 block">
              Beautiful Together.
            </span>
          </h1>
        </div>
      </section>

      <section className="contact-info-wrapper py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div className="contact-info-block">
              <span className="text-xs tracking-widest font-extrabold text-amber-600 uppercase block mb-1">
                Direct Contact
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 uppercase">
                Core Hub Coordinates
              </h2>
            </div>

            <div className="space-y-4 text-sm font-medium text-stone-700">
              <div className="contact-info-block border-l-2 border-amber-600 pl-4">
                <h3 className="text-stone-900 font-extrabold text-xs uppercase mb-1">
                  Corporate HQ
                </h3>
                <p>📍 B-2/86 Madangir, Dr. Ambedkar Nagar, New Delhi, 110062</p>
              </div>
              <div className="contact-info-block border-l-2 border-amber-600 pl-4 space-y-1">
                <h3 className="text-stone-900 font-extrabold text-xs uppercase mb-1">
                  Direct Lines
                </h3>
                <a
                  href="tel:9818141722"
                  className="block hover:text-amber-600 transition-colors"
                >
                  📞 +91 98181 41722
                </a>
                <a
                  href="tel:9717211784"
                  className="block hover:text-amber-600 transition-colors"
                >
                  📞 +91 97172 11784
                </a>
              </div>
              <div className="contact-info-block border-l-2 border-amber-600 pl-4">
                <h3 className="text-stone-900 font-extrabold text-xs uppercase mb-1">
                  Official Mailbox
                </h3>
                <a
                  href="mailto:contact@abconstructions.co.in"
                  className="block hover:text-amber-600 break-all transition-colors"
                >
                  ✉️ contact@abconstructions.co.in
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="mailto:contact@abconstructions.co.in"
                className="contact-social-btn w-12 h-12 flex items-center justify-center bg-stone-200 text-stone-900 hover:bg-amber-600 hover:text-white transition-all duration-300 rounded-full hover:scale-105 active:scale-95"
                title="Email Us"
              >
                <BsEnvelope size={20} />
              </a>
              <a
                href="https://www.instagram.com/abconstruction1977"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn w-12 h-12 flex items-center justify-center bg-stone-200 text-stone-900 hover:bg-amber-600 hover:text-white transition-all duration-300 rounded-full hover:scale-105 active:scale-95"
                title="Follow Instagram"
              >
                <BsInstagram size={18} />
              </a>
            </div>
          </div>

          <div className="contact-form-container lg:col-span-7 bg-white border border-stone-200 p-6 sm:p-8 rounded-sm shadow-sm">
            <h2 className="font-extrabold text-stone-900 uppercase text-lg mb-6">
              Send Operational Query
            </h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full bg-stone-50 border border-stone-300 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-colors duration-200 rounded-sm text-stone-900 min-h-[48px]"
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
                  className="w-full bg-stone-50 border border-stone-300 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-colors duration-200 rounded-sm text-stone-900 min-h-[48px]"
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
                  className="w-full bg-stone-50 border border-stone-300 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-colors duration-200 rounded-sm text-stone-900 min-h-[120px]"
                  placeholder="Describe material type, location, and project scope..."
                />
              </div>

              {status === "success" && (
                <p
                  ref={statusRef}
                  className="text-emerald-700 font-bold text-xs uppercase"
                >
                  ✓ Message sent successfully! We will get back to you shortly.
                </p>
              )}
              {status === "error" && (
                <p
                  ref={statusRef}
                  className="text-rose-700 font-bold text-xs uppercase"
                >
                  ✕ Dispatch error. Please verify form values and try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-amber-600 text-white text-xs font-extrabold uppercase tracking-widest hover:bg-amber-500 transition-all duration-200 shadow-md disabled:bg-stone-400 min-h-[50px] rounded-sm active:scale-[0.99]"
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
