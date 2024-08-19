# Mon Projet Web - Frontend

Ce projet est une application web composée d'un frontend développé avec Next.js, suivant l'architecture MVC (Model-View-Controller).

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Structure du Projet](#structure-du-projet)
- [Architecture MVC](#architecture-mvc)
- [Déploiement](#déploiement)
- [Ressources](#ressources)

## Prérequis

- Node.js (version >= 18.0.0 <= 20.x.x)
- npm (version >= 6.0.0)

## Installation

1. Clonez le dépôt du frontend :

   ```bash
   git clone <url-du-repo-frontend> next-app
   cd next-app
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement en créant un fichier `.env` et en ajoutant les valeurs nécessaires, par exemple :

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:1337
   ```

## Démarrage

Pour démarrer le frontend en mode développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Structure du Projet

```
next-app/
├── app/
├── components/
├── controller/
├── lib/
├── models/
├── pages/
├── prisma/
├── public/
├── types/
├── ui/
├── .env
├── .eslintrc.json
├── .gitignore
├── .next/
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
```

## Architecture MVC

### Modèles (Models)

Les modèles représentent les données de l'application et la logique métier. Ils sont définis dans le dossier `models`. Par exemple, le modèle [`HeroBlockModel`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgabriellebaquie%2FMSPR-nation-sound%2Fnext-app%2Fmodels%2FHeroBlockModel.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22HeroBlockModel%22%5D "/Users/gabriellebaquie/MSPR-nation-sound/next-app/models/HeroBlockModel.ts") gère les données pour le composant HeroBlock.

### Vues (Views)

Les vues sont responsables de l'affichage des données. Elles sont principalement définies dans le dossier `components`. Par exemple, le composant [`HeroBlock`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgabriellebaquie%2FMSPR-nation-sound%2Fnext-app%2Fcomponents%2FHeroBlock.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22HeroBlock%22%5D "/Users/gabriellebaquie/MSPR-nation-sound/next-app/components/HeroBlock.tsx") affiche les données du modèle HeroBlock.

### Contrôleurs (Controllers)

Les contrôleurs gèrent la logique d'application et les interactions entre les modèles et les vues. Ils sont définis dans le dossier `controller`. Par exemple, le contrôleur [`HeroBlockController`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgabriellebaquie%2FMSPR-nation-sound%2Fnext-app%2Fcontroller%2FHeroBlockController.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22HeroBlockController%22%5D "/Users/gabriellebaquie/MSPR-nation-sound/next-app/controller/HeroBlockController.ts") gère la logique pour le composant HeroBlock.

## Déploiement

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consultez la [documentation de déploiement de Next.js](https://nextjs.org/docs/deployment) pour plus de détails.

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Tutoriel interactif Next.js](https://nextjs.org/learn)
- [Dépôt GitHub Next.js](https://github.com/vercel/next.js)
