import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bucket, paths, expiresIn = 3600 } = body;

    if (!bucket || !paths || !Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json(
        { error: "Invalid bucket or paths array provided." },
        { status: 400 },
      );
    }

    // Ensure paths are clean strings without extra whitespace
    const sanitizedPaths = paths
      .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
      .map((p) => p.trim());

    if (sanitizedPaths.length === 0) {
      return NextResponse.json(
        { error: "No valid image paths found in request payload." },
        { status: 400 },
      );
    }

    // Call Supabase admin createSignedUrls batch method
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrls(sanitizedPaths, expiresIn);

    if (error || !data) {
      console.error("Supabase Storage signing error:", error);
      return NextResponse.json(
        { error: error?.message || "Failed to generate signed URLs." },
        { status: 500 },
      );
    }

    // Map paths to generated time-limited signed URLs
    const signedUrlsMap: Record<string, string> = {};
    data.forEach((item) => {
      if (item.path && item.signedUrl) {
        signedUrlsMap[item.path] = item.signedUrl;
      }
    });

    return NextResponse.json({ signedUrls: signedUrlsMap });
  } catch (err: any) {
    console.error("Signed URL endpoint error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
