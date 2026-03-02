# Fastbreak Events Challenge

---

## Overview

- Full-stack sports event management application
- Built with Next.js 15 (App Router), TypeScript, Supabase, Tailwind CSS, shadcn/ui
- Authenticated users can create, view, edit, and delete sporting events with multiple venues
- Server-side data fetching and mutations (via actions) throughout

---

## Requirements and Constraints

The challenge had a list of requirements that influenced both architecture and tech stack.

- Technical Requirements
  - Framework: Next.js 15+ (App Router)
  - Language: TypeScript
  - Database: Supabase
  - Styling: Tailwind CSS
  - Authentication: Supabase Auth
  - Deployment: Vercel

- Constraints
  - All database interactions MUST happen server-side
  - Use shadcn/ui components throughout
  - Loading states and error handling
  - Toast notifications for success/error states

## Architecture Decisions

### Server Actions over API Routes

A primary constraint for this challenge was to leverage Actions over API Routes and ensure all calls to the DB are handled server-side. This choice introduces quite a few benefits:

- Maintenance: There is no longer a need to maintain a parallel `/api` directory or worry about naming conventions for REST endpoints.
- End-to-end Type Safety: A server action is simply a Typescript function. All parameters and outputs are typed at the call site. This is much easier to maintain type safety vs serializing/deserializing data from HTTP calls.
- Less Boilerplate: Actions have no need to manage headers, HTTP methods, status codes or content-types. They simply exist as functions.
- Form Handling: Since Actions are functions, you can simply pass them in as props to a form.

The pimary trade-off is that actions are tightly coupled with Next.js. The project would need a separate API layer if we wanted to invole any third-party consumers.

### Normalized sport_types Table

Each Event is a _sporting event_ and thus needs to be related to a specific sport. This was also called out in the requirements doc. To ensure data is consistent between client, server and DB, I chose to implement a sports_type Table to both normalize data and ensure no call to our DB can introduce an invalid sport type.

Specificity for each sport type was still maintained on the client in the @lib/constants file. A fallback of "Default" was added to ensure that even if a new sport type was added to the DB and the client update had not reached Prod, there would be no issue with rendering events with the new type.

### Delete-and-Reinsert for Venue Updates

When updating an event's venues, existing venues are deleted and the new set is inserted fresh. The alternative — diffing which venues were added, changed, or removed — adds significant complexity for minimal benefit at this scale. Cascading deletes on the FK make this safe, and it keeps the update action simple and predictable.

### RLS Read-All / Write-Own Pattern

All authenticated users can view all existing events from their dashboard, but only the event's creator can modify or delete them.

### Shared EventForm for Create and Edit

A single form component handles both creation and editing by accepting an optional `event` prop. When present, the form pre-fills with existing data and calls `updateEvent`; when absent, it starts empty and calls `createEvent`. This eliminates duplicate form code and ensures validation stays consistent across both flows.

### Zod Schema Validation

Zod schemas validate form data on the client before submission and provide immediate feedback before submission. These type inferences are also used for the server action parameters. This creates a constract from form to DB.

### Server-Side Search and Filtering

Search and filter update the URL params and trigger a server-side re-render. A 600ms debounce was placed on the search input to prevent excessive queries. An alternative approach would be a button to submit both filter and search values together, but for a beta version, this checks out fine.

### Suspense Boundaries for Streaming

All pages that fetch data use Suspense boundaries as opposed to `force-dynamic`. This allows for static shells to immediately render on the page while awaiting the content to stream in. This inline with progressive rendering (a recommended Next.js pattern).

---

## UI/UX Decisions

### Sport Config Constants

Each sport type maps to an icon defined in a constants file. This ensures cohesion between cards, badges, and detail pages. A default config handles any sport type added to the database that hasn't been added to the client. The constant was intentionally not flattened to allow for future UI enhancements.

### Toast Notifications

Since server actions return `{ success, error }` objects, we are able to provide end-users a Toast for feedback on the action they just executed. These will often render before page navigation and help the end-user understand the status of their action. All toast messages are user-friendly and easily readable.

### Responsive Mobile-First Design

All components start with a single-column mobile layout and add breakpoints for larger viewports. Cards use a responsive grid, forms stack vertically on mobile and go horizontal on tablet, and the navbar collapses gracefully.

---

## Testing

### Vitest Unit Tests

Tests were added as a way to validate Zod schema validation and integrity of constants. Constants tests confirm correctness of sports config and route generation. The schema tests validate if invalid data "fails successfully" and that valid data passes accordingly.

---

## Trade-offs & Given More Time

Due to the scope of this project, a few trade-offs were made to keep scope focused and ensure quality of functionality in a short window. If given more time (or in a future iteration) the following features would be implemented:

- Confirmation dialogs to precede delete actions
- Loading states on mutation buttons
- Venue address validation and autocompletion via Google Places API
- Test coverage to include integration tests for server actions and end-to-end tests for user flows (would likely bring in Cypress of Playwright)
- Optimistic UI vs awaiting server confirmation
- Pagination to smooth out the dashboard in cases of a large data-set
- Image uploads to add more detail to Events and Venues
- A true user profile to track name, phone and other pertinent data

---

## Tech Stack

- Next.js 15 (App Router, Turbopack)
- TypeScript
- Supabase (Auth, Postgres, RLS)
- Tailwind CSS
- shadcn/ui
- react-hook-form + Zod
- Sonner (toast notifications)
- react-icons (sport icons)
- Vitest (testing)

---

## Getting Started

- Clone the repo
- Copy `.env.example` to `.env.local` and fill in Supabase URL + anon key
- Run the SQL in `sql/schema.sql` in the Supabase SQL editor
- Disable email confirmation in Supabase Auth settings
- `yarn install` then `yarn dev`
- `yarn test` to run unit tests

---

## Database Schema

- See `sql/schema.sql` for full schema, RLS policies, and seed data
- Three tables: `sport_types` (lookup), `events`, `venues` (one-to-many with events)
- RLS: authenticated read-all, owner write-own
- Venue policies use subqueries to verify event ownership
