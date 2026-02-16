import { motion } from "framer-motion"
import Button from "./Button.jsx"
import Badge from "./Badge.jsx"

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(700px_circle_at_60%_20%,black,transparent)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Video optionnel: placez /public/hero.mp4 */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-15"
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => {
          // Si la vidéo n'existe pas, on la masque pour garder un hero clean.
          e.currentTarget.style.display = "none"
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge>Expéditions chrono-sécurisées</Badge>
            <Badge>3 époques • 1 agence</Badge>
            <Badge>IA concierge</Badge>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Voyage temporel,{" "}
            <span className="text-amber-200">version luxe</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 text-base leading-relaxed text-slate-200/85 sm:text-lg"
          >
            Explorez des époques iconiques avec une interface immersive,
            une galerie de destinations et un agent conversationnel
            qui personnalise votre itinéraire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button as="a" href="#destinations">Découvrir les destinations</Button>
            <Button as="a" href="#experience" variant="ghost">Comment ça marche</Button>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { k: "Confidentialité", v: "Protocoles & couverture" },
              { k: "Sécurité", v: "Zones protégées & guides" },
              { k: "Personnalisation", v: "Itinéraires sur-mesure" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-200/70">{s.k}</div>
                <div className="mt-1 text-sm text-slate-50">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
