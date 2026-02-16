import { useEffect, useMemo, useRef, useState } from "react"
import Button from "./Button.jsx"
import { DESTINATIONS } from "../data/destinations.js"

const DEFAULT_SUGGESTIONS = [
  "Quelle époque me conseilles-tu si j’aime l’art ?",
  "Quels sont les risques au Crétacé ?",
  "Donne-moi un itinéraire 1 jour à Paris 1889.",
  "Quel budget prévoir (ordre de grandeur) ?",
]

function useEnvFlag(name) {
  return String(import.meta.env[name] ?? "").toLowerCase() === "true"
}

function mockAnswer(userText) {
  const t = userText.toLowerCase()
  if (t.includes("art") || t.includes("renaissance")) {
    return "Je te recommande Florence 1504 : ateliers, mécénat, architecture. Dis-moi ton niveau d’immersion (soft / total) et je te propose un itinéraire."
  }
  if (t.includes("cret") || t.includes("dino") || t.includes("risque")) {
    return "Le Crétacé est notre destination la plus intense : observation sous dôme, interdiction de contact, protocole d’alerte. Je peux te détailler l’équipement et les règles."
  }
  if (t.includes("paris") || t.includes("1889")) {
    return "Paris 1889 : Tour Eiffel, Exposition Universelle, soirées Belle Époque. Tu veux une formule journée, week-end, ou immersion complète ?"
  }
  if (t.includes("budget") || t.includes("prix")) {
    return "Ordre de grandeur (fictif) : Paris 1889 ~ 4–8k€/pers, Florence 1504 ~ 5–10k€/pers, Crétacé ~ 7–15k€/pers selon durée et options."
  }
  return "Je peux t’aider à choisir une époque, construire un itinéraire et préparer ton brief de couverture. Dis-moi : histoire, art, aventure, ou détente ?"
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bienvenue chez TimeTravel Agency. Je suis votre concierge IA. Dites-moi ce que vous aimez (art, aventure, histoire…) et je vous propose une époque.",
    },
  ])

  const listRef = useRef(null)
  const chatEndpoint = import.meta.env.VITE_CHAT_ENDPOINT || "/api/chat"
  const mockMode = useEnvFlag("VITE_MOCK_CHAT")

  const suggestions = useMemo(() => DEFAULT_SUGGESTIONS, [])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    }, 80)
    return () => clearTimeout(t)
  }, [open, messages])

  async function send(text) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const next = [...messages, { role: "user", content: trimmed }]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      if (mockMode) {
        const reply = mockAnswer(trimmed)
        setMessages([...next, { role: "assistant", content: reply }])
        return
      }

      const res = await fetch(chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-12), // limiter l'historique
          destinations: DESTINATIONS.map((d) => ({
            id: d.id,
            title: d.title,
            subtitle: d.subtitle,
            highlights: d.highlights,
            safety: d.safety,
          })),
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg =
          data?.error ||
          "Erreur côté IA. Vérifiez la config (MISTRAL_API_KEY) ou activez VITE_MOCK_CHAT=true."
        setMessages([...next, { role: "assistant", content: msg }])
        return
      }

      setMessages([...next, { role: "assistant", content: data?.reply || "Je n’ai pas de réponse pour le moment." }])
    } catch (e) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "Je n’arrive pas à joindre le service IA. Astuce: activez VITE_MOCK_CHAT=true pour une démo sans backend.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[92vw] max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-glow">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
            <div>
              <div className="text-sm font-semibold">Concierge IA</div>
              <div className="text-xs text-slate-300/75">
                {mockMode ? "Mode démo (sans API)" : "Réponses IA (Mistral)"}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-slate-950/60 hover:bg-white/10"
              aria-label="Fermer le chat"
            >
              ✕
            </button>
          </div>

          <div ref={listRef} className="max-h-[55vh] overflow-y-auto px-4 py-4">
            <div className="space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-amber-300 text-slate-950"
                      : "mr-auto border border-white/10 bg-white/5 text-slate-50"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading ? (
                <div className="mr-auto max-w-[85%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200/80">
                  Je réfléchis…
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100/90 hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/5 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez-moi vos questions sur les voyages temporels…"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300/40"
              />
              <Button type="submit" className="px-3">
                ➤
              </Button>
            </form>
          </div>
        </div>
      ) : null}

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-300 text-slate-950 shadow-glow hover:bg-amber-200"
          aria-label="Ouvrir le chat"
        >
          💬
        </button>
      ) : null}
    </div>
  )
}
