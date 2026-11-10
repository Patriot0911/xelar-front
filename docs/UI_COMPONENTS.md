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
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'success'` | `'primary'` |
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
- `Modal.ModalHeader` — `category` (eyebrow), `title`, `description`.
- `Modal.ModalBody` — renders a `<form>`; accepts form attributes (`onSubmit`).
- `Modal.ModalFooter` — action row.

`IModalBaseProps` (`isOpen`, `onClose`) is the base for every feature modal's props.

### `ConfirmModal` — `common/ConfirmModal`
Ready-made confirmation dialog: `title`, `description`, `isOpen`, `isLoading`, `onConfirm`, `onCancel`, `onClose`.

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
Segmented tabs: `items: { key: T; label; count? }[]`, `value: T`, `onChange(key)`.

### `StatCard` — `ui/StatCard`
Metric tile: `label` (mono eyebrow), `value`, optional `sub`, `className`.

---

## Layout and typography

### `PageHeader` — `ui/PageHeader`
Dashboard page header: `eyebrow` (with accent dot), `title` (`h1`), optional `count` chip, `description`, `actions` (right side), `children` (extra right-side content).

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

### `Loading` — `ui/Loading`
Spinner.

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
