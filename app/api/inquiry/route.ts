import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required fields." },
        { status: 400 },
      );
    }

    // 1. Log Lead to Supabase Database
    const { error: dbError } = await supabase.from("contact_leads").insert([
      {
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      console.warn("Supabase lead logging bypassed:", dbError.message);
    }

    // 2. Dispatch Email via Web3Forms Pipeline
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key:
          process.env.WEB3FORMS_ACCESS_KEY ||
          "258081ac-8cd8-4aef-9f1b-ceaea255e5bb",
        subject: "🚨 New Business Operational Query — A&B Construction",
        from_name: name,
        replyto: email,
        name,
        email,
        message: message || "No message body provided.",
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error("Email dispatch gateway rejected packet.");
    }

    return NextResponse.json({
      success: true,
      message: "Query dispatched successfully.",
    });
  } catch (err: any) {
    console.error("Critical gateway exception:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Dispatch Error" },
      { status: 500 },
    );
  }
}
