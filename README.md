# Next.js + tRPC + Prisma + Supabase = Profit!

This is a project template that sets you up with all of the basics required to build an interesting full stack app. It combines these frameworks into a setup that should empower you to build with sensible defaults.

It is based on the [T3 Stack](https://create.t3.gg/), bootstrapped with `create-t3-app`, and then hand-tuned by [Bob Ambrose](https://github.com/bambrose24).

Things that this template comes with

- Next.js App Router
- Postgres database
- Auth (via Supabase)
- Type-safe API
- UI library in ShadCN/UI

This is everything you need to start building an advanced app.

## Quick Start

If you're familiar with these systems, here's your guide to getting going. The short of it is that you need an account with Supabase, and the rest will take care of itself. See `.env.example` to know what to add; you'll add this to your `.env` file. See the [Supabase Docs](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) for what specifically to do

Once you do this, you can start the development server with `npm run dev` and visit `localhost:3000` to get started.

## Overview

I can't possibly explain the systems better than they explain themselves, but if you're new to any of this tech, I'll do my best to explain the overall picture. But first, some links to each of the projects involved here.

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com/docs)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io) with [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com) with [ShadCN UI](https://ui.shadcn.com/)

Generally speaking, here's how things click together:

- Next.js at its core. This is the web server framework that will return a React app.
- tRPC as the server API. It provides type safety end-to-end at its core. We use this as the main way to talk to the database to make sure we get authorized queries.
  - Note: this template does not take full advantage of Supabase's RLS (row-level security) as an auth strategy. It instead creates
- Supabase as the auth, database, and storage provider. Supabase auth was implemented via their most recent guide with Next.js [here](https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app).

This template doesn't enforce an opinion on data fetching strategies, but you do have basically two options

- Use the TanStack query hooks from the `trpc` component to fetch data in the React Lifecycle. This is the pre- React Server Components way to fetch data.
- Use the `trpc` client to fetch data in React Server Components. You can take full advantage of Suspense and have the first response from the server return interesting HTML.

There is lengthy debate on what the right approach will be for each use case. I encourage you to think critically about what one is best for you. If you're not sure, try starting with the TanStack query option and try pre-fetching queries in the server component for the page.

You can see examples in `prefetch/page.tsx`, `server-only-fetch/page.tsx`, and `client-only-fetch/page.tsx`. It's also worth noting that you can pre-fetch data in the initial SSR render of client components too, but I digress.
