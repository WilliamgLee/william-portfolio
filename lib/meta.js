import { site } from "@/data/site";

// Builds a page's metadata: <title>, description, canonical URL, and the
// Open Graph / Twitter tags that link previews (WhatsApp, LinkedIn, X) read.
//
// Why a helper: in Next.js a page's `openGraph` object REPLACES the root
// layout's one instead of merging with it, so every page has to repeat
// siteName, type, etc. Doing that in one place keeps all pages consistent.
//
// path is relative ("/work"); metadataBase in app/layout.jsx turns it into
// https://william-lee.dev/work. The share image (app/opengraph-image.png)
// is added by Next.js automatically.
export function pageMeta({ title, description, path, absoluteTitle = false }) {
  const full = absoluteTitle ? title : `${title} · ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title, // the layout's template adds " · William Lee"
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
