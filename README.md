# Nation-Sound-Front

## Présentation

Application web Next.js pour la gestion d’un site événementiel, basée sur l’architecture MVC, avec intégration API backend et gestion dynamique des contenus.

---

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Structure du Projet](#structure-du-projet)
- [Architecture MVC](#architecture-mvc)
- [Explication du Code](#explication-du-code)
- [CORS et Sécurité (Backend)](#cors-et-sécurité-backend)
- [HTTPS et Mixed Content](#https-et-mixed-content)
- [Déploiement](#déploiement)
- [Ressources](#ressources)

---

## Prérequis

- **Node.js** : version >= 18.0.0 <= 20.x.x
- **npm** : version >= 6.0.0

---

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/GabsBaquie/Nation-Sound-Front next-app
   cd next-app
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement dans `.env.local` :
   ```env
   API_URL=https://nation-sounds.fr/api
   NEXT_PUBLIC_ASSETS_URL=https://nation-sounds.fr
   ```
   ⚠️ **En production, l'API doit être accessible en HTTPS pour éviter les erreurs Mixed Content.**

---

## Démarrage

Pour lancer l’application en développement :

```bash
npm run dev
```

Accédez à [http://localhost:3000](http://localhost:3000)

---

## Structure du Projet

```
Nation-Sound-Front/
├── .env.local
├── app/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── animation/
│   ├── blocks/
│   │   ├── data/
│   │   ├── Map/
│   │   ├── FAQ.tsx
│   │   ├── Programmation.tsx
│   │   └── ...
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
├── controllers/
│   ├── apiConfig.ts
│   └── ...
├── lib/
│   ├── DataError.ts
│   ├── formatTime.ts
│   └── utils.ts
├── models/
│   ├── blocks.ts
│   ├── LandingPageModel.ts
│   ├── programmationModel/
│   ├── ... (autres modèles)
├── pages/
│   ├── index.tsx
│   ├── 404.tsx
│   ├── About.tsx
│   ├── _app.tsx
│   └── ...
├── public/
│   └── ...
├── tailwind.config.js
├── next.config.mjs
├── package.json
└── README.md
```

### Explication des principaux dossiers

- **app/** : Fichiers globaux (CSS, layout)
- **components/** : Composants réutilisables, organisés par fonctionnalité
  - **blocks/** : Blocs principaux de la page (FAQ, HeroBlock, Map, etc.)
  - **ProgramationPage/** : Sous-composants pour la programmation (carte concert, filtre, etc.)
  - **ui/** : Composants UI génériques (button, card, select...)
  - **NavBar/** : Barre de navigation
- **controllers/** : Logique métier, accès API, configuration
- **lib/** : Fonctions utilitaires et helpers
- **models/** : Modèles de données (un dossier par type de modèle)
- **pages/** : Pages Next.js (accueil, about, programmation, etc.)
- **public/** : Assets statiques (images, polices, favicon, diagrammes)

---

## Architecture MVC

- **Modèles (models/)** : Gestion des données et logique métier
- **Vues (components/)** : Affichage des données (UI)
- **Contrôleurs (controller/)** : Interaction entre modèles et vues, accès API

---

## Explication du Code

1. **Entrée utilisateur** : Navigation, clics, formulaires
2. **Composants Vue** : Affichage dynamique via les modèles
3. **Pages** : Utilisent les composants pour chaque section
4. **Contrôleurs** : Récupèrent les données, orchestrent l’affichage
5. **Modèles** : Définissent la structure des données
6. **API backend** : Source des données (REST)

---

## CORS et Sécurité (Backend)

Configurer CORS côté backend pour autoriser le domaine front (Vercel) :

**Express** :

```js
import cors from "cors";
const allowedOrigins = ["https://nation-sound-front.vercel.app"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
```

**NestJS** :

```ts
app.enableCors({
  origin: ["https://nation-sound-front.vercel.app"],
  credentials: true,
});
```

Vérifiez la réponse OPTIONS :

- `Access-Control-Allow-Origin: https://nation-sound-front.vercel.app`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS, ...`
- `Access-Control-Allow-Headers: Content-Type, Authorization, ...`

Redémarrez le backend après modification.

---

## HTTPS et Mixed Content

- **L’API doit être accessible en HTTPS** si le front est servi en HTTPS (Vercel, etc.)
- Sinon, configurez un proxy HTTPS ou utilisez un tunnel (ex: ngrok) pour le développement
- Les navigateurs bloquent les requêtes HTTP depuis une page HTTPS

---

## Déploiement

1. Créez un projet sur [Vercel](https://vercel.com/new)
2. Connectez votre dépôt GitHub
3. Vercel déploie automatiquement à chaque push

---

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Tutoriel interactif Next.js](https://nextjs.org/learn)
- [Dépôt GitHub Next.js](https://github.com/vercel/next.js)
- [Dépôt GitHub Nation-Sound-Front](https://github.com/GabsBaquie/Nation-Sound-Front)
