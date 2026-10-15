import { Newsreader, Schibsted_Grotesk, Silkscreen } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import { site } from "@/data/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted" });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: "400", variable: "--font-silkscreen" });

// The share preview image is app/opengraph-image.png (and twitter-image.png);
// Next.js adds it to every page automatically.
export const metadata = {
  // Turns relative URLs (canonical links, og:url, the share image) into full ones.
  metadataBase: new URL("https://william-lee.dev"),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

// Structured data for search engines: tells Google this site is about a person,
// and which profiles elsewhere are the same person (shown in search results).
const sameAs = site.socials.filter((s) => ["GitHub", "LinkedIn"].includes(s.label)).map((s) => s.url);
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: "https://william-lee.dev",
  sameAs,
};

// Runs before the page paints: applies the saved theme, and decides whether
// the intro should play (first visit of the session, landing on Home, motion allowed).
const bootScript = `
(function () {
  var d = document.documentElement;
  try { var t = localStorage.getItem("theme"); if (t) d.dataset.theme = t; } catch (e) {}
  try {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem("introSeen") || location.pathname !== "/") {
      d.dataset.intro = "skip";
      sessionStorage.setItem("introSeen", "1");
    }
  } catch (e) { d.dataset.intro = "skip"; }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${newsreader.variable} ${schibsted.variable} ${silkscreen.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          // "<" is escaped so text in the data can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
