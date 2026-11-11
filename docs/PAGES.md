# Pages

All routes live in `src/app`. Access legend:

- **Public** — anyone.
- **Guest only** — wrapped in `<AuthGuard guestOnly>`; signed-in users are redirected to `/dashboard`.
- **Signed in** — wrapped in `<AuthGuard>` (from `dashboard/layout.tsx`); guests are redirected to `/auth`.
- **Permission: X** — additionally wrapped in `<PermissionGuard requiredPermissions={[…]}>`; the user needs **any** of the listed permissions (`ADMIN` always passes). Otherwise redirected to `/dashboard`.

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Welcome page |
| `/auth` | Guest only | Sign in / sign up |
| `/auth/discord` | Guest only | Discord-only sign-in screen |
| `/auth/discord/callback` | Public | Discord OAuth return (sign-in or account linking) |
| `/auth/twitch/callback` | Public | Twitch OAuth return (account linking) |
| `/dashboard` | Signed in | Overview statistics |
| `/dashboard/discord` | Signed in | Discord servers the user manages |
| `/dashboard/discord/[guildId]` | Signed in | One server: info, settings, notifications, logs |
| `/dashboard/notifications` | Signed in | My notifications (created by the current user) across servers |
| `/dashboard/twitch-apps` | Permission: `READ_APPS`, `MANAGE_APPS` | Twitch developer apps |
| `/dashboard/twitch-subscriptions` | Permission: `READ_APPS`, `MANAGE_APPS` | Local + raw EventSub subscriptions |
| `/dashboard/users` | Permission: `ADMIN` | Users list |
| `/dashboard/users/[userId]` | Permission: `ADMIN` | User detail |
| `/dashboard/streamers` | Permission: `ADMIN` | Streamers list |
| `/dashboard/streamers/[streamerId]` | Permission: `ADMIN` | Streamer detail |
| `/dashboard/roles` | Permission: `READ_ROLES`, `MANAGE_ROLES` | Roles and permissions |

Metadata routes: `/robots.txt` (`app/robots.ts` — disallows `/dashboard` and the OAuth callbacks), `/sitemap.xml` (`app/sitemap.ts`), icons (`icon.svg`, `favicon.ico`, `apple-icon.png`).

---

## Root layout and providers

`app/layout.tsx` (server component)
- Registers the five font variables from `src/fonts` on `<html>`, imports `styles/global.scss`.
- Base `metadata`: `metadataBase` from `NEXT_PUBLIC_URL`, title template `"%s · Xelar"`, default description.
- Renders `<Providers>` and a dark `sonner` `<Toaster>` (bottom-right).

`app/providers.tsx` (client): `StoreProvider` → `QueryClientProvider` → `AuthProvider`.

Error and 404 routes (see [STRUCTURE.md → Error handling](./STRUCTURE.md#error-handling)):
| File | Catches |
|---|---|
| `app/dashboard/error.tsx` | anything a dashboard page throws; the dashboard shell stays visible |
| `app/error.tsx` | errors on pages outside the dashboard |
| `app/global-error.tsx` | a crash in the root layout (renders its own `<html>`) |
| `app/not-found.tsx` | unknown routes and `notFound()` |

---

## `/` — Welcome page

`app/page.tsx` is a **server component**. It exports page `metadata` (absolute title, description, keywords, canonical, Open Graph, Twitter) and renders `components/welcome/WelcomeView`. Auth state does not redirect here — CTAs adapt instead.

`WelcomeView` composition (top to bottom):

| Component | Kind | Notes |
|---|---|---|
| `WelcomeJsonLd` | server | JSON-LD `@graph`: Organization, WebSite, SoftwareApplication, HowTo (built from `WELCOME_STEPS`) |
| `AuthBgEffects` | server | Reused fixed aura background |
| `WelcomeHeader` | server | Sticky header: logo, anchor nav (`WELCOME_NAV_LINKS`), `WelcomeCtaLink` |
| `HeroSection` | server | `h1`, lead text, primary CTA + "See how it works" anchor, reuses `AuthVisual` |
| `HowItWorksSection` | server, `next/dynamic` | `SectionHeading`, `LazyFlowDiagram`, `HowItWorksSteps` (ordered list — the crawlable text version of the diagram) |
| `TrustSection` | server, `next/dynamic` | Grid of `TrustCard` from `WELCOME_TRUST_POINTS` |
| `RoadmapSection` | server, `next/dynamic` | Three-column release timeline from `ROADMAP_RELEASES` (`RoadmapRelease` → `RoadmapStatusBadge`, `RoadmapFeature`). Track per release: done — solid green blending into the next release's colour (`nextStatus` → `data-next`), in progress — accent fading out, planned — dashed. A done release's card gets a light green tint |
| `JoinSection` | server, `next/dynamic` | Final CTA + "Add bot to Discord" (only if `DISCORD_BOT_INVITE_URL` is set) |
| `WelcomeFooter` | server, `next/dynamic` | Logo, anchor links, copyright |

Key details:
- **Lazy loading.** Below-the-fold sections are `next/dynamic` imports — still server-rendered (SEO keeps the text). The heavy, client-only part is the React Flow diagram: `LazyFlowDiagram` mounts `FlowDiagram` via `dynamic(..., { ssr: false })` **only when it scrolls near the viewport** (`useInView`), and switches to a vertical layout under 768px (`useMediaQuery`).
- `FlowDiagram` graph is defined in `FlowDiagram/flow.config.ts` (`buildFlowGraph(direction)`), with a custom `service` node (`components/ServiceNode`). It mirrors the real backend pipeline: Twitch EventSub → Receiver (verify, dedupe) → Message queue → Router (filter, template, log) → Xelar bot / Webhook → Discord server.
- `WelcomeCtaLink` is the only client component in the static sections: it reads auth status and links to `/auth` ("Get started") or `/dashboard` ("Open dashboard").
- Section anchors come from the `WelcomeSectionId` enum; every section is `<section id aria-labelledby>` via `WelcomeSection`.
- **All copy and data live in `lib/constants/welcome.ts`**; types in `lib/models/welcome`. Edit content there, not in components.

---

## `/auth` — Sign in / Sign up

`(guarded)/page.tsx` → `_content.tsx` (`AuthPageContent`, client).

- Layout: `AuthWrapper` (two-column grid: form panel + `AuthVisual`, aura background). `AuthWrapper.Content` takes an optional `footer`.
- A tab switch (`sign-in` / `sign-up`, default `sign-up`) controls the headline, the Discord button label and which form is shown.
- **Discord**: `<form method="post" action={NEXT_PUBLIC_API_URL + '/api/auth/discord'}>` with `DiscordButton`.
- **Email**: `SignInForm` / `SignUpForm` — react-hook-form + zod (`auth.scheme.ts`), `FormInput`, `Button`; mutations `useLoginByEmailMutation` / `useRegisterByEmailMutation`; redirect to `/dashboard` on success.
- **Animation** (`auth.motion.ts`): the active-tab pill slides via a shared `layoutId`; headline, form and footer hint swap with direction-aware `AnimatePresence` transitions; `AnimatedHeight` smooths the panel height change; `MotionConfig reducedMotion="user"` respects OS settings.

## `/auth/discord`

Server page: `AuthWrapper` + `AuthWrapper.DiscordHeadline` + a Discord-only POST form.

## `/auth/discord/callback` and `/auth/twitch/callback`

`page.tsx` wraps `_content.tsx` in `<Suspense>` (needed for `useSearchParams`). The client body reads `code` / `error` from the query string once (ref-guarded), then:
- Discord: if a link intent (`DISCORD_LINK_INTENT_KEY` in `localStorage`, set from the profile's Services tab) exists → `useLinkDiscordMutation`, otherwise sign in via `useDiscordCodeMutation`.
- Twitch: `useLinkTwitchMutation`.

Each shows loading / success / error states and redirects with a timer.

---

## Dashboard

`dashboard/layout.tsx`: `<AuthGuard>` + `DashboardShell` (`DashboardBgEffects`, `DashboardSidebar`, `DashboardTopBar`, `DashboardMobileNav`, `<main>`). Navigation is one ordered list, `NAV_LIST` in `components/dashboard/nav-data.ts`: a static section is a `NavSection` object, a dynamic one a function of `INavContext` returning a section or `null` (e.g. **Favorites** — the user's favorite servers, shown only while at least one is saved). `useNavSections` resolves the list, drops items without `requiredPermissions` and empty sections; `DashboardSidebar` and `DashboardMobileNav` render its result the same way. A nav item has either an `icon` or an `image` (`{ url, fallback }` — server logo / initials), both drawn by `NavItemIcon`. Only the most specific matching link is highlighted (`getActiveHref`). The user card (`DashboardUserCard`) opens `ProfileModal` with tabs **Profile**, **Services** (link/unlink Discord & Twitch), **Sessions**.

Every dashboard page follows the same shape:

```tsx
<PermissionGuard requiredPermissions={[…]}>   {/* only for restricted pages */}
  <PageHeader eyebrow="Area · Section" title="…" description="…" actions={…} />
  <PageContent>
    <FeatureView />                             {/* client component that owns the data */}
  </PageContent>
</PermissionGuard>
```

Pages stay thin; data fetching happens inside the feature view. Dynamic segments read params with `const { id } = use(params)` where `params: Promise<{ id: string }>`.

| Route | Feature component(s) | Data |
|---|---|---|
| `/dashboard` | `OverviewStats` (4 × `StatCard`), `WeeklyStatsChart` (recharts), `BottomStatsRow` (`NotificationSplitCard`, `TopStreamersCard`) — each in its own `AsyncBoundary compact` | `usePlatformStatsQuery`, `useDailyStatsQuery`, `useNotificationSplitQuery`, `useTopStreamersQuery` |
| `/dashboard/discord` | `Notice` "Who can add Xelar to a server" (Manage Server / owner / admin / manager permission rules) → `AsyncBoundary` (`Loading type="block"` while servers load; `renderError` → `DiscordReconnectBlocker` when Discord access must be re-granted) → `DiscordGuildGrid` (filter tabs, search; order from `compareGuildsForList`: connected → no bot & owner → no bot & admin / manager, then by name) → `DiscordGuildCard` (logo, Discord banner behind the head only if the server has one — no generated fallback, role pill, members; status strip "Xelar connected · N notifications" with a bot pip on the logo, or a dashed "Bot not added yet" card with an invite overlay on hover / focus — the overlay explains Manage Server instead when `canInviteBot` is false). Header action: "Invite Bot" | `useDiscordGuildsQuery` |
| `/dashboard/discord/[guildId]` | `GuildDashboardView` (the whole page is one `--panel` surface): `GuildHero` at its top (`GuildFavoriteToggle` — a glass bookmark box in the banner's top-left corner that saves / removes the server from favorites; `HeroBanner` with `fadeInto="var(--panel)"`: Discord banner or generated gradient fading into the panel, soft neon-ringed icon, `ActionsMenu` (copy server ID / name, open in Discord), glass stats strip: notifications bot/webhook, subscriptions, members/online, balance; `GuildHeroSkeleton` while loading; `GuildHeroFallback` — generated banner + error card — on failure; for a **favorite** server that answers 403 / 404 (`isGuildAccessError`) the whole page is replaced by `GuildUnavailable`: a neutral "can't open" message (no reason given) with **Remove from favorites** / **Keep and go back**, both returning to `/dashboard/discord`; the stats strip has its own boundary) → `SectionTabs` → tabs **Notifications** (`GuildNotificationsView`: sub-tabs **Bot messages** / **Webhooks**, each a paginated `BotNotificationsTable` / `WebhookNotificationsTable` with a **Duplicate** action, a **Last sent** column (`lastSentAt`, `dd.mm.yyyy`, "Never" if not delivered yet) and a column picker remembered per server and per table (`getGuildNotificationsColumnsKey`); neon "Add notification"; `AddNotificationModal` (also used with `template` for duplicates), `EditNotificationModal`, `ConfirmModal`), **Logs** (`GuildLogsSection`: time, streamer, event via `getTwitchEventLabel`, type, delivery status — no error column, it's a user-facing view), **Settings** (`GuildSettingsPanel` → `ManagerPermissionSelect`) | `useDiscordGuildInfoQuery`, `useGuildBotNotificationsQuery`, `useGuildWebhookNotificationsQuery`, guild channel/role queries, notification mutations |
| `/dashboard/notifications` | `MyNotificationsView`: one search (streamer / event) + bot / webhook `Tabs` with counts → paginated `BotNotificationsTable` / `WebhookNotificationsTable` with `showGuild` (Server column via `GuildCell`; edit / delete via modals) | `useMyBotNotificationsQuery`, `useMyWebhookNotificationsQuery`, delete mutations |
| `/dashboard/twitch-apps` | `TwitchAppsTable` (+ `EditTwitchAppModal`, `DeleteTwitchApp`); header: `AddTwitchApp` → `CreateTwitchAppModal`, `ExternalButton` to the Twitch dev console | `useListTwitchAppsQuery`, app mutations |
| `/dashboard/twitch-subscriptions` | `TwitchSubscriptionsView`: `TwitchSubscriptionsTable` (local records) and `RawTwitchSubscriptionsTable` (raw EventSub) | twitch subscription queries / delete mutations |
| `/dashboard/users` | `UsersTable` (search by name / email / Discord / Twitch / ID, paginated, row click → detail) | `useUsersQuery` |
| `/dashboard/users/[userId]` | `AsyncBoundary` (`UserDetailSkeleton` — same panel/banner/details/tabs footprint, so nothing jumps) → `UserDetailView` (suspense; the whole page is one `--panel` surface): `UserHero` (`HeroBanner` gradient from the user id with `fadeInto="var(--panel)"`, soft neon-ringed initials, status badge, `ActionsMenu`: copy user ID / Discord ID / Twitch login / email (only those present), block (with `ConfirmModal`) / unblock) → `UserDetails` (grouped label/value grid — Account, Wallet with `UserBalanceItem` → `EditValuesModal`, Access with inline `UserRolesItem`) → `UserActivity` (`SectionTabs`: **Notification logs** `UserLogsTable`, **Subscriptions** `UserSubscriptionsTab` → bot / webhook `UserSubscriptionsTable` (read-only, paginated, "Paid from"), **Active sessions** `UserSessionsTable` with terminate action) | `useUserDetailQuery`, `useUserNotificationLogsQuery`, `useUserBotSubscriptionsQuery`, `useUserWebhookSubscriptionsQuery`, `useUserSessionsQuery`, `useRolesQuery`, user mutations |
| `/dashboard/streamers` | `StreamersTable` | `useStreamersQuery` |
| `/dashboard/streamers/[streamerId]` | `AsyncBoundary` (`StreamerDetailSkeleton` — same panel footprint) → `StreamerDetailView` (suspense; one `--panel` surface, same layout as the user page): `StreamerHero` (`HeroBanner` gradient from the streamer id with `fadeInto="var(--panel)"`, Twitch avatar (initials fallback), Partner / Internal badges, `@login` link to Twitch, `ActionsMenu`: sync from Twitch, open on Twitch, open linked user, copy login / broadcaster ID / streamer ID) → `StreamerDetails` (`InfoItem` groups — Twitch, Flags with the “Internal streamer” `Switch`, Linked account with a link to the user) → `StreamerLogsSection` (paginated `Table`; the endpoint returns the whole list, so pages are cut client-side, `STREAMER_LOGS_PAGE_SIZE`) | `useStreamerDetailQuery` (suspense), `useStreamerNotificationLogsQuery`, sync/update mutations |
| `/dashboard/roles` | `RolesTable` (+ `CreateRoleModal` for edit); header: `AddRole` | `useRolesQuery`, role mutations |

## Adding a page — checklist

1. Create `src/app/<route>/page.tsx`. Keep it a server component unless it truly needs client hooks; put client logic in a feature view (or `_content.tsx`).
2. Dashboard page: use `PageHeader` + `PageContent`; wrap in `PermissionGuard` if restricted, and add the nav entry with the same `requiredPermissions` in `nav-data.ts`.
3. Public page: export `metadata`, add it to `app/sitemap.ts`; keep content server-rendered.
4. Put the feature UI in `src/components/<area>/<FeatureView>/`, data access in hooks/services (see [STRUCTURE.md](./STRUCTURE.md#data-layer)).
5. Errors: the page's main entity uses a suspense query inside `<AsyncBoundary loading={…}>`; give independent sections their own `<AsyncBoundary compact>`. Anything uncaught lands in `dashboard/error.tsx`.
