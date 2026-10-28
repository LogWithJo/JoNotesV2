
# NoteKeys

## Questions

1. What key does useNotes use right now?
2. Imagine the user filters by category: "work", then switches to category: "personal". With that key, what does React Query think? Is it the same data or different data?
3. Write what the key should include (in words or code). Also decide: what key would a single note (getNote) need so that note 1 and note 2 don’t share a cache entry?

## Answers

1. usenotes use 'all' as a constant key 

```ts
// notes.keys.ts
export const noteKeys = {
	all: ["notes"] as const,
	
	lists: () => [...noteKeys.all, "list"] as const,
	list: (params: NoteQueryParams) => [...noteKeys.lists(), params] as const,

	details: () => [...noteKeys.all, "detail"] as const,
	detail: (id: IdNoteParam) => [...noteKeys.details(), id] as const,
};
```

2. no it thinks that work is different than personal so it refetches for list key

3. key is simply the id of the note