import Image from "next/image";
import Link from "next/link";
import Figure from "@/components/Figure";
import { Button, Eyebrow, Glance, Limits, Pipeline, Section, wrap } from "@/components/story";
import { loopQuest } from "@/data/loop-quest";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Loop Quest",
  description:
    "How Loop Quest works: a small C interpreter written in JavaScript that runs your loop one step at a time, checked against GCC.",
  path: "/work/loop-quest",
});

// Shows `text in backticks` as inline code.
function Rich({ text }) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className="rounded-sm bg-slate-soft px-1.5 py-0.5 font-mono text-[0.88em] [overflow-wrap:anywhere]">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  );
}

// The runner's explanation of one step, styled like the game's dialog box.
function StepExample({ parts }) {
  return (
    <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-sm bg-ink px-3 py-2 font-pixel text-[12px] text-paper">
      {parts.map((p, i) => (
        <span key={p} className={i === parts.length - 1 ? "text-[#9ad89c]" : ""}>
          {i > 0 && <span className="mr-2 text-muted" aria-hidden="true">→</span>}
          {p}
        </span>
      ))}
    </p>
  );
}

// What the GCC check prints when everything passes (run: node scripts/loop-quest-vs-gcc.mjs).
// The middle ten lines are folded to keep it short.
function Terminal({ first, last, folded }) {
  const pass = (c) => (
    <span key={c}>
      <span className="text-[#9ad89c]">PASS</span>  {c}
      {"\n"}
    </span>
  );
  return (
    <figure className="my-8 overflow-hidden rounded-lg border border-[#2b2f38] bg-[#1b1d20] text-[13px]">
      <figcaption className="border-b border-[#2b2f38] px-4 py-2 font-pixel text-[10px] tracking-[0.2em] text-[#9aa6b2]">
        TERMINAL
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono leading-relaxed text-[#e6e4de]">
        <span className="text-[#9aa6b2]">$ </span>node scripts/loop-quest-vs-gcc.mjs{"\n"}
        {first.map(pass)}
        <span className="text-[#9aa6b2]">      … {folded} more, all PASS{"\n"}</span>
        {last.map(pass)}
        {"\n"}16/16 programs print exactly the same as GCC.
      </pre>
    </figure>
  );
}

export default function LoopQuestPage() {
  const q = loopQuest;
  return (
    <article className="pb-10">
      {/* hero */}
      <header className={`${wrap} pt-10 md:pt-16`}>
        <Link href="/work" className="text-[15px] text-muted underline-offset-4 hover:text-ink hover:underline">
          ← All work
        </Link>
        <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-9">
            <Eyebrow className="enter">{q.eyebrow}</Eyebrow>
            <h1 className="enter mt-4 font-serif text-[clamp(3.4rem,10vw,8rem)] leading-[0.9] tracking-[-0.035em]" style={{ "--i": 1 }}>
              {q.title}
            </h1>
            <p className="enter mt-6 max-w-[46ch] font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] italic leading-snug text-muted" style={{ "--i": 2 }}>
              {q.subtitle}
            </p>
            <div className="enter mt-8 flex flex-wrap gap-3" style={{ "--i": 3 }}>
              <Button href={q.play} primary>
                <span aria-hidden="true">▶</span> Play Loop Quest
              </Button>
            </div>
          </div>
          <Figure
            pose="point"
            res={96}
            greeting="Watch the loop run!"
            caption="William pointing at Loop Quest."
            className="enter hidden w-44 justify-self-end md:col-span-3 md:block"
          />
        </div>
      </header>

      {/* screenshot */}
      <figure className={`${wrap} enter mt-12`} style={{ "--i": 4 }}>
        <div className="overflow-hidden rounded-xl border border-rule bg-slate-soft shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]">
          <Image
            src={q.image}
            alt="Loop Quest: C code on the left with the current line highlighted, and on the right a pixel hero jumping across numbered tiles."
            width={1600}
            height={1000}
            className="w-full"
            priority
          />
        </div>
        <figcaption className="mt-3 text-[14px] text-muted">Each tile is one trip through the loop; the number is the loop variable at that moment.</figcaption>
      </figure>

      {/* why + at a glance */}
      <Section id="why" eyebrow="Why I built it" title="Loops are hard to picture">
        {/* TODO (William): your own story goes in data/loop-quest.js → why */}
        {q.why.map((p) => (
          <p key={p.slice(0, 24)} className="max-w-[46ch] font-serif text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.45]">
            {p}
          </p>
        ))}
        <div className="mt-12 max-w-[640px]">
          <Glance items={q.glance.map(([label, value]) => [label, <Rich key={label} text={value} />])} />
        </div>
      </Section>

      <Section id="how" eyebrow="How it works" title="A tiny C interpreter">
        <p className="max-w-[62ch] text-[17px] leading-relaxed">{q.howIntro}</p>
        <div className="my-8 rounded-lg bg-slate-soft p-5 md:p-6">
          <Pipeline steps={q.steps} />
        </div>
        <div className="grid gap-5">
          {q.stages.map((s, i) => (
            <div key={s.title} className="rounded-lg border border-rule p-6 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-pixel text-[28px] leading-none text-slate">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-[1.7rem] leading-tight tracking-[-0.02em]">{s.title}</h3>
              </div>
              <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed">
                <Rich text={s.text} />
              </p>
              {s.example && <StepExample parts={s.example} />}
            </div>
          ))}
        </div>

        <h3 className="mt-14 font-serif text-[1.9rem] tracking-[-0.02em]">{q.faithful.title}</h3>
        <ul className="mt-4 space-y-3">
          {q.faithful.points.map((p) => (
            <li key={p.slice(0, 24)} className="flex gap-3 text-[17px] leading-relaxed">
              <span className="font-pixel text-[13px] leading-7 text-slate" aria-hidden="true">▸</span>
              <span>
                <Rich text={p} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="gcc" eyebrow="Checked, not guessed" title="Tested against GCC">
        <p className="max-w-[62ch] text-[17px] leading-relaxed">{q.gccIntro}</p>
        <ol className="mt-6 space-y-3">
          {q.gccSteps.map((s, i) => (
            <li key={s.slice(0, 24)} className="flex gap-4 text-[17px] leading-relaxed">
              <span className="font-pixel text-[13px] leading-7 text-slate">{i + 1}</span>
              <span>
                <Rich text={s} />
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[17px] leading-relaxed">{q.gccTests}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {q.gccCases.map((c) => (
            <li key={c} className="rounded-full border border-rule px-3 py-1 text-[14px]">
              {c}
            </li>
          ))}
        </ul>
        <Terminal
          first={["Count to 5", "Add 1 to 5", "Countdown (while)"]}
          folded={10}
          last={["&& short-circuit", "Nested break only exits inner loop", "while with compound ops"]}
        />
        <p className="max-w-[62ch] text-[15px] leading-relaxed text-muted">
          <Rich text={q.gccNote} />
        </p>
      </Section>

      <Section id="limits" eyebrow="Honest about it" title="What it can't do (yet)">
        <Limits items={q.limits.map(([head, rest]) => [head, <Rich key={head} text={rest} />])} />
      </Section>

      <div className={`${wrap} mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8`}>
        <Link href="/work" className="text-muted underline-offset-4 hover:text-ink hover:underline">
          ← Back to all work
        </Link>
        <Button href={q.play} primary>
          <span aria-hidden="true">▶</span> Play Loop Quest
        </Button>
      </div>
    </article>
  );
}
