import { useMemo, useState } from "react"
import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import Section from "./components/Section.jsx"
import DestinationCard from "./components/DestinationCard.jsx"
import DestinationModal from "./components/DestinationModal.jsx"
import BookingForm from "./components/BookingForm.jsx"
import Footer from "./components/Footer.jsx"
import Experience from "./components/Experience.jsx"
import ChatWidget from "./components/ChatWidget.jsx"
import { DESTINATIONS } from "./data/destinations.js"

export default function App() {
  const destinations = useMemo(() => DESTINATIONS, [])
  const [modalOpen, setModalOpen] = useState(false)
  const [active, setActive] = useState(destinations[0])
  const [preselectedId, setPreselectedId] = useState(destinations[0]?.id)

  function openDestination(d) {
    setActive(d)
    setModalOpen(true)
  }

  function onBook(d) {
    setPreselectedId(d.id)
    setModalOpen(false)
    // scroll doux vers le formulaire
    requestAnimationFrame(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <Section id="destinations" eyebrow="Catalogue" title="Trois époques. Trois styles. Une seule timeline.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} onOpen={openDestination} />
          ))}
        </div>

        <DestinationModal
          destination={active}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onBook={onBook}
        />
      </Section>

      <Experience />

      <Section id="booking" eyebrow="Réservation" title="Pré-réservation (démo)">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <BookingForm destinations={destinations} preselectedId={preselectedId} />

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Ce qui est inclus</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-200/80">
                {[
                  "Brief sécurité & non-interférence",
                  "Couverture & tenue d’époque (selon formule)",
                  "Guides et zones chrono-sécurisées",
                  "Concierge IA pour personnalisation",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 text-amber-200">•</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Astuce</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-200/80">
                Utilisez le chat (bouton 💬) pour demander :
                <br />• un itinéraire personnalisé
                <br />• une FAQ “agence”
                <br />• une estimation de budget
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
      <ChatWidget />
    </div>
  )
}
