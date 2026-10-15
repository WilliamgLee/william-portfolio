import Image from "next/image";
import HoverLook from "@/components/HoverLook";
import SmartLink from "@/components/SmartLink";
import TechTags from "@/components/TechTags";

// Alternating project rows (image + text). Used on Work and on the friends page.
export default function ProjectList({ projects }) {
  return (
    <ol className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
      {projects.map((project, i) => {
        const flip = i % 2 === 1;
        return (
          <HoverLook
            key={project.title}
            className="enter grid items-center gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-10 md:py-14"
            style={{ "--i": i + 2 }}
          >
            <SmartLink
              href={project.url}
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
            </SmartLink>
            <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
              <h2 className="text-[15px] font-bold">
                {project.title}
                {project.badge && (
                  <span className="ml-2 rounded-sm bg-ink px-1.5 py-0.5 align-middle font-pixel text-[10px] font-normal tracking-wider text-paper">
                    {project.badge}
                  </span>
                )}
              </h2>
              <p className="mt-3 font-serif text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em]">
                {project.hook}
              </p>
              <p className="mt-4 max-w-[44ch] text-muted">{project.description}</p>
              <TechTags tags={project.tags} />
              <div className="mt-6 flex flex-wrap gap-3">
                <SmartLink
                  href={project.url}
                  className="inline-block rounded-full border border-ink/25 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-ink"
                >
                  {project.cta || `Visit ${project.title}`}
                </SmartLink>
                {(project.links || []).map((l) => (
                  <SmartLink
                    key={l.url}
                    href={l.url}
                    className="inline-block rounded-full px-3 py-2.5 text-[15px] font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {l.label} ↗
                  </SmartLink>
                ))}
              </div>
            </div>
          </HoverLook>
        );
      })}
    </ol>
  );
}
