# Project Work Log

## 📅 Date: 2026-10-19

### 📦 Dependencies & Environment Setup
- Installed core application packages:
  - `zod` (Schema validation & runtime type safety)
  - `@tanstack/react-query` (Server state management & data fetching)
  - `shadcn` UI components

---

### 🏗️ API & Feature Architecture Setup
Established a modular, feature-based directory structure for managing HTTP requests, schemas, query keys, and custom hooks.

```src/
├── api/
│   ├── client.ts             # Axios instance / Fetch wrapper setup (Interceptors, BaseURL)
│   ├── config.ts             # API Constants (Endpoints, Base URLs)
│   └── index.ts              # Central export for API hooks and types
├── features/                 # Modular feature folder architecture
│   ├── auth/
│   │   ├── auth.schemas.ts   # Zod schemas & inferred TypeScript types
│   │   ├── auth.service.ts   # Raw API calls (Fetch/Axios + Zod validation)
│   │   ├── auth.keys.ts      # Query Key factory for Auth state
│   │   └── useAuth.ts        # TanStack Query custom hooks (useQuery / useMutation)
│   ├── notes/
│   │   ├── notes.schemas.ts
│   │   ├── notes.service.ts
│   │   ├── notes.keys.ts
│   │   └── useNotes.ts
│   └── ...
└── lib/
└── react-query.ts        # QueryClient initialization & default options configuration
```
---

### ⚙️ Completed Work
1. **Configured Core React Query Setup:**
   - Initialized `QueryClient` inside `src/lib/react-query.ts` with baseline options.
2. **Created `notes` Feature Modules:**
   - `notes.schemas.ts`: Zod validation schemas for payload and response data.
   - `notes.service.ts`: API service functions executing endpoint calls with Zod parsing.
   - `notes.keys.ts`: Structured TanStack Query key factory for cache management.
   - `useNotes.ts`: Custom React Query hooks exposing data-fetching and mutation handlers.

---

### 📌 References & Resources
- **API Documentation:** `API Docs.md`
- **AI Chat Session ( Gemini ):** [Gemini Project Thread](https://gemini.google.com/app/154806563900ae15)
- **AI Chat Session ( Claude ):** [Claude Project Thread](https://claude.ai/chat/fc192ce6-2ee1-4920-802e-4092bbf887ea)

---

### ⏳ Pending & Next Steps
- [ ] Rewrite the whole API client layer from scratch after understanding the Error Handling Strategy and folder structure.
- [ ] Implement all remaining `Notes` API endpoints.
- [ ] Implement global and feature-level error handling strategy.
- [ ] Create the `auth` feature API modules (`auth.schemas.ts`, `auth.service.ts`, `auth.keys.ts`, `useAuth.ts`).





# 📅 Date: 21-10-2026

### 📦 Dependencies & Environment Setup
- Installed core application packages:
  - `react-error-boundary` (Error Boundaries)

---

### 🏗️ API & Feature Architecture Setup
Error handling strategy: Implemented the Error Handling Strategy and created Error Boundaries for the React UI layer.

```┌────────────────────────────────────────────────────────┐
│ 1. API Client Layer (Axios Interceptors)              │  ──> Global HTTP status codes (401, 500, network loss)
├────────────────────────────────────────────────────────┤
│ 2. Data Validation Layer (Zod Parsing)                │  ──> Unexpected backend payloads / malformed responses
├────────────────────────────────────────────────────────┤
│ 3. Query & Mutation Layer (TanStack Query)            │  ──> Per-hook error state, retries, and UI notifications
├────────────────────────────────────────────────────────┤
│ 4. React UI Layer (Error Boundaries)                  │  ──> Uncaught JS runtime errors & critical render failures
└────────────────────────────────────────────────────────┘
```

---

### ⚙️ Completed Work
1. **Rewrote the API Client Layer:**
- Rewrite the whole API client layer from scratch after understanding the Error Handling Strategy and folder structure.
2. **Added Error Handling Strategy:**
   - Implemented the Error Handling Strategy and created Error Boundaries for the React UI layer.
3. **Finished Notes API**
   - Finsihed all notes API endpoints in `notes.service.ts`. like `getNotes`, `createNote`, `updateNote`, `deleteNote`.


---

### 📌 References & Resources
- **API Documentation:** `API Docs.md`
- **AI Chat Session ( Gemini ):** [Gemini Project Thread](https://gemini.google.com/app/154806563900ae15)
- **AI Chat Session ( Claude ):** [Claude Project Thread](https://claude.ai/chat/fc192ce6-2ee1-4920-802e-4092bbf887ea)

---

### ⏳ Pending & Next Steps
- [ ] Create the `auth` feature API modules (`auth.schemas.ts`, `auth.service.ts`, `auth.keys.ts`, `useAuth.ts`).