import Link from "next/link";
import Figure from "@/components/Figure";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-10 sm:px-8 md:grid-cols-12 md:pt-16">
      <Figure
        number={404}
        pose="scratch"
        res={112}
        caption="William scratching his head, a bit lost."
        greeting="Huh? Where am I?"
        className="enter mx-auto w-full max-w-[260px] md:col-span-5 md:max-w-[360px]"
      />
      <div className="md:col-span-7 md:pl-6">
        <p className="enter font-pixel text-sm text-slate">Error 404</p>
        <h1
          className="enter mt-4 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em]"
          style={{ "--i": 1 }}
        >
          This page doesn’t exist.
        </h1>
        <p className="enter mt-6 max-w-[40ch] text-lg text-muted" style={{ "--i": 2 }}>
          The link might be broken, or the page has moved. Even the avatar got lost.
        </p>
        <div className="enter mt-9 flex flex-wrap gap-3" style={{ "--i": 3 }}>
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-opacity hover:opacity-85"
          >
            Back to home
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-ink/25 px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink"
          >
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}
