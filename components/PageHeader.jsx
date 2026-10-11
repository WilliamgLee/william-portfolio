import Figure from "./Figure";

// Shared top of the inner pages: big title + one line, with the avatar beside it.
export default function PageHeader({ title, lead, figure }) {
  return (
    <header className="mx-auto grid max-w-6xl items-end gap-6 px-5 pt-10 sm:px-8 md:grid-cols-12 md:pt-16">
      <div className="md:col-span-8">
        <h1 className="enter font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.03em]">{title}</h1>
        {lead && (
          <p className="enter mt-6 max-w-[40ch] text-lg text-muted" style={{ "--i": 1 }}>
            {lead}
          </p>
        )}
      </div>
      {figure && (
        <Figure
          {...figure}
          res={96}
          className="enter w-40 justify-self-start md:col-span-4 md:w-52 md:justify-self-end"
        />
      )}
    </header>
  );
}
