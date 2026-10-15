import Link from "next/link";
import Figure from "@/components/Figure";
import { site } from "@/data/site";

export const metadata = {
  title: "About",
  description: `About ${site.name}, a student from Indonesia who tinkers with AI.`,
};

// Turns "[text](/path)" inside a paragraph into a link. Pages of this site
// open in the same tab; files like /projects/x.html open in a new tab.
function withLinks(text) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const [, label, href] = m;
    const className = "text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink";
    return /\.[a-z]+$/i.test(href) ? (
      <a key={i} href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    ) : (
      <Link key={i} href={href} className={className}>
        {label}
      </Link>
    );
  });
}

export default function AboutPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 sm:px-8 md:grid-cols-12 md:pt-20">
      <Figure
        number={2}
        pose="sit"
        res={96}
        caption="Taking a seat to explain."
        greeting="Pull up a seat."
        className="enter w-40 md:col-span-3 md:w-full md:max-w-[220px] md:pt-3"
      />
      <article className="md:col-span-8 md:col-start-5">
        <h1 className="sr-only">About</h1>
        <p className="enter font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]" style={{ "--i": 1 }}>
          {site.about.lead}
        </p>
        <div className="enter mt-8 max-w-[62ch] space-y-6 font-serif text-xl leading-[1.7] text-ink/85" style={{ "--i": 2 }}>
          {site.about.body.map((paragraph, i) => (
            <p key={i}>{withLinks(paragraph)}</p>
          ))}
        </div>
      </article>
    </section>
  );
}
