// Served at /robots.txt. Tells search engines they may crawl everything and
// where the sitemap is. (The private /kado pages opt out with their own
// "X-Robots-Tag: noindex" header in next.config.mjs.)
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://william-lee.dev/sitemap.xml",
  };
}
