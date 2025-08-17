This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Signal Watcher

Micro-producto para vigilancia de señales con Next.js, Prisma, Redis y IA (Gemini/mock).

## Setup Local
1. npm i
2. Copia .env.example a .env.local y configura vars (DATABASE_URL, REDIS_URL, GEMINI_API_KEY opcional para IA real).
3. npx prisma migrate dev
4. npm run dev (accede a http://localhost:3000/watchlists)

## Despliegue
- Vercel: Configura env vars y conecta repo GitHub para auto-deploy.

## Flujo Principal
- Crea watchlists.
- Simula eventos (procesados con IA o mock).
- Busca señales.

## Tecnologías
- Next.js (App Router, Server Actions).
- Prisma + Postgres (Neon).
- Redis (Upstash).
- IA: Google Gemini (free tier) con fallback mock.