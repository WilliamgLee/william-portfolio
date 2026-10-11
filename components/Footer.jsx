import { site } from "@/data/site";
import ReplayIntro from "./ReplayIntro";

export default function Footer() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-6xl px-5 pb-10 sm:px-8">
      <div className="flex flex-col gap-4 border-t border-rule pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <ReplayIntro />
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
