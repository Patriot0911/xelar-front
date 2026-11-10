# File structure and architecture

## Top level

```
xelar-front/
├── docs/                 # This documentation
├── public/               # Static files served as-is
├── src/
│   ├── app/              # Next.js App Router: routes, layouts, metadata files
│   ├── components/       # React components (UI kit + feature components)
│   ├── fonts/            # next/font/google definitions (one file per family)
│   ├── hooks/            # React hooks: queries, mutations, redux, shared
│   ├── lib/              # Non-React code: API client, services, models, constants, utils
│   ├── store/            # Redux Toolkit store (auth only)
│   └── styles/           # Global SCSS: tokens, mixins, reset
├── next.config.ts        # Next config (also next.config.js with `output: 'standalone'` for Docker)
├── Dockerfile            # Multi-stage build; NEXT_PUBLIC_* are passed as build args
└── tsconfig.json         # strict mode, path alias `@/*` → `src/*`
```

Always import through the alias: `import Button from '@/components/ui/buttons/Button'`. Relative imports are used only inside one component folder (`./components/...`, `../WelcomeSection`).

## `src/app` — routes

```
app/
├── layout.tsx              # Root layout: fonts, global styles, <Providers>, <Toaster>, base metadata
├── providers.tsx           # Client providers: Redux → React Query → AuthProvider
├── page.tsx                # "/" — welcome page (server component, page metadata)
├── robots.ts, sitemap.ts   # SEO metadata routes
├── icon.svg, favicon.ico, apple-icon.png   # Tab / home-screen icons (file convention)
├── auth/
│   ├── (guarded)/          # Route group wrapped in <AuthGuard guestOnly>
│   │   ├── layout.tsx
│   │   ├── page.tsx        # "/auth" → renders _content.tsx
│   │   ├── _content.tsx    # Client page body (sign-in / sign-up)
│   │   ├── auth.scheme.ts  # zod schemas + inferred form types
│   │   ├── auth.motion.ts  # framer-motion variants for the tab switch
│   │   ├── styles.module.scss
│   │   └── discord/        # "/auth/discord"
│   ├── discord/callback/   # "/auth/discord/callback" — OAuth return
│   └── twitch/callback/    # "/auth/twitch/callback"  — Twitch account linking
└── dashboard/
    ├── layout.tsx          # <AuthGuard> + <DashboardShell>
    ├── page.tsx            # Overview
    └── <section>/page.tsx  # one folder per dashboard section, [param] folders for detail pages
```

Route-folder file roles:

| File | Role |
|---|---|
| `page.tsx` | Route entry. Keep it thin: page header + one feature view. Export `metadata` here when the page needs SEO |
| `layout.tsx` | Guards and shells shared by the subtree |
| `_content.tsx` | Client-side page body when the page itself should stay a server component (the `_` prefix keeps it from being a route) |
| `*.scheme.ts` | zod schemas for forms on that page |
| `*.motion.ts` | framer-motion variants / transitions for that page |
| `page.module.scss` / `styles.module.scss` | Page-level styles |

See [PAGES.md](./PAGES.md) for every route.

## `src/components`

```
components/
├── ui/              # Generic, feature-agnostic UI kit (Button, Input, Modal, Table, …)
├── shadcn/          # A few shadcn-style primitives (Tailwind classes) — legacy, used by twitch-subscriptions
├── common/          # Cross-feature behaviour components: AuthGuard, PermissionGuard, ConfirmModal
├── providers/       # StoreProvider, AuthProvider
├── auth/            # Auth page visuals: AuthWrapper, AuthVisual, AuthBgEffects
├── dashboard/       # Dashboard chrome: DashboardShell (sidebar/topbar/mobile nav), user card, nav-data.ts
├── welcome/         # Welcome page sections
├── overview/        # Dashboard overview widgets
├── discord/         # Discord servers, guild dashboard, notification modals
├── notifications/   # All-notifications view
├── streamers/       # Admin: streamers table + detail
├── users/           # Admin: users table + detail
├── roles/           # Admin: roles table + create/edit modal
├── twitch-apps/     # Admin: Twitch apps table + modals
└── twitch-subscriptions/  # Admin: local + raw EventSub subscription tables
```

Rule of thumb: **`ui/` knows nothing about Xelar's domain**; a feature folder (`discord/`, `users/`, …) is named after the domain area or the page it serves.

Sub-components that belong to one parent live inside it:

```
components/welcome/RoadmapSection/
├── index.tsx
├── styles.module.scss
└── components/
    ├── RoadmapRelease/       { index.tsx, RoadmapRelease.d.ts, styles.module.scss }
    ├── RoadmapFeature/
    └── RoadmapStatusBadge/
```

Older feature folders sometimes nest sub-components directly (`AddNotificationModal/ChannelSearchField/`) or use `tabs/` (`ProfileModal/tabs/ProfileTab/`). Prefer the `components/` sub-folder for new code; `tabs/` is fine when the children are literally tab panels.

## `src/lib` — non-React code

```
lib/
├── api-client.ts     # Axios instance + interceptors
├── query-client.ts   # TanStack QueryClient (default staleTime 60s, retry 1, global error toast)
├── utils.ts          # cn(), getInitials(), bit-flag helpers
├── services/         # One object/class per backend resource: <resource>.service.ts
├── models/           # API request/response types: <area>/<entity>.model.ts (+ index.ts barrel)
└── constants/        # Enums, labels, query keys, page sizes, static content: <area>.ts
```

## `src/hooks`

```
hooks/
├── queries/<area>/use<Thing>Query.ts         # useQuery wrappers
├── mutations/<area>/use<Action>Mutation.ts   # useMutation wrappers (+ toasts + invalidation)
├── redux/                                    # typed useAppDispatch / useAppSelector, selectors
└── shared/                                   # generic hooks: useInView, useMediaQuery, useOnClickOutside,
                                              # useIsAuthenticated, useHasPermission, useFilteredNavSections
```

## Data layer

```
Component ──► use<Thing>Query / use<Action>Mutation ──► <Resource>Service ──► apiClient (Axios) ──► api service
                     │                                                             │
                     └── query keys from lib/constants or the service file         └── unwraps { data } and normalises errors
```

**`apiClient`** (`lib/api-client.ts`)
- Adds `Authorization: Bearer <token>` from `AuthService`.
- On `401` it refreshes the token once, queues parallel requests while refreshing, and dispatches `logout()` if the refresh fails.
- Unwraps the backend envelope `{ status, message, data }` → resolves with **`data` directly**. Service return types are therefore the payload type, not `AxiosResponse`.
- Rejects with the backend error body (`{ status: false, message }`), so `error.message` is always displayable.

**Services** (`lib/services/*.service.ts`) — thin, typed wrappers, one method per endpoint:

```ts
const StreamersService = {
  getStreamers: async (params?: IStreamersListParams): Promise<IStreamersListResponse> =>
    apiClient.get('/api/streamers', { params }),
};
export default StreamersService;
```

**Query hooks** — one hook per query, default export, typed generics, key from a constant:

```ts
const useStreamersQuery = (params?: IStreamersListParams) =>
  useQuery<IStreamersListResponse>({
    queryKey: [StreamersQueryKey.List, params],
    queryFn: () => StreamersService.getStreamers(params),
  });
```

**Mutation hooks** — own their success / error toasts and invalidate the affected query keys in `onSuccess`.

Query errors are already toasted globally by `queryClient`; do not add another toast in components for query failures.

## Auth flow

- `store/slices/authSlice.ts` holds only `status: 'init' | 'guest' | 'authenticated'`. Tokens are in `localStorage` (`access_token`, `refresh_token`) and mirrored in `AuthService`.
- `AuthProvider` dispatches `initAuth()` once on mount → status becomes `guest` or `authenticated`.
- `AuthGuard` (in route layouts) waits while status is `init`, then redirects: dashboard → `/auth` for guests; `guestOnly` (auth pages) → `/dashboard` for signed-in users.
- The current user, including `permissions`, comes from `useMeQuery()` (enabled only when authenticated).
- `PermissionGuard` / `useHasPermission` check `Permission` values; `ADMIN` passes every check. The sidebar hides items via `useFilteredNavSections` using `requiredPermissions` in `components/dashboard/nav-data.ts`.
- Discord sign-in is a plain `<form method="post">` to `${NEXT_PUBLIC_API_URL}/api/auth/discord`; Discord redirects back to `/auth/discord/callback`, which exchanges the code (or links the account if a link intent is stored in `localStorage`).

## Styling system

- `src/styles/global.scss` loads `abstracts/` (tokens, typography, radii), `base/_reset.scss` and Tailwind, and sets body background/colour/font.
- **Design tokens** are CSS custom properties on `:root`:
  - `abstracts/_colors.scss` — backgrounds `--bg-0…4`, `--panel`, `--card`, surfaces `--surface…-3`, text `--ink-0` (brightest) … `--ink-3` (dimmest), borders `--line`, `--line-strong`, accent `--accent`, `--accent-2`, `--accent-soft/-softer/-glow/-ink`, brand `--twitch`, `--discord`, `--telegram`, `--youtube`, status `--status-ok/-warn/-error`.
  - `abstracts/_typography.scss` — `--font-display` (Space Grotesk), `--font-body` (DM Sans), `--font-mono` (JetBrains Mono), text sizes, weights.
  - `abstracts/_variables.scss` — radii `--radius-sm/md/lg/xl/full`.
- The theme is **dark only**.
- Breakpoints (`abstracts/_breakpoints.scss`): `sm 576`, `md 768`, `lg 992`, `xl 1200`. A `mq($key)` mixin exists; most modules use plain `@media (max-width: …)` with the same numbers.
- Recurring visual motifs: mono uppercase "eyebrow" labels with a glowing accent dot, accent gradient `linear-gradient(135deg, var(--accent), var(--accent-2))` for highlighted text and primary actions, blurred aura backgrounds (`AuthBgEffects`, `DashboardBgEffects`).
