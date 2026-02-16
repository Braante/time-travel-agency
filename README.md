# TimeTravel Agency — Webapp Interactive

Webapp (landing page + galerie de destinations + chatbot IA + réservation) pour une agence fictive de voyage temporel de luxe.

TimeTravel Agency est une webapp interactive (React/Vite) simulant une agence fictive de voyage temporel de luxe. Elle propose une landing page immersive, une galerie de destinations avec fiches détaillées, un widget de chat type concierge (mode démo ou IA) et un formulaire de pré-réservation.

Voici l'url pour accéder à la Webapp : **https://time-travel-agency-rosy.vercel.app/**
Lien vers le Github : **https://github.com/Braante/time-travel-agency/**

## 👥 Groupe
- Julien MATTEODO
- Thomas EVEILLARD
- Brandon PORTE

## ✨ Stack
- React + Vite
- Tailwind CSS
- Framer Motion (animations)
- API chat : Mistral (via fonction serverless Vercel `/api/chat`)

## ✅ Features
- Landing page immersive (hero + CTA)
- Galerie interactive de 3 destinations (Paris 1889, Crétacé -65M, Florence 1504)
- Modale “détails” par destination (itinéraire, conseils, précautions)
- Widget de chat (bouton flottant, fenêtre de conversation)
- Formulaire de réservation (validation côté client)

## 🚀 Démarrer en local
### 1) Installer
```bash
npm install
npm run dev
```

Par défaut, le chat appelle `/api/chat` (fonction Vercel).  
En local, vous avez 2 options :

### Option A — Mode démo (sans API)
Créez un fichier `.env` et activez :
```bash
VITE_MOCK_CHAT=true
```
Le chatbot répond avec une logique de démonstration.

### Option B — Utiliser l’API Mistral via Vercel (recommandé)
1. Déployez sur Vercel (voir ci-dessous) et testez directement la prod  
OU  
2. Utilisez `vercel dev` (si vous connaissez Vercel CLI) et ajoutez votre clé :

Dans Vercel (Dashboard) → Project → Settings → Environment Variables :
- `MISTRAL_API_KEY` : votre clé
- `MISTRAL_MODEL` (optionnel) : `mistral-small-latest`

## 🤖 Chat IA (Mistral)
La fonction serverless est dans `api/chat.js`.  
Elle appelle le endpoint **Chat Completions** de Mistral et injecte un *system prompt* pour jouer l’assistant “TimeTravel Agency”.

## 🌍 Déploiement (Vercel)
1. Pushez le repo sur GitHub
2. Importez le projet dans Vercel
3. Ajoutez les variables d’environnement :
   - `MISTRAL_API_KEY`
   - `MISTRAL_MODEL` (optionnel)
4. Déployez → récupérez l’URL publique

## 🖼️ Assets
Placez vos images dans `public/assets/` en gardant les mêmes noms (ou modifiez `src/data/destinations.js`) :
- `public/assets/paris-1889.svg`
- `public/assets/cretaceous.svg`
- `public/assets/florence-1504.svg`

Optionnel : ajoutez une vidéo hero `public/hero.mp4`.

## 🧾 Crédits
- Modèles IA : Mistral API (chat)
- Animations : Framer Motion
- UI : Tailwind CSS
- ChatGPT : la réflexion sur l'architecture du projet
- Claude : pour la construction du code
