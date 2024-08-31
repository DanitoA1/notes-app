// utils/api/notes.ts
const API_URL = process.env.API_ENDPOINT || "http://localhost:4000/notes";

export async function getNotes() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch notes");
  return response.json();
}

export async function getNote(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch note");
  return response.json();
}

export async function searchNotes(query: string) {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to fetch notes");
  return response.json();
}

export async function createNote(note: {
  title: string;
  text: string;
  color: string;
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) throw new Error("Failed to create note");
  return response.json();
}

export async function updateNote(
  id: string,
  note: { title: string; text: string; color: string }
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) throw new Error("Failed to update note");
  return response.json();
}

export async function deleteNote(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete note");
  return response.json();
}
