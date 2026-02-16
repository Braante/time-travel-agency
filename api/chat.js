/**
 * Vercel Serverless Function — /api/chat
 *
 * Env vars (Vercel > Settings > Environment Variables):
 * - MISTRAL_API_KEY (required)
 * - MISTRAL_MODEL (optional) default: mistral-small-latest
 *
 * Docs: https://docs.mistral.ai/api/endpoint/chat
 */
module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.statusCode = 405
      return res.end(JSON.stringify({ error: "Method Not Allowed" }))
    }

    const apiKey = process.env.MISTRAL_API_KEY
    if (!apiKey) {
      res.statusCode = 501
      return res.end(JSON.stringify({ error: "MISTRAL_API_KEY manquant côté serveur (Vercel env vars)." }))
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {})
    const userMessages = Array.isArray(body.messages) ? body.messages : []
    const destinations = Array.isArray(body.destinations) ? body.destinations : []

    const model = process.env.MISTRAL_MODEL || "mistral-small-latest"

    // System prompt (personnalité + infos de référence)
    const system = `
Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe (fictive).
Ton rôle : conseiller les visiteurs sur les meilleures destinations temporelles et répondre à une FAQ agence.
Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Enthousiaste sans être trop familier
- Crédible (tout en restant une fiction)

Règles :
- N'invente pas de faits historiques trop précis si tu n'es pas sûr ; reste général et cohérent.
- Tu peux proposer des PRIX FICTIFS mais cohérents (ordre de grandeur) et préciser que c'est une estimation.
- Mentionne les règles de sécurité et de non-interférence quand pertinent.
- Si la question est hors-sujet, recentre vers les destinations et services.

Destinations disponibles (contexte fiable) :
${destinations.map((d) => `- ${d.title}: ${d.subtitle}. Highlights: ${(d.highlights||[]).join("; ")}. Sécurité: ${(d.safety||[]).join("; ")}`).join("\n")}
`.trim()

    // Normaliser les messages (role/content)
    const msgs = [
      { role: "system", content: system },
      ...userMessages
        .filter((m) => m && typeof m.content === "string")
        .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: String(m.content).slice(0, 4000) })),
    ].slice(-20)

    const r = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: msgs,
        temperature: 0.7,
        max_tokens: 420,
      }),
    })

    const data = await r.json()
    if (!r.ok) {
      res.statusCode = 500
      return res.end(JSON.stringify({ error: data?.message || data?.error || "Erreur Mistral API", raw: data }))
    }

    const reply = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.delta?.content || ""
    res.setHeader("Content-Type", "application/json; charset=utf-8")
    res.statusCode = 200
    return res.end(JSON.stringify({ reply }))
  } catch (e) {
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json; charset=utf-8")
    return res.end(JSON.stringify({ error: e?.message || "Server error" }))
  }
}
