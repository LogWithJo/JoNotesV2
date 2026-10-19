## 2026-10-19
1. Installed `zod` and `react-query` and `shadcn` packages.
2. Created the API Files Structure, And here is the Update:

```
    src/
    ├── api/
    │   ├── client.ts             # إعداد Axios instance أو Fetch wrapper (Interceptors, BaseURL)
    │   ├── config.ts             # constants زي الـ Endpoints والـ Base URLs
    │   └── index.ts              # Export لجميع الـ Hooks والـ Types
    ├── features/                 # أو داخل src/services/ حسَب تفضيلك
    │   ├── auth/
    │   │   ├── auth.schemas.ts   # Zod Schemas + TypeScript Types
    │   │   ├── auth.service.ts   # Raw API calls (Axios/Fetch + Zod parsing)
    │   │   ├── auth.keys.ts      # Query Keys الخاصة بـ Auth
    │   │   └── useAuth.ts        # TanStack Query Hooks (useQuery / useMutation)
    │   ├── notes/
    │   │   ├── notes.schemas.ts
    │   │   ├── notes.service.ts
    │   │   ├── notes.keys.ts
    │   │   └── useNotes.ts
    │   └── ...
    └── lib/
    └── react-query.ts        # إعداد QueryClient وتوفير Default Options
```

3. Created the `notes` feature API files: 
    1. `notes.schemas.ts`
    2. `notes.service.ts`
    3. `notes.keys.ts`
    4. `useNotes.ts`

Source: API Docs.md
Ai Chat Bot Link : `https://gemini.google.com/app/154806563900ae15`

### What remains to be done:
1. Create All `Notes` API Endpoints.
2. Error Handling.
3. Create the `auth` feature API files.