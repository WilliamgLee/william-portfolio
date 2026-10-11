import Link from "next/link";
import Figure, { BLOCK_COUNT } from "@/components/Figure";
import Intro from "@/components/Intro";
import StatusBadge from "@/components/StatusBadge";
import { site } from "@/data/site";

export default function HomePage() {
  const [first, last] = site.name.split(" ");

  return (
    <>
      <Intro />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-6 sm:px-8 md:min-h-[calc(100svh-180px)] md:grid-cols-12 md:gap-8">
        <div id="hero-avatar" className="hero-avatar mx-auto w-full max-w-[300px] md:col-span-5 md:max-w-[420px]">
          <Figure
            number={1}
            pose="stand"
            res={112}
            greeting="Hi, I'm William!"
            caption={`William, built from ${BLOCK_COUNT} blocks.`}
          />
        </div>

        <div className="hero-copy md:col-span-7 md:pl-6">
          <StatusBadge className="enter mb-7" style={{ "--i": 0 }} />
          <h1 className="font-serif text-[clamp(4rem,11vw,9.5rem)] font-normal leading-[0.86] tracking-[-0.035em]">
            <span className="enter block" style={{ "--i": 0 }}>
              {first}
            </span>
            <span className="enter block pl-[0.6em]" style={{ "--i": 1 }}>
              {last}
            </span>
          </h1>
          <p className="enter mt-8 text-lg text-slate" style={{ "--i": 2 }}>
            {site.tagline}
          </p>
          <p className="enter mt-4 max-w-[34ch] font-serif text-2xl leading-snug text-ink" style={{ "--i": 3 }}>
            {site.intro}
          </p>
          <div className="enter mt-9 flex flex-wrap gap-3" style={{ "--i": 4 }}>
            <Link
              href="/work"
              className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-opacity hover:opacity-85"
            >
              See my work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-ink/25 px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
