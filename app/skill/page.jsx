import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata = {
  title: "Skill",
  description: `What ${site.name} works with: Tailwind CSS, JavaScript, Claude, Gemini and Minecraft Bedrock modding.`,
};

export default function SkillPage() {
  return (
    <>
      <PageHeader
        title="What I can take on"
        lead="The tools I reach for, and what I use them for."
        figure={{ number: 3, pose: "hold", caption: "Holding up a block.", greeting: "Here's my toolkit." }}
      />

      <ul className="mx-auto mt-14 grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-2">
        {site.skills.map((skill, i) => (
          <li
            key={skill.title}
            className={`enter rounded-lg border border-rule p-6 transition-colors hover:border-slate md:p-8 ${
              skill.wide ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-8" : ""
            }`}
            style={{ "--i": i + 2 }}
          >
            <div>
              <p className="font-pixel text-[11px] text-slate">{skill.group}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.01em]">{skill.title}</h2>
            </div>
            <p className={`font-serif text-lg leading-relaxed text-muted ${skill.wide ? "mt-3 md:mt-7" : "mt-3"}`}>
              {skill.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
