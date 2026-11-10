# UI components

Shared building blocks. **Check this list before creating a new component.** Each component's props are declared in its `ComponentName.d.ts` — that file is the source of truth; this document summarises them.

- `src/components/ui/` — the generic UI kit (no domain knowledge).
- `src/components/common/` — cross-feature behaviour (guards, confirm dialog).
- `src/components/auth/` — visuals shared by auth pages and reused on the welcome page.
- `src/components/shadcn/` — legacy Tailwind primitives; do not extend, prefer `ui/`.

Import paths follow the folder: `import Button from '@/components/ui/buttons/Button'`.

---

## Buttons — `ui/buttons/`

Shared types: `ui/buttons/buttons.d.ts` (`IButtonProps`, `IBaseButtonProps`, `ILinkButtonProps`, `IExternalButtonProps`, `ButtonVariant`, `ButtonSize`, `LinkButtonVariant`).

### `Button`
A `<button type="button">` with variants and loading state. Extends all native button attributes.

| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'success' \| 'neon'` — `neon` is the pink→violet glowing CTA for a page's main action | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `isLoading` | `boolean` — shows a spinner, disables, sets `aria-busy` | `false` |
| `leftIcon` / `rightIcon` | `ReactNode` | — |

```tsx
<Button isLoading={mutation.isPending} rightIcon={<LuArrowRight size={15} />} onClick={submit}>
  Save
</Button>
```
For form submission, `type="submit"` must be passed explicitly.

### `LinkButton`
Navigation that looks like a button. Internal `href` → `next/link`; `http(s)://` → `<a target="_blank" rel="noreferrer">`. Extends anchor attributes.

| Prop | Type | Default |
|---|---|---|
| `href` | `string` (required) | — |
| `variant` | `'primary'` (accent gradient) \| `'outline'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `leftIcon` / `rightIcon` | `ReactNode` — the right icon nudges right on hover | — |

Use `LinkButton` for navigation, `Button` for actions. Never nest a `<button>` inside a link.

### `IconButton`
Square icon-only button for compact inline actions (edit pencil, add plus). Extends native button attributes except `children`.

| Prop | Type | Default |
|---|---|---|
| `icon` | `ReactNode` (required) | — |
| `label` | `string` (required) — used as `aria-label` and `title` | — |
| `variant` | `'default' \| 'accent' \| 'danger'` — hover colour | `'default'` |
| `size` | `'sm'` (26px) \| `'md'` (32px) | `'sm'` |

```tsx
<IconButton icon={<LuPencil size={13} />} label="Edit balance" variant="accent" onClick={open} />
```

### `DiscordButton`
Full-width Discord-branded button (logo + label + arrow). Props: native button attributes + `label` (default `"Continue with Discord"`). Used inside a POST `<form>` for Discord OAuth.

### `ExternalButton`
Small dark link to an external site with an external-link icon. Props: `href`, `label`.

---

## Form controls

All form controls share the same visual language: label, optional "optional" flag, hint, error and a "touched/valid" state.

### `Input` — `ui/Input`
Controlled-agnostic `<input>` with decoration. Extends native input attributes.

| Prop | Purpose |
|---|---|
| `label`, `hint` | Text above / below the field |
| `error` | Error message (shows error state) |
| `touched` | Shows the "valid" state |
| `icon`, `onIconClick` | Trailing icon button (e.g. show password) |
| `hideOptionalFlag`, `hideHintOnError`, `hideErrorMessage` | Display toggles |

### `FormInput<TForm>` — `ui/FormInput`
`Input` bound to react-hook-form via `useController`. Requires a surrounding `<FormProvider>`. `name` is type-checked against the form type.

```tsx
<FormProvider {...methods}>
  <FormInput<TSignInForm> name="email" label="Email" type="email" required hideErrorMessage />
</FormProvider>
```
It decides `touched` / `error` itself (error shown after submit, or once the field is dirty / has a value).

### `FormTextarea<TForm>` — `ui/FormTextarea`
Same idea for `<textarea>`: `label`, `name`, `hint`, `hideErrorMessage` + native attributes.

### `Select<O>` — `ui/Select`
Custom dropdown (portal-rendered list, optional search). Compound component:

| Part | Role |
|---|---|
| `Select.Trigger` | The closed control (rendered by `Select` itself) |
| `Select.Selected` | Render-prop for the selected value: `{(option) => …}` |
| `Select.Area` | The dropdown panel |
| `Select.Option` | Render-prop for each option |
| `Select.Search` | Search input (when `searchable`) |

Main props (`ISelectProps<O>`): `options: O[]`, `value`, `onChange(value)`, `label`, `hint`, `error`, `placeholder`, `required`, `disabled`, `searchable`, `filterOption(option, search)`. Options extend `ISelectOption<T, K> = { value: T; label: K }` (`ui/Select/context.ts`).

### `FormSelect<TForm, O>` — `ui/FormSelect`
`Select` bound to react-hook-form. Same compound parts (`FormSelect.Selected`, `.Area`, `.Option`).

```tsx
<FormSelect<TCreateTwitchAppForm, ISelectOption> name="type" label="Type" required options={options}>
  <FormSelect.Selected>{(item) => <TwitchAppTypeOption item={item} />}</FormSelect.Selected>
  <FormSelect.Area>
    <FormSelect.Option>{(item) => <TwitchAppTypeOption item={item} />}</FormSelect.Option>
  </FormSelect.Area>
</FormSelect>
```

### `SearchInput` — `ui/SearchInput`
Compact toolbar search: leading icon (spinner while `isSearching`), clear button, Escape clears, full width under 576px. Controlled: `value`, `onChange(value)`, `placeholder`, `label` (a11y name), `isSearching`, `className` + native input attributes. Pair it with `useListSearch` (`hooks/shared`), which debounces the term (300 ms) and resets paging:

```tsx
const [page, setPage] = useState(1);
const { value, setValue, search } = useListSearch(() => setPage(1));
const { data, isLoading, isFetching } = useUsersQuery({ page, pageSize, search });

<SearchInput value={value} onChange={setValue} isSearching={isFetching && !isLoading} />
```

### `Switch` — `ui/Switch`
Toggle. Props: `checked`, `onChange(checked)`, `label`, `hint`, `disabled`.

---

## Overlays

### `Modal` — `ui/Modal`
Portal + overlay, framer-motion enter/exit, closes on `Escape` and overlay click, locks body scroll.

| Prop | Type |
|---|---|
| `isOpen` | `boolean` |
| `onClose` | `() => void` |
| `isLoading` | `boolean` — shows the loader over the content |
| `className` | `string` |

Parts:
- `Modal.ModalHeader` — `category` (eyebrow), `title`, optional `description`.
- `Modal.ModalBody` — renders a `<form>`; accepts form attributes (`onSubmit`).
- `Modal.ModalFooter` — action row.

`IModalBaseProps` (`isOpen`, `onClose`) is the base for every feature modal's props.

### `AsyncBoundary` — `common/AsyncBoundary`
Error boundary (Next `unstable_catchError`) + `Suspense` + TanStack `QueryErrorResetBoundary` for one independent part of a page. Retry resets failed queries and re-renders the children.

| Prop | Purpose |
|---|---|
| `loading?` | Suspense fallback; default `<Loading type="block" />`, `null` for none |
| `renderError?(error, retry)` | Custom fallback for specific errors; return `undefined` to use `ErrorFallback` |
| `compact?` | Smaller error state for sections |

```tsx
<AsyncBoundary
  loading={<Loading type="block" tone="discord" title="Loading servers" />}
  renderError={(error) => (isDiscordAuthError(error) ? <DiscordReconnectBlocker /> : undefined)}
>
  <DiscordGuildGrid />
</AsyncBoundary>
```

### `ErrorFallback` — `common/ErrorFallback`
Turns any caught error into an `ErrorState`: title and text by `ApiError.kind`, retry hidden for errors a retry can't fix (404, 403, validation, business), technical details in development only. Props: `error`, `onRetry?`, `actions?`, `compact?`, `className?`. Used by `AsyncBoundary` and the route `error.tsx` files.

### `ActionsMenu` — `ui/ActionsMenu`
"More actions" dropdown on Radix DropdownMenu (keyboard navigation, portal, collision handling) with a glass trigger.

| Prop | Purpose |
|---|---|
| `items: IActionsMenuItem[]` | `{ key, label, icon?, description?, variant?: 'default' \| 'danger', disabled?, onSelect }` |
| `label?` | Accessible name of the trigger (default "More actions") |
| `triggerText?` | Text next to the "…" icon; omit for icon-only |
| `align?` | `'start' \| 'end'` (default `end`) |

### `ConfirmModal` — `common/ConfirmModal`
Ready-made confirmation dialog: `title`, `description`, `isOpen`, `isLoading`, `onConfirm`, `onCancel`, `onClose`.

### `EditValuesModal<TForm, TResult>` — `common/EditValuesModal`
Reusable "edit a few values" dialog. The caller describes the fields, passes a zod schema and initial values, and receives the **parsed** values in `onSubmit`. The form remounts on every open, so it always starts from `defaultValues`. Enter submits; the submit button is disabled until the form is valid and dirty.

| Prop | Purpose |
|---|---|
| `isOpen`, `onClose`, `isLoading` | Modal state (`isLoading` → overlay + button spinner) |
| `category`, `title`, `description?` | Header copy |
| `fields: IEditValueField<TForm>[]` | `{ name, label, type?: 'text' \| 'number', hint?, placeholder?, min?, max?, step? }` |
| `schema: ZodType<TResult, TForm>` | Validation; may transform (e.g. string → number) |
| `defaultValues` | Initial raw values (`TForm`) |
| `submitLabel?` | Default `"Save"` |
| `onSubmit(values: TResult)` | Called with parsed values; close the modal from the mutation's `onSuccess` |

`TForm` is what the inputs hold (strings for number inputs), `TResult` is the schema output. Keep the schema in a `*.scheme.ts` and export both `z.input` and `z.output` types:

```tsx
<EditValuesModal<TUserBalanceForm, TUserBalanceValues>
  isOpen={isOpen}
  onClose={close}
  category="Users · Balance"
  title="Edit balance"
  fields={BALANCE_FIELDS}
  schema={userBalanceSchema}
  defaultValues={{ balance: '12.0' }}
  isLoading={mutation.isPending}
  onSubmit={({ balance }) => mutation.mutate({ userId, payload: { balance } }, { onSuccess: close })}
/>
```

### `PortalDropdown` — `ui/PortalDropdown`
Positions `children` in a portal under `anchorRef` while `isOpen`, tracking scroll/resize. Used by `Select`; use it for any custom popover that must escape `overflow: hidden`.

---

## Data display

### `Table<T>` — `ui/Table`
Context-driven table. Configure with props, render with parts.

| Prop | Purpose |
|---|---|
| `columns: ITableColumn<T>[]` | `{ key, title, dataBind?, render?(row, i), width?, align?, className? }` |
| `data: T[]`, `rowKey` | Rows and key (`keyof T` or `(row) => string`) |
| `actions?: ITableAction<T>[]` | Row action buttons: `{ key, icon, label, variant?, disabled?, onClick(row) }` |
| `isLoading`, `skeletonRows` | Skeleton rows while loading |
| `emptyText` / `emptyComponent` / `loadingComponent` | States |
| `onRowClick(row)` | Makes rows clickable |

```tsx
<Table<IUserListItem> columns={columns} data={data?.items ?? []} rowKey="id" isLoading={isLoading}>
  <Table.Header />
  <Table.Body />
</Table>
<TablePagination page={page} pageSize={PAGE_SIZE} total={data?.meta.count ?? 0} onChange={setPage} />
```
Define `columns` as a module-level constant typed `ITableColumn<Row>[]`.

### `Tabs<T>` — `ui/Tabs`
Segmented tabs: `items: { key: T; label; count? }[]`, `value: T`, `onChange(key)`. Below 576px the tabs stretch to the full width (each tab `flex: 1`).

### `StatCard` — `ui/StatCard`
Metric tile: `label` (mono eyebrow), `value`, optional `sub`, `className`.

---

## Layout and typography

### `PageHeader` — `ui/PageHeader`
Dashboard page header: `eyebrow` (with accent dot), `title` (`h1`), optional `count` chip, `description`, `actions` (right side), `children` (extra right-side content).

### `Panel` — `ui/Panel`
Solid section container for dashboard pages (`--card` background, `--line` border, `--radius-md`). Use it for every content block on a detail page so sections look the same.

| Prop | Purpose |
|---|---|
| `title?` | Mono uppercase heading (`h2`) |
| `titleId?` | `id` for the heading; the section gets `aria-labelledby` |
| `actions?` | Right side of the header (tabs, buttons). Below 576px the header stacks and actions stretch to full width |
| `className`, `children` | |

```tsx
<Panel title="Activity" titleId="user-activity-title" actions={<Tabs … />}>
  …
</Panel>
```

### `HeroBanner` — `ui/HeroBanner`
Wide banner for detail-page heroes: `imageUrl` if given (falls back on load error), otherwise a gradient from `getSeedGradient(seed)` with a light/neon pattern. The bottom fades into the page so overlapping content stays readable; children render on top. Props: `seed` (required), `imageUrl?`, `fadeInto?` (CSS colour the bottom dissolves into completely, e.g. `var(--panel)`, so the banner flows into the surface below), `className`, `children`. No border by design.

### `SectionTabs<T>` — `ui/SectionTabs`
Page-level section tabs with a neon underline and optional icons (`role="tablist"`). Props: `items: { key: T; label; icon? }[]`, `value`, `onChange`, `label` (accessible name), `className`. Stretches to full width under 576px; scrolls horizontally if it doesn't fit. For a secondary switch inside a section use `Tabs`.

### `PageContent` — `ui/PageContent`
Padded content container under `PageHeader`.

### `SectionHeading` — `ui/SectionHeading`
Heading block for marketing-style sections: `eyebrow`, `title` (ReactNode), `description`, `align: 'left' | 'center'`, `as: 'h1' | 'h2' | 'h3'` (default `h2`), `id` (put it on the heading for `aria-labelledby`), `className`.

### `AnimatedHeight` — `ui/AnimatedHeight`
Animates its own height to match its content (ResizeObserver + framer-motion). Wrap content that changes size, e.g. an `AnimatePresence` swap. Clips vertically only while animating. Props: `transition`, `className`.

### `XelarLogo` — `ui/logos/XelarLogo`
Gradient "X" + "elar" wordmark + glowing dot. `responsive` (default `true`) collapses it to "X" between 900–1180px (dashboard sidebar range); pass `responsive={false}` elsewhere.

### `WorkspaceCard` — `ui/WorkspaceCard`
"Active workspace" card (gradient "X" mark + server name). Currently not rendered anywhere — kept for the dashboard sidebar.

### `ErrorState` — `ui/ErrorState`
Presentational error block (counterpart of `Loading type="block"`): icon, `title`, `description`, optional "Try again" button and `actions`. Domain-agnostic — for API errors use `ErrorFallback`.

| Prop | Type | Default |
|---|---|---|
| `title` | `string` (required) | — |
| `description` | `string` | — |
| `variant` | `'error' \| 'offline' \| 'not-found' \| 'forbidden'` — icon and tone | `'error'` |
| `onRetry`, `retryLabel` | show the retry button | label `"Try again"` |
| `actions` | `ReactNode` — extra buttons/links | — |
| `details` | `string` — collapsed technical details | — |
| `compact` | smaller min-height for sections | `false` |

### `Loading` — `ui/Loading`
The one loader for every waiting state (ring spinner from the OAuth callback screens). Renders `role="status"`; when there is no visible text it adds a screen-reader label.

| Prop | Type | Default |
|---|---|---|
| `type` | `'spinner'` — bare ring (buttons, overlays, small slots) · `'inline'` — small ring + label in a row (table cells) · `'block'` — centred ring + title/description filling a content area (page / section loading, min-height 220px) · `'card'` — glowing card with ring + title/description (full-screen flows like OAuth callbacks) | `'spinner'` |
| `tone` | `'accent' \| 'discord' \| 'twitch'` — ring and glow colour | `'accent'` |
| `size` | `'sm' \| 'md' \| 'lg'` | per type: `inline` → `sm`, `spinner`/`block` → `md`, `card` → `lg` |
| `title`, `description` | `string` — ignored by `spinner` (title becomes the a11y label) | — |
| `className` | `string` | — |

```tsx
if (isLoading) return <Loading type="block" tone="discord" title="Loading servers" />;
```
Tables keep their own skeleton rows (`Table isLoading`); use `Loading` for everything else instead of a "Loading…" string.

---

## Guards and providers — `common/`, `providers/`

| Component | Props | Behaviour |
|---|---|---|
| `AuthGuard` | `guestOnly?`, `redirectTo?` | Renders nothing while auth is `init`; redirects guests to `/auth` (or signed-in users to `/dashboard` with `guestOnly`) |
| `PermissionGuard` | `requiredPermissions: Permission[]`, `redirectTo?` (default `/dashboard`) | Renders children only if `useHasPermission` passes (any of the permissions, `ADMIN` always) |
| `StoreProvider` | — | Creates the Redux store and registers it for the Axios interceptor (`setGlobalStore`) |
| `AuthProvider` | — | Dispatches `initAuth()` once |

---

## Auth visuals — `auth/`

| Component | Purpose |
|---|---|
| `AuthWrapper` | Auth page grid. Compound: `AuthWrapper.Content` (form panel, optional `footer`), `AuthWrapper.DiscordHeadline` |
| `AuthVisual` | Animated "twitch.tv → Xelar → discord" card (hidden under 768px). Also used in the welcome hero |
| `AuthBgEffects` | Fixed aura + grid background. Also used on the welcome page |

---

## Creating a new shared component

Add it to `ui/` only if it is domain-agnostic and likely to be reused; otherwise keep it inside the feature folder. Follow the anatomy in [CONVENTIONS.md](./CONVENTIONS.md#component-anatomy), take colours/radii/fonts from tokens, and add a section to this document.
