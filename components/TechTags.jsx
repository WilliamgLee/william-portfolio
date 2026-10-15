// The small "built with" pills under a project's description (tags in data/site.js).
export default function TechTags({ tags, className = "mt-4" }) {
  if (!tags?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Built with">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-rule px-2.5 py-0.5 text-[13px] text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}
