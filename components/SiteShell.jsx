import Nav from "./Nav";
import Footer from "./Footer";
import ScrollBuddy from "./ScrollBuddy";
import AvatarExtras from "./AvatarExtras";

export default function SiteShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollBuddy />
      <AvatarExtras />
    </div>
  );
}
