import { Form, Link } from "@remix-run/react";

export default function Note({
  note,
  onDelete,
}: {
  note: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
  onDelete: (id: string) => void;
}) {
  return (
    <Link
      to={`notes/${note.id}`}
      key={note.id}
      className="relative bg-gray-100 p-4 rounded"
    >
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p>{note.content}</p>
      <Form method="post">
        <button
          name="intent"
          type="submit"
          value="delete"
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <input type="hidden" name="id" value={note.id} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 1a9 9 0 100 18A9 9 0 0010 1zm4.293 5.293a1 1 0 00-1.414-1.414L10 8.586 6.121 4.707a1 1 0 10-1.414 1.414L8.586 10l-3.879 3.879a1 1 0 101.414 1.414L10 11.414l3.879 3.879a1 1 0 101.414-1.414L11.414 10l3.879-3.879z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Form>
    </Link>
  );
}
