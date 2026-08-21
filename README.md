# Xelar Front

Admin dashboard for the Xelar notification platform. It is the operator-facing surface used to connect Discord servers and Twitch streamer accounts, configure automated Discord notifications (bot messages or webhooks) triggered by Twitch events, manage users, roles and permissions, and review delivery statistics.

## Business overview

Xelar lets a team turn Twitch activity into Discord alerts without manual work. From this dashboard an operator can:

- Link Discord guilds and Twitch accounts via OAuth.
- Register and manage Twitch applications (API credentials) and their EventSub subscriptions.
- Create notification destinations for streamers (bot message or webhook), with optional game filters and templated content.
- Manage staff access through a role and permission system (admin, read/manage apps, read/manage roles, etc).
- View usage and delivery statistics: daily activity, notification split by platform, top streamers.

## Architecture

The codebase favors clear boundaries and predictable data flow over convenience shortcuts:

- **Feature based structure.** UI, hooks and models are grouped by business domain (discord, streamers, twitch-apps, twitch-subscriptions, roles, users, overview) rather than by technical layer, which keeps related code close together and easy to navigate.
- **Clean separation of server and client state.** Server state is owned entirely by TanStack React Query (query and mutation hooks per domain), while Redux Toolkit is scoped narrowly to authentication/session state. This avoids the common anti-pattern of duplicating server data in a global store.
- **Typed API layer.** Each domain has a service module wrapping HTTP calls and a matching set of TypeScript model interfaces, giving the app a consistent, typed contract with the backend instead of ad-hoc fetch calls scattered across components.
- **Centralized HTTP client.** A single Axios instance handles bearer token attachment, automatic token refresh on 401 with request queueing to prevent duplicate refresh calls, and a clean unwrapping of the API response envelope.
- **Schema-driven forms.** Forms are built with react-hook-form and validated with Zod schemas colocated with each form, so validation rules live next to the UI that enforces them and stay in sync with the shape of the data.
- **Permission-based access control.** A dedicated permission enum plus guard components and hooks gate both routes and UI elements, keeping authorization logic declarative and centralized rather than duplicated per page.
- **Dual OAuth integration.** Discord and Twitch account linking are implemented as first-class, isolated auth flows, in addition to standard email/password authentication.

## Design system

The UI is built on Tailwind CSS with an SCSS token layer (colors, typography, spacing, breakpoints) and a small component kit built on top of Radix UI primitives. The general brand book and design language, including the overall visual style and component conventions used across the dashboard, are adapted from Claude's design system.

## Tech stack

Next.js, React, TypeScript, Redux Toolkit, TanStack React Query, React Hook Form, Zod, Tailwind CSS, Radix UI, Axios.

## Getting started

```bash
npm install
npm run start:dev
```

The app runs on `http://localhost:4001` in development. Configure the backend API URL and OAuth client IDs in `.env` (see `.env.example`).

```bash
npm run build
npm run start
```
