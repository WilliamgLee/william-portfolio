// Building blocks shared by the project story pages (/work/kiki-classroom,
// /work/loop-quest), so both read as one series.

export const wrap = "mx-auto max-w-6xl px-5 sm:px-8";

// Small pixel-font label used above sections ("01 · AI pipeline", "Rule 2"...)
export function Eyebrow({ children, className = "" }) {
  return <p className={`font-pixel text-[11px] uppercase tracking-[0.18em] text-slate ${className}`}>{children}</p>;
}

export function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className={`${wrap} mt-24 md:mt-32`}>
      <div className="grid gap-6 border-t border-rule pt-10 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1] tracking-[-0.025em]">{title}</h2>
        </div>
        <div className="min-w-0 md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

// Pill button. Links to other sites (and to game files like /projects/x.html)
// open in a new tab.
export function Button({ href, children, primary }) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition";
  const style = primary ? "bg-ink text-paper hover:opacity-85" : "border border-ink/25 hover:border-ink";
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${base} ${style}`}>
      {children}
    </a>
  );
}

// A chain of steps with arrows between them (sideways on desktop, downwards on phones).
// kind: "topic" = dark start chip, "me" = dashed "I approve" step, otherwise a box
// with an optional colour square.
export function Pipeline({ steps }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-y-3">
      {steps.map((s, i) => (
        <li key={s.label} className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          {s.kind === "me" ? (
            <span className="inline-flex items-center gap-2 rounded-sm border-2 border-dashed border-[#d9a400] bg-[#ffd75e]/25 px-3 py-1.5 text-[14px] font-semibold">
              <span aria-hidden="true">✋</span> {s.label}
            </span>
          ) : s.kind === "topic" ? (
            <span className="rounded-sm bg-ink px-3 py-1.5 font-pixel text-[12px] uppercase tracking-wider text-paper">{s.label}</span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-sm border border-rule bg-paper px-3 py-1.5 text-[14px] font-medium shadow-[2px_2px_0_var(--rule)]">
              {s.color && <span className="h-2.5 w-2.5 shrink-0" style={{ background: s.color }} aria-hidden="true" />}
              {s.label}
            </span>
          )}
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="pl-4 font-pixel text-[12px] text-muted md:pl-0">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

// "At a glance" list of [label, value] pairs.
export function Glance({ items }) {
  return (
    <>
      <Eyebrow>At a glance</Eyebrow>
      <dl className="mt-4 divide-y divide-rule border-y border-rule">
        {items.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3 text-[14px]">
            <dt className="font-semibold">{label}</dt>
            <dd className="text-muted">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

// "What it can't do (yet)" list of [bold start, rest of sentence] pairs.
export function Limits({ items }) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {items.map(([head, rest]) => (
        <li key={head} className="flex gap-4 py-4 text-[17px]">
          <span className="font-pixel text-[13px] leading-7 text-[#c0392b]" aria-hidden="true">✕</span>
          <span>
            <strong className="font-semibold">{head}</strong> <span className="text-muted">{rest}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
