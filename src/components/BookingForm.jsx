import { useMemo, useState } from "react"
import Button from "./Button.jsx"

function formatDate(d) {
  if (!d) return ""
  const dt = new Date(d)
  return dt.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "2-digit" })
}

export default function BookingForm({ destinations, preselectedId }) {
  const [destinationId, setDestinationId] = useState(preselectedId || destinations[0]?.id)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [travelers, setTravelers] = useState(2)
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState(null)

  const selected = useMemo(
    () => destinations.find((d) => d.id === destinationId),
    [destinations, destinationId]
  )

  function validate() {
    if (!destinationId) return "Choisissez une destination."
    if (!startDate || !endDate) return "Renseignez des dates."
    const s = new Date(startDate)
    const e = new Date(endDate)
    if (Number.isNaN(+s) || Number.isNaN(+e)) return "Dates invalides."
    if (e < s) return "La date de retour doit être après la date de départ."
    if (travelers < 1 || travelers > 6) return "Nombre de voyageurs (1 à 6)."
    return null
  }

  function estimatePrice() {
    // Prix fictifs (cohérents) — l’IA peut aussi “inventer des prix cohérents”.
    const base = selected?.id === "cretaceous" ? 6800 : selected?.id === "paris-1889" ? 4200 : 5100
    const days = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1)
    const perDay = selected?.id === "cretaceous" ? 1200 : 850
    const total = (base + days * perDay) * travelers
    return { base, days, perDay, total }
  }

  function onSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) {
      setStatus({ type: "error", msg: err })
      return
    }
    const pricing = estimatePrice()
    setStatus({
      type: "ok",
      msg:
        `Pré-réservation enregistrée (démo). ` +
        `Destination: ${selected.title}. ` +
        `Dates: ${formatDate(startDate)} → ${formatDate(endDate)}. ` +
        `Voyageurs: ${travelers}. ` +
        `Estimation: ~${Math.round(pricing.total).toLocaleString("fr-FR")} €.`,
    })
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">Destination</label>
          <select
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300/40"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} — {d.subtitle}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-slate-300/75">
            Brief & couverture inclus • Annulation chrono-gratuite sous 24h (fictif).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold">Départ</label>
            <input
              type="date"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300/40"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Retour</label>
            <input
              type="date"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300/40"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Voyageurs</label>
          <input
            type="number"
            min={1}
            max={6}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300/40"
            value={travelers}
            onChange={(e) => setTravelers(parseInt(e.target.value || "1", 10))}
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Préférences (optionnel)</label>
          <input
            type="text"
            placeholder="Ex: art, gastronomie, sensations fortes, famille…"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300/40"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-slate-300/75">
          Prix estimé (fictif) calculé à la validation.
        </div>
        <Button type="submit">Valider la pré-réservation</Button>
      </div>

      {status ? (
        <div
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
            status.type === "ok"
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/20 bg-rose-400/10 text-rose-100"
          }`}
        >
          {status.msg}
        </div>
      ) : null}
    </form>
  )
}
