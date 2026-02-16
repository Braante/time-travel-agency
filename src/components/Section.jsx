export default function Section({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-7">
        {eyebrow ? (
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
            {eyebrow}
          </div>
        ) : null}
        {title ? (
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            {title}
          </h2>
        ) : null}
      </div>
      {children}
    </section>
  )
}
