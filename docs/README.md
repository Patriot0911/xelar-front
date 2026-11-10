# xelar-front — Frontend documentation

`xelar-front` is the web client for **Xelar**, a platform that turns Twitch stream events into Discord notifications (bot messages or Discord webhooks). The backend lives in `../xelar-notify` (NestJS services: `api`, `webhook-receiver`, `notification-worker`, `discord-bot`). The frontend talks only to the `api` service over REST.

The app has three audiences:

| Area | Routes | Who uses it |
|---|---|---|
| Public site | `/` | Visitors — explains the product (welcome / landing page) |
| Authentication | `/auth/*` | Guests — sign in / sign up (Discord OAuth or email), OAuth callbacks |
| Dashboard | `/dashboard/*` | Signed-in users — manage Discord servers and notifications; admins also manage Twitch apps, users, streamers and roles |

## Documents

| Document | What it covers |
|---|---|
| [STRUCTURE.md](./STRUCTURE.md) | Folder layout, where each kind of file lives, the data layer (services → hooks → components), auth flow, styling system |
| [PAGES.md](./PAGES.md) | Every route: purpose, access rules, the components it composes |
| [UI_COMPONENTS.md](./UI_COMPONENTS.md) | The shared UI kit in `src/components/ui` and shared feature components — props and usage |
| [CONVENTIONS.md](./CONVENTIONS.md) | Naming, typing, component anatomy, styling, data-fetching and form rules; known inconsistencies to avoid copying |

## Tech stack

| Concern | Tool |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript (strict) |
| Server state | TanStack Query 5 (`@tanstack/react-query`) |
| Client state | Redux Toolkit — only the auth status lives here |
| HTTP | Axios instance with auth / refresh interceptors (`src/lib/api-client.ts`) |
| Forms | react-hook-form + zod (`@hookform/resolvers`) |
| Styling | SCSS Modules + global CSS custom properties (design tokens). Tailwind v4 is installed but used only by `components/shadcn` |
| Animation | framer-motion |
| Diagrams / charts | `@xyflow/react` (React Flow) on the welcome page, `recharts` on the dashboard |
| Icons | `react-icons` — `lu` (Lucide) for UI icons, `si` (Simple Icons) for brands |
| Toasts | `sonner` |

> **Next.js version note.** This is Next.js 16 — APIs and conventions may differ from older versions. Before using a Next.js API you are unsure about, read the matching guide in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## Running

```bash
npm install
npm run start:dev   # dev server on http://localhost:4001
npm run build       # production build (also runs the TypeScript check)
npm run start       # production server on :4000
```

Environment variables (see `.env.example`):

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the `api` service (Axios `baseURL`, Discord OAuth form action) |
| `NEXT_PUBLIC_URL` | Public URL of this site — `metadataBase`, canonical URLs, sitemap, JSON-LD |
| `NEXT_PUBLIC_DISCORD_BOT_CLIENT_ID` | Builds the "invite bot" URL (`lib/constants/discord-bot-invite.ts`); invite buttons are hidden when it is empty |

## Quick rules for contributors (and AI agents)

1. **Reuse before you build.** Check `src/components/ui` (see [UI_COMPONENTS.md](./UI_COMPONENTS.md)) before creating a new primitive.
2. **One component = one folder** with `index.tsx`, `ComponentName.d.ts` (props) and `styles.module.scss`. See [CONVENTIONS.md](./CONVENTIONS.md#component-anatomy).
3. **Colors, radii and fonts come from tokens** (`var(--accent)`, `var(--radius-lg)`, `var(--font-display)`…). Never hard-code a new palette.
4. **Data goes through the layers:** `service` → `use…Query` / `use…Mutation` hook → component. Components never call `apiClient` directly.
5. **Types live next to what they describe:** API shapes in `lib/models`, props in the component's `.d.ts`, enums and static data in `lib/constants`.
6. **Decompose continuously.** When a component grows a distinct visual block, move it into `ComponentName/components/SubComponent/`.
