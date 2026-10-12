import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import HoverLook from "@/components/HoverLook";
import { site } from "@/data/site";

export const metadata = {
  title: "Work",
  description: `Selected projects by ${site.name}.`,
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work"
        lead="Things I’ve built, each with a link so you can try it yourself."
        figure={{ number: 4, pose: "pointDown", caption: "This way to the projects.", greeting: "Check this out!" }}
      />

      <ol className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
        {site.projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <HoverLook
              key={project.title}
              className="enter grid items-center gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-10 md:py-14"
              style={{ "--i": i + 2 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className={`group block overflow-hidden rounded-lg bg-slate-soft md:col-span-7 ${flip ? "md:order-2" : ""}`}
              >
                <Image
                  src={project.image}
                  alt={`Preview of ${project.title}`}
                  width={1600}
                  height={1000}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </a>
              <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                <h2 className="text-[15px] font-bold">{project.title}</h2>
                <p className="mt-3 font-serif text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em]">
                  {project.hook}
                </p>
                <p className="mt-4 max-w-[44ch] text-muted">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-full border border-ink/25 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-ink"
                >
                  {project.cta || `Visit ${project.title}`}
                </a>
              </div>
            </HoverLook>
          );
        })}
      </ol>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="border-t border-rule pt-8 text-muted">More projects on the way.</p>
      </div>
    </>
  );
}
