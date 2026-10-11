import CopyEmail from "@/components/CopyEmail";
import EmailLink from "@/components/EmailLink";
import StatusBadge from "@/components/StatusBadge";
import { ContactAvatar, JakartaClock } from "@/components/JakartaTime";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: `How to reach ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 sm:px-8 md:grid-cols-12 md:items-end md:pt-20">
      <div className="md:col-span-8">
        <StatusBadge className="enter mb-6" />
        <h1 className="enter font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
          {site.contact.heading}
        </h1>
        <p className="enter mt-6 max-w-[40ch] text-lg text-muted" style={{ "--i": 1 }}>
          {site.contact.line}
        </p>
        <p className="enter mt-10" style={{ "--i": 2 }}>
          <EmailLink className="inline-block break-all font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] text-slate underline decoration-1 underline-offset-[6px] transition-colors hover:text-ink" />
        </p>
        <ul className="enter mt-8 flex flex-wrap gap-3" style={{ "--i": 3 }}>
          <li>
            <CopyEmail />
          </li>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full border border-ink/25 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-ink"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <JakartaClock className="enter mt-10" style={{ "--i": 4 }} />
      </div>
      <ContactAvatar className="enter w-40 md:col-span-3 md:col-start-10 md:w-full md:max-w-[220px]" />
    </section>
  );
}
