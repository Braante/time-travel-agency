import { motion, AnimatePresence } from "framer-motion"
import Button from "./Button.jsx"

export default function DestinationModal({ destination, open, onClose, onBook }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-glow"
          >
            <div className="relative">
              <img src={destination.image} alt="" className="h-52 w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <div className="text-xs font-semibold text-amber-200">{destination.yearLabel}</div>
                <div className="text-2xl font-semibold">{destination.title}</div>
                <div className="text-sm text-slate-200/80">{destination.subtitle}</div>
              </div>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-slate-950/70 text-slate-50 hover:bg-white/10"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <div>
                <div className="text-sm font-semibold">Points forts</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-200/85">
                  {destination.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-1 text-amber-200">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 text-sm font-semibold">Sécurité & règles</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-200/85">
                  {destination.safety.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="mt-1 text-amber-200">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm font-semibold">Itinéraire suggéré</div>
                <div className="mt-2 space-y-3">
                  {destination.itinerary.map((it) => (
                    <div key={it.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-200/70">
                        {it.t}
                      </div>
                      <div className="mt-1 text-sm text-slate-50">{it.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button variant="ghost" onClick={onClose}>Retour</Button>
                  <Button onClick={() => onBook(destination)}>Réserver cette époque</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
