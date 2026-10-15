// Served at /sitemap.xml: the list of public pages search engines should know about.
// Add new pages here. Secret pages (like /kado) are deliberately left out.
const BASE = "https://william-lee.dev";

const pages = [
  { path: "/", priority: 1 },
  { path: "/work", priority: 0.9 },
  { path: "/work/kiki-classroom", priority: 0.8 },
  { path: "/work/loop-quest", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/skill", priority: 0.6 },
  { path: "/together", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
  // The playable projects themselves
  { path: "/projects/bingolah.html", priority: 0.6 },
  { path: "/projects/loop-quest.html", priority: 0.6 },
];

export default function sitemap() {
  const lastModified = new Date();
  return pages.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
