import Image from "next/image";
import Link from "next/link";
import Figure from "@/components/Figure";
import { kiki } from "@/data/kiki";
import { Button, Eyebrow, Glance, Limits, Pipeline, Section, wrap } from "@/components/story";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Kiki Classroom",
  description: "A tiny AI office that makes learning videos for kids: six local AI agents, four rules, and a person with the last word.",
  path: "/work/kiki-classroom",
});

// Why the 7B model didn't fit in 6 GB, and the 3B one does.
function MemoryBar() {
  return (
    <figure className="my-6 rounded-lg border border-rule p-5">
      <figcaption className="font-pixel text-[11px] uppercase tracking-[0.15em] text-muted">6 GB of video memory</figcaption>
      <div className="mt-4 space-y-4 text-[14px]">
        <div>
          <p className="mb-1.5 font-medium">Qwen2.5 7B</p>
          <div className="flex h-7 w-full overflow-hidden rounded-sm border border-ink/30">
            <span className="flex h-full items-center bg-[#e07a7a] px-2 text-[12px] font-semibold text-[#2a1010]" style={{ width: "78%" }}>
              model ≈ 4.7 GB
            </span>
            <span
              className="flex h-full flex-1 items-center justify-end pr-2 font-pixel text-[10px] text-[#c0392b]"
              style={{ background: "repeating-linear-gradient(45deg, #e07a7a55 0 6px, transparent 6px 12px)" }}
            >
              full
            </span>
          </div>
          <p className="mt-1.5 text-muted">+ the conversation + whatever Windows is using → spills onto the CPU, then times out.</p>
        </div>
        <div>
          <p className="mb-1.5 font-medium">Qwen2.5 3B</p>
          <div className="flex h-7 w-full rounded-sm border border-ink/30">
            <span className="flex h-full items-center bg-[#7fd29a] px-2 text-[12px] font-semibold text-[#0f2a17]" style={{ width: "45%" }}>
              fits
            </span>
          </div>
          <p className="mt-1.5 text-muted">Room to spare, and the pipeline frees the memory before the voice model loads.</p>
        </div>
      </div>
    </figure>
  );
}

export default function KikiClassroomPage() {
  const k = kiki;
  return (
    <article className="pb-10">
      {/* hero */}
      <header className={`${wrap} pt-10 md:pt-16`}>
        <Link href="/work" className="text-[15px] text-muted underline-offset-4 hover:text-ink hover:underline">
          ← All work
        </Link>
        <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-9">
            <Eyebrow className="enter">{k.eyebrow}</Eyebrow>
            <h1 className="enter mt-4 font-serif text-[clamp(3.4rem,10vw,8rem)] leading-[0.9] tracking-[-0.035em]" style={{ "--i": 1 }}>
              {k.title}
            </h1>
            <p className="enter mt-6 max-w-[46ch] font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] italic leading-snug text-muted" style={{ "--i": 2 }}>
              {k.subtitle}
            </p>
            <div className="enter mt-8 flex flex-wrap gap-3" style={{ "--i": 3 }}>
              <Button href={k.demo} primary>
                <span aria-hidden="true">▶</span> Watch the demo
              </Button>
              <Button href={k.github}>View the code on GitHub ↗</Button>
            </div>
          </div>
          <Figure
            pose="present"
            res={96}
            greeting="My biggest one yet!"
            caption="William presenting Kiki Classroom."
            className="enter hidden w-44 justify-self-end md:col-span-3 md:block"
          />
        </div>
      </header>

      {/* screenshot in a dashboard-style frame */}
      <figure className={`${wrap} enter mt-12`} style={{ "--i": 4 }}>
        <div className="overflow-hidden rounded-xl border border-[#2b2f38] bg-[#1d2027] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-[#2b2f38] px-4 py-2.5">
            <span className="font-pixel text-[11px] tracking-[0.2em] text-[#e9e6dc]">KIKI CLASSROOM</span>
            <span className="flex items-center gap-1.5 rounded-sm bg-[#2b3a2f] px-2 py-0.5 font-pixel text-[10px] tracking-widest text-[#7fd29a]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7fd29a]" /> LIVE
            </span>
          </div>
          <Image src={k.image} alt="The Kiki Classroom dashboard: a pixel-art office with six AI agents at their desks." width={1425} height={867} className="w-full" priority />
        </div>
        <figcaption className="mt-3 text-[14px] text-muted">The dashboard. Click a room to see its agent at work; the cat is clickable too.</figcaption>
      </figure>

      {/* opening + at a glance */}
      <section className={`${wrap} mt-20 grid gap-10 md:grid-cols-12`}>
        <div className="md:col-span-7">
          {k.opening.map((p) => (
            <p key={p.slice(0, 20)} className="font-serif text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.45]">
              {p}
            </p>
          ))}
        </div>
        <aside className="md:col-span-5">
          <Glance items={k.glance} />
        </aside>
      </section>

      <Section id="office" eyebrow="How it works" title="The office">
        <p className="max-w-[62ch] text-[17px] leading-relaxed">{k.office.intro}</p>
        <div className="my-8 rounded-lg bg-slate-soft p-5 md:p-6">
          <Pipeline steps={k.office.steps} />
        </div>
        <p className="max-w-[62ch] text-[17px] leading-relaxed">{k.office.outro}</p>
      </Section>

      <Section id="story" eyebrow="How it started" title="Three versions">
        <ol className="relative border-l-2 border-dashed border-rule pl-7">
          {k.versions.map((v) => (
            <li key={v.tag} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[37px] top-1 h-4 w-4 border-2 border-paper bg-ink" aria-hidden="true" />
              <Eyebrow>{v.tag}</Eyebrow>
              <h3 className="mt-2 font-serif text-[1.9rem] leading-tight tracking-[-0.02em]">{v.when}</h3>
              {v.stat && (
                <p className="mt-4 inline-flex items-baseline gap-3 rounded-lg border border-rule px-4 py-2">
                  <span className="font-pixel text-[28px]">{v.stat}</span>
                  <span className="text-[14px] text-muted">{v.statLabel}</span>
                </p>
              )}
              {v.text.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 max-w-[62ch] text-[17px] leading-relaxed">
                  {p}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="rules" eyebrow={k.rulesIntro} title="Four rules the office follows">
        <div className="grid gap-5">
          {k.rules.map((r, i) => (
            <div key={r.title} className="rounded-lg border border-rule p-6 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-pixel text-[28px] leading-none text-slate">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-[1.7rem] leading-tight tracking-[-0.02em]">{r.title}</h3>
              </div>
              {r.text.map((p, j) => (
                <div key={p.slice(0, 24)}>
                  <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed">{p}</p>
                  {r.memory && j === 1 && <MemoryBar />}
                </div>
              ))}
              {r.list && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {r.list.map((item, j) => (
                    <li key={item} className="rounded-full border border-rule px-3 py-1 text-[14px]">
                      <span className="mr-1.5 font-pixel text-[10px] text-muted">{j + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="limits" eyebrow="Honest about it" title="What it can't do (yet)">
        <Limits items={k.limits} />

        <h3 className="mt-14 font-serif text-[1.9rem] tracking-[-0.02em]">If I had a budget</h3>
        <p className="mt-2 text-muted">{k.budgetIntro}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {k.budget.map(([head, text]) => (
            <div key={head} className="rounded-lg bg-slate-soft p-6">
              <h4 className="font-semibold">{head}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-serif text-[1.4rem] italic">{k.budgetOutro}</p>
      </Section>

      <Section id="credits" eyebrow="Credits" title={`Thanks, ${k.credit.name}`}>
        <div className="rounded-lg border border-rule p-6 md:p-8">
          <p className="max-w-[60ch] text-[17px] leading-relaxed">{k.credit.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={k.credit.url} primary>
              Meet {k.credit.name} ↗
            </Button>
          </div>
          <p className="mt-3 text-[14px] text-muted">jomontolalu.com</p>
        </div>
      </Section>

      <div className={`${wrap} mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8`}>
        <Link href="/work" className="text-muted underline-offset-4 hover:text-ink hover:underline">
          ← Back to all work
        </Link>
        <div className="flex flex-wrap gap-3">
          <Button href={k.demo} primary>
            <span aria-hidden="true">▶</span> Watch the demo
          </Button>
          <Button href={k.github}>GitHub ↗</Button>
        </div>
      </div>
    </article>
  );
}
