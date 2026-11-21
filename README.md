# Gurubalan V — Personal Portfolio

React + Vite portfolio with responsive navigation and reduced-motion-aware animations.

## Run locally

Use Node.js 22.12+ (Node 24 is supported).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Update content

- `src/data/portfolio.js`: personal details, projects, skills, internship, education, certifications, and achievements.
- Add full URLs to `github`, `linkedin`, and `hackerrank` to display social links. Add each project's `url` to display its project link.
- `src/components/ResumeSections.jsx`: profile and resume sections.
- `src/components/Navbar.jsx`: responsive navigation.
- `src/App.jsx`: page structure and contact section.
- `src/styles.css`: colors, typography, animations, and responsive layouts.
- `index.html`: page title and search description.

Email and phone use mailto and tel links. No backend service is required. Fonts load from Google Fonts with local fallbacks.

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` folder to a static host.

## Theme and motion

Edit the color tokens in src/theme.css to customize the obsidian, charcoal, and jade palette. The same file controls hero, card, and button effects. src/hooks/useReveal.js handles staggered scroll entrances; src/hooks/usePortfolioMotion.js handles reading progress and desktop pointer highlights. Motion respects the operating system reduced-motion preference, and hero animations finish automatically.


