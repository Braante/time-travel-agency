import Button from "./Button.jsx"

const links = [
  { href: "#destinations", label: "Destinations" },
  { href: "#experience", label: "Expérience" },
  { href: "#booking", label: "Réserver" },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-300 text-slate-950 shadow-glow">
            ⏳
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">TimeTravel Agency</div>
            <div className="text-xs text-slate-300/80">Voyage temporel • luxe</div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-200/90 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-amber-200 transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button as="a" href="#booking" variant="ghost" className="hidden sm:inline-flex">
            Devis rapide
          </Button>
          <Button as="a" href="#destinations">
            Explorer
          </Button>
        </div>
      </div>
    </header>
  )
}
