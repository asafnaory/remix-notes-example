import { prisma } from "~/db.server";

interface NoteDto {
  title: string;
  content: string;
}

// Create a note
export async function createNote(note: NoteDto) {
  const { title, content } = note;
  return prisma.note.create({
    data: {
      title,
      content,
    },
  });
}

// Get all notes
export async function getAllNotes() {
  return prisma.note.findMany();
}

// Get a single note by ID
export async function getNoteById(id: string) {
  return prisma.note.findUnique({
    where: {
      id,
    },
  });
}

// Update a note
export async function updateNote(id: string, note: NoteDto) {
  const { title, content } = note;
  console.log(id);

  return prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}

// Delete a note
export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: {
      id,
    },
  });
}
