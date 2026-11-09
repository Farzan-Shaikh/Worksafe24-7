# WorkSafe 24/7 Website

Marketing website for WorkSafe 24/7, an employee safety platform.

## Project structure

```
worksafe4567/
├── frontend/          React + TypeScript + Vite app
│   ├── public/        Static assets (images, video, robots.txt, sitemap.xml)
│   ├── src/
│   │   ├── components/   Shared UI (Header, Footer, cards, etc.)
│   │   ├── pages/        Route-level pages
│   │   └── store/        Redux Toolkit store and RTK Query API (blog posts)
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── vercel.json    SPA rewrite for Vercel
├── .gitignore
└── README.md
```

There is no backend in this repository. External services used by the frontend:

- Blog content: WordPress REST API (`zimaxxtech.com/wp-app/wp-json/wp/v2`)
- Contact form emails: EmailJS
- Chat: WhatsApp click-to-chat links

## Tech stack

React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion,
Redux Toolkit (RTK Query), Lucide React, React Helmet Async, React Hot Toast.

## Getting started

Requires Node.js 18 or newer.

```bash
cd frontend
npm install
npm run dev       # start the dev server
npm run build     # production build into frontend/dist
npm run preview   # preview the production build
npm run lint      # run ESLint
```

## Deployment

The app is a single-page application. `frontend/vercel.json` rewrites all
routes to `/`, so any static host needs the same fallback rule.
