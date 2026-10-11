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
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
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
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
