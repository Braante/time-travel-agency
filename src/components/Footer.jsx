export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 text-sm text-slate-300/80 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} TimeTravel Agency — projet pédagogique.</div>
          <div className="flex gap-4">
            <a className="hover:text-amber-200" href="#destinations">Destinations</a>
            <a className="hover:text-amber-200" href="#booking">Réserver</a>
            <a className="hover:text-amber-200" href="#top">Haut</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
