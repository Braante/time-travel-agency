import { motion } from "framer-motion"
import Button from "./Button.jsx"

export default function DestinationCard({ destination, onOpen }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glow"
    >
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.title}
          className="h-44 w-full object-cover opacity-95 transition duration-300 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 backdrop-blur">
          <div className="text-xs font-semibold text-amber-200">{destination.yearLabel}</div>
          <div className="text-sm font-semibold">{destination.title}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="text-sm font-semibold">{destination.subtitle}</div>
        <p className="mt-2 text-sm leading-relaxed text-slate-200/80">{destination.vibe}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {destination.highlights.slice(0, 2).map((h) => (
            <span key={h} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100/90">
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-slate-300/70">
            Concierge IA • Brief sécurité
          </div>
          <Button onClick={() => onOpen(destination)} variant="ghost">
            Détails →
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
