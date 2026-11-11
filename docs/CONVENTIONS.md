# Conventions

Rules for naming, typing, component structure, styling, data access and forms. When existing code disagrees with this document, follow this document for new code — see [Known inconsistencies](#known-inconsistencies).

---

## Naming

### Files and folders

| What | Convention | Example |
|---|---|---|
| Component folder | `PascalCase`, named after the component | `components/ui/PageHeader/` |
| Component file | always `index.tsx` inside its folder | `PageHeader/index.tsx` |
| Props / local types | `ComponentName.d.ts` next to `index.tsx` | `PageHeader/PageHeader.d.ts` |
| Component styles | `styles.module.scss` | `PageHeader/styles.module.scss` |
| Page styles | `page.module.scss` or `styles.module.scss` in the route folder | `app/dashboard/roles/page.module.scss` |
| Feature area folder | `kebab-case`, domain name | `components/twitch-apps/` |
| Child components | `ParentName/components/ChildName/` | `RoadmapSection/components/RoadmapRelease/` |
| Service | `<resource>.service.ts` (kebab-case) | `twitch-subscription.service.ts` |
| Model | `models/<area>/<entity>.model.ts` + `index.ts` barrel | `models/auth/session.model.ts` |
| Constants | `constants/<area>.ts` | `constants/notifications.ts` |
| Query hook | `hooks/queries/<area>/use<Thing>Query.ts` | `useStreamerDetailQuery.ts` |
| Mutation hook | `hooks/mutations/<area>/use<Verb><Thing>Mutation.ts` | `useUpdateStreamerMutation.ts` |
| Shared hook | `hooks/shared/use<Thing>.ts` | `useInView.ts` |
| zod schema file | `<feature>.scheme.ts` next to the form | `create-twitch-app.scheme.ts` |
| Motion variants | `<feature>.motion.ts` next to the component/page | `auth.motion.ts` |
| Non-component config | `<name>.config.ts` inside the component folder | `FlowDiagram/flow.config.ts` |
| Route-private client body | `_content.tsx` | `app/auth/(guarded)/_content.tsx` |

### Identifiers

| What | Convention | Example |
|---|---|---|
| Components | `PascalCase` | `RoadmapRelease` |
| Hooks | `camelCase` starting with `use` | `useHasPermission` |
| Props interface | `I` + `ComponentName` + `Props` | `IPageHeaderProps` |
| Other interfaces (models, params, payloads) | `I` + `PascalCase` | `IStreamerItem`, `IStreamersListParams`, `IUpdateStreamerPayload` |
| Type aliases | `T` + `PascalCase` | `TSignInForm`, `TServiceNode`, `TGuildDashboardTab` |
| Plain unions used as variant names | `PascalCase` without prefix | `ButtonVariant`, `ButtonSize`, `FlowDirection` |
| Enums | `PascalCase`, members `PascalCase` (or `UPPER_SNAKE` for wire values that mirror the backend) | `RoadmapStatus.InProgress`, `Permission.MANAGE_APPS` |
| Constants | `UPPER_SNAKE_CASE` | `WELCOME_STEPS`, `USERS_DEFAULT_PAGE_SIZE` |
| Label maps | `<THING>_LABELS: Record<Enum, string>` | `TWITCH_EVENT_LABELS`, `ROADMAP_STATUS_LABELS` |
| Query keys | `<Area>QueryKey` with `List` / `Detail` / … members | `StreamersQueryKey.Detail` |
| zod schema | `camelCase` + `Schema`; its inferred type `T…Form` | `signInSchema` → `TSignInForm` |
| Services | `PascalCase` + `Service`, default export | `StreamersService` |
| Event handlers | `handle<Event>` inside components, `on<Event>` for props | `handleConfirmDelete`, `onConfirm` |
| CSS module classes | `camelCase` (`styles.panelBody`); kebab-case only for modifiers that mirror data values (`styles['in-progress']`) | |

### Copy

User-facing text is **English**. Section eyebrows read as breadcrumbs: `"Admin · Users"`, `"Integration · Twitch · App"`.

---

## Typing

TypeScript runs in `strict` mode; `npm run build` fails on type errors.

### Where types live

| Kind | Location |
|---|---|
| Backend request/response shapes | `lib/models/<area>/<entity>.model.ts` |
| Component props and component-local types | `ComponentName.d.ts` next to the component |
| Enums, label maps, static typed data | `lib/constants/<area>.ts` (or `lib/models` when the enum is part of the model, e.g. `RoadmapStatus`) |
| Form types | inferred from zod: `type TForm = z.infer<typeof schema>` in `*.scheme.ts` |
| Redux state | `lib/models/auth/auth.model.ts` (`IAuthStoreState`); `RootState` / `AppDispatch` from `store/index.ts` |

> **`.d.ts` files are declaration-only.** They may contain `interface` / `type` / imports of types, but **never runtime values** (no `enum`, no `const`). Put enums in a `.ts` file and import them.

### Props files

```ts
// RoadmapRelease/RoadmapRelease.d.ts
import { IRoadmapRelease } from '@/lib/models/welcome';

export interface IRoadmapReleaseProps extends Omit<IRoadmapRelease, 'id'> {};
```

```tsx
// RoadmapRelease/index.tsx
import { IRoadmapReleaseProps } from './RoadmapRelease';   // no extension

const RoadmapRelease = ({ version, title, status, features }: IRoadmapReleaseProps) => { … };
export default RoadmapRelease;
```

Guidelines:
- Derive props from models (`Omit`, `Pick`, `extends`) instead of duplicating fields.
- Extend native attributes for wrappers around HTML elements: `extends ButtonHTMLAttributes<HTMLButtonElement>`.
- Use `PropsWithChildren` instead of declaring `children` by hand.
- Generic components keep their generic: `Table<T>`, `FormInput<TForm extends FieldValues>`, `Select<O extends ISelectOption>`. Call sites pass it explicitly: `<FormInput<TSignInForm> … />`.
- Form field names are `Path<TForm>`, so typos fail at compile time.
- Use string-literal unions or enums for variants and states — never free `string`.
- Use `Record<Enum, T>` for lookup maps so adding an enum member forces a label.
- For libraries that need data objects (`@xyflow/react` node data), use a `type` alias, not an `interface` (it must be assignable to `Record<string, unknown>`).
- Icons are typed as `IconType` from `react-icons` when passed as data.
- Hooks pass generics to TanStack Query: `useQuery<IStreamersListResponse>(…)`, `useMutation<TResult, Error, TVars>(…)`.
- `as const` for literal config objects (query-key objects, easing tuples).

### Generic API types — `lib/models/generic-response.model.ts`

`IGenericResponseModel<T>` (backend envelope), `IGenericList<T>` (`{ items, meta: { count } }`), `IGenericPagination` (`page`, `pageSize`), `IGenericTwitchPagination` (`cursor`). Reuse them for new list endpoints.

---

## Component anatomy

```
ComponentName/
├── index.tsx                # the component, default export
├── ComponentName.d.ts       # props (omit if the component has no props)
├── styles.module.scss       # styles (omit if none)
├── <name>.config.ts         # optional: static config for this component
├── context.ts               # optional: React context for compound components
└── components/              # optional: private child components (same anatomy)
```

`index.tsx` import order: React / external libraries → `@/` imports (ui, hooks, lib) → relative imports (`./components`, `./Name`) → a blank line → `import styles from './styles.module.scss';`.

```tsx
'use client';                                   // only when needed

import { useState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import Button from '@/components/ui/buttons/Button';
import { cn } from '@/lib/utils';
import { IExampleProps } from './Example';

import styles from './styles.module.scss';

const Example = ({ title, className }: IExampleProps) => {
  return <div className={cn(styles.root, className)}>{title}</div>;
}

export default Example;
```

Rules:
- **Default export** for components, hooks and services.
- Arrow-function components (`const Name = (…) => {…}`); route files use `export default function NamePage()`.
- **Compound components** attach parts as static properties: `Modal.ModalHeader`, `Table.Body`, `Select.Option`, `AuthWrapper.Content`. Shared state goes through `context.ts`.
- Accept `className` on reusable components and merge with `cn()`.
- **Server by default.** Add `'use client'` only where hooks, state, effects, browser APIs or event handlers are needed. Keep the client part as small as possible (e.g. `WelcomeCtaLink` is the only client piece of the welcome header).
- **Decompose continuously:** when a component grows a distinct block (a card, a list item, a toolbar), move it to `components/<Child>/`. Data-holding "View" components (`UsersTable`, `GuildDashboardView`) compose presentational children.
- Static content (copy, lists, labels) lives in `lib/constants`, not inline in JSX.
- Accessibility: semantic elements (`section`, `nav`, `ol`/`ul`, `article`), `aria-labelledby` pointing at a heading `id`, `aria-hidden` on decorative elements, `role="tab"` / `aria-selected` for tab switches.

### Lazy loading

- Heavy client-only libraries (React Flow, charts) → `next/dynamic` with `ssr: false` **inside a client component**, plus a `loading` placeholder of the same size.
- Defer mounting until visible with `useInView` when the component is below the fold (`LazyFlowDiagram`).
- Below-the-fold server sections may be `next/dynamic` imports; they stay server-rendered.

---

## Styling

- **SCSS Modules** for every component and page. Tailwind classes are not used outside `components/shadcn`.
- **Use tokens, not literals:** colours `var(--accent)`, `var(--ink-1)`, `var(--line)`, `var(--card)`…; radii `var(--radius-lg)`; fonts `var(--font-display | --font-body | --font-mono)`. A raw `rgba()` is acceptable only for a translucent variant of an existing token colour (e.g. glow of `--status-ok`).
- Typography roles: headings `--font-display` (700, negative letter-spacing), body `--font-body`, eyebrows/labels/badges `--font-mono` uppercase with wide letter-spacing (0.14–0.18em).
- Status colours: `--status-ok` (done/success), `--status-warn`, `--status-error`; accent for "active / in progress".
- Neon (`--neon`, `--neon-soft`, `--neon-glow`, `--neon-gradient` — a brighter lilac from the accent's violet family, never pink; other alphas via `color-mix(in srgb, var(--neon) N%, transparent)`) marks live / active Discord surfaces and a page's primary call to action (`Button variant="neon"`). Use it sparingly — one neon CTA per view.
- Neon cyan (`--neon-cyan`, `--neon-cyan-ink`, `--neon-cyan-soft`, `--neon-cyan-glow`) is the cool counterpart: actions that lead out of the app (`Button variant="neon-external"` / `ExternalButton`). It is outlined, so it sits next to a lilac CTA without competing with it. List / page action buttons (Add …, Invite …, Load) always use one of the two neon variants, never `primary` / `secondary`.
- Glass surfaces over imagery: dark tint (≈50%) + `backdrop-filter: blur(16–20px) saturate(160%+)` + a 1px inner top highlight. The tint is what keeps text readable; don't drop it below ~45%.
- Discord images: build URLs with `getGuildIconUrl` / `getGuildBannerUrl`. Entities without a banner get `getSeedGradient(id)` via `HeroBanner` (stable per id — snowflake or UUID — analogous hues, never dark).
- State via `data-*` attributes or modifier classes: `&[data-active='true']`, `styles[variant]`, `styles[status]`.
- Breakpoints: 576 / 768 / 992 / 1200 px. Mobile side padding 16–20px; no horizontal page scroll.
- **Mobile (≤576px) is vertical-first:** grids collapse to one column, headers stack. A text button or tab group that is the only action in its row (a sub-tab switch, a single "Block user" button) stretches to the full width so it doesn't look off-centre. Icon-only buttons keep their size.
- **Detail pages** (a server, a user, a streamer) follow one layout — the whole page is one `--panel` surface with `--radius-panel` corners (subtle, 8px), the hero banner fades into it (`HeroBanner fadeInto="var(--panel)"`), and the route renders a skeleton of the same footprint while loading: a full-width hero (`HeroBanner` + neon-ringed avatar overlapping its bottom edge + an `ActionsMenu` for secondary/destructive actions) → details as grouped label/value grids (no box per field; a group is a mono-dot title + thin top rule) → `SectionTabs` for the data sections, each tab in its own `AsyncBoundary`; a secondary switch inside a tab uses segmented `Tabs`.
- Destructive or rare actions (block, delete…) live in `ActionsMenu`, not as standalone buttons; disruptive ones confirm with `ConfirmModal`.
- `Panel` (solid `--card`, `--radius-md`) is for classic list/admin sections without a hero. Never leave a section transparent.
- Dates in tables and detail views: `formatDateTime` from `lib/utils.ts`; where only the day matters (e.g. "Last sent") `formatDate` (`dd.mm.yyyy`) with the full time in `title`.
- Waiting states: `Loading` with the matching `type` (`block` for a page/section, `inline` in a cell, `card` for full-screen flows) — never a bare "Loading…" string. Tables use their skeleton rows.
- Global styles (`.react-flow …`) from inside a module: `:global(.class)` nested under a local class.
- Respect `prefers-reduced-motion` for looping animations; wrap framer-motion trees in `MotionConfig reducedMotion="user"` where appropriate.

---

## Data fetching

- Components never import `apiClient`. Flow: **service → hook → component** (see [STRUCTURE.md](./STRUCTURE.md#data-layer)).
- One hook per query / mutation, default export, in `hooks/queries/<area>` or `hooks/mutations/<area>`.
- Query keys come from a `<Area>QueryKey` constant: `[StreamersQueryKey.Detail, id]`. Include params in the key.
- Mutations: success toast + `invalidateQueries` for every affected key in `onSuccess`. **No `onError` toast** — `MutationCache` does it; pass `meta: { errorMessage: 'Failed to …' }` for a specific fallback, or `meta: { errorMode: 'silent' }` when the component shows the error inline.
- Query errors are handled globally (see [STRUCTURE.md → Error handling](./STRUCTURE.md#error-handling)) — don't toast them in components. Auxiliary queries (modals, cells, shell widgets) set `meta: { errorMode: 'toast' }`.
- Error type is always `ApiError` (registered as TanStack's `defaultError`). Show `error.message` or `getErrorMessage(error, fallback)`; never print raw backend text.
- Every service GET ends with `.then(expectList | expectArray | expectObject<TResponse>(endpoint))`.
- A page's main entity uses `useSuspenseQuery` and is rendered inside `AsyncBoundary` (in the route page); independent sections get their own `AsyncBoundary compact`. Never branch on `isLoading` / `!data` for suspense queries.
- Don't show an empty state when a request failed: let the error reach a boundary (default) or render `ErrorFallback`.
- Boundaries go around the smallest part that can fail on its own. A decorative or statistical sub-block (e.g. `GuildHeroStats`) gets its own boundary with a tiny inline fallback; a page's main block falls back in its own shape (`GuildHeroFallback` keeps the generated banner) rather than a generic error replacing everything.
- Optional numbers from the API are `number | null` in models and rendered as "—" when null; never call `.toLocaleString()` / `.toFixed()` on a value the schema doesn't guarantee.
- Queries that require auth set `enabled: status === 'authenticated'` (see `useMeQuery`).
- Search: list endpoints accept `?search=` (backend `SearchPaginationDto` + `applySearch`, case-insensitive substring). In the view use `useListSearch(() => setPage(1))` + `SearchInput`; pass `search` into the query params and the query key, keep `placeholderData`, and show "Nothing matches …" instead of the default empty text while searching.
- Pagination: `page` state in the view, page size from a `<AREA>_DEFAULT_PAGE_SIZE` constant, `TablePagination` with `meta.count`. Add `placeholderData: (prev) => prev` so the table keeps rows while the next page loads, and step back a page when the current one becomes empty after a delete.

## Forms

- react-hook-form + zod resolver; schema and inferred type in `<feature>.scheme.ts`.
- `useForm<TForm>({ resolver: zodResolver(schema), mode: 'onTouched', reValidateMode: 'onChange' })`, wrapped in `<FormProvider>`.
- Fields: `FormInput`, `FormSelect`, `FormTextarea` with the form type as generic.
- Submit button: `disabled={!formState.isValid}`, `isLoading={mutation.isPending}`, `onClick={handleSubmit(data => mutation.mutate(data))}`.
- Show `mutation.error.message` for server errors.

## SEO (public pages)

- Public pages are server components that export `metadata` (title, description, canonical, Open Graph, Twitter).
- Site-wide values live in `lib/constants/site.ts` (`SITE_NAME`, `SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_KEYWORDS`).
- Structured data: a server component rendering `<script type="application/ld+json">` with `<` escaped (see `WelcomeJsonLd`).
- Add new public routes to `app/sitemap.ts`; keep private areas disallowed in `app/robots.ts`.

---

## Known inconsistencies

Older code does not always follow the rules above. Don't copy these patterns into new code; fix them opportunistically when touching the file.

| Pattern in existing code | Preferred |
|---|---|
| Named exports for some components (`export function UsersTable`, `RolesTable`, `StreamerDetailView`, `AuthWrapper`) | Default export |
| Props types without `I` prefix (`TabsProps`, `TabItem`, `StatCardProps`, `TableActionCellProps`, `NavItem`, `BadgeProps`) | `I…Props` |
| Props declared inline in `index.tsx` (`PortalDropdown`, page `IProps`) | `ComponentName.d.ts` |
| Query keys as `enum` inside service files (`AuthQueryKey`, `DiscordQueryKey`, `TwitchAppsQueryKey`, …) vs `as const` objects in `lib/constants` (`StreamersQueryKey`, `UsersQueryKey`, …) | `as const` object in `lib/constants/<area>.ts` |
| Child components nested directly in the parent folder (`AddNotificationModal/ChannelSearchField/`) or as loose files (`GuildManagementView/GuildLogsSection.tsx`) | `Parent/components/Child/` |
| Small helper components defined inside a view file (e.g. inline helpers in `StreamerDetailView`; `UserStatusBadge` is the extracted example) | Own folder under `components/` once reused or non-trivial |
| Some modules use non-existent `--surface-1` (renders transparent) | Tokens from `_colors.scss` (`--surface`, `--surface-2`, `--card`) |
| `Button` `size` prop has no matching styles (`sm` / `md` / `lg` look the same) | Size via `className` until sizes are implemented |
| Local `formatDate` helpers (`StreamerDetailView`, `ProfileModal` tabs) | `formatDateTime` / `formatDate` from `lib/utils.ts` |
| Hard-coded colours in some modules (`#2633c0` in `Button`) | Tokens |
| `getInitials` duplicated in `lib/utils.ts` and `components/dashboard/nav-data.ts` | `lib/utils.ts` |
| Both `next.config.ts` and `next.config.js` exist | One config file |
| `components/shadcn/*` built with Tailwind classes | `ui/` + SCSS Modules |
