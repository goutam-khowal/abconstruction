// import Image from "next/image";

// export const metadata = {
//   title: "Contact Us – A&B Construction",
//   description:
//     "Let's Build Something Beautiful Together! Have a project in mind? Get in touch with us.",
// };

// export default function ContactPage() {
//   return (
//     <div className="bg-white text-slate-900 font-sans">
//       {/* Hero */}
//       <section className="relative min-h-[45vh] flex items-center bg-dark-blue text-white pt-32 pb-16 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
//         <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15">
//           <Image
//             src="https://a-bconstruction.in/wp-content/uploads/2025/02/freepik__upload__40404.png"
//             alt=""
//             fill
//             className="object-cover object-left"
//             unoptimized
//           />
//         </div>
//         <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
//           <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
//             Tender Engagement
//           </span>
//           <h1 className="text-4xl sm:text-6xl font-light tracking-tight uppercase leading-none">
//             Let's Build Something <br />
//             <span className="font-extrabold text-transparent webkit-text-stroke">
//               Beautiful Together.
//             </span>
//           </h1>
//         </div>
//       </section>

//       {/* Main Structural Layout Grid */}
//       <section className="py-24 max-w-7xl mx-auto px-6 sm:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           <div className="lg:col-span-5 space-y-10">
//             <div className="space-y-2">
//               <span className="text-[10px] tracking-[0.3em] font-bold text-brand-blue uppercase block">
//                 Registry Data
//               </span>
//               <h2 className="text-2xl font-extrabold text-dark-blue uppercase tracking-tight">
//                 Core Hub Coordinates
//               </h2>
//             </div>

//             <div className="space-y-6 text-sm font-medium text-slate-600">
//               <div className="border-l-2 border-brand-blue pl-4">
//                 <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
//                   Corporate HQ Address
//                 </h4>
//                 <p>B-2/86 Madangir, Ambedkarnagar, New Delhi, 110062</p>
//               </div>
//               <div className="border-l-2 border-brand-blue pl-4">
//                 <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
//                   Direct Procurement Links
//                 </h4>
//                 <a
//                   href="tel:9818141722"
//                   className="block hover:text-brand-blue transition-colors"
//                 >
//                   9818141722
//                 </a>
//                 <a
//                   href="tel:9717211784"
//                   className="block hover:text-brand-blue transition-colors"
//                 >
//                   9717211784
//                 </a>
//               </div>
//               <div className="border-l-2 border-brand-blue pl-4">
//                 <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
//                   Official Security Mailbox
//                 </h4>
//                 <a
//                   href="mailto:contact@abconstructions.co.in"
//                   className="block hover:text-brand-blue transition-colors"
//                 >
//                   contact@abconstructions.co.in
//                 </a>
//               </div>
//             </div>

//             <div className="border border-slate-200 shadow-sm p-2 bg-white">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.4746654876775!2d77.23419017631853!3d28.525424575723902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce173361184fb%3A0xc6cb5a61e3895e7d!2sMadangir%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1718900000000!3m2!1sen!2sin"
//                 width="100%"
//                 height="260"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="A&B Construction structural routing tracking coordinate asset map"
//               />
//             </div>
//           </div>

//           {/* Secure Interactive Message Dispatch Box */}
//           <div className="lg:col-span-7 bg-ice border border-slate-200 p-8 sm:p-10 shadow-sm">
//             <h3 className="font-display font-bold text-dark-blue uppercase tracking-wide text-base mb-8">
//               Send Operational Query
//             </h3>
//             <form className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
//                   Entity Operator Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900"
//                   placeholder="Your full name"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
//                   Secure Contact Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900"
//                   placeholder="you@company.com"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
//                   Project Bounds Scope
//                 </label>
//                 <textarea
//                   rows={5}
//                   required
//                   className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900 resize-none font-medium"
//                   placeholder="Detail standard material parameters required..."
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-4 bg-brand-blue text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-brand-hover transition-colors shadow-sm"
//               >
//                 Dispatch Query Request
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useTransition } from "react";
// import Image from "next/image";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
//   const [isPending, startTransition] = useTransition();

//   const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzjgrrz";

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     startTransition(async () => {
//       try {
//         setStatus("idle");

//         // 1. DATABASE ENTRY: Supabase lead table registration log
//         const { supabase } = await import("@/lib/supabase");
//         const { error: dbError } = await supabase.from("contact_leads").insert([
//           {
//             name: formData.name,
//             email: formData.email,
//             created_at: new Date().toISOString(),
//           },
//         ]);

//         if (dbError) console.warn("Lead backup log entry bypassed...");

//         // 2. SECURE EMAIL PIPELINE: Web3Forms direct dynamic delivery route
//         const response = await fetch("https://api.web3forms.com/submit", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify({
//             // 🚀 YAHA APNI WEB3FORMS WAALI UNIQUE KEY PASTE KARO BHAI
//             access_key: "258081ac-8cd8-4aef-9f1b-ceaea255e5bb",
//             subject: "🚨 New Business Operational Query — A&B Construction",
//             from_name: formData.name,
//             replyto: formData.email,

//             // Form Fields data packages
//             Client_Name: formData.name,
//             Client_Email: formData.email,
//             Project_Scope_Details: formData.message,
//           }),
//         });

//         const result = await response.json();

//         if (!result.success)
//           throw new Error("Email dispatch gateway pipeline rejected packet");

//         setStatus("success");
//         setFormData({ name: "", email: "", message: "" });
//       } catch (err) {
//         console.error("Critical gateway dispatch exception:", err);
//         setStatus("error");
//       }
//     });
//   };

//   return (
//     <div className="bg-white text-slate-900 font-sans">
//       {/* Hero */}
//       <section className="relative min-h-[45vh] flex items-center bg-dark-blue text-white pt-32 pb-16 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
//         <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15">
//           <Image
//             src="https://a-bconstruction.in/wp-content/uploads/2025/02/freepik__upload__40404.png"
//             alt=""
//             fill
//             className="object-cover object-left"
//           />
//         </div>
//         <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
//           <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
//             Tender Engagement
//           </span>
//           <h1 className="text-4xl sm:text-6xl font-light tracking-tight uppercase leading-none">
//             Let's Build Something <br />
//             <span className="font-black text-transparent block mt-2 text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#ffffff]">
//               Beautiful Together.
//             </span>
//           </h1>
//         </div>
//       </section>

//       {/* Main Structural Layout Grid */}
//       <section className="py-24 max-w-7xl mx-auto px-6 sm:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           <div className="lg:col-span-5 space-y-10">
//             <div className="space-y-2">
//               <span className="text-[10px] tracking-[0.3em] font-bold text-brand-blue uppercase block">
//                 Registry Data
//               </span>
//               <h2 className="text-2xl font-extrabold text-dark-blue uppercase tracking-tight">
//                 Core Hub Coordinates
//               </h2>
//             </div>

//             <div className="space-y-6 text-sm font-medium text-slate-600">
//               <div className="border-l-2 border-brand-blue pl-4">
//                 <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
//                   Corporate HQ Address
//                 </h4>
//                 <p>B-2/86 Madangir, Ambedkarnagar, New Delhi, 110062</p>
//               </div>
//               <div className="border-l-2 border-brand-blue pl-4">
//                 <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
//                   Direct Procurement Links
//                 </h4>
//                 <a
//                   href="tel:9818141722"
//                   className="block hover:text-brand-blue transition-colors"
//                 >
//                   9818141722
//                 </a>
//                 <a
//                   href="tel:9717211784"
//                   className="block hover:text-brand-blue transition-colors"
//                 >
//                   9717211784
//                 </a>
//               </div>
//               <div className="border-l-2 border-brand-blue pl-4">
//                 <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
//                   Official Security Mailbox
//                 </h4>
//                 <a
//                   href="mailto:contact@abconstructions.co.in"
//                   className="block hover:text-brand-blue transition-colors"
//                 >
//                   contact@abconstructions.co.in
//                 </a>
//               </div>
//             </div>

//             <div className="border border-slate-200 shadow-sm p-2 bg-white">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.474667554907!2d77.2346614!3d28.5254181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x390ce17079f88d2b%3A0xc3cf037f1b74f38c!2sMadangir%2C New Delhi!5e0!3m2!1sen!2sin!4v1690000000000"
//                 width="100%"
//                 height="260"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="A&B Construction structural routing tracking map"
//               />
//             </div>
//           </div>

//           {/* Secure Interactive Message Dispatch Box */}
//           <div className="lg:col-span-7 bg-ice border border-slate-200 p-8 sm:p-10 shadow-sm">
//             <h3 className="font-bold text-dark-blue uppercase tracking-wide text-base mb-8">
//               Send Operational Query
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
//                   Entity Operator Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900"
//                   placeholder="Your full name"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
//                   Secure Contact Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900"
//                   placeholder="you@company.com"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
//                   Project Bounds Scope
//                 </label>
//                 <textarea
//                   rows={5}
//                   required
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                   className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900 resize-none font-medium"
//                   placeholder="Detail standard material parameters required..."
//                 />
//               </div>

//               {status === "success" && (
//                 <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider animate-fade-in">
//                   ✓ Operational query dispatched directly to official mailbox!
//                 </p>
//               )}
//               {status === "error" && (
//                 <p className="text-rose-600 font-bold text-xs uppercase tracking-wider animate-fade-in">
//                   ✕ Dispatch error. Please verify configuration infrastructure.
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={isPending}
//                 className="w-full py-4 bg-brand-blue text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-brand-hover transition-colors shadow-sm disabled:bg-slate-400 select-none"
//               >
//                 {isPending ? "Dispatching Query..." : "Dispatch Query Request"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";

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

    startTransition(async () => {
      try {
        setStatus("idle");

        // 1. DATABASE ENTRY: Supabase lead table registration log
        const { supabase } = await import("@/lib/supabase");
        const { error: dbError } = await supabase.from("contact_leads").insert([
          {
            name: formData.name,
            email: formData.email,
            created_at: new Date().toISOString(),
          },
        ]);

        if (dbError) console.warn("Lead backup log entry bypassed...");

        // 2. SECURE EMAIL PIPELINE: Web3Forms direct dynamic delivery route
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "258081ac-8cd8-4aef-9f1b-ceaea255e5bb",
            subject: "🚨 New Business Operational Query — A&B Construction",
            from_name: formData.name,
            replyto: formData.email,

            // Form Fields data packages mapped neatly for email presentation
            Client_Name: formData.name,
            Client_Email: formData.email,
            Project_Scope_Details: formData.message,
          }),
        });

        const result = await response.json();

        if (!result.success)
          throw new Error("Email dispatch gateway pipeline rejected packet");

        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } catch (err) {
        console.error("Critical gateway dispatch exception:", err);
        setStatus("error");
      }
    });
  };

  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center bg-dark-blue text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15">
          <Image
            src="https://a-bconstruction.in/wp-content/uploads/2025/02/freepik__upload__40404.png"
            alt="Corporate procurement baseline asset layout"
            fill
            className="object-cover object-left"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
            Tender Engagement
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight uppercase leading-none">
            Let's Build Something <br />
            <span className="font-black text-transparent block mt-2 text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#ffffff]">
              Beautiful Together.
            </span>
          </h1>
        </div>
      </section>

      {/* Main Structural Layout Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] font-bold text-brand-blue uppercase block">
                Registry Data
              </span>
              <h2 className="text-2xl font-extrabold text-dark-blue uppercase tracking-tight">
                Core Hub Coordinates
              </h2>
            </div>

            <div className="space-y-6 text-sm font-medium text-slate-600">
              <div className="border-l-2 border-brand-blue pl-4">
                <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
                  Corporate HQ Address
                </h4>
                <p>B-2/86 Madangir, Ambedkarnagar, New Delhi, 110062</p>
              </div>
              <div className="border-l-2 border-brand-blue pl-4">
                <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
                  Direct Procurement Links
                </h4>
                <a
                  href="tel:9818141722"
                  className="block hover:text-brand-blue transition-colors"
                >
                  9818141722
                </a>
                <a
                  href="tel:9717211784"
                  className="block hover:text-brand-blue transition-colors"
                >
                  9717211784
                </a>
              </div>
              <div className="border-l-2 border-brand-blue pl-4">
                <h4 className="text-dark-blue font-bold text-xs uppercase tracking-wider mb-1">
                  Official Security Mailbox
                </h4>
                <a
                  href="mailto:contact@abconstructions.co.in"
                  className="block hover:text-brand-blue transition-colors"
                >
                  contact@abconstructions.co.in
                </a>
              </div>
            </div>

            <div className="border border-slate-200 shadow-sm p-2 bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.474667554907!2d77.2346614!3d28.5254181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x390ce17079f88d2b%3A0xc3cf037f1b74f38c!2sMadangir%2C New Delhi!5e0!3m2!1sen!2sin!4v1690000000000"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="A&B Construction structural routing tracking map"
              />
            </div>
          </div>

          {/* Secure Interactive Message Dispatch Box */}
          <div className="lg:col-span-7 bg-ice border border-slate-200 p-8 sm:p-10 shadow-sm">
            <h3 className="font-bold text-dark-blue uppercase tracking-wide text-base mb-8">
              Send Operational Query
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
                  Entity Operator Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
                  Secure Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900"
                  placeholder="you@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] tracking-widest uppercase text-slate-500 font-bold">
                  Project Bounds Scope
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 px-4 py-3 text-xs focus:outline-none focus:border-brand-blue transition-colors rounded-none text-slate-900 resize-none font-medium"
                  placeholder="Detail standard material parameters required..."
                />
              </div>

              {status === "success" && (
                <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider animate-fade-in">
                  ✓ Operational query dispatched directly to official mailbox!
                </p>
              )}
              {status === "error" && (
                <p className="text-rose-600 font-bold text-xs uppercase tracking-wider animate-fade-in">
                  ✕ Dispatch error. Please verify configuration infrastructure.
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-brand-blue text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-brand-hover transition-colors shadow-sm disabled:bg-slate-400 select-none"
              >
                {isPending ? "Dispatching Query..." : "Dispatch Query Request"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
