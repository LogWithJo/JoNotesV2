# 🚀 React API Layer & Server State Code Review

Welcome to your API layer code review! The overall architecture—separating a thin Axios API client from TanStack Query hooks—is the right mental model for production React applications. However, several critical implementation bugs prevent requests from executing correctly and corrupt your cache state.

This guide breaks down every issue, explains why it happens, and gives you the exact blueprint to fix it yourself step-by-step.

---

## 📑 Table of Contents
1. [Architecture Summary](#1-architecture-summary)
2. [Issues Breakdown Table](#2-issues-breakdown-table)
3. [What You Did Well](#3-what-you-did-well)
4. [Best Practices Checklist](#4-best-practices-checklist)
5. [Step-by-Step Learning & Fix Plan](#5-step-by-step-learning--fix-plan)
6. [Key Questions to Consider](#6-key-questions-to-consider)

---

## 1. Architecture Summary

The current architecture follows a standard 4-tier client structure:

```text
[UI Components] 
       │
       ▼
[Server-State Hooks] (useNotes.ts, TanStack Query)
       │
       ▼
[Feature Services & Schemas] (notes.service.ts, notes.schemas.ts, Zod)
       │
       ▼
[Core API Client & Config] (client.ts, config.ts, Axios)
```

* **Intent:** API logic remains isolated from React components, and server data is managed predictably by TanStack Query.
* **Current Reality:** While the structural intent is solid, data payload bugs (Zod object wrapping), broken query keys, and incorrect HTTP REST routes currently cause silent request failures.

---

## 2. Issues Breakdown Table

| Severity | Location | Problem Summary | Why It Matters |
| :--- | :--- | :--- | :--- |
| 🔴 **Critical** | `src/features/notes/notes.service.ts` | Passing the raw Zod result object (`safeParse()`) directly into Axios as parameters or body. | `safeParse()` returns `{ success, data, error }`. Passing this sends the wrapper object instead of the actual validated fields. |
| 🔴 **Critical** | `src/api/client.ts` | Reading access tokens directly from `localStorage` in request interceptors. | `localStorage` is vulnerable to XSS attacks. Modern web applications use httpOnly secure cookies or short-lived memory tokens with refresh routines. |
| 🔴 **Critical** | `src/features/notes/useNotes.ts` | `useQuery` always uses `noteKeys.all` regardless of passed filters/search parameters. | TanStack Query uses cache keys to isolate data. Using a static key causes filtered notes to overwrite all notes in the cache. |
| 🔴 **Critical** | `src/features/notes/notes.service.ts` & `src/api/config.ts` | Using query parameters for `PATCH` / `DELETE` instead of URL path parameters (e.g., `/notes?id=1` vs `/notes/1`). | Violates RESTful standards and mismatches your own endpoint definitions in `config.ts`. |
| 🟠 **Important** | `src/lib/react-query.ts` | Defaulting to `staleTime: Infinity` with zero mutation cache invalidations. | UI will never update when notes are created, modified, or deleted without a manual browser refresh. |
| 🟠 **Important** | `src/lib/react-query.ts` | Throwing unhandled, unnormalized Axios and Zod errors to components. | Components have to guess whether an error is a network failure, validation failure, or a 401 Unauthorized response. |
| 🟡 **Minor** | `src/api/index.ts` | API barrel file re-exports higher-level feature code. | Creates leaky abstractions and risks circular dependency chains. |
| 🟡 **Minor** | `src/features/auth/*` | Auth keys, hooks, and services are empty stubs. | Leaves authentication half-wired with orphan config entries. |

---

## 3. What You Did Well

* **Clean Separation of Concerns:** Core Axios instance setup (`client.ts`), route configuration (`config.ts`), and feature services (`notes.service.ts`) are neatly decoupled.
* **Validation at the Edge:** Using Zod to enforce shape validation on data payloads before or after network calls is a best practice.
* **Environment Configuration:** Centralizing the API base URL in environment variables prevents hardcoded environment risks.
* **Query Key Strategy:** Creating dedicated key factory files (`notes.keys.ts`) shows foresight for managing complex cache structures.

---

## 4. Best Practices Checklist

| Best Practice | Status |
| :--- | :---: |
| Centralized API client (Axios instance) | ✅ Yes |
| API layer independent of React components | ✅ Yes |
| Schema validation for payloads (Zod) | ✅ Yes |
| Environment-driven base URLs | ✅ Yes |
| Dynamic TanStack Query keys (parameter-aware) | ❌ Missing |
| Post-mutation cache invalidation (`invalidateQueries`) | ❌ Missing |
| Proper REST semantics (`/resource/:id` vs `?id=`) | ❌ Missing |
| Secure Token Handling (httpOnly cookies / Refresh flow) | ❌ Missing |
| Uniform application error normalization | ❌ Missing |
| AbortSignal support for request cancellation | ❌ Missing |

---

## 5. Step-by-Step Learning & Fix Plan

Work through these steps in order. Try to spot and fix the issues in your code first before asking for hints!

### Step 1: Fixing Zod Validation & Axios Payload Bugs 🔴

* **Concept:** `z.safeParse(data)` returns a wrapper object:
  ```typescript
  // safeParse output shape:
  { success: true, data: { title: "Note 1" } }
  // OR
  { success: false, error: ZodError }
  ```
* **The Bug:** Passing the `safeParse()` result directly to Axios sends `{ success, data, error }` over the network, not `{ title: "Note 1" }`.
* **Your Goal:**
  1. Inspect `notes.service.ts`.
  2. Perform the `safeParse` check.
  3. If `.success` is `false`, throw or handle the validation error.
  4. If `.success` is `true`, pass only `.data` to Axios.

---

### Step 2: Correcting RESTful Routes & HTTP Methods 🔴

* **Concept:** Standard REST APIs identify specific resources using Path Parameters, not Query Strings or Request Bodies for resource location:
  * `GET /notes` → Fetch list
  * `POST /notes` → Create note
  * `PATCH /notes/:id` → Update note by ID
  * `DELETE /notes/:id` → Delete note by ID
* **The Bug:** `notes.service.ts` uses query parameters for `PATCH` and `DELETE`, ignoring the route definitions you created in `src/api/config.ts`.
* **Your Goal:**
  1. Update `notes.service.ts` functions to accept the `id` as a separate argument.
  2. Construct the URL path using string interpolation (e.g., `/notes/${id}`).

---

### Step 3: Making React Query Keys Dynamic 🔴 ***

* **Concept:** TanStack Query caches data under a query key array (e.g., `['notes', 'list', { category: 'work' }]`). If the query key does not change when arguments change, TanStack Query serves the old cache.
* **The Bug:** `useNotes.ts` uses `queryKey: noteKeys.all` unconditionally. Passing `{ search: 'react' }` to `useNotes` reuses the same cache key as all notes!
* **Your Goal:**
  1. Open `notes.keys.ts`.
  2. Define a function in your key factory that accepts filter/search params:
     ```typescript
     list: (params?: NoteQueryParams) => [...noteKeys.all, 'list', params] as const
     ```
  3. Update `useNotes.ts` to pass the `params` argument into your key factory.

---

### Step 4: Cache Management & Stale Time 🟠

* **Concept:** `staleTime` determines how long fetched data is considered "fresh". Setting `staleTime: Infinity` tells TanStack Query never to re-fetch automatically.
* **The Bug:** Newly created or updated notes won't show up on screen because the cache never re-fetches and mutations don't invalidate old data.
* **Your Goal:**
  1. In `src/lib/react-query.ts`, set a reasonable default `staleTime` (e.g., 1–5 minutes or 0 for real-time responsiveness).
  2. When writing mutation hooks (`useCreateNote`, `useDeleteNote`), use `queryClient.invalidateQueries({ queryKey: noteKeys.all })` in `onSuccess`.

---

### Step 5: Normalizing Application Errors 🟠 ***

* **Concept:** A network layer should translate low-level errors (Axios 500s, Zod schema failures, CORS errors) into a uniform, clean error shape so UI components don't crash.
* **Your Goal:**
  1. Create a helper function `normalizeError(error: unknown): AppError`.
  2. Inspect whether it is an `AxiosError` or `ZodError` and extract a clean user-facing message.
  3. Wrap service calls in `try/catch` or handle error normalization in an Axios response interceptor.



---------------


1. + Service layer correctness: what you send to the server (Zod and Axios misuse, wrong endpoints)
2. + Query keys: how React Query decides “this is the same data”
3. + Mutations, invalidation, and staleTime: how the UI learns that data changed
4. Error normalization: one error shape for the whole app
5. Auth: token storage and 401 handling (the report’s scariest item, but a smaller deal for a learning project than it sounds)
6. Request cancellation: signal and race conditions
7. how to build api