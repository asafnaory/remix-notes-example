import { Link } from "@remix-run/react";
import Note from "./Note";

interface NotesProps {
  notes: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export default function Notes(props: NotesProps): JSX.Element {
  const { notes } = props;
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </span>
            My Notes
          </h1>
          <Link to="/notes" className="text-white text-xl">
            Create New Note
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex-grow py-8">
        <div className="grid grid-cols-4 gap-4">
          {notes.map((note) => (
            <Note key={note.id} note={note} onDelete={(id) => console.log} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto">
          <p className="text-center text-gray-600">
            Made you smile? Mission accomplished! 😄
          </p>
        </div>
      </footer>
    </div>
  );
}
