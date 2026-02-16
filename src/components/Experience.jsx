import Section from "./Section.jsx"

const steps = [
  {
    title: "1) Choisissez une époque",
    desc: "Sélectionnez une destination (ou demandez conseil au concierge IA).",
  },
  {
    title: "2) Brief & couverture",
    desc: "Nous préparons votre identité d’époque et les règles de non-interférence.",
  },
  {
    title: "3) Voyage chrono-sécurisé",
    desc: "Transfert, immersion encadrée, puis retour avec débrief timeline.",
  },
]

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Méthode" title="Une expérience premium, sans paradoxes (en théorie).">
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
            <div className="text-sm font-semibold">{s.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-200/80">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-amber-200/15 bg-amber-200/10 p-6">
        <div className="text-sm font-semibold text-amber-100">Transparence IA</div>
        <p className="mt-2 text-sm text-amber-100/85">
          Le chatbot est un agent conversationnel qui propose des conseils et des prix <strong>fictifs</strong>
          mais cohérents, en s’appuyant sur les informations des destinations affichées.
        </p>
      </div>
    </Section>
  )
}
