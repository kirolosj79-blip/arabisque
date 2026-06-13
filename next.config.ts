import type { NextConfig } from "next";

const securityHeaders = [
  { key:"X-DNS-Prefetch-Control",  value:"on" },
  { key:"X-Frame-Options",          value:"SAMEORIGIN" },
  { key:"X-Content-Type-Options",   value:"nosniff" },
  { key:"Referrer-Policy",          value:"strict-origin-when-cross-origin" },
  { key:"Permissions-Policy",       value:"camera=(), microphone=(), geolocation=()" },
  { key:"X-XSS-Protection",         value:"1; mode=block" },
  { key:"Strict-Transport-Security",value:"max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol:"https", hostname:"*.supabase.co" },
      { protocol:"https", hostname:"images.unsplash.com" },
    ],
    formats:["image/avif","image/webp"],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      { source:"/(.*)", headers:securityHeaders },
      // Static assets — immutable (safe, fingerprinted)
      {
        source:"/_next/static/(.*)",
        headers:[{ key:"Cache-Control", value:"public, max-age=31536000, immutable" }],
      },
      // HTML pages — always fresh, no stale cache
      {
        source:"/((?!_next/static|_next/image|favicon.ico|images).*)",
        headers:[{
          key:"Cache-Control",
          value:"no-cache, no-store, must-revalidate",
        }],
      },
      {
        source:"/images/(.*)",
        headers:[{ key:"Cache-Control", value:"public, max-age=3600, must-revalidate" }],
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
