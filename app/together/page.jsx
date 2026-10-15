import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProjectList from "@/components/ProjectList";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Built with friends",
  description: `Projects ${site.name} made with friends, and where to find their work.`,
  path: "/together",
});

export default function TogetherPage() {
  const { projects, friends } = site.together;
  return (
    <>
      <PageHeader
        title="With friends"
        lead="Things my friends and I made, plus where to find more of their work."
        figure={{ number: 5, pose: "wave", caption: "Waving at the crew.", greeting: "We made these!" }}
      />

      <ProjectList projects={projects} />

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-t border-rule pt-10">
          <h2 className="text-[15px] font-bold">Friends on the web</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {friends.map((f) => (
              <li key={f.url}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-lg border border-rule p-6 transition-colors hover:border-slate"
                >
                  <span>
                    <span className="block font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-tight tracking-[-0.02em]">{f.name}</span>
                    {f.line && <span className="mt-1 block text-muted">{f.line}</span>}
                  </span>
                  <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10">
          <Link href="/work" className="text-muted underline-offset-4 hover:underline">
            ← Back to my work
          </Link>
        </p>
      </section>
    </>
  );
}
