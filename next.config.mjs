// Security settings. These headers are sent with every page and every file
// the site serves, including /projects/bingo-math.html.

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy: the browser only runs scripts and loads styles,
// fonts and images that come from this site itself, and other sites can't
// put this one inside an iframe (clickjacking).
// 'unsafe-inline' is required because Next.js and the intro use small inline
// scripts; they still have to be part of this site's own pages.
// In development only, Next.js also needs 'unsafe-eval' and a websocket for hot reload.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Don't let browsers guess file types (stops some file-based attacks).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Older browsers' version of frame-ancestors above.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Other sites see only your domain when someone clicks a link out, not the full URL.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site never needs these, so they are switched off entirely (no camera, mic or location).
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  // Always use HTTPS once a browser has visited over HTTPS (ignored on http://localhost).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // Pages opened from other sites can't reach back into this one.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise "X-Powered-By: Next.js" to everyone.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
