import CopyEmail from "@/components/CopyEmail";
import EmailLink from "@/components/EmailLink";
import SocialLinks from "@/components/SocialLinks";
import { ContactAvatar, JakartaClock } from "@/components/JakartaTime";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Contact",
  description: `How to reach ${site.name}: email, GitHub, LinkedIn and Instagram.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 sm:px-8 md:grid-cols-12 md:items-end md:pt-20">
      <div className="md:col-span-8">
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
          <SocialLinks />
        </ul>
        <JakartaClock className="enter mt-10" style={{ "--i": 4 }} />
      </div>
      <ContactAvatar className="enter w-40 md:col-span-3 md:col-start-10 md:w-full md:max-w-[220px]" />
    </section>
  );
}
