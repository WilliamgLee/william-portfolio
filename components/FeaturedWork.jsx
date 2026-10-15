import Image from "next/image";
import Link from "next/link";
import HoverLook from "@/components/HoverLook";
import SmartLink from "@/components/SmartLink";
import TechTags from "@/components/TechTags";
import { site } from "@/data/site";

// "Featured work" on the homepage: one big card for the first project (Kiki
// Classroom) and smaller cards for the next two. All text comes from
// data/site.js, so editing a project there updates this section too.
const byTitle = (title) => site.projects.find((p) => p.title === title);
const MAIN = byTitle("Kiki Classroom");
const SIDE = ["Bingolah", "Loop Quest"].map(byTitle).filter(Boolean);

const pill = "inline-block rounded-full px-5 py-2.5 text-[15px] font-medium transition";

export default function FeaturedWork() {
  if (!MAIN) return null;
  const demo = MAIN.links?.find((l) => /demo/i.test(l.label));

  return (
    <section aria-labelledby="featured-heading" className="mx-auto mt-24 max-w-6xl px-5 sm:px-8 md:mt-16">
      <div className="flex items-baseline justify-between gap-4 border-t border-rule pt-10">
        <h2 id="featured-heading" className="font-serif text-[clamp(2.2rem,4.6vw,3.6rem)] leading-none tracking-[-0.025em]">
          Featured work
        </h2>
        <Link href="/work" className="shrink-0 text-[15px] text-muted underline-offset-4 hover:text-ink hover:underline">
          All work →
        </Link>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {/* the big card */}
        <HoverLook className="grid gap-6 rounded-lg border border-rule p-5 md:col-span-2 md:grid-cols-12 md:items-center md:gap-10 md:p-8">
          <SmartLink href={MAIN.url} tabIndex={-1} aria-hidden="true" className="group block overflow-hidden rounded-md bg-slate-soft md:col-span-7">
            <Image
              src={MAIN.image}
              alt=""
              width={1000}
              height={624}
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </SmartLink>
          <div className="md:col-span-5">
            <h3 className="text-[15px] font-bold">
              {MAIN.title}
              {MAIN.badge && (
                <span className="ml-2 rounded-sm bg-ink px-1.5 py-0.5 align-middle font-pixel text-[10px] font-normal tracking-wider text-paper">
                  {MAIN.badge}
                </span>
              )}
            </h3>
            <p className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">{MAIN.hook}</p>
            <p className="mt-4 max-w-[44ch] text-muted">{MAIN.pitch}</p>
            <TechTags tags={MAIN.tags} />
            <div className="mt-6 flex flex-wrap gap-3">
              <SmartLink href={MAIN.url} className={`${pill} bg-ink text-paper hover:opacity-85`}>
                {MAIN.cta || "Read the story"}
              </SmartLink>
              {demo && (
                <SmartLink href={demo.url} className={`${pill} border border-ink/25 hover:border-ink`}>
                  <span aria-hidden="true">▶</span> {demo.label}
                </SmartLink>
              )}
            </div>
          </div>
        </HoverLook>

        {/* the two smaller cards */}
        {SIDE.map((p) => (
          <HoverLook key={p.title} className="flex flex-col rounded-lg border border-rule p-5 md:p-6">
            <SmartLink href={p.url} tabIndex={-1} aria-hidden="true" className="group block overflow-hidden rounded-md bg-slate-soft">
              <Image
                src={p.image}
                alt=""
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </SmartLink>
            <h3 className="mt-5 text-[15px] font-bold">{p.title}</h3>
            <p className="mt-2 font-serif text-[1.7rem] leading-[1.1] tracking-[-0.02em]">{p.hook}</p>
            <TechTags tags={p.tags} />
            <div className="mt-auto pt-6">
              <SmartLink href={p.url} className={`${pill} border border-ink/25 hover:border-ink`}>
                {p.cta || `Visit ${p.title}`}
              </SmartLink>
            </div>
          </HoverLook>
        ))}
      </ul>
    </section>
  );
}
