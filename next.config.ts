import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Keeps your static HTML export active
  images: {
    unoptimized: true, // Required for static export setup
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-project-id.supabase.co", // Replace with your actual Supabase Project Ref ID
        port: "",
        pathname: "/storage/v1/object/public/**", // Permits access to all public buckets
      },
    ],
  },
};

export default nextConfig;
