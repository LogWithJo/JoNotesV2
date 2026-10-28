import { apiClient, authService } from '@/api';
import { notesService } from "./notes.service";

async function TestAllNotesEndpoints() {
    console.log("🚀 Starting Manual API Tests...\n");

    try {
        // 1. Authenticate and retrieve token
        console.log("🔑 Logging in...");
        const response = await authService.continue({
            email: "youssef1234@gmail.com",
            password: "youssefjo",
        });

        const token = response.token;

        // Set auth header directly on apiClient for subsequent requests in Node
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("✅ Authenticated successfully!\n");

        // 2. CREATE a new note
        console.log("1️⃣ Testing createNote...");
        const newNote = await notesService.createNote({
            title: "Test Note",
            category: "Testing API without UI",
        });
        console.log("✅ Created successfully:", newNote);
        const createdId = newNote.id;

        // 3. GET all notes
        console.log("\n2️⃣ Testing getNotes...");
        const allNotes = await notesService.getNotes();
        console.log(`✅ Fetched ${allNotes.length} notes:`, allNotes);

        // 4. GET single note
        console.log(`\n3️⃣ Testing getNote for ID: ${createdId}...`);
        const singleNote = await notesService.getNote({ id: createdId });
        console.log("✅ Fetched single note:", singleNote);

        // 5. UPDATE note
        console.log(`\n4️⃣ Testing updateNote for ID: ${createdId}...`);
        const updatedNote = await notesService.updateNote({
            id: createdId,
            title: "Updated Test Note Title",
            content: "content",
            category: "category"
        });
        console.log("✅ Updated note successfully:", updatedNote);

        // 6. PIN note
        console.log(`\n5️⃣ Testing patchPinNote for ID: ${createdId}...`);
        const pinnedNote = await notesService.patchPinNote({ id: createdId });
        console.log("✅ Pinned note successfully:", pinnedNote);

        // 7. DELETE note
        console.log(`\n6️⃣ Testing deleteNote for ID: ${createdId}...`);
        await notesService.deleteNote({ id: createdId });
        console.log("✅ Deleted note successfully.");

        console.log("\n🎉 ALL API FUNCTIONS WORKED PERFECTLY!");
    } catch (error) {
        console.error("\n❌ API Test Failed!");
        console.error(error);
    }
}

TestAllNotesEndpoints();