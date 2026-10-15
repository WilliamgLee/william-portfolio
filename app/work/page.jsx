import PageHeader from "@/components/PageHeader";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Work",
  description: `Projects by ${site.name}: Kiki Classroom, a local AI pipeline for kids' videos; Bingolah, a classroom quiz game; and Loop Quest, a C loop visualizer.`,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work"
        lead="Things I’ve built, each with a link so you can try it yourself."
        figure={{ number: 4, pose: "pointDown", caption: "This way to the projects.", greeting: "Check this out!" }}
      />

      <ProjectList projects={site.projects} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8">
          <p className="text-muted">More projects on the way.</p>
          <Link
            href="/together"
            className="inline-block rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-paper transition-opacity hover:opacity-85"
          >
            See what my friends and I build →
          </Link>
        </div>
      </div>
    </>
  );
}
