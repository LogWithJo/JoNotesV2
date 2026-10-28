# here is my api documentation

## notes.services.ts

```ts
// biome-ignore assist/source/organizeImports: <>
import {
    API_CONFIG,
    apiClient,
    createNoteSchema,
    IdNoteSchema,
    noteQueryParamsSchema,
    noteSchema,
    updateNoteSchema,
    type createNoteData,
    type IdNoteParam,
    type Note,
    type NoteQueryParams,
    type UpdateNoteParams,
} from "@/api/index";
import { z } from "zod";

export const notesService = {
    getNotes: async (params: NoteQueryParams): Promise<Note[]> => {
        const validParams = noteQueryParamsSchema.parse(params);
        const response = await apiClient.get(API_CONFIG.endpoints.notes.base, {
            params: validParams,
        });
        return z.array(noteSchema).parse(response.data);
    },
    createNote: async (data: createNoteData): Promise<Note> => {
        const validPayload = createNoteSchema.parse(data);
        const response = await apiClient.post(API_CONFIG.endpoints.notes.base, {
            params: validPayload,
        });
        return noteSchema.parse(response.data);
    },
    updateNote: async (data: UpdateNoteParams): Promise<Note> => {
        const validPayload = updateNoteSchema.parse(data);
        const response = await apiClient.patch(API_CONFIG.endpoints.notes.base, {
            params: validPayload,
        });
        return noteSchema.parse(response.data);
    },
    deleteNote: async (data: IdNoteParam) => {
        const validPayload = IdNoteSchema.parse(data);
        await apiClient.delete(API_CONFIG.endpoints.notes.byId(validPayload.id));
    },
    getNote: async (data: IdNoteParam): Promise<Note> => {
        const validPayload = IdNoteSchema.parse(data);
        const response = await apiClient.delete(
            API_CONFIG.endpoints.notes.byId(validPayload.id),
        );
        return noteSchema.parse(response.data);
    },
    patchPinNote: async (data: IdNoteParam): Promise<Note> => {
        const validPayload = IdNoteSchema.parse(data);
        const response = await apiClient.patch(
            API_CONFIG.endpoints.notes.pin(validPayload.id),
        );
        return noteSchema.parse(response.data);
    },
};
```

## getNotes:

- getNotes is parse but i see that it should be safeparse because even if it is an error it's not from the user it is from handling filters so in the bad phases the app should fetch the whole notes and i will add ?? to make it safe to fetch all notes so it will be:

```ts
		const validParams = noteQueryParamsSchema.parse(params ?? {});
		const response = await apiClient.get(API_CONFIG.endpoints.notes.base, {
			params: validParams,
		});
        ```

- it doesn't need any id even if you mean the id of the note it get it as a param and pass it to the request params

- the real url ( i have tested in postman ): "https://jo-notes-backend.vercel.app/notes"

- and the route in my project is 

```ts
API_CONFIG.endpoints.notes.base = '/notes'
```

### validation:

what we need to do here is to change parse to safe parse even if there is an error fetch the whole notes

## createNote:

- create note uses parse but i donno if i should use one of them but i can know what i want i wanna when there is a wrong email or password appears a red outline on the box not a global error so i donno know if the parse returns a global error or returns an error to the state manager

- when i read the docs i understood that parse returns the error in const {error} = useQuery()

- so it is safe and perefable to use parse in createNote

- in create note we don't need any id for the note even we will need the note id from the returned note object from response

- url tested from postman : https://jo-notes-backend.vercel.app/notes + the note data ( title + category )

- what the actual url i use : 

```ts
API_CONFIG.endpoints.notes.base = '/notes'
```

## update Note:

- parse or safe parse update note doesn't need parse even if there is a something wrong with the data it is timeout because user will be left off to the homepage so what we can do is to handle what left from data if the title is wrong or null or the content it's preferable to return a global pop up "something wrong with your note" so what we can use is "parse"

- the func get the id from param and pass it to the query params

- the url tested form postman : https://jo-notes-backend.vercel.app/notes/41

- my url that i use is:

```ts
(API_CONFIG.endpoints.notes.base, {
            params: validPayload,
        });
```

- oops the first mistake i haven't put the note id so i will update it to : 

```ts
const response = await apiClient.patch(
    API_CONFIG.endpoints.notes.byId(data.id),
    {
        params: validPayload,
    },
);
```

## deleteNote:

- delete note needs the id so if the id is null so the user send a nullable note so we don't need to say an error occurs because the note will not won't exists in the next fetch so when error occurs so if the id is null we can return nothing and stop the function with safe parse

- the func get he id from its params and pass it to query params

- postman url : "https://jo-notes-backend.vercel.app/notes/41"
- my url : 

```ts
    const response = await apiClient.delete(
        API_CONFIG.endpoints.notes.byId(validPayload.id),
    );
```

## getNote:

- getNote is very important because when user click he needs to see the note page + the actual data in seconds so we should cover all errors quikly so when the func get the id if it is nullable it returns the error so the error will returns to the home page with a pop up no note found so i see that we need parse

- the func get the id form its params and pass it to the query params

- postman url: "https://jo-notes-backend.vercel.app/notes/39"
- my url: 

```ts
    const response = await apiClient.delete(
        API_CONFIG.endpoints.notes.byId(validPayload.id),
    );
```

## patchPinNote:

- patch pin note needs the id so if there isn't id it should return error directly so i will go with parse

- the func get the id and pass it to query params

- the postman url: "https://jo-notes-backend.vercel.app/notes/39/pin"
- the actual url: 

```ts
    const response = await apiClient.patch(
        API_CONFIG.endpoints.notes.pin(validPayload.id),
    );
```

# Testing

1. i found that getnote deleete teh note so ichanged to get

## the updated note.service:

```ts
import { z } from "zod";
// biome-ignore assist/source/organizeImports: <>
import {
	API_CONFIG,
	apiClient,
	type createNoteData,
	createNoteSchema,
	type IdNoteParam,
	IdNoteSchema,
	type Note,
	type NoteQueryParams,
	noteQueryParamsSchema,
	noteSchema,
	type UpdateNoteParams,
	updateNoteSchema,
} from "@/api/index";

export const notesService = {
	getNotes: async (params?: NoteQueryParams): Promise<Note[]> => {
		const validParams = noteQueryParamsSchema.parse(params ?? {});
		const response = await apiClient.get(API_CONFIG.endpoints.notes.base, {
			params: validParams,
		});
		return z.array(noteSchema).parse(response.data);
	},
	createNote: async (data: createNoteData): Promise<Note> => {
		const validPayload = createNoteSchema.parse(data);
		const response = await apiClient.post(API_CONFIG.endpoints.notes.base, validPayload);
		return noteSchema.parse(response.data);
	},
	updateNote: async (data: UpdateNoteParams): Promise<Note> => {
		const validPayload = updateNoteSchema.parse(data);
		const response = await apiClient.patch(
			API_CONFIG.endpoints.notes.byId(data.id),
			{
				params: validPayload,
			},
		);
		return noteSchema.parse(response.data);
	},
	deleteNote: async (data: IdNoteParam) => {
		const validPayload = IdNoteSchema.parse(data);
		await apiClient.delete(API_CONFIG.endpoints.notes.byId(validPayload.id));
	},
	getNote: async (data: IdNoteParam): Promise<Note> => {
		const validPayload = IdNoteSchema.parse(data);
		const response = await apiClient.get(
			API_CONFIG.endpoints.notes.byId(validPayload.id),
		);
		return noteSchema.parse(response.data);
	},
	patchPinNote: async (data: IdNoteParam): Promise<Note> => {
		const validPayload = IdNoteSchema.parse(data);
		const response = await apiClient.patch(
			API_CONFIG.endpoints.notes.pin(validPayload.id),
		);
		return noteSchema.parse(response.data);
	},
};
```
